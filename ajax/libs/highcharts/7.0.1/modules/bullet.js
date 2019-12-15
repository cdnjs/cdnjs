/*
  Highcharts JS v7.0.1 (2018-12-19)

 Bullet graph series type for Highcharts

 (c) 2010-2018 Kacper Madej

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:"function"===typeof define&&define.amd?define(function(){return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){(function(e){var c=e.pick,n=e.isNumber,v=e.relativeLength,p=e.seriesType,g=e.seriesTypes.column.prototype;p("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e. Target: \x3cb\x3e{point.target}\x3c/b\x3e\x3cbr/\x3e'}},
{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var a=this,k=a.chart,q=a.options,p=q.animationLimit||250;g.drawPoints.apply(this);a.points.forEach(function(b){var g=b.options,h,d=b.targetGraphic,l=b.target,m=b.y,r,t,f,u;n(l)&&null!==l?(f=e.merge(q.targetOptions,g.targetOptions),t=f.height,h=b.shapeArgs,r=v(f.width,h.width),u=a.yAxis.translate(l,!1,!0,!1,!0)-f.height/2-.5,h=a.crispCol.apply({chart:k,borderWidth:f.borderWidth,options:{crisp:q.crisp}},[h.x+h.width/
2-r/2,u,r,t]),d?(d[k.pointCount<p?"animate":"attr"](h),n(m)&&null!==m?d.element.point=b:d.element.point=void 0):b.targetGraphic=d=k.renderer.rect().attr(h).add(a.group),k.styledMode||d.attr({fill:c(f.color,g.color,a.zones.length&&(b.getZone.call({series:a,x:b.x,y:l,options:{}}).color||a.color)||void 0,b.color,a.color),stroke:c(f.borderColor,b.borderColor,a.options.borderColor),"stroke-width":f.borderWidth}),n(m)&&null!==m&&(d.element.point=b),d.addClass(b.getClassName()+" highcharts-bullet-target",
!0)):d&&(b.targetGraphic=d.destroy())})},getExtremes:function(a){var c=this.targetData,e;g.getExtremes.call(this,a);c&&c.length&&(a=this.dataMax,e=this.dataMin,g.getExtremes.call(this,c),this.dataMax=Math.max(this.dataMax,a),this.dataMin=Math.min(this.dataMin,e))}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());g.pointClass.prototype.destroy.apply(this,arguments)}})})(c)});
//# sourceMappingURL=bullet.js.map