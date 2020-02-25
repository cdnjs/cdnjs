/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,c,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,c))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
e,f,g,h){if(a)return g?g(a):!0;b(h||this.generateMessage(f,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/trix.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,c){var e=b.correctFloat,f=a.seriesTypes.tema;a.seriesType("trix","tema",{},{init:function(){var a=arguments,b=this;c.isParentLoaded(f,
"tema",b.type,function(d){d.prototype.init.apply(b,a)})},getTemaPoint:function(a,b,d,c){if(c>b)var f=[a[c-3],0!==d.prevLevel3?e(d.level3-d.prevLevel3)/d.prevLevel3*100:null];return f}});""});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map