/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.fx"]){
dojo._hasResource["dojo.fx"]=true;
dojo.provide("dojo.fx");
dojo.require("dojo.fx.Toggler");
(function(){
var d=dojo,_2={_fire:function(_3,_4){
if(this[_3]){
this[_3].apply(this,_4||[]);
}
return this;
}};
var _5=function(_6){
this._index=-1;
this._animations=_6||[];
this._current=this._onAnimateCtx=this._onEndCtx=null;
this.duration=0;
d.forEach(this._animations,function(a){
this.duration+=a.duration;
if(a.delay){
this.duration+=a.delay;
}
},this);
};
d.extend(_5,{_onAnimate:function(){
this._fire("onAnimate",arguments);
},_onEnd:function(){
d.disconnect(this._onAnimateCtx);
d.disconnect(this._onEndCtx);
this._onAnimateCtx=this._onEndCtx=null;
if(this._index+1==this._animations.length){
this._fire("onEnd");
}else{
this._current=this._animations[++this._index];
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play(0,true);
}
},play:function(_8,_9){
if(!this._current){
this._current=this._animations[this._index=0];
}
if(!_9&&this._current.status()=="playing"){
return this;
}
var _a=d.connect(this._current,"beforeBegin",this,function(){
this._fire("beforeBegin");
}),_b=d.connect(this._current,"onBegin",this,function(_c){
this._fire("onBegin",arguments);
}),_d=d.connect(this._current,"onPlay",this,function(_e){
this._fire("onPlay",arguments);
d.disconnect(_a);
d.disconnect(_b);
d.disconnect(_d);
});
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");
this._current.play.apply(this._current,arguments);
return this;
},pause:function(){
if(this._current){
var e=d.connect(this._current,"onPause",this,function(arg){
this._fire("onPause",arguments);
d.disconnect(e);
});
this._current.pause();
}
return this;
},gotoPercent:function(_11,_12){
this.pause();
var _13=this.duration*_11;
this._current=null;
d.some(this._animations,function(a){
if(a.duration<=_13){
this._current=a;
return true;
}
_13-=a.duration;
return false;
});
if(this._current){
this._current.gotoPercent(_13/this._current.duration,_12);
}
return this;
},stop:function(_15){
if(this._current){
if(_15){
for(;this._index+1<this._animations.length;++this._index){
this._animations[this._index].stop(true);
}
this._current=this._animations[this._index];
}
var e=d.connect(this._current,"onStop",this,function(arg){
this._fire("onStop",arguments);
d.disconnect(e);
});
this._current.stop();
}
return this;
},status:function(){
return this._current?this._current.status():"stopped";
},destroy:function(){
if(this._onAnimateCtx){
d.disconnect(this._onAnimateCtx);
}
if(this._onEndCtx){
d.disconnect(this._onEndCtx);
}
}});
d.extend(_5,_2);
dojo.fx.chain=function(_18){
return new _5(_18);
};
var _19=function(_1a){
this._animations=_1a||[];
this._connects=[];
this._finished=0;
this.duration=0;
d.forEach(_1a,function(a){
var _1c=a.duration;
if(a.delay){
_1c+=a.delay;
}
if(this.duration<_1c){
this.duration=_1c;
}
this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));
},this);
this._pseudoAnimation=new d._Animation({curve:[0,1],duration:this.duration});
var _1d=this;
d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop"],function(evt){
_1d._connects.push(d.connect(_1d._pseudoAnimation,evt,function(){
_1d._fire(evt,arguments);
}));
});
};
d.extend(_19,{_doAction:function(_1f,_20){
d.forEach(this._animations,function(a){
a[_1f].apply(a,_20);
});
return this;
},_onEnd:function(){
if(++this._finished==this._animations.length){
this._fire("onEnd");
}
},_call:function(_22,_23){
var t=this._pseudoAnimation;
t[_22].apply(t,_23);
},play:function(_25,_26){
this._finished=0;
this._doAction("play",arguments);
this._call("play",arguments);
return this;
},pause:function(){
this._doAction("pause",arguments);
this._call("pause",arguments);
return this;
},gotoPercent:function(_27,_28){
var ms=this.duration*_27;
d.forEach(this._animations,function(a){
a.gotoPercent(a.duration<ms?1:(ms/a.duration),_28);
});
this._call("gotoPercent",arguments);
return this;
},stop:function(_2b){
this._doAction("stop",arguments);
this._call("stop",arguments);
return this;
},status:function(){
return this._pseudoAnimation.status();
},destroy:function(){
d.forEach(this._connects,dojo.disconnect);
}});
d.extend(_19,_2);
dojo.fx.combine=function(_2c){
return new _19(_2c);
};
dojo.fx.wipeIn=function(_2d){
_2d.node=d.byId(_2d.node);
var _2e=_2d.node,s=_2e.style,o;
var _31=d.animateProperty(d.mixin({properties:{height:{start:function(){
o=s.overflow;
s.overflow="hidden";
if(s.visibility=="hidden"||s.display=="none"){
s.height="1px";
s.display="";
s.visibility="";
return 1;
}else{
var _32=d.style(_2e,"height");
return Math.max(_32,1);
}
},end:function(){
return _2e.scrollHeight;
}}}},_2d));
d.connect(_31,"onEnd",function(){
s.height="auto";
s.overflow=o;
});
return _31;
};
dojo.fx.wipeOut=function(_33){
var _34=_33.node=d.byId(_33.node),s=_34.style,o;
var _37=d.animateProperty(d.mixin({properties:{height:{end:1}}},_33));
d.connect(_37,"beforeBegin",function(){
o=s.overflow;
s.overflow="hidden";
s.display="";
});
d.connect(_37,"onEnd",function(){
s.overflow=o;
s.height="auto";
s.display="none";
});
return _37;
};
dojo.fx.slideTo=function(_38){
var _39=_38.node=d.byId(_38.node),top=null,_3b=null;
var _3c=(function(n){
return function(){
var cs=d.getComputedStyle(n);
var pos=cs.position;
top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);
_3b=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);
if(pos!="absolute"&&pos!="relative"){
var ret=d.coords(n,true);
top=ret.y;
_3b=ret.x;
n.style.position="absolute";
n.style.top=top+"px";
n.style.left=_3b+"px";
}
};
})(_39);
_3c();
var _41=d.animateProperty(d.mixin({properties:{top:_38.top||0,left:_38.left||0}},_38));
d.connect(_41,"beforeBegin",_41,_3c);
return _41;
};
})();
}
