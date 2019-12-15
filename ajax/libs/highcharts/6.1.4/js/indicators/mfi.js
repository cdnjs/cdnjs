/*
  Highcharts JS v6.1.4 (2018-09-25)

 Money Flow Index indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:"function"===typeof define&&define.amd?define(function(){return d}):d(Highcharts)})(function(d){(function(d){function q(b){return m(b,function(c,b){return c+b})}function n(b){return(b[1]+b[2]+b[3])/3}var v=d.isArray,m=d.reduce;d.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(b,c){var e=c.period,p=b.xData,g=b.yData,m=g?g.length:0,w=c.decimals,h=1,a=
b.chart.get(c.volumeSeriesID);b=a&&a.yData;var r=[],t=[],u=[],k=[],l=[],f;if(!a)return d.error("Series "+c.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0);if(p.length<=e||!v(g[0])||4!==g[0].length||!b)return!1;for(c=n(g[h]);h<e+1;)a=c,c=n(g[h]),a=c>=a?!0:!1,f=c*b[h],k.push(a?f:0),l.push(a?0:f),h++;for(e=h-1;e<m;e++)e>h-1&&(k.shift(),l.shift(),a=c,c=n(g[e]),a=c>a?!0:!1,f=c*b[e],k.push(a?f:0),l.push(a?0:f)),a=q(l),f=q(k),a=f/a,a=parseFloat((100-100/(1+a)).toFixed(w)),r.push([p[e],a]),t.push(p[e]),
u.push(a);return{values:r,xData:t,yData:u}}})})(d)});
//# sourceMappingURL=mfi.js.map
