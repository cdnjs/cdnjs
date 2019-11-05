/*
 Highcharts JS v7.2.1 (2019-10-31)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,f))}a=a?a._modules:{};b(a,"mixins/derived-series.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var e=b.defined,c=a.Series,d=a.addEvent;
return{hasDerivedData:!0,init:function(){c.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,b=this.options.baseSeries;this.baseSeries=e(b)&&(a.series[b]||a.get(b))||null},addEvents:function(){var a=this;var b=d(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(b)},
addBaseSeriesEvents:function(){var a=this;var b=d(a.baseSeries,"updatedData",function(){a.setDerivedData()});var e=d(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(b,e)},destroy:function(){this.eventRemovers.forEach(function(a){a()});c.prototype.destroy.apply(this,arguments)}}});b(a,"modules/pareto.src.js",[a["parts/Globals.js"],a["mixins/derived-series.js"]],function(a,b){var e=a.correctFloat,c=a.seriesType;a=a.merge;c("pareto","line",{zIndex:3},a(b,{setDerivedData:function(){var a=
this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)},sumPointsPercents:function(a,b,c,h){var d=0,k=0,l=[],g;a.forEach(function(a,f){null!==a&&(h?d+=a:(g=a/c*100,l.push([b[f],e(k+g)]),k+=g))});return h?d:l}}));""});b(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map