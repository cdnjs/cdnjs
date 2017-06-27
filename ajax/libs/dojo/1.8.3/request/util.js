/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/util",["exports","../errors/RequestError","../errors/CancelError","../Deferred","../io-query","../_base/array","../_base/lang"],function(_1,_2,_3,_4,_5,_6,_7){
_1.deepCopy=function deepCopy(_8,_9){
for(var _a in _9){
var _b=_8[_a],_c=_9[_a];
if(_b!==_c){
if(_b&&typeof _b==="object"&&_c&&typeof _c==="object"){
_1.deepCopy(_b,_c);
}else{
_8[_a]=_c;
}
}
}
return _8;
};
_1.deepCreate=function deepCreate(_d,_e){
_e=_e||{};
var _f=_7.delegate(_d),_10,_11;
for(_10 in _d){
_11=_d[_10];
if(_11&&typeof _11==="object"){
_f[_10]=_1.deepCreate(_11,_e[_10]);
}
}
return _1.deepCopy(_f,_e);
};
var _12=Object.freeze||function(obj){
return obj;
};
function _13(_14){
return _12(_14);
};
_1.deferred=function deferred(_15,_16,_17,_18,_19,_1a){
var def=new _4(function(_1b){
_16&&_16(def,_15);
if(!_1b||!(_1b instanceof _2)&&!(_1b instanceof _3)){
return new _3("Request canceled",_15);
}
return _1b;
});
def.response=_15;
def.isValid=_17;
def.isReady=_18;
def.handleResponse=_19;
function _1c(_1d){
_1d.response=_15;
throw _1d;
};
var _1e=def.then(_13).otherwise(_1c);
if(_1.notify){
_1e.then(_7.hitch(_1.notify,"emit","load"),_7.hitch(_1.notify,"emit","error"));
}
var _1f=_1e.then(function(_20){
return _20.data||_20.text;
});
var _21=_12(_7.delegate(_1f,{response:_1e}));
if(_1a){
def.then(function(_22){
_1a.call(def,_22);
},function(_23){
_1a.call(def,_15,_23);
});
}
def.promise=_21;
def.then=_21.then;
return def;
};
_1.addCommonMethods=function addCommonMethods(_24,_25){
_6.forEach(_25||["GET","POST","PUT","DELETE"],function(_26){
_24[(_26==="DELETE"?"DEL":_26).toLowerCase()]=function(url,_27){
_27=_7.delegate(_27||{});
_27.method=_26;
return _24(url,_27);
};
});
};
_1.parseArgs=function parseArgs(url,_28,_29){
var _2a=_28.data,_2b=_28.query;
if(_2a&&!_29){
if(typeof _2a==="object"){
_28.data=_5.objectToQuery(_2a);
}
}
if(_2b){
if(typeof _2b==="object"){
_2b=_5.objectToQuery(_2b);
}
if(_28.preventCache){
_2b+=(_2b?"&":"")+"request.preventCache="+(+(new Date));
}
}else{
if(_28.preventCache){
_2b="request.preventCache="+(+(new Date));
}
}
if(url&&_2b){
url+=(~url.indexOf("?")?"&":"?")+_2b;
}
return {url:url,options:_28,getHeader:function(_2c){
return null;
}};
};
_1.checkStatus=function(_2d){
_2d=_2d||0;
return (_2d>=200&&_2d<300)||_2d===304||_2d===1223||!_2d;
};
});
