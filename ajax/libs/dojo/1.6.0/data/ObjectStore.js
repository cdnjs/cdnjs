/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.data.ObjectStore"]){
dojo._hasResource["dojo.data.ObjectStore"]=true;
dojo.provide("dojo.data.ObjectStore");
dojo.require("dojo.regexp");
dojo.declare("dojo.data.ObjectStore",null,{objectStore:null,constructor:function(_1){
dojo.mixin(this,_1);
},labelProperty:"label",getValue:function(_2,_3,_4){
return typeof _2.get==="function"?_2.get(_3):_3 in _2?_2[_3]:_4;
},getValues:function(_5,_6){
var _7=this.getValue(_5,_6);
return _7 instanceof Array?_7:_7===undefined?[]:[_7];
},getAttributes:function(_8){
var _9=[];
for(var i in _8){
if(_8.hasOwnProperty(i)&&!(i.charAt(0)=="_"&&i.charAt(1)=="_")){
_9.push(i);
}
}
return _9;
},hasAttribute:function(_a,_b){
return _b in _a;
},containsValue:function(_c,_d,_e){
return dojo.indexOf(this.getValues(_c,_d),_e)>-1;
},isItem:function(_f){
return (typeof _f=="object")&&_f&&!(_f instanceof Date);
},isItemLoaded:function(_10){
return _10&&typeof _10.load!=="function";
},loadItem:function(_11){
var _12;
if(typeof _11.item.load==="function"){
dojo.when(_11.item.load(),function(_13){
_12=_13;
var _14=_13 instanceof Error?_11.onError:_11.onItem;
if(_14){
_14.call(_11.scope,_13);
}
});
}else{
if(_11.onItem){
_11.onItem.call(_11.scope,_11.item);
}
}
return _12;
},close:function(_15){
return _15&&_15.abort&&_15.abort();
},fetch:function(_16){
_16=_16||{};
var _17=this;
var _18=_16.scope||_17;
var _19=_16.query;
if(typeof _19=="object"){
_19=dojo.delegate(_19);
for(var i in _19){
var _1a=_19[i];
if(typeof _1a=="string"){
_19[i]=RegExp("^"+dojo.regexp.escapeString(_1a,"*?").replace(/\*/g,".*").replace(/\?/g,".")+"$",_16.queryOptions&&_16.queryOptions.ignoreCase?"mi":"m");
_19[i].toString=(function(_1b){
return function(){
return _1b;
};
})(_1a);
}
}
}
var _1c=this.objectStore.query(_19,_16);
dojo.when(_1c.total,function(_1d){
dojo.when(_1c,function(_1e){
if(_16.onBegin){
_16.onBegin.call(_18,_1d||_1e.length,_16);
}
if(_16.onItem){
for(var i=0;i<_1e.length;i++){
_16.onItem.call(_18,_1e[i],_16);
}
}
if(_16.onComplete){
_16.onComplete.call(_18,_16.onItem?null:_1e,_16);
}
return _1e;
},_16.onError&&dojo.hitch(_18,_16.onError));
},_16.onError&&dojo.hitch(_18,_16.onError));
_16.abort=function(){
if(_1c.cancel){
_1c.cancel();
}
};
_16.store=this;
return _16;
},getFeatures:function(){
return {"dojo.data.api.Read":!!this.objectStore.get,"dojo.data.api.Identity":true,"dojo.data.api.Write":!!this.objectStore.put,"dojo.data.api.Notification":true};
},getLabel:function(_1f){
if(this.isItem(_1f)){
return this.getValue(_1f,this.labelProperty);
}
return undefined;
},getLabelAttributes:function(_20){
return [this.labelProperty];
},getIdentity:function(_21){
return _21.getId?_21.getId():_21[this.objectStore.idProperty||"id"];
},getIdentityAttributes:function(_22){
return [this.objectStore.idProperty];
},fetchItemByIdentity:function(_23){
var _24;
dojo.when(this.objectStore.get(_23.identity),function(_25){
_24=_25;
_23.onItem.call(_23.scope,_25);
},function(_26){
_23.onError.call(_23.scope,_26);
});
return _24;
},newItem:function(_27,_28){
if(_28){
var _29=this.getValue(_28.parent,_28.attribute,[]);
_29=_29.concat([_27]);
_27.__parent=_29;
this.setValue(_28.parent,_28.attribute,_29);
}
this._dirtyObjects.push({object:_27,save:true});
this.onNew(_27);
return _27;
},deleteItem:function(_2a){
this.changing(_2a,true);
this.onDelete(_2a);
},setValue:function(_2b,_2c,_2d){
var old=_2b[_2c];
this.changing(_2b);
_2b[_2c]=_2d;
this.onSet(_2b,_2c,old,_2d);
},setValues:function(_2e,_2f,_30){
if(!dojo.isArray(_30)){
throw new Error("setValues expects to be passed an Array object as its value");
}
this.setValue(_2e,_2f,_30);
},unsetAttribute:function(_31,_32){
this.changing(_31);
var old=_31[_32];
delete _31[_32];
this.onSet(_31,_32,old,undefined);
},_dirtyObjects:[],changing:function(_33,_34){
_33.__isDirty=true;
for(var i=0;i<this._dirtyObjects.length;i++){
var _35=this._dirtyObjects[i];
if(_33==_35.object){
if(_34){
_35.object=false;
if(!this._saveNotNeeded){
_35.save=true;
}
}
return;
}
}
var old=_33 instanceof Array?[]:{};
for(i in _33){
if(_33.hasOwnProperty(i)){
old[i]=_33[i];
}
}
this._dirtyObjects.push({object:!_34&&_33,old:old,save:!this._saveNotNeeded});
},save:function(_36){
_36=_36||{};
var _37,_38=[];
var _39={};
var _3a=[];
var _3b;
var _3c=this._dirtyObjects;
var _3d=_3c.length;
try{
dojo.connect(_36,"onError",function(){
if(_36.revertOnError!==false){
var _3e=_3c;
_3c=_3a;
var _3f=0;
jr.revert();
_3b._dirtyObjects=_3e;
}else{
_3b._dirtyObjects=dirtyObject.concat(_3a);
}
});
if(this.objectStore.transaction){
var _40=this.objectStore.transaction();
}
for(var i=0;i<_3c.length;i++){
var _41=_3c[i];
var _42=_41.object;
var old=_41.old;
delete _42.__isDirty;
if(_42){
_37=this.objectStore.put(_42,{overwrite:!!old});
}else{
_37=this.objectStore.remove(this.getIdentity(old));
}
_3a.push(_41);
_3c.splice(i--,1);
dojo.when(_37,function(_43){
if(!(--_3d)){
if(_36.onComplete){
_36.onComplete.call(_36.scope,_38);
}
}
},function(_44){
_3d=-1;
_36.onError.call(_36.scope,_44);
});
}
if(_40){
_40.commit();
}
}
catch(e){
_36.onError.call(_36.scope,value);
}
},revert:function(_45){
var _46=this._dirtyObjects;
for(var i=_46.length;i>0;){
i--;
var _47=_46[i];
var _48=_47.object;
var old=_47.old;
if(_48&&old){
for(var j in old){
if(old.hasOwnProperty(j)&&_48[j]!==old[j]){
this.onSet(_48,j,_48[j],old[j]);
_48[j]=old[j];
}
}
for(j in _48){
if(!old.hasOwnProperty(j)){
this.onSet(_48,j,_48[j]);
delete _48[j];
}
}
}else{
if(!old){
this.onDelete(_48);
}else{
this.onNew(old);
}
}
delete (_48||old).__isDirty;
_46.splice(i,1);
}
},isDirty:function(_49){
if(!_49){
return !!this._dirtyObjects.length;
}
return _49.__isDirty;
},onSet:function(){
},onNew:function(){
},onDelete:function(){
}});
}
