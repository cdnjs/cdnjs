/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json","module"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
_3.add("dojo-preload-i18n-Api",1);
1||_3.add("dojo-v1x-i18n-Api",1);
var _a=_1.i18n={},_b=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_c=function(_d,_e,_f,_10){
for(var _11=[_f+_10],_12=_e.split("-"),_13="",i=0;i<_12.length;i++){
_13+=(_13?"-":"")+_12[i];
if(!_d||_d[_13]){
_11.push(_f+_13+"/"+_10);
_11.specificity=_13;
}
}
return _11;
},_14={},_15=function(_16,_17,_18){
_18=_18?_18.toLowerCase():_1.locale;
_16=_16.replace(/\./g,"/");
_17=_17.replace(/\./g,"/");
return (/root/i.test(_18))?(_16+"/nls/"+_17):(_16+"/nls/"+_18+"/"+_17);
},_19=_1.getL10nName=function(_1a,_1b,_1c){
return _1a=_9.id+"!"+_15(_1a,_1b,_1c);
},_1d=function(_1e,_1f,_20,_21,_22,_23){
_1e([_1f],function(_24){
var _25=_6.clone(_24.root||_24.ROOT),_26=_c(!_24._v1x&&_24,_22,_20,_21);
_1e(_26,function(){
for(var i=1;i<_26.length;i++){
_25=_6.mixin(_6.clone(_25),arguments[i]);
}
var _27=_1f+"/"+_22;
_14[_27]=_25;
_25.$locale=_26.specificity;
_23();
});
});
},_28=function(id,_29){
return /^\./.test(id)?_29(id):id;
},_2a=function(_2b){
var _2c=_5.extraLocale||[];
_2c=_6.isArray(_2c)?_2c:[_2c];
_2c.push(_2b);
return _2c;
},_2d=function(id,_2e,_2f){
if(_3("dojo-preload-i18n-Api")){
var _30=id.split("*"),_31=_30[1]=="preload";
if(_31){
if(!_14[id]){
_14[id]=1;
_32(_30[2],_8.parse(_30[3]),1,_2e);
}
_2f(1);
}
if(_31||_33(id,_2e,_2f)){
return;
}
}
var _34=_b.exec(id),_35=_34[1]+"/",_36=_34[5]||_34[4],_37=_35+_36,_38=(_34[5]&&_34[4]),_39=_38||_1.locale||"",_3a=_37+"/"+_39,_3b=_38?[_39]:_2a(_39),_3c=_3b.length,_3d=function(){
if(!--_3c){
_2f(_6.delegate(_14[_3a]));
}
};
_4.forEach(_3b,function(_3e){
var _3f=_37+"/"+_3e;
if(_3("dojo-preload-i18n-Api")){
_40(_3f);
}
if(!_14[_3f]){
_1d(_2e,_37,_35,_36,_3e,_3d);
}else{
_3d();
}
});
};
if(_3("dojo-preload-i18n-Api")||1){
var _41=_a.normalizeLocale=function(_42){
var _43=_42?_42.toLowerCase():_1.locale;
return _43=="root"?"ROOT":_43;
},_44=function(mid,_45){
return (1&&1)?_45.isXdUrl(_2.toUrl(mid+".js")):true;
},_46=0,_47=[],_32=_a._preloadLocalizations=function(_48,_49,_4a,_4b){
_4b=_4b||_2;
function _4c(mid,_4d){
if(_44(mid,_4b)||_4a){
_4b([mid],_4d);
}else{
_6c([mid],_4d,_4b);
}
};
function _4e(_4f,_50){
var _51=_4f.split("-");
while(_51.length){
if(_50(_51.join("-"))){
return;
}
_51.pop();
}
_50("ROOT");
};
function _52(){
_46++;
};
function _53(){
--_46;
while(!_46&&_47.length){
_2d.apply(null,_47.shift());
}
};
function _54(_55,_56,loc,_57){
return _57.toAbsMid(_55+_56+"/"+loc);
};
function _58(_59){
_59=_41(_59);
_4e(_59,function(loc){
if(_4.indexOf(_49,loc)>=0){
var mid=_48.replace(/\./g,"/")+"_"+loc;
_52();
_4c(mid,function(_5a){
for(var p in _5a){
var _5b=_5a[p],_5c=p.match(/(.+)\/([^\/]+)$/),_5d,_5e;
if(!_5c){
continue;
}
_5d=_5c[2];
_5e=_5c[1]+"/";
if(!_5b._localized){
continue;
}
var _5f;
if(loc==="ROOT"){
var _60=_5f=_5b._localized;
delete _5b._localized;
_60.root=_5b;
_14[_2.toAbsMid(p)]=_60;
}else{
_5f=_5b._localized;
_14[_54(_5e,_5d,loc,_2)]=_5b;
}
if(loc!==_59){
function _61(_62,_63,_64,_65){
var _66=[],_67=[];
_4e(_59,function(loc){
if(_65[loc]){
_66.push(_2.toAbsMid(_62+loc+"/"+_63));
_67.push(_54(_62,_63,loc,_2));
}
});
if(_66.length){
_52();
_4b(_66,function(){
for(var i=_66.length-1;i>=0;i--){
_64=_6.mixin(_6.clone(_64),arguments[i]);
_14[_67[i]]=_64;
}
_14[_54(_62,_63,_59,_2)]=_6.clone(_64);
_53();
});
}else{
_14[_54(_62,_63,_59,_2)]=_64;
}
};
_61(_5e,_5d,_5b,_5f);
}
}
_53();
});
return true;
}
return false;
});
};
_58();
_4.forEach(_1.config.extraLocale,_58);
},_33=function(id,_68,_69){
if(_46){
_47.push([id,_68,_69]);
}
return _46;
},_40=function(){
};
}
if(1){
var _6a={},_6b=new Function("__bundle","__checkForLegacyModules","__mid","__amdValue","var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;},"+"\t   require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return __amdValue;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_6c=function(_6d,_6e,_6f){
var _70=[];
_4.forEach(_6d,function(mid){
var url=_6f.toUrl(mid+".js");
function _2d(_71){
var _72=_6b(_71,_40,mid,_6a);
if(_72===_6a){
_70.push(_14[url]=_6a.result);
}else{
if(_72 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_72);
_72={};
}
_70.push(_14[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_72:{root:_72,_v1x:1}));
}
};
if(_14[url]){
_70.push(_14[url]);
}else{
var _73=_6f.syncLoadNls(mid);
if(!_73){
_73=_40(mid.replace(/nls\/([^\/]*)\/([^\/]*)$/,"nls/$2/$1"));
}
if(_73){
_70.push(_73);
}else{
if(!_7){
try{
_6f.getText(url,true,_2d);
}
catch(e){
_70.push(_14[url]={});
}
}else{
_7.get({url:url,sync:true,load:_2d,error:function(){
_70.push(_14[url]={});
}});
}
}
}
});
_6e&&_6e.apply(null,_70);
};
_40=function(_74){
for(var _75,_76=_74.split("/"),_77=_1.global[_76[0]],i=1;_77&&i<_76.length-1;_77=_77[_76[i++]]){
}
if(_77){
_75=_77[_76[i]];
if(!_75){
_75=_77[_76[i].replace(/-/g,"_")];
}
if(_75){
_14[_74]=_75;
}
}
return _75;
};
_a.getLocalization=function(_78,_79,_7a){
var _7b,_7c=_15(_78,_79,_7a);
_2d(_7c,(!_44(_7c,_2)?function(_7d,_7e){
_6c(_7d,_7e,_2);
}:_2),function(_7f){
_7b=_7f;
});
return _7b;
};
}
return _6.mixin(_a,{dynamic:true,normalize:_28,load:_2d,cache:_14,getL10nName:_19});
});
