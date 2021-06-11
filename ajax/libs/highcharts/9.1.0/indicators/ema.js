/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ema",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,f,d,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/EMA/EMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
f){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(b,c)};return function(b,c){function e(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(e.prototype=c.prototype,new e)}}(),g=a.seriesTypes.sma,p=f.correctFloat,q=f.isArray,r=f.merge;f=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;
c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.accumulatePeriodPoints=function(a,e,l){for(var c=0,b=0,d;b<a;)d=0>e?l[b]:l[b][e],c+=d,b++;return c};b.prototype.calculateEma=function(a,e,b,d,f,g,t){a=a[b-1];e=0>g?e[b-1]:e[b-1][g];d="undefined"===typeof f?t:p(e*d+f*(1-d));return[a,d]};b.prototype.getValues=function(a,b){var c=b.period,d=a.xData,e=(a=a.yData)?a.length:0,f=2/(c+1),g=[],m=[],n=[],k=-1;if(!(e<c)){q(a[0])&&(k=b.index?b.index:0);b=this.accumulatePeriodPoints(c,k,a);for(b/=c;c<
e+1;c++){var h=this.calculateEma(d,a,c,f,h,k,b);g.push(h);m.push(h[0]);n.push(h[1]);h=h[1]}return{values:g,xData:m,yData:n}}};b.defaultOptions=r(g.defaultOptions,{params:{index:3,period:9}});return b}(g);a.registerSeriesType("ema",f);"";return f});d(a,"masters/indicators/ema.src.js",[],function(){})});
//# sourceMappingURL=ema.js.map