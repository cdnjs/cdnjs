/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(it){
return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _3=function(it){
var t=typeof it;
return it&&(t=="function"||it instanceof Function);
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _3(it);
}:_3;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_b,_c){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_b.prototype,arguments[i]);
}
return _b;
};
dojo._hitchArgs=function(_f,_10){
var pre=dojo._toArray(arguments,2);
var _12=dojo.isString(_10);
return function(){
var _13=dojo._toArray(arguments);
var f=_12?(_f||dojo.global)[_10]:_10;
return f&&f.apply(_f||this,pre.concat(_13));
};
};
dojo.hitch=function(_15,_16){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_16){
_16=_15;
_15=null;
}
if(dojo.isString(_16)){
_15=_15||dojo.global;
if(!_15[_16]){
throw (["dojo.hitch: scope[\"",_16,"\"] is null (scope=\"",_15,"\")"].join(""));
}
return function(){
return _15[_16].apply(_15,arguments||[]);
};
}
return !_15?_16:function(){
return _16.apply(_15,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_19){
TMP.prototype=obj;
var tmp=new TMP();
if(_19){
dojo._mixin(tmp,_19);
}
return tmp;
};
})();
(function(){
var _1b=function(obj,_1d,_1e){
return (_1e||[]).concat(Array.prototype.slice.call(obj,_1d||0));
};
var _1f=function(obj,_21,_22){
var arr=_22||[];
for(var x=_21||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=dojo.isIE?function(obj){
return ((obj.item)?_1f:_1b).apply(this,arguments);
}:_1b;
})();
dojo.partial=function(_26){
var arr=[null];
return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));
};
dojo.clone=function(o){
if(!o){
return o;
}
if(dojo.isArray(o)){
var r=[];
for(var i=0;i<o.length;++i){
r.push(dojo.clone(o[i]));
}
return r;
}
if(!dojo.isObject(o)){
return o;
}
if(o.nodeType&&o.cloneNode){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
r=new o.constructor();
for(i in o){
if(!(i in r)||r[i]!=o[i]){
r[i]=dojo.clone(o[i]);
}
}
return r;
};
dojo.trim=String.prototype.trim?function(str){
return str.trim();
}:function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
}
