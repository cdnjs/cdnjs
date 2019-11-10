/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,e,d){a.hasOwnProperty(c)||(a[c]=d.apply(null,e))}a=a?a._modules:{};c(a,"indicators/vwap.src.js",[a["parts/Globals.js"]],function(a){var c=a.isArray,e=a.seriesType;e("vwap",
"sma",{params:{period:30,volumeSeriesID:"volume"}},{getValues:function(d,l){var f=d.chart,g=d.xData;d=d.yData;var e=l.period,q=!0,h;if(!(h=f.get(l.volumeSeriesID)))return a.error("Series "+l.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,f);c(d[0])||(q=!1);return this.calculateVWAPValues(q,g,d,h,e)},calculateVWAPValues:function(a,c,f,g,e){var d=g.yData,h=g.xData.length,b=c.length;g=[];var l=[],r=[],t=[],n=[],k,p,m,h=b<=h?b:h;for(m=b=0;b<h;b++)k=a?(f[b][1]+f[b][2]+f[b][3])/3:f[b],k*=d[b],
k=m?g[b-1]+k:k,p=m?l[b-1]+d[b]:d[b],g.push(k),l.push(p),n.push([c[b],k/p]),r.push(n[b][0]),t.push(n[b][1]),m++,m===e&&(m=0);return{values:n,xData:r,yData:t}}})});c(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map