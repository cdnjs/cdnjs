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
_5.add("native-xhr2-blob",function(){
if(!_5("native-response-type")){
return;
}
var x=new XMLHttpRequest();
x.open("GET","/",true);
x.responseType="blob";
var _6=x.responseType;
x.abort();
return _6==="blob";
});
var _7={"blob":_5("native-xhr2-blob")?"blob":"arraybuffer","document":"document","arraybuffer":"arraybuffer"};
function _8(_9,_a){
var _b=_9.xhr;
_9.status=_9.xhr.status;
try{
_9.text=_b.responseText;
}
catch(e){
}
if(_9.options.handleAs==="xml"){
_9.data=_b.responseXML;
}
if(!_a){
try{
_3(_9);
}
catch(e){
_a=e;
}
}
if(_a){
this.reject(_a);
}else{
if(_4.checkStatus(_b.status)){
this.resolve(_9);
}else{
_a=new _1("Unable to load "+_9.url+" status: "+_b.status,_9);
this.reject(_a);
}
}
};
var _c,_d,_e,_f;
if(_5("native-xhr2")){
_c=function(_10){
return !this.isFulfilled();
};
_f=function(dfd,_11){
_11.xhr.abort();
};
_e=function(_12,dfd,_13){
function _14(evt){
dfd.handleResponse(_13);
};
function _15(evt){
var _16=evt.target;
var _17=new _1("Unable to load "+_13.url+" status: "+_16.status,_13);
dfd.handleResponse(_13,_17);
};
function _18(evt){
if(evt.lengthComputable){
_13.loaded=evt.loaded;
_13.total=evt.total;
dfd.progress(_13);
}else{
if(_13.xhr.readyState===3){
_13.loaded=evt.position;
dfd.progress(_13);
}
}
};
_12.addEventListener("load",_14,false);
_12.addEventListener("error",_15,false);
_12.addEventListener("progress",_18,false);
return function(){
_12.removeEventListener("load",_14,false);
_12.removeEventListener("error",_15,false);
_12.removeEventListener("progress",_18,false);
_12=null;
};
};
}else{
_c=function(_19){
return _19.xhr.readyState;
};
_d=function(_1a){
return 4===_1a.xhr.readyState;
};
_f=function(dfd,_1b){
var xhr=_1b.xhr;
var _1c=typeof xhr.abort;
if(_1c==="function"||_1c==="object"||_1c==="unknown"){
xhr.abort();
}
};
}
function _1d(_1e){
return this.xhr.getResponseHeader(_1e);
};
var _1f,_20={data:null,query:null,sync:false,method:"GET"};
function xhr(url,_21,_22){
var _23=_5("native-formdata")&&_21&&_21.data&&_21.data instanceof FormData;
var _24=_4.parseArgs(url,_4.deepCreate(_20,_21),_23);
url=_24.url;
_21=_24.options;
var _25,_26=function(){
_25&&_25();
};
var dfd=_4.deferred(_24,_f,_c,_d,_8,_26);
var _27=_24.xhr=xhr._create();
if(!_27){
dfd.cancel(new _1("XHR was not created"));
return _22?dfd:dfd.promise;
}
_24.getHeader=_1d;
if(_e){
_25=_e(_27,dfd,_24);
}
var _28=_21.data,_29=!_21.sync,_2a=_21.method;
try{
_27.open(_2a,url,_29,_21.user||_1f,_21.password||_1f);
if(_21.withCredentials){
_27.withCredentials=_21.withCredentials;
}
if(_5("native-response-type")&&_21.handleAs in _7){
_27.responseType=_7[_21.handleAs];
}
var _2b=_21.headers,_2c=_23?false:"application/x-www-form-urlencoded";
if(_2b){
for(var hdr in _2b){
if(hdr.toLowerCase()==="content-type"){
_2c=_2b[hdr];
}else{
if(_2b[hdr]){
_27.setRequestHeader(hdr,_2b[hdr]);
}
}
}
}
if(_2c&&_2c!==false){
_27.setRequestHeader("Content-Type",_2c);
}
if(!_2b||!("X-Requested-With" in _2b)){
_27.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(_4.notify){
_4.notify.emit("send",_24,dfd.promise.cancel);
}
_27.send(_28);
}
catch(e){
dfd.reject(e);
}
_2(dfd);
_27=null;
return _22?dfd:dfd.promise;
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
