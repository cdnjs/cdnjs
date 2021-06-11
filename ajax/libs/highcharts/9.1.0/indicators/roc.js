/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,g,f,h){a.hasOwnProperty(g)||(a[g]=h.apply(null,f))}a=a?a._modules:{};f(a,"Stock/Indicators/ROC/ROCIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
g){var f=this&&this.__extends||function(){var a=function(d,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(d,b)};return function(d,b){function c(){this.constructor=d}a(d,b);d.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),h=a.seriesTypes.sma,m=g.isArray,n=g.merge;g=g.extend;var k=function(a){function d(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;
b.options=void 0;b.points=void 0;return b}f(d,a);d.prototype.getValues=function(a,c){var b=c.period,d=a.xData,f=(a=a.yData)?a.length:0,g=[],h=[],k=[],l=-1;if(!(d.length<=b)){m(a[0])&&(l=c.index);for(c=b;c<f;c++){var e=0>l?(e=a[c-b])?(a[c]-e)/e*100:null:(e=a[c-b][l])?(a[c][l]-e)/e*100:null;e=[d[c],e];g.push(e);h.push(e[0]);k.push(e[1])}return{values:g,xData:h,yData:k}}};d.defaultOptions=n(h.defaultOptions,{params:{index:3,period:9}});return d}(h);g(k.prototype,{nameBase:"Rate of Change"});a.registerSeriesType("roc",
k);"";return k});f(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map