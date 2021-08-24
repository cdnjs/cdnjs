/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,f,d,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/ATR/ATRIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,f){function d(a,b){return Math.max(a[1]-a[2],"undefined"===typeof b?0:Math.abs(a[1]-b[3]),"undefined"===typeof b?0:Math.abs(a[2]-b[3]))}var g=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),
k=a.seriesTypes.sma,r=f.isArray,m=f.merge;f=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.points=void 0;c.options=void 0;return c}g(b,a);b.prototype.getValues=function(a,b){b=b.period;var c=a.xData,f=(a=a.yData)?a.length:0,g=1,l=0,k=0,n=[],p=[],q=[],e;var m=[[c[0],a[0]]];if(!(c.length<=b)&&r(a[0])&&4===a[0].length){for(e=1;e<=f;e++)if(m.push([c[e],a[e]]),b<g){var h=b;var t=c[e-1],u=d(a[e-1],a[e-2]);h=[t,(l*(h-1)+u)/h];l=h[1];n.push(h);p.push(h[0]);q.push(h[1])}else b===
g?(l=k/(e-1),n.push([c[e-1],l]),p.push(c[e-1]),q.push(l)):k+=d(a[e-1],a[e-2]),g++;return{values:n,xData:p,yData:q}}};b.defaultOptions=m(k.defaultOptions,{params:{index:void 0}});return b}(k);a.registerSeriesType("atr",f);"";return f});d(a,"masters/indicators/atr.src.js",[],function(){})});
//# sourceMappingURL=atr.js.map