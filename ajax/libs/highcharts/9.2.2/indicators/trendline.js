/*
 Highstock JS v9.2.2 (2021-08-24)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,c,e,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,e))}a=a?a._modules:{};e(a,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,c){var e=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return a(c,b)};return function(c,b){function d(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),g=a.seriesTypes.sma,m=c.extend,r=c.merge,t=c.isArray;c=function(a){function c(){var b=null!==a&&a.apply(this,
arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}e(c,a);c.prototype.getValues=function(a,d){var c=a.xData,b=a.yData;a=[];var e=[],g=[],h=0,n=0,p=0,q=0,k=c.length,m=d.index;for(d=0;d<k;d++){var f=c[d];var l=t(b[d])?b[d][m]:b[d];h+=f;n+=l;p+=f*l;q+=f*f}b=(k*p-h*n)/(k*q-h*h);isNaN(b)&&(b=0);h=(n-b*h)/k;for(d=0;d<k;d++)f=c[d],l=b*f+h,a[d]=[f,l],e[d]=f,g[d]=l;return{xData:e,yData:g,values:a}};c.defaultOptions=r(g.defaultOptions,{params:{period:void 0,index:3}});return c}(g);m(c.prototype,
{nameBase:"Trendline",nameComponents:!1});a.registerSeriesType("trendline",c);"";return c});e(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map