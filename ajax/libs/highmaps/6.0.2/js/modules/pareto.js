/*
  Highcharts JS v6.0.2 (2017-10-20)

 Pareto series type for Highcharts

 (c) 2010-2017 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){var p=function(a){var c=a.each,d=a.Series,f=a.addEvent,e=a.fireEvent,m=a.wrap,n={init:function(){d.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var b=this.chart,a=this.options.baseSeries;this.baseSeries=a&&(b.series[a]||b.get(a))||null},addEvents:function(){var b=this,a;a=f(this.chart,
"seriesLinked",function(){b.setBaseSeries();b.baseSeries&&!b.initialised&&(b.setDerivedData(),b.addBaseSeriesEvents(),b.initialised=!0)});this.eventRemovers.push(a)},addBaseSeriesEvents:function(){var b=this,a,c;a=f(b.baseSeries,"updatedData",function(){b.setDerivedData()});c=f(b.baseSeries,"destroy",function(){b.baseSeries=null;b.initialised=!1});b.eventRemovers.push(a,c)},destroy:function(){c(this.eventRemovers,function(a){a()});d.prototype.destroy.apply(this,arguments)}};m(a.Chart.prototype,"linkSeries",
function(a){a.call(this);e(this,"seriesLinked")});return n}(c);(function(a,c){var d=a.each,f=a.correctFloat,e=a.seriesType;a=a.merge;e("pareto","line",{zIndex:3},a(c,{setDerivedData:function(){if(1<this.baseSeries.yData.length){var a=this.baseSeries.xData,c=this.baseSeries.yData,b=this.sumPointsPercents(c,a,null,!0);this.setData(this.sumPointsPercents(c,a,b,!1),!1)}},sumPointsPercents:function(a,c,b,e){var h=0,k=0,l=[],g;d(a,function(a,d){null!==a&&(e?h+=a:(g=a/b*100,l.push([c[d],f(k+g)]),k+=g))});
return e?h:l}}))})(c,p)});
