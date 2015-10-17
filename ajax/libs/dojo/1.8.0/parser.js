/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/parser",["./_base/kernel","./_base/lang","./_base/array","./_base/config","./_base/html","./_base/window","./_base/url","./_base/json","./aspect","./date/stamp","./Deferred","./has","./query","./on","./ready"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f){
new Date("X");
var _10=0;
_9.after(_2,"extend",function(){
_10++;
},true);
function _11(_12){
var map=_12._nameCaseMap,_13=_12.prototype;
if(!map||map._extendCnt<_10){
map=_12._nameCaseMap={};
for(var _14 in _13){
if(_14.charAt(0)==="_"){
continue;
}
map[_14.toLowerCase()]=_14;
}
map._extendCnt=_10;
}
return map;
};
var _15={};
function _16(_17){
var ts=_17.join();
if(!_15[ts]){
var _18=[];
for(var i=0,l=_17.length;i<l;i++){
var t=_17[i];
_18[_18.length]=(_15[t]=_15[t]||(_2.getObject(t)||(~t.indexOf("/")&&require(t))));
}
var _19=_18.shift();
_15[ts]=_18.length?(_19.createSubclass?_19.createSubclass(_18):_19.extend.apply(_19,_18)):_19;
}
return _15[ts];
};
var _1a={_clearCache:function(){
_10++;
_15={};
},_functionFromScript:function(_1b,_1c){
var _1d="",_1e="",_1f=(_1b.getAttribute(_1c+"args")||_1b.getAttribute("args")),_20=_1b.getAttribute("with");
var _21=(_1f||"").split(/\s*,\s*/);
if(_20&&_20.length){
_3.forEach(_20.split(/\s*,\s*/),function(_22){
_1d+="with("+_22+"){";
_1e+="}";
});
}
return new Function(_21,_1d+_1b.innerHTML+_1e);
},instantiate:function(_23,_24,_25){
_24=_24||{};
_25=_25||{};
var _26=(_25.scope||_1._scopeName)+"Type",_27="data-"+(_25.scope||_1._scopeName)+"-",_28=_27+"type",_29=_27+"mixins";
var _2a=[];
_3.forEach(_23,function(_2b){
var _2c=_26 in _24?_24[_26]:_2b.getAttribute(_28)||_2b.getAttribute(_26);
if(_2c){
var _2d=_2b.getAttribute(_29),_2e=_2d?[_2c].concat(_2d.split(/\s*,\s*/)):[_2c];
_2a.push({node:_2b,types:_2e});
}
});
return this._instantiate(_2a,_24,_25);
},_instantiate:function(_2f,_30,_31){
var _32=_3.map(_2f,function(obj){
var _33=obj.ctor||_16(obj.types);
if(!_33){
throw new Error("Unable to resolve constructor for: '"+obj.types.join()+"'");
}
return this.construct(_33,obj.node,_30,_31,obj.scripts,obj.inherited);
},this);
if(!_30._started&&!_31.noStart){
_3.forEach(_32,function(_34){
if(typeof _34.startup==="function"&&!_34._started){
_34.startup();
}
});
}
return _32;
},construct:function(_35,_36,_37,_38,_39,_3a){
var _3b=_35&&_35.prototype;
_38=_38||{};
var _3c={};
if(_38.defaults){
_2.mixin(_3c,_38.defaults);
}
if(_3a){
_2.mixin(_3c,_3a);
}
var _3d;
if(_c("dom-attributes-explicit")){
_3d=_36.attributes;
}else{
if(_c("dom-attributes-specified-flag")){
_3d=_3.filter(_36.attributes,function(a){
return a.specified;
});
}else{
var _3e=/^input$|^img$/i.test(_36.nodeName)?_36:_36.cloneNode(false),_3f=_3e.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g,"").replace(/^\s*<[a-zA-Z0-9]*\s*/,"").replace(/\s*>.*$/,"");
_3d=_3.map(_3f.split(/\s+/),function(_40){
var _41=_40.toLowerCase();
return {name:_40,value:(_36.nodeName=="LI"&&_40=="value")||_41=="enctype"?_36.getAttribute(_41):_36.getAttributeNode(_41).value};
});
}
}
var _42=_38.scope||_1._scopeName,_43="data-"+_42+"-",_44={};
if(_42!=="dojo"){
_44[_43+"props"]="data-dojo-props";
_44[_43+"type"]="data-dojo-type";
_44[_43+"mixins"]="data-dojo-mixins";
_44[_42+"type"]="dojoType";
_44[_43+"id"]="data-dojo-id";
}
var i=0,_45,_46=[],_47,_48;
while(_45=_3d[i++]){
var _49=_45.name,_4a=_49.toLowerCase(),_4b=_45.value;
switch(_44[_4a]||_4a){
case "data-dojo-type":
case "dojotype":
case "data-dojo-mixins":
break;
case "data-dojo-props":
_48=_4b;
break;
case "data-dojo-id":
case "jsid":
_47=_4b;
break;
case "data-dojo-attach-point":
case "dojoattachpoint":
_3c.dojoAttachPoint=_4b;
break;
case "data-dojo-attach-event":
case "dojoattachevent":
_3c.dojoAttachEvent=_4b;
break;
case "class":
_3c["class"]=_36.className;
break;
case "style":
_3c["style"]=_36.style&&_36.style.cssText;
break;
default:
if(!(_49 in _3b)){
var map=_11(_35);
_49=map[_4a]||_49;
}
if(_49 in _3b){
switch(typeof _3b[_49]){
case "string":
_3c[_49]=_4b;
break;
case "number":
_3c[_49]=_4b.length?Number(_4b):NaN;
break;
case "boolean":
_3c[_49]=_4b.toLowerCase()!="false";
break;
case "function":
if(_4b===""||_4b.search(/[^\w\.]+/i)!=-1){
_3c[_49]=new Function(_4b);
}else{
_3c[_49]=_2.getObject(_4b,false)||new Function(_4b);
}
_46.push(_49);
break;
default:
var _4c=_3b[_49];
_3c[_49]=(_4c&&"length" in _4c)?(_4b?_4b.split(/\s*,\s*/):[]):(_4c instanceof Date)?(_4b==""?new Date(""):_4b=="now"?new Date():_a.fromISOString(_4b)):(_4c instanceof _7)?(_1.baseUrl+_4b):_8.fromJson(_4b);
}
}else{
_3c[_49]=_4b;
}
}
}
for(var j=0;j<_46.length;j++){
var _4d=_46[j].toLowerCase();
_36.removeAttribute(_4d);
_36[_4d]=null;
}
if(_48){
try{
_48=_8.fromJson.call(_38.propsThis,"{"+_48+"}");
_2.mixin(_3c,_48);
}
catch(e){
throw new Error(e.toString()+" in data-dojo-props='"+_48+"'");
}
}
_2.mixin(_3c,_37);
if(!_39){
_39=(_35&&(_35._noScript||_3b._noScript)?[]:_d("> script[type^='dojo/']",_36));
}
var _4e=[],_4f=[],_50=[],ons=[];
if(_39){
for(i=0;i<_39.length;i++){
var _51=_39[i];
_36.removeChild(_51);
var _52=(_51.getAttribute(_43+"event")||_51.getAttribute("event")),_53=_51.getAttribute(_43+"prop"),_54=_51.getAttribute(_43+"method"),_55=_51.getAttribute(_43+"advice"),_56=_51.getAttribute("type"),nf=this._functionFromScript(_51,_43);
if(_52){
if(_56=="dojo/connect"){
_4e.push({method:_52,func:nf});
}else{
if(_56=="dojo/on"){
ons.push({event:_52,func:nf});
}else{
_3c[_52]=nf;
}
}
}else{
if(_56=="dojo/aspect"){
_4e.push({method:_54,advice:_55,func:nf});
}else{
if(_56=="dojo/watch"){
_50.push({prop:_53,func:nf});
}else{
_4f.push(nf);
}
}
}
}
}
var _57=_35.markupFactory||_3b.markupFactory;
var _58=_57?_57(_3c,_36,_35):new _35(_3c,_36);
if(_47){
_2.setObject(_47,_58);
}
for(i=0;i<_4e.length;i++){
_9[_4e[i].advice||"after"](_58,_4e[i].method,_2.hitch(_58,_4e[i].func),true);
}
for(i=0;i<_4f.length;i++){
_4f[i].call(_58);
}
for(i=0;i<_50.length;i++){
_58.watch(_50[i].prop,_50[i].func);
}
for(i=0;i<ons.length;i++){
_e(_58,ons[i].event,ons[i].func);
}
return _58;
},scan:function(_59,_5a){
var _5b=[],_5c=[],_5d={};
var _5e=(_5a.scope||_1._scopeName)+"Type",_5f="data-"+(_5a.scope||_1._scopeName)+"-",_60=_5f+"type",_61=_5f+"textdir",_62=_5f+"mixins";
var _63=_59.firstChild;
var _64=_5a.inherited;
if(!_64){
function _65(_66,_67){
return (_66.getAttribute&&_66.getAttribute(_67))||(_66.parentNode&&_65(_66.parentNode,_67));
};
_64={dir:_65(_59,"dir"),lang:_65(_59,"lang"),textDir:_65(_59,_61)};
for(var key in _64){
if(!_64[key]){
delete _64[key];
}
}
}
var _68={inherited:_64};
var _69;
var _6a;
function _6b(_6c){
if(!_6c.inherited){
_6c.inherited={};
var _6d=_6c.node,_6e=_6b(_6c.parent);
var _6f={dir:_6d.getAttribute("dir")||_6e.dir,lang:_6d.getAttribute("lang")||_6e.lang,textDir:_6d.getAttribute(_61)||_6e.textDir};
for(var key in _6f){
if(_6f[key]){
_6c.inherited[key]=_6f[key];
}
}
}
return _6c.inherited;
};
while(true){
if(!_63){
if(!_68||!_68.node){
break;
}
_63=_68.node.nextSibling;
_69=_68.scripts;
_6a=false;
_68=_68.parent;
continue;
}
if(_63.nodeType!=1){
_63=_63.nextSibling;
continue;
}
if(_69&&_63.nodeName.toLowerCase()=="script"){
_70=_63.getAttribute("type");
if(_70&&/^dojo\/\w/i.test(_70)){
_69.push(_63);
}
_63=_63.nextSibling;
continue;
}
if(_6a){
_63=_63.nextSibling;
continue;
}
var _70=_63.getAttribute(_60)||_63.getAttribute(_5e);
var _71=_63.firstChild;
if(!_70&&(!_71||(_71.nodeType==3&&!_71.nextSibling))){
_63=_63.nextSibling;
continue;
}
var _72;
var _73=null;
if(_70){
var _74=_63.getAttribute(_62),_75=_74?[_70].concat(_74.split(/\s*,\s*/)):[_70];
try{
_73=_16(_75);
}
catch(e){
}
if(!_73){
_3.forEach(_75,function(t){
if(~t.indexOf("/")&&!_5d[t]){
_5d[t]=true;
_5c[_5c.length]=t;
}
});
}
var _76=_73&&!_73.prototype._noScript?[]:null;
_72={types:_75,ctor:_73,parent:_68,node:_63,scripts:_76};
_72.inherited=_6b(_72);
_5b.push(_72);
}else{
_72={node:_63,scripts:_69,parent:_68};
}
_63=_71;
_69=_76;
_6a=_73&&_73.prototype.stopParser&&!(_5a.template);
_68=_72;
}
var d=new _b();
if(_5c.length){
if(_c("dojo-debug-messages")){
console.warn("WARNING: Modules being Auto-Required: "+_5c.join(", "));
}
require(_5c,function(){
d.resolve(_3.filter(_5b,function(_77){
if(!_77.ctor){
try{
_77.ctor=_16(_77.types);
}
catch(e){
}
}
var _78=_77.parent;
while(_78&&!_78.types){
_78=_78.parent;
}
var _79=_77.ctor&&_77.ctor.prototype;
_77.instantiateChildren=!(_79&&_79.stopParser&&!(_5a.template));
_77.instantiate=!_78||(_78.instantiate&&_78.instantiateChildren);
return _77.instantiate;
}));
});
}else{
d.resolve(_5b);
}
return d.promise;
},_require:function(_7a){
var _7b=_8.fromJson("{"+_7a.innerHTML+"}"),_7c=[],_7d=[],d=new _b();
for(var _7e in _7b){
_7c.push(_7e);
_7d.push(_7b[_7e]);
}
require(_7d,function(){
for(var i=0;i<_7c.length;i++){
_2.setObject(_7c[i],arguments[i]);
}
d.resolve(arguments);
});
return d.promise;
},_scanAmd:function(_7f){
var _80=new _b(),_81=_80.promise;
_80.resolve(true);
var _82=this;
_d("script[type='dojo/require']",_7f).forEach(function(_83){
_81=_81.then(function(){
return _82._require(_83);
});
_83.parentNode.removeChild(_83);
});
return _81;
},parse:function(_84,_85){
var _86;
if(!_85&&_84&&_84.rootNode){
_85=_84;
_86=_85.rootNode;
}else{
if(_84&&_2.isObject(_84)&&!("nodeType" in _84)){
_85=_84;
}else{
_86=_84;
}
}
_86=_86?_5.byId(_86):_6.body();
_85=_85||{};
var _87=_85.template?{template:true}:{},_88=[],_89=this;
var p=this._scanAmd(_86,_85).then(function(){
return _89.scan(_86,_85);
}).then(function(_8a){
return _88=_88.concat(_89._instantiate(_8a,_87,_85));
}).otherwise(function(e){
console.error("dojo/parser::parse() error",e);
throw e;
});
_2.mixin(_88,p);
return _88;
}};
if(1){
_1.parser=_1a;
}
if(_4.parseOnLoad){
_f(100,_1a,"parse");
}
return _1a;
});
