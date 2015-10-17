/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
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
return typeof FormData!=="undefined";
});
_5.add("native-response-type",function(){
return _5("native-xhr")&&typeof new XMLHttpRequest().responseType!=="undefined";
});
var _6={"blob":1,"document":1,"arraybuffer":1};
function _7(_8,_9){
var _a=_8.xhr;
_8.status=_8.xhr.status;
try{
_8.text=_a.responseText;
}
catch(e){
}
if(_8.options.handleAs==="xml"){
_8.data=_a.responseXML;
}
if(!_9){
try{
_3(_8);
}
catch(e){
_9=e;
}
}
if(_9){
this.reject(_9);
}else{
if(_4.checkStatus(_a.status)){
this.resolve(_8);
}else{
_9=new _1("Unable to load "+_8.url+" status: "+_a.status,_8);
this.reject(_9);
}
}
};
var _b,_c,_d,_e;
if(_5("native-xhr2")){
_b=function(_f){
return !this.isFulfilled();
};
_e=function(dfd,_10){
_10.xhr.abort();
};
_d=function(_11,dfd,_12){
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
}else{
if(_12.xhr.readyState===3){
_12.loaded=evt.position;
dfd.progress(_12);
}
}
};
_11.addEventListener("load",_13,false);
_11.addEventListener("error",_14,false);
_11.addEventListener("progress",_17,false);
return function(){
_11.removeEventListener("load",_13,false);
_11.removeEventListener("error",_14,false);
_11.removeEventListener("progress",_17,false);
_11=null;
};
};
}else{
_b=function(_18){
return _18.xhr.readyState;
};
_c=function(_19){
return 4===_19.xhr.readyState;
};
_e=function(dfd,_1a){
var xhr=_1a.xhr;
var _1b=typeof xhr.abort;
if(_1b==="function"||_1b==="object"||_1b==="unknown"){
xhr.abort();
}
};
}
function _1c(_1d){
return this.xhr.getResponseHeader(_1d);
};
var _1e,_1f={data:null,query:null,sync:false,method:"GET"};
function xhr(url,_20,_21){
var _22=_5("native-formdata")&&_20&&_20.data&&_20.data instanceof FormData;
var _23=_4.parseArgs(url,_4.deepCreate(_1f,_20),_22);
url=_23.url;
_20=_23.options;
var _24,_25=function(){
_24&&_24();
};
var dfd=_4.deferred(_23,_e,_b,_c,_7,_25);
var _26=_23.xhr=xhr._create();
if(!_26){
dfd.cancel(new _1("XHR was not created"));
return _21?dfd:dfd.promise;
}
_23.getHeader=_1c;
if(_d){
_24=_d(_26,dfd,_23);
}
var _27=_20.data,_28=!_20.sync,_29=_20.method;
try{
_26.open(_29,url,_28,_20.user||_1e,_20.password||_1e);
if(_20.withCredentials){
_26.withCredentials=_20.withCredentials;
}
if(_5("native-response-type")&&_20.handleAs in _6){
_26.responseType=_20.handleAs;
}
var _2a=_20.headers,_2b=_22?false:"application/x-www-form-urlencoded";
if(_2a){
for(var hdr in _2a){
if(hdr.toLowerCase()==="content-type"){
_2b=_2a[hdr];
}else{
if(_2a[hdr]){
_26.setRequestHeader(hdr,_2a[hdr]);
}
}
}
}
if(_2b&&_2b!==false){
_26.setRequestHeader("Content-Type",_2b);
}
if(!_2a||!("X-Requested-With" in _2a)){
_26.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(_4.notify){
_4.notify.emit("send",_23,dfd.promise.cancel);
}
_26.send(_27);
}
catch(e){
dfd.reject(e);
}
_2(dfd);
_26=null;
return _21?dfd:dfd.promise;
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
