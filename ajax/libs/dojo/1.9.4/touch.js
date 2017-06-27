/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./aspect","./dom","./dom-class","./_base/lang","./on","./has","./mouse","./domReady","./_base/window"],function(_1,_2,_3,_4,_5,on,_6,_7,_8,_9){
var _a=_6("touch");
var _b=_6("ios")<5;
var _c=navigator.pointerEnabled||navigator.msPointerEnabled,_d=(function(){
var _e={};
for(var _f in {down:1,move:1,up:1,cancel:1,over:1,out:1}){
_e[_f]=!navigator.pointerEnabled?"MSPointer"+_f.charAt(0).toUpperCase()+_f.slice(1):"pointer"+_f;
}
return _e;
})();
var _10,_11,_12,_13,_14,_15,_16,_17;
var _18;
function _19(_1a,_1b,_1c){
if(_c&&_1c){
return function(_1d,_1e){
return on(_1d,_1c,_1e);
};
}else{
if(_a){
return function(_1f,_20){
var _21=on(_1f,_1b,function(evt){
_20.call(this,evt);
_18=(new Date()).getTime();
}),_22=on(_1f,_1a,function(evt){
if(!_18||(new Date()).getTime()>_18+1000){
_20.call(this,evt);
}
});
return {remove:function(){
_21.remove();
_22.remove();
}};
};
}else{
return function(_23,_24){
return on(_23,_1a,_24);
};
}
}
};
function _25(_26){
do{
if(_26.dojoClick!==undefined){
return _26.dojoClick;
}
}while(_26=_26.parentNode);
};
function _27(e,_28,_29){
_11=!e.target.disabled&&_25(e.target);
if(_11){
_12=e.target;
_13=e.changedTouches?e.changedTouches[0].pageX:e.clientX;
_14=e.changedTouches?e.changedTouches[0].pageY:e.clientY;
_15=(typeof _11=="object"?_11.x:(typeof _11=="number"?_11:0))||4;
_16=(typeof _11=="object"?_11.y:(typeof _11=="number"?_11:0))||4;
if(!_10){
_10=true;
_9.doc.addEventListener(_28,function(e){
_11=_11&&(e.changedTouches?e.changedTouches[0].target:e.target)==_12&&Math.abs((e.changedTouches?e.changedTouches[0].pageX:e.clientX)-_13)<=_15&&Math.abs((e.changedTouches?e.changedTouches[0].pageY:e.clientY)-_14)<=_16;
},true);
_9.doc.addEventListener(_29,function(e){
if(_11){
_17=(new Date()).getTime();
var _2a=e.target;
if(_2a.tagName==="LABEL"){
_2a=_3.byId(_2a.getAttribute("for"))||_2a;
}
var src=(e.changedTouches)?e.changedTouches[0]:e;
var _2b=document.createEvent("MouseEvents");
_2b._dojo_click=true;
_2b.initMouseEvent("click",true,true,e.view,e.detail,src.screenX,src.screenY,src.clientX,src.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);
setTimeout(function(){
on.emit(_2a,"click",_2b);
},0);
}
},true);
function _2c(_2d){
_9.doc.addEventListener(_2d,function(e){
if(!e._dojo_click&&(new Date()).getTime()<=_17+1000&&!(e.target.tagName=="INPUT"&&_4.contains(e.target,"dijitOffScreen"))){
e.stopPropagation();
e.stopImmediatePropagation&&e.stopImmediatePropagation();
if(_2d=="click"&&(e.target.tagName!="INPUT"||e.target.type=="radio"||e.target.type=="checkbox")&&e.target.tagName!="TEXTAREA"&&e.target.tagName!="AUDIO"&&e.target.tagName!="VIDEO"){
e.preventDefault();
}
}
},true);
};
_2c("click");
_2c("mousedown");
_2c("mouseup");
}
}
};
var _2e;
if(_a){
if(_c){
_8(function(){
_9.doc.addEventListener(_d.down,function(evt){
_27(evt,_d.move,_d.up);
},true);
});
}else{
_8(function(){
_2e=_9.body();
_9.doc.addEventListener("touchstart",function(evt){
_18=(new Date()).getTime();
var _2f=_2e;
_2e=evt.target;
on.emit(_2f,"dojotouchout",{relatedTarget:_2e,bubbles:true});
on.emit(_2e,"dojotouchover",{relatedTarget:_2f,bubbles:true});
_27(evt,"touchmove","touchend");
},true);
function _30(evt){
var _31=_5.delegate(evt,{bubbles:true});
if(_6("ios")>=6){
_31.touches=evt.touches;
_31.altKey=evt.altKey;
_31.changedTouches=evt.changedTouches;
_31.ctrlKey=evt.ctrlKey;
_31.metaKey=evt.metaKey;
_31.shiftKey=evt.shiftKey;
_31.targetTouches=evt.targetTouches;
}
return _31;
};
on(_9.doc,"touchmove",function(evt){
_18=(new Date()).getTime();
var _32=_9.doc.elementFromPoint(evt.pageX-(_b?0:_9.global.pageXOffset),evt.pageY-(_b?0:_9.global.pageYOffset));
if(_32){
if(_2e!==_32){
on.emit(_2e,"dojotouchout",{relatedTarget:_32,bubbles:true});
on.emit(_32,"dojotouchover",{relatedTarget:_2e,bubbles:true});
_2e=_32;
}
if(!on.emit(_32,"dojotouchmove",_30(evt))){
evt.preventDefault();
}
}
});
on(_9.doc,"touchend",function(evt){
_18=(new Date()).getTime();
var _33=_9.doc.elementFromPoint(evt.pageX-(_b?0:_9.global.pageXOffset),evt.pageY-(_b?0:_9.global.pageYOffset))||_9.body();
on.emit(_33,"dojotouchend",_30(evt));
});
});
}
}
var _34={press:_19("mousedown","touchstart",_d.down),move:_19("mousemove","dojotouchmove",_d.move),release:_19("mouseup","dojotouchend",_d.up),cancel:_19(_7.leave,"touchcancel",_a?_d.cancel:null),over:_19("mouseover","dojotouchover",_d.over),out:_19("mouseout","dojotouchout",_d.out),enter:_7._eventHandler(_19("mouseover","dojotouchover",_d.over)),leave:_7._eventHandler(_19("mouseout","dojotouchout",_d.out))};
1&&(_1.touch=_34);
return _34;
});
