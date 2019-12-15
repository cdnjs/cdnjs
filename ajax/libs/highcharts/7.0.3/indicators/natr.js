/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var e=a.seriesTypes.atr;a.seriesType("natr","sma",{tooltip:{valueSuffix:"%"}},{requiredIndicators:["atr"],getValues:function(a,f){for(var b=e.prototype.getValues.apply(this,arguments),g=b.values.length,d=f.period-1,h=a.yData,c=0;c<g;c++)b.yData[c]=b.values[c][1]/h[d][3]*
100,b.values[c][1]=b.yData[c],d++;return b}})})(a)});
//# sourceMappingURL=natr.js.map