/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,c,f){a.hasOwnProperty(d)||(a[d]=f.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,
f,b,h,k){if(a)return h?h(a):!0;d(k||this.generateMessage(b,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/TRIX/TRIXIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var f=this&&this.__extends||function(){var a=function(b,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,b){a.__proto__=b}||function(a,b){for(var e in b)b.hasOwnProperty(e)&&(a[e]=b[e])};return a(b,e)};return function(b,e){function d(){this.constructor=b}a(b,e);b.prototype=null===e?Object.create(e):(d.prototype=e.prototype,new d)}}(),d=b.seriesTypes.tema,h=c.correctFloat,k=c.merge;c=function(c){function g(){var a=null!==c&&c.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}f(g,c);g.prototype.init=function(){var e=arguments,c=this;a.isParentLoaded(b.seriesTypes.tema,
"tema",c.type,function(a){a.prototype.init.apply(c,e)})};g.prototype.getTemaPoint=function(a,b,c,d){if(d>b)return[a[d-3],0!==c.prevLevel3?h(c.level3-c.prevLevel3)/c.prevLevel3*100:null]};g.defaultOptions=k(d.defaultOptions);return g}(d);b.registerSeriesType("trix",c);"";return c});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map