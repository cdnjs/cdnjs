/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/wma",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,l){a.hasOwnProperty(f)||(a[f]=l.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/WMA/WMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){function f(a,c){c*=(c+1)/2;return a.reduce(function(a,q,c){return[null,a[1]+q[1]*(c+1)]})[1]/c}function l(a,c,e,b){e=f(a,a.length);c=c[b-1];a.shift();return[c,e]}const {sma:h}=a.seriesTypes,{isArray:r,merge:t}=b;class k extends h{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(a,c){var e=c.period;const b=a.xData,
f=(a=a.yData)?a.length:0,k=b[0],m=[],n=[],p=[];var d=1;let g=-1,h=a[0];if(!(b.length<e)){r(a[0])&&(g=c.index,h=a[0][g]);for(c=[[k,h]];d!==e;)c.push([b[d],0>g?a[d]:a[d][g]]),d++;for(e=d;e<f;e++)d=l(c,b,a,e),m.push(d),n.push(d[0]),p.push(d[1]),c.push([b[e],0>g?a[e]:a[e][g]]);d=l(c,b,a,e);m.push(d);n.push(d[0]);p.push(d[1]);return{values:m,xData:n,yData:p}}}}k.defaultOptions=t(h.defaultOptions,{params:{index:3,period:9}});a.registerSeriesType("wma",k);"";return k});b(a,"masters/indicators/wma.src.js",
[],function(){})});
//# sourceMappingURL=wma.js.map