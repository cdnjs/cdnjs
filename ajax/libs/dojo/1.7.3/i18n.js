/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/i18n",["./_base/kernel","require","./has","./_base/array","./_base/config","./_base/lang","./_base/xhr","./json"],function(_1,_2,_3,_4,_5,_6,_7,_8){
_3.add("dojo-preload-i18n-Api",1);
true||_3.add("dojo-v1x-i18n-Api",1);
var _9=_1.i18n={},_a=/(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,_b=function(_c,_d,_e,_f){
for(var _10=[_e+_f],_11=_d.split("-"),_12="",i=0;i<_11.length;i++){
_12+=(_12?"-":"")+_11[i];
if(!_c||_c[_12]){
_10.push(_e+_12+"/"+_f);
}
}
return _10;
},_13={},_14=_1.getL10nName=function(_15,_16,_17){
_17=_17?_17.toLowerCase():_1.locale;
_15="dojo/i18n!"+_15.replace(/\./g,"/");
_16=_16.replace(/\./g,"/");
return (/root/i.test(_17))?(_15+"/nls/"+_16):(_15+"/nls/"+_17+"/"+_16);
},_18=function(_19,_1a,_1b,_1c,_1d,_1e){
_19([_1a],function(_1f){
var _20=_6.clone(_1f.root),_21=_b(!_1f._v1x&&_1f,_1d,_1b,_1c);
_19(_21,function(){
for(var i=1;i<_21.length;i++){
_20=_6.mixin(_6.clone(_20),arguments[i]);
}
var _22=_1a+"/"+_1d;
_13[_22]=_20;
_1e();
});
});
},_23=function(id,_24){
return /^\./.test(id)?_24(id):id;
},_25=function(_26){
var _27=_5.extraLocale||[];
_27=_6.isArray(_27)?_27:[_27];
_27.push(_26);
return _27;
},_28=function(id,_29,_2a){
if(_3("dojo-preload-i18n-Api")){
var _2b=id.split("*"),_2c=_2b[1]=="preload";
if(_2c){
if(!_13[id]){
_13[id]=1;
_2d(_2b[2],_8.parse(_2b[3]),1);
}
_2a(1);
}
if(_2c||_2e(id,_29,_2a)){
return;
}
}
var _2f=_a.exec(id),_30=_2f[1]+"/",_31=_2f[5]||_2f[4],_32=_30+_31,_33=(_2f[5]&&_2f[4]),_34=_33||_1.locale,_35=_32+"/"+_34,_36=_33?[_34]:_25(_34),_37=_36.length,_38=function(){
if(!--_37){
_2a(_6.delegate(_13[_35]));
}
};
_4.forEach(_36,function(_39){
var _3a=_32+"/"+_39;
if(_3("dojo-preload-i18n-Api")){
_3b(_3a);
}
if(!_13[_3a]){
_18(_29,_32,_30,_31,_39,_38);
}else{
_38();
}
});
};
if(_3("dojo-unit-tests")){
var _3c=_9.unitTests=[];
}
if(_3("dojo-preload-i18n-Api")||1){
var _3d=_9.normalizeLocale=function(_3e){
var _3f=_3e?_3e.toLowerCase():_1.locale;
return _3f=="root"?"ROOT":_3f;
},_40=function(mid){
return (1&&1)?_2.isXdUrl(_2.toUrl(mid+".js")):true;
},_41=0,_42=[],_2d=_9._preloadLocalizations=function(_43,_44,_45){
function _46(_47,_48){
var _49=_47.split("-");
while(_49.length){
if(_48(_49.join("-"))){
return true;
}
_49.pop();
}
return _48("ROOT");
};
function _4a(_4b){
_4b=_3d(_4b);
_46(_4b,function(loc){
if(_4.indexOf(_44,loc)>=0){
var mid=_43.replace(/\./g,"/")+"_"+loc;
_41++;
(_40(mid)||_45?_2:_50)([mid],function(_4c){
for(var p in _4c){
_13[p+"/"+_4b]=_4c[p];
}
--_41;
while(!_41&&_42.length){
_28.apply(null,_42.shift());
}
});
return true;
}
return false;
});
};
_4a();
_4.forEach(_1.config.extraLocale,_4a);
},_2e=function(id,_4d,_4e){
if(_41){
_42.push([id,_4d,_4e]);
}
return _41;
};
}
if(1){
var _4f=new Function("__bundle","__checkForLegacyModules","__mid","var define = function(){define.called = 1;},"+"    require = function(){define.called = 1;};"+"try{"+"define.called = 0;"+"eval(__bundle);"+"if(define.called==1)"+"return 1;"+"if((__checkForLegacyModules = __checkForLegacyModules(__mid)))"+"return __checkForLegacyModules;"+"}catch(e){}"+"try{"+"return eval('('+__bundle+')');"+"}catch(e){"+"return e;"+"}"),_50=function(_51,_52){
var _53=[];
_4.forEach(_51,function(mid){
var url=_2.toUrl(mid+".js");
function _28(_54){
var _55=_4f(_54,_3b,mid);
if(_55===1){
_2([mid],function(_56){
_53.push(_13[url]=_56);
});
}else{
if(_55 instanceof Error){
console.error("failed to evaluate i18n bundle; url="+url,_55);
_55={};
}
_53.push(_13[url]=(/nls\/[^\/]+\/[^\/]+$/.test(url)?_55:{root:_55,_v1x:1}));
}
};
if(_13[url]){
_53.push(_13[url]);
}else{
var _57=_2.syncLoadNls(mid);
if(_57){
_53.push(_57);
}else{
if(!_7){
try{
_2.getText(url,true,_28);
}
catch(e){
_53.push(_13[url]={});
}
}else{
_7.get({url:url,sync:true,load:_28,error:function(){
_53.push(_13[url]={});
}});
}
}
}
});
_52&&_52.apply(null,_53);
},_3b=function(_58){
for(var _59,_5a=_58.split("/"),_5b=_1.global[_5a[0]],i=1;_5b&&i<_5a.length-1;_5b=_5b[_5a[i++]]){
}
if(_5b){
_59=_5b[_5a[i]];
if(!_59){
_59=_5b[_5a[i].replace(/-/g,"_")];
}
if(_59){
_13[_58]=_59;
}
}
return _59;
};
_9.getLocalization=function(_5c,_5d,_5e){
var _5f,_60=_14(_5c,_5d,_5e).substring(10);
_28(_60,(!_40(_60)?_50:_2),function(_61){
_5f=_61;
});
return _5f;
};
if(_3("dojo-unit-tests")){
_3c.push(function(doh){
doh.register("tests.i18n.unit",function(t){
var _62;
_62=_4f("{prop:1}");
t.is({prop:1},_62);
t.is(undefined,_62[1]);
_62=_4f("({prop:1})");
t.is({prop:1},_62);
t.is(undefined,_62[1]);
_62=_4f("{'prop-x':1}");
t.is({"prop-x":1},_62);
t.is(undefined,_62[1]);
_62=_4f("({'prop-x':1})");
t.is({"prop-x":1},_62);
t.is(undefined,_62[1]);
_62=_4f("define({'prop-x':1})");
t.is(1,_62);
_62=_4f("this is total nonsense and should throw an error");
t.is(_62 instanceof Error,true);
});
});
}
}
return _6.mixin(_9,{dynamic:true,normalize:_23,load:_28,cache:_13});
});
