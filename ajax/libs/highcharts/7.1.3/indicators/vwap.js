/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,g,b,h){a.hasOwnProperty(g)||(a[g]=h.apply(null,b))}a=a?a._modules:{};b(a,"indicators/vwap.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var g=b.isArray;
b=a.seriesType;b("vwap","sma",{params:{period:30,volumeSeriesID:"volume"}},{getValues:function(b,k){var d=b.chart,e=b.xData;b=b.yData;var h=k.period,l=!0,f;if(!(f=d.get(k.volumeSeriesID)))return a.error("Series "+k.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,d);g(b[0])||(l=!1);return this.calculateVWAPValues(l,e,b,f,h)},calculateVWAPValues:function(a,b,d,e,g){var l=e.yData,f=e.xData.length,c=b.length;e=[];var h=[],k=[],q=[],p=[],m;f=c<=f?c:f;for(m=c=0;c<f;c++){var n=a?(d[c][1]+d[c][2]+
d[c][3])/3:d[c];n*=l[c];n=m?e[c-1]+n:n;var r=m?h[c-1]+l[c]:l[c];e.push(n);h.push(r);p.push([b[c],n/r]);k.push(p[c][0]);q.push(p[c][1]);m++;m===g&&(m=0)}return{values:p,xData:k,yData:q}}})});b(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map