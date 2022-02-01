/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highstock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/disparity-index",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js",[a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(b,c)};return function(b,c){function e(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(e.prototype=c.prototype,new e)}}(),g=a.seriesTypes.sma,k=b.correctFloat,p=b.defined,q=b.extend,r=b.isArray,t=b.merge;b=function(b){function h(){var c=
null!==b&&b.apply(this,arguments)||this;c.averageIndicator=void 0;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(h,b);h.prototype.init=function(){var c=arguments,e=c[1].params;this.averageIndicator=a.seriesTypes[e&&e.average?e.average:void 0]||g;this.averageIndicator.prototype.init.apply(this,c)};h.prototype.calculateDisparityIndex=function(c,a){return k(c-a)/a*100};h.prototype.getValues=function(a,b){var c=b.index,e=a.xData,d=a.yData,h=d?d.length:0,g=[],l=[],m=[],f=this.averageIndicator,
k=r(d[0]);b=f.prototype.getValues(a,b);a=b.yData;b=e.indexOf(b.xData[0]);if(a&&0!==a.length&&p(c)&&!(d.length<=b)){for(f=b;f<h;f++){var n=this.calculateDisparityIndex(k?d[f][c]:d[f],a[f-b]);g.push([e[f],n]);l.push(e[f]);m.push(n)}return{values:g,xData:l,yData:m}}};h.defaultOptions=t(g.defaultOptions,{params:{average:"sma",index:3},marker:{enabled:!1},dataGrouping:{approximation:"averages"}});return h}(g);q(b.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]});a.registerSeriesType("disparityindex",
b);"";return b});d(a,"masters/indicators/disparity-index.src.js",[],function(){})});
//# sourceMappingURL=disparity-index.js.map