/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.cookie"]){
dojo._hasResource["dojo.cookie"]=true;
dojo.provide("dojo.cookie");
dojo.require("dojo.regexp");
dojo.cookie=function(_1,_2,_3){
var c=document.cookie;
if(arguments.length==1){
var _5=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(_1)+"=([^;]*)"));
return _5?decodeURIComponent(_5[1]):undefined;
}else{
_3=_3||{};
var _6=_3.expires;
if(typeof _6=="number"){
var d=new Date();
d.setTime(d.getTime()+_6*24*60*60*1000);
_6=_3.expires=d;
}
if(_6&&_6.toUTCString){
_3.expires=_6.toUTCString();
}
_2=encodeURIComponent(_2);
var _8=_1+"="+_2,_9;
for(_9 in _3){
_8+="; "+_9;
var _a=_3[_9];
if(_a!==true){
_8+="="+_a;
}
}
document.cookie=_8;
}
};
dojo.cookie.isSupported=function(){
if(!("cookieEnabled" in navigator)){
this("__djCookieTest__","CookiesAllowed");
navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";
if(navigator.cookieEnabled){
this("__djCookieTest__","",{expires:-1});
}
}
return navigator.cookieEnabled;
};
}
