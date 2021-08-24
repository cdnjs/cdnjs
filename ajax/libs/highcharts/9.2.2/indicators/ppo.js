/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,h,c,e){a.hasOwnProperty(h)||(a[h]=e.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var h=a.error;return{isParentLoaded:function(a,
e,g,b,k){if(a)return b?b(a):!0;h(k||this.generateMessage(g,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/PPO/PPOIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var e=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function l(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(l.prototype=d.prototype,new l)}}(),g=b.seriesTypes.ema,h=c.correctFloat,k=c.extend,m=c.merge,n=c.error;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}e(c,b);c.prototype.init=function(){var b=arguments,c=this;
a.isParentLoaded(g,"ema",c.type,function(a){a.prototype.init.apply(c,b)})};c.prototype.getValues=function(a,b){var c=b.periods,d=b.index;b=[];var e=[],k=[],f;if(2!==c.length||c[1]<=c[0])n('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');else{var l=g.prototype.getValues.call(this,a,{index:d,period:c[0]});a=g.prototype.getValues.call(this,a,{index:d,period:c[1]});if(l&&a){c=c[1]-c[0];for(f=0;f<a.yData.length;f++)d=h((l.yData[f+c]-a.yData[f])/a.yData[f]*
100),b.push([a.xData[f],d]),e.push(a.xData[f]),k.push(d);return{values:b,xData:e,yData:k}}}};c.defaultOptions=m(g.defaultOptions,{params:{period:void 0,periods:[12,26]}});return c}(g);k(c.prototype,{nameBase:"PPO",nameComponents:["periods"]});b.registerSeriesType("ppo",c);"";return c});b(a,"masters/indicators/ppo.src.js",[],function(){})});
//# sourceMappingURL=ppo.js.map