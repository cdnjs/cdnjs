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
var _8=function(id){
return {src:_4.id,id:id};
},_9=function(_a){
return _a.replace(/\./g,"/");
},_b=/\/\/>>built/,_c=[],_d=[],_e=function(_f,_10,_11){
_c.push(_11);
_7.forEach(_f.split(","),function(mid){
var _12=_13(mid,_10.module);
_d.push(_12);
_14(_12);
});
_15();
},_16,_17=function(m){
if(_16[m.mid]||/loadInit\!/.test(m.mid)){
return true;
}
_16[m.mid]=1;
if(m.injected!==_18&&!m.executed){
return false;
}
for(var _19=m.deps||[],i=0;i<_19.length;i++){
if(!_17(_19[i])){
return false;
}
}
return true;
},_15=function(){
_16={};
_d=_7.filter(_d,function(_1a){
return !_17(_1a);
});
if(!_d.length){
_1c.holdIdle();
var _1b=_c;
_c=[];
_7.forEach(_1b,function(cb){
cb(1);
});
_1c.releaseIdle();
}
},_1d=function(mid,_1e,_1f){
_1e([mid],function(_20){
_1e(_20.names,function(){
for(var _21="",_22=[],i=0;i<arguments.length;i++){
_21+="var "+_20.names[i]+"= arguments["+i+"]; ";
_22.push(arguments[i]);
}
eval(_21);
var _23=_1e.module,_24=[],_25={},_26=[],p,_27={provide:function(_28){
_28=_9(_28);
var _29=_13(_28,_23);
if(_29!==_23){
_52(_29);
}
},require:function(_2a,_2b){
_2a=_9(_2a);
_2b&&(_13(_2a,_23).result=_4c);
_26.push(_2a);
},requireLocalization:function(_2c,_2d,_2e){
_24.length||(_24=["dojo/i18n"]);
_2e=(_2e||_1.locale).toLowerCase();
_2c=_9(_2c)+"/nls/"+(/root/i.test(_2e)?"":_2e+"/")+_9(_2d);
if(_13(_2c,_23).isXd){
_24.push("dojo/i18n!"+_2c);
}
},loadInit:function(f){
f();
}};
try{
for(p in _27){
_25[p]=_1[p];
_1[p]=_27[p];
}
_20.def.apply(null,_22);
}
catch(e){
_53("error",[_8("failedDojoLoadInit"),e]);
}
finally{
for(p in _27){
_1[p]=_25[p];
}
}
_26.length&&_24.push("dojo/require!"+_26.join(","));
_c.push(_1f);
_7.forEach(_26,function(mid){
var _2f=_13(mid,_1e.module);
_d.push(_2f);
_14(_2f);
});
_15();
});
});
},_30=function(_31,_32,_33){
var _34=/\(|\)/g,_35=1,_36;
_34.lastIndex=_32;
while((_36=_34.exec(_31))){
if(_36[0]==")"){
_35-=1;
}else{
_35+=1;
}
if(_35==0){
break;
}
}
if(_35!=0){
throw "unmatched paren around character "+_34.lastIndex+" in: "+_31;
}
return [_1.trim(_31.substring(_33,_34.lastIndex))+";\n",_34.lastIndex];
},_37=/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,_38=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,_39=/(^|\s)(require|define)\s*\(/m,_3a=function(_3b,_3c){
var _3d,_3e,_3f,_40,_41=[],_42=[],_43=[];
_3c=_3c||_3b.replace(_37,function(_44){
_38.lastIndex=_39.lastIndex=0;
return (_38.test(_44)||_39.test(_44))?"":_44;
});
while((_3d=_38.exec(_3c))){
_3e=_38.lastIndex;
_3f=_3e-_3d[0].length;
_40=_30(_3c,_3e,_3f);
if(_3d[2]=="loadInit"){
_41.push(_40[0]);
}else{
_42.push(_40[0]);
}
_38.lastIndex=_40[1];
}
_43=_41.concat(_42);
if(_43.length||!_39.test(_3c)){
return [_3b.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 && dojo.loadInit("),_43.join(""),_43];
}else{
return 0;
}
},_45=function(_46,_47){
var _48,id,_49=[],_4a=[];
if(_b.test(_47)||!(_48=_3a(_47))){
return 0;
}
id=_46.mid+"-*loadInit";
for(var p in _13("dojo",_46).result.scopeMap){
_49.push(p);
_4a.push("\""+p+"\"");
}
return "// xdomain rewrite of "+_46.path+"\n"+"define('"+id+"',{\n"+"\tnames:"+_1.toJson(_49)+",\n"+"\tdef:function("+_49.join(",")+"){"+_48[1]+"}"+"});\n\n"+"define("+_1.toJson(_49.concat(["dojo/loadInit!"+id]))+", function("+_49.join(",")+"){\n"+_48[0]+"});";
},_1c=_3.initSyncLoader(_e,_15,_45),_4b=_1c.sync,xd=_1c.xd,_18=_1c.arrived,_4c=_1c.nonmodule,_4d=_1c.executing,_4e=_1c.executed,_4f=_1c.syncExecStack,_50=_1c.modules,_51=_1c.execQ,_13=_1c.getModule,_14=_1c.injectModule,_52=_1c.setArrived,_53=_1c.signal,_54=_1c.finishExec,_55=_1c.execModule,_56=_1c.getLegacyMode;
_1.provide=function(mid){
var _57=_4f[0],_58=_6.mixin(_13(_9(mid),_3.module),{executed:_4d,result:_6.getObject(mid,true)});
_52(_58);
if(_57){
(_57.provides||(_57.provides=[])).push(function(){
_58.result=_6.getObject(mid);
delete _58.provides;
_58.executed!==_4e&&_54(_58);
});
}
return _58.result;
};
_2.add("config-publishRequireResult",1,0,0);
_1.require=function(_59,_5a){
function _5b(mid,_5c){
var _5d=_13(_9(mid),_3.module);
if(_4f.length&&_4f[0].finish){
_4f[0].finish.push(mid);
return undefined;
}
if(_5d.executed){
return _5d.result;
}
_5c&&(_5d.result=_4c);
var _5e=_56();
_14(_5d);
_5e=_56();
if(_5d.executed!==_4e&&_5d.injected===_18){
_1c.holdIdle();
_55(_5d);
_1c.releaseIdle();
}
if(_5d.executed){
return _5d.result;
}
if(_5e==_4b){
if(_5d.cjs){
_51.unshift(_5d);
}else{
_4f.length&&(_4f[0].finish=[mid]);
}
}else{
_51.push(_5d);
}
return undefined;
};
var _5f=_5b(_59,_5a);
if(_2("config-publishRequireResult")&&!_6.exists(_59)&&_5f!==undefined){
_6.setObject(_59,_5f);
}
return _5f;
};
_1.loadInit=function(f){
f();
};
_1.registerModulePath=function(_60,_61){
var _62={};
_62[_60.replace(/\./g,"/")]=_61;
_3({paths:_62});
};
_1.platformRequire=function(_63){
var _64=(_63.common||[]).concat(_63[_1._name]||_63["default"]||[]),_65;
while(_64.length){
if(_6.isArray(_65=_64.shift())){
_1.require.apply(_1,_65);
}else{
_1.require(_65);
}
}
};
_1.requireIf=_1.requireAfterIf=function(_66,_67,_68){
if(_66){
_1.require(_67,_68);
}
};
_1.requireLocalization=function(_69,_6a,_6b){
_3(["../i18n"],function(_6c){
_6c.getLocalization(_69,_6a,_6b);
});
};
return {extractLegacyApiApplications:_3a,require:_1c.dojoRequirePlugin,loadInit:_1d};
});
