/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date.locale"]){
dojo._hasResource["dojo.date.locale"]=true;
dojo.provide("dojo.date.locale");
dojo.require("dojo.date");
dojo.require("dojo.cldr.supplemental");
dojo.require("dojo.regexp");
dojo.require("dojo.string");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","gregorian",null,"ROOT,ar,ca,cs,da,de,el,en,en-au,en-ca,en-gb,es,es-es,fi,fr,he,hu,it,it-it,ja,ko,ko-kr,nb,nl,pl,pt,pt-br,pt-pt,ru,sk,sl,sv,th,tr,zh,zh-cn,zh-tw");
(function(){
function _1(_2,_3,_4,_5){
return _5.replace(/([a-z])\1*/ig,function(_6){
var s,_7,c=_6.charAt(0),l=_6.length,_8=["abbr","wide","narrow"];
switch(c){
case "G":
s=_3[(l<4)?"eraAbbr":"eraNames"][_2.getFullYear()<0?0:1];
break;
case "y":
s=_2.getFullYear();
switch(l){
case 1:
break;
case 2:
if(!_4.fullYear){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
_7=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_2.getMonth()+1)/3);
_7=true;
break;
case "M":
var m=_2.getMonth();
if(l<3){
s=m+1;
_7=true;
}else{
var _9=["months","format",_8[l-3]].join("-");
s=_3[_9][m];
}
break;
case "w":
var _a=0;
s=dojo.date.locale._getWeekOfYear(_2,_a);
_7=true;
break;
case "d":
s=_2.getDate();
_7=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_2);
_7=true;
break;
case "E":
var d=_2.getDay();
if(l<3){
s=d+1;
_7=true;
}else{
var _b=["days","format",_8[l-3]].join("-");
s=_3[_b][d];
}
break;
case "a":
var _c=(_2.getHours()<12)?"am":"pm";
s=_3[_c];
break;
case "h":
case "H":
case "K":
case "k":
var h=_2.getHours();
switch(c){
case "h":
s=(h%12)||12;
break;
case "H":
s=h;
break;
case "K":
s=(h%12);
break;
case "k":
s=h||24;
break;
}
_7=true;
break;
case "m":
s=_2.getMinutes();
_7=true;
break;
case "s":
s=_2.getSeconds();
_7=true;
break;
case "S":
s=Math.round(_2.getMilliseconds()*Math.pow(10,l-3));
_7=true;
break;
case "v":
case "z":
s=dojo.date.locale._getZone(_2,true,_4);
if(s){
break;
}
l=4;
case "Z":
var _d=dojo.date.locale._getZone(_2,false,_4);
var tz=[(_d<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_d)/60),2),dojo.string.pad(Math.abs(_d)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_5);
}
if(_7){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale._getZone=function(_e,_f,_10){
if(_f){
return dojo.date.getTimezoneName(_e);
}else{
return _e.getTimezoneOffset();
}
};
dojo.date.locale.format=function(_11,_12){
_12=_12||{};
var _13=dojo.i18n.normalizeLocale(_12.locale),_14=_12.formatLength||"short",_15=dojo.date.locale._getGregorianBundle(_13),str=[],_16=dojo.hitch(this,_1,_11,_15,_12);
if(_12.selector=="year"){
return _17(_15["dateFormatItem-yyyy"]||"yyyy",_16);
}
var _18;
if(_12.selector!="date"){
_18=_12.timePattern||_15["timeFormat-"+_14];
if(_18){
str.push(_17(_18,_16));
}
}
if(_12.selector!="time"){
_18=_12.datePattern||_15["dateFormat-"+_14];
if(_18){
str.push(_17(_18,_16));
}
}
return str.length==1?str[0]:_15["dateTimeFormat-"+_14].replace(/\{(\d+)\}/g,function(_19,key){
return str[key];
});
};
dojo.date.locale.regexp=function(_1a){
return dojo.date.locale._parseInfo(_1a).regexp;
};
dojo.date.locale._parseInfo=function(_1b){
_1b=_1b||{};
var _1c=dojo.i18n.normalizeLocale(_1b.locale),_1d=dojo.date.locale._getGregorianBundle(_1c),_1e=_1b.formatLength||"short",_1f=_1b.datePattern||_1d["dateFormat-"+_1e],_20=_1b.timePattern||_1d["timeFormat-"+_1e],_21;
if(_1b.selector=="date"){
_21=_1f;
}else{
if(_1b.selector=="time"){
_21=_20;
}else{
_21=_1d["dateTimeFormat-"+_1e].replace(/\{(\d+)\}/g,function(_22,key){
return [_20,_1f][key];
});
}
}
var _23=[],re=_17(_21,dojo.hitch(this,_24,_23,_1d,_1b));
return {regexp:re,tokens:_23,bundle:_1d};
};
dojo.date.locale.parse=function(_25,_26){
var _27=dojo.date.locale._parseInfo(_26),_28=_27.tokens,_29=_27.bundle,re=new RegExp("^"+_27.regexp+"$",_27.strict?"":"i"),_2a=re.exec(_25);
if(!_2a){
return null;
}
var _2b=["abbr","wide","narrow"],_2c=[1970,0,1,0,0,0,0],_2d="",_2e=dojo.every(_2a,function(v,i){
if(!i){
return true;
}
var _2f=_28[i-1];
var l=_2f.length;
switch(_2f.charAt(0)){
case "y":
if(l!=2&&_26.strict){
_2c[0]=v;
}else{
if(v<100){
v=Number(v);
var _30=""+new Date().getFullYear(),_31=_30.substring(0,2)*100,_32=Math.min(Number(_30.substring(2,4))+20,99),num=(v<_32)?_31+v:_31-100+v;
_2c[0]=num;
}else{
if(_26.strict){
return false;
}
_2c[0]=v;
}
}
break;
case "M":
if(l>2){
var _33=_29["months-format-"+_2b[l-3]].concat();
if(!_26.strict){
v=v.replace(".","").toLowerCase();
_33=dojo.map(_33,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_33,v);
if(v==-1){
return false;
}
}else{
v--;
}
_2c[1]=v;
break;
case "E":
case "e":
var _34=_29["days-format-"+_2b[l-3]].concat();
if(!_26.strict){
v=v.toLowerCase();
_34=dojo.map(_34,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(_34,v);
if(v==-1){
return false;
}
break;
case "D":
_2c[1]=0;
case "d":
_2c[2]=v;
break;
case "a":
var am=_26.am||_29.am;
var pm=_26.pm||_29.pm;
if(!_26.strict){
var _35=/\./g;
v=v.replace(_35,"").toLowerCase();
am=am.replace(_35,"").toLowerCase();
pm=pm.replace(_35,"").toLowerCase();
}
if(_26.strict&&v!=am&&v!=pm){
return false;
}
_2d=(v==pm)?"p":(v==am)?"a":"";
break;
case "K":
if(v==24){
v=0;
}
case "h":
case "H":
case "k":
if(v>23){
return false;
}
_2c[3]=v;
break;
case "m":
_2c[4]=v;
break;
case "s":
_2c[5]=v;
break;
case "S":
_2c[6]=v;
}
return true;
});
var _36=+_2c[3];
if(_2d==="p"&&_36<12){
_2c[3]=_36+12;
}else{
if(_2d==="a"&&_36==12){
_2c[3]=0;
}
}
var _37=new Date(_2c[0],_2c[1],_2c[2],_2c[3],_2c[4],_2c[5],_2c[6]);
if(_26.strict){
_37.setFullYear(_2c[0]);
}
var _38=_28.join(""),_39=_38.indexOf("d")!=-1,_3a=_38.indexOf("M")!=-1;
if(!_2e||(_3a&&_37.getMonth()>_2c[1])||(_39&&_37.getDate()>_2c[2])){
return null;
}
if((_3a&&_37.getMonth()<_2c[1])||(_39&&_37.getDate()<_2c[2])){
_37=dojo.date.add(_37,"hour",1);
}
return _37;
};
function _17(_3b,_3c,_3d,_3e){
var _3f=function(x){
return x;
};
_3c=_3c||_3f;
_3d=_3d||_3f;
_3e=_3e||_3f;
var _40=_3b.match(/(''|[^'])+/g),_41=_3b.charAt(0)=="'";
dojo.forEach(_40,function(_42,i){
if(!_42){
_40[i]="";
}else{
_40[i]=(_41?_3d:_3c)(_42);
_41=!_41;
}
});
return _3e(_40.join(""));
};
function _24(_43,_44,_45,_46){
_46=dojo.regexp.escapeString(_46);
if(!_45.strict){
_46=_46.replace(" a"," ?a");
}
return _46.replace(/([a-z])\1*/ig,function(_47){
var s,c=_47.charAt(0),l=_47.length,p2="",p3="";
if(_45.strict){
if(l>1){
p2="0"+"{"+(l-1)+"}";
}
if(l>2){
p3="0"+"{"+(l-2)+"}";
}
}else{
p2="0?";
p3="0{0,2}";
}
switch(c){
case "y":
s="\\d{2,4}";
break;
case "M":
s=(l>2)?"\\S+?":p2+"[1-9]|1[0-2]";
break;
case "D":
s=p2+"[1-9]|"+p3+"[1-9][0-9]|[12][0-9][0-9]|3[0-5][0-9]|36[0-6]";
break;
case "d":
s="[12]\\d|"+p2+"[1-9]|3[01]";
break;
case "w":
s=p2+"[1-9]|[1-4][0-9]|5[0-3]";
break;
case "E":
s="\\S+";
break;
case "h":
s=p2+"[1-9]|1[0-2]";
break;
case "k":
s=p2+"\\d|1[01]";
break;
case "H":
s=p2+"\\d|1\\d|2[0-3]";
break;
case "K":
s=p2+"[1-9]|1\\d|2[0-4]";
break;
case "m":
case "s":
s="[0-5]\\d";
break;
case "S":
s="\\d{"+l+"}";
break;
case "a":
var am=_45.am||_44.am||"AM";
var pm=_45.pm||_44.pm||"PM";
if(_45.strict){
s=am+"|"+pm;
}else{
s=am+"|"+pm;
if(am!=am.toLowerCase()){
s+="|"+am.toLowerCase();
}
if(pm!=pm.toLowerCase()){
s+="|"+pm.toLowerCase();
}
if(s.indexOf(".")!=-1){
s+="|"+s.replace(/\./g,"");
}
}
s=s.replace(/\./g,"\\.");
break;
default:
s=".*";
}
if(_43){
_43.push(_47);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _48=[];
dojo.date.locale.addCustomFormats=function(_49,_4a){
_48.push({pkg:_49,name:_4a});
};
dojo.date.locale._getGregorianBundle=function(_4b){
var _4c={};
dojo.forEach(_48,function(_4d){
var _4e=dojo.i18n.getLocalization(_4d.pkg,_4d.name,_4b);
_4c=dojo.mixin(_4c,_4e);
},this);
return _4c;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(_4f,_50,_51,_52){
var _53,_54=dojo.date.locale._getGregorianBundle(_52),_55=[_4f,_51,_50];
if(_51=="standAlone"){
var key=_55.join("-");
_53=_54[key];
if(_53[0]==1){
_53=undefined;
}
}
_55[1]="format";
return (_53||_54[_55.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_56,_57){
var _58=dojo.cldr.supplemental.getWeekend(_57),day=(_56||new Date()).getDay();
if(_58.end<_58.start){
_58.end+=7;
if(day<_58.start){
day+=7;
}
}
return day>=_58.start&&day<=_58.end;
};
dojo.date.locale._getDayOfYear=function(_59){
return dojo.date.difference(new Date(_59.getFullYear(),0,1,_59.getHours()),_59)+1;
};
dojo.date.locale._getWeekOfYear=function(_5a,_5b){
if(arguments.length==1){
_5b=0;
}
var _5c=new Date(_5a.getFullYear(),0,1).getDay(),adj=(_5c-_5b+7)%7,_5d=Math.floor((dojo.date.locale._getDayOfYear(_5a)+adj-1)/7);
if(_5c==_5b){
_5d++;
}
return _5d;
};
}
