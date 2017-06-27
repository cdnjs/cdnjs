/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/io/script",["../_base/connect","../_base/kernel","../_base/lang","../sniff","../_base/window","../_base/xhr","../dom","../dom-construct","../request/script"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9){
_2.deprecated("dojo/io/script","Use dojo/request/script.","2.0");
var _a={get:function(_b){
var _c;
var _d=this._makeScriptDeferred(_b,function(_e){
_c&&_c.cancel();
});
var _f=_d.ioArgs;
_6._ioAddQueryToUrl(_f);
_6._ioNotifyStart(_d);
_c=_9.get(_f.url,{timeout:_b.timeout,jsonp:_f.jsonp,checkString:_b.checkString,ioArgs:_f,frameDoc:_b.frameDoc,canAttach:function(_10){
_f.requestId=_10.id;
_f.scriptId=_10.scriptId;
_f.canDelete=_10.canDelete;
return _a._canAttach(_f);
}},true);
_c.then(function(){
_d.resolve(_d);
}).otherwise(function(_11){
_d.ioArgs.error=_11;
_d.reject(_11);
});
return _d;
},attach:_9._attach,remove:_9._remove,_makeScriptDeferred:function(_12,_13){
var dfd=_6._ioSetArgs(_12,_13||this._deferredCancel,this._deferredOk,this._deferredError);
var _14=dfd.ioArgs;
_14.id=_2._scopeName+"IoScript"+(this._counter++);
_14.canDelete=false;
_14.jsonp=_12.callbackParamName||_12.jsonp;
if(_14.jsonp){
_14.query=_14.query||"";
if(_14.query.length>0){
_14.query+="&";
}
_14.query+=_14.jsonp+"="+(_12.frameDoc?"parent.":"")+_2._scopeName+".io.script.jsonp_"+_14.id+"._jsonpCallback";
_14.frameDoc=_12.frameDoc;
_14.canDelete=true;
dfd._jsonpCallback=this._jsonpCallback;
this["jsonp_"+_14.id]=dfd;
}
return dfd;
},_deferredCancel:function(dfd){
dfd.canceled=true;
},_deferredOk:function(dfd){
var _15=dfd.ioArgs;
return _15.json||_15.scriptLoaded||_15;
},_deferredError:function(_16,dfd){
return _16;
},_deadScripts:[],_counter:1,_addDeadScript:function(_17){
_a._deadScripts.push({id:_17.id,frameDoc:_17.frameDoc});
_17.frameDoc=null;
},_validCheck:function(dfd){
var _18=_a._deadScripts;
if(_18&&_18.length>0){
for(var i=0;i<_18.length;i++){
_a.remove(_18[i].id,_18[i].frameDoc);
_18[i].frameDoc=null;
}
_a._deadScripts=[];
}
return true;
},_ioCheck:function(dfd){
var _19=dfd.ioArgs;
if(_19.json||(_19.scriptLoaded&&!_19.args.checkString)){
return true;
}
var _1a=_19.args.checkString;
return _1a&&eval("typeof("+_1a+") != 'undefined'");
},_resHandle:function(dfd){
if(_a._ioCheck(dfd)){
dfd.callback(dfd);
}else{
dfd.errback(new Error("inconceivable dojo.io.script._resHandle error"));
}
},_canAttach:function(){
return true;
},_jsonpCallback:function(_1b){
this.ioArgs.json=_1b;
_2.global[_9._callbacksProperty][this.ioArgs.requestId](_1b);
}};
_3.setObject("dojo.io.script",_a);
return _a;
});
