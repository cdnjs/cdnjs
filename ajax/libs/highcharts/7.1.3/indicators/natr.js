/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,e))}a=a?a._modules:{};b(a,"indicators/natr.src.js",[a["parts/Globals.js"]],function(a){var b=a.seriesTypes.atr;a.seriesType("natr",
"sma",{tooltip:{valueSuffix:"%"}},{requiredIndicators:["atr"],getValues:function(a,f){for(var c=b.prototype.getValues.apply(this,arguments),e=c.values.length,g=f.period-1,h=a.yData,d=0;d<e;d++)c.yData[d]=c.values[d][1]/h[g][3]*100,c.values[d][1]=c.yData[d],g++;return c}})});b(a,"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map