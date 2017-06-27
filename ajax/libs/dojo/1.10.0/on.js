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
if(_19 instanceof Array){
_1e=_19;
}else{
if(_19.indexOf(",")>-1){
var _1e=_19.split(/\s*,\s*/);
}
}
if(_1e){
var _1f=[];
var i=0;
var _20;
while(_20=_1e[i++]){
_1f.push(on.parse(_18,_20,_1a,_1b,_1c,_1d));
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
if(_29){
_24=_29(_24);
}
if(_22.addEventListener){
var _2a=_23 in _2b,_2c=_2a?_2b[_23]:_23;
_22.addEventListener(_2c,_24,_2a);
return {remove:function(){
_22.removeEventListener(_2c,_24,_2a);
}};
}
_23="on"+_23;
if(_2d&&_22.attachEvent){
return _2d(_22,_23,_24);
}
throw new Error("Target must be an event emitter");
};
on.matches=function(_2e,_2f,_30,_31,_32){
_32=_32&&_32.matches?_32:_2.query;
_31=_31!==false;
if(_2e.nodeType!=1){
_2e=_2e.parentNode;
}
while(!_32.matches(_2e,_2f,_30)){
if(_2e==_30||_31===false||!(_2e=_2e.parentNode)||_2e.nodeType!=1){
return false;
}
}
return _2e;
};
on.selector=function(_33,_34,_35){
return function(_36,_37){
var _38=typeof _33=="function"?{matches:_33}:this,_39=_34.bubble;
function _3a(_3b){
return on.matches(_3b,_33,_36,_35,_38);
};
if(_39){
return on(_36,_39(_3a),_37);
}
return on(_36,_34,function(_3c){
var _3d=_3a(_3c.target);
return _3d&&_37.call(_3d,_3c);
});
};
};
function _3e(){
this.cancelable=false;
this.defaultPrevented=true;
};
function _3f(){
this.bubbles=false;
};
var _40=[].slice,_41=on.emit=function(_42,_43,_44){
var _45=_40.call(arguments,2);
var _46="on"+_43;
if("parentNode" in _42){
var _47=_45[0]={};
for(var i in _44){
_47[i]=_44[i];
}
_47.preventDefault=_3e;
_47.stopPropagation=_3f;
_47.target=_42;
_47.type=_43;
_44=_47;
}
do{
_42[_46]&&_42[_46].apply(_42,_45);
}while(_44&&_44.bubbles&&(_42=_42.parentNode));
return _44&&_44.cancelable&&_44;
};
var _2b=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(!_3("event-stopimmediatepropagation")){
var _48=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _29=function(_49){
return function(_4a){
if(!_4a.immediatelyStopped){
_4a.stopImmediatePropagation=_48;
return _49.apply(this,arguments);
}
};
};
}
if(_3("dom-addeventlistener")){
on.emit=function(_4b,_4c,_4d){
if(_4b.dispatchEvent&&document.createEvent){
var _4e=_4b.ownerDocument||document;
var _4f=_4e.createEvent("HTMLEvents");
_4f.initEvent(_4c,!!_4d.bubbles,!!_4d.cancelable);
for(var i in _4d){
if(!(i in _4f)){
_4f[i]=_4d[i];
}
}
return _4b.dispatchEvent(_4f)&&_4f;
}
return _41.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_50){
if(!evt){
var w=_50&&(_50.ownerDocument||_50.document||_50).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
try{
if(_51&&evt.type==_51.type&&evt.srcElement==_51.target){
evt=_51;
}
}
catch(e){
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_50||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_52;
evt.preventDefault=_53;
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
_54(evt);
break;
}
}
return evt;
};
var _51,_55=function(_56){
this.handle=_56;
};
_55.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _57=function(_58){
return function(evt){
evt=on._fixEvent(evt,this);
var _59=_58.call(this,evt);
if(evt.modified){
if(!_51){
setTimeout(function(){
_51=null;
});
}
_51=evt;
}
return _59;
};
};
var _2d=function(_5a,_5b,_5c){
_5c=_57(_5c);
if(((_5a.ownerDocument?_5a.ownerDocument.parentWindow:_5a.parentWindow||_5a.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _5d=_5a[_5b];
if(!_5d||!_5d.listeners){
var _5e=_5d;
_5d=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_5d.listeners=[];
_5a[_5b]=_5d;
_5d.global=this;
if(_5e){
_5d.listeners.push(_dojoIEListeners_.push(_5e)-1);
}
}
var _5f;
_5d.listeners.push(_5f=(_5d.global._dojoIEListeners_.push(_5c)-1));
return new _55(_5f);
}
return _1.after(_5a,_5b,_5c,true);
};
var _54=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _52=function(){
this.cancelBubble=true;
};
var _53=on._preventDefault=function(){
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
var _60=function(){
};
var _61=window.orientation;
var _28=function(_62){
return function(_63){
var _64=_63.corrected;
if(!_64){
var _65=_63.type;
try{
delete _63.type;
}
catch(e){
}
if(_63.type){
if(_3("mozilla")){
var _64={};
for(var _66 in _63){
_64[_66]=_63[_66];
}
}else{
_60.prototype=_63;
var _64=new _60;
}
_64.preventDefault=function(){
_63.preventDefault();
};
_64.stopPropagation=function(){
_63.stopPropagation();
};
}else{
_64=_63;
_64.type=_65;
}
_63.corrected=_64;
if(_65=="resize"){
if(_61==window.orientation){
return null;
}
_61=window.orientation;
_64.type="orientationchange";
return _62.call(this,_64);
}
if(!("rotation" in _64)){
_64.rotation=0;
_64.scale=1;
}
var _67=_64.changedTouches[0];
for(var i in _67){
delete _64[i];
_64[i]=_67[i];
}
}
return _62.call(this,_64);
};
};
}
return on;
});
