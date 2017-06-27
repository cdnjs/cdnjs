/*
 Highcharts JS v5.0.2 (2016-10-26)
 X-range series

 (c) 2010-2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(h){"object"===typeof module&&module.exports?module.exports=h:h(Highcharts)})(function(h){(function(c){var h=c.getOptions().plotOptions,m=c.seriesTypes.column,k=c.each,p=c.extendClass,q=c.isNumber,v=c.isObject,n=c.merge,r=c.pick,t=c.seriesTypes,w=c.stop,x=c.wrap,y=c.Axis,u=c.Point,z=c.Series;h.xrange=n(h.column,{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'}});t.xrange=p(m,{pointClass:p(u,
{getLabelConfig:function(){var g=u.prototype.getLabelConfig.call(this);g.x2=this.x2;g.yCategory=this.yCategory=this.series.yAxis.categories&&this.series.yAxis.categories[this.y];return g}}),type:"xrange",forceDL:!0,parallelArrays:["x","x2","y"],requireSorting:!1,animate:t.line.prototype.animate,getColumnMetrics:function(){function g(){k(f.series,function(b){var a=b.xAxis;b.xAxis=b.yAxis;b.yAxis=a})}var e,f=this.chart;g();this.yAxis.closestPointRange=1;e=m.prototype.getColumnMetrics.call(this);g();
return e},cropData:function(g,e,f,b){e=z.prototype.cropData.call(this,this.x2Data,e,f,b);e.xData=g.slice(e.start,e.end);return e},translate:function(){m.prototype.translate.apply(this,arguments);var g=this.xAxis,e=this.columnMetrics,f=this.options.minPointLength||0;k(this.points,function(b){var a=b.plotX,d=r(b.x2,b.x+(b.len||0)),d=g.toPixels(d,!0),c=d-a,l;f&&(l=f-c,0>l&&(l=0),a-=l/2,d+=l/2);a=Math.max(a,-10);d=Math.min(Math.max(d,-10),g.len+10);b.shapeArgs={x:a,y:b.plotY+e.offset,width:d-a,height:e.width};
b.tooltipPos[0]+=c/2;b.tooltipPos[1]-=e.width/2;if(d=b.partialFill)v(d)&&(d=d.amount),q(d)||(d=0),a=b.shapeArgs,b.partShapeArgs={x:a.x,y:a.y+1,width:a.width*d,height:a.height-2}})},drawPoints:function(){var c=this,e=this.chart,f=e.renderer,b=e.pointCount<(c.options.animationLimit||250)?"animate":"attr";k(c.points,function(a){var d=a.graphic,e=a.shapeType,g=a.shapeArgs,h=a.partShapeArgs;if(q(a.plotY)&&null!==a.y)if(d){if(w(d),a.graphicOriginal[b](n(g)),h)a.graphicOverlay[b](n(h))}else a.graphic=d=
f.g("point").attr({"class":a.getClassName()}).add(a.group||c.group),a.graphicOriginal=f[e](g).addClass("highcharts-partfill-original").add(d),h&&(a.graphicOverlay=f[e](h).addClass("highcharts-partfill-overlay").add(d));else d&&(a.graphic=d.destroy())})}});x(y.prototype,"getSeriesExtremes",function(c){var e=this.series,f,b;c.call(this);this.isXAxis&&"xrange"===e.type&&(f=r(this.dataMax,Number.MIN_VALUE),k(this.series,function(a){k(a.x2Data||[],function(a){a>f&&(f=a,b=!0)})}),b&&(this.dataMax=f))})})(h)});
