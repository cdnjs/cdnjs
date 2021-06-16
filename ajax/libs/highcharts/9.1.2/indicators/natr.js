/*
 Highstock JS v9.1.2 (2021-06-16)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(a){b(a);b.Highcharts=a;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function a(b,e,a,d){b.hasOwnProperty(e)||(b[e]=d.apply(null,a))}b=b?b._modules:{};a(b,"Stock/Indicators/NATR/NATRIndicator.js",[b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],
function(b,a){var e=this&&this.__extends||function(){var b=function(a,c){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])};return b(a,c)};return function(a,c){function d(){this.constructor=a}b(a,c);a.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),d=b.seriesTypes.atr,h=a.merge;a=a.extend;var g=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;
a.points=void 0;a.options=void 0;return a}e(a,b);a.prototype.getValues=function(a,b){var c=d.prototype.getValues.apply(this,arguments),e=c.values.length,g=b.period-1,h=a.yData,f=0;if(c){for(;f<e;f++)c.yData[f]=c.values[f][1]/h[g][3]*100,c.values[f][1]=c.yData[f],g++;return c}};a.defaultOptions=h(d.defaultOptions,{tooltip:{valueSuffix:"%"}});return a}(d);a(g.prototype,{requiredIndicators:["atr"]});b.registerSeriesType("natr",g);"";return g});a(b,"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map