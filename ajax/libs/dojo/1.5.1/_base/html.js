/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
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
var ov=_24*100,_25=_24==1;
_23.style.zoom=_25?"":1;
if(!af(_23)){
if(_25){
return _24;
}
_23.style.filter+=" progid:"+_20+"(Opacity="+ov+")";
}else{
af(_23,1).Opacity=ov;
}
af(_23,1).Enabled=!_25;
if(_23.nodeName.toLowerCase()=="tr"){
d.query("> td",_23).forEach(function(i){
d._setOpacity(i,_24);
});
}
return _24;
}:function(_26,_27){
return _26.style.opacity=_27;
};
var _28={left:true,top:true};
var _29=/margin|padding|width|height|max|min|offset/;
var _2a=function(_2b,_2c,_2d){
_2c=_2c.toLowerCase();
if(d.isIE){
if(_2d=="auto"){
if(_2c=="height"){
return _2b.offsetHeight;
}
if(_2c=="width"){
return _2b.offsetWidth;
}
}
if(_2c=="fontweight"){
switch(_2d){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(_2c in _28)){
_28[_2c]=_29.test(_2c);
}
return _28[_2c]?px(_2b,_2d):_2d;
};
var _2e=d.isIE?"styleFloat":"cssFloat",_2f={"cssFloat":_2e,"styleFloat":_2e,"float":_2e};
dojo.style=function(_30,_31,_32){
var n=_5(_30),_33=arguments.length,op=(_31=="opacity");
_31=_2f[_31]||_31;
if(_33==3){
return op?d._setOpacity(n,_32):n.style[_31]=_32;
}
if(_33==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(_33==2&&typeof _31!="string"){
for(var x in _31){
d.style(_30,x,_31[x]);
}
return s;
}
return (_33==1)?s:_2a(n,_31,s[_31]||n.style[_31]);
};
dojo._getPadExtents=function(n,_34){
var s=_34||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_35){
var ne="none",s=_35||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_36){
var s=_36||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_37){
var s=_37||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(_38,_39){
var s=_39||gcs(_38),me=d._getMarginExtents(_38,s);
var l=_38.offsetLeft-me.l,t=_38.offsetTop-me.t,p=_38.parentNode;
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
return {l:l,t:t,w:_38.offsetWidth+me.w,h:_38.offsetHeight+me.h};
};
dojo._getContentBox=function(_3a,_3b){
var s=_3b||gcs(_3a),pe=d._getPadExtents(_3a,s),be=d._getBorderExtents(_3a,s),w=_3a.clientWidth,h;
if(!w){
w=_3a.offsetWidth,h=_3a.offsetHeight;
}else{
h=_3a.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(_3c,_3d){
var s=_3d||gcs(_3c),pe=d._getPadExtents(_3c,s),cb=d._getContentBox(_3c,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(_3e,l,t,w,h,u){
u=u||"px";
var s=_3e.style;
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
dojo._isButtonTag=function(_3f){
return _3f.tagName=="BUTTON"||_3f.tagName=="INPUT"&&(_3f.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(_40){
var n=_40.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(_40);
};
dojo._setContentSize=function(_41,_42,_43,_44){
if(d._usesBorderBox(_41)){
var pb=d._getPadBorderExtents(_41,_44);
if(_42>=0){
_42+=pb.w;
}
if(_43>=0){
_43+=pb.h;
}
}
d._setBox(_41,NaN,NaN,_42,_43);
};
dojo._setMarginBox=function(_45,_46,_47,_48,_49,_4a){
var s=_4a||gcs(_45),bb=d._usesBorderBox(_45),pb=bb?_4b:d._getPadBorderExtents(_45,s);
if(d.isWebKit){
if(d._isButtonTag(_45)){
var ns=_45.style;
if(_48>=0&&!ns.width){
ns.width="4px";
}
if(_49>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(_45,s);
if(_48>=0){
_48=Math.max(_48-pb.w-mb.w,0);
}
if(_49>=0){
_49=Math.max(_49-pb.h-mb.h,0);
}
d._setBox(_45,_46,_47,_48,_49);
};
var _4b={l:0,t:0,w:0,h:0};
dojo.marginBox=function(_4c,box){
var n=_5(_4c),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(_4d,box){
var n=_5(_4d),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _4e=function(_4f,_50){
if(!(_4f=(_4f||0).parentNode)){
return 0;
}
var val,_51=0,_52=d.body();
while(_4f&&_4f.style){
if(gcs(_4f).position=="fixed"){
return 0;
}
val=_4f[_50];
if(val){
_51+=val-0;
if(_4f==_52){
break;
}
}
_4f=_4f.parentNode;
}
return _51;
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
dojo._fixIeBiDiScrollLeft=function(_53){
var dd=d.doc;
if(d.isIE<8&&!d._isBodyLtr()){
var de=d.isQuirks?dd.body:dd.documentElement;
return _53+de.clientWidth-de.scrollWidth;
}
return _53;
};
dojo._abs=dojo.position=function(_54,_55){
var db=d.body(),dh=db.parentNode,ret;
_54=_5(_54);
if(_54["getBoundingClientRect"]){
ret=_54.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE){
var _56=d._getIeDocumentElementOffset();
ret.x-=_56.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_56.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
}else{
ret={x:0,y:0,w:_54.offsetWidth,h:_54.offsetHeight};
if(_54["offsetParent"]){
ret.x-=_4e(_54,"scrollLeft");
ret.y-=_4e(_54,"scrollTop");
var _57=_54;
do{
var n=_57.offsetLeft,t=_57.offsetTop;
ret.x+=isNaN(n)?0:n;
ret.y+=isNaN(t)?0:t;
cs=gcs(_57);
if(_57!=_54){
if(d.isMoz){
ret.x+=2*px(_57,cs.borderLeftWidth);
ret.y+=2*px(_57,cs.borderTopWidth);
}else{
ret.x+=px(_57,cs.borderLeftWidth);
ret.y+=px(_57,cs.borderTopWidth);
}
}
if(d.isMoz&&cs.position=="static"){
var _58=_57.parentNode;
while(_58!=_57.offsetParent){
var pcs=gcs(_58);
if(pcs.position=="static"){
ret.x+=px(_57,pcs.borderLeftWidth);
ret.y+=px(_57,pcs.borderTopWidth);
}
_58=_58.parentNode;
}
}
_57=_57.offsetParent;
}while((_57!=dh)&&_57);
}else{
if(_54.x&&_54.y){
ret.x+=isNaN(_54.x)?0:_54.x;
ret.y+=isNaN(_54.y)?0:_54.y;
}
}
}
if(_55){
var _59=d._docScroll();
ret.x+=_59.x;
ret.y+=_59.y;
}
return ret;
};
dojo.coords=function(_5a,_5b){
var n=_5(_5a),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_5b);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _5c={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_5d={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_5e={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _5f=function(_60){
return _5d[_60.toLowerCase()]||_60;
};
var _61=function(_62,_63){
var _64=_62.getAttributeNode&&_62.getAttributeNode(_63);
return _64&&_64.specified;
};
dojo.hasAttr=function(_65,_66){
var lc=_66.toLowerCase();
return _5e[_5c[lc]||_66]||_61(_5(_65),_5d[lc]||_66);
};
var _67={},_68=0,_69=dojo._scopeName+"attrid",_6a={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(_6b,_6c,_6d){
_6b=_5(_6b);
var _6e=arguments.length,_6f;
if(_6e==2&&typeof _6c!="string"){
for(var x in _6c){
d.attr(_6b,x,_6c[x]);
}
return _6b;
}
var lc=_6c.toLowerCase(),_70=_5c[lc]||_6c,_71=_5e[_70],_72=_5d[lc]||_6c;
if(_6e==3){
do{
if(_70=="style"&&typeof _6d!="string"){
d.style(_6b,_6d);
break;
}
if(_70=="innerHTML"){
if(d.isIE&&_6b.tagName.toLowerCase() in _6a){
d.empty(_6b);
_6b.appendChild(d._toDom(_6d,_6b.ownerDocument));
}else{
_6b[_70]=_6d;
}
break;
}
if(d.isFunction(_6d)){
var _73=d.attr(_6b,_69);
if(!_73){
_73=_68++;
d.attr(_6b,_69,_73);
}
if(!_67[_73]){
_67[_73]={};
}
var h=_67[_73][_70];
if(h){
d.disconnect(h);
}else{
try{
delete _6b[_70];
}
catch(e){
}
}
_67[_73][_70]=d.connect(_6b,_70,_6d);
break;
}
if(_71||typeof _6d=="boolean"){
_6b[_70]=_6d;
break;
}
_6b.setAttribute(_72,_6d);
}while(false);
return _6b;
}
_6d=_6b[_70];
if(_71&&typeof _6d!="undefined"){
return _6d;
}
if(_70!="href"&&(typeof _6d=="boolean"||d.isFunction(_6d))){
return _6d;
}
return _61(_6b,_72)?_6b.getAttribute(_72):null;
};
dojo.removeAttr=function(_74,_75){
_5(_74).removeAttribute(_5f(_75));
};
dojo.getNodeProp=function(_76,_77){
_76=_5(_76);
var lc=_77.toLowerCase(),_78=_5c[lc]||_77;
if((_78 in _76)&&_78!="href"){
return _76[_78];
}
var _79=_5d[lc]||_77;
return _61(_76,_79)?_76.getAttribute(_79):null;
};
dojo.create=function(tag,_7a,_7b,pos){
var doc=d.doc;
if(_7b){
_7b=_5(_7b);
doc=_7b.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_7a){
d.attr(tag,_7a);
}
if(_7b){
d.place(tag,_7b,pos);
}
return tag;
};
d.empty=d.isIE?function(_7c){
_7c=_5(_7c);
for(var c;c=_7c.lastChild;){
d.destroy(c);
}
}:function(_7d){
_5(_7d).innerHTML="";
};
var _7e={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_7f=/<\s*([\w\:]+)/,_80={},_81=0,_82="__"+d._scopeName+"ToDomId";
for(var _83 in _7e){
var tw=_7e[_83];
tw.pre=_83=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
d._toDom=function(_84,doc){
doc=doc||d.doc;
var _85=doc[_82];
if(!_85){
doc[_82]=_85=++_81+"";
_80[_85]=doc.createElement("div");
}
_84+="";
var _86=_84.match(_7f),tag=_86?_86[1].toLowerCase():"",_87=_80[_85],_88,i,fc,df;
if(_86&&_7e[tag]){
_88=_7e[tag];
_87.innerHTML=_88.pre+_84+_88.post;
for(i=_88.length;i;--i){
_87=_87.firstChild;
}
}else{
_87.innerHTML=_84;
}
if(_87.childNodes.length==1){
return _87.removeChild(_87.firstChild);
}
df=doc.createDocumentFragment();
while(fc=_87.firstChild){
df.appendChild(fc);
}
return df;
};
var _89="className";
dojo.hasClass=function(_8a,_8b){
return ((" "+_5(_8a)[_89]+" ").indexOf(" "+_8b+" ")>=0);
};
var _8c=/\s+/,a1=[""],_8d=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_8c);
}
}
return s||"";
};
dojo.addClass=function(_8e,_8f){
_8e=_5(_8e);
_8f=_8d(_8f);
var cls=_8e[_89],_90;
cls=cls?" "+cls+" ":" ";
_90=cls.length;
for(var i=0,len=_8f.length,c;i<len;++i){
c=_8f[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_90<cls.length){
_8e[_89]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(_91,_92){
_91=_5(_91);
var cls;
if(_92!==undefined){
_92=_8d(_92);
cls=" "+_91[_89]+" ";
for(var i=0,len=_92.length;i<len;++i){
cls=cls.replace(" "+_92[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(_91[_89]!=cls){
_91[_89]=cls;
}
};
dojo.toggleClass=function(_93,_94,_95){
if(_95===undefined){
_95=!d.hasClass(_93,_94);
}
d[_95?"addClass":"removeClass"](_93,_94);
};
})();
}
