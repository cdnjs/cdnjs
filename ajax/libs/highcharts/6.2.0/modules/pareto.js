/*
  Highcharts JS v6.2.0 (2018-10-17)

 Pareto series type for Highcharts

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:"function"===typeof define&&define.amd?define(function(){return c}):c(Highcharts)})(function(c){var m=function(b){var c=b.each,e=b.Series,f=b.addEvent;return{init:function(){e.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:b.noop,setBaseSeries:function(){var a=this.chart,d=this.options.baseSeries;this.baseSeries=d&&(a.series[d]||a.get(d))||null},
addEvents:function(){var a=this,d;d=f(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(d)},addBaseSeriesEvents:function(){var a=this,d,b;d=f(a.baseSeries,"updatedData",function(){a.setDerivedData()});b=f(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(d,b)},destroy:function(){c(this.eventRemovers,function(a){a()});e.prototype.destroy.apply(this,
arguments)}}}(c);(function(b,c){var e=b.each,f=b.correctFloat,a=b.seriesType;b=b.merge;a("pareto","line",{zIndex:3},b(c,{setDerivedData:function(){if(1<this.baseSeries.yData.length){var a=this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)}},sumPointsPercents:function(a,b,c,h){var d=0,k=0,l=[],g;e(a,function(a,e){null!==a&&(h?d+=a:(g=a/c*100,l.push([b[e],f(k+g)]),k+=g))});return h?d:l}}))})(c,m)});
//# sourceMappingURL=pareto.js.map
