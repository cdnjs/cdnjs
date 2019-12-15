/*
 Highcharts JS v6.2.0 (2018-10-17)
 CurrentDateIndicator

 (c) 2010-2016 Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:"function"===typeof define&&define.amd?define(function(){return c}):c(Highcharts)})(function(c){(function(c){var e=c.addEvent,h=c.PlotLineOrBand,f=c.merge,g={currentDateIndicator:!0,color:"#ccd6eb",width:2,label:{format:"%a, %b %d %Y, %H:%M",formatter:void 0,rotation:0,style:{fontSize:"10px"}}};e(c.Axis,"afterSetOptions",function(){var b=this.options,a=b.currentDateIndicator;a&&("object"===typeof a?(a.label&&a.label.format&&(a.label.formatter=
void 0),a=f(g,a)):a=f(g),a.value=new Date,b.plotLines||(b.plotLines=[]),b.plotLines.push(a))});e(h,"render",function(){var b=this.options,a,d;b.currentDateIndicator&&b.label&&(a=b.label.format,d=b.label.formatter,b.value=new Date,b.label.text="function"===typeof d?d(this):c.dateFormat(a,new Date),this.label&&this.label.attr({text:b.label.text}))})})(c)});
//# sourceMappingURL=current-date-indicator.js.map
