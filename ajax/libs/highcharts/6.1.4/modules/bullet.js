/*
  Highcharts JS v6.1.4 (2018-09-25)

 Bullet graph series type for Highcharts

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b(Highcharts)})(function(b){(function(d){var b=d.each,r=d.pick,l=d.isNumber,v=d.relativeLength,m=d.seriesType,f=d.seriesTypes.column.prototype;m("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e. Target: \x3cb\x3e{point.target}\x3c/b\x3e\x3cbr/\x3e'}},
{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var a=this,n=a.chart,p=a.options,m=p.animationLimit||250;f.drawPoints.apply(this);b(a.points,function(c){var b=c.options,h,e=c.targetGraphic,f=c.target,k=c.y,q,t,g,u;l(f)&&null!==f?(g=d.merge(p.targetOptions,b.targetOptions),t=g.height,h=c.shapeArgs,q=v(g.width,h.width),u=a.yAxis.translate(f,!1,!0,!1,!0)-g.height/2-.5,h=a.crispCol.apply({chart:n,borderWidth:g.borderWidth,options:{crisp:p.crisp}},[h.x+h.width/2-q/
2,u,q,t]),e?(e[n.pointCount<m?"animate":"attr"](h),l(k)&&null!==k?e.element.point=c:e.element.point=void 0):c.targetGraphic=e=n.renderer.rect().attr(h).add(a.group),e.attr({fill:r(g.color,b.color,a.zones.length&&(c.getZone.call({series:a,x:c.x,y:f,options:{}}).color||a.color)||void 0,c.color,a.color),stroke:r(g.borderColor,c.borderColor,a.options.borderColor),"stroke-width":g.borderWidth}),l(k)&&null!==k&&(e.element.point=c),e.addClass(c.getClassName()+" highcharts-bullet-target",!0)):e&&(c.targetGraphic=
e.destroy())})},getExtremes:function(a){var b=this.targetData,d;f.getExtremes.call(this,a);b&&b.length&&(a=this.dataMax,d=this.dataMin,f.getExtremes.call(this,b),this.dataMax=Math.max(this.dataMax,a),this.dataMin=Math.min(this.dataMin,d))}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());f.pointClass.prototype.destroy.apply(this,arguments)}})})(b)});
//# sourceMappingURL=bullet.js.map
