/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
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
function _8(_9,_a){
var i=_9.indexOf(_a);
return (i>=0)?_9.substring(i+1):"";
};
function _3(){
return _8(location.href,"#");
};
function _b(){
dojo.publish("/dojo/hashchange",[_3()]);
};
function _c(){
if(_3()===_5){
return;
}
_5=_3();
_b();
};
function _4(_d){
if(_6){
if(_6.isTransitioning()){
setTimeout(dojo.hitch(null,_4,_d),_7);
return;
}
var _e=_6.iframe.location.href;
var _f=_e.indexOf("?");
_6.iframe.location.replace(_e.substring(0,_f)+"?"+_d);
return;
}
location.replace("#"+_d);
_c();
};
function _10(){
var ifr=document.createElement("iframe"),_11="dojo-hash-iframe",_12=dojo.config.dojoBlankHtmlUrl||dojo.moduleUrl("dojo","resources/blank.html");
ifr.id=_11;
ifr.src=_12+"?"+_3();
ifr.style.display="none";
document.body.appendChild(ifr);
this.iframe=dojo.global[_11];
var _13,_14,_15,_16,_17,_18=this.iframe.location;
function _19(){
_5=_3();
_13=_17?_5:_8(_18.href,"?");
_14=false;
_15=null;
};
this.isTransitioning=function(){
return _14;
};
this.pollLocation=function(){
if(!_17){
try{
var _1a=_8(_18.href,"?");
if(document.title!=_16){
_16=this.iframe.document.title=document.title;
}
}
catch(e){
_17=true;
console.error("dojo.hash: Error adding history entry. Server unreachable.");
}
}
var _1b=_3();
if(_14&&_5===_1b){
if(_17||_1a===_15){
_19();
_b();
}else{
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}
}else{
if(_5===_1b&&(_17||_13===_1a)){
}else{
if(_5!==_1b){
_5=_1b;
_14=true;
_15=_1b;
ifr.src=_12+"?"+_15;
_17=false;
setTimeout(dojo.hitch(this,this.pollLocation),0);
return;
}else{
if(!_17){
location.href="#"+_18.search.substring(1);
_19();
_b();
}
}
}
}
setTimeout(dojo.hitch(this,this.pollLocation),_7);
};
_19();
setTimeout(dojo.hitch(this,this.pollLocation),_7);
};
dojo.addOnLoad(function(){
if("onhashchange" in dojo.global&&(!dojo.isIE||(dojo.isIE>=8&&document.compatMode!="BackCompat"))){
dojo.connect(dojo.global,"onhashchange",_b);
}else{
if(document.addEventListener){
_5=_3();
setInterval(_c,_7);
}else{
if(document.attachEvent){
_6=new _10();
}
}
}
});
})();
}
