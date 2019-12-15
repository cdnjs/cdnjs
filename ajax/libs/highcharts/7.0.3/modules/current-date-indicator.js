/*
 Highcharts JS v7.0.3 (2019-02-06)
 CurrentDateIndicator

 (c) 2010-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var e=a.addEvent,h=a.PlotLineOrBand,f=a.merge,g={currentDateIndicator:!0,color:"#ccd6eb",width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:void 0,rotation:0,style:{fontSize:"10px"}}};e(a.Axis,"afterSetOptions",function(){var a=this.options,b=a.currentDateIndicator;
b&&("object"===typeof b?(b.label&&b.label.format&&(b.label.formatter=void 0),b=f(g,b)):b=f(g),b.value=new Date,a.plotLines||(a.plotLines=[]),a.plotLines.push(b))});e(h,"render",function(){var c=this.options,b,d;c.currentDateIndicator&&c.label&&(b=c.label.format,d=c.label.formatter,c.value=new Date,c.label.text="function"===typeof d?d(this):a.dateFormat(b,new Date),this.label&&this.label.attr({text:c.label.text}))})})(a)});
//# sourceMappingURL=current-date-indicator.js.map