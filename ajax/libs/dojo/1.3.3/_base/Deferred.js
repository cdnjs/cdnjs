/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.Deferred"]){
dojo._hasResource["dojo._base.Deferred"]=true;
dojo.provide("dojo._base.Deferred");
dojo.require("dojo._base.lang");
dojo.Deferred=function(_1){
this.chain=[];
this.id=this._nextId();
this.fired=-1;
this.paused=0;
this.results=[null,null];
this.canceller=_1;
this.silentlyCancelled=false;
};
dojo.extend(dojo.Deferred,{_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
var _3;
if(this.fired==-1){
if(this.canceller){
_3=this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
if(!(_3 instanceof Error)){
var _4=_3;
var _5="Deferred Cancelled";
if(_3&&_3.toString){
_5+=": "+_3.toString();
}
_3=new Error(_5);
_3.dojoType="cancel";
_3.cancelResult=_4;
}
this.errback(_3);
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_resback:function(_6){
this.fired=((_6 instanceof Error)?1:0);
this.results[this.fired]=_6;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
throw new Error("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(_7){
this._check();
this._resback(_7);
},errback:function(_8){
this._check();
if(!(_8 instanceof Error)){
_8=new Error(_8);
}
this._resback(_8);
},addBoth:function(cb,_a){
var _b=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_b,_b);
},addCallback:function(cb,_d){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(cb,_f){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0){
this._fire();
}
return this;
},_fire:function(){
var _12=this.chain;
var _13=this.fired;
var res=this.results[_13];
var _15=this;
var cb=null;
while((_12.length>0)&&(this.paused==0)){
var f=_12.shift()[_13];
if(!f){
continue;
}
var _18=function(){
var ret=f(res);
if(typeof ret!="undefined"){
res=ret;
}
_13=((res instanceof Error)?1:0);
if(res instanceof dojo.Deferred){
cb=function(res){
_15._resback(res);
_15.paused--;
if((_15.paused==0)&&(_15.fired>=0)){
_15._fire();
}
};
this.paused++;
}
};
if(dojo.config.debugAtAllCosts){
_18.call(this);
}else{
try{
_18.call(this);
}
catch(err){
_13=1;
res=err;
}
}
}
this.fired=_13;
this.results[_13]=res;
if((cb)&&(this.paused)){
res.addBoth(cb);
}
}});
}
