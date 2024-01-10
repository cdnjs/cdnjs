/**
 * Highstock JS v11.3.0 (2024-01-10)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(e,t,s,i){e.hasOwnProperty(t)||(e[t]=i.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}s(t,"Stock/Indicators/NATR/NATRIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{atr:s}=e.seriesTypes,{merge:i}=t;class n extends s{getValues(e,t){let s=super.getValues.apply(this,arguments),i=s.values.length,n=e.yData,o=0,a=t.period-1;if(s){for(;o<i;o++)s.yData[o]=s.values[o][1]/n[a][3]*100,s.values[o][1]=s.yData[o],a++;return s}}}return n.defaultOptions=i(s.defaultOptions,{tooltip:{valueSuffix:"%"}}),e.registerSeriesType("natr",n),n}),s(t,"masters/indicators/natr.src.js",[],function(){})});