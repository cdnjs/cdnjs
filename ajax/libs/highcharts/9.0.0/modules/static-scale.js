/*
 Highcharts Gantt JS v9.0.0 (2021-02-02)

 StaticScale

 (c) 2016-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/static-scale",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,d,b){a.hasOwnProperty(c)||(a[c]=b.apply(null,d))}a=a?a._modules:{};b(a,"Extensions/StaticScale.js",[a["Core/Axis/Axis.js"],a["Core/Chart/Chart.js"],a["Core/Utilities.js"]],function(a,b,d){var c=
d.addEvent,f=d.defined,g=d.isNumber,h=d.pick;c(a,"afterSetOptions",function(){var a=this.chart.options&&this.chart.options.chart;!this.horiz&&g(this.options.staticScale)&&(!a.height||a.scrollablePlotArea&&a.scrollablePlotArea.minHeight)&&(this.staticScale=this.options.staticScale)});b.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&((this.axes||[]).forEach(function(a){var b=a.chart,d=!!b.initiatedScale&&b.options.animation,c=a.options.staticScale;if(a.staticScale&&f(a.min)){var e=
h(a.brokenAxis&&a.brokenAxis.unitLength,a.max+a.tickInterval-a.min)*c;e=Math.max(e,c);c=e-b.plotHeight;1<=Math.abs(c)&&(b.plotHeight=e,b.redrawTrigger="adjustHeight",b.setSize(void 0,b.chartHeight+c,d));a.series.forEach(function(a){(a=a.sharedClipKey&&b[a.sharedClipKey])&&a.attr({height:b.plotHeight})})}}),this.initiatedScale=!0);this.redrawTrigger=null};c(b,"render",b.prototype.adjustHeight)});b(a,"masters/modules/static-scale.src.js",[],function(){})});
//# sourceMappingURL=static-scale.js.map