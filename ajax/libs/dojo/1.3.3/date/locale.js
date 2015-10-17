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
var s,_8;
var c=_6.charAt(0);
var l=_6.length;
var _b=["abbr","wide","narrow"];
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
if(!_4){
s=String(s);
s=s.substr(s.length-2);
break;
}
default:
_8=true;
}
break;
case "Q":
case "q":
s=Math.ceil((_2.getMonth()+1)/3);
_8=true;
break;
case "M":
var m=_2.getMonth();
if(l<3){
s=m+1;
_8=true;
}else{
var _d=["months","format",_b[l-3]].join("-");
s=_3[_d][m];
}
break;
case "w":
var _e=0;
s=dojo.date.locale._getWeekOfYear(_2,_e);
_8=true;
break;
case "d":
s=_2.getDate();
_8=true;
break;
case "D":
s=dojo.date.locale._getDayOfYear(_2);
_8=true;
break;
case "E":
var d=_2.getDay();
if(l<3){
s=d+1;
_8=true;
}else{
var _10=["days","format",_b[l-3]].join("-");
s=_3[_10][d];
}
break;
case "a":
var _11=(_2.getHours()<12)?"am":"pm";
s=_3[_11];
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
_8=true;
break;
case "m":
s=_2.getMinutes();
_8=true;
break;
case "s":
s=_2.getSeconds();
_8=true;
break;
case "S":
s=Math.round(_2.getMilliseconds()*Math.pow(10,l-3));
_8=true;
break;
case "v":
case "z":
s=dojo.date.getTimezoneName(_2);
if(s){
break;
}
l=4;
case "Z":
var _13=_2.getTimezoneOffset();
var tz=[(_13<=0?"+":"-"),dojo.string.pad(Math.floor(Math.abs(_13)/60),2),dojo.string.pad(Math.abs(_13)%60,2)];
if(l==4){
tz.splice(0,0,"GMT");
tz.splice(3,0,":");
}
s=tz.join("");
break;
default:
throw new Error("dojo.date.locale.format: invalid pattern char: "+_5);
}
if(_8){
s=dojo.string.pad(s,l);
}
return s;
});
};
dojo.date.locale.format=function(_15,_16){
_16=_16||{};
var _17=dojo.i18n.normalizeLocale(_16.locale);
var _18=_16.formatLength||"short";
var _19=dojo.date.locale._getGregorianBundle(_17);
var str=[];
var _1b=dojo.hitch(this,_1,_15,_19,_16.fullYear);
if(_16.selector=="year"){
var _1c=_15.getFullYear();
if(_17.match(/^zh|^ja/)){
_1c+="年";
}
return _1c;
}
if(_16.selector!="time"){
var _1d=_16.datePattern||_19["dateFormat-"+_18];
if(_1d){
str.push(_1e(_1d,_1b));
}
}
if(_16.selector!="date"){
var _1f=_16.timePattern||_19["timeFormat-"+_18];
if(_1f){
str.push(_1e(_1f,_1b));
}
}
var _20=str.join(" ");
return _20;
};
dojo.date.locale.regexp=function(_21){
return dojo.date.locale._parseInfo(_21).regexp;
};
dojo.date.locale._parseInfo=function(_22){
_22=_22||{};
var _23=dojo.i18n.normalizeLocale(_22.locale);
var _24=dojo.date.locale._getGregorianBundle(_23);
var _25=_22.formatLength||"short";
var _26=_22.datePattern||_24["dateFormat-"+_25];
var _27=_22.timePattern||_24["timeFormat-"+_25];
var _28;
if(_22.selector=="date"){
_28=_26;
}else{
if(_22.selector=="time"){
_28=_27;
}else{
_28=_26+" "+_27;
}
}
var _29=[];
var re=_1e(_28,dojo.hitch(this,_2b,_29,_24,_22));
return {regexp:re,tokens:_29,bundle:_24};
};
dojo.date.locale.parse=function(_2c,_2d){
var _2e=dojo.date.locale._parseInfo(_2d);
var _2f=_2e.tokens,_30=_2e.bundle;
var re=new RegExp("^"+_2e.regexp+"$",_2e.strict?"":"i");
var _32=re.exec(_2c);
if(!_32){
return null;
}
var _33=["abbr","wide","narrow"];
var _34=[1970,0,1,0,0,0,0];
var _35="";
var _36=dojo.every(_32,function(v,i){
if(!i){
return true;
}
var _39=_2f[i-1];
var l=_39.length;
switch(_39.charAt(0)){
case "y":
if(l!=2&&_2d.strict){
_34[0]=v;
}else{
if(v<100){
v=Number(v);
var _3b=""+new Date().getFullYear();
var _3c=_3b.substring(0,2)*100;
var _3d=Math.min(Number(_3b.substring(2,4))+20,99);
var num=(v<_3d)?_3c+v:_3c-100+v;
_34[0]=num;
}else{
if(_2d.strict){
return false;
}
_34[0]=v;
}
}
break;
case "M":
if(l>2){
var _3f=_30["months-format-"+_33[l-3]].concat();
if(!_2d.strict){
v=v.replace(".","").toLowerCase();
_3f=dojo.map(_3f,function(s){
return s.replace(".","").toLowerCase();
});
}
v=dojo.indexOf(_3f,v);
if(v==-1){
return false;
}
}else{
v--;
}
_34[1]=v;
break;
case "E":
case "e":
var _41=_30["days-format-"+_33[l-3]].concat();
if(!_2d.strict){
v=v.toLowerCase();
_41=dojo.map(_41,function(d){
return d.toLowerCase();
});
}
v=dojo.indexOf(_41,v);
if(v==-1){
return false;
}
break;
case "D":
_34[1]=0;
case "d":
_34[2]=v;
break;
case "a":
var am=_2d.am||_30.am;
var pm=_2d.pm||_30.pm;
if(!_2d.strict){
var _45=/\./g;
v=v.replace(_45,"").toLowerCase();
am=am.replace(_45,"").toLowerCase();
pm=pm.replace(_45,"").toLowerCase();
}
if(_2d.strict&&v!=am&&v!=pm){
return false;
}
_35=(v==pm)?"p":(v==am)?"a":"";
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
_34[3]=v;
break;
case "m":
_34[4]=v;
break;
case "s":
_34[5]=v;
break;
case "S":
_34[6]=v;
}
return true;
});
var _46=+_34[3];
if(_35==="p"&&_46<12){
_34[3]=_46+12;
}else{
if(_35==="a"&&_46==12){
_34[3]=0;
}
}
var _47=new Date(_34[0],_34[1],_34[2],_34[3],_34[4],_34[5],_34[6]);
if(_2d.strict){
_47.setFullYear(_34[0]);
}
var _48=_2f.join(""),_49=_48.indexOf("d")!=-1,_4a=_48.indexOf("M")!=-1;
if(!_36||(_4a&&_47.getMonth()>_34[1])||(_49&&_47.getDate()>_34[2])){
return null;
}
if((_4a&&_47.getMonth()<_34[1])||(_49&&_47.getDate()<_34[2])){
_47=dojo.date.add(_47,"hour",1);
}
return _47;
};
function _1e(_4b,_4c,_4d,_4e){
var _4f=function(x){
return x;
};
_4c=_4c||_4f;
_4d=_4d||_4f;
_4e=_4e||_4f;
var _51=_4b.match(/(''|[^'])+/g);
var _52=_4b.charAt(0)=="'";
dojo.forEach(_51,function(_53,i){
if(!_53){
_51[i]="";
}else{
_51[i]=(_52?_4d:_4c)(_53);
_52=!_52;
}
});
return _4e(_51.join(""));
};
function _2b(_55,_56,_57,_58){
_58=dojo.regexp.escapeString(_58);
if(!_57.strict){
_58=_58.replace(" a"," ?a");
}
return _58.replace(/([a-z])\1*/ig,function(_59){
var s;
var c=_59.charAt(0);
var l=_59.length;
var p2="",p3="";
if(_57.strict){
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
var am=_57.am||_56.am||"AM";
var pm=_57.pm||_56.pm||"PM";
if(_57.strict){
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
if(_55){
_55.push(_59);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _61=[];
dojo.date.locale.addCustomFormats=function(_62,_63){
_61.push({pkg:_62,name:_63});
};
dojo.date.locale._getGregorianBundle=function(_64){
var _65={};
dojo.forEach(_61,function(_66){
var _67=dojo.i18n.getLocalization(_66.pkg,_66.name,_64);
_65=dojo.mixin(_65,_67);
},this);
return _65;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(_68,_69,_6a,_6b){
var _6c;
var _6d=dojo.date.locale._getGregorianBundle(_6b);
var _6e=[_68,_6a,_69];
if(_6a=="standAlone"){
var key=_6e.join("-");
_6c=_6d[key];
if(_6c[0]==1){
_6c=undefined;
}
}
_6e[1]="format";
return (_6c||_6d[_6e.join("-")]).concat();
};
dojo.date.locale.isWeekend=function(_70,_71){
var _72=dojo.cldr.supplemental.getWeekend(_71);
var day=(_70||new Date()).getDay();
if(_72.end<_72.start){
_72.end+=7;
if(day<_72.start){
day+=7;
}
}
return day>=_72.start&&day<=_72.end;
};
dojo.date.locale._getDayOfYear=function(_74){
return dojo.date.difference(new Date(_74.getFullYear(),0,1,_74.getHours()),_74)+1;
};
dojo.date.locale._getWeekOfYear=function(_75,_76){
if(arguments.length==1){
_76=0;
}
var _77=new Date(_75.getFullYear(),0,1).getDay();
var adj=(_77-_76+7)%7;
var _79=Math.floor((dojo.date.locale._getDayOfYear(_75)+adj-1)/7);
if(_77==_76){
_79++;
}
return _79;
};
}
