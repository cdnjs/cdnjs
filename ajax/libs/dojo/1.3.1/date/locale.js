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
var _48=_2f.join("");
if(!_36||(_48.indexOf("M")!=-1&&_47.getMonth()!=_34[1])||(_48.indexOf("d")!=-1&&_47.getDate()!=_34[2])){
return null;
}
return _47;
};
function _1e(_49,_4a,_4b,_4c){
var _4d=function(x){
return x;
};
_4a=_4a||_4d;
_4b=_4b||_4d;
_4c=_4c||_4d;
var _4f=_49.match(/(''|[^'])+/g);
var _50=_49.charAt(0)=="'";
dojo.forEach(_4f,function(_51,i){
if(!_51){
_4f[i]="";
}else{
_4f[i]=(_50?_4b:_4a)(_51);
_50=!_50;
}
});
return _4c(_4f.join(""));
};
function _2b(_53,_54,_55,_56){
_56=dojo.regexp.escapeString(_56);
if(!_55.strict){
_56=_56.replace(" a"," ?a");
}
return _56.replace(/([a-z])\1*/ig,function(_57){
var s;
var c=_57.charAt(0);
var l=_57.length;
var p2="",p3="";
if(_55.strict){
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
var am=_55.am||_54.am||"AM";
var pm=_55.pm||_54.pm||"PM";
if(_55.strict){
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
if(_53){
_53.push(_57);
}
return "("+s+")";
}).replace(/[\xa0 ]/g,"[\\s\\xa0]");
};
})();
(function(){
var _5f=[];
dojo.date.locale.addCustomFormats=function(_60,_61){
_5f.push({pkg:_60,name:_61});
};
dojo.date.locale._getGregorianBundle=function(_62){
var _63={};
dojo.forEach(_5f,function(_64){
var _65=dojo.i18n.getLocalization(_64.pkg,_64.name,_62);
_63=dojo.mixin(_63,_65);
},this);
return _63;
};
})();
dojo.date.locale.addCustomFormats("dojo.cldr","gregorian");
dojo.date.locale.getNames=function(_66,_67,_68,_69){
var _6a;
var _6b=dojo.date.locale._getGregorianBundle(_69);
var _6c=[_66,_68,_67];
if(_68=="standAlone"){
var key=_6c.join("-");
_6a=_6b[key];
if(_6a[0]==1){
_6a=undefined;
}
}
_6c[1]="format";
return (_6a||_6b[_6c.join("-")]).concat();
};
dojo.date.locale.displayPattern=function(_6e,_6f){
var _70="GyMdkHmsSEDFwWahKzYeugAZvcL",_71=dojo.date.locale._getGregorianBundle(_6f).patternChars;
return dojo.map(_6e,function(c){
var i=_70.indexOf(c);
return i<0?c:_71.charAt(i);
}).join("");
};
dojo.date.locale.isWeekend=function(_74,_75){
var _76=dojo.cldr.supplemental.getWeekend(_75);
var day=(_74||new Date()).getDay();
if(_76.end<_76.start){
_76.end+=7;
if(day<_76.start){
day+=7;
}
}
return day>=_76.start&&day<=_76.end;
};
dojo.date.locale._getDayOfYear=function(_78){
return dojo.date.difference(new Date(_78.getFullYear(),0,1,_78.getHours()),_78)+1;
};
dojo.date.locale._getWeekOfYear=function(_79,_7a){
if(arguments.length==1){
_7a=0;
}
var _7b=new Date(_79.getFullYear(),0,1).getDay();
var adj=(_7b-_7a+7)%7;
var _7d=Math.floor((dojo.date.locale._getDayOfYear(_79)+adj-1)/7);
if(_7b==_7a){
_7d++;
}
return _7d;
};
}
