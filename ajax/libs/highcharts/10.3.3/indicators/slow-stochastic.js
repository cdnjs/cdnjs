/*
 Highstock JS v10.3.3 (2023-01-20)

 Slow Stochastic series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var f in c)c.hasOwnProperty(f)&&(a[f]=c[f])};return a(b,c)};return function(b,c){function f(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(f.prototype=c.prototype,
new f)}}(),e=a.seriesTypes,k=e.sma.prototype,h=e.stochastic;e=b.extend;var l=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(c,b){var d=b.periods,g=a.prototype.getValues.call(this,c,b);c={values:[],xData:[],yData:[]};b=0;if(g){c.xData=g.xData.slice(d[1]-1);g=g.yData.slice(d[1]-1);var e=k.getValues.call(this,{xData:c.xData,yData:g},{index:1,period:d[2]});if(e){for(var f=c.xData.length;b<
f;b++)c.yData[b]=[g[b][1],e.yData[b-d[2]+1]||null],c.values[b]=[c.xData[b],g[b][1],e.yData[b-d[2]+1]||null];return c}}};b.defaultOptions=l(h.defaultOptions,{params:{periods:[14,3,3]}});return b}(h);e(b.prototype,{nameBase:"Slow Stochastic"});a.registerSeriesType("slowstochastic",b);"";return b});d(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map