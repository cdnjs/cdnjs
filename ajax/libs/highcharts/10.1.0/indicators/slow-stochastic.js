/*
 Highstock JS v10.1.0 (2022-04-29)

 Slow Stochastic series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(b,c)};return function(b,c){function e(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(e.prototype=c.prototype,
new e)}}(),f=a.seriesTypes.stochastic,g=a.seriesTypes,h=b.extend,k=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.periods,d=g.stochastic.prototype.getValues.call(this,a,b);a={values:[],xData:[],yData:[]};b=0;if(d){a.xData=d.xData.slice(c[1]-1);d=d.yData.slice(c[1]-1);var e=g.sma.prototype.getValues.call(this,{xData:a.xData,yData:d},{index:1,period:c[2]});if(e){for(var f=
a.xData.length;b<f;b++)a.yData[b]=[d[b][1],e.yData[b-c[2]+1]||null],a.values[b]=[a.xData[b],d[b][1],e.yData[b-c[2]+1]||null];return a}}};b.defaultOptions=k(f.defaultOptions,{params:{periods:[14,3,3]}});return b}(f);h(b.prototype,{nameBase:"Slow Stochastic"});a.registerSeriesType("slowstochastic",b);"";return b});d(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map