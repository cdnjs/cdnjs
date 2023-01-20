/*
 Highcharts JS v10.3.3 (2023-01-20)

 Highcharts 3D funnel module

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/pyramid3d",["highcharts","highcharts/highcharts-3d","highcharts/modules/cylinder","highcharts/modules/funnel3d"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,c,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",
{detail:{path:d,module:a[d]}})))}a=a?a._modules:{};c(a,"Series/Pyramid3D/Pyramid3DSeries.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d){var c=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+
String(b)+" is not a constructor or null");a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),e=a.seriesTypes.funnel3d,f=d.merge;d=function(a){function d(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}c(d,a);d.defaultOptions=f(e.defaultOptions,{reversed:!0,neckHeight:0,neckWidth:0,dataLabels:{verticalAlign:"top"}});return d}(e);a.registerSeriesType("pyramid3d",d);"";return d});c(a,"masters/modules/pyramid3d.src.js",
[],function(){})});
//# sourceMappingURL=pyramid3d.js.map