/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.string"]){
dojo._hasResource["dojo.string"]=true;
dojo.provide("dojo.string");
dojo.string.rep=function(_1,_2){
if(_2<=0||!_1){
return "";
}
var _3=[];
for(;;){
if(_2&1){
_3.push(_1);
}
if(!(_2>>=1)){
break;
}
_1+=_1;
}
return _3.join("");
};
dojo.string.pad=function(_4,_5,ch,_7){
if(!ch){
ch="0";
}
var _8=String(_4),_9=dojo.string.rep(ch,Math.ceil((_5-_8.length)/ch.length));
return _7?_8+_9:_9+_8;
};
dojo.string.substitute=function(_a,_b,_c,_d){
_d=_d||dojo.global;
_c=(!_c)?function(v){
return v;
}:dojo.hitch(_d,_c);
return _a.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(_f,key,_11){
var _12=dojo.getObject(key,false,_b);
if(_11){
_12=dojo.getObject(_11,false,_d).call(_d,_12,key);
}
return _c(_12,key).toString();
});
};
dojo.string.trim=String.prototype.trim?dojo.trim:function(str){
str=str.replace(/^\s+/,"");
for(var i=str.length-1;i>=0;i--){
if(/\S/.test(str.charAt(i))){
str=str.substring(0,i+1);
break;
}
}
return str;
};
}
