/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,e,c,b){a.hasOwnProperty(e)||(a[e]=b.apply(null,c))}a=a?a._modules:{};b(a,"Stock/Indicators/ArrayUtilities.js",[],function(){return{getArrayExtremes:function(a,
b,c){return a.reduce(function(a,e){return[Math.min(a[0],e[b]),Math.max(a[1],e[c])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});b(a,"Stock/Indicators/WilliamsR/WilliamsRIndicator.js",[a["Stock/Indicators/ArrayUtilities.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var e=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};
return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),h=b.seriesTypes.sma,l=c.extend,p=c.isArray,q=c.merge;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}e(c,b);c.prototype.getValues=function(b,c){c=c.period;var d=b.xData,e=(b=b.yData)?b.length:0,h=[],m=[],n=[],f;if(!(d.length<c)&&p(b[0])&&4===b[0].length){for(f=c-1;f<e;f++){var g=
b.slice(f-c+1,f+1);var k=a.getArrayExtremes(g,2,1);g=k[0];k=k[1];var l=b[f][3];g=(k-l)/(k-g)*-100;d[f]&&(h.push([d[f],g]),m.push(d[f]),n.push(g))}return{values:h,xData:m,yData:n}}};c.defaultOptions=q(h.defaultOptions,{params:{index:void 0,period:14}});return c}(h);l(c.prototype,{nameBase:"Williams %R"});b.registerSeriesType("williamsr",c);"";return c});b(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map