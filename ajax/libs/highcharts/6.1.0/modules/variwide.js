/*
  Highcharts JS v6.1.0 (2018-04-13)
 Highcharts variwide module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?module.exports=c:c(Highcharts)})(function(c){(function(b){var c=b.addEvent,n=b.seriesType,g=b.seriesTypes,k=b.each,m=b.pick;n("variwide","column",{pointPadding:0,groupPadding:0},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],processData:function(){var a=this;this.totalZ=0;this.relZ=[];g.column.prototype.processData.call(this);k(this.zData,function(e,d){a.relZ[d]=a.totalZ;a.totalZ+=e});this.xAxis.categories&&(this.xAxis.variwide=!0)},postTranslate:function(a,
e){var d=this.relZ,h=this.xAxis.len,b=this.totalZ,l=a/d.length*h,f=(a+1)/d.length*h,c=m(d[a],b)/b*h;a=m(d[a+1],b)/b*h;return c+(e-l)*(a-c)/(f-l)},translate:function(){var a=this.options.crisp;this.options.crisp=!1;g.column.prototype.translate.call(this);this.options.crisp=a;var b=this.chart.inverted,d=this.borderWidth%2/2;k(this.points,function(a,e){var c=this.postTranslate(e,a.shapeArgs.x),f=this.postTranslate(e,a.shapeArgs.x+a.shapeArgs.width);this.options.crisp&&(c=Math.round(c)-d,f=Math.round(f)-
d);a.shapeArgs.x=c;a.shapeArgs.width=f-c;a.plotX=(c+f)/2;a.crosshairWidth=f-c;a.tooltipPos[b?1:0]=this.postTranslate(e,a.tooltipPos[b?1:0])},this)}},{isValid:function(){return b.isNumber(this.y,!0)&&b.isNumber(this.z,!0)}});b.Tick.prototype.postTranslate=function(a,b,c){a[b]=this.axis.pos+this.axis.series[0].postTranslate(c,a[b]-this.axis.pos)};c(b.Axis,"afterDrawCrosshair",function(a){this.variwide&&this.cross.attr("stroke-width",a.point&&a.point.shapeArgs.width)});c(b.Tick,"afterGetPosition",function(a){var b=
this.axis,c=b.horiz?"x":"y";b.categories&&b.variwide&&(this[c+"Orig"]=a.pos[c],this.postTranslate(a.pos,c,this.pos))});b.wrap(b.Tick.prototype,"getLabelPosition",function(a,b,c,h,g,l,f,k){var d=Array.prototype.slice.call(arguments,1),e=g?"x":"y";this.axis.variwide&&"number"===typeof this[e+"Orig"]&&(d[g?0:1]=this[e+"Orig"]);d=a.apply(this,d);this.axis.variwide&&this.axis.categories&&this.postTranslate(d,e,k);return d})})(c)});
