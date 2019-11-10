/*
 Highcharts JS v7.0.3 (2019-02-06)
 StaticScale

 (c) 2016-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var d=a.Chart,g=a.pick;a.addEvent(a.Axis,"afterSetOptions",function(){this.horiz||!a.isNumber(this.options.staticScale)||this.chart.options.chart.height||(this.staticScale=this.options.staticScale)});d.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&
((this.axes||[]).forEach(function(b){var c=b.chart,d=!!c.initiatedScale&&c.options.animation,e=b.options.staticScale,f;b.staticScale&&a.defined(b.min)&&(f=g(b.unitLength,b.max+b.tickInterval-b.min)*e,f=Math.max(f,e),e=f-c.plotHeight,1<=Math.abs(e)&&(c.plotHeight=f,c.redrawTrigger="adjustHeight",c.setSize(void 0,c.chartHeight+e,d)),b.series.forEach(function(a){(a=a.sharedClipKey&&c[a.sharedClipKey])&&a.attr({height:c.plotHeight})}))}),this.initiatedScale=!0);this.redrawTrigger=null};a.addEvent(d,"render",
d.prototype.adjustHeight)})(a)});
//# sourceMappingURL=static-scale.js.map