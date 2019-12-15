/*
  Highcharts JS v6.1.4 (2018-09-25)

 Item series type for Highcharts

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b(Highcharts)})(function(b){(function(d){var b=d.each,x=d.extend,u=d.pick,q=d.seriesType;q("item","column",{itemPadding:.2,marker:{symbol:"circle",states:{hover:{},select:{}}}},{drawPoints:function(){var c=this,h=c.chart.renderer,k=this.options.marker,l=this.yAxis.transA*c.options.itemPadding,m=this.borderWidth%2?.5:1;b(this.points,function(a){var b,e,f,g,r;b=
a.marker||{};var v=b.symbol||k.symbol,q=u(b.radius,k.radius),n,t,w="rect"!==v,p;a.graphics=f=a.graphics||{};r=a.pointAttr?a.pointAttr[a.selected?"selected":""]||c.pointAttr[""]:c.pointAttribs(a,a.selected&&"select");delete r.r;if(null!==a.y)for(a.graphic||(a.graphic=h.g("point").add(c.group)),g=a.y,t=u(a.stackY,a.y),n=Math.min(a.pointWidth,c.yAxis.transA-l),b=t;b>t-a.y;b--)e=a.barX+(w?a.pointWidth/2-n/2:0),p=c.yAxis.toPixels(b,!0)+l/2,c.options.crisp&&(e=Math.round(e)-m,p=Math.round(p)+m),e={x:e,
y:p,width:Math.round(w?n:a.pointWidth),height:Math.round(n),r:q},f[g]?f[g].animate(e):f[g]=h.symbol(v).attr(x(e,r)).add(a.graphic),f[g].isActive=!0,g--;d.objectEach(f,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete a[b])})})}});d.SVGRenderer.prototype.symbols.rect=function(b,h,k,l,m){return d.SVGRenderer.prototype.symbols.callout(b,h,k,l,m)}})(b)});
//# sourceMappingURL=item-series.js.map
