/*
 Highcharts JS v7.1.2 (2019-06-03)

 StaticScale

 (c) 2016-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/static-scale",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,c){a.hasOwnProperty(f)||(a[f]=c.apply(null,b))}a=a?a._modules:{};b(a,"modules/static-scale.src.js",[a["parts/Globals.js"]],function(a){var b=a.Chart,g=a.pick;a.addEvent(a.Axis,"afterSetOptions",
function(){var c=this.chart.options&&this.chart.options.chart;!this.horiz&&a.isNumber(this.options.staticScale)&&(!c.height||c.scrollablePlotArea&&c.scrollablePlotArea.minHeight)&&(this.staticScale=this.options.staticScale)});b.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&((this.axes||[]).forEach(function(c){var b=c.chart,f=!!b.initiatedScale&&b.options.animation,d=c.options.staticScale,e;c.staticScale&&a.defined(c.min)&&(e=g(c.unitLength,c.max+c.tickInterval-c.min)*d,e=
Math.max(e,d),d=e-b.plotHeight,1<=Math.abs(d)&&(b.plotHeight=e,b.redrawTrigger="adjustHeight",b.setSize(void 0,b.chartHeight+d,f)),c.series.forEach(function(a){(a=a.sharedClipKey&&b[a.sharedClipKey])&&a.attr({height:b.plotHeight})}))}),this.initiatedScale=!0);this.redrawTrigger=null};a.addEvent(b,"render",b.prototype.adjustHeight)});b(a,"masters/modules/static-scale.src.js",[],function(){})});
//# sourceMappingURL=static-scale.js.map