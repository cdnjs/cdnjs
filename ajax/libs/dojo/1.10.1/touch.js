/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/touch",["./_base/kernel","./aspect","./dom","./dom-class","./_base/lang","./on","./has","./mouse","./domReady","./_base/window"],function(_1,_2,_3,_4,_5,on,_6,_7,_8,_9){
var _a=_6("ios")<5;
var _b=_6("pointer-events")||_6("MSPointer"),_c=(function(){
var _d={};
for(var _e in {down:1,move:1,up:1,cancel:1,over:1,out:1}){
_d[_e]=_6("MSPointer")?"MSPointer"+_e.charAt(0).toUpperCase()+_e.slice(1):"pointer"+_e;
}
return _d;
})();
var _f=_6("touch-events");
var _10,_11,_12=false,_13,_14,_15,_16,_17,_18;
var _19;
function _1a(_1b,_1c,_1d){
if(_b&&_1d){
return function(_1e,_1f){
return on(_1e,_1d,_1f);
};
}else{
if(_f){
return function(_20,_21){
var _22=on(_20,_1c,function(evt){
_21.call(this,evt);
_19=(new Date()).getTime();
}),_23=on(_20,_1b,function(evt){
if(!_19||(new Date()).getTime()>_19+1000){
_21.call(this,evt);
}
});
return {remove:function(){
_22.remove();
_23.remove();
}};
};
}else{
return function(_24,_25){
return on(_24,_1b,_25);
};
}
}
};
function _26(_27){
do{
if(_27.dojoClick!==undefined){
return _27;
}
}while(_27=_27.parentNode);
};
function _28(e,_29,_2a){
var _2b=_26(e.target);
_11=!e.target.disabled&&_2b&&_2b.dojoClick;
if(_11){
_12=(_11=="useTarget");
_13=(_12?_2b:e.target);
if(_12){
e.preventDefault();
}
_14=e.changedTouches?e.changedTouches[0].pageX-_9.global.pageXOffset:e.clientX;
_15=e.changedTouches?e.changedTouches[0].pageY-_9.global.pageYOffset:e.clientY;
_16=(typeof _11=="object"?_11.x:(typeof _11=="number"?_11:0))||4;
_17=(typeof _11=="object"?_11.y:(typeof _11=="number"?_11:0))||4;
if(!_10){
_10=true;
function _2c(e){
if(_12){
_11=_3.isDescendant(_9.doc.elementFromPoint((e.changedTouches?e.changedTouches[0].pageX-_9.global.pageXOffset:e.clientX),(e.changedTouches?e.changedTouches[0].pageY-_9.global.pageYOffset:e.clientY)),_13);
}else{
_11=_11&&(e.changedTouches?e.changedTouches[0].target:e.target)==_13&&Math.abs((e.changedTouches?e.changedTouches[0].pageX-_9.global.pageXOffset:e.clientX)-_14)<=_16&&Math.abs((e.changedTouches?e.changedTouches[0].pageY-_9.global.pageYOffset:e.clientY)-_15)<=_17;
}
};
_9.doc.addEventListener(_29,function(e){
_2c(e);
if(_12){
e.preventDefault();
}
},true);
_9.doc.addEventListener(_2a,function(e){
_2c(e);
if(_11){
_18=(new Date()).getTime();
var _2d=(_12?_13:e.target);
if(_2d.tagName==="LABEL"){
_2d=_3.byId(_2d.getAttribute("for"))||_2d;
}
var src=(e.changedTouches)?e.changedTouches[0]:e;
var _2e=document.createEvent("MouseEvents");
_2e._dojo_click=true;
_2e.initMouseEvent("click",true,true,e.view,e.detail,src.screenX,src.screenY,src.clientX,src.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);
setTimeout(function(){
on.emit(_2d,"click",_2e);
_18=(new Date()).getTime();
},0);
}
},true);
function _2f(_30){
_9.doc.addEventListener(_30,function(e){
if(!e._dojo_click&&(new Date()).getTime()<=_18+1000&&!(e.target.tagName=="INPUT"&&_4.contains(e.target,"dijitOffScreen"))){
e.stopPropagation();
e.stopImmediatePropagation&&e.stopImmediatePropagation();
if(_30=="click"&&(e.target.tagName!="INPUT"||e.target.type=="radio"||e.target.type=="checkbox")&&e.target.tagName!="TEXTAREA"&&e.target.tagName!="AUDIO"&&e.target.tagName!="VIDEO"){
e.preventDefault();
}
}
},true);
};
_2f("click");
_2f("mousedown");
_2f("mouseup");
}
}
};
var _31;
if(_b){
_8(function(){
_9.doc.addEventListener(_c.down,function(evt){
_28(evt,_c.move,_c.up);
},true);
});
}else{
if(_f){
_8(function(){
_31=_9.body();
_9.doc.addEventListener("touchstart",function(evt){
_19=(new Date()).getTime();
var _32=_31;
_31=evt.target;
on.emit(_32,"dojotouchout",{relatedTarget:_31,bubbles:true});
on.emit(_31,"dojotouchover",{relatedTarget:_32,bubbles:true});
_28(evt,"touchmove","touchend");
},true);
function _33(evt){
var _34=_5.delegate(evt,{bubbles:true});
if(_6("ios")>=6){
_34.touches=evt.touches;
_34.altKey=evt.altKey;
_34.changedTouches=evt.changedTouches;
_34.ctrlKey=evt.ctrlKey;
_34.metaKey=evt.metaKey;
_34.shiftKey=evt.shiftKey;
_34.targetTouches=evt.targetTouches;
}
return _34;
};
on(_9.doc,"touchmove",function(evt){
_19=(new Date()).getTime();
var _35=_9.doc.elementFromPoint(evt.pageX-(_a?0:_9.global.pageXOffset),evt.pageY-(_a?0:_9.global.pageYOffset));
if(_35){
if(_31!==_35){
on.emit(_31,"dojotouchout",{relatedTarget:_35,bubbles:true});
on.emit(_35,"dojotouchover",{relatedTarget:_31,bubbles:true});
_31=_35;
}
if(!on.emit(_35,"dojotouchmove",_33(evt))){
evt.preventDefault();
}
}
});
on(_9.doc,"touchend",function(evt){
_19=(new Date()).getTime();
var _36=_9.doc.elementFromPoint(evt.pageX-(_a?0:_9.global.pageXOffset),evt.pageY-(_a?0:_9.global.pageYOffset))||_9.body();
on.emit(_36,"dojotouchend",_33(evt));
});
});
}
}
var _37={press:_1a("mousedown","touchstart",_c.down),move:_1a("mousemove","dojotouchmove",_c.move),release:_1a("mouseup","dojotouchend",_c.up),cancel:_1a(_7.leave,"touchcancel",_b?_c.cancel:null),over:_1a("mouseover","dojotouchover",_c.over),out:_1a("mouseout","dojotouchout",_c.out),enter:_7._eventHandler(_1a("mouseover","dojotouchover",_c.over)),leave:_7._eventHandler(_1a("mouseout","dojotouchout",_c.out))};
1&&(_1.touch=_37);
return _37;
});
