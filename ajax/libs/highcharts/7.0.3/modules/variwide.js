/*
  Highcharts JS v7.0.3 (2019-02-06)
 Highcharts variwide module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define(function(){return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){(function(c){var d=c.addEvent,p=c.seriesType,n=c.seriesTypes,l=c.pick;p("variwide","column",{pointPadding:0,groupPadding:0},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],processData:function(a){this.totalZ=0;this.relZ=[];n.column.prototype.processData.call(this,a);(this.xAxis.reversed?
this.zData.slice().reverse():this.zData).forEach(function(a,m){this.relZ[m]=this.totalZ;this.totalZ+=a},this);this.xAxis.categories&&(this.xAxis.variwide=!0,this.xAxis.zData=this.zData)},postTranslate:function(a,h,m){var e=this.xAxis,b=this.relZ;a=e.reversed?b.length-a:a;var c=e.reversed?-1:1,k=e.len,d=this.totalZ,e=a/b.length*k,f=(a+c)/b.length*k,g=l(b[a],d)/d*k,b=l(b[a+c],d)/d*k;m&&(m.crosshairWidth=b-g);return g+(h-e)*(b-g)/(f-e)},translate:function(){var a=this.options.crisp,h=this.xAxis;this.options.crisp=
!1;n.column.prototype.translate.call(this);this.options.crisp=a;var d=this.chart.inverted,e=this.borderWidth%2/2;this.points.forEach(function(b,a){var c;h.variwide?(c=this.postTranslate(a,b.shapeArgs.x,b),a=this.postTranslate(a,b.shapeArgs.x+b.shapeArgs.width)):(c=b.plotX,a=h.translate(b.x+b.z,0,0,0,1));this.options.crisp&&(c=Math.round(c)-e,a=Math.round(a)-e);b.shapeArgs.x=c;b.shapeArgs.width=a-c;b.plotX=(c+a)/2;d?b.tooltipPos[1]=h.len-b.shapeArgs.x-b.shapeArgs.width/2:b.tooltipPos[0]=b.shapeArgs.x+
b.shapeArgs.width/2},this)}},{isValid:function(){return c.isNumber(this.y,!0)&&c.isNumber(this.z,!0)}});c.Tick.prototype.postTranslate=function(a,c,d){var e=this.axis,b=a[c]-e.pos;e.horiz||(b=e.len-b);b=e.series[0].postTranslate(d,b);e.horiz||(b=e.len-b);a[c]=e.pos+b};d(c.Axis,"afterDrawCrosshair",function(a){this.variwide&&this.cross&&this.cross.attr("stroke-width",a.point&&a.point.crosshairWidth)});d(c.Axis,"afterRender",function(){var a=this;!this.horiz&&this.variwide&&this.chart.labelCollectors.push(function(){return a.tickPositions.map(function(c,
d){c=a.ticks[c].label;c.labelrank=a.zData[d];return c})})});d(c.Tick,"afterGetPosition",function(a){var c=this.axis,d=c.horiz?"x":"y";c.variwide&&(this[d+"Orig"]=a.pos[d],this.postTranslate(a.pos,d,this.pos))});c.wrap(c.Tick.prototype,"getLabelPosition",function(a,c,d,e,b,n,k,l){var f=Array.prototype.slice.call(arguments,1),g=b?"x":"y";this.axis.variwide&&"number"===typeof this[g+"Orig"]&&(f[b?0:1]=this[g+"Orig"]);f=a.apply(this,f);this.axis.variwide&&this.axis.categories&&this.postTranslate(f,g,
l);return f})})(d)});
//# sourceMappingURL=variwide.js.map