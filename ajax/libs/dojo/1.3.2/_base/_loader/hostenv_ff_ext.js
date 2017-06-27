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
d.baseUrl=d.config.baseUrl;
var n=navigator;
var _3=n.userAgent;
var _4=n.appVersion;
var tv=parseFloat(_4);
d.isMozilla=d.isMoz=tv;
if(d.isMoz){
d.isFF=parseFloat(_3.split("Firefox/")[1])||undefined;
}
var cm=document.compatMode;
d.isQuirks=cm=="BackCompat"||cm=="QuirksMode";
d.locale=dojo.config.locale||n.language.toLowerCase();
d._xhrObj=function(){
return new XMLHttpRequest();
};
var _7=d._loadUri;
d._loadUri=function(_8,cb){
var _a=["file:","chrome:","resource:"].some(function(_b){
return String(_8).indexOf(_b)==0;
});
if(_a){
var l=Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
var _d=l.loadSubScript(_8,d.global);
if(cb){
cb(_d);
}
return true;
}else{
return _7.apply(d,arguments);
}
};
d._isDocumentOk=function(_e){
var _f=_e.status||0;
return (_f>=200&&_f<300)||_f==304||_f==1223||(!_f&&(location.protocol=="file:"||location.protocol=="chrome:"));
};
var _10=false;
d._getText=function(uri,_12){
var _13=this._xhrObj();
if(!_10&&dojo._Url){
uri=(new dojo._Url(uri)).toString();
}
if(d.config.cacheBust){
uri+="";
uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");
}
var _14=["file:","chrome:","resource:"].some(function(_15){
return String(uri).indexOf(_15)==0;
});
if(_14){
var _16=Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var _17=Components.classes["@mozilla.org/scriptableinputstream;1"].getService(Components.interfaces.nsIScriptableInputStream);
var _18=_16.newChannel(uri,null,null);
var _19=_18.open();
_17.init(_19);
var str=_17.read(_19.available());
_17.close();
_19.close();
return str;
}else{
_13.open("GET",uri,false);
try{
_13.send(null);
if(!d._isDocumentOk(_13)){
var err=Error("Unable to load "+uri+" status:"+_13.status);
err.status=_13.status;
err.responseText=_13.responseText;
throw err;
}
}
catch(e){
if(_12){
return null;
}
throw e;
}
return _13.responseText;
}
};
d._windowUnloaders=[];
d.windowUnloaded=function(){
var mll=this._windowUnloaders;
while(mll.length){
(mll.pop())();
}
};
d.addOnWindowUnload=function(obj,_1e){
d._onto(d._windowUnloaders,obj,_1e);
};
var _1f=[];
var _20=null;
dojo._defaultContext=[window,document];
dojo.pushContext=function(g,d){
var old=[dojo.global,dojo.doc];
_1f.push(old);
var n;
if(!g&&!d){
n=dojo._defaultContext;
}else{
n=[g,d];
if(!d&&dojo.isString(g)){
var t=document.getElementById(g);
if(t.contentDocument){
n=[t.contentWindow,t.contentDocument];
}
}
}
_20=n;
dojo.setContext.apply(dojo,n);
return old;
};
dojo.popContext=function(){
var oc=_20;
if(!_1f.length){
return oc;
}
dojo.setContext.apply(dojo,_1f.pop());
return oc;
};
dojo._inContext=function(g,d,f){
var a=dojo._toArray(arguments);
f=a.pop();
if(a.length==1){
d=null;
}
dojo.pushContext(g,d);
var r=f();
dojo.popContext();
return r;
};
})();
dojo._initFired=false;
dojo._loadInit=function(e){
dojo._initFired=true;
var _2d=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_2d!="domcontentloaded"&&_2d!="load")){
return;
}
arguments.callee.initialized=true;
if(dojo._inFlightCount==0){
dojo._modulesLoaded();
}
};
if(!dojo.config.afterOnLoad){
window.addEventListener("DOMContentLoaded",function(e){
dojo._loadInit(e);
},false);
}
}
(function(){
var mp=dojo.config["modulePaths"];
if(mp){
for(var _30 in mp){
dojo.registerModulePath(_30,mp[_30]);
}
}
})();
if(dojo.config.isDebug){
console.log=function(m){
var s=Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
s.logStringMessage(m);
};
console.debug=function(){

};
}
