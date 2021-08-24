/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/wma",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,f,d,l){a.hasOwnProperty(f)||(a[f]=l.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/WMA/WMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,f){function d(a,b){b*=(b+1)/2;return a.reduce(function(c,a,b){return[null,c[1]+a[1]*(b+1)]})[1]/b}function l(a,b,c,g){c=d(a,a.length);b=b[g-1];a.shift();return[b,c]}var q=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function g(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(g.prototype=
c.prototype,new g)}}(),k=a.seriesTypes.sma,r=f.isArray,t=f.merge;f=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}q(b,a);b.prototype.getValues=function(a,b){var c=b.period,d=a.xData,f=(a=a.yData)?a.length:0,e=1,g=d[0],k=a[0],m=[],n=[],p=[],h=-1;if(!(d.length<c)){r(a[0])&&(h=b.index,k=a[0][h]);for(b=[[g,k]];e!==c;)b.push([d[e],0>h?a[e]:a[e][h]]),e++;for(c=e;c<f;c++)e=l(b,d,a,c),m.push(e),n.push(e[0]),p.push(e[1]),b.push([d[c],
0>h?a[c]:a[c][h]]);e=l(b,d,a,c);m.push(e);n.push(e[0]);p.push(e[1]);return{values:m,xData:n,yData:p}}};b.defaultOptions=t(k.defaultOptions,{params:{index:3,period:9}});return b}(k);a.registerSeriesType("wma",f);"";return f});d(a,"masters/indicators/wma.src.js",[],function(){})});
//# sourceMappingURL=wma.js.map