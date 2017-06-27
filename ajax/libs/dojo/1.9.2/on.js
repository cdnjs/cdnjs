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
return "onfocusin" in _7||(_7.addEventListener&&(function(){
var _8=false;
function _9(){
_8=true;
};
try{
var _a=_6.createElement("input"),_b=_6.activeElement;
_a.style.position="fixed";
_a.addEventListener("focusin",_9,false);
_6.body.appendChild(_a);
_a.focus();
_6.body.removeChild(_a);
_a.removeEventListener("focusin",_9,false);
_b.focus();
}
catch(e){
}
return _8;
})());
});
}
var on=function(_c,_d,_e,_f){
if(typeof _c.on=="function"&&typeof _d!="function"&&!_c.nodeType){
return _c.on(_d,_e);
}
return on.parse(_c,_d,_e,_10,_f,this);
};
on.pausable=function(_11,_12,_13,_14){
var _15;
var _16=on(_11,_12,function(){
if(!_15){
return _13.apply(this,arguments);
}
},_14);
_16.pause=function(){
_15=true;
};
_16.resume=function(){
_15=false;
};
return _16;
};
on.once=function(_17,_18,_19,_1a){
var _1b=on(_17,_18,function(){
_1b.remove();
return _19.apply(this,arguments);
});
return _1b;
};
on.parse=function(_1c,_1d,_1e,_1f,_20,_21){
if(_1d.call){
return _1d.call(_21,_1c,_1e);
}
if(_1d.indexOf(",")>-1){
var _22=_1d.split(/\s*,\s*/);
var _23=[];
var i=0;
var _24;
while(_24=_22[i++]){
_23.push(_1f(_1c,_24,_1e,_20,_21));
}
_23.remove=function(){
for(var i=0;i<_23.length;i++){
_23[i].remove();
}
};
return _23;
}
return _1f(_1c,_1d,_1e,_20,_21);
};
var _25=/^touch/;
function _10(_26,_27,_28,_29,_2a){
var _2b=_27.match(/(.*):(.*)/);
if(_2b){
_27=_2b[2];
_2b=_2b[1];
return on.selector(_2b,_27).call(_2a,_26,_28);
}
if(_3("touch")){
if(_25.test(_27)){
_28=_2c(_28);
}
if(!_3("event-orientationchange")&&(_27=="orientationchange")){
_27="resize";
_26=window;
_28=_2c(_28);
}
}
if(_2d){
_28=_2d(_28);
}
if(_26.addEventListener){
var _2e=_27 in _2f,_30=_2e?_2f[_27]:_27;
_26.addEventListener(_30,_28,_2e);
return {remove:function(){
_26.removeEventListener(_30,_28,_2e);
}};
}
_27="on"+_27;
if(_31&&_26.attachEvent){
return _31(_26,_27,_28);
}
throw new Error("Target must be an event emitter");
};
on.selector=function(_32,_33,_34){
return function(_35,_36){
var _37=typeof _32=="function"?{matches:_32}:this,_38=_33.bubble;
function _39(_3a){
_37=_37&&_37.matches?_37:_2.query;
while(!_37.matches(_3a,_32,_35)){
if(_3a==_35||_34===false||!(_3a=_3a.parentNode)||_3a.nodeType!=1){
return;
}
}
return _3a;
};
if(_38){
return on(_35,_38(_39),_36);
}
return on(_35,_33,function(_3b){
var _3c=_39(_3b.target);
return _3c&&_36.call(_3c,_3b);
});
};
};
function _3d(){
this.cancelable=false;
this.defaultPrevented=true;
};
function _3e(){
this.bubbles=false;
};
var _3f=[].slice,_40=on.emit=function(_41,_42,_43){
var _44=_3f.call(arguments,2);
var _45="on"+_42;
if("parentNode" in _41){
var _46=_44[0]={};
for(var i in _43){
_46[i]=_43[i];
}
_46.preventDefault=_3d;
_46.stopPropagation=_3e;
_46.target=_41;
_46.type=_42;
_43=_46;
}
do{
_41[_45]&&_41[_45].apply(_41,_44);
}while(_43&&_43.bubbles&&(_41=_41.parentNode));
return _43&&_43.cancelable&&_43;
};
var _2f=_3("event-focusin")?{}:{focusin:"focus",focusout:"blur"};
if(!_3("event-stopimmediatepropagation")){
var _47=function(){
this.immediatelyStopped=true;
this.modified=true;
};
var _2d=function(_48){
return function(_49){
if(!_49.immediatelyStopped){
_49.stopImmediatePropagation=_47;
return _48.apply(this,arguments);
}
};
};
}
if(_3("dom-addeventlistener")){
on.emit=function(_4a,_4b,_4c){
if(_4a.dispatchEvent&&document.createEvent){
var _4d=_4a.ownerDocument.createEvent("HTMLEvents");
_4d.initEvent(_4b,!!_4c.bubbles,!!_4c.cancelable);
for(var i in _4c){
if(!(i in _4d)){
_4d[i]=_4c[i];
}
}
return _4a.dispatchEvent(_4d)&&_4d;
}
return _40.apply(on,arguments);
};
}else{
on._fixEvent=function(evt,_4e){
if(!evt){
var w=_4e&&(_4e.ownerDocument||_4e.document||_4e).parentWindow||window;
evt=w.event;
}
if(!evt){
return evt;
}
try{
if(_4f&&evt.type==_4f.type&&evt.srcElement==_4f.target){
evt=_4f;
}
}
catch(e){
}
if(!evt.target){
evt.target=evt.srcElement;
evt.currentTarget=(_4e||evt.srcElement);
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
if(!evt.stopPropagation){
evt.stopPropagation=_50;
evt.preventDefault=_51;
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
_52(evt);
break;
}
}
return evt;
};
var _4f,_53=function(_54){
this.handle=_54;
};
_53.prototype.remove=function(){
delete _dojoIEListeners_[this.handle];
};
var _55=function(_56){
return function(evt){
evt=on._fixEvent(evt,this);
var _57=_56.call(this,evt);
if(evt.modified){
if(!_4f){
setTimeout(function(){
_4f=null;
});
}
_4f=evt;
}
return _57;
};
};
var _31=function(_58,_59,_5a){
_5a=_55(_5a);
if(((_58.ownerDocument?_58.ownerDocument.parentWindow:_58.parentWindow||_58.window||window)!=top||_3("jscript")<5.8)&&!_3("config-_allow_leaks")){
if(typeof _dojoIEListeners_=="undefined"){
_dojoIEListeners_=[];
}
var _5b=_58[_59];
if(!_5b||!_5b.listeners){
var _5c=_5b;
_5b=Function("event","var callee = arguments.callee; for(var i = 0; i<callee.listeners.length; i++){var listener = _dojoIEListeners_[callee.listeners[i]]; if(listener){listener.call(this,event);}}");
_5b.listeners=[];
_58[_59]=_5b;
_5b.global=this;
if(_5c){
_5b.listeners.push(_dojoIEListeners_.push(_5c)-1);
}
}
var _5d;
_5b.listeners.push(_5d=(_5b.global._dojoIEListeners_.push(_5a)-1));
return new _53(_5d);
}
return _1.after(_58,_59,_5a,true);
};
var _52=function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
};
var _50=function(){
this.cancelBubble=true;
};
var _51=on._preventDefault=function(){
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
var _5e=function(){
};
var _5f=window.orientation;
var _2c=function(_60){
return function(_61){
var _62=_61.corrected;
if(!_62){
var _63=_61.type;
try{
delete _61.type;
}
catch(e){
}
if(_61.type){
if(_3("mozilla")){
var _62={};
for(var _64 in _61){
_62[_64]=_61[_64];
}
}else{
_5e.prototype=_61;
var _62=new _5e;
}
_62.preventDefault=function(){
_61.preventDefault();
};
_62.stopPropagation=function(){
_61.stopPropagation();
};
}else{
_62=_61;
_62.type=_63;
}
_61.corrected=_62;
if(_63=="resize"){
if(_5f==window.orientation){
return null;
}
_5f=window.orientation;
_62.type="orientationchange";
return _60.call(this,_62);
}
if(!("rotation" in _62)){
_62.rotation=0;
_62.scale=1;
}
var _65=_62.changedTouches[0];
for(var i in _65){
delete _62[i];
_62[i]=_65[i];
}
}
return _60.call(this,_62);
};
};
}
return on;
});
