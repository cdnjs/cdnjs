/*
  Highcharts JS v7.0.3 (2019-02-06)

 Money Flow Index indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define(function(){return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){(function(c){function p(b){return b.reduce(function(a,b){return a+b})}function l(b){return(b[1]+b[2]+b[3])/3}var u=c.isArray;c.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(b,a){var e=a.period,m=b.xData,
f=b.yData,v=f?f.length:0,w=a.decimals,g=1,d=b.chart.get(a.volumeSeriesID),n=d&&d.yData,q=[],r=[],t=[],h=[],k=[];if(!d)return c.error("Series "+a.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,b.chart);if(m.length<=e||!u(f[0])||4!==f[0].length||!n)return!1;for(b=l(f[g]);g<e+1;)a=b,b=l(f[g]),a=b>=a,d=b*n[g],h.push(a?d:0),k.push(a?0:d),g++;for(e=g-1;e<v;e++)e>g-1&&(h.shift(),k.shift(),a=b,b=l(f[e]),a=b>a,d=b*n[e],h.push(a?d:0),k.push(a?0:d)),a=p(k),d=p(h),a=d/a,a=parseFloat((100-100/(1+a)).toFixed(w)),
q.push([m[e],a]),r.push(m[e]),t.push(a);return{values:q,xData:r,yData:t}}})})(c)});
//# sourceMappingURL=mfi.js.map