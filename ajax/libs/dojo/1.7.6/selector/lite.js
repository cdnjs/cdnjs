/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/selector/lite",["../has","../_base/kernel"],function(_1,_2){
"use strict";
var _3=document.createElement("div");
var _4=_3.matchesSelector||_3.webkitMatchesSelector||_3.mozMatchesSelector||_3.msMatchesSelector||_3.oMatchesSelector;
var _5=_3.querySelectorAll;
var _6=/([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g;
_1.add("dom-matches-selector",!!_4);
_1.add("dom-qsa",!!_5);
var _7=function(_8,_9){
if(_a&&_8.indexOf(",")>-1){
return _a(_8,_9);
}
var _b=(_5?/^([\w]*)#([\w\-]+$)|^(\.)([\w\-\*]+$)|^(\w+$)/:/^([\w]*)#([\w\-]+)(?:\s+(.*))?$|(?:^|(>|.+\s+))([\w\-\*]+)(\S*$)/).exec(_8);
_9=_9||document;
if(_b){
if(_b[2]){
var _c=_2.byId?_2.byId(_b[2]):document.getElementById(_b[2]);
if(!_c||(_b[1]&&_b[1]!=_c.tagName.toLowerCase())){
return [];
}
if(_9!=document){
var _d=_c;
while(_d!=_9){
_d=_d.parentNode;
if(!_d){
return [];
}
}
}
return _b[3]?_7(_b[3],_c):[_c];
}
if(_b[3]&&_9.getElementsByClassName){
return _9.getElementsByClassName(_b[4]);
}
var _c;
if(_b[5]){
_c=_9.getElementsByTagName(_b[5]);
if(_b[4]||_b[6]){
_8=(_b[4]||"")+_b[6];
}else{
return _c;
}
}
}
if(_5){
if(_9.nodeType===1&&_9.nodeName.toLowerCase()!=="object"){
return _e(_9,_8,_9.querySelectorAll);
}else{
return _9.querySelectorAll(_8);
}
}else{
if(!_c){
_c=_9.getElementsByTagName("*");
}
}
var _f=[];
for(var i=0,l=_c.length;i<l;i++){
var _10=_c[i];
if(_10.nodeType==1&&_11(_10,_8,_9)){
_f.push(_10);
}
}
return _f;
};
var _e=function(_12,_13,_14){
var _15=_12,old=_12.getAttribute("id"),nid=old||"__dojo__",_16=_12.parentNode,_17=/^\s*[+~]/.test(_13);
if(_17&&!_16){
return [];
}
if(!old){
_12.setAttribute("id",nid);
}else{
nid=nid.replace(/'/g,"\\$&");
}
if(_17&&_16){
_12=_12.parentNode;
}
var _18=_13.match(_6);
for(var i=0;i<_18.length;i++){
_18[i]="[id='"+nid+"'] "+_18[i];
}
_13=_18.join(",");
try{
return _14.call(_12,_13);
}
finally{
if(!old){
_15.removeAttribute("id");
}
}
};
if(!_1("dom-matches-selector")){
var _11=(function(){
var _19=_3.tagName=="div"?"toLowerCase":"toUpperCase";
var _1a={"":function(_1b){
_1b=_1b[_19]();
return function(_1c){
return _1c.tagName==_1b;
};
},".":function(_1d){
var _1e=" "+_1d+" ";
return function(_1f){
return _1f.className.indexOf(_1d)>-1&&(" "+_1f.className+" ").indexOf(_1e)>-1;
};
},"#":function(id){
return function(_20){
return _20.id==id;
};
}};
var _21={"^=":function(_22,_23){
return _22.indexOf(_23)==0;
},"*=":function(_24,_25){
return _24.indexOf(_25)>-1;
},"$=":function(_26,_27){
return _26.substring(_26.length-_27.length,_26.length)==_27;
},"~=":function(_28,_29){
return (" "+_28+" ").indexOf(" "+_29+" ")>-1;
},"|=":function(_2a,_2b){
return (_2a+"-").indexOf(_2b+"-")==0;
},"=":function(_2c,_2d){
return _2c==_2d;
},"":function(_2e,_2f){
return true;
}};
function _30(_31,_32,_33){
var _34=_32.charAt(0);
if(_34=="\""||_34=="'"){
_32=_32.slice(1,-1);
}
_32=_32.replace(/\\/g,"");
var _35=_21[_33||""];
return function(_36){
var _37=_36.getAttribute(_31);
return _37&&_35(_37,_32);
};
};
function _38(_39){
return function(_3a,_3b){
while((_3a=_3a.parentNode)!=_3b){
if(_39(_3a,_3b)){
return true;
}
}
};
};
function _3c(_3d){
return function(_3e,_3f){
_3e=_3e.parentNode;
return _3d?_3e!=_3f&&_3d(_3e,_3f):_3e==_3f;
};
};
var _40={};
function and(_41,_42){
return _41?function(_43,_44){
return _42(_43)&&_41(_43,_44);
}:_42;
};
return function(_45,_46,_47){
var _48=_40[_46];
if(!_48){
if(_46.replace(/(?:\s*([> ])\s*)|(#|\.)?((?:\\.|[\w-])+)|\[\s*([\w-]+)\s*(.?=)?\s*("(?:\\.|[^"])+"|'(?:\\.|[^'])+'|(?:\\.|[^\]])*)\s*\]/g,function(t,_49,_4a,_4b,_4c,_4d,_4e){
if(_4b){
_48=and(_48,_1a[_4a||""](_4b.replace(/\\/g,"")));
}else{
if(_49){
_48=(_49==" "?_38:_3c)(_48);
}else{
if(_4c){
_48=and(_48,_30(_4c,_4e,_4d));
}
}
}
return "";
})){
throw new Error("Syntax error in query");
}
if(!_48){
return true;
}
_40[_46]=_48;
}
return _48(_45,_47);
};
})();
}
if(!_1("dom-qsa")){
var _a=function(_4f,_50){
var _51=_4f.match(_6);
var _52=[];
for(var i=0;i<_51.length;i++){
_4f=new String(_51[i].replace(/\s*$/,""));
_4f.indexOf=escape;
var _53=_7(_4f,_50);
for(var j=0,l=_53.length;j<l;j++){
var _54=_53[j];
_52[_54.sourceIndex]=_54;
}
}
var _55=[];
for(i in _52){
_55.push(_52[i]);
}
return _55;
};
}
_7.match=_4?function(_56,_57,_58){
if(_58){
return _e(_58,_57,function(_59){
return _4.call(_56,_59);
});
}
return _4.call(_56,_57);
}:_11;
return _7;
});
