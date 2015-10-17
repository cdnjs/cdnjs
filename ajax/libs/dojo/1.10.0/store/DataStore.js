/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/store/DataStore",["../_base/lang","../_base/declare","../Deferred","../_base/array","./util/QueryResults","./util/SimpleQueryEngine"],function(_1,_2,_3,_4,_5,_6){
var _7=null;
return _2("dojo.store.DataStore",_7,{target:"",constructor:function(_8){
_1.mixin(this,_8);
if(!"idProperty" in _8){
var _9;
try{
_9=this.store.getIdentityAttributes();
}
catch(e){
}
this.idProperty=(!_9||!idAttributes[0])||this.idProperty;
}
var _a=this.store.getFeatures();
if(!_a["dojo.data.api.Read"]){
this.get=null;
}
if(!_a["dojo.data.api.Identity"]){
this.getIdentity=null;
}
if(!_a["dojo.data.api.Write"]){
this.put=this.add=null;
}
},idProperty:"id",store:null,queryEngine:_6,_objectConverter:function(_b){
var _c=this.store;
var _d=this.idProperty;
function _e(_f){
var _10={};
var _11=_c.getAttributes(_f);
for(var i=0;i<_11.length;i++){
var _12=_11[i];
var _13=_c.getValues(_f,_12);
if(_13.length>1){
for(var j=0;j<_13.length;j++){
var _14=_13[j];
if(typeof _14=="object"&&_c.isItem(_14)){
_13[j]=_e(_14);
}
}
_14=_13;
}else{
var _14=_c.getValue(_f,_12);
if(typeof _14=="object"&&_c.isItem(_14)){
_14=_e(_14);
}
}
_10[_11[i]]=_14;
}
if(!(_d in _10)&&_c.getIdentity){
_10[_d]=_c.getIdentity(_f);
}
return _10;
};
return function(_15){
return _b(_15&&_e(_15));
};
},get:function(id,_16){
var _17,_18;
var _19=new _3();
this.store.fetchItemByIdentity({identity:id,onItem:this._objectConverter(function(_1a){
_19.resolve(_17=_1a);
}),onError:function(_1b){
_19.reject(_18=_1b);
}});
if(_17!==undefined){
return _17==null?undefined:_17;
}
if(_18){
throw _18;
}
return _19.promise;
},put:function(_1c,_1d){
_1d=_1d||{};
var id=typeof _1d.id!="undefined"?_1d.id:this.getIdentity(_1c);
var _1e=this.store;
var _1f=this.idProperty;
var _20=new _3();
if(typeof id=="undefined"){
_1e.newItem(_1c);
_1e.save({onComplete:function(){
_20.resolve(_1c);
},onError:function(_21){
_20.reject(_21);
}});
}else{
_1e.fetchItemByIdentity({identity:id,onItem:function(_22){
if(_22){
if(_1d.overwrite===false){
return _20.reject(new Error("Overwriting existing object not allowed"));
}
for(var i in _1c){
if(i!=_1f&&_1c.hasOwnProperty(i)&&_1e.getValue(_22,i)!=_1c[i]){
_1e.setValue(_22,i,_1c[i]);
}
}
}else{
if(_1d.overwrite===true){
return _20.reject(new Error("Creating new object not allowed"));
}
_1e.newItem(_1c);
}
_1e.save({onComplete:function(){
_20.resolve(_1c);
},onError:function(_23){
_20.reject(_23);
}});
},onError:function(_24){
_20.reject(_24);
}});
}
return _20.promise;
},add:function(_25,_26){
(_26=_26||{}).overwrite=false;
return this.put(_25,_26);
},remove:function(id){
var _27=this.store;
var _28=new _3();
this.store.fetchItemByIdentity({identity:id,onItem:function(_29){
try{
if(_29==null){
_28.resolve(false);
}else{
_27.deleteItem(_29);
_27.save();
_28.resolve(true);
}
}
catch(error){
_28.reject(error);
}
},onError:function(_2a){
_28.reject(_2a);
}});
return _28.promise;
},query:function(_2b,_2c){
var _2d;
var _2e=new _3(function(){
_2d.abort&&_2d.abort();
});
_2e.total=new _3();
var _2f=this._objectConverter(function(_30){
return _30;
});
_2d=this.store.fetch(_1.mixin({query:_2b,onBegin:function(_31){
_2e.total.resolve(_31);
},onComplete:function(_32){
_2e.resolve(_4.map(_32,_2f));
},onError:function(_33){
_2e.reject(_33);
}},_2c));
return _5(_2e);
},getIdentity:function(_34){
return _34[this.idProperty];
}});
});
