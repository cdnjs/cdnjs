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
this._attrName=d._scopeName+"Type";
this._query="["+this._attrName+"]";
function _1(_2){
if(d.isString(_2)){
return "string";
}
if(typeof _2=="number"){
return "number";
}
if(typeof _2=="boolean"){
return "boolean";
}
if(d.isFunction(_2)){
return "function";
}
if(d.isArray(_2)){
return "array";
}
if(_2 instanceof Date){
return "date";
}
if(_2 instanceof d._Url){
return "url";
}
return "object";
};
function _3(_4,_5){
switch(_5){
case "string":
return _4;
case "number":
return _4.length?Number(_4):NaN;
case "boolean":
return typeof _4=="boolean"?_4:!(_4.toLowerCase()=="false");
case "function":
if(d.isFunction(_4)){
_4=_4.toString();
_4=d.trim(_4.substring(_4.indexOf("{")+1,_4.length-1));
}
try{
if(_4.search(/[^\w\.]+/i)!=-1){
return new Function(_4);
}else{
return d.getObject(_4,false);
}
}
catch(e){
return new Function();
}
case "array":
return _4?_4.split(/\s*,\s*/):[];
case "date":
switch(_4){
case "":
return new Date("");
case "now":
return new Date();
default:
return d.date.stamp.fromISOString(_4);
}
case "url":
return d.baseUrl+_4;
default:
return d.fromJson(_4);
}
};
var _6={};
dojo.connect(dojo,"extend",function(){
_6={};
});
function _7(_8){
if(!_6[_8]){
var _9=d.getObject(_8);
if(!d.isFunction(_9)){
throw new Error("Could not load class '"+_8+"'. Did you spell the name correctly and use a full path, like 'dijit.form.Button'?");
}
var _a=_9.prototype;
var _b={},_c={};
for(var _d in _a){
if(_d.charAt(0)=="_"){
continue;
}
if(_d in _c){
continue;
}
var _e=_a[_d];
_b[_d]=_1(_e);
}
_6[_8]={cls:_9,params:_b};
}
return _6[_8];
};
this._functionFromScript=function(_f){
var _10="";
var _11="";
var _12=_f.getAttribute("args");
if(_12){
d.forEach(_12.split(/\s*,\s*/),function(_13,idx){
_10+="var "+_13+" = arguments["+idx+"]; ";
});
}
var _14=_f.getAttribute("with");
if(_14&&_14.length){
d.forEach(_14.split(/\s*,\s*/),function(_15){
_10+="with("+_15+"){";
_11+="}";
});
}
return new Function(_10+_f.innerHTML+_11);
};
this.instantiate=function(_16,_17,_18){
var _19=[],dp=dojo.parser;
_17=_17||{};
_18=_18||{};
d.forEach(_16,function(_1a){
if(!_1a){
return;
}
var _1b=dp._attrName in _17?_17[dp._attrName]:_1a.getAttribute(dp._attrName);
if(!_1b||!_1b.length){
return;
}
var _1c=_7(_1b),_1d=_1c.cls,ps=_1d._noScript||_1d.prototype._noScript;
var _1e={},_1f=_1a.attributes;
for(var _20 in _1c.params){
var _21=_20 in _17?{value:_17[_20],specified:true}:_1f.getNamedItem(_20);
if(!_21||(!_21.specified&&(!dojo.isIE||_20.toLowerCase()!="value"))){
continue;
}
var _22=_21.value;
switch(_20){
case "class":
_22="className" in _17?_17.className:_1a.className;
break;
case "style":
_22="style" in _17?_17.style:(_1a.style&&_1a.style.cssText);
}
var _23=_1c.params[_20];
if(typeof _22=="string"){
_1e[_20]=_3(_22,_23);
}else{
_1e[_20]=_22;
}
}
if(!ps){
var _24=[],_25=[];
d.query("> script[type^='dojo/']",_1a).orphan().forEach(function(_26){
var _27=_26.getAttribute("event"),_1b=_26.getAttribute("type"),nf=d.parser._functionFromScript(_26);
if(_27){
if(_1b=="dojo/connect"){
_24.push({event:_27,func:nf});
}else{
_1e[_27]=nf;
}
}else{
_25.push(nf);
}
});
}
var _28=_1d.markupFactory||_1d.prototype&&_1d.prototype.markupFactory;
var _29=_28?_28(_1e,_1a,_1d):new _1d(_1e,_1a);
_19.push(_29);
var _2a=_1a.getAttribute("jsId");
if(_2a){
d.setObject(_2a,_29);
}
if(!ps){
d.forEach(_24,function(_2b){
d.connect(_29,_2b.event,null,_2b.func);
});
d.forEach(_25,function(_2c){
_2c.call(_29);
});
}
});
if(!_17._started){
d.forEach(_19,function(_2d){
if(!_18.noStart&&_2d&&_2d.startup&&!_2d._started&&(!_2d.getParent||!_2d.getParent())){
_2d.startup();
}
});
}
return _19;
};
this.parse=function(_2e,_2f){
var _30;
if(!_2f&&_2e&&_2e.rootNode){
_2f=_2e;
_30=_2f.rootNode;
}else{
_30=_2e;
}
var _31=d.query(this._query,_30);
return this.instantiate(_31,null,_2f);
};
}();
(function(){
var _32=function(){
if(dojo.config.parseOnLoad){
dojo.parser.parse();
}
};
if(dojo.exists("dijit.wai.onload")&&(dijit.wai.onload===dojo._loaders[0])){
dojo._loaders.splice(1,0,_32);
}else{
dojo._loaders.unshift(_32);
}
})();
}
