/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trix",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,d,e){a.hasOwnProperty(c)||(a[c]=e.apply(null,d))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var c=a.error;return{isParentLoaded:function(a,
e,b,f,g){if(a)return f?f(a):!0;c(g||this.generateMessage(b,e));return!1},generateMessage:function(a,c){return'Error: "'+a+'" indicator type requires "'+c+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/trix.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,c,b){var e=c.correctFloat;c=c.seriesType;var d=a.seriesTypes.tema;c("trix","tema",{},{init:function(){var a=arguments,c=this;
b.isParentLoaded(d,"tema",c.type,function(b){b.prototype.init.apply(c,a)})},getTemaPoint:function(a,c,b,d){if(d>c)var f=[a[d-3],0!==b.prevLevel3?e(b.level3-b.prevLevel3)/b.prevLevel3*100:null];return f}});""});b(a,"masters/indicators/trix.src.js",[],function(){})});
//# sourceMappingURL=trix.js.map