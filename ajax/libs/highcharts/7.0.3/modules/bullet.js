/*
  Highcharts JS v7.0.3 (2019-02-06)

 Bullet graph series type for Highcharts

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var r=a.pick,n=a.isNumber,v=a.relativeLength,p=a.seriesType,f=a.seriesTypes.column.prototype;p("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e. Target: \x3cb\x3e{point.target}\x3c/b\x3e\x3cbr/\x3e'}},
{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var b=this,k=b.chart,h=b.options,p=h.animationLimit||250;f.drawPoints.apply(this);b.points.forEach(function(c){var f=c.options,g,d=c.targetGraphic,l=c.target,m=c.y,q,t,e,u;n(l)&&null!==l?(e=a.merge(h.targetOptions,f.targetOptions),t=e.height,g=c.shapeArgs,q=v(e.width,g.width),u=b.yAxis.translate(l,!1,!0,!1,!0)-e.height/2-.5,g=b.crispCol.apply({chart:k,borderWidth:e.borderWidth,options:{crisp:h.crisp}},[g.x+g.width/
2-q/2,u,q,t]),d?(d[k.pointCount<p?"animate":"attr"](g),n(m)&&null!==m?d.element.point=c:d.element.point=void 0):c.targetGraphic=d=k.renderer.rect().attr(g).add(b.group),k.styledMode||d.attr({fill:r(e.color,f.color,b.zones.length&&(c.getZone.call({series:b,x:c.x,y:l,options:{}}).color||b.color)||void 0,c.color,b.color),stroke:r(e.borderColor,c.borderColor,b.options.borderColor),"stroke-width":e.borderWidth}),n(m)&&null!==m&&(d.element.point=c),d.addClass(c.getClassName()+" highcharts-bullet-target",
!0)):d&&(c.targetGraphic=d.destroy())})},getExtremes:function(b){var a=this.targetData,h;f.getExtremes.call(this,b);a&&a.length&&(b=this.dataMax,h=this.dataMin,f.getExtremes.call(this,a),this.dataMax=Math.max(this.dataMax,b),this.dataMin=Math.min(this.dataMin,h))}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());f.pointClass.prototype.destroy.apply(this,arguments)}})})(a)});
//# sourceMappingURL=bullet.js.map