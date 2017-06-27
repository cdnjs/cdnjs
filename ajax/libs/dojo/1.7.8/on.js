/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/on",["./has!dom-addeventlistener?:./aspect","./_base/kernel","./has"],function(_1,_2,_3){
"use strict";
if(1){
var _4=window.ScriptEngineMajorVersion;
_3.add("jscript",_4&&(_4()+ScriptEngineMinorVersion()/10));
_3.add("event-orientationchange",_3("touch")&&!_3("android"));
_3.add("event-focusin",function(_5,_6,_7){
return "onfocusin" in _7;
});
if(_3("touch")){
_3.add("touch-can-modify-event-delegate",function(){
var _8=function(){
};
_8.prototype=document.createEvent("MouseEvents");
try{
var _9=new _8;
_9.target=null;
return _9.target===null;
}
catch(e){
return false;
}
});
}
}
var on=function(_a,_b,_c,_d){
if(typeof _a.on=="function"&&typeof _b!="function"&&!_a.nodeType){
return _a.on(_b,_c);
}
return on.parse(_a,_b,_c,_e,_d,this);
};
on.pausable=function(_f,_10,_11,_12){
var _13;
var _14=on(_f,_10,function(){
if(!_13){
return _11.apply(this,arguments);
}
},_12);
_14.pause=function(){
_13=true;
};
_14.resume=function(){
_13=false;
};
return _14;
};
on.once=function(_15,_16,_17,_18){
var _19=on(_15,_16,function(){
_19.remove();
return _17.apply(this,arguments);
});
return _19;
};
on.parse=function(_1a,_1b,_1c,_1d,_1e,_1f){
if(_1b.call){
return _1b.call(_1f,_1a,_1c);
}
if(_1b.indexOf(",")>-1){
var _20=_1b.split(/\s*,\s*/);
var _21=[];
var i=0;
var _22;
while(_22=_20[i++]){
_21.push(_1d(_1a,_22,_1c,_1e,_1f));
}
_21.remove=function(){
for(var i=0;i<_21.length;i++){
_21[i].remove();
}
};
return _21;
}
return _1d(_1a,_1b,_1c,_1e,_1f);
};
var _23=/^touch/;
function _e(_24,_25,_26,_27,_28){
var _29=_25.match(/(.*):(.*)/);
if(_29){
_25=_29[2];
_29=_29[1];
return on.selector(_29,_25).call(_28,_24,_26);
}
if(_3("touch")){
if(_23.test(_25)){
_26=_2a(_26);
}
if(!_3("event-orientationchange")&&(_25=="orientationchange")){
_25="resize";
_24=window;
_26=_2a(_26);
}
}
if(_24.addEventListener){
var _2b=_25 in _2c;
_24.addEventListener(_2b?_2c[_25]:_25,_26,_2b);
return {remove:function(){
_24.removeEventListener(_25,_26,_2b);
}};
}
_25="on"+_25;
if(_2d&&_24.attachEvent){
return _2d(_24,_25,_26);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_2e,_2f,_30){
return function(_31,_32){
var _33=this;
var _34=_2f.bubble;
if(_34){
_2f=_34;
}else{
if(_30!==false){
_30=true;
}
}
return on(_31,_2f,function(_35){
var _36=_35.target;
_33=_33&&_33.matches?_33:_2.query;
while(!_33.matches(_36,_2e,_31)){
if(_36==_31||!_30||!(_36=_36.parentNode)){
return;
}
}
return _32.call(_36,_35);
});
};
};
function _37(){
this.cancelable=false;
};
function _38(){
this.bubbles=false;
};
var _39=[].slice,_3a=on.emit=function(_3b,_3c,_3d){
var _3e=_39.call(arguments,2);
var _3f="on"+_3c;
if("parentNode" in _3b){
var _40=_3e[0]={};
for(var i in _3d){
_40[i]=_3d[i];
}
_40.preventDefault=_37;
_40.stopPropagation=_38;
_40.target=_3b;
_40.type=_3c;
_3d=_40;
}
do{
_3b[_3f]&&_3b[_3f].apply(_3b,_3e);
}while(_3d&&_3d.bubbles&&(_3b=_3b.parentNode));
return _3d&&_3d.cancelable&&_3d;
};
var _2c=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(_3("dom-addeventlistener")){
if(_3("opera")){
_2c.keydown="keypress";
}
on.emit=function(_41,_42,_43){
if(_41.dispatchEvent&&document.createEvent){
var _44=_41.ownerDocument||document;
var _45=_44.createEvent("HTMLEvents");
_45.initEvent(_42,!!_43.bubbles,!!_43.cancelable);
for(var i in _43){
var _46=_43[i];
if(!(i in _45)){
_45[i]=_43[i];
}
}
return _41.dispatchEvent(_45)&&_45;
}
return _3a.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_47){
if(!evt){
var w=_47&&(_47.ownerDocument||_47.document||_47).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_47||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_48;
evt.preventDefault=_49;
}
switch(evt.type){
case "keypress":
var c=("charCode" in evt?evt.charCode:evt.keyCode);
if(c==10){
c=0;
evt.keyCode=13;
}else{
if(c==13||c==27){
c=0;
}else{
if(c==3){
c=99;
}
}
}
evt.charCode=c;
_4a(evt);
break;
}
}
return evt;
};
var _4b=function(_4c){
this.handle=_4c;
};
_4b.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _4d=function(_4e){
return function(evt){
evt=on._fixEvent(evt,this);
return _4e.call(this,evt);
};
};
var _2d=function(_4f,_50,_51){
_51=_4d(_51);
if(((_4f.ownerDocument?_4f.ownerDocument.parentWindow:_4f.parentWindow||_4f.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _52=_4f[_50];
if(!_52||!_52.listeners){
var _53=_52;
_4f[_50]=_52=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_52.listeners=[];
_52.global=this;
if(_53){
_52.listeners.push(_dojoIEListeners_.push(_53)-1);
}
}
var _54;
_52.listeners.push(_54=(_52.global._dojoIEListeners_.push(_51)-1));
return new _4b(_54);
}
return _1.after(_4f,_50,_51,true);
};
var _4a=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _48=function(){
this.cancelBubble=true;
};
var _49=on._preventDefault=function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
try{
this.keyCode=0;
}
catch(e){
}
}
this.returnValue=false;
};
}
if(_3("touch")){
var _55=function(){
};
var _56=window.orientation;
var _2a=function(_57){
return function(_58){
var _59=_58.corrected;
if(!_59){
var _5a=_58.type;
try{
delete _58.type;
}
catch(e){
}
if(_58.type){
if(_3("touch-can-modify-event-delegate")){
_55.prototype=_58;
_59=new _55;
}else{
_59={};
for(var _5b in _58){
_59[_5b]=_58[_5b];
}
}
_59.preventDefault=function(){
_58.preventDefault();
};
_59.stopPropagation=function(){
_58.stopPropagation();
};
}else{
_59=_58;
_59.type=_5a;
}
_58.corrected=_59;
if(_5a=="resize"){
if(_56==window.orientation){
return null;
}
_56=window.orientation;
_59.type="orientationchange";
return _57.call(this,_59);
}
if(!("rotation" in _59)){
_59.rotation=0;
_59.scale=1;
}
var _5c=_59.changedTouches[0];
for(var i in _5c){
delete _59[i];
_59[i]=_5c[i];
}
}
return _57.call(this,_59);
};
};
}
return on;
});
