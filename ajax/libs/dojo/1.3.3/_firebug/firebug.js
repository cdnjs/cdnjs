/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._firebug.firebug"]){
dojo._hasResource["dojo._firebug.firebug"]=true;
dojo.provide("dojo._firebug.firebug");
dojo.deprecated=function(_1,_2,_3){
var _4="DEPRECATED: "+_1;
if(_2){
_4+=" "+_2;
}
if(_3){
_4+=" -- will be removed in version: "+_3;
}
console.warn(_4);
};
dojo.experimental=function(_5,_6){
var _7="EXPERIMENTAL: "+_5+" -- APIs subject to change without notice.";
if(_6){
_7+=" "+_6;
}
console.warn(_7);
};
if(!window.firebug&&!dojo.config.useCustomLogger&&!dojo.isAIR&&(!dojo.isMoz||(dojo.isMoz&&!("console" in window))||(dojo.isMoz&&!(window.loadFirebugConsole||console.firebug)))){
(function(){
try{
if(window!=window.parent){
if(window.parent["console"]){
window.console=window.parent.console;
}
return;
}
}
catch(e){
}
var _8=document;
var _9=window;
var _a=0;
var _b=null;
var _c=null;
var _d=null;
var _e=null;
var _f=null;
var _10=null;
var _11=false;
var _12=[];
var _13=[];
var _14={};
var _15={};
var _16=null;
var _17;
var _18;
var _19=false;
var _1a=null;
var _1b=document.createElement("div");
var _1c;
var _1d;
window.console={_connects:[],log:function(){
_1e(arguments,"");
},debug:function(){
_1e(arguments,"debug");
},info:function(){
_1e(arguments,"info");
},warn:function(){
_1e(arguments,"warning");
},error:function(){
_1e(arguments,"error");
},assert:function(_1f,_20){
if(!_1f){
var _21=[];
for(var i=1;i<arguments.length;++i){
_21.push(arguments[i]);
}
_1e(_21.length?_21:["Assertion Failure"],"error");
throw _20?_20:"Assertion Failure";
}
},dir:function(obj){
var str=_25(obj);
str=str.replace(/\n/g,"<br />");
str=str.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
_26([str],"dir");
},dirxml:function(_27){
var _28=[];
_29(_27,_28);
_26(_28,"dirxml");
},group:function(){
_26(arguments,"group",_2a);
},groupEnd:function(){
_26(arguments,"",_2b);
},time:function(_2c){
_14[_2c]=new Date().getTime();
},timeEnd:function(_2d){
if(_2d in _14){
var _2e=(new Date()).getTime()-_14[_2d];
_1e([_2d+":",_2e+"ms"]);
delete _14[_2d];
}
},count:function(_2f){
if(!_15[_2f]){
_15[_2f]=0;
}
_15[_2f]++;
_1e([_2f+": "+_15[_2f]]);
},trace:function(_30){
var _31=_30||3;
var f=console.trace.caller;

for(var i=0;i<_31;i++){
var _34=f.toString();
var _35=[];
for(var a=0;a<f.arguments.length;a++){
_35.push(f.arguments[a]);
}
if(f.arguments.length){

}else{

}
f=f.caller;
}
},profile:function(){
this.warn(["profile() not supported."]);
},profileEnd:function(){
},clear:function(){
if(_c){
while(_c.childNodes.length){
dojo.destroy(_c.firstChild);
}
}
dojo.forEach(this._connects,dojo.disconnect);
},open:function(){
_37(true);
},close:function(){
if(_11){
_37();
}
},_restoreBorder:function(){
if(_1c){
_1c.style.border=_1d;
}
},openDomInspector:function(){
_19=true;
_c.style.display="none";
_16.style.display="block";
_d.style.display="none";
document.body.style.cursor="pointer";
_17=dojo.connect(document,"mousemove",function(evt){
if(!_19){
return;
}
if(!_1a){
_1a=setTimeout(function(){
_1a=null;
},50);
}else{
return;
}
var _39=evt.target;
if(_39&&(_1c!==_39)){
var _3a=true;
console._restoreBorder();
var _3b=[];
_29(_39,_3b);
_16.innerHTML=_3b.join("");
_1c=_39;
_1d=_1c.style.border;
_1c.style.border="#0000FF 1px solid";
}
});
setTimeout(function(){
_18=dojo.connect(document,"click",function(evt){
document.body.style.cursor="";
_19=!_19;
dojo.disconnect(_18);
});
},30);
},_closeDomInspector:function(){
document.body.style.cursor="";
dojo.disconnect(_17);
dojo.disconnect(_18);
_19=false;
console._restoreBorder();
},openConsole:function(){
_c.style.display="block";
_16.style.display="none";
_d.style.display="none";
console._closeDomInspector();
},openObjectInspector:function(){
_c.style.display="none";
_16.style.display="none";
_d.style.display="block";
console._closeDomInspector();
},recss:function(){
var i,a,s;
a=document.getElementsByTagName("link");
for(i=0;i<a.length;i++){
s=a[i];
if(s.rel.toLowerCase().indexOf("stylesheet")>=0&&s.href){
var h=s.href.replace(/(&|%5C?)forceReload=\d+/,"");
s.href=h+(h.indexOf("?")>=0?"&":"?")+"forceReload="+new Date().valueOf();
}
}
}};
function _37(_41){
_11=_41||!_11;
if(_b){
_b.style.display=_11?"block":"none";
}
};
function _42(){
_37(true);
if(_f){
_f.focus();
}
};
function _43(x,y,w,h){
var win=window.open("","_firebug","status=0,menubar=0,resizable=1,top="+y+",left="+x+",width="+w+",height="+h+",scrollbars=1,addressbar=0");
if(!win){
var msg="Firebug Lite could not open a pop-up window, most likely because of a blocker.\n"+"Either enable pop-ups for this domain, or change the djConfig to popup=false.";
alert(msg);
}
_4a(win);
var _4b=win.document;
var _4c="<html style=\"height:100%;\"><head><title>Firebug Lite</title></head>\n"+"<body bgColor=\"#ccc\" style=\"height:97%;\" onresize=\"opener.onFirebugResize()\">\n"+"<div id=\"fb\"></div>"+"</body></html>";
_4b.write(_4c);
_4b.close();
return win;
};
function _4a(wn){
var d=new Date();
d.setTime(d.getTime()+(60*24*60*60*1000));
d=d.toUTCString();
var dc=wn.document,_50;
if(wn.innerWidth){
_50=function(){
return {w:wn.innerWidth,h:wn.innerHeight};
};
}else{
if(dc.documentElement&&dc.documentElement.clientWidth){
_50=function(){
return {w:dc.documentElement.clientWidth,h:dc.documentElement.clientHeight};
};
}else{
if(dc.body){
_50=function(){
return {w:dc.body.clientWidth,h:dc.body.clientHeight};
};
}
}
}
window.onFirebugResize=function(){
layout(_50().h);
clearInterval(wn._firebugWin_resize);
wn._firebugWin_resize=setTimeout(function(){
var x=wn.screenLeft,y=wn.screenTop,w=wn.outerWidth||wn.document.body.offsetWidth,h=wn.outerHeight||wn.document.body.offsetHeight;
document.cookie="_firebugPosition="+[x,y,w,h].join(",")+"; expires="+d+"; path=/";
},5000);
};
};
function _55(){
if(_b){
return;
}
if(dojo.config.popup){
var _56="100%";
var _57=document.cookie.match(/(?:^|; )_firebugPosition=([^;]*)/);
var p=_57?_57[1].split(","):[2,2,320,480];
_9=_43(p[0],p[1],p[2],p[3]);
_8=_9.document;
dojo.config.debugContainerId="fb";
_9.console=window.console;
_9.dojo=window.dojo;
}else{
_8=document;
_56=(dojo.config.debugHeight||300)+"px";
}
var _59=_8.createElement("link");
_59.href=dojo.moduleUrl("dojo._firebug","firebug.css");
_59.rel="stylesheet";
_59.type="text/css";
var _5a=_8.getElementsByTagName("head");
if(_5a){
_5a=_5a[0];
}
if(!_5a){
_5a=_8.getElementsByTagName("html")[0];
}
if(dojo.isIE){
window.setTimeout(function(){
_5a.appendChild(_59);
},0);
}else{
_5a.appendChild(_59);
}
if(dojo.config.debugContainerId){
_b=_8.getElementById(dojo.config.debugContainerId);
}
if(!_b){
_b=_8.createElement("div");
_8.body.appendChild(_b);
}
_b.className+=" firebug";
_b.style.height=_56;
_b.style.display=(_11?"block":"none");
var _5b=function(_5c,_5d,_5e,_5f){
return "<li class=\""+_5f+"\"><a href=\"javascript:void(0);\" onclick=\"console."+_5e+"(); return false;\" title=\""+_5d+"\">"+_5c+"</a></li>";
};
_b.innerHTML="<div id=\"firebugToolbar\">"+"  <ul id=\"fireBugTabs\" class=\"tabs\">"+_5b("Clear","Remove All Console Logs","clear","")+_5b("ReCSS","Refresh CSS without reloading page","recss","")+_5b("Console","Show Console Logs","openConsole","gap")+_5b("DOM","Show DOM Inspector","openDomInspector","")+_5b("Object","Show Object Inspector","openObjectInspector","")+((dojo.config.popup)?"":_5b("Close","Close the console","close","gap"))+"\t</ul>"+"</div>"+"<input type=\"text\" id=\"firebugCommandLine\" />"+"<div id=\"firebugLog\"></div>"+"<div id=\"objectLog\" style=\"display:none;\">Click on an object in the Log display</div>"+"<div id=\"domInspect\" style=\"display:none;\">Hover over HTML elements in the main page. Click to hold selection.</div>";
_10=_8.getElementById("firebugToolbar");
_f=_8.getElementById("firebugCommandLine");
_60(_f,"keydown",_61);
_60(_8,dojo.isIE||dojo.isSafari?"keydown":"keypress",_62);
_c=_8.getElementById("firebugLog");
_d=_8.getElementById("objectLog");
_16=_8.getElementById("domInspect");
_e=_8.getElementById("fireBugTabs");
_63();
_64();
};
dojo.addOnLoad(_55);
function _65(){
_8=null;
if(_9.console){
_9.console.clear();
}
_9=null;
_b=null;
_c=null;
_d=null;
_16=null;
_f=null;
_12=[];
_13=[];
_14={};
};
function _66(){
var _67=_f.value;
_f.value="";
_26([">  ",_67],"command");
var _68;
try{
_68=eval(_67);
}
catch(e){

}

};
function _63(h){
var _6a=25;
var _6b=h?h-(_6a+_f.offsetHeight+25+(h*0.01))+"px":(_b.offsetHeight-_6a-_f.offsetHeight)+"px";
_c.style.top=_6a+"px";
_c.style.height=_6b;
_d.style.height=_6b;
_d.style.top=_6a+"px";
_16.style.height=_6b;
_16.style.top=_6a+"px";
_f.style.bottom=0;
dojo.connect(window,"onunload",_65);
};
function _26(_6c,_6d,_6e){
if(_c){
_6f(_6c,_6d,_6e);
}else{
_12.push([_6c,_6d,_6e]);
}
};
function _64(){
var _70=_12;
_12=[];
for(var i=0;i<_70.length;++i){
_6f(_70[i][0],_70[i][1],_70[i][2]);
}
};
function _6f(_72,_73,_74){
var _75=_c.scrollTop+_c.offsetHeight>=_c.scrollHeight;
_74=_74||_76;
_74(_72,_73);
if(_75){
_c.scrollTop=_c.scrollHeight-_c.offsetHeight;
}
};
function _77(row){
var _79=_13.length?_13[_13.length-1]:_c;
_79.appendChild(row);
};
function _76(_7a,_7b){
var row=_c.ownerDocument.createElement("div");
row.className="logRow"+(_7b?" logRow-"+_7b:"");
row.innerHTML=_7a.join("");
_77(row);
};
function _2a(_7d,_7e){
_1e(_7d,_7e);
var _7f=_c.ownerDocument.createElement("div");
_7f.className="logGroupBox";
_77(_7f);
_13.push(_7f);
};
function _2b(){
_13.pop();
};
function _1e(_80,_81){
var _82=[];
var _83=_80[0];
var _84=0;
if(typeof (_83)!="string"){
_83="";
_84=-1;
}
var _85=_86(_83);
for(var i=0;i<_85.length;++i){
var _88=_85[i];
if(_88&&typeof _88=="object"){
_88.appender(_80[++_84],_82);
}else{
_89(_88,_82);
}
}
var ids=[];
var obs=[];
for(i=_84+1;i<_80.length;++i){
_89(" ",_82);
var _8c=_80[i];
if(_8c===undefined||_8c===null){
_8d(_8c,_82);
}else{
if(typeof (_8c)=="string"){
_89(_8c,_82);
}else{
if(_8c instanceof Date){
_89(_8c.toString(),_82);
}else{
if(_8c.nodeType==9){
_89("[ XmlDoc ]",_82);
}else{
var id="_a"+_a++;
ids.push(id);
obs.push(_8c);
var str="<a id=\""+id+"\" href=\"javascript:void(0);\">"+_90(_8c)+"</a>";
_91(str,_82);
}
}
}
}
}
_26(_82,_81);
for(i=0;i<ids.length;i++){
var btn=_8.getElementById(ids[i]);
if(!btn){
continue;
}
btn.obj=obs[i];
_9.console._connects.push(dojo.connect(btn,"onclick",function(){
console.openObjectInspector();
try{
_25(this.obj);
}
catch(e){
this.obj=e;
}
_d.innerHTML="<pre>"+_25(this.obj)+"</pre>";
}));
}
};
function _86(_93){
var _94=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var _96={s:_89,d:_97,i:_97,f:_98};
for(var m=reg.exec(_93);m;m=reg.exec(_93)){
var _9a=m[8]?m[8]:m[5];
var _9b=_9a in _96?_96[_9a]:_9c;
var _9d=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
_94.push(_93.substr(0,m[0][0]=="%"?m.index:m.index+1));
_94.push({appender:_9b,precision:_9d});
_93=_93.substr(m.index+m[0].length);
}
_94.push(_93);
return _94;
};
function _9e(_9f){
function _a0(ch){
switch(ch){
case "<":
return "&lt;";
case ">":
return "&gt;";
case "&":
return "&amp;";
case "'":
return "&#39;";
case "\"":
return "&quot;";
}
return "?";
};
return String(_9f).replace(/[<>&"']/g,_a0);
};
function _a2(_a3){
try{
return _a3+"";
}
catch(e){
return null;
}
};
function _91(_a4,_a5){
_a5.push(_a2(_a4));
};
function _89(_a6,_a7){
_a7.push(_9e(_a2(_a6)));
};
function _8d(_a8,_a9){
_a9.push("<span class=\"objectBox-null\">",_9e(_a2(_a8)),"</span>");
};
function _aa(_ab,_ac){
_ac.push("<span class=\"objectBox-string\">&quot;",_9e(_a2(_ab)),"&quot;</span>");
};
function _97(_ad,_ae){
_ae.push("<span class=\"objectBox-number\">",_9e(_a2(_ad)),"</span>");
};
function _98(_af,_b0){
_b0.push("<span class=\"objectBox-number\">",_9e(_a2(_af)),"</span>");
};
function _b1(_b2,_b3){
_b3.push("<span class=\"objectBox-function\">",_90(_b2),"</span>");
};
function _9c(_b4,_b5){
try{
if(_b4===undefined){
_8d("undefined",_b5);
}else{
if(_b4===null){
_8d("null",_b5);
}else{
if(typeof _b4=="string"){
_aa(_b4,_b5);
}else{
if(typeof _b4=="number"){
_97(_b4,_b5);
}else{
if(typeof _b4=="function"){
_b1(_b4,_b5);
}else{
if(_b4.nodeType==1){
_b6(_b4,_b5);
}else{
if(typeof _b4=="object"){
_b7(_b4,_b5);
}else{
_89(_b4,_b5);
}
}
}
}
}
}
}
}
catch(e){
}
};
function _b7(_b8,_b9){
var _ba=_a2(_b8);
var _bb=/\[object (.*?)\]/;
var m=_bb.exec(_ba);
_b9.push("<span class=\"objectBox-object\">",m?m[1]:_ba,"</span>");
};
function _b6(_bd,_be){
_be.push("<span class=\"objectBox-selector\">");
_be.push("<span class=\"selectorTag\">",_9e(_bd.nodeName.toLowerCase()),"</span>");
if(_bd.id){
_be.push("<span class=\"selectorId\">#",_9e(_bd.id),"</span>");
}
if(_bd.className){
_be.push("<span class=\"selectorClass\">.",_9e(_bd.className),"</span>");
}
_be.push("</span>");
};
function _29(_bf,_c0){
if(_bf.nodeType==1){
_c0.push("<div class=\"objectBox-element\">","&lt;<span class=\"nodeTag\">",_bf.nodeName.toLowerCase(),"</span>");
for(var i=0;i<_bf.attributes.length;++i){
var _c2=_bf.attributes[i];
if(!_c2.specified){
continue;
}
_c0.push("&nbsp;<span class=\"nodeName\">",_c2.nodeName.toLowerCase(),"</span>=&quot;<span class=\"nodeValue\">",_9e(_c2.nodeValue),"</span>&quot;");
}
if(_bf.firstChild){
_c0.push("&gt;</div><div class=\"nodeChildren\">");
for(var _c3=_bf.firstChild;_c3;_c3=_c3.nextSibling){
_29(_c3,_c0);
}
_c0.push("</div><div class=\"objectBox-element\">&lt;/<span class=\"nodeTag\">",_bf.nodeName.toLowerCase(),"&gt;</span></div>");
}else{
_c0.push("/&gt;</div>");
}
}else{
if(_bf.nodeType==3){
_c0.push("<div class=\"nodeText\">",_9e(_bf.nodeValue),"</div>");
}
}
};
function _60(_c4,_c5,_c6){
if(document.all){
_c4.attachEvent("on"+_c5,_c6);
}else{
_c4.addEventListener(_c5,_c6,false);
}
};
function _c7(_c8,_c9,_ca){
if(document.all){
_c8.detachEvent("on"+_c9,_ca);
}else{
_c8.removeEventListener(_c9,_ca,false);
}
};
function _cb(_cc){
if(document.all){
_cc.cancelBubble=true;
}else{
_cc.stopPropagation();
}
};
function _cd(msg,_cf,_d0){
var _d1=_cf.lastIndexOf("/");
var _d2=_d1==-1?_cf:_cf.substr(_d1+1);
var _d3=["<span class=\"errorMessage\">",msg,"</span>","<div class=\"objectBox-sourceLink\">",_d2," (line ",_d0,")</div>"];
_26(_d3,"error");
};
var _d4=new Date().getTime();
function _62(_d5){
var _d6=(new Date()).getTime();
if(_d6>_d4+200){
_d5=dojo.fixEvent(_d5);
var _d7=dojo.keys;
var ekc=_d5.keyCode;
_d4=_d6;
if(ekc==_d7.F12){
_37();
}else{
if((ekc==_d7.NUMPAD_ENTER||ekc==76)&&_d5.shiftKey&&(_d5.metaKey||_d5.ctrlKey)){
_42();
}else{
return;
}
}
_cb(_d5);
}
};
function _61(e){
var dk=dojo.keys;
if(e.keyCode==13&&_f.value){
_db(_f.value);
_66();
}else{
if(e.keyCode==27){
_f.value="";
}else{
if(e.keyCode==dk.UP_ARROW||e.charCode==dk.UP_ARROW){
_dc("older");
}else{
if(e.keyCode==dk.DOWN_ARROW||e.charCode==dk.DOWN_ARROW){
_dc("newer");
}else{
if(e.keyCode==dk.HOME||e.charCode==dk.HOME){
_dd=1;
_dc("older");
}else{
if(e.keyCode==dk.END||e.charCode==dk.END){
_dd=999999;
_dc("newer");
}
}
}
}
}
}
};
var _dd=-1;
var _de=null;
function _db(_df){
var _e0=_e1("firebug_history");
_e0=(_e0)?dojo.fromJson(_e0):[];
var pos=dojo.indexOf(_e0,_df);
if(pos!=-1){
_e0.splice(pos,1);
}
_e0.push(_df);
_e1("firebug_history",dojo.toJson(_e0),30);
while(_e0.length&&!_e1("firebug_history")){
_e0.shift();
_e1("firebug_history",dojo.toJson(_e0),30);
}
_de=null;
_dd=-1;
};
function _dc(_e3){
var _e4=_e1("firebug_history");
_e4=(_e4)?dojo.fromJson(_e4):[];
if(!_e4.length){
return;
}
if(_de===null){
_de=_f.value;
}
if(_dd==-1){
_dd=_e4.length;
}
if(_e3=="older"){
--_dd;
if(_dd<0){
_dd=0;
}
}else{
if(_e3=="newer"){
++_dd;
if(_dd>_e4.length){
_dd=_e4.length;
}
}
}
if(_dd==_e4.length){
_f.value=_de;
_de=null;
}else{
_f.value=_e4[_dd];
}
};
function _e1(_e5,_e6){
var c=document.cookie;
if(arguments.length==1){
var _e8=c.match(new RegExp("(?:^|; )"+_e5+"=([^;]*)"));
return _e8?decodeURIComponent(_e8[1]):undefined;
}else{
var d=new Date();
d.setMonth(d.getMonth()+1);
document.cookie=_e5+"="+encodeURIComponent(_e6)+((d.toUtcString)?"; expires="+d.toUTCString():"");
}
};
function _ea(it){
return it&&it instanceof Array||typeof it=="array";
};
function _ec(o){
var cnt=0;
for(var nm in o){
cnt++;
}
return cnt;
};
function _25(o,i,txt,_f3){
var ind=" \t";
txt=txt||"";
i=i||ind;
_f3=_f3||[];
var _f5;
if(o&&o.nodeType==1){
var _f6=[];
_29(o,_f6);
return _f6.join("");
}
var br=",\n",cnt=0,_f9=_ec(o);
if(o instanceof Date){
return i+o.toString()+br;
}
looking:
for(var nm in o){
cnt++;
if(cnt==_f9){
br="\n";
}
if(o[nm]===window||o[nm]===document){
continue;
}else{
if(o[nm]===null){
txt+=i+nm+" : NULL"+br;
}else{
if(o[nm]&&o[nm].nodeType){
if(o[nm].nodeType==1){
}else{
if(o[nm].nodeType==3){
txt+=i+nm+" : [ TextNode "+o[nm].data+" ]"+br;
}
}
}else{
if(typeof o[nm]=="object"&&(o[nm] instanceof String||o[nm] instanceof Number||o[nm] instanceof Boolean)){
txt+=i+nm+" : "+o[nm]+","+br;
}else{
if(o[nm] instanceof Date){
txt+=i+nm+" : "+o[nm].toString()+br;
}else{
if(typeof (o[nm])=="object"&&o[nm]){
for(var j=0,_fc;_fc=_f3[j];j++){
if(o[nm]===_fc){
txt+=i+nm+" : RECURSION"+br;
continue looking;
}
}
_f3.push(o[nm]);
_f5=(_ea(o[nm]))?["[","]"]:["{","}"];
txt+=i+nm+" : "+_f5[0]+"\n";
txt+=_25(o[nm],i+ind,"",_f3);
txt+=i+_f5[1]+br;
}else{
if(typeof o[nm]=="undefined"){
txt+=i+nm+" : undefined"+br;
}else{
if(nm=="toString"&&typeof o[nm]=="function"){
var _fd=o[nm]();
if(typeof _fd=="string"&&_fd.match(/function ?(.*?)\(/)){
_fd=_9e(_90(o[nm]));
}
txt+=i+nm+" : "+_fd+br;
}else{
txt+=i+nm+" : "+_9e(_90(o[nm]))+br;
}
}
}
}
}
}
}
}
}
return txt;
};
function _90(obj){
var _ff=(obj instanceof Error);
if(obj.nodeType==1){
return _9e("< "+obj.tagName.toLowerCase()+" id=\""+obj.id+"\" />");
}
if(obj.nodeType==3){
return _9e("[TextNode: \""+obj.nodeValue+"\"]");
}
var nm=(obj&&(obj.id||obj.name||obj.ObjectID||obj.widgetId));
if(!_ff&&nm){
return "{"+nm+"}";
}
var _101=2;
var _102=4;
var cnt=0;
if(_ff){
nm="[ Error: "+(obj.message||obj.description||obj)+" ]";
}else{
if(_ea(obj)){
nm="["+obj.slice(0,_102).join(",");
if(obj.length>_102){
nm+=" ... ("+obj.length+" items)";
}
nm+="]";
}else{
if(typeof obj=="function"){
nm=obj+"";
var reg=/function\s*([^\(]*)(\([^\)]*\))[^\{]*\{/;
var m=reg.exec(nm);
if(m){
if(!m[1]){
m[1]="function";
}
nm=m[1]+m[2];
}else{
nm="function()";
}
}else{
if(typeof obj!="object"||typeof obj=="string"){
nm=obj+"";
}else{
nm="{";
for(var i in obj){
cnt++;
if(cnt>_101){
break;
}
nm+=i+":"+_9e(obj[i])+"  ";
}
nm+="}";
}
}
}
}
return nm;
};
_60(document,dojo.isIE||dojo.isSafari?"keydown":"keypress",_62);
if((document.documentElement.getAttribute("debug")=="true")||(dojo.config.isDebug)){
_37(true);
}
})();
}
}
