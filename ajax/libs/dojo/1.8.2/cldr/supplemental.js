/*
	Copyright (c) 2004-2012, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/cldr/supplemental",["../_base/lang","../i18n"],function(_1,_2){
var _3={};
_1.setObject("dojo.cldr.supplemental",_3);
_3.getFirstDayOfWeek=function(_4){
var _5={bd:5,mv:5,ae:6,af:6,bh:6,dj:6,dz:6,eg:6,iq:6,ir:6,jo:6,kw:6,ly:6,ma:6,om:6,qa:6,sa:6,sd:6,sy:6,ye:6,ag:0,ar:0,as:0,au:0,br:0,bs:0,bt:0,bw:0,by:0,bz:0,ca:0,cn:0,co:0,dm:0,"do":0,et:0,gt:0,gu:0,hk:0,hn:0,id:0,ie:0,il:0,"in":0,jm:0,jp:0,ke:0,kh:0,kr:0,la:0,mh:0,mm:0,mo:0,mt:0,mx:0,mz:0,ni:0,np:0,nz:0,pa:0,pe:0,ph:0,pk:0,pr:0,py:0,sg:0,sv:0,th:0,tn:0,tt:0,tw:0,um:0,us:0,ve:0,vi:0,ws:0,za:0,zw:0};
var _6=_3._region(_4);
var _7=_5[_6];
return (_7===undefined)?1:_7;
};
_3._region=function(_8){
_8=_2.normalizeLocale(_8);
var _9=_8.split("-");
var _a=_9[1];
if(!_a){
_a={de:"de",en:"us",es:"es",fi:"fi",fr:"fr",he:"il",hu:"hu",it:"it",ja:"jp",ko:"kr",nl:"nl",pt:"br",sv:"se",zh:"cn"}[_9[0]];
}else{
if(_a.length==4){
_a=_9[2];
}
}
return _a;
};
_3.getWeekend=function(_b){
var _c={"in":0,af:4,dz:4,ir:4,om:4,sa:4,ye:4,ae:5,bh:5,eg:5,il:5,iq:5,jo:5,kw:5,ly:5,ma:5,qa:5,sd:5,sy:5,tn:5},_d={af:5,dz:5,ir:5,om:5,sa:5,ye:5,ae:6,bh:5,eg:6,il:6,iq:6,jo:6,kw:6,ly:6,ma:6,qa:6,sd:6,sy:6,tn:6},_e=_3._region(_b),_f=_c[_e],end=_d[_e];
if(_f===undefined){
_f=6;
}
if(end===undefined){
end=0;
}
return {start:_f,end:end};
};
return _3;
});
