/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/xhr",["../errors/RequestError","./watch","./handlers","./util","../has"],function(_1,_2,_3,_4,_5){
_5.add("native-xhr",function(){
return typeof XMLHttpRequest!=="undefined";
});
_5.add("dojo-force-activex-xhr",function(){
return _5("activex")&&!document.addEventListener&&window.location.protocol==="file:";
});
_5.add("native-xhr2",function(){
if(!_5("native-xhr")){
return;
}
var x=new XMLHttpRequest();
return typeof x["addEventListener"]!=="undefined"&&(typeof opera==="undefined"||typeof x["upload"]!=="undefined");
});
_5.add("native-formdata",function(){
return typeof FormData==="function";
});
function _6(_7,_8){
var _9=_7.xhr;
_7.status=_7.xhr.status;
_7.text=_9.responseText;
if(_7.options.handleAs==="xml"){
_7.data=_9.responseXML;
}
if(!_8){
try{
_3(_7);
}
catch(e){
_8=e;
}
}
if(_8){
this.reject(_8);
}else{
if(_4.checkStatus(_9.status)){
this.resolve(_7);
}else{
_8=new _1("Unable to load "+_7.url+" status: "+_9.status,_7);
this.reject(_8);
}
}
};
var _a,_b,_c,_d;
if(_5("native-xhr2")){
_a=function(_e){
return !this.isFulfilled();
};
_d=function(_f,_10){
_10.xhr.abort();
};
_c=function(_11,dfd,_12){
function _13(evt){
dfd.handleResponse(_12);
};
function _14(evt){
var _15=evt.target;
var _16=new _1("Unable to load "+_12.url+" status: "+_15.status,_12);
dfd.handleResponse(_12,_16);
};
function _17(evt){
if(evt.lengthComputable){
_12.loaded=evt.loaded;
_12.total=evt.total;
dfd.progress(_12);
}
};
_11.addEventListener("load",_13,false);
_11.addEventListener("error",_14,false);
_11.addEventListener("progress",_17,false);
return function(){
_11.removeEventListener("load",_13,false);
_11.removeEventListener("error",_14,false);
_11.removeEventListener("progress",_17,false);
};
};
}else{
_a=function(_18){
return _18.xhr.readyState;
};
_b=function(_19){
return 4===_19.xhr.readyState;
};
_d=function(dfd,_1a){
var xhr=_1a.xhr;
var _1b=typeof xhr.abort;
if(_1b==="function"||_1b==="object"||_1b==="unknown"){
xhr.abort();
}
};
}
var _1c,_1d={data:null,query:null,sync:false,method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded"}};
function xhr(url,_1e,_1f){
var _20=_4.parseArgs(url,_4.deepCreate(_1d,_1e),_5("native-formdata")&&_1e&&_1e.data&&_1e.data instanceof FormData);
url=_20.url;
_1e=_20.options;
var _21,_22=function(){
_21&&_21();
};
var dfd=_4.deferred(_20,_d,_a,_b,_6,_22);
var _23=_20.xhr=xhr._create();
if(!_23){
dfd.cancel(new _1("XHR was not created"));
return _1f?dfd:dfd.promise;
}
_20.getHeader=function(_24){
return this.xhr.getResponseHeader(_24);
};
if(_c){
_21=_c(_23,dfd,_20);
}
var _25=_1e.data,_26=!_1e.sync,_27=_1e.method;
try{
_23.open(_27,url,_26,_1e.user||_1c,_1e.password||_1c);
if(_1e.withCredentials){
_23.withCredentials=_1e.withCredentials;
}
var _28=_1e.headers,_29;
if(_28){
for(var hdr in _28){
if(hdr.toLowerCase()==="content-type"){
_29=_28[hdr];
}else{
if(_28[hdr]){
_23.setRequestHeader(hdr,_28[hdr]);
}
}
}
}
if(_29&&_29!==false){
_23.setRequestHeader("Content-Type",_29);
}
if(!_28||!("X-Requested-With" in _28)){
_23.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(_4.notify){
_4.notify.emit("send",_20,dfd.promise.cancel);
}
_23.send(_25);
}
catch(e){
dfd.reject(e);
}
_2(dfd);
_23=null;
return _1f?dfd:dfd.promise;
};
xhr._create=function(){
throw new Error("XMLHTTP not available");
};
if(_5("native-xhr")&&!_5("dojo-force-activex-xhr")){
xhr._create=function(){
return new XMLHttpRequest();
};
}else{
if(_5("activex")){
try{
new ActiveXObject("Msxml2.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Msxml2.XMLHTTP");
};
}
catch(e){
try{
new ActiveXObject("Microsoft.XMLHTTP");
xhr._create=function(){
return new ActiveXObject("Microsoft.XMLHTTP");
};
}
catch(e){
}
}
}
}
_4.addCommonMethods(xhr);
return xhr;
});
