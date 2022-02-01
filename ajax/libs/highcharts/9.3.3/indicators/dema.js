/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,d,f,k){a.hasOwnProperty(d)||(a[d]=k.apply(null,f))}a=a?a._modules:{};f(a,"Stock/Indicators/DEMA/DEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,d){var f=this&&this.__extends||function(){var a=function(e,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(e,b)};return function(e,b){function c(){this.constructor=e}a(e,b);e.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),k=a.seriesTypes.ema,w=d.correctFloat,x=d.isArray,l=d.merge;d=function(a){function e(){var b=null!==a&&a.apply(this,arguments)||this;
b.EMApercent=void 0;b.data=void 0;b.options=void 0;b.points=void 0;return b}f(e,a);e.prototype.getEMA=function(a,c,e,f,d,y){return k.prototype.calculateEma(y||[],a,"undefined"===typeof d?1:d,this.EMApercent,c,"undefined"===typeof f?-1:f,e)};e.prototype.getValues=function(a,c){var b=c.period,e=2*b,f=a.xData,d=(a=a.yData)?a.length:0,m=-1,q=[],r=[],t=[],h=0,u=[],g;this.EMApercent=2/(b+1);if(!(d<2*b-1)){x(a[0])&&(m=c.index?c.index:0);c=k.prototype.accumulatePeriodPoints(b,m,a);var n=c/b;c=0;for(g=b;g<
d+2;g++){g<d+1&&(h=this.getEMA(a,l,n,m,g)[1],u.push(h));var l=h;if(g<e)c+=h;else{g===e&&(n=c/b);h=u[g-b-1];var v=this.getEMA([h],v,n)[1];var p=[f[g-2],w(2*h-v)];q.push(p);r.push(p[0]);t.push(p[1])}}return{values:q,xData:r,yData:t}}};e.defaultOptions=l(k.defaultOptions);return e}(k);a.registerSeriesType("dema",d);"";return d});f(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map