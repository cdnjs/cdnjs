/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,n,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,n))}a=a?a._modules:{};c(a,"indicators/vwap.src.js",[a["parts/Utilities.js"]],function(a){var c=a.error,n=a.isArray;a=a.seriesType;
a("vwap","sma",{params:{period:30,volumeSeriesID:"volume"}},{getValues:function(a,h){var d=a.chart,e=a.xData;a=a.yData;var g=h.period,k=!0,f;if(f=d.get(h.volumeSeriesID))return n(a[0])||(k=!1),this.calculateVWAPValues(k,e,a,f,g);c("Series "+h.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,d)},calculateVWAPValues:function(a,c,d,e,n){var k=e.yData,f=e.xData.length,b=c.length;e=[];var g=[],h=[],q=[],p=[],l;f=b<=f?b:f;for(l=b=0;b<f;b++){var m=a?(d[b][1]+d[b][2]+d[b][3])/3:d[b];m*=k[b];m=l?e[b-
1]+m:m;var r=l?g[b-1]+k[b]:k[b];e.push(m);g.push(r);p.push([c[b],m/r]);h.push(p[b][0]);q.push(p[b][1]);l++;l===n&&(l=0)}return{values:p,xData:h,yData:q}}});""});c(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map