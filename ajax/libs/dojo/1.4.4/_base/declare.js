/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.array");
(function(){
var d=dojo,_1=d._mixin,op=Object.prototype,_2=op.toString,_3=new Function,_4=0,_5="constructor";
function _6(_7){
throw new Error("declare: "+_7);
};
function _8(_9){
var _a=[],_b=[{cls:0,refs:[]}],_c={},_d=1,l=_9.length,i=0,j,_e,_f,top,_10,rec,_11,_12;
for(;i<l;++i){
_f=_9[i];
if(!_f){
_6("mixin #"+i+" is null");
}
_e=_f._meta?_f._meta.bases:[_f];
top=0;
for(j=_e.length-1;j>=0;--j){
_10=_e[j].prototype;
if(!_10.hasOwnProperty("declaredClass")){
_10.declaredClass="uniqName_"+(_4++);
}
_11=_10.declaredClass;
if(!_c.hasOwnProperty(_11)){
_c[_11]={count:0,refs:[],cls:_e[j]};
++_d;
}
rec=_c[_11];
if(top&&top!==rec){
rec.refs.push(top);
++top.count;
}
top=rec;
}
++top.count;
_b[0].refs.push(top);
}
while(_b.length){
top=_b.pop();
_a.push(top.cls);
--_d;
while(_12=top.refs,_12.length==1){
top=_12[0];
if(!top||--top.count){
top=0;
break;
}
_a.push(top.cls);
--_d;
}
if(top){
for(i=0,l=_12.length;i<l;++i){
top=_12[i];
if(!--top.count){
_b.push(top);
}
}
}
}
if(_d){
_6("can't build consistent linearization");
}
_f=_9[0];
_a[0]=_f?_f._meta&&_f===_a[_a.length-_f._meta.bases.length]?_f._meta.bases.length:1:0;
return _a;
};
function _13(_14,a,f){
var _15,_16,_17,_18,_19,_1a,_1b,opf,pos,_1c=this._inherited=this._inherited||{};
if(typeof _14=="string"){
_15=_14;
_14=a;
a=f;
}
f=0;
_18=_14.callee;
_15=_15||_18.nom;
if(!_15){
_6("can't deduce a name to call inherited()");
}
_19=this.constructor._meta;
_17=_19.bases;
pos=_1c.p;
if(_15!=_5){
if(_1c.c!==_18){
pos=0;
_1a=_17[0];
_19=_1a._meta;
if(_19.hidden[_15]!==_18){
_16=_19.chains;
if(_16&&typeof _16[_15]=="string"){
_6("calling chained method with inherited: "+_15);
}
do{
_19=_1a._meta;
_1b=_1a.prototype;
if(_19&&(_1b[_15]===_18&&_1b.hasOwnProperty(_15)||_19.hidden[_15]===_18)){
break;
}
}while(_1a=_17[++pos]);
pos=_1a?pos:-1;
}
}
_1a=_17[++pos];
if(_1a){
_1b=_1a.prototype;
if(_1a._meta&&_1b.hasOwnProperty(_15)){
f=_1b[_15];
}else{
opf=op[_15];
do{
_1b=_1a.prototype;
f=_1b[_15];
if(f&&(_1a._meta?_1b.hasOwnProperty(_15):f!==opf)){
break;
}
}while(_1a=_17[++pos]);
}
}
f=_1a&&f||op[_15];
}else{
if(_1c.c!==_18){
pos=0;
_19=_17[0]._meta;
if(_19&&_19.ctor!==_18){
_16=_19.chains;
if(!_16||_16.constructor!=="manual"){
_6("calling chained constructor with inherited");
}
while(_1a=_17[++pos]){
_19=_1a._meta;
if(_19&&_19.ctor===_18){
break;
}
}
pos=_1a?pos:-1;
}
}
while(_1a=_17[++pos]){
_19=_1a._meta;
f=_19?_19.ctor:_1a;
if(f){
break;
}
}
f=_1a&&f;
}
_1c.c=f;
_1c.p=pos;
if(f){
return a===true?f:f.apply(this,a||_14);
}
};
function _1d(_1e,_1f){
if(typeof _1e=="string"){
return this.inherited(_1e,_1f,true);
}
return this.inherited(_1e,true);
};
function _20(cls){
var _21=this.constructor._meta.bases;
for(var i=0,l=_21.length;i<l;++i){
if(_21[i]===cls){
return true;
}
}
return this instanceof cls;
};
function _22(_23,_24){
var _25,t,i=0,l=d._extraNames.length;
for(_25 in _24){
t=_24[_25];
if((t!==op[_25]||!(_25 in op))&&_25!=_5){
if(_2.call(t)=="[object Function]"){
t.nom=_25;
}
_23[_25]=t;
}
}
for(;i<l;++i){
_25=d._extraNames[i];
t=_24[_25];
if((t!==op[_25]||!(_25 in op))&&_25!=_5){
if(_2.call(t)=="[object Function]"){
t.nom=_25;
}
_23[_25]=t;
}
}
return _23;
};
function _26(_27){
_22(this.prototype,_27);
return this;
};
function _28(_29,_2a){
return function(){
var a=arguments,_2b=a,a0=a[0],f,i,m,l=_29.length,_2c;
if(_2a&&(a0&&a0.preamble||this.preamble)){
_2c=new Array(_29.length);
_2c[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_29[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_2c[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_29[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_2c?_2c[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_2b);
}
};
};
function _2d(_2e,_2f){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(_2f){
if(a0){
f=a0.preamble;
if(f){
t=f.apply(this,t)||t;
}
}
f=this.preamble;
if(f){
f.apply(this,t);
}
}
if(_2e){
_2e.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _30(_31){
return function(){
var a=arguments,i=0,f;
for(;f=_31[i];++i){
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,a);
break;
}
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _32(_33,_34,_35){
return function(){
var b,m,f,i=0,_36=1;
if(_35){
i=_34.length-1;
_36=-1;
}
for(;b=_34[i];i+=_36){
m=b._meta;
f=(m?m.hidden:b.prototype)[_33];
if(f){
f.apply(this,arguments);
}
}
};
};
d.declare=function(_37,_38,_39){
var _3a,i,t,_3b,_3c,_3d,_3e,_3f=1,_40=_38;
if(typeof _37!="string"){
_39=_38;
_38=_37;
_37="";
}
_39=_39||{};
if(_2.call(_38)=="[object Array]"){
_3d=_8(_38);
t=_3d[0];
_3f=_3d.length-t;
_38=_3d[_3f];
}else{
_3d=[0];
if(_38){
t=_38._meta;
_3d=_3d.concat(t?t.bases:_38);
}
}
if(_38){
for(i=_3f-1;;--i){
_3.prototype=_38.prototype;
_3a=new _3;
if(!i){
break;
}
t=_3d[i];
_1(_3a,t._meta?t._meta.hidden:t.prototype);
_3b=new Function;
_3b.superclass=_38;
_3b.prototype=_3a;
_38=_3a.constructor=_3b;
}
}else{
_3a={};
}
_22(_3a,_39);
t=_39.constructor;
if(t!==op.constructor){
t.nom=_5;
_3a.constructor=t;
}
_3.prototype=0;
for(i=_3f-1;i;--i){
t=_3d[i]._meta;
if(t&&t.chains){
_3e=_1(_3e||{},t.chains);
}
}
if(_3a["-chains-"]){
_3e=_1(_3e||{},_3a["-chains-"]);
}
t=!_3e||!_3e.hasOwnProperty(_5);
_3d[0]=_3b=(_3e&&_3e.constructor==="manual")?_30(_3d):(_3d.length==1?_2d(_39.constructor,t):_28(_3d,t));
_3b._meta={bases:_3d,hidden:_39,chains:_3e,parents:_40,ctor:_39.constructor};
_3b.superclass=_38&&_38.prototype;
_3b.extend=_26;
_3b.prototype=_3a;
_3a.constructor=_3b;
_3a.getInherited=_1d;
_3a.inherited=_13;
_3a.isInstanceOf=_20;
if(_37){
_3a.declaredClass=_37;
d.setObject(_37,_3b);
}
if(_3e){
for(_3c in _3e){
if(_3a[_3c]&&typeof _3e[_3c]=="string"&&_3c!=_5){
t=_3a[_3c]=_32(_3c,_3d,_3e[_3c]==="after");
t.nom=_3c;
}
}
}
return _3b;
};
d.safeMixin=_22;
})();
}
