/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,m){a.hasOwnProperty(b)||(a[b]=m.apply(null,f))}a=a?a._modules:{};b(a,"indicators/ema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var f=b.correctFloat,
m=b.isArray;a=a.seriesType;a("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(a,k,c){for(var b=0,d=0,e;d<a;)e=0>k?c[d]:c[d][k],b+=e,d++;return b},calculateEma:function(a,b,c,g,l,e,p){a=a[c-1];b=0>e?b[c-1]:b[c-1][e];g="undefined"===typeof l?p:f(b*g+l*(1-g));return[a,g]},getValues:function(a,b){var c=b.period,g=a.xData,l=(a=a.yData)?a.length:0,e=2/(c+1),d=[],f=[],k=[],n=-1;if(!(l<c)){m(a[0])&&(n=b.index?b.index:0);b=this.accumulatePeriodPoints(c,n,a);for(b/=c;c<l+1;c++){var h=
this.calculateEma(g,a,c,e,h,n,b);d.push(h);f.push(h[0]);k.push(h[1]);h=h[1]}return{values:d,xData:f,yData:k}}}});""});b(a,"masters/indicators/ema.src.js",[],function(){})});
//# sourceMappingURL=ema.js.map