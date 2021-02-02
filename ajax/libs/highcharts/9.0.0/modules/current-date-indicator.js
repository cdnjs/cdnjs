/*
 Highcharts Gantt JS v9.0.0 (2021-02-02)

 CurrentDateIndicator

 (c) 2010-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/current-date-indicator",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,c,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,c))}a=a?a._modules:{};b(a,"Extensions/CurrentDateIndication.js",[a["Core/Axis/Axis.js"],a["Core/Color/Palette.js"],a["Core/Utilities.js"],
a["Core/Axis/PlotLineOrBand.js"]],function(a,b,c,d){var e=c.addEvent,f=c.merge;c=c.wrap;var g={currentDateIndicator:!0,color:b.highlightColor20,width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:function(a,b){return this.axis.chart.time.dateFormat(b,a)},rotation:0,style:{fontSize:"10px"}}};e(a,"afterSetOptions",function(){var a=this.options,b=a.currentDateIndicator;b&&(b="object"===typeof b?f(g,b):f(g),b.value=new Date,a.plotLines||(a.plotLines=[]),a.plotLines.push(b))});e(d,"render",function(){this.label&&
this.label.attr({text:this.getLabelText(this.options.label)})});c(d.prototype,"getLabelText",function(a,b){var c=this.options;return c.currentDateIndicator&&c.label&&"function"===typeof c.label.formatter?(c.value=new Date,c.label.formatter.call(this,c.value,c.label.format)):a.call(this,b)})});b(a,"masters/modules/current-date-indicator.src.js",[],function(){})});
//# sourceMappingURL=current-date-indicator.js.map