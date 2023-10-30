/**
 * Highstock JS v11.2.0 (2023-10-30)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(t,e,s,i){t.hasOwnProperty(e)||(t[e]=i.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}s(e,"Stock/Indicators/NATR/NATRIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{atr:s}=t.seriesTypes,{merge:i}=e;class o extends s{constructor(){super(...arguments),this.data=void 0,this.points=void 0,this.options=void 0}getValues(t,e){let s=super.getValues.apply(this,arguments),i=s.values.length,o=t.yData,n=0,r=e.period-1;if(s){for(;n<i;n++)s.yData[n]=s.values[n][1]/o[r][3]*100,s.values[n][1]=s.yData[n],r++;return s}}}return o.defaultOptions=i(s.defaultOptions,{tooltip:{valueSuffix:"%"}}),t.registerSeriesType("natr",o),o}),s(e,"masters/indicators/natr.src.js",[],function(){})});//# sourceMappingURL=natr.js.map