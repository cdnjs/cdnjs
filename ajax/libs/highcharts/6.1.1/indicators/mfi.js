/*
  Highcharts JS v6.1.1 (2018-06-27)

 Money Flow Index indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(e){function q(b){return m(b,function(c,b){return c+b})}function n(b){return(b[1]+b[2]+b[3])/3}var v=e.isArray,m=e.reduce;e.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(b,c){var d=c.period,p=b.xData,g=b.yData,m=g?g.length:0,w=c.decimals,h=1,a=b.chart.get(c.volumeSeriesID);b=a&&a.yData;var r=[],t=[],u=[],k=[],l=
[],f;if(!a)return e.error("Series "+c.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0);if(p.length<=d||!v(g[0])||4!==g[0].length||!b)return!1;for(c=n(g[h]);h<d+1;)a=c,c=n(g[h]),a=c>=a?!0:!1,f=c*b[h],k.push(a?f:0),l.push(a?0:f),h++;for(d=h-1;d<m;d++)d>h-1&&(k.shift(),l.shift(),a=c,c=n(g[d]),a=c>a?!0:!1,f=c*b[d],k.push(a?f:0),l.push(a?0:f)),a=q(l),f=q(k),a=f/a,a=parseFloat((100-100/(1+a)).toFixed(w)),r.push([p[d],a]),t.push(p[d]),u.push(a);return{values:r,xData:t,yData:u}}})})(e)});
