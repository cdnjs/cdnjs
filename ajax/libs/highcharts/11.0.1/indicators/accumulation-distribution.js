/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,m){a.hasOwnProperty(c)||(a[c]=m.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",
{detail:{path:c,module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/AD/ADIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {sma:c}=a.seriesTypes,{error:m,extend:q,merge:r}=b;class k extends c{constructor(){super(...arguments);this.points=this.options=this.data=void 0}static populateAverage(a,e,b,h,f){f=e[h][1];const d=e[h][2];e=e[h][3];b=b[h];return[a[h],e===f&&e===d||f===d?0:(2*e-d-f)/(f-d)*b]}getValues(a,b){const c=b.period,h=a.xData,f=a.yData;var d=
b.volumeSeriesID,g=a.chart.get(d);b=g&&g.yData;const e=f?f.length:0,l=[],n=[],p=[];if(!(h.length<=c&&e&&4!==f[0].length)){if(g){for(d=c;d<e;d++)a=l.length,g=k.populateAverage(h,f,b,d,c),0<a&&(g[1]+=l[a-1][1]),l.push(g),n.push(g[0]),p.push(g[1]);return{values:l,xData:n,yData:p}}m("Series "+d+" not found! Check `volumeSeriesID`.",!0,a.chart)}}}k.defaultOptions=r(c.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});q(k.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"});
a.registerSeriesType("ad",k);"";return k});b(a,"masters/indicators/accumulation-distribution.src.js",[],function(){})});
//# sourceMappingURL=accumulation-distribution.js.map