/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr"],function(_1,_2,_3,_4,_5,_6,_7){
var _8=_1.i18n={},_9=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_a=function(_b,_c,_d,_e){
for(var _f=[_d+_e],_10=_c.split("-"),_11="",i=0;i<_10.length;i++){
_11+=(_11?"-":"")+_10[i];
if(!_b||_b[_11]){
_f.push(_d+_11+"/"+_e);
}
}
return _f;
},_12={},_13=_1.getL10nName=function(_14,_15,_16){
_16=_16?_16.toLowerCase():_1.locale;
_14="dojo/i18n!"+_14.replace(/\./g,"/");
_15=_15.replace(/\./g,"/");
return (/root/i.test(_16))?(_14+"/nls/"+_15):(_14+"/nls/"+_16+"/"+_15);
},_17=function(_18,_19,_1a,_1b,_1c,_1d){
_18([_19],function(_1e){
var _1f=_12[_19+"/"]=_6.clone(_1e.root),_20=_a(!_1e._v1x&&_1e,_1c,_1a,_1b);
_18(_20,function(){
for(var i=1;i<_20.length;i++){
_12[_20[i]]=_1f=_6.mixin(_6.clone(_1f),arguments[i]);
}
var _21=_19+"/"+_1c;
_12[_21]=_1f;
_1d&&_1d(_6.delegate(_1f));
});
});
},_22=function(id,_23){
var _24=_9.exec(id),_25=_24[1];
return /^\./.test(_25)?_23(_25)+"/"+id.substring(_25.length):id;
},_26=function(){
},_27=function(id,_28,_29){
var _2a=_9.exec(id),_2b=_2a[1]+"/",_2c=_2a[5]||_2a[4],_2d=_2b+_2c,_2e=(_2a[5]&&_2a[4]),_2f=_2e||_1.locale,_30=_2d+"/"+_2f;
if(_2e){
_26(_30);
if(_12[_30]){
_29(_12[_30]);
}else{
_17(_28,_2d,_2b,_2c,_2f,_29);
}
return;
}
var _31=_5.extraLocale||[];
_31=_6.isArray(_31)?_31:[_31];
_31.push(_2f);
var _32=_31.length,_33;
_4.forEach(_31,function(_34){
_17(_28,_2d,_2b,_2c,_34,function(_35){
if(_34==_2f){
_33=_35;
}
if(!--_32){
_29(_33);
}
});
});
};
if(_3("dojo-unit-tests")){
var _36=_8.unitTests=[];
}
true||_3.add("dojo-v1x-i18n-Api",1);
if(1){
var _37={},_38=new Function("bundle, __evalError","var __amdResult, define = function(x){__amdResult= x;};"+"return [(function(){"+"try{eval(arguments[0]);}catch(e){}"+"if(__amdResult)return 0;"+"try{return eval('('+arguments[0]+')');}"+"catch(e){__evalError.e = e; return __evalError;}"+"})(arguments[0]) , __amdResult];"),_39=function(url,_3a,_3b){
if(_3a===_37){
console.error("failed to evaluate i18n bundle; url="+url,_37.e);
return {};
}
return _3a?(/nls\/[^\/]+\/[^\/]+$/.test(url)?_3a:{root:_3a,_v1x:1}):_3b;
},_3c=function(_3d,_3e){
var _3f=[];
_4.forEach(_3d,function(mid){
var url=_2.toUrl(mid+".js");
if(_12[url]){
_3f.push(_12[url]);
}else{
try{
var _40=_2(mid);
if(_40){
_3f.push(_40);
return;
}
}
catch(e){
}
_7.get({url:url,sync:true,load:function(_41){
var _42=_38(_41,_37);
_3f.push(_12[url]=_39(url,_42[0],_42[1]));
},error:function(){
_3f.push(_12[url]={});
}});
}
});
_3e&&_3e.apply(null,_3f);
},_43=_8.normalizeLocale=function(_44){
var _45=_44?_44.toLowerCase():_1.locale;
if(_45=="root"){
_45="ROOT";
}
return _45;
},_46=function(_47,_48){
var _49=_47.split("-");
while(_49.length){
if(_48(_49.join("-"))){
return true;
}
_49.pop();
}
return _48("ROOT");
};
_26=function(_4a){
for(var _4b=_4a.split("/"),_4c=_1.global[_4b[0]],i=1;_4c&&i<_4b.length;_4c=_4c[_4b[i++]]){
}
if(_4c){
_12[_4a]=_4c;
}
};
_8.getLocalization=function(_4d,_4e,_4f){
var _50,_51=_13(_4d,_4e,_4f).substring(10);
_27(_51,(1&&!_2.isXdUrl(_2.toUrl(_51+".js"))?_3c:_2),function(_52){
_50=_52;
});
return _50;
};
_8._preloadLocalizations=function(_53,_54){
function _55(_56){
_56=_43(_56);
_46(_56,function(loc){
for(var i=0;i<_54.length;i++){
if(_54[i]==loc){
_3c([_53.replace(/\./g,"/")+"_"+loc]);
return true;
}
}
return false;
});
};
_55();
var _57=_1.config.extraLocale||[];
for(var i=0;i<_57.length;i++){
_55(_57[i]);
}
};
if(_3("dojo-unit-tests")){
_36.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _58;
_58=_38("{prop:1}",_37);
t.is({prop:1},_58[0]);
t.is(undefined,_58[1]);
_58=_38("({prop:1})",_37);
t.is({prop:1},_58[0]);
t.is(undefined,_58[1]);
_58=_38("{'prop-x':1}",_37);
t.is({"prop-x":1},_58[0]);
t.is(undefined,_58[1]);
_58=_38("({'prop-x':1})",_37);
t.is({"prop-x":1},_58[0]);
t.is(undefined,_58[1]);
_58=_38("define({'prop-x':1})",_37);
t.is(0,_58[0]);
t.is({"prop-x":1},_58[1]);
_58=_38("define({'prop-x':1});",_37);
t.is(0,_58[0]);
t.is({"prop-x":1},_58[1]);
_58=_38("this is total nonsense and should throw an error",_37);
t.is(_37,_58[0]);
t.is(undefined,_58[1]);
t.is({},_39("some/url",_58[0],_58[1]));
});
});
}
}
return _6.mixin(_8,{dynamic:true,normalize:_22,load:_27,cache:function(mid,_59){
_12[mid]=_59;
}});
});
