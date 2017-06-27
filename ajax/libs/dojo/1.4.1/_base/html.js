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
dojo.byId=function(id,_1){
if(typeof id!="string"){
return id;
}
var _2=_1||dojo.doc,te=_2.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var _3=_2.all[id];
if(!_3||_3.nodeName){
_3=[_3];
}
var i=0;
while((te=_3[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
dojo.byId=function(id,_4){
return (typeof id=="string")?(_4||dojo.doc).getElementById(id):id;
};
}
(function(){
var d=dojo;
var _5=d.byId;
var _6=null,_7;
d.addOnWindowUnload(function(){
_6=null;
});
dojo._destroyElement=dojo.destroy=function(_8){
_8=_5(_8);
try{
var _9=_8.ownerDocument;
if(!_6||_7!=_9){
_6=_9.createElement("div");
_7=_9;
}
_6.appendChild(_8.parentNode?_8.parentNode.removeChild(_8):_8);
_6.innerHTML="";
}
catch(e){
}
};
dojo.isDescendant=function(_a,_b){
try{
_a=_5(_a);
_b=_5(_b);
while(_a){
if(_a==_b){
return true;
}
_a=_a.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(_c,_d){
_c=_5(_c);
if(d.isMozilla){
_c.style.MozUserSelect=_d?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
_c.style.KhtmlUserSelect=_d?"auto":"none";
}else{
if(d.isIE){
var v=(_c.unselectable=_d?"":"on");
d.query("*",_c).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _e=function(_f,ref){
var _10=ref.parentNode;
if(_10){
_10.insertBefore(_f,ref);
}
};
var _11=function(_12,ref){
var _13=ref.parentNode;
if(_13){
if(_13.lastChild==ref){
_13.appendChild(_12);
}else{
_13.insertBefore(_12,ref.nextSibling);
}
}
};
dojo.place=function(_14,_15,_16){
_15=_5(_15);
if(typeof _14=="string"){
_14=_14.charAt(0)=="<"?d._toDom(_14,_15.ownerDocument):_5(_14);
}
if(typeof _16=="number"){
var cn=_15.childNodes;
if(!cn.length||cn.length<=_16){
_15.appendChild(_14);
}else{
_e(_14,cn[_16<0?0:_16]);
}
}else{
switch(_16){
case "before":
_e(_14,_15);
break;
case "after":
_11(_14,_15);
break;
case "replace":
_15.parentNode.replaceChild(_14,_15);
break;
case "only":
d.empty(_15);
_15.appendChild(_14);
break;
case "first":
if(_15.firstChild){
_e(_14,_15.firstChild);
break;
}
default:
_15.appendChild(_14);
}
}
return _14;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(_17){
var s;
if(_17.nodeType==1){
var dv=_17.ownerDocument.defaultView;
s=dv.getComputedStyle(_17,null);
if(!s&&_17.style){
_17.style.display="";
s=dv.getComputedStyle(_17,null);
}
}
return s||{};
};
}else{
if(d.isIE){
gcs=function(_18){
return _18.nodeType==1?_18.currentStyle:{};
};
}else{
gcs=function(_19){
return _19.nodeType==1?_19.ownerDocument.defaultView.getComputedStyle(_19,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_1a,_1b){
return parseFloat(_1b)||0;
};
}else{
d._toPixelValue=function(_1c,_1d){
if(!_1d){
return 0;
}
if(_1d=="medium"){
return 4;
}
if(_1d.slice&&_1d.slice(-2)=="px"){
return parseFloat(_1d);
}
with(_1c){
var _1e=style.left;
var _1f=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_1d;
_1d=style.pixelLeft;
}
catch(e){
_1d=0;
}
style.left=_1e;
runtimeStyle.left=_1f;
}
return _1d;
};
}
var px=d._toPixelValue;
var _20="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(_20);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE?function(_21){
try{
return af(_21).Opacity/100;
}
catch(e){
return 1;
}
}:function(_22){
return gcs(_22).opacity;
};
dojo._setOpacity=d.isIE?function(_23,_24){
var ov=_24*100;
_23.style.zoom=1;
af(_23,1).Enabled=!(_24==1);
if(!af(_23)){
_23.style.filter+=" progid:"+_20+"(Opacity="+ov+")";
}else{
af(_23,1).Opacity=ov;
}
if(_23.nodeName.toLowerCase()=="tr"){
d.query("> td",_23).forEach(function(i){
d._setOpacity(i,_24);
});
}
return _24;
}:function(_25,_26){
return _25.style.opacity=_26;
};
var _27={left:true,top:true};
var _28=/margin|padding|width|height|max|min|offset/;
var _29=function(_2a,_2b,_2c){
_2b=_2b.toLowerCase();
if(d.isIE){
if(_2c=="auto"){
if(_2b=="height"){
return _2a.offsetHeight;
}
if(_2b=="width"){
return _2a.offsetWidth;
}
}
if(_2b=="fontweight"){
switch(_2c){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(_2b in _27)){
_27[_2b]=_28.test(_2b);
}
return _27[_2b]?px(_2a,_2c):_2c;
};
var _2d=d.isIE?"styleFloat":"cssFloat",_2e={"cssFloat":_2d,"styleFloat":_2d,"float":_2d};
dojo.style=function(_2f,_30,_31){
var n=_5(_2f),_32=arguments.length,op=(_30=="opacity");
_30=_2e[_30]||_30;
if(_32==3){
return op?d._setOpacity(n,_31):n.style[_30]=_31;
}
if(_32==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(_32==2&&typeof _30!="string"){
for(var x in _30){
d.style(_2f,x,_30[x]);
}
return s;
}
return (_32==1)?s:_29(n,_30,s[_30]||n.style[_30]);
};
dojo._getPadExtents=function(n,_33){
var s=_33||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_34){
var ne="none",s=_34||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_35){
var s=_35||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_36){
var s=_36||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(_37,_38){
var s=_38||gcs(_37),me=d._getMarginExtents(_37,s);
var l=_37.offsetLeft-me.l,t=_37.offsetTop-me.t,p=_37.parentNode;
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
return {l:l,t:t,w:_37.offsetWidth+me.w,h:_37.offsetHeight+me.h};
};
dojo._getContentBox=function(_39,_3a){
var s=_3a||gcs(_39),pe=d._getPadExtents(_39,s),be=d._getBorderExtents(_39,s),w=_39.clientWidth,h;
if(!w){
w=_39.offsetWidth,h=_39.offsetHeight;
}else{
h=_39.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(_3b,_3c){
var s=_3c||gcs(_3b),pe=d._getPadExtents(_3b,s),cb=d._getContentBox(_3b,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(_3d,l,t,w,h,u){
u=u||"px";
var s=_3d.style;
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
dojo._isButtonTag=function(_3e){
return _3e.tagName=="BUTTON"||_3e.tagName=="INPUT"&&(_3e.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(_3f){
var n=_3f.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(_3f);
};
dojo._setContentSize=function(_40,_41,_42,_43){
if(d._usesBorderBox(_40)){
var pb=d._getPadBorderExtents(_40,_43);
if(_41>=0){
_41+=pb.w;
}
if(_42>=0){
_42+=pb.h;
}
}
d._setBox(_40,NaN,NaN,_41,_42);
};
dojo._setMarginBox=function(_44,_45,_46,_47,_48,_49){
var s=_49||gcs(_44),bb=d._usesBorderBox(_44),pb=bb?_4a:d._getPadBorderExtents(_44,s);
if(d.isWebKit){
if(d._isButtonTag(_44)){
var ns=_44.style;
if(_47>=0&&!ns.width){
ns.width="4px";
}
if(_48>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(_44,s);
if(_47>=0){
_47=Math.max(_47-pb.w-mb.w,0);
}
if(_48>=0){
_48=Math.max(_48-pb.h-mb.h,0);
}
d._setBox(_44,_45,_46,_47,_48);
};
var _4a={l:0,t:0,w:0,h:0};
dojo.marginBox=function(_4b,box){
var n=_5(_4b),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(_4c,box){
var n=_5(_4c),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _4d=function(_4e,_4f){
if(!(_4e=(_4e||0).parentNode)){
return 0;
}
var val,_50=0,_51=d.body();
while(_4e&&_4e.style){
if(gcs(_4e).position=="fixed"){
return 0;
}
val=_4e[_4f];
if(val){
_50+=val-0;
if(_4e==_51){
break;
}
}
_4e=_4e.parentNode;
}
return _50;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:d._fixIeBiDiScrollLeft(n.scrollLeft),y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));
};
dojo._isBodyLtr=function(){
return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";
};
dojo._getIeDocumentElementOffset=function(){
var de=d.doc.documentElement;
if(d.isIE<8){
var r=de.getBoundingClientRect();
var l=r.left,t=r.top;
if(d.isIE<7){
l+=de.clientLeft;
t+=de.clientTop;
}
return {x:l<0?0:l,y:t<0?0:t};
}else{
return {x:0,y:0};
}
};
dojo._fixIeBiDiScrollLeft=function(_52){
var dd=d.doc;
if(d.isIE<8&&!d._isBodyLtr()){
var de=d.isQuirks?dd.body:dd.documentElement;
return _52+de.clientWidth-de.scrollWidth;
}
return _52;
};
dojo._abs=dojo.position=function(_53,_54){
var db=d.body(),dh=db.parentNode,ret;
_53=_5(_53);
if(_53["getBoundingClientRect"]){
ret=_53.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _55=d._getIeDocumentElementOffset();
ret.x-=_55.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_55.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
}else{
ret={x:0,y:0,w:_53.offsetWidth,h:_53.offsetHeight};
if(_53["offsetParent"]){
ret.x-=_4d(_53,"scrollLeft");
ret.y-=_4d(_53,"scrollTop");
var _56=_53;
do{
var n=_56.offsetLeft,t=_56.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_56);
if(_56!=_53){
if(d.isMoz){
ret.x+=2*px(_56,cs.borderLeftWidth);
ret.y+=2*px(_56,cs.borderTopWidth);
}else{
ret.x+=px(_56,cs.borderLeftWidth);
ret.y+=px(_56,cs.borderTopWidth);
}
}
if(d.isMoz&&cs.position=="static"){
var _57=_56.parentNode;
while(_57!=_56.offsetParent){
var pcs=gcs(_57);
if(pcs.position=="static"){
ret.x+=px(_56,pcs.borderLeftWidth);
ret.y+=px(_56,pcs.borderTopWidth);
}
_57=_57.parentNode;
}
}
_56=_56.offsetParent;
}while((_56!=dh)&&_56);
}else{
if(_53.x&&_53.y){
ret.x+=isNaN(_53.x)?0:_53.x;
ret.y+=isNaN(_53.y)?0:_53.y;
}
}
}
if(_54){
var _58=d._docScroll();
ret.x+=_58.x;
ret.y+=_58.y;
}
return ret;
};
dojo.coords=function(_59,_5a){
var n=_5(_59),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_5a);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _5b={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_5c={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_5d={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _5e=function(_5f){
return _5c[_5f.toLowerCase()]||_5f;
};
var _60=function(_61,_62){
var _63=_61.getAttributeNode&&_61.getAttributeNode(_62);
return _63&&_63.specified;
};
dojo.hasAttr=function(_64,_65){
var lc=_65.toLowerCase();
return _5d[_5b[lc]||_65]||_60(_5(_64),_5c[lc]||_65);
};
var _66={},_67=0,_68=dojo._scopeName+"attrid",_69={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(_6a,_6b,_6c){
_6a=_5(_6a);
var _6d=arguments.length,_6e;
if(_6d==2&&typeof _6b!="string"){
for(var x in _6b){
d.attr(_6a,x,_6b[x]);
}
return _6a;
}
var lc=_6b.toLowerCase(),_6f=_5b[lc]||_6b,_70=_5d[_6f],_71=_5c[lc]||_6b;
if(_6d==3){
do{
if(_6f=="style"&&typeof _6c!="string"){
d.style(_6a,_6c);
break;
}
if(_6f=="innerHTML"){
if(d.isIE&&_6a.tagName.toLowerCase() in _69){
d.empty(_6a);
_6a.appendChild(d._toDom(_6c,_6a.ownerDocument));
}else{
_6a[_6f]=_6c;
}
break;
}
if(d.isFunction(_6c)){
var _72=d.attr(_6a,_68);
if(!_72){
_72=_67++;
d.attr(_6a,_68,_72);
}
if(!_66[_72]){
_66[_72]={};
}
var h=_66[_72][_6f];
if(h){
d.disconnect(h);
}else{
try{
delete _6a[_6f];
}
catch(e){
}
}
_66[_72][_6f]=d.connect(_6a,_6f,_6c);
break;
}
if(_70||typeof _6c=="boolean"){
_6a[_6f]=_6c;
break;
}
_6a.setAttribute(_71,_6c);
}while(false);
return _6a;
}
_6c=_6a[_6f];
if(_70&&typeof _6c!="undefined"){
return _6c;
}
if(_6f!="href"&&(typeof _6c=="boolean"||d.isFunction(_6c))){
return _6c;
}
return _60(_6a,_71)?_6a.getAttribute(_71):null;
};
dojo.removeAttr=function(_73,_74){
_5(_73).removeAttribute(_5e(_74));
};
dojo.getNodeProp=function(_75,_76){
_75=_5(_75);
var lc=_76.toLowerCase(),_77=_5b[lc]||_76;
if((_77 in _75)&&_77!="href"){
return _75[_77];
}
var _78=_5c[lc]||_76;
return _60(_75,_78)?_75.getAttribute(_78):null;
};
dojo.create=function(tag,_79,_7a,pos){
var doc=d.doc;
if(_7a){
_7a=_5(_7a);
doc=_7a.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_79){
d.attr(tag,_79);
}
if(_7a){
d.place(tag,_7a,pos);
}
return tag;
};
d.empty=d.isIE?function(_7b){
_7b=_5(_7b);
for(var c;c=_7b.lastChild;){
d.destroy(c);
}
}:function(_7c){
_5(_7c).innerHTML="";
};
var _7d={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_7e=/<\s*([\w\:]+)/,_7f={},_80=0,_81="__"+d._scopeName+"ToDomId";
for(var _82 in _7d){
var tw=_7d[_82];
tw.pre=_82=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(_83,doc){
doc=doc||d.doc;
var _84=doc[_81];
if(!_84){
doc[_81]=_84=++_80+"";
_7f[_84]=doc.createElement("div");
}
_83+="";
var _85=_83.match(_7e),tag=_85?_85[1].toLowerCase():"",_86=_7f[_84],_87,i,fc,df;
if(_85&&_7d[tag]){
_87=_7d[tag];
_86.innerHTML=_87.pre+_83+_87.post;
for(i=_87.length;i;--i){
_86=_86.firstChild;
}
}else{
_86.innerHTML=_83;
}
if(_86.childNodes.length==1){
return _86.removeChild(_86.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_86.firstChild){
df.appendChild(fc);
}
return df;
};
var _88="className";
dojo.hasClass=function(_89,_8a){
return ((" "+_5(_89)[_88]+" ").indexOf(" "+_8a+" ")>=0);
};
var _8b=/\s+/,a1=[""],_8c=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_8b);
}
}
return s;
};
dojo.addClass=function(_8d,_8e){
_8d=_5(_8d);
_8e=_8c(_8e);
var cls=" "+_8d[_88]+" ";
for(var i=0,len=_8e.length,c;i<len;++i){
c=_8e[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
_8d[_88]=d.trim(cls);
};
dojo.removeClass=function(_8f,_90){
_8f=_5(_8f);
var cls;
if(_90!==undefined){
_90=_8c(_90);
cls=" "+_8f[_88]+" ";
for(var i=0,len=_90.length;i<len;++i){
cls=cls.replace(" "+_90[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(_8f[_88]!=cls){
_8f[_88]=cls;
}
};
dojo.toggleClass=function(_91,_92,_93){
if(_93===undefined){
_93=!d.hasClass(_91,_92);
}
d[_93?"addClass":"removeClass"](_91,_92);
};
})();
}
