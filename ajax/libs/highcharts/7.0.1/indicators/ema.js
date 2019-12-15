/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var n=a.isArray,p=a.seriesType,q=a.correctFloat;p("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(e,c,b){for(var a=0,d=0,f;d<e;)f=0>c?b[d]:b[d][c],a+=f,d++;return a},calculateEma:function(e,c,b,a,d,f,h){e=e[b-1];c=0>f?c[b-1]:c[b-1][f];a=void 0===d?h:q(c*a+d*
(1-a));return[e,a]},getValues:function(a,c){var b=c.period,e=a.xData,d=(a=a.yData)?a.length:0,f=2/(b+1),h=[],l=[],m=[],k=-1,g;if(d<b)return!1;n(a[0])&&(k=c.index?c.index:0);for(c=this.accumulatePeriodPoints(b,k,a)/b;b<d+1;b++)g=this.calculateEma(e,a,b,f,g,k,c),h.push(g),l.push(g[0]),m.push(g[1]),g=g[1];return{values:h,xData:l,yData:m}}})})(a)});
//# sourceMappingURL=ema.js.map