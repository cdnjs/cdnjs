/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.foo"]){
dojo._hasResource["dojo.foo"]=true;
(function(){
var d=dojo;
d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2){
var mp=this._modulePrefixes;
return !!(mp[_2]&&mp[_2].value);
},_getModulePrefix:function(_4){
var mp=this._modulePrefixes;
if(this._moduleHasPrefix(_4)){
return mp[_4].value;
}
return _4;
},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});
dojo._loadPath=function(_6,_7,cb){
var _9=((_6.charAt(0)=="/"||_6.match(/^\w+:/))?"":this.baseUrl)+_6;
try{
return !_7?this._loadUri(_9,cb):this._loadUriAndCheck(_9,_7,cb);
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(_a,cb){
if(this._loadedUrls[_a]){
return true;
}
var _c=this._getText(_a,true);
if(!_c){
return false;
}
this._loadedUrls[_a]=true;
this._loadedUrls.push(_a);
if(cb){
_c="("+_c+")";
}else{
_c=this._scopePrefix+_c+this._scopeSuffix;
}
if(d.isMoz){
_c+="\r\n//@ sourceURL="+_a;
}
var _d=d["eval"](_c);
if(cb){
cb(_d);
}
return true;
};
dojo._loadUriAndCheck=function(_e,_f,cb){
var ok=false;
try{
ok=this._loadUri(_e,cb);
}
catch(e){
console.error("failed loading "+_e+" with error: "+e);
}
return !!(ok&&this._loadedModules[_f]);
};
dojo.loaded=function(){
this._loadNotifying=true;
this._postLoad=true;
var mll=d._loaders;
this._loaders=[];
for(var x=0;x<mll.length;x++){
mll[x]();
}
this._loadNotifying=false;
if(d._postLoad&&d._inFlightCount==0&&mll.length){
d._callLoaded();
}
};
dojo.unloaded=function(){
var mll=d._unloaders;
while(mll.length){
(mll.pop())();
}
};
d._onto=function(arr,obj,fn){
if(!fn){
arr.push(obj);
}else{
if(fn){
var _18=(typeof fn=="string")?obj[fn]:fn;
arr.push(function(){
_18.call(obj);
});
}
}
};
dojo.addOnLoad=function(obj,_1a){
d._onto(d._loaders,obj,_1a);
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
if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){
if(dojo.isAIR){
setTimeout(function(){
dojo.loaded();
},0);
}else{
setTimeout(dojo._scopeName+".loaded();",0);
}
}else{
d.loaded();
}
};
dojo._getModuleSymbols=function(_1c){
var _1d=_1c.split(".");
for(var i=_1d.length;i>0;i--){
var _1f=_1d.slice(0,i).join(".");
if((i==1)&&!this._moduleHasPrefix(_1f)){
_1d[0]="../"+_1d[0];
}else{
var _20=this._getModulePrefix(_1f);
if(_20!=_1f){
_1d.splice(0,i,_20);
break;
}
}
}
return _1d;
};
dojo._global_omit_module_check=false;
dojo.loadInit=function(_21){
_21();
};
dojo._loadModule=dojo.require=function(_22,_23){
_23=this._global_omit_module_check||_23;
var _24=this._loadedModules[_22];
if(_24){
return _24;
}
var _25=this._getModuleSymbols(_22).join("/")+".js";
var _26=(!_23)?_22:null;
var ok=this._loadPath(_25,_26);
if(!ok&&!_23){
throw new Error("Could not load '"+_22+"'; last tried '"+_25+"'");
}
if(!_23&&!this._isXDomain){
_24=this._loadedModules[_22];
if(!_24){
throw new Error("symbol '"+_22+"' is not defined after loading '"+_25+"'");
}
}
return _24;
};
dojo.provide=function(_28){
_28=_28+"";
return (d._loadedModules[_28]=d.getObject(_28,true));
};
dojo.platformRequire=function(_29){
var _2a=_29.common||[];
var _2b=_2a.concat(_29[d._name]||_29["default"]||[]);
for(var x=0;x<_2b.length;x++){
var _2d=_2b[x];
if(_2d.constructor==Array){
d._loadModule.apply(d,_2d);
}else{
d._loadModule(_2d);
}
}
};
dojo.requireIf=function(_2e,_2f){
if(_2e===true){
var _30=[];
for(var i=1;i<arguments.length;i++){
_30.push(arguments[i]);
}
d.require.apply(d,_30);
}
};
dojo.requireAfterIf=d.requireIf;
dojo.registerModulePath=function(_32,_33){
d._modulePrefixes[_32]={name:_32,value:_33};
};
dojo.requireLocalization=function(_34,_35,_36,_37){
d.require("dojo.i18n");
d.i18n._requireLocalization.apply(d.hostenv,arguments);
};
var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");
var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");
dojo._Url=function(){
var n=null;
var _a=arguments;
var uri=[_a[0]];
for(var i=1;i<_a.length;i++){
if(!_a[i]){
continue;
}
var _3e=new d._Url(_a[i]+"");
var _3f=new d._Url(uri[0]+"");
if(_3e.path==""&&!_3e.scheme&&!_3e.authority&&!_3e.query){
if(_3e.fragment!=n){
_3f.fragment=_3e.fragment;
}
_3e=_3f;
}else{
if(!_3e.scheme){
_3e.scheme=_3f.scheme;
if(!_3e.authority){
_3e.authority=_3f.authority;
if(_3e.path.charAt(0)!="/"){
var _40=_3f.path.substring(0,_3f.path.lastIndexOf("/")+1)+_3e.path;
var _41=_40.split("/");
for(var j=0;j<_41.length;j++){
if(_41[j]=="."){
if(j==_41.length-1){
_41[j]="";
}else{
_41.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&_41[0]=="")&&_41[j]==".."&&_41[j-1]!=".."){
if(j==(_41.length-1)){
_41.splice(j,1);
_41[j-1]="";
}else{
_41.splice(j-1,2);
j-=2;
}
}
}
}
_3e.path=_41.join("/");
}
}
}
}
uri=[];
if(_3e.scheme){
uri.push(_3e.scheme,":");
}
if(_3e.authority){
uri.push("//",_3e.authority);
}
uri.push(_3e.path);
if(_3e.query){
uri.push("?",_3e.query);
}
if(_3e.fragment){
uri.push("#",_3e.fragment);
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
dojo.moduleUrl=function(_44,url){
var loc=d._getModuleSymbols(_44).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _47=loc.indexOf(":");
if(loc.charAt(0)!="/"&&(_47==-1||_47>loc.indexOf("/"))){
loc=d.baseUrl+loc;
}
return new d._Url(loc,url);
};
})();
}
