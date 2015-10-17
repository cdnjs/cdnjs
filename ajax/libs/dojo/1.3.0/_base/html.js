/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.require("dojo._base.lang");
dojo.provide("dojo._base.html");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE||dojo.isOpera){
dojo.byId=function(id,_2){
if(dojo.isString(id)){
var _d=_2||dojo.doc;
var te=_d.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var _5=_d.all[id];
if(!_5||_5.nodeName){
_5=[_5];
}
var i=0;
while((te=_5[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
}else{
return id;
}
};
}else{
dojo.byId=function(id,_8){
return dojo.isString(id)?(_8||dojo.doc).getElementById(id):id;
};
}
(function(){
var d=dojo;
var _a=null;
d.addOnWindowUnload(function(){
_a=null;
});
dojo._destroyElement=dojo.destroy=function(_b){
_b=d.byId(_b);
try{
if(!_a||_a.ownerDocument!=_b.ownerDocument){
_a=_b.ownerDocument.createElement("div");
}
_a.appendChild(_b.parentNode?_b.parentNode.removeChild(_b):_b);
_a.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(_c,_d){
try{
_c=d.byId(_c);
_d=d.byId(_d);
while(_c){
if(_c===_d){
return true;
}
_c=_c.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(_e,_f){
_e=d.byId(_e);
if(d.isMozilla){
_e.style.MozUserSelect=_f?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
_e.style.KhtmlUserSelect=_f?"auto":"none";
}else{
if(d.isIE){
var v=(_e.unselectable=_f?"":"on");
d.query("*",_e).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _11=function(_12,ref){
var _14=ref.parentNode;
if(_14){
_14.insertBefore(_12,ref);
}
};
var _15=function(_16,ref){
var _18=ref.parentNode;
if(_18){
if(_18.lastChild==ref){
_18.appendChild(_16);
}else{
_18.insertBefore(_16,ref.nextSibling);
}
}
};
dojo.place=function(_19,_1a,_1b){
_1a=d.byId(_1a);
if(d.isString(_19)){
_19=_19.charAt(0)=="<"?d._toDom(_19,_1a.ownerDocument):d.byId(_19);
}
if(typeof _1b=="number"){
var cn=_1a.childNodes;
if(!cn.length||cn.length<=_1b){
_1a.appendChild(_19);
}else{
_11(_19,cn[_1b<0?0:_1b]);
}
}else{
switch(_1b){
case "before":
_11(_19,_1a);
break;
case "after":
_15(_19,_1a);
break;
case "replace":
_1a.parentNode.replaceChild(_19,_1a);
break;
case "only":
d.empty(_1a);
_1a.appendChild(_19);
break;
case "first":
if(_1a.firstChild){
_11(_19,_1a.firstChild);
break;
}
default:
_1a.appendChild(_19);
}
}
return _19;
};
dojo.boxModel="content-box";
if(d.isIE){
var _1d=document.compatMode;
d.boxModel=_1d=="BackCompat"||_1d=="QuirksMode"||d.isIE<6?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(_1f){
var s;
if(_1f instanceof HTMLElement){
var dv=_1f.ownerDocument.defaultView;
s=dv.getComputedStyle(_1f,null);
if(!s&&_1f.style){
_1f.style.display="";
s=dv.getComputedStyle(_1f,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(_22){
return _22.nodeType==1?_22.currentStyle:{};
};
}else{
gcs=function(_23){
return _23 instanceof HTMLElement?_23.ownerDocument.defaultView.getComputedStyle(_23,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_24,_25){
return parseFloat(_25)||0;
};
}else{
d._toPixelValue=function(_26,_27){
if(!_27){
return 0;
}
if(_27=="medium"){
return 4;
}
if(_27.slice&&_27.slice(-2)=="px"){
return parseFloat(_27);
}
with(_26){
var _28=style.left;
var _29=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_27;
_27=style.pixelLeft;
}
catch(e){
_27=0;
}
style.left=_28;
runtimeStyle.left=_29;
}
return _27;
};
}
var px=d._toPixelValue;
var _2b="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(_2b);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(_2f){
try{
return af(_2f).Opacity/100;
}
catch(e){
return 1;
}
}:function(_30){
return gcs(_30).opacity;
};
dojo._setOpacity=d.isIE?function(_31,_32){
var ov=_32*100;
_31.style.zoom=1;
af(_31,1).Enabled=!(_32==1);
if(!af(_31)){
_31.style.filter+=" progid:"+_2b+"(Opacity="+ov+")";
}else{
af(_31,1).Opacity=ov;
}
if(_31.nodeName.toLowerCase()=="tr"){
d.query("> td",_31).forEach(function(i){
d._setOpacity(i,_32);
});
}
return _32;
}:function(_35,_36){
return _35.style.opacity=_36;
};
var _37={left:true,top:true};
var _38=/margin|padding|width|height|max|min|offset/;
var _39=function(_3a,_3b,_3c){
_3b=_3b.toLowerCase();
if(d.isIE){
if(_3c=="auto"){
if(_3b=="height"){
return _3a.offsetHeight;
}
if(_3b=="width"){
return _3a.offsetWidth;
}
}
if(_3b=="fontweight"){
switch(_3c){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(_3b in _37)){
_37[_3b]=_38.test(_3b);
}
return _37[_3b]?px(_3a,_3c):_3c;
};
var _3d=d.isIE?"styleFloat":"cssFloat",_3e={"cssFloat":_3d,"styleFloat":_3d,"float":_3d};
dojo.style=function(_3f,_40,_41){
var n=d.byId(_3f),_43=arguments.length,op=(_40=="opacity");
_40=_3e[_40]||_40;
if(_43==3){
return op?d._setOpacity(n,_41):n.style[_40]=_41;
}
if(_43==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(_43==2&&!d.isString(_40)){
for(var x in _40){
d.style(_3f,x,_40[x]);
}
return s;
}
return (_43==1)?s:_39(n,_40,s[_40]||n.style[_40]);
};
dojo._getPadExtents=function(n,_48){
var s=_48||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_4d){
var ne="none",s=_4d||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_53){
var s=_53||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_58){
var s=_58||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(_5e,_5f){
var s=_5f||gcs(_5e),me=d._getMarginExtents(_5e,s);
var l=_5e.offsetLeft-me.l,t=_5e.offsetTop-me.t,p=_5e.parentNode;
if(d.isMoz){
var sl=parseFloat(s.left),st=parseFloat(s.top);
if(!isNaN(sl)&&!isNaN(st)){
l=sl,t=st;
}else{
if(p&&p.style){
var pcs=gcs(p);
if(pcs.overflow!="visible"){
var be=d._getBorderExtents(p,pcs);
l+=be.l,t+=be.t;
}
}
}
}else{
if(d.isOpera||(d.isIE>7&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:_5e.offsetWidth+me.w,h:_5e.offsetHeight+me.h};
};
dojo._getContentBox=function(_69,_6a){
var s=_6a||gcs(_69),pe=d._getPadExtents(_69,s),be=d._getBorderExtents(_69,s),w=_69.clientWidth,h;
if(!w){
w=_69.offsetWidth,h=_69.offsetHeight;
}else{
h=_69.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(_70,_71){
var s=_71||gcs(_70),pe=d._getPadExtents(_70,s),cb=d._getContentBox(_70,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(_75,l,t,w,h,u){
u=u||"px";
var s=_75.style;
if(!isNaN(l)){
s.left=l+u;
}
if(!isNaN(t)){
s.top=t+u;
}
if(w>=0){
s.width=w+u;
}
if(h>=0){
s.height=h+u;
}
};
dojo._isButtonTag=function(_7c){
return _7c.tagName=="BUTTON"||_7c.tagName=="INPUT"&&_7c.getAttribute("type").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(_7d){
var n=_7d.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(_7d);
};
dojo._setContentSize=function(_7f,_80,_81,_82){
if(d._usesBorderBox(_7f)){
var pb=d._getPadBorderExtents(_7f,_82);
if(_80>=0){
_80+=pb.w;
}
if(_81>=0){
_81+=pb.h;
}
}
d._setBox(_7f,NaN,NaN,_80,_81);
};
dojo._setMarginBox=function(_84,_85,_86,_87,_88,_89){
var s=_89||gcs(_84),bb=d._usesBorderBox(_84),pb=bb?_8d:d._getPadBorderExtents(_84,s);
if(d.isWebKit){
if(d._isButtonTag(_84)){
var ns=_84.style;
if(_87>=0&&!ns.width){
ns.width="4px";
}
if(_88>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(_84,s);
if(_87>=0){
_87=Math.max(_87-pb.w-mb.w,0);
}
if(_88>=0){
_88=Math.max(_88-pb.h-mb.h,0);
}
d._setBox(_84,_85,_86,_87,_88);
};
var _8d={l:0,t:0,w:0,h:0};
dojo.marginBox=function(_90,box){
var n=d.byId(_90),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(_95,box){
var n=d.byId(_95),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _9a=function(_9b,_9c){
if(!(_9b=(_9b||0).parentNode)){
return 0;
}
var val,_9e=0,_b=d.body();
while(_9b&&_9b.style){
if(gcs(_9b).position=="fixed"){
return 0;
}
val=_9b[_9c];
if(val){
_9e+=val-0;
if(_9b==_b){
break;
}
}
_9b=_9b.parentNode;
}
return _9e;
};
dojo._docScroll=function(){
var _b=d.body(),_w=d.global,de=d.doc.documentElement;
return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};
};
dojo._isBodyLtr=function(){
return ("_bodyLtr" in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<7){
return {x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};
}else{
if(d.isIE<8){
return {x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};
}else{
return {x:0,y:0};
}
}
};
dojo._fixIeBiDiScrollLeft=function(_a4){
var dd=d.doc;
if(d.isIE<8&&!d._isBodyLtr()){
var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;
return _a4+de.clientWidth-de.scrollWidth;
}
return _a4;
};
dojo._abs=function(_a7,_a8){
var db=d.body(),dh=d.body().parentNode,ret;
if(_a7["getBoundingClientRect"]){
var _ac=_a7.getBoundingClientRect();
ret={x:_ac.left,y:_ac.top};
if(d.isFF>=3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
if(d.isIE){
var _ae=d._getIeDocumentElementOffset();
ret.x-=_ae.x+(d.isQuirks?db.clientLeft:0);
ret.y-=_ae.y+(d.isQuirks?db.clientTop:0);
}
}else{
ret={x:0,y:0};
if(_a7["offsetParent"]){
ret.x-=_9a(_a7,"scrollLeft");
ret.y-=_9a(_a7,"scrollTop");
var _af=_a7;
do{
var n=_af.offsetLeft,t=_af.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_af);
if(_af!=_a7){
if(d.isFF){
ret.x+=2*px(_af,cs.borderLeftWidth);
ret.y+=2*px(_af,cs.borderTopWidth);
}else{
ret.x+=px(_af,cs.borderLeftWidth);
ret.y+=px(_af,cs.borderTopWidth);
}
}
if(d.isFF&&cs.position=="static"){
var _b2=_af.parentNode;
while(_b2!=_af.offsetParent){
var pcs=gcs(_b2);
if(pcs.position=="static"){
ret.x+=px(_af,pcs.borderLeftWidth);
ret.y+=px(_af,pcs.borderTopWidth);
}
_b2=_b2.parentNode;
}
}
_af=_af.offsetParent;
}while((_af!=dh)&&_af);
}else{
if(_a7.x&&_a7.y){
ret.x+=isNaN(_a7.x)?0:_a7.x;
ret.y+=isNaN(_a7.y)?0:_a7.y;
}
}
}
if(_a8){
var _b4=d._docScroll();
ret.x+=_b4.x;
ret.y+=_b4.y;
}
return ret;
};
dojo.coords=function(_b5,_b6){
var n=d.byId(_b5),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d._abs(n,_b6);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _bb=d.isIE<8;
var _bc=function(_bd){
switch(_bd.toLowerCase()){
case "tabindex":
return _bb?"tabIndex":"tabindex";
case "readonly":
return "readOnly";
case "class":
return "className";
case "for":
case "htmlfor":
return _bb?"htmlFor":"for";
default:
return _bd;
}
};
var _be={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"};
dojo.hasAttr=function(_bf,_c0){
_bf=d.byId(_bf);
var _c1=_bc(_c0);
_c1=_c1=="htmlFor"?"for":_c1;
var _c2=_bf.getAttributeNode&&_bf.getAttributeNode(_c1);
return _c2?_c2.specified:false;
};
var _c3={},_c4=0,_c5=dojo._scopeName+"attrid",_c6={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(_c7,_c8,_c9){
_c7=d.byId(_c7);
var _ca=arguments.length;
if(_ca==2&&!d.isString(_c8)){
for(var x in _c8){
d.attr(_c7,x,_c8[x]);
}
return;
}
_c8=_bc(_c8);
if(_ca==3){
if(d.isFunction(_c9)){
var _cc=d.attr(_c7,_c5);
if(!_cc){
_cc=_c4++;
d.attr(_c7,_c5,_cc);
}
if(!_c3[_cc]){
_c3[_cc]={};
}
var h=_c3[_cc][_c8];
if(h){
d.disconnect(h);
}else{
try{
delete _c7[_c8];
}
catch(e){
}
}
_c3[_cc][_c8]=d.connect(_c7,_c8,_c9);
}else{
if(typeof _c9=="boolean"){
_c7[_c8]=_c9;
}else{
if(_c8==="style"&&!d.isString(_c9)){
d.style(_c7,_c9);
}else{
if(_c8=="className"){
_c7.className=_c9;
}else{
if(_c8==="innerHTML"){
if(d.isIE&&_c7.tagName.toLowerCase() in _c6){
d.empty(_c7);
_c7.appendChild(d._toDom(_c9,_c7.ownerDocument));
}else{
_c7[_c8]=_c9;
}
}else{
_c7.setAttribute(_c8,_c9);
}
}
}
}
}
}else{
var _ce=_be[_c8.toLowerCase()];
if(_ce){
return _c7[_ce];
}
var _cf=_c7[_c8];
return (typeof _cf=="boolean"||typeof _cf=="function")?_cf:(d.hasAttr(_c7,_c8)?_c7.getAttribute(_c8):null);
}
};
dojo.removeAttr=function(_d0,_d1){
d.byId(_d0).removeAttribute(_bc(_d1));
};
dojo.create=function(tag,_d3,_d4,pos){
var doc=d.doc;
if(_d4){
_d4=d.byId(_d4);
doc=_d4.ownerDocument;
}
if(d.isString(tag)){
tag=doc.createElement(tag);
}
if(_d3){
d.attr(tag,_d3);
}
if(_d4){
d.place(tag,_d4,pos);
}
return tag;
};
d.empty=d.isIE?function(_d7){
_d7=d.byId(_d7);
for(var c;c=_d7.lastChild;){
d.destroy(c);
}
}:function(_d9){
d.byId(_d9).innerHTML="";
};
var _da={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_db=/<\s*([\w\:]+)/,_dc={},_dd=0,_de="__"+d._scopeName+"ToDomId";
for(var _df in _da){
var tw=_da[_df];
tw.pre=_df=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(_e1,doc){
doc=doc||d.doc;
var _e3=doc[_de];
if(!_e3){
doc[_de]=_e3=++_dd+"";
_dc[_e3]=doc.createElement("div");
}
_e1+="";
var _e4=_e1.match(_db),tag=_e4?_e4[1].toLowerCase():"",_e6=_dc[_e3],_e7,i,fc,df;
if(_e4&&_da[tag]){
_e7=_da[tag];
_e6.innerHTML=_e7.pre+_e1+_e7.post;
for(i=_e7.length;i;--i){
_e6=_e6.firstChild;
}
}else{
_e6.innerHTML=_e1;
}
if(_e6.childNodes.length==1){
return _e6.removeChild(_e6.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_e6.firstChild){
df.appendChild(fc);
}
return df;
};
var _eb="className";
dojo.hasClass=function(_ec,_ed){
return ((" "+d.byId(_ec)[_eb]+" ").indexOf(" "+_ed+" ")>=0);
};
dojo.addClass=function(_ee,_ef){
_ee=d.byId(_ee);
var cls=_ee[_eb];
if((" "+cls+" ").indexOf(" "+_ef+" ")<0){
_ee[_eb]=cls+(cls?" ":"")+_ef;
}
};
dojo.removeClass=function(_f1,_f2){
_f1=d.byId(_f1);
var t=d.trim((" "+_f1[_eb]+" ").replace(" "+_f2+" "," "));
if(_f1[_eb]!=t){
_f1[_eb]=t;
}
};
dojo.toggleClass=function(_f4,_f5,_f6){
if(_f6===undefined){
_f6=!d.hasClass(_f4,_f5);
}
d[_f6?"addClass":"removeClass"](_f4,_f5);
};
})();
}
