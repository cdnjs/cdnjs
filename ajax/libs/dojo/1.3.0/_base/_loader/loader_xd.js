/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base._loader.loader_xd"]){
dojo._hasResource["dojo._base._loader.loader_xd"]=true;
dojo.provide("dojo._base._loader.loader_xd");
dojo._xdReset=function(){
this._isXDomain=dojo.config.useXDomain||false;
this._xdTimer=0;
this._xdInFlight={};
this._xdOrderedReqs=[];
this._xdDepMap={};
this._xdContents=[];
this._xdDefList=[];
};
dojo._xdReset();
dojo._xdCreateResource=function(_1,_2,_3){
var _4=_1.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");
var _5=[];
var _6=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\s*\(([\w\W]*?)\)/mg;
var _7;
while((_7=_6.exec(_4))!=null){
if(_7[1]=="requireLocalization"){
eval(_7[0]);
}else{
_5.push("\""+_7[1]+"\", "+_7[2]);
}
}
var _8=[];
_8.push(dojo._scopeName+"._xdResourceLoaded(function("+dojo._scopePrefixArgs+"){\n");
var _9=dojo._xdExtractLoadInits(_1);
if(_9){
_1=_9[0];
for(var i=1;i<_9.length;i++){
_8.push(_9[i]+";\n");
}
}
_8.push("return {");
if(_5.length>0){
_8.push("depends: [");
for(i=0;i<_5.length;i++){
if(i>0){
_8.push(",\n");
}
_8.push("["+_5[i]+"]");
}
_8.push("],");
}
_8.push("\ndefineResource: function("+dojo._scopePrefixArgs+"){");
if(!dojo.config["debugAtAllCosts"]||_2=="dojo._base._loader.loader_debug"){
_8.push(_1);
}
_8.push("\n}, resourceName: '"+_2+"', resourcePath: '"+_3+"'};});");
return _8.join("");
};
dojo._xdExtractLoadInits=function(_b){
var _c=/dojo.loadInit\s*\(/g;
_c.lastIndex=0;
var _d=/[\(\)]/g;
_d.lastIndex=0;
var _e=[];
var _f;
while((_f=_c.exec(_b))){
_d.lastIndex=_c.lastIndex;
var _10=1;
var _11;
while((_11=_d.exec(_b))){
if(_11[0]==")"){
_10-=1;
}else{
_10+=1;
}
if(_10==0){
break;
}
}
if(_10!=0){
throw "unmatched paren around character "+_d.lastIndex+" in: "+_b;
}
var _12=_c.lastIndex-_f[0].length;
_e.push(_b.substring(_12,_d.lastIndex));
var _13=_d.lastIndex-_12;
_b=_b.substring(0,_12)+_b.substring(_d.lastIndex,_b.length);
_c.lastIndex=_d.lastIndex-_13;
_c.lastIndex=_d.lastIndex;
}
if(_e.length>0){
_e.unshift(_b);
}
return (_e.length?_e:null);
};
dojo._xdIsXDomainPath=function(_14){
var _15=_14.indexOf(":");
var _16=_14.indexOf("/");
if(_15>0&&_15<_16){
return true;
}else{
var url=this.baseUrl;
_15=url.indexOf(":");
_16=url.indexOf("/");
if(_15>0&&_15<_16&&(!location.host||url.indexOf("http://"+location.host)!=0)){
return true;
}
}
return false;
};
dojo._loadPath=function(_18,_19,cb){
var _1b=this._xdIsXDomainPath(_18);
this._isXDomain|=_1b;
var uri=((_18.charAt(0)=="/"||_18.match(/^\w+:/))?"":this.baseUrl)+_18;
try{
return ((!_19||this._isXDomain)?this._loadUri(uri,cb,_1b,_19):this._loadUriAndCheck(uri,_19,cb));
}
catch(e){
console.error(e);
return false;
}
};
dojo._loadUri=function(uri,cb,_1f,_20){
if(this._loadedUrls[uri]){
return 1;
}
if(this._isXDomain&&_20&&_20!="dojo.i18n"){
this._xdOrderedReqs.push(_20);
if(_1f||uri.indexOf("/nls/")==-1){
this._xdInFlight[_20]=true;
this._inFlightCount++;
}
if(!this._xdTimer){
if(dojo.isAIR){
this._xdTimer=setInterval(function(){
dojo._xdWatchInFlight();
},100);
}else{
this._xdTimer=setInterval(dojo._scopeName+"._xdWatchInFlight();",100);
}
}
this._xdStartTime=(new Date()).getTime();
}
if(_1f){
var _21=uri.lastIndexOf(".");
if(_21<=0){
_21=uri.length-1;
}
var _22=uri.substring(0,_21)+".xd";
if(_21!=uri.length-1){
_22+=uri.substring(_21,uri.length);
}
if(dojo.isAIR){
_22=_22.replace("app:/","/");
}
var _23=document.createElement("script");
_23.type="text/javascript";
_23.src=_22;
if(!this.headElement){
this._headElement=document.getElementsByTagName("head")[0];
if(!this._headElement){
this._headElement=document.getElementsByTagName("html")[0];
}
}
this._headElement.appendChild(_23);
}else{
var _24=this._getText(uri,null,true);
if(_24==null){
return 0;
}
if(this._isXDomain&&uri.indexOf("/nls/")==-1&&_20!="dojo.i18n"){
var res=this._xdCreateResource(_24,_20,uri);
dojo.eval(res);
}else{
if(cb){
_24="("+_24+")";
}else{
_24=this._scopePrefix+_24+this._scopeSuffix;
}
var _26=dojo["eval"](_24+"\r\n//@ sourceURL="+uri);
if(cb){
cb(_26);
}
}
}
this._loadedUrls[uri]=true;
this._loadedUrls.push(uri);
return true;
};
dojo._xdResourceLoaded=function(res){
res=res.apply(dojo.global,dojo._scopeArgs);
var _28=res.depends;
var _29=null;
var _2a=null;
var _2b=[];
if(_28&&_28.length>0){
var dep=null;
var _2d=0;
var _2e=false;
for(var i=0;i<_28.length;i++){
dep=_28[i];
if(dep[0]=="provide"){
_2b.push(dep[1]);
}else{
if(!_29){
_29=[];
}
if(!_2a){
_2a=[];
}
var _30=this._xdUnpackDependency(dep);
if(_30.requires){
_29=_29.concat(_30.requires);
}
if(_30.requiresAfter){
_2a=_2a.concat(_30.requiresAfter);
}
}
var _31=dep[0];
var _32=_31.split(".");
if(_32.length==2){
dojo[_32[0]][_32[1]].apply(dojo[_32[0]],dep.slice(1));
}else{
dojo[_31].apply(dojo,dep.slice(1));
}
}
if(_2b.length==1&&_2b[0]=="dojo._base._loader.loader_debug"){
res.defineResource(dojo);
}else{
var _33=this._xdContents.push({content:res.defineResource,resourceName:res["resourceName"],resourcePath:res["resourcePath"],isDefined:false})-1;
for(i=0;i<_2b.length;i++){
this._xdDepMap[_2b[i]]={requires:_29,requiresAfter:_2a,contentIndex:_33};
}
}
for(i=0;i<_2b.length;i++){
this._xdInFlight[_2b[i]]=false;
}
}
};
dojo._xdLoadFlattenedBundle=function(_34,_35,_36,_37){
_36=_36||"root";
var _38=dojo.i18n.normalizeLocale(_36).replace("-","_");
var _39=[_34,"nls",_35].join(".");
var _3a=dojo["provide"](_39);
_3a[_38]=_37;
var _3b=[_34,_38,_35].join(".");
var _3c=dojo._xdBundleMap[_3b];
if(_3c){
for(var _3d in _3c){
_3a[_3d]=_37;
}
}
};
dojo._xdInitExtraLocales=function(){
var _3e=dojo.config.extraLocale;
if(_3e){
if(!_3e instanceof Array){
_3e=[_3e];
}
dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(m,b,_41,_42){
dojo._xdReqLoc(m,b,_41,_42);
if(_41){
return;
}
for(var i=0;i<_3e.length;i++){
dojo._xdReqLoc(m,b,_3e[i],_42);
}
};
}
};
dojo._xdBundleMap={};
dojo.xdRequireLocalization=function(_44,_45,_46,_47){
if(dojo._xdInitExtraLocales){
dojo._xdInitExtraLocales();
dojo._xdInitExtraLocales=null;
dojo.xdRequireLocalization.apply(dojo,arguments);
return;
}
var _48=_47.split(",");
var _49=dojo.i18n.normalizeLocale(_46);
var _4a="";
for(var i=0;i<_48.length;i++){
if(_49.indexOf(_48[i])==0){
if(_48[i].length>_4a.length){
_4a=_48[i];
}
}
}
var _4c=_4a.replace("-","_");
var _4d=dojo.getObject([_44,"nls",_45].join("."));
if(_4d&&_4d[_4c]){
_4e[_49.replace("-","_")]=_4d[_4c];
}else{
var _4f=[_44,(_4c||"root"),_45].join(".");
var _4e=dojo._xdBundleMap[_4f];
if(!_4e){
_4e=dojo._xdBundleMap[_4f]={};
}
_4e[_49.replace("-","_")]=true;
dojo.require(_44+".nls"+(_4a?"."+_4a:"")+"."+_45);
}
};
dojo._xdRealRequireLocalization=dojo.requireLocalization;
dojo.requireLocalization=function(_50,_51,_52,_53){
var _54=this.moduleUrl(_50).toString();
if(this._xdIsXDomainPath(_54)){
return dojo.xdRequireLocalization.apply(dojo,arguments);
}else{
return dojo._xdRealRequireLocalization.apply(dojo,arguments);
}
};
dojo._xdUnpackDependency=function(dep){
var _56=null;
var _57=null;
switch(dep[0]){
case "requireIf":
case "requireAfterIf":
if(dep[1]===true){
_56=[{name:dep[2],content:null}];
}
break;
case "platformRequire":
var _58=dep[1];
var _59=_58["common"]||[];
_56=(_58[dojo.hostenv.name_])?_59.concat(_58[dojo.hostenv.name_]||[]):_59.concat(_58["default"]||[]);
if(_56){
for(var i=0;i<_56.length;i++){
if(_56[i] instanceof Array){
_56[i]={name:_56[i][0],content:null};
}else{
_56[i]={name:_56[i],content:null};
}
}
}
break;
case "require":
_56=[{name:dep[1],content:null}];
break;
case "i18n._preloadLocalizations":
dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,dep.slice(1));
break;
}
if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){
_57=_56;
_56=null;
}
return {requires:_56,requiresAfter:_57};
};
dojo._xdWalkReqs=function(){
var _5b=null;
var req;
for(var i=0;i<this._xdOrderedReqs.length;i++){
req=this._xdOrderedReqs[i];
if(this._xdDepMap[req]){
_5b=[req];
_5b[req]=true;
this._xdEvalReqs(_5b);
}
}
};
dojo._xdEvalReqs=function(_5e){
while(_5e.length>0){
var req=_5e[_5e.length-1];
var res=this._xdDepMap[req];
var i,_62,_63;
if(res){
_62=res.requires;
if(_62&&_62.length>0){
for(i=0;i<_62.length;i++){
_63=_62[i].name;
if(_63&&!_5e[_63]){
_5e.push(_63);
_5e[_63]=true;
this._xdEvalReqs(_5e);
}
}
}
var _64=this._xdContents[res.contentIndex];
if(!_64.isDefined){
var _65=_64.content;
_65["resourceName"]=_64["resourceName"];
_65["resourcePath"]=_64["resourcePath"];
this._xdDefList.push(_65);
_64.isDefined=true;
}
this._xdDepMap[req]=null;
_62=res.requiresAfter;
if(_62&&_62.length>0){
for(i=0;i<_62.length;i++){
_63=_62[i].name;
if(_63&&!_5e[_63]){
_5e.push(_63);
_5e[_63]=true;
this._xdEvalReqs(_5e);
}
}
}
}
_5e.pop();
}
};
dojo._xdClearInterval=function(){
clearInterval(this._xdTimer);
this._xdTimer=0;
};
dojo._xdWatchInFlight=function(){
var _66="";
var _67=(dojo.config.xdWaitSeconds||15)*1000;
var _68=(this._xdStartTime+_67)<(new Date()).getTime();
for(var _69 in this._xdInFlight){
if(this._xdInFlight[_69]===true){
if(_68){
_66+=_69+" ";
}else{
return;
}
}
}
this._xdClearInterval();
if(_68){
throw "Could not load cross-domain resources: "+_66;
}
this._xdWalkReqs();
var _6a=this._xdDefList.length;
for(var i=0;i<_6a;i++){
var _6c=dojo._xdDefList[i];
if(dojo.config["debugAtAllCosts"]&&_6c["resourceName"]){
if(!this["_xdDebugQueue"]){
this._xdDebugQueue=[];
}
this._xdDebugQueue.push({resourceName:_6c.resourceName,resourcePath:_6c.resourcePath});
}else{
_6c.apply(dojo.global,dojo._scopeArgs);
}
}
for(i=0;i<this._xdContents.length;i++){
var _6d=this._xdContents[i];
if(_6d.content&&!_6d.isDefined){
_6d.content.apply(dojo.global,dojo._scopeArgs);
}
}
this._xdReset();
if(this["_xdDebugQueue"]&&this._xdDebugQueue.length>0){
this._xdDebugFileLoaded();
}else{
this._xdNotifyLoaded();
}
};
dojo._xdNotifyLoaded=function(){
this._inFlightCount=0;
if(this._initFired&&!this._loadNotifying){
this._callLoaded();
}
};
}
