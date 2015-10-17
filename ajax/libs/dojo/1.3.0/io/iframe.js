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
var _c=_b.contentDocument||(((_b.name)&&(_b.document)&&(document.getElementsByTagName("iframe")[_b.name].contentWindow)&&(document.getElementsByTagName("iframe")[_b.name].contentWindow.document)))||((_b.name)&&(document.frames[_b.name])&&(document.frames[_b.name].document))||null;
return _c;
},send:function(_d){
if(!this["_frame"]){
this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");
}
var _e=dojo._ioSetArgs(_d,function(_f){
_f.canceled=true;
_f.ioArgs._callNext();
},function(dfd){
var _11=null;
try{
var _12=dfd.ioArgs;
var dii=dojo.io.iframe;
var ifd=dii.doc(dii._frame);
var _15=_12.handleAs;
_11=ifd;
if(_15!="html"){
if(_15=="xml"){
if(dojo.isIE){
dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();
var _16=(dii._frame.contentWindow.document).documentElement.innerText;
_16=_16.replace(/>\s+</g,"><");
_16=dojo.trim(_16);
var _17={responseText:_16};
_11=dojo._contentHandlers["xml"](_17);
}
}else{
_11=ifd.getElementsByTagName("textarea")[0].value;
if(_15=="json"){
_11=dojo.fromJson(_11);
}else{
if(_15=="javascript"){
_11=dojo.eval(_11);
}
}
}
}
}
catch(e){
_11=e;
}
finally{
_12._callNext();
}
return _11;
},function(_18,dfd){
dfd.ioArgs._hasError=true;
dfd.ioArgs._callNext();
return _18;
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
var dfd=this._currentDfd=this._dfdQueue.shift();
var _1e=dfd.ioArgs;
var _1f=_1e.args;
_1e._contentToClean=[];
var fn=dojo.byId(_1f["form"]);
var _21=_1f["content"]||{};
if(fn){
if(_21){
var _22=function(_23,_24){
var tn;
if(dojo.isIE){
tn=dojo.doc.createElement("<input type='hidden' name='"+_23+"'>");
}else{
tn=dojo.doc.createElement("input");
tn.type="hidden";
tn.name=_23;
}
tn.value=_24;
fn.appendChild(tn);
_1e._contentToClean.push(_23);
};
for(var x in _21){
var val=_21[x];
if(dojo.isArray(val)&&val.length>1){
var i;
for(i=0;i<val.length;i++){
_22(x,val[i]);
}
}else{
if(!fn[x]){
_22(x,val);
}else{
fn[x].value=val;
}
}
}
}
var _29=fn.getAttributeNode("action");
var _2a=fn.getAttributeNode("method");
var _2b=fn.getAttributeNode("target");
if(_1f["url"]){
_1e._originalAction=_29?_29.value:null;
if(_29){
_29.value=_1f.url;
}else{
fn.setAttribute("action",_1f.url);
}
}
if(!_2a||!_2a.value){
if(_2a){
_2a.value=(_1f["method"])?_1f["method"]:"post";
}else{
fn.setAttribute("method",(_1f["method"])?_1f["method"]:"post");
}
}
_1e._originalTarget=_2b?_2b.value:null;
if(_2b){
_2b.value=this._iframeName;
}else{
fn.setAttribute("target",this._iframeName);
}
fn.target=this._iframeName;
fn.submit();
}else{
var _2c=_1f.url+(_1f.url.indexOf("?")>-1?"&":"?")+_1e.query;
this.setSrc(this._frame,_2c,true);
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
var _2e=dfd.ioArgs;
var _2f=_2e.args;
var _30=dojo.byId(_2f.form);
if(_30){
var _31=_2e._contentToClean;
for(var i=0;i<_31.length;i++){
var key=_31[i];
if(dojo.isSafari<3){
for(var j=0;j<_30.childNodes.length;j++){
var _35=_30.childNodes[j];
if(_35.name==key){
dojo.destroy(_35);
break;
}
}
}else{
dojo.destroy(_30[key]);
_30[key]=null;
}
}
if(_2e["_originalAction"]){
_30.setAttribute("action",_2e._originalAction);
}
if(_2e["_originalTarget"]){
_30.setAttribute("target",_2e._originalTarget);
_30.target=_2e._originalTarget;
}
}
_2e._finished=true;
}};
}
