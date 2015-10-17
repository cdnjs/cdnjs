/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Source"]){
dojo._hasResource["dojo.dnd.Source"]=true;
dojo.provide("dojo.dnd.Source");
dojo.require("dojo.dnd.Selector");
dojo.require("dojo.dnd.Manager");
dojo.declare("dojo.dnd.Source",dojo.dnd.Selector,{isSource:true,horizontal:false,copyOnly:false,selfCopy:false,selfAccept:true,skipForm:false,withHandles:false,autoSync:false,delay:0,accept:["text"],constructor:function(_1,_2){
dojo.mixin(this,dojo.mixin({},_2));
var _3=this.accept;
if(_3.length){
this.accept={};
for(var i=0;i<_3.length;++i){
this.accept[_3[i]]=1;
}
}
this.isDragging=false;
this.mouseDown=false;
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
this._lastX=0;
this._lastY=0;
this.sourceState="";
if(this.isSource){
dojo.addClass(this.node,"dojoDndSource");
}
this.targetState="";
if(this.accept){
dojo.addClass(this.node,"dojoDndTarget");
}
if(this.horizontal){
dojo.addClass(this.node,"dojoDndHorizontal");
}
this.topics=[dojo.subscribe("/dnd/source/over",this,"onDndSourceOver"),dojo.subscribe("/dnd/start",this,"onDndStart"),dojo.subscribe("/dnd/drop",this,"onDndDrop"),dojo.subscribe("/dnd/cancel",this,"onDndCancel")];
},checkAcceptance:function(_5,_6){
if(this==_5){
return !this.copyOnly||this.selfAccept;
}
for(var i=0;i<_6.length;++i){
var _8=_5.getItem(_6[i].id).type;
var _9=false;
for(var j=0;j<_8.length;++j){
if(_8[j] in this.accept){
_9=true;
break;
}
}
if(!_9){
return false;
}
}
return true;
},copyState:function(_b,_c){
if(_b){
return true;
}
if(arguments.length<2){
_c=this==dojo.dnd.manager().target;
}
if(_c){
if(this.copyOnly){
return this.selfCopy;
}
}else{
return this.copyOnly;
}
return false;
},destroy:function(){
dojo.dnd.Source.superclass.destroy.call(this);
dojo.forEach(this.topics,dojo.unsubscribe);
this.targetAnchor=null;
},markupFactory:function(_d,_e){
_d._skipStartup=true;
return new dojo.dnd.Source(_e,_d);
},onMouseMove:function(e){
if(this.isDragging&&this.targetState=="Disabled"){
return;
}
dojo.dnd.Source.superclass.onMouseMove.call(this,e);
var m=dojo.dnd.manager();
if(this.isDragging){
var _11=false;
if(this.current){
if(!this.targetBox||this.targetAnchor!=this.current){
this.targetBox={xy:dojo.coords(this.current,true),w:this.current.offsetWidth,h:this.current.offsetHeight};
}
if(this.horizontal){
_11=(e.pageX-this.targetBox.xy.x)<(this.targetBox.w/2);
}else{
_11=(e.pageY-this.targetBox.xy.y)<(this.targetBox.h/2);
}
}
if(this.current!=this.targetAnchor||_11!=this.before){
this._markTargetAnchor(_11);
m.canDrop(!this.current||m.source!=this||!(this.current.id in this.selection));
}
}else{
if(this.mouseDown&&this.isSource&&(Math.abs(e.pageX-this._lastX)>this.delay||Math.abs(e.pageY-this._lastY)>this.delay)){
var _12=this.getSelectedNodes();
if(_12.length){
m.startDrag(this,_12,this.copyState(dojo.dnd.getCopyKeyState(e),true));
}
}
}
},onMouseDown:function(e){
if(!this.mouseDown&&this._legalMouseDown(e)&&(!this.skipForm||!dojo.dnd.isFormElement(e))){
this.mouseDown=true;
this._lastX=e.pageX;
this._lastY=e.pageY;
dojo.dnd.Source.superclass.onMouseDown.call(this,e);
}
},onMouseUp:function(e){
if(this.mouseDown){
this.mouseDown=false;
dojo.dnd.Source.superclass.onMouseUp.call(this,e);
}
},onDndSourceOver:function(_15){
if(this!=_15){
this.mouseDown=false;
if(this.targetAnchor){
this._unmarkTargetAnchor();
}
}else{
if(this.isDragging){
var m=dojo.dnd.manager();
m.canDrop(this.targetState!="Disabled"&&(!this.current||m.source!=this||!(this.current.id in this.selection)));
}
}
},onDndStart:function(_17,_18,_19){
if(this.autoSync){
this.sync();
}
if(this.isSource){
this._changeState("Source",this==_17?(_19?"Copied":"Moved"):"");
}
var _1a=this.accept&&this.checkAcceptance(_17,_18);
this._changeState("Target",_1a?"":"Disabled");
if(this==_17){
dojo.dnd.manager().overSource(this);
}
this.isDragging=true;
},onDndDrop:function(_1b,_1c,_1d,_1e){
if(this==_1e){
this.onDrop(_1b,_1c,_1d);
}
this.onDndCancel();
},onDndCancel:function(){
if(this.targetAnchor){
this._unmarkTargetAnchor();
this.targetAnchor=null;
}
this.before=true;
this.isDragging=false;
this.mouseDown=false;
this._changeState("Source","");
this._changeState("Target","");
},onDrop:function(_1f,_20,_21){
if(this!=_1f){
this.onDropExternal(_1f,_20,_21);
}else{
this.onDropInternal(_20,_21);
}
},onDropExternal:function(_22,_23,_24){
var _25=this._normalizedCreator;
if(this.creator){
this._normalizedCreator=function(_26,_27){
return _25.call(this,_22.getItem(_26.id).data,_27);
};
}else{
if(_24){
this._normalizedCreator=function(_28,_29){
var t=_22.getItem(_28.id);
var n=_28.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}else{
this._normalizedCreator=function(_2c,_2d){
var t=_22.getItem(_2c.id);
_22.delItem(_2c.id);
return {node:_2c,data:t.data,type:t.type};
};
}
}
this.selectNone();
if(!_24&&!this.creator){
_22.selectNone();
}
this.insertNodes(true,_23,this.before,this.current);
if(!_24&&this.creator){
_22.deleteSelectedNodes();
}
this._normalizedCreator=_25;
},onDropInternal:function(_2f,_30){
var _31=this._normalizedCreator;
if(this.current&&this.current.id in this.selection){
return;
}
if(_30){
if(this.creator){
this._normalizedCreator=function(_32,_33){
return _31.call(this,this.getItem(_32.id).data,_33);
};
}else{
this._normalizedCreator=function(_34,_35){
var t=this.getItem(_34.id);
var n=_34.cloneNode(true);
n.id=dojo.dnd.getUniqueId();
return {node:n,data:t.data,type:t.type};
};
}
}else{
if(!this.current){
return;
}
this._normalizedCreator=function(_38,_39){
var t=this.getItem(_38.id);
return {node:_38,data:t.data,type:t.type};
};
}
this._removeSelection();
this.insertNodes(true,_2f,this.before,this.current);
this._normalizedCreator=_31;
},onDraggingOver:function(){
},onDraggingOut:function(){
},onOverEvent:function(){
dojo.dnd.Source.superclass.onOverEvent.call(this);
dojo.dnd.manager().overSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOver();
}
},onOutEvent:function(){
dojo.dnd.Source.superclass.onOutEvent.call(this);
dojo.dnd.manager().outSource(this);
if(this.isDragging&&this.targetState!="Disabled"){
this.onDraggingOut();
}
},_markTargetAnchor:function(_3b){
if(this.current==this.targetAnchor&&this.before==_3b){
return;
}
if(this.targetAnchor){
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
}
this.targetAnchor=this.current;
this.targetBox=null;
this.before=_3b;
if(this.targetAnchor){
this._addItemClass(this.targetAnchor,this.before?"Before":"After");
}
},_unmarkTargetAnchor:function(){
if(!this.targetAnchor){
return;
}
this._removeItemClass(this.targetAnchor,this.before?"Before":"After");
this.targetAnchor=null;
this.targetBox=null;
this.before=true;
},_markDndStatus:function(_3c){
this._changeState("Source",_3c?"Copied":"Moved");
},_legalMouseDown:function(e){
if(!dojo.dnd._isLmbPressed(e)){
return false;
}
if(!this.withHandles){
return true;
}
for(var _3e=e.target;_3e&&_3e!==this.node;_3e=_3e.parentNode){
if(dojo.hasClass(_3e,"dojoDndHandle")){
return true;
}
if(dojo.hasClass(_3e,"dojoDndItem")){
break;
}
}
return false;
}});
dojo.declare("dojo.dnd.Target",dojo.dnd.Source,{constructor:function(_3f,_40){
this.isSource=false;
dojo.removeClass(this.node,"dojoDndSource");
},markupFactory:function(_41,_42){
_41._skipStartup=true;
return new dojo.dnd.Target(_42,_41);
}});
dojo.declare("dojo.dnd.AutoSource",dojo.dnd.Source,{constructor:function(_43,_44){
this.autoSync=true;
},markupFactory:function(_45,_46){
_45._skipStartup=true;
return new dojo.dnd.AutoSource(_46,_45);
}});
}
