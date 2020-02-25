/*
 Highcharts JS v8.0.0 (2019-12-10)

 Bullet graph series type for Highcharts

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/bullet",["highcharts"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,l){a.hasOwnProperty(b)||(a[b]=l.apply(null,d))}a=a?a._modules:{};d(a,"modules/bullet.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var d=b.isNumber,l=b.pick,r=b.relativeLength;
b=a.seriesType;var g=a.seriesTypes.column.prototype;b("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b>. Target: <b>{point.target}</b><br/>'}},{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var e=this,b=e.chart,p=e.options,u=p.animationLimit||250;g.drawPoints.apply(this);e.points.forEach(function(c){var g=c.options,f=c.targetGraphic,m=c.target,
n=c.y;if(d(m)&&null!==m){var h=a.merge(p.targetOptions,g.targetOptions);var t=h.height;var k=c.shapeArgs;var q=r(h.width,k.width);var v=e.yAxis.translate(m,!1,!0,!1,!0)-h.height/2-.5;k=e.crispCol.apply({chart:b,borderWidth:h.borderWidth,options:{crisp:p.crisp}},[k.x+k.width/2-q/2,v,q,t]);f?(f[b.pointCount<u?"animate":"attr"](k),d(n)&&null!==n?f.element.point=c:f.element.point=void 0):c.targetGraphic=f=b.renderer.rect().attr(k).add(e.group);b.styledMode||f.attr({fill:l(h.color,g.color,e.zones.length&&
(c.getZone.call({series:e,x:c.x,y:m,options:{}}).color||e.color)||void 0,c.color,e.color),stroke:l(h.borderColor,c.borderColor,e.options.borderColor),"stroke-width":h.borderWidth});d(n)&&null!==n&&(f.element.point=c);f.addClass(c.getClassName()+" highcharts-bullet-target",!0)}else f&&(c.targetGraphic=f.destroy())})},getExtremes:function(a){var b=this.targetData;g.getExtremes.call(this,a);if(b&&b.length){a=this.dataMax;var d=this.dataMin;g.getExtremes.call(this,b);this.dataMax=Math.max(this.dataMax,
a);this.dataMin=Math.min(this.dataMin,d)}}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());g.pointClass.prototype.destroy.apply(this,arguments)}});""});d(a,"masters/modules/bullet.src.js",[],function(){})});
//# sourceMappingURL=bullet.js.map