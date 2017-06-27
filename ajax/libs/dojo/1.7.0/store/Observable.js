/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/store/Observable",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array"],function(_1,_2,_3,_4){
var ds=_2.getObject("dojo.store",true);
return ds.Observable=function(_5){
var _6,_7=[],_8=0;
_5.notify=function(_9,_a){
_8++;
var _b=_7.slice();
for(var i=0,l=_b.length;i<l;i++){
_b[i](_9,_a);
}
};
var _c=_5.query;
_5.query=function(_d,_e){
_e=_e||{};
var _f=_c.apply(this,arguments);
if(_f&&_f.forEach){
var _10=_2.mixin({},_e);
delete _10.start;
delete _10.count;
var _11=_5.queryEngine&&_5.queryEngine(_d,_10);
var _12=_8;
var _13=[],_14;
_f.observe=function(_15,_16){
if(_13.push(_15)==1){
_7.push(_14=function(_17,_18){
_3.when(_f,function(_19){
var _1a=_19.length!=_e.count;
var i,l;
if(++_12!=_8){
throw new Error("Query is out of date, you must observe() the query prior to any data modifications");
}
var _1b,_1c=-1,_1d=-1;
if(_18!==_6){
for(i=0,l=_19.length;i<l;i++){
var _1e=_19[i];
if(_5.getIdentity(_1e)==_18){
_1b=_1e;
_1c=i;
if(_11||!_17){
_19.splice(i,1);
}
break;
}
}
}
if(_11){
if(_17&&(_11.matches?_11.matches(_17):_11([_17]).length)){
var _1f=_1c>-1?_1c:_19.length;
_19.splice(_1f,0,_17);
_1d=_4.indexOf(_11(_19),_17);
_19.splice(_1f,1);
_19.splice(_1d,0,_17);
if((_e.start&&_1d==0)||(!_1a&&_1d==_19.length-1)){
_1d=-1;
}
}
}else{
if(_17){
_1d=_1c>=0?_1c:(_5.defaultIndex||0);
}
}
if((_1c>-1||_1d>-1)&&(_16||!_11||(_1c!=_1d))){
var _20=_13.slice();
for(i=0;_15=_20[i];i++){
_15(_17||_1b,_1c,_1d);
}
}
});
});
}
return {cancel:function(){
_13.splice(_4.indexOf(_13,_15),1);
if(!_13.length){
_7.splice(_4.indexOf(_7,_14),1);
}
}};
};
}
return _f;
};
var _21;
function _22(_23,_24){
var _25=_5[_23];
if(_25){
_5[_23]=function(_26){
if(_21){
return _25.apply(this,arguments);
}
_21=true;
try{
var _27=_25.apply(this,arguments);
_3.when(_27,function(_28){
_24((typeof _28=="object"&&_28)||_26);
});
return _27;
}
finally{
_21=false;
}
};
}
};
_22("put",function(_29){
_5.notify(_29,_5.getIdentity(_29));
});
_22("add",function(_2a){
_5.notify(_2a);
});
_22("remove",function(id){
_5.notify(undefined,id);
});
return _5;
};
});
