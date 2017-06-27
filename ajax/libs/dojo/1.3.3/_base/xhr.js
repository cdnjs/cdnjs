/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.xhr"]){
dojo._hasResource["dojo._base.xhr"]=true;
dojo.provide("dojo._base.xhr");
dojo.require("dojo._base.Deferred");
dojo.require("dojo._base.json");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.query");
(function(){
var _d=dojo;
function _2(_3,_4,_5){
var _6=_3[_4];
if(_d.isString(_6)){
_3[_4]=[_6,_5];
}else{
if(_d.isArray(_6)){
_6.push(_5);
}else{
_3[_4]=_5;
}
}
};
dojo.formToObject=function(_7){
var _8={};
var _9="file|submit|image|reset|button|";
_d.forEach(dojo.byId(_7).elements,function(_a){
var _b=_a.name;
var _c=(_a.type||"").toLowerCase();
if(_b&&_c&&_9.indexOf(_c)==-1&&!_a.disabled){
if(_c=="radio"||_c=="checkbox"){
if(_a.checked){
_2(_8,_b,_a.value);
}
}else{
if(_a.multiple){
_8[_b]=[];
_d.query("option",_a).forEach(function(_d){
if(_d.selected){
_2(_8,_b,_d.value);
}
});
}else{
_2(_8,_b,_a.value);
if(_c=="image"){
_8[_b+".x"]=_8[_b+".y"]=_8[_b].x=_8[_b].y=0;
}
}
}
}
});
return _8;
};
dojo.objectToQuery=function(_e){
var _f=encodeURIComponent;
var _10=[];
var _11={};
for(var _12 in _e){
var _13=_e[_12];
if(_13!=_11[_12]){
var _14=_f(_12)+"=";
if(_d.isArray(_13)){
for(var i=0;i<_13.length;i++){
_10.push(_14+_f(_13[i]));
}
}else{
_10.push(_14+_f(_13));
}
}
}
return _10.join("&");
};
dojo.formToQuery=function(_16){
return _d.objectToQuery(_d.formToObject(_16));
};
dojo.formToJson=function(_17,_18){
return _d.toJson(_d.formToObject(_17),_18);
};
dojo.queryToObject=function(str){
var ret={};
var qp=str.split("&");
var dec=decodeURIComponent;
_d.forEach(qp,function(_1d){
if(_1d.length){
var _1e=_1d.split("=");
var _1f=dec(_1e.shift());
var val=dec(_1e.join("="));
if(_d.isString(ret[_1f])){
ret[_1f]=[ret[_1f]];
}
if(_d.isArray(ret[_1f])){
ret[_1f].push(val);
}else{
ret[_1f]=val;
}
}
});
return ret;
};
dojo._blockAsync=false;
dojo._contentHandlers={text:function(xhr){
return xhr.responseText;
},json:function(xhr){
return _d.fromJson(xhr.responseText||null);
},"json-comment-filtered":function(xhr){
if(!dojo.config.useCommentedJson){
console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");
}
var _24=xhr.responseText;
var _25=_24.indexOf("/*");
var _26=_24.lastIndexOf("*/");
if(_25==-1||_26==-1){
throw new Error("JSON was not comment filtered");
}
return _d.fromJson(_24.substring(_25+2,_26));
},javascript:function(xhr){
return _d.eval(xhr.responseText);
},xml:function(xhr){
var _29=xhr.responseXML;
if(_d.isIE&&(!_29||!_29.documentElement)){
var ms=function(n){
return "MSXML"+n+".DOMDocument";
};
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];
_d.some(dp,function(p){
try{
var dom=new ActiveXObject(p);
dom.async=false;
dom.loadXML(xhr.responseText);
_29=dom;
}
catch(e){
return false;
}
return true;
});
}
return _29;
}};
dojo._contentHandlers["json-comment-optional"]=function(xhr){
var _30=_d._contentHandlers;
if(xhr.responseText&&xhr.responseText.indexOf("/*")!=-1){
return _30["json-comment-filtered"](xhr);
}else{
return _30["json"](xhr);
}
};
dojo._ioSetArgs=function(_31,_32,_33,_34){
var _35={args:_31,url:_31.url};
var _36=null;
if(_31.form){
var _37=_d.byId(_31.form);
var _38=_37.getAttributeNode("action");
_35.url=_35.url||(_38?_38.value:null);
_36=_d.formToObject(_37);
}
var _39=[{}];
if(_36){
_39.push(_36);
}
if(_31.content){
_39.push(_31.content);
}
if(_31.preventCache){
_39.push({"dojo.preventCache":new Date().valueOf()});
}
_35.query=_d.objectToQuery(_d.mixin.apply(null,_39));
_35.handleAs=_31.handleAs||"text";
var d=new _d.Deferred(_32);
d.addCallbacks(_33,function(_3b){
return _34(_3b,d);
});
var ld=_31.load;
if(ld&&_d.isFunction(ld)){
d.addCallback(function(_3d){
return ld.call(_31,_3d,_35);
});
}
var err=_31.error;
if(err&&_d.isFunction(err)){
d.addErrback(function(_3f){
return err.call(_31,_3f,_35);
});
}
var _40=_31.handle;
if(_40&&_d.isFunction(_40)){
d.addBoth(function(_41){
return _40.call(_31,_41,_35);
});
}
d.ioArgs=_35;
return d;
};
var _42=function(dfd){
dfd.canceled=true;
var xhr=dfd.ioArgs.xhr;
var _at=typeof xhr.abort;
if(_at=="function"||_at=="object"||_at=="unknown"){
xhr.abort();
}
var err=dfd.ioArgs.error;
if(!err){
err=new Error("xhr cancelled");
err.dojoType="cancel";
}
return err;
};
var _47=function(dfd){
var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);
return ret===undefined?null:ret;
};
var _4a=function(_4b,dfd){
console.error(_4b);
return _4b;
};
var _4d=null;
var _4e=[];
var _4f=function(){
var now=(new Date()).getTime();
if(!_d._blockAsync){
for(var i=0,tif;i<_4e.length&&(tif=_4e[i]);i++){
var dfd=tif.dfd;
var _54=function(){
if(!dfd||dfd.canceled||!tif.validCheck(dfd)){
_4e.splice(i--,1);
}else{
if(tif.ioCheck(dfd)){
_4e.splice(i--,1);
tif.resHandle(dfd);
}else{
if(dfd.startTime){
if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){
_4e.splice(i--,1);
var err=new Error("timeout exceeded");
err.dojoType="timeout";
dfd.errback(err);
dfd.cancel();
}
}
}
}
};
if(dojo.config.debugAtAllCosts){
_54.call(this);
}else{
try{
_54.call(this);
}
catch(e){
dfd.errback(e);
}
}
}
}
if(!_4e.length){
clearInterval(_4d);
_4d=null;
return;
}
};
dojo._ioCancelAll=function(){
try{
_d.forEach(_4e,function(i){
try{
i.dfd.cancel();
}
catch(e){
}
});
}
catch(e){
}
};
if(_d.isIE){
_d.addOnWindowUnload(_d._ioCancelAll);
}
_d._ioWatch=function(dfd,_58,_59,_5a){
var _5b=dfd.ioArgs.args;
if(_5b.timeout){
dfd.startTime=(new Date()).getTime();
}
_4e.push({dfd:dfd,validCheck:_58,ioCheck:_59,resHandle:_5a});
if(!_4d){
_4d=setInterval(_4f,50);
}
if(_5b.sync){
_4f();
}
};
var _5c="application/x-www-form-urlencoded";
var _5d=function(dfd){
return dfd.ioArgs.xhr.readyState;
};
var _5f=function(dfd){
return 4==dfd.ioArgs.xhr.readyState;
};
var _61=function(dfd){
var xhr=dfd.ioArgs.xhr;
if(_d._isDocumentOk(xhr)){
dfd.callback(dfd);
}else{
var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);
err.status=xhr.status;
err.responseText=xhr.responseText;
dfd.errback(err);
}
};
dojo._ioAddQueryToUrl=function(_65){
if(_65.query.length){
_65.url+=(_65.url.indexOf("?")==-1?"?":"&")+_65.query;
_65.query=null;
}
};
dojo.xhr=function(_66,_67,_68){
var dfd=_d._ioSetArgs(_67,_42,_47,_4a);
dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);
if(_68){
if("postData" in _67){
dfd.ioArgs.query=_67.postData;
}else{
if("putData" in _67){
dfd.ioArgs.query=_67.putData;
}
}
}else{
_d._ioAddQueryToUrl(dfd.ioArgs);
}
var _6a=dfd.ioArgs;
var xhr=_6a.xhr;
xhr.open(_66,_6a.url,_67.sync!==true,_67.user||undefined,_67.password||undefined);
if(_67.headers){
for(var hdr in _67.headers){
if(hdr.toLowerCase()==="content-type"&&!_67.contentType){
_67.contentType=_67.headers[hdr];
}else{
xhr.setRequestHeader(hdr,_67.headers[hdr]);
}
}
}
xhr.setRequestHeader("Content-Type",_67.contentType||_5c);
if(!_67.headers||!_67.headers["X-Requested-With"]){
xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
}
if(dojo.config.debugAtAllCosts){
xhr.send(_6a.query);
}else{
try{
xhr.send(_6a.query);
}
catch(e){
dfd.ioArgs.error=e;
dfd.cancel();
}
}
_d._ioWatch(dfd,_5d,_5f,_61);
xhr=null;
return dfd;
};
dojo.xhrGet=function(_6d){
return _d.xhr("GET",_6d);
};
dojo.rawXhrPost=dojo.xhrPost=function(_6e){
return _d.xhr("POST",_6e,true);
};
dojo.rawXhrPut=dojo.xhrPut=function(_6f){
return _d.xhr("PUT",_6f,true);
};
dojo.xhrDelete=function(_70){
return _d.xhr("DELETE",_70);
};
})();
}
