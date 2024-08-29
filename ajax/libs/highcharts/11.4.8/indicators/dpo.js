!/**
 * Highstock JS v11.4.8 (2024-08-29)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(t,s,o,i){t.hasOwnProperty(s)||(t[s]=i.apply(null,o),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:s,module:t[s]}})))}s(t,"Stock/Indicators/DPO/DPOIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:s}=e.seriesTypes,{extend:o,merge:i,correctFloat:n,pick:r}=t;function a(e,t,s,o,i){let a=r(t[s][o],t[s]);return i?n(e-a):n(e+a)}class u extends s{getValues(e,t){let s=t.period,o=t.index,i=Math.floor(s/2+1),n=s+i,u=e.xData||[],d=e.yData||[],c=d.length,h=[],l=[],p=[],f,m,g,y,x,D=0;if(!(u.length<=n)){for(y=0;y<s-1;y++)D=a(D,d,y,o);for(x=0;x<=c-n;x++)m=x+s-1,g=x+n-1,D=a(D,d,m,o),f=r(d[g][o],d[g])-D/s,D=a(D,d,x,o,!0),h.push([u[g],f]),l.push(u[g]),p.push(f);return{values:h,xData:l,yData:p}}}}return u.defaultOptions=i(s.defaultOptions,{params:{index:0,period:21}}),o(u.prototype,{nameBase:"DPO"}),e.registerSeriesType("dpo",u),u}),s(t,"masters/indicators/dpo.src.js",[t["Core/Globals.js"]],function(e){return e})});