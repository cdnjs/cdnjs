/*
 Highstock JS v9.0.0 (2021-02-02)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,f,e,k){a.hasOwnProperty(f)||(a[f]=k.apply(null,e))}a=a?a._modules:{};e(a,"Stock/Indicators/RSI/RSIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
f){var e=this&&this.__extends||function(){var a=function(d,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(d,b)};return function(d,b){function c(){this.constructor=d}a(d,b);d.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),k=a.seriesTypes.sma,r=f.isArray,t=f.merge;f=function(a){function d(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;
b.options=void 0;return b}e(d,a);d.prototype.getValues=function(a,c){var b=c.period,d=a.xData,e=(a=a.yData)?a.length:0;c=c.decimals;var g=1,f=[],k=[],q=[],h=0,m=0,n;if(!(d.length<b)&&r(a[0])&&4===a[0].length){for(;g<b;){var l=parseFloat((a[g][3]-a[g-1][3]).toFixed(c));0<l?h+=l:m+=Math.abs(l);g++}var p=parseFloat((h/(b-1)).toFixed(c));for(n=parseFloat((m/(b-1)).toFixed(c));g<e;g++)l=parseFloat((a[g][3]-a[g-1][3]).toFixed(c)),0<l?(h=l,m=0):(h=0,m=Math.abs(l)),p=parseFloat(((p*(b-1)+h)/b).toFixed(c)),
n=parseFloat(((n*(b-1)+m)/b).toFixed(c)),h=0===n?100:0===p?0:parseFloat((100-100/(1+p/n)).toFixed(c)),f.push([d[g],h]),k.push(d[g]),q.push(h);return{values:f,xData:k,yData:q}}};d.defaultOptions=t(k.defaultOptions,{params:{period:14,decimals:4}});return d}(k);a.registerSeriesType("rsi",f);"";return f});e(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map