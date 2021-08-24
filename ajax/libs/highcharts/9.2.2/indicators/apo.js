/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,c,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var e=a.error;return{isParentLoaded:function(a,
f,g,b,l){if(a)return b?b(a):!0;e(l||this.generateMessage(g,f));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/APO/APOIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var f=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function k(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(k.prototype=d.prototype,new k)}}(),g=b.seriesTypes.ema,e=c.extend,l=c.merge,m=c.error;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}f(c,b);c.prototype.getValues=function(a,b){var c=b.periods,d=b.index;b=[];
var e=[],f=[],h;if(2!==c.length||c[1]<=c[0])m('Error: "APO requires two periods. Notice, first period should be lower than the second one."');else{var k=g.prototype.getValues.call(this,a,{index:d,period:c[0]});a=g.prototype.getValues.call(this,a,{index:d,period:c[1]});if(k&&a){c=c[1]-c[0];for(h=0;h<a.yData.length;h++)d=k.yData[h+c]-a.yData[h],b.push([a.xData[h],d]),e.push(a.xData[h]),f.push(d);return{values:b,xData:e,yData:f}}}};c.prototype.init=function(){var b=arguments,c=this;a.isParentLoaded(g,
"ema",c.type,function(a){a.prototype.init.apply(c,b)})};c.defaultOptions=l(g.defaultOptions,{params:{period:void 0,periods:[10,20]}});return c}(g);e(c.prototype,{nameBase:"APO",nameComponents:["periods"]});b.registerSeriesType("apo",c);"";return c});b(a,"masters/indicators/apo.src.js",[],function(){})});
//# sourceMappingURL=apo.js.map