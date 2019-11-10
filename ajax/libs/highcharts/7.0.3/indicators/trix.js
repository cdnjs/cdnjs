/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var f=function(a){var e=a.error;return{isParentLoaded:function(a,d,g,c,b){if(a)return c?c(a):!0;e(b||this.generateMessage(g,d));return!1},generateMessage:function(a,e){return'Error: "'+a+'" indicator type requires "'+e+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,f){var e=a.correctFloat,d=a.seriesTypes.tema;a.seriesType("trix","tema",{},{init:function(){var a=arguments,c=this;f.isParentLoaded(d,"tema",c.type,function(b){b.prototype.init.apply(c,a)})},getPoint:function(a,c,b,d){if(d>c)var f=[a[d-3],0!==b.prevLevel3?e(b.level3-b.prevLevel3)/b.prevLevel3*100:null];return f}})})(a,f)});
//# sourceMappingURL=trix.js.map