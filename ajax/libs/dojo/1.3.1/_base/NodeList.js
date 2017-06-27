/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.NodeList"]){
dojo._hasResource["dojo._base.NodeList"]=true;
dojo.provide("dojo._base.NodeList");
dojo.require("dojo._base.lang");
dojo.require("dojo._base.array");
(function(){
var d=dojo;
var ap=Array.prototype,_3=ap.slice,_4=ap.concat;
var _5=function(a){
a.constructor=d.NodeList;
dojo._mixin(a,d.NodeList.prototype);
return a;
};
var _7=function(f,a,o){
a=[0].concat(_3.call(a,0));
o=o||d.global;
return function(_b){
a[0]=_b;
return f.apply(o,a);
};
};
var _c=function(f,o){
return function(){
this.forEach(_7(f,arguments,o));
return this;
};
};
var _f=function(f,o){
return function(){
return this.map(_7(f,arguments,o));
};
};
var _12=function(f,o){
return function(){
return this.filter(_7(f,arguments,o));
};
};
var _15=function(f,g,o){
return function(){
var a=arguments,_1a=_7(f,a,o);
if(g.call(o||d.global,a)){
return this.map(_1a);
}
this.forEach(_1a);
return this;
};
};
var _1b=function(a){
return a.length==1&&d.isString(a[0]);
};
var _1d=function(_1e){
var p=_1e.parentNode;
if(p){
p.removeChild(_1e);
}
};
dojo.NodeList=function(){
return _5(Array.apply(null,arguments));
};
var nl=d.NodeList,nlp=nl.prototype;
nl._wrap=_5;
nl._adaptAsMap=_f;
nl._adaptAsForEach=_c;
nl._adaptAsFilter=_12;
nl._adaptWithCondition=_15;
d.forEach(["slice","splice"],function(_22){
var f=ap[_22];
nlp[_22]=function(){
return _5(f.apply(this,arguments));
};
});
d.forEach(["indexOf","lastIndexOf","every","some"],function(_24){
var f=d[_24];
nlp[_24]=function(){
return f.apply(d,[this].concat(_3.call(arguments,0)));
};
});
d.forEach(["attr","style"],function(_26){
nlp[_26]=_15(d[_26],_1b);
});
d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(_27){
nlp[_27]=_c(d[_27]);
});
dojo.extend(dojo.NodeList,{concat:function(_28){
var t=d.isArray(this)?this:_3.call(this,0),m=d.map(arguments,function(a){
return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?_3.call(a,0):a;
});
return _5(_4.apply(t,m));
},map:function(_2c,obj){
return _5(d.map(this,_2c,obj));
},forEach:function(_2e,_2f){
d.forEach(this,_2e,_2f);
return this;
},coords:_f(d.coords),place:function(_30,_31){
var _32=d.query(_30)[0];
return this.forEach(function(_33){
d.place(_33,_32,_31);
});
},orphan:function(_34){
return (_34?d._filterQueryResult(this,_34):this).forEach(_1d);
},adopt:function(_35,_36){
return d.query(_35).place(item[0],_36);
},query:function(_37){
if(!_37){
return this;
}
var ret=this.map(function(_39){
return d.query(_37,_39).filter(function(_3a){
return _3a!==undefined;
});
});
return _5(_4.apply([],ret));
},filter:function(_3b){
var a=arguments,_3d=this,_3e=0;
if(d.isString(_3b)){
_3d=d._filterQueryResult(this,a[0]);
if(a.length==1){
return _3d;
}
_3e=1;
}
return _5(d.filter(_3d,a[_3e],a[_3e+1]));
},addContent:function(_3f,_40){
var c=d.isString(_3f)?d._toDom(_3f,this[0]&&this[0].ownerDocument):_3f,i,l=this.length-1;
for(i=0;i<l;++i){
d.place(c.cloneNode(true),this[i],_40);
}
if(l>=0){
d.place(c,this[l],_40);
}
return this;
},instantiate:function(_44,_45){
var c=d.isFunction(_44)?_44:d.getObject(_44);
_45=_45||{};
return this.forEach(function(_47){
new c(_45,_47);
});
},at:function(){
var t=new dojo.NodeList();
d.forEach(arguments,function(i){
if(this[i]){
t.push(this[i]);
}
},this);
return t;
}});
d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){
var _oe="on"+evt;
nlp[_oe]=function(a,b){
return this.connect(_oe,a,b);
};
});
})();
}
