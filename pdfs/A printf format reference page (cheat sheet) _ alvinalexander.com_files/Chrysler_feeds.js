/*
	Chrysler Gizmo Feeds Manager
	by Heajin Seo. Nov.2016
*/

var Chrysler_feeds = {

	brand : '',
	model : '',
	language : 'eng',
	year : '2017',
	ZipCode : "",
	feedType : false,
	timer : null,
	callBack : null,

	assetPath : '',
	CCBfeedURL : 'http://gizmo.serving-sys.com/api/data/get/549?format=jsonp&jsonp=Chrysler_feeds.callOfferData&zip=',
	OFFERlayoutNumber : (window.location.protocol.search('http') == -1 || window.location.href.indexOf("isPreview=1") > -1) ? '886' : '563',
	redirectURLs : {'viewincentives':'clickTag1', 'buildandprice':'clickTag2', 'vehiclehomepage':'clickTag3', 'Searchinventory':'clickTag4', 'findadealer':'clickTag5' },
	isPreviewer : false,
	supportMultipleOffers : false,

	legal : '',
	offerType : 'generic',
	offerTemplate: '',
	campaign : '',
	offerData : null,
	layoutData : null,
	source : '',
	dma: '',
	additionalNoun : '',

	init :  function(_obj){
		for(var p in _obj){
			this[p] = _obj[p];
		}

		try{
			this.isPreviewer = EB._adConfig.ebReferrer.indexOf('origin.demo.sizmek.com/Auto/Chrysler/') > -1 ? true : false;
			(EB._adConfig.ebReferrer.indexOf('origin.demo.sizmek.com/Auto/Chrysler/') > -1) && (this.feedType = 'TEST');
		}catch(e){
			this.isPreviewer = false;
		}

		if(typeof _obj['offerType'] != 'undefined' && _obj['offerType'].search('softFailSafe') > -1){
			this.callGeneralLayout(true);
			this.fireNounTracking('RetargetingFail', 'retargeting_generic_'+ this.brand +':TA_'+ _obj['offerType'].split(' ')[1]+'_'+ this.brand);
		}else{
			this.addFeed('Chrysler-BCdata', this.CCBfeedURL+this.getZipCode());
		}
	},

	callOfferData :  function(_data){
		this.cancelTimer();
		try{
			var feedParams = 'http://gizmo.serving-sys.com/api/data/get/'+ (EB._adConfig != null && EB._adConfig.isPreview && this.feedType.toUpperCase() == 'TEST' ? '1300' : '489');
				feedParams += '?bccode='+ _data.data[0].BCInfo.BCCode +'&divisioncode='+ this.getBrandCode(this.brand) +'&dma='+ _data.data[0].dma +'&format=jsonp';
				feedParams += '&jsonp=Chrysler_feeds.recieveOfferData&lang='+ this.language +'&modelcode='+ this.getModelCode(this.brand, this.model) +'&output=jsonp&year='+ this.year;
			this.addFeed('Chrysler-OFFERdata', feedParams);
		}catch(e){
			this.recieveOfferData();
		}
	},

	recieveOfferData :  function(_data){
		this.cancelTimer();

		if(document.getElementById('Chrysler-generalLAYOUTdata') != null)
			return;

		if(typeof _data == 'undefined')
			return this.callGeneralLayout();

		this.validator(_data['campaignName']) && (this.campaign = _data['campaignName']);
		(this.callBack != null) && this.callBack.call(this, 'OfferLoadingComplete');

		var selectedOffer = this.selectOffer(_data);

		if(!this.validator(selectedOffer))
			return this.callGeneralLayout(true);

		if(selectedOffer.constructor == Array && this.callBack != null)
			return this.callBack.call(this, selectedOffer);

		this.setValuesFromOfferData(selectedOffer);
		this.callOfferLayout();
	},

	selectOffer : function(_d){
		var offerArray = [], cowsData, omsData, selectedOffer;
		try{ cowsData = _d.cows.root.daa; }catch(e){}
		try{ omsData = _d.oms.root.daa;	}catch(e){}

		if(omsData != undefined && omsData.constructor == Array && omsData.length > 0){
			for(var j=0; j < omsData.length; j++){
				if(!this.offerDataValidator(omsData[j]))
					continue;
				offerArray.push(omsData[j]);
			}
		}

		if(cowsData != undefined && cowsData.constructor == Array && cowsData.length > 0){
			var validCowsData = [];
			for(var l=0; l < cowsData.length; l++)
				this.offerDataValidator(cowsData[l]) && validCowsData.push(cowsData[l]);

			if(offerArray.length == 0){
				offerArray = validCowsData;
			}else{
				var omsRotations = '';
				for(var i=0; i < validCowsData.length; i++)
					this.validator(validCowsData[i].omsRotation) && (omsRotations += validCowsData[i].omsRotation);

				if(omsRotations.length == 0){
					offerArray = validCowsData;
				}else if(omsRotations.length == validCowsData.length){
					offerArray = offerArray.concat(validCowsData);
				}else if(omsRotations.length != validCowsData.length){
					for(var k=0; k < validCowsData.length; k++)
						(this.validator(validCowsData[k].omsRotation) == false) && offerArray.push(validCowsData[k]);
				}
			}
		}
		return this.supportMultipleOffers ? offerArray : offerArray[ Math.floor(Math.random() * offerArray.length) ];
	},

	setValuesFromOfferData : function(_data){
		this.dma = _data["@dma"] || '';
		this.source = this.validator(_data.source) ? _data.source.toLowerCase() : '';
		this.offerData = _data.vehicle[0];
		this.validator(this.offerData.legal) && (this.legal = this.offerData.legal);

		if(this.validator(this.offerData.item.proffer) && this.validator(this.offerData.item.offerTemplate_proffer)){
			this.offerType = this.offerData.item.proffer;
			this.offerTemplate = this.offerData.item.offerTemplate_proffer;
		}else if(this.validator(this.offerData.item.offer) && this.validator(this.offerData.item.offerTemplate_offer)){
			this.offerType = this.offerData.item.offer;
			this.offerTemplate = this.offerData.item.offerTemplate_offer;
		}

		for(var p in this.offerData.item){
			if('@expiryDate @itemType brandName displayName family invoiceShortName mathNode model modelShown offer offerExp proffer vehName vehShortName offerTemplate_offer offerTemplate_proffer'.search(p) == -1 && this.validator(this.offerData.item[p])){
				(this.additionalNoun.length > 0) && (this.additionalNoun += '-');
				this.additionalNoun += p +'_'+this.offerData.item[p].replace(/[^A-Za-z0-9]/gi, '');
			}
		}
		(this.additionalNoun.length > 0) && (this.additionalNoun = ':'+this.additionalNoun);

		if(this.source.search('cows') > -1){
			for(var p in this.redirectURLs)
				try{ this.redirectURLs[p] = this.offerData[this.redirectURLs[p]]; } catch(e){ this.redirectURLs[p] = ''};
		}
	},

	callOfferLayout :  function(){
		var feedURL = 'http://gizmo.serving-sys.com/api/data/get/'+ this.OFFERlayoutNumber + '?brand='+ this.brand +'&filetype=json&format=jsonp';
		(this.OFFERlayoutNumber == '563') && (feedURL += '&gset=2');
		feedURL += '&jsonp=Chrysler_feeds.LayoutCallback&offer='+ this.offerTemplate;
		(this.OFFERlayoutNumber == '886') && (feedURL += '&pset=2');
		this.addFeed('Chrysler-LAYOUTdata', feedURL);
	},

	callGeneralLayout :  function(_call){
		this.cancelTimer();
		if(this.brand == 'Ram' && 'ram_1500 ram_2500 ram_3500'.search(this.model) > -1)
			this.legal = 'Optional features shown. *According to IHS Markit US owner loyalty analysis of the Non-Luxury Half-Ton Pickup segment, Ram 1500 had the greatest percentage of owners who returned to market and purchased  or leased  another Ram 1500 in the 2017 model year.';
		else
			this.legal = '';

		this.offerData = this.getGeneralOffer();
		this.offerType = 'generic';
		this.dma = '';
		this.source = '';

		((typeof _call == 'undefined' || !_call) && this.callBack != null && document.getElementById('Chrysler-LAYOUTdata') == null) && this.callBack.call(this, 'OfferLoadingComplete');
		var generalLayoutFeed = this.assetPath+'/JS/generalOffer.js';
		this.addFeed('Chrysler-generalLAYOUTdata', generalLayoutFeed, false);
	},

	LayoutCallback :  function(data){
		this.cancelTimer();
		if((this.layoutData != null) || (this.offerType == 'generic' && typeof data.xml.offers != 'undefined'))
			return;

		if(this.offerType != 'generic' && (typeof data.xml.offers == 'undefined' || typeof data.xml.offers.offer == 'undefined' || data.xml.offers.offer.length == 0))
			return this.callGeneralLayout(true);

		this.layoutData = data;
		(this.callBack != null) && this.callBack.call(this, 'layoutLoadingComplete');
		this.fireNounTracking('offerTemplate', this.offerType+this.additionalNoun);
		(this.isPreviewer) && parent.postMessage(this.source.length == 0 ? 'generic' : this.source, '*');
	},


	addFeed :  function(_id, _url, _runTimer){
		if(document.getElementById(_id) != null)
			return;
		var feedObj = document.createElement('script');
			feedObj.src = document.location.protocol == 'https:' ? _url.replace('http:', 'https:').replace('//gizmo', '//gizmo-s') : _url;
			feedObj.id = _id;
			feedObj.charset = 'utf-8';
			//feedObj.async = false;
		document.getElementsByTagName('head')[0].appendChild(feedObj);
		(typeof _runTimer == 'undefined' || _runTimer == true) && this.startTimer();
	},

	fireNounTracking :  function(_intName, _noun){
		try{
			var nounTracker = "";
			if(String(EB._adConfig.adId).length > 8)
				nounTracker += "https://bs.serving-sys.com/Serving/adServer.bs?cn=display&c=19&pli=1073952795&adid=1073972634&ord=[timestamp]&rtu=-1&pcp=$$";
			else
				nounTracker += "https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16478984&PluID=0&ord=%time%&rtu=-1&pcp=$$";
			nounTracker += 'sID='+ String(EB._adConfig.sID) +'|adID='+ String(EB._adConfig.adId);
			nounTracker += (String(EB._adConfig.adId).length > 8 ? "|vID=" : "|vId=")+ String(EB._adConfig.massVersioning.adVersions).split("_")[0];
			nounTracker += "|interactionName=Chrysler_"+ _intName +"|noun="+ _noun +"$$";
			var nounImg = new Image();
			nounImg.src = nounTracker;
		}catch(e){
			console.log('tracking ', _intName, _noun);
		}
	},

	startTimer :  function(){
		this.timer = window.setTimeout(this.callGeneralLayout.bind(this), this.isPreviewer ? 5000 : 2000);
	},

	cancelTimer :  function(){
		window.clearTimeout(this.timer);
	},

	getZipCode : function(){
		var zip;
		try{
			zip = 	(typeof this.ZipCode == 'string' && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.ZipCode)) ? this.ZipCode :
					(typeof EB._adConfig.lineId != 'undefined' && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(EB._adConfig.lineId.replace(/\s/gi, ''))) ? EB._adConfig.lineId : EB._adConfig.geoData.zip;
		}catch(e) {
			zip = '19406';
		}
		return zip;
	},

	getBrandCode :  function(_b){
		var codes = {'Chrysler':'C', 'Dodge':'D', 'Ram':'T', 'Jeep':'J', 'Fiat':'X', 'Alfa':'Y'};
		return codes[_b] || codes['Chrysler'];
	},

	getModelCode :  function(_b, _m){
		var modelCode = {
			'Chrysler'	: {'pacifica':'05', 'pacificahybrid':'10', '200':'09', '200c':'00', '300':'01', 'tc':'08', 'default':'05'},
			'Dodge'		: {'avenger':'01', 'challenger':'03', 'charger':'04', 'dart':'19', 'durango':'11', 'grandcaravan':'05', 'journey':'09', 'default':'01'},
			'Ram'		: {'ram1500':'13', 'ram2500':'14', 'ram3500':'15', 'rampromaster':'00', 'chassiscab3500':'16', 'rampromastercitytradesman':'06', 'rampromastercitywagon':'04', 'ramcv':'05', 'allnewram1500':'20', 'default':'13'},
			'Jeep'		: {'compass':'14', 'grandcherokee':'03', 'cherokee':'08', 'patriot':'05', 'wranglerjk':'06', 'wranglerjkunlimited':'07', 'renegade':'09', 'wranglerjl':'10', 'wranglerjlunlimited':'11', 'default':'14'},
			'Fiat'		: {'500':'01', '500abarth':'01', '500abarthcabrio':'03', '500turbo':'01', '500c':'01', '500e':'04', '500l':'05', '500x':'06', '124spider':'07', 'fiat124spider':'07', 'default':'01'},
			'Alfa' : {'giulia':'03', 'stelvio': '04', 'default':'03'}
		}
		var selectedGroup = modelCode[_b] || modelCode['Chrysler'];
		_m = _m.toLowerCase().replace(/\s|\_/gi, '');
		return selectedGroup[_m] || selectedGroup['default'];
	},

	getGeneralOffer :  function(){
		this.offerType = 'generic';
		this.offerTemplate = '';
		this.dma = '';
		this.source = '';
		return {"campaign":"","legal":"","item":{"@itemType":"","@expiryDate":"2027-05-31","offer":"","proffer":"generic"}};
	},

	validator :  function(_v){
		if(typeof _v == 'undefined' || _v == null)
			return false;
		if(typeof _v == "string" && (_v.length == 0 || _v.toLowerCase() == 'undefined'))
			return false;
		return true;
	},

	offerDataValidator : function(_data){
		var vehicleData;
		try{
			vehicleData = _data["vehicle"][0];
		}catch(e){
			return false;
		}

		if(!this.validator(vehicleData) || !this.validator(vehicleData['item']))
			return false;

		var trimString = String(vehicleData["@model"]+vehicleData["@displayName"]).toLowerCase();
		if(this.brand == 'Jeep' && '07 11'.search(this.getModelCode(this.brand, this.model)) > -1 && trimString.search("unlimited") == -1)
			return false;

		if(this.brand == 'Jeep' && '06 10'.search(this.getModelCode(this.brand, this.model)) > -1 && trimString.search("unlimited") > -1)
			return false;

		try{
			var timeStamp = vehicleData['@testDateCompare'] || vehicleData['item']['@expiryDate'];
			var offerDate = new Date(timeStamp);
			if(offerDate.getTime() < Date.now() && this.feedType.toUpperCase() != 'TEST')
				return false;
		}catch(e){
			return false;
		}

		var offerType, offerItem = vehicleData.item;
		if(this.validator(offerItem.proffer) && this.validator(offerItem.offerTemplate_proffer)){
			offerType = offerItem.proffer;
		}else if(this.validator(offerItem.offer) && this.validator(offerItem.offerTemplate_offer)){
			offerType = offerItem.offer;
		}else{
			return false;
		}

		if(offerType.search('apr') > -1){
			try{
				if(!this.validator(offerItem.percent) || !this.validator(offerItem.months))
					return false;
			}catch(e){
				return false;
			}
		}
		return true;
	}
}
