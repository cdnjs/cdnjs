/*
  Highcharts JS v7.1.2 (2019-06-03)

 Dot plot series type for Highcharts

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/dotplot",["highcharts"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,h,e){a.hasOwnProperty(c)||(a[c]=e.apply(null,h))}a=a?a._modules:{};c(a,"modules/dotplot.src.js",[a["parts/Globals.js"]],function(a){var c=a.extend,h=a.pick,e=a.seriesType;e("dotplot","column",{itemPadding:.2,
marker:{symbol:"circle",states:{hover:{},select:{}}}},{drawPoints:function(){var d=this,t=d.chart.renderer,u=this.options.marker,v=this.yAxis.transA*d.options.itemPadding,n=this.borderWidth%2?.5:1;this.points.forEach(function(b){var f,g,k,l,m;f=b.marker||{};var e=f.symbol||u.symbol,x=h(f.radius,u.radius),p,r,w="rect"!==e,q;b.graphics=k=b.graphics||{};m=b.pointAttr?b.pointAttr[b.selected?"selected":""]||d.pointAttr[""]:d.pointAttribs(b,b.selected&&"select");delete m.r;d.chart.styledMode&&(delete m.stroke,
delete m["stroke-width"]);if(null!==b.y)for(b.graphic||(b.graphic=t.g("point").add(d.group)),l=b.y,r=h(b.stackY,b.y),p=Math.min(b.pointWidth,d.yAxis.transA-v),f=r;f>r-b.y;f--)g=b.barX+(w?b.pointWidth/2-p/2:0),q=d.yAxis.toPixels(f,!0)+v/2,d.options.crisp&&(g=Math.round(g)-n,q=Math.round(q)+n),g={x:g,y:q,width:Math.round(w?p:b.pointWidth),height:Math.round(p),r:x},k[l]?k[l].animate(g):k[l]=t.symbol(e).attr(c(g,m)).add(b.graphic),k[l].isActive=!0,l--;a.objectEach(k,function(a,b){a.isActive?a.isActive=
!1:(a.destroy(),delete a[b])})})}});a.SVGRenderer.prototype.symbols.rect=function(d,c,e,h,n){return a.SVGRenderer.prototype.symbols.callout(d,c,e,h,n)}});c(a,"masters/modules/dotplot.src.js",[],function(){})});
//# sourceMappingURL=dotplot.js.map