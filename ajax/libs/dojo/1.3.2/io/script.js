/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.io.script"]){
dojo._hasResource["dojo.io.script"]=true;
dojo.provide("dojo.io.script");
dojo.io.script={get:function(_1){
var _2=this._makeScriptDeferred(_1);
var _3=_2.ioArgs;
dojo._ioAddQueryToUrl(_3);
if(this._canAttach(_3)){
this.attach(_3.id,_3.url,_1.frameDoc);
}
dojo._ioWatch(_2,this._validCheck,this._ioCheck,this._resHandle);
return _2;
},attach:function(id,_5,_6){
var _7=(_6||dojo.doc);
var _8=_7.createElement("script");
_8.type="text/javascript";
_8.src=_5;
_8.id=id;
_8.charset="utf-8";
_7.getElementsByTagName("head")[0].appendChild(_8);
},remove:function(id,_a){
dojo.destroy(dojo.byId(id,_a));
if(this["jsonp_"+id]){
delete this["jsonp_"+id];
}
},_makeScriptDeferred:function(_b){
var _c=dojo._ioSetArgs(_b,this._deferredCancel,this._deferredOk,this._deferredError);
var _d=_c.ioArgs;
_d.id=dojo._scopeName+"IoScript"+(this._counter++);
_d.canDelete=false;
if(_b.callbackParamName){
_d.query=_d.query||"";
if(_d.query.length>0){
_d.query+="&";
}
_d.query+=_b.callbackParamName+"="+(_b.frameDoc?"parent.":"")+dojo._scopeName+".io.script.jsonp_"+_d.id+"._jsonpCallback";
_d.frameDoc=_b.frameDoc;
_d.canDelete=true;
_c._jsonpCallback=this._jsonpCallback;
this["jsonp_"+_d.id]=_c;
}
return _c;
},_deferredCancel:function(_e){
_e.canceled=true;
if(_e.ioArgs.canDelete){
dojo.io.script._addDeadScript(_e.ioArgs);
}
},_deferredOk:function(_f){
if(_f.ioArgs.canDelete){
dojo.io.script._addDeadScript(_f.ioArgs);
}
if(_f.ioArgs.json){
return _f.ioArgs.json;
}else{
return _f.ioArgs;
}
},_deferredError:function(_10,dfd){
if(dfd.ioArgs.canDelete){
if(_10.dojoType=="timeout"){
dojo.io.script.remove(dfd.ioArgs.id,dfd.ioArgs.frameDoc);
}else{
dojo.io.script._addDeadScript(dfd.ioArgs);
}
}

return _10;
},_deadScripts:[],_counter:1,_addDeadScript:function(_12){
dojo.io.script._deadScripts.push({id:_12.id,frameDoc:_12.frameDoc});
_12.frameDoc=null;
},_validCheck:function(dfd){
var _14=dojo.io.script;
var _15=_14._deadScripts;
if(_15&&_15.length>0){
for(var i=0;i<_15.length;i++){
_14.remove(_15[i].id,_15[i].frameDoc);
_15[i].frameDoc=null;
}
dojo.io.script._deadScripts=[];
}
return true;
},_ioCheck:function(dfd){
if(dfd.ioArgs.json){
return true;
}
var _18=dfd.ioArgs.args.checkString;
if(_18&&eval("typeof("+_18+") != 'undefined'")){
return true;
}
return false;
},_resHandle:function(dfd){
if(dojo.io.script._ioCheck(dfd)){
dfd.callback(dfd);
}else{
dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
}
},_canAttach:function(_1a){
return true;
},_jsonpCallback:function(_1b){
this.ioArgs.json=_1b;
}};
}
