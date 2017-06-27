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
this.isFiring=false;
};
dojo.extend(dojo.Deferred,{_nextId:(function(){
var n=1;
return function(){
return n++;
};
})(),cancel:function(){
var _2;
if(this.fired==-1){
if(this.canceller){
_2=this.canceller(this);
}else{
this.silentlyCancelled=true;
}
if(this.fired==-1){
if(!(_2 instanceof Error)){
var _3=_2;
var _4="Deferred Cancelled";
if(_2&&_2.toString){
_4+=": "+_2.toString();
}
_2=new Error(_4);
_2.dojoType="cancel";
_2.cancelResult=_3;
}
this.errback(_2);
}
}else{
if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){
this.results[0].cancel();
}
}
},_resback:function(_5){
this.fired=((_5 instanceof Error)?1:0);
this.results[this.fired]=_5;
this._fire();
},_check:function(){
if(this.fired!=-1){
if(!this.silentlyCancelled){
throw new Error("already called!");
}
this.silentlyCancelled=false;
return;
}
},callback:function(_6){
this._check();
this._resback(_6);
},errback:function(_7){
this._check();
if(!(_7 instanceof Error)){
_7=new Error(_7);
}
this._resback(_7);
},addBoth:function(cb,_8){
var _9=dojo.hitch.apply(dojo,arguments);
return this.addCallbacks(_9,_9);
},addCallback:function(cb,_a){
return this.addCallbacks(dojo.hitch.apply(dojo,arguments));
},addErrback:function(cb,_b){
return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));
},addCallbacks:function(cb,eb){
this.chain.push([cb,eb]);
if(this.fired>=0&&!this.isFiring){
this._fire();
}
return this;
},_fire:function(){
this.isFiring=true;
var _c=this.chain;
var _d=this.fired;
var _e=this.results[_d];
var _f=this;
var cb=null;
while((_c.length>0)&&(this.paused==0)){
var f=_c.shift()[_d];
if(!f){
continue;
}
var _10=function(){
var ret=f(_e);
if(typeof ret!="undefined"){
_e=ret;
}
_d=((_e instanceof Error)?1:0);
if(_e instanceof dojo.Deferred){
cb=function(res){
_f._resback(res);
_f.paused--;
if((_f.paused==0)&&(_f.fired>=0)){
_f._fire();
}
};
this.paused++;
}
};
if(dojo.config.debugAtAllCosts){
_10.call(this);
}else{
try{
_10.call(this);
}
catch(err){
_d=1;
_e=err;
}
}
}
this.fired=_d;
this.results[_d]=_e;
this.isFiring=false;
if((cb)&&(this.paused)){
_e.addBoth(cb);
}
}});
}
