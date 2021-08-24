/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,e,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,e))}a=a?a._modules:{};b(a,"Mixins/ReduceArray.js",[],function(){return{minInArray:function(a,c){return a.reduce(function(a,
g){return Math.min(a,g[c])},Number.MAX_VALUE)},maxInArray:function(a,c){return a.reduce(function(a,g){return Math.max(a,g[c])},-Number.MAX_VALUE)},getArrayExtremes:function(a,c,e){return a.reduce(function(a,b){return[Math.min(a[0],b[c]),Math.max(a[1],b[e])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});b(a,"Stock/Indicators/WilliamsR/WilliamsRIndicator.js",[a["Mixins/ReduceArray.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c,e){var b=this&&this.__extends||function(){var a=
function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),n=a.getArrayExtremes,k=c.seriesTypes.sma;a=e.extend;var p=e.isArray,m=e.merge;e=function(a){function c(){var d=null!==a&&a.apply(this,arguments)||this;d.data=void 0;d.options=void 0;d.points=
void 0;return d}b(c,a);c.prototype.getValues=function(a,b){b=b.period;var c=a.xData,d=(a=a.yData)?a.length:0,e=[],g=[],k=[],f;if(!(c.length<b)&&p(a[0])&&4===a[0].length){for(f=b-1;f<d;f++){var h=a.slice(f-b+1,f+1);var l=n(h,2,1);h=l[0];l=l[1];var m=a[f][3];h=(l-m)/(l-h)*-100;c[f]&&(e.push([c[f],h]),g.push(c[f]),k.push(h))}return{values:e,xData:g,yData:k}}};c.defaultOptions=m(k.defaultOptions,{params:{index:void 0,period:14}});return c}(k);a(e.prototype,{nameBase:"Williams %R"});c.registerSeriesType("williamsr",
e);"";return e});b(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map