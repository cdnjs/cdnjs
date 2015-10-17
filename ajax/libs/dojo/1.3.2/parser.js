/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
dojo.parser=new function(){
var d=dojo;
var _2=d._scopeName+"Type";
var _3="["+_2+"]";
var _4=0,_5={};
var _6=function(_7,_8){
var _9=_8||_5;
if(dojo.isIE){
var cn=_7["__dojoNameCache"];
if(cn&&_9[cn]===_7){
return cn;
}
}
var _b;
do{
_b="__"+_4++;
}while(_b in _9);
_9[_b]=_7;
return _b;
};
function _c(_d){
if(d.isString(_d)){
return "string";
}
if(typeof _d=="number"){
return "number";
}
if(typeof _d=="boolean"){
return "boolean";
}
if(d.isFunction(_d)){
return "function";
}
if(d.isArray(_d)){
return "array";
}
if(_d instanceof Date){
return "date";
}
if(_d instanceof d._Url){
return "url";
}
return "object";
};
function _e(_f,_10){
switch(_10){
case "string":
return _f;
case "number":
return _f.length?Number(_f):NaN;
case "boolean":
return typeof _f=="boolean"?_f:!(_f.toLowerCase()=="false");
case "function":
if(d.isFunction(_f)){
_f=_f.toString();
_f=d.trim(_f.substring(_f.indexOf("{")+1,_f.length-1));
}
try{
if(_f.search(/[^\w\.]+/i)!=-1){
_f=_6(new Function(_f),this);
}
return d.getObject(_f,false);
}
catch(e){
return new Function();
}
case "array":
return _f?_f.split(/\s*,\s*/):[];
case "date":
switch(_f){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_f);
}
case "url":
return d.baseUrl+_f;
default:
return d.fromJson(_f);
}
};
var _11={};
function _12(_13){
if(!_11[_13]){
var cls=d.getObject(_13);
if(!d.isFunction(cls)){
throw new Error("Could not load class '"+_13+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
}
var _15=cls.prototype;
var _16={},_17={};
for(var _18 in _15){
if(_18.charAt(0)=="_"){
continue;
}
if(_18 in _17){
continue;
}
var _19=_15[_18];
_16[_18]=_c(_19);
}
_11[_13]={cls:cls,params:_16};
}
return _11[_13];
};
this._functionFromScript=function(_1a){
var _1b="";
var _1c="";
var _1d=_1a.getAttribute("args");
if(_1d){
d.forEach(_1d.split(/\s*,\s*/),function(_1e,idx){
_1b+="var "+_1e+" = arguments["+idx+"]; ";
});
}
var _20=_1a.getAttribute("with");
if(_20&&_20.length){
d.forEach(_20.split(/\s*,\s*/),function(_21){
_1b+="with("+_21+"){";
_1c+="}";
});
}
return new Function(_1b+_1a.innerHTML+_1c);
};
this.instantiate=function(_22,_23){
var _24=[];
_23=_23||{};
d.forEach(_22,function(_25){
if(!_25){
return;
}
var _26=_2 in _23?_23[_2]:_25.getAttribute(_2);
if(!_26||!_26.length){
return;
}
var _27=_12(_26),_28=_27.cls,ps=_28._noScript||_28.prototype._noScript;
var _2a={},_2b=_25.attributes;
for(var _2c in _27.params){
var _2d=_2c in _23?{value:_23[_2c],specified:true}:_2b.getNamedItem(_2c);
if(!_2d||(!_2d.specified&&(!dojo.isIE||_2c.toLowerCase()!="value"))){
continue;
}
var _2e=_2d.value;
switch(_2c){
case "class":
_2e="className" in _23?_23.className:_25.className;
break;
case "style":
_2e="style" in _23?_23.style:(_25.style&&_25.style.cssText);
}
var _2f=_27.params[_2c];
if(typeof _2e=="string"){
_2a[_2c]=_e(_2e,_2f);
}else{
_2a[_2c]=_2e;
}
}
if(!ps){
var _30=[],_31=[];
d.query("> script[type^='dojo/']",_25).orphan().forEach(function(_32){
var _33=_32.getAttribute("event"),_26=_32.getAttribute("type"),nf=d.parser._functionFromScript(_32);
if(_33){
if(_26=="dojo/connect"){
_30.push({event:_33,func:nf});
}else{
_2a[_33]=nf;
}
}else{
_31.push(nf);
}
});
}
var _35=_28["markupFactory"];
if(!_35&&_28["prototype"]){
_35=_28.prototype["markupFactory"];
}
var _36=_35?_35(_2a,_25,_28):new _28(_2a,_25);
_24.push(_36);
var _37=_25.getAttribute("jsId");
if(_37){
d.setObject(_37,_36);
}
if(!ps){
d.forEach(_30,function(_38){
d.connect(_36,_38.event,null,_38.func);
});
d.forEach(_31,function(_39){
_39.call(_36);
});
}
});
d.forEach(_24,function(_3a){
if(_3a&&_3a.startup&&!_3a._started&&(!_3a.getParent||!_3a.getParent())){
_3a.startup();
}
});
return _24;
};
this.parse=function(_3b){
var _3c=d.query(_3,_3b);
var _3d=this.instantiate(_3c);
return _3d;
};
}();
(function(){
var _3e=function(){
if(dojo.config["parseOnLoad"]==true){
dojo.parser.parse();
}
};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){
dojo._loaders.splice(1,0,_3e);
}else{
dojo._loaders.unshift(_3e);
}
})();
}
