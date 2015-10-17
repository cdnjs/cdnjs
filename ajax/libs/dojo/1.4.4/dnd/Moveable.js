/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Moveable"]){
dojo._hasResource["dojo.dnd.Moveable"]=true;
dojo.provide("dojo.dnd.Moveable");
dojo.require("dojo.dnd.Mover");
dojo.declare("dojo.dnd.Moveable",null,{handle:"",delay:0,skip:false,constructor:function(_1,_2){
this.node=dojo.byId(_1);
if(!_2){
_2={};
}
this.handle=_2.handle?dojo.byId(_2.handle):null;
if(!this.handle){
this.handle=this.node;
}
this.delay=_2.delay>0?_2.delay:0;
this.skip=_2.skip;
this.mover=_2.mover?_2.mover:dojo.dnd.Mover;
this.events=[dojo.connect(this.handle,"onmousedown",this,"onMouseDown"),dojo.connect(this.handle,"ondragstart",this,"onSelectStart"),dojo.connect(this.handle,"onselectstart",this,"onSelectStart")];
},markupFactory:function(_3,_4){
return new dojo.dnd.Moveable(_4,_3);
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.events=this.node=this.handle=null;
},onMouseDown:function(e){
if(this.skip&&dojo.dnd.isFormElement(e)){
return;
}
if(this.delay){
this.events.push(dojo.connect(this.handle,"onmousemove",this,"onMouseMove"),dojo.connect(this.handle,"onmouseup",this,"onMouseUp"));
this._lastX=e.pageX;
this._lastY=e.pageY;
}else{
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseMove:function(e){
if(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay){
this.onMouseUp(e);
this.onDragDetected(e);
}
dojo.stopEvent(e);
},onMouseUp:function(e){
for(var i=0;i<2;++i){
dojo.disconnect(this.events.pop());
}
dojo.stopEvent(e);
},onSelectStart:function(e){
if(!this.skip||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onDragDetected:function(e){
new this.mover(this.node,e,this);
},onMoveStart:function(_5){
dojo.publish("/dnd/move/start",[_5]);
dojo.addClass(dojo.body(),"dojoMove");
dojo.addClass(this.node,"dojoMoveItem");
},onMoveStop:function(_6){
dojo.publish("/dnd/move/stop",[_6]);
dojo.removeClass(dojo.body(),"dojoMove");
dojo.removeClass(this.node,"dojoMoveItem");
},onFirstMove:function(_7){
},onMove:function(_8,_9){
this.onMoving(_8,_9);
var s=_8.node.style;
s.left=_9.l+"px";
s.top=_9.t+"px";
this.onMoved(_8,_9);
},onMoving:function(_a,_b){
},onMoved:function(_c,_d){
}});
}
