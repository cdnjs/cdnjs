/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,c,e,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,e),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};e(a,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){var e=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d])};return a(c,b)};return function(c,b){function d(){this.constructor=c}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+
String(b)+" is not a constructor or null");a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),g=a.seriesTypes.sma,l=c.extend,m=c.merge,q=c.isArray;c=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;b.updateAllPoints=!0;return b}e(c,a);c.prototype.getValues=function(a,d){var c=a.xData,b=a.yData;a=[];var e=[],g=[],f=c.length,l=d.index,h=(f-1)*f/2,n=0,p=0,m=(f-1)*f*(2*f-1)/6;for(d=0;d<f;d++){var k=q(b[d])?
b[d][l]:b[d];n+=k;p+=d*k}b=(f*p-h*n)/(f*m-h*h);isNaN(b)&&(b=0);h=(n-b*h)/f;for(d=0;d<f;d++)k=b*d+h,a[d]=[c[d],k],e[d]=c[d],g[d]=k;return{xData:e,yData:g,values:a}};c.defaultOptions=m(g.defaultOptions,{params:{period:void 0,index:3}});return c}(g);l(c.prototype,{nameBase:"Trendline",nameComponents:!1});a.registerSeriesType("trendline",c);"";return c});e(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map