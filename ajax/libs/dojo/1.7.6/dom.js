/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dom",["./_base/sniff","./_base/lang","./_base/window"],function(_1,_2,_3){
try{
document.execCommand("BackgroundImageCache",false,true);
}
catch(e){
}
var _4={};
if(_1("ie")){
_4.byId=function(id,_5){
if(typeof id!="string"){
return id;
}
var _6=_5||_3.doc,te=id&&_6.getElementById(id);
if(te&&(te.attributes.id.value==id||te.id==id)){
return te;
}else{
var _7=_6.all[id];
if(!_7||_7.nodeName){
_7=[_7];
}
var i=0;
while((te=_7[i++])){
if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){
return te;
}
}
}
};
}else{
_4.byId=function(id,_8){
return ((typeof id=="string")?(_8||_3.doc).getElementById(id):id)||null;
};
}
_4.isDescendant=function(_9,_a){
try{
_9=_4.byId(_9);
_a=_4.byId(_a);
while(_9){
if(_9==_a){
return true;
}
_9=_9.parentNode;
}
}
catch(e){
}
return false;
};
_1.add("css-user-select",function(_b,_c,_d){
if(!_d){
return false;
}
var _e=_d.style;
var _f=["Khtml","O","Moz","Webkit"],i=_f.length,_10="userSelect",_11;
do{
if(typeof _e[_10]!=="undefined"){
return _10;
}
}while(i--&&(_10=_f[i]+"UserSelect"));
return false;
});
var _12=_1("css-user-select");
_4.setSelectable=_12?function(_13,_14){
_4.byId(_13).style[_12]=_14?"":"none";
}:function(_15,_16){
_15=_4.byId(_15);
var _17=_15.getElementsByTagName("*"),i=_17.length;
if(_16){
_15.removeAttribute("unselectable");
while(i--){
_17[i].removeAttribute("unselectable");
}
}else{
_15.setAttribute("unselectable","on");
while(i--){
_17[i].setAttribute("unselectable","on");
}
}
};
return _4;
});
