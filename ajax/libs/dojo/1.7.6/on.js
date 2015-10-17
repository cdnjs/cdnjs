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
}
var on=function(_8,_9,_a,_b){
if(typeof _8.on=="function"&&typeof _9!="function"&&!_8.nodeType){
return _8.on(_9,_a);
}
return on.parse(_8,_9,_a,_c,_b,this);
};
on.pausable=function(_d,_e,_f,_10){
var _11;
var _12=on(_d,_e,function(){
if(!_11){
return _f.apply(this,arguments);
}
},_10);
_12.pause=function(){
_11=true;
};
_12.resume=function(){
_11=false;
};
return _12;
};
on.once=function(_13,_14,_15,_16){
var _17=on(_13,_14,function(){
_17.remove();
return _15.apply(this,arguments);
});
return _17;
};
on.parse=function(_18,_19,_1a,_1b,_1c,_1d){
if(_19.call){
return _19.call(_1d,_18,_1a);
}
if(_19.indexOf(",")>-1){
var _1e=_19.split(/\s*,\s*/);
var _1f=[];
var i=0;
var _20;
while(_20=_1e[i++]){
_1f.push(_1b(_18,_20,_1a,_1c,_1d));
}
_1f.remove=function(){
for(var i=0;i<_1f.length;i++){
_1f[i].remove();
}
};
return _1f;
}
return _1b(_18,_19,_1a,_1c,_1d);
};
var _21=/^touch/;
function _c(_22,_23,_24,_25,_26){
var _27=_23.match(/(.*):(.*)/);
if(_27){
_23=_27[2];
_27=_27[1];
return on.selector(_27,_23).call(_26,_22,_24);
}
if(_3("touch")){
if(_21.test(_23)){
_24=_28(_24);
}
if(!_3("event-orientationchange")&&(_23=="orientationchange")){
_23="resize";
_22=window;
_24=_28(_24);
}
}
if(_22.addEventListener){
var _29=_23 in _2a;
_22.addEventListener(_29?_2a[_23]:_23,_24,_29);
return {remove:function(){
_22.removeEventListener(_23,_24,_29);
}};
}
_23="on"+_23;
if(_2b&&_22.attachEvent){
return _2b(_22,_23,_24);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_2c,_2d,_2e){
return function(_2f,_30){
var _31=this;
var _32=_2d.bubble;
if(_32){
_2d=_32;
}else{
if(_2e!==false){
_2e=true;
}
}
return on(_2f,_2d,function(_33){
var _34=_33.target;
_31=_31&&_31.matches?_31:_2.query;
while(!_31.matches(_34,_2c,_2f)){
if(_34==_2f||!_2e||!(_34=_34.parentNode)){
return;
}
}
return _30.call(_34,_33);
});
};
};
function _35(){
this.cancelable=false;
};
function _36(){
this.bubbles=false;
};
var _37=[].slice,_38=on.emit=function(_39,_3a,_3b){
var _3c=_37.call(arguments,2);
var _3d="on"+_3a;
if("parentNode" in _39){
var _3e=_3c[0]={};
for(var i in _3b){
_3e[i]=_3b[i];
}
_3e.preventDefault=_35;
_3e.stopPropagation=_36;
_3e.target=_39;
_3e.type=_3a;
_3b=_3e;
}
do{
_39[_3d]&&_39[_3d].apply(_39,_3c);
}while(_3b&&_3b.bubbles&&(_39=_39.parentNode));
return _3b&&_3b.cancelable&&_3b;
};
var _2a=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(_3("dom-addeventlistener")){
if(_3("opera")){
_2a.keydown="keypress";
}
on.emit=function(_3f,_40,_41){
if(_3f.dispatchEvent&&document.createEvent){
var _42=_3f.ownerDocument||document;
var _43=_42.createEvent("HTMLEvents");
_43.initEvent(_40,!!_41.bubbles,!!_41.cancelable);
for(var i in _41){
var _44=_41[i];
if(!(i in _43)){
_43[i]=_41[i];
}
}
return _3f.dispatchEvent(_43)&&_43;
}
return _38.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_45){
if(!evt){
var w=_45&&(_45.ownerDocument||_45.document||_45).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_45||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_46;
evt.preventDefault=_47;
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
_48(evt);
break;
}
}
return evt;
};
var _49=function(_4a){
this.handle=_4a;
};
_49.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _4b=function(_4c){
return function(evt){
evt=on._fixEvent(evt,this);
return _4c.call(this,evt);
};
};
var _2b=function(_4d,_4e,_4f){
_4f=_4b(_4f);
if(((_4d.ownerDocument?_4d.ownerDocument.parentWindow:_4d.parentWindow||_4d.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _50=_4d[_4e];
if(!_50||!_50.listeners){
var _51=_50;
_4d[_4e]=_50=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_50.listeners=[];
_50.global=this;
if(_51){
_50.listeners.push(_dojoIEListeners_.push(_51)-1);
}
}
var _52;
_50.listeners.push(_52=(_50.global._dojoIEListeners_.push(_4f)-1));
return new _49(_52);
}
return _1.after(_4d,_4e,_4f,true);
};
var _48=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _46=function(){
this.cancelBubble=true;
};
var _47=on._preventDefault=function(){
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
var _53=function(){
};
var _54=window.orientation;
var _28=function(_55){
return function(_56){
var _57=_56.corrected;
if(!_57){
var _58=_56.type;
try{
delete _56.type;
}
catch(e){
}
if(_56.type){
_53.prototype=_56;
var _57=new _53;
_57.preventDefault=function(){
_56.preventDefault();
};
_57.stopPropagation=function(){
_56.stopPropagation();
};
}else{
_57=_56;
_57.type=_58;
}
_56.corrected=_57;
if(_58=="resize"){
if(_54==window.orientation){
return null;
}
_54=window.orientation;
_57.type="orientationchange";
return _55.call(this,_57);
}
if(!("rotation" in _57)){
_57.rotation=0;
_57.scale=1;
}
var _59=_57.changedTouches[0];
for(var i in _59){
delete _57[i];
_57[i]=_59[i];
}
}
return _55.call(this,_57);
};
};
}
return on;
});
