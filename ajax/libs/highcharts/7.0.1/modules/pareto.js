/*
  Highcharts JS v7.0.1 (2018-12-19)

 Pareto series type for Highcharts

 (c) 2010-2018 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){var e=function(f){var b=f.Series,d=f.addEvent;return{init:function(){b.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:f.noop,setBaseSeries:function(){var a=this.chart,c=this.options.baseSeries;this.baseSeries=
c&&(a.series[c]||a.get(c))||null},addEvents:function(){var a=this,c;c=d(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(c)},addBaseSeriesEvents:function(){var a=this,c,b;c=d(a.baseSeries,"updatedData",function(){a.setDerivedData()});b=d(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(c,b)},destroy:function(){this.eventRemovers.forEach(function(a){a()});
b.prototype.destroy.apply(this,arguments)}}}(b);(function(b,e){var d=b.correctFloat,a=b.seriesType;b=b.merge;a("pareto","line",{zIndex:3},b(e,{setDerivedData:function(){if(1<this.baseSeries.yData.length){var a=this.baseSeries.xData,b=this.baseSeries.yData,d=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,d,!1),!1)}},sumPointsPercents:function(a,b,f,e){var c=0,h=0,k=[],g;a.forEach(function(a,l){null!==a&&(e?c+=a:(g=a/f*100,k.push([b[l],d(h+g)]),h+=g))});return e?c:k}}))})(b,
e)});
//# sourceMappingURL=pareto.js.map