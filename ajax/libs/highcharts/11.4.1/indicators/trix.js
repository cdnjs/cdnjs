!/**
 * Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function i(e,t,i,s){e.hasOwnProperty(t)||(e[t]=s.apply(null,i),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}i(t,"Stock/Indicators/TRIX/TRIXIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{tema:i}=e.seriesTypes,{correctFloat:s,merge:r}=t;class n extends i{getTemaPoint(e,t,i,r){if(r>t)return[e[r-3],0!==i.prevLevel3?s(i.level3-i.prevLevel3)/i.prevLevel3*100:null]}}return n.defaultOptions=r(i.defaultOptions),e.registerSeriesType("trix",n),n}),i(t,"masters/indicators/trix.src.js",[t["Core/Globals.js"]],function(e){return e})});