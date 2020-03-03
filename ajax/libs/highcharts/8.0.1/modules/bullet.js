/*
 Highcharts JS v8.0.1 (2020-03-02)

 Bullet graph series type for Highcharts

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/bullet",["highcharts"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,m){a.hasOwnProperty(b)||(a[b]=m.apply(null,d))}a=a?a._modules:{};d(a,"modules/bullet.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var d=b.isNumber,m=b.merge,p=b.pick,r=b.relativeLength;
b=b.seriesType;var f=a.seriesTypes.column.prototype;b("bullet","column",{targetOptions:{width:"140%",height:3,borderWidth:0},tooltip:{pointFormat:'<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b>. Target: <b>{point.target}</b><br/>'}},{pointArrayMap:["y","target"],parallelArrays:["x","y","target"],drawPoints:function(){var a=this,b=a.chart,n=a.options,u=n.animationLimit||250;f.drawPoints.apply(this);a.points.forEach(function(c){var f=c.options,e=c.targetGraphic,k=c.target,
l=c.y;if(d(k)&&null!==k){var g=m(n.targetOptions,f.targetOptions);var t=g.height;var h=c.shapeArgs;var q=r(g.width,h.width);var v=a.yAxis.translate(k,!1,!0,!1,!0)-g.height/2-.5;h=a.crispCol.apply({chart:b,borderWidth:g.borderWidth,options:{crisp:n.crisp}},[h.x+h.width/2-q/2,v,q,t]);e?(e[b.pointCount<u?"animate":"attr"](h),d(l)&&null!==l?e.element.point=c:e.element.point=void 0):c.targetGraphic=e=b.renderer.rect().attr(h).add(a.group);b.styledMode||e.attr({fill:p(g.color,f.color,a.zones.length&&(c.getZone.call({series:a,
x:c.x,y:k,options:{}}).color||a.color)||void 0,c.color,a.color),stroke:p(g.borderColor,c.borderColor,a.options.borderColor),"stroke-width":g.borderWidth});d(l)&&null!==l&&(e.element.point=c);e.addClass(c.getClassName()+" highcharts-bullet-target",!0)}else e&&(c.targetGraphic=e.destroy())})},getExtremes:function(a){var b=this.targetData;f.getExtremes.call(this,a);if(b&&b.length){a=this.dataMax;var d=this.dataMin;f.getExtremes.call(this,b);this.dataMax=Math.max(this.dataMax,a);this.dataMin=Math.min(this.dataMin,
d)}}},{destroy:function(){this.targetGraphic&&(this.targetGraphic=this.targetGraphic.destroy());f.pointClass.prototype.destroy.apply(this,arguments)}});""});d(a,"masters/modules/bullet.src.js",[],function(){})});
//# sourceMappingURL=bullet.js.map