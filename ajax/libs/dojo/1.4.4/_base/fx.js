/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.fx"]){
dojo._hasResource["dojo._base.fx"]=true;
dojo.provide("dojo._base.fx");
dojo.require("dojo._base.Color");
dojo.require("dojo._base.connect");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.html");
(function(){
var d=dojo;
var _1=d._mixin;
dojo._Line=function(_2,_3){
this.start=_2;
this.end=_3;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
dojo.Animation=function(_4){
_1(this,_4);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
};
d._Animation=d.Animation;
d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){
var _5=this._percent,_6=this.easing;
return _6?_6(_5):_5;
},_fire:function(_7,_8){
var a=_8||[];
if(this[_7]){
if(d.config.debugAtAllCosts){
this[_7].apply(this,a);
}else{
try{
this[_7].apply(this,a);
}
catch(e){
console.error("exception in animation handler for:",_7);
console.error(e);
}
}
}
return this;
},play:function(_9,_a){
var _b=this;
if(_b._delayTimer){
_b._clearTimer();
}
if(_a){
_b._stopTimer();
_b._active=_b._paused=false;
_b._percent=0;
}else{
if(_b._active&&!_b._paused){
return _b;
}
}
_b._fire("beforeBegin",[_b.node]);
var de=_9||_b.delay,_c=dojo.hitch(_b,"_play",_a);
if(de>0){
_b._delayTimer=setTimeout(_c,de);
return _b;
}
_c();
return _b;
},_play:function(_d){
var _e=this;
if(_e._delayTimer){
_e._clearTimer();
}
_e._startTime=new Date().valueOf();
if(_e._paused){
_e._startTime-=_e.duration*_e._percent;
}
_e._endTime=_e._startTime+_e.duration;
_e._active=true;
_e._paused=false;
var _f=_e.curve.getValue(_e._getStep());
if(!_e._percent){
if(!_e._startRepeatCount){
_e._startRepeatCount=_e.repeat;
}
_e._fire("onBegin",[_f]);
}
_e._fire("onPlay",[_f]);
_e._cycle();
return _e;
},pause:function(){
var _10=this;
if(_10._delayTimer){
_10._clearTimer();
}
_10._stopTimer();
if(!_10._active){
return _10;
}
_10._paused=true;
_10._fire("onPause",[_10.curve.getValue(_10._getStep())]);
return _10;
},gotoPercent:function(_11,_12){
var _13=this;
_13._stopTimer();
_13._active=_13._paused=true;
_13._percent=_11;
if(_12){
_13.play();
}
return _13;
},stop:function(_14){
var _15=this;
if(_15._delayTimer){
_15._clearTimer();
}
if(!_15._timer){
return _15;
}
_15._stopTimer();
if(_14){
_15._percent=1;
}
_15._fire("onStop",[_15.curve.getValue(_15._getStep())]);
_15._active=_15._paused=false;
return _15;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _16=this;
if(_16._active){
var _17=new Date().valueOf();
var _18=(_17-_16._startTime)/(_16._endTime-_16._startTime);
if(_18>=1){
_18=1;
}
_16._percent=_18;
if(_16.easing){
_18=_16.easing(_18);
}
_16._fire("onAnimate",[_16.curve.getValue(_18)]);
if(_16._percent<1){
_16._startTimer();
}else{
_16._active=false;
if(_16.repeat>0){
_16.repeat--;
_16.play(null,true);
}else{
if(_16.repeat==-1){
_16.play(null,true);
}else{
if(_16._startRepeatCount){
_16.repeat=_16._startRepeatCount;
_16._startRepeatCount=0;
}
}
}
_16._percent=0;
_16._fire("onEnd",[_16.node]);
!_16.repeat&&_16._stopTimer();
}
}
return _16;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_19=[],_1a=null,_1b={run:function(){
}};
d.extend(d.Animation,{_startTimer:function(){
if(!this._timer){
this._timer=d.connect(_1b,"run",this,"_cycle");
ctr++;
}
if(!_1a){
_1a=setInterval(d.hitch(_1b,"run"),this.rate);
}
},_stopTimer:function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_1a);
_1a=null;
ctr=0;
}
}});
var _1c=d.isIE?function(_1d){
var ns=_1d.style;
if(!ns.width.length&&d.style(_1d,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(_1e){
_1e.node=d.byId(_1e.node);
var _1f=_1({properties:{}},_1e),_20=(_1f.properties.opacity={});
_20.start=!("start" in _1f)?function(){
return +d.style(_1f.node,"opacity")||0;
}:_1f.start;
_20.end=_1f.end;
var _21=d.animateProperty(_1f);
d.connect(_21,"beforeBegin",d.partial(_1c,_1f.node));
return _21;
};
dojo.fadeIn=function(_22){
return d._fade(_1({end:1},_22));
};
dojo.fadeOut=function(_23){
return d._fade(_1({end:0},_23));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _24=function(_25){
this._properties=_25;
for(var p in _25){
var _26=_25[p];
if(_26.start instanceof d.Color){
_26.tempColor=new d.Color();
}
}
};
_24.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var _27=this._properties[p],_28=_27.start;
if(_28 instanceof d.Color){
ret[p]=d.blendColors(_28,_27.end,r,_27.tempColor).toCss();
}else{
if(!d.isArray(_28)){
ret[p]=((_27.end-_28)*r)+_28+(p!="opacity"?_27.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(_29){
var n=_29.node=d.byId(_29.node);
if(!_29.easing){
_29.easing=d._defaultEasing;
}
var _2a=new d.Animation(_29);
d.connect(_2a,"beforeBegin",_2a,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var _2b=this.properties[p];
if(d.isFunction(_2b)){
_2b=_2b(n);
}
_2b=pm[p]=_1({},(d.isObject(_2b)?_2b:{end:_2b}));
if(d.isFunction(_2b.start)){
_2b.start=_2b.start(n);
}
if(d.isFunction(_2b.end)){
_2b.end=_2b.end(n);
}
var _2c=(p.toLowerCase().indexOf("color")>=0);
function _2d(_2e,p){
var v={height:_2e.offsetHeight,width:_2e.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(_2e,p);
return (p=="opacity")?+v:(_2c?v:parseFloat(v));
};
if(!("end" in _2b)){
_2b.end=_2d(n,p);
}else{
if(!("start" in _2b)){
_2b.start=_2d(n,p);
}
}
if(_2c){
_2b.start=new d.Color(_2b.start);
_2b.end=new d.Color(_2b.end);
}else{
_2b.start=(p=="opacity")?+_2b.start:parseFloat(_2b.start);
}
}
this.curve=new _24(pm);
});
d.connect(_2a,"onAnimate",d.hitch(d,"style",_2a.node));
return _2a;
};
dojo.anim=function(_2f,_30,_31,_32,_33,_34){
return d.animateProperty({node:_2f,duration:_31||d.Animation.prototype.duration,properties:_30,easing:_32,onEnd:_33}).play(_34||0);
};
})();
}
