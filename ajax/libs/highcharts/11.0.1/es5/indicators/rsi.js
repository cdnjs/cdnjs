/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Fus

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,
module:a[b]}})))}a=a?a._modules:{};d(a,"Stock/Indicators/RSI/RSIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)Object.prototype.hasOwnProperty.call(c,b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function m(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(m.prototype=c.prototype,new m)}}(),h=a.seriesTypes.sma,t=b.isNumber,u=b.merge;b=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}d(b,a);b.prototype.getValues=function(a,b){var c=b.period,d=a.xData,e=a.yData;a=e?e.length:0;var k=b.decimals,h=[],m=[],r=[],g=0,n=0,q=b.index,f=1;if(!(d.length<c)){if(t(e[0]))var p=e;else q=Math.min(q,e[0].length-
1),p=e.map(function(a){return a[q]});for(;f<c;){var l=parseFloat((p[f]-p[f-1]).toFixed(k));0<l?g+=l:n+=Math.abs(l);f++}b=parseFloat((g/(c-1)).toFixed(k));for(e=parseFloat((n/(c-1)).toFixed(k));f<a;f++)l=parseFloat((p[f]-p[f-1]).toFixed(k)),0<l?(g=l,n=0):(g=0,n=Math.abs(l)),b=parseFloat(((b*(c-1)+g)/c).toFixed(k)),e=parseFloat(((e*(c-1)+n)/c).toFixed(k)),g=0===e?100:0===b?0:parseFloat((100-100/(1+b/e)).toFixed(k)),h.push([d[f],g]),m.push(d[f]),r.push(g);return{values:h,xData:m,yData:r}}};b.defaultOptions=
u(h.defaultOptions,{params:{decimals:4,index:3}});return b}(h);a.registerSeriesType("rsi",b);"";return b});d(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map