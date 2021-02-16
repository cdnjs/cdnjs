/*
 Highcharts JS v9.0.1 (2021-02-15)

 Dot plot series type for Highcharts

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/dotplot",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,c,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,c))}a=a?a._modules:{};b(a,"Series/DotPlot/DotPlotSymbols.js",[a["Core/Renderer/SVG/SVGRenderer.js"]],function(a){a.prototype.symbols.rect=function(b,c,f,
m,g){return a.prototype.symbols.callout(b,c,f,m,g)}});b(a,"Series/DotPlot/DotPlotSeries.js",[a["Series/Column/ColumnSeries.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,c){var f=this&&this.__extends||function(){var a=function(b,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var b in e)e.hasOwnProperty(b)&&(a[b]=e[b])};return a(b,e)};return function(b,e){function c(){this.constructor=b}a(b,e);b.prototype=null===
e?Object.create(e):(c.prototype=e.prototype,new c)}}(),m=c.extend,g=c.merge,w=c.objectEach,r=c.pick;c=function(b){function c(){var a=null!==b&&b.apply(this,arguments)||this;a.data=void 0;a.options=void 0;a.points=void 0;return a}f(c,b);c.prototype.drawPoints=function(){var a=this,b=a.chart.renderer,c=this.options.marker,f=this.yAxis.transA*a.options.itemPadding,g=this.borderWidth%2?.5:1;this.points.forEach(function(d){var e;var h=d.marker||{};var t=h.symbol||c.symbol,x=r(h.radius,c.radius),u="rect"!==
t;d.graphics=e=d.graphics||{};var n=d.pointAttr?d.pointAttr[d.selected?"selected":""]||a.pointAttr[""]:a.pointAttribs(d,d.selected&&"select");delete n.r;a.chart.styledMode&&(delete n.stroke,delete n["stroke-width"]);if(null!==d.y){d.graphic||(d.graphic=b.g("point").add(a.group));var l=d.y;var v=r(d.stackY,d.y);var p=Math.min(d.pointWidth,a.yAxis.transA-f);for(h=v;h>v-d.y;h--){var k=d.barX+(u?d.pointWidth/2-p/2:0);var q=a.yAxis.toPixels(h,!0)+f/2;a.options.crisp&&(k=Math.round(k)-g,q=Math.round(q)+
g);k={x:k,y:q,width:Math.round(u?p:d.pointWidth),height:Math.round(p),r:x};e[l]?e[l].animate(k):e[l]=b.symbol(t).attr(m(k,n)).add(d.graphic);e[l].isActive=!0;l--}}w(e,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete a[b])})})};c.defaultOptions=g(a.defaultOptions,{itemPadding:.2,marker:{symbol:"circle",states:{hover:{},select:{}}}});return c}(a);m(c.prototype,{markerAttribs:void 0});b.registerSeriesType("dotplot",c);return c});b(a,"masters/modules/dotplot.src.js",[],function(){})});
//# sourceMappingURL=dotplot.js.map