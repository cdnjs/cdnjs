/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/on",["./has!dom-addeventlistener?:./aspect","./_base/kernel","./sniff"],function(_1,_2,_3){
"use strict";
if(1){
var _4=window.ScriptEngineMajorVersion;
_3.add("jscript",_4&&(_4()+ScriptEngineMinorVersion()/10));
_3.add("event-orientationchange",_3("touch")&&!_3("android"));
_3.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);
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
if(_2b){
_26=_2b(_26);
}
if(_24.addEventListener){
var _2c=_25 in _2d,_2e=_2c?_2d[_25]:_25;
_24.addEventListener(_2e,_26,_2c);
return {remove:function(){
_24.removeEventListener(_2e,_26,_2c);
}};
}
_25="on"+_25;
if(_2f&&_24.attachEvent){
return _2f(_24,_25,_26);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_30,_31,_32){
return function(_33,_34){
var _35=typeof _30=="function"?{matches:_30}:this,_36=_31.bubble;
function _37(_38){
_35=_35&&_35.matches?_35:_2.query;
while(!_35.matches(_38,_30,_33)){
if(_38==_33||_32===false||!(_38=_38.parentNode)||_38.nodeType!=1){
return;
}
}
return _38;
};
if(_36){
return on(_33,_36(_37),_34);
}
return on(_33,_31,function(_39){
var _3a=_37(_39.target);
if(_3a){
return _34.call(_3a,_39);
}
});
};
};
function _3b(){
this.cancelable=false;
this.defaultPrevented=true;
};
function _3c(){
this.bubbles=false;
};
var _3d=[].slice,_3e=on.emit=function(_3f,_40,_41){
var _42=_3d.call(arguments,2);
var _43="on"+_40;
if("parentNode" in _3f){
var _44=_42[0]={};
for(var i in _41){
_44[i]=_41[i];
}
_44.preventDefault=_3b;
_44.stopPropagation=_3c;
_44.target=_3f;
_44.type=_40;
_41=_44;
}
do{
_3f[_43]&&_3f[_43].apply(_3f,_42);
}while(_41&&_41.bubbles&&(_3f=_3f.parentNode));
return _41&&_41.cancelable&&_41;
};
var _2d=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(!_3("event-stopimmediatepropagation")){
var _45=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _2b=function(_46){
return function(_47){
if(!_47.immediatelyStopped){
_47.stopImmediatePropagation=_45;
return _46.apply(this,arguments);
}
};
};
}
if(_3("dom-addeventlistener")){
on.emit=function(_48,_49,_4a){
if(_48.dispatchEvent&&document.createEvent){
var _4b=_48.ownerDocument||document;
var _4c=_4b.createEvent("HTMLEvents");
_4c.initEvent(_49,!!_4a.bubbles,!!_4a.cancelable);
for(var i in _4a){
if(!(i in _4c)){
_4c[i]=_4a[i];
}
}
return _48.dispatchEvent(_4c)&&_4c;
}
return _3e.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_4d){
if(!evt){
var w=_4d&&(_4d.ownerDocument||_4d.document||_4d).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
try{
if(_4e&&evt.type==_4e.type&&evt.srcElement==_4e.target){
evt=_4e;
}
}
catch(e){
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_4d||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_4f;
evt.preventDefault=_50;
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
_51(evt);
break;
}
}
return evt;
};
var _4e,_52=function(_53){
this.handle=_53;
};
_52.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _54=function(_55){
return function(evt){
evt=on._fixEvent(evt,this);
var _56=_55.call(this,evt);
if(evt.modified){
if(!_4e){
setTimeout(function(){
_4e=null;
});
}
_4e=evt;
}
return _56;
};
};
var _2f=function(_57,_58,_59){
_59=_54(_59);
if(((_57.ownerDocument?_57.ownerDocument.parentWindow:_57.parentWindow||_57.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _5a=_57[_58];
if(!_5a||!_5a.listeners){
var _5b=_5a;
_5a=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_5a.listeners=[];
_57[_58]=_5a;
_5a.global=this;
if(_5b){
_5a.listeners.push(_dojoIEListeners_.push(_5b)-1);
}
}
var _5c;
_5a.listeners.push(_5c=(_5a.global._dojoIEListeners_.push(_59)-1));
return new _52(_5c);
}
return _1.after(_57,_58,_59,true);
};
var _51=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _4f=function(){
this.cancelBubble=true;
};
var _50=on._preventDefault=function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
try{
this.keyCode=0;
}
catch(e){
}
}
this.defaultPrevented=true;
this.returnValue=false;
this.modified=true;
};
}
if(_3("touch")){
var _5d=function(){
};
var _5e=window.orientation;
var _2a=function(_5f){
return function(_60){
var _61=_60.corrected;
if(!_61){
var _62=_60.type;
try{
delete _60.type;
}
catch(e){
}
if(_60.type){
if(_3("touch-can-modify-event-delegate")){
_5d.prototype=_60;
_61=new _5d;
}else{
_61={};
for(var _63 in _60){
_61[_63]=_60[_63];
}
}
_61.preventDefault=function(){
_60.preventDefault();
};
_61.stopPropagation=function(){
_60.stopPropagation();
};
}else{
_61=_60;
_61.type=_62;
}
_60.corrected=_61;
if(_62=="resize"){
if(_5e==window.orientation){
return null;
}
_5e=window.orientation;
_61.type="orientationchange";
return _5f.call(this,_61);
}
if(!("rotation" in _61)){
_61.rotation=0;
_61.scale=1;
}
var _64=_61.changedTouches[0];
for(var i in _64){
delete _61[i];
_61[i]=_64[i];
}
}
return _5f.call(this,_61);
};
};
}
return on;
});
