 /*
	Chrysler Endframe
	by Heajin Seo. Nov.2016
*/


function loadingFeedLibrary(){
	if(typeof Chrysler_feeds == 'undefined')
		return window.setTimeout(loadingFeedLibrary, 100);
	Chrysler_feeds.init(endFrameFeedInput);
}

function loadOfferBuilder(_message){
	if(_message == 'OfferLoadingComplete')
		return initiateLogoAnimation();

	if(typeof PROfferRenderer == 'undefined' || typeof setLegalCopy == 'undefined' || !endFrameAssetsLoadingDone)
		return window.setTimeout(loadOfferBuilder, 100);

	endFrameOfferInput['itemJSON'] = Chrysler_feeds['offerData'];
	endFrameOfferInput['layoutJSON'] = Chrysler_feeds['layoutData'];
	endFrameOfferInput['offerType'] = Chrysler_feeds['offerType'];

	if(Chrysler_feeds['offerType'] == 'generic'){
		(endFrameImages['logoImage'].search('_white') > -1) && (endFrameImages['logoImage'] = endFrameImages['logoImage'].replace('_white', ''));
		if(Chrysler_SVdata['Size'] == '300x600'){
			endFrameOfferInput['stageSize'] = '300x600';
			endFrameOfferInput['offerSize'] = '300x600';
		}
	}else{
		(endFrameImages['logoImage'].length == 0 && valueValidator(Chrysler_SVdata['OfferFrameLogo'])) && (endFrameImages['logoImage'] = Chrysler_SVdata['OfferFrameLogo']);
		endFrameOfferInput['imageOverride'] = endFrameImages;
		endFrameOfferInput['source'] = Chrysler_feeds['source'];
		endFrameOfferInput['dma'] = Chrysler_feeds['dma'];
	}

	PROfferRenderer(endFrameOfferInput);
	setLegalCopy();
}

function endFrameOfferBuildingComplete(){
	if(Chrysler_feeds['offerType'] == 'generic'){
		document.getElementById('Chrysler_OfferFrame').style.background = '#FFF';
		document.getElementById('Chrysler_offerContainer').style.color = '#000';
		document.getElementById('Chrysler_LegalBtn').setAttribute('class', Chrysler_SVdata['Language'] == 'esp' ? 'ES' : 'EN');
		(Chrysler_SVdata['Size'] == '300x600') && (document.getElementById('Chrysler_offerContainer').style.top = '0px');
	}else{
		customOfferLayout();
	}
	(typeof privateCustomOfferLayout != 'undefined') && privateCustomOfferLayout();
	isOfferFrameReady = true;
}

function initOfferAnimation(){
	for(var i = 0; typeof PRGlobal != 'undefined' && i < PRGlobal.animatingElements.length; i++)
		PRGlobal.animatingElements[i].playAnimation();
}


function customOfferLayout(){

	if(document.getElementById('Chrysler_offerContainer') == null || Chrysler_SVdata['Size'] == '300x600')
		return;

	var elements = [];
	var stage = { '160x600':{width:160, height:490}, '300x250':{width:300, height:210}, '728x90':{width:580, height:90}	};

	for(var children = document.getElementById('Chrysler_offerContainer').children, i=0; i < children.length; i++)
		elements.push(children[i].id);

	var isNotOverlapping = collisionDetect(stage[Chrysler_SVdata['Size']], elements);
	if(isNotOverlapping)
		return;

	switch(Chrysler_SVdata['Size']){
		case '160x600':
			alignEndFrameElement_160x600(stage[Chrysler_SVdata['Size']].height);
			break;
		case '300x250':
			alignEndFrameElement_300x250(stage[Chrysler_SVdata['Size']].height);
			break;
		case '728x90':
			alignEndFrameElement_728x90(stage[Chrysler_SVdata['Size']].width);
			break;
	}
}

function collisionDetect(_stage, _elements){
	var elem, rectangles = [], clear = true;
	for(var i=0; i < _elements.length; i++){
		elem = document.getElementById(_elements[i]);
		(elem != null) && rectangles.push({id:_elements[i], x:elem.offsetLeft, y:elem.offsetTop, w:elem.offsetWidth, h:elem.offsetHeight});
	}

	for(i = 0; i < rectangles.length; i++){
		if(!detecting(rectangles[i])){
			console.log(rectangles[i].id +' is collapsed with others.');
			return false;
		}
	}

	function detecting(_t){
		if(_t.w * _t.h == 0 || _t.x + _t.w > _stage.width || _t.y + _t.h > _stage.height)
			return false;

		for(var j=0; j < rectangles.length; j++){
			if(rectangles[j].id == _t.id)
				continue;
			if('logoImage carImage'.search(rectangles[j].id) > -1 && 'logoImage carImage'.search(_t.id) > -1 && _stage.width == 300 && _stage.height < 300)
				continue;

			if(rectangles[j].x < _t.x + _t.w && rectangles[j].x + rectangles[j].w > _t.x && rectangles[j].y < _t.y + _t.h && rectangles[j].y + rectangles[j].h > _t.y)
				return false;
		}
		return true;
	}
	return true;
}

function alignEndFrameElement_160x600(_H){

	var children = document.getElementById('Chrysler_offerContainer').children,
		childrenNum = 0, availableH = _H, margin = 0, divTop = 0, offerScaleVar = 1,
		offerDIV = document.getElementById('offerMainContainer'),
		offerParentDiv = offerDIV.parentNode;

	try{
		if(typeof WebKitCSSMatrix != 'undefined'){
			offerScaleVar = new WebKitCSSMatrix(offerDIV.style.webkitTransform).a;
		}else if(typeof MSCSSMatrix != 'undefined'){
			offerScaleVar = new MSCSSMatrix(offerDIV.style.transform).a;
		}
	}catch(e){ }

	for(var i=0; i < children.length; i++){
		if(children[i].offsetHeight > 0){
			availableH -= ('logoImage carImage carNameConstraint'.search(children[i].id) == -1)? children[i].firstChild.offsetHeight * offerScaleVar : children[i].offsetHeight;
			childrenNum++;
		}
	}

	if(availableH < 0)
		document.getElementById('carImage').style.height = String(document.getElementById('carImage').offsetHeight + availableH) + 'px';
	else
		margin = availableH / childrenNum;

	document.getElementById('logoImage').style.top = margin+'px';
	divTop += document.getElementById('logoImage').offsetHeight + margin * 2;

	document.getElementById('carNameConstraint').style.top = divTop+'px';
	divTop += document.getElementById('carNameConstraint').offsetHeight + margin;

	offerParentDiv.style.top = String(divTop - offerDIV.offsetTop) +'px';
	divTop += offerDIV.offsetHeight * offerScaleVar + margin;

	document.getElementById('carImage').style.top = divTop+'px';
	divTop += document.getElementById('carImage').offsetHeight + margin;
}

function alignEndFrameElement_300x250(_H){

	var logoH = document.getElementById('logoImage').offsetHeight,
		children = document.getElementById('Chrysler_offerContainer').children,
		availableH = _H, childrenNum = 3, margin = 0, divTop = 0, offerDIV;
	for(var i=0; i < children.length; i++){
		if('logoImage carImage carNameConstraint'.search(children[i].id) == -1)
			offerDIV = children[i];
	}
	availableH -= Math.max(logoH, document.getElementById('carImage').offsetHeight);
	availableH -= document.getElementById('carNameConstraint').offsetHeight;
	if(typeof offerDIV != 'undefined'){
		availableH -= offerDIV.offsetHeight;
		childrenNum++;
	}

	if(availableH < 0){
		var carImageHeight = _H - document.getElementById('carNameConstraint').offsetHeight - (typeof offerDIV != 'undefined' ? offerDIV.offsetHeight : 0) - 10;
		(document.getElementById('carImage').offsetHeight > carImageHeight) && (document.getElementById('carImage').style.height = carImageHeight +'px');

		if(logoH > carImageHeight){
			document.getElementById('logoImage').style.backgroundSize = 'contain';
			var logoRate = document.getElementById('logoImage').offsetHeight / logoH;
			document.getElementById('logoImage').style.height = String(carImageHeight * logoRate)+'px';
			logoH = (carImageHeight * logoRate) + (carImageHeight * (1-logoRate));
			divTop = Math.max(document.getElementById('logoImage').offsetTop, document.getElementById('carImage').offsetTop);
		}else{
			document.getElementById('logoImage').style.top = '10px';
			document.getElementById('carImage').style.top = '10px';
			divTop = 10;
		}
	}else{
		margin = availableH / childrenNum;
		document.getElementById('carImage').style.top = margin+'px';
		divTop += margin * 2;
	}
	divTop += Math.max(logoH, document.getElementById('carImage').offsetHeight);

	document.getElementById('carNameConstraint').style.top = divTop+'px';
	divTop += document.getElementById('carNameConstraint').offsetHeight + margin;

	if(typeof offerDIV != 'undefined'){
		offerDIV.style.top = divTop+'px';
		divTop += offerDIV.offsetHeight + margin;
	}
}

function alignEndFrameElement_728x90(_W){

	var childrenNum = 1, availableW = _W, margin = 0, divLeft = 0, aligningFunction,
		offerDIV = document.getElementById('offerMainContainer'),
		offerParentDiv = offerDIV.parentNode,
		offerScaleVar = 1,
		logoImageDiv = document.getElementById('logoImage'),
		carImageDiv = document.getElementById('carImage'),
		carNameDiv = document.getElementById('carNameConstraint'),
		carNameH = carNameDiv.firstChild.offsetHeight > carNameDiv.offsetHeight ? carNameDiv.firstChild.offsetHeight * 0.25 :  carNameDiv.firstChild.offsetHeight;

	try{
		if(typeof WebKitCSSMatrix != 'undefined'){
			offerScaleVar = new WebKitCSSMatrix(offerDIV.style.webkitTransform).a;
		}else if(typeof MSCSSMatrix != 'undefined'){
			offerScaleVar = new MSCSSMatrix(offerDIV.style.transform).a;
		}
	}catch(e){ }

	availableW -= offerDIV.offsetWidth * offerScaleVar;
	if(Chrysler_SVdata['Brand'] == 'Fiat' || carNameH > 80 - logoImageDiv.offsetHeight){
		availableW -= (logoImageDiv.offsetWidth + carNameDiv.offsetWidth + carImageDiv.offsetWidth);
		childrenNum = 5;
		aligningFunction = alignWidthBigLogo;
	}else{
		availableW -= Math.max(logoImageDiv.offsetWidth, carNameDiv.offsetWidth);
		availableW -= carImageDiv.offsetWidth;
		childrenNum = 4;
		aligningFunction = alignWidthSmallLogo;
	}

	if(availableW / childrenNum < 5){
		margin = 5;
		carImageDiv.style.width = String(carImageDiv.offsetWidth + availableW - childrenNum * margin) + 'px';
		carImageDiv.style.backgroundSize = 'contain';
	}else{
		margin = availableW / childrenNum;
	}

	aligningFunction();
	offerParentDiv.style.left = String(_W - (offerParentDiv.offsetWidth + margin) + (offerParentDiv.offsetWidth - offerDIV.offsetWidth * offerScaleVar) * 0.5) +'px';

	function alignWidthBigLogo(){
		logoImageDiv.style.left = margin+'px';
		divLeft += margin * 2 + logoImageDiv.offsetWidth;
		if(logoImageDiv.offsetHeight > 90){
			logoImageDiv.style.height = '90px';
			logoImageDiv.style.top = '0px';
			logoImageDiv.style.backgroundSize = 'contain';
		}else{
			logoImageDiv.style.top = String(45 - logoImageDiv.offsetHeight * 0.5)+'px';
		}
		carNameDiv.style.left = divLeft+'px';
		carNameDiv.style.top = String(45 - carNameDiv.offsetHeight * 0.5)+'px';
		divLeft += margin + carNameDiv.offsetWidth;
		carImageDiv.style.left = divLeft+'px';
	}

	function alignWidthSmallLogo(){
		logoImageDiv.style.left = margin+'px';
		carNameDiv.style.left = margin+'px';
		var logoMargin = (90 - carNameH - logoImageDiv.offsetHeight) * 0.33;
		logoImageDiv.style.top = logoMargin +'px';
		logoMargin += logoMargin + logoImageDiv;
		carNameDiv.style.top = String(logoMargin - (carNameDiv.offsetHeight - carNameH) * 0.5) +'px';
		divLeft += margin + carNameDiv.offsetWidth;
		carImageDiv.style.left = divLeft+'px';
	}
}


function endFrameBGsetup(){
	if(document.getElementById('Chrysler_LegalFrame') == null)
		return window.setTimeout(endFrameBGsetup, 200);

	if(Chrysler_SVdata['OfferFrameTextColor'].length > 0){
		document.getElementById('Chrysler_offerContainer').style.color = (Chrysler_SVdata['OfferFrameTextColor'].search('#') == -1 ? '#' : '')+ Chrysler_SVdata['OfferFrameTextColor'].replace('0x', '');
		(parseInt(Chrysler_SVdata['OfferFrameTextColor'].replace('#', ''), 16) > 9000000) && document.getElementById('Chrysler_LegalBtn').setAttribute('class', Chrysler_SVdata['Language'] == 'esp' ? 'ESW' : 'ENW');
	}

	if(!valueValidator(Chrysler_SVdata['OfferFrameBackground']) || Chrysler_SVdata['OfferFrameBackground'].length < 4)
		return endFrameAssetsLoadingDone = true;

	if(Chrysler_SVdata['OfferFrameBackground'].search('#') > -1){
		document.getElementById('Chrysler_OfferFrame').style.backgroundColor = Chrysler_SVdata['OfferFrameBackground'];
		if(parseInt(Chrysler_SVdata['OfferFrameBackground'].replace('#', ''), 16) < 9000000)
			revertElementsTones();
		else
			endFrameAssetsLoadingDone = true;
	}else if((Chrysler_SVdata['Size'] == '300x600' && Chrysler_SVdata['TemplateType'] == 'Endemic') || (Chrysler_SVdata['TemplateType'] == 'Oyster' && Chrysler_SVdata['Brand'] == 'Ram')){
		if(Chrysler_SVdata['OfferFrameBackground'].toUpperCase().search('WHITE') == -1)
			document.getElementById('Chrysler_OfferFrame').style.backgroundImage = 'url('+ Chrysler_SVdata['OfferFrameBackground'] +')';
		endFrameAssetsLoadingDone = true;
	}else{
		addFEED('Chrysler_toneDetector.js', 'Chrysler-toneDetect');
		endFrameToneDetect();
	}
}

function endFrameToneDetect(){
	if(typeof Chrysler_toneDetector == 'undefined')
		return window.setTimeout(endFrameToneDetect, 100);

	var detectRange = {top:0, left:0, width:0, height:0};
	(Chrysler_SVdata['Size'] == '300x600') && (detectRange.height = 400);
	(Chrysler_SVdata['TemplateType'] == 'Oyster') && (detectRange.height = 200);

	var local_toneDetector = new Chrysler_toneDetector({ url:Chrysler_SVdata['OfferFrameBackground'], range:detectRange, callBack:function(_tone, _color, _reverse){
		endFrameAssetsLoadingDone = true;
		if(typeof _tone == 'undefined'){
			(valueValidator(Chrysler_SVdata['OfferFrameLogo'])) && (Chrysler_SVdata['OfferFrameLogo'] = '');
			return;
		}
		document.getElementById('Chrysler_OfferFrame').style.backgroundImage = 'url('+ Chrysler_SVdata['OfferFrameBackground'] +')';

		if(_tone < 0.55){
			revertElementsTones();
		}else{
			if(valueValidator(Chrysler_SVdata['OfferFrameLogo']) && Chrysler_SVdata['OfferFrameLogo'].search('_white') > -1)
				Chrysler_SVdata['OfferFrameLogo'] = Chrysler_SVdata['OfferFrameLogo'].replace('_white', '');
		}
	}});
}

function revertElementsTones(){
	if(Chrysler_feeds['offerType'] == 'generic' && Chrysler_SVdata['Size'] == '300x600')
		return;

	if(Chrysler_SVdata['TemplateType'] != 'Oyster'){
		(Chrysler_SVdata['OfferFrameTextColor'].length == 0 || parseInt(Chrysler_SVdata['OfferFrameTextColor'].replace('#', ''), 16) > 9000000) && (document.getElementById('Chrysler_offerContainer').style.color = '#FFFFFF');
		document.getElementById('Chrysler_LegalBtn').setAttribute('class', Chrysler_SVdata['Language'] == 'esp' ? 'ESW' : 'ENW');
	}
	if(Chrysler_SVdata['Brand'] == 'Chrysler')
		return endFrameAssetsLoadingDone = true;

	(endFrameImages['logoImage'].length == 0) && (endFrameImages['logoImage'] = getLogoImage());
	if(endFrameImages['logoImage'].search(/Commercial|Abarth/g) == -1 && endFrameImages['logoImage'].search('_white') == -1){
		endFrameImages['logoImage'] = endFrameImages['logoImage'].replace(/(\.png|\.svg)/, '_white$1');
		PRGlobal.imageOverride = endFrameImages;
		if(document.getElementById('logoImage') != null){
			for(var i=0; i < PRGlobal.loadingElements.length; i++)
				(PRGlobal.loadingElements[i].obj.name == "logoImage") && PRGlobal.loadingElements[i].obj.reloadImage();
		}
	}
	endFrameAssetsLoadingDone = true;
}


function loadingFonts(){
	if(Chrysler_SVdata['Year'].search('T2') > -1)
		return endFrameCTAsetup();

	if(typeof Chrysler_fontManager == 'undefined')
		return window.setTimeout(loadingFonts, 250);

	function getBrandFonts(_t, _b){
		var fonts = {
			'DCO' :{
				'Chrysler':{name:'VerlagBold', file:'Verlag Bold'},
				'Dodge':{name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Ram':{name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Jeep':{name:'GOTHMMED', file:'GOTHMMED'},
				'Fiat':{name:'GillSans', file:'Gill Sans'},
				'Alfa':'Roboto-Regular'
			},
			'Endemic' : {
				'Chrysler': [{name:'latoregular', style:'bold', file:'Verlag Black'}, {name:'latoregular', file:'lato-regular-webfont'}],
				'Dodge' : {name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Ram': {name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Jeep' : {name:'RobotoBold', file:'Roboto-Bold'},
				'Fiat': {name:'KhulaSemiBold', file:'Khula-SemiBold'},
				'Alfa': {name:'RobotoRegular', file:'Roboto-Regular'}
			},
			'Oyster' : {
				'Chrysler': [{name:'latoregular', style:'bold', file:'Verlag Black'}, {name:'latoregular', file:'lato-regular-webfont'}],
				'Dodge' : {name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Ram': {name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
				'Jeep' : {name:'RobotoBold', file:'Roboto-Bold'},
				'Fiat': {name:'KhulaSemiBold', file:'Khula-SemiBold'},
				'Alfa': {name:'RobotoRegular', file:'Roboto-Regular'}
			},
			'NonEndemic' : {
				'Chrysler': 'Verlag Black',
				'Dodge': 'Oswald-Regular',
				'Ram': 'Oswald-Regular',
				'Jeep': 'Roboto-Regular',
				'Fiat': 'Khula-SemiBold',
				'Alfa':'Roboto-Regular'
			}
		}
		try{
			return fonts[_t][_b] || fonts['Endemic']['Chrysler'];
		}catch(e){
			return fonts['Endemic']['Chrysler'];
		}
	}

	function setFontFamily(_a, _font){
		for(var i=0; i < _a.length; i++)
			document.getElementById(_a[i]).style.fontFamily = _font;
	}
	var fontArray = getBrandFonts(Chrysler_SVdata['TemplateType'], Chrysler_SVdata['Brand']),
	FontName = fontArray.constructor == Array ? fontArray[0].name : fontArray.constructor == Object ? fontArray.name : fontArray;
	Chrysler_fontManager.loadingFont(fontArray, function(){
		setFontFamily(['CTA1Copy', 'CTA2Copy'], Chrysler_fontManager.getFontFamily(FontName));
		endFrameCTAsetup();
	});
}

function endFrameCTAsetup(){

	if(typeof isSvgRendering == 'undefined' || typeof Chrysler_fontManager == 'undefined' || Chrysler_fontManager.status != 'complete')
		return window.setTimeout(endFrameCTAsetup, 300);

	var Container1 = document.getElementById('CTA1Container'),
			Container2 = document.getElementById('CTA2Container'),
			Copy1 = document.getElementById('CTA1Copy'),
			Copy2 = document.getElementById('CTA2Copy');

	if(Copy1 == null || Copy1.clientWidth * Copy1.clientHeight * Container1.clientWidth * Container1.clientHeight == 0)
		return window.setTimeout(endFrameCTAsetup, 300);

	var targetWidth = (Math.abs(Copy1.clientWidth - Copy1.firstChild.offsetWidth) < 3) ? Container1.clientWidth : Copy1.clientWidth,
		fontSize = parseInt(window.getComputedStyle(Copy1).fontSize);

	function setCTAtextResizing(_parent, _cont, _html){
		_cont.innerHTML = '<span>'+_html+'</span>';

		if(Chrysler_SVdata['Year'].search('T2') > -1)
			return;

		if(isSvgRendering){
			_cont.firstChild.style.fontSize = String(fontSize * 4)+'px';
			window.setTimeout(function(){
				textRescaling(_parent, _cont.firstChild, targetWidth);
			}, 200);
		}else{
			window.setTimeout(function(){
				(targetWidth*0.95 < _cont.firstChild.offsetWidth) && textResizing(_cont.firstChild, targetWidth*0.95, fontSize);
			}, 200);
		}
	}

	if(valueValidator(Chrysler_SVdata['CTA1Text']))
		setCTAtextResizing(Container1, Copy1, Chrysler_SVdata['CTA1Text']);
	else
		('Endemic NonEndemic Oyster'.search(Chrysler_SVdata['TemplateType']) > -1) && (Container1.style.display = 'none');

	if(valueValidator(Chrysler_SVdata['CTA2Text']))
		setCTAtextResizing(Container2, Copy2, Chrysler_SVdata['CTA2Text']);
	else
		('Endemic NonEndemic Oyster'.search(Chrysler_SVdata['TemplateType']) > -1) && (Container2.style.display = 'none');
}

function textResizing(elem, targetWidth, fontSize){
	if(elem.offsetWidth <= targetWidth || fontSize < 6)
		return;
	elem.style.fontSize = String(fontSize-1)+'px';
	setTimeout(function(){
		textResizing(elem, targetWidth, fontSize-1);
	}, 100);
}

function textRescaling(parent, elem, targetWidth){
	function getCanvasWithStyle(_obj){
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = _obj.width;
		canvas.height = _obj.height;
		ctx.fillStyle = _obj.color;
		ctx.font = _obj.font;
		ctx.textBaseline = 'top';
		ctx.fillText(_obj.text, 0, 0);
		canvas.style.WebkitTransformOrigin = '0% 0%';
		canvas.style.WebkitTransform = "scale("+ _obj.scale +")";
		canvas.style.display = _obj.display;
		return canvas;
	}
	function rgb2hex(rgb){
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		return (rgb && rgb.length === 4) ? "#" + ("0"+parseInt(rgb[1],10).toString(16)).slice(-2) + ("0"+parseInt(rgb[2],10).toString(16)).slice(-2) +	("0"+parseInt(rgb[3],10).toString(16)).slice(-2) : '';
	}
	var scaleVar = Math.min(targetWidth * 0.8, elem.offsetWidth * 0.25) / elem.offsetWidth;
	var elemStyle = window.getComputedStyle(elem);
	var canvasStyle = {width:elem.offsetWidth, height:elem.offsetHeight, color:rgb2hex(elemStyle.color), font:parseInt(elemStyle.fontSize)+"px "+ elemStyle.fontFamily, text:elem.innerText, scale:scaleVar, display:'block' };
	(Chrysler_SVdata['Brand'] == 'Chrysler' && 'DCO Endemic Oyster'.search(Chrysler_SVdata['TemplateType']) > -1) && (canvasStyle.height = parseInt(canvasStyle.height * 1.2));
	var ctaCanvas = getCanvasWithStyle(canvasStyle);

	elem.innerHTML = '';
	elem.appendChild( ctaCanvas );
	elem.setAttribute('style', 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);');
	elem.style.width = String(elem.offsetWidth * scaleVar)+'px';
	elem.style.height = String(elem.offsetHeight * scaleVar)+'px';
	elem.style.fontSize = 'inherit';

	var overCanvas;
	canvasStyle.display = 'none';
	if(Chrysler_SVdata['Brand'] == 'Chrysler' && 'Endemic Oyster'.search(Chrysler_SVdata['TemplateType']) > -1){
		canvasStyle.font = 'bold '+canvasStyle.font;
		canvasStyle.width = parseInt(canvasStyle.width * 1.2);
		(Chrysler_SVdata['Size'] == '300x600') && (canvasStyle.color = '#009ACF');
		overCanvas = getCanvasWithStyle(canvasStyle);
	}else if(Chrysler_SVdata['Brand'] == 'Fiat'){
		canvasStyle.color = '#941711';
		overCanvas = getCanvasWithStyle(canvasStyle);
	}else if(Chrysler_SVdata['Brand'] == 'Jeep' && 'DCO Endemic Oyster'.search(Chrysler_SVdata['TemplateType']) > -1){
		canvasStyle.color = '#000000';
		overCanvas = getCanvasWithStyle(canvasStyle);
	}

	if(Chrysler_SVdata['TemplateType'] == 'NonEndemic'){
		document.getElementById('CTA1Copy').style.width = '100%';
		document.getElementById('CTA1Copy').style.height = '100%';
		document.getElementById('CTA2Copy').style.width = '100%';
		document.getElementById('CTA2Copy').style.height = '100%';
		if('Chrysler Dodge Ram'.search(Chrysler_SVdata['Brand']) > -1){
			var CSSnode = document.createElement("style");
				CSSnode.type = "text/css";
				CSSnode.appendChild( document.createTextNode("#Chrysler_Wrapper."+ Chrysler_SVdata['Brand'] +" #CTA1Copy span::after, #Chrysler_Wrapper."+ Chrysler_SVdata['Brand'] +" #CTA2Copy span::after{bottom:0px !important;}") );
			document.getElementsByTagName('head')[0].appendChild(CSSnode);
		}
	}

	if(typeof overCanvas == 'undefined')
		return;

	elem.appendChild(overCanvas);
	parent.addEventListener('mouseover', function(){
		ctaCanvas.style.display = 'none';
		overCanvas.style.display = 'block';
	});
	parent.addEventListener('mouseout', function(){
		ctaCanvas.style.display = 'block';
		overCanvas.style.display = 'none';
	});
}



var THIS = this, endFrameAssetsLoadingDone = false;
var endFrameImages = { logoImage : '',	carImage : ''};

var endFrameHTML = [
	"<div id='Chrysler_offerContainer'></div><a class='Chrysler_GenClk' onclick='mainClick();'></a>",
	"<div id='Chrysler_LegalBtn' class='"+ (Chrysler_SVdata['Language'] == 'esp' ? 'ES' : 'EN') +"'></div>",
	"<div id='Chrysler_CTA'><a id='CTA1Container' onclick='Button1Click();'><div id='CTA1Copy'><span>"+ (Chrysler_SVdata['Language'] == 'esp' ? "DISE&#195;‘AR Y COTIZAR" : "Build & Price") +"</span></div><div id='CTA1Arrow'></div></a>",
	"<a id='CTA2Container' onclick='Button2Click();'><div id='CTA2Copy'><span>"+ (Chrysler_SVdata['Language'] == 'esp' ? "VER INCENTIVOS" : "View Incentives") +"</span></div><div id='CTA2Arrow'></div></a></div>"
];

var endFrameFeedInput = {
	brand: Chrysler_SVdata['Brand'],
	model: Chrysler_SVdata['Model'],
	language: Chrysler_SVdata['Language'],
	ZipCode: Chrysler_SVdata['ZipCode'],
	year: Chrysler_SVdata['Year'].replace('_T2', ''),
	feedType: Chrysler_SVdata['TESTvsLIVE'],
	offerType: Chrysler_SVdata['offerType'],
	assetPath : Chrysler_SVdata['AssetPath']+Chrysler_globalAssetFolder,
	callBack: loadOfferBuilder
}

var endFrameOfferInput = {
	'templateType': Chrysler_SVdata['TemplateType'],
	'brandName': Chrysler_SVdata['Brand'],
	'year' : Chrysler_SVdata['Year'].replace('_T2', ''),
	'model': Chrysler_SVdata['Model'],
	'CreativeVersion' : Chrysler_SVdata['CreativeVersion'],
	'Language' : Chrysler_SVdata['Language'],
	'mainDiv' : 'Chrysler_offerContainer',
	'stageSize' : Chrysler_SVdata['Size'],
	'offerSize' : (Chrysler_SVdata['Size'] == '300x600') ? '300x250' : Chrysler_SVdata['Size'],
	'callback' : endFrameOfferBuildingComplete
};

(function(){
	document.getElementById('Chrysler_OfferFrame').innerHTML = endFrameHTML.join('');
	addFEED('Chrysler_fontManager.js', 'Chrysler-fontManager');
	addFEED('Chrysler_feeds.js', 'Chrysler-feeds');
	addFEED('Chrysler_OfferBuilder.js', 'Chrysler-OfferBuilder');
	addFEED('Chrysler_legal.js', 'Chrysler-legal');
	loadingFonts();
	loadingFeedLibrary();
	endFrameBGsetup();
})();
