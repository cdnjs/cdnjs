/*
  Highcharts JS v6.2.0 (2018-10-17)

 Bullet graph series type for Highcharts

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(c){var a=c.each,l=c.isNumber,r=c.relativeLength,m=c.seriesType,d=c.seriesTypes.column.prototype;m("bullet","column",{targetOptions:{width:"140%",height:3},tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cspan class\x3d"highcharts-strong"\x3e{point.y}\x3c/span\x3e. Target: \x3cspan class\x3d"highcharts-strong"\x3e{point.target}\x3c/span\x3e\x3cbr/\x3e'}},
{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var h=this,g=h.chart,n=h.options,m=n.animationLimit||250;d.drawPoints.apply(this);a(h.points,function(b){var f=b.options,e=b.targetGraphic,a=b.target,d=b.y,p,q,k;l(a)&&null!==a?(k=c.merge(n.targetOptions,f.targetOptions),q=k.height,f=b.shapeArgs,p=r(k.width,f.width),a=h.yAxis.translate(a,!1,!0,!1,!0)-k.height/2-.5,f=h.crispCol.apply({chart:g,borderWidth:k.borderWidth,options:{crisp:n.crisp}},[f.x+f.width/2-p/2,a,
p,q]),e?(e[g.pointCount<m?"animate":"attr"](f),l(d)&&null!==d?e.element.point=b:e.element.point=void 0):b.targetGraphic=e=g.renderer.rect().attr(f).add(h.group),l(d)&&null!==d&&(e.element.point=b),e.addClass(b.getClassName()+" highcharts-bullet-target",!0)):e&&(b.targetGraphic=e.destroy())})},getExtremes:function(a){var g=this.targetData,c;d.getExtremes.call(this,a);g&&g.length&&(a=this.dataMax,c=this.dataMin,d.getExtremes.call(this,g),this.dataMax=Math.max(this.dataMax,a),this.dataMin=Math.min(this.dataMin,
c))}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());d.pointClass.prototype.destroy.apply(this,arguments)}})})(a)});
//# sourceMappingURL=bullet.js.map
