/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/natr",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,b,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,b))}a=a?a._modules:{};b(a,"indicators/natr.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){b=b.seriesType;
var e=a.seriesTypes.atr;b("natr","sma",{tooltip:{valueSuffix:"%"}},{requiredIndicators:["atr"],getValues:function(a,b){var c=e.prototype.getValues.apply(this,arguments),f=c.values.length,g=b.period-1,h=a.yData,d=0;if(c){for(;d<f;d++)c.yData[d]=c.values[d][1]/h[g][3]*100,c.values[d][1]=c.yData[d],g++;return c}}});""});b(a,"masters/indicators/natr.src.js",[],function(){})});
//# sourceMappingURL=natr.js.map