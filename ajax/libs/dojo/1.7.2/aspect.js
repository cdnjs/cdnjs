/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/aspect",[],function(){
"use strict";
var _1=0;
function _2(_3,_4,_5,_6){
var _7=_3[_4];
var _8=_4=="around";
var _9;
if(_8){
var _a=_5(function(){
return _7.advice(this,arguments);
});
_9={remove:function(){
_9.cancelled=true;
},advice:function(_b,_c){
return _9.cancelled?_7.advice(_b,_c):_a.apply(_b,_c);
}};
}else{
_9={remove:function(){
var _d=_9.previous;
var _e=_9.next;
if(!_e&&!_d){
delete _3[_4];
}else{
if(_d){
_d.next=_e;
}else{
_3[_4]=_e;
}
if(_e){
_e.previous=_d;
}
}
},id:_1++,advice:_5,receiveArguments:_6};
}
if(_7&&!_8){
if(_4=="after"){
var _f=_7;
while(_f){
_7=_f;
_f=_f.next;
}
_7.next=_9;
_9.previous=_7;
}else{
if(_4=="before"){
_3[_4]=_9;
_9.next=_7;
_7.previous=_9;
}
}
}else{
_3[_4]=_9;
}
return _9;
};
function _10(_11){
return function(_12,_13,_14,_15){
var _16=_12[_13],_17;
if(!_16||_16.target!=_12){
_12[_13]=_17=function(){
var _18=_1;
var _19=arguments;
var _1a=_17.before;
while(_1a){
_19=_1a.advice.apply(this,_19)||_19;
_1a=_1a.next;
}
if(_17.around){
var _1b=_17.around.advice(this,_19);
}
var _1c=_17.after;
while(_1c&&_1c.id<_18){
_1b=_1c.receiveArguments?_1c.advice.apply(this,_19)||_1b:_1c.advice.call(this,_1b);
_1c=_1c.next;
}
return _1b;
};
if(_16){
_17.around={advice:function(_1d,_1e){
return _16.apply(_1d,_1e);
}};
}
_17.target=_12;
}
var _1f=_2((_17||_16),_11,_14,_15);
_14=null;
return _1f;
};
};
return {before:_10("before"),around:_10("around"),after:_10("after")};
});
