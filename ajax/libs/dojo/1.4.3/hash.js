/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.hash"]){
dojo._hasResource["dojo.hash"]=true;
dojo.provide("dojo.hash");
(function(){
dojo.hash=function(_1,_2){
if(!arguments.length){
return _3();
}
if(_1.charAt(0)=="#"){
_1=_1.substring(1);
}
if(_2){
_4(_1);
}else{
location.href="#"+_1;
}
return _1;
};
var _5=null,_6=null,_7=dojo.config.hashPollFrequency||100;
function _3(){
var h=location.href,i=h.indexOf("#");
return (i>=0)?h.substring(i+1):"";
};
function _8(){
dojo.publish("/dojo/hashchange",[_3()]);
};
function _9(){
if(_3()===_5){
return;
}
_5=_3();
_8();
};
function _4(_a){
if(_6){
if(_6.isTransitioning()){
setTimeout(dojo.hitch(null,_4,_a),_7);
return;
}
var _b=_6.iframe.location.href;
var _c=_b.indexOf("?");
_6.iframe.location.replace(_b.substring(0,_c)+"?"+_a);
return;
}
location.replace("#"+_a);
_9();
};
function _d(){
var _e=document.createElement("iframe"),_f="dojo-hash-iframe",_10=dojo.config.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html");
_e.id=_f;
_e.src=_10+"?"+_3();
_e.style.display="none";
document.body.appendChild(_e);
this.iframe=dojo.global[_f];
var _11,_12,_13,_14,_15,_16=this.iframe.location,_17=dojo.global.location;
function _18(){
_5=_17.hash;
_11=_15?_5:_16.search;
_12=false;
_13=null;
};
this.isTransitioning=function(){
return _12;
};
this.pollLocation=function(){
if(!_15){
try{
_16.search;
if(document.title!=_14){
_14=this.iframe.document.title=document.title;
}
}
catch(e){
_15=true;
console.error("dojo.hash: Error adding history entry. Server unreachable.");
}
}
if(_12&&_5===_17.hash){
if(_15||_16.search===_13){
_18();
_8();
}else{
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}
}else{
if(_5===_17.hash&&(_15||_11===_16.search)){
}else{
if(_5!==_17.hash){
_5=_17.hash;
_12=true;
_13="?"+_3();
_e.src=_10+_13;
_15=false;
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}else{
if(!_15){
_17.href="#"+_16.search.substring(1);
_18();
_8();
}
}
}
}
setTimeout(dojo.hitch(this,this.pollLocation),_7);
};
_18();
setTimeout(dojo.hitch(this,this.pollLocation),_7);
};
dojo.addOnLoad(function(){
if("onhashchange" in dojo.global&&(!dojo.isIE||(dojo.isIE>=8&&document.compatMode!="BackCompat"))){
dojo.connect(dojo.global,"onhashchange",_8);
}else{
if(document.addEventListener){
_5=_3();
setInterval(_9,_7);
}else{
if(document.attachEvent){
_6=new _d();
}
}
}
});
})();
}
