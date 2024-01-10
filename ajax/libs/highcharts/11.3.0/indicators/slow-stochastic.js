/**
 * Highstock JS v11.3.0 (2024-01-10)
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function a(t,e,a,s){t.hasOwnProperty(e)||(t[e]=s.apply(null,a),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}a(e,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{sma:a,stochastic:s}=t.seriesTypes,{extend:i,merge:o}=e;class n extends s{getValues(t,e){let s=e.periods,i=super.getValues.call(this,t,e),o={values:[],xData:[],yData:[]};if(!i)return;o.xData=i.xData.slice(s[1]-1);let n=i.yData.slice(s[1]-1),r=a.prototype.getValues.call(this,{xData:o.xData,yData:n},{index:1,period:s[2]});if(r){for(let t=0,e=o.xData.length;t<e;t++)o.yData[t]=[n[t][1],r.yData[t-s[2]+1]||null],o.values[t]=[o.xData[t],n[t][1],r.yData[t-s[2]+1]||null];return o}}}return n.defaultOptions=o(s.defaultOptions,{params:{periods:[14,3,3]}}),i(n.prototype,{nameBase:"Slow Stochastic"}),t.registerSeriesType("slowstochastic",n),n}),a(e,"masters/indicators/slow-stochastic.src.js",[],function(){})});