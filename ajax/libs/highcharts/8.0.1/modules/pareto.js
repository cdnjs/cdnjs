/*
 Highcharts JS v8.0.1 (2020-03-02)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,c,b){a.hasOwnProperty(e)||(a[e]=b.apply(null,c))}a=a?a._modules:{};b(a,"mixins/derived-series.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var c=b.addEvent,d=b.defined,f=a.Series;
return{hasDerivedData:!0,init:function(){f.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,b=this.options.baseSeries;this.baseSeries=d(b)&&(a.series[b]||a.get(b))||null},addEvents:function(){var a=this;var b=c(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(b)},
addBaseSeriesEvents:function(){var a=this;var b=c(a.baseSeries,"updatedData",function(){a.setDerivedData()});var d=c(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(b,d)},destroy:function(){this.eventRemovers.forEach(function(a){a()});f.prototype.destroy.apply(this,arguments)}}});b(a,"modules/pareto.src.js",[a["parts/Utilities.js"],a["mixins/derived-series.js"]],function(a,b){var c=a.correctFloat,d=a.merge;a=a.seriesType;a("pareto","line",{zIndex:3},d(b,
{setDerivedData:function(){var a=this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)},sumPointsPercents:function(a,b,d,e){var f=0,h=0,k=[],g;a.forEach(function(a,l){null!==a&&(e?f+=a:(g=a/d*100,k.push([b[l],c(h+g)]),h+=g))});return e?f:k}}));""});b(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map