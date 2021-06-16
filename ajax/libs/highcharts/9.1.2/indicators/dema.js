/*
 Highstock JS v9.1.2 (2021-06-16)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,c,e){a.hasOwnProperty(f)||(a[f]=e.apply(null,c))}a=a?a._modules:{};b(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var f=a.error;return{isParentLoaded:function(a,
e,k,b,m){if(a)return b?b(a):!0;f(m||this.generateMessage(k,e));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"Stock/Indicators/DEMA/DEMAIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var e=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof
Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function g(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(g.prototype=d.prototype,new g)}}(),k=b.seriesTypes.ema,f=c.correctFloat,m=c.isArray,n=c.merge;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.EMApercent=void 0;a.data=void 0;a.options=void 0;a.points=void 0;return a}e(c,b);c.prototype.init=function(){var b=arguments,
g=this;a.isParentLoaded(k,"ema",g.type,function(a){a.prototype.init.apply(g,b)})};c.prototype.getEMA=function(a,b,c,f,e,y){return k.prototype.calculateEma(y||[],a,"undefined"===typeof e?1:e,this.EMApercent,b,"undefined"===typeof f?-1:f,c)};c.prototype.getValues=function(a,b){var c=b.period,d=2*c,e=a.xData,g=(a=a.yData)?a.length:0,p=-1,t=[],u=[],v=[],l=0,w=[],h;this.EMApercent=2/(c+1);if(!(g<2*c-1)){m(a[0])&&(p=b.index?b.index:0);b=k.prototype.accumulatePeriodPoints(c,p,a);var q=b/c;b=0;for(h=c;h<
g+2;h++){h<g+1&&(l=this.getEMA(a,n,q,p,h)[1],w.push(l));var n=l;if(h<d)b+=l;else{h===d&&(q=b/c);l=w[h-c-1];var x=this.getEMA([l],x,q)[1];var r=[e[h-2],f(2*l-x)];t.push(r);u.push(r[0]);v.push(r[1])}}return{values:t,xData:u,yData:v}}};c.defaultOptions=n(k.defaultOptions);return c}(k);b.registerSeriesType("dema",c);"";return c});b(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map