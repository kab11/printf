/*
	Chrysler DCO Template
	by Heajin Seo. Nov.2016
*/

var DCOanimationTimer;

function loadAnimationValuesFromSmartItems(){
	(Chrysler_SVdata['Size'] == '300x600') && (Chrysler_SVdata['TemplateType'] = 'Oyster');
	Chrysler_SVdata['AnimationFolder'] = getSVdataValues('AnimationFolder');
	Chrysler_SVdata['AnimationLegal'] = getSVdataValues('legal', 'AnimationLegal');
	(Chrysler_SVdata['CreativeVersion'].length == 0 || Chrysler_SVdata['CreativeVersion'].search('_wLogo') == -1) && (Chrysler_SVdata['EventLogo'] = 'FALSE');

	var iframeAssetPath = Chrysler_SVdata['AssetPath'] +'animation/'+ Chrysler_SVdata['AnimationFolder'] +'/'+ Chrysler_SVdata['CreativeVersion'].replace('_wLogo', '');
	Chrysler_AnimationData = iframeAssetPath +'_Animation_'+ Chrysler_SVdata['Size'] +'.html';
	Chrysler_SVdata['OfferFrameBackground'] = (Chrysler_SVdata['OfferFrameBackground'].toLowerCase() == 'yes') ? iframeAssetPath +'_OfferBackground_'+ Chrysler_SVdata['Size'] +'.png' : (Chrysler_SVdata['TemplateType'] == 'Oyster') ? Chrysler_SVdata['OfferFrameBackground'] : '';
	Chrysler_SVdata['OfferFrameLogo'] = (Chrysler_SVdata['Size'] != '300x600') ? iframeAssetPath +'_OfferLogo_'+ Chrysler_SVdata['Size'] +'.png' : '';
}

function setCreativeElements() {
	var addEvent = window.addEventListener ? "addEventListener" : "attachEvent",
		removeEvent = window.removeEventListener ? "removeEventListener" : "detachEvent",
		messageEvent = addEvent == "attachEvent" ? "onmessage" : "message";

	window[addEvent](messageEvent, recieveMessage,false);

	function recieveMessage(e) {
		var key = e.message ? "message" : "data";
		if (e[key] == 'true'){
			 initiateEndAnimation();
			 window[removeEvent](messageEvent, recieveMessage, false);
		}else if(e[key] == 'initAnimation'){
			window.clearTimeout(DCOanimationTimer);
			document.getElementById('Chrysler_AniFrame').style.left = '0px';
			document.getElementById('Chrysler_AniFrame').style.opacity = '1';
			document.getElementById('Chrysler_Wrapper').style.opacity = '1';
		}
	}
	mainAnimationReady = true;
}

function initiateMainAnimation(_inx){
	if(document.getElementById('Chrysler_iframe') == null)
		return initiateEndAnimation();
	document.getElementById('Chrysler_iframe').setAttribute('src', Chrysler_AnimationData);
	DCOanimationTimer = window.setTimeout(initiateEndAnimation, 3000);
}


(function(){
	loadAnimationValuesFromSmartItems();
	try{
		var PC1 = EB._adConfig.oURLTokens.tp_PlacementClassifications1,
			TA = EB._adConfig.massVersioning.targetAudienceId,
			TA_list = '1314695 1314694 1281460 1281011 1200859 968736 968735 968734 968733 968732 968731 968730 968729 968728';
		if((PC1.toLowerCase() == 'undefined' || PC1.length == 0) && (TA.toLowerCase() == 'undefined' || TA.length == 0 || TA_list.search(TA) > -1)){
			for(var p in {'Year':'', 'EventLogo':'', 'OfferFrameBackground':'', 'OfferFrameLogo':'',	'OfferFrameTextColor':'', 'OfferFrameLegalOrder':'', 'TESTvsLIVE':'', 'BGImage1':'', 'BGImage2':'', 'BGImage3':'', 'VehicleImage1':'', 'VehicleImage2':'', 'VehicleImage3':'', 'CopyImage1':'', 'CopyImage2':'', 'CopyImage3':'', 'AnimationFolder':'',	'AnimationLegal':'', 'sponsorLogo':''})
				Chrysler_SVdata[p] = '';
			Chrysler_SVdata['offerType'] = 'softFailSafe '+ (TA.toLowerCase() == 'undefined' || TA.length == 0 ? 'generic': TA);
		}
	}catch(e){	}

	if(!valueValidator(Chrysler_SVdata['AnimationFolder']) || !valueValidator(Chrysler_SVdata['CreativeVersion']))
		return mainAnimationReady = true;

	var iframeSize = Chrysler_SVdata['Size'].split('x');
	var innerHTML = "<iframe id='Chrysler_iframe' width='"+iframeSize[0]+"px' height='"+iframeSize[1]+"px' scrolling='no' style='border:none !important'></iframe><a class='Chrysler_GenClk' onclick='mainClick();'></a>";
	(getSVdataValues('SkipButton').toLowerCase() != 'false') && (innerHTML += '<div id="Chrysler_skipBTN" class="'+ (Chrysler_SVdata['Language'] == 'esp' ? "esp" : "eng") +'" onclick="skipToOffer();"><div id="skipCopy"></div></div>');
	document.getElementById('Chrysler_AniFrame').innerHTML = innerHTML;
	window.setTimeout(setCreativeElements, 200);
})();
