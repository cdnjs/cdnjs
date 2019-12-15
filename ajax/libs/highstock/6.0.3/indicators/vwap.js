/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(b){var t=b.isArray,u=b.seriesType;u("vwap","sma",{name:"VWAP (30)",params:{period:30,volumeSeriesID:"volume"}},{getValues:function(c,f){var g=c.xData,d=c.yData,m=f.period,h=!0;if(!(c=c.chart.get(f.volumeSeriesID)))return b.error("Series "+f.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0);t(d[0])||(h=!1);return this.calculateVWAPValues(h,g,d,c,m)},calculateVWAPValues:function(b,f,g,
d,m){var h=d.yData,c=d.xData.length,a=f.length;d=[];var p=[],q=[],r=[],l=[],e,n,k,c=a<=c?a:c;for(k=a=0;a<c;a++)e=b?(g[a][1]+g[a][2]+g[a][3])/3:g[a],e*=h[a],e=k?d[a-1]+e:e,n=k?p[a-1]+h[a]:h[a],d.push(e),p.push(n),l.push([f[a],e/n]),q.push(l[a][0]),r.push(l[a][1]),k++,k===m&&(k=0);return{values:l,xData:q,yData:r}}})})(b)});
