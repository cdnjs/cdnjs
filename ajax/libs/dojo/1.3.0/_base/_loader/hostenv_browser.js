/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(typeof window!="undefined"){
dojo.isBrowser=true;
dojo._name="browser";
(function(){
var d=dojo;
if(document&&document.getElementsByTagName){
var _2=document.getElementsByTagName("script");
var _3=/dojo(\.xd)?\.js(\W|$)/i;
for(var i=0;i<_2.length;i++){
var _5=_2[i].getAttribute("src");
if(!_5){
continue;
}
var m=_5.match(_3);
if(m){
if(!d.config.baseUrl){
d.config.baseUrl=_5.substring(0,m.index);
}
var _7=_2[i].getAttribute("djConfig");
if(_7){
var _8=eval("({ "+_7+" })");
for(var x in _8){
dojo.config[x]=_8[x];
}
}
break;
}
}
}
d.baseUrl=d.config.baseUrl;
var n=navigator;
var _b=n.userAgent,_c=n.appVersion,tv=parseFloat(_c);
if(_b.indexOf("Opera")>=0){
d.isOpera=tv;
}
if(_b.indexOf("AdobeAIR")>=0){
d.isAIR=1;
}
d.isKhtml=(_c.indexOf("Konqueror")>=0)?tv:0;
d.isWebKit=parseFloat(_b.split("WebKit/")[1])||undefined;
d.isChrome=parseFloat(_b.split("Chrome/")[1])||undefined;
var _e=Math.max(_c.indexOf("WebKit"),_c.indexOf("Safari"),0);
if(_e&&!dojo.isChrome){
d.isSafari=parseFloat(_c.split("Version/")[1]);
if(!d.isSafari||parseFloat(_c.substr(_e+7))<=419.3){
d.isSafari=2;
}
}
if(_b.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){
d.isMozilla=d.isMoz=tv;
}
if(d.isMoz){
d.isFF=parseFloat(_b.split("Firefox/")[1]||_b.split("Minefield/")[1]||_b.split("Shiretoko/")[1])||undefined;
}
if(document.all&&!d.isOpera){
d.isIE=parseFloat(_c.split("MSIE ")[1])||undefined;
if(d.isIE>=8&&document.documentMode!=5){
d.isIE=document.documentMode;
}
}
if(dojo.isIE&&window.location.protocol==="file:"){
dojo.config.ieForceActiveXXhr=true;
}
var cm=document.compatMode;
d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;
d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();
d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
d._xhrObj=function(){
var _10,_11;
if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){
try{
_10=new XMLHttpRequest();
}
catch(e){
}
}
if(!_10){
for(var i=0;i<3;++i){
var _13=d._XMLHTTP_PROGIDS[i];
try{
_10=new ActiveXObject(_13);
}
catch(e){
_11=e;
}
if(_10){
d._XMLHTTP_PROGIDS=[_13];
break;
}
}
}
if(!_10){
throw new Error("XMLHTTP not available: "+_11);
}
return _10;
};
d._isDocumentOk=function(_14){
var _15=_14.status||0;
return (_15>=200&&_15<300)||_15==304||_15==1223||(!_15&&(location.protocol=="file:"||location.protocol=="chrome:"));
};
var _16=window.location+"";
var _17=document.getElementsByTagName("base");
var _18=(_17&&_17.length>0);
d._getText=function(uri,_1a){
var _1b=this._xhrObj();
if(!_18&&dojo._Url){
uri=(new dojo._Url(_16,uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
_1b.open("GET",uri,false);
try{
_1b.send(null);
if(!d._isDocumentOk(_1b)){
var err=Error("Unable to load "+uri+" status:"+_1b.status);
err.status=_1b.status;
err.responseText=_1b.responseText;
throw err;
}
}
catch(e){
if(_1a){
return null;
}
throw e;
}
return _1b.responseText;
};
var _w=window;
var _1e=function(_1f,fp){
var _21=_w[_1f]||function(){
};
_w[_1f]=function(){
fp.apply(_w,arguments);
_21.apply(_w,arguments);
};
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=d._windowUnloaders;
while(mll.length){
(mll.pop())();
}
};
var _23=0;
d.addOnWindowUnload=function(obj,_25){
d._onto(d._windowUnloaders,obj,_25);
if(!_23){
_23=1;
_1e("onunload",d.windowUnloaded);
}
};
var _26=0;
d.addOnUnload=function(obj,_28){
d._onto(d._unloaders,obj,_28);
if(!_26){
_26=1;
_1e("onbeforeunload",dojo.unloaded);
}
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
dojo._initFired=true;
var _2a=e&&e.type?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_2a!="domcontentloaded"&&_2a!="load")){
return;
}
arguments.callee.initialized=true;
if("_khtmlTimer" in dojo){
clearInterval(dojo._khtmlTimer);
delete dojo._khtmlTimer;
}
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
};
if(!dojo.config.afterOnLoad){
if(document.addEventListener){
if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){
document.addEventListener("DOMContentLoaded",dojo._loadInit,null);
}
window.addEventListener("load",dojo._loadInit,null);
}
if(dojo.isAIR){
window.addEventListener("load",dojo._loadInit,null);
}else{
if((dojo.isWebKit<525)||dojo.isKhtml){
dojo._khtmlTimer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dojo._loadInit();
}
},10);
}
}
}
if(dojo.isIE){
if(!dojo.config.afterOnLoad){
document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");
}
try{
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");
}
catch(e){
}
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _2c in mp){
dojo.registerModulePath(_2c,mp[_2c]);
}
}
})();
if(dojo.config.isDebug){
dojo.require("dojo._firebug.firebug");
}
if(dojo.config.debugAtAllCosts){
dojo.config.useXDomain=true;
dojo.require("dojo._base._loader.loader_xd");
dojo.require("dojo._base._loader.loader_debug");
dojo.require("dojo.i18n");
}
