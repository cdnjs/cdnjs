/*
 Highstock JS v11.0.1 (2023-05-08)

 Money Flow Index indicator for Highcharts Stock

 (c) 2010-2021 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/mfi",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,f,c,l){a.hasOwnProperty(f)||(a[f]=l.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};c(a,"Stock/Indicators/MFI/MFIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){function f(a){return a.reduce(function(a,v){return a+v})}function l(a){return(a[1]+a[2]+a[3])/3}const {sma:m}=a.seriesTypes,{extend:w,merge:x,error:y,isArray:z}=c;class k extends m{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(a,b){var e=b.period;const c=a.xData,g=a.yData,k=g?g.length:0,m=b.decimals;var d=a.chart.get(b.volumeSeriesID);
const q=d&&d.yData,r=[],t=[],u=[],n=[],p=[];let h=1;if(!d)y("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,a.chart);else if(!(c.length<=e)&&z(g[0])&&4===g[0].length&&q){for(a=l(g[h]);h<e+1;)b=a,a=l(g[h]),d=a>=b,b=a*q[h],n.push(d?b:0),p.push(d?0:b),h++;for(e=h-1;e<k;e++)e>h-1&&(n.shift(),p.shift(),b=a,a=l(g[e]),d=a>b,b=a*q[e],n.push(d?b:0),p.push(d?0:b)),b=f(p),d=f(n),b=d/b,b=parseFloat((100-100/(1+b)).toFixed(m)),r.push([c[e],b]),t.push(c[e]),u.push(b);return{values:r,xData:t,
yData:u}}}}k.defaultOptions=x(m.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume",decimals:4}});w(k.prototype,{nameBase:"Money Flow Index"});a.registerSeriesType("mfi",k);"";return k});c(a,"masters/indicators/mfi.src.js",[],function(){})});
//# sourceMappingURL=mfi.js.map