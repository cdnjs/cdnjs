/*
 Highcharts JS v6.0.7 (2018-02-16)
 StaticScale

 (c) 2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(c){var a=c.Chart,e=c.each,f=c.pick;a.prototype.adjustHeight=function(){e(this.axes,function(b){var a=b.chart,e=!!a.initiatedScale&&a.options.animation,d=b.options.staticScale;c.isNumber(d)&&!b.horiz&&c.defined(b.min)&&(b=f(b.unitLength,b.max+b.tickInterval-b.min)*d,b=Math.max(b,d),d=b-a.plotHeight,1<=Math.abs(d)&&(a.plotHeight=b,a.setSize(null,a.chartHeight+d,e)))});this.initiatedScale=!0};
c.addEvent(a.prototype,"render",a.prototype.adjustHeight)})(a)});
