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
dojo.number._formatAbsolute=function(_16,_17,_18){
_18=_18||{};
if(_18.places===true){
_18.places=0;
}
if(_18.places===Infinity){
_18.places=6;
}
var _19=_17.split(".");
var _1a=(_18.places>=0)?_18.places:(_19[1]&&_19[1].length)||0;
if(!(_18.round<0)){
_16=dojo.number.round(_16,_1a,_18.round);
}
var _1b=String(Math.abs(_16)).split(".");
var _1c=_1b[1]||"";
if(_18.places){
var _1d=dojo.isString(_18.places)&&_18.places.indexOf(",");
if(_1d){
_18.places=_18.places.substring(_1d+1);
}
_1b[1]=dojo.string.pad(_1c.substr(0,_18.places),_18.places,"0",true);
}else{
if(_19[1]&&_18.places!==0){
var pad=_19[1].lastIndexOf("0")+1;
if(pad>_1c.length){
_1b[1]=dojo.string.pad(_1c,pad,"0",true);
}
var _1e=_19[1].length;
if(_1e<_1c.length){
_1b[1]=_1c.substr(0,_1e);
}
}else{
if(_1b[1]){
_1b.pop();
}
}
}
var _1f=_19[0].replace(",","");
pad=_1f.indexOf("0");
if(pad!=-1){
pad=_1f.length-pad;
if(pad>_1b[0].length){
_1b[0]=dojo.string.pad(_1b[0],pad);
}
if(_1f.indexOf("#")==-1){
_1b[0]=_1b[0].substr(_1b[0].length-pad);
}
}
var _20=_19[0].lastIndexOf(",");
var _21,_22;
if(_20!=-1){
_21=_19[0].length-_20-1;
var _23=_19[0].substr(0,_20);
_20=_23.lastIndexOf(",");
if(_20!=-1){
_22=_23.length-_20-1;
}
}
var _24=[];
for(var _25=_1b[0];_25;){
var off=_25.length-_21;
_24.push((off>0)?_25.substr(off):_25);
_25=(off>0)?_25.slice(0,off):"";
if(_22){
_21=_22;
delete _22;
}
}
_1b[0]=_24.reverse().join(_18.group||",");
return _1b.join(_18.decimal||".");
};
dojo.number.regexp=function(_26){
return dojo.number._parseInfo(_26).regexp;
};
dojo.number._parseInfo=function(_27){
_27=_27||{};
var _28=dojo.i18n.normalizeLocale(_27.locale);
var _29=dojo.i18n.getLocalization("dojo.cldr","number",_28);
var _2a=_27.pattern||_29[(_27.type||"decimal")+"Format"];
var _2b=_29.group;
var _2c=_29.decimal;
var _2d=1;
if(_2a.indexOf("%")!=-1){
_2d/=100;
}else{
if(_2a.indexOf("‰")!=-1){
_2d/=1000;
}else{
var _2e=_2a.indexOf("¤")!=-1;
if(_2e){
_2b=_29.currencyGroup||_2b;
_2c=_29.currencyDecimal||_2c;
}
}
}
var _2f=_2a.split(";");
if(_2f.length==1){
_2f.push("-"+_2f[0]);
}
var re=dojo.regexp.buildGroupRE(_2f,function(_30){
_30="(?:"+dojo.regexp.escapeString(_30,".")+")";
return _30.replace(dojo.number._numberPatternRE,function(_31){
var _32={signed:false,separator:_27.strict?_2b:[_2b,""],fractional:_27.fractional,decimal:_2c,exponent:false};
var _33=_31.split(".");
var _34=_27.places;
if(_33.length==1||_34===0){
_32.fractional=false;
}else{
if(_34===undefined){
_34=_27.pattern?_33[1].lastIndexOf("0")+1:Infinity;
}
if(_34&&_27.fractional==undefined){
_32.fractional=true;
}
if(!_27.places&&(_34<_33[1].length)){
_34+=","+_33[1].length;
}
_32.places=_34;
}
var _35=_33[0].split(",");
if(_35.length>1){
_32.groupSize=_35.pop().length;
if(_35.length>1){
_32.groupSize2=_35.pop().length;
}
}
return "("+dojo.number._realNumberRegexp(_32)+")";
});
},true);
if(_2e){
re=re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g,function(_36,_37,_38,_39){
var _3a=["symbol","currency","displayName"][_38.length-1];
var _3b=dojo.regexp.escapeString(_27[_3a]||_27.currency||"");
_37=_37?"[\\s\\xa0]":"";
_39=_39?"[\\s\\xa0]":"";
if(!_27.strict){
if(_37){
_37+="*";
}
if(_39){
_39+="*";
}
return "(?:"+_37+_3b+_39+")?";
}
return _37+_3b+_39;
});
}
return {regexp:re.replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:_2b,decimal:_2c,factor:_2d};
};
dojo.number.parse=function(_3c,_3d){
var _3e=dojo.number._parseInfo(_3d);
var _3f=(new RegExp("^"+_3e.regexp+"$")).exec(_3c);
if(!_3f){
return NaN;
}
var _40=_3f[1];
if(!_3f[1]){
if(!_3f[2]){
return NaN;
}
_40=_3f[2];
_3e.factor*=-1;
}
_40=_40.replace(new RegExp("["+_3e.group+"\\s\\xa0"+"]","g"),"").replace(_3e.decimal,".");
return _40*_3e.factor;
};
dojo.number._realNumberRegexp=function(_41){
_41=_41||{};
if(!("places" in _41)){
_41.places=Infinity;
}
if(typeof _41.decimal!="string"){
_41.decimal=".";
}
if(!("fractional" in _41)||/^0/.test(_41.places)){
_41.fractional=[true,false];
}
if(!("exponent" in _41)){
_41.exponent=[true,false];
}
if(!("eSigned" in _41)){
_41.eSigned=[true,false];
}
var _42=dojo.number._integerRegexp(_41);
var _43=dojo.regexp.buildGroupRE(_41.fractional,function(q){
var re="";
if(q&&(_41.places!==0)){
re="\\"+_41.decimal;
if(_41.places==Infinity){
re="(?:"+re+"\\d+)?";
}else{
re+="\\d{"+_41.places+"}";
}
}
return re;
},true);
var _44=dojo.regexp.buildGroupRE(_41.exponent,function(q){
if(q){
return "([eE]"+dojo.number._integerRegexp({signed:_41.eSigned})+")";
}
return "";
});
var _45=_42+_43;
if(_43){
_45="(?:(?:"+_45+")|(?:"+_43+"))";
}
return _45+_44;
};
dojo.number._integerRegexp=function(_46){
_46=_46||{};
if(!("signed" in _46)){
_46.signed=[true,false];
}
if(!("separator" in _46)){
_46.separator="";
}else{
if(!("groupSize" in _46)){
_46.groupSize=3;
}
}
var _47=dojo.regexp.buildGroupRE(_46.signed,function(q){
return q?"[-+]":"";
},true);
var _48=dojo.regexp.buildGroupRE(_46.separator,function(sep){
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
var grp=_46.groupSize,_49=_46.groupSize2;
if(_49){
var _4a="(?:0|[1-9]\\d{0,"+(_49-1)+"}(?:["+sep+"]\\d{"+_49+"})*["+sep+"]\\d{"+grp+"})";
return ((grp-_49)>0)?"(?:"+_4a+"|(?:0|[1-9]\\d{0,"+(grp-1)+"}))":_4a;
}
return "(?:0|[1-9]\\d{0,"+(grp-1)+"}(?:["+sep+"]\\d{"+grp+"})*)";
},true);
return _47+_48;
};
}
