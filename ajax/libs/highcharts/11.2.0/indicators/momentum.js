/**
 * Highstock JS v11.2.0 (2023-10-30)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2021 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */!function(t){"object"==typeof module&&module.exports?(t.default=t,module.exports=t):"function"==typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(e){return t(e),t.Highcharts=e,t}):t("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(t){"use strict";var e=t?t._modules:{};function s(t,e,s,o){t.hasOwnProperty(e)||(t[e]=o.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:t[e]}})))}s(e,"Stock/Indicators/Momentum/MomentumIndicator.js",[e["Core/Series/SeriesRegistry.js"],e["Core/Utilities.js"]],function(t,e){let{sma:s}=t.seriesTypes,{extend:o,isArray:n,merge:i}=e;function u(t,e,s,o,n){let i=e[s-1][n]-e[s-o-1][n],u=t[s-1];return[u,i]}class r extends s{constructor(){super(...arguments),this.data=void 0,this.options=void 0,this.points=void 0}getValues(t,e){let s,o;let i=e.period,r=e.index,a=t.xData,d=t.yData,h=d?d.length:0,c=[],m=[],p=[];if(!(a.length<=i)&&n(d[0])){for(s=i+1;s<h;s++)o=u(a,d,s,i,r),c.push(o),m.push(o[0]),p.push(o[1]);return o=u(a,d,s,i,r),c.push(o),m.push(o[0]),p.push(o[1]),{values:c,xData:m,yData:p}}}}return r.defaultOptions=i(s.defaultOptions,{params:{index:3}}),o(r.prototype,{nameBase:"Momentum"}),t.registerSeriesType("momentum",r),r}),s(e,"masters/indicators/momentum.src.js",[],function(){})});//# sourceMappingURL=momentum.js.map