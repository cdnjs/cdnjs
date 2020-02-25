/*
 Highcharts JS v8.0.0 (2019-12-10)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,b))}a=a?a._modules:{};b(a,"mixins/derived-series.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var d=b.defined,e=a.Series,f=a.addEvent;
return{hasDerivedData:!0,init:function(){e.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,c=this.options.baseSeries;this.baseSeries=d(c)&&(a.series[c]||a.get(c))||null},addEvents:function(){var a=this;var c=f(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=!0)});this.eventRemovers.push(c)},
addBaseSeriesEvents:function(){var a=this;var c=f(a.baseSeries,"updatedData",function(){a.setDerivedData()});var b=f(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(c,b)},destroy:function(){this.eventRemovers.forEach(function(a){a()});e.prototype.destroy.apply(this,arguments)}}});b(a,"modules/pareto.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/derived-series.js"]],function(a,b,g){var e=b.correctFloat;b=a.seriesType;a=a.merge;b("pareto",
"line",{zIndex:3},a(g,{setDerivedData:function(){var a=this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)},sumPointsPercents:function(a,b,c,d){var f=0,k=0,l=[],h;a.forEach(function(a,g){null!==a&&(d?f+=a:(h=a/c*100,l.push([b[g],e(k+h)]),k+=h))});return d?f:l}}));""});b(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map