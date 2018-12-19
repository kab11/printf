EBG="undefined"!=typeof EBG?EBG:{};EBG.Semi=EBG.Semi||{};EBG.Semi.Infra=function(){};EBG.Semi.Infra.declareNamespace=function(a){for(var b=window.EBG.Semi,a=a.split("."),c=0;c<a.length;c++){var d=a[c],e=b[d];e||(e=b[d]={});b=e}};EBG.Semi.Infra.isDefined=function(a){return"undefined"!=typeof a};EBG.Semi.Infra.runTimed=function(a,b,c,d){return setTimeout(function(){b.apply(a,c)},d)};EBG.Semi.Infra.indexOfArray=function(a,b,c){for(var c=c||0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1};
EBG.Semi.Infra.getTimestamp=function(){var a=new Date;return parseInt(a.getHours()+1)+":"+a.getMinutes()+":"+a.getSeconds()+"."+a.getMilliseconds()+" "+a.getDate()+"."+parseInt(a.getMonth()+1)+"."+a.getFullYear()};EBG.Semi.Infra.getQuerystringParam=function(a,b){if(!b)b=window.location.href;var a=a.replace(/[\[\]]/g,"\\$&"),c=RegExp("[?&]"+a+"(=([^&#]*)|&|#|$)").exec(b);return!c?null:!c[2]?"":decodeURIComponent(c[2].replace(/\+/g," "))};
EBG.Semi.Infra.getValueFromPath=function(a){try{for(var a=a.split("."),b=window,c=0;c<a.length;c++)b=b[a[c]];return b}catch(d){}return null};EBG.Semi.Infra.getUrlParameter=function(a){var b="",c=EBG.Semi.Infra.getWindowLocation().toString(),d=RegExp("[&,?]"+a+"=(.*)$","i");if((a=c.match(RegExp("[&,?]"+a+"=(.*)[&]","i"))||c.match(d))&&0<a.length)-1<a[1].indexOf("&")&&(a[1]=a[1].substr(0,a[1].indexOf("&"))),b=a[1];return b};
EBG.Semi.Infra.mergeObj=function(a,b,c){var c=!!c,d;for(d in a)if(a.hasOwnProperty(d)&&(!b.hasOwnProperty(d)||c))b[d]=a[d]};EBG.Semi.Infra.combinePaths=function(a,b){a=a||"";b=b||"";a&&"/"!=a[a.length-1]&&b&&"/"!=b[0]&&(a+="/");var c=a;b&&(c+=b);return c};EBG.Semi.Infra.isPageLoaded=function(){var a=!0;"complete"!=document.readyState&&"loaded"!=document.readyState&&"interactive"!=document.readyState&&(a=!1);return a};
EBG.Semi.Infra.addChildToPage=function(a,b,c,d){if("undefined"==typeof b||!b)b=document.body||document.getElementsByTagName("head")[0];this.isDefined(c)&&null!=c&&this.addEventListener(a,c,d);b.appendChild(a)};EBG.Semi.Infra.addEventListener=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):(b="on"+b,a.attachEvent?a.attachEvent(b,c):b in a&&(a[b]=c))};EBG.Semi.Infra.createScriptElement=function(a,b,c,d){try{var e=a.createElement(b);e.type=c;e.src=d;e.async=!1;return e}catch(g){}};
EBG.Semi.Infra.addScriptElement=function(a,b,c){var d=c?c:document;if(b){if(c=b,0==c.childNodes.length)d=d.createElement("div"),d.style.display="none",b.appendChild(d)}else c=d.head||d.documentElement;c.insertBefore(a,c.firstChild)};
EBG.Semi.Infra.ajax=function(){var a={x:function(){if("undefined"!==typeof XMLHttpRequest)return new XMLHttpRequest;for(var a="MSXML2.XmlHttp.6.0,MSXML2.XmlHttp.5.0,MSXML2.XmlHttp.4.0,MSXML2.XmlHttp.3.0,MSXML2.XmlHttp.2.0,Microsoft.XmlHttp".split(","),c,d=0;d<a.length;d++)try{c=new ActiveXObject(a[d]);break}catch(e){}return c},send:function(b,c,d,e,g){void 0===g&&(g=!0);var f=a.x();f.open(d,b,g);f.onreadystatechange=function(){4==f.readyState&&c(f.responseText)};"POST"==d&&f.setRequestHeader("Content-type",
"application/x-www-form-urlencoded");f.send(e)}};a.get=function(b,c,d,e){var g=[],f;for(f in c)g.push(encodeURIComponent(f)+"="+encodeURIComponent(c[f]));a.send(b+(g.length?"?"+g.join("&"):""),d,"GET",null,e)};a.post=function(b,c,d,e){var g=[],f;for(f in c)g.push(encodeURIComponent(f)+"="+encodeURIComponent(c[f]));a.send(b,d,"POST",g.join("&"),e)};return a}();
EBG.Semi.Infra.injectScript=function(a){var a="<html><head></head><body>"+a+"</body></html>",b=this.createFriendlyIframe();this.addChildToPage(b);document.documentMode&&7<document.documentMode&&!this.isIframeScriptable(b)&&this.enableIframeScriptable(b);this.writeToFriendlyIframe(b,a,!0)};
EBG.Semi.Infra.loadFileByScriptElem=function(a,b,c,d,e,g){if(d)a=a?a:document,a.write("<script src='"+b+"'><\/script>"),a.close();else{var a=a||document,f=a.createElement("script");f.type="text/"+(b.type||"javascript");f.src=b.src||b;f.async=!0;var h=!1;f.onreadystatechange=f.onload=function(){var a=f.readyState;if(c&&!h&&(!a||/loaded|complete/.test(a)))h=!0,c.apply(e,[g])};f.onerror=function(){c.apply(e,[g])};EBG.Semi.Infra.addChildToPage(f,a.body||a.getElementsByTagName("head")[0])}};
EBG.Semi.Infra.executeTextByScriptElem=function(a,b,c,d,e){var a=a||document,g=a.createElement("script");g.type="text/javascript";g.text=b;EBG.Semi.Infra.addChildToPage(g,a.body||a.getElementsByTagName("head")[0]);c&&c.apply(d||window,[e])};EBG.Semi.Infra.getWindowLocation=function(){return window.location};
EBG.Semi.Infra.getCurrentScriptElement=function(){var a;if(document.currentScript)a=document.currentScript;else for(var b=document.getElementsByTagName("script"),c=0;!a&&c<b.length;c++)if(-1!==b[c].src.indexOf("ebOneTag.js")&&!b[c].chosen)b[c].chosen=!0,a=b[c];return function(){return a}}();EBG.Semi.Infra.getRandomNumber=function(){try{var a=Math.random().toString();return a=a.substr(a.indexOf(".")+1)}catch(b){}};
EBG.Semi.Infra.getAddInEyeDomain=function(a){var b="",c="",d=0,a=(a?a:window).document,a=a.referrer?a.referrer:a.location.href;try{a=a.toLowerCase(),7<=a.length&&"http://"==a.substr(0,7)?(c=a.substr(7),a.substr(0,7)):8<=a.length&&"https://"==a.substr(0,8)?(c=a.substr(8),a.substr(0,8)):c=a,d=c.indexOf("/"),0<d&&(c=c.substr(0,d)),b=c}catch(e){b=""}return b};
EBG.Semi.Infra.createFriendlyIframe=function(a,b,c,d){a=(a?a:document).createElement("iframe");b&&a.setAttribute("id",b);a.style.display=c?"":"none";a.style.width=c?c+"px":"0px";a.style.height=d?d+"px":"0px";document.documentMode&&8>document.documentMode?(a.frameBorder=0,a.margin=0,a.marginWidth=0,a.marginHeight=0,a.scrolling="no"):(a.setAttribute("scrolling","no"),a.setAttribute("marginwidth","0"),a.setAttribute("marginheight","0"),a.setAttribute("frameborder","0"));return a};
EBG.Semi.Infra.isIframeScriptable=function(a){try{this.ifrmDocument=a.contentWindow.document}catch(b){return!1}return!0};EBG.Semi.Infra.enableIframeScriptable=function(a){if(a){a.setAttribute("data-isready","false");var b;b="javascript:document.write('<scr'+'ipt>\r"+('try{parent.document.domain;}catch(e){document.domain="'+document.domain+'";}\r');a.src=b+"parent.EBG.Semi.Infra.friendlyIframeIsReadyCallback(window);\r</scr'+'ipt>\r');"}};
EBG.Semi.Infra.friendlyIframeIsReadyCallback=function(a){for(var b=document.getElementsByTagName("iframe"),c=0;c<b.length;c++)try{if((b[c].contentWindow||b[c].contentDocument.window||b[c].window)==a){b[c].setAttribute("data-isready","true");break}}catch(d){}};
EBG.Semi.Infra.writeToFriendlyIframe=function(a,b,c){if(document.documentMode&&7<document.documentMode&&"false"==a.getAttribute("data-isready"))setTimeout(function(){EBG.Semi.Infra.writeToFriendlyIframe(a,b,c)},100);else{var c=this.isDefined(c)?c:!1,d;d=a.contentWindow?a.contentWindow.document:a.contentDocument&&a.contentDocument.document?a.contentDocument.document:a.contentDocument;d.write(b);c&&setTimeout(function(){d.close()},1E3)}};
EBG.Semi.Infra.createUnfriendlyIframe=function(a,b,c){b&&!EBG.Semi.Infra.isPageLoaded()?(this.logger&&this.logger.info("Adding unfriendly iframe in sync mode, url: "+a),document.write('<iframe src="'+a+'" style="display:none;width:0px;height:0px"></iframe>')):(this.logger&&this.logger.info("Adding unfriendly iframe in async mode, url: "+a),b=document.createElement("iframe"),b.setAttribute("src",a),b.style.display="none",b.onload=c,EBG.Semi.Infra.addChildToPage(b))};
EBG.Semi.Infra.getTopLevelReferrer=function(a){var b=null;try{if(a.top&&a.top.document&&a.top.document.referrer)b=a.top.document.referrer.toString();else throw Error("Unfriendly iframe");}catch(c){this.isDefined(a)&&a.document&&a.document.referrer&&(b=a.document.referrer.toString())}return b};EBG.Semi.Infra.getTokenValueFromURL=function(a,b){var c=b.indexOf("?")?b.split("?")[1]:"";if(c)for(var c=c.split("&"),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]==a)return e[e.length-1]}return null};
EBG.Semi.Infra.urlAvailableLength=function(a){var b=8E3;EBG.Semi.Infra.isOldIE()&&(b=2048);return b-a.length};EBG.Semi.Infra.isOldIE=function(){var a=navigator.userAgent,b;if(-1!=(b=a.indexOf("MSIE"))){a=a.substring(b+5);if(-1!=(b=a.indexOf(";")))a=a.substring(0,b);if(-1!=(b=a.indexOf(" ")))a=a.substring(0,b);a=parseInt(""+a,10);isNaN(a)&&(parseFloat(navigator.appVersion),a=parseInt(navigator.appVersion,10));if(9>a)return!0}return!1};
EBG.Semi.Infra.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array||!(a instanceof Object)&&"[object Array]"==Object.prototype.toString.call(a)||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if(!(a instanceof Object)&&("[object Function]"==Object.prototype.toString.call(a)||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call")))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};EBG.Semi.declareNamespace=EBG.Semi.Infra.declareNamespace;EBG.Semi.declareNamespace("Logging");EBG.Semi.Logging.Logger=function(a){this._level=a;this.startNestingGroupNames=[];this.endNestingGroupNames=[]};EBG.Semi.Logging.Logger.DebugMode="mmdebug";EBG.Semi.Logging.Logger.LoggerLevels={NONE:0,ERROR:1,INFO:2,WARN:3,DEBUG:4};
EBG.Semi.Logging.Logger.prototype={setLevel:function(a){this._level=a},timestamp:!1,debug:function(a){this._reportToLog(EBG.Semi.Logging.Logger.LoggerLevels.DEBUG,arguments)},info:function(a){this._reportToLog(EBG.Semi.Logging.Logger.LoggerLevels.INFO,arguments)},warn:function(a){this._reportToLog(EBG.Semi.Logging.Logger.LoggerLevels.WARN,arguments)},error:function(a){this._reportToLog(EBG.Semi.Logging.Logger.LoggerLevels.ERROR,arguments)},exception:function(a,b){var c="string"!==b?this._format("Exception in {0}. message: {1}",
a,b.message):this._format("Exception in: {0}. message: {1}",a,b);b.stack&&(c+=this._format(" stack: {0}",b.stack));this._reportToLog(EBG.Semi.Logging.Logger.LoggerLevels.ERROR,[c])},startGroup:function(a){this._supportNesting()&&this.startNestingGroupNames.push(a)},endGroup:function(){this._supportNesting()&&0<this.endNestingGroupNames.length&&window.console.groupEnd(this.endNestingGroupNames.pop())},_consoleAvailable:function(){try{return void 0!==window&&void 0!==window.console}catch(a){return!1}},
_supportNesting:function(){return this._consoleAvailable()?void 0!==window.console.group:!1},_supportErrorMessage:function(){return void 0!==window.console.error},_supportInfoMessage:function(){return void 0!==window.console.info||void 0!==window.opera},_supportWarnMessage:function(){return void 0!==window.console.warn||void 0!==window.opera},_supportObjectView:function(){return void 0!==window.console.dir||void 0!==window.opera},_callConsoleFunction:function(a,b){var c=!1;switch(a){case EBG.Semi.Logging.Logger.LoggerLevels.INFO:this._supportInfoMessage()&&
(window.console.info(b),c=!0);break;case EBG.Semi.Logging.Logger.LoggerLevels.WARN:this._supportWarnMessage()&&(window.console.warn(b),c=!0);break;case EBG.Semi.Logging.Logger.LoggerLevels.ERROR:this._supportErrorMessage()&&(consoleFunction=window.console.error(b),c=!0)}c||window.console.log(b)},_format:function(a){for(var b=1;b<arguments.length;b++)a=a.replace(RegExp("\\{"+(b-1)+"\\}","gi"),""+arguments[b]);return a},_getTimestamp:function(){if(this.timestamp)return EBG.Semi.Infra.getTimestamp()},
_reportToLog:function(a,b){if(this._level>=a&&this._consoleAvailable()){var c=b[0];"[object String]"!==Object.prototype.toString.call(c)?this._supportObjectView()||(c=c.toString()):c=this._format.apply(null,b);this.timestamp&&"[object String]"===Object.prototype.toString.call(c)&&(c=this._getTimestamp()+": "+c);if(void 0===window.opera){for(;this.startNestingGroupNames.length;)window.console.group(this.startNestingGroupNames[0]),this.endNestingGroupNames.push(this.startNestingGroupNames.shift());
this._callConsoleFunction(a,c)}else opera.postError(c)}}};EBG.Semi.Events=EBG.Semi.Events||{};EBG.Semi.Events.EventManager=function(){};
EBG.Semi.Events.EventManager.prototype={_subscriptions:{},subscribeToEvent:function(a,b,c,d){this._subscriptions[a]||(this._subscriptions[a]={});this._subscriptions[a][d]||(this._subscriptions[a][d]=[]);d&&this._subscriptions[a][d].push({callback:b,bindingCallback:c})},dispatchEvent:function(a,b,c){if(c)for(var d=this._subscriptions[a][c],e=0;e<d.length;++e){var g=this._subscriptions[a][c][e],f=g.callback;f.apply(g.bindingCallback,[b])}else for(c in a=this._subscriptions[a],a)if(a[c]){d=a[c];for(e=
0;e<d.length;++e)g=a[c][e],f=g.callback,f.apply(g.bindingCallback,[b])}}};EBG.Semi.Events.eventMgr=EBG.Semi.Events.eventMgr||new EBG.Semi.Events.EventManager;EBG.Semi.EventName={ALL_USER_ID_FOUND:"allUserIdFound"};EBG.Semi.ServingState={script:"SCRIPT",friendlyIframe:"FRIENDLY_IFRAME",unfriendlyIframe:"IFRAME"};EBG.Semi.WindowUtil=function(){};
EBG.Semi.WindowUtil.getTopWindow=function(){var a=window,b=a.location.origin||a.location.protocol+"//"+a.location.host;a.EBservingMode=EBG.Semi.ServingState.script;try{if(window.location.ancestorOrigins&&window.URL)for(var c=0;c<location.ancestorOrigins.length;c++)if(0==c&&"null"==b&&(b=location.ancestorOrigins[0]),location.ancestorOrigins[c]===b)a=a.parent,a.EBservingMode=EBG.Semi.ServingState.friendlyIframe;else{a.EBservingMode=EBG.Semi.ServingState.unfriendlyIframe;break}else for(;a!==a.parent;){b=
null;c=a.location.origin||a.location.protocol+"//"+a.location.host;try{b=a.parent.location.origin||a.parent.location.protocol+"//"+a.parent.location.host}catch(d){}if(b===c)a=a.parent,a.EBservingMode=EBG.Semi.ServingState.friendlyIframe;else{a.EBservingMode=EBG.Semi.ServingState.unfriendlyIframe;break}}}catch(e){}return a};EBG.Semi.BandWidthDetection=function(){};
EBG.Semi.BandWidthDetection.prototype={checked:!1,checking:!1,speed:0,_adjustment:0.75,_images:[],_loaded:0,_maxSpeed:2E3,_tuneResults:[[150,1.6],[300,1.4],[500,1.3],[800,1],[1E3,0.9],[2E3,0.8]],initImages:function(a,b){this._images=[{path:unescape(a+b+"micro.gif"),bytes:51,start:null,end:null},{path:unescape(a+b+"micro.gif"),bytes:51,start:null,end:null},{path:unescape(a+b+"bw_image.png"),bytes:43677,start:null,end:null}]},_loadImage:function(a){this._images[a].start=(new Date).getTime();var b=new Image,
c=Math.random();b.onload=function(){window.EBP.ebBW._imageLoaded(a)};b.src=this._images[a].path+"?rnd="+c},_imageLoaded:function(a){this._images[a].end=(new Date).getTime();this._loaded++;this._loaded==this._images.length&&this._calculateSpeed()},listeners:[],addListener:function(a){this.listeners[window.EBP.ebBW.listeners.length]=a},_dispatchEvent:function(){for(var a=0;a<this.listeners.length;a++)this.listeners[a]&&(this.listeners[a](),this.listeners[a]=null)},_calculateSpeed:function(){var a=Math.min(this._images[0].end-
this._images[0].start,this._images[1].end-this._images[1].start),b=this._images[2].end-this._images[2].start,c=b,d=this._images[2].bytes;b>a&&(c=b-a,d-=this._images[0].bytes);this.speed=Math.round(8*(d/(c/1E3)/1024))*this._adjustment;if(Infinity==this.speed||this.speed>=this._maxSpeed)this.speed=this._maxSpeed;else{for(a=0;a<this._tuneResults.length&&this.speed>this._tuneResults[a][0];a++);this.speed=Math.min(this._maxSpeed,Math.round(this.speed*this._tuneResults[a][1]))}this.checked=!0;gEBMainWindow.EBP.BW=
gEBMainWindow.EBP.BW?gEBMainWindow.EBP.BW:{};gEBMainWindow.EBP.BW.speed=this.speed;gEBMainWindow.EBP.BW.checked=this.checked;this.checking=!1;this._dispatchEvent()},init:function(){this.checking=!0;this._loadImage(0);this._loadImage(1);this._loadImage(2);var a=this;setTimeout(function(){if(!a.checked)a.speed=56,a.checked=!0,a.checking=!1,gEBMainWindow.EBP.BW=gEBMainWindow.EBP.BW?gEBMainWindow.EBP.BW:{},gEBMainWindow.EBP.BW.speed=a.speed,gEBMainWindow.EBP.BW.checked=a.checked,a._dispatchEvent()},5E3)}};
EBG.BWDetection=EBG.Semi.BandWidthDetection;EBGUIP="undefined"!=typeof EBGUIP?EBGUIP:{};EBGUIP.Events=EBGUIP.Events||{};EBGUIP.Events.EventName={USER_ID_FOUND:"userIdFound",DOC_LOADED:"documentLoaded",EBUID_LOADED:"ebuidLoaded"};EBGUIP.Events.eventMgr=EBGUIP.Events.eventMgr||new EBG.Semi.Events.EventManager;EBGUIP="undefined"!=typeof EBGUIP?EBGUIP:{};
EBGUIP.UserIdProvider=function(){if("undefined"!=typeof gEBMainWindow&&gEBMainWindow.providersData)this._providersData=gEBMainWindow.providersData;else if("undefined"!=typeof gEBMainWindow)this._providersData={AdTruth:{data:null,providerCalled:!1},EBUidCache:{data:null,providerCalled:!1},Device9:{data:null,providerCalled:!1},SizmekDI:{data:null,providerCalled:!1}},gEBMainWindow.providersData=this._providersData};
EBGUIP.UserIdProvider.prototype={_filter:null,_currTagData:null,_arrProvidersNamesUsed:null,_providersEnum:["AdTruth","EBUidCache","Device9","SizmekDI"],_providers:{AdTruth:{isUsed:!1,shouldSendData:!0},EBUidCache:{isUsed:!1,shouldSendData:!0},Device9:{isUsed:!1,shouldSendData:!1},SizmekDI:{isUsed:!1,shouldSendData:!0}},_providersData:null,getUserIds:function(a){this._filter=a.filter;this._init();this._currTagData=a;if(!this._currTagData.currDoc)this._currTagData.currDoc=document;this._arrProvidersNamesUsed=
this._getValidProviderNames(a.uip);for(a=0;a<this._arrProvidersNamesUsed.length;a++)this._providers[this._arrProvidersNamesUsed[a]].isUsed=!0;this._loadProviders()},_init:function(){for(var a in this._providers)this._providers[a].isUsed=!1},_loadProviders:function(){if(0<this._arrProvidersNamesUsed.length){var a=this._arrProvidersNamesUsed[0];if(this._providersData[a].providerCalled)this._getUserIdentification({providerName:a});else{EBGUIP.Events.eventMgr.subscribeToEvent(EBGUIP.Events.EventName.USER_ID_FOUND,
this._getUserIdentification,this,this._filter);var b=this._buildProviderURL(a);this._currTagData.isSync?(EBGUIP.Events.eventMgr.subscribeToEvent(EBGUIP.Events.EventName.DOC_LOADED,this._providerLoaded,this,this._filter),EBG.Semi.Infra.loadFileByScriptElem(this._currTagData.currDoc,b,null,!0)):EBG.Semi.Infra.loadFileByScriptElem(this._currTagData.currDoc,b,this._providerLoaded,!1,this,{providerName:a})}}},_buildProviderURL:function(a){a=this._currTagData.scriptsPath+"UserProviders"+this._currTagData.uipv+
"/"+a+".js";-1==this._currTagData.scriptsPath.indexOf("http")&&(a=this._getRequestProtocol(this._currTagData.ebPtcl)+a);return a},_getRequestProtocol:function(a){if(a)return a;var a="https://secure-",b=location.protocol;if("javascript:"==b)try{b=parent.location.protocol}catch(c){}"http:"==b&&(a=b+"//");return a},_providerLoaded:function(a){a=a.providerName;-1!=EBG.Semi.Infra.indexOfArray(this._arrProvidersNamesUsed,a)&&(new window.EBGUIP[a]).init(this._currTagData)},_getUserIdentification:function(a){var b=
EBG.Semi.Infra.indexOfArray(this._arrProvidersNamesUsed,a.providerName);if(-1!=b){if(a.tokenName&&a.id&&this._providers[a.providerName].shouldSendData&&!this._providersData[a.providerName].data)this._providersData[a.providerName].data="&"+a.tokenName+"="+a.id;this._providersData[a.providerName].providerCalled=!0;this._arrProvidersNamesUsed.splice(b,1);0==this._arrProvidersNamesUsed.length?(a={userIdStr:this._getProvidersData()},EBG.Semi.Events.eventMgr.dispatchEvent(EBG.Semi.EventName.ALL_USER_ID_FOUND,
a,this._filter)):this._loadProviders()}},_getProvidersData:function(){var a="",b;for(b in this._providersData)this._providers[b].isUsed&&this._providers[b].shouldSendData&&(a+=this._providersData[b].data);return a},_getValidProviderNames:function(a){for(var b=[],c=0;c<a.length;c++)b[b.length]=this._providersEnum[a[c]-1];return b}};var EBPreServing=window.EBPreServing||{};
EBPreServing.SecretTags={gEbBAd:"gEbBAd",gEbAd:"gEbAd",gfEbForceStreaming:"gfEbForceStreaming",gEbEyeDivRefElement:"gEbEyeDivRefElement",gfEbUseCompression:"gfEbUseCompression",gfEbRemoveScroll:"gfEbRemoveScroll",gfEbUseMozHideIframe:"gfEbUseMozHideIframe",gnEbLowBWLimit:"gnEbLowBWLimit",gstrEbDisplayPos:"gstrEbDisplayPos",strPage:"strPage",gfEbChangeRelativeElements:"gfEbChangeRelativeElements",gfEbInlineBanner:"gfEbInlineBanner",gstrEbPreLoadScripts:"gstrEbPreLoadScripts",gfEbExpBanerIM:"gfEbExpBanerIM",
gstrEbIframeLocation:"gstrEbIframeLocation",gstrEbDomain:"gstrEbDomain",gnEbMinZIndex:"gnEbMinZIndex",gfEbCacheResources:"gfEbCacheResources",gfEbUseHTTPS:"gfEbUseHTTPS"};EBPreServing.DeviceTypes={DESKTOP:0,MOBILE:1,TABLET:2,UNKNOWN:3};EBPreServing.ExtractMethod={PUBLISHER:1,TOP:2,REFERRER:3};EBPreServing=window.EBPreServing||{};
EBPreServing._startEBPreservingFlow=function(){var a=function(){gEBMainWindow.EBP.focused=!0;try{window.removeEventListener?(window.removeEventListener("focus",a,!1),window.document.removeEventListener("focusin",a,!1)):window.detachEvent&&(window.detachEvent("onfocus",a),window.document.detachEvent("onfocusin",a))}catch(b){}};if(!EBP.downloadMgr&&(EBP.downloadMgr=new EBPreServing.DownloadManager,!gEBMainWindow.EBP.topDownloadMgr))gEBMainWindow.EBP.topDownloadMgr=EBP.downloadMgr;try{gEBMainWindow.EBP.topDownloadMgr._testFreedScript()}catch(b){gEBMainWindow.EBP.topDownloadMgr=
EBP.downloadMgr}gEBMainWindow.EBP.focused=!1;window.addEventListener?(window.addEventListener("focus",a,!1),window.document.addEventListener("focusin",a,!1)):window.attachEvent&&(window.attachEvent("onfocus",a),window.document.attachEvent("onfocusin",a,!1));if(!EBP.downloadMgr.ebSync.checkedIfPageLoaded)EBP.downloadMgr.ebSync.checkedIfPageLoaded=!0,EBP.downloadMgr.checkPageLoaded(gEBMainWindow,gEBMainWindow.EBP.topDownloadMgr.updatePageLoaded);if(!EBP.downloadMgr.ebSync.donwloadServerReq&&!EBP.downloadMgr.ebSync.loadingCustomScript){EBP.log.debug("Start serving request process");
if(window.ebRD&&"ebRD_"+ebNewTag.placementId+"_"+ebNewTag.ebRDRand in window.ebRD)gEBMainWindow.ebRDGlobal=gEBMainWindow.ebRDGlobal||{},EBP.Light.Infra.mergeObj(window.ebRD,gEBMainWindow.ebRDGlobal);EBP.downloadMgr.initServerReq()}};EBPreServing._addSecretTags=function(){var a=null,b;for(b in EBPreServing.SecretTags){var c=EBPreServing.SecretTags[b];c in window&&(a||(a={}),a[c]=window[c])}return a};
EBPreServing.DownloadManager=function(){EBP.log.debug("DownloadManager.Constructor");if(!this.ebSync)this.ebSync={donwloadServerReq:!1,divId:0,currDoc:document,async:null,checkedIfPageLoaded:!1,loadingCustomScript:!1,loadingUIdProviders:!1,UIdProvidersLoaded:!1,placementIdObj:{}}};
EBPreServing.DownloadManager.prototype={ebSync:null,userIds:"",bigScriptObj:{},customScriptArr:[],initServerReq:function(){EBP.log.startGroup("DownloadManager.initServerReq");try{var a=EBP.ebTags[0];if(a)if(a.sms&&"/"!=a.sms[a.sms.length-1]&&(a.sms+="/"),this.ebSync.async=this.isAsyncMode(a),this.setAdditionalTagTokens(a),this.ebSync.placementIdObj[a.placementId]={},this.ebSync.placementIdObj[a.placementId].async=this.ebSync.async,a.bandWidth){var b=this.handleBandwidthDetection(a);b||this.loadServerRequest()}else this.loadServerRequest();
else EBP.log.debug("DownloadManager.initServerReq - tag doesn't exist!!!");0<EBP.ebTags.length&&!this.ebSync.donwloadServerReq&&!this.ebSync.loadingCustomScript&&!b&&!this.ebSync.loadingUIdProviders&&this.initServerReq();this.ebSync.loadingUIdProviders&&!this.ebSync.UIdProvidersLoaded&&1E5>this.numTries&&this.initServerReq();EBP.log.endGroup()}catch(c){EBP.log.exception("DownloadManager.initServerReq",c)}},loadServerRequest:function(){var a=EBP.ebTags[0];if(this.ebSync.loadingCustomScript){EBP.log.debug("DownloadManager.initServerReq - Currently loading custom script");
var b=this;this._customScriptServerRequestCallBack=function(){try{b.initServerReq()}catch(a){EBP.log.exception("DownloadManager._customScriptServerRequestCallBack",a)}}}else if(a.uip&&0<a.uip.length&&!this.ebSync.UIdProvidersLoaded&&!this.ebSync.loadingUIdProviders)a.filter=a.ebRDRand,EBG.Semi.Events.eventMgr.subscribeToEvent(EBG.Semi.EventName.ALL_USER_ID_FOUND,this._getUserIdProviders,this,a.filter),this.ebSync.loadingUIdProviders=!0,EBGUIP.uidProviders=window.EBGUIP.uidProviders||new EBGUIP.UserIdProvider,
a.isSync=!this.ebSync.async,EBGUIP.uidProviders.getUserIds(a);else if(!this.ebSync.loadingCustomScript&&(!a.uip||0==a.uip.length||!this.ebSync.loadingUIdProviders&&this.ebSync.UIdProvidersLoaded)){this.ebSync.donwloadServerReq=!1;this.ebSync.UIdProvidersLoaded=!1;try{a=EBP.ebTags.shift()}catch(c){0<EBP.ebTags.length&&(a=EBP.ebTags[0]);for(i=0;i<EBP.ebTags.length-1;i++)EBP.ebTags[i]=EBP.ebTags[i+1];EBP.ebTags.length--}this.handleCurrTag(a)}},_getUserIdProviders:function(a){if(this.ebSync.loadingUIdProviders&&
!this.ebSync.UIdProvidersLoaded){currTag=EBP.ebTags[0];this.ebSync.loadingUIdProviders=!1;this.ebSync.UIdProvidersLoaded=!0;if(a)currTag.userIds=a.userIdStr;this.initServerReq()}},handleCurrTag:function(a){this.setCurrTag(a);this.ebSync.placementIdObj[a.placementId].async?(EBP.log.debug("DownloadManager.initServerReq - Start Async Client process"),this.handleAsyncTag(a)):(EBP.log.debug("DownloadManager.initServerReq - Start Sync Client process"),a.currDoc.write("<script src="+a.partialRequest+"><\/script>"))},
setCurrTag:function(a){var b=EBP.Light.Infra.getRandomNumber();a.ebRand=b;a.partialRequest+="&rand="+b;a.bandWidth&&gEBMainWindow.EBP.BW&&gEBMainWindow.EBP.BW.checked&&56!=gEBMainWindow.EBP.BW.speed&&(a.partialRequest+="&BWVal="+(a.bwMult?a.bwMult*gEBMainWindow.EBP.BW.speed:gEBMainWindow.EBP.BW.speed)+"&BWDate=0");if(gEBMainWindow.EBservingMode&&gEBMainWindow.EBservingMode===EBG.Semi.ServingState.unfriendlyIframe)a.partialRequest=a.partialRequest.replace("ifrm=2","ifrm=1");a.partialRequest+="&secCall=1";
b="ebRD_"+a.placementId+"_"+a.ebRDRand;gEBMainWindow.ebRDGlobal&&gEBMainWindow.ebRDGlobal[b]&&(a.partialRequest+="&ebRD="+encodeURIComponent(JSON.stringify(gEBMainWindow.ebRDGlobal[b])));a.collectURL?(a.partialRequest+="&vurl="+this.getVerificationUrl(a),a.partialRequest+=a.ExtractMethod?"&vurlem="+a.ExtractMethod:""):a.vurl&&(a.partialRequest+="&vurlem="+EBPreServing.ExtractMethod.PUBLISHER);a.userIds&&""!=a.userIds&&(a.partialRequest+=a.userIds)},handleBandwidthDetection:function(a){var b=!1;if(!window.EBP.ebBW)EBP.log.debug("DownloadManager.initServerReq - Create bandWidthDetector object (ebBW)"),
window.EBP.ebBW=new EBG.Semi.BandWidthDetection;if(gEBMainWindow.EBP&&gEBMainWindow.EBP.BW&&gEBMainWindow.EBP.BW.checked)return b;if(!window.EBP.ebBW.checked&&!window.EBP.ebBW.checking){b="https:"==a.currDoc.location.protocol?"https://":"http://";a.ebPtcl="undefined"==typeof a.ebPtcl?b:a.ebPtcl;window.EBP.ebBW.initImages(a.ebPtcl,a.sms);var c=this;window.EBP.ebBW.addListener(function(){c.initServerReq()});EBP.log.debug("DownloadManager.initServerReq - Start Band Width detection");window.EBP.ebBW.init();
b=!0}else window.EBP.ebBW.checking&&(EBP.log.debug("DownloadManager.initServerReq - Still detecting Band Width"),b=!0);return b},handleAsyncTag:function(a){this.ebSync.divId=a.containerId;EBP.log.debug("DownloadManager.initServerReq - Send Server Request");this._customScriptServerRequestCallBack=null;this.ebSync.donwloadServerReq=!0;var b={};b.currDoc=a.currDoc?a.currDoc:document;b.containerId=a.containerId;var c=this;this.scriptTag(a.partialRequest,function(){c.ebSync.donwloadServerReq=!1;c.initServerReq()},
b)},handleSyncTag:function(a){var b=this.setIfrmInRequest(a.partialRequest);if(b!==a.partialRequest&&b.length>a.partialRequest.length)a.partialRequest=b;b=EBP.Light.Infra.createFriendlyIframe(a.currDoc,a.ebRand,a.width,a.height);a.onLoadHandled=!1;var c={iframeContainer:b,myIfrmSrc:"<!DOCTYPE html><html><head></head><body><script type='text/javascript''>var inDapIF = true; "+this._translateSecretTags(a.tagsObj)+"<\/script><script src='"+a.partialRequest+"'><\/script></body></html>",tag:a},a=a.currDoc.getElementById(a.containerId),
c=this.bindTagToCallback(function(){if(!this.tag.onLoadHandled)EBP.Light.Infra.writeToFriendlyIframe(this.iframeContainer,this.myIfrmSrc,!0),this.tag.onLoadHandled=!0},c);EBP.Light.Infra.addChildToPage(b,a,"load",c)},bindTagToCallback:function(a,b){return a.bind?a.bind(b):function(a,b){return function(){return a.apply(b,arguments)}}(a,b)},_translateSecretTags:function(a){var b="",c;for(c in a)a.hasOwnProperty(c)&&("object"!=typeof a[c]?b+="var "+this._getTagValue(c,a[c]):(b+=" var "+c+" =  new Object();",
b+=this._stringnifyObj(c,a[c],"")));return b},_stringnifyObj:function(a,b,c){var d="",e;for(e in b)b.hasOwnProperty(e)&&(d=a+"."+e,"object"!=typeof b[e]?c+=this._getTagValue(d,b[e]):(c+=d+"= new Object();",c=this._stringnifyObj(d,b[e],c)));return c},_getTagValue:function(a,b){return"string"==typeof b?a+" = unescape('"+escape(b)+"');":a+" ="+b+";"},setIfrmInRequest:function(a){var b=a.indexOf("&ifrm");if(-1!=b){if(-1==a.indexOf("&ifrm=-1"))var c="",c=a.substr(0,b),a=c=c+"&ifrm=-1"+currTag.partialRequest.substr(b+
7,a.length)}else a+="&ifrm=-1";return a},setAdditionalTagTokens:function(a){for(var b=a.partialRequest.split("&"),c={},d=1;d<b.length;d++)b[d]=b[d].split("="),c[[b[d][0]]]=b[d][1];if(!a.placementId)a.placementId=c.pli,a.width=c.w,a.height=c.h;a.vurl=c.vurl},getVerificationUrl:function(a){try{var b="";if(a.vurl)b=a.vurl,a.ExtractMethod=EBPreServing.ExtractMethod.PUBLISHER;else{var c=gEBMainWindow;if(c.EBservingMode==EBG.Semi.ServingState.unfriendlyIframe)if(b=this.getHostUrlFromPublisherAPI())a.ExtractMethod=
EBPreServing.ExtractMethod.PUBLISHER;else if(b=c.document.referrer)a.ExtractMethod=EBPreServing.ExtractMethod.REFERRER;if(!b)b=c.location.href,a.ExtractMethod=EBPreServing.ExtractMethod.TOP}EBG.verificationURL=a.ExtractMethod==EBPreServing.ExtractMethod.REFERRER?EBG.verificationURL||b:b;b=encodeURIComponent(b);b.indexOf("$$")&&(b="$$"+b+"$$");return b}catch(d){EBP.log.exception("DownloadManager.getUrl",d)}},getHostUrlFromPublisherAPI:function(){var a="";if(gEBMainWindow&&gEBMainWindow.$sf&&gEBMainWindow.$sf.ext&&
"function"===typeof gEBMainWindow.$sf.ext.hostURL)a=gEBMainWindow.$sf.ext.hostURL();else if(gEBMainWindow&&gEBMainWindow.context&&gEBMainWindow.context.location&&gEBMainWindow.context.location.href)a=gEBMainWindow.context.location.href;return a},isAsyncMode:function(a){EBP.log.debug("DownloadManager.isAsyncMode ");try{return a.asyncMode||a.bandWidth||a.ndw}catch(b){EBP.log.exception("DownloadManager.isAsyncMode",b)}},reportImg:function(a){EBP.log.debug("DownloadManager.reportImg ");try{(new Image).src=
a}catch(b){EBP.log.exception("DownloadManager.reportImg",b)}},scriptTag:function(a,b,c){EBP.log.startGroup("DownloadManager.scriptTag");try{var d=c&&c.currDoc?c.currDoc:document,e=EBP.Light.Infra.createScriptElement(d,"script","text/"+(a.type||"javascript"),a.src||a);e.onreadystatechange=e.onload=function(){var a=e.readyState;if("function"==typeof b&&!b.done&&(!a||/loaded|complete/.test(a)))b.done=!0,b(c)};if(!c||!c.containerId)EBP.Light.Infra.addScriptElement(e,null,d);else{var g=d.getElementById(c.containerId);
EBP.Light.Infra.addScriptElement(e,g,d)}EBP.log.endGroup()}catch(f){EBP.log.exception("DownloadManager.scriptTag",f)}},checkPageLoaded:function(a,b){EBP.log.startGroup("DownloadManager.checkPageLoaded");try{var c=!1,d=!0,e=a.document,g=e.documentElement,f=e.addEventListener?"addEventListener":"attachEvent",h=e.addEventListener?"removeEventListener":"detachEvent",j=e.addEventListener?"":"on";a.EBP.init=function(d){if(!("readystatechange"==d.type&&"complete"!=e.readyState)&&(("load"==d.type?a:e)[h](j+
d.type,a.EBP.init,!1),!c&&(c=!0)))b.call(a,d.type||d)};a.EBP.poll=function(){try{g.doScroll("left")}catch(b){setTimeout(a.EBP.poll,50);return}a.EBP.init("gEBMainWindow.EBP.poll")};if("complete"==e.readyState)b.call(a,"lazy");else{if(e.createEventObject&&g.doScroll){try{d=!a.frameElement}catch(l){}d&&a.EBP.poll()}e[f](j+"DOMContentLoaded",a.EBP.init,!1);e[f](j+"readystatechange",a.EBP.init,!1);a[f](j+"load",a.EBP.init,!1)}EBP.log.endGroup()}catch(k){EBP.log.exception("DownloadManager.checkPageLoaded",
k)}},updatePageLoaded:function(){EBP.log.debug("DownloadManager.isPageLoaded");try{gEBMainWindow.EBP.isPageLoaded=!0}catch(a){EBP.log.exception("DownloadManager.isPageLoaded",a)}},loadBigScript:function(a,b,c,d){EBP.log.startGroup("DownloadManager.loadBigScript");try{if(window.gstrAdPrefix){var e=window.gstrAdPrefix;-1==b.indexOf(e)&&(b=b.replace(/Ad_/,e))}if(EBP.downloadMgr.ebSync.loadingCustomScript){EBP.log.debug("DownloadManager.loadBigScript: loading cutom script: {0} ",c);var g=this;this._customScriptBigScriptCallBack=
function(){try{g.loadBigScript(a,b,c,d),"function"==typeof g._customScriptServerRequestCallBack&&g._customScriptServerRequestCallBack()}catch(e){EBP.log.exception("DownloadManager._customScriptBigScriptCallBack"+e)}}}else{this._customScriptBigScriptCallBack=null;EBP.log.debug("DownloadManager.loadBigScript: loading {0} script",c);var f={};f.containerId=a?a:null;f.bigScriptSrc=b?b:null;f.scriptName=c?c:null;f.currDoc=d?d:document;e={containerId:a,currDoc:d};this.bigScriptObj[c]=this.bigScriptObj[c]||
{};this.bigScriptObj[c].waitingToLoad=this.bigScriptObj[c].waitingToLoad||[];-1==this.indexOfArray(this.bigScriptObj[c].waitingToLoad,e)&&this.bigScriptObj[c].waitingToLoad.push(e);this.bigScriptObj[c].downloaded="undefined"!=typeof this.bigScriptObj[c].downloaded?this.bigScriptObj[c].downloaded:!1;this.bigScriptObj[c].isFirst="undefined"!=typeof this.bigScriptObj[c].isFirst?this.bigScriptObj[c].isFirst:!0;this.bigScriptObj&&this.bigScriptObj[c]&&this.bigScriptObj[c].isFirst?(EBP.log.debug("DownloadManager.loadBigScript: First time loading {0} script",
this.bigScriptObj[c]),this.bigScriptObj[f.scriptName].waitingToLoad.shift(),this.bigScriptObj[f.scriptName].isFirst=!1,g=this,this.scriptTag(b,function(){g._releaseWaitingRequests(f)},f)):(EBP.log.debug("DownloadManager.loadBigScript: Script {0} was already downloaded",this.bigScriptObj[c]),this.bigScriptObj[c].downloaded&&this._releaseWaitingRequests(f));EBP.log.endGroup()}}catch(h){EBP.log.exception("DownloadManager.loadBigScript",h)}},indexOfArray:function(a,b){EBP.log.debug("DownloadManager.indexOfArrays");
try{for(var c=0;c<a.length;c++)if(a[c]==b)return c;return-1}catch(d){EBP.log.exception("DownloadManager.indexOfArray",d)}},loadCustomScript:function(a,b){EBP.log.startGroup("DownloadManager.loadCustomScript");try{var c={};c.currDoc="undefined"!=typeof b?b:document;if(0!=EBP.downloadMgr.ebSync.divId)c.containerId=EBP.downloadMgr.ebSync.divId;if("undefined"!=typeof a){for(var d=a.length-1;0<=d;d--)if(""==a[d]||"http://"==a[d].substr(0,7)&&"https://"==ebPtcl)gEBMainWindow.EBP.log.info("custom script "+
a[d]+" will not be loaded since it is from not secured protocol while the ad runs from secured protocol"),a.splice(d,1);if(0<a.length)EBP.downloadMgr.ebSync.loadingCustomScript=!0;c.CSArray=a;for(d=0;d<a.length;d++)"http"!=a[d].substr(0,4)&&(a[d]=ebResourcePath+"CustomScripts/"+a[d]),this.customScriptArr[d]={},this.customScriptArr[d].cs=a[d],this.customScriptArr[d].loaded=!1;this.customScriptsLoader(c)}EBP.log.endGroup()}catch(e){EBP.log.exception("DownloadManager.loadCustomScript",e)}},customScriptsLoader:function(a){EBP.log.startGroup("DownloadManager.customScriptsLoader");
try{if("undefined"!=typeof a&&a.CSArray&&0<a.CSArray.length){var b=a.CSArray.pop();a.index=a.CSArray.length;var c=this,d=parseInt(a.index);EBP.log.debug("DownloadManager.customScriptsLoader - loading script # :  {0}",b);this.scriptTag(b,function(){c.handleCustomScriptsLoaded(a,d)},a);this.customScriptsLoader(a)}EBP.log.endGroup()}catch(e){EBP.log.exception("DownloadManager.customScriptsLoader",e)}},handleCustomScriptsLoaded:function(a,b){EBP.log.startGroup("DownloadManager.handleCustomScriptsLoaded");
try{if(this.customScriptArr&&this.customScriptArr[b])this.customScriptArr[b].loaded=!0;if(this.areAllCustomScriptsLoaded())EBP.downloadMgr.ebSync.loadingCustomScript=!1,"function"==typeof this._customScriptBigScriptCallBack&&this._customScriptBigScriptCallBack()}catch(c){EBP.log.exception("DownloadManager.handleCustomScriptsLoaded",c)}},areAllCustomScriptsLoaded:function(){EBP.log.debug("DownloadManager.areAllCustomScriptsLoaded");try{if(this.customScriptArr){for(var a=0;a<this.customScriptArr.length;a++)if(!this.customScriptArr[a].loaded)return!1;
return!0}}catch(b){EBP.log.exception("DownloadManager.areAllCustomScriptsLoaded",b)}},_customScriptBigScriptCallBack:null,_customScriptServerRequestCallBack:null,_releaseWaitingRequests:function(a){EBP.log.startGroup("DownloadManager._releaseWaitingRequests");try{if("object"==typeof a&&"undefined"!=typeof a.scriptName&&(this.bigScriptObj[a.scriptName].downloaded=!0,this.bigScriptObj[a.scriptName]))for(;0<this.bigScriptObj[a.scriptName].waitingToLoad.length;){var b=this.bigScriptObj[a.scriptName].waitingToLoad.shift();
EBP.log.debug("Big script will be loaded into containderId {0}",b.containerId);a.containerId=b.containerId;a.currDoc=b.currDoc;this.scriptTag(a.bigScriptSrc,function(){},a)}EBP.log.endGroup()}catch(c){EBP.log.exception("DownloadManager._releaseWaitingRequests",c)}},_testFreedScript:function(){return window&&Array?!0:!1}};gEBMainWindow=window.gEBMainWindow||EBG.Semi.WindowUtil.getTopWindow();gEBMainWindow.EBP=gEBMainWindow.EBP||{};window.EBP=window.EBP||{};EBP.Light=EBP.Light||{};EBP.Light.Infra=EBG.Semi.Infra;
EBP.Light.Logger=EBG.Semi.Logging.Logger;EBP.log=new EBP.Light.Logger(EBP.Light.Infra.getUrlParameter(EBP.Light.Logger.DebugMode)||0);EBP.EBGUIP=EBGUIP;EBP.ebTags=EBP.ebTags||[];if(void 0!==window.ebNewTagArr)for(var i=0;i<ebNewTagArr.length;i++)if("undefined"==typeof ebNewTagArr[i].collected){ebNewTagArr[i].currDoc=document;ebNewTagArr[i].collected=!0;var tags=EBPreServing._addSecretTags();if(null!=tags)ebNewTagArr[i].tagsObj=tags;EBP.ebTags[EBP.ebTags.length]=ebNewTagArr[i]}
if(void 0!==window.ebNewTag&&"undefined"==typeof ebNewTag.collected){ebNewTag.currDoc=document;ebNewTag.collected=!0;tags=EBPreServing._addSecretTags();if(null!=tags)ebNewTag.tagsObj=tags;EBP.ebTags[EBP.ebTags.length]=ebNewTag}
try{var dispose=function(){try{if(gEBMainWindow.EBP.downloadMgr)gEBMainWindow.EBP.downloadMgr=null;if(gEBMainWindow.EBP.focused)gEBMainWindow.EBP.focused=null;EBPreServing=null}catch(a){}};window.addEventListener?window.addEventListener("unload",dispose,!1):window.attachEvent&&window.attachEvent("onunload",dispose)}catch(e$$41){}EBP.log.debug("DownloadManager.initServerReq - gEBMainWindow location:  {0}",gEBMainWindow.location.href);
EBP.log.debug("DownloadManager.initServerReq - curr document location:  {0}",document.location.href);0<EBP.ebTags.length&&EBPreServing._startEBPreservingFlow();
