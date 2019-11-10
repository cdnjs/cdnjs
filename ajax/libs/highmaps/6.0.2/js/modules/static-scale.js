/*
 Highcharts JS v6.0.2 (2017-10-20)
 StaticScale

 (c) 2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(c){var b=c.Chart,e=c.each,f=c.pick;b.prototype.adjustHeight=function(){e(this.axes,function(a){var b=a.chart,e=!!b.initiatedScale&&b.options.animation,d=a.options.staticScale;c.isNumber(d)&&!a.horiz&&c.defined(a.min)&&(a=f(a.unitLength,a.max+a.tickInterval-a.min)*d,a=Math.max(a,d),d=a-b.plotHeight,1<=Math.abs(d)&&(b.plotHeight=a,b.setSize(null,b.chartHeight+d,e)))});this.initiatedScale=!0};
b.prototype.callbacks.push(function(a){c.addEvent(this,"render",function(){a.adjustHeight()})})})(b)});
