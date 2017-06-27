/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.window"]){
dojo._hasResource["dojo.window"]=true;
dojo.provide("dojo.window");
dojo.getObject("window",true,dojo);
dojo.window.getBox=function(){
var _1=(dojo.doc.compatMode=="BackCompat")?dojo.body():dojo.doc.documentElement;
var _2=dojo._docScroll();
return {w:_1.clientWidth,h:_1.clientHeight,l:_2.x,t:_2.y};
};
dojo.window.get=function(_3){
if(dojo.isIE&&window!==document.parentWindow){
_3.parentWindow.execScript("document._parentWindow = window;","Javascript");
var _4=_3._parentWindow;
_3._parentWindow=null;
return _4;
}
return _3.parentWindow||_3.defaultView;
};
dojo.window.scrollIntoView=function(_5,_6){
_5=dojo.byId(_5);
var _7,_8=_5.ownerDocument||dojo.doc;
if(!("rtl_adjust_position_for_verticalScrollBar" in dojo.window)){
_7=dojo.body();
var _9=dojo.create("div",{style:{overflow:"scroll",overflowX:"visible",direction:"rtl",visibility:"hidden",position:"absolute",left:"0",top:"0",width:"64px",height:"64px"}},_7,"last"),_a=dojo.create("div",{style:{overflow:"hidden",direction:"ltr"}},_9,"last");
dojo.window.rtl_adjust_position_for_verticalScrollBar=dojo.position(_a).x!=0;
_9.removeChild(_a);
_7.removeChild(_9);
}
if(!("position_fixed_support" in dojo.window)){
_7=dojo.body();
var _b=dojo.create("span",{style:{visibility:"hidden",position:"fixed",left:"1px",top:"1px"}},_7,"last"),_c=dojo.create("span",{style:{position:"fixed",left:"0",top:"0"}},_b,"last");
dojo.window.position_fixed_support=dojo.position(_c).x!=dojo.position(_b).x;
_b.removeChild(_c);
_7.removeChild(_b);
}
try{
_7=_8.body||_8.getElementsByTagName("body")[0];
var _d=_8.documentElement||_7.parentNode,_e=dojo.isIE,_f=dojo.isWebKit;
if(_5==_7||_5==_d){
return;
}
if(!(dojo.isMozilla||_e||_f||dojo.isOpera)&&("scrollIntoView" in _5)){
_5.scrollIntoView(false);
return;
}
var _10=_8.compatMode=="BackCompat",_11=Math.min(_7.clientWidth||_d.clientWidth,_d.clientWidth||_7.clientWidth),_12=Math.min(_7.clientHeight||_d.clientHeight,_d.clientHeight||_7.clientHeight),_13=(_f||_10)?_7:_d,_14=_6||dojo.position(_5),el=_5.parentNode,_15=function(el){
return (_e<=6||(_e==7&&_10))?false:(dojo.window.position_fixed_support&&(dojo.style(el,"position").toLowerCase()=="fixed"));
};
if(_15(_5)){
return;
}
while(el){
if(el==_7){
el=_13;
}
var _16=dojo.position(el),_17=_15(el),rtl=dojo.getComputedStyle(el).direction.toLowerCase()=="rtl";
if(el==_13){
_16.w=_11;
_16.h=_12;
if(_13==_d&&_e&&rtl){
_16.x+=_13.offsetWidth-_16.w;
}
if(_16.x<0||!_e||_e>=9){
_16.x=0;
}
if(_16.y<0||!_e||_e>=9){
_16.y=0;
}
}else{
var pb=dojo._getPadBorderExtents(el);
_16.w-=pb.w;
_16.h-=pb.h;
_16.x+=pb.l;
_16.y+=pb.t;
var _18=el.clientWidth,_19=_16.w-_18;
if(_18>0&&_19>0){
if(rtl&&dojo.window.rtl_adjust_position_for_verticalScrollBar){
_16.x+=_19;
}
_16.w=_18;
}
_18=el.clientHeight;
_19=_16.h-_18;
if(_18>0&&_19>0){
_16.h=_18;
}
}
if(_17){
if(_16.y<0){
_16.h+=_16.y;
_16.y=0;
}
if(_16.x<0){
_16.w+=_16.x;
_16.x=0;
}
if(_16.y+_16.h>_12){
_16.h=_12-_16.y;
}
if(_16.x+_16.w>_11){
_16.w=_11-_16.x;
}
}
var l=_14.x-_16.x,t=_14.y-_16.y,r=l+_14.w-_16.w,bot=t+_14.h-_16.h;
var s,old;
if(r*l>0&&(!!el.scrollLeft||el==_13||el.scrollWidth>el.offsetHeight)){
s=Math[l<0?"max":"min"](l,r);
if(rtl&&((_e==8&&!_10)||_e>=9)){
s=-s;
}
old=el.scrollLeft;
el.scrollLeft+=s;
s=el.scrollLeft-old;
_14.x-=s;
}
if(bot*t>0&&(!!el.scrollTop||el==_13||el.scrollHeight>el.offsetHeight)){
s=Math.ceil(Math[t<0?"max":"min"](t,bot));
old=el.scrollTop;
el.scrollTop+=s;
s=el.scrollTop-old;
_14.y-=s;
}
el=(el!=_13)&&!_17&&el.parentNode;
}
}
catch(error){
console.error("scrollIntoView: "+error);
_5.scrollIntoView(false);
}
};
}
