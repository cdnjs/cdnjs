/*
  Highcharts JS v6.0.7 (2018-02-16)

 Indicator series type for Highstock

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(c){var l=c.seriesType;l("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(e,f){var g=f.period,n=e.xData,d=e.yData,b=f.volumeSeriesID,a=e.chart.get(b);e=a&&a.yData;f=d?d.length:0;var h=[],p=[],q=[];if(n.length<=g&&f&&4!==d[0].length)return!1;if(!a)return c.error("Series "+b+" not found! Check `volumeSeriesID`.",!0);for(b=
g;b<f;b++){var g=h.length,a=d[b][1],k=d[b][2],m=d[b][3],l=e[b],a=[n[b],m===a&&m===k||a===k?0:(2*m-k-a)/(a-k)*l];0<g&&(a[1]+=h[g-1][1],a[1]=a[1]);h.push(a);p.push(a[0]);q.push(a[1])}return{values:h,xData:p,yData:q}}})})(c)});
