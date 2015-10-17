/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.io.iframe"]){
dojo._hasResource["dojo.io.iframe"]=true;
dojo.provide("dojo.io.iframe");
dojo.io.iframe={create:function(_1,_2,_3){
if(window[_1]){
return window[_1];
}
if(window.frames[_1]){
return window.frames[_1];
}
var _4=null;
var _5=_3;
if(!_5){
if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){
console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");
}
_5=(dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo","resources/blank.html"));
}
var _6=dojo.isIE?"<iframe name=\""+_1+"\" src=\""+_5+"\" onload=\""+_2+"\">":"iframe";
_4=dojo.doc.createElement(_6);
with(_4){
name=_1;
setAttribute("name",_1);
id=_1;
}
dojo.body().appendChild(_4);
window[_1]=_4;
with(_4.style){
if(!(dojo.isSafari<3)){
position="absolute";
}
left=top="1px";
height=width="1px";
visibility="hidden";
}
if(!dojo.isIE){
this.setSrc(_4,_5,true);
_4.onload=new Function(_2);
}
return _4;
},setSrc:function(_7,_8,_9){
try{
if(!_9){
if(dojo.isWebKit){
_7.location=_8;
}else{
frames[_7.name].location=_8;
}
}else{
var _a;
if(dojo.isIE||dojo.isWebKit>521){
_a=_7.contentWindow.document;
}else{
if(dojo.isSafari){
_a=_7.document;
}else{
_a=_7.contentWindow;
}
}
if(!_a){
_7.location=_8;
return;
}else{
_a.location.replace(_8);
}
}
}
catch(e){
}
},doc:function(_b){
var _c=_b.contentDocument||(((_b.name)&&(_b.document)&&(dojo.doc.getElementsByTagName("iframe")[_b.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[_b.name].contentWindow.document)))||((_b.name)&&(dojo.doc.frames[_b.name])&&(dojo.doc.frames[_b.name].document))||null;
return _c;
},send:function(_d){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var _e=dojo._ioSetArgs(_d,function(_f){
_f.canceled=true;
_f.ioArgs._callNext();
},function(dfd){
var _10=null;
try{
var _11=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _12=_11.handleAs;
_10=ifd;
if(_12!="html"){
if(_12=="xml"){
if(dojo.isIE){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _13=(dii._frame.contentWindow.document).documentElement.innerText;
_13=_13.replace(/>\s+</g,"><");
_13=dojo.trim(_13);
var _14={responseText:_13};
_10=dojo._contentHandlers["xml"](_14);
}
}else{
_10=ifd.getElementsByTagName("textarea")[0].value;
if(_12=="json"){
_10=dojo.fromJson(_10);
}else{
if(_12=="javascript"){
_10=dojo.eval(_10);
}
}
}
}
}
catch(e){
_10=e;
}
finally{
_11._callNext();
}
return _10;
},function(_15,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _15;
});
_e.ioArgs._callNext=function(){
if(!this["_calledNext"]){
this._calledNext=true;
dojo.io.iframe._currentDfd=null;
dojo.io.iframe._fireNextRequest();
}
};
this._dfdQueue.push(_e);
this._fireNextRequest();
dojo._ioWatch(_e,function(dfd){
return !dfd.ioArgs["_hasError"];
},function(dfd){
return (!!dfd.ioArgs["_finished"]);
},function(dfd){
if(dfd.ioArgs._finished){
dfd.callback(dfd);
}else{
dfd.errback(new Error("Invalid dojo.io.iframe request state"));
}
});
return _e;
},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){
try{
if((this._currentDfd)||(this._dfdQueue.length==0)){
return;
}
do{
var dfd=this._currentDfd=this._dfdQueue.shift();
}while(dfd&&dfd.canceled&&this._dfdQueue.length);
if(!dfd||dfd.canceled){
this._currentDfd=null;
return;
}
var _16=dfd.ioArgs;
var _17=_16.args;
_16._contentToClean=[];
var fn=dojo.byId(_17["form"]);
var _18=_17["content"]||{};
if(fn){
if(_18){
var _19=function(_1a,_1b){
var tn;
if(dojo.isIE){
tn=dojo.doc.createElement("<input type='hidden' name='"+_1a+"'>");
}else{
tn=dojo.doc.createElement("input");
tn.type="hidden";
tn.name=_1a;
}
tn.value=_1b;
fn.appendChild(tn);
_16._contentToClean.push(_1a);
};
for(var x in _18){
var val=_18[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_19(x,val[i]);
}
}else{
if(!fn[x]){
_19(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _1c=fn.getAttributeNode("action");
var _1d=fn.getAttributeNode("method");
var _1e=fn.getAttributeNode("target");
if(_17["url"]){
_16._originalAction=_1c?_1c.value:null;
if(_1c){
_1c.value=_17.url;
}else{
fn.setAttribute("action",_17.url);
}
}
if(!_1d||!_1d.value){
if(_1d){
_1d.value=(_17["method"])?_17["method"]:"post";
}else{
fn.setAttribute("method",(_17["method"])?_17["method"]:"post");
}
}
_16._originalTarget=_1e?_1e.value:null;
if(_1e){
_1e.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
dojo._ioNotifyStart(dfd);
fn.submit();
}else{
var _1f=_17.url+(_17.url.indexOf("?")>-1?"&":"?")+_16.query;
dojo._ioNotifyStart(dfd);
this.setSrc(this._frame,_1f,true);
}
}
catch(e){
dfd.errback(e);
}
},_iframeOnload:function(){
var dfd=this._currentDfd;
if(!dfd){
this._fireNextRequest();
return;
}
var _20=dfd.ioArgs;
var _21=_20.args;
var _22=dojo.byId(_21.form);
if(_22){
var _23=_20._contentToClean;
for(var i=0;i<_23.length;i++){
var key=_23[i];
for(var j=0;j<_22.childNodes.length;j++){
var _24=_22.childNodes[j];
if(_24.name==key){
dojo.destroy(_24);
break;
}
}
}
if(_20["_originalAction"]){
_22.setAttribute("action",_20._originalAction);
}
if(_20["_originalTarget"]){
_22.setAttribute("target",_20._originalTarget);
_22.target=_20._originalTarget;
}
}
_20._finished=true;
}};
}
