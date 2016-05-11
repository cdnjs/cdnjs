function X2JS(_1){
"use strict";
var _2="1.1.2";
_1=_1||{};
_3();
function _3(){
if(_1.escapeMode===undefined){
_1.escapeMode=true;
}
if(_1.attributePrefix===undefined){
_1.attributePrefix="_";
}
if(_1.arrayAccessForm===undefined){
_1.arrayAccessForm="none";
}
if(_1.emptyNodeForm===undefined){
_1.emptyNodeForm="text";
}
};
var _4={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,DOCUMENT_NODE:9};
function _5(_6){
var _7=_6.localName;
if(_7==null){
_7=_6.baseName;
}
if(_7==null||_7==""){
_7=_6.nodeName;
}
return _7;
};
function _8(_9){
return _9.prefix;
};
function _a(_b){
if(typeof (_b)=="string"){
return _b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");
}else{
return _b;
}
};
function _c(_d){
return _d.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/");
};
function _e(_f,_10){
switch(_1.arrayAccessForm){
case "property":
if(!(_f[_10] instanceof Array)){
_f[_10+"_asArray"]=[_f[_10]];
}else{
_f[_10+"_asArray"]=_f[_10];
}
break;
}
};
function _11(_12){
if(_12.nodeType==_4.DOCUMENT_NODE){
var _13=new Object;
var _14=_12.firstChild;
var _15=_5(_14);
_13[_15]=_11(_14);
return _13;
}else{
if(_12.nodeType==_4.ELEMENT_NODE){
var _13=new Object;
_13.__cnt=0;
var _16=_12.childNodes;
for(var _17=0;_17<_16.length;_17++){
var _14=_16.item(_17);
var _15=_5(_14);
_13.__cnt++;
if(_13[_15]==null){
_13[_15]=_11(_14);
_e(_13,_15);
}else{
if(_13[_15]!=null){
if(!(_13[_15] instanceof Array)){
_13[_15]=[_13[_15]];
_e(_13,_15);
}
}
var _18=0;
while(_13[_15][_18]!=null){
_18++;
}
(_13[_15])[_18]=_11(_14);
}
}
for(var _19=0;_19<_12.attributes.length;_19++){
var _1a=_12.attributes.item(_19);
_13.__cnt++;
_13[_1.attributePrefix+_1a.name]=_1a.value;
}
var _1b=_8(_12);
if(_1b!=null&&_1b!=""){
_13.__cnt++;
_13.__prefix=_1b;
}
if(_13["#text"]!=null){
_13.__text=_13["#text"];
if(_13.__text instanceof Array){
_13.__text=_13.__text.join("\n");
}
if(_1.escapeMode){
_13.__text=_c(_13.__text);
}
delete _13["#text"];
if(_1.arrayAccessForm=="property"){
delete _13["#text_asArray"];
}
}
if(_13["#cdata-section"]!=null){
_13.__cdata=_13["#cdata-section"];
delete _13["#cdata-section"];
if(_1.arrayAccessForm=="property"){
delete _13["#cdata-section_asArray"];
}
}
if(_13.__cnt==1&&_13.__text!=null){
_13=_13.__text;
}else{
if(_13.__cnt==0&&_1.emptyNodeForm=="text"){
_13="";
}
}
delete _13.__cnt;
if(_13.__text!=null||_13.__cdata!=null){
_13.toString=function(){
return (this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");
};
}
return _13;
}else{
if(_12.nodeType==_4.TEXT_NODE||_12.nodeType==_4.CDATA_SECTION_NODE){
return _12.nodeValue;
}
}
}
};
function _1c(_1d,_1e,_1f,_20){
var _21="<"+((_1d!=null&&_1d.__prefix!=null)?(_1d.__prefix+":"):"")+_1e;
if(_1f!=null){
for(var _22=0;_22<_1f.length;_22++){
var _23=_1f[_22];
var _24=_1d[_23];
_21+=" "+_23.substr(_1.attributePrefix.length)+"='"+_24+"'";
}
}
if(!_20){
_21+=">";
}else{
_21+="/>";
}
return _21;
};
function _25(_26,_27){
return "</"+(_26.__prefix!=null?(_26.__prefix+":"):"")+_27+">";
};
function _28(str,_29){
return str.indexOf(_29,str.length-_29.length)!==-1;
};
function _2a(_2b,_2c){
if((_1.arrayAccessForm=="property"&&_28(_2c.toString(),("_asArray")))||_2c.toString().indexOf(_1.attributePrefix)==0||_2c.toString().indexOf("__")==0||(_2b[_2c] instanceof Function)){
return true;
}else{
return false;
}
};
function _2d(_2e){
var _2f=0;
if(_2e instanceof Object){
for(var it in _2e){
if(_2a(_2e,it)){
continue;
}
_2f++;
}
}
return _2f;
};
function _30(_31){
var _32=[];
if(_31 instanceof Object){
for(var ait in _31){
if(ait.toString().indexOf("__")==-1&&ait.toString().indexOf(_1.attributePrefix)==0){
_32.push(ait);
}
}
}
return _32;
};
function _33(_34){
var _35="";
if(_34.__cdata!=null){
_35+="<![CDATA["+_34.__cdata+"]]>";
}
if(_34.__text!=null){
if(_1.escapeMode){
_35+=_a(_34.__text);
}else{
_35+=_34.__text;
}
}
return _35;
};
function _36(_37){
var _38="";
if(_37 instanceof Object){
_38+=_33(_37);
}else{
if(_37!=null){
if(_1.escapeMode){
_38+=_a(_37);
}else{
_38+=_37;
}
}
}
return _38;
};
function _39(_3a,_3b,_3c){
var _3d="";
if(_3a.length==0){
_3d+=_1c(_3a,_3b,_3c,true);
}else{
for(var _3e=0;_3e<_3a.length;_3e++){
_3d+=_1c(_3a[_3e],_3b,_30(_3a[_3e]),false);
_3d+=_3f(_3a[_3e]);
_3d+=_25(_3a[_3e],_3b);
}
}
return _3d;
};
function _3f(_40){
var _41="";
var _42=_2d(_40);
if(_42>0){
for(var it in _40){
if(_2a(_40,it)){
continue;
}
var _43=_40[it];
var _44=_30(_43);
if(_43==null||_43==undefined){
_41+=_1c(_43,it,_44,true);
}else{
if(_43 instanceof Object){
if(_43 instanceof Array){
_41+=_39(_43,it,_44);
}else{
var _45=_2d(_43);
if(_45>0||_43.__text!=null||_43.__cdata!=null){
_41+=_1c(_43,it,_44,false);
_41+=_3f(_43);
_41+=_25(_43,it);
}else{
_41+=_1c(_43,it,_44,true);
}
}
}else{
_41+=_1c(_43,it,_44,false);
_41+=_36(_43);
_41+=_25(_43,it);
}
}
}
}
_41+=_36(_40);
return _41;
};
this.parseXmlString=function(_46){
if(_46===undefined){
return null;
}
var _47;
if(window.DOMParser){
var _48=new window.DOMParser();
_47=_48.parseFromString(_46,"text/xml");
}else{
if(_46.indexOf("<?")==0){
_46=_46.substr(_46.indexOf("?>")+2);
}
_47=new ActiveXObject("Microsoft.XMLDOM");
_47.async="false";
_47.loadXML(_46);
}
return _47;
};
this.asArray=function(_49){
if(_49 instanceof Array){
return _49;
}else{
return [_49];
}
};
this.xml2json=function(_4a){
return _11(_4a);
};
this.xml_str2json=function(_4b){
var _4c=this.parseXmlString(_4b);
return this.xml2json(_4c);
};
this.json2xml_str=function(_4d){
return _3f(_4d);
};
this.json2xml=function(_4e){
var _4f=this.json2xml_str(_4e);
return this.parseXmlString(_4f);
};
this.getVersion=function(){
return _2;
};
};

