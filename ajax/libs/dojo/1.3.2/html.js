/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.html"]){
dojo._hasResource["dojo.html"]=true;
dojo.provide("dojo.html");
dojo.require("dojo.parser");
(function(){
var _1=0;
dojo.html._secureForInnerHtml=function(_2){
return _2.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
dojo.html._emptyNode=dojo.empty;
dojo.html._setNodeContent=function(_3,_4,_5){
if(_5){
dojo.html._emptyNode(_3);
}
if(typeof _4=="string"){
var _6="",_7="",_8=0,_9=_3.nodeName.toLowerCase();
switch(_9){
case "tr":
_6="<tr>";
_7="</tr>";
_8+=1;
case "tbody":
case "thead":
_6="<tbody>"+_6;
_7+="</tbody>";
_8+=1;
case "table":
_6="<table>"+_6;
_7+="</table>";
_8+=1;
break;
}
if(_8){
var n=_3.ownerDocument.createElement("div");
n.innerHTML=_6+_4+_7;
do{
n=n.firstChild;
}while(--_8);
dojo.forEach(n.childNodes,function(n){
_3.appendChild(n.cloneNode(true));
});
}else{
_3.innerHTML=_4;
}
}else{
if(_4.nodeType){
_3.appendChild(_4);
}else{
dojo.forEach(_4,function(n){
_3.appendChild(n.cloneNode(true));
});
}
}
return _3;
};
dojo.declare("dojo.html._ContentSetter",null,{node:"",content:"",id:"",cleanContent:false,extractContent:false,parseContent:false,constructor:function(_d,_e){
dojo.mixin(this,_d||{});
_e=this.node=dojo.byId(this.node||_e);
if(!this.id){
this.id=["Setter",(_e)?_e.id||_e.tagName:"",_1++].join("_");
}
if(!(this.node||_e)){
new Error(this.declaredClass+": no node provided to "+this.id);
}
},set:function(_f,_10){
if(undefined!==_f){
this.content=_f;
}
if(_10){
this._mixin(_10);
}
this.onBegin();
this.setContent();
this.onEnd();
return this.node;
},setContent:function(){
var _11=this.node;
if(!_11){
console.error("setContent given no node");
}
try{
_11=dojo.html._setNodeContent(_11,this.content);
}
catch(e){
var _12=this.onContentError(e);
try{
_11.innerHTML=_12;
}
catch(e){
console.error("Fatal "+this.declaredClass+".setContent could not change content due to "+e.message,e);
}
}
this.node=_11;
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
var _14=this.content;
if(dojo.isString(_14)){
if(this.cleanContent){
_14=dojo.html._secureForInnerHtml(_14);
}
if(this.extractContent){
var _15=_14.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_15){
_14=_15[1];
}
}
}
this.empty();
this.content=_14;
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
},onContentError:function(err){
return "Error occured setting content: "+err;
},_mixin:function(_17){
var _18={},key;
for(key in _17){
if(key in _18){
continue;
}
this[key]=_17[key];
}
},_parse:function(){
var _1a=this.node;
try{
this.parseResults=dojo.parser.parse(_1a,true);
}
catch(e){
this._onError("Content",e,"Error parsing in _ContentSetter#"+this.id);
}
},_onError:function(_1b,err,_1d){
var _1e=this["on"+_1b+"Error"].call(this,err);
if(_1d){
console.error(_1d,err);
}else{
if(_1e){
dojo.html._setNodeContent(this.node,_1e,true);
}
}
}});
dojo.html.set=function(_1f,_20,_21){
if(undefined==_20){
console.warn("dojo.html.set: no cont argument provided, using empty string");
_20="";
}
if(!_21){
return dojo.html._setNodeContent(_1f,_20,true);
}else{
var op=new dojo.html._ContentSetter(dojo.mixin(_21,{content:_20,node:_1f}));
return op.set();
}
};
})();
}
