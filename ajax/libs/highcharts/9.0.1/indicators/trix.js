/*
 Highstock JS v9.0.1 (2021-02-15)

 Indicator series type for Highstock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,c,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var e=a.error;return{isParentLoaded:function(a,
f,b,h,k){if(a)return h?h(a):!0;e(k||this.generateMessage(b,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/TRIX/TRIXIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var f=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return a(b,d)};return function(b,d){function e(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(e.prototype=d.prototype,new e)}}(),e=b.seriesTypes.tema,h=c.correctFloat,k=c.merge;c=function(c){function g(){var a=null!==c&&c.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}f(g,c);g.prototype.init=function(){var d=arguments,c=this;a.isParentLoaded(b.seriesTypes.tema,
"tema",c.type,function(a){a.prototype.init.apply(c,d)})};g.prototype.getTemaPoint=function(a,b,c,e){if(e>b)var d=[a[e-3],0!==c.prevLevel3?h(c.level3-c.prevLevel3)/c.prevLevel3*100:null];return d};g.defaultOptions=k(e.defaultOptions);return g}(e);b.registerSeriesType("trix",c);"";return c});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map