/*
  Highcharts JS v7.1.2 (2019-06-03)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,e,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,e))}a=a?a._modules:{};c(a,"mixins/derived-series.js",[a["parts/Globals.js"]],function(a){var b=a.Series,e=a.addEvent;return{hasDerivedData:!0,init:function(){b.prototype.init.apply(this,
arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var f=this.chart,d=this.options.baseSeries;this.baseSeries=a.defined(d)&&(f.series[d]||f.get(d))||null},addEvents:function(){var a=this,d;d=e(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(d)},addBaseSeriesEvents:function(){var a=this,
d,b;d=e(a.baseSeries,"updatedData",function(){a.setDerivedData()});b=e(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(d,b)},destroy:function(){this.eventRemovers.forEach(function(a){a()});b.prototype.destroy.apply(this,arguments)}}});c(a,"modules/pareto.src.js",[a["parts/Globals.js"],a["mixins/derived-series.js"]],function(a,b){var e=a.correctFloat,c=a.seriesType;a=a.merge;c("pareto","line",{zIndex:3},a(b,{setDerivedData:function(){if(1<this.baseSeries.yData.length){var a=
this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)}},sumPointsPercents:function(a,b,c,f){var d=0,h=0,k=[],g;a.forEach(function(a,l){null!==a&&(f?d+=a:(g=a/c*100,k.push([b[l],e(h+g)]),h+=g))});return f?d:k}}))});c(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map