/*
  Highcharts JS v6.2.0 (2018-10-17)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(a){function m(a,b,c,f,d){c=c[f-1][3]-c[f-d-1][3];b=b[f-1];a.shift();return[b,c]}var n=a.isArray;a=a.seriesType;a("momentum","sma",{params:{period:14}},{nameBase:"Momentum",getValues:function(a,b){b=b.period;var c=a.xData,f=(a=a.yData)?a.length:0,d=c[0],g=[],h=[],k=[],l,e;if(c.length<=b||!n(a[0]))return!1;l=[[d,a[0][3]]];for(d=
b+1;d<f;d++)e=m(l,c,a,d,b,void 0),g.push(e),h.push(e[0]),k.push(e[1]);e=m(l,c,a,d,b,void 0);g.push(e);h.push(e[0]);k.push(e[1]);return{values:g,xData:h,yData:k}}})})(a)});
//# sourceMappingURL=momentum.js.map
