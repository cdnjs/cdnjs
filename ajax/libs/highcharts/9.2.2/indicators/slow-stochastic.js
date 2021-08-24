/*
 Highstock JS v9.2.2 (2021-08-24)

 Slow Stochastic series type for Highcharts Stock

 (c) 2010-2021 Pawel Fus

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,c,h){a.hasOwnProperty(f)||(a[f]=h.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var f=a.error;
return{isParentLoaded:function(a,h,b,g,k){if(a)return g?g(a):!0;f(k||this.generateMessage(b,h));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var h=this&&this.__extends||function(){var a=
function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var e in d)d.hasOwnProperty(e)&&(a[e]=d[e])};return a(b,d)};return function(b,d){function e(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(e.prototype=d.prototype,new e)}}(),f=b.seriesTypes.stochastic,g=b.seriesTypes,k=c.extend,l=c.merge;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}
h(c,b);c.prototype.init=function(){var b=arguments,e=this;a.isParentLoaded(g.stochastic,"stochastic",e.type,function(a){a.prototype.init.apply(e,b)})};c.prototype.getValues=function(a,b){var c=b.periods,d=g.stochastic.prototype.getValues.call(this,a,b);a={values:[],xData:[],yData:[]};b=0;if(d){a.xData=d.xData.slice(c[1]-1);d=d.yData.slice(c[1]-1);var e=g.sma.prototype.getValues.call(this,{xData:a.xData,yData:d},{index:1,period:c[2]});if(e){for(var f=a.xData.length;b<f;b++)a.yData[b]=[d[b][1],e.yData[b-
c[2]+1]||null],a.values[b]=[a.xData[b],d[b][1],e.yData[b-c[2]+1]||null];return a}}};c.defaultOptions=l(f.defaultOptions,{params:{periods:[14,3,3]}});return c}(f);k(c.prototype,{nameBase:"Slow Stochastic"});b.registerSeriesType("slowstochastic",c);"";return c});b(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map