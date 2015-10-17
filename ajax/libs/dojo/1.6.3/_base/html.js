/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.html"]){
dojo._hasResource["dojo._base.html"]=true;
dojo.provide("dojo._base.html");
dojo.require("dojo._base.lang");
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
if(dojo.isIE){
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
return ((typeof id=="string")?(_4||dojo.doc).getElementById(id):id)||null;
};
}
(function(){
var d=dojo;
var _5=d.byId;
function _6(_7,_8){
if(_7.firstChild){
_9(_7);
}
if(_8){
d.isIE&&_8.canHaveChildren&&"removeNode" in _7?_7.removeNode(false):_8.removeChild(_7);
}
};
dojo._destroyElement=dojo.destroy=function(_a){
_a=_5(_a);
if(!_a){
return;
}
_6(_a,_a.parentNode);
};
dojo.isDescendant=function(_b,_c){
try{
_b=_5(_b);
_c=_5(_c);
while(_b){
if(_b==_c){
return true;
}
_b=_b.parentNode;
}
}
catch(e){
}
return false;
};
dojo.setSelectable=function(_d,_e){
_d=_5(_d);
if(d.isMozilla){
_d.style.MozUserSelect=_e?"":"none";
}else{
if(d.isKhtml||d.isWebKit){
_d.style.KhtmlUserSelect=_e?"auto":"none";
}else{
if(d.isIE){
var v=(_d.unselectable=_e?"":"on");
d.query("*",_d).forEach("item.unselectable = '"+v+"'");
}
}
}
};
var _f=function(_10,ref){
var _11=ref.parentNode;
if(_11){
_11.insertBefore(_10,ref);
}
};
var _12=function(_13,ref){
var _14=ref.parentNode;
if(_14){
if(_14.lastChild==ref){
_14.appendChild(_13);
}else{
_14.insertBefore(_13,ref.nextSibling);
}
}
};
dojo.place=function(_15,_16,_17){
_16=_5(_16);
if(typeof _15=="string"){
_15=/^\s*</.test(_15)?d._toDom(_15,_16.ownerDocument):_5(_15);
}
if(typeof _17=="number"){
var cn=_16.childNodes;
if(!cn.length||cn.length<=_17){
_16.appendChild(_15);
}else{
_f(_15,cn[_17<0?0:_17]);
}
}else{
switch(_17){
case "before":
_f(_15,_16);
break;
case "after":
_12(_15,_16);
break;
case "replace":
_16.parentNode.replaceChild(_15,_16);
break;
case "only":
d.empty(_16);
_16.appendChild(_15);
break;
case "first":
if(_16.firstChild){
_f(_15,_16.firstChild);
break;
}
default:
_16.appendChild(_15);
}
}
return _15;
};
dojo.boxModel="content-box";
if(d.isIE){
d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";
}
var gcs;
if(d.isWebKit){
gcs=function(_18){
var s;
if(_18.nodeType==1){
var dv=_18.ownerDocument.defaultView;
s=dv.getComputedStyle(_18,null);
if(!s&&_18.style){
_18.style.display="";
s=dv.getComputedStyle(_18,null);
}
}
return s||{};
};
}else{
if(d.isIE&&(d.isIE<9||d.isQuirks)){
gcs=function(_19){
return _19.nodeType==1?_19.currentStyle:{};
};
}else{
gcs=function(_1a){
return _1a.nodeType==1?_1a.ownerDocument.defaultView.getComputedStyle(_1a,null):{};
};
}
}
dojo.getComputedStyle=gcs;
if(!d.isIE){
d._toPixelValue=function(_1b,_1c){
return parseFloat(_1c)||0;
};
}else{
d._toPixelValue=function(_1d,_1e){
if(!_1e){
return 0;
}
if(_1e=="medium"){
return 4;
}
if(_1e.slice&&_1e.slice(-2)=="px"){
return parseFloat(_1e);
}
with(_1d){
var _1f=style.left;
var _20=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_1e;
_1e=style.pixelLeft;
}
catch(e){
_1e=0;
}
style.left=_1f;
runtimeStyle.left=_20;
}
return _1e;
};
}
var px=d._toPixelValue;
var _21="DXImageTransform.Microsoft.Alpha";
var af=function(n,f){
try{
return n.filters.item(_21);
}
catch(e){
return f?{}:null;
}
};
dojo._getOpacity=d.isIE<9||(d.isIE<10&&d.isQuirks)?function(_22){
try{
return af(_22).Opacity/100;
}
catch(e){
return 1;
}
}:function(_23){
return gcs(_23).opacity;
};
dojo._setOpacity=d.isIE<9||(d.isIE<10&&d.isQuirks)?function(_24,_25){
var ov=_25*100,_26=_25==1;
_24.style.zoom=_26?"":1;
if(!af(_24)){
if(_26){
return _25;
}
_24.style.filter+=" progid:"+_21+"(Opacity="+ov+")";
}else{
af(_24,1).Opacity=ov;
}
af(_24,1).Enabled=!_26;
if(_24.nodeName.toLowerCase()=="tr"){
d.query("> td",_24).forEach(function(i){
d._setOpacity(i,_25);
});
}
return _25;
}:function(_27,_28){
return _27.style.opacity=_28;
};
var _29={left:true,top:true};
var _2a=/margin|padding|width|height|max|min|offset/;
var _2b=function(_2c,_2d,_2e){
_2d=_2d.toLowerCase();
if(d.isIE){
if(_2e=="auto"){
if(_2d=="height"){
return _2c.offsetHeight;
}
if(_2d=="width"){
return _2c.offsetWidth;
}
}
if(_2d=="fontweight"){
switch(_2e){
case 700:
return "bold";
case 400:
default:
return "normal";
}
}
}
if(!(_2d in _29)){
_29[_2d]=_2a.test(_2d);
}
return _29[_2d]?px(_2c,_2e):_2e;
};
var _2f=d.isIE?"styleFloat":"cssFloat",_30={"cssFloat":_2f,"styleFloat":_2f,"float":_2f};
dojo.style=function(_31,_32,_33){
var n=_5(_31),_34=arguments.length,op=(_32=="opacity");
_32=_30[_32]||_32;
if(_34==3){
return op?d._setOpacity(n,_33):n.style[_32]=_33;
}
if(_34==2&&op){
return d._getOpacity(n);
}
var s=gcs(n);
if(_34==2&&typeof _32!="string"){
for(var x in _32){
d.style(_31,x,_32[x]);
}
return s;
}
return (_34==1)?s:_2b(n,_32,s[_32]||n.style[_32]);
};
dojo._getPadExtents=function(n,_35){
var s=_35||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);
return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};
};
dojo._getBorderExtents=function(n,_36){
var ne="none",s=_36||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);
return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};
};
dojo._getPadBorderExtents=function(n,_37){
var s=_37||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);
return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};
};
dojo._getMarginExtents=function(n,_38){
var s=_38||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);
if(d.isWebKit&&(s.position!="absolute")){
r=l;
}
return {l:l,t:t,w:l+r,h:t+b};
};
dojo._getMarginBox=function(_39,_3a){
var s=_3a||gcs(_39),me=d._getMarginExtents(_39,s);
var l=_39.offsetLeft-me.l,t=_39.offsetTop-me.t,p=_39.parentNode;
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
if(d.isOpera||(d.isIE==8&&!d.isQuirks)){
if(p){
be=d._getBorderExtents(p);
l-=be.l;
t-=be.t;
}
}
}
return {l:l,t:t,w:_39.offsetWidth+me.w,h:_39.offsetHeight+me.h};
};
dojo._getMarginSize=function(_3b,_3c){
_3b=_5(_3b);
var me=d._getMarginExtents(_3b,_3c||gcs(_3b));
var _3d=_3b.getBoundingClientRect();
return {w:(_3d.right-_3d.left)+me.w,h:(_3d.bottom-_3d.top)+me.h};
};
dojo._getContentBox=function(_3e,_3f){
var s=_3f||gcs(_3e),pe=d._getPadExtents(_3e,s),be=d._getBorderExtents(_3e,s),w=_3e.clientWidth,h;
if(!w){
w=_3e.offsetWidth,h=_3e.offsetHeight;
}else{
h=_3e.clientHeight,be.w=be.h=0;
}
if(d.isOpera){
pe.l+=be.l;
pe.t+=be.t;
}
return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};
};
dojo._getBorderBox=function(_40,_41){
var s=_41||gcs(_40),pe=d._getPadExtents(_40,s),cb=d._getContentBox(_40,s);
return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};
};
dojo._setBox=function(_42,l,t,w,h,u){
u=u||"px";
var s=_42.style;
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
dojo._isButtonTag=function(_43){
return _43.tagName=="BUTTON"||_43.tagName=="INPUT"&&(_43.getAttribute("type")||"").toUpperCase()=="BUTTON";
};
dojo._usesBorderBox=function(_44){
var n=_44.tagName;
return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(_44);
};
dojo._setContentSize=function(_45,_46,_47,_48){
if(d._usesBorderBox(_45)){
var pb=d._getPadBorderExtents(_45,_48);
if(_46>=0){
_46+=pb.w;
}
if(_47>=0){
_47+=pb.h;
}
}
d._setBox(_45,NaN,NaN,_46,_47);
};
dojo._setMarginBox=function(_49,_4a,_4b,_4c,_4d,_4e){
var s=_4e||gcs(_49),bb=d._usesBorderBox(_49),pb=bb?_4f:d._getPadBorderExtents(_49,s);
if(d.isWebKit){
if(d._isButtonTag(_49)){
var ns=_49.style;
if(_4c>=0&&!ns.width){
ns.width="4px";
}
if(_4d>=0&&!ns.height){
ns.height="4px";
}
}
}
var mb=d._getMarginExtents(_49,s);
if(_4c>=0){
_4c=Math.max(_4c-pb.w-mb.w,0);
}
if(_4d>=0){
_4d=Math.max(_4d-pb.h-mb.h,0);
}
d._setBox(_49,_4a,_4b,_4c,_4d);
};
var _4f={l:0,t:0,w:0,h:0};
dojo.marginBox=function(_50,box){
var n=_5(_50),s=gcs(n),b=box;
return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);
};
dojo.contentBox=function(_51,box){
var n=_5(_51),s=gcs(n),b=box;
return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);
};
var _52=function(_53,_54){
if(!(_53=(_53||0).parentNode)){
return 0;
}
var val,_55=0,_56=d.body();
while(_53&&_53.style){
if(gcs(_53).position=="fixed"){
return 0;
}
val=_53[_54];
if(val){
_55+=val-0;
if(_53==_56){
break;
}
}
_53=_53.parentNode;
}
return _55;
};
dojo._docScroll=function(){
var n=d.global;
return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(n.scrollLeft||0),y:n.scrollTop||0});
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
dojo._fixIeBiDiScrollLeft=function(_57){
var ie=d.isIE;
if(ie&&!d._isBodyLtr()){
var qk=d.isQuirks,de=qk?d.doc.body:d.doc.documentElement;
if(ie==6&&!qk&&d.global.frameElement&&de.scrollHeight>de.clientHeight){
_57+=de.clientLeft;
}
return (ie<8||qk)?(_57+de.clientWidth-de.scrollWidth):-_57;
}
return _57;
};
dojo._abs=dojo.position=function(_58,_59){
_58=_5(_58);
var db=d.body(),dh=db.parentNode,ret=_58.getBoundingClientRect();
ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};
if(d.isIE<9){
var _5a=d._getIeDocumentElementOffset();
ret.x-=_5a.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);
ret.y-=_5a.y+(d.isQuirks?db.clientTop+db.offsetTop:0);
}else{
if(d.isFF==3){
var cs=gcs(dh);
ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);
ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);
}
}
if(_59){
var _5b=d._docScroll();
ret.x+=_5b.x;
ret.y+=_5b.y;
}
return ret;
};
dojo.coords=function(_5c,_5d){
var n=_5(_5c),s=gcs(n),mb=d._getMarginBox(n,s);
var abs=d.position(n,_5d);
mb.x=abs.x;
mb.y=abs.y;
return mb;
};
var _5e={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_5f={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_60={innerHTML:1,className:1,htmlFor:d.isIE,value:1};
var _61=function(_62){
return _5f[_62.toLowerCase()]||_62;
};
var _63=function(_64,_65){
var _66=_64.getAttributeNode&&_64.getAttributeNode(_65);
return _66&&_66.specified;
};
dojo.hasAttr=function(_67,_68){
var lc=_68.toLowerCase();
return _60[_5e[lc]||_68]||_63(_5(_67),_5f[lc]||_68);
};
var _69={},_6a=0,_6b=dojo._scopeName+"attrid",_6c={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};
dojo.attr=function(_6d,_6e,_6f){
_6d=_5(_6d);
var _70=arguments.length,_71;
if(_70==2&&typeof _6e!="string"){
for(var x in _6e){
d.attr(_6d,x,_6e[x]);
}
return _6d;
}
var lc=_6e.toLowerCase(),_72=_5e[lc]||_6e,_73=_60[_72],_74=_5f[lc]||_6e;
if(_70==3){
do{
if(_72=="style"&&typeof _6f!="string"){
d.style(_6d,_6f);
break;
}
if(_72=="innerHTML"){
if(d.isIE&&_6d.tagName.toLowerCase() in _6c){
d.empty(_6d);
_6d.appendChild(d._toDom(_6f,_6d.ownerDocument));
}else{
_6d[_72]=_6f;
}
break;
}
if(d.isFunction(_6f)){
var _75=d.attr(_6d,_6b);
if(!_75){
_75=_6a++;
d.attr(_6d,_6b,_75);
}
if(!_69[_75]){
_69[_75]={};
}
var h=_69[_75][_72];
if(h){
d.disconnect(h);
}else{
try{
delete _6d[_72];
}
catch(e){
}
}
_69[_75][_72]=d.connect(_6d,_72,_6f);
break;
}
if(_73||typeof _6f=="boolean"){
_6d[_72]=_6f;
break;
}
_6d.setAttribute(_74,_6f);
}while(false);
return _6d;
}
_6f=_6d[_72];
if(_73&&typeof _6f!="undefined"){
return _6f;
}
if(_72!="href"&&(typeof _6f=="boolean"||d.isFunction(_6f))){
return _6f;
}
return _63(_6d,_74)?_6d.getAttribute(_74):null;
};
dojo.removeAttr=function(_76,_77){
_5(_76).removeAttribute(_61(_77));
};
dojo.getNodeProp=function(_78,_79){
_78=_5(_78);
var lc=_79.toLowerCase(),_7a=_5e[lc]||_79;
if((_7a in _78)&&_7a!="href"){
return _78[_7a];
}
var _7b=_5f[lc]||_79;
return _63(_78,_7b)?_78.getAttribute(_7b):null;
};
dojo.create=function(tag,_7c,_7d,pos){
var doc=d.doc;
if(_7d){
_7d=_5(_7d);
doc=_7d.ownerDocument;
}
if(typeof tag=="string"){
tag=doc.createElement(tag);
}
if(_7c){
d.attr(tag,_7c);
}
if(_7d){
d.place(tag,_7d,pos);
}
return tag;
};
function _9(_7e){
if(_7e.canHaveChildren){
try{
_7e.innerHTML="";
return;
}
catch(e){
}
}
for(var c;c=_7e.lastChild;){
_6(c,_7e);
}
};
d.empty=function(_7f){
_9(_5(_7f));
};
var _80={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_81=/<\s*([\w\:]+)/,_82={},_83=0,_84="__"+d._scopeName+"ToDomId";
for(var _85 in _80){
if(_80.hasOwnProperty(_85)){
var tw=_80[_85];
tw.pre=_85=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";
tw.post="</"+tw.reverse().join("></")+">";
}
}
d._toDom=function(_86,doc){
doc=doc||d.doc;
var _87=doc[_84];
if(!_87){
doc[_84]=_87=++_83+"";
_82[_87]=doc.createElement("div");
}
_86+="";
var _88=_86.match(_81),tag=_88?_88[1].toLowerCase():"",_89=_82[_87],_8a,i,fc,df;
if(_88&&_80[tag]){
_8a=_80[tag];
_89.innerHTML=_8a.pre+_86+_8a.post;
for(i=_8a.length;i;--i){
_89=_89.firstChild;
}
}else{
_89.innerHTML=_86;
}
if(_89.childNodes.length==1){
return _89.removeChild(_89.firstChild);
}
df=doc.createDocumentFragment();
while((fc=_89.firstChild)){
df.appendChild(fc);
}
return df;
};
var _8b="className";
dojo.hasClass=function(_8c,_8d){
return ((" "+_5(_8c)[_8b]+" ").indexOf(" "+_8d+" ")>=0);
};
var _8e=/\s+/,a1=[""],_8f={},_90=function(s){
if(typeof s=="string"||s instanceof String){
if(s.indexOf(" ")<0){
a1[0]=s;
return a1;
}else{
return s.split(_8e);
}
}
return s||"";
};
dojo.addClass=function(_91,_92){
_91=_5(_91);
_92=_90(_92);
var cls=_91[_8b],_93;
cls=cls?" "+cls+" ":" ";
_93=cls.length;
for(var i=0,len=_92.length,c;i<len;++i){
c=_92[i];
if(c&&cls.indexOf(" "+c+" ")<0){
cls+=c+" ";
}
}
if(_93<cls.length){
_91[_8b]=cls.substr(1,cls.length-2);
}
};
dojo.removeClass=function(_94,_95){
_94=_5(_94);
var cls;
if(_95!==undefined){
_95=_90(_95);
cls=" "+_94[_8b]+" ";
for(var i=0,len=_95.length;i<len;++i){
cls=cls.replace(" "+_95[i]+" "," ");
}
cls=d.trim(cls);
}else{
cls="";
}
if(_94[_8b]!=cls){
_94[_8b]=cls;
}
};
dojo.replaceClass=function(_96,_97,_98){
_96=_5(_96);
_8f.className=_96.className;
dojo.removeClass(_8f,_98);
dojo.addClass(_8f,_97);
if(_96.className!==_8f.className){
_96.className=_8f.className;
}
};
dojo.toggleClass=function(_99,_9a,_9b){
if(_9b===undefined){
_9b=!d.hasClass(_99,_9a);
}
d[_9b?"addClass":"removeClass"](_99,_9a);
};
})();
}
