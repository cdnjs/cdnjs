/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.parser"]){
dojo._hasResource["dojo.parser"]=true;
dojo.provide("dojo.parser");
dojo.require("dojo.date.stamp");
new Date("X");
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
if(_4===""||_4.search(/[^\w\.]+/i)!=-1){
return new Function(_4);
}else{
return d.getObject(_4,false)||new Function(_4);
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
if(!_9){
return null;
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
d.forEach(_16,function(obj){
if(!obj){
return;
}
var _1a,_1b,_1c,_1d,_1e;
if(obj.node){
_1a=obj.node;
_1b=obj.type;
_1c=obj.clsInfo||(_1b&&_7(_1b));
_1d=_1c&&_1c.cls;
_1e=obj.scripts;
}else{
_1a=obj;
_1b=dp._attrName in _17?_17[dp._attrName]:_1a.getAttribute(dp._attrName);
_1c=_1b&&_7(_1b);
_1d=_1c&&_1c.cls;
_1e=(_1d&&(_1d._noScript||_1d.prototype._noScript)?[]:d.query("> script[type^='dojo/']",_1a));
}
if(!_1c){
throw new Error("Could not load class '"+_1b);
}
var _1f={},_20=_1a.attributes;
if(_18.defaults){
dojo.mixin(_1f,_18.defaults);
}
if(obj.inherited){
dojo.mixin(_1f,obj.inherited);
}
for(var _21 in _1c.params){
var _22=_21 in _17?{value:_17[_21],specified:true}:_20.getNamedItem(_21);
if(!_22||(!_22.specified&&(!dojo.isIE||_21.toLowerCase()!="value"))){
continue;
}
var _23=_22.value;
switch(_21){
case "class":
_23="className" in _17?_17.className:_1a.className;
break;
case "style":
_23="style" in _17?_17.style:(_1a.style&&_1a.style.cssText);
}
var _24=_1c.params[_21];
if(typeof _23=="string"){
_1f[_21]=_3(_23,_24);
}else{
_1f[_21]=_23;
}
}
var _25=[],_26=[];
d.forEach(_1e,function(_27){
_1a.removeChild(_27);
var _28=_27.getAttribute("event"),_1b=_27.getAttribute("type"),nf=d.parser._functionFromScript(_27);
if(_28){
if(_1b=="dojo/connect"){
_25.push({event:_28,func:nf});
}else{
_1f[_28]=nf;
}
}else{
_26.push(nf);
}
});
var _29=_1d.markupFactory||_1d.prototype&&_1d.prototype.markupFactory;
var _2a=_29?_29(_1f,_1a,_1d):new _1d(_1f,_1a);
_19.push(_2a);
var _2b=_1a.getAttribute("jsId");
if(_2b){
d.setObject(_2b,_2a);
}
d.forEach(_25,function(_2c){
d.connect(_2a,_2c.event,null,_2c.func);
});
d.forEach(_26,function(_2d){
_2d.call(_2a);
});
});
if(!_17._started){
d.forEach(_19,function(_2e){
if(!_18.noStart&&_2e&&_2e.startup&&!_2e._started&&(!_2e.getParent||!_2e.getParent())){
_2e.startup();
}
});
}
return _19;
};
this.parse=function(_2f,_30){
var _31;
if(!_30&&_2f&&_2f.rootNode){
_30=_2f;
_31=_30.rootNode;
}else{
_31=_2f;
}
var _32=this._attrName;
function _33(_34,_35){
var _36=dojo.clone(_34.inherited);
dojo.forEach(["dir","lang"],function(_37){
var val=_34.node.getAttribute(_37);
if(val){
_36[_37]=val;
}
});
var _38=_34.scripts;
var _39=!_34.clsInfo||!_34.clsInfo.cls.prototype.stopParser;
for(var _3a=_34.node.firstChild;_3a;_3a=_3a.nextSibling){
if(_3a.nodeType==1){
var _3b=_39&&_3a.getAttribute(_32);
if(_3b){
var _3c={"type":_3b,clsInfo:_7(_3b),node:_3a,scripts:[],inherited:_36};
_35.push(_3c);
_33(_3c,_35);
}else{
if(_38&&_3a.nodeName.toLowerCase()=="script"){
_3b=_3a.getAttribute("type");
if(_3b&&/^dojo\//i.test(_3b)){
_38.push(_3a);
}
}else{
if(_39){
_33({node:_3a,inherited:_36},_35);
}
}
}
}
}
};
var _3d=[];
_33({node:_31?dojo.byId(_31):dojo.body(),inherited:(_30&&_30.inherited)||{dir:dojo._isBodyLtr()?"ltr":"rtl"}},_3d);
return this.instantiate(_3d,null,_30);
};
}();
(function(){
var _3e=function(){
if(dojo.config.parseOnLoad){
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
