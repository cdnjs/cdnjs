/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/selector/acme",["../_base/kernel","../has","../dom","../_base/sniff","../_base/array","../_base/lang","../_base/window"],function(_1,_2,_3){
var _4=_1.trim;
var _5=_1.forEach;
var _6=function(){
return _1.doc;
};
var _7=(_6().compatMode)=="BackCompat";
var _8=">~+";
var _9=false;
var _a=function(){
return true;
};
var _b=function(_c){
if(_8.indexOf(_c.slice(-1))>=0){
_c+=" * ";
}else{
_c+=" ";
}
var ts=function(s,e){
return _4(_c.slice(s,e));
};
var _d=[];
var _e=-1,_f=-1,_10=-1,_11=-1,_12=-1,_13=-1,_14=-1,_15,lc="",cc="",_16;
var x=0,ql=_c.length,_17=null,_18=null;
var _19=function(){
if(_14>=0){
var tv=(_14==x)?null:ts(_14,x);
_17[(_8.indexOf(tv)<0)?"tag":"oper"]=tv;
_14=-1;
}
};
var _1a=function(){
if(_13>=0){
_17.id=ts(_13,x).replace(/\\/g,"");
_13=-1;
}
};
var _1b=function(){
if(_12>=0){
_17.classes.push(ts(_12+1,x).replace(/\\/g,""));
_12=-1;
}
};
var _1c=function(){
_1a();
_19();
_1b();
};
var _1d=function(){
_1c();
if(_11>=0){
_17.pseudos.push({name:ts(_11+1,x)});
}
_17.loops=(_17.pseudos.length||_17.attrs.length||_17.classes.length);
_17.oquery=_17.query=ts(_16,x);
_17.otag=_17.tag=(_17["oper"])?null:(_17.tag||"*");
if(_17.tag){
_17.tag=_17.tag.toUpperCase();
}
if(_d.length&&(_d[_d.length-1].oper)){
_17.infixOper=_d.pop();
_17.query=_17.infixOper.query+" "+_17.query;
}
_d.push(_17);
_17=null;
};
for(;lc=cc,cc=_c.charAt(x),x<ql;x++){
if(lc=="\\"){
continue;
}
if(!_17){
_16=x;
_17={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){
return _9?this.otag:this.tag;
}};
_14=x;
}
if(_15){
if(cc==_15){
_15=null;
}
continue;
}else{
if(cc=="'"||cc=="\""){
_15=cc;
continue;
}
}
if(_e>=0){
if(cc=="]"){
if(!_18.attr){
_18.attr=ts(_e+1,x);
}else{
_18.matchFor=ts((_10||_e+1),x);
}
var cmf=_18.matchFor;
if(cmf){
if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){
_18.matchFor=cmf.slice(1,-1);
}
}
if(_18.matchFor){
_18.matchFor=_18.matchFor.replace(/\\/g,"");
}
_17.attrs.push(_18);
_18=null;
_e=_10=-1;
}else{
if(cc=="="){
var _1e=("|~^$*".indexOf(lc)>=0)?lc:"";
_18.type=_1e+cc;
_18.attr=ts(_e+1,x-_1e.length);
_10=x+1;
}
}
}else{
if(_f>=0){
if(cc==")"){
if(_11>=0){
_18.value=ts(_f+1,x);
}
_11=_f=-1;
}
}else{
if(cc=="#"){
_1c();
_13=x+1;
}else{
if(cc=="."){
_1c();
_12=x;
}else{
if(cc==":"){
_1c();
_11=x;
}else{
if(cc=="["){
_1c();
_e=x;
_18={};
}else{
if(cc=="("){
if(_11>=0){
_18={name:ts(_11+1,x),value:null};
_17.pseudos.push(_18);
}
_f=x;
}else{
if((cc==" ")&&(lc!=cc)){
_1d();
}
}
}
}
}
}
}
}
}
return _d;
};
var _1f=function(_20,_21){
if(!_20){
return _21;
}
if(!_21){
return _20;
}
return function(){
return _20.apply(window,arguments)&&_21.apply(window,arguments);
};
};
var _22=function(i,arr){
var r=arr||[];
if(i){
r.push(i);
}
return r;
};
var _23=function(n){
return (1==n.nodeType);
};
var _24="";
var _25=function(_26,_27){
if(!_26){
return _24;
}
if(_27=="class"){
return _26.className||_24;
}
if(_27=="for"){
return _26.htmlFor||_24;
}
if(_27=="style"){
return _26.style.cssText||_24;
}
return (_9?_26.getAttribute(_27):_26.getAttribute(_27,2))||_24;
};
var _28={"*=":function(_29,_2a){
return function(_2b){
return (_25(_2b,_29).indexOf(_2a)>=0);
};
},"^=":function(_2c,_2d){
return function(_2e){
return (_25(_2e,_2c).indexOf(_2d)==0);
};
},"$=":function(_2f,_30){
return function(_31){
var ea=" "+_25(_31,_2f);
var _32=ea.lastIndexOf(_30);
return _32>-1&&(_32==(ea.length-_30.length));
};
},"~=":function(_33,_34){
var _35=" "+_34+" ";
return function(_36){
var ea=" "+_25(_36,_33)+" ";
return (ea.indexOf(_35)>=0);
};
},"|=":function(_37,_38){
var _39=_38+"-";
return function(_3a){
var ea=_25(_3a,_37);
return ((ea==_38)||(ea.indexOf(_39)==0));
};
},"=":function(_3b,_3c){
return function(_3d){
return (_25(_3d,_3b)==_3c);
};
}};
var _3e=(typeof _6().firstChild.nextElementSibling=="undefined");
var _3f=!_3e?"nextElementSibling":"nextSibling";
var _40=!_3e?"previousElementSibling":"previousSibling";
var _41=(_3e?_23:_a);
var _42=function(_43){
while(_43=_43[_40]){
if(_41(_43)){
return false;
}
}
return true;
};
var _44=function(_45){
while(_45=_45[_3f]){
if(_41(_45)){
return false;
}
}
return true;
};
var _46=function(_47){
var _48=_47.parentNode;
var i=0,_49=_48.children||_48.childNodes,ci=(_47["_i"]||-1),cl=(_48["_l"]||-1);
if(!_49){
return -1;
}
var l=_49.length;
if(cl==l&&ci>=0&&cl>=0){
return ci;
}
_48["_l"]=l;
ci=-1;
for(var te=_48["firstElementChild"]||_48["firstChild"];te;te=te[_3f]){
if(_41(te)){
te["_i"]=++i;
if(_47===te){
ci=i;
}
}
}
return ci;
};
var _4a=function(_4b){
return !((_46(_4b))%2);
};
var _4c=function(_4d){
return ((_46(_4d))%2);
};
var _4e={"checked":function(_4f,_50){
return function(_51){
return !!("checked" in _51?_51.checked:_51.selected);
};
},"first-child":function(){
return _42;
},"last-child":function(){
return _44;
},"only-child":function(_52,_53){
return function(_54){
return _42(_54)&&_44(_54);
};
},"empty":function(_55,_56){
return function(_57){
var cn=_57.childNodes;
var cnl=_57.childNodes.length;
for(var x=cnl-1;x>=0;x--){
var nt=cn[x].nodeType;
if((nt===1)||(nt==3)){
return false;
}
}
return true;
};
},"disabled":function(_58,_59){
return function(_5a){
return _5a.disabled;
};
},"enabled":function(_5b,_5c){
return function(_5d){
return !_5d.disabled;
};
},"contains":function(_5e,_5f){
var cz=_5f.charAt(0);
if(cz=="\""||cz=="'"){
_5f=_5f.slice(1,-1);
}
return function(_60){
return (_60.innerHTML.indexOf(_5f)>=0);
};
},"not":function(_61,_62){
var p=_b(_62)[0];
var _63={el:1};
if(p.tag!="*"){
_63.tag=1;
}
if(!p.classes.length){
_63.classes=1;
}
var ntf=_64(p,_63);
return function(_65){
return (!ntf(_65));
};
},"nth-child":function(_66,_67){
var pi=parseInt;
if(_67=="odd"){
return _4c;
}else{
if(_67=="even"){
return _4a;
}
}
if(_67.indexOf("n")!=-1){
var _68=_67.split("n",2);
var _69=_68[0]?((_68[0]=="-")?-1:pi(_68[0])):1;
var idx=_68[1]?pi(_68[1]):0;
var lb=0,ub=-1;
if(_69>0){
if(idx<0){
idx=(idx%_69)&&(_69+(idx%_69));
}else{
if(idx>0){
if(idx>=_69){
lb=idx-idx%_69;
}
idx=idx%_69;
}
}
}else{
if(_69<0){
_69*=-1;
if(idx>0){
ub=idx;
idx=idx%_69;
}
}
}
if(_69>0){
return function(_6a){
var i=_46(_6a);
return (i>=lb)&&(ub<0||i<=ub)&&((i%_69)==idx);
};
}else{
_67=idx;
}
}
var _6b=pi(_67);
return function(_6c){
return (_46(_6c)==_6b);
};
}};
var _6d=(_1.isIE<9||_1.isIE==9&&_1.isQuirks)?function(_6e){
var clc=_6e.toLowerCase();
if(clc=="class"){
_6e="className";
}
return function(_6f){
return (_9?_6f.getAttribute(_6e):_6f[_6e]||_6f[clc]);
};
}:function(_70){
return function(_71){
return (_71&&_71.getAttribute&&_71.hasAttribute(_70));
};
};
var _64=function(_72,_73){
if(!_72){
return _a;
}
_73=_73||{};
var ff=null;
if(!("el" in _73)){
ff=_1f(ff,_23);
}
if(!("tag" in _73)){
if(_72.tag!="*"){
ff=_1f(ff,function(_74){
return (_74&&(_74.tagName==_72.getTag()));
});
}
}
if(!("classes" in _73)){
_5(_72.classes,function(_75,idx,arr){
var re=new RegExp("(?:^|\\s)"+_75+"(?:\\s|$)");
ff=_1f(ff,function(_76){
return re.test(_76.className);
});
ff.count=idx;
});
}
if(!("pseudos" in _73)){
_5(_72.pseudos,function(_77){
var pn=_77.name;
if(_4e[pn]){
ff=_1f(ff,_4e[pn](pn,_77.value));
}
});
}
if(!("attrs" in _73)){
_5(_72.attrs,function(_78){
var _79;
var a=_78.attr;
if(_78.type&&_28[_78.type]){
_79=_28[_78.type](a,_78.matchFor);
}else{
if(a.length){
_79=_6d(a);
}
}
if(_79){
ff=_1f(ff,_79);
}
});
}
if(!("id" in _73)){
if(_72.id){
ff=_1f(ff,function(_7a){
return (!!_7a&&(_7a.id==_72.id));
});
}
}
if(!ff){
if(!("default" in _73)){
ff=_a;
}
}
return ff;
};
var _7b=function(_7c){
return function(_7d,ret,bag){
while(_7d=_7d[_3f]){
if(_3e&&(!_23(_7d))){
continue;
}
if((!bag||_7e(_7d,bag))&&_7c(_7d)){
ret.push(_7d);
}
break;
}
return ret;
};
};
var _7f=function(_80){
return function(_81,ret,bag){
var te=_81[_3f];
while(te){
if(_41(te)){
if(bag&&!_7e(te,bag)){
break;
}
if(_80(te)){
ret.push(te);
}
}
te=te[_3f];
}
return ret;
};
};
var _82=function(_83){
_83=_83||_a;
return function(_84,ret,bag){
var te,x=0,_85=_84.children||_84.childNodes;
while(te=_85[x++]){
if(_41(te)&&(!bag||_7e(te,bag))&&(_83(te,x))){
ret.push(te);
}
}
return ret;
};
};
var _86=function(_87,_88){
var pn=_87.parentNode;
while(pn){
if(pn==_88){
break;
}
pn=pn.parentNode;
}
return !!pn;
};
var _89={};
var _8a=function(_8b){
var _8c=_89[_8b.query];
if(_8c){
return _8c;
}
var io=_8b.infixOper;
var _8d=(io?io.oper:"");
var _8e=_64(_8b,{el:1});
var qt=_8b.tag;
var _8f=("*"==qt);
var ecs=_6()["getElementsByClassName"];
if(!_8d){
if(_8b.id){
_8e=(!_8b.loops&&_8f)?_a:_64(_8b,{el:1,id:1});
_8c=function(_90,arr){
var te=_3.byId(_8b.id,(_90.ownerDocument||_90));
if(!te||!_8e(te)){
return;
}
if(9==_90.nodeType){
return _22(te,arr);
}else{
if(_86(te,_90)){
return _22(te,arr);
}
}
};
}else{
if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_8b.classes.length&&!_7){
_8e=_64(_8b,{el:1,classes:1,id:1});
var _91=_8b.classes.join(" ");
_8c=function(_92,arr,bag){
var ret=_22(0,arr),te,x=0;
var _93=_92.getElementsByClassName(_91);
while((te=_93[x++])){
if(_8e(te,_92)&&_7e(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
if(!_8f&&!_8b.loops){
_8c=function(_94,arr,bag){
var ret=_22(0,arr),te,x=0;
var _95=_94.getElementsByTagName(_8b.getTag());
while((te=_95[x++])){
if(_7e(te,bag)){
ret.push(te);
}
}
return ret;
};
}else{
_8e=_64(_8b,{el:1,tag:1,id:1});
_8c=function(_96,arr,bag){
var ret=_22(0,arr),te,x=0;
var _97=_96.getElementsByTagName(_8b.getTag());
while((te=_97[x++])){
if(_8e(te,_96)&&_7e(te,bag)){
ret.push(te);
}
}
return ret;
};
}
}
}
}else{
var _98={el:1};
if(_8f){
_98.tag=1;
}
_8e=_64(_8b,_98);
if("+"==_8d){
_8c=_7b(_8e);
}else{
if("~"==_8d){
_8c=_7f(_8e);
}else{
if(">"==_8d){
_8c=_82(_8e);
}
}
}
}
return _89[_8b.query]=_8c;
};
var _99=function(_9a,_9b){
var _9c=_22(_9a),qp,x,te,qpl=_9b.length,bag,ret;
for(var i=0;i<qpl;i++){
ret=[];
qp=_9b[i];
x=_9c.length-1;
if(x>0){
bag={};
ret.nozip=true;
}
var gef=_8a(qp);
for(var j=0;(te=_9c[j]);j++){
gef(te,ret,bag);
}
if(!ret.length){
break;
}
_9c=ret;
}
return ret;
};
var _9d={},_9e={};
var _9f=function(_a0){
var _a1=_b(_4(_a0));
if(_a1.length==1){
var tef=_8a(_a1[0]);
return function(_a2){
var r=tef(_a2,[]);
if(r){
r.nozip=true;
}
return r;
};
}
return function(_a3){
return _99(_a3,_a1);
};
};
var nua=navigator.userAgent;
var wk="WebKit/";
var _a4=(_1.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));
var _a5=_1.isIE?"commentStrip":"nozip";
var qsa="querySelectorAll";
var _a6=(!!_6()[qsa]&&(!_1.isSafari||(_1.isSafari>3.1)||_a4));
var _a7=/\\[>~+]|n\+\d|([^ \\])?([>~+])([^ =])?/g;
var _a8=function(_a9,pre,ch,_aa){
return ch?(pre?pre+" ":"")+ch+(_aa?" "+_aa:""):_a9;
};
var _ab=/([^[]*)([^\]]*])?/g;
var _ac=function(_ad,_ae,att){
return _ae.replace(_a7,_a8)+(att||"");
};
var _af=function(_b0,_b1){
_b0=_b0.replace(_ab,_ac);
if(_a6){
var _b2=_9e[_b0];
if(_b2&&!_b1){
return _b2;
}
}
var _b3=_9d[_b0];
if(_b3){
return _b3;
}
var qcz=_b0.charAt(0);
var _b4=(-1==_b0.indexOf(" "));
if((_b0.indexOf("#")>=0)&&(_b4)){
_b1=true;
}
var _b5=(_a6&&(!_b1)&&(_8.indexOf(qcz)==-1)&&(!_1.isIE||(_b0.indexOf(":")==-1))&&(!(_7&&(_b0.indexOf(".")>=0)))&&(_b0.indexOf(":contains")==-1)&&(_b0.indexOf(":checked")==-1)&&(_b0.indexOf("|=")==-1));
if(_b5){
var tq=(_8.indexOf(_b0.charAt(_b0.length-1))>=0)?(_b0+" *"):_b0;
return _9e[_b0]=function(_b6){
try{
if(!((9==_b6.nodeType)||_b4)){
throw "";
}
var r=_b6[qsa](tq);
r[_a5]=true;
return r;
}
catch(e){
return _af(_b0,true)(_b6);
}
};
}else{
var _b7=_b0.match(/([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g);
return _9d[_b0]=((_b7.length<2)?_9f(_b0):function(_b8){
var _b9=0,ret=[],tp;
while((tp=_b7[_b9++])){
ret=ret.concat(_9f(tp)(_b8));
}
return ret;
});
}
};
var _ba=0;
var _bb=_1.isIE?function(_bc){
if(_9){
return (_bc.getAttribute("_uid")||_bc.setAttribute("_uid",++_ba)||_ba);
}else{
return _bc.uniqueID;
}
}:function(_bd){
return (_bd._uid||(_bd._uid=++_ba));
};
var _7e=function(_be,bag){
if(!bag){
return 1;
}
var id=_bb(_be);
if(!bag[id]){
return bag[id]=1;
}
return 0;
};
var _bf="_zipIdx";
var _c0=function(arr){
if(arr&&arr.nozip){
return arr;
}
var ret=[];
if(!arr||!arr.length){
return ret;
}
if(arr[0]){
ret.push(arr[0]);
}
if(arr.length<2){
return ret;
}
_ba++;
if(_1.isIE&&_9){
var _c1=_ba+"";
arr[0].setAttribute(_bf,_c1);
for(var x=1,te;te=arr[x];x++){
if(arr[x].getAttribute(_bf)!=_c1){
ret.push(te);
}
te.setAttribute(_bf,_c1);
}
}else{
if(_1.isIE&&arr.commentStrip){
try{
for(var x=1,te;te=arr[x];x++){
if(_23(te)){
ret.push(te);
}
}
}
catch(e){
}
}else{
if(arr[0]){
arr[0][_bf]=_ba;
}
for(var x=1,te;te=arr[x];x++){
if(arr[x][_bf]!=_ba){
ret.push(te);
}
te[_bf]=_ba;
}
}
}
return ret;
};
var _c2=function(_c3,_c4){
_c4=_c4||_6();
var od=_c4.ownerDocument||_c4;
_9=(od.createElement("div").tagName==="div");
var r=_af(_c3)(_c4);
if(r&&r.nozip){
return r;
}
return _c0(r);
};
_c2.filter=function(_c5,_c6,_c7){
var _c8=[],_c9=_b(_c6),_ca=(_c9.length==1&&!/[^\w#\.]/.test(_c6))?_64(_c9[0]):function(_cb){
return _1.query(_c6,_c7).indexOf(_cb)!=-1;
};
for(var x=0,te;te=_c5[x];x++){
if(_ca(te)){
_c8.push(te);
}
}
return _c8;
};
return _c2;
});
