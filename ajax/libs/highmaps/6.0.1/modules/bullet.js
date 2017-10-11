/*
  Highcharts JS v6.0.1 (2017-10-05)

 Bullet graph series type for Highcharts

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(d){var c=d.each,r=d.pick,l=d.isNumber,v=d.relativeLength,m=d.seriesType,f=d.seriesTypes.column.prototype;m("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e. Target: \x3cb\x3e{point.target}\x3c/b\x3e\x3cbr/\x3e'}},{pointArrayMap:["y","target"],
parallelArrays:["x","y","target"],drawPoints:function(){var a=this,n=a.chart,p=a.options,m=p.animationLimit||250;f.drawPoints.apply(this);c(a.points,function(b){var c=b.options,h,e=b.targetGraphic,f=b.target,k=b.y,q,t,g,u;l(f)&&null!==f?(g=d.merge(p.targetOptions,c.targetOptions),t=g.height,h=b.shapeArgs,q=v(g.width,h.width),u=a.yAxis.translate(f,!1,!0,!1,!0)-g.height/2-.5,h=a.crispCol.apply({chart:n,borderWidth:g.borderWidth,options:{crisp:p.crisp}},[h.x+h.width/2-q/2,u,q,t]),e?(e[n.pointCount<m?
"animate":"attr"](h),l(k)&&null!==k?e.element.point=b:e.element.point=void 0):b.targetGraphic=e=n.renderer.rect().attr(h).add(a.group),e.attr({fill:r(g.color,c.color,a.zones.length&&(b.getZone.call({series:a,x:b.x,y:f,options:{}}).color||a.color)||void 0,b.color,a.color),stroke:r(g.borderColor,b.borderColor,a.options.borderColor),"stroke-width":g.borderWidth}),l(k)&&null!==k&&(e.element.point=b),e.addClass(b.getClassName()+" highcharts-bullet-target",!0)):e&&(b.targetGraphic=e.destroy())})},getExtremes:function(a){var c=
this.targetData,d;f.getExtremes.call(this,a);c&&c.length&&(a=this.dataMax,d=this.dataMin,f.getExtremes.call(this,c),this.dataMax=Math.max(this.dataMax,a),this.dataMin=Math.min(this.dataMin,d))}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());f.pointClass.prototype.destroy.apply(this,arguments)}})})(c)});
