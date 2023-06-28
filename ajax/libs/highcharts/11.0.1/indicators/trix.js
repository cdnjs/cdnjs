/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,c,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,
module:a[b]}})))}a=a?a._modules:{};c(a,"Stock/Indicators/TRIX/TRIXIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){const {tema:b}=a.seriesTypes,{correctFloat:e,merge:f}=c;class d extends b{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getTemaPoint(a,c,b,d){if(d>c)return[a[d-3],0!==b.prevLevel3?e(b.level3-b.prevLevel3)/b.prevLevel3*100:null]}}d.defaultOptions=f(b.defaultOptions);a.registerSeriesType("trix",d);"";return d});c(a,"masters/indicators/trix.src.js",
[],function(){})});
//# sourceMappingURL=trix.js.map