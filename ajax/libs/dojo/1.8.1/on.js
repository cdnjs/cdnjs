/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
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
_3.add("event-stopimmediatepropagation",window.Event&&!!window.Event.prototype&&!!window.Event.prototype.stopImmediatePropagation);
}
var on=function(_5,_6,_7,_8){
if(typeof _5.on=="function"&&typeof _6!="function"){
return _5.on(_6,_7);
}
return on.parse(_5,_6,_7,_9,_8,this);
};
on.pausable=function(_a,_b,_c,_d){
var _e;
var _f=on(_a,_b,function(){
if(!_e){
return _c.apply(this,arguments);
}
},_d);
_f.pause=function(){
_e=true;
};
_f.resume=function(){
_e=false;
};
return _f;
};
on.once=function(_10,_11,_12,_13){
var _14=on(_10,_11,function(){
_14.remove();
return _12.apply(this,arguments);
});
return _14;
};
on.parse=function(_15,_16,_17,_18,_19,_1a){
if(_16.call){
return _16.call(_1a,_15,_17);
}
if(_16.indexOf(",")>-1){
var _1b=_16.split(/\s*,\s*/);
var _1c=[];
var i=0;
var _1d;
while(_1d=_1b[i++]){
_1c.push(_18(_15,_1d,_17,_19,_1a));
}
_1c.remove=function(){
for(var i=0;i<_1c.length;i++){
_1c[i].remove();
}
};
return _1c;
}
return _18(_15,_16,_17,_19,_1a);
};
var _1e=/^touch/;
function _9(_1f,_20,_21,_22,_23){
var _24=_20.match(/(.*):(.*)/);
if(_24){
_20=_24[2];
_24=_24[1];
return on.selector(_24,_20).call(_23,_1f,_21);
}
if(_3("touch")){
if(_1e.test(_20)){
_21=_25(_21);
}
if(!_3("event-orientationchange")&&(_20=="orientationchange")){
_20="resize";
_1f=window;
_21=_25(_21);
}
}
if(_26){
_21=_26(_21);
}
if(_1f.addEventListener){
var _27=_20 in _28,_29=_27?_28[_20]:_20;
_1f.addEventListener(_29,_21,_27);
return {remove:function(){
_1f.removeEventListener(_29,_21,_27);
}};
}
_20="on"+_20;
if(_2a&&_1f.attachEvent){
return _2a(_1f,_20,_21);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_2b,_2c,_2d){
return function(_2e,_2f){
var _30=typeof _2b=="function"?{matches:_2b}:this,_31=_2c.bubble;
function _32(_33){
_30=_30&&_30.matches?_30:_2.query;
while(!_30.matches(_33,_2b,_2e)){
if(_33==_2e||_2d===false||!(_33=_33.parentNode)||_33.nodeType!=1){
return;
}
}
return _33;
};
if(_31){
return on(_2e,_31(_32),_2f);
}
return on(_2e,_2c,function(_34){
var _35=_32(_34.target);
return _35&&_2f.call(_35,_34);
});
};
};
function _36(){
this.cancelable=false;
};
function _37(){
this.bubbles=false;
};
var _38=[].slice,_39=on.emit=function(_3a,_3b,_3c){
var _3d=_38.call(arguments,2);
var _3e="on"+_3b;
if("parentNode" in _3a){
var _3f=_3d[0]={};
for(var i in _3c){
_3f[i]=_3c[i];
}
_3f.preventDefault=_36;
_3f.stopPropagation=_37;
_3f.target=_3a;
_3f.type=_3b;
_3c=_3f;
}
do{
_3a[_3e]&&_3a[_3e].apply(_3a,_3d);
}while(_3c&&_3c.bubbles&&(_3a=_3a.parentNode));
return _3c&&_3c.cancelable&&_3c;
};
var _28={};
if(!_3("event-stopimmediatepropagation")){
var _40=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _26=function(_41){
return function(_42){
if(!_42.immediatelyStopped){
_42.stopImmediatePropagation=_40;
return _41.apply(this,arguments);
}
};
};
}
if(_3("dom-addeventlistener")){
_28={focusin:"focus",focusout:"blur"};
if(_3("opera")){
_28.keydown="keypress";
}
on.emit=function(_43,_44,_45){
if(_43.dispatchEvent&&document.createEvent){
var _46=_43.ownerDocument.createEvent("HTMLEvents");
_46.initEvent(_44,!!_45.bubbles,!!_45.cancelable);
for(var i in _45){
var _47=_45[i];
if(!(i in _46)){
_46[i]=_45[i];
}
}
return _43.dispatchEvent(_46)&&_46;
}
return _39.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_48){
if(!evt){
var w=_48&&(_48.ownerDocument||_48.document||_48).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
if(_49&&evt.type==_49.type){
evt=_49;
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_48||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_4a;
evt.preventDefault=_4b;
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
_4c(evt);
break;
}
}
return evt;
};
var _49,_4d=function(_4e){
this.handle=_4e;
};
_4d.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _4f=function(_50){
return function(evt){
evt=on._fixEvent(evt,this);
var _51=_50.call(this,evt);
if(evt.modified){
if(!_49){
setTimeout(function(){
_49=null;
});
}
_49=evt;
}
return _51;
};
};
var _2a=function(_52,_53,_54){
_54=_4f(_54);
if(((_52.ownerDocument?_52.ownerDocument.parentWindow:_52.parentWindow||_52.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _55=_52[_53];
if(!_55||!_55.listeners){
var _56=_55;
_55=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_55.listeners=[];
_52[_53]=_55;
_55.global=this;
if(_56){
_55.listeners.push(_dojoIEListeners_.push(_56)-1);
}
}
var _57;
_55.listeners.push(_57=(_55.global._dojoIEListeners_.push(_54)-1));
return new _4d(_57);
}
return _1.after(_52,_53,_54,true);
};
var _4c=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _4a=function(){
this.cancelBubble=true;
};
var _4b=on._preventDefault=function(){
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
};
}
if(_3("touch")){
var _58=function(){
};
var _59=window.orientation;
var _25=function(_5a){
return function(_5b){
var _5c=_5b.corrected;
if(!_5c){
var _5d=_5b.type;
try{
delete _5b.type;
}
catch(e){
}
if(_5b.type){
_58.prototype=_5b;
var _5c=new _58;
_5c.preventDefault=function(){
_5b.preventDefault();
};
_5c.stopPropagation=function(){
_5b.stopPropagation();
};
}else{
_5c=_5b;
_5c.type=_5d;
}
_5b.corrected=_5c;
if(_5d=="resize"){
if(_59==window.orientation){
return null;
}
_59=window.orientation;
_5c.type="orientationchange";
return _5a.call(this,_5c);
}
if(!("rotation" in _5c)){
_5c.rotation=0;
_5c.scale=1;
}
var _5e=_5c.changedTouches[0];
for(var i in _5e){
delete _5c[i];
_5c[i]=_5e[i];
}
}
return _5a.call(this,_5c);
};
};
}
return on;
});
