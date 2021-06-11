/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,f,d,k){a.hasOwnProperty(f)||(a[f]=k.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/RSI/RSIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
f){var d=this&&this.__extends||function(){var a=function(e,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(e,b)};return function(e,b){function c(){this.constructor=e}a(e,b);e.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),k=a.seriesTypes.sma,t=f.isNumber,u=f.merge;f=function(a){function e(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;
b.options=void 0;return b}d(e,a);e.prototype.getValues=function(a,c){var b=c.period,e=a.xData,g=a.yData;a=g?g.length:0;var d=c.decimals,h=1,f=[],k=[],r=[],q=c.index,m=c=0,n;if(!(e.length<b)){if(t(g[0]))var p=g;else q=Math.min(q,g[0].length-1),p=g.map(function(a){return a[q]});for(;h<b;){var l=parseFloat((p[h]-p[h-1]).toFixed(d));0<l?c+=l:m+=Math.abs(l);h++}g=parseFloat((c/(b-1)).toFixed(d));for(n=parseFloat((m/(b-1)).toFixed(d));h<a;h++)l=parseFloat((p[h]-p[h-1]).toFixed(d)),0<l?(c=l,m=0):(c=0,m=
Math.abs(l)),g=parseFloat(((g*(b-1)+c)/b).toFixed(d)),n=parseFloat(((n*(b-1)+m)/b).toFixed(d)),c=0===n?100:0===g?0:parseFloat((100-100/(1+g/n)).toFixed(d)),f.push([e[h],c]),k.push(e[h]),r.push(c);return{values:f,xData:k,yData:r}}};e.defaultOptions=u(k.defaultOptions,{params:{decimals:4,index:3}});return e}(k);a.registerSeriesType("rsi",f);"";return f});d(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map