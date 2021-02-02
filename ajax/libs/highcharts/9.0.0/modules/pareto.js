/*
 Highcharts JS v9.0.0 (2021-02-02)

 Pareto series type for Highcharts

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pareto",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,e,b,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,b))}a=a?a._modules:{};c(a,"Mixins/DerivedSeries.js",[a["Core/Globals.js"],a["Core/Series/Series.js"],a["Core/Utilities.js"]],function(a,e,b){var f=b.addEvent,
c=b.defined;return{hasDerivedData:!0,init:function(){e.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,b=this.options.baseSeries;this.baseSeries=c(b)&&(a.series[b]||a.get(b))||null},addEvents:function(){var a=this;var b=f(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=
!0)});this.eventRemovers.push(b)},addBaseSeriesEvents:function(){var a=this;var b=f(a.baseSeries,"updatedData",function(){a.setDerivedData()});var c=f(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(b,c)},destroy:function(){this.eventRemovers.forEach(function(a){a()});e.prototype.destroy.apply(this,arguments)}}});c(a,"Series/ParetoSeries/ParetoSeries.js",[a["Mixins/DerivedSeries.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
c,b){var f=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),e=c.seriesTypes.line,k=b.correctFloat,l=b.merge;b=b.extend;var g=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=
void 0;b.points=void 0;b.options=void 0;return b}f(b,a);b.prototype.sumPointsPercents=function(a,b,c,e){var d=0,f=0,g=[],h;a.forEach(function(a,m){null!==a&&(e?d+=a:(h=a/c*100,g.push([b[m],k(f+h)]),f+=h))});return e?d:g};b.prototype.setDerivedData=function(){var a=this.baseSeries.xData,b=this.baseSeries.yData,c=this.sumPointsPercents(b,a,null,!0);this.setData(this.sumPointsPercents(b,a,c,!1),!1)};b.defaultOptions=l(e.defaultOptions,{zIndex:3});return b}(e);b(g.prototype,{addBaseSeriesEvents:a.addBaseSeriesEvents,
addEvents:a.addEvents,destroy:a.destroy,hasDerivedData:a.hasDerivedData,init:a.init,setBaseSeries:a.setBaseSeries});c.registerSeriesType("pareto",g);"";return g});c(a,"masters/modules/pareto.src.js",[],function(){})});
//# sourceMappingURL=pareto.js.map