/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!window["OpenAjax"]){
OpenAjax=new function(){
var t=true;
var f=false;
var g=window;
var _4;
var _5="org.openajax.hub.";
var h={};
this.hub=h;
h.implementer="http://openajax.org";
h.implVersion="0.6";
h.specVersion="0.6";
h.implExtraData={};
var _4={};
h.libraries=_4;
h.registerLibrary=function(_7,_8,_9,_a){
_4[_7]={prefix:_7,namespaceURI:_8,version:_9,extraData:_a};
this.publish(_5+"registerLibrary",_4[_7]);
};
h.unregisterLibrary=function(_b){
this.publish(_5+"unregisterLibrary",_4[_b]);
delete _4[_b];
};
h._subscriptions={c:{},s:[]};
h._cleanup=[];
h._subIndex=0;
h._pubDepth=0;
h.subscribe=function(_c,_d,_e,_f,_10){
if(!_e){
_e=window;
}
var _11=_c+"."+this._subIndex;
var sub={scope:_e,cb:_d,fcb:_10,data:_f,sid:this._subIndex++,hdl:_11};
var _13=_c.split(".");
this._subscribe(this._subscriptions,_13,0,sub);
return _11;
};
h.publish=function(_14,_15){
var _16=_14.split(".");
this._pubDepth++;
this._publish(this._subscriptions,_16,0,_14,_15);
this._pubDepth--;
if((this._cleanup.length>0)&&(this._pubDepth==0)){
for(var i=0;i<this._cleanup.length;i++){
this.unsubscribe(this._cleanup[i].hdl);
}
delete (this._cleanup);
this._cleanup=[];
}
};
h.unsubscribe=function(sub){
var _19=sub.split(".");
var sid=_19.pop();
this._unsubscribe(this._subscriptions,_19,0,sid);
};
h._subscribe=function(_1b,_1c,_1d,sub){
var _1f=_1c[_1d];
if(_1d==_1c.length){
_1b.s.push(sub);
}else{
if(typeof _1b.c=="undefined"){
_1b.c={};
}
if(typeof _1b.c[_1f]=="undefined"){
_1b.c[_1f]={c:{},s:[]};
this._subscribe(_1b.c[_1f],_1c,_1d+1,sub);
}else{
this._subscribe(_1b.c[_1f],_1c,_1d+1,sub);
}
}
};
h._publish=function(_20,_21,_22,_23,msg){
if(typeof _20!="undefined"){
var _25;
if(_22==_21.length){
_25=_20;
}else{
this._publish(_20.c[_21[_22]],_21,_22+1,_23,msg);
this._publish(_20.c["*"],_21,_22+1,_23,msg);
_25=_20.c["**"];
}
if(typeof _25!="undefined"){
var _26=_25.s;
var max=_26.length;
for(var i=0;i<max;i++){
if(_26[i].cb){
var sc=_26[i].scope;
var cb=_26[i].cb;
var fcb=_26[i].fcb;
var d=_26[i].data;
if(typeof cb=="string"){
cb=sc[cb];
}
if(typeof fcb=="string"){
fcb=sc[fcb];
}
if((!fcb)||(fcb.call(sc,_23,msg,d))){
cb.call(sc,_23,msg,d);
}
}
}
}
}
};
h._unsubscribe=function(_2d,_2e,_2f,sid){
if(typeof _2d!="undefined"){
if(_2f<_2e.length){
var _31=_2d.c[_2e[_2f]];
this._unsubscribe(_31,_2e,_2f+1,sid);
if(_31.s.length==0){
for(var x in _31.c){
return;
}
delete _2d.c[_2e[_2f]];
}
return;
}else{
var _33=_2d.s;
var max=_33.length;
for(var i=0;i<max;i++){
if(sid==_33[i].sid){
if(this._pubDepth>0){
_33[i].cb=null;
this._cleanup.push(_33[i]);
}else{
_33.splice(i,1);
}
return;
}
}
}
}
};
h.reinit=function(){
for(var lib in OpenAjax.hub.libraries){
delete OpenAjax.hub.libraries[lib];
}
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{});
delete OpenAjax._subscriptions;
OpenAjax._subscriptions={c:{},s:[]};
delete OpenAjax._cleanup;
OpenAjax._cleanup=[];
OpenAjax._subIndex=0;
OpenAjax._pubDepth=0;
};
};
OpenAjax.hub.registerLibrary("OpenAjax","http://openajax.org/hub","0.6",{});
}
