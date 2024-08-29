!/**
 * Highstock JS v11.4.8 (2024-08-29)
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(e,s,a,i){e.hasOwnProperty(s)||(e[s]=i.apply(null,a),"function"==typeof CustomEvent&&t.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:s,module:e[s]}})))}s(e,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{sma:s,stochastic:a}=t.seriesTypes,{extend:i,merge:o}=e;class r extends a{getValues(t,e){let a=e.periods,i=super.getValues.call(this,t,e),o={values:[],xData:[],yData:[]};if(!i)return;o.xData=i.xData.slice(a[1]-1);let r=i.yData.slice(a[1]-1),n=s.prototype.getValues.call(this,{xData:o.xData,yData:r},{index:1,period:a[2]});if(n){for(let t=0,e=o.xData.length;t<e;t++)o.yData[t]=[r[t][1],n.yData[t-a[2]+1]||null],o.values[t]=[o.xData[t],r[t][1],n.yData[t-a[2]+1]||null];return o}}}return r.defaultOptions=o(a.defaultOptions,{params:{periods:[14,3,3]}}),i(r.prototype,{nameBase:"Slow Stochastic"}),t.registerSeriesType("slowstochastic",r),r}),s(e,"masters/indicators/slow-stochastic.src.js",[e["Core/Globals.js"]],function(t){return t})});