/*
 Highcharts JS v5.0.12 (2017-05-24)
 X-range series

 (c) 2010-2017 Torstein Honsi, Lars A. V. Cabrera

 --- WORK IN PROGRESS ---

 License: www.highcharts.com/license
*/
(function(h){"object"===typeof module&&module.exports?module.exports=h:h(Highcharts)})(function(h){(function(e){var h=e.getOptions().plotOptions,x=e.Color,l=e.seriesTypes.column,g=e.each,m=e.extendClass,u=e.isNumber,t=e.isObject,r=e.merge,n=e.pick,v=e.seriesTypes,y=e.wrap,z=e.Axis,w=e.Point,A=e.Series;h.xrange=r(h.column,{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.yCategory}\x3c/b\x3e\x3cbr/\x3e'}});v.xrange=m(l,{pointClass:m(w,
{getLabelConfig:function(){var d=w.prototype.getLabelConfig.call(this);d.x2=this.x2;d.yCategory=this.yCategory=this.series.yAxis.categories&&this.series.yAxis.categories[this.y];return d}}),type:"xrange",forceDL:!0,parallelArrays:["x","x2","y"],requireSorting:!1,animate:v.line.prototype.animate,getColumnMetrics:function(){function d(){g(k.series,function(c){var d=c.xAxis;c.xAxis=c.yAxis;c.yAxis=d})}var b,k=this.chart;d();this.yAxis.closestPointRange=1;b=l.prototype.getColumnMetrics.call(this);d();
return b},cropData:function(d,b,k,c){b=A.prototype.cropData.call(this,this.x2Data,b,k,c);b.xData=d.slice(b.start,b.end);return b},translate:function(){l.prototype.translate.apply(this,arguments);var d=this.xAxis,b=this.columnMetrics,k=this.options.minPointLength||0;g(this.points,function(c){var f=c.plotX,a=n(c.x2,c.x+(c.len||0)),a=d.toPixels(a,!0),e=a-f,p;k&&(p=k-e,0>p&&(p=0),f-=p/2,a+=p/2);f=Math.max(f,-10);a=Math.min(Math.max(a,-10),d.len+10);a<f&&(a=f);c.shapeArgs={x:f,y:c.plotY+b.offset,width:a-
f,height:b.width};c.tooltipPos[0]+=e/2;c.tooltipPos[1]-=b.width/2;if(a=c.partialFill)t(a)&&(a=a.amount),u(a)||(a=0),f=c.shapeArgs,c.partShapeArgs={x:f.x,y:f.y+1,width:f.width*a,height:f.height-2}})},drawPoints:function(){var d=this,b=this.chart,e=d.options,c=b.renderer,f=b.pointCount<(e.animationLimit||250)?"animate":"attr";g(d.points,function(a){var b=a.graphic,k=a.shapeType,h=a.shapeArgs,g=a.partShapeArgs,l=d.options,q=a.partialFill,m=a.selected&&"select",n=e.stacking&&!e.borderRadius;if(u(a.plotY)&&
null!==a.y){if(b){if(a.graphicOriginal[f](r(h)),g)a.graphicOverlay[f](r(g))}else a.graphic=b=c.g("point").attr({"class":a.getClassName()}).add(a.group||d.group),a.graphicOriginal=c[k](h).addClass("highcharts-partfill-original").add(b),g&&(a.graphicOverlay=c[k](g).addClass("highcharts-partfill-overlay").add(b));a.graphicOriginal.attr(d.pointAttribs(a,m)).shadow(e.shadow,null,n);g&&(t(q)||(q={}),t(l.partialFill)&&(q=r(q,l.partialFill)),b=q.fill||x(d.color).brighten(-.3).get("rgb"),a.graphicOverlay.attr(d.pointAttribs(a,
m)).attr("fill",b).attr("stroke-width",0).shadow(e.shadow,null,n))}else b&&(a.graphic=b.destroy())})}});y(z.prototype,"getSeriesExtremes",function(e){var b=this.series,d,c;e.call(this);this.isXAxis&&"xrange"===b.type&&(d=n(this.dataMax,Number.MIN_VALUE),g(this.series,function(b){g(b.x2Data||[],function(a){a>d&&(d=a,c=!0)})}),c&&(this.dataMax=d))})})(h)});
