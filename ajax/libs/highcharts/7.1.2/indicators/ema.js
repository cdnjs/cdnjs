/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,g,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,g))}a=a?a._modules:{};b(a,"indicators/ema.src.js",[a["parts/Globals.js"]],function(a){var b=a.isArray,g=a.seriesType,h=a.correctFloat;
g("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(a,d,c){for(var p=0,b=0,e;b<a;)e=0>d?c[b]:c[b][d],p+=e,b++;return p},calculateEma:function(a,b,c,k,l,e,m){a=a[c-1];b=0>e?b[c-1]:b[c-1][e];k=void 0===l?m:h(b*k+l*(1-k));return[a,k]},getValues:function(a,d){var c=d.period,k=a.xData,l=(a=a.yData)?a.length:0,e=2/(c+1),m=[],g=[],h=[],n=-1,f;if(l<c)return!1;b(a[0])&&(n=d.index?d.index:0);for(d=this.accumulatePeriodPoints(c,n,a)/c;c<l+1;c++)f=this.calculateEma(k,a,c,e,f,n,d),m.push(f),
g.push(f[0]),h.push(f[1]),f=f[1];return{values:m,xData:g,yData:h}}})});b(a,"masters/indicators/ema.src.js",[],function(){})});
//# sourceMappingURL=ema.js.map