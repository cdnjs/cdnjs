/**
 * Highstock JS v11.2.0 (2023-10-30)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Kacper Madej
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(t,e,s,o){t.hasOwnProperty(e)||(t[e]=o.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}s(e,"Stock/Indicators/ROC/ROCIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{sma:s}=t.seriesTypes,{isArray:o,merge:i,extend:n}=e;class r extends s{constructor(){super(...arguments),this.data=void 0,this.options=void 0,this.points=void 0}getValues(t,e){let s=e.period,i=t.xData,n=t.yData,r=n?n.length:0,a=[],u=[],d=[],c,h=-1,l;if(!(i.length<=s)){for(o(n[0])&&(h=e.index),c=s;c<r;c++)l=function(t,e,s,o,i){let n,r;return r=i<0?(n=e[s-o])?(e[s]-n)/n*100:null:(n=e[s-o][i])?(e[s][i]-n)/n*100:null,[t[s],r]}(i,n,c,s,h),a.push(l),u.push(l[0]),d.push(l[1]);return{values:a,xData:u,yData:d}}}}return r.defaultOptions=i(s.defaultOptions,{params:{index:3,period:9}}),n(r.prototype,{nameBase:"Rate of Change"}),t.registerSeriesType("roc",r),r}),s(e,"masters/indicators/roc.src.js",[],function(){})});//# sourceMappingURL=roc.js.map