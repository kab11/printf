/*
	Chrysler Global functions
	by Heajin Seo. Nov.2016
*/

var Chrysler_SVdata = {
	'TemplateType':'',
	'Brand':'',
	'Model':'',
	'Year':'',
	'CreativeVersion': '',
	'Language':'',
	'ZipCode':'',
	'EventLogo':'',
	'CTA1Text':'',
	'CTA2Text':'',
	'GeneralClick':'',
	'CTA1Click':'',
	'CTA2Click':'',
	'OfferFrameBackground':'',
	'OfferFrameLogo':'',
	'OfferFrameTextColor':'',
	'OfferFrameLegalOrder':'',
	'TESTvsLIVE':'',
	'SkipButton' : '',
	'Size' : '',
	'AssetPath' : 'http://services.serving-sys.com/HostingServices/Creative/Chrysler/'
};

var mainAnimationReady = false, isOfferFrameReady = false, Chrysler_AnimationData, isSvgRendering, startTimeSpan;


/***	Initiate functions 	***/
adkit.onReady(function() {
	console.log('Ad init.');
	startTimeSpan = new Date().getTime();
	defineZoomLevel();
	defineSVdata();

	if(parent == window || EB._adConfig.ebReferrer.toLowerCase().search('origin.demo.sizmek.com/auto/chrysler/') == -1)
		initTemplates();
	else
		overridingSVdata();
});

function defineZoomLevel(){
	if(navigator.userAgent.toLowerCase().search('webkit') == -1)
		isSvgRendering = false;
	else if(parent == window || !EB._adConfigDefined)
		isSvgRendering = Boolean(0.95 > (window.outerWidth - 8) / window.innerWidth);
	else if(EB._adConfig.isInApp)
		isSvgRendering = false;
	else if(EB._adConfig.actualServingMode == "IFRAME")
		isSvgRendering = false;
	else
		window.addEventListener('message', zoomLevelCheck, false);

	function zoomLevelCheck(e){
		try{
			(typeof isSvgRendering == 'undefined') && (isSvgRendering = Boolean(0.95 > (window.outerWidth - 8) / EB._visibilityData.viewPort.Width));
			window.removeEventListener('message', zoomLevelCheck, false);
			isSvgRendering && console.log('AD is rendering with SVG', parseInt((window.outerWidth - 8) / EB._visibilityData.viewPort.Width * 100)+'%');
		}catch(e){ }
	}
	(isSvgRendering) && console.log('AD is rendering with SVG');
}

function defineSVdata(){
	for(var i in Chrysler_SVdata)
		(valueValidator( adkit.getSVData(i) ) && typeof Chrysler_SVdata[i] != 'undefined') && (Chrysler_SVdata[i] = adkit.getSVData(i));

	Chrysler_SVdata['Language'] = getLanguage(Chrysler_SVdata['Language']);
	Chrysler_SVdata['AssetPath'] = getSecuredURL(Chrysler_SVdata['AssetPath']);
	Chrysler_SVdata['Year'] = valueValidator( adkit.getSVData("ModelYear") ) ? adkit.getSVData("ModelYear") : '2018';
	Chrysler_SVdata['GeneralClick'] = adkit.getSVData("GeneralPanelClick");
	Chrysler_SVdata['CTA1Click'] = adkit.getSVData("Button1URL");
	Chrysler_SVdata['CTA2Click'] = adkit.getSVData("Button2URL");

	try{ Chrysler_SVdata['Size'] = EB._adConfig.width + 'x' + EB._adConfig.height; }catch(e){ Chrysler_SVdata['Size'] = '728x90'; }
	try{
		Chrysler_SVdata['TemplateType'] = Chrysler_globalTemplateType || adkit.getSVData('TemplateType');
	}catch(e){
		if(valueValidator(Chrysler_SVdata['CreativeVersion'])){
			Chrysler_SVdata['TemplateType'] = Chrysler_SVdata['CreativeVersion'].search('DCO') > -1 ? 'DCO' :
																				Chrysler_SVdata['CreativeVersion'].search('NonEndemic') > -1 && '300x250 160x600 728x90'.search(Chrysler_SVdata['Size']) > -1 ? 'NonEndemic' :
																				Chrysler_SVdata['CreativeVersion'].search('Oyster') > -1 && Chrysler_SVdata['Size'] == '300x600' ? 'Oyster' : 'Endemic';
		}else{
			Chrysler_SVdata['TemplateType'] = 'Endemic';//DCO | Endemic | NonEndemic | Oyster
		}
	}

	function getValueWithSVdata(_ids){
		for(var i=0; i < _ids.length; i++){
			if( valueValidator(adkit.getSVData(_ids[i])) )
				return adkit.getSVData(_ids[i]);
		}
		return '';
	}
	Chrysler_SVdata['CTA1Text'] = getValueWithSVdata(['Button1','Button1Text','Button1Copy']);
	Chrysler_SVdata['CTA2Text'] = getValueWithSVdata(['Button2','Button2Text','Button2Copy']);
	Chrysler_SVdata['OfferFrameBackground'] = getValueWithSVdata(['BackgroundImageOfferFrame','OfferFrameBackground','OfferBackgroundURL']);
	Chrysler_SVdata['OfferFrameTextColor'] = getValueWithSVdata(['FontColorOfferFrame','OfferFrameFontColor','OfferColor']);
	Chrysler_SVdata['OfferFrameLegalOrder'] = getValueWithSVdata(['OfferLookupLegalDisplayOrder','OfferFrameLegalOrder']);
	Chrysler_SVdata['TESTvsLIVE'] = getValueWithSVdata(['OfferData - Live vs Test','isOfferLive']);
	Chrysler_SVdata['Legal1Text'] = getValueWithSVdata(['LegalFrame1', 'Legal1Text']);
	Chrysler_SVdata['Legal2Text'] =	getValueWithSVdata(['LegalFrame2', 'Legal2Text']);
	Chrysler_SVdata['Legal3Text'] = getValueWithSVdata(['LegalFrame3', 'Legal3Text']);
	Chrysler_SVdata['Legal1Order'] = getValueWithSVdata(['LegalFrame1DisplayOrder','Legal1Order']);
	Chrysler_SVdata['Legal2Order'] = getValueWithSVdata(['LegalFrame2DisplayOrder','Legal2Order']);
	Chrysler_SVdata['Legal3Order'] = getValueWithSVdata(['LegalFrame3DisplayOrder','Legal3Order']);
}

function initTemplates(){
	var templateName, cssName;
	if(Chrysler_SVdata['TemplateType'] != 'DCO' && Chrysler_SVdata['Year'].search('T2') > -1){
		(Chrysler_SVdata['TemplateType'] == 'Oyster') && (Chrysler_SVdata['TemplateType'] = 'Endemic');
		templateName = Chrysler_SVdata['TemplateType']+'_2019';
		cssName = templateName +'_'+ Chrysler_SVdata['Brand'];
	}else{
		templateName = Chrysler_SVdata['TemplateType'];
		cssName = Chrysler_SVdata['TemplateType'];
	}

	var CSSurl = (document.location.protocol.search('http') == -1) ? '../../../CDN/CSS/' : Chrysler_SVdata['AssetPath']+Chrysler_globalAssetFolder +'/CSS/';
		  CSSurl+= (Chrysler_SVdata['TemplateType'] == 'DCO' && Chrysler_SVdata['Size'] == '300x600' ? 'Oyster/Oyster' : Chrysler_SVdata['TemplateType']+'/'+ cssName)  +'_'+ Chrysler_SVdata['Size'] +'.css';
	var CSSFeed = document.createElement('link');
			CSSFeed.href = CSSurl;
			CSSFeed.type = 'text/css';
			CSSFeed.rel = 'stylesheet';
	document.getElementsByTagName('head')[0].appendChild(CSSFeed);
	/*
	rel="preload"
	*/
	addFEED(templateName+'.js', 'Chrysler-template');
	(Chrysler_SVdata['Size'] == '300x600' && Chrysler_SVdata['Year'].search('T2') > -1) && (Chrysler_SVdata['TemplateType'] = 'Oyster');
	(Chrysler_SVdata['TemplateType'] != 'Tier2') && addFEED('Chrysler_endFrame.js', 'Chrysler-endFrame');
	document.getElementById('Chrysler_Wrapper').setAttribute('class', Chrysler_SVdata['Brand']);
}

function overridingSVdata(){
	window.addEventListener('message', receiveMessage, false);
	parent.postMessage('templateIsReady', '*');

	function receiveMessage(e){
		if(e.data.search('Chrysler_SVdata') == -1)
			return;

		var data = eval(JSON.parse(e.data));
		if(typeof data['Chrysler_SVdata'] != 'undefined'){
			for(var p in data['Chrysler_SVdata'])
				Chrysler_SVdata[p] = data['Chrysler_SVdata'][p] || '';
		}
		if(typeof data['Chrysler_offerData'] != 'undefined'){
			Chrysler_SVdata['offerType'] = data['Chrysler_offerData'];
			Chrysler_SVdata['offerlayout'] = data['Chrysler_layoutData'];
			addFEED('Chrysler_XMLfeeds.js', 'Chrysler-feeds');
		}
		window.removeEventListener('message', receiveMessage, false);
		initTemplates();
	}
}
/***	Initiate functions 	***/


/***	Animations	***/
function initiateLogoAnimation(){
	if(Chrysler_SVdata['EventLogo'].toUpperCase() == 'FALSE' || valueValidator(Chrysler_feeds.campaign) == false)
		 return initiateMainAnimation();

	 var eventLogo = Chrysler_SVdata['AssetPath'] +'EventLogos/'+ Chrysler_feeds.campaign +'_'+ Chrysler_SVdata['Size'] +'.png',
	 	myImage = new Image();
	 	myImage.onload = displayEventLogo;
	 	myImage.onerror = initiateMainAnimation;
	 	myImage.src = eventLogo;

	 function displayEventLogo(){
		document.getElementById('Chrysler_EventLogo').style.backgroundImage = 'url('+ eventLogo +')';
		document.getElementById('Chrysler_EventLogo').style.opacity = '1';
		document.getElementById('Chrysler_Wrapper').style.opacity = '1';
		window.setTimeout(initiateMainAnimation, 3000);
	 }
}

function initiateMainAnimation(_inx){
	(typeof _inx == 'undefined' ) && (_inx = 0);
	if(!mainAnimationReady && _inx < 35)
		 window.setTimeout(function(){ initiateMainAnimation(_inx+1)}, 200);
	else
		initiateEndAnimation(0);
}

function initiateEndAnimation(_inx) {
	(typeof _inx == 'undefined') && (_inx = 0);

	if(!isOfferFrameReady && _inx < 35)
		return window.setTimeout(function(){ initiateEndAnimation(_inx + (typeof isSvgRendering == 'undefined' ? 0 : 1))}, 200);

	if(!isOfferFrameReady){
		try{
			document.getElementById('Chrysler_OfferFrame').style.backgroundImage = 'url('+ EB._adConfig.resourcePath + EB._adConfig.defaultImagePath +')';
		}catch(e){
			document.getElementById('Chrysler_OfferFrame').style.backgroundImage = 'url('+ Chrysler_SVdata['AssetPath']+'Defaults/'+ Chrysler_SVdata['Brand'] +'_'+ Chrysler_SVdata['Size'] +'.jpg)';
		}
		document.getElementById('Chrysler_OfferFrame').innerHTML = "<a class='Chrysler_GenClk' onclick='mainClick();'></a>";
	}
	document.getElementById('Chrysler_Wrapper').style.opacity = '1';
	document.getElementById('Chrysler_OfferFrame').style.opacity = '1';
	document.getElementById('Chrysler_OfferFrame').style.left = '0px';
	(typeof initOfferAnimation != 'undefined') && initOfferAnimation();
}
/***	Animations	***/


/***	Set Global Graphic Elements	***/
function getLogoImage(){
	 var thisLogo = '';
	 if(valueValidator(Chrysler_SVdata['OfferFrameLogo'])){
		 thisLogo = getSecuredURL( Chrysler_SVdata['OfferFrameLogo'] );
	 }else{
		 thisLogo = Chrysler_SVdata['AssetPath'] +'BrandLogos/'+ Chrysler_SVdata['Brand'];
		 (Chrysler_SVdata['Brand'] == 'Ram' && 'chassiscab3500 rampromaster rampromastercitytradesman'.search( Chrysler_SVdata['Model'].toLowerCase().replace(/\_|\s/gi, '') ) > -1) && (thisLogo += '_Commercial');
		 thisLogo += Chrysler_SVdata['Brand'] == 'Jeep' ? '.svg' : (Chrysler_SVdata['Brand'] == 'Alfa' ? '' : '_'+Chrysler_SVdata['Size']) +'.png';
	 }
	 return thisLogo;
}
/***	Set Global Graphic Elements	***/


/***	Supportive functions	***/
function getLanguage(_lan){
	('english'.search(_lan.toLowerCase()) > -1) && (_lan = 'eng');
	('spanish'.search(_lan.toLowerCase()) > -1) && (_lan = 'esp');
	('dodge_hardcoded dhc'.search(_lan.toLowerCase()) > -1) && (_lan = 'dodge_hardcoded');
	return valueValidator(_lan) ? _lan : 'eng';
}

function getSecuredURL(url){
	if(typeof url == 'undefined')
		return url;

	if(url.constructor == Object)
		url = url.data;

	if(document.location.protocol == 'https:'){
		if (url.search('http://gizmo.serving-sys') !=-1)
			url = url.replace('http://gizmo.serving-sys', 'https://gizmo-s.serving-sys');
		else if (url.search('ds.serving-sys') !=-1)
			url = url.replace('http://ds.serving-sys', 'https://secure-ds.serving-sys');
		else if (url.search('services.serving-sys') != -1)
			url = url.replace('http://', 'https://');
	}
	if(/jpeg|.jpg|.png|.gif|tiff|.bmp|html/.test(url.toLowerCase().slice(url.length-4, url.length)) && url.search('Creative/Chrysler/') != -1)
		url = Chrysler_SVdata['AssetPath'].slice(0, Chrysler_SVdata['AssetPath'].indexOf('Chrysler/')) + url.slice(url.indexOf('Chrysler/'), url.length);
	if(url.search('[size]') > -1)
		url = url.replace('[size]', Chrysler_SVdata['Size']);
	return url;
}

function addFEED(_url, _id) {
	if(typeof _id != 'undefined' && _id.length > 0 && document.getElementById(_id) != null)
		return;

	if(_url.search('http') == -1)
		_url = (document.location.protocol.search('http') == -1) ? '../../../CDN/JS/'+_url : Chrysler_SVdata['AssetPath']+ Chrysler_globalAssetFolder +'/JS/'+ _url;

	var feed = document.createElement('script');
	(typeof _id != 'undefined' && _id.length > 0) && (feed.id = _id);
	feed.src = getSecuredURL(_url);
	feed.charset = 'utf-8';//feed.async = false;
	document.getElementsByTagName('head')[0].appendChild(feed);
}

function valueValidator(data) {
	if(typeof data == 'undefined' || data == null)
		return false;
	if(typeof data == "string" && (data.length == 0 || data.toLowerCase().replace(/\s|\_/gi, '').search('novalue') > -1 || data.toLowerCase() == "n/a"))
		return false;
	return true;
}

function getSVdataValues(_p, _i){
	if(parent != window && EB._adConfig.ebReferrer.search('origin.demo.sizmek.com/Auto/Chrysler/') > -1)
		return typeof _i != 'undefined' && typeof Chrysler_SVdata[_i] != 'undefined' ? Chrysler_SVdata[_i] : typeof Chrysler_SVdata[_p] != 'undefined' ? Chrysler_SVdata[_p] : '';
	else
		return valueValidator( adkit.getSVData(_p) ) ? adkit.getSVData(_p) : '';
}

function trackingNoun(_int, _noun){
	try{
		var nounTracker = "";
		if(String(EB._adConfig.adId).length > 8)
			nounTracker += "https://bs.serving-sys.com/Serving/adServer.bs?cn=display&c=19&pli=1073952795&adid=1073972634&ord=[timestamp]&rtu=-1&pcp=$$";
		else
			nounTracker += "https://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=16478984&PluID=0&ord=%time%&rtu=-1&pcp=$$";
		nounTracker += 'sID='+ String(EB._adConfig.sID) +'|adID='+ String(EB._adConfig.adId);
		nounTracker += (String(EB._adConfig.adId).length > 8 ? "|vID=" : "|vId=")+ String(EB._adConfig.massVersioning.adVersions).split("_")[0];
		nounTracker += "|interactionName=Chrysler_"+ _int +"|noun="+ _noun +"$$";
		var nounImg = new Image();
		nounImg.src = nounTracker;
	}catch(e){
		console.log('tracking noun >> ', _int, _noun);
	}
}

function loadingJOSN(_url, _callback){
	try{
		var xhttp = new XMLHttpRequest();
		(typeof xhttp.overrideMimeType != 'undefined') && xhttp.overrideMimeType("application/json");
		xhttp.withCredentials = false;
		xhttp.open('GET', _url, true);
		xhttp.onreadystatechange = function() {
			(this.readyState == this.DONE && this.status == 200) && _callback( JSON.parse(this.responseText) );
		};
		xhttp.send(null);
	}catch(e){
		_callback();
	}
}
/***	Supportive functions	***/


/***	interactions	***/
function mainClick(){
	if(Chrysler_SVdata['GeneralClick'].length == 0)
		defaultClickthrough('Build and Price');
	else
		reDirectClickthrough(Chrysler_SVdata['GeneralClick']);
	trackingNoun('offerClick', 'CLICK_'+ (typeof Chrysler_feeds == 'undefined' ? 'generic' : Chrysler_feeds.offerType+Chrysler_feeds.additionalNoun));
}

function Button1Click() {
	if(Chrysler_SVdata['CTA1Click'].length == 0)
		defaultClickthrough('Build and Price');
	else
		reDirectClickthrough(Chrysler_SVdata['CTA1Click']);
	trackingNoun('offerClick', 'CLICK_'+ (typeof Chrysler_feeds == 'undefined' ? 'generic' : Chrysler_feeds.offerType+Chrysler_feeds.additionalNoun));
}

function Button2Click() {
	if(Chrysler_SVdata['CTA2Click'].length == 0)
		defaultClickthrough('Build and Price');
	else
		reDirectClickthrough(Chrysler_SVdata['CTA2Click']);
	trackingNoun('offerClick', 'CLICK_'+ (typeof Chrysler_feeds == 'undefined' ? 'generic' : Chrysler_feeds.offerType+Chrysler_feeds.additionalNoun));
}

function defaultClickthrough(_label){
	var clickLabel = '',
		clickURL = '',
		clickLabels = [],
		failSafeURLS = {
			'Chrysler' : 'http://www.chrysler.com',
			'Dodge' : 'http://www.dodge.com',
			'Ram' :'http://www.ramtrucks.com',
			'Jeep' : 'http://www.jeep.com/en',
			'Fiat' : 'http://www.fiat.com',
			'Alfa' : 'https://www.alfaromeousa.com/'
		};
	try{
		for(var int in EB._adConfig.interactions){
			if(int.search(_label) > -1){
				clickLabels.push(int);
				if(clickURL.length == 0){
					clickLabel = int;
					clickURL = EB._adConfig.interactions[int].jumpUrl;
				}
			}
		}
	}catch(e){
		clickURL = failSafeURLS[Chrysler_SVdata['Brand']];
		clickLabel = _label;
	}
	(clickURL.length == 0) && (clickURL = failSafeURLS[Chrysler_SVdata['Brand']]);
	(clickLabel.length == 0) && (clickLabel = clickLabels.length > 0 ? clickLabels[Math.floor(Math.random() * clickLabels.length)] : 'ebDefaultClick');
	EB.clickthrough(clickLabel, clickURL);
}

function reDirectClickthrough(_label){
	var clickURL, needToAppend = false;
	try{
		clickURL = EB._adConfig.interactions[_label].jumpUrl;
		needToAppend = Boolean(clickURL.match(/\?/gi).length == 1);
	}catch(e){
		clickURL = '';
	}

	if(clickURL.length > 0 && needToAppend && typeof Chrysler_feeds.redirectURLs != 'undefined'){
	   var prop = _label.replace(/\s|-|_/gi, '').toLowerCase();
		for(var p in Chrysler_feeds.redirectURLs)
			(prop.search(p) > -1) && (EB._adConfig.interactions[_label].jumpUrl = clickURL+Chrysler_feeds.redirectURLs[p]);
	}
	try{ console.log('clickURL:', EB._adConfig.interactions[_label].jumpUrl); }catch(e){ }
	EB.clickthrough(_label);
}

function skipToOffer() {
	EB.automaticEventCounter("Skip to Offer");
	document.getElementById('Chrysler_skipBTN').style.display = 'none';
	initiateEndAnimation();
}
/***	interactions	***/


/*
function setSkipButton(){
	if(Chrysler_SVdata['SkipButton'].toLowerCase() == 'false')
		return;

		if('DCO' == Chrysler_SVdata['TemplateType'])
			document.getElementById('Chrysler_AniFrame').innerHTML += '<div id="Chrysler_skipBTN" class="'+ (Chrysler_SVdata['Language'] == 'esp' ? "esp" : "eng") +'" onclick="skipToOffer();"><div id="skipCopy"></div></div>';
		else
			document.getElementById('Chrysler_AniFrame').innerHTML += "<div id='Chrysler_skipBTN' onclick='skipToOffer();'></div>";
}*/
