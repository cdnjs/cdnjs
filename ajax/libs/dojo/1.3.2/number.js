/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo.number"]){
dojo._hasResource["dojo.number"]=true;
dojo.provide("dojo.number");
dojo.require("dojo.i18n");
dojo.requireLocalization("dojo.cldr","number",null,"ROOT,ar,ca,cs,da,de,de-de,el,en,en-au,en-gb,en-us,es,es-es,fi,fr,he,hu,it,ja,ja-jp,ko,ko-kr,nb,nl,pl,pt,pt-pt,ru,sk,sl,sv,th,tr,zh,zh-cn,zh-tw");
dojo.require("dojo.string");
dojo.require("dojo.regexp");
dojo.number.format=function(_1,_2){
_2=dojo.mixin({},_2||{});
var _3=dojo.i18n.normalizeLocale(_2.locale);
var _4=dojo.i18n.getLocalization("dojo.cldr","number",_3);
_2.customs=_4;
var _5=_2.pattern||_4[(_2.type||"decimal")+"Format"];
if(isNaN(_1)||Math.abs(_1)==Infinity){
return null;
}
return dojo.number._applyPattern(_1,_5,_2);
};
dojo.number._numberPatternRE=/[#0,]*[#0](?:\.0*#*)?/;
dojo.number._applyPattern=function(_6,_7,_8){
_8=_8||{};
var _9=_8.customs.group;
var _a=_8.customs.decimal;
var _b=_7.split(";");
var _c=_b[0];
_7=_b[(_6<0)?1:0]||("-"+_c);
if(_7.indexOf("%")!=-1){
_6*=100;
}else{
if(_7.indexOf("‰")!=-1){
_6*=1000;
}else{
if(_7.indexOf("¤")!=-1){
_9=_8.customs.currencyGroup||_9;
_a=_8.customs.currencyDecimal||_a;
_7=_7.replace(/\u00a4{1,3}/,function(_d){
var _e=["symbol","currency","displayName"][_d.length-1];
return _8[_e]||_8.currency||"";
});
}else{
if(_7.indexOf("E")!=-1){
throw new Error("exponential notation not supported");
}
}
}
}
var _f=dojo.number._numberPatternRE;
var _10=_c.match(_f);
if(!_10){
throw new Error("unable to find a number expression in pattern: "+_7);
}
if(_8.fractional===false){
_8.places=0;
}
return _7.replace(_f,dojo.number._formatAbsolute(_6,_10[0],{decimal:_a,group:_9,places:_8.places,round:_8.round}));
};
dojo.number.round=function(_11,_12,_13){
var _14=10/(_13||10);
return (_14*+_11).toFixed(_12)/_14;
};
if((0.9).toFixed()==0){
(function(){
var _15=dojo.number.round;
dojo.number.round=function(v,p,m){
var d=Math.pow(10,-p||0),a=Math.abs(v);
if(!v||a>=d||a*Math.pow(10,p+1)<5){
d=0;
}
return _15(v,p,m)+(v>0?d:-d);
};
})();
}
dojo.number._formatAbsolute=function(_1b,_1c,_1d){
_1d=_1d||{};
if(_1d.places===true){
_1d.places=0;
}
if(_1d.places===Infinity){
_1d.places=6;
}
var _1e=_1c.split(".");
var _1f=(_1d.places>=0)?_1d.places:(_1e[1]&&_1e[1].length)||0;
if(!(_1d.round<0)){
_1b=dojo.number.round(_1b,_1f,_1d.round);
}
var _20=String(Math.abs(_1b)).split(".");
var _21=_20[1]||"";
if(_1d.places){
var _22=dojo.isString(_1d.places)&&_1d.places.indexOf(",");
if(_22){
_1d.places=_1d.places.substring(_22+1);
}
_20[1]=dojo.string.pad(_21.substr(0,_1d.places),_1d.places,"0",true);
}else{
if(_1e[1]&&_1d.places!==0){
var pad=_1e[1].lastIndexOf("0")+1;
if(pad>_21.length){
_20[1]=dojo.string.pad(_21,pad,"0",true);
}
var _24=_1e[1].length;
if(_24<_21.length){
_20[1]=_21.substr(0,_24);
}
}else{
if(_20[1]){
_20.pop();
}
}
}
var _25=_1e[0].replace(",","");
pad=_25.indexOf("0");
if(pad!=-1){
pad=_25.length-pad;
if(pad>_20[0].length){
_20[0]=dojo.string.pad(_20[0],pad);
}
if(_25.indexOf("#")==-1){
_20[0]=_20[0].substr(_20[0].length-pad);
}
}
var _26=_1e[0].lastIndexOf(",");
var _27,_28;
if(_26!=-1){
_27=_1e[0].length-_26-1;
var _29=_1e[0].substr(0,_26);
_26=_29.lastIndexOf(",");
if(_26!=-1){
_28=_29.length-_26-1;
}
}
var _2a=[];
for(var _2b=_20[0];_2b;){
var off=_2b.length-_27;
_2a.push((off>0)?_2b.substr(off):_2b);
_2b=(off>0)?_2b.slice(0,off):"";
if(_28){
_27=_28;
delete _28;
}
}
_20[0]=_2a.reverse().join(_1d.group||",");
return _20.join(_1d.decimal||".");
};
dojo.number.regexp=function(_2d){
return dojo.number._parseInfo(_2d).regexp;
};
dojo.number._parseInfo=function(_2e){
_2e=_2e||{};
var _2f=dojo.i18n.normalizeLocale(_2e.locale);
var _30=dojo.i18n.getLocalization("dojo.cldr","number",_2f);
var _31=_2e.pattern||_30[(_2e.type||"decimal")+"Format"];
var _32=_30.group;
var _33=_30.decimal;
var _34=1;
if(_31.indexOf("%")!=-1){
_34/=100;
}else{
if(_31.indexOf("‰")!=-1){
_34/=1000;
}else{
var _35=_31.indexOf("¤")!=-1;
if(_35){
_32=_30.currencyGroup||_32;
_33=_30.currencyDecimal||_33;
}
}
}
var _36=_31.split(";");
if(_36.length==1){
_36.push("-"+_36[0]);
}
var re=dojo.regexp.buildGroupRE(_36,function(_38){
_38="(?:"+dojo.regexp.escapeString(_38,".")+")";
return _38.replace(dojo.number._numberPatternRE,function(_39){
var _3a={signed:false,separator:_2e.strict?_32:[_32,""],fractional:_2e.fractional,decimal:_33,exponent:false};
var _3b=_39.split(".");
var _3c=_2e.places;
if(_3b.length==1||_3c===0){
_3a.fractional=false;
}else{
if(_3c===undefined){
_3c=_2e.pattern?_3b[1].lastIndexOf("0")+1:Infinity;
}
if(_3c&&_2e.fractional==undefined){
_3a.fractional=true;
}
if(!_2e.places&&(_3c<_3b[1].length)){
_3c+=","+_3b[1].length;
}
_3a.places=_3c;
}
var _3d=_3b[0].split(",");
if(_3d.length>1){
_3a.groupSize=_3d.pop().length;
if(_3d.length>1){
_3a.groupSize2=_3d.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_3a)+")";
});
},true);
if(_35){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_3e,_3f,_40,_41){
var _42=["symbol","currency","displayName"][_40.length-1];
var _43=dojo.regexp.escapeString(_2e[_42]||_2e.currency||"");
_3f=_3f?"[\\s\\xa0]":"";
_41=_41?"[\\s\\xa0]":"";
if(!_2e.strict){
if(_3f){
_3f+="*";
}
if(_41){
_41+="*";
}
return "(?:"+_3f+_43+_41+")?";
}
return _3f+_43+_41;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_32,decimal:_33,factor:_34};
};
dojo.number.parse=function(_44,_45){
var _46=dojo.number._parseInfo(_45);
var _47=(new RegExp("^"+_46.regexp+"$")).exec(_44);
if(!_47){
return NaN;
}
var _48=_47[1];
if(!_47[1]){
if(!_47[2]){
return NaN;
}
_48=_47[2];
_46.factor*=-1;
}
_48=_48.replace(new RegExp("["+_46.group+"\\s\\xa0"+"]","g"),"").replace(_46.decimal,".");
return _48*_46.factor;
};
dojo.number._realNumberRegexp=function(_49){
_49=_49||{};
if(!("places" in _49)){
_49.places=Infinity;
}
if(typeof _49.decimal!="string"){
_49.decimal=".";
}
if(!("fractional" in _49)||/^0/.test(_49.places)){
_49.fractional=[true,false];
}
if(!("exponent" in _49)){
_49.exponent=[true,false];
}
if(!("eSigned" in _49)){
_49.eSigned=[true,false];
}
var _4a=dojo.number._integerRegexp(_49);
var _4b=dojo.regexp.buildGroupRE(_49.fractional,function(q){
var re="";
if(q&&(_49.places!==0)){
re="\\"+_49.decimal;
if(_49.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_49.places+"}";
}
}
return re;
},true);
var _4e=dojo.regexp.buildGroupRE(_49.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_49.eSigned})+")";
}
return "";
});
var _50=_4a+_4b;
if(_4b){
_50="(?:(?:"+_50+")|(?:"+_4b+"))";
}
return _50+_4e;
};
dojo.number._integerRegexp=function(_51){
_51=_51||{};
if(!("signed" in _51)){
_51.signed=[true,false];
}
if(!("separator" in _51)){
_51.separator="";
}else{
if(!("groupSize" in _51)){
_51.groupSize=3;
}
}
var _52=dojo.regexp.buildGroupRE(_51.signed,function(q){
return q?"[-+]":"";
},true);
var _54=dojo.regexp.buildGroupRE(_51.separator,function(sep){
if(!sep){
return "(?:\\d+)";
}
sep=dojo.regexp.escapeString(sep);
if(sep==" "){
sep="\\s";
}else{
if(sep==" "){
sep="\\s\\xa0";
}
}
var grp=_51.groupSize,_57=_51.groupSize2;
if(_57){
var _58="(?:0|[1-9]\\d{0,"+(_57-1)+"}(?:["+sep+"]\\d{"+_57+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_57)>0)?"(?:"+_58+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_58;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _52+_54;
};
}
