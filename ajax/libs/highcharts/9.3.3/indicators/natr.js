/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
'use strict';(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(a){b(a);b.Highcharts=a;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function a(b,e,a,d){b.hasOwnProperty(e)||(b[e]=d.apply(null,a))}b=b?b._modules:{};a(b,"Stock/Indicators/NATR/NATRIndicator.js",[b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],
function(b,a){var e=this&&this.__extends||function(){var b=function(a,c){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])};return b(a,c)};return function(a,c){function d(){this.constructor=a}b(a,c);a.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),d=b.seriesTypes.atr,g=a.merge;a=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.points=void 0;
a.options=void 0;return a}e(a,b);a.prototype.getValues=function(a,b){var c=d.prototype.getValues.apply(this,arguments),e=c.values.length,h=b.period-1,g=a.yData,f=0;if(c){for(;f<e;f++)c.yData[f]=c.values[f][1]/g[h][3]*100,c.values[f][1]=c.yData[f],h++;return c}};a.defaultOptions=g(d.defaultOptions,{tooltip:{valueSuffix:"%"}});return a}(d);b.registerSeriesType("natr",a);"";return a});a(b,"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map