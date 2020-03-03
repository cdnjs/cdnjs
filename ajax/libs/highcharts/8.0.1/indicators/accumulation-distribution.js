/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,k,f){a.hasOwnProperty(c)||(a[c]=f.apply(null,k))}a=a?a._modules:{};c(a,"indicators/accumulation-distribution.src.js",[a["parts/Utilities.js"]],function(a){var c=
a.error;a=a.seriesType;a("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(a,f){var d=f.period,m=a.xData,g=a.yData,b=f.volumeSeriesID,e=a.chart.get(b);f=e&&e.yData;var n=g?g.length:0,h=[],p=[],q=[];if(!(m.length<=d&&n&&4!==g[0].length)){if(e){for(;d<n;d++){a=h.length;b=g[d][1];e=g[d][2];var l=g[d][3],k=f[d];b=[m[d],l===b&&l===e||b===e?0:(2*l-e-b)/(b-e)*k];0<a&&(b[1]+=h[a-1][1]);h.push(b);p.push(b[0]);q.push(b[1])}return{values:h,
xData:p,yData:q}}c("Series "+b+" not found! Check `volumeSeriesID`.",!0,a.chart)}}});""});c(a,"masters/indicators/accumulation-distribution.src.js",[],function(){})});
//# sourceMappingURL=accumulation-distribution.js.map