/*
 Highcharts Gantt JS v7.2.1 (2019-10-31)

 CurrentDateIndicator

 (c) 2010-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/current-date-indicator",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,d,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,d))}a=a?a._modules:{};b(a,"parts-gantt/CurrentDateIndicator.js",[a["parts/Globals.js"]],function(a){var b=a.addEvent,d=a.PlotLineOrBand,e=
a.merge,g=a.wrap,f={currentDateIndicator:!0,color:"#ccd6eb",width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:function(b,h){return a.dateFormat(h,b)},rotation:0,style:{fontSize:"10px"}}};b(a.Axis,"afterSetOptions",function(){var a=this.options,b=a.currentDateIndicator;b&&(b="object"===typeof b?e(f,b):e(f),b.value=new Date,a.plotLines||(a.plotLines=[]),a.plotLines.push(b))});b(d,"render",function(){this.label&&this.label.attr({text:this.getLabelText(this.options.label)})});g(d.prototype,"getLabelText",
function(a,b){var c=this.options;return c.currentDateIndicator&&c.label&&"function"===typeof c.label.formatter?(c.value=new Date,c.label.formatter.call(this,c.value,c.label.format)):a.call(this,b)})});b(a,"masters/modules/current-date-indicator.src.js",[],function(){})});
//# sourceMappingURL=current-date-indicator.js.map