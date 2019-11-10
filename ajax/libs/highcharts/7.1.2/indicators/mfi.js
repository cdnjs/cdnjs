/*
  Highcharts JS v7.1.2 (2019-06-03)

 Money Flow Index indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/mfi",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,d,k,n){a.hasOwnProperty(d)||(a[d]=n.apply(null,k))}a=a?a._modules:{};d(a,"indicators/mfi.src.js",[a["parts/Globals.js"]],function(a){function d(a){return a.reduce(function(a,
c){return a+c})}function k(a){return(a[1]+a[2]+a[3])/3}var n=a.isArray;a.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(c,b){var f=b.period,p=c.xData,g=c.yData,v=g?g.length:0,w=b.decimals,h=1,e=c.chart.get(b.volumeSeriesID),q=e&&e.yData,r=[],t=[],u=[],l=[],m=[];if(!e)return a.error("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,c.chart);if(p.length<=f||!n(g[0])||4!==g[0].length||!q)return!1;for(c=
k(g[h]);h<f+1;)b=c,c=k(g[h]),b=c>=b,e=c*q[h],l.push(b?e:0),m.push(b?0:e),h++;for(f=h-1;f<v;f++)f>h-1&&(l.shift(),m.shift(),b=c,c=k(g[f]),b=c>b,e=c*q[f],l.push(b?e:0),m.push(b?0:e)),b=d(m),e=d(l),b=e/b,b=parseFloat((100-100/(1+b)).toFixed(w)),r.push([p[f],b]),t.push(p[f]),u.push(b);return{values:r,xData:t,yData:u}}})});d(a,"masters/indicators/mfi.src.js",[],function(){})});
//# sourceMappingURL=mfi.js.map