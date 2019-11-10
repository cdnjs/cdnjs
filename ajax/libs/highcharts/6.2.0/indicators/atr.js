/*
  Highcharts JS v6.2.0 (2018-10-17)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(a){function n(b,d){return Math.max(b[1]-b[2],d===g?0:Math.abs(b[1]-d[3]),d===g?0:Math.abs(b[2]-d[3]))}var r=a.isArray;a=a.seriesType;var g;a("atr","sma",{params:{period:14}},{getValues:function(b,d){d=d.period;var a=b.xData,g=(b=b.yData)?b.length:0,h=1,f=0,p=0,k=[],l=[],m=[],e,c,q;q=[[a[0],b[0]]];if(a.length<=d||!r(b[0])||
4!==b[0].length)return!1;for(c=1;c<=g;c++)if(q.push([a[c],b[c]]),d<h){e=d;var t=a[c-1],u=n(b[c-1],b[c-2]);e=[t,(f*(e-1)+u)/e];f=e[1];k.push(e);l.push(e[0]);m.push(e[1])}else d===h?(f=p/(c-1),k.push([a[c-1],f]),l.push(a[c-1]),m.push(f)):p+=n(b[c-1],b[c-2]),h++;return{values:k,xData:l,yData:m}}})})(a)});
//# sourceMappingURL=atr.js.map
