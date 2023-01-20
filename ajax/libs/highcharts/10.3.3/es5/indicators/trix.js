/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,c,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};c(a,"Stock/Indicators/TRIX/TRIXIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var c=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)Object.prototype.hasOwnProperty.call(d,b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function c(){this.constructor=b}if("function"!==typeof d&&null!==d)throw new TypeError("Class extends value "+
String(d)+" is not a constructor or null");a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),e=a.seriesTypes.tema,f=b.correctFloat,g=b.merge;b=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}c(b,a);b.prototype.getTemaPoint=function(a,b,c,e){if(e>b)return[a[e-3],0!==c.prevLevel3?f(c.level3-c.prevLevel3)/c.prevLevel3*100:null]};b.defaultOptions=g(e.defaultOptions);return b}(e);a.registerSeriesType("trix",
b);"";return b});c(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map