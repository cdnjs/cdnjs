/*
 Highcharts Gantt JS v9.1.1 (2021-06-03)

 CurrentDateIndicator

 (c) 2010-2021 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/current-date-indicator",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,e))}a=a?a._modules:{};b(a,"Extensions/CurrentDateIndication.js",[a["Core/Axis/Axis.js"],a["Core/Color/Palette.js"],a["Core/Axis/PlotLineOrBand.js"],
a["Core/Utilities.js"]],function(a,b,e,d){var f=d.addEvent,g=d.merge;d=d.wrap;var h={color:b.highlightColor20,width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:function(a,c){return this.axis.chart.time.dateFormat(c||"",a)},rotation:0,style:{fontSize:"10px"}}};f(a,"afterSetOptions",function(){var a=this.options,c=a.currentDateIndicator;c&&(c="object"===typeof c?g(h,c):g(h),c.value=Date.now(),c.className="highcharts-current-date-indicator",a.plotLines||(a.plotLines=[]),a.plotLines.push(c))});f(e,
"render",function(){this.label&&this.label.attr({text:this.getLabelText(this.options.label)})});d(e.prototype,"getLabelText",function(a,c){var b=this.options;return b&&b.className&&-1!==b.className.indexOf("highcharts-current-date-indicator")&&b.label&&"function"===typeof b.label.formatter?(b.value=Date.now(),b.label.formatter.call(this,b.value,b.label.format)):a.call(this,c)})});b(a,"masters/modules/current-date-indicator.src.js",[],function(){})});
//# sourceMappingURL=current-date-indicator.js.map