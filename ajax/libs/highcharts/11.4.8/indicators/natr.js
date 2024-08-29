!/**
 * Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(t,s,i,r){t.hasOwnProperty(s)||(t[s]=r.apply(null,i),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:s,module:t[s]}})))}s(t,"Stock/Indicators/NATR/NATRIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{atr:s}=e.seriesTypes,{merge:i}=t;class r extends s{getValues(e,t){let s=super.getValues.apply(this,arguments),i=s.values.length,r=e.yData,n=0,o=t.period-1;if(s){for(;n<i;n++)s.yData[n]=s.values[n][1]/r[o][3]*100,s.values[n][1]=s.yData[n],o++;return s}}}return r.defaultOptions=i(s.defaultOptions,{tooltip:{valueSuffix:"%"}}),e.registerSeriesType("natr",r),r}),s(t,"masters/indicators/natr.src.js",[t["Core/Globals.js"]],function(e){return e})});