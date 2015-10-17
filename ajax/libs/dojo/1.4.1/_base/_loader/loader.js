/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.foo"]){
dojo._hasResource["dojo.foo"]=true;
(function(){
var d=dojo;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1){
var mp=d._modulePrefixes;
return !!(mp[_1]&&mp[_1].value);
},_getModulePrefix:function(_2){
var mp=d._modulePrefixes;
if(d._moduleHasPrefix(_2)){
return mp[_2].value;
}
return _2;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_3,_4,cb){
var _5=((_3.charAt(0)=="/"||_3.match(/^\w+:/))?"":d.baseUrl)+_3;
try{
return !_4?d._loadUri(_5,cb):d._loadUriAndCheck(_5,_4,cb);
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(_6,cb){
if(d._loadedUrls[_6]){
return true;
}
d._inFlightCount++;
var _7=d._getText(_6,true);
if(_7){
d._loadedUrls[_6]=true;
d._loadedUrls.push(_6);
if(cb){
_7="("+_7+")";
}else{
_7=d._scopePrefix+_7+d._scopeSuffix;
}
if(!d.isIE){
_7+="\r\n//@ sourceURL="+_6;
}
var _8=d["eval"](_7);
if(cb){
cb(_8);
}
}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){
setTimeout(function(){
if(d._inFlightCount==0){
d._callLoaded();
}
},0);
}
return !!_7;
};
dojo._loadUriAndCheck=function(_9,_a,cb){
var ok=false;
try{
ok=d._loadUri(_9,cb);
}
catch(e){
console.error("failed loading "+_9+" with error: "+e);
}
return !!(ok&&d._loadedModules[_a]);
};
dojo.loaded=function(){
d._loadNotifying=true;
d._postLoad=true;
var _b=d._loaders;
d._loaders=[];
for(var x=0;x<_b.length;x++){
_b[x]();
}
d._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&_b.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var _c=d._unloaders;
while(_c.length){
(_c.pop())();
}
};
d._onto=function(_d,_e,fn){
if(!fn){
_d.push(_e);
}else{
if(fn){
var _f=(typeof fn=="string")?_e[fn]:fn;
_d.push(function(){
_f.call(_e);
});
}
}
};
dojo.ready=dojo.addOnLoad=function(obj,_10){
d._onto(d._loaders,obj,_10);
if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){
d._callLoaded();
}
};
var dca=d.config.addOnLoad;
if(dca){
d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);
}
dojo._modulesLoaded=function(){
if(d._postLoad){
return;
}
if(d._inFlightCount>0){
console.warn("files still in flight!");
return;
}
d._callLoaded();
};
dojo._callLoaded=function(){
if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){
setTimeout(d.isAIR?function(){
d.loaded();
}:d._scopeName+".loaded();",0);
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_11){
var _12=_11.split(".");
for(var i=_12.length;i>0;i--){
var _13=_12.slice(0,i).join(".");
if(i==1&&!d._moduleHasPrefix(_13)){
_12[0]="../"+_12[0];
}else{
var _14=d._getModulePrefix(_13);
if(_14!=_13){
_12.splice(0,i,_14);
break;
}
}
}
return _12;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_15){
_15();
};
dojo._loadModule=dojo.require=function(_16,_17){
_17=d._global_omit_module_check||_17;
var _18=d._loadedModules[_16];
if(_18){
return _18;
}
var _19=d._getModuleSymbols(_16).join("/")+".js";
var _1a=!_17?_16:null;
var ok=d._loadPath(_19,_1a);
if(!ok&&!_17){
throw new Error("Could not load '"+_16+"'; last tried '"+_19+"'");
}
if(!_17&&!d._isXDomain){
_18=d._loadedModules[_16];
if(!_18){
throw new Error("symbol '"+_16+"' is not defined after loading '"+_19+"'");
}
}
return _18;
};
dojo.provide=function(_1b){
_1b=_1b+"";
return (d._loadedModules[_1b]=d.getObject(_1b,true));
};
dojo.platformRequire=function(_1c){
var _1d=_1c.common||[];
var _1e=_1d.concat(_1c[d._name]||_1c["default"]||[]);
for(var x=0;x<_1e.length;x++){
var _1f=_1e[x];
if(_1f.constructor==Array){
d._loadModule.apply(d,_1f);
}else{
d._loadModule(_1f);
}
}
};
dojo.requireIf=function(_20,_21){
if(_20===true){
var _22=[];
for(var i=1;i<arguments.length;i++){
_22.push(arguments[i]);
}
d.require.apply(d,_22);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_23,_24){
d._modulePrefixes[_23]={name:_23,value:_24};
};
dojo.requireLocalization=function(_25,_26,_27,_28){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null,_29=arguments,uri=[_29[0]];
for(var i=1;i<_29.length;i++){
if(!_29[i]){
continue;
}
var _2a=new d._Url(_29[i]+""),_2b=new d._Url(uri[0]+"");
if(_2a.path==""&&!_2a.scheme&&!_2a.authority&&!_2a.query){
if(_2a.fragment!=n){
_2b.fragment=_2a.fragment;
}
_2a=_2b;
}else{
if(!_2a.scheme){
_2a.scheme=_2b.scheme;
if(!_2a.authority){
_2a.authority=_2b.authority;
if(_2a.path.charAt(0)!="/"){
var _2c=_2b.path.substring(0,_2b.path.lastIndexOf("/")+1)+_2a.path;
var _2d=_2c.split("/");
for(var j=0;j<_2d.length;j++){
if(_2d[j]=="."){
if(j==_2d.length-1){
_2d[j]="";
}else{
_2d.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_2d[0]=="")&&_2d[j]==".."&&_2d[j-1]!=".."){
if(j==(_2d.length-1)){
_2d.splice(j,1);
_2d[j-1]="";
}else{
_2d.splice(j-1,2);
j-=2;
}
}
}
}
_2a.path=_2d.join("/");
}
}
}
}
uri=[];
if(_2a.scheme){
uri.push(_2a.scheme,":");
}
if(_2a.authority){
uri.push("//",_2a.authority);
}
uri.push(_2a.path);
if(_2a.query){
uri.push("?",_2a.query);
}
if(_2a.fragment){
uri.push("#",_2a.fragment);
}
}
this.uri=uri.join("");
var r=this.uri.match(ore);
this.scheme=r[2]||(r[1]?"":n);
this.authority=r[4]||(r[3]?"":n);
this.path=r[5];
this.query=r[7]||(r[6]?"":n);
this.fragment=r[9]||(r[8]?"":n);
if(this.authority!=n){
r=this.authority.match(ire);
this.user=r[3]||n;
this.password=r[4]||n;
this.host=r[6]||r[7];
this.port=r[9]||n;
}
};
dojo._Url.prototype.toString=function(){
return this.uri;
};
dojo.moduleUrl=function(_2e,url){
var loc=d._getModuleSymbols(_2e).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _2f=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_2f==-1||_2f>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
}
