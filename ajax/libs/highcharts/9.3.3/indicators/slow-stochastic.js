/*
 Highstock JS v9.3.3 (2022-02-01)

 Slow Stochastic series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,f,e,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,e))}a=a?a._modules:{};e(a,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,f){var e=this&&this.__extends||function(){var a=function(d,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(d,b)};return function(d,b){function c(){this.constructor=d}a(d,b);d.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),g=a.seriesTypes.stochastic,h=a.seriesTypes,k=f.extend,l=f.merge;f=function(a){function d(){var b=null!==a&&
a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}e(d,a);d.prototype.getValues=function(a,c){var b=c.periods,d=h.stochastic.prototype.getValues.call(this,a,c);a={values:[],xData:[],yData:[]};c=0;if(d){a.xData=d.xData.slice(b[1]-1);d=d.yData.slice(b[1]-1);var e=h.sma.prototype.getValues.call(this,{xData:a.xData,yData:d},{index:1,period:b[2]});if(e){for(var f=a.xData.length;c<f;c++)a.yData[c]=[d[c][1],e.yData[c-b[2]+1]||null],a.values[c]=[a.xData[c],d[c][1],e.yData[c-
b[2]+1]||null];return a}}};d.defaultOptions=l(g.defaultOptions,{params:{periods:[14,3,3]}});return d}(g);k(f.prototype,{nameBase:"Slow Stochastic"});a.registerSeriesType("slowstochastic",f);"";return f});e(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map