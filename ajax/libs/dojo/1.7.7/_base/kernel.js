/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/kernel",["../has","./config","require","module"],function(_1,_2,_3,_4){
var i,p,_5=(function(){
return this;
})(),_6={},_7={},_8={config:_2,global:_5,dijit:_6,dojox:_7};
var _9={dojo:["dojo",_8],dijit:["dijit",_6],dojox:["dojox",_7]},_a=(_3.packs&&_3.packs[_4.id.match(/[^\/]+/)[0]].packageMap)||{},_b;
for(p in _a){
if(_9[p]){
_9[p][0]=_a[p];
}else{
_9[p]=[_a[p],{}];
}
}
for(p in _9){
_b=_9[p];
_b[1]._scopeName=_b[0];
if(!_2.noGlobals){
_5[_b[0]]=_b[1];
}
}
_8.scopeMap=_9;
_8.baseUrl=_8.config.baseUrl=_3.baseUrl;
_8.isAsync=!1||_3.async;
_8.locale=_2.locale;
var _c="$Rev: e740308 $".match(/[0-9a-f]{7,}/);
_8.version={major:1,minor:7,patch:7,flag:"",revision:_c?_c[0]:NaN,toString:function(){
var v=_8.version;
return v.major+"."+v.minor+"."+v.patch+v.flag+" ("+v.revision+")";
}};
true||_1.add("extend-dojo",1);
_8.eval=function(_d){
};
(Function("d","d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(_8);
if(0){
_8.exit=function(_e){
quit(_e);
};
}else{
_8.exit=function(){
};
}
true||_1.add("dojo-guarantee-console",1);
if(1){
typeof console!="undefined"||(console={});
var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];
var tn;
i=0;
while((tn=cn[i++])){
if(!console[tn]){
(function(){
var _f=tn+"";
console[_f]=("log" in console)?function(){
var a=Array.prototype.slice.call(arguments);
a.unshift(_f+":");
console["log"](a.join(" "));
}:function(){
};
console[_f]._fake=true;
})();
}
}
}
_1.add("dojo-debug-messages",!!_2.isDebug);
if(_1("dojo-debug-messages")){
_8.deprecated=function(_10,_11,_12){
var _13="DEPRECATED: "+_10;
if(_11){
_13+=" "+_11;
}
if(_12){
_13+=" -- will be removed in version: "+_12;
}
console.warn(_13);
};
_8.experimental=function(_14,_15){
var _16="EXPERIMENTAL: "+_14+" -- APIs subject to change without notice.";
if(_15){
_16+=" "+_15;
}
console.warn(_16);
};
}else{
_8.deprecated=_8.experimental=function(){
};
}
true||_1.add("dojo-modulePaths",1);
if(1){
if(_2.modulePaths){
_8.deprecated("dojo.modulePaths","use paths configuration");
var _17={};
for(p in _2.modulePaths){
_17[p.replace(/\./g,"/")]=_2.modulePaths[p];
}
_3({paths:_17});
}
}
true||_1.add("dojo-moduleUrl",1);
if(1){
_8.moduleUrl=function(_18,url){
_8.deprecated("dojo.moduleUrl()","use require.toUrl","2.0");
var _19=null;
if(_18){
_19=_3.toUrl(_18.replace(/\./g,"/")+(url?("/"+url):"")+"/*.*").replace(/\/\*\.\*/,"")+(url?"":"/");
}
return _19;
};
}
_8._hasResource={};
return _8;
});
