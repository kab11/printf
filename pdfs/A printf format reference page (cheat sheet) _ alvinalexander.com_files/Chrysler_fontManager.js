/*
	Chrysler Font Manager
	by Heajin Seo. Nov.2016
*/

var Chrysler_fontManager = {

	status : 'ready',
	fonts : {},
	assetPath : (document.location.protocol == 'https:' ? 'https:' : 'http:')+'//services.serving-sys.com/HostingServices/Creative/Chrysler/fonts/',
	CSSnode : null,
	callback : {},
	testTimer : null,
	initDivWidth : -10,

	loadingFont : function(_data, _calback){
		if(typeof _data == 'undefined')
			return;

		var fontRules = '';
		var session = parseInt(Math.random() * 100000);
		var wait = Boolean(typeof _calback != 'undefined');
		(typeof _calback != 'undefined') && (this.callback[session] = _calback);

		if(_data.constructor == Array){
			for(var i=0; i < _data.length; i++){
				(typeof _data[i] != 'undefined') && (fontRules += this.addFont(session, _data[i], wait));
			}
		}else{
			fontRules += this.addFont(session, _data, wait);
		}

		if(fontRules.length == 0 && typeof _calback == 'undefined')
			return;

		this.createCSSnode(fontRules);
		if(this.status != 'loading' && typeof _calback != 'undefined'){
			this.status = 'loading';
			this.testTimer = window.setInterval(this.loadingCheck.bind(this), 200);
		}
	},

	addFont : function(_session, _data, _wait){

		if(typeof _data == 'undefined' || (typeof _data == "string" && _data.length == 0) || (_data.constructor == Object && typeof _data['file'] == 'undefined'))
			return '';

		var fontName, fontFamily, fontFile, fontStyle;
		if(typeof _data == "string"){
			fontName = _data.replace(/\s/g,"-").replace(/\./g,"");
			fontFamily = _data.replace(/\s/g,"-").replace(/\./g,"");
			fontFile = (_data.search('http') > -1) ? _data.replace('http', document.location.protocol == 'https:' ? 'https' : 'http') : this.assetPath+_data.replace(/\s/g,"-");
		}else if(_data.constructor == Object){
			fontName = (typeof _data['name'] != 'undefined' && _data['name'].length > 0) ? (typeof _data['style'] != 'undefined' && _data['style'].length > 0) ?
						_data['name'].replace(/\s/g,"-").replace(/\./g,"")+'_'+_data['style'] : _data['name'].replace(/\s/g,"-").replace(/\./g,"") : _data['file'].replace(/\s/g,"-").replace(/\./g,"");
			fontFamily = (typeof _data['name'] != 'undefined' && _data['name'].length > 0) ? _data['name'].replace(/\s/g,"-").replace(/\./g,"") : _data['file'].replace(/\s/g,"-").replace(/\./g,"");
			fontFile = (_data['file'].search('http') > -1) ? _data['file'].replace('http', document.location.protocol == 'https:' ? 'https' : 'http') : this.assetPath+_data['file'].replace(/\s/g,"-");
			(typeof _data['style'] != 'undefined' && _data['style'].length > 0) && (fontStyle = _data['style']);
		}else{
			return '';
		}

		for(var se in this.fonts){
			for(var i=0; i < this.fonts[se].length; i++){
				if(this.fonts[se][i].file == fontFile){
					(this.fonts[se][i].tag.search(' '+fontName+' ') == -1) && (this.fonts[se][i].tag += fontName+' ');
					if(_wait){
						if(typeof this.fonts[se][i].dom == 'undefined')
							this.fonts[se][i] = this.createFontWithDiv(this.fonts[se][i].family, this.fonts[se][i].file, this.fonts[se][i].style, this.fonts[se][i].tag);
						if(typeof this.callback[se] == 'undefined' || this.callback[se] == null){
							this.callback[se] = this.callback[_session];
						}else{
							if(this.callback[se].constructor == Array)
								this.callback[se].push(this.callback[_session]);
							else
								this.callback[se] = [this.callback[se], this.callback[_session]];
						}
						delete this.callback[_session];
					}
					return '';
				}
			}
		}

		if(typeof this.fonts[_session] == 'undefined')
			this.fonts[_session] = [];

		var newFont = (typeof _wait != 'undefined' && _wait == true) ? this.createFontWithDiv(fontFamily, fontFile, fontStyle, fontName) : this.createFontOnly(fontFamily, fontFile, fontStyle, fontName);
		this.fonts[_session].push(newFont);
		return this.generateRules(fontFamily, fontFile, fontStyle);
	},

	loadingCheck : function(){
		var session, complete, clearTimer = true;
		for(var se in this.fonts){
			complete = true;
			for(var i=0; i < this.fonts[se].length; i++){
				if(typeof this.fonts[se][i].dom == 'undefined')
					continue;

				if(this.fonts[se][i].loaded == false){
					this.fonts[se][i].loaded = Boolean(Math.min(this.fonts[se][i].dom.offsetWidth, this.fonts[se][i].width) > 0);
					(this.fonts[se][i].loaded) && (this.fonts[se][i].loaded = Boolean(Math.abs(this.fonts[se][i].width - this.fonts[se][i].dom.offsetWidth) < 5));
					(this.fonts[se][i].dom.offsetWidth != this.initDivWidth && this.fonts[se][i].width != this.fonts[se][i].dom.offsetWidth) && (this.fonts[se][i].width = this.fonts[se][i].dom.offsetWidth);
					(complete && this.testTimer > 10 && this.fonts[se][i].family == 'latoregular' && typeof this.fonts[se][i].style == 'undefined') && (this.fonts[se][i].width = this.fonts[se][i].dom.offsetWidth);
				}
				(complete == true) && (complete = this.fonts[se][i].loaded);
				if(this.fonts[se][i].loaded){
					document.getElementsByTagName('body')[0].removeChild(this.fonts[se][i].dom);
					delete this.fonts[se][i].dom;
				}
			}

			(clearTimer == true) && (clearTimer = complete);
			if(complete == true && this.callback[se] != null){
				if(this.callback[se].constructor == Array){
					for(var func=0; func < this.callback[se].length; func++){
						(typeof this.callback[se][func] == 'function') && this.callback[se][func].call(this, this.fonts[se]);
					}
				}else{
					(typeof this.callback[se] == 'function') && this.callback[se].call(this, this.fonts[se]);
				}
				this.callback[se] = null;
			}
		}

		if(clearTimer){
			this.status = 'complete';
			window.clearInterval(this.testTimer);
		}
	},

	createFontOnly : function(_family, _file, _style, _tag){
		var newObj = {family:_family, file:_file};
		(typeof _style != 'undefined' && _style.length > 0) && (newObj.style = _style);
		newObj.tag = (typeof _tag != 'undefined' && _tag.length > 0) ? ' '+_tag+' ' : ' '+_family+' ';
		return newObj;
	},

	createFontWithDiv : function(_family, _file, _style, _tag){
		var tempStyle = "position:absolute;display:inline-block;opacity:0;width:auto;font-size:100px;font-family:"+ _family +", 'Arial';";
		(typeof _style != 'undefined' && _style.length > 0) && (tempStyle += _style.search(/[0-9]|bold/gi) > -1 ? 'font-weight:'+ _style +';' : 'font-style:'+ _style +';');

		var tempDiv = document.createElement("div");
			tempDiv.id = 'TestDiv'+ _family;
			tempDiv.innerHTML += "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
			tempDiv.setAttribute('style', tempStyle);
		document.getElementsByTagName('body')[0].insertBefore(tempDiv, document.getElementsByTagName('body')[0].firstChild);
		/*
		if(this.initDivWidth < 0)
			window.setTimeout(function(){ this.initDivWidth = tempDiv.offsetWidth }.bind(this), 50);
		*/
		var newObj = {family:_family, file:_file, width:-10, dom:tempDiv, loaded:false};
		(typeof _style != 'undefined' && _style.length > 0) && (newObj.style = _style);
		newObj.tag = (typeof _tag != 'undefined' && _tag.length > 0) ? ' '+_tag+' ' : ' '+_family+' ';

		return newObj;
	},

	generateRules : function(_family, _file, _style){
		var fontRules = "@font-face { font-family:"+ _family +"; src: url("+ _file +".woff) format('woff'), url("+ _file +".ttf) format('truetype'); ";
		(typeof _style != 'undefined' && _style.length > 0) && (fontRules += _style.search(/[0-9]|bold/gi) > -1 ? 'font-weight:'+_style+';' : 'font-style:'+_style+';');
		fontRules += "}";/*var fontRules = "@font-face { font-family:"+ _family +"; src: url("+ _file +".eot); ";
		fontRules+= "src: url("+ _file +".eot?iefix) format('embedded-opentype'), url("+ _file +".woff) format('woff'), url("+ _file +".ttf) format('truetype'); ";*/
		return fontRules;
	},

	createCSSnode : function(_rules){
		var CSSnode = document.createElement("style");
			CSSnode.type = "text/css";
			CSSnode.appendChild( document.createTextNode(_rules) );
		document.getElementsByTagName('head')[0].appendChild(CSSnode);
	},

	getFontFamily : function(_family){
		if(typeof _family == 'undefined' || _family.length == 0)
			return '';

		_family = _family.replace(/\s/g,"-").replace(/\./g,"");
		for(var se in this.fonts){
			for(var i=0; i < this.fonts[se].length; i++){
				if(this.fonts[se][i].family == _family || this.fonts[se][i].tag.search(' '+_family+' ') > -1 || this.fonts[se][i].file == _family)
					return this.fonts[se][i].family;
			}
		}
		return '';
	},

	getFontStyle : function(_family){
		if(typeof _family == 'undefined' || _family.length == 0)
			return '';

		_family = _family.replace(/\s/g,"-").replace(/\./g,"");
		for(var se in this.fonts){
			for(var i=0; i < this.fonts[se].length; i++){
				if(this.fonts[se][i].family == _family || this.fonts[se][i].tag.search(' '+_family+' ') > -1 || this.fonts[se][i].file == _family)
					return this.fonts[se][i].style || '';
			}
		}
		return '';
	},

	getFontFile : function(_family){
		if(typeof _family == 'undefined' || _family.length == 0)
			return '';

		for(var se in this.fonts){
			for(var i=0; i < this.fonts[se].length; i++){
				if(this.fonts[se][i].family == _family || this.fonts[se][i].tag.search(' '+_family+' ') > -1 || this.fonts[se][i].file == _family)
					return this.fonts[se][i].file.slice(this.fonts[se][i].file.lastIndexOf('/')+1, this.fonts[se][i].file.length).replace(/\./g, '');
			}
		}
		return '';
	}
};


var arialDiv = document.createElement("div");
arialDiv.innerHTML += "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
arialDiv.setAttribute('style', "position:absolute;display:inline-block;opacity:0;width:auto;font-size:100px;font-family:'Arial';");
document.getElementsByTagName('body')[0].insertBefore(arialDiv, document.getElementsByTagName('body')[0].firstChild);
window.setTimeout(function(){
	Chrysler_fontManager.initDivWidth = arialDiv.offsetWidth;
	document.getElementsByTagName('body')[0].removeChild(arialDiv);
	delete arialDiv;
}.bind(this), 200);
