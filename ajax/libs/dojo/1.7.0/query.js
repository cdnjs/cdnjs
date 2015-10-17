/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/query",["./_base/kernel","./has","./on","./_base/array","./_base/lang","./selector/_loader","./selector/_loader!default"],function(_1,_2,on,_3,_4,_5,_6){
"use strict";
_2.add("array-extensible",function(){
return _4.delegate([],{length:1}).length==1&&!_2("bug-for-in-skips-shadowed");
});
var ap=Array.prototype,_7=ap.slice,_8=ap.concat,_9=_3.forEach;
var _a=function(a,_b,_c){
var _d=new (_c||this._NodeListCtor||nl)(a);
return _b?_d._stash(_b):_d;
};
var _e=function(f,a,o){
a=[0].concat(_7.call(a,0));
o=o||_1.global;
return function(_f){
a[0]=_f;
return f.apply(o,a);
};
};
var _10=function(f,o){
return function(){
this.forEach(_e(f,arguments,o));
return this;
};
};
var _11=function(f,o){
return function(){
return this.map(_e(f,arguments,o));
};
};
var _12=function(f,o){
return function(){
return this.filter(_e(f,arguments,o));
};
};
var _13=function(f,g,o){
return function(){
var a=arguments,_14=_e(f,a,o);
if(g.call(o||_1.global,a)){
return this.map(_14);
}
this.forEach(_14);
return this;
};
};
var _15=function(_16){
var _17=this instanceof nl&&_2("array-extensible");
if(typeof _16=="number"){
_16=Array(_16);
}
var _18=(_16&&"length" in _16)?_16:arguments;
if(_17||!_18.sort){
var _19=_17?this:[],l=_19.length=_18.length;
for(var i=0;i<l;i++){
_19[i]=_18[i];
}
if(_17){
return _19;
}
_18=_19;
}
_4._mixin(_18,nlp);
_18._NodeListCtor=function(_1a){
return nl(_1a);
};
return _18;
};
var nl=_15,nlp=nl.prototype=_2("array-extensible")?[]:{};
nl._wrap=nlp._wrap=_a;
nl._adaptAsMap=_11;
nl._adaptAsForEach=_10;
nl._adaptAsFilter=_12;
nl._adaptWithCondition=_13;
_9(["slice","splice"],function(_1b){
var f=ap[_1b];
nlp[_1b]=function(){
return this._wrap(f.apply(this,arguments),_1b=="slice"?this:null);
};
});
_9(["indexOf","lastIndexOf","every","some"],function(_1c){
var f=_3[_1c];
nlp[_1c]=function(){
return f.apply(_1,[this].concat(_7.call(arguments,0)));
};
});
_4.extend(_15,{constructor:nl,_NodeListCtor:nl,toString:function(){
return this.join(",");
},_stash:function(_1d){
this._parent=_1d;
return this;
},on:function(_1e,_1f){
var _20=this.map(function(_21){
return on(_21,_1e,_1f);
});
_20.remove=function(){
for(var i=0;i<_20.length;i++){
_20[i].remove();
}
};
return _20;
},end:function(){
if(this._parent){
return this._parent;
}else{
return new this._NodeListCtor(0);
}
},concat:function(_22){
var t=_4.isArray(this)?this:_7.call(this,0),m=_3.map(arguments,function(a){
return a&&!_4.isArray(a)&&(typeof _15!="undefined"&&a.constructor===_15||a.constructor===this._NodeListCtor)?_7.call(a,0):a;
});
return this._wrap(_8.apply(t,m),this);
},map:function(_23,obj){
return this._wrap(_3.map(this,_23,obj),this);
},forEach:function(_24,_25){
_9(this,_24,_25);
return this;
},filter:function(_26){
var a=arguments,_27=this,_28=0;
if(typeof _26=="string"){
_27=_29._filterResult(this,a[0]);
if(a.length==1){
return _27._stash(this);
}
_28=1;
}
return this._wrap(_3.filter(_27,a[_28],a[_28+1]),this);
},instantiate:function(_2a,_2b){
var c=_4.isFunction(_2a)?_2a:_4.getObject(_2a);
_2b=_2b||{};
return this.forEach(function(_2c){
new c(_2b,_2c);
});
},at:function(){
var t=new this._NodeListCtor(0);
_9(arguments,function(i){
if(i<0){
i=this.length+i;
}
if(this[i]){
t.push(this[i]);
}
},this);
return t._stash(this);
}});
function _2d(_2e,_2f){
var _30=function(_31,_32){
if(typeof _32=="string"){
_32=_1.byId(_32);
if(!_32){
return new _2f([]);
}
}
var _33=typeof _31=="string"?_2e(_31,_32):_31.orphan?_31:[_31];
if(_33.orphan){
return _33;
}
return new _2f(_33);
};
_30.matches=_2e.match||function(_34,_35,_36){
return _30.filter([_34],_35,_36).length>0;
};
_30.filter=_2e.filter||function(_37,_38,_39){
return _30(_38,_39).filter(function(_3a){
return _1.indexOf(_37,_3a)>-1;
});
};
if(typeof _2e!="function"){
var _3b=_2e.search;
_2e=function(_3c,_3d){
return _3b(_3d||document,_3c);
};
}
return _30;
};
var _29=_2d(_6,_15);
_1.query=_2d(_6,function(_3e){
return _15(_3e);
});
_29.load=function(id,_3f,_40,_41){
_5.load(id,_3f,function(_42){
_40(_2d(_42,_15));
});
};
_1._filterQueryResult=_29._filterResult=function(_43,_44,_45){
return new _15(_29.filter(_43,_44,_45));
};
_1.NodeList=_29.NodeList=_15;
return _29;
});
