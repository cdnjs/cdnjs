/*
	Copyright (c) 2004-2010, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
dojo.require("dojo.parser");
(function(){
var _1=0,d=dojo;
dojo.html._secureForInnerHtml=function(_2){
return _2.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(_3,_4){
d.empty(_3);
if(_4){
if(typeof _4=="string"){
_4=d._toDom(_4,_3.ownerDocument);
}
if(!_4.nodeType&&d.isArrayLike(_4)){
for(var _5=_4.length,i=0;i<_4.length;i=_5==_4.length?i+1:0){
d.place(_4[i],_3,"last");
}
}else{
d.place(_4,_3,"last");
}
}
return _3;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,constructor:function(_6,_7){
dojo.mixin(this,_6||{});
_7=this.node=dojo.byId(this.node||_7);
if(!this.id){
this.id=["Setter",(_7)?_7.id||_7.tagName:"",_1++].join("_");
}
},set:function(_8,_9){
if(undefined!==_8){
this.content=_8;
}
if(_9){
this._mixin(_9);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var _a=this.node;
if(!_a){
throw new Error(this.declaredClass+": setContent given no node");
}
try{
_a=dojo.html._setNodeContent(_a,this.content);
}
catch(e){
var _b=this.onContentError(e);
try{
_a.innerHTML=_b;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=_a;
},empty:function(){
if(this.parseResults&&this.parseResults.length){
dojo.forEach(this.parseResults,function(w){
if(w.destroy){
w.destroy();
}
});
delete this.parseResults;
}
dojo.html._emptyNode(this.node);
},onBegin:function(){
var _c=this.content;
if(dojo.isString(_c)){
if(this.cleanContent){
_c=dojo.html._secureForInnerHtml(_c);
}
if(this.extractContent){
var _d=_c.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_d){
_c=_d[1];
}
}
}
this.empty();
this.content=_c;
return this.node;
},onEnd:function(){
if(this.parseContent){
this._parse();
}
return this.node;
},tearDown:function(){
delete this.parseResults;
delete this.node;
delete this.content;
},onContentError:function(_e){
return "Error occured setting content: "+_e;
},_mixin:function(_f){
var _10={},key;
for(key in _f){
if(key in _10){
continue;
}
this[key]=_f[key];
}
},_parse:function(){
var _11=this.node;
try{
this.parseResults=dojo.parser.parse({rootNode:_11,dir:this.dir,lang:this.lang});
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(_12,err,_13){
var _14=this["on"+_12+"Error"].call(this,err);
if(_13){
console.error(_13,err);
}else{
if(_14){
dojo.html._setNodeContent(this.node,_14,true);
}
}
}});
dojo.html.set=function(_15,_16,_17){
if(undefined==_16){
console.warn("dojo.html.set: no cont argument provided, using empty string");
_16="";
}
if(!_17){
return dojo.html._setNodeContent(_15,_16,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_17,{content:_16,node:_15}));
return op.set();
}
};
})();
}
