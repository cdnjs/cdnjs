/*
 Highcharts JS v5.0.6 (2016-12-07)
 X-range series

 (c) 2010-2016 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:g(Highcharts)})(function(g){(function(c){var g=c.getOptions().plotOptions,m=c.seriesTypes.column,k=c.each,p=c.extendClass,q=c.isNumber,v=c.isObject,n=c.merge,r=c.pick,t=c.seriesTypes,w=c.wrap,x=c.Axis,u=c.Point,y=c.Series;g.xrange=n(g.column,{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'}});t.xrange=p(m,{pointClass:p(u,{getLabelConfig:function(){var f=
u.prototype.getLabelConfig.call(this);f.x2=this.x2;f.yCategory=this.yCategory=this.series.yAxis.categories&&this.series.yAxis.categories[this.y];return f}}),type:"xrange",forceDL:!0,parallelArrays:["x","x2","y"],requireSorting:!1,animate:t.line.prototype.animate,getColumnMetrics:function(){function f(){k(h.series,function(b){var a=b.xAxis;b.xAxis=b.yAxis;b.yAxis=a})}var d,h=this.chart;f();this.yAxis.closestPointRange=1;d=m.prototype.getColumnMetrics.call(this);f();return d},cropData:function(f,d,
h,b){d=y.prototype.cropData.call(this,this.x2Data,d,h,b);d.xData=f.slice(d.start,d.end);return d},translate:function(){m.prototype.translate.apply(this,arguments);var f=this.xAxis,d=this.columnMetrics,h=this.options.minPointLength||0;k(this.points,function(b){var a=b.plotX,e=r(b.x2,b.x+(b.len||0)),e=f.toPixels(e,!0),c=e-a,l;h&&(l=h-c,0>l&&(l=0),a-=l/2,e+=l/2);a=Math.max(a,-10);e=Math.min(Math.max(e,-10),f.len+10);b.shapeArgs={x:a,y:b.plotY+d.offset,width:e-a,height:d.width};b.tooltipPos[0]+=c/2;b.tooltipPos[1]-=
d.width/2;if(e=b.partialFill)v(e)&&(e=e.amount),q(e)||(e=0),a=b.shapeArgs,b.partShapeArgs={x:a.x,y:a.y+1,width:a.width*e,height:a.height-2}})},drawPoints:function(){var f=this,d=this.chart,c=d.renderer,b=d.pointCount<(f.options.animationLimit||250)?"animate":"attr";k(f.points,function(a){var e=a.graphic,d=a.shapeType,h=a.shapeArgs,g=a.partShapeArgs;if(q(a.plotY)&&null!==a.y)if(e){if(a.graphicOriginal[b](n(h)),g)a.graphicOverlay[b](n(g))}else a.graphic=e=c.g("point").attr({"class":a.getClassName()}).add(a.group||
f.group),a.graphicOriginal=c[d](h).addClass("highcharts-partfill-original").add(e),g&&(a.graphicOverlay=c[d](g).addClass("highcharts-partfill-overlay").add(e));else e&&(a.graphic=e.destroy())})}});w(x.prototype,"getSeriesExtremes",function(c){var d=this.series,f,b;c.call(this);this.isXAxis&&"xrange"===d.type&&(f=r(this.dataMax,Number.MIN_VALUE),k(this.series,function(a){k(a.x2Data||[],function(a){a>f&&(f=a,b=!0)})}),b&&(this.dataMax=f))})})(g)});
