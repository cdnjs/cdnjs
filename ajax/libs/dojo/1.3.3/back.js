/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.back"]){
dojo._hasResource["dojo.back"]=true;
dojo.provide("dojo.back");
(function(){
var _1=dojo.back;
function _2(){
var h=window.location.hash;
if(h.charAt(0)=="#"){
h=h.substring(1);
}
return dojo.isMozilla?h:decodeURIComponent(h);
};
function _4(h){
if(!h){
h="";
}
window.location.hash=encodeURIComponent(h);
_6=history.length;
};
if(dojo.exists("tests.back-hash")){
_1.getHash=_2;
_1.setHash=_4;
}
var _7=(typeof (window)!=="undefined")?window.location.href:"";
var _8=(typeof (window)!=="undefined")?_2():"";
var _9=null;
var _a=null;
var _b=null;
var _c=null;
var _d=[];
var _e=[];
var _f=false;
var _10=false;
var _6;
function _11(){
var _12=_e.pop();
if(!_12){
return;
}
var _13=_e[_e.length-1];
if(!_13&&_e.length==0){
_13=_9;
}
if(_13){
if(_13.kwArgs["back"]){
_13.kwArgs["back"]();
}else{
if(_13.kwArgs["backButton"]){
_13.kwArgs["backButton"]();
}else{
if(_13.kwArgs["handle"]){
_13.kwArgs.handle("back");
}
}
}
}
_d.push(_12);
};
_1.goBack=_11;
function _14(){
var _15=_d.pop();
if(!_15){
return;
}
if(_15.kwArgs["forward"]){
_15.kwArgs.forward();
}else{
if(_15.kwArgs["forwardButton"]){
_15.kwArgs.forwardButton();
}else{
if(_15.kwArgs["handle"]){
_15.kwArgs.handle("forward");
}
}
}
_e.push(_15);
};
_1.goForward=_14;
function _16(url,_18,_19){
return {"url":url,"kwArgs":_18,"urlHash":_19};
};
function _1a(url){
var _1c=url.split("?");
if(_1c.length<2){
return null;
}else{
return _1c[1];
}
};
function _1d(){
var url=(dojo.config["dojoIframeHistoryUrl"]||dojo.moduleUrl("dojo","resources/iframe_history.html"))+"?"+(new Date()).getTime();
_f=true;
if(_c){
dojo.isWebKit?_c.location=url:window.frames[_c.name].location=url;
}else{
}
return url;
};
function _1f(){
if(!_10){
var hsl=_e.length;
var _21=_2();
if((_21===_8||window.location.href==_7)&&(hsl==1)){
_11();
return;
}
if(_d.length>0){
if(_d[_d.length-1].urlHash===_21){
_14();
return;
}
}
if((hsl>=2)&&(_e[hsl-2])){
if(_e[hsl-2].urlHash===_21){
_11();
return;
}
}
if(dojo.isSafari&&dojo.isSafari<3){
var _22=history.length;
if(_22>_6){
_14();
}else{
if(_22<_6){
_11();
}
}
_6=_22;
}
}
};
_1.init=function(){
if(dojo.byId("dj_history")){
return;
}
var src=dojo.config["dojoIframeHistoryUrl"]||dojo.moduleUrl("dojo","resources/iframe_history.html");
document.write("<iframe style=\"border:0;width:1px;height:1px;position:absolute;visibility:hidden;bottom:0;right:0;\" name=\"dj_history\" id=\"dj_history\" src=\""+src+"\"></iframe>");
};
_1.setInitialState=function(_24){
_9=_16(_7,_24,_8);
};
_1.addToHistory=function(_25){
_d=[];
var _26=null;
var url=null;
if(!_c){
if(dojo.config["useXDomain"]&&!dojo.config["dojoIframeHistoryUrl"]){
console.warn("dojo.back: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
_c=window.frames["dj_history"];
}
if(!_b){
_b=dojo.create("a",{style:{display:"none"}},dojo.body());
}
if(_25["changeUrl"]){
_26=""+((_25["changeUrl"]!==true)?_25["changeUrl"]:(new Date()).getTime());
if(_e.length==0&&_9.urlHash==_26){
_9=_16(url,_25,_26);
return;
}else{
if(_e.length>0&&_e[_e.length-1].urlHash==_26){
_e[_e.length-1]=_16(url,_25,_26);
return;
}
}
_10=true;
setTimeout(function(){
_4(_26);
_10=false;
},1);
_b.href=_26;
if(dojo.isIE){
url=_1d();
var _28=_25["back"]||_25["backButton"]||_25["handle"];
var tcb=function(_2a){
if(_2()!=""){
setTimeout(function(){
_4(_26);
},1);
}
_28.apply(this,[_2a]);
};
if(_25["back"]){
_25.back=tcb;
}else{
if(_25["backButton"]){
_25.backButton=tcb;
}else{
if(_25["handle"]){
_25.handle=tcb;
}
}
}
var _2b=_25["forward"]||_25["forwardButton"]||_25["handle"];
var tfw=function(_2d){
if(_2()!=""){
_4(_26);
}
if(_2b){
_2b.apply(this,[_2d]);
}
};
if(_25["forward"]){
_25.forward=tfw;
}else{
if(_25["forwardButton"]){
_25.forwardButton=tfw;
}else{
if(_25["handle"]){
_25.handle=tfw;
}
}
}
}else{
if(!dojo.isIE){
if(!_a){
_a=setInterval(_1f,200);
}
}
}
}else{
url=_1d();
}
_e.push(_16(url,_25,_26));
};
_1._iframeLoaded=function(evt,_2f){
var _30=_1a(_2f.href);
if(_30==null){
if(_e.length==1){
_11();
}
return;
}
if(_f){
_f=false;
return;
}
if(_e.length>=2&&_30==_1a(_e[_e.length-2].url)){
_11();
}else{
if(_d.length>0&&_30==_1a(_d[_d.length-1].url)){
_14();
}
}
};
})();
}
