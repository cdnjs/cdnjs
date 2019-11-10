/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,f))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
c,g,d,e){if(a)return d?d(a):!0;b(e||this.generateMessage(g,c));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/trix.src.js",[a["parts/Globals.js"],a["mixins/indicator-required.js"]],function(a,b){var f=a.correctFloat,c=a.seriesTypes.tema;a.seriesType("trix","tema",{},{init:function(){var a=arguments,d=this;b.isParentLoaded(c,"tema",d.type,
function(b){b.prototype.init.apply(d,a)})},getPoint:function(a,b,e,c){if(c>b)var d=[a[c-3],0!==e.prevLevel3?f(e.level3-e.prevLevel3)/e.prevLevel3*100:null];return d}})});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map