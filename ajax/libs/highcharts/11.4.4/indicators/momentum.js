!/**
 * Highstock JS v11.4.4 (2024-07-02)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(t,s,n,o){t.hasOwnProperty(s)||(t[s]=o.apply(null,n),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:s,module:t[s]}})))}s(t,"Stock/Indicators/Momentum/MomentumIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:s}=e.seriesTypes,{extend:n,isArray:o,merge:i}=t;function u(e,t,s,n,o){let i=t[s-1][o]-t[s-n-1][o];return[e[s-1],i]}class r extends s{getValues(e,t){let s,n;let i=t.period,r=t.index,a=e.xData,d=e.yData,m=d?d.length:0,c=[],l=[],h=[];if(!(a.length<=i)&&o(d[0])){for(s=i+1;s<m;s++)n=u(a,d,s,i,r),c.push(n),l.push(n[0]),h.push(n[1]);return n=u(a,d,s,i,r),c.push(n),l.push(n[0]),h.push(n[1]),{values:c,xData:l,yData:h}}}}return r.defaultOptions=i(s.defaultOptions,{params:{index:3}}),n(r.prototype,{nameBase:"Momentum"}),e.registerSeriesType("momentum",r),r}),s(t,"masters/indicators/momentum.src.js",[t["Core/Globals.js"]],function(e){return e})});