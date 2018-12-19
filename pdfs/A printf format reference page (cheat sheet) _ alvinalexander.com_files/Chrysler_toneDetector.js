/*
	Chrysler Endframe Image Detecting
	by Heajin Seo. Dec.2016.
	Ver 1.0
*/

var Chrysler_toneDetector = function(_obj){
	
	this.tone = 0,
	this.color = 0,
	this.reverseColor = 0xffffff,
	this.url = '',
	this.container = document.body,
	this.canvas = null,
	this.ctx = null,
	this.accuracy = 20,
	this.callBack = null,
	this.range = {top:0, left:0, width:0, height:0},
	
	this.loadingImage = function(){
		var IMG = new Image();		
			IMG.onload = this.loadingComplete.bind(this);
			IMG.onerror = this.loadingError.bind(this);
			IMG.crossOrigin = 'anonymous';
			IMG.src = this.url;
	},
	
	this.loadingComplete = function(e){
		var cWidth = (isNaN(this.range.width) == false && this.range.width > 0) ? this.range.width : e.target.width,
			cHeight = (isNaN(this.range.height) == false && this.range.height > 0) ? this.range.height : e.target.height,
			cTop = isNaN(this.range.top) ? 0 : this.range.top * -1,
			cLeft= isNaN(this.range.left) ? 0 : this.range.left * -1;
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', cWidth);
		this.canvas.setAttribute('height', cHeight);
		
		this.ctx = this.canvas.getContext("2d");
		this.ctx.drawImage(e.target, cLeft, cTop, e.target.width, e.target.height);
		this.detect();
	},
	
	this.loadingError = function(){
		(this.callBack != null) && this.callBack.call(this);
	},
	
	this.detect = function(){
		var pixelData, isTransparent = true, rData = 0, gData = 0, bData = 0;
		var vGrid = Math.floor(this.canvas.width / this.accuracy),
			hGrid = Math.floor(this.canvas.height / this.accuracy);
		
		for(var i=0; i < this.accuracy; i++){
			for(var j=0; j < this.accuracy; j++){
				pixelData = this.ctx.getImageData(i * vGrid, j * hGrid, 1, 1);	
				if(pixelData.data[3] == 0){
					rData += 1;
					gData += 1;
					bData += 1;
					continue;
				}
				(isTransparent) && (isTransparent = false);
				rData += (pixelData.data[0] / 255);
				gData += (pixelData.data[1] / 255);
				bData += (pixelData.data[2] / 255);
			}
		}		
		rData /= (this.accuracy * this.accuracy);
		gData /= (this.accuracy * this.accuracy);
		bData /= (this.accuracy * this.accuracy);	
		if(isTransparent){
			this.tone = 1;		
			this.color = 'rgba(0,0,0,0)';
			this.reverseColor = 'rgba(0,0,0,0)';
		}else{
			this.tone = (rData + gData + bData) / 3;		
			this.color = '#' + Math.round(rData* 255).toString(16) + Math.round(gData* 255).toString(16) + Math.round(bData* 255).toString(16);
			this.reverseColor = '#' + Math.round((1 - rData) * 255).toString(16) + Math.round((1 - gData) * 255).toString(16) + Math.round((1 - bData) * 255).toString(16);
		}
		(this.callBack != null) && this.callBack.call(this, this.tone, this.color, this.reverseColor);
	},	
	
	this.init = function(_o){		
		if(_o.constructor == String){
			this.url = _o;
		}else if(_o.constructor == Object){
			for(var i in _o)		
				this[i] = _o[i];
		}
		
		if(this.url.length == 0)
			return;
		
		this.loadingImage();
	},
	
	this.init(_obj);
	
	return this;
}