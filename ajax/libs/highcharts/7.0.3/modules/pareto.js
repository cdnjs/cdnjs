/*
  Highcharts JS v7.0.3 (2019-02-06)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var e=function(f){var a=f.Series,d=f.addEvent;return{init:function(){a.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:f.noop,setBaseSeries:function(){var b=this.chart,c=this.options.baseSeries;
this.baseSeries=c&&(b.series[c]||b.get(c))||null},addEvents:function(){var b=this,c;c=d(this.chart,"afterLinkSeries",function(){b.setBaseSeries();b.baseSeries&&!b.initialised&&(b.setDerivedData(),b.addBaseSeriesEvents(),b.initialised=!0)});this.eventRemovers.push(c)},addBaseSeriesEvents:function(){var b=this,c,a;c=d(b.baseSeries,"updatedData",function(){b.setDerivedData()});a=d(b.baseSeries,"destroy",function(){b.baseSeries=null;b.initialised=!1});b.eventRemovers.push(c,a)},destroy:function(){this.eventRemovers.forEach(function(b){b()});
a.prototype.destroy.apply(this,arguments)}}}(a);(function(a,e){var d=a.correctFloat,b=a.seriesType;a=a.merge;b("pareto","line",{zIndex:3},a(e,{setDerivedData:function(){if(1<this.baseSeries.yData.length){var a=this.baseSeries.xData,b=this.baseSeries.yData,d=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,d,!1),!1)}},sumPointsPercents:function(a,b,f,e){var c=0,h=0,k=[],g;a.forEach(function(a,l){null!==a&&(e?c+=a:(g=a/f*100,k.push([b[l],d(h+g)]),h+=g))});return e?c:k}}))})(a,
e)});
//# sourceMappingURL=pareto.js.map