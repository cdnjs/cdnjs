!/**
 * Highstock JS v11.4.4 (2024-07-02)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function o(t,o,s,n){t.hasOwnProperty(o)||(t[o]=n.apply(null,s),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:t[o]}})))}o(t,"Stock/Indicators/DPO/DPOIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:o}=e.seriesTypes,{extend:s,merge:n,correctFloat:i,pick:r}=t;function a(e,t,o,s,n){let a=r(t[o][s],t[o]);return n?i(e-a):i(e+a)}class u extends o{getValues(e,t){let o=t.period,s=t.index,n=Math.floor(o/2+1),i=o+n,u=e.xData||[],d=e.yData||[],c=d.length,l=[],p=[],f=[],h,m,y,g,x,D=0;if(!(u.length<=i)){for(g=0;g<o-1;g++)D=a(D,d,g,s);for(x=0;x<=c-i;x++)m=x+o-1,y=x+i-1,D=a(D,d,m,s),h=r(d[y][s],d[y])-D/o,D=a(D,d,x,s,!0),l.push([u[y],h]),p.push(u[y]),f.push(h);return{values:l,xData:p,yData:f}}}}return u.defaultOptions=n(o.defaultOptions,{params:{index:0,period:21}}),s(u.prototype,{nameBase:"DPO"}),e.registerSeriesType("dpo",u),u}),o(t,"masters/indicators/dpo.src.js",[t["Core/Globals.js"]],function(e){return e})});