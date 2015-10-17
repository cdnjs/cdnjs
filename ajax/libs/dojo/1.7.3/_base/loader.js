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
_16[m.mid]=1;
for(var t,_18,_19=m.deps||[],i=0;i<_19.length;i++){
_18=_19[i];
if(!(t=_16[_18.mid])){
if(t===0||!_17(_18)){
_16[m.mid]=0;
return false;
}
}
}
return true;
},_15=function(){
var _1a,mid;
_16={};
for(mid in _1b){
_1a=_1b[mid];
if(_1a.executed||_1a.noReqPluginCheck){
_16[mid]=1;
}else{
if(_1a.noReqPluginCheck!==0){
_1a.noReqPluginCheck=/loadInit\!/.test(mid)||/require\!/.test(mid)?1:0;
}
if(_1a.noReqPluginCheck){
_16[mid]=1;
}else{
if(_1a.injected!==_1c){
_16[mid]=0;
}
}
}
}
for(var t,i=0,end=_d.length;i<end;i++){
_1a=_d[i];
if(!(t=_16[_1a.mid])){
if(t===0||!_17(_1a)){
return;
}
}
}
_1d.holdIdle();
var _1e=_c;
_c=[];
_7.forEach(_1e,function(cb){
cb(1);
});
_1d.releaseIdle();
},_1f=function(mid,_20,_21){
_20([mid],function(_22){
_20(_22.names,function(){
for(var _23="",_24=[],i=0;i<arguments.length;i++){
_23+="var "+_22.names[i]+"= arguments["+i+"]; ";
_24.push(arguments[i]);
}
eval(_23);
var _25=_20.module,_26=[],_27={},_28=[],p,_29={provide:function(_2a){
_2a=_9(_2a);
var _2b=_13(_2a,_25);
if(_2b!==_25){
_53(_2b);
}
},require:function(_2c,_2d){
_2c=_9(_2c);
_2d&&(_13(_2c,_25).result=_4e);
_28.push(_2c);
},requireLocalization:function(_2e,_2f,_30){
_26.length||(_26=["dojo/i18n"]);
_30=(_30||_1.locale).toLowerCase();
_2e=_9(_2e)+"/nls/"+(/root/i.test(_30)?"":_30+"/")+_9(_2f);
if(_13(_2e,_25).isXd){
_26.push("dojo/i18n!"+_2e);
}
},loadInit:function(f){
f();
}};
try{
for(p in _29){
_27[p]=_1[p];
_1[p]=_29[p];
}
_22.def.apply(null,_24);
}
catch(e){
_54("error",[_8("failedDojoLoadInit"),e]);
}
finally{
for(p in _29){
_1[p]=_27[p];
}
}
_28.length&&_26.push("dojo/require!"+_28.join(","));
_c.push(_21);
_7.forEach(_28,function(mid){
var _31=_13(mid,_20.module);
_d.push(_31);
_14(_31);
});
_15();
});
});
},_32=function(_33,_34,_35){
var _36=/\(|\)/g,_37=1,_38;
_36.lastIndex=_34;
while((_38=_36.exec(_33))){
if(_38[0]==")"){
_37-=1;
}else{
_37+=1;
}
if(_37==0){
break;
}
}
if(_37!=0){
throw "unmatched paren around character "+_36.lastIndex+" in: "+_33;
}
return [_1.trim(_33.substring(_35,_36.lastIndex))+";\n",_36.lastIndex];
},_39=/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,_3a=/(^|\s)dojo\.(loadInit|require|provide|requireLocalization|requireIf|requireAfterIf|platformRequire)\s*\(/mg,_3b=/(^|\s)(require|define)\s*\(/m,_3c=function(_3d,_3e){
var _3f,_40,_41,_42,_43=[],_44=[],_45=[];
_3e=_3e||_3d.replace(_39,function(_46){
_3a.lastIndex=_3b.lastIndex=0;
return (_3a.test(_46)||_3b.test(_46))?"":_46;
});
while((_3f=_3a.exec(_3e))){
_40=_3a.lastIndex;
_41=_40-_3f[0].length;
_42=_32(_3e,_40,_41);
if(_3f[2]=="loadInit"){
_43.push(_42[0]);
}else{
_44.push(_42[0]);
}
_3a.lastIndex=_42[1];
}
_45=_43.concat(_44);
if(_45.length||!_3b.test(_3e)){
return [_3d.replace(/(^|\s)dojo\.loadInit\s*\(/g,"\n0 && dojo.loadInit("),_45.join(""),_45];
}else{
return 0;
}
},_47=function(_48,_49){
var _4a,id,_4b=[],_4c=[];
if(_b.test(_49)||!(_4a=_3c(_49))){
return 0;
}
id=_48.mid+"-*loadInit";
for(var p in _13("dojo",_48).result.scopeMap){
_4b.push(p);
_4c.push("\""+p+"\"");
}
return "// xdomain rewrite of "+_48.path+"\n"+"define('"+id+"',{\n"+"\tnames:"+_1.toJson(_4b)+",\n"+"\tdef:function("+_4b.join(",")+"){"+_4a[1]+"}"+"});\n\n"+"define("+_1.toJson(_4b.concat(["dojo/loadInit!"+id]))+", function("+_4b.join(",")+"){\n"+_4a[0]+"});";
},_1d=_3.initSyncLoader(_e,_15,_47),_4d=_1d.sync,xd=_1d.xd,_1c=_1d.arrived,_4e=_1d.nonmodule,_4f=_1d.executing,_50=_1d.executed,_51=_1d.syncExecStack,_1b=_1d.modules,_52=_1d.execQ,_13=_1d.getModule,_14=_1d.injectModule,_53=_1d.setArrived,_54=_1d.signal,_55=_1d.finishExec,_56=_1d.execModule,_57=_1d.getLegacyMode;
_1.provide=function(mid){
var _58=_51[0],_59=_6.mixin(_13(_9(mid),_3.module),{executed:_4f,result:_6.getObject(mid,true)});
_53(_59);
if(_58){
(_58.provides||(_58.provides=[])).push(function(){
_59.result=_6.getObject(mid);
delete _59.provides;
_59.executed!==_50&&_55(_59);
});
}
return _59.result;
};
_2.add("config-publishRequireResult",1,0,0);
_1.require=function(_5a,_5b){
function _5c(mid,_5d){
var _5e=_13(_9(mid),_3.module);
if(_51.length&&_51[0].finish){
_51[0].finish.push(mid);
return undefined;
}
if(_5e.executed){
return _5e.result;
}
_5d&&(_5e.result=_4e);
var _5f=_57();
_14(_5e);
_5f=_57();
if(_5e.executed!==_50&&_5e.injected===_1c){
_1d.holdIdle();
_56(_5e);
_1d.releaseIdle();
}
if(_5e.executed){
return _5e.result;
}
if(_5f==_4d){
if(_5e.cjs){
_52.unshift(_5e);
}else{
_51.length&&(_51[0].finish=[mid]);
}
}else{
_52.push(_5e);
}
return undefined;
};
var _60=_5c(_5a,_5b);
if(_2("config-publishRequireResult")&&!_6.exists(_5a)&&_60!==undefined){
_6.setObject(_5a,_60);
}
return _60;
};
_1.loadInit=function(f){
f();
};
_1.registerModulePath=function(_61,_62){
var _63={};
_63[_61.replace(/\./g,"/")]=_62;
_3({paths:_63});
};
_1.platformRequire=function(_64){
var _65=(_64.common||[]).concat(_64[_1._name]||_64["default"]||[]),_66;
while(_65.length){
if(_6.isArray(_66=_65.shift())){
_1.require.apply(_1,_66);
}else{
_1.require(_66);
}
}
};
_1.requireIf=_1.requireAfterIf=function(_67,_68,_69){
if(_67){
_1.require(_68,_69);
}
};
_1.requireLocalization=function(_6a,_6b,_6c){
_3(["../i18n"],function(_6d){
_6d.getLocalization(_6a,_6b,_6c);
});
};
return {extractLegacyApiApplications:_3c,require:_1d.dojoRequirePlugin,loadInit:_1f};
});
