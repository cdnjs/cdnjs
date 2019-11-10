/*
 Highcharts JS v5.0.11 (2017-05-04)
 X-range series

 (c) 2010-2017 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:g(Highcharts)})(function(g){(function(d){var g=d.getOptions().plotOptions,m=d.seriesTypes.column,k=d.each,p=d.extendClass,q=d.isNumber,v=d.isObject,n=d.merge,r=d.pick,t=d.seriesTypes,w=d.wrap,x=d.Axis,u=d.Point,y=d.Series;g.xrange=n(g.column,{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'}});t.xrange=p(m,{pointClass:p(u,{getLabelConfig:function(){var f=
u.prototype.getLabelConfig.call(this);f.x2=this.x2;f.yCategory=this.yCategory=this.series.yAxis.categories&&this.series.yAxis.categories[this.y];return f}}),type:"xrange",forceDL:!0,parallelArrays:["x","x2","y"],requireSorting:!1,animate:t.line.prototype.animate,getColumnMetrics:function(){function f(){k(h.series,function(b){var a=b.xAxis;b.xAxis=b.yAxis;b.yAxis=a})}var e,h=this.chart;f();this.yAxis.closestPointRange=1;e=m.prototype.getColumnMetrics.call(this);f();return e},cropData:function(f,e,
h,b){e=y.prototype.cropData.call(this,this.x2Data,e,h,b);e.xData=f.slice(e.start,e.end);return e},translate:function(){m.prototype.translate.apply(this,arguments);var f=this.xAxis,e=this.columnMetrics,h=this.options.minPointLength||0;k(this.points,function(b){var a=b.plotX,c=r(b.x2,b.x+(b.len||0)),c=f.toPixels(c,!0),d=c-a,l;h&&(l=h-d,0>l&&(l=0),a-=l/2,c+=l/2);a=Math.max(a,-10);c=Math.min(Math.max(c,-10),f.len+10);c<a&&(c=a);b.shapeArgs={x:a,y:b.plotY+e.offset,width:c-a,height:e.width};b.tooltipPos[0]+=
d/2;b.tooltipPos[1]-=e.width/2;if(c=b.partialFill)v(c)&&(c=c.amount),q(c)||(c=0),a=b.shapeArgs,b.partShapeArgs={x:a.x,y:a.y+1,width:a.width*c,height:a.height-2}})},drawPoints:function(){var f=this,e=this.chart,d=e.renderer,b=e.pointCount<(f.options.animationLimit||250)?"animate":"attr";k(f.points,function(a){var c=a.graphic,e=a.shapeType,h=a.shapeArgs,g=a.partShapeArgs;if(q(a.plotY)&&null!==a.y)if(c){if(a.graphicOriginal[b](n(h)),g)a.graphicOverlay[b](n(g))}else a.graphic=c=d.g("point").attr({"class":a.getClassName()}).add(a.group||
f.group),a.graphicOriginal=d[e](h).addClass("highcharts-partfill-original").add(c),g&&(a.graphicOverlay=d[e](g).addClass("highcharts-partfill-overlay").add(c));else c&&(a.graphic=c.destroy())})}});w(x.prototype,"getSeriesExtremes",function(d){var e=this.series,f,b;d.call(this);this.isXAxis&&"xrange"===e.type&&(f=r(this.dataMax,Number.MIN_VALUE),k(this.series,function(a){k(a.x2Data||[],function(a){a>f&&(f=a,b=!0)})}),b&&(this.dataMax=f))})})(g)});
