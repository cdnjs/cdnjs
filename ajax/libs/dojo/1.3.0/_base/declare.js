/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.declare"]){
dojo._hasResource["dojo._base.declare"]=true;
dojo.provide("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.declare=function(_1,_2,_3){
var dd=arguments.callee,_5;
if(dojo.isArray(_2)){
_5=_2;
_2=_5.shift();
}
if(_5){
dojo.forEach(_5,function(m,i){
if(!m){
throw (_1+": mixin #"+i+" is null");
}
_2=dd._delegate(_2,m);
});
}
var _8=dd._delegate(_2);
_3=_3||{};
_8.extend(_3);
dojo.extend(_8,{declaredClass:_1,_constructor:_3.constructor});
_8.prototype.constructor=_8;
return dojo.setObject(_1,_8);
};
dojo.mixin(dojo.declare,{_delegate:function(_9,_a){
var bp=(_9||0).prototype,mp=(_a||0).prototype,dd=dojo.declare;
var _e=dd._makeCtor();
dojo.mixin(_e,{superclass:bp,mixin:mp,extend:dd._extend});
if(_9){
_e.prototype=dojo._delegate(bp);
}
dojo.extend(_e,dd._core,mp||0,{_constructor:null,preamble:null});
_e.prototype.constructor=_e;
_e.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;
return _e;
},_extend:function(_f){
var i,fn;
for(i in _f){
if(dojo.isFunction(fn=_f[i])&&!0[i]){
fn.nom=i;
fn.ctor=this;
}
}
dojo.extend(this,_f);
},_makeCtor:function(){
return function(){
this._construct(arguments);
};
},_core:{_construct:function(_12){
var c=_12.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=_12,ii,fn;
if(a[0]){
if(((fn=a[0].preamble))){
a=fn.apply(this,a)||a;
}
}
if((fn=c.prototype.preamble)){
a=fn.apply(this,a)||a;
}
if(ct&&ct.apply){
ct.apply(this,a);
}
if(mct&&mct.apply){
mct.apply(this,a);
}
if((ii=c.prototype._constructor)){
ii.apply(this,_12);
}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){
ct.apply(this,_12);
}
},_findMixin:function(_1b){
var c=this.constructor,p,m;
while(c){
p=c.superclass;
m=c.mixin;
if(m==_1b||(m instanceof _1b.constructor)){
return p;
}
if(m&&m._findMixin&&(m=m._findMixin(_1b))){
return m;
}
c=p&&p.constructor;
}
},_findMethod:function(_1f,_20,_21,has){
var p=_21,c,m,f;
do{
c=p.constructor;
m=c.mixin;
if(m&&(m=this._findMethod(_1f,_20,m,has))){
return m;
}
if((f=p[_1f])&&(has==(f==_20))){
return p;
}
p=c.superclass;
}while(p);
return !has&&(p=this._findMixin(_21))&&this._findMethod(_1f,_20,p,has);
},inherited:function(_27,_28,_29){
var a=arguments;
if(!dojo.isString(a[0])){
_29=_28;
_28=_27;
_27=_28.callee.nom;
}
a=_29||_28;
var c=_28.callee,p=this.constructor.prototype,fn,mp;
if(this[_27]!=c||p[_27]==c){
mp=(c.ctor||0).superclass||this._findMethod(_27,c,p,true);
if(!mp){
throw (this.declaredClass+": inherited method \""+_27+"\" mismatch");
}
p=this._findMethod(_27,c,mp,false);
}
fn=p&&p[_27];
if(!fn){
throw (mp.declaredClass+": inherited method \""+_27+"\" not found");
}
return fn.apply(this,a);
}}});
}
