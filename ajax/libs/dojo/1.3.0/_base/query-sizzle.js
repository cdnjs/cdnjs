/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.query"]){
dojo._hasResource["dojo._base.query"]=true;
if(typeof dojo!="undefined"){
dojo.provide("dojo._base.query");
dojo.require("dojo._base.NodeList");
dojo.query=function(_1,_2,_3){
_3=_3||dojo.NodeList;
if(!_1){
return new _3();
}
if(_1.constructor==_3){
return _1;
}
if(!dojo.isString(_1)){
return new _3(_1);
}
if(dojo.isString(_2)){
_2=dojo.byId(_2);
if(!_2){
return new _3();
}
}
return dojo.Sizzle(_1,_2,new _3());
};
dojo._filterQueryResult=function(_4,_5){
return dojo.Sizzle.filter(_5,_4);
};
}
(function(ns){
var _7=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|[^[\]]+)+\]|\\.|[^ >+~,(\[]+)+|[>+~])(\s*,\s*)?/g,_8=0,_9=Object.prototype.toString;
var _a=function(_b,_c,_d,_e){
_d=_d||[];
_c=_c||document;
if(_c.nodeType!==1&&_c.nodeType!==9){
return [];
}
if(!_b||typeof _b!=="string"){
return _d;
}
var _f=[],m,set,_12,_13,_14,_15,_16=true;
_7.lastIndex=0;
while((m=_7.exec(_b))!==null){
_f.push(m[1]);
if(m[2]){
_15=RegExp.rightContext;
break;
}
}
if(_f.length>1&&_17.match.POS.exec(_b)){
if(_f.length===2&&_17.relative[_f[0]]){
var _18="",_19;
while((_19=_17.match.POS.exec(_b))){
_18+=_19[0];
_b=_b.replace(_17.match.POS,"");
}
set=_a.filter(_18,_a(_b,_c));
}else{
set=_17.relative[_f[0]]?[_c]:_a(_f.shift(),_c);
while(_f.length){
var _1a=[];
_b=_f.shift();
if(_17.relative[_b]){
_b+=_f.shift();
}
for(var i=0,l=set.length;i<l;i++){
_a(_b,set[i],_1a);
}
set=_1a;
}
}
}else{
var ret=_e?{expr:_f.pop(),set:_1e(_e)}:_a.find(_f.pop(),_f.length===1&&_c.parentNode?_c.parentNode:_c);
set=_a.filter(ret.expr,ret.set);
if(_f.length>0){
_12=_1e(set);
}else{
_16=false;
}
while(_f.length){
var cur=_f.pop(),pop=cur;
if(!_17.relative[cur]){
cur="";
}else{
pop=_f.pop();
}
if(pop==null){
pop=_c;
}
_17.relative[cur](_12,pop);
}
}
if(!_12){
_12=set;
}
if(!_12){
throw "Syntax error, unrecognized expression: "+(cur||_b);
}
if(_9.call(_12)==="[object Array]"){
if(!_16){
_d.push.apply(_d,_12);
}else{
if(_c.nodeType===1){
for(var i=0;_12[i]!=null;i++){
if(_12[i]&&(_12[i]===true||_12[i].nodeType===1&&_21(_c,_12[i]))){
_d.push(set[i]);
}
}
}else{
for(var i=0;_12[i]!=null;i++){
if(_12[i]&&_12[i].nodeType===1){
_d.push(set[i]);
}
}
}
}
}else{
_1e(_12,_d);
}
if(_15){
_a(_15,_c,_d,_e);
}
return _d;
};
_a.matches=function(_22,set){
return _a(_22,null,null,set);
};
_a.find=function(_24,_25){
var set,_27;
if(!_24){
return [];
}
for(var i=0,l=_17.order.length;i<l;i++){
var _2a=_17.order[i],_27;
if((_27=_17.match[_2a].exec(_24))){
var _2b=RegExp.leftContext;
if(_2b.substr(_2b.length-1)!=="\\"){
_27[1]=(_27[1]||"").replace(/\\/g,"");
set=_17.find[_2a](_27,_25);
if(set!=null){
_24=_24.replace(_17.match[_2a],"");
break;
}
}
}
}
if(!set){
set=_25.getElementsByTagName("*");
}
return {set:set,expr:_24};
};
_a.filter=function(_2c,set,_2e,not){
var old=_2c,_31=[],_32=set,_33,_34;
while(_2c&&set.length){
for(var _35 in _17.filter){
if((_33=_17.match[_35].exec(_2c))!=null){
var _36=_17.filter[_35],_37=null,_38=0,_39,_3a;
_34=false;
if(_32==_31){
_31=[];
}
if(_17.preFilter[_35]){
_33=_17.preFilter[_35](_33,_32,_2e,_31,not);
if(!_33){
_34=_39=true;
}else{
if(_33[0]===true){
_37=[];
var _3b=null,_3c;
for(var i=0;(_3c=_32[i])!==undefined;i++){
if(_3c&&_3b!==_3c){
_37.push(_3c);
_3b=_3c;
}
}
}
}
}
if(_33){
for(var i=0;(_3a=_32[i])!==undefined;i++){
if(_3a){
if(_37&&_3a!=_37[_38]){
_38++;
}
_39=_36(_3a,_33,_38,_37);
var _3e=not^!!_39;
if(_2e&&_39!=null){
if(_3e){
_34=true;
}else{
_32[i]=false;
}
}else{
if(_3e){
_31.push(_3a);
_34=true;
}
}
}
}
}
if(_39!==undefined){
if(!_2e){
_32=_31;
}
_2c=_2c.replace(_17.match[_35],"");
if(!_34){
return [];
}
break;
}
}
}
_2c=_2c.replace(/\s*,\s*/,"");
if(_2c==old){
if(_34==null){
throw "Syntax error, unrecognized expression: "+_2c;
}else{
break;
}
}
old=_2c;
}
return _32;
};
var _17=_a.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u0128-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u0128-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u0128-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[((?:[\w\u0128-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\]/,TAG:/^((?:[\w\u0128-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child\(?(even|odd|[\dn+-]*)\)?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)\(?(\d*)\)?(?:[^-]|$)/,PSEUDO:/:((?:[\w\u0128-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},relative:{"+":function(_3f,_40){
for(var i=0,l=_3f.length;i<l;i++){
var _43=_3f[i];
if(_43){
var cur=_43.previousSibling;
while(cur&&cur.nodeType!==1){
cur=cur.previousSibling;
}
_3f[i]=typeof _40==="string"?cur||false:cur===_40;
}
}
if(typeof _40==="string"){
_a.filter(_40,_3f,true);
}
},">":function(_45,_46){
if(typeof _46==="string"&&!/\W/.test(_46)){
_46=_46.toUpperCase();
for(var i=0,l=_45.length;i<l;i++){
var _49=_45[i];
if(_49){
var _4a=_49.parentNode;
_45[i]=_4a.nodeName===_46?_4a:false;
}
}
}else{
for(var i=0,l=_45.length;i<l;i++){
var _49=_45[i];
if(_49){
_45[i]=typeof _46==="string"?_49.parentNode:_49.parentNode===_46;
}
}
if(typeof _46==="string"){
_a.filter(_46,_45,true);
}
}
},"":function(_4b,_4c){
var _4d="done"+(_8++),_4e=_4f;
if(!_4c.match(/\W/)){
var _50=_4c=_4c.toUpperCase();
_4e=_51;
}
_4e("parentNode",_4c,_4d,_4b,_50);
},"~":function(_52,_53){
var _54="done"+(_8++),_55=_4f;
if(typeof _53==="string"&&!_53.match(/\W/)){
var _56=_53=_53.toUpperCase();
_55=_51;
}
_55("previousSibling",_53,_54,_52,_56);
}},find:{ID:function(_57,_58){
if(_58.getElementById){
var m=_58.getElementById(_57[1]);
return m?[m]:[];
}
},NAME:function(_5a,_5b){
return _5b.getElementsByName?_5b.getElementsByName(_5a[1]):null;
},TAG:function(_5c,_5d){
return _5d.getElementsByTagName(_5c[1]);
}},preFilter:{CLASS:function(_5e,_5f,_60,_61,not){
_5e=" "+_5e[1].replace(/\\/g,"")+" ";
for(var i=0;_5f[i];i++){
if(not^(" "+_5f[i].className+" ").indexOf(_5e)>=0){
if(!_60){
_61.push(_5f[i]);
}
}else{
if(_60){
_5f[i]=false;
}
}
}
return false;
},ID:function(_64){
return _64[1];
},TAG:function(_65){
return _65[1].toUpperCase();
},CHILD:function(_66){
if(_66[1]=="nth"){
var _67=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(_66[2]=="even"&&"2n"||_66[2]=="odd"&&"2n+1"||!/\D/.test(_66[2])&&"0n+"+_66[2]||_66[2]);
_66[2]=(_67[1]+(_67[2]||1))-0;
_66[3]=_67[3]-0;
}
_66[0]="done"+(_8++);
return _66;
},ATTR:function(_68){
var _69=_68[1];
if(_17.attrMap[_69]){
_68[1]=_17.attrMap[_69];
}
if(_68[2]==="~="){
_68[4]=" "+_68[4]+" ";
}
return _68;
},PSEUDO:function(_6a,_6b,_6c,_6d,not){
if(_6a[1]==="not"){
if(_6a[3].match(_7).length>1){
_6a[3]=_a(_6a[3],null,null,_6b);
}else{
var ret=_a.filter(_6a[3],_6b,_6c,true^not);
if(!_6c){
_6d.push.apply(_6d,ret);
}
return false;
}
}
return _6a;
},POS:function(_70){
_70.unshift(true);
return _70;
}},filters:{enabled:function(_71){
return _71.disabled===false&&_71.type!=="hidden";
},disabled:function(_72){
return _72.disabled===true;
},checked:function(_73){
return _73.checked===true;
},selected:function(_74){
_74.parentNode.selectedIndex;
return _74.selected===true;
},parent:function(_75){
return !!_75.firstChild;
},empty:function(_76){
return !_76.firstChild;
},has:function(_77,i,_79){
return !!_a(_79[3],_77).length;
},header:function(_7a){
return /h\d/i.test(_7a.nodeName);
},text:function(_7b){
return "text"===_7b.type;
},radio:function(_7c){
return "radio"===_7c.type;
},checkbox:function(_7d){
return "checkbox"===_7d.type;
},file:function(_7e){
return "file"===_7e.type;
},password:function(_7f){
return "password"===_7f.type;
},submit:function(_80){
return "submit"===_80.type;
},image:function(_81){
return "image"===_81.type;
},reset:function(_82){
return "reset"===_82.type;
},button:function(_83){
return "button"===_83.type||_83.nodeName.toUpperCase()==="BUTTON";
},input:function(_84){
return /input|select|textarea|button/i.test(_84.nodeName);
}},setFilters:{first:function(_85,i){
return i===0;
},last:function(_87,i,_89,_8a){
return i===_8a.length-1;
},even:function(_8b,i){
return i%2===0;
},odd:function(_8d,i){
return i%2===1;
},lt:function(_8f,i,_91){
return i<_91[3]-0;
},gt:function(_92,i,_94){
return i>_94[3]-0;
},nth:function(_95,i,_97){
return _97[3]-0==i;
},eq:function(_98,i,_9a){
return _9a[3]-0==i;
}},filter:{CHILD:function(_9b,_9c){
var _9d=_9c[1],_9e=_9b.parentNode;
var _9f=_9c[0];
if(_9e&&!_9e[_9f]){
var _a0=1;
for(var _a1=_9e.firstChild;_a1;_a1=_a1.nextSibling){
if(_a1.nodeType==1){
_a1.nodeIndex=_a0++;
}
}
_9e[_9f]=_a0-1;
}
if(_9d=="first"){
return _9b.nodeIndex==1;
}else{
if(_9d=="last"){
return _9b.nodeIndex==_9e[_9f];
}else{
if(_9d=="only"){
return _9e[_9f]==1;
}else{
if(_9d=="nth"){
var add=false,_a3=_9c[2],_a4=_9c[3];
if(_a3==1&&_a4==0){
return true;
}
if(_a3==0){
if(_9b.nodeIndex==_a4){
add=true;
}
}else{
if((_9b.nodeIndex-_a4)%_a3==0&&(_9b.nodeIndex-_a4)/_a3>=0){
add=true;
}
}
return add;
}
}
}
}
},PSEUDO:function(_a5,_a6,i,_a8){
var _a9=_a6[1],_aa=_17.filters[_a9];
if(_aa){
return _aa(_a5,i,_a6,_a8);
}else{
if(_a9==="contains"){
return (_a5.textContent||_a5.innerText||"").indexOf(_a6[3])>=0;
}else{
if(_a9==="not"){
var not=_a6[3];
for(var i=0,l=not.length;i<l;i++){
if(not[i]===_a5){
return false;
}
}
return true;
}
}
}
},ID:function(_ad,_ae){
return _ad.nodeType===1&&_ad.getAttribute("id")===_ae;
},TAG:function(_af,_b0){
return (_b0==="*"&&_af.nodeType===1)||_af.nodeName===_b0;
},CLASS:function(_b1,_b2){
return _b2.test(_b1.className);
},ATTR:function(_b3,_b4){
var _b5=_b3[_b4[1]]||_b3.getAttribute(_b4[1]),_b6=_b5+"",_b7=_b4[2],_b8=_b4[4];
return _b5==null?false:_b7==="="?_b6===_b8:_b7==="*="?_b6.indexOf(_b8)>=0:_b7==="~="?(" "+_b6+" ").indexOf(_b8)>=0:!_b4[4]?_b5:_b7==="!="?_b6!=_b8:_b7==="^="?_b6.indexOf(_b8)===0:_b7==="$="?_b6.substr(_b6.length-_b8.length)===_b8:_b7==="|="?_b6===_b8||_b6.substr(0,_b8.length+1)===_b8+"-":false;
},POS:function(_b9,_ba,i,_bc){
var _bd=_ba[2],_be=_17.setFilters[_bd];
if(_be){
return _be(_b9,i,_ba,_bc);
}
}}};
for(var _bf in _17.match){
_17.match[_bf]=RegExp(_17.match[_bf].source+/(?![^\[]*\])(?![^\(]*\))/.source);
}
var _1e=function(_c0,_c1){
_c0=Array.prototype.slice.call(_c0);
if(_c1){
_c1.push.apply(_c1,_c0);
return _c1;
}
return _c0;
};
try{
Array.prototype.slice.call(document.documentElement.childNodes);
}
catch(e){
_1e=function(_c2,_c3){
var ret=_c3||[];
if(_9.call(_c2)==="[object Array]"){
Array.prototype.push.apply(ret,_c2);
}else{
if(typeof _c2.length==="number"){
for(var i=0,l=_c2.length;i<l;i++){
ret.push(_c2[i]);
}
}else{
for(var i=0;_c2[i];i++){
ret.push(_c2[i]);
}
}
}
return ret;
};
}
(function(){
var _c7=document.createElement("form"),id="script"+(new Date).getTime();
_c7.innerHTML="<input name='"+id+"'/>";
var _c9=document.documentElement;
_c9.insertBefore(_c7,_c9.firstChild);
if(!!document.getElementById(id)){
_17.find.ID=function(_ca,_cb){
if(_cb.getElementById){
var m=_cb.getElementById(_ca[1]);
return m?m.id===_ca[1]||m.getAttributeNode&&m.getAttributeNode("id").nodeValue===_ca[1]?[m]:undefined:[];
}
};
_17.filter.ID=function(_cd,_ce){
var _cf=_cd.getAttributeNode&&_cd.getAttributeNode("id");
return _cd.nodeType===1&&_cf&&_cf.nodeValue===_ce;
};
}
_c9.removeChild(_c7);
})();
(function(){
var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){
_17.find.TAG=function(_d1,_d2){
var _d3=_d2.getElementsByTagName(_d1[1]);
if(_d1[1]==="*"){
var tmp=[];
for(var i=0;_d3[i];i++){
if(_d3[i].nodeType===1){
tmp.push(_d3[i]);
}
}
_d3=tmp;
}
return _d3;
};
}
})();
if(document.querySelectorAll){
(function(){
var _d6=_a;
_a=function(_d7,_d8,_d9,_da){
_d8=_d8||document;
if(!_da&&_d8.nodeType===9){
try{
return _1e(_d8.querySelectorAll(_d7),_d9);
}
catch(e){
}
}
return _d6(_d7,_d8,_d9,_da);
};
_a.find=_d6.find;
_a.filter=_d6.filter;
_a.selectors=_d6.selectors;
_a.matches=_d6.matches;
})();
}
if(document.documentElement.getElementsByClassName){
_17.order.splice(1,0,"CLASS");
_17.find.CLASS=function(_db,_dc){
return _dc.getElementsByClassName(_db[1]);
};
}
function _51(dir,cur,_df,_e0,_e1){
for(var i=0,l=_e0.length;i<l;i++){
var _e4=_e0[i];
if(_e4){
_e4=_e4[dir];
var _e5=false;
while(_e4&&_e4.nodeType){
var _e6=_e4[_df];
if(_e6){
_e5=_e0[_e6];
break;
}
if(_e4.nodeType===1){
_e4[_df]=i;
}
if(_e4.nodeName===cur){
_e5=_e4;
break;
}
_e4=_e4[dir];
}
_e0[i]=_e5;
}
}
};
function _4f(dir,cur,_e9,_ea,_eb){
for(var i=0,l=_ea.length;i<l;i++){
var _ee=_ea[i];
if(_ee){
_ee=_ee[dir];
var _ef=false;
while(_ee&&_ee.nodeType){
if(_ee[_e9]){
_ef=_ea[_ee[_e9]];
break;
}
if(_ee.nodeType===1){
_ee[_e9]=i;
if(typeof cur!=="string"){
if(_ee===cur){
_ef=true;
break;
}
}else{
if(_a.filter(cur,[_ee]).length>0){
_ef=_ee;
break;
}
}
}
_ee=_ee[dir];
}
_ea[i]=_ef;
}
}
};
var _21=document.compareDocumentPosition?function(a,b){
return a.compareDocumentPosition(b)&16;
}:function(a,b){
return a!==b&&(a.contains?a.contains(b):true);
};
(ns||window).Sizzle=_a;
})(typeof dojo=="undefined"?null:dojo);
}
