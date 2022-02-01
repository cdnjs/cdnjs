/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/Momentum/MomentumIndicator.js",[a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function m(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(m.prototype=c.prototype,new m)}}(),g=a.seriesTypes.sma,n=b.extend,p=b.isArray,q=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,
arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.period;b=b.index;var d=a.xData,g=(a=a.yData)?a.length:0,h=[],k=[],l=[],e;if(!(d.length<=c)&&p(a[0])){for(e=c+1;e<g;e++){var f=[d[e-1],a[e-1][b]-a[e-c-1][b]];h.push(f);k.push(f[0]);l.push(f[1])}f=[d[e-1],a[e-1][b]-a[e-c-1][b]];h.push(f);k.push(f[0]);l.push(f[1]);return{values:h,xData:k,yData:l}}};b.defaultOptions=q(g.defaultOptions,{params:{index:3}});return b}(g);n(b.prototype,
{nameBase:"Momentum"});a.registerSeriesType("momentum",b);"";return b});d(a,"masters/indicators/momentum.src.js",[],function(){})});
//# sourceMappingURL=momentum.js.map