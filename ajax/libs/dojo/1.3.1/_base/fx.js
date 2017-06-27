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
dojo.require("dojo._base.declare");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.html");
(function(){
var d=dojo;
var _2=d.mixin;
dojo._Line=function(_3,_4){
this.start=_3;
this.end=_4;
};
dojo._Line.prototype.getValue=function(n){
return ((this.end-this.start)*n)+this.start;
};
d.declare("dojo._Animation",null,{constructor:function(_6){
_2(this,_6);
if(d.isArray(this.curve)){
this.curve=new d._Line(this.curve[0],this.curve[1]);
}
},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(_7,_8){
if(this[_7]){
if(dojo.config.debugAtAllCosts){
this[_7].apply(this,_8||[]);
}else{
try{
this[_7].apply(this,_8||[]);
}
catch(e){
console.error("exception in animation handler for:",_7);
console.error(e);
}
}
}
return this;
},play:function(_9,_a){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(_a){
_t._stopTimer();
_t._active=_t._paused=false;
_t._percent=0;
}else{
if(_t._active&&!_t._paused){
return _t;
}
}
_t._fire("beforeBegin");
var de=_9||_t.delay,_p=dojo.hitch(_t,"_play",_a);
if(de>0){
_t._delayTimer=setTimeout(_p,de);
return _t;
}
_p();
return _t;
},_play:function(_e){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._startTime=new Date().valueOf();
if(_t._paused){
_t._startTime-=_t.duration*_t._percent;
}
_t._endTime=_t._startTime+_t.duration;
_t._active=true;
_t._paused=false;
var _10=_t.curve.getValue(_t._percent);
if(!_t._percent){
if(!_t._startRepeatCount){
_t._startRepeatCount=_t.repeat;
}
_t._fire("onBegin",[_10]);
}
_t._fire("onPlay",[_10]);
_t._cycle();
return _t;
},pause:function(){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
_t._stopTimer();
if(!_t._active){
return _t;
}
_t._paused=true;
_t._fire("onPause",[_t.curve.getValue(_t._percent)]);
return _t;
},gotoPercent:function(_12,_13){
var _t=this;
_t._stopTimer();
_t._active=_t._paused=true;
_t._percent=_12;
if(_13){
_t.play();
}
return _t;
},stop:function(_15){
var _t=this;
if(_t._delayTimer){
_t._clearTimer();
}
if(!_t._timer){
return _t;
}
_t._stopTimer();
if(_15){
_t._percent=1;
}
_t._fire("onStop",[_t.curve.getValue(_t._percent)]);
_t._active=_t._paused=false;
return _t;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}
return "stopped";
},_cycle:function(){
var _t=this;
if(_t._active){
var _18=new Date().valueOf();
var _19=(_18-_t._startTime)/(_t._endTime-_t._startTime);
if(_19>=1){
_19=1;
}
_t._percent=_19;
if(_t.easing){
_19=_t.easing(_19);
}
_t._fire("onAnimate",[_t.curve.getValue(_19)]);
if(_t._percent<1){
_t._startTimer();
}else{
_t._active=false;
if(_t.repeat>0){
_t.repeat--;
_t.play(null,true);
}else{
if(_t.repeat==-1){
_t.play(null,true);
}else{
if(_t._startRepeatCount){
_t.repeat=_t._startRepeatCount;
_t._startRepeatCount=0;
}
}
}
_t._percent=0;
_t._fire("onEnd");
_t._stopTimer();
}
}
return _t;
},_clearTimer:function(){
clearTimeout(this._delayTimer);
delete this._delayTimer;
}});
var ctr=0,_1b=[],_1c=null,_1d={run:function(){
}};
dojo._Animation.prototype._startTimer=function(){
if(!this._timer){
this._timer=d.connect(_1d,"run",this,"_cycle");
ctr++;
}
if(!_1c){
_1c=setInterval(d.hitch(_1d,"run"),this.rate);
}
};
dojo._Animation.prototype._stopTimer=function(){
if(this._timer){
d.disconnect(this._timer);
this._timer=null;
ctr--;
}
if(ctr<=0){
clearInterval(_1c);
_1c=null;
ctr=0;
}
};
var _1e=d.isIE?function(_1f){
var ns=_1f.style;
if(!ns.width.length&&d.style(_1f,"width")=="auto"){
ns.width="auto";
}
}:function(){
};
dojo._fade=function(_21){
_21.node=d.byId(_21.node);
var _22=_2({properties:{}},_21),_23=(_22.properties.opacity={});
_23.start=!("start" in _22)?function(){
return +d.style(_22.node,"opacity")||0;
}:_22.start;
_23.end=_22.end;
var _24=d.animateProperty(_22);
d.connect(_24,"beforeBegin",d.partial(_1e,_22.node));
return _24;
};
dojo.fadeIn=function(_25){
return d._fade(_2({end:1},_25));
};
dojo.fadeOut=function(_26){
return d._fade(_2({end:0},_26));
};
dojo._defaultEasing=function(n){
return 0.5+((Math.sin((n+1.5)*Math.PI))/2);
};
var _28=function(_29){
this._properties=_29;
for(var p in _29){
var _2b=_29[p];
if(_2b.start instanceof d.Color){
_2b.tempColor=new d.Color();
}
}
};
_28.prototype.getValue=function(r){
var ret={};
for(var p in this._properties){
var _2f=this._properties[p],_30=_2f.start;
if(_30 instanceof d.Color){
ret[p]=d.blendColors(_30,_2f.end,r,_2f.tempColor).toCss();
}else{
if(!d.isArray(_30)){
ret[p]=((_2f.end-_30)*r)+_30+(p!="opacity"?_2f.units||"px":0);
}
}
}
return ret;
};
dojo.animateProperty=function(_31){
_31.node=d.byId(_31.node);
if(!_31.easing){
_31.easing=d._defaultEasing;
}
var _32=new d._Animation(_31);
d.connect(_32,"beforeBegin",_32,function(){
var pm={};
for(var p in this.properties){
if(p=="width"||p=="height"){
this.node.display="block";
}
var _35=this.properties[p];
_35=pm[p]=_2({},(d.isObject(_35)?_35:{end:_35}));
if(d.isFunction(_35.start)){
_35.start=_35.start();
}
if(d.isFunction(_35.end)){
_35.end=_35.end();
}
var _36=(p.toLowerCase().indexOf("color")>=0);
function _37(_38,p){
var v={height:_38.offsetHeight,width:_38.offsetWidth}[p];
if(v!==undefined){
return v;
}
v=d.style(_38,p);
return (p=="opacity")?+v:(_36?v:parseFloat(v));
};
if(!("end" in _35)){
_35.end=_37(this.node,p);
}else{
if(!("start" in _35)){
_35.start=_37(this.node,p);
}
}
if(_36){
_35.start=new d.Color(_35.start);
_35.end=new d.Color(_35.end);
}else{
_35.start=(p=="opacity")?+_35.start:parseFloat(_35.start);
}
}
this.curve=new _28(pm);
});
d.connect(_32,"onAnimate",d.hitch(d,"style",_32.node));
return _32;
};
dojo.anim=function(_3b,_3c,_3d,_3e,_3f,_40){
return d.animateProperty({node:_3b,duration:_3d||d._Animation.prototype.duration,properties:_3c,easing:_3e,onEnd:_3f}).play(_40||0);
};
})();
}
