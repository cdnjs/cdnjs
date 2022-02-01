/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/PPO/PPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),f=a.seriesTypes.ema,l=b.correctFloat,m=b.extend,n=b.merge,p=b.error;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||
this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.periods,d=b.index;b=[];var g=[],h=[],e;if(2!==c.length||c[1]<=c[0])p('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');else{var k=f.prototype.getValues.call(this,a,{index:d,period:c[0]});a=f.prototype.getValues.call(this,a,{index:d,period:c[1]});if(k&&a){c=c[1]-c[0];for(e=0;e<a.yData.length;e++)d=l((k.yData[e+c]-a.yData[e])/a.yData[e]*100),b.push([a.xData[e],
d]),g.push(a.xData[e]),h.push(d);return{values:b,xData:g,yData:h}}}};b.defaultOptions=n(f.defaultOptions,{params:{period:void 0,periods:[12,26]}});return b}(f);m(b.prototype,{nameBase:"PPO",nameComponents:["periods"]});a.registerSeriesType("ppo",b);"";return b});d(a,"masters/indicators/ppo.src.js",[],function(){})});
//# sourceMappingURL=ppo.js.map