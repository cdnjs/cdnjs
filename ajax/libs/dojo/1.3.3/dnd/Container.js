/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Container"]){
dojo._hasResource["dojo.dnd.Container"]=true;
dojo.provide("dojo.dnd.Container");
dojo.require("dojo.dnd.common");
dojo.require("dojo.parser");
dojo.declare("dojo.dnd.Container",null,{skipForm:false,constructor:function(_1,_2){
this.node=dojo.byId(_1);
if(!_2){
_2={};
}
this.creator=_2.creator||null;
this.skipForm=_2.skipForm;
this.parent=_2.dropParent&&dojo.byId(_2.dropParent);
this.map={};
this.current=null;
this.containerState="";
dojo.addClass(this.node,"dojoDndContainer");
if(!(_2&&_2._skipStartup)){
this.startup();
}
this.events=[dojo.connect(this.node,"onmouseover",this,"onMouseOver"),dojo.connect(this.node,"onmouseout",this,"onMouseOut"),dojo.connect(this.node,"ondragstart",this,"onSelectStart"),dojo.connect(this.node,"onselectstart",this,"onSelectStart")];
},creator:function(){
},getItem:function(_3){
return this.map[_3];
},setItem:function(_4,_5){
this.map[_4]=_5;
},delItem:function(_6){
delete this.map[_6];
},forInItems:function(f,o){
o=o||dojo.global;
var m=this.map,e=dojo.dnd._empty;
for(var i in m){
if(i in e){
continue;
}
f.call(o,m[i],i,this);
}
return o;
},clearItems:function(){
this.map={};
},getAllNodes:function(){
return dojo.query("> .dojoDndItem",this.parent);
},sync:function(){
var _c={};
this.getAllNodes().forEach(function(_d){
if(_d.id){
var _e=this.getItem(_d.id);
if(_e){
_c[_d.id]=_e;
return;
}
}else{
_d.id=dojo.dnd.getUniqueId();
}
var _f=_d.getAttribute("dndType"),_10=_d.getAttribute("dndData");
_c[_d.id]={data:_10||_d.innerHTML,type:_f?_f.split(/\s*,\s*/):["text"]};
},this);
this.map=_c;
return this;
},insertNodes:function(_11,_12,_13){
if(!this.parent.firstChild){
_13=null;
}else{
if(_12){
if(!_13){
_13=this.parent.firstChild;
}
}else{
if(_13){
_13=_13.nextSibling;
}
}
}
if(_13){
for(var i=0;i<_11.length;++i){
var t=this._normalizedCreator(_11[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.insertBefore(t.node,_13);
}
}else{
for(var i=0;i<_11.length;++i){
var t=this._normalizedCreator(_11[i]);
this.setItem(t.node.id,{data:t.data,type:t.type});
this.parent.appendChild(t.node);
}
}
return this;
},destroy:function(){
dojo.forEach(this.events,dojo.disconnect);
this.clearItems();
this.node=this.parent=this.current=null;
},markupFactory:function(_16,_17){
_16._skipStartup=true;
return new dojo.dnd.Container(_17,_16);
},startup:function(){
if(!this.parent){
this.parent=this.node;
if(this.parent.tagName.toLowerCase()=="table"){
var c=this.parent.getElementsByTagName("tbody");
if(c&&c.length){
this.parent=c[0];
}
}
}
this.defaultCreator=dojo.dnd._defaultCreator(this.parent);
this.sync();
},onMouseOver:function(e){
var n=e.relatedTarget;
while(n){
if(n==this.node){
break;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(!n){
this._changeState("Container","Over");
this.onOverEvent();
}
n=this._getChildByEvent(e);
if(this.current==n){
return;
}
if(this.current){
this._removeItemClass(this.current,"Over");
}
if(n){
this._addItemClass(n,"Over");
}
this.current=n;
},onMouseOut:function(e){
for(var n=e.relatedTarget;n;){
if(n==this.node){
return;
}
try{
n=n.parentNode;
}
catch(x){
n=null;
}
}
if(this.current){
this._removeItemClass(this.current,"Over");
this.current=null;
}
this._changeState("Container","");
this.onOutEvent();
},onSelectStart:function(e){
if(!this.skipForm||!dojo.dnd.isFormElement(e)){
dojo.stopEvent(e);
}
},onOverEvent:function(){
},onOutEvent:function(){
},_changeState:function(_1e,_1f){
var _20="dojoDnd"+_1e;
var _21=_1e.toLowerCase()+"State";
dojo.removeClass(this.node,_20+this[_21]);
dojo.addClass(this.node,_20+_1f);
this[_21]=_1f;
},_addItemClass:function(_22,_23){
dojo.addClass(_22,"dojoDndItem"+_23);
},_removeItemClass:function(_24,_25){
dojo.removeClass(_24,"dojoDndItem"+_25);
},_getChildByEvent:function(e){
var _27=e.target;
if(_27){
for(var _28=_27.parentNode;_28;_27=_28,_28=_27.parentNode){
if(_28==this.parent&&dojo.hasClass(_27,"dojoDndItem")){
return _27;
}
}
}
return null;
},_normalizedCreator:function(_29,_2a){
var t=(this.creator||this.defaultCreator).call(this,_29,_2a);
if(!dojo.isArray(t.type)){
t.type=["text"];
}
if(!t.node.id){
t.node.id=dojo.dnd.getUniqueId();
}
dojo.addClass(t.node,"dojoDndItem");
return t;
}});
dojo.dnd._createNode=function(tag){
if(!tag){
return dojo.dnd._createSpan;
}
return function(_2d){
return dojo.create(tag,{innerHTML:_2d});
};
};
dojo.dnd._createTrTd=function(_2e){
var tr=dojo.create("tr");
dojo.create("td",{innerHTML:_2e},tr);
return tr;
};
dojo.dnd._createSpan=function(_30){
return dojo.create("span",{innerHTML:_30});
};
dojo.dnd._defaultCreatorNodes={ul:"li",ol:"li",div:"div",p:"div"};
dojo.dnd._defaultCreator=function(_31){
var tag=_31.tagName.toLowerCase();
var c=tag=="tbody"||tag=="thead"?dojo.dnd._createTrTd:dojo.dnd._createNode(dojo.dnd._defaultCreatorNodes[tag]);
return function(_34,_35){
var _36=_34&&dojo.isObject(_34),_37,_38,n;
if(_36&&_34.tagName&&_34.nodeType&&_34.getAttribute){
_37=_34.getAttribute("dndData")||_34.innerHTML;
_38=_34.getAttribute("dndType");
_38=_38?_38.split(/\s*,\s*/):["text"];
n=_34;
}else{
_37=(_36&&_34.data)?_34.data:_34;
_38=(_36&&_34.type)?_34.type:["text"];
n=(_35=="avatar"?dojo.dnd._createSpan:c)(String(_37));
}
n.id=dojo.dnd.getUniqueId();
return {node:n,data:_37,type:_38};
};
};
}
