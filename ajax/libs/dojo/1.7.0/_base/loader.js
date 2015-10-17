/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/loader",["./kernel","../has","require","module","./json","./lang","./array"],function(_1,_2,_3,_4,_5,_6,_7){
if(!1){
console.error("cannot load the Dojo v1.x loader with a foreign loader");
return 0;
}
var _8=function(){
return 0;
};
if(1){
var _9=location.protocol,_a=location.host,_b=!_a;
_8=function(_c){
if(_b||/^\./.test(_c)){
return false;
}
if(/^\/\//.test(_c)){
return true;
}
var _d=_c.match(/^([^\/\:]+\:)\/\/([^\/]+)/);
return _d&&(_d[1]!=_9||_d[2]!=_a);
};
}
var _e=function(id){
return {src:_4.id,id:id};
},_f=function(_10){
return _10.replace(/\./g,"/");
},_11=/\/\/>>built/,_12=[],_13=[],_14=function(mid,_15,_16){
_12.push(_16);
_7.forEach(mid.split(","),function(mid){
var _17=_18(mid,_15.module);
_13.push(_17);
_19(_17);
});
_1a();
},_1a=function(){
_13=_7.filter(_13,function(_1b){
return _1b.injected!==_4d&&!_1b.executed;
});
if(!_13.length){
_1d.holdIdle();
var _1c=_12;
_12=[];
_7.forEach(_1c,function(cb){
cb(1);
});
_1d.releaseIdle();
}
},_1e=function(mid,_1f,_20){
_1f([mid],function(_21){
_1f(_21.names,function(){
for(var _22="",_23=[],i=0;i<arguments.length;i++){
_22+="var "+_21.names[i]+"= arguments["+i+"]; ";
_23.push(arguments[i]);
}
eval(_22);
var _24=_1f.module,_25=[],_26={},_27=[],p,_28={provide:function(_29){
_29=_f(_29);
var _2a=_18(_29,_24);
if(_2a!==_24){
_54(_2a);
}
},require:function(_2b,_2c){
_2b=_f(_2b);
_2c&&(_18(_2b,_24).result=_4e);
_27.push(_2b);
},requireLocalization:function(_2d,_2e,_2f){
_25.length||(_25=["dojo/i18n"]);
_2f=(_2f||_1.locale).toLowerCase();
_2d=_f(_2d)+"/nls/"+(/root/i.test(_2f)?"":_2f+"/")+_f(_2e);
if(_18(_2d,_24).isXd){
_25.push("dojo/i18n!"+_2d);
}
},loadInit:function(f){
f();
}};
try{
for(p in _28){
_26[p]=_1[p];
_1[p]=_28[p];
}
_21.def.apply(null,_23);
}
catch(e){
_55("error",[_e("failedDojoLoadInit"),e]);
}
finally{
for(p in _28){
_1[p]=_26[p];
}
}
_27.length&&_25.push("dojo/require!"+_27.join(","));
_12.push(_20);
_7.forEach(_27,function(mid){
var _30=_18(mid,_1f.module);
_13.push(_30);
_19(_30);
});
_1a();
});
});
},_31=function(_32,_33,_34){
var _35=/\(|\)/g,_36=1,_37;
_35.lastIndex=_33;
while((_37=_35.exec(_32))){
if(_37[0]==")"){
_36-=1;
}else{
_36+=1;
}
if(_36==0){
break;
}
}
if(_36!=0){
throw "unmatched paren around character "+_35.lastIndex+" in: "+_32;
}
return [_1.trim(_32.substring(_34,_35.lastIndex))+";\n",_35.lastIndex];
},_38=/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,_39=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,_3a=/(^|\s)(require|define)\s*\(/m,_3b=function(_3c,_3d){
var _3e,_3f,_40,_41,_42=[],_43=[],_44=[];
_3d=_3d||_3c.replace(_38,function(_45){
_39.lastIndex=_3a.lastIndex=0;
return (_39.test(_45)||_3a.test(_45))?"":_45;
});
while((_3e=_39.exec(_3d))){
_3f=_39.lastIndex;
_40=_3f-_3e[0].length;
_41=_31(_3d,_3f,_40);
if(_3e[2]=="loadInit"){
_42.push(_41[0]);
}else{
_43.push(_41[0]);
}
_39.lastIndex=_41[1];
}
_44=_42.concat(_43);
if(_44.length||!_3a.test(_3d)){
return [_3c.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 && dojo.loadInit("),_44.join(""),_44];
}else{
return 0;
}
},_46=function(_47,_48){
var _49,id,_4a=[],_4b=[];
if(_11.test(_48)||!(_49=_3b(_48))){
return 0;
}
id=_47.mid+"-*loadInit";
for(var p in _18("dojo",_47).result.scopeMap){
_4a.push(p);
_4b.push("\""+p+"\"");
}
return "// xdomain rewrite of "+_47.path+"\n"+"define('"+id+"',{\n"+"\tnames:"+_1.toJson(_4a)+",\n"+"\tdef:function("+_4a.join(",")+"){"+_49[1]+"}"+"});\n\n"+"define("+_1.toJson(_4a.concat(["dojo/loadInit!"+id]))+", function("+_4a.join(",")+"){\n"+_49[0]+"});";
},_1d=_3.initSyncLoader(_14,_1a,_46,_8),_4c=_1d.sync,xd=_1d.xd,_4d=_1d.arrived,_4e=_1d.nonmodule,_4f=_1d.executing,_50=_1d.executed,_51=_1d.syncExecStack,_52=_1d.modules,_53=_1d.execQ,_18=_1d.getModule,_19=_1d.injectModule,_54=_1d.setArrived,_55=_1d.signal,_56=_1d.finishExec,_57=_1d.execModule,_58=_1d.getLegacyMode;
_1.provide=function(mid){
var _59=_51[0],_5a=_6.mixin(_18(_f(mid),_3.module),{executed:_4f,result:_6.getObject(mid,true)});
_54(_5a);
if(_59){
(_59.provides||(_59.provides=[])).push(function(){
_5a.result=_6.getObject(mid);
delete _5a.provides;
_5a.executed!==_50&&_56(_5a);
});
}
return _5a.result;
};
_2.add("config-publishRequireResult",1,0,0);
_1.require=function(_5b,_5c){
function _5d(mid,_5e){
var _5f=_18(_f(mid),_3.module);
if(_51.length&&_51[0].finish){
_51[0].finish.push(mid);
return undefined;
}
if(_5f.executed){
return _5f.result;
}
_5e&&(_5f.result=_4e);
var _60=_58();
_19(_5f);
if(_5f.executed!==_50&&_5f.injected===_4d){
_1d.holdIdle();
_57(_5f);
_1d.releaseIdle();
}
if(_5f.executed){
return _5f.result;
}
if(_60==_4c){
if(_5f.cjs){
_53.unshift(_5f);
}else{
_51.length&&(_51[0].finish=[mid]);
}
}else{
_53.push(_5f);
}
return undefined;
};
var _61=_5d(_5b,_5c);
if(_2("config-publishRequireResult")&&!_6.exists(_5b)&&_61!==undefined){
_6.setObject(_5b,_61);
}
return _61;
};
_1.loadInit=function(f){
f();
};
_1.registerModulePath=function(_62,_63){
var _64={};
_64[_62.replace(/\./g,"/")]=_63;
_3({paths:_64});
};
_1.platformRequire=function(_65){
var _66=(_65.common||[]).concat(_65[_1._name]||_65["default"]||[]),_67;
while(_66.length){
if(_6.isArray(_67=_66.shift())){
_1.require.apply(_1,_67);
}else{
_1.require(_67);
}
}
};
_1.requireIf=_1.requireAfterIf=function(_68,_69,_6a){
if(_68){
_1.require(_69,_6a);
}
};
_1.requireLocalization=function(_6b,_6c,_6d){
_3(["../i18n"],function(_6e){
_6e.getLocalization(_6b,_6c,_6d);
});
};
return {extractLegacyApiApplications:_3b,require:_1d.dojoRequirePlugin,loadInit:_1e};
});
