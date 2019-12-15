/*
 Highcharts JS v6.2.0 (2018-10-17)
 StaticScale

 (c) 2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(c){var a=c.Chart,f=c.each,g=c.pick;c.addEvent(c.Axis,"afterSetOptions",function(){this.horiz||!c.isNumber(this.options.staticScale)||this.chart.options.chart.height||(this.staticScale=this.options.staticScale)});a.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&(f(this.axes||[],function(a){var b=a.chart,
h=!!b.initiatedScale&&b.options.animation,d=a.options.staticScale,e;a.staticScale&&c.defined(a.min)&&(e=g(a.unitLength,a.max+a.tickInterval-a.min)*d,e=Math.max(e,d),d=e-b.plotHeight,1<=Math.abs(d)&&(b.plotHeight=e,b.redrawTrigger="adjustHeight",b.setSize(void 0,b.chartHeight+d,h)),f(a.series,function(a){(a=a.sharedClipKey&&b[a.sharedClipKey])&&a.attr({height:b.plotHeight})}))}),this.initiatedScale=!0);this.redrawTrigger=null};c.addEvent(a,"render",a.prototype.adjustHeight)})(a)});
//# sourceMappingURL=static-scale.js.map
