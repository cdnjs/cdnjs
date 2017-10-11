/*
  Highcharts JS v6.0.1 (2017-10-05)

 Item series type for Highcharts

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(f){var b=f.each,p=f.extend,q=f.pick,h=f.seriesType;h("item","column",{itemPadding:.2,marker:{symbol:"circle",states:{hover:{},select:{}}}},{drawPoints:function(){var c=this,n=c.chart.renderer,h=this.options.marker;b(this.points,function(a){var b,k,d,e,l,r=(a.marker||{}).symbol||h.symbol,g,m;a.graphics=d=a.graphics||{};l=a.pointAttr?a.pointAttr[a.selected?"selected":""]||c.pointAttr[""]:c.pointAttribs(a,
a.selected&&"select");delete l.r;if(null!==a.y)for(a.graphic||(a.graphic=n.g("point").add(c.group)),e=a.y,m=q(a.stackY,a.y),g=Math.min(a.pointWidth,c.yAxis.transA*(1-c.options.itemPadding)),b=m;b>m-a.y;b--)k={x:a.barX+a.pointWidth/2-g/2,y:c.yAxis.toPixels(b,!0)-g/2,width:g,height:g},d[e]?d[e].animate(k):d[e]=n.symbol(r).attr(p(k,l)).add(a.graphic),d[e].isActive=!0,e--;f.objectEach(d,function(a,b){a.isActive?a.isActive=!1:(a.destroy(),delete a[b])})})}})})(b)});
