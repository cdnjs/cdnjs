/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
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
var _2=d.trim;
var _3=d.forEach;
var _4=d._queryListCtor=d.NodeList;
var _5=d.isString;
var _6=function(){
return d.doc;
};
var _7=(d.isWebKit&&((_6().compatMode)=="BackCompat"));
var _8=!!_6().firstChild["children"]?"children":"childNodes";
var _9=">~+";
var _a=false;
var _b=function(){
return true;
};
var _c=function(_d){
if(_9.indexOf(_d.slice(-1))>=0){
_d+=" * ";
}else{
_d+=" ";
}
var ts=function(s,e){
return _2(_d.slice(s,e));
};
var _11=[];
var _12=-1,_13=-1,_14=-1,_15=-1,_16=-1,_17=-1,_18=-1,lc="",cc="",_1b;
var x=0,ql=_d.length,_1e=null,_cp=null;
var _20=function(){
if(_18>=0){
var tv=(_18==x)?null:ts(_18,x);
_1e[(_9.indexOf(tv)<0)?"tag":"oper"]=tv;
_18=-1;
}
};
var _22=function(){
if(_17>=0){
_1e.id=ts(_17,x).replace(/\\/g,"");
_17=-1;
}
};
var _23=function(){
if(_16>=0){
_1e.classes.push(ts(_16+1,x).replace(/\\/g,""));
_16=-1;
}
};
var _24=function(){
_22();
_20();
_23();
};
var _25=function(){
_24();
if(_15>=0){
_1e.pseudos.push({name:ts(_15+1,x)});
}
_1e.loops=(_1e.pseudos.length||_1e.attrs.length||_1e.classes.length);
_1e.oquery=_1e.query=ts(_1b,x);
_1e.otag=_1e.tag=(_1e["oper"])?null:(_1e.tag||"*");
if(_1e.tag){
_1e.tag=_1e.tag.toUpperCase();
}
if(_11.length&&(_11[_11.length-1].oper)){
_1e.infixOper=_11.pop();
_1e.query=_1e.infixOper.query+" "+_1e.query;
}
_11.push(_1e);
_1e=null;
};
for(;lc=cc,cc=_d.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_1e){
_1b=x;
_1e={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return (_a)?this.otag:this.tag;
}};
_18=x;
}
if(_12>=0){
if(cc=="]"){
if(!_cp.attr){
_cp.attr=ts(_12+1,x);
}else{
_cp.matchFor=ts((_14||_12+1),x);
}
var cmf=_cp.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_cp.matchFor=cmf.slice(1,-1);
}
}
_1e.attrs.push(_cp);
_cp=null;
_12=_14=-1;
}else{
if(cc=="="){
var _27=("|~^$*".indexOf(lc)>=0)?lc:"";
_cp.type=_27+cc;
_cp.attr=ts(_12+1,x-_27.length);
_14=x+1;
}
}
}else{
if(_13>=0){
if(cc==")"){
if(_15>=0){
_cp.value=ts(_13+1,x);
}
_15=_13=-1;
}
}else{
if(cc=="#"){
_24();
_17=x+1;
}else{
if(cc=="."){
_24();
_16=x;
}else{
if(cc==":"){
_24();
_15=x;
}else{
if(cc=="["){
_24();
_12=x;
_cp={};
}else{
if(cc=="("){
if(_15>=0){
_cp={name:ts(_15+1,x),value:null};
_1e.pseudos.push(_cp);
}
_13=x;
}else{
if((cc==" ")&&(lc!=cc)){
_25();
}
}
}
}
}
}
}
}
}
return _11;
};
var _28=function(_29,_2a){
if(!_29){
return _2a;
}
if(!_2a){
return _29;
}
return function(){
return _29.apply(window,arguments)&&_2a.apply(window,arguments);
};
};
var _2b=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _2f=function(n){
return (1==n.nodeType);
};
var _31="";
var _32=function(_33,_34){
if(!_33){
return _31;
}
if(_34=="class"){
return _33.className||_31;
}
if(_34=="for"){
return _33.htmlFor||_31;
}
if(_34=="style"){
return _33.style.cssText||_31;
}
return (_a?_33.getAttribute(_34):_33.getAttribute(_34,2))||_31;
};
var _35={"*=":function(_36,_37){
return function(_38){
return (_32(_38,_36).indexOf(_37)>=0);
};
},"^=":function(_39,_3a){
return function(_3b){
return (_32(_3b,_39).indexOf(_3a)==0);
};
},"$=":function(_3c,_3d){
var _3e=" "+_3d;
return function(_3f){
var ea=" "+_32(_3f,_3c);
return (ea.lastIndexOf(_3d)==(ea.length-_3d.length));
};
},"~=":function(_41,_42){
var _43=" "+_42+" ";
return function(_44){
var ea=" "+_32(_44,_41)+" ";
return (ea.indexOf(_43)>=0);
};
},"|=":function(_46,_47){
var _48=" "+_47+"-";
return function(_49){
var ea=" "+_32(_49,_46);
return ((ea==_47)||(ea.indexOf(_48)==0));
};
},"=":function(_4b,_4c){
return function(_4d){
return (_32(_4d,_4b)==_4c);
};
}};
var _4e=(typeof _6().firstChild.nextElementSibling=="undefined");
var _ns=!_4e?"nextElementSibling":"nextSibling";
var _ps=!_4e?"previousElementSibling":"previousSibling";
var _51=(_4e?_2f:_b);
var _52=function(_53){
while(_53=_53[_ps]){
if(_51(_53)){
return false;
}
}
return true;
};
var _54=function(_55){
while(_55=_55[_ns]){
if(_51(_55)){
return false;
}
}
return true;
};
var _56=function(_57){
var _58=_57.parentNode;
var i=0,_5a=_58[_8],ci=(_57["_i"]||-1),cl=(_58["_l"]||-1);
if(!_5a){
return -1;
}
var l=_5a.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
_58["_l"]=l;
ci=-1;
for(var te=_58["firstElementChild"]||_58["firstChild"];te;te=te[_ns]){
if(_51(te)){
te["_i"]=++i;
if(_57===te){
ci=i;
}
}
}
return ci;
};
var _5f=function(_60){
return !((_56(_60))%2);
};
var _61=function(_62){
return ((_56(_62))%2);
};
var _63={"checked":function(_64,_65){
return function(_66){
return !!d.attr(_66,"checked");
};
},"first-child":function(){
return _52;
},"last-child":function(){
return _54;
},"only-child":function(_67,_68){
return function(_69){
if(!_52(_69)){
return false;
}
if(!_54(_69)){
return false;
}
return true;
};
},"empty":function(_6a,_6b){
return function(_6c){
var cn=_6c.childNodes;
var cnl=_6c.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"contains":function(_71,_72){
var cz=_72.charAt(0);
if(cz=="\""||cz=="'"){
_72=_72.slice(1,-1);
}
return function(_74){
return (_74.innerHTML.indexOf(_72)>=0);
};
},"not":function(_75,_76){
var p=_c(_76)[0];
var _78={el:1};
if(p.tag!="*"){
_78.tag=1;
}
if(!p.classes.length){
_78.classes=1;
}
var ntf=_7a(p,_78);
return function(_7b){
return (!ntf(_7b));
};
},"nth-child":function(_7c,_7d){
var pi=parseInt;
if(_7d=="odd"){
return _61;
}else{
if(_7d=="even"){
return _5f;
}
}
if(_7d.indexOf("n")!=-1){
var _7f=_7d.split("n",2);
var _80=_7f[0]?((_7f[0]=="-")?-1:pi(_7f[0])):1;
var idx=_7f[1]?pi(_7f[1]):0;
var lb=0,ub=-1;
if(_80>0){
if(idx<0){
idx=(idx%_80)&&(_80+(idx%_80));
}else{
if(idx>0){
if(idx>=_80){
lb=idx-idx%_80;
}
idx=idx%_80;
}
}
}else{
if(_80<0){
_80*=-1;
if(idx>0){
ub=idx;
idx=idx%_80;
}
}
}
if(_80>0){
return function(_84){
var i=_56(_84);
return (i>=lb)&&(ub<0||i<=ub)&&((i%_80)==idx);
};
}else{
_7d=idx;
}
}
var _86=pi(_7d);
return function(_87){
return (_56(_87)==_86);
};
}};
var _88=(d.isIE)?function(_89){
var clc=_89.toLowerCase();
if(clc=="class"){
_89="className";
}
return function(_8b){
return (_a?_8b.getAttribute(_89):_8b[_89]||_8b[clc]);
};
}:function(_8c){
return function(_8d){
return (_8d&&_8d.getAttribute&&_8d.hasAttribute(_8c));
};
};
var _7a=function(_8e,_8f){
if(!_8e){
return _b;
}
_8f=_8f||{};
var ff=null;
if(!("el" in _8f)){
ff=_28(ff,_2f);
}
if(!("tag" in _8f)){
if(_8e.tag!="*"){
ff=_28(ff,function(_91){
return (_91&&(_91.tagName==_8e.getTag()));
});
}
}
if(!("classes" in _8f)){
_3(_8e.classes,function(_92,idx,arr){
var re=new RegExp("(?:^|\\s)"+_92+"(?:\\s|$)");
ff=_28(ff,function(_96){
return re.test(_96.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _8f)){
_3(_8e.pseudos,function(_97){
var pn=_97.name;
if(_63[pn]){
ff=_28(ff,_63[pn](pn,_97.value));
}
});
}
if(!("attrs" in _8f)){
_3(_8e.attrs,function(_99){
var _9a;
var a=_99.attr;
if(_99.type&&_35[_99.type]){
_9a=_35[_99.type](a,_99.matchFor);
}else{
if(a.length){
_9a=_88(a);
}
}
if(_9a){
ff=_28(ff,_9a);
}
});
}
if(!("id" in _8f)){
if(_8e.id){
ff=_28(ff,function(_9c){
return (!!_9c&&(_9c.id==_8e.id));
});
}
}
if(!ff){
if(!("default" in _8f)){
ff=_b;
}
}
return ff;
};
var _9d=function(_9e){
return function(_9f,ret,bag){
while(_9f=_9f[_ns]){
if(_4e&&(!_2f(_9f))){
continue;
}
if((!bag||_a2(_9f,bag))&&_9e(_9f)){
ret.push(_9f);
}
break;
}
return ret;
};
};
var _a3=function(_a4){
return function(_a5,ret,bag){
var te=_a5[_ns];
while(te){
if(_51(te)){
if(bag&&!_a2(te,bag)){
break;
}
if(_a4(te)){
ret.push(te);
}
}
te=te[_ns];
}
return ret;
};
};
var _a9=function(_aa){
_aa=_aa||_b;
return function(_ab,ret,bag){
var te,x=0,_b0=_ab[_8];
while(te=_b0[x++]){
if(_51(te)&&(!bag||_a2(te,bag))&&(_aa(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _b1=function(_b2,_b3){
var pn=_b2.parentNode;
while(pn){
if(pn==_b3){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _b5={};
var _b6=function(_b7){
var _b8=_b5[_b7.query];
if(_b8){
return _b8;
}
var io=_b7.infixOper;
var _ba=(io?io.oper:"");
var _bb=_7a(_b7,{el:1});
var qt=_b7.tag;
var _bd=("*"==qt);
var ecs=_6()["getElementsByClassName"];
if(!_ba){
if(_b7.id){
_bb=(!_b7.loops&&_bd)?_b:_7a(_b7,{el:1,id:1});
_b8=function(_bf,arr){
var te=d.byId(_b7.id,(_bf.ownerDocument||_bf));
if(!te||!_bb(te)){
return;
}
if(9==_bf.nodeType){
return _2b(te,arr);
}else{
if(_b1(te,_bf)){
return _2b(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_b7.classes.length&&!_7){
_bb=_7a(_b7,{el:1,classes:1,id:1});
var _c2=_b7.classes.join(" ");
_b8=function(_c3,arr,bag){
var ret=_2b(0,arr),te,x=0;
var _c9=_c3.getElementsByClassName(_c2);
while((te=_c9[x++])){
if(_bb(te,_c3)&&_a2(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_bd&&!_b7.loops){
_b8=function(_ca,arr,bag){
var ret=_2b(0,arr),te,x=0;
var _d0=_ca.getElementsByTagName(_b7.getTag());
while((te=_d0[x++])){
if(_a2(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_bb=_7a(_b7,{el:1,tag:1,id:1});
_b8=function(_d1,arr,bag){
var ret=_2b(0,arr),te,x=0;
var _d7=_d1.getElementsByTagName(_b7.getTag());
while((te=_d7[x++])){
if(_bb(te,_d1)&&_a2(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _d8={el:1};
if(_bd){
_d8.tag=1;
}
_bb=_7a(_b7,_d8);
if("+"==_ba){
_b8=_9d(_bb);
}else{
if("~"==_ba){
_b8=_a3(_bb);
}else{
if(">"==_ba){
_b8=_a9(_bb);
}
}
}
}
return _b5[_b7.query]=_b8;
};
var _d9=function(_da,_db){
var _dc=_2b(_da),qp,x,te,qpl=_db.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_db[i];
x=_dc.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_b6(qp);
while(te=_dc[x--]){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_dc=ret;
}
return ret;
};
var _e5={},_e6={};
var _e7=function(_e8){
var _e9=_c(_2(_e8));
if(_e9.length==1){
var tef=_b6(_e9[0]);
return function(_eb){
var r=tef(_eb,new _4());
if(r){
r.nozip=true;
}
return r;
};
}
return function(_ed){
return _d9(_ed,_e9);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _f0=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _f1=d.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _f3=(!!_6()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_f0));
var _f4=function(_f5,_f6){
if(_f3){
var _f7=_e6[_f5];
if(_f7&&!_f6){
return _f7;
}
}
var _f8=_e5[_f5];
if(_f8){
return _f8;
}
var qcz=_f5.charAt(0);
var _fa=(-1==_f5.indexOf(" "));
if((_f5.indexOf("#")>=0)&&(_fa)){
_f6=true;
}
var _fb=(_f3&&(!_f6)&&(_9.indexOf(qcz)==-1)&&(!d.isIE||(_f5.indexOf(":")==-1))&&(!(_7&&(_f5.indexOf(".")>=0)))&&(_f5.indexOf(":contains")==-1)&&(_f5.indexOf("|=")==-1));
if(_fb){
var tq=(_9.indexOf(_f5.charAt(_f5.length-1))>=0)?(_f5+" *"):_f5;
return _e6[_f5]=function(_fd){
try{
if(!((9==_fd.nodeType)||_fa)){
throw "";
}
var r=_fd[qsa](tq);
r[_f1]=true;
return r;
}
catch(e){
return _f4(_f5,true)(_fd);
}
};
}else{
var _ff=_f5.split(/\s*,\s*/);
return _e5[_f5]=((_ff.length<2)?_e7(_f5):function(root){
var _101=0,ret=[],tp;
while((tp=_ff[_101++])){
ret=ret.concat(_e7(tp)(root));
}
return ret;
});
}
};
var _104=0;
var _105=d.isIE?function(node){
if(_a){
return (node.getAttribute("_uid")||node.setAttribute("_uid",++_104)||_104);
}else{
return node.uniqueID;
}
}:function(node){
return (node._uid||(node._uid=++_104));
};
var _a2=function(node,bag){
if(!bag){
return 1;
}
var id=_105(node);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _10b="_zipIdx";
var _zip=function(arr){
if(arr&&arr.nozip){
return (_4._wrap)?_4._wrap(arr):arr;
}
var ret=new _4();
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_104++;
if(d.isIE&&_a){
var _10f=_104+"";
arr[0].setAttribute(_10b,_10f);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_10b)!=_10f){
ret.push(te);
}
te.setAttribute(_10b,_10f);
}
}else{
if(d.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_2f(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_10b]=_104;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_10b]!=_104){
ret.push(te);
}
te[_10b]=_104;
}
}
}
return ret;
};
d.query=function(_112,root){
_4=d._queryListCtor;
if(!_112){
return new _4();
}
if(_112.constructor==_4){
return _112;
}
if(!_5(_112)){
return new _4(_112);
}
if(_5(root)){
root=d.byId(root);
if(!root){
return new _4();
}
}
root=root||_6();
var od=root.ownerDocument||root.documentElement;
_a=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));
var r=_f4(_112)(root);
if(r&&r.nozip&&!_4._wrap){
return r;
}
return _zip(r);
};
d.query.pseudos=_63;
d._filterQueryResult=function(_116,_117){
var _118=new d._queryListCtor();
var _119=_7a(_c(_117)[0]);
for(var x=0,te;te=_116[x];x++){
if(_119(te)){
_118.push(te);
}
}
return _118;
};
})(this["queryPortability"]||this["acme"]||dojo);
}
