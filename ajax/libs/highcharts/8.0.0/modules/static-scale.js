/*
 Highcharts Gantt JS v8.0.0 (2019-12-10)

 StaticScale

 (c) 2016-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/static-scale",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,c,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,c))}a=a?a._modules:{};c(a,"modules/static-scale.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var c=b.defined,d=b.isNumber,g=
b.pick;b=a.Chart;a.addEvent(a.Axis,"afterSetOptions",function(){var a=this.chart.options&&this.chart.options.chart;!this.horiz&&d(this.options.staticScale)&&(!a.height||a.scrollablePlotArea&&a.scrollablePlotArea.minHeight)&&(this.staticScale=this.options.staticScale)});b.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&((this.axes||[]).forEach(function(a){var b=a.chart,d=!!b.initiatedScale&&b.options.animation,e=a.options.staticScale;if(a.staticScale&&c(a.min)){var f=g(a.unitLength,
a.max+a.tickInterval-a.min)*e;f=Math.max(f,e);e=f-b.plotHeight;1<=Math.abs(e)&&(b.plotHeight=f,b.redrawTrigger="adjustHeight",b.setSize(void 0,b.chartHeight+e,d));a.series.forEach(function(a){(a=a.sharedClipKey&&b[a.sharedClipKey])&&a.attr({height:b.plotHeight})})}}),this.initiatedScale=!0);this.redrawTrigger=null};a.addEvent(b,"render",b.prototype.adjustHeight)});c(a,"masters/modules/static-scale.src.js",[],function(){})});
//# sourceMappingURL=static-scale.js.map