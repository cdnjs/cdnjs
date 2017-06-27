/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.i18n"]){
dojo._hasResource["dojo.i18n"]=true;
dojo.provide("dojo.i18n");
dojo.i18n.getLocalization=function(_1,_2,_3){
_3=dojo.i18n.normalizeLocale(_3);
var _4=_3.split("-");
var _5=[_1,"nls",_2].join(".");
var _6=dojo._loadedModules[_5];
if(_6){
var _7;
for(var i=_4.length;i>0;i--){
var _9=_4.slice(0,i).join("_");
if(_6[_9]){
_7=_6[_9];
break;
}
}
if(!_7){
_7=_6.ROOT;
}
if(_7){
var _a=function(){
};
_a.prototype=_7;
return new _a();
}
}
throw new Error("Bundle not found: "+_2+" in "+_1+" , locale="+_3);
};
dojo.i18n.normalizeLocale=function(_b){
var _c=_b?_b.toLowerCase():dojo.locale;
if(_c=="root"){
_c="ROOT";
}
return _c;
};
dojo.i18n._requireLocalization=function(_d,_e,_f,_10){
var _11=dojo.i18n.normalizeLocale(_f);
var _12=[_d,"nls",_e].join(".");
var _13="";
if(_10){
var _14=_10.split(",");
for(var i=0;i<_14.length;i++){
if(_11["indexOf"](_14[i])==0){
if(_14[i].length>_13.length){
_13=_14[i];
}
}
}
if(!_13){
_13="ROOT";
}
}
var _16=_10?_13:_11;
var _17=dojo._loadedModules[_12];
var _18=null;
if(_17){
if(dojo.config.localizationComplete&&_17._built){
return;
}
var _19=_16.replace(/-/g,"_");
var _1a=_12+"."+_19;
_18=dojo._loadedModules[_1a];
}
if(!_18){
_17=dojo["provide"](_12);
var _1b=dojo._getModuleSymbols(_d);
var _1c=_1b.concat("nls").join("/");
var _1d;
dojo.i18n._searchLocalePath(_16,_10,function(loc){
var _1f=loc.replace(/-/g,"_");
var _20=_12+"."+_1f;
var _21=false;
if(!dojo._loadedModules[_20]){
dojo["provide"](_20);
var _22=[_1c];
if(loc!="ROOT"){
_22.push(loc);
}
_22.push(_e);
var _23=_22.join("/")+".js";
_21=dojo._loadPath(_23,null,function(_24){
var _25=function(){
};
_25.prototype=_1d;
_17[_1f]=new _25();
for(var j in _24){
_17[_1f][j]=_24[j];
}
});
}else{
_21=true;
}
if(_21&&_17[_1f]){
_1d=_17[_1f];
}else{
_17[_1f]=_1d;
}
if(_10){
return true;
}
});
}
if(_10&&_11!=_13){
_17[_11.replace(/-/g,"_")]=_17[_13.replace(/-/g,"_")];
}
};
(function(){
var _27=dojo.config.extraLocale;
if(_27){
if(!_27 instanceof Array){
_27=[_27];
}
var req=dojo.i18n._requireLocalization;
dojo.i18n._requireLocalization=function(m,b,_2b,_2c){
req(m,b,_2b,_2c);
if(_2b){
return;
}
for(var i=0;i<_27.length;i++){
req(m,b,_27[i],_2c);
}
};
}
})();
dojo.i18n._searchLocalePath=function(_2e,_2f,_30){
_2e=dojo.i18n.normalizeLocale(_2e);
var _31=_2e.split("-");
var _32=[];
for(var i=_31.length;i>0;i--){
_32.push(_31.slice(0,i).join("-"));
}
_32.push(false);
if(_2f){
_32.reverse();
}
for(var j=_32.length-1;j>=0;j--){
var loc=_32[j]||"ROOT";
var _36=_30(loc);
if(_36){
break;
}
}
};
dojo.i18n._preloadLocalizations=function(_37,_38){
function _39(_3a){
_3a=dojo.i18n.normalizeLocale(_3a);
dojo.i18n._searchLocalePath(_3a,true,function(loc){
for(var i=0;i<_38.length;i++){
if(_38[i]==loc){
dojo["require"](_37+"_"+loc);
return true;
}
}
return false;
});
};
_39();
var _3d=dojo.config.extraLocale||[];
for(var i=0;i<_3d.length;i++){
_39(_3d[i]);
}
};
}
