/**
 * Highstock JS v11.3.0 (2024-01-10)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(e,t,s,n){e.hasOwnProperty(t)||(e[t]=n.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}s(t,"Stock/Indicators/Momentum/MomentumIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:s}=e.seriesTypes,{extend:n,isArray:o,merge:i}=t;function u(e,t,s,n,o){let i=t[s-1][o]-t[s-n-1][o],u=e[s-1];return[u,i]}class r extends s{getValues(e,t){let s,n;let i=t.period,r=t.index,a=e.xData,d=e.yData,h=d?d.length:0,m=[],c=[],p=[];if(!(a.length<=i)&&o(d[0])){for(s=i+1;s<h;s++)n=u(a,d,s,i,r),m.push(n),c.push(n[0]),p.push(n[1]);return n=u(a,d,s,i,r),m.push(n),c.push(n[0]),p.push(n[1]),{values:m,xData:c,yData:p}}}}return r.defaultOptions=i(s.defaultOptions,{params:{index:3}}),n(r.prototype,{nameBase:"Momentum"}),e.registerSeriesType("momentum",r),r}),s(t,"masters/indicators/momentum.src.js",[],function(){})});