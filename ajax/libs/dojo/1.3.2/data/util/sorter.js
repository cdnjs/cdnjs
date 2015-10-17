/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.data.util.sorter"]){
dojo._hasResource["dojo.data.util.sorter"]=true;
dojo.provide("dojo.data.util.sorter");
dojo.data.util.sorter.basicComparator=function(a,b){
var r=-1;
if(a===null){
a=undefined;
}
if(b===null){
b=undefined;
}
if(a==b){
r=0;
}else{
if(a>b||a==null){
r=1;
}
}
return r;
};
dojo.data.util.sorter.createSortFunction=function(_4,_5){
var _6=[];
function _7(_8,_9){
return function(_a,_b){
var a=_5.getValue(_a,_8);
var b=_5.getValue(_b,_8);
var _e=null;
if(_5.comparatorMap){
if(typeof _8!=="string"){
_8=_5.getIdentity(_8);
}
_e=_5.comparatorMap[_8]||dojo.data.util.sorter.basicComparator;
}
_e=_e||dojo.data.util.sorter.basicComparator;
return _9*_e(a,b);
};
};
var _f;
for(var i=0;i<_4.length;i++){
_f=_4[i];
if(_f.attribute){
var _11=(_f.descending)?-1:1;
_6.push(_7(_f.attribute,_11));
}
}
return function(_12,_13){
var i=0;
while(i<_6.length){
var ret=_6[i++](_12,_13);
if(ret!==0){
return ret;
}
}
return 0;
};
};
}
