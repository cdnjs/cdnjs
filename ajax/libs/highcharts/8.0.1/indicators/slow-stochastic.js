/*
 Highstock JS v8.0.1 (2020-03-02)

 Slow Stochastic series type for Highstock

 (c) 2010-2019 Pawel Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/indicators",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,g,f){a.hasOwnProperty(d)||(a[d]=f.apply(null,g))}a=a?a._modules:{};c(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var d=a.error;return{isParentLoaded:function(a,
f,e,b,h){if(a)return b?b(a):!0;d(h||this.generateMessage(e,f));return!1},generateMessage:function(a,d){return'Error: "'+a+'" indicator type requires "'+d+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"indicators/slow-stochastic.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,d,c){d=d.seriesType;var f=a.seriesTypes;d("slowstochastic","stochastic",{params:{periods:[14,3,3]}},{nameBase:"Slow Stochastic",
init:function(){var e=arguments,b=this;c.isParentLoaded(a.seriesTypes.stochastic,"stochastic",b.type,function(a){a.prototype.init.apply(b,e)})},getValues:function(a,b){var d=b.periods,c=f.stochastic.prototype.getValues.call(this,a,b);a={values:[],xData:[],yData:[]};b=0;if(c){a.xData=c.xData.slice(d[1]-1);c=c.yData.slice(d[1]-1);var e=f.sma.prototype.getValues.call(this,{xData:a.xData,yData:c},{index:1,period:d[2]});if(e){for(var g=a.xData.length;b<g;b++)a.yData[b]=[c[b][1],e.yData[b-d[2]+1]||null],
a.values[b]=[a.xData[b],c[b][1],e.yData[b-d[2]+1]||null];return a}}}});""});c(a,"masters/indicators/slow-stochastic.src.js",[],function(){})});
//# sourceMappingURL=slow-stochastic.js.map