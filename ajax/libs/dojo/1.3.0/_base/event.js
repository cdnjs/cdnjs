/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.event"]){
dojo._hasResource["dojo._base.event"]=true;
dojo.provide("dojo._base.event");
dojo.require("dojo._base.connect");
(function(){
var _1=(dojo._event_listener={add:function(_2,_3,fp){
if(!_2){
return;
}
_3=_1._normalizeEventName(_3);
fp=_1._fixCallback(_3,fp);
var _5=_3;
if(!dojo.isIE&&(_3=="mouseenter"||_3=="mouseleave")){
var _6=fp;
_3=(_3=="mouseenter")?"mouseover":"mouseout";
fp=function(e){
if(dojo.isFF<=2){
try{
e.relatedTarget.tagName;
}
catch(e2){
return;
}
}
if(!dojo.isDescendant(e.relatedTarget,_2)){
return _6.call(this,e);
}
};
}
_2.addEventListener(_3,fp,false);
return fp;
},remove:function(_8,_9,_a){
if(_8){
_9=_1._normalizeEventName(_9);
if(!dojo.isIE&&(_9=="mouseenter"||_9=="mouseleave")){
_9=(_9=="mouseenter")?"mouseover":"mouseout";
}
_8.removeEventListener(_9,_a,false);
}
},_normalizeEventName:function(_b){
return _b.slice(0,2)=="on"?_b.slice(2):_b;
},_fixCallback:function(_c,fp){
return _c!="keypress"?fp:function(e){
return fp.call(this,_1._fixEvent(e,this));
};
},_fixEvent:function(_f,_10){
switch(_f.type){
case "keypress":
_1._setKeyChar(_f);
break;
}
return _f;
},_setKeyChar:function(evt){
evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";
evt.charOrCode=evt.keyChar||evt.keyCode;
},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});
dojo.fixEvent=function(evt,_13){
return _1._fixEvent(evt,_13);
};
dojo.stopEvent=function(evt){
evt.preventDefault();
evt.stopPropagation();
};
var _15=dojo._listener;
dojo._connect=function(obj,_17,_18,_19,_1a){
var _1b=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);
var lid=_1b?(_1a?2:1):0,l=[dojo._listener,_1,_15][lid];
var h=l.add(obj,_17,dojo.hitch(_18,_19));
return [obj,_17,h,lid];
};
dojo._disconnect=function(obj,_20,_21,_22){
([dojo._listener,_1,_15][_22]).remove(obj,_20,_21);
};
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};
if(dojo.isIE){
var _23=function(e,_25){
try{
return (e.keyCode=_25);
}
catch(e){
return 0;
}
};
var iel=dojo._listener;
var _27=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");
if(!dojo.config._allow_leaks){
_15=iel=dojo._ie_listener={handlers:[],add:function(_28,_29,_2a){
_28=_28||dojo.global;
var f=_28[_29];
if(!f||!f[_27]){
var d=dojo._getIeDispatcher();
d.target=f&&(ieh.push(f)-1);
d[_27]=[];
f=_28[_29]=d;
}
return f[_27].push(ieh.push(_2a)-1);
},remove:function(_2e,_2f,_30){
var f=(_2e||dojo.global)[_2f],l=f&&f[_27];
if(f&&l&&_30--){
delete ieh[l[_30]];
delete l[_30];
}
}};
var ieh=iel.handlers;
}
dojo.mixin(_1,{add:function(_33,_34,fp){
if(!_33){
return;
}
_34=_1._normalizeEventName(_34);
if(_34=="onkeypress"){
var kd=_33.onkeydown;
if(!kd||!kd[_27]||!kd._stealthKeydownHandle){
var h=_1.add(_33,"onkeydown",_1._stealthKeyDown);
kd=_33.onkeydown;
kd._stealthKeydownHandle=h;
kd._stealthKeydownRefs=1;
}else{
kd._stealthKeydownRefs++;
}
}
return iel.add(_33,_34,_1._fixCallback(fp));
},remove:function(_38,_39,_3a){
_39=_1._normalizeEventName(_39);
iel.remove(_38,_39,_3a);
if(_39=="onkeypress"){
var kd=_38.onkeydown;
if(--kd._stealthKeydownRefs<=0){
iel.remove(_38,"onkeydown",kd._stealthKeydownHandle);
delete kd._stealthKeydownHandle;
}
}
},_normalizeEventName:function(_3c){
return _3c.slice(0,2)!="on"?"on"+_3c:_3c;
},_nop:function(){
},_fixEvent:function(evt,_3e){
if(!evt){
var w=_3e&&(_3e.ownerDocument||_3e.document||_3e).parentWindow||window;
evt=w.event;
}
if(!evt){
return (evt);
}
evt.target=evt.srcElement;
evt.currentTarget=(_3e||evt.srcElement);
evt.layerX=evt.offsetX;
evt.layerY=evt.offsetY;
var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;
var _42=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
var _43=dojo._getIeDocumentElementOffset();
evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_42.scrollLeft||0)-_43.x;
evt.pageY=evt.clientY+(_42.scrollTop||0)-_43.y;
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
evt.stopPropagation=_1._stopPropagation;
evt.preventDefault=_1._preventDefault;
return _1._fixKeys(evt);
},_fixKeys:function(evt){
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
_1._setKeyChar(evt);
break;
}
return evt;
},_stealthKeyDown:function(evt){
var kp=evt.currentTarget.onkeypress;
if(!kp||!kp[_27]){
return;
}
var k=evt.keyCode;
var _49=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_49||evt.ctrlKey){
var c=_49?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if((!evt.shiftKey)&&(c>=65&&c<=90)){
c+=32;
}else{
c=_1._punctMap[c]||c;
}
}
}
}
var _4b=_1._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
kp.call(evt.currentTarget,_4b);
evt.cancelBubble=_4b.cancelBubble;
evt.returnValue=_4b.returnValue;
_23(evt,_4b.keyCode);
}
},_stopPropagation:function(){
this.cancelBubble=true;
},_preventDefault:function(){
this.bubbledKeyCode=this.keyCode;
if(this.ctrlKey){
_23(this,0);
}
this.returnValue=false;
}});
dojo.stopEvent=function(evt){
evt=evt||window.event;
_1._stopPropagation.call(evt);
_1._preventDefault.call(evt);
};
}
_1._synthesizeEvent=function(evt,_4e){
var _4f=dojo.mixin({},evt,_4e);
_1._setKeyChar(_4f);
_4f.preventDefault=function(){
evt.preventDefault();
};
_4f.stopPropagation=function(){
evt.stopPropagation();
};
return _4f;
};
if(dojo.isOpera){
dojo.mixin(_1,{_fixEvent:function(evt,_51){
switch(evt.type){
case "keypress":
var c=evt.which;
if(c==3){
c=99;
}
c=c<41&&!evt.shiftKey?0:c;
if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}
return _1._synthesizeEvent(evt,{charCode:c});
}
return evt;
}});
}
if(dojo.isWebKit){
_1._add=_1.add;
_1._remove=_1.remove;
dojo.mixin(_1,{add:function(_53,_54,fp){
if(!_53){
return;
}
var _56=_1._add(_53,_54,fp);
if(_1._normalizeEventName(_54)=="keypress"){
_56._stealthKeyDownHandle=_1._add(_53,"keydown",function(evt){
var k=evt.keyCode;
var _59=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);
if(_59||evt.ctrlKey){
var c=_59?0:k;
if(evt.ctrlKey){
if(k==3||k==13){
return;
}else{
if(c>95&&c<106){
c-=48;
}else{
if(!evt.shiftKey&&c>=65&&c<=90){
c+=32;
}else{
c=_1._punctMap[c]||c;
}
}
}
}
var _5b=_1._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});
fp.call(evt.currentTarget,_5b);
}
});
}
return _56;
},remove:function(_5c,_5d,_5e){
if(_5c){
if(_5e._stealthKeyDownHandle){
_1._remove(_5c,"keydown",_5e._stealthKeyDownHandle);
}
_1._remove(_5c,_5d,_5e);
}
},_fixEvent:function(evt,_60){
switch(evt.type){
case "keypress":
if(evt.faux){
return evt;
}
var c=evt.charCode;
c=c>=32?c:0;
return _1._synthesizeEvent(evt,{charCode:c,faux:true});
}
return evt;
}});
}
})();
if(dojo.isIE){
dojo._ieDispatcher=function(_62,_63){
var ap=Array.prototype,h=dojo._ie_listener.handlers,c=_62.callee,ls=c[dojo._ieListenersName],t=h[c.target];
var r=t&&t.apply(_63,_62);
var lls=[].concat(ls);
for(var i in lls){
if(!(i in ap)){
h[lls[i]].apply(_63,_62);
}
}
return r;
};
dojo._getIeDispatcher=function(){
return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");
};
dojo._event_listener._fixCallback=function(fp){
var f=dojo._event_listener._fixEvent;
return function(e){
return fp.call(this,f(e,this));
};
};
}
}
