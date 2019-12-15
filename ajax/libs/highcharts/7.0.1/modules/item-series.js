/*
  Highcharts JS v7.0.1 (2018-12-19)

 Item series type for Highcharts

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:"function"===typeof define&&define.amd?define(function(){return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){(function(f){var c=f.extend,u=f.pick,r=f.seriesType;r("item","column",{itemPadding:.2,marker:{symbol:"circle",states:{hover:{},select:{}}}},{drawPoints:function(){var b=this,v=b.chart.renderer,l=this.options.marker,m=this.yAxis.transA*b.options.itemPadding,n=this.borderWidth%2?.5:1;this.points.forEach(function(a){var d,
e,g,h,k;d=a.marker||{};var w=d.symbol||l.symbol,r=u(d.radius,l.radius),p,t,x="rect"!==w,q;a.graphics=g=a.graphics||{};k=a.pointAttr?a.pointAttr[a.selected?"selected":""]||b.pointAttr[""]:b.pointAttribs(a,a.selected&&"select");delete k.r;b.chart.styledMode&&(delete k.stroke,delete k["stroke-width"]);if(null!==a.y)for(a.graphic||(a.graphic=v.g("point").add(b.group)),h=a.y,t=u(a.stackY,a.y),p=Math.min(a.pointWidth,b.yAxis.transA-m),d=t;d>t-a.y;d--)e=a.barX+(x?a.pointWidth/2-p/2:0),q=b.yAxis.toPixels(d,
!0)+m/2,b.options.crisp&&(e=Math.round(e)-n,q=Math.round(q)+n),e={x:e,y:q,width:Math.round(x?p:a.pointWidth),height:Math.round(p),r:r},g[h]?g[h].animate(e):g[h]=v.symbol(w).attr(c(e,k)).add(a.graphic),g[h].isActive=!0,h--;f.objectEach(g,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete a[b])})})}});f.SVGRenderer.prototype.symbols.rect=function(b,c,l,m,n){return f.SVGRenderer.prototype.symbols.callout(b,c,l,m,n)}})(c)});
//# sourceMappingURL=item-series.js.map