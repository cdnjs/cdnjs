/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(dojo.config["baseUrl"]){
dojo.baseUrl=dojo.config["baseUrl"];
}else{
dojo.baseUrl="./";
}
dojo.locale=dojo.locale||String(java.util.Locale.getDefault().toString().replace("_","-").toLowerCase());
dojo._name="rhino";
dojo.isRhino=true;
if(typeof print=="function"){
console.debug=print;
}
if(!("byId" in dojo)){
dojo.byId=function(id,_2){
if(id&&(typeof id=="string"||id instanceof String)){
if(!_2){
_2=document;
}
return _2.getElementById(id);
}
return id;
};
}
dojo._loadUri=function(_3,cb){
try{
var _5=(new java.io.File(_3)).exists();
if(!_5){
try{
var _6=(new java.net.URL(_3)).openStream();
_6.close();
}
catch(e){
return false;
}
}
if(cb){
var _7=(_5?readText:readUri)(_3,"UTF-8");
if(!eval("'‏'").length){
_7=String(_7).replace(/[\u200E\u200F\u202A-\u202E]/g,function(_8){
return "\\u"+_8.charCodeAt(0).toString(16);
});
}
cb(eval("("+_7+")"));
}else{
load(_3);
}
return true;
}
catch(e){

return false;
}
};
dojo.exit=function(_9){
quit(_9);
};
dojo._rhinoCurrentScriptViaJava=function(_a){
var _b=Packages.org.mozilla.javascript.Context.getCurrentContext().getOptimizationLevel();
var _c=new java.io.CharArrayWriter();
var pw=new java.io.PrintWriter(_c);
var _e=new java.lang.Exception();
var s=_c.toString();
var _10=s.match(/[^\(]*\.js\)/gi);
if(!_10){
throw Error("cannot parse printStackTrace output: "+s);
}
var _11=((typeof _a!="undefined")&&(_a))?_10[_a+1]:_10[_10.length-1];
_11=_10[3];
if(!_11){
_11=_10[1];
}
if(!_11){
throw Error("could not find js file in printStackTrace output: "+s);
}
return _11;
};
function readText(_12,_13){
_13=_13||"utf-8";
var jf=new java.io.File(_12);
var is=new java.io.FileInputStream(jf);
return dj_readInputStream(is,_13);
};
function readUri(uri,_17){
var _18=(new java.net.URL(uri)).openConnection();
_17=_17||_18.getContentEncoding()||"utf-8";
var is=_18.getInputStream();
return dj_readInputStream(is,_17);
};
function dj_readInputStream(is,_1b){
var _1c=new java.io.BufferedReader(new java.io.InputStreamReader(is,_1b));
try{
var sb=new java.lang.StringBuffer();
var _1e="";
while((_1e=_1c.readLine())!==null){
sb.append(_1e);
sb.append(java.lang.System.getProperty("line.separator"));
}
return sb.toString();
}
finally{
_1c.close();
}
};
if((!dojo.config.libraryScriptUri)||(!dojo.config.libraryScriptUri.length)){
try{
dojo.config.libraryScriptUri=dojo._rhinoCurrentScriptViaJava(1);
}
catch(e){
if(dojo.config["isDebug"]){
print("\n");
print("we have no idea where Dojo is located.");
print("Please try loading rhino in a non-interpreted mode or set a");
print("\n\tdjConfig.libraryScriptUri\n");
print("Setting the dojo path to './'");
print("This is probably wrong!");
print("\n");
print("Dojo will try to load anyway");
}
dojo.config.libraryScriptUri="./";
}
}
dojo.doc=typeof document!="undefined"?document:null;
dojo.body=function(){
return document.body;
};
if(typeof setTimeout=="undefined"||typeof clearTimeout=="undefined"){
dojo._timeouts=[];
function clearTimeout(idx){
if(!dojo._timeouts[idx]){
return;
}
dojo._timeouts[idx].stop();
};
function setTimeout(_20,_21){
var def={sleepTime:_21,hasSlept:false,run:function(){
if(!this.hasSlept){
this.hasSlept=true;
java.lang.Thread.currentThread().sleep(this.sleepTime);
}
try{
_20();
}
catch(e){

}
}};
var _23=new java.lang.Runnable(def);
var _24=new java.lang.Thread(_23);
_24.start();
return dojo._timeouts.push(_24)-1;
};
}
if(dojo.config["modulePaths"]){
for(var param in dojo.config["modulePaths"]){
dojo.registerModulePath(param,dojo.config["modulePaths"][param]);
}
}
