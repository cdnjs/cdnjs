!/**
 * Highstock JS v11.4.4 (2024-07-02)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(t,s,n,o){t.hasOwnProperty(s)||(t[s]=o.apply(null,n),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:s,module:t[s]}})))}s(t,"Stock/Indicators/ROC/ROCIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:s}=e.seriesTypes,{isArray:n,merge:o,extend:i}=t;class r extends s{getValues(e,t){let s=t.period,o=e.xData,i=e.yData,r=i?i.length:0,a=[],u=[],d=[],c,l=-1,f;if(!(o.length<=s)){for(n(i[0])&&(l=t.index),c=s;c<r;c++)f=function(e,t,s,n,o){let i,r;return r=o<0?(i=t[s-n])?(t[s]-i)/i*100:null:(i=t[s-n][o])?(t[s][o]-i)/i*100:null,[e[s],r]}(o,i,c,s,l),a.push(f),u.push(f[0]),d.push(f[1]);return{values:a,xData:u,yData:d}}}}return r.defaultOptions=o(s.defaultOptions,{params:{index:3,period:9}}),i(r.prototype,{nameBase:"Rate of Change"}),e.registerSeriesType("roc",r),r}),s(t,"masters/indicators/roc.src.js",[t["Core/Globals.js"]],function(e){return e})});