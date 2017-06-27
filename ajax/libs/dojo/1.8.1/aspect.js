/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/aspect",[],function(){
"use strict";
var _1,_2=0;
function _3(_4,_5,_6,_7){
var _8=_4[_5];
var _9=_5=="around";
var _a;
if(_9){
var _b=_6(function(){
return _8.advice(this,arguments);
});
_a={remove:function(){
_a.cancelled=true;
},advice:function(_c,_d){
return _a.cancelled?_8.advice(_c,_d):_b.apply(_c,_d);
}};
}else{
_a={remove:function(){
var _e=_a.previous;
var _f=_a.next;
if(!_f&&!_e){
delete _4[_5];
}else{
if(_e){
_e.next=_f;
}else{
_4[_5]=_f;
}
if(_f){
_f.previous=_e;
}
}
},id:_2++,advice:_6,receiveArguments:_7};
}
if(_8&&!_9){
if(_5=="after"){
var _10=_8;
while(_10){
_8=_10;
_10=_10.next;
}
_8.next=_a;
_a.previous=_8;
}else{
if(_5=="before"){
_4[_5]=_a;
_a.next=_8;
_8.previous=_a;
}
}
}else{
_4[_5]=_a;
}
return _a;
};
function _11(_12){
return function(_13,_14,_15,_16){
var _17=_13[_14],_18;
if(!_17||_17.target!=_13){
_13[_14]=_18=function(){
var _19=_2;
var _1a=arguments;
var _1b=_18.before;
while(_1b){
_1a=_1b.advice.apply(this,_1a)||_1a;
_1b=_1b.next;
}
if(_18.around){
var _1c=_18.around.advice(this,_1a);
}
var _1d=_18.after;
while(_1d&&_1d.id<_19){
if(_1d.receiveArguments){
var _1e=_1d.advice.apply(this,_1a);
_1c=_1e===_1?_1c:_1e;
}else{
_1c=_1d.advice.call(this,_1c,_1a);
}
_1d=_1d.next;
}
return _1c;
};
if(_17){
_18.around={advice:function(_1f,_20){
return _17.apply(_1f,_20);
}};
}
_18.target=_13;
}
var _21=_3((_18||_17),_12,_15,_16);
_15=null;
return _21;
};
};
var _22=_11("after");
var _23=_11("before");
var _24=_11("around");
return {before:_23,around:_24,after:_22};
});
