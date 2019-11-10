/*
  Highcharts JS v6.1.0 (2018-04-13)

 Money Flow Index indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(e){function p(b){return b.reduce(function(c,b){return c+b})}function m(b){return(b[1]+b[2]+b[3])/3}var u=e.isArray;e.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(b,c){var d=c.period,n=b.xData,g=b.yData,v=g?g.length:0,w=c.decimals,h=1,a=b.chart.get(c.volumeSeriesID);b=a&&a.yData;var q=[],r=[],t=[],k=[],l=[],f;
if(!a)return e.error("Series "+c.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0);if(n.length<=d||!u(g[0])||4!==g[0].length||!b)return!1;for(c=m(g[h]);h<d+1;)a=c,c=m(g[h]),a=c>=a?!0:!1,f=c*b[h],k.push(a?f:0),l.push(a?0:f),h++;for(d=h-1;d<v;d++)d>h-1&&(k.shift(),l.shift(),a=c,c=m(g[d]),a=c>a?!0:!1,f=c*b[d],k.push(a?f:0),l.push(a?0:f)),a=p(l),f=p(k),a=f/a,a=parseFloat((100-100/(1+a)).toFixed(w)),q.push([n[d],a]),r.push(n[d]),t.push(a);return{values:q,xData:r,yData:t}}})})(e)});
