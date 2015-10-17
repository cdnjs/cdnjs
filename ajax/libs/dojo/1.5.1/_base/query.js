/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
if(typeof dojo!="undefined"){
dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
dojo.require("dojo._base.lang");
}
(function(d){
var _1=d.trim;
var _2=d.forEach;
var _3=d._NodeListCtor=d.NodeList;
var _4=function(){
return d.doc;
};
var _5=((d.isWebKit||d.isMozilla)&&((_4().compatMode)=="BackCompat"));
var _6=!!_4().firstChild["children"]?"children":"childNodes";
var _7=">~+";
var _8=false;
var _9=function(){
return true;
};
var _a=function(_b){
if(_7.indexOf(_b.slice(-1))>=0){
_b+=" * ";
}else{
_b+=" ";
}
var ts=function(s,e){
return _1(_b.slice(s,e));
};
var _c=[];
var _d=-1,_e=-1,_f=-1,_10=-1,_11=-1,_12=-1,_13=-1,lc="",cc="",_14;
var x=0,ql=_b.length,_15=null,_16=null;
var _17=function(){
if(_13>=0){
var tv=(_13==x)?null:ts(_13,x);
_15[(_7.indexOf(tv)<0)?"tag":"oper"]=tv;
_13=-1;
}
};
var _18=function(){
if(_12>=0){
_15.id=ts(_12,x).replace(/\\/g,"");
_12=-1;
}
};
var _19=function(){
if(_11>=0){
_15.classes.push(ts(_11+1,x).replace(/\\/g,""));
_11=-1;
}
};
var _1a=function(){
_18();
_17();
_19();
};
var _1b=function(){
_1a();
if(_10>=0){
_15.pseudos.push({name:ts(_10+1,x)});
}
_15.loops=(_15.pseudos.length||_15.attrs.length||_15.classes.length);
_15.oquery=_15.query=ts(_14,x);
_15.otag=_15.tag=(_15["oper"])?null:(_15.tag||"*");
if(_15.tag){
_15.tag=_15.tag.toUpperCase();
}
if(_c.length&&(_c[_c.length-1].oper)){
_15.infixOper=_c.pop();
_15.query=_15.infixOper.query+" "+_15.query;
}
_c.push(_15);
_15=null;
};
for(;lc=cc,cc=_b.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_15){
_14=x;
_15={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_8)?this.otag:this.tag;
}};
_13=x;
}
if(_d>=0){
if(cc=="]"){
if(!_16.attr){
_16.attr=ts(_d+1,x);
}else{
_16.matchFor=ts((_f||_d+1),x);
}
var cmf=_16.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_16.matchFor=cmf.slice(1,-1);
}
}
_15.attrs.push(_16);
_16=null;
_d=_f=-1;
}else{
if(cc=="="){
var _1c=("|~^$*".indexOf(lc)>=0)?lc:"";
_16.type=_1c+cc;
_16.attr=ts(_d+1,x-_1c.length);
_f=x+1;
}
}
}else{
if(_e>=0){
if(cc==")"){
if(_10>=0){
_16.value=ts(_e+1,x);
}
_10=_e=-1;
}
}else{
if(cc=="#"){
_1a();
_12=x+1;
}else{
if(cc=="."){
_1a();
_11=x;
}else{
if(cc==":"){
_1a();
_10=x;
}else{
if(cc=="["){
_1a();
_d=x;
_16={};
}else{
if(cc=="("){
if(_10>=0){
_16={name:ts(_10+1,x),value:null};
_15.pseudos.push(_16);
}
_e=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1b();
}
}
}
}
}
}
}
}
}
return _c;
};
var _1d=function(_1e,_1f){
if(!_1e){
return _1f;
}
if(!_1f){
return _1e;
}
return function(){
return _1e.apply(window,arguments)&&_1f.apply(window,arguments);
};
};
var _20=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _21=function(n){
return (1==n.nodeType);
};
var _22="";
var _23=function(_24,_25){
if(!_24){
return _22;
}
if(_25=="class"){
return _24.className||_22;
}
if(_25=="for"){
return _24.htmlFor||_22;
}
if(_25=="style"){
return _24.style.cssText||_22;
}
return (_8?_24.getAttribute(_25):_24.getAttribute(_25,2))||_22;
};
var _26={"*=":function(_27,_28){
return function(_29){
return (_23(_29,_27).indexOf(_28)>=0);
};
},"^=":function(_2a,_2b){
return function(_2c){
return (_23(_2c,_2a).indexOf(_2b)==0);
};
},"$=":function(_2d,_2e){
var _2f=" "+_2e;
return function(_30){
var ea=" "+_23(_30,_2d);
return (ea.lastIndexOf(_2e)==(ea.length-_2e.length));
};
},"~=":function(_31,_32){
var _33=" "+_32+" ";
return function(_34){
var ea=" "+_23(_34,_31)+" ";
return (ea.indexOf(_33)>=0);
};
},"|=":function(_35,_36){
var _37=" "+_36+"-";
return function(_38){
var ea=" "+_23(_38,_35);
return ((ea==_36)||(ea.indexOf(_37)==0));
};
},"=":function(_39,_3a){
return function(_3b){
return (_23(_3b,_39)==_3a);
};
}};
var _3c=(typeof _4().firstChild.nextElementSibling=="undefined");
var _3d=!_3c?"nextElementSibling":"nextSibling";
var _3e=!_3c?"previousElementSibling":"previousSibling";
var _3f=(_3c?_21:_9);
var _40=function(_41){
while(_41=_41[_3e]){
if(_3f(_41)){
return false;
}
}
return true;
};
var _42=function(_43){
while(_43=_43[_3d]){
if(_3f(_43)){
return false;
}
}
return true;
};
var _44=function(_45){
var _46=_45.parentNode;
var i=0,_47=_46[_6],ci=(_45["_i"]||-1),cl=(_46["_l"]||-1);
if(!_47){
return -1;
}
var l=_47.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
_46["_l"]=l;
ci=-1;
for(var te=_46["firstElementChild"]||_46["firstChild"];te;te=te[_3d]){
if(_3f(te)){
te["_i"]=++i;
if(_45===te){
ci=i;
}
}
}
return ci;
};
var _48=function(_49){
return !((_44(_49))%2);
};
var _4a=function(_4b){
return ((_44(_4b))%2);
};
var _4c={"checked":function(_4d,_4e){
return function(_4f){
return !!("checked" in _4f?_4f.checked:_4f.selected);
};
},"first-child":function(){
return _40;
},"last-child":function(){
return _42;
},"only-child":function(_50,_51){
return function(_52){
if(!_40(_52)){
return false;
}
if(!_42(_52)){
return false;
}
return true;
};
},"empty":function(_53,_54){
return function(_55){
var cn=_55.childNodes;
var cnl=_55.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(_56,_57){
var cz=_57.charAt(0);
if(cz=="\""||cz=="'"){
_57=_57.slice(1,-1);
}
return function(_58){
return (_58.innerHTML.indexOf(_57)>=0);
};
},"not":function(_59,_5a){
var p=_a(_5a)[0];
var _5b={el:1};
if(p.tag!="*"){
_5b.tag=1;
}
if(!p.classes.length){
_5b.classes=1;
}
var ntf=_5c(p,_5b);
return function(_5d){
return (!ntf(_5d));
};
},"nth-child":function(_5e,_5f){
var pi=parseInt;
if(_5f=="odd"){
return _4a;
}else{
if(_5f=="even"){
return _48;
}
}
if(_5f.indexOf("n")!=-1){
var _60=_5f.split("n",2);
var _61=_60[0]?((_60[0]=="-")?-1:pi(_60[0])):1;
var idx=_60[1]?pi(_60[1]):0;
var lb=0,ub=-1;
if(_61>0){
if(idx<0){
idx=(idx%_61)&&(_61+(idx%_61));
}else{
if(idx>0){
if(idx>=_61){
lb=idx-idx%_61;
}
idx=idx%_61;
}
}
}else{
if(_61<0){
_61*=-1;
if(idx>0){
ub=idx;
idx=idx%_61;
}
}
}
if(_61>0){
return function(_62){
var i=_44(_62);
return (i>=lb)&&(ub<0||i<=ub)&&((i%_61)==idx);
};
}else{
_5f=idx;
}
}
var _63=pi(_5f);
return function(_64){
return (_44(_64)==_63);
};
}};
var _65=(d.isIE)?function(_66){
var clc=_66.toLowerCase();
if(clc=="class"){
_66="className";
}
return function(_67){
return (_8?_67.getAttribute(_66):_67[_66]||_67[clc]);
};
}:function(_68){
return function(_69){
return (_69&&_69.getAttribute&&_69.hasAttribute(_68));
};
};
var _5c=function(_6a,_6b){
if(!_6a){
return _9;
}
_6b=_6b||{};
var ff=null;
if(!("el" in _6b)){
ff=_1d(ff,_21);
}
if(!("tag" in _6b)){
if(_6a.tag!="*"){
ff=_1d(ff,function(_6c){
return (_6c&&(_6c.tagName==_6a.getTag()));
});
}
}
if(!("classes" in _6b)){
_2(_6a.classes,function(_6d,idx,arr){
var re=new RegExp("(?:^|\\s)"+_6d+"(?:\\s|$)");
ff=_1d(ff,function(_6e){
return re.test(_6e.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _6b)){
_2(_6a.pseudos,function(_6f){
var pn=_6f.name;
if(_4c[pn]){
ff=_1d(ff,_4c[pn](pn,_6f.value));
}
});
}
if(!("attrs" in _6b)){
_2(_6a.attrs,function(_70){
var _71;
var a=_70.attr;
if(_70.type&&_26[_70.type]){
_71=_26[_70.type](a,_70.matchFor);
}else{
if(a.length){
_71=_65(a);
}
}
if(_71){
ff=_1d(ff,_71);
}
});
}
if(!("id" in _6b)){
if(_6a.id){
ff=_1d(ff,function(_72){
return (!!_72&&(_72.id==_6a.id));
});
}
}
if(!ff){
if(!("default" in _6b)){
ff=_9;
}
}
return ff;
};
var _73=function(_74){
return function(_75,ret,bag){
while(_75=_75[_3d]){
if(_3c&&(!_21(_75))){
continue;
}
if((!bag||_76(_75,bag))&&_74(_75)){
ret.push(_75);
}
break;
}
return ret;
};
};
var _77=function(_78){
return function(_79,ret,bag){
var te=_79[_3d];
while(te){
if(_3f(te)){
if(bag&&!_76(te,bag)){
break;
}
if(_78(te)){
ret.push(te);
}
}
te=te[_3d];
}
return ret;
};
};
var _7a=function(_7b){
_7b=_7b||_9;
return function(_7c,ret,bag){
var te,x=0,_7d=_7c[_6];
while(te=_7d[x++]){
if(_3f(te)&&(!bag||_76(te,bag))&&(_7b(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _7e=function(_7f,_80){
var pn=_7f.parentNode;
while(pn){
if(pn==_80){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _81={};
var _82=function(_83){
var _84=_81[_83.query];
if(_84){
return _84;
}
var io=_83.infixOper;
var _85=(io?io.oper:"");
var _86=_5c(_83,{el:1});
var qt=_83.tag;
var _87=("*"==qt);
var ecs=_4()["getElementsByClassName"];
if(!_85){
if(_83.id){
_86=(!_83.loops&&_87)?_9:_5c(_83,{el:1,id:1});
_84=function(_88,arr){
var te=d.byId(_83.id,(_88.ownerDocument||_88));
if(!te||!_86(te)){
return;
}
if(9==_88.nodeType){
return _20(te,arr);
}else{
if(_7e(te,_88)){
return _20(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_83.classes.length&&!_5){
_86=_5c(_83,{el:1,classes:1,id:1});
var _89=_83.classes.join(" ");
_84=function(_8a,arr,bag){
var ret=_20(0,arr),te,x=0;
var _8b=_8a.getElementsByClassName(_89);
while((te=_8b[x++])){
if(_86(te,_8a)&&_76(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_87&&!_83.loops){
_84=function(_8c,arr,bag){
var ret=_20(0,arr),te,x=0;
var _8d=_8c.getElementsByTagName(_83.getTag());
while((te=_8d[x++])){
if(_76(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_86=_5c(_83,{el:1,tag:1,id:1});
_84=function(_8e,arr,bag){
var ret=_20(0,arr),te,x=0;
var _8f=_8e.getElementsByTagName(_83.getTag());
while((te=_8f[x++])){
if(_86(te,_8e)&&_76(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _90={el:1};
if(_87){
_90.tag=1;
}
_86=_5c(_83,_90);
if("+"==_85){
_84=_73(_86);
}else{
if("~"==_85){
_84=_77(_86);
}else{
if(">"==_85){
_84=_7a(_86);
}
}
}
}
return _81[_83.query]=_84;
};
var _91=function(_92,_93){
var _94=_20(_92),qp,x,te,qpl=_93.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_93[i];
x=_94.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_82(qp);
for(var j=0;(te=_94[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_94=ret;
}
return ret;
};
var _95={},_96={};
var _97=function(_98){
var _99=_a(_1(_98));
if(_99.length==1){
var tef=_82(_99[0]);
return function(_9a){
var r=tef(_9a,new _3());
if(r){
r.nozip=true;
}
return r;
};
}
return function(_9b){
return _91(_9b,_99);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _9c=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _9d=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _9e=(!!_4()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_9c));
var _9f=/n\+\d|([^ ])?([>~+])([^ =])?/g;
var _a0=function(_a1,pre,ch,_a2){
return ch?(pre?pre+" ":"")+ch+(_a2?" "+_a2:""):_a1;
};
var _a3=function(_a4,_a5){
_a4=_a4.replace(_9f,_a0);
if(_9e){
var _a6=_96[_a4];
if(_a6&&!_a5){
return _a6;
}
}
var _a7=_95[_a4];
if(_a7){
return _a7;
}
var qcz=_a4.charAt(0);
var _a8=(-1==_a4.indexOf(" "));
if((_a4.indexOf("#")>=0)&&(_a8)){
_a5=true;
}
var _a9=(_9e&&(!_a5)&&(_7.indexOf(qcz)==-1)&&(!d.isIE||(_a4.indexOf(":")==-1))&&(!(_5&&(_a4.indexOf(".")>=0)))&&(_a4.indexOf(":contains")==-1)&&(_a4.indexOf(":checked")==-1)&&(_a4.indexOf("|=")==-1));
if(_a9){
var tq=(_7.indexOf(_a4.charAt(_a4.length-1))>=0)?(_a4+" *"):_a4;
return _96[_a4]=function(_aa){
try{
if(!((9==_aa.nodeType)||_a8)){
throw "";
}
var r=_aa[qsa](tq);
r[_9d]=true;
return r;
}
catch(e){
return _a3(_a4,true)(_aa);
}
};
}else{
var _ab=_a4.split(/\s*,\s*/);
return _95[_a4]=((_ab.length<2)?_97(_a4):function(_ac){
var _ad=0,ret=[],tp;
while((tp=_ab[_ad++])){
ret=ret.concat(_97(tp)(_ac));
}
return ret;
});
}
};
var _ae=0;
var _af=d.isIE?function(_b0){
if(_8){
return (_b0.getAttribute("_uid")||_b0.setAttribute("_uid",++_ae)||_ae);
}else{
return _b0.uniqueID;
}
}:function(_b1){
return (_b1._uid||(_b1._uid=++_ae));
};
var _76=function(_b2,bag){
if(!bag){
return 1;
}
var id=_af(_b2);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _b3="_zipIdx";
var _b4=function(arr){
if(arr&&arr.nozip){
return (_3._wrap)?_3._wrap(arr):arr;
}
var ret=new _3();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_ae++;
if(d.isIE&&_8){
var _b5=_ae+"";
arr[0].setAttribute(_b3,_b5);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_b3)!=_b5){
ret.push(te);
}
te.setAttribute(_b3,_b5);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_21(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_b3]=_ae;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_b3]!=_ae){
ret.push(te);
}
te[_b3]=_ae;
}
}
}
return ret;
};
d.query=function(_b6,_b7){
_3=d._NodeListCtor;
if(!_b6){
return new _3();
}
if(_b6.constructor==_3){
return _b6;
}
if(typeof _b6!="string"){
return new _3(_b6);
}
if(typeof _b7=="string"){
_b7=d.byId(_b7);
if(!_b7){
return new _3();
}
}
_b7=_b7||_4();
var od=_b7.ownerDocument||_b7.documentElement;
_8=(_b7.contentType&&_b7.contentType=="application/xml")||(d.isOpera&&(_b7.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(_b7.xmlVersion||od.xmlVersion));
var r=_a3(_b6)(_b7);
if(r&&r.nozip&&!_3._wrap){
return r;
}
return _b4(r);
};
d.query.pseudos=_4c;
d._filterQueryResult=function(_b8,_b9){
var _ba=new d._NodeListCtor();
var _bb=_5c(_a(_b9)[0]);
for(var x=0,te;te=_b8[x];x++){
if(_bb(te)){
_ba.push(te);
}
}
return _ba;
};
})(this["queryPortability"]||this["acme"]||dojo);
}
