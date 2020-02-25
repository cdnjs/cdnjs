/*
 Highstock JS v8.0.0 (2019-12-10)

 Slow Stochastic series type for Highstock

 (c) 2010-2019 Pawel Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,f))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
d,c,g,e){if(a)return g?g(a):!0;b(e||this.generateMessage(c,d));return!1},generateMessage:function(a,d){return'Error: "'+a+'" indicator type requires "'+d+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/slow-stochastic.src.js",[a["parts/Globals.js"],a["mixins/indicator-required.js"]],function(a,b){var f=a.seriesTypes;a.seriesType("slowstochastic","stochastic",{params:{periods:[14,3,3]}},{nameBase:"Slow Stochastic",init:function(){var d=
arguments,c=this;b.isParentLoaded(a.seriesTypes.stochastic,"stochastic",c.type,function(a){a.prototype.init.apply(c,d)})},getValues:function(a,c){var b=c.periods,e=f.stochastic.prototype.getValues.call(this,a,c);a={values:[],xData:[],yData:[]};c=0;if(e){a.xData=e.xData.slice(b[1]-1);e=e.yData.slice(b[1]-1);var d=f.sma.prototype.getValues.call(this,{xData:a.xData,yData:e},{index:1,period:b[2]});if(d){for(var h=a.xData.length;c<h;c++)a.yData[c]=[e[c][1],d.yData[c-b[2]+1]||null],a.values[c]=[a.xData[c],
e[c][1],d.yData[c-b[2]+1]||null];return a}}}});""});b(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map