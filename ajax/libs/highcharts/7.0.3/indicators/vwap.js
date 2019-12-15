/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){(function(b){var u=b.isArray,v=b.seriesType;v("vwap","sma",{params:{period:30,volumeSeriesID:"volume"}},{getValues:function(c,h){var d=c.chart,e=c.xData;c=c.yData;var m=h.period,p=!0,f;if(!(f=d.get(h.volumeSeriesID)))return b.error("Series "+h.volumeSeriesID+" not found! Check `volumeSeriesID`.",
!0,d);u(c[0])||(p=!1);return this.calculateVWAPValues(p,e,c,f,m)},calculateVWAPValues:function(b,h,d,e,m){var c=e.yData,f=e.xData.length,a=h.length;e=[];var q=[],r=[],t=[],l=[],g,n,k,f=a<=f?a:f;for(k=a=0;a<f;a++)g=b?(d[a][1]+d[a][2]+d[a][3])/3:d[a],g*=c[a],g=k?e[a-1]+g:g,n=k?q[a-1]+c[a]:c[a],e.push(g),q.push(n),l.push([h[a],g/n]),r.push(l[a][0]),t.push(l[a][1]),k++,k===m&&(k=0);return{values:l,xData:r,yData:t}}})})(b)});
//# sourceMappingURL=vwap.js.map