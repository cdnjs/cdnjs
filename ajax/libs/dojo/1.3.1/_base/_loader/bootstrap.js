/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


(function(){
if(typeof this["loadFirebugConsole"]=="function"){
this["loadFirebugConsole"]();
}else{
this.console=this.console||{};
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var i=0,tn;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _4=tn+"";
console[_4]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_4+":");
console["log"](a.join(" "));
}:function(){
};
})();
}
}
}
if(typeof dojo=="undefined"){
this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};
}
var d=dojo;
if(typeof dijit=="undefined"){
this.dijit={_scopeName:"dijit"};
}
if(typeof dojox=="undefined"){
this.dojox={_scopeName:"dojox"};
}
if(!d._scopeArgs){
d._scopeArgs=[dojo,dijit,dojox];
}
d.global=this;
d.config={isDebug:false,debugAtAllCosts:false};
if(typeof djConfig!="undefined"){
for(var _7 in djConfig){
d.config[_7]=djConfig[_7];
}
}
dojo.locale=d.config.locale;
var _8="$Rev: 17468 $".match(/\d+/);
dojo.version={major:1,minor:3,patch:1,flag:"",revision:_8?+_8[0]:NaN,toString:function(){
with(d.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
if(typeof OpenAjax!="undefined"){
OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());
}
var _9={};
dojo._mixin=function(_a,_b){
for(var x in _b){
if(_9[x]===undefined||_9[x]!=_b[x]){
_a[x]=_b[x];
}
}
if(d.isIE&&_b){
var p=_b.toString;
if(typeof p=="function"&&p!=_a.toString&&p!=_9.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){
_a.toString=_b.toString;
}
}
return _a;
};
dojo.mixin=function(_e,_f){
if(!_e){
_e={};
}
for(var i=1,l=arguments.length;i<l;i++){
d._mixin(_e,arguments[i]);
}
return _e;
};
dojo._getProp=function(_12,_13,_14){
var obj=_14||d.global;
for(var i=0,p;obj&&(p=_12[i]);i++){
if(i==0&&this._scopeMap[p]){
p=this._scopeMap[p];
}
obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));
}
return obj;
};
dojo.setObject=function(_18,_19,_1a){
var _1b=_18.split("."),p=_1b.pop(),obj=d._getProp(_1b,true,_1a);
return obj&&p?(obj[p]=_19):undefined;
};
dojo.getObject=function(_1e,_1f,_20){
return d._getProp(_1e.split("."),_1f,_20);
};
dojo.exists=function(_21,obj){
return !!d.getObject(_21,false,obj);
};
dojo["eval"]=function(_23){
return d.global.eval?d.global.eval(_23):eval(_23);
};
d.deprecated=d.experimental=function(){
};
})();
