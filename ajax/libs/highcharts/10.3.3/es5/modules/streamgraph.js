/*
 Highcharts JS v10.3.3 (2023-01-20)

 Streamgraph module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/streamgraph",["highcharts"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,e,d,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:a[e]}})))}a=a?a._modules:{};
d(a,"Series/Streamgraph/StreamgraphSeries.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,e){var d=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}if("function"!==typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+
" is not a constructor or null");a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),f=a.seriesTypes.areaspline,h=e.merge;e=e.extend;var g=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}d(c,a);c.prototype.streamStacker=function(a,c,d){a[0]-=c.total/2;a[1]-=c.total/2;this.stackedYData[d]=a};c.defaultOptions=h(f.defaultOptions,{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"});
return c}(f);e(g.prototype,{negStacks:!1});a.registerSeriesType("streamgraph",g);"";return g});d(a,"masters/modules/streamgraph.src.js",[],function(){})});
//# sourceMappingURL=streamgraph.js.map