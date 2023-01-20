/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/wma",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,d,f,l){a.hasOwnProperty(d)||(a[d]=l.apply(null,f),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,module:a[d]}})))}
a=a?a._modules:{};f(a,"Stock/Indicators/WMA/WMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d){function f(a,c){c*=(c+1)/2;return a.reduce(function(b,a,c){return[null,b[1]+a[1]*(c+1)]})[1]/c}function l(a,c,b,g){b=f(a,a.length);c=c[g-1];a.shift();return[c,b]}var q=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,
c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function g(){this.constructor=c}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");a(c,b);c.prototype=null===b?Object.create(b):(g.prototype=b.prototype,new g)}}(),k=a.seriesTypes.sma,r=d.isArray,t=d.merge;d=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}q(c,a);c.prototype.getValues=function(a,c){var b=
c.period,d=a.xData,f=(a=a.yData)?a.length:0,e=1,g=d[0],k=a[0],m=[],n=[],p=[],h=-1;if(!(d.length<b)){r(a[0])&&(h=c.index,k=a[0][h]);for(c=[[g,k]];e!==b;)c.push([d[e],0>h?a[e]:a[e][h]]),e++;for(b=e;b<f;b++)e=l(c,d,a,b),m.push(e),n.push(e[0]),p.push(e[1]),c.push([d[b],0>h?a[b]:a[b][h]]);e=l(c,d,a,b);m.push(e);n.push(e[0]);p.push(e[1]);return{values:m,xData:n,yData:p}}};c.defaultOptions=t(k.defaultOptions,{params:{index:3,period:9}});return c}(k);a.registerSeriesType("wma",d);"";return d});f(a,"masters/indicators/wma.src.js",
[],function(){})});
//# sourceMappingURL=wma.js.map