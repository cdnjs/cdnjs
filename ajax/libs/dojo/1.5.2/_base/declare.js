/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
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
_6("mixin #"+i+" is unknown. Did you use dojo.require to pull it in?");
}else{
if(_2.call(_f)!="[object Function]"){
_6("mixin #"+i+" is not a callable constructor.");
}
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
var _25,i=0,l=d._extraNames.length;
for(_25 in _24){
if(_25!=_5&&_24.hasOwnProperty(_25)){
_23[_25]=_24[_25];
}
}
for(;i<l;++i){
_25=d._extraNames[i];
if(_25!=_5&&_24.hasOwnProperty(_25)){
_23[_25]=_24[_25];
}
}
};
function _26(_27,_28){
var _29,t,i=0,l=d._extraNames.length;
for(_29 in _28){
t=_28[_29];
if((t!==op[_29]||!(_29 in op))&&_29!=_5){
if(_2.call(t)=="[object Function]"){
t.nom=_29;
}
_27[_29]=t;
}
}
for(;i<l;++i){
_29=d._extraNames[i];
t=_28[_29];
if((t!==op[_29]||!(_29 in op))&&_29!=_5){
if(_2.call(t)=="[object Function]"){
t.nom=_29;
}
_27[_29]=t;
}
}
return _27;
};
function _2a(_2b){
_26(this.prototype,_2b);
return this;
};
function _2c(_2d,_2e){
return function(){
var a=arguments,_2f=a,a0=a[0],f,i,m,l=_2d.length,_30;
if(!(this instanceof a.callee)){
return _31(a);
}
if(_2e&&(a0&&a0.preamble||this.preamble)){
_30=new Array(_2d.length);
_30[0]=a;
for(i=0;;){
a0=a[0];
if(a0){
f=a0.preamble;
if(f){
a=f.apply(this,a)||a;
}
}
f=_2d[i].prototype;
f=f.hasOwnProperty("preamble")&&f.preamble;
if(f){
a=f.apply(this,a)||a;
}
if(++i==l){
break;
}
_30[i]=a;
}
}
for(i=l-1;i>=0;--i){
f=_2d[i];
m=f._meta;
f=m?m.ctor:f;
if(f){
f.apply(this,_30?_30[i]:a);
}
}
f=this.postscript;
if(f){
f.apply(this,_2f);
}
};
};
function _32(_33,_34){
return function(){
var a=arguments,t=a,a0=a[0],f;
if(!(this instanceof a.callee)){
return _31(a);
}
if(_34){
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
if(_33){
_33.apply(this,a);
}
f=this.postscript;
if(f){
f.apply(this,a);
}
};
};
function _35(_36){
return function(){
var a=arguments,i=0,f,m;
if(!(this instanceof a.callee)){
return _31(a);
}
for(;f=_36[i];++i){
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
function _37(_38,_39,_3a){
return function(){
var b,m,f,i=0,_3b=1;
if(_3a){
i=_39.length-1;
_3b=-1;
}
for(;b=_39[i];i+=_3b){
m=b._meta;
f=(m?m.hidden:b.prototype)[_38];
if(f){
f.apply(this,arguments);
}
}
};
};
function _3c(_3d){
_3.prototype=_3d.prototype;
var t=new _3;
_3.prototype=null;
return t;
};
function _31(_3e){
var _3f=_3e.callee,t=_3c(_3f);
_3f.apply(t,_3e);
return t;
};
d.declare=function(_40,_41,_42){
if(typeof _40!="string"){
_42=_41;
_41=_40;
_40="";
}
_42=_42||{};
var _43,i,t,_44,_45,_46,_47,_48=1,_49=_41;
if(_2.call(_41)=="[object Array]"){
_46=_8(_41);
t=_46[0];
_48=_46.length-t;
_41=_46[_48];
}else{
_46=[0];
if(_41){
if(_2.call(_41)=="[object Function]"){
t=_41._meta;
_46=_46.concat(t?t.bases:_41);
}else{
_6("base class is not a callable constructor.");
}
}else{
if(_41!==null){
_6("unknown base class. Did you use dojo.require to pull it in?");
}
}
}
if(_41){
for(i=_48-1;;--i){
_43=_3c(_41);
if(!i){
break;
}
t=_46[i];
(t._meta?_22:_1)(_43,t.prototype);
_44=new Function;
_44.superclass=_41;
_44.prototype=_43;
_41=_43.constructor=_44;
}
}else{
_43={};
}
_26(_43,_42);
t=_42.constructor;
if(t!==op.constructor){
t.nom=_5;
_43.constructor=t;
}
for(i=_48-1;i;--i){
t=_46[i]._meta;
if(t&&t.chains){
_47=_1(_47||{},t.chains);
}
}
if(_43["-chains-"]){
_47=_1(_47||{},_43["-chains-"]);
}
t=!_47||!_47.hasOwnProperty(_5);
_46[0]=_44=(_47&&_47.constructor==="manual")?_35(_46):(_46.length==1?_32(_42.constructor,t):_2c(_46,t));
_44._meta={bases:_46,hidden:_42,chains:_47,parents:_49,ctor:_42.constructor};
_44.superclass=_41&&_41.prototype;
_44.extend=_2a;
_44.prototype=_43;
_43.constructor=_44;
_43.getInherited=_1d;
_43.inherited=_13;
_43.isInstanceOf=_20;
if(_40){
_43.declaredClass=_40;
d.setObject(_40,_44);
}
if(_47){
for(_45 in _47){
if(_43[_45]&&typeof _47[_45]=="string"&&_45!=_5){
t=_43[_45]=_37(_45,_46,_47[_45]==="after");
t.nom=_45;
}
}
}
return _44;
};
d.safeMixin=_26;
})();
}
