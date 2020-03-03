/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,l,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,l))}a=a?a._modules:{};b(a,"indicators/ema.src.js",[a["parts/Utilities.js"]],function(a){var b=a.correctFloat,l=a.isArray;a=a.seriesType;
a("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(a,d,c){for(var e=0,b=0,f;b<a;)f=0>d?c[b]:c[b][d],e+=f,b++;return e},calculateEma:function(a,d,c,k,h,f,q){a=a[c-1];d=0>f?d[c-1]:d[c-1][f];k="undefined"===typeof h?q:b(d*k+h*(1-k));return[a,k]},getValues:function(a,b){var c=b.period,d=a.xData,h=(a=a.yData)?a.length:0,f=2/(c+1),e=[],n=[],p=[],m=-1;if(!(h<c)){l(a[0])&&(m=b.index?b.index:0);b=this.accumulatePeriodPoints(c,m,a);for(b/=c;c<h+1;c++){var g=this.calculateEma(d,a,c,f,
g,m,b);e.push(g);n.push(g[0]);p.push(g[1]);g=g[1]}return{values:e,xData:n,yData:p}}}});""});b(a,"masters/indicators/ema.src.js",[],function(){})});
//# sourceMappingURL=ema.js.map