/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var n=a.isArray,p=a.seriesType,q=a.correctFloat;p("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(r,c,b){for(var a=0,d=0,e;d<r;)e=0>c?b[d]:b[d][c],a+=e,d++;return a},calculateEma:function(a,c,b,g,d,e,h){a=a[b-1];c=0>e?c[b-1]:c[b-1][e];g=void 0===
d?h:q(c*g+d*(1-g));return[a,g]},getValues:function(a,c){var b=c.period,g=a.xData,d=(a=a.yData)?a.length:0,e=2/(b+1),h=[],l=[],m=[],k=-1,f;if(d<b)return!1;n(a[0])&&(k=c.index?c.index:0);for(c=this.accumulatePeriodPoints(b,k,a)/b;b<d+1;b++)f=this.calculateEma(g,a,b,e,f,k,c),h.push(f),l.push(f[0]),m.push(f[1]),f=f[1];return{values:h,xData:l,yData:m}}})})(a)});
//# sourceMappingURL=ema.js.map