/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/handlers",["../json","../_base/kernel","../_base/array","../has"],function(_1,_2,_3,_4){
_4.add("activex",typeof ActiveXObject!=="undefined");
var _5;
if(_4("activex")){
var dp=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML.DOMDocument"];
_5=function(_6){
var _7=_6.data;
if(!_7||!_7.documentElement){
var _8=_6.text;
_3.some(dp,function(p){
try{
var _9=new ActiveXObject(p);
_9.async=false;
_9.loadXML(_8);
_7=_9;
}
catch(e){
return false;
}
return true;
});
}
return _7;
};
}
var _a={"javascript":function(_b){
return _2.eval(_b.text||"");
},"json":function(_c){
return _1.parse(_c.text||null);
},"xml":_5};
function _d(_e){
var _f=_a[_e.options.handleAs];
_e.data=_f?_f(_e):(_e.data||_e.text);
return _e;
};
_d.register=function(_10,_11){
_a[_10]=_11;
};
return _d;
});
