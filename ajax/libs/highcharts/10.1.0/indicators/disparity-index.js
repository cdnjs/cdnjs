/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highstock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/disparity-index",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var h in c)c.hasOwnProperty(h)&&(a[h]=c[h])};return a(b,c)};return function(b,c){function h(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(h.prototype=c.prototype,
new h)}}(),g=a.seriesTypes.sma,k=b.correctFloat,p=b.defined,q=b.extend,r=b.isArray,t=b.merge;b=function(b){function e(){var a=null!==b&&b.apply(this,arguments)||this;a.averageIndicator=void 0;a.data=void 0;a.options=void 0;a.points=void 0;return a}d(e,b);e.prototype.init=function(){var c=arguments,b=c[1].params;this.averageIndicator=a.seriesTypes[b&&b.average?b.average:void 0]||g;this.averageIndicator.prototype.init.apply(this,c)};e.prototype.calculateDisparityIndex=function(a,b){return k(a-b)/b*
100};e.prototype.getValues=function(a,b){var c=b.index,d=a.xData,e=a.yData,h=e?e.length:0,g=[],l=[],m=[],f=this.averageIndicator,k=r(e[0]);b=f.prototype.getValues(a,b);a=b.yData;b=d.indexOf(b.xData[0]);if(a&&0!==a.length&&p(c)&&!(e.length<=b)){for(f=b;f<h;f++){var n=this.calculateDisparityIndex(k?e[f][c]:e[f],a[f-b]);g.push([d[f],n]);l.push(d[f]);m.push(n)}return{values:g,xData:l,yData:m}}};e.defaultOptions=t(g.defaultOptions,{params:{average:"sma",index:3},marker:{enabled:!1},dataGrouping:{approximation:"averages"}});
return e}(g);q(b.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]});a.registerSeriesType("disparityindex",b);"";return b});d(a,"masters/indicators/disparity-index.src.js",[],function(){})});
//# sourceMappingURL=disparity-index.js.map