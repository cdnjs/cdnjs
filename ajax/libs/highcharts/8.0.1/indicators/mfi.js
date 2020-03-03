/*
 Highstock JS v8.0.1 (2020-03-02)

 Money Flow Index indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/mfi",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,h,m){a.hasOwnProperty(c)||(a[c]=m.apply(null,h))}a=a?a._modules:{};c(a,"indicators/mfi.src.js",[a["parts/Utilities.js"]],function(a){function c(a){return a.reduce(function(a,
n){return a+n})}function h(a){return(a[1]+a[2]+a[3])/3}var m=a.error,v=a.isArray;a=a.seriesType;a("mfi","sma",{params:{period:14,volumeSeriesID:"volume",decimals:4}},{nameBase:"Money Flow Index",getValues:function(a,b){var e=b.period,p=a.xData,f=a.yData,n=f?f.length:0,w=b.decimals,g=1,d=a.chart.get(b.volumeSeriesID),q=d&&d.yData,r=[],t=[],u=[],k=[],l=[];if(!d)m("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,a.chart);else if(!(p.length<=e)&&v(f[0])&&4===f[0].length&&q){for(a=h(f[g]);g<
e+1;)b=a,a=h(f[g]),b=a>=b,d=a*q[g],k.push(b?d:0),l.push(b?0:d),g++;for(e=g-1;e<n;e++)e>g-1&&(k.shift(),l.shift(),b=a,a=h(f[e]),b=a>b,d=a*q[e],k.push(b?d:0),l.push(b?0:d)),b=c(l),d=c(k),b=d/b,b=parseFloat((100-100/(1+b)).toFixed(w)),r.push([p[e],b]),t.push(p[e]),u.push(b);return{values:r,xData:t,yData:u}}}});""});c(a,"masters/indicators/mfi.src.js",[],function(){})});
//# sourceMappingURL=mfi.js.map