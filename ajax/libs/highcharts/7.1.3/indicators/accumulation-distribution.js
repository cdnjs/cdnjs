/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,k,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,k))}a=a?a._modules:{};b(a,"indicators/accumulation-distribution.src.js",[a["parts/Globals.js"]],function(a){var b=
a.seriesType;b("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(b,f){var d=f.period,m=b.xData,g=b.yData,c=f.volumeSeriesID,e=b.chart.get(c);f=e&&e.yData;var n=g?g.length:0,h=[],p=[],q=[];if(m.length<=d&&n&&4!==g[0].length)return!1;if(!e)return a.error("Series "+c+" not found! Check `volumeSeriesID`.",!0,b.chart);for(;d<n;d++){b=h.length;c=g[d][1];e=g[d][2];var l=g[d][3],k=f[d];c=[m[d],l===c&&l===e||c===e?0:(2*l-e-c)/(c-e)*k];
0<b&&(c[1]+=h[b-1][1]);h.push(c);p.push(c[0]);q.push(c[1])}return{values:h,xData:p,yData:q}}})});b(a,"masters/indicators/accumulation-distribution.src.js",[],function(){})});
//# sourceMappingURL=accumulation-distribution.js.map