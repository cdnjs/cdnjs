/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.date"]){
dojo._hasResource["dojo.date"]=true;
dojo.provide("dojo.date");
dojo.date.getDaysInMonth=function(_1){
var _2=_1.getMonth();
var _3=[31,28,31,30,31,30,31,31,30,31,30,31];
if(_2==1&&dojo.date.isLeapYear(_1)){
return 29;
}
return _3[_2];
};
dojo.date.isLeapYear=function(_4){
var _5=_4.getFullYear();
return !(_5%400)||(!(_5%4)&&!!(_5%100));
};
dojo.date.getTimezoneName=function(_6){
var _7=_6.toString();
var tz="";
var _9;
var _a=_7.indexOf("(");
if(_a>-1){
tz=_7.substring(++_a,_7.indexOf(")"));
}else{
var _b=/([A-Z\/]+) \d{4}$/;
if((_9=_7.match(_b))){
tz=_9[1];
}else{
_7=_6.toLocaleString();
_b=/ ([A-Z\/]+)$/;
if((_9=_7.match(_b))){
tz=_9[1];
}
}
}
return (tz=="AM"||tz=="PM")?"":tz;
};
dojo.date.compare=function(_c,_d,_e){
_c=new Date(Number(_c));
_d=new Date(Number(_d||new Date()));
if(_e!=="undefined"){
if(_e=="date"){
_c.setHours(0,0,0,0);
_d.setHours(0,0,0,0);
}else{
if(_e=="time"){
_c.setFullYear(0,0,0);
_d.setFullYear(0,0,0);
}
}
}
if(_c>_d){
return 1;
}
if(_c<_d){
return -1;
}
return 0;
};
dojo.date.add=function(_f,_10,_11){
var sum=new Date(Number(_f));
var _13=false;
var _14="Date";
switch(_10){
case "day":
break;
case "weekday":
var _15,_16;
var mod=_11%5;
if(!mod){
_15=(_11>0)?5:-5;
_16=(_11>0)?((_11-5)/5):((_11+5)/5);
}else{
_15=mod;
_16=parseInt(_11/5);
}
var _18=_f.getDay();
var adj=0;
if(_18==6&&_11>0){
adj=1;
}else{
if(_18==0&&_11<0){
adj=-1;
}
}
var _1a=_18+_15;
if(_1a==0||_1a==6){
adj=(_11>0)?2:-2;
}
_11=(7*_16)+_15+adj;
break;
case "year":
_14="FullYear";
_13=true;
break;
case "week":
_11*=7;
break;
case "quarter":
_11*=3;
case "month":
_13=true;
_14="Month";
break;
case "hour":
case "minute":
case "second":
case "millisecond":
_14="UTC"+_10.charAt(0).toUpperCase()+_10.substring(1)+"s";
}
if(_14){
sum["set"+_14](sum["get"+_14]()+_11);
}
if(_13&&(sum.getDate()<_f.getDate())){
sum.setDate(0);
}
return sum;
};
dojo.date.difference=function(_1b,_1c,_1d){
_1c=_1c||new Date();
_1d=_1d||"day";
var _1e=_1c.getFullYear()-_1b.getFullYear();
var _1f=1;
switch(_1d){
case "quarter":
var m1=_1b.getMonth();
var m2=_1c.getMonth();
var q1=Math.floor(m1/3)+1;
var q2=Math.floor(m2/3)+1;
q2+=(_1e*4);
_1f=q2-q1;
break;
case "weekday":
var _24=Math.round(dojo.date.difference(_1b,_1c,"day"));
var _25=parseInt(dojo.date.difference(_1b,_1c,"week"));
var mod=_24%7;
if(mod==0){
_24=_25*5;
}else{
var adj=0;
var _28=_1b.getDay();
var _29=_1c.getDay();
_25=parseInt(_24/7);
mod=_24%7;
var _2a=new Date(_1b);
_2a.setDate(_2a.getDate()+(_25*7));
var _2b=_2a.getDay();
if(_24>0){
switch(true){
case _28==6:
adj=-1;
break;
case _28==0:
adj=0;
break;
case _29==6:
adj=-1;
break;
case _29==0:
adj=-2;
break;
case (_2b+mod)>5:
adj=-2;
}
}else{
if(_24<0){
switch(true){
case _28==6:
adj=0;
break;
case _28==0:
adj=1;
break;
case _29==6:
adj=2;
break;
case _29==0:
adj=1;
break;
case (_2b+mod)<0:
adj=2;
}
}
}
_24+=adj;
_24-=(_25*2);
}
_1f=_24;
break;
case "year":
_1f=_1e;
break;
case "month":
_1f=(_1c.getMonth()-_1b.getMonth())+(_1e*12);
break;
case "week":
_1f=parseInt(dojo.date.difference(_1b,_1c,"day")/7);
break;
case "day":
_1f/=24;
case "hour":
_1f/=60;
case "minute":
_1f/=60;
case "second":
_1f/=1000;
case "millisecond":
_1f*=_1c.getTime()-_1b.getTime();
}
return Math.round(_1f);
};
}
