/*
 Highcharts Gantt JS v8.0.0 (2019-12-10)

 CurrentDateIndicator

 (c) 2010-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/current-date-indicator",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,b))}a=a?a._modules:{};b(a,"parts-gantt/CurrentDateIndicator.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){b=b.wrap;var d=
a.addEvent,e=a.PlotLineOrBand,f=a.merge,g={currentDateIndicator:!0,color:"#ccd6eb",width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:function(b,h){return a.dateFormat(h,b)},rotation:0,style:{fontSize:"10px"}}};d(a.Axis,"afterSetOptions",function(){var a=this.options,b=a.currentDateIndicator;b&&(b="object"===typeof b?f(g,b):f(g),b.value=new Date,a.plotLines||(a.plotLines=[]),a.plotLines.push(b))});d(e,"render",function(){this.label&&this.label.attr({text:this.getLabelText(this.options.label)})});
b(e.prototype,"getLabelText",function(a,b){var c=this.options;return c.currentDateIndicator&&c.label&&"function"===typeof c.label.formatter?(c.value=new Date,c.label.formatter.call(this,c.value,c.label.format)):a.call(this,b)})});b(a,"masters/modules/current-date-indicator.src.js",[],function(){})});
//# sourceMappingURL=current-date-indicator.js.map