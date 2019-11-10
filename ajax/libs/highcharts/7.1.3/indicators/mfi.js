/*
 Highstock JS v7.1.3 (2019-08-14)

 Money Flow Index indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/mfi",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,k,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,k))}a=a?a._modules:{};b(a,"indicators/mfi.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function k(a){return a.reduce(function(a,
d){return a+d})}function h(a){return(a[1]+a[2]+a[3])/3}var u=b.isArray;a.seriesType("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(d,c){var b=c.period,n=d.xData,f=d.yData,v=f?f.length:0,w=c.decimals,g=1,e=d.chart.get(c.volumeSeriesID),p=e&&e.yData,q=[],r=[],t=[],l=[],m=[];if(!e)return a.error("Series "+c.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,d.chart);if(n.length<=b||!u(f[0])||4!==f[0].length||!p)return!1;for(d=
h(f[g]);g<b+1;)c=d,d=h(f[g]),c=d>=c,e=d*p[g],l.push(c?e:0),m.push(c?0:e),g++;for(b=g-1;b<v;b++)b>g-1&&(l.shift(),m.shift(),c=d,d=h(f[b]),c=d>c,e=d*p[b],l.push(c?e:0),m.push(c?0:e)),c=k(m),e=k(l),c=e/c,c=parseFloat((100-100/(1+c)).toFixed(w)),q.push([n[b],c]),r.push(n[b]),t.push(c);return{values:q,xData:r,yData:t}}})});b(a,"masters/indicators/mfi.src.js",[],function(){})});
//# sourceMappingURL=mfi.js.map