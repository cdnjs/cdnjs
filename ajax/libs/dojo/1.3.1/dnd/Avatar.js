/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.dnd.Avatar"]){
dojo._hasResource["dojo.dnd.Avatar"]=true;
dojo.provide("dojo.dnd.Avatar");
dojo.require("dojo.dnd.common");
dojo.declare("dojo.dnd.Avatar",null,{constructor:function(_1){
this.manager=_1;
this.construct();
},construct:function(){
var a=dojo.create("table",{"class":"dojoDndAvatar",style:{position:"absolute",zIndex:"1999",margin:"0px"}}),b=dojo.create("tbody",null,a),tr=dojo.create("tr",null,b),td=dojo.create("td",{innerHTML:this._generateText()},tr),k=Math.min(5,this.manager.nodes.length),i=0,_8=this.manager.source,_9;
dojo.attr(tr,{"class":"dojoDndAvatarHeader",style:{opacity:0.9}});
for(;i<k;++i){
if(_8.creator){
_9=_8._normalizedCreator(_8.getItem(this.manager.nodes[i].id).data,"avatar").node;
}else{
_9=this.manager.nodes[i].cloneNode(true);
if(_9.tagName.toLowerCase()=="tr"){
var _a=dojo.create("table"),_b=dojo.create("tbody",null,_a);
_b.appendChild(_9);
_9=_a;
}
}
_9.id="";
tr=dojo.create("tr",null,b);
td=dojo.create("td",null,tr);
td.appendChild(_9);
dojo.attr(tr,{"class":"dojoDndAvatarItem",style:{opacity:(9-i)/10}});
}
this.node=a;
},destroy:function(){
dojo.destroy(this.node);
this.node=false;
},update:function(){
dojo[(this.manager.canDropFlag?"add":"remove")+"Class"](this.node,"dojoDndAvatarCanDrop");
dojo.query("tr.dojoDndAvatarHeader td",this.node).forEach(function(_c){
_c.innerHTML=this._generateText();
},this);
},_generateText:function(){
return this.manager.nodes.length.toString();
}});
}
