!/**
 * Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(e,t,s,i){e.hasOwnProperty(t)||(e[t]=i.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}s(t,"Stock/Indicators/NATR/NATRIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{atr:s}=e.seriesTypes,{merge:i}=t;class o extends s{getValues(e,t){let s=super.getValues.apply(this,arguments),i=s.values.length,o=e.yData,r=0,n=t.period-1;if(s){for(;r<i;r++)s.yData[r]=s.values[r][1]/o[n][3]*100,s.values[r][1]=s.yData[r],n++;return s}}}return o.defaultOptions=i(s.defaultOptions,{tooltip:{valueSuffix:"%"}}),e.registerSeriesType("natr",o),o}),s(t,"masters/indicators/natr.src.js",[t["Core/Globals.js"]],function(e){return e})});