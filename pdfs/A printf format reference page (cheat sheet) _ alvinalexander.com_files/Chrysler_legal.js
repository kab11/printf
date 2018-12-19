/*
	Chrysler Legal Library
	Developed by Heajin Seo in Nov 2017.
	Ver 2.0
*/

function setLegalCopy(){

	if(document.getElementById('Chrysler_LegalBtn') == null)
		return;

	var LegalTexts = valueValidator(Chrysler_SVdata['AnimationLegal']) ? getLegalTextForDCO() : getLegalTextForCCB();
	if(LegalTexts.length == 0)
		return;

	if(Chrysler_SVdata['Brand'] == 'Alfa'){
		LegalTexts += "<br/>©2018 FCA US LLC. All Rights Reserved. ALFA ROMEO is a registered trademark of FCA Group Marketing S.p.A., used with permission.";
	}else if(Chrysler_SVdata['Language'] == 'esp'){
		if(Chrysler_SVdata['Brand'] == 'Dodge'){
			LegalTexts += "<br/>©2017 FCA US LLC. TODOS LOS DERECHOS RESERVADOS. CHRYSLER UNA MARCA REGISTRADA DE FCA US LLC.";
		}else{
			LegalTexts += "<br/>©2017 FCA US LLC. TODOS LOS DERECHOS RESERVADOS. [veh] SON MARCAS REGISTRADAS DE FCA US LLC.".replace('[veh]', Chrysler_SVdata['Brand'].toUpperCase());
		}
	}else{
		if(Chrysler_SVdata['Brand'] == 'Fiat'){
			LegalTexts += "<br/>©2018 FCA US LLC. All Rights Reserved. FIAT is a registered trademark of FCA Group Marketing S.p.A., used under license by FCA US LLC.";
		}else{
			LegalTexts += "<br/>©2018 FCA US LLC. All Rights Reserved. [veh] is a registered trademark of FCA US LLC.".replace('[veh]', Chrysler_SVdata['Brand']);
		}
	}

	document.getElementById('Chrysler_LegalCopy').innerHTML = LegalTexts + '<br/>';
	document.getElementById('Chrysler_LegalBtn').style.display = 'block';
	document.getElementById('Chrysler_LegalBtn').addEventListener('click', openLegal);
	document.getElementById('Chrysler_LegalCopyContainer').addEventListener('scroll', scrollLegal);
	document.getElementById('Chrysler_LegalCopyContainer').addEventListener('mousedown', unlockScroll);
	document.getElementById('Chrysler_LegalCopyContainer').style.overflowY = navigator.userAgent.match(/iPad|iPhone|iPod/i) ? 'scroll' :'auto';

	try{
		var brandFonts = {
			'Chrysler':{name:'VerlagBold', file:'Verlag Bold'},
			'Dodge':{name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
			'Ram' : {name:'TGBC20', file:'Trade Gothic Bold Condensed No. 20'},
			'Jeep':{name:'GOTHMMED', file:'GOTHMMED'},
			'Fiat':{name:'GillSans', file:'Gill Sans'},
			'Alfa':{name:'RobotoMedium', file:'Roboto-Medium'}
		};
		Chrysler_fontManager.loadingFont( brandFonts[Chrysler_SVdata['Brand']], function(){
			document.getElementById('Chrysler_LegalCopy').style.fontFamily = Chrysler_fontManager.getFontFamily(brandFonts[Chrysler_SVdata['Brand']].name);
		});
	}catch(e){
		document.getElementById('Chrysler_LegalCopy').style.fontFamily = 'Arial';
	}
}

function getLegalTextForCCB(){
	var legalOrder = {'Legal1Order':'Legal1Text', 'Legal2Order':'Legal2Text', 'Legal3Order':'Legal3Text', 'OfferFrameLegalOrder':'' },
		legalArray = [],
		targetContent, LegalTexts = '';

	for(var i in legalOrder){
		targetContent = i == 'OfferFrameLegalOrder' ? Chrysler_feeds['legal'] : Chrysler_SVdata[legalOrder[i]];
		if(valueValidator(targetContent))
			legalArray.push((Chrysler_SVdata[i].length == 0 ? legalArray.length : Chrysler_SVdata[i])+ '_'+targetContent);
	}
	legalArray.sort();
	for(var j=0; j < legalArray.length; j++){
		targetContent = legalArray[j].split('_')[1];
		valueValidator(targetContent) && (LegalTexts += targetContent.replace(/(?:\r\n|\r|\n)/g, '<br />') +'<br/>');
	}
	return LegalTexts;
}

function getLegalTextForDCO(){
	var LegalTexts = !valueValidator(Chrysler_SVdata['AnimationLegal']) ? '' : Chrysler_SVdata['AnimationLegal']+'<br/><br/>';
	valueValidator(Chrysler_feeds['legal']) && (LegalTexts += Chrysler_feeds['legal'] +'<br/><br/>');
	return LegalTexts;
}



function openLegal() {
	try{
		if(typeof EB._adConfig.interactions["Legal Open"] != 'undefined')
			EB.automaticEventCounter("Legal Open");
		else
			EB.automaticEventCounter("LegalOpen");
	}catch(e){	}

	/*if(Chrysler_SVdata['TemplateType'] == 'NonEndemic')
		document.getElementById('Chrysler_LegalFrame').setAttribute('class', 'open');
	else*/
		document.getElementById('Chrysler_LegalFrame').style.top = '0%';
}

function closeLegal() {
	try{
		if(typeof EB._adConfig.interactions["Legal Close"] != 'undefined')
			EB.automaticEventCounter("Legal Close");
		else
			EB.automaticEventCounter("LegalClose");
	}catch(e){	}
  /*if(Chrysler_SVdata['TemplateType'] == 'NonEndemic')
		document.getElementById('Chrysler_LegalFrame').setAttribute('class', '');
	else*/
		document.getElementById('Chrysler_LegalFrame').style.top = '103%';
}

function scrollLegal() {
    if (!scrollActivityLock) {
		try{
			if(typeof EB._adConfig.interactions["Legal Scroll"] != 'undefined')
				EB.automaticEventCounter("Legal Scroll");
			else
				EB.automaticEventCounter("LegalScroll");
		}catch(e){	}
        scrollActivityLock = true;
    }
}

function unlockScroll() {
    scrollActivityLock = false;
}

var scrollActivityLock = true;

(function(){
	var legalFrameHTML = [
		"<div id='Chrysler_LegalCopyContainer'><div id='Chrysler_LegalCopy'></div></div>",
		"<div id='Chrysler_CloseBtn' onclick='closeLegal();' "+ (Chrysler_SVdata['Language'] == 'esp'? "class='ES'" : "") +"></div>"
	];
	document.getElementById('Chrysler_LegalFrame').innerHTML = legalFrameHTML.join('');
})();
