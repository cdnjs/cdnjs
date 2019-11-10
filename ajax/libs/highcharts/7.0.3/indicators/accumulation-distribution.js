/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){(function(b){var k=b.seriesType;k("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(e,g){var c=g.period,m=e.xData,f=e.yData,a=g.volumeSeriesID,d=e.chart.get(a);g=d&&d.yData;var n=f?f.length:0,h=[],p=[],q=[];
if(m.length<=c&&n&&4!==f[0].length)return!1;if(!d)return b.error("Series "+a+" not found! Check `volumeSeriesID`.",!0,e.chart);for(;c<n;c++){e=h.length;var a=f[c][1],d=f[c][2],l=f[c][3],k=g[c],a=[m[c],l===a&&l===d||a===d?0:(2*l-d-a)/(a-d)*k];0<e&&(a[1]+=h[e-1][1]);h.push(a);p.push(a[0]);q.push(a[1])}return{values:h,xData:p,yData:q}}})})(b)});
//# sourceMappingURL=accumulation-distribution.js.map