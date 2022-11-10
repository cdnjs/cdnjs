/*
 Highstock JS v10.3.1 (2022-10-31)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/RSI/RSIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var g in c)c.hasOwnProperty(g)&&(a[g]=c[g])};return a(b,c)};return function(b,c){function g(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(g.prototype=c.prototype,new g)}}(),h=a.seriesTypes.sma,
t=b.isNumber,u=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.points=void 0;c.options=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.period,d=a.xData,e=a.yData;a=e?e.length:0;var k=b.decimals,f=1,g=[],h=[],r=[],q=b.index,m=b=0,n;if(!(d.length<c)){if(t(e[0]))var p=e;else q=Math.min(q,e[0].length-1),p=e.map(function(a){return a[q]});for(;f<c;){var l=parseFloat((p[f]-p[f-1]).toFixed(k));0<l?b+=l:m+=Math.abs(l);f++}e=parseFloat((b/
(c-1)).toFixed(k));for(n=parseFloat((m/(c-1)).toFixed(k));f<a;f++)l=parseFloat((p[f]-p[f-1]).toFixed(k)),0<l?(b=l,m=0):(b=0,m=Math.abs(l)),e=parseFloat(((e*(c-1)+b)/c).toFixed(k)),n=parseFloat(((n*(c-1)+m)/c).toFixed(k)),b=0===n?100:0===e?0:parseFloat((100-100/(1+e/n)).toFixed(k)),g.push([d[f],b]),h.push(d[f]),r.push(b);return{values:g,xData:h,yData:r}}};b.defaultOptions=u(h.defaultOptions,{params:{decimals:4,index:3}});return b}(h);a.registerSeriesType("rsi",b);"";return b});d(a,"masters/indicators/rsi.src.js",
[],function(){})});
//# sourceMappingURL=rsi.js.map