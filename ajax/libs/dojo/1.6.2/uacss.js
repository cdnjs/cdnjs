/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.uacss"]){
dojo._hasResource["dojo.uacss"]=true;
dojo.provide("dojo.uacss");
(function(){
var d=dojo,_1=d.doc.documentElement,ie=d.isIE,_2=d.isOpera,_3=Math.floor,ff=d.isFF,_4=d.boxModel.replace(/-/,""),_5={dj_quirks:d.isQuirks,dj_opera:_2,dj_khtml:d.isKhtml,dj_webkit:d.isWebKit,dj_safari:d.isSafari,dj_chrome:d.isChrome,dj_gecko:d.isMozilla};
if(ie){
_5["dj_ie"]=true;
_5["dj_ie"+_3(ie)]=true;
_5["dj_iequirks"]=d.isQuirks;
}
if(ff){
_5["dj_ff"+_3(ff)]=true;
}
_5["dj_"+_4]=true;
var _6="";
for(var _7 in _5){
if(_5[_7]){
_6+=_7+" ";
}
}
_1.className=d.trim(_1.className+" "+_6);
dojo._loaders.unshift(function(){
if(!dojo._isBodyLtr()){
var _8="dj_rtl dijitRtl "+_6.replace(/ /g,"-rtl ");
_1.className=d.trim(_1.className+" "+_8);
}
});
})();
}
