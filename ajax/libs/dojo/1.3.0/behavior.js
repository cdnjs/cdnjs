/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.behavior"]){
dojo._hasResource["dojo.behavior"]=true;
dojo.provide("dojo.behavior");
dojo.behavior=new function(){
function _1(_2,_3){
if(!_2[_3]){
_2[_3]=[];
}
return _2[_3];
};
var _4=0;
function _5(_6,_7,_8){
var _9={};
for(var x in _6){
if(typeof _9[x]=="undefined"){
if(!_8){
_7(_6[x],x);
}else{
_8.call(_7,_6[x],x);
}
}
}
};
this._behaviors={};
this.add=function(_b){
var _c={};
_5(_b,this,function(_d,_e){
var _f=_1(this._behaviors,_e);
if(typeof _f["id"]!="number"){
_f.id=_4++;
}
var _10=[];
_f.push(_10);
if((dojo.isString(_d))||(dojo.isFunction(_d))){
_d={found:_d};
}
_5(_d,function(_11,_12){
_1(_10,_12).push(_11);
});
});
};
var _13=function(_14,_15,_16){
if(dojo.isString(_15)){
if(_16=="found"){
dojo.publish(_15,[_14]);
}else{
dojo.connect(_14,_16,function(){
dojo.publish(_15,arguments);
});
}
}else{
if(dojo.isFunction(_15)){
if(_16=="found"){
_15(_14);
}else{
dojo.connect(_14,_16,_15);
}
}
}
};
this.apply=function(){
_5(this._behaviors,function(_17,id){
dojo.query(id).forEach(function(_19){
var _1a=0;
var bid="_dj_behavior_"+_17.id;
if(typeof _19[bid]=="number"){
_1a=_19[bid];
if(_1a==(_17.length)){
return;
}
}
for(var x=_1a,_1d;_1d=_17[x];x++){
_5(_1d,function(_1e,_1f){
if(dojo.isArray(_1e)){
dojo.forEach(_1e,function(_20){
_13(_19,_20,_1f);
});
}
});
}
_19[bid]=_17.length;
});
});
};
};
dojo.addOnLoad(dojo.behavior,"apply");
}
