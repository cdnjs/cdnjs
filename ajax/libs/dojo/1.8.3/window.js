/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/window",["./_base/lang","./sniff","./_base/window","./dom","./dom-geometry","./dom-style"],function(_1,_2,_3,_4,_5,_6){
var _7={getBox:function(_8){
_8=_8||_3.doc;
var _9=(_8.compatMode=="BackCompat")?_3.body(_8):_8.documentElement,_a=_5.docScroll(_8),w,h;
if(_2("touch")){
var _b=_7.get(_8);
w=_b.innerWidth||_9.clientWidth;
h=_b.innerHeight||_9.clientHeight;
}else{
w=_9.clientWidth;
h=_9.clientHeight;
}
return {l:_a.x,t:_a.y,w:w,h:h};
},get:function(_c){
if(_2("ie")&&_7!==document.parentWindow){
_c.parentWindow.execScript("document._parentWindow = window;","Javascript");
var _d=_c._parentWindow;
_c._parentWindow=null;
return _d;
}
return _c.parentWindow||_c.defaultView;
},scrollIntoView:function(_e,_f){
try{
_e=_4.byId(_e);
var doc=_e.ownerDocument||_3.doc,_10=_3.body(doc),_11=doc.documentElement||_10.parentNode,_12=_2("ie"),_13=_2("webkit");
if((!(_2("mozilla")||_12||_13||_2("opera"))||_e==_10||_e==_11)&&(typeof _e.scrollIntoView!="undefined")){
_e.scrollIntoView(false);
return;
}
var _14=doc.compatMode=="BackCompat",_15=(_12>=9&&"frameElement" in _e.ownerDocument.parentWindow)?((_11.clientHeight>0&&_11.clientWidth>0&&(_10.clientHeight==0||_10.clientWidth==0||_10.clientHeight>_11.clientHeight||_10.clientWidth>_11.clientWidth))?_11:_10):(_14?_10:_11),_16=_13?_10:_15,_17=_15.clientWidth,_18=_15.clientHeight,rtl=!_5.isBodyLtr(doc),_19=_f||_5.position(_e),el=_e.parentNode,_1a=function(el){
return ((_12<=6||(_12&&_14))?false:(_6.get(el,"position").toLowerCase()=="fixed"));
};
if(_1a(_e)){
return;
}
while(el){
if(el==_10){
el=_16;
}
var _1b=_5.position(el),_1c=_1a(el);
if(el==_16){
_1b.w=_17;
_1b.h=_18;
if(_16==_11&&_12&&rtl){
_1b.x+=_16.offsetWidth-_1b.w;
}
if(_1b.x<0||!_12){
_1b.x=0;
}
if(_1b.y<0||!_12){
_1b.y=0;
}
}else{
var pb=_5.getPadBorderExtents(el);
_1b.w-=pb.w;
_1b.h-=pb.h;
_1b.x+=pb.l;
_1b.y+=pb.t;
var _1d=el.clientWidth,_1e=_1b.w-_1d;
if(_1d>0&&_1e>0){
_1b.w=_1d;
_1b.x+=(rtl&&(_12||el.clientLeft>pb.l))?_1e:0;
}
_1d=el.clientHeight;
_1e=_1b.h-_1d;
if(_1d>0&&_1e>0){
_1b.h=_1d;
}
}
if(_1c){
if(_1b.y<0){
_1b.h+=_1b.y;
_1b.y=0;
}
if(_1b.x<0){
_1b.w+=_1b.x;
_1b.x=0;
}
if(_1b.y+_1b.h>_18){
_1b.h=_18-_1b.y;
}
if(_1b.x+_1b.w>_17){
_1b.w=_17-_1b.x;
}
}
var l=_19.x-_1b.x,t=_19.y-Math.max(_1b.y,0),r=l+_19.w-_1b.w,bot=t+_19.h-_1b.h;
if(r*l>0){
var s=Math[l<0?"max":"min"](l,r);
if(rtl&&((_12==8&&!_14)||_12>=9)){
s=-s;
}
_19.x+=el.scrollLeft;
el.scrollLeft+=s;
_19.x-=el.scrollLeft;
}
if(bot*t>0){
_19.y+=el.scrollTop;
el.scrollTop+=Math[t<0?"max":"min"](t,bot);
_19.y-=el.scrollTop;
}
el=(el!=_16)&&!_1c&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
_e.scrollIntoView(false);
}
}};
1&&_1.setObject("dojo.window",_7);
return _7;
});
