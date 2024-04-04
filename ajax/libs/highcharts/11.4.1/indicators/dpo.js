!/**
 * Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function o(e,t,o,s){e.hasOwnProperty(t)||(e[t]=s.apply(null,o),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}o(t,"Stock/Indicators/DPO/DPOIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:o}=e.seriesTypes,{extend:s,merge:i,correctFloat:n,pick:r}=t;function a(e,t,o,s,i){let a=r(t[o][s],t[o]);return i?n(e-a):n(e+a)}class d extends o{getValues(e,t){let o=t.period,s=t.index,i=o+Math.floor(o/2+1),n=e.xData||[],d=e.yData||[],u=d.length,c=[],h=[],l=[],p,f,m,g,y,x=0;if(!(n.length<=i)){for(g=0;g<o-1;g++)x=a(x,d,g,s);for(y=0;y<=u-i;y++)f=y+o-1,m=y+i-1,x=a(x,d,f,s),p=r(d[m][s],d[m])-x/o,x=a(x,d,y,s,!0),c.push([n[m],p]),h.push(n[m]),l.push(p);return{values:c,xData:h,yData:l}}}}return d.defaultOptions=i(o.defaultOptions,{params:{index:0,period:21}}),s(d.prototype,{nameBase:"DPO"}),e.registerSeriesType("dpo",d),d}),o(t,"masters/indicators/dpo.src.js",[t["Core/Globals.js"]],function(e){return e})});