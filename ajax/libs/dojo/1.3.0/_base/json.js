/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.json"]){
dojo._hasResource["dojo._base.json"]=true;
dojo.provide("dojo._base.json");
dojo.fromJson=function(_1){
return eval("("+_1+")");
};
dojo._escapeString=function(_2){
return ("\""+_2.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.toJsonIndentStr="\t";
dojo.toJson=function(it,_4,_5){
if(it===undefined){
return "undefined";
}
var _6=typeof it;
if(_6=="number"||_6=="boolean"){
return it+"";
}
if(it===null){
return "null";
}
if(dojo.isString(it)){
return dojo._escapeString(it);
}
var _7=arguments.callee;
var _8;
_5=_5||"";
var _9=_4?_5+dojo.toJsonIndentStr:"";
var tf=it.__json__||it.json;
if(dojo.isFunction(tf)){
_8=tf.call(it);
if(it!==_8){
return _7(_8,_4,_9);
}
}
if(it.nodeType&&it.cloneNode){
throw new Error("Can't serialize DOM nodes");
}
var _b=_4?" ":"";
var _c=_4?"\n":"";
if(dojo.isArray(it)){
var _d=dojo.map(it,function(_e){
var _f=_7(_e,_4,_9);
if(typeof _f!="string"){
_f="undefined";
}
return _c+_9+_f;
});
return "["+_d.join(","+_b)+_c+_5+"]";
}
if(_6=="function"){
return null;
}
var _10=[],key;
for(key in it){
var _12,val;
if(typeof key=="number"){
_12="\""+key+"\"";
}else{
if(typeof key=="string"){
_12=dojo._escapeString(key);
}else{
continue;
}
}
val=_7(it[key],_4,_9);
if(typeof val!="string"){
continue;
}
_10.push(_c+_9+_12+":"+_b+val);
}
return "{"+_10.join(","+_b)+_c+_5+"}";
};
}
