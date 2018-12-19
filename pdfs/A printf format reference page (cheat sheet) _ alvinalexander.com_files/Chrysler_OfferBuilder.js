

var PRGlobal = {
	'imageAssetDir' : (document.location.protocol != 'https:' ? 'http:' : 'https:')+'//services.serving-sys.com/HostingServices/Creative/Chrysler/OfferEndFrame_Assets/',
	'imageOverride' : {},
	'loadingElements':[],
	'animatingElements':[],
	'callback' : null
};

var PROfferRenderer = function(_global) {

	var totalElementNum = 0;
	privateSetCarData();
	privateBuildOfferEndframe();

	function privateSetCarData(){
		for( var prop in _global)
			PRGlobal[prop] = _global[prop];

		PRGlobal.mainDiv = document.getElementById(PRGlobal.mainDiv) || document.createElement('div');
		PRGlobal.carData = PRGlobal.itemJSON.item;
		for (var carDataKey in PRGlobal.itemJSON){
			if (carDataKey.charAt(0)=="@")
				PRGlobal.carData[carDataKey.substring(1)] = PRGlobal.itemJSON[carDataKey];
		}
		for(var prop in PRGlobal){
			if(typeof PRGlobal[prop] != 'string')
				continue;
			PRGlobal.carData[prop == 'stageSize' ? 'size' : prop] = PRGlobal[prop];
		}
		try{ PRGlobal.carData['trimCode'] = PRGlobal.carData['vehName'] }catch(e){ PRGlobal.carData['trimCode'] = ''}
		try{ PRGlobal.carData['source'] = PRGlobal.carData['source'].split(' ')[0];}catch(e){ PRGlobal.carData['source'] = ''};
		for(var imgName in PRGlobal.imageOverride)
			PRGlobal.imageOverride[imgName] = privateReplaceTextWithValues(PRGlobal.imageOverride[imgName]);

	}

	function privateBuildOfferEndframe(){
		(PRGlobal['offerType'] != 'generic') && privateBuildOffer();
		(typeof PRGlobal.layoutJSON.xml.brandSpecificItems.brand != 'undefined') && privateBuildBrandItems();
	}

	function privateBuildBrandItems(){
		var brandsToCheck = PRGlobal.layoutJSON.xml.brandSpecificItems.brand;
		var brandItems;
		if(brandsToCheck.constructor == Array) {
			for (var key in brandsToCheck) {
				if (brandsToCheck[key]["@name"]== PRGlobal.brandName)
					brandItems = brandsToCheck[key];
			}
		} else {
			brandItems = brandsToCheck;
		}

		if(typeof brandItems == 'undefined')
			return;

		var fontData = [];
		for (var key in brandItems.fonts) {
			for(var prop in brandItems.fonts[key])
				fontData.push({name:'Offer-'+key+'-'+prop, file:brandItems.fonts[key][prop]["#cdata-section"]});
		}
		(fontData.length > 0) && privateFontLoader(fontData);

		var imgItems = brandItems.locations.location;
		var itemSize = (PRGlobal.templateType == 'Endemic' && PRGlobal.stageSize == '300x600' && PRGlobal['offerType'] != 'generic') ? '300x250' : PRGlobal.stageSize;
		if(imgItems.constructor == Array) {
			for (var locKey in imgItems) {
				if (imgItems[locKey]["@size"] == itemSize)
					privateImageLoader(imgItems[locKey]);
			}
		} else {
			if (imgItems["@size"] == itemSize)
				privateImageLoader(imgItems);
		}

		function privateImageLoader(_imgArray){

			if(typeof _imgArray.container != 'undefined'){
				if (_imgArray.container.constructor == Array){
					for(var conKey in _imgArray.container)
						privateBuildOfferTree(null, 'container', _imgArray.container[conKey]);
				}else{
					privateBuildOfferTree(null, 'container', _imgArray.container);
				}
			}
			if(typeof _imgArray.image != 'undefined'){
				if (_imgArray.image.constructor == Array){
					for(var imgKey in _imgArray.image)
						privateBuildOfferTree(null, 'image', _imgArray.image[imgKey]);
				}else{
					privateBuildOfferTree(null, 'image', _imgArray.image);
				}
			}
			if(typeof _imgArray.selection != 'undefined'){
				privateBuildOfferTree(null, 'selection', _imgArray.selection);
			}
		}
	}

	function privateFontLoader(_data){
		if(typeof Chrysler_fontManager == 'undefined'){
			addFEED('Chrysler_fontManager.js', 'Chrysler-fontManager');
			window.setTimeout(function(){ privateFontLoader(_data)}, 500);
			return;
		}
		Chrysler_fontManager.loadingFont(_data, sizeAndPlaceTree);
	}

	function privateBuildOffer() {
		var offerTree = PRGlobal.layoutJSON.xml.offers.offer;
		var offerLayoutData = {};
		var offerLayoutType = 'offer';
		var tempLength = 0;
		var layoutType = "300x250 728x90".search(PRGlobal.offerSize) > -1 ? "horizontal" : "vertical";

		if(offerTree.constructor == Array && offerTree.length > 0){
			for(var offerKey in offerTree){
				if(offerTree[offerKey]["@layout"] == layoutType)
					offerLayoutData = offerTree[offerKey];
			}
		}else{
			if(offerTree["@layout"] == layoutType)
				offerLayoutData = offerTree;
		}

		for(var prop in offerLayoutData) {
			if(prop.search('@') == -1){
				offerLayoutType = prop;
				tempLength++;
			}
		}

		if (offerLayoutData === {} || tempLength == 0){
			(PRGlobal.callback !=  null) && PRGlobal.callback();
			return;
		}
		PRGlobal.mainDiv.style.opacity = '0';
		privateBuildOfferTree(null, offerLayoutType, offerLayoutData[offerLayoutType]);
	}

	function privateBuildOfferTree(baseObj,  nodetype, layout) {

		if (!nodetype || !isNaN(nodetype))
			return;

		brandHack(PRGlobal.brandName, layout);
		if (layout.constructor == Array) {
			for (var i = 0; i < layout.length; i++) {
				privateBuildOfferTree(baseObj, nodetype, layout[i]);
			}
			return;
		}
		var childList = privateBuildChildList(layout);
		var node = baseObj;
		switch (nodetype) {
			case "offer":
			case "container":
				node = new PROfferContainerObject();
				node.init(baseObj, layout);
				totalElementNum++;
				if(baseObj != null){
					baseObj.addWaitingItem(node);
					node.addOnPlace(baseObj, "checkForComplete", node);
				}
				break;
			case "selection":
				childList = privateGetSelectionNode(layout);
				break;
			case "text":
				(typeof layout["#cdata-section"] != 'undefined') && (layout["#cdata-section"] = privateReplaceTextWithValues(layout["#cdata-section"]));
				(typeof layout["#text"] != 'undefined') && (layout["#cdata-section"] = privateReplaceTextWithValues(layout["#text"]));
				node = new PROfferTextObject();
				node.init(baseObj, layout);
				totalElementNum++;
				if(baseObj != null){
					baseObj.addWaitingItem(node);
					node.addOnPlace(baseObj, "checkForComplete", node);
				}
				break;
			case "graphic":
				node = new PROfferGraphicObject();
				node.init(baseObj, layout);
				break;
			case "image":
				(typeof layout["@imagename"] != 'undefined') && (layout["@imagename"] = privateReplaceTextWithValues(layout["@imagename"]));
				(typeof layout["@imagefailname"] != 'undefined') && (layout["@imagefailname"] = privateReplaceTextWithValues(layout["@imagefailname"]));
				node = new PROfferImageObject();
				node.init(baseObj, layout);
				totalElementNum++;
				break;
		}
		for (var traverseKey in childList)
			privateBuildOfferTree(node, traverseKey, childList[traverseKey]);
	}

	function privateBuildChildList(layout) {
		var childList = {};
		for (var childKey in layout) {
			if (childKey.length > 0 && childKey.charAt(0) != "@" && childKey.charAt(0) != "#") {
				childList[childKey] = layout[childKey];
			}
		}
		return childList;
	}

	function privateGetSelectionNode(layout) {

		var varName;
		if(layout.constructor == Array){
			for(var j=0; j < layout.length; j++){
				if(getChoiceNode(layout[j]))
					return privateBuildChildList(layout[j]);
			}
			return {};
		}else if(typeof layout['choice'] == "undefined"){
			return {};
		}else{
			var varName = privateReplaceTextWithValues(layout["@varName"]);
			if(layout.choice.constructor == Array){
				for(var i=0; i < layout.choice.length; i++){
					var selection = getChoiceNode(layout.choice[i], varName);
					if(getChoiceNode(layout.choice[i], varName))
						return privateBuildChildList(layout.choice[i]);
				}
				return {};
			}else{
				return getChoiceNode(layout.choice, varName) ? privateBuildChildList(layout.choice) : {};
			}
		}
	}

	function getChoiceNode(_choice, _varName){
		if(_choice["@comp"] == "default")
			return true;

		(typeof _varName == 'undefined' && typeof _choice["@varName"] != 'undefined') && (_varName = privateReplaceTextWithValues(_choice["@varName"]));
		if(_choice["@comp"] == "noexists" && (typeof _varName == 'undefined' || _varName == '') && (typeof _choice["@val"] == 'undefined' || _choice["@val"] == ''))
			return true;

		var varName = _varName.split(/\|/g), _varName,
			comp = _choice["@comp"].split(/\&\&|\|\|/g), _comp,
			val = _choice["@val"].split(/\|/g), _val,
			operators = _choice["@comp"].match(/\&\&|\|\|/g) || ['&&'], _operator,
			compLength = Math.max(varName.length, comp.length, val.length),	compResult, currentComp;

		for(var i=0; i < varName.length; i++)
			varName[i] = privateReplaceTextWithValues(varName[i]);
		for(var j=0; j < val.length; j++)
			val[j] = privateReplaceTextWithValues(val[j]);

		function comparing(_varName, _comp, _val){
			if("lt le gt ge".search(_comp) > -1){
				(_val.length > 0 && !isNaN( parseInt(_val.replace(",","")) )) && (_val = parseInt(_val.replace(",","")));
				(_varName.length > 0 && !isNaN(parseInt(_varName.replace(",","")))) && (_varName = parseInt(_varName.replace(",","")));

				if(typeof _val != "number" || typeof _varName != "number")
					return false;
			}

			if((_comp == "exists" && _varName.length > 0 && String(' '+_val+' ').search(' '+_varName+' ') > -1) ||
				 (_comp == "noexists" && (_varName.length == 0 || String(' '+_val+' ').search(' '+_varName+' ') == -1)) ||
				 (_comp == "eq" && _varName == _val) || (_comp == "ne" && _varName != _val) ||
				 (_comp == "lt" && _varName < _val) || (_comp == "le" && _varName <= _val) || (_comp == "gt" && _varName > _val) || (_comp == "ge" && _varName >= _val))
				return true;

			return false;
		}

		for(var k=0; k < compLength; k++){
			_varName = varName[k] || varName[varName.length-1],
				 _comp = comp[k] || comp[comp.length-1],
				_val = val[k] || val[val.length-1],
			 _operator = operators[k] ||  operators[operators.length-1];

			currentComp = comparing(_varName, _comp, _val);
			if(k == 0){
				compResult = currentComp;
				continue;
			}
			if(_operator == '||')
				compResult = compResult || currentComp;
			else
				compResult = compResult && currentComp;
		}
		return Boolean(compResult);
	}

	function sizeAndPlaceTree(){
		(typeof isSvgRendering == 'undefined') && (isSvgRendering = false);
		if(typeof PRGlobal.loadingElements == 'undefined' || PRGlobal.loadingElements.length != totalElementNum)
			return window.setTimeout(sizeAndPlaceTree, 300);

		for (var i = 0; i < PRGlobal.loadingElements.length; i++){
			(typeof PRGlobal.loadingElements[i]["fnName"] != 'undefined') && PRGlobal.loadingElements[i]["obj"][PRGlobal.loadingElements[i]["fnName"]]();
		}
		offerBuilderComplete();
	}

	function offerBuilderComplete(){
		var placed = true;
		for (var i = 0; i < PRGlobal.loadingElements.length; i++)
			(placed) && (placed = PRGlobal.loadingElements[i]["obj"]['isPlaced']);

		if(!placed)
			return window.setTimeout(offerBuilderComplete, 200);

		PRGlobal.mainDiv.style.opacity = '1';
		(PRGlobal.callback !=  null) && PRGlobal.callback();
	}

	function brandHack(brandName, layout){

		if (typeof(layout["@brandHack"+brandName]) != "undefined" && layout["@brandHack"+brandName].length > 0) {
			var overrideArray = layout["@brandHack"+brandName].split(";");
			for (var i = 0; i < overrideArray.length; i++) {
				var attrArray = overrideArray[i].split(":");
				if (attrArray.length == 2) {
					layout["@"+attrArray[0]] = attrArray[1];
				}
			}
		 }
		try{
			var overridePropArray = layout["@propertyHack"].split(/\|/g);//.split(/(?![^\|])\|(?!\|)/g);
			for(var i = 0; i < overridePropArray.length; i++) {
				var attrPropArray = overridePropArray[i].split(/\:(?!\/)/g),
					conditionArray = attrPropArray[0].split(/\&\&/g), //operators = attrPropArray[0].match(/\&\&/g) || [],
					propArray = attrPropArray[1].split(","),
					compResult, currentComp;

				for(var k=0; k < conditionArray.length; k++){
					currentComp = compareSelectVar(conditionArray[k].split("+"));
					compResult = (k == 0) ? currentComp : compResult && currentComp;
				}

				if(!compResult)
					continue;

				for(var j=0; j < propArray.length; j++){
					var propValue = propArray[j].split("=");
					layout[(propValue[0] == "cdata-section" ? "#" : "@")+propValue[0]] = propValue[1];
				}
			}
		}catch(e){

		}

		function compareSelectVar(_array){
			if(_array.length == 1 && _array[0] == "default")
				true;

			if(PRGlobal.carData[_array[0]] == undefined && _array[1] == "noexists")
				return true;

			if(_array.length < 3)
				return false;

			var _varName = PRGlobal.carData[_array[0]],
				_comp = _array[1],
				_val  = _array[2];

				(_varName == undefined) && (_varName = _array[0]);
				(_val.length > 0 && _val.search("{") > -1) && (_val =  PRGlobal.carData[_array[2].replace(/{|}/g, '')]);

				if("lt le gt ge".search(_comp) > -1){
					(_varName.length > 0 && !isNaN(_varName.replace(",",""))) && (_varName = parseInt(_varName.replace(",","")));
					(_val.length > 0 && !isNaN(_val.replace(",",""))) && (_val = parseInt(_val.replace(",","")));
					if(typeof _val != "number" || typeof _varName != "number")
						return false;
				}

			if((_comp == "exists" && _varName.length > 0 && String(' '+_val+' ').search(' '+_varName+' ') > -1) ||
			   (_comp == "noexists" && (_varName.length == 0 || String(' '+_val+' ').search(' '+_varName+' ') == -1)) ||
			   (_comp == "eq" && _varName == _val) || (_comp == "ne" && _varName != _val) ||
			   (_comp == "lt" && _varName < _val) || (_comp == "le" && _varName <= _val) ||
			   (_comp == "gt" && _varName > _val) || (_comp == "ge" && _varName >= _val) || _comp == "default")
				return true;
			else
				return false;
		}
	}

	function privateReplaceTextWithValues(compVal) {

		if(typeof compVal == "undefined" || compVal == "")
			return "";

		var retVal = compVal;
		var startChar = 0;
		//var isMathNode = Boolean(retVal.search(/eval\(/) > -1);
		var replaceTextRegExp = new RegExp("\{([^}]+)\}", "");

		while(retVal.search(replaceTextRegExp) >= 0){
			var replText = retVal.match(replaceTextRegExp)[1];
			var resultText;
			var splitArr  = replText.split(".");
			if (splitArr.length <= 1){
				resultText = PRGlobal.carData[replText];
			} else {
				var retObj = PRGlobal.carData;
				for (var retObjNum = 0; retObjNum <  splitArr.length -1; retObjNum++) {
					retObj = retObj[splitArr[retObjNum]];
				}
				resultText = retObj[splitArr[splitArr.length - 1]];
			}
			retVal = retVal.replace(replaceTextRegExp, resultText);//getValue(resultText));
		}

		/*function getValue(_v){
			if(isMathNode)
				return (typeof _v == 'undefined' || _v.length == 0) ? '0' : _v.replace(/\,/gi, '');
			else
				return _v;
		}
		if(isMathNode){
			try{
				retVal = eval(retVal.replace(/eval\(|\)|\,|\$/gi, '')).toLocaleString();
			}catch(e){
				retVal = '0';
			}
		}*/
		if(retVal == 'undefined')
			return 'undefined';
		else if (retVal.indexOf('undefined') > -1)
			return "";
		else
			return retVal;
	}
};


var PROfferContainerObject = function () {

	PROfferPlacer.call(this);
	this.prototype = Object.create(PROfferPlacer.prototype);
	this.prototype.constructor = this;

	this.children = [],

	this.privateInit = function (parentObj, layout) {
		this.type = "Container";
		this.div.style.cssText += "position:absolute;display:inline-block;";
		PRGlobal.loadingElements.push({obj:this, fnName:"place"});
		(typeof this.layout["@animation"] != "undefined") && this.setAnimation();
	},

	this.setWidthAndHeight = function(){

		var staticX = false, staticY = false, checkValX, checkValY, maxX = 0, maxY = 0, thisScale = 1;
		if(typeof this.layout["@w"] != "undefined" && !isNaN(parseInt(this.layout["@w"])) && parseInt(this.layout["@w"]) > 0){
			this.width = parseInt(this.layout["@w"]);
			staticX = true;
		}
		if(typeof this.layout["@h"] != "undefined" && !isNaN(parseInt(this.layout["@h"])) && parseInt(this.layout["@h"]) > 0){
			this.height = parseInt(this.layout["@h"]);
			staticY = true;
		}

		for (var i=0; i < this.children.length; i++){
			this.children[i].setWidthAndHeight();
			checkValX = !isNaN(this.children[i].getX()) ? this.children[i].getX() : 0,
			checkValY = !isNaN(this.children[i].getY()) ? this.children[i].getY() : 0;
			maxX = Math.max(maxX, checkValX + this.children[i].getWidth());
			maxY = Math.max(maxY, checkValY + this.children[i].getHeight());
		}

		if(staticX && staticY){
			thisScale = Math.min(1, this.width/maxX, this.height/maxY);
		}else{
			if(!staticX) this.width = maxX;
			else thisScale = Math.min(1, this.width/maxX);
			if(!staticY) this.height = maxY;
			else thisScale = Math.min(1, this.height/maxY);
		}
		this.div.style.width = this.width+"px";
		this.div.style.height = this.height+"px";

		if(thisScale < 0.95 && thisScale < this.scale){
			this.scale = thisScale;
			var originVar = ('offerMainContainer carNameConstraint'.search(this.name) > -1 || 'offerMainContainer carNameConstraint'.search(this.children[0].name) > -1) ? '50% 50%' : "0% 0%";
			this.div.style.WebkitTransformOrigin = originVar;
			this.div.style.WebkitTransform = "scale("+this.scale+")";
			this.div.style.transformOrigin = originVar;
			this.div.style.transform = "scale("+this.scale+")";
			this.setSizeInvalid();

			/*if(typeof this.layout["@x"] != "undefined" && !isNaN(parseInt(this.layout["@x"])))
				this.layout["@x"] = parseInt(this.layout["@x"]) + this.width * (1 - this.scale) * 0.5;

			if(typeof this.layout["@y"] != "undefined" && !isNaN(parseInt(this.layout["@y"])))
				this.layout["@y"] = parseInt(this.layout["@y"]) + this.height * (1 - this.scale) * 0.5;*/
		}
		this.sizeValid = true;
	},

	this.addChild = function (obj) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i] === obj){
				return;
			}
		}
		this.children.push(obj);
	},

	this.getChildByName = function (objName) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i]["name"] == objName){
				return this.children[i];
			}
		}
		return null;
	},

	this.play = function(){
		this.div.style.translate = '';//
	}

	return this;
}

var PROfferTextObject = function(){

	PROfferPlacer.call(this);
	this.prototype = Object.create(PROfferPlacer.prototype);
	this.prototype.constructor = this;

	this.span = null,
	this.innerHTML = '',
	this.textStyles = {'size':12, 'marginTop':0, 'marginLeft':0, 'marginBottom':0},

	this.privateInit = function (parentObj, layout) {
		this.type = "Text";

		if(this.layout["#cdata-section"].length == 0 || this.layout["#cdata-section"] == 'undefined')
			return PRGlobal.loadingElements.push({obj:this, fnName:"place"});

		this.div.style.cssText += "position:absolute;display:block;padding:0px;";

		this.span = document.createElement('span');
		this.div.appendChild(this.span);
		this.span.style.cssText += "position:absolute;padding:0px;-webkit-font-smoothing:subpixel-antialiased;white-space:nowrap;";
		(navigator.userAgent.search('Trident') == -1) && (this.span.style.cssText += 'white-space:nowrap;');

		if(typeof this.layout["@textcolor"] != "undefined")
			this.span.style.cssText += "color:"+ this.layout["@textcolor"].replace("0x", "#") +";";

		if(typeof this.layout["@textalign"] != "undefined")
			this.span.style.cssText += "text-align:"+ this.layout["@textalign"].toLowerCase() +";";

		if(typeof this.layout["@size"] != 'undefined' && !isNaN(parseInt(this.layout["@size"])) && parseInt(this.layout["@size"]) > 0)
			this.textStyles['size']= parseInt(this.layout["@size"]);

		if(typeof this.layout["@desiredwidth"] != "undefined" && !isNaN(parseInt(this.layout["@desiredwidth"])) && parseInt(this.layout["@desiredwidth"]) > 0)
			this.textStyles['desiredwidth']= parseInt(this.layout["@desiredwidth"]);

		if(typeof this.layout["@lines"] != "undefined" && !isNaN(parseInt(this.layout["@lines"])) && parseInt(this.layout["@lines"]) > 1)
			this.textStyles['lines'] = parseInt(this.layout["@lines"]);

		if(typeof this.textStyles['desiredwidth'] != 'undefined' || typeof this.textStyles['lines'] != 'undefined'){
			this.span.style.cssText += "width:100%;";
			if(!isNaN(this.layout["@line-height"])){
				this.span.style.cssText += "line-height:"+ this.layout["@line-height"]+"em;";
				this.textStyles["line-height"] = Number(this.layout["@line-height"]) - 1;
			}else{
				this.span.style.cssText += "line-height:1.1em;";
				this.textStyles["line-height"] = 0.1;
			}
			this.width = (typeof this.textStyles['desiredwidth'] == 'undefined') ? this.parent.layout["@w"] : this.textStyles['desiredwidth'];
			this.div.style.cssText += "width:"+ this.width +"px;";
			this.span.style.whiteSpace = 'normal';
		}

		this.innerHTML = this.layout["#cdata-section"];
		this.innerHTML = this.innerHTML.replace("®?","<sup style='font-size:7pt'>TM</sup>").replace( /©/gi, '<sub style="vertical-align:baseline;font-size:0.5em;">&copy;</sub>').replace(/\n/gi, "<br />");
		(PRGlobal.brandName != 'Jeep') && (this.innerHTML = this.innerHTML.replace( /&reg;/gi, '<sub style="vertical-align:baseline; font-size:0.35em;">&reg;</sub>').replace(/®/gi,'<sup style="font-size:0.7em">&reg;</sup>'));

		if(this.innerHTML.search("<br />") > -1){
			if(!isNaN(this.layout["@line-height"])){
				this.span.style.cssText += "line-height:"+ this.layout["@line-height"]+"em;";
				this.textStyles["line-height"] = Number(this.layout["@line-height"]) - 1;
			}else{
				this.span.style.cssText += "line-height:1.1em;";
				this.textStyles["line-height"] = 0.1;
			}
			this.span.style.whiteSpace = 'nowrap';
			(typeof this.textStyles['lines'] != 'undefined' && this.innerHTML.search("<br />") > -1) && (this.textStyles['lines'] = '');
		}
		if(this.innerHTML.search('†') > -1 && PRGlobal.brandName != 'Jeep')
			this.textStyles['size'] *= PRGlobal.brandName == 'Fiat' ? 0.55 : 0.75;

		this.span.innerHTML = this.innerHTML;
		PRGlobal.loadingElements.push({obj:this, fnName:"setTextFields"});
		(typeof this.layout["@animation"] != "undefined") && this.setAnimation();
	}

	this.setTextFields = function(){

		var fontName = Chrysler_fontManager.getFontFamily('Offer-'+this.layout['@font']+'-'+this.layout['@style']);
		(fontName.length == 0) && (fontName = Chrysler_fontManager.getFontFamily('Offer-'+this.layout['@font']+'-default'));
		this.div.style.cssText += "font-family:'"+ fontName +"';";

		var margins = Chrysler_fontMargins[ Chrysler_fontManager.getFontFile(fontName) ];
		(isSvgRendering) && (this.textStyles['size'] *= 4);
		this.textStyles['size'] = Math.round(this.textStyles['size'] * (typeof margins != 'undefined' ? margins.em : 1));
		this.span.style.cssText += "font-size:"+this.textStyles['size']+"px;";

		(typeof margins != 'undefined') && (this.textStyles['marginHeight'] = margins.height);
		(typeof margins != 'undefined') && (this.textStyles['marginTop'] = getMaxNum(this.innerHTML, this.textStyles['size'], margins.top));
		(typeof margins != 'undefined' && this.innerHTML.charAt(0) == '1') && (this.textStyles['marginLeft'] = getMaxNum(this.innerHTML, this.textStyles['size'], margins.left, '1'));
		(typeof margins != 'undefined') && (this.textStyles['marginBottom'] = getMaxNum(this.innerHTML, this.textStyles['size'], margins.bottom));

		if(typeof this.textStyles["line-height"] != 'undefined'){
			this.textStyles['marginTop'] += this.textStyles["line-height"] * this.textStyles['size'];
			this.textStyles['marginBottom'] += this.textStyles["line-height"] * this.textStyles['size'];
		}else{
			this.span.style.cssText += "line-height:1em;";
		}
		this.span.style.cssText += 'margin:'+ String(this.textStyles['marginTop']) +'px 0px 0px '+ this.textStyles['marginLeft'] +'px;';
		(isSvgRendering && (typeof this.textStyles['desiredwidth'] != 'undefined' || typeof this.textStyles['lines'] != 'undefined')) && (this.span.style.width = "400%");

		window.setTimeout(function(){
			if(isSvgRendering)
				this.setTextScale();
			else
				this.setTextSize();
		}.bind(this), 100);

		function getMaxNum(_text, _size, _array, _char){
			var maxNum = 100;
			for(var i=0; i < _array.length; i++){
				if(typeof _char != 'undefined' && _array[i].pattern.toString().search(_char) == -1)
					continue;
				(_text.match(_array[i].pattern)) && (maxNum = Math.min(maxNum, _array[i].value));
			}
			if(maxNum == 100)
				return 0;
			return maxNum * _size * -0.01;
		}
	},

	this.setTextSize = function(){

		var resizingVar_width = this.width;
		if(this.width == 0){
			if(this.parent.children.length == 1 && parseInt(this.parent.layout["@w"]) > 0 && parseInt(this.parent.layout["@w"]) < this.span.offsetWidth){
				this.width = parseInt(this.parent.layout["@w"]);
			}else{
				this.width = this.span.offsetWidth + this.textStyles['marginLeft'] + (this.innerHTML == '+' ? 0 : 2);
			}
			resizingVar_width = this.width - this.textStyles['marginLeft'];
		}

		this.height = this.span.offsetHeight + this.textStyles['marginTop'] + this.textStyles['marginBottom'] + (this.innerHTML == '+' ? 0 : 2);
		var resizingVar_height = this.span.offsetHeight;
		if(this.parent.children.length == 1 && parseInt(this.parent.layout["@h"]) > 0 && parseInt(this.parent.layout["@h"]) < this.height){
			this.height = parseInt(this.parent.layout["@h"]);
			resizingVar_height = this.height;
		}
		this.div.style.width = this.width +"px";
		this.div.style.height = this.height +"px";

		if(this.span.offsetWidth > resizingVar_width || this.span.offsetHeight > resizingVar_height)
			this.textResize(this.textStyles['size'], resizingVar_width, resizingVar_height);
		else
			this.place();
	},

	this.textResize = function(_size, _width, _height){
		if(this.span.offsetWidth <= _width && this.span.offsetHeight <= _height)
			return this.setTextSize();

		var fontSize = _size -1;
		this.span.style.fontSize = String(fontSize)+'px';
		if(fontSize < 6)
			return this.place();

		setTimeout(function(){
			this.textResize(fontSize, _width, _height);
		}.bind(this), 100);
	},

	this.setTextScale = function(){
		var resizingVar_width;
		if(this.width == 0){
			if(this.parent.children.length == 1 && parseInt(this.parent.layout["@w"]) > 0 && parseInt(this.parent.layout["@w"]) < this.span.offsetWidth * 0.25){
				this.width = parseInt(this.parent.layout["@w"]);
			}else{
				this.width = (this.span.offsetWidth + this.textStyles['marginLeft']) * 0.25 + (this.innerHTML == '+' ? 0 : 2);
			}
			this.div.style.width = String(this.width) +"px";
			resizingVar_width = this.width * 4 - this.textStyles['marginLeft'];
		}else{
			resizingVar_width = this.width * 4;
		}

		this.height = (this.span.offsetHeight + this.textStyles['marginTop'] + this.textStyles['marginBottom']) * 0.25 + (this.innerHTML == '+' ? 0 : 2);
		var resizingVar_height = this.span.offsetHeight;
		if(this.parent.children.length == 1 && parseInt(this.parent.layout["@h"]) > 0 && parseInt(this.parent.layout["@h"]) < this.height){
			this.height = parseInt(this.parent.layout["@h"]);
			resizingVar_height = this.height * 4;
		}
		this.div.style.height = String(this.height * 4) +"px";

		if(this.span.offsetWidth > resizingVar_width || this.span.offsetHeight > resizingVar_height){
			var scaleVar = Math.min(resizingVar_width/this.span.offsetWidth, resizingVar_height/this.span.offsetHeight);
				scaleVar = parseInt(scaleVar * 100)  * 0.01;
			this.span.style.display = 'block';
			this.span.style.WebkitTransformOrigin = '0% 0%';
			this.span.style.WebkitTransform = "scale("+scaleVar+")";
			this.span.style.transformOrigin = '0% 0%';
			this.span.style.transform = "scale("+scaleVar+")";
		}
		this.div.style.WebkitTransformOrigin = '0% 0%';
		this.div.style.WebkitTransform = "scale(0.25)";
		this.div.style.transformOrigin = '0% 0%';
		this.div.style.transform = "scale(0.25)";
		this.place();
	}

	return this;
}

var PROfferImageObject = function () {

	prOfferNode.call(this);
	this.prototype = Object.create(prOfferNode.prototype);
	this.prototype.constructor = this;

	this.currentImageType = '',
	this.image = null,

	this.privateInit = function (parentObj, layout) {
		this.type = "Image";
		this.div.style.cssText += "position:absolute;";
		(typeof this.layout["@x"] != "undefined" && !isNaN(parseInt(this.layout["@x"]))) && (this.X = parseInt(this.layout["@x"]));
		(typeof this.layout["@y"] != "undefined" && !isNaN(parseInt(this.layout["@y"]))) && (this.Y = parseInt(this.layout["@y"]));
		(typeof this.layout["@w"] != "undefined" && !isNaN(parseInt(this.layout["@w"])) && parseInt(this.layout["@w"]) > 0) && (this.width = parseInt(this.layout["@w"]));
		(typeof this.layout["@h"] != "undefined" && !isNaN(parseInt(this.layout["@h"])) && parseInt(this.layout["@h"]) > 0) && (this.height = parseInt(this.layout["@h"]));
		(typeof this.layout['@override'] != 'undefined' && this.layout['@override'] == 'none') && (this.currentImageType = 'overrided');
		PRGlobal.loadingElements.push({obj:this});
		this.loadingImage();
	},

	this.loadingImage = function(){
		if(this.image == null){
			this.image = new Image();
			this.image.onload = this.checkForImageLoaded.bind(this);
			this.image.onerror = this.imageLoadFail.bind(this);
			this.image.crossOrigin = "anonymous";
		}
        var srcName = '';
		if(typeof PRGlobal.imageOverride[this.name] != 'undefined' && PRGlobal.imageOverride[this.name].length > 0 && this.currentImageType == ''){
			srcName = PRGlobal.imageOverride[this.name];
			this.currentImageType = 'overrided';
		}else if(typeof(this.layout["@imagename"]) != "undefined" && this.layout["@imagename"] != "" && (this.currentImageType == '' || this.currentImageType == 'overrided')){
        	srcName = this.layout["@imagename"];
			this.currentImageType = 'regular';
		}else if (typeof(this.layout["@imagefailname"]) != "undefined" && this.layout["@imagefailname"] != ""){
        	srcName = this.layout["@imagefailname"];
			this.currentImageType = 'backup';
		}

		if (srcName.length == 0){
			this.currentImageType = this.currentImageType == 'overrided' ? 'regular' : this.currentImageType == 'regular' ? 'backup' : 'none';
			this.imageLoadFail();
		} else {
			this.image.src = srcName;
		}
	},

	this.checkForImageLoaded = function (e) {
		this.div.style.backgroundImage = 'url('+ this.image.src +')';
		this.div.style.backgroundRepeat = 'no-repeat';
		this.div.style.left = this.X +'px';
		this.div.style.top = this.Y +'px';
		(typeof this.layout["@sizeAlign"] != "undefined" && this.layout["@sizeAlign"] != "") && (this.div.style.backgroundSize = this.layout["@sizeAlign"]);

		if("160x600 300x600 300x250 728x90".search(String(this.image.width+'x'+this.image.height)) > -1)
			this.trimTransparentArea();
		else
			this.setImagePosition();
	},

	this.trimTransparentArea = function(){
		var canvas = document.createElement("canvas"),
			canvasW = this.image.height == 600 ? this.image.width == 160 ? 160 : 300 : this.image.height == 300 ? 150 : 180;
			canvasH = this.image.height == 600 ? 150 : this.image.height == 250 ? 120 : 90;
			canvas.width = canvasW;
			canvas.height = canvasH;
		var ctx = canvas.getContext("2d");
			ctx.drawImage(this.image, 0, 0);
		var topMargin = canvasH, leftMargin = canvasW, bottomMargin = 0, rightMargin = 0, pixelData, i = 0, j = 0;

		for(i=0; i < canvas.width; i+=2){
			for( j=0; j < canvas.height; j+=2){
				pixelData = ctx.getImageData(i, j, 1, 1);
				if(pixelData.data[3] == 0)
					continue;
				leftMargin = Math.min(leftMargin, i-2);
				rightMargin = Math.max(rightMargin, i+2);
				topMargin = Math.min(topMargin, j-2);
				bottomMargin = Math.max(bottomMargin, j+2);
			}
		}

		var imageSize = {width:rightMargin - leftMargin, height:bottomMargin-topMargin, top:-topMargin, left:-leftMargin };
		(this.width == 0) && (this.width = imageSize.width);
		(this.height == 0) && (this.height = imageSize.height);

		var bgAlign = '';
		if(typeof this.layout["@imagex"] == "undefined" || this.layout["@imagex"] == ""){
			bgAlign += String(imageSize.left)+'px';
		}else if(this.layout["@imagex"] == 'left'){
			bgAlign += String(imageSize.left)+'px';
		}else if(this.layout["@imagex"] == 'center'){
			bgAlign += String((this.width - imageSize.width) * 0.5 + imageSize.left)+'px';
		}else if(this.layout["@imagex"] == 'right'){
			bgAlign += String(this.width + imageSize.left - imageSize.width)+'px';
		}

		bgAlign += ' ';
		if(typeof this.layout["@imagey"] == "undefined" || this.layout["@imagey"] == ""){
			bgAlign += String(imageSize.top)+'px';
		}else if(this.layout["@imagey"] == 'top'){
			bgAlign += String(imageSize.top)+'px';
		}else if(this.layout["@imagey"] == 'center'){
			bgAlign += String((this.height - imageSize.height) * 0.5 + imageSize.top)+'px';
		}else if(this.layout["@imagey"] == 'bottom'){
			bgAlign += String(this.height + imageSize.top - imageSize.height)+'px';
		}

		this.div.style.backgroundPosition = bgAlign;
		this.div.style.cssText += 'width:'+ this.width +'px; height:'+ this.height +'px;';
		this.isPlaced = true;
	},

	this.setImagePosition = function(){
		var bgAlign = (typeof this.layout["@imagex"] != "undefined" && this.layout["@imagex"] != "") ? ' '+this.layout["@imagex"] : ' center';
			bgAlign +=(typeof this.layout["@imagey"] != "undefined" && this.layout["@imagey"] != "") ? ' '+this.layout["@imagey"] : ' center';
		this.div.style.backgroundPosition = bgAlign;

		if(this.width == 0)
			this.width = this.image.width;
		else if(this.width < this.image.width && PRGlobal['offerType'] != 'generic')
			this.div.style.backgroundSize = 'contain';

		if(this.height == 0)
			this.height = this.image.height;
		else if(this.height < this.image.height && PRGlobal['offerType'] != 'generic')
			this.div.style.backgroundSize = 'contain';

		this.div.style.cssText += 'width:'+ this.width +'px; height:'+ this.height +'px;';
		this.isPlaced = true;
	},

	this.imageLoadFail =function () {
		if(this.currentImageType == 'backup' || this.currentImageType == 'none')
			return this.isPlaced = true;
		else
			this.loadingImage();
	},

	this.reloadImage = function(){
		this.currentImageType = '';
		this.loadingImage();
	}

	return this;
}

var PROfferGraphicObject = function () {

	PROfferPlacer.call(this);
	this.prototype = Object.create(PROfferPlacer.prototype);
	this.prototype.constructor = this;

	this.privateInit = function (parentObj, layout) {
		this.type = "Graphic";
		var thisGraphicColor = (typeof this.layout["@graphicColor"] != "undefined" && this.layout["@graphicColor"] != "") ? this.layout["@graphicColor"].replace('0x', '#') : "#000000";
		this.div.style.cssText += "position:absolute;display:inline-block;background-color:"+thisGraphicColor+";";

		this.width = (typeof this.layout["@graphicWidth"]  != "undefined" && this.layout["@graphicWidth"] != "") ? parseInt(this.layout["@graphicWidth"]) : 1;
		this.height = (typeof this.layout["@graphicHeight"] != "undefined" && this.layout["@graphicHeight"] != "") ? parseInt(this.layout["@graphicHeight"]) : 1;
		this.div.style.cssText += "width:"+this.width+"px; height:"+this.height+"px;";

		(typeof this.layout["@x"] != "undefined" && this.layout["@x"] != "") && (this.X = this.layout["@x"]);
		(typeof this.layout["@y"] != "undefined" && this.layout["@y"] != "") && (this.Y = this.layout["@y"]);
		(typeof this.layout["@animation"] != "undefined") && this.setAnimation();
		this.place();//this.div.style.cssText += 'left:'+ this.X +'px;top:'+ this.Y +'px;';
	}

	return this;
}

var prOfferNode = function(){

	this.type = "",
	this.name = '',
	this.parent = null,
	this.layout = null,
	this.div = null,

	this.X = 0.0,
	this.Y = 0.0,
	this.width = 0,
	this.height = 0,

	this.isPlaced = false,

	this.init = function (parentObj, layout) {
		this.parent = parentObj;
		this.div = document.createElement("div");
		if (this.parent) {
			this.parent.addChild(this);
			this.parent.div.appendChild(this.div);
		} else {
			PRGlobal.mainDiv.appendChild(this.div);
		}

		this.layout = layout;
		if (typeof(layout["@name"]) != "undefined" && layout["@name"] != "") {
			this.name = layout["@name"];
			this.div.setAttribute("id",this.name);
		}else {
			var uniqID = parseInt(Math.random() * 1000000);
			this.name = "cont-" + uniqID;
			this.div.setAttribute("id","div-"+uniqID);
		}
		(typeof this.privateInit != 'undefined') && this.privateInit(parentObj, layout);
	},

	this.setWidthAndHeight = function(){

	},

	this.getX = function(){
		return this.X;
	},
	this.getY = function(){
		return this.Y;
	},
	this.getWidth = function(){
		return this.width;
	},
	this.getHeight = function(){
		return this.height;
	}
}

var PROfferPlacer = function(){

	prOfferNode.call(this);
	this.prototype = Object.create(prOfferNode.prototype);
	this.prototype.constructor = this;

	this.scale = 1.0,
	this.isSized = false,
	this.sizeValid = false,
	this.waiting = [],
	this.onPlace = [],
	this.onSize = [],

	this.place = function(){
		this.isSized = true;
		if(this.isPlaceable()){
			this.placeX();
			this.placeY();
			this.isPlaced = true;
			this.launchCustomEvent(this.onPlace);
		}
	},

	this.placeX = function(){
		this.X = 0;
		var xpad = parseInt(this.layout["@xpad"]) || 0;
		var relatedSibling = this.parent == null ? null : this.parent.getChildByName(this.layout["@xrelativeto"]);

		if(typeof this.layout["@x"] != "undefined"){
			if(relatedSibling == null){
				if (!isNaN(this.layout["@x"])){
					this.X = parseInt(this.layout["@x"]) + xpad;
				}else{
					switch(this.layout["@x"].toUpperCase()) {
						case "LEFT":
							this.X = xpad;
							break;
						case 'RIGHT':
							if (this.parent){
								if(this.parent.isSized)
									this.X = (this.parent.getWidth() * (1/this.parent.scale) - this.getWidth()) + xpad;
								else
									this.parent.addOnSize(this,"placeX");
							}
							break;
						case "CENTER":
							if (this.parent){
								if(this.parent.isSized)
									this.X = ((this.parent.getWidth() * (1/this.parent.scale) - this.getWidth()) / 2) + xpad;
								else
									this.parent.addOnSize(this,"placeX");
							}
							break;
					}
				}
			}else{
				if(!relatedSibling.isPlaced){
					this.addWaitingItem(relatedSibling);
					relatedSibling.addOnPlace(this, "checkForComplete", relatedSibling);
				}
				switch (this.layout["@x"].toUpperCase()){
					case "LEFT":
						this.X = relatedSibling.getX() - this.getWidth() + xpad;
						break;
					case "RIGHT":
						this.X = relatedSibling.getX() + relatedSibling.getWidth() + xpad;
					break;
					case "LEFTALIGN":
						this.X = relatedSibling.getX() + xpad;
						break;
					case "RIGHTALIGN":
						this.X = relatedSibling.getX() + (relatedSibling.getWidth() - this.getWidth()) + xpad;
						break;
					case "CENTER":
						this.X = relatedSibling.getX() + ((relatedSibling.getWidth() - this.getWidth()) / 2) + xpad;
						break;
				}
			}
		}
		this.setSizeInvalid();
		this.setWidthAndHeight();
		this.div.style.left = this.X +"px";
	},

	this.placeY = function(){
		this.Y = 0;
		var yPad = parseInt(this.layout["@ypad"]) || 0;
		var relatedSibling = this.parent == null ? null : this.parent.getChildByName(this.layout["@yrelativeto"]);

		if(typeof this.layout["@y"] != "undefined"){
			if(relatedSibling == null){
				if (!isNaN(this.layout["@y"])){
					this.Y = parseInt(this.layout["@y"]) + yPad;
				}else{
					switch (this.layout["@y"].toUpperCase()) {
						case "TOP":
							this.Y += yPad;
							break;
						case "BOTTOM":
							if (this.parent){
								if(this.parent.isSized)
									this.Y = (this.parent.getHeight() * (1/this.parent.scale) - this.getHeight()) + yPad;
								else
									this.parent.addOnSize(this,"placeY");
							}
							break;
						case "CENTER":
							if (this.parent){
								if(this.parent.isSized)
									this.Y = ((this.parent.getHeight() * (1/this.parent.scale) - this.getHeight()) / 2) + yPad;
								else
									this.parent.addOnSize(this,"placeY");
							}
							break;
					}
				}
			}else{
				if(!relatedSibling.isPlaced){
					this.addWaitingItem(relatedSibling);
					relatedSibling.addOnPlace(this, "checkForComplete", relatedSibling);
				}
				switch(this.layout["@y"].toUpperCase()){
					case "ABOVE":
						this.Y = relatedSibling.getY() - this.getHeight() + yPad;
						break;
					case "BELOW":
						this.Y = relatedSibling.getY() + relatedSibling.getHeight() + yPad;
						break;
					case "TOPALIGN":
						this.Y = relatedSibling.getY() + yPad;
						break;
					case "BOTTOMALIGN":
						this.Y = relatedSibling.getY() + (relatedSibling.getHeight() - this.getHeight()) + yPad;
						break;
					case "CENTER":
						this.Y = relatedSibling.getY() + ((relatedSibling.getHeight() - this.getHeight()) / 2) + yPad;
						break;
				}
			}
		}
		this.setSizeInvalid();
		this.setWidthAndHeight();
		this.div.style.top = this.Y +"px";
	},

	this.getWidth = function () {
		if (!this.sizeValid)
			this.setWidthAndHeight();

		return this.width * this.scale;
	},

	this.getHeight = function () {
		if(!this.sizeValid)
			this.setWidthAndHeight();
		return this.height * this.scale;
	},

	this.isPlaceable = function(){
		if (this.waiting.length == 0) {
			return true;
		} else {
			return false;
		}
	},

	this.addWaitingItem = function(obj) {
		for (var i=0; i < this.waiting.length; i++) {
			if (this.waiting[i].name == obj.name) {
				return;
			}
		}
		this.waiting.push(obj);
	},

	this.checkForComplete = function(obj) {
		for (var i=0; i < this.waiting.length; i++) {
			if (this.waiting[i] == obj) {
				this.waiting.splice(i,1);
			}
		}
		if (this.isPlaceable()){
			this.place();
		}
	},

	this.addOnPlace = function(obj,fnName, args) {
		for (var i = 0; i < this.onPlace.length; i++) {
			if (this.onPlace[i]["obj"] === obj && this.onPlace[i]["fnName"] === fnName){
				return;
			}
		}
		if (typeof(args) != "undefined") {
			this.onPlace.push({obj:obj, fnName:fnName, args:args});
		} else {
			this.onPlace.push({obj:obj, fnName:fnName});
		}
	},

	this.addOnSize = function(obj,fnName) {
		for (var i = 0; i < this.onSize.length; i++) {
			if (this.onSize[i]["obj"] === obj && this.onSize[i]["fnName"] === fnName){
				return;
			}
		}
		this.onSize.push({obj:obj, fnName:fnName});
	},

	this.launchCustomEvent = function(eventArr) {
		var arr = eventArr;
		if (!arr) {
			arr = [];
		}
		for (var i = 0; i < arr.length; i++) {
			if (typeof(arr[i]["args"]) == "undefined") {
				arr[i]["obj"][arr[i]["fnName"]]();
			} else {
				arr[i]["obj"][arr[i]["fnName"]](arr[i]["args"]);
			}
		}
	},

	this.setSizeInvalid = function (){
		this.sizeValid = false;
		if (this.parent != null)
			this.parent["setSizeInvalid"]();
	},

	this.setAnimation = function(){
		if(typeof this.layout["@animation"] == "undefined" || this.layout["@animation"].length == 0)
			return;
		PRGlobal.animatingElements.push(this);
	},

	this.playAnimation = function(){
		for(var i=0, timeline = this.layout["@animation"].split('\n'); i < timeline.length; i++)
			setPrivateTimeline(this.div, this.X, this.Y, timeline[i]);

		function setPrivateTimeline(_elem, _x, _y, Val){
			var aniVal = Val.split(' '),
					aniName = aniVal[0],
					aniLength = (aniVal.length > 1) ? aniVal[1] : '0.5s',
					aniDelay = (aniVal.length > 2) ? aniVal[2] : '0s',
					aniEase = (aniVal.length > 3) ? aniVal[3] : 'linear';

			(aniName != 'bounce') && (_elem.style.opacity = '0');
			window.setTimeout(function(){
				setPrivateAnimation(_elem, _x, _y, aniName, aniLength, aniEase);
			}, Number(aniDelay.replace(/[A-Za-z]/gi, ''))*1000);
		}

		function setPrivateAnimation(_div, _x, _y, _name, _length, _ease){
			var aniProperty = ['opacity'], aniStyle = '';
			var aniScale = typeof WebKitCSSMatrix != 'undefined' ? new WebKitCSSMatrix(_div.style.transform).a : new MSCSSMatrix(_div.style.transform).a;
			if(_name == 'bounce'){
				aniStyle = '@keyframes '+_name+' { 50% { transform:scale('+ String(aniScale * 1.5) +')} }';
				var keyframeNode = document.createElement("style");
						keyframeNode.type = "text/css";
						keyframeNode.appendChild( document.createTextNode(aniStyle) );
				document.getElementsByTagName('head')[0].appendChild(keyframeNode);
				_div.style.animation = _name+' '+_length+' '+_ease;
			}else{
				switch(_name){
					case 'moveup':
						aniProperty.push('top');
						_div.style.top = String(_y+10)+"px";
						break;
					case 'movedown':
						aniProperty.push('top');
						_div.style.top = String(_y-10)+"px";
						break;
					case 'moveleft':
						aniProperty.push('left');
						_div.style.left = String(_x+10)+"px";
						break;
					case 'moveright':
						aniProperty.push('left');
						_div.style.left = String(_x-10)+"px";
						break;
					case 'zoomin':
						aniProperty.push('transform');
						_div.style.transform = 'scale('+ String(aniScale * 1.25) +')';
						break;
					case 'zoomout':
						aniProperty.push('transform');
						_div.style.transform = 'scale('+ String(aniScale * 0.75) +')';
						break;
					case 'centerin':
						aniProperty.push('transform');
						_div.style.transform = 'scale('+ String(aniScale * 0.1) +', '+ String(aniScale) +')';
						break;
					case 'leftin':
						aniProperty.push('transform');
						_div.style.transform = 'scale('+ String(aniScale * 0.1) +', '+ String(aniScale) +')';
						_div.style.transformOrigin = '0% 50%';
						break;
					case 'rightin':
						aniProperty.push('transform');
						_div.style.transform = 'scale('+ String(aniScale * 0.1) +', '+ String(aniScale) +')';
						_div.style.transformOrigin = '100% 50%';
						break;
				}
				for(var i=0; i < aniProperty.length; i++){
					(aniStyle.length > 0) && (aniStyle +=', ');
					aniStyle += aniProperty[i]+' '+_length+' '+_ease;
				}
				window.setTimeout(function(){
					_div.style.transition = aniStyle;
					_div.style.top = _y+"px";
					_div.style.left = _x +"px";
					_div.style.transform = 'scale('+ String(aniScale) +')';
					_div.style.opacity = '1';
				}, 200);
		}
		}
	}
}


var Chrysler_WinFontAdjustment = Boolean(navigator.userAgent.search('Mac') == -1);
var Chrysler_fontMargins = {
	"Verlag-Regular": {
		height: 100,
		em: 1,
		top: [
			{ pattern: new RegExp(/Q|A|B|C|D|G|M|N|O|P|R|S|W|f/), value: 5 },
			{ pattern: new RegExp(/J|E|F|H|I|K|L|T|U|V|X|Y|Z|b|d|h|k|l|\†/), value: 7 },
			{ pattern: new RegExp(/j|i/), value: 18 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z/), value: 37 },
			{ pattern: new RegExp(/t/), value: 25 },
			{ pattern: new RegExp(/1|2|3|4|5|6|7|8|9|0|\%/), value: 21 },
			{ pattern: new RegExp(/\,|\./), value: 70 },
			{ pattern: new RegExp(/\;|\:/), value: 43 },
			{ pattern: new RegExp(/\$/), value: 15 },
			{ pattern: new RegExp(/\+/), value: 34 },
			{ pattern: new RegExp(/\-/), value: 52 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|M|O|p|b|h|i|k|l|m|n|r|u|5|6|8|9|0|\,|\;|\.|\:|\%|\+|\-/), value: 6 },
			{ pattern: new RegExp(/J|A|S|T|V|W|X|Y|y|f|t|s|v|w|x|z|2|4|\†/), value: 2 },
			{ pattern: new RegExp(/j/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|K|L|N|P|R|U/), value: 8 },
			{ pattern: new RegExp(/Z|g|q|d|a|c|e|o|1|3|7|\$/), value: 4 }
		],
		right: [
			{ pattern: new RegExp(/Q|j|B|D|F|O|S|Z|g|p|q|b|d|h|i|a|e|m|n|o|s|u|2|5|6|8|9|0|\,|\;|\.|\:|\$|\%|\+|\-|\†/), value: 5 },
			{ pattern: new RegExp(/J|E|G|H|I|M|N|U|l/), value: 8 },
			{ pattern: new RegExp(/A|K|P|R|V|W|y|f|k|t|c|r|v|w|x|4|7/), value: 1 },
			{ pattern: new RegExp(/C|L|T|X|Y|z|3/), value: 3 },
			{ pattern: new RegExp(/1/), value: 11 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|J|C|G|N|O|S|U|V|W|v|w|3|5|6|8|9|0|\%/), value: 18 },
			{ pattern: new RegExp(/j|g|p|q|y/), value: 0 },
			{ pattern: new RegExp(/A|B|D|E|F|H|I|K|L|M|P|R|T|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|x|z|1|2|4|7|\.|\:/), value: 20 },
			{ pattern: new RegExp(/\,|\;/), value: 9 },
			{ pattern: new RegExp(/\$/), value: 13 },
			{ pattern: new RegExp(/\+/), value: 32 },
			{ pattern: new RegExp(/\-/), value: 41 },
			{ pattern: new RegExp(/\†/), value: 36 }
		]
	},
	"Verlag-Bold": {
		height: 100,
		em: 1,
		top: [
			{ pattern: new RegExp(/Q|A|B|C|D|G|M|N|O|P|R|S|W|f/), value: Chrysler_WinFontAdjustment ? 12 : 4 },
			{ pattern: new RegExp(/J|E|F|H|I|K|L|T|U|V|X|Y|Z|b|d|h|k|l|\†/), value: Chrysler_WinFontAdjustment ? 14 : 6 },
			{ pattern: new RegExp(/j|i/), value: Chrysler_WinFontAdjustment ? 23 : 15 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z/), value: Chrysler_WinFontAdjustment ? 43 : 35 },
			{ pattern: new RegExp(/t|3|5|7/), value: Chrysler_WinFontAdjustment ? 30 : 22 },
			{ pattern: new RegExp(/1|2|4|6|8|9|0|\%/), value: Chrysler_WinFontAdjustment ? 27 : 19 },
			{ pattern: new RegExp(/\,|\./), value: Chrysler_WinFontAdjustment ? 75 : 67 },
			{ pattern: new RegExp(/\;|\:/), value: Chrysler_WinFontAdjustment ? 48 : 40 },
			{ pattern: new RegExp(/\$/), value: Chrysler_WinFontAdjustment ? 20 : 12 },
			{ pattern: new RegExp(/\+/), value: Chrysler_WinFontAdjustment ? 41 : 33 },
			{ pattern: new RegExp(/\-/), value: Chrysler_WinFontAdjustment ? 58 : 50 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|M|O|p|b|h|i|k|l|m|n|r|u|5|6|7|8|9|0|\,|\;|\.|\:|\%|\+|\-/), value: 6 },
			{ pattern: new RegExp(/J|S|T|V|W|X|Y|Z|f|t|a|s|w|x|z|1|2|4/), value: 2 },
			{ pattern: new RegExp(/j|A|y|v/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|K|L|N|P|R|U/), value: 8 },
			{ pattern: new RegExp(/g|q|d|c|e|o|3|\$|\†/), value: 4 }
		],
		right: [
			{ pattern: new RegExp(/Q|j|B|C|D|G|O|S|g|p|q|b|d|h|i|l|a|e|m|n|o|u|2|3|5|6|8|9|0|\,|\;|\$|\%|\-|\†/), value: 5 },
			{ pattern: new RegExp(/J|E|H|I|M|N|U|\.|\:|\+/), value: 8 },
			{ pattern: new RegExp(/A|K|R|V|W|X|Y|y|f|k|t|c|r|v|w|x|z|7/), value: 1 },
			{ pattern: new RegExp(/F|L|P|T|Z|s|4/), value: 3 },
			{ pattern: new RegExp(/1/), value: 11 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|J|C|G|N|O|S|U|V|W|v|w|3|5|6|9|\%/), value: Chrysler_WinFontAdjustment ? 11 : 19 },
			{ pattern: new RegExp(/j|g|p|q|y/), value: Chrysler_WinFontAdjustment ? -8 : 0 },
			{ pattern: new RegExp(/A|B|D|E|F|H|I|K|L|M|P|R|T|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|x|z|1|2|4|7|8|0|\.|\:/), value: Chrysler_WinFontAdjustment ? 17 : 21 },
			{ pattern: new RegExp(/\,|\;/), value: Chrysler_WinFontAdjustment ? 1 : 9 },
			{ pattern: new RegExp(/\$/), value: Chrysler_WinFontAdjustment ? 5 : 13 },
			{ pattern: new RegExp(/\+/), value: Chrysler_WinFontAdjustment ? 25 : 33 },
			{ pattern: new RegExp(/\-/), value: Chrysler_WinFontAdjustment ? 34 : 42 },
			{ pattern: new RegExp(/\†/), value: Chrysler_WinFontAdjustment ? 28 : 36 }
		]
	},
	"Trade-Gothic-Condensed-No-18": {
		height: 100,
		em: 1,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|t|U|V|W|X|Y|Z|b|d|f|h|i|k|l|1|2|3|4|5|6|7|8|9|0|\$|\%|\†/), value: 0 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\+/), value: 19 },
			{ pattern: new RegExp(/\,|\./), value: 62 },
			{ pattern: new RegExp(/\;|\:/), value: 35 },
			{ pattern: new RegExp(/\-/), value: 43 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|K|M|N|O|P|S|Z|g|q|d|a|c|e|o|s|2|3|5|6|7|8|9|0|\$|\%|\+|\-/), value: 5 },
			{ pattern: new RegExp(/J|j|A|T|W|y|t|x/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|L|R|U|p|b|h|i|k|l|m|n|r|u|\,|\;|\.|\:|\†/), value: 7 },
			{ pattern: new RegExp(/V|X|Y|f|v|w|z|4/), value: 2 },
			{ pattern: new RegExp(/1/), value: 11 }
		],
		right: [
			{ pattern: new RegExp(/Q|E|F|L|P|S|V|X|Y|Z|g|f|k|t|e|o|v|w|z|4|8|\$|\+/), value: 3 },
			{ pattern: new RegExp(/J|j|B|D|G|H|I|M|N|R|U|q|d|h|i|l|a|n|u|2|3|7|\,|\;|\.|\:|\†/), value: 7 },
			{ pattern: new RegExp(/A|K|T|W|y|r|x/), value: 1 },
			{ pattern: new RegExp(/C|O|p|b|c|s|5|6|9|0|\-/), value: 5 },
			{ pattern: new RegExp(/m|1|\%/), value: 9}
		],
		bottom: [
			{ pattern: new RegExp(/Q/), value: 23 },
			{ pattern: new RegExp(/J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%|\+/), value: 27 },
			{ pattern: new RegExp(/j|g|p|q|y/), value: 11 },
			{ pattern: new RegExp(/\,|\;/), value: 13 },
			{ pattern: new RegExp(/\$/), value: 17 },
			{ pattern: new RegExp(/\-/), value: 51 },
			{ pattern: new RegExp(/\†/), value: 20 }
		]
	},
	"Trade-Gothic-Bold-Condensed-No-20": {
		height: 103,
		em: 0.93,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|1|2|3|4|5|6|7|8|9|0|\%|\†/), value: 13 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z/), value: 31 },
			{ pattern: new RegExp(/t/), value: 17 },
			{ pattern: new RegExp(/\,|\./), value: 61 },
			{ pattern: new RegExp(/\;|\:/), value: 34 },
			{ pattern: new RegExp(/\$/), value: 6 },
			{ pattern: new RegExp(/\+/), value: 35 },
			{ pattern: new RegExp(/\-/), value: 54 }
		],
		left: [
			{ pattern: new RegExp(/Q|B|C|D|E|F|G|H|K|L|M|N|O|P|R|U|Z|p|q|b|d|h|i|k|l|c|e|m|n|o|r|u|2|3|5|6|7|8|9|0|\,|\;|\.|\:|\%|\+|\-|\†/), value: 6 },
			{ pattern: new RegExp(/J|j|A|T|V|W|X|Y|g|y|f|t|v|w|x|4/), value: 1 },
			{ pattern: new RegExp(/I|1/), value: 8 },
			{ pattern: new RegExp(/S|a|s|z|\$/), value: 3 }
		],
		right: [
			{ pattern: new RegExp(/Q|E|F|L|P|R|S|T|W|X|Z|g|y|f|k|t|r|s|v|x|z|2|4|\$/), value: 3 },
			{ pattern: new RegExp(/J|C|D|G|H|I|M|N|O|U|i|l|m|7|\%|\†/), value: 7 },
			{ pattern: new RegExp(/j|B|p|q|b|d|h|a|c|e|n|o|u|3|5|6|8|9|0|\,|\;|\.|\:|\+|\-/), value: 5 },
			{ pattern: new RegExp(/A|K|V|Y|w/), value: 1 },
			{ pattern: new RegExp(/1/), value: 16 }
		],
		bottom: [
			{ pattern: new RegExp(/Q/), value: 9 },
			{ pattern: new RegExp(/J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%|\+/), value: 13 },
			{ pattern: new RegExp(/j|g|p|q|y|\,|\;|\$/), value: 0 },
			{ pattern: new RegExp(/\-/), value: 37 },
			{ pattern: new RegExp(/\†/), value: 6 }
		]
	},
	"Cheap-Pine-Regular": {
		height: 100,
		em: 1.11,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 4 : 14	},
			{ pattern: new RegExp(/\,|\./), value: navigator.userAgent.search('Firefox') > -1 ? 64 :74 },
			{ pattern: new RegExp(/\;|\:/), value: navigator.userAgent.search('Firefox') > -1 ? 26 : 36 },
			{ pattern: new RegExp(/\$|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 2 : 12 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 22 : 32 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 33 : 43 }
		],
		left: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\,|\;|\.|\:|\$|\%|\+|\†/), value: 4 },
			{ pattern: new RegExp(/\-/), value: 6	}
		],
		right: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|I|K|L|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|2|3|4|5|6|7|8|9|0|\,|\;|\.|\:|\$|\%|\+|\-|\†/), value: 4 },
			{ pattern: new RegExp(/H|M|N/), value: 6 },
			{ pattern: new RegExp(/1/), value: 2 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|q|\,|\;/), value: navigator.userAgent.search('Firefox') > -1 ? 12 : 2 },
			{ pattern: new RegExp(/J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 25 : 15 },
			{ pattern: new RegExp(/\$|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 20 : 10	},
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 47 : 37 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 58 : 48 }
		]
	},
	"Cheap-Pine-Bold": {
		height: 100,
		em: 1.11,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 3 : 13	},
			{ pattern: new RegExp(/\,|\./), value: navigator.userAgent.search('Firefox') > -1 ? 64 : 74	},
			{ pattern: new RegExp(/\;|\:/), value: navigator.userAgent.search('Firefox') > -1 ? 26 : 36	},
			{ pattern: new RegExp(/\$|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 2 : 12 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 22 : 32 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 33 : 43 }
		],
		left: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\,|\;|\.|\:|\$|\%|\+|\†/), value: 4 },
			{ pattern: new RegExp(/\-/), value: 6 }
		],
		right: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|I|K|L|O|P|R|S|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|2|3|4|5|6|7|8|9|0|\,|\;|\.|\:|\$|\%|\+|\-|\†/), value: 4 },
			{ pattern: new RegExp(/H|M|N/), value: 6 },
			{ pattern: new RegExp(/1/), value: 2 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|q|\,|\;/), value: navigator.userAgent.search('Firefox') > -1 ? 12 : 2 },
			{ pattern: new RegExp(/J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|g|p|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 25 : 15 },
			{ pattern: new RegExp(/\$/),	value: navigator.userAgent.search('Firefox') > -1 ? 20 : 10	},
			{ pattern: new RegExp(/\†/),	value: navigator.userAgent.search('Firefox') > -1 ? 10 : 0	},
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 47 : 37 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 58 : 48 }
		]
	},
	"Gotham-Regular": {
		height: 100,
		em: 0.78,
		top: [
			{ pattern: new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|1|2|3|4|5|6|7|8|9|0|\%|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 4 : 14 },
			{ pattern: new RegExp(/j|b|d|f|h|i|k|l/), value: navigator.userAgent.search('Firefox') > -1 ? 2 : 12 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value: navigator.userAgent.search('Firefox') > -1 ? 24 : 34 },
			{ pattern: new RegExp(/t/), value: navigator.userAgent.search('Firefox') > -1 ? 8 : 18 },
			{ pattern: new RegExp(/\,|\./), value: navigator.userAgent.search('Firefox') > -1 ? 61 : 71 },
			{ pattern: new RegExp(/\$/), value: navigator.userAgent.search('Firefox') > -1 ? 0 : 10 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 15 : 25 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 38 : 48 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|O|S|Z|g|q|d|c|e|o|u|z|2|3|5|6|7|8|9|0|\.|\$|\%|\-|\†/), value: 6 },
			{ pattern: new RegExp(/J|A|T|V|W|X|Y|y|f|t|a|s|v|w|x|1|4|\,|\;/), value: 3 },
			{ pattern: new RegExp(/j/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|K|L|M|N|P|R|U|p|b|h|i|k|l|m|n|r|\:|\+/), value: 9 }
		],
		right: [
			{ pattern: new RegExp(/Q|B|C|D|E|F|G|O|S|T|W|Z|p|b|h|t|e|n|o|s|z|2|3|4|5|6|7|8|9|0|\,|\.|\$|\%|\-|\†/), value: 6 },
			{ pattern: new RegExp(/J|j|H|N|U|g|q|d|i|l|a|m|u|\;|\:|\+/), value: 8 },
			{ pattern: new RegExp(/A|K|L|P|R|V|X|Y|y|c|r|v|w|x/), value: 4 },
			{ pattern: new RegExp(/I|M|1/), value: 10 },
			{ pattern: new RegExp(/f|k/), value: 2 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 22 : 12 },
			{ pattern: new RegExp(/j|g|p|q|y/), value: navigator.userAgent.search('Firefox') > -1 ? 7 : -3 },
			{ pattern: new RegExp(/\,|\;/), value: navigator.userAgent.search('Firefox') > -1 ? 11 : 1 },
			{ pattern: new RegExp(/\$/), value: navigator.userAgent.search('Firefox') > -1 ? 13 : 3 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 34 : 24 },
			{ pattern: new RegExp(/\-|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 47 : 37 }
		]
	},
	"Gotham-Bold": {
		height: 100,
		em: 0.78,
		top: [
			{ pattern: new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|1|2|3|4|5|6|7|8|9|0|\%|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 4 : 14 },
			{ pattern: new RegExp(/j|b|d|f|h|i|k|l/), value: navigator.userAgent.search('Firefox') > -1 ? 2 : 12 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value: navigator.userAgent.search('Firefox') > -1 ? 22 : 32	},
			{ pattern: new RegExp(/t/), value: navigator.userAgent.search('Firefox') > -1 ? 8 : 18 },
			{ pattern: new RegExp(/\,|\./), value: navigator.userAgent.search('Firefox') > -1 ? 59 : 69 },
			{ pattern: new RegExp(/\$/), value: navigator.userAgent.search('Firefox') > -1 ? 0 : 10 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 15 : 25 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 37 : 47 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|O|Z|g|p|q|b|d|h|k|c|e|m|n|o|r|u|z|2|5|6|7|8|9|0|\.|\:|\$|\%|\+|\-|\†/), value: 6 },
			{ pattern: new RegExp(/J|A|V|Y|y|t|s|v|w|x|1|\,/), value: 2 },
			{ pattern: new RegExp(/j/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|K|L|M|N|P|R|U|i|l/), value: 9 },
			{ pattern: new RegExp(/S|T|W|X|f|a|3|4|\;/), value: 4 }
		],
		right: [
			{ pattern: new RegExp(/Q|B|C|D|E|F|G|L|O|P|R|S|T|p|b|t|c|e|o|s|z|2|3|4|5|6|7|8|9|0|\$|\%|\-|\†/), value: 5 },
			{ pattern: new RegExp(/J|j|U|Z|g|q|d|h|i|l|a|m|n|u|\,|\;|\.|\:|\+/), value: 7 },
			{ pattern: new RegExp(/A|V|W|X|Y|y|f|r|v|w|x/), value: 3 },
			{ pattern: new RegExp(/H|I|M|N|1/), value: 9 },
			{ pattern: new RegExp(/K|k/), value: 1 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value: navigator.userAgent.search('Firefox') > -1 ? 24 : 12 },
			{ pattern: new RegExp(/j|g|p|q|y|\,|\;/), value: navigator.userAgent.search('Firefox') > -1 ? 7 : -5 },
			{ pattern: new RegExp(/\$/), value: navigator.userAgent.search('Firefox') > -1 ? 14 : 2 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 34 : 22 },
			{ pattern: new RegExp(/\-|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 48 : 36	}
		]
	},
	"Gill-Sans-Regular": {
		height: 108,
		em: 0.94,
		top:[
			{ pattern : new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|k|l|1|2|3|4|5|6|7|8|9|0|\$|\%|\†/), value:15},
			{ pattern : new RegExp(/j|i/), value:20},
			{ pattern : new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value:39},
			{ pattern : new RegExp(/t/), value:31},
			{ pattern : new RegExp(/\,/), value:71},
			{ pattern : new RegExp(/\./), value:73},
			{ pattern : new RegExp(/\+/), value:25},
			{ pattern : new RegExp(/\-/), value:57}
		],
		left:[
			{ pattern : new RegExp(/Q|C|G|O|S|p|b|d|i|e|m|s|5|6|7|\;|\.|\:|\$|\%/), value:5},
			{ pattern : new RegExp(/J|j|A|T|V|W|X|Y|Z|g|q|y|f|t|a|c|o|v|w|x|z|2|4|8|9|0|\,|\-|\†/), value:0},
			{ pattern : new RegExp(/B|D|E|F|H|I|K|L|M|N|P|R|U|h|k|l|n|r|u|3|\+/), value:8},
			{ pattern : new RegExp(/1/), value:21}
		],
		right:[
			{ pattern : new RegExp(/Q|C|D|O|q|d|i|m|\,|\;|\.|\:/), value:5},
			{ pattern : new RegExp(/J|j|G|H|I|M|N|U|h|l|n|u|3|5|\+/), value:8},
			{ pattern : new RegExp(/A|B|E|F|K|L|P|R|S|T|V|W|X|Y|Z|g|p|y|b|f|k|t|a|c|e|o|r|s|v|w|x|z|2|4|6|7|8|9|0|\$|\%|\-|\†/), value:0},
			{ pattern : new RegExp(/1/), value:20}
		],
		bottom:[
			{ pattern : new RegExp(/Q/), value:9},
			{ pattern : new RegExp(/J|j|g|p|q|y|\†/), value:5},
			{ pattern : new RegExp(/A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value:22},
			{ pattern : new RegExp(/\,|\;|\$/), value:11},
			{ pattern : new RegExp(/\+/), value:28},
			{ pattern : new RegExp(/\-/), value:40}
		]
	},
	"CgBauerBodoni-Regular": {
		height: 110,
		em: 0.9,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|2|3|4|5|6|8|9|0|\%|\†/), value: 6 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value: 34 },
			{ pattern: new RegExp(/t|\+/), value: 24 },
			{ pattern: new RegExp(/1|7/), value: 8 },
			{ pattern: new RegExp(/\,|\./), value: 67 },
			{ pattern: new RegExp(/\$/), value: 0 },
			{ pattern: new RegExp(/\-/), value: 51 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|E|G|H|I|K|N|O|S|Z|q|b|d|i|a|c|e|o|s|2|3|5|6|7|8|9|0|\$|\-/), value: 4 },
			{ pattern: new RegExp(/J|j|A|B|D|F|L|M|P|R|T|U|V|W|X|Y|g|p|y|f|h|k|l|t|m|n|r|u|v|w|x|z|4|\†/), value: 1 },
			{ pattern: new RegExp(/1|\,|\;/), value: 7 },
			{ pattern: new RegExp(/\.|\:/), value: 10 },
			{ pattern: new RegExp(/\%/), value: 15 },
			{ pattern: new RegExp(/\+/), value: 25 }
		],
		right: [
			{ pattern: new RegExp(/Q|C|D|E|H|I|O|S|p|q|b|d|c|e|o|2|3|4|5|6|7|8|9|0|\$|\-/), value: 4 },
			{ pattern: new RegExp(/J|A|F|G|K|R|U|V|X|Y|g|y|f|l|t|a|m|r|w|x/), value: 0 },
			{ pattern: new RegExp(/j|Z|\,|\;/), value: 6 },
			{ pattern: new RegExp(/B|L|M|N|P|T|W|h|i|k|n|s|u|v|z|\†/), value: 2 },
			{ pattern: new RegExp(/1/), value: 13 },
			{ pattern: new RegExp(/\.|\:/), value: 10 },
			{ pattern: new RegExp(/\%/), value: 15 },
			{ pattern: new RegExp(/\+/), value: 25 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|\,|\;/), value: 5 },
			{ pattern: new RegExp(/J/), value: 18 },
			{ pattern: new RegExp(/j|g|p|q|y/), value: 0 },
			{ pattern: new RegExp(/A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|0|\.|\:|\%|\+/), value: 25 },
			{ pattern: new RegExp(/9/), value: 23 },
			{ pattern: new RegExp(/\$/), value: 10 },
			{ pattern: new RegExp(/\-/), value: 43 },
			{ pattern: new RegExp(/\†/), value: 3 }
		]
	},
	"Gill-Sans-Bold": {
		height:108,
		em: 0.92,
		top: [
			{ pattern: new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|t|l|1|2|3|4|5|6|7|8|9|0|\$|\%|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 5 : 18 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value: navigator.userAgent.search('Firefox') > -1 ? 28 : 41 },
			{ pattern: new RegExp(/\+/), value: navigator.userAgent.search('Firefox') > -1 ? 13 : 26 },
			{ pattern: new RegExp(/\,|\./), value: navigator.userAgent.search('Firefox') > -1 ? 60 : 73 },
			{ pattern: new RegExp(/\-/), value: navigator.userAgent.search('Firefox') > -1 ? 44 : 57 }
		],
		left: [
			{ pattern: new RegExp(/Q|C|G|O|S|p|q|b|d|i|a|c|e|n|o|s|u|2|3|4|6|8|9|0|\,|\;|\.|\:|\$|\+|\-/), value: 5 },
			{ pattern: new RegExp(/J|j|A|V|W|X|Y|Z|y|v|w|x/), value: 0 },
			{ pattern: new RegExp(/B|D|E|F|H|I|K|L|M|N|P|R|U|h|k|l|m|r|5|7/), value: 8 },
			{ pattern: new RegExp(/T|g|f|t|z|\%|\†/), value: 3 },
			{ pattern: new RegExp(/1/), value: 20 }
		],
		right: [
			{ pattern: new RegExp(/Q|j|B|C|D|E|F|O|P|S|Z|p|q|b|d|h|i|c|e|n|o|u|2|4|6|7|8|9|0|\,|\;|\.|\:|\$|\+|\-/), value: 5 },
			{ pattern: new RegExp(/J|G|H|I|M|N|U|l|m|3|5/), value: 8 },
			{ pattern: new RegExp(/A|K|R|V|W|X|Y|g|y|f|k|t|a|r|v|w|x/), value: 1 },
			{ pattern: new RegExp(/L|T|s|z|\%|\†/), value: 3 },
			{ pattern: new RegExp(/1/), value: 21 }
		],
		bottom: [
			{ pattern: new RegExp(/Q/), value:  navigator.userAgent.search('Firefox') > -1 ? 18 : 5 },
			{ pattern: new RegExp(/\,|\;/), value: navigator.userAgent.search('Firefox') > -1 ? 15 : 2 },
			{ pattern: new RegExp(/j|g|p|q|y|\†/), value: navigator.userAgent.search('Firefox') > -1 ? 10 : 0 },
			{ pattern: new RegExp(/A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value:  navigator.userAgent.search('Firefox') > -1 ? 33 :20 },
			{ pattern: new RegExp(/\$/), value:  navigator.userAgent.search('Firefox') > -1 ? 20 : 7 },
			{ pattern: new RegExp(/\+/), value:  navigator.userAgent.search('Firefox') > -1 ? 43 : 30 },
			{ pattern: new RegExp(/\-/), value:  navigator.userAgent.search('Firefox') > -1 ? 50 : 37 }
		]
	},
	"Bodoni-Bold": {
		height: 100,
		em: 0.97,
		top: [
			{ pattern: new RegExp(/Q|J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|k|l|2|3|4|6|7|8|9|0|\%|\†/), value: 7 },
			{ pattern: new RegExp(/j|i/), value: 12 },
			{ pattern: new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value: 34 },
			{ pattern: new RegExp(/t/), value: 23 },
			{ pattern: new RegExp(/1/), value: 9 },
			{ pattern: new RegExp(/5/), value: 5 },
			{ pattern: new RegExp(/\,|\./), value: 61 },
			{ pattern: new RegExp(/\$/), value: 2 },
			{ pattern: new RegExp(/\+/), value: 30 },
			{ pattern: new RegExp(/\-/), value: 50 }
		],
		left: [
			{ pattern: new RegExp(/Q|B|C|D|E|G|H|I|K|O|P|R|S|b|a|c|e|o|s|z|2|3|5|6|8|9|0|\$|\%|\†/), value: 5 },
			{ pattern: new RegExp(/J|j|A|V|W|X|Y|f|h|i|k|l|m|u|w/), value: 0 },
			{ pattern: new RegExp(/F|L|M|N|T|U|Z|g|p|q|y|d|t|n|r|v|x|4|\+|\-/), value: 3 },
			{ pattern: new RegExp(/1/), value: 12 },
			{ pattern: new RegExp(/7|\,|\./), value: 7 },
			{ pattern: new RegExp(/\;|\:/), value: 9 }
		],
		right: [
			{ pattern: new RegExp(/Q|B|C|D|E|H|I|O|S|d|c|e|o|s|4|6|7|8|9|0|\;|\$|\†/), value: 5 },
			{ pattern: new RegExp(/J|F|G|L|M|N|P|T|U|Z|p|q|y|b|l|r|v|x|z|\+|\-/), value: 3 },
			{ pattern: new RegExp(/j|2|3|5|\,|\:/), value: 8 },
			{ pattern: new RegExp(/A|K|R|V|W|X|Y|g|f|h|i|k|t|a|m|n|u|w/), value: 1 },
			{ pattern: new RegExp(/1|\.|\%/), value: 11 }
		],
		bottom: [
			{ pattern: new RegExp(/Q|j|g|p|q|y/), value: 4 },
			{ pattern: new RegExp(/J/), value: 14 },
			{ pattern: new RegExp(/A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\+/), value: 25 },
			{ pattern: new RegExp(/\,|\;/), value: 8 },
			{ pattern: new RegExp(/\$|\†/), value: 11 },
			{ pattern: new RegExp(/\%/), value: 22 },
			{ pattern: new RegExp(/\-/), value: 40 }
		]
	},
	'Roboto-Medium':{
		height:105,
		em: 0.95,
		top:[
			{ pattern : new RegExp(/Q|j|A|C|G|O|S|b|d|f|h|i|k|l|1|2|3|4|5|6|8|9|0|\%|\†/), value:12},
			{ pattern : new RegExp(/J|B|D|E|F|H|I|K|L|M|N|P|R|T|t|U|V|W|X|Y|Z|7/), value:14},
			{ pattern : new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value:31},
			{ pattern : new RegExp(/\,|\./), value:73},
			{ pattern : new RegExp(/\$/), value:5},
			{ pattern : new RegExp(/\+/), value:24},
			{ pattern : new RegExp(/\-/), value:54}
		],
		left:[
			{ pattern : new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|T|U|V|W|X|Y|Z|g|p|q|y|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|u|v|w|x|z|2|4|5|6|7|9|0|\+|\-/), value:0},
			{ pattern : new RegExp(/S|s|3|8|\$|\†/), value:5},
			{ pattern : new RegExp(/1|\,|\./), value:12},
			{ pattern : new RegExp(/\;|\:/), value:9},
			{ pattern : new RegExp(/\%/), value:7}
		],
		right:[
			{ pattern : new RegExp(/Q|B|C|E|G|O|g|p|q|b|h|c|n|o|u|z|2|4|6|9|0|\:/), value:9},
			{ pattern : new RegExp(/J|P|a|e|3|5|7|8|\%|\†/), value:13},
			{ pattern : new RegExp(/j|A|D|H|I|K|L|M|N|T|U|V|W|X|Y|Z|y|f|i|k|l|t|r|v|w|x|\,/), value:0},
			{ pattern : new RegExp(/F|R|d|m|\;|\./), value:7},
			{ pattern : new RegExp(/S|1/), value:18},
			{ pattern : new RegExp(/s/), value:16},
			{ pattern : new RegExp(/\$/), value:11},
			{ pattern : new RegExp(/\+|\-/), value:5}
		],
		bottom:[
			{ pattern : new RegExp(/Q/), value:14},
			{ pattern : new RegExp(/J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%/), value:20},
			{ pattern : new RegExp(/j|g|p|q|y/), value:0},
			{ pattern : new RegExp(/\,|\;|\†/), value:5},
			{ pattern : new RegExp(/\$/), value:10},
			{ pattern : new RegExp(/\+/), value:29},
			{ pattern : new RegExp(/\-/), value:43}
		]
	},
	'Roboto-Regular':{
		height:110,
		em: 0.9,
		top:[
			{ pattern : new RegExp(/Q|J|j|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|i|1|2|3|4|5|6|7|8|9|0|\%|\†/), value:17},
			{ pattern : new RegExp(/g|p|q|y|a|c|e|m|n|o|r|s|u|v|w|x|z|\;|\:/), value:35},
			{ pattern : new RegExp(/b|d|f|h|k|l/), value:13},
			{ pattern : new RegExp(/t/), value:23},
			{ pattern : new RegExp(/\,|\./), value:78},
			{ pattern : new RegExp(/\$/), value:6},
			{ pattern : new RegExp(/\+/), value:30},
			{ pattern : new RegExp(/\-/), value:54}
		],
		left:[
			{ pattern : new RegExp(/Q|C|G|O|U|Z|g|p|q|b|d|h|i|k|a|c|e|m|n|o|r|s|u|z|2|3|6|8|9|0|\:|\$|\%/), value:6},
			{ pattern : new RegExp(/J|j|A|S|T|V|W|X|Y|y|f|t|v|w|x|4|7|\,|\;|\+|\-|\†/), value:0},
			{ pattern : new RegExp(/B|D|E|F|H|I|K|L|M|N|P|R|l|1|5|\./), value:9}
		],
		right:[
			{ pattern : new RegExp(/Q|J|j|B|D|G|M|O|U|g|q|d|h|i|l|a|m|n|s|u|3|8|9|0|\.|\:|\$/), value:7},
			{ pattern : new RegExp(/A|E|F|K|L|P|R|S|T|V|W|X|Y|Z|y|f|k|t|c|e|r|v|w|x|z|2|4|5|\-|\†/), value:0},
			{ pattern : new RegExp(/C|p|b|o|6|7|\,|\;|\%|\+/), value:5},
			{ pattern : new RegExp(/H|I|N/), value:9},
			{ pattern : new RegExp(/1/), value:21}
		],
		bottom:[
			{ pattern : new RegExp(/Q|\$/), value:10},
			{ pattern : new RegExp(/J|A|B|C|D|E|F|G|H|I|K|L|M|N|O|P|R|S|T|U|V|W|X|Y|Z|b|d|f|h|i|k|l|t|a|c|e|m|n|o|r|s|u|v|w|x|z|1|2|3|4|5|6|7|8|9|0|\.|\:|\%|\†/), value:28},
			{ pattern : new RegExp(/j|g|p|q|y/), value:0},
			{ pattern : new RegExp(/\,|\;/), value:7},
			{ pattern : new RegExp(/\+/), value:29},
			{ pattern : new RegExp(/\-/), value:38}
		]
	}
}
