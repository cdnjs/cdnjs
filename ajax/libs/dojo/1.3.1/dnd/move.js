/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.move"]){
dojo._hasResource["dojo.dnd.move"]=true;
dojo.provide("dojo.dnd.move");
dojo.require("dojo.dnd.Mover");
dojo.require("dojo.dnd.Moveable");
dojo.declare("dojo.dnd.move.constrainedMoveable",dojo.dnd.Moveable,{constraints:function(){
},within:false,markupFactory:function(_1,_2){
return new dojo.dnd.move.constrainedMoveable(_2,_1);
},constructor:function(_3,_4){
if(!_4){
_4={};
}
this.constraints=_4.constraints;
this.within=_4.within;
},onFirstMove:function(_5){
var c=this.constraintBox=this.constraints.call(this,_5);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(this.within){
var mb=dojo.marginBox(_5.node);
c.r-=mb.w;
c.b-=mb.h;
}
},onMove:function(_8,_9){
var c=this.constraintBox,s=_8.node.style;
s.left=(_9.l<c.l?c.l:c.r<_9.l?c.r:_9.l)+"px";
s.top=(_9.t<c.t?c.t:c.b<_9.t?c.b:_9.t)+"px";
}});
dojo.declare("dojo.dnd.move.boxConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{box:{},markupFactory:function(_c,_d){
return new dojo.dnd.move.boxConstrainedMoveable(_d,_c);
},constructor:function(_e,_f){
var box=_f&&_f.box;
this.constraints=function(){
return box;
};
}});
dojo.declare("dojo.dnd.move.parentConstrainedMoveable",dojo.dnd.move.constrainedMoveable,{area:"content",markupFactory:function(_11,_12){
return new dojo.dnd.move.parentConstrainedMoveable(_12,_11);
},constructor:function(_13,_14){
var _15=_14&&_14.area;
this.constraints=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_15=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_15=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_15=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
}});
dojo.dnd.move.constrainedMover=function(fun,_1b){
dojo.deprecated("dojo.dnd.move.constrainedMover, use dojo.dnd.move.constrainedMoveable instead");
var _1c=function(_1d,e,_1f){
dojo.dnd.Mover.call(this,_1d,e,_1f);
};
dojo.extend(_1c,dojo.dnd.Mover.prototype);
dojo.extend(_1c,{onMouseMove:function(e){
dojo.dnd.autoScroll(e);
var m=this.marginBox,c=this.constraintBox,l=m.l+e.pageX,t=m.t+e.pageY;
l=l<c.l?c.l:c.r<l?c.r:l;
t=t<c.t?c.t:c.b<t?c.b:t;
this.host.onMove(this,{l:l,t:t});
},onFirstMove:function(){
dojo.dnd.Mover.prototype.onFirstMove.call(this);
var c=this.constraintBox=fun.call(this);
c.r=c.l+c.w;
c.b=c.t+c.h;
if(_1b){
var mb=dojo.marginBox(this.node);
c.r-=mb.w;
c.b-=mb.h;
}
}});
return _1c;
};
dojo.dnd.move.boxConstrainedMover=function(box,_28){
dojo.deprecated("dojo.dnd.move.boxConstrainedMover, use dojo.dnd.move.boxConstrainedMoveable instead");
return dojo.dnd.move.constrainedMover(function(){
return box;
},_28);
};
dojo.dnd.move.parentConstrainedMover=function(_29,_2a){
dojo.deprecated("dojo.dnd.move.parentConstrainedMover, use dojo.dnd.move.parentConstrainedMoveable instead");
var fun=function(){
var n=this.node.parentNode,s=dojo.getComputedStyle(n),mb=dojo._getMarginBox(n,s);
if(_29=="margin"){
return mb;
}
var t=dojo._getMarginExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_29=="border"){
return mb;
}
t=dojo._getBorderExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
if(_29=="padding"){
return mb;
}
t=dojo._getPadExtents(n,s);
mb.l+=t.l,mb.t+=t.t,mb.w-=t.w,mb.h-=t.h;
return mb;
};
return dojo.dnd.move.constrainedMover(fun,_2a);
};
dojo.dnd.constrainedMover=dojo.dnd.move.constrainedMover;
dojo.dnd.boxConstrainedMover=dojo.dnd.move.boxConstrainedMover;
dojo.dnd.parentConstrainedMover=dojo.dnd.move.parentConstrainedMover;
}
