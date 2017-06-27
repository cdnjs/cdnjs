/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.data.ItemFileReadStore"]){
dojo._hasResource["dojo.data.ItemFileReadStore"]=true;
dojo.provide("dojo.data.ItemFileReadStore");
dojo.require("dojo.data.util.filter");
dojo.require("dojo.data.util.simpleFetch");
dojo.require("dojo.date.stamp");
dojo.declare("dojo.data.ItemFileReadStore",null,{constructor:function(_1){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._jsonFileUrl=_1.url;
this._jsonData=_1.data;
this._datatypeMap=_1.typeMap||{};
if(!this._datatypeMap["Date"]){
this._datatypeMap["Date"]={type:Date,deserialize:function(_2){
return dojo.date.stamp.fromISOString(_2);
}};
}
this._features={"dojo.data.api.Read":true,"dojo.data.api.Identity":true};
this._itemsByIdentity=null;
this._storeRefPropName="_S";
this._itemNumPropName="_0";
this._rootItemPropName="_RI";
this._reverseRefMap="_RRM";
this._loadInProgress=false;
this._queuedFetches=[];
if(_1.urlPreventCache!==undefined){
this.urlPreventCache=_1.urlPreventCache?true:false;
}
if(_1.clearOnClose){
this.clearOnClose=true;
}
},url:"",data:null,typeMap:null,clearOnClose:false,urlPreventCache:false,_assertIsItem:function(_3){
if(!this.isItem(_3)){
throw new Error("dojo.data.ItemFileReadStore: Invalid item argument.");
}
},_assertIsAttribute:function(_4){
if(typeof _4!=="string"){
throw new Error("dojo.data.ItemFileReadStore: Invalid attribute argument.");
}
},getValue:function(_5,_6,_7){
var _8=this.getValues(_5,_6);
return (_8.length>0)?_8[0]:_7;
},getValues:function(_9,_a){
this._assertIsItem(_9);
this._assertIsAttribute(_a);
return _9[_a]||[];
},getAttributes:function(_b){
this._assertIsItem(_b);
var _c=[];
for(var _d in _b){
if((_d!==this._storeRefPropName)&&(_d!==this._itemNumPropName)&&(_d!==this._rootItemPropName)&&(_d!==this._reverseRefMap)){
_c.push(_d);
}
}
return _c;
},hasAttribute:function(_e,_f){
return this.getValues(_e,_f).length>0;
},containsValue:function(_10,_11,_12){
var _13=undefined;
if(typeof _12==="string"){
_13=dojo.data.util.filter.patternToRegExp(_12,false);
}
return this._containsValue(_10,_11,_12,_13);
},_containsValue:function(_14,_15,_16,_17){
return dojo.some(this.getValues(_14,_15),function(_18){
if(_18!==null&&!dojo.isObject(_18)&&_17){
if(_18.toString().match(_17)){
return true;
}
}else{
if(_16===_18){
return true;
}
}
});
},isItem:function(_19){
if(_19&&_19[this._storeRefPropName]===this){
if(this._arrayOfAllItems[_19[this._itemNumPropName]]===_19){
return true;
}
}
return false;
},isItemLoaded:function(_1a){
return this.isItem(_1a);
},loadItem:function(_1b){
this._assertIsItem(_1b.item);
},getFeatures:function(){
return this._features;
},getLabel:function(_1c){
if(this._labelAttr&&this.isItem(_1c)){
return this.getValue(_1c,this._labelAttr);
}
return undefined;
},getLabelAttributes:function(_1d){
if(this._labelAttr){
return [this._labelAttr];
}
return null;
},_fetchItems:function(_1e,_1f,_20){
var _21=this;
var _22=function(_23,_24){
var _25=[];
var i,key;
if(_23.query){
var _28;
var _29=_23.queryOptions?_23.queryOptions.ignoreCase:false;
var _2a={};
for(key in _23.query){
_28=_23.query[key];
if(typeof _28==="string"){
_2a[key]=dojo.data.util.filter.patternToRegExp(_28,_29);
}
}
for(i=0;i<_24.length;++i){
var _2b=true;
var _2c=_24[i];
if(_2c===null){
_2b=false;
}else{
for(key in _23.query){
_28=_23.query[key];
if(!_21._containsValue(_2c,key,_28,_2a[key])){
_2b=false;
}
}
}
if(_2b){
_25.push(_2c);
}
}
_1f(_25,_23);
}else{
for(i=0;i<_24.length;++i){
var _2d=_24[i];
if(_2d!==null){
_25.push(_2d);
}
}
_1f(_25,_23);
}
};
if(this._loadFinished){
_22(_1e,this._getItemsArray(_1e.queryOptions));
}else{
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_1e,filter:_22});
}else{
this._loadInProgress=true;
var _2e={url:_21._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache};
var _2f=dojo.xhrGet(_2e);
_2f.addCallback(function(_30){
try{
_21._getItemsFromLoadedData(_30);
_21._loadFinished=true;
_21._loadInProgress=false;
_22(_1e,_21._getItemsArray(_1e.queryOptions));
_21._handleQueuedFetches();
}
catch(e){
_21._loadFinished=true;
_21._loadInProgress=false;
_20(e,_1e);
}
});
_2f.addErrback(function(_31){
_21._loadInProgress=false;
_20(_31,_1e);
});
var _32=null;
if(_1e.abort){
_32=_1e.abort;
}
_1e.abort=function(){
var df=_2f;
if(df&&df.fired===-1){
df.cancel();
df=null;
}
if(_32){
_32.call(_1e);
}
};
}
}else{
if(this._jsonData){
try{
this._loadFinished=true;
this._getItemsFromLoadedData(this._jsonData);
this._jsonData=null;
_22(_1e,this._getItemsArray(_1e.queryOptions));
}
catch(e){
_20(e,_1e);
}
}else{
_20(new Error("dojo.data.ItemFileReadStore: No JSON source data was provided as either URL or a nested Javascript object."),_1e);
}
}
}
},_handleQueuedFetches:function(){
if(this._queuedFetches.length>0){
for(var i=0;i<this._queuedFetches.length;i++){
var _35=this._queuedFetches[i];
var _36=_35.args;
var _37=_35.filter;
if(_37){
_37(_36,this._getItemsArray(_36.queryOptions));
}else{
this.fetchItemByIdentity(_36);
}
}
this._queuedFetches=[];
}
},_getItemsArray:function(_38){
if(_38&&_38.deep){
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
},close:function(_39){
if(this.clearOnClose&&(this._jsonFileUrl!=="")){
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=[];
this._loadFinished=false;
this._itemsByIdentity=null;
this._loadInProgress=false;
this._queuedFetches=[];
}
},_getItemsFromLoadedData:function(_3a){
var _3b=false;
function _3c(_3d){
var _3e=((_3d!==null)&&(typeof _3d==="object")&&(!dojo.isArray(_3d)||_3b)&&(!dojo.isFunction(_3d))&&(_3d.constructor==Object||dojo.isArray(_3d))&&(typeof _3d._reference==="undefined")&&(typeof _3d._type==="undefined")&&(typeof _3d._value==="undefined"));
return _3e;
};
var _3f=this;
function _40(_41){
_3f._arrayOfAllItems.push(_41);
for(var _42 in _41){
var _43=_41[_42];
if(_43){
if(dojo.isArray(_43)){
var _44=_43;
for(var k=0;k<_44.length;++k){
var _46=_44[k];
if(_3c(_46)){
_40(_46);
}
}
}else{
if(_3c(_43)){
_40(_43);
}
}
}
}
};
this._labelAttr=_3a.label;
var i;
var _48;
this._arrayOfAllItems=[];
this._arrayOfTopLevelItems=_3a.items;
for(i=0;i<this._arrayOfTopLevelItems.length;++i){
_48=this._arrayOfTopLevelItems[i];
if(dojo.isArray(_48)){
_3b=true;
}
_40(_48);
_48[this._rootItemPropName]=true;
}
var _49={};
var key;
for(i=0;i<this._arrayOfAllItems.length;++i){
_48=this._arrayOfAllItems[i];
for(key in _48){
if(key!==this._rootItemPropName){
var _4b=_48[key];
if(_4b!==null){
if(!dojo.isArray(_4b)){
_48[key]=[_4b];
}
}else{
_48[key]=[null];
}
}
_49[key]=key;
}
}
while(_49[this._storeRefPropName]){
this._storeRefPropName+="_";
}
while(_49[this._itemNumPropName]){
this._itemNumPropName+="_";
}
while(_49[this._reverseRefMap]){
this._reverseRefMap+="_";
}
var _4c;
var _4d=_3a.identifier;
if(_4d){
this._itemsByIdentity={};
this._features["dojo.data.api.Identity"]=_4d;
for(i=0;i<this._arrayOfAllItems.length;++i){
_48=this._arrayOfAllItems[i];
_4c=_48[_4d];
var _4e=_4c[0];
if(!this._itemsByIdentity[_4e]){
this._itemsByIdentity[_4e]=_48;
}else{
if(this._jsonFileUrl){
throw new Error("dojo.data.ItemFileReadStore:  The json data as specified by: ["+this._jsonFileUrl+"] is malformed.  Items within the list have identifier: ["+_4d+"].  Value collided: ["+_4e+"]");
}else{
if(this._jsonData){
throw new Error("dojo.data.ItemFileReadStore:  The json data provided by the creation arguments is malformed.  Items within the list have identifier: ["+_4d+"].  Value collided: ["+_4e+"]");
}
}
}
}
}else{
this._features["dojo.data.api.Identity"]=Number;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
_48=this._arrayOfAllItems[i];
_48[this._storeRefPropName]=this;
_48[this._itemNumPropName]=i;
}
for(i=0;i<this._arrayOfAllItems.length;++i){
_48=this._arrayOfAllItems[i];
for(key in _48){
_4c=_48[key];
for(var j=0;j<_4c.length;++j){
_4b=_4c[j];
if(_4b!==null&&typeof _4b=="object"){
if(_4b._type&&_4b._value){
var _50=_4b._type;
var _51=this._datatypeMap[_50];
if(!_51){
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '"+_50+"'");
}else{
if(dojo.isFunction(_51)){
_4c[j]=new _51(_4b._value);
}else{
if(dojo.isFunction(_51.deserialize)){
_4c[j]=_51.deserialize(_4b._value);
}else{
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if(_4b._reference){
var _52=_4b._reference;
if(!dojo.isObject(_52)){
_4c[j]=this._itemsByIdentity[_52];
}else{
for(var k=0;k<this._arrayOfAllItems.length;++k){
var _54=this._arrayOfAllItems[k];
var _55=true;
for(var _56 in _52){
if(_54[_56]!=_52[_56]){
_55=false;
}
}
if(_55){
_4c[j]=_54;
}
}
}
if(this.referenceIntegrity){
var _57=_4c[j];
if(this.isItem(_57)){
this._addReferenceToMap(_57,_48,key);
}
}
}else{
if(this.isItem(_4b)){
if(this.referenceIntegrity){
this._addReferenceToMap(_4b,_48,key);
}
}
}
}
}
}
}
},_addReferenceToMap:function(_58,_59,_5a){
},getIdentity:function(_5b){
var _5c=this._features["dojo.data.api.Identity"];
if(_5c===Number){
return _5b[this._itemNumPropName];
}else{
var _5d=_5b[_5c];
if(_5d){
return _5d[0];
}
}
return null;
},fetchItemByIdentity:function(_5e){
var _5f;
var _60;
if(!this._loadFinished){
var _61=this;
if(this._jsonFileUrl){
if(this._loadInProgress){
this._queuedFetches.push({args:_5e});
}else{
this._loadInProgress=true;
var _62={url:_61._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache};
var _63=dojo.xhrGet(_62);
_63.addCallback(function(_64){
var _65=_5e.scope?_5e.scope:dojo.global;
try{
_61._getItemsFromLoadedData(_64);
_61._loadFinished=true;
_61._loadInProgress=false;
_5f=_61._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_5e.onItem.call(_65,_5f);
}
_61._handleQueuedFetches();
}
catch(error){
_61._loadInProgress=false;
if(_5e.onError){
_5e.onError.call(_65,error);
}
}
});
_63.addErrback(function(_66){
_61._loadInProgress=false;
if(_5e.onError){
var _67=_5e.scope?_5e.scope:dojo.global;
_5e.onError.call(_67,_66);
}
});
}
}else{
if(this._jsonData){
_61._getItemsFromLoadedData(_61._jsonData);
_61._jsonData=null;
_61._loadFinished=true;
_5f=_61._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_60=_5e.scope?_5e.scope:dojo.global;
_5e.onItem.call(_60,_5f);
}
}
}
}else{
_5f=this._getItemByIdentity(_5e.identity);
if(_5e.onItem){
_60=_5e.scope?_5e.scope:dojo.global;
_5e.onItem.call(_60,_5f);
}
}
},_getItemByIdentity:function(_68){
var _69=null;
if(this._itemsByIdentity){
_69=this._itemsByIdentity[_68];
}else{
_69=this._arrayOfAllItems[_68];
}
if(_69===undefined){
_69=null;
}
return _69;
},getIdentityAttributes:function(_6a){
var _6b=this._features["dojo.data.api.Identity"];
if(_6b===Number){
return null;
}else{
return [_6b];
}
},_forceLoad:function(){
var _6c=this;
if(this._jsonFileUrl){
var _6d={url:_6c._jsonFileUrl,handleAs:"json-comment-optional",preventCache:this.urlPreventCache,sync:true};
var _6e=dojo.xhrGet(_6d);
_6e.addCallback(function(_6f){
try{
if(_6c._loadInProgress!==true&&!_6c._loadFinished){
_6c._getItemsFromLoadedData(_6f);
_6c._loadFinished=true;
}else{
if(_6c._loadInProgress){
throw new Error("dojo.data.ItemFileReadStore:  Unable to perform a synchronous load, an async load is in progress.");
}
}
}
catch(e){

throw e;
}
});
_6e.addErrback(function(_70){
throw _70;
});
}else{
if(this._jsonData){
_6c._getItemsFromLoadedData(_6c._jsonData);
_6c._jsonData=null;
_6c._loadFinished=true;
}
}
}});
dojo.extend(dojo.data.ItemFileReadStore,dojo.data.util.simpleFetch);
}
