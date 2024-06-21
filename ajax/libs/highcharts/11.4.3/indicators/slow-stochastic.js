!/**
 * Highstock JS v11.4.3 (2024-05-22)
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(t,e,s,a){t.hasOwnProperty(e)||(t[e]=a.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}s(e,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{sma:s,stochastic:a}=t.seriesTypes,{extend:o,merge:i}=e;class r extends a{getValues(t,e){let a=e.periods,o=super.getValues.call(this,t,e),i={values:[],xData:[],yData:[]};if(!o)return;i.xData=o.xData.slice(a[1]-1);let r=o.yData.slice(a[1]-1),n=s.prototype.getValues.call(this,{xData:i.xData,yData:r},{index:1,period:a[2]});if(n){for(let t=0,e=i.xData.length;t<e;t++)i.yData[t]=[r[t][1],n.yData[t-a[2]+1]||null],i.values[t]=[i.xData[t],r[t][1],n.yData[t-a[2]+1]||null];return i}}}return r.defaultOptions=i(a.defaultOptions,{params:{periods:[14,3,3]}}),o(r.prototype,{nameBase:"Slow Stochastic"}),t.registerSeriesType("slowstochastic",r),r}),s(e,"masters/indicators/slow-stochastic.src.js",[e["Core/Globals.js"]],function(t){return t})});