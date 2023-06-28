/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,c,h){a.hasOwnProperty(d)||(a[d]=h.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,
module:a[d]}})))}a=a?a._modules:{};c(a,"Stock/Indicators/VWAP/VWAPIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){const {sma:d}=a.seriesTypes,{error:h,isArray:t,merge:u}=c;class e extends d{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,c){const d=a.chart,f=a.xData;a=a.yData;const e=c.period;let k=!0,g;if(g=d.get(c.volumeSeriesID))return t(a[0])||(k=!1),this.calculateVWAPValues(k,f,a,g,e);h("Series "+c.volumeSeriesID+
" not found! Check `volumeSeriesID`.",!0,d)}calculateVWAPValues(a,c,d,f,e){const k=f.yData;var g=f.xData.length,b=c.length;f=[];const h=[],q=[],r=[],n=[];let p,l;g=b<=g?b:g;for(l=b=0;b<g;b++){var m=a?(d[b][1]+d[b][2]+d[b][3])/3:d[b];m*=k[b];m=l?f[b-1]+m:m;p=l?h[b-1]+k[b]:k[b];f.push(m);h.push(p);n.push([c[b],m/p]);q.push(n[b][0]);r.push(n[b][1]);l++;l===e&&(l=0)}return{values:n,xData:q,yData:r}}}e.defaultOptions=u(d.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}});a.registerSeriesType("vwap",
e);"";return e});c(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map