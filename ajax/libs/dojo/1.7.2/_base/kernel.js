/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/kernel",["../has","./config","require","module"],function(_1,_2,_3,_4){
var i,p,_5={},_6={},_7={config:_2,global:this,dijit:_5,dojox:_6};
var _8={dojo:["dojo",_7],dijit:["dijit",_5],dojox:["dojox",_6]},_9=(_3.packs&&_3.packs[_4.id.match(/[^\/]+/)[0]].packageMap)||{},_a;
for(p in _9){
if(_8[p]){
_8[p][0]=_9[p];
}else{
_8[p]=[_9[p],{}];
}
}
for(p in _8){
_a=_8[p];
_a[1]._scopeName=_a[0];
if(!_2.noGlobals){
this[_a[0]]=_a[1];
}
}
_7.scopeMap=_8;
_7.baseUrl=_7.config.baseUrl=_3.baseUrl;
_7.isAsync=!1||_3.async;
_7.locale=_2.locale;
var _b="$Rev: 27913 $".match(/\d+/);
_7.version={major:1,minor:7,patch:2,flag:"",revision:_b?+_b[0]:NaN,toString:function(){
var v=_7.version;
return v.major+"."+v.minor+"."+v.patch+v.flag+" ("+v.revision+")";
}};
true||_1.add("extend-dojo",1);
_7.eval=function(_c){
};
(Function("d","d.eval = function(){return d.global.eval ? d.global.eval(arguments[0]) : eval(arguments[0]);}"))(_7);
if(0){
_7.exit=function(_d){
quit(_d);
};
}else{
_7.exit=function(){
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
var _e=tn+"";
console[_e]=("log" in console)?function(){
var a=Array.apply({},arguments);
a.unshift(_e+":");
console["log"](a.join(" "));
}:function(){
};
console[_e]._fake=true;
})();
}
}
}
_1.add("dojo-debug-messages",!!_2.isDebug);
if(_1("dojo-debug-messages")){
_7.deprecated=function(_f,_10,_11){
var _12="DEPRECATED: "+_f;
if(_10){
_12+=" "+_10;
}
if(_11){
_12+=" -- will be removed in version: "+_11;
}
console.warn(_12);
};
_7.experimental=function(_13,_14){
var _15="EXPERIMENTAL: "+_13+" -- APIs subject to change without notice.";
if(_14){
_15+=" "+_14;
}
console.warn(_15);
};
}else{
_7.deprecated=_7.experimental=function(){
};
}
true||_1.add("dojo-modulePaths",1);
if(1){
if(_2.modulePaths){
_7.deprecated("dojo.modulePaths","use paths configuration");
var _16={};
for(p in _2.modulePaths){
_16[p.replace(/\./g,"/")]=_2.modulePaths[p];
}
_3({paths:_16});
}
}
true||_1.add("dojo-moduleUrl",1);
if(1){
_7.moduleUrl=function(_17,url){
_7.deprecated("dojo.moduleUrl()","use require.toUrl","2.0");
var _18=null;
if(_17){
_18=_3.toUrl(_17.replace(/\./g,"/")+(url?("/"+url):"")+"/*.*").replace(/\/\*\.\*/,"")+(url?"":"/");
}
return _18;
};
}
_7._hasResource={};
return _7;
});
