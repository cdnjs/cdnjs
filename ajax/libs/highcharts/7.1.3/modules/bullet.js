/*
 Highcharts JS v7.1.3 (2019-08-14)

 Bullet graph series type for Highcharts

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/bullet",["highcharts"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,k,b,l){a.hasOwnProperty(k)||(a[k]=l.apply(null,b))}a=a?a._modules:{};b(a,"modules/bullet.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var p=b.isNumber,l=a.pick,k=a.relativeLength;
b=a.seriesType;var f=a.seriesTypes.column.prototype;b("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b>. Target: <b>{point.target}</b><br/>'}},{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var d=this,b=d.chart,q=d.options,u=q.animationLimit||250;f.drawPoints.apply(this);d.points.forEach(function(c){var f=c.options,e=c.targetGraphic,m=c.target,
n=c.y;if(p(m)&&null!==m){var g=a.merge(q.targetOptions,f.targetOptions);var t=g.height;var h=c.shapeArgs;var r=k(g.width,h.width);var v=d.yAxis.translate(m,!1,!0,!1,!0)-g.height/2-.5;h=d.crispCol.apply({chart:b,borderWidth:g.borderWidth,options:{crisp:q.crisp}},[h.x+h.width/2-r/2,v,r,t]);e?(e[b.pointCount<u?"animate":"attr"](h),p(n)&&null!==n?e.element.point=c:e.element.point=void 0):c.targetGraphic=e=b.renderer.rect().attr(h).add(d.group);b.styledMode||e.attr({fill:l(g.color,f.color,d.zones.length&&
(c.getZone.call({series:d,x:c.x,y:m,options:{}}).color||d.color)||void 0,c.color,d.color),stroke:l(g.borderColor,c.borderColor,d.options.borderColor),"stroke-width":g.borderWidth});p(n)&&null!==n&&(e.element.point=c);e.addClass(c.getClassName()+" highcharts-bullet-target",!0)}else e&&(c.targetGraphic=e.destroy())})},getExtremes:function(a){var b=this.targetData;f.getExtremes.call(this,a);if(b&&b.length){a=this.dataMax;var d=this.dataMin;f.getExtremes.call(this,b);this.dataMax=Math.max(this.dataMax,
a);this.dataMin=Math.min(this.dataMin,d)}}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());f.pointClass.prototype.destroy.apply(this,arguments)}});""});b(a,"masters/modules/bullet.src.js",[],function(){})});
//# sourceMappingURL=bullet.js.map