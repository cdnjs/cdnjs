/*
 Highcharts JS v5.0.3 (2016-11-18)
 X-range series

 (c) 2010-2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(k){"object"===typeof module&&module.exports?module.exports=k:k(Highcharts)})(function(k){(function(b){var k=b.getOptions().plotOptions,x=b.Color,l=b.seriesTypes.column,h=b.each,m=b.extendClass,u=b.isNumber,t=b.isObject,r=b.merge,n=b.pick,v=b.seriesTypes,y=b.stop,z=b.wrap,A=b.Axis,w=b.Point,B=b.Series;k.xrange=r(k.column,{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'}});v.xrange=m(l,{pointClass:m(w,
{getLabelConfig:function(){var d=w.prototype.getLabelConfig.call(this);d.x2=this.x2;d.yCategory=this.yCategory=this.series.yAxis.categories&&this.series.yAxis.categories[this.y];return d}}),type:"xrange",forceDL:!0,parallelArrays:["x","x2","y"],requireSorting:!1,animate:v.line.prototype.animate,getColumnMetrics:function(){function d(){h(e.series,function(c){var d=c.xAxis;c.xAxis=c.yAxis;c.yAxis=d})}var f,e=this.chart;d();this.yAxis.closestPointRange=1;f=l.prototype.getColumnMetrics.call(this);d();
return f},cropData:function(d,f,e,c){f=B.prototype.cropData.call(this,this.x2Data,f,e,c);f.xData=d.slice(f.start,f.end);return f},translate:function(){l.prototype.translate.apply(this,arguments);var d=this.xAxis,f=this.columnMetrics,e=this.options.minPointLength||0;h(this.points,function(c){var g=c.plotX,a=n(c.x2,c.x+(c.len||0)),a=d.toPixels(a,!0),b=a-g,p;e&&(p=e-b,0>p&&(p=0),g-=p/2,a+=p/2);g=Math.max(g,-10);a=Math.min(Math.max(a,-10),d.len+10);c.shapeArgs={x:g,y:c.plotY+f.offset,width:a-g,height:f.width};
c.tooltipPos[0]+=b/2;c.tooltipPos[1]-=f.width/2;if(a=c.partialFill)t(a)&&(a=a.amount),u(a)||(a=0),g=c.shapeArgs,c.partShapeArgs={x:g.x,y:g.y+1,width:g.width*a,height:g.height-2}})},drawPoints:function(){var d=this,b=this.chart,e=d.options,c=b.renderer,g=b.pointCount<(e.animationLimit||250)?"animate":"attr";h(d.points,function(a){var b=a.graphic,f=a.shapeType,k=a.shapeArgs,h=a.partShapeArgs,l=d.options,q=a.partialFill,m=a.selected&&"select",n=e.stacking&&!e.borderRadius;if(u(a.plotY)&&null!==a.y){if(b){if(y(b),
a.graphicOriginal[g](r(k)),h)a.graphicOverlay[g](r(h))}else a.graphic=b=c.g("point").attr({"class":a.getClassName()}).add(a.group||d.group),a.graphicOriginal=c[f](k).addClass("highcharts-partfill-original").add(b),h&&(a.graphicOverlay=c[f](h).addClass("highcharts-partfill-overlay").add(b));a.graphicOriginal.attr(d.pointAttribs(a,m)).shadow(e.shadow,null,n);h&&(t(q)||(q={}),t(l.partialFill)&&(q=r(q,l.partialFill)),b=q.fill||x(d.color).brighten(-.3).get("rgb"),a.graphicOverlay.attr(d.pointAttribs(a,
m)).attr("fill",b).attr("stroke-width",0).shadow(e.shadow,null,n))}else b&&(a.graphic=b.destroy())})}});z(A.prototype,"getSeriesExtremes",function(b){var d=this.series,e,c;b.call(this);this.isXAxis&&"xrange"===d.type&&(e=n(this.dataMax,Number.MIN_VALUE),h(this.series,function(b){h(b.x2Data||[],function(a){a>e&&(e=a,c=!0)})}),c&&(this.dataMax=e))})})(k)});
