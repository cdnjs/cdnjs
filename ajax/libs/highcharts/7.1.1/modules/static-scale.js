/*
 Highcharts JS v7.1.1 (2019-04-09)

 StaticScale

 (c) 2016-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/static-scale",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,h){a.hasOwnProperty(f)||(a[f]=h.apply(null,b))}a=a?a._modules:{};b(a,"modules/static-scale.src.js",[a["parts/Globals.js"]],function(a){var b=a.Chart,g=a.pick;a.addEvent(a.Axis,"afterSetOptions",
function(){this.horiz||!a.isNumber(this.options.staticScale)||this.chart.options.chart.height||(this.staticScale=this.options.staticScale)});b.prototype.adjustHeight=function(){"adjustHeight"!==this.redrawTrigger&&((this.axes||[]).forEach(function(b){var c=b.chart,f=!!c.initiatedScale&&c.options.animation,d=b.options.staticScale,e;b.staticScale&&a.defined(b.min)&&(e=g(b.unitLength,b.max+b.tickInterval-b.min)*d,e=Math.max(e,d),d=e-c.plotHeight,1<=Math.abs(d)&&(c.plotHeight=e,c.redrawTrigger="adjustHeight",
c.setSize(void 0,c.chartHeight+d,f)),b.series.forEach(function(a){(a=a.sharedClipKey&&c[a.sharedClipKey])&&a.attr({height:c.plotHeight})}))}),this.initiatedScale=!0);this.redrawTrigger=null};a.addEvent(b,"render",b.prototype.adjustHeight)});b(a,"masters/modules/static-scale.src.js",[],function(){})});
//# sourceMappingURL=static-scale.js.map