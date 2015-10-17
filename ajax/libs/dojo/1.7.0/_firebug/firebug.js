/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_firebug/firebug",["../_base/kernel","require","../_base/html","../_base/sniff","../_base/array","../_base/lang","../_base/event","../_base/unload"],function(_1,_2){
var _3=(/Trident/.test(window.navigator.userAgent));
if(_3){
var _4=["log","info","debug","warn","error"];
for(var i=0;i<_4.length;i++){
var m=_4[i];
if(!console[m]||console[m]._fake){
continue;
}
var n="_"+_4[i];
console[n]=console[m];
console[m]=(function(){
var _5=n;
return function(){
console[_5](Array.prototype.join.call(arguments," "));
};
})();
}
try{
console.clear();
}
catch(e){
}
}
if(_1.isFF||_1.isChrome||_1.isSafari||_3||window.firebug||(typeof console!="undefined"&&console.firebug)||_1.config.useCustomLogger||_1.isAIR){
return;
}
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
var _6=document;
var _7=window;
var _8=0;
var _9=null;
var _a=null;
var _b=null;
var _c=null;
var _d=null;
var _e=null;
var _f=false;
var _10=[];
var _11=[];
var _12={};
var _13={};
var _14=null;
var _15;
var _16;
var _17=false;
var _18=null;
var _19=document.createElement("div");
var _1a;
var _1b;
window.console={_connects:[],log:function(){
_1c(arguments,"");
},debug:function(){
_1c(arguments,"debug");
},info:function(){
_1c(arguments,"info");
},warn:function(){
_1c(arguments,"warning");
},error:function(){
_1c(arguments,"error");
},assert:function(_1d,_1e){
if(!_1d){
var _1f=[];
for(var i=1;i<arguments.length;++i){
_1f.push(arguments[i]);
}
_1c(_1f.length?_1f:["Assertion Failure"],"error");
throw _1e?_1e:"Assertion Failure";
}
},dir:function(obj){
var str=_20(obj);
str=str.replace(/\n/g,"<br />");
str=str.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
_21([str],"dir");
},dirxml:function(_22){
var _23=[];
_24(_22,_23);
_21(_23,"dirxml");
},group:function(){
_21(arguments,"group",_25);
},groupEnd:function(){
_21(arguments,"",_26);
},time:function(_27){
_12[_27]=new Date().getTime();
},timeEnd:function(_28){
if(_28 in _12){
var _29=(new Date()).getTime()-_12[_28];
_1c([_28+":",_29+"ms"]);
delete _12[_28];
}
},count:function(_2a){
if(!_13[_2a]){
_13[_2a]=0;
}
_13[_2a]++;
_1c([_2a+": "+_13[_2a]]);
},trace:function(_2b){
var _2c=_2b||3;
var f=console.trace.caller;
for(var i=0;i<_2c;i++){
var _2d=f.toString();
var _2e=[];
for(var a=0;a<f.arguments.length;a++){
_2e.push(f.arguments[a]);
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
if(_a){
while(_a.childNodes.length){
_1.destroy(_a.firstChild);
}
}
_1.forEach(this._connects,_1.disconnect);
},open:function(){
_2f(true);
},close:function(){
if(_f){
_2f();
}
},_restoreBorder:function(){
if(_1a){
_1a.style.border=_1b;
}
},openDomInspector:function(){
_17=true;
_a.style.display="none";
_14.style.display="block";
_b.style.display="none";
document.body.style.cursor="pointer";
_15=_1.connect(document,"mousemove",function(evt){
if(!_17){
return;
}
if(!_18){
_18=setTimeout(function(){
_18=null;
},50);
}else{
return;
}
var _30=evt.target;
if(_30&&(_1a!==_30)){
var _31=true;
console._restoreBorder();
var _32=[];
_24(_30,_32);
_14.innerHTML=_32.join("");
_1a=_30;
_1b=_1a.style.border;
_1a.style.border="#0000FF 1px solid";
}
});
setTimeout(function(){
_16=_1.connect(document,"click",function(evt){
document.body.style.cursor="";
_17=!_17;
_1.disconnect(_16);
});
},30);
},_closeDomInspector:function(){
document.body.style.cursor="";
_1.disconnect(_15);
_1.disconnect(_16);
_17=false;
console._restoreBorder();
},openConsole:function(){
_a.style.display="block";
_14.style.display="none";
_b.style.display="none";
console._closeDomInspector();
},openObjectInspector:function(){
_a.style.display="none";
_14.style.display="none";
_b.style.display="block";
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
function _2f(_33){
_f=_33||!_f;
if(_9){
_9.style.display=_f?"block":"none";
}
};
function _34(){
_2f(true);
if(_d){
_d.focus();
}
};
function _35(x,y,w,h){
var win=window.open("","_firebug","status=0,menubar=0,resizable=1,top="+y+",left="+x+",width="+w+",height="+h+",scrollbars=1,addressbar=0");
if(!win){
var msg="Firebug Lite could not open a pop-up window, most likely because of a blocker.\n"+"Either enable pop-ups for this domain, or change the djConfig to popup=false.";
alert(msg);
}
_36(win);
var _37=win.document;
var _38="<html style=\"height:100%;\"><head><title>Firebug Lite</title></head>\n"+"<body bgColor=\"#ccc\" style=\"height:97%;\" onresize=\"opener.onFirebugResize()\">\n"+"<div id=\"fb\"></div>"+"</body></html>";
_37.write(_38);
_37.close();
return win;
};
function _36(wn){
var d=new Date();
d.setTime(d.getTime()+(60*24*60*60*1000));
d=d.toUTCString();
var dc=wn.document,_39;
if(wn.innerWidth){
_39=function(){
return {w:wn.innerWidth,h:wn.innerHeight};
};
}else{
if(dc.documentElement&&dc.documentElement.clientWidth){
_39=function(){
return {w:dc.documentElement.clientWidth,h:dc.documentElement.clientHeight};
};
}else{
if(dc.body){
_39=function(){
return {w:dc.body.clientWidth,h:dc.body.clientHeight};
};
}
}
}
window.onFirebugResize=function(){
_47(_39().h);
clearInterval(wn._firebugWin_resize);
wn._firebugWin_resize=setTimeout(function(){
var x=wn.screenLeft,y=wn.screenTop,w=wn.outerWidth||wn.document.body.offsetWidth,h=wn.outerHeight||wn.document.body.offsetHeight;
document.cookie="_firebugPosition="+[x,y,w,h].join(",")+"; expires="+d+"; path=/";
},5000);
};
};
function _3a(){
if(_9){
return;
}
_2f(true);
if(_1.config.popup){
var _3b="100%";
var _3c=document.cookie.match(/(?:^|; )_firebugPosition=([^;]*)/);
var p=_3c?_3c[1].split(","):[2,2,320,480];
_7=_35(p[0],p[1],p[2],p[3]);
_6=_7.document;
_1.config.debugContainerId="fb";
_7.console=window.console;
_7.dojo=window.dojo;
}else{
_6=document;
_3b=(_1.config.debugHeight||300)+"px";
}
var _3d=_6.createElement("link");
_3d.href=_2.toUrl("./firebug.css");
_3d.rel="stylesheet";
_3d.type="text/css";
var _3e=_6.getElementsByTagName("head");
if(_3e){
_3e=_3e[0];
}
if(!_3e){
_3e=_6.getElementsByTagName("html")[0];
}
if(_1.isIE){
window.setTimeout(function(){
_3e.appendChild(_3d);
},0);
}else{
_3e.appendChild(_3d);
}
if(_1.config.debugContainerId){
_9=_6.getElementById(_1.config.debugContainerId);
}
if(!_9){
_9=_6.createElement("div");
_6.body.appendChild(_9);
}
_9.className+=" firebug";
_9.style.height=_3b;
_9.style.display=(_f?"block":"none");
var _3f=function(_40,_41,_42,_43){
return "<li class=\""+_43+"\"><a href=\"javascript:void(0);\" onclick=\"console."+_42+"(); return false;\" title=\""+_41+"\">"+_40+"</a></li>";
};
_9.innerHTML="<div id=\"firebugToolbar\">"+"  <ul id=\"fireBugTabs\" class=\"tabs\">"+_3f("Clear","Remove All Console Logs","clear","")+_3f("ReCSS","Refresh CSS without reloading page","recss","")+_3f("Console","Show Console Logs","openConsole","gap")+_3f("DOM","Show DOM Inspector","openDomInspector","")+_3f("Object","Show Object Inspector","openObjectInspector","")+((_1.config.popup)?"":_3f("Close","Close the console","close","gap"))+"\t</ul>"+"</div>"+"<input type=\"text\" id=\"firebugCommandLine\" />"+"<div id=\"firebugLog\"></div>"+"<div id=\"objectLog\" style=\"display:none;\">Click on an object in the Log display</div>"+"<div id=\"domInspect\" style=\"display:none;\">Hover over HTML elements in the main page. Click to hold selection.</div>";
_e=_6.getElementById("firebugToolbar");
_d=_6.getElementById("firebugCommandLine");
_44(_d,"keydown",_45);
_44(_6,_1.isIE||_1.isSafari?"keydown":"keypress",_46);
_a=_6.getElementById("firebugLog");
_b=_6.getElementById("objectLog");
_14=_6.getElementById("domInspect");
_c=_6.getElementById("fireBugTabs");
_47();
_48();
};
_1.addOnLoad(_3a);
function _49(){
_6=null;
if(_7.console){
_7.console.clear();
}
_7=null;
_9=null;
_a=null;
_b=null;
_14=null;
_d=null;
_10=[];
_11=[];
_12={};
};
function _4a(){
var _4b=_d.value;
_d.value="";
_21([">  ",_4b],"command");
var _4c;
try{
_4c=eval(_4b);
}
catch(e){
}
};
function _47(h){
var _4d=25;
var _4e=h?h-(_4d+_d.offsetHeight+25+(h*0.01))+"px":(_9.offsetHeight-_4d-_d.offsetHeight)+"px";
_a.style.top=_4d+"px";
_a.style.height=_4e;
_b.style.height=_4e;
_b.style.top=_4d+"px";
_14.style.height=_4e;
_14.style.top=_4d+"px";
_d.style.bottom=0;
_1.addOnWindowUnload(_49);
};
function _21(_4f,_50,_51){
if(_a){
_52(_4f,_50,_51);
}else{
_10.push([_4f,_50,_51]);
}
};
function _48(){
var _53=_10;
_10=[];
for(var i=0;i<_53.length;++i){
_52(_53[i][0],_53[i][1],_53[i][2]);
}
};
function _52(_54,_55,_56){
var _57=_a.scrollTop+_a.offsetHeight>=_a.scrollHeight;
_56=_56||_58;
_56(_54,_55);
if(_57){
_a.scrollTop=_a.scrollHeight-_a.offsetHeight;
}
};
function _59(row){
var _5a=_11.length?_11[_11.length-1]:_a;
_5a.appendChild(row);
};
function _58(_5b,_5c){
var row=_a.ownerDocument.createElement("div");
row.className="logRow"+(_5c?" logRow-"+_5c:"");
row.innerHTML=_5b.join("");
_59(row);
};
function _25(_5d,_5e){
_1c(_5d,_5e);
var _5f=_a.ownerDocument.createElement("div");
_5f.className="logGroupBox";
_59(_5f);
_11.push(_5f);
};
function _26(){
_11.pop();
};
function _1c(_60,_61){
var _62=[];
var _63=_60[0];
var _64=0;
if(typeof (_63)!="string"){
_63="";
_64=-1;
}
var _65=_66(_63);
for(var i=0;i<_65.length;++i){
var _67=_65[i];
if(_67&&typeof _67=="object"){
_67.appender(_60[++_64],_62);
}else{
_68(_67,_62);
}
}
var ids=[];
var obs=[];
for(i=_64+1;i<_60.length;++i){
_68(" ",_62);
var _69=_60[i];
if(_69===undefined||_69===null){
_6a(_69,_62);
}else{
if(typeof (_69)=="string"){
_68(_69,_62);
}else{
if(_69 instanceof Date){
_68(_69.toString(),_62);
}else{
if(_69.nodeType==9){
_68("[ XmlDoc ]",_62);
}else{
var id="_a"+_8++;
ids.push(id);
obs.push(_69);
var str="<a id=\""+id+"\" href=\"javascript:void(0);\">"+_6b(_69)+"</a>";
_6c(str,_62);
}
}
}
}
}
_21(_62,_61);
for(i=0;i<ids.length;i++){
var btn=_6.getElementById(ids[i]);
if(!btn){
continue;
}
btn.obj=obs[i];
_7.console._connects.push(_1.connect(btn,"onclick",function(){
console.openObjectInspector();
try{
_20(this.obj);
}
catch(e){
this.obj=e;
}
_b.innerHTML="<pre>"+_20(this.obj)+"</pre>";
}));
}
};
function _66(_6d){
var _6e=[];
var reg=/((^%|[^\\]%)(\d+)?(\.)([a-zA-Z]))|((^%|[^\\]%)([a-zA-Z]))/;
var _6f={s:_68,d:_70,i:_70,f:_71};
for(var m=reg.exec(_6d);m;m=reg.exec(_6d)){
var _72=m[8]?m[8]:m[5];
var _73=_72 in _6f?_6f[_72]:_74;
var _75=m[3]?parseInt(m[3]):(m[4]=="."?-1:0);
_6e.push(_6d.substr(0,m[0][0]=="%"?m.index:m.index+1));
_6e.push({appender:_73,precision:_75});
_6d=_6d.substr(m.index+m[0].length);
}
_6e.push(_6d);
return _6e;
};
function _76(_77){
function _78(ch){
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
return String(_77).replace(/[<>&"']/g,_78);
};
function _79(_7a){
try{
return _7a+"";
}
catch(e){
return null;
}
};
function _6c(_7b,_7c){
_7c.push(_79(_7b));
};
function _68(_7d,_7e){
_7e.push(_76(_79(_7d)));
};
function _6a(_7f,_80){
_80.push("<span class=\"objectBox-null\">",_76(_79(_7f)),"</span>");
};
function _81(_82,_83){
_83.push("<span class=\"objectBox-string\">&quot;",_76(_79(_82)),"&quot;</span>");
};
function _70(_84,_85){
_85.push("<span class=\"objectBox-number\">",_76(_79(_84)),"</span>");
};
function _71(_86,_87){
_87.push("<span class=\"objectBox-number\">",_76(_79(_86)),"</span>");
};
function _88(_89,_8a){
_8a.push("<span class=\"objectBox-function\">",_6b(_89),"</span>");
};
function _74(_8b,_8c){
try{
if(_8b===undefined){
_6a("undefined",_8c);
}else{
if(_8b===null){
_6a("null",_8c);
}else{
if(typeof _8b=="string"){
_81(_8b,_8c);
}else{
if(typeof _8b=="number"){
_70(_8b,_8c);
}else{
if(typeof _8b=="function"){
_88(_8b,_8c);
}else{
if(_8b.nodeType==1){
_8d(_8b,_8c);
}else{
if(typeof _8b=="object"){
_8e(_8b,_8c);
}else{
_68(_8b,_8c);
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
function _8e(_8f,_90){
var _91=_79(_8f);
var _92=/\[object (.*?)\]/;
var m=_92.exec(_91);
_90.push("<span class=\"objectBox-object\">",m?m[1]:_91,"</span>");
};
function _8d(_93,_94){
_94.push("<span class=\"objectBox-selector\">");
_94.push("<span class=\"selectorTag\">",_76(_93.nodeName.toLowerCase()),"</span>");
if(_93.id){
_94.push("<span class=\"selectorId\">#",_76(_93.id),"</span>");
}
if(_93.className){
_94.push("<span class=\"selectorClass\">.",_76(_93.className),"</span>");
}
_94.push("</span>");
};
function _24(_95,_96){
if(_95.nodeType==1){
_96.push("<div class=\"objectBox-element\">","&lt;<span class=\"nodeTag\">",_95.nodeName.toLowerCase(),"</span>");
for(var i=0;i<_95.attributes.length;++i){
var _97=_95.attributes[i];
if(!_97.specified){
continue;
}
_96.push("&nbsp;<span class=\"nodeName\">",_97.nodeName.toLowerCase(),"</span>=&quot;<span class=\"nodeValue\">",_76(_97.nodeValue),"</span>&quot;");
}
if(_95.firstChild){
_96.push("&gt;</div><div class=\"nodeChildren\">");
for(var _98=_95.firstChild;_98;_98=_98.nextSibling){
_24(_98,_96);
}
_96.push("</div><div class=\"objectBox-element\">&lt;/<span class=\"nodeTag\">",_95.nodeName.toLowerCase(),"&gt;</span></div>");
}else{
_96.push("/&gt;</div>");
}
}else{
if(_95.nodeType==3){
_96.push("<div class=\"nodeText\">",_76(_95.nodeValue),"</div>");
}
}
};
function _44(_99,_9a,_9b){
if(document.all){
_99.attachEvent("on"+_9a,_9b);
}else{
_99.addEventListener(_9a,_9b,false);
}
};
function _9c(_9d,_9e,_9f){
if(document.all){
_9d.detachEvent("on"+_9e,_9f);
}else{
_9d.removeEventListener(_9e,_9f,false);
}
};
function _a0(_a1){
if(document.all){
_a1.cancelBubble=true;
}else{
_a1.stopPropagation();
}
};
function _a2(msg,_a3,_a4){
var _a5=_a3.lastIndexOf("/");
var _a6=_a5==-1?_a3:_a3.substr(_a5+1);
var _a7=["<span class=\"errorMessage\">",msg,"</span>","<div class=\"objectBox-sourceLink\">",_a6," (line ",_a4,")</div>"];
_21(_a7,"error");
};
var _a8=new Date().getTime();
function _46(_a9){
var _aa=(new Date()).getTime();
if(_aa>_a8+200){
_a9=_1.fixEvent(_a9);
var _ab=_1.keys;
var ekc=_a9.keyCode;
_a8=_aa;
if(ekc==_ab.F12){
_2f();
}else{
if((ekc==_ab.NUMPAD_ENTER||ekc==76)&&_a9.shiftKey&&(_a9.metaKey||_a9.ctrlKey)){
_34();
}else{
return;
}
}
_a0(_a9);
}
};
function _45(e){
var dk=_1.keys;
if(e.keyCode==13&&_d.value){
_ac(_d.value);
_4a();
}else{
if(e.keyCode==27){
_d.value="";
}else{
if(e.keyCode==dk.UP_ARROW||e.charCode==dk.UP_ARROW){
_ad("older");
}else{
if(e.keyCode==dk.DOWN_ARROW||e.charCode==dk.DOWN_ARROW){
_ad("newer");
}else{
if(e.keyCode==dk.HOME||e.charCode==dk.HOME){
_ae=1;
_ad("older");
}else{
if(e.keyCode==dk.END||e.charCode==dk.END){
_ae=999999;
_ad("newer");
}
}
}
}
}
}
};
var _ae=-1;
var _af=null;
function _ac(_b0){
var _b1=_b2("firebug_history");
_b1=(_b1)?_1.fromJson(_b1):[];
var pos=_1.indexOf(_b1,_b0);
if(pos!=-1){
_b1.splice(pos,1);
}
_b1.push(_b0);
_b2("firebug_history",_1.toJson(_b1),30);
while(_b1.length&&!_b2("firebug_history")){
_b1.shift();
_b2("firebug_history",_1.toJson(_b1),30);
}
_af=null;
_ae=-1;
};
function _ad(_b3){
var _b4=_b2("firebug_history");
_b4=(_b4)?_1.fromJson(_b4):[];
if(!_b4.length){
return;
}
if(_af===null){
_af=_d.value;
}
if(_ae==-1){
_ae=_b4.length;
}
if(_b3=="older"){
--_ae;
if(_ae<0){
_ae=0;
}
}else{
if(_b3=="newer"){
++_ae;
if(_ae>_b4.length){
_ae=_b4.length;
}
}
}
if(_ae==_b4.length){
_d.value=_af;
_af=null;
}else{
_d.value=_b4[_ae];
}
};
function _b2(_b5,_b6){
var c=document.cookie;
if(arguments.length==1){
var _b7=c.match(new RegExp("(?:^|; )"+_b5+"=([^;]*)"));
return _b7?decodeURIComponent(_b7[1]):undefined;
}else{
var d=new Date();
d.setMonth(d.getMonth()+1);
document.cookie=_b5+"="+encodeURIComponent(_b6)+((d.toUtcString)?"; expires="+d.toUTCString():"");
}
};
function _b8(it){
return it&&it instanceof Array||typeof it=="array";
};
function _b9(o){
var cnt=0;
for(var nm in o){
cnt++;
}
return cnt;
};
function _20(o,i,txt,_ba){
var ind=" \t";
txt=txt||"";
i=i||ind;
_ba=_ba||[];
var _bb;
if(o&&o.nodeType==1){
var _bc=[];
_24(o,_bc);
return _bc.join("");
}
var br=",\n",cnt=0,_bd=_b9(o);
if(o instanceof Date){
return i+o.toString()+br;
}
looking:
for(var nm in o){
cnt++;
if(cnt==_bd){
br="\n";
}
if(o[nm]===window||o[nm]===document){
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
for(var j=0,_be;_be=_ba[j];j++){
if(o[nm]===_be){
txt+=i+nm+" : RECURSION"+br;
continue looking;
}
}
_ba.push(o[nm]);
_bb=(_b8(o[nm]))?["[","]"]:["{","}"];
txt+=i+nm+" : "+_bb[0]+"\n";
txt+=_20(o[nm],i+ind,"",_ba);
txt+=i+_bb[1]+br;
}else{
if(typeof o[nm]=="undefined"){
txt+=i+nm+" : undefined"+br;
}else{
if(nm=="toString"&&typeof o[nm]=="function"){
var _bf=o[nm]();
if(typeof _bf=="string"&&_bf.match(/function ?(.*?)\(/)){
_bf=_76(_6b(o[nm]));
}
txt+=i+nm+" : "+_bf+br;
}else{
txt+=i+nm+" : "+_76(_6b(o[nm]))+br;
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
function _6b(obj){
var _c0=(obj instanceof Error);
if(obj.nodeType==1){
return _76("< "+obj.tagName.toLowerCase()+" id=\""+obj.id+"\" />");
}
if(obj.nodeType==3){
return _76("[TextNode: \""+obj.nodeValue+"\"]");
}
var nm=(obj&&(obj.id||obj.name||obj.ObjectID||obj.widgetId));
if(!_c0&&nm){
return "{"+nm+"}";
}
var _c1=2;
var _c2=4;
var cnt=0;
if(_c0){
nm="[ Error: "+(obj.message||obj.description||obj)+" ]";
}else{
if(_b8(obj)){
nm="["+obj.slice(0,_c2).join(",");
if(obj.length>_c2){
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
if(cnt>_c1){
break;
}
nm+=i+":"+_76(obj[i])+"  ";
}
nm+="}";
}
}
}
}
return nm;
};
_44(document,_1.isIE||_1.isSafari?"keydown":"keypress",_46);
if((document.documentElement.getAttribute("debug")=="true")||(_1.config.isDebug)){
_2f(true);
}
_1.addOnWindowUnload(function(){
_9c(document,_1.isIE||_1.isSafari?"keydown":"keypress",_46);
window.onFirebugResize=null;
window.console=null;
});
});
