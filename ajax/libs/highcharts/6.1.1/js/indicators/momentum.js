/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){function m(n,b,a,e,c){a=a[e-1][3]-a[e-c-1][3];b=b[e-1];n.shift();return[b,a]}var p=a.isArray;a=a.seriesType;a("momentum","sma",{params:{period:14}},{nameBase:"Momentum",getValues:function(a,b){b=b.period;var f=a.xData,e=(a=a.yData)?a.length:0,c=f[0],g=[],h=[],k=[],l,d;if(f.length<=b||!p(a[0]))return!1;l=[[c,a[0][3]]];for(c=b+1;c<e;c++)d=m(l,f,a,c,b,void 0),g.push(d),h.push(d[0]),k.push(d[1]);
d=m(l,f,a,c,b,void 0);g.push(d);h.push(d[0]);k.push(d[1]);return{values:g,xData:h,yData:k}}})})(a)});
