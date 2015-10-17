/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.NodeList-traverse"]){
dojo._hasResource["dojo.NodeList-traverse"]=true;
dojo.provide("dojo.NodeList-traverse");
dojo.extend(dojo.NodeList,{_buildArrayFromCallback:function(_1){
var _2=[];
for(var i=0;i<this.length;i++){
var _3=_1.call(this[i],this[i],_2);
if(_3){
_2=_2.concat(_3);
}
}
return _2;
},_filterQueryResult:function(_4,_5){
var _6=dojo.filter(_4,function(_7){
return dojo.query(_5,_7.parentNode).indexOf(_7)!=-1;
});
var _8=this._wrap(_6);
return _8;
},_getUniqueAsNodeList:function(_9){
var _a=[];
for(var i=0,_b;_b=_9[i];i++){
if(_b.nodeType==1&&dojo.indexOf(_a,_b)==-1){
_a.push(_b);
}
}
return this._wrap(_a,null,this._NodeListCtor);
},_getUniqueNodeListWithParent:function(_c,_d){
var _e=this._getUniqueAsNodeList(_c);
_e=(_d?this._filterQueryResult(_e,_d):_e);
return _e._stash(this);
},_getRelatedUniqueNodes:function(_f,_10){
return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(_10),_f);
},children:function(_11){
return this._getRelatedUniqueNodes(_11,function(_12,ary){
return dojo._toArray(_12.childNodes);
});
},closest:function(_13){
var _14=this;
return this._getRelatedUniqueNodes(_13,function(_15,ary){
do{
if(_14._filterQueryResult([_15],_13).length){
return _15;
}
}while((_15=_15.parentNode)&&_15.nodeType==1);
return null;
});
},parent:function(_16){
return this._getRelatedUniqueNodes(_16,function(_17,ary){
return _17.parentNode;
});
},parents:function(_18){
return this._getRelatedUniqueNodes(_18,function(_19,ary){
var _1a=[];
while(_19.parentNode){
_19=_19.parentNode;
_1a.push(_19);
}
return _1a;
});
},siblings:function(_1b){
return this._getRelatedUniqueNodes(_1b,function(_1c,ary){
var _1d=[];
var _1e=(_1c.parentNode&&_1c.parentNode.childNodes);
for(var i=0;i<_1e.length;i++){
if(_1e[i]!=_1c){
_1d.push(_1e[i]);
}
}
return _1d;
});
},next:function(_1f){
return this._getRelatedUniqueNodes(_1f,function(_20,ary){
var _21=_20.nextSibling;
while(_21&&_21.nodeType!=1){
_21=_21.nextSibling;
}
return _21;
});
},nextAll:function(_22){
return this._getRelatedUniqueNodes(_22,function(_23,ary){
var _24=[];
var _25=_23;
while((_25=_25.nextSibling)){
if(_25.nodeType==1){
_24.push(_25);
}
}
return _24;
});
},prev:function(_26){
return this._getRelatedUniqueNodes(_26,function(_27,ary){
var _28=_27.previousSibling;
while(_28&&_28.nodeType!=1){
_28=_28.previousSibling;
}
return _28;
});
},prevAll:function(_29){
return this._getRelatedUniqueNodes(_29,function(_2a,ary){
var _2b=[];
var _2c=_2a;
while((_2c=_2c.previousSibling)){
if(_2c.nodeType==1){
_2b.push(_2c);
}
}
return _2b;
});
},andSelf:function(){
return this.concat(this._parent);
},first:function(){
return this._wrap(((this[0]&&[this[0]])||[]),this);
},last:function(){
return this._wrap((this.length?[this[this.length-1]]:[]),this);
},even:function(){
return this.filter(function(_2d,i){
return i%2!=0;
});
},odd:function(){
return this.filter(function(_2e,i){
return i%2==0;
});
}});
}
