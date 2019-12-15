/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,b))}a=a?a._modules:{};b(a,"indicators/ema.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var f=b.isArray;
b=a.seriesType;var g=a.correctFloat;b("ema","sma",{params:{index:3,period:9}},{accumulatePeriodPoints:function(a,l,c){for(var b=0,d=0,e;d<a;)e=0>l?c[d]:c[d][l],b+=e,d++;return b},calculateEma:function(a,b,c,h,m,e,f){a=a[c-1];b=0>e?b[c-1]:b[c-1][e];h=void 0===m?f:g(b*h+m*(1-h));return[a,h]},getValues:function(a,b){var c=b.period,h=a.xData,m=(a=a.yData)?a.length:0,e=2/(c+1),d=[],g=[],l=[],n=-1;if(m<c)return!1;f(a[0])&&(n=b.index?b.index:0);for(b=this.accumulatePeriodPoints(c,n,a)/c;c<m+1;c++){var k=
this.calculateEma(h,a,c,e,k,n,b);d.push(k);g.push(k[0]);l.push(k[1]);k=k[1]}return{values:d,xData:g,yData:l}}})});b(a,"masters/indicators/ema.src.js",[],function(){})});
//# sourceMappingURL=ema.js.map