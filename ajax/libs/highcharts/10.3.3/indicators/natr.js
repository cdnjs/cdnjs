/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,e,d,g){a.hasOwnProperty(e)||(a[e]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:a[e]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/NATR/NATRIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,e){var d=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),g=a.seriesTypes.atr,
h=e.merge;e=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}d(c,a);c.prototype.getValues=function(a,c){var b=g.prototype.getValues.apply(this,arguments),d=b.values.length,e=c.period-1,h=a.yData,f=0;if(b){for(;f<d;f++)b.yData[f]=b.values[f][1]/h[e][3]*100,b.values[f][1]=b.yData[f],e++;return b}};c.defaultOptions=h(g.defaultOptions,{tooltip:{valueSuffix:"%"}});return c}(g);a.registerSeriesType("natr",e);"";return e});d(a,
"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map