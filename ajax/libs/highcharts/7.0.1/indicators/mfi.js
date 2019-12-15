/*
  Highcharts JS v7.0.1 (2018-12-19)

 Money Flow Index indicator for Highstock

 (c) 2010-2018 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:"function"===typeof define&&define.amd?define(function(){return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){(function(e){function p(b){return b.reduce(function(a,b){return a+b})}function l(b){return(b[1]+b[2]+b[3])/3}var u=e.isArray;e.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(b,a){var d=a.period,m=b.xData,f=b.yData,v=
f?f.length:0,w=a.decimals,g=1,c=b.chart.get(a.volumeSeriesID),n=c&&c.yData,q=[],r=[],t=[],h=[],k=[];if(!c)return e.error("Series "+a.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,b.chart);if(m.length<=d||!u(f[0])||4!==f[0].length||!n)return!1;for(b=l(f[g]);g<d+1;)a=b,b=l(f[g]),a=b>=a?!0:!1,c=b*n[g],h.push(a?c:0),k.push(a?0:c),g++;for(d=g-1;d<v;d++)d>g-1&&(h.shift(),k.shift(),a=b,b=l(f[d]),a=b>a?!0:!1,c=b*n[d],h.push(a?c:0),k.push(a?0:c)),a=p(k),c=p(h),a=c/a,a=parseFloat((100-100/(1+a)).toFixed(w)),
q.push([m[d],a]),r.push(m[d]),t.push(a);return{values:q,xData:r,yData:t}}})})(e)});
//# sourceMappingURL=mfi.js.map