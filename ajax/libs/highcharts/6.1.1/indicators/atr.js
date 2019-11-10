/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(b){function n(a,d){return Math.max(a[1]-a[2],d===g?0:Math.abs(a[1]-d[3]),d===g?0:Math.abs(a[2]-d[3]))}var r=b.isArray;b=b.seriesType;var g;b("atr","sma",{params:{period:14}},{getValues:function(a,d){d=d.period;var b=a.xData,g=(a=a.yData)?a.length:0,h=1,f=0,p=0,k=[],l=[],m=[],e,c,q;q=[[b[0],a[0]]];if(b.length<=d||!r(a[0])||4!==a[0].length)return!1;for(c=1;c<=g;c++)if(q.push([b[c],a[c]]),d<h){e=
d;var t=b[c-1],u=n(a[c-1],a[c-2]);e=[t,(f*(e-1)+u)/e];f=e[1];k.push(e);l.push(e[0]);m.push(e[1])}else d===h?(f=p/(c-1),k.push([b[c-1],f]),l.push(b[c-1]),m.push(f)):p+=n(a[c-1],a[c-2]),h++;return{values:k,xData:l,yData:m}}})})(b)});
