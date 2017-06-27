/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.connect"]){
dojo._hasResource["dojo._base.connect"]=true;
dojo.provide("dojo._base.connect");
dojo.require("dojo._base.lang");
dojo._listener={getDispatcher:function(){
return function(){
var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;
var r=t&&t.apply(this,arguments);
var _6;
_6=[].concat(ls);
for(var i in _6){
if(!(i in ap)){
_6[i].apply(this,arguments);
}
}
return r;
};
},add:function(_8,_9,_a){
_8=_8||dojo.global;
var f=_8[_9];
if(!f||!f._listeners){
var d=dojo._listener.getDispatcher();
d.target=f;
d._listeners=[];
f=_8[_9]=d;
}
return f._listeners.push(_a);
},remove:function(_d,_e,_f){
var f=(_d||dojo.global)[_e];
if(f&&f._listeners&&_f--){
delete f._listeners[_f];
}
}};
dojo.connect=function(obj,_12,_13,_14,_15){
var a=arguments,_17=[],i=0;
_17.push(dojo.isString(a[0])?null:a[i++],a[i++]);
var a1=a[i+1];
_17.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);
for(var l=a.length;i<l;i++){
_17.push(a[i]);
}
return dojo._connect.apply(this,_17);
};
dojo._connect=function(obj,_1c,_1d,_1e){
var l=dojo._listener,h=l.add(obj,_1c,dojo.hitch(_1d,_1e));
return [obj,_1c,h,l];
};
dojo.disconnect=function(_21){
if(_21&&_21[0]!==undefined){
dojo._disconnect.apply(this,_21);
delete _21[0];
}
};
dojo._disconnect=function(obj,_23,_24,_25){
_25.remove(obj,_23,_24);
};
dojo._topics={};
dojo.subscribe=function(_26,_27,_28){
return [_26,dojo._listener.add(dojo._topics,_26,dojo.hitch(_27,_28))];
};
dojo.unsubscribe=function(_29){
if(_29){
dojo._listener.remove(dojo._topics,_29[0],_29[1]);
}
};
dojo.publish=function(_2a,_2b){
var f=dojo._topics[_2a];
if(f){
f.apply(this,_2b||[]);
}
};
dojo.connectPublisher=function(_2d,obj,_2f){
var pf=function(){
dojo.publish(_2d,arguments);
};
return (_2f)?dojo.connect(obj,_2f,pf):dojo.connect(obj,pf);
};
}
