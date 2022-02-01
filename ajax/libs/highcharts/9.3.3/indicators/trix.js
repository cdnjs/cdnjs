/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,b,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,b))}a=a?a._modules:{};b(a,"Stock/Indicators/TRIX/TRIXIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,e){var b=this&&this.__extends||function(){var a=function(d,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])};return a(d,c)};return function(d,c){function b(){this.constructor=d}a(d,c);d.prototype=null===c?Object.create(c):(b.prototype=c.prototype,new b)}}(),f=a.seriesTypes.tema,g=e.correctFloat,h=e.merge;e=function(a){function d(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;
c.options=void 0;c.points=void 0;return c}b(d,a);d.prototype.getTemaPoint=function(a,d,b,e){if(e>d)return[a[e-3],0!==b.prevLevel3?g(b.level3-b.prevLevel3)/b.prevLevel3*100:null]};d.defaultOptions=h(f.defaultOptions);return d}(f);a.registerSeriesType("trix",e);"";return e});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map