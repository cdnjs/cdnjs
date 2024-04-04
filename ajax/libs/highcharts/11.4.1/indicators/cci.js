!/**
 * Highstock JS v11.4.1 (2024-04-04)
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(t){return e(t),e.Highcharts=t,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var t=e?e._modules:{};function s(e,t,s,i){e.hasOwnProperty(t)||(e[t]=i.apply(null,s),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:e[t]}})))}s(t,"Stock/Indicators/CCI/CCIIndicator.js",[t["Core/Series/SeriesRegistry.js"],t["Core/Utilities.js"]],function(e,t){let{sma:s}=e.seriesTypes,{isArray:i,merge:n}=t;class o extends s{getValues(e,t){let s=t.period,n=e.xData,o=e.yData,r=o?o.length:0,a=[],u=[],c=[],d=[],h,l,f=[],p,g=1,m,y,C,v;if(!(n.length<=s)&&i(o[0])&&4===o[0].length){for(;g<s;)l=o[g-1],a.push((l[1]+l[2]+l[3])/3),g++;for(v=s;v<=r;v++)y=((l=o[v-1])[1]+l[2]+l[3])/3,p=a.push(y),m=(f=a.slice(p-s)).reduce(function(e,t){return e+t},0)/s,C=function(e,t){let s=e.length,i=0,n;for(n=0;n<s;n++)i+=Math.abs(t-e[n]);return i}(f,m)/s,h=(y-m)/(.015*C),u.push([n[v-1],h]),c.push(n[v-1]),d.push(h);return{values:u,xData:c,yData:d}}}}return o.defaultOptions=n(s.defaultOptions,{params:{index:void 0}}),e.registerSeriesType("cci",o),o}),s(t,"masters/indicators/cci.src.js",[t["Core/Globals.js"]],function(e){return e})});