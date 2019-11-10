/*
  Highcharts JS v6.0.7 (2018-02-16)
 Highcharts variwide module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(b){var d=b.seriesType,l=b.seriesTypes,k=b.each,m=b.pick;d("variwide","column",{pointPadding:0,groupPadding:0},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],processData:function(){var a=this;this.totalZ=0;this.relZ=[];l.column.prototype.processData.call(this);k(this.zData,function(g,c){a.relZ[c]=a.totalZ;a.totalZ+=g});this.xAxis.categories&&(this.xAxis.variwide=!0)},postTranslate:function(a,
g){var c=this.relZ,h=this.xAxis.len,e=this.totalZ,f=a/c.length*h,b=(a+1)/c.length*h,d=m(c[a],e)/e*h;a=m(c[a+1],e)/e*h;return d+(g-f)*(a-d)/(b-f)},translate:function(){var a=this.options.crisp;this.options.crisp=!1;l.column.prototype.translate.call(this);this.options.crisp=a;var b=this.chart.inverted,c=this.borderWidth%2/2;k(this.points,function(a,e){var f=this.postTranslate(e,a.shapeArgs.x),d=this.postTranslate(e,a.shapeArgs.x+a.shapeArgs.width);this.options.crisp&&(f=Math.round(f)-c,d=Math.round(d)-
c);a.shapeArgs.x=f;a.shapeArgs.width=d-f;a.tooltipPos[b?1:0]=this.postTranslate(e,a.tooltipPos[b?1:0])},this)}},{isValid:function(){return b.isNumber(this.y,!0)&&b.isNumber(this.z,!0)}});b.Tick.prototype.postTranslate=function(a,b,c){a[b]=this.axis.pos+this.axis.series[0].postTranslate(c,a[b]-this.axis.pos)};b.wrap(b.Tick.prototype,"getPosition",function(a,b,c){var d=this.axis,e=a.apply(this,Array.prototype.slice.call(arguments,1)),f=b?"x":"y";d.categories&&d.variwide&&(this[f+"Orig"]=e[f],this.postTranslate(e,
f,c));return e});b.wrap(b.Tick.prototype,"getLabelPosition",function(a,b,d,h,e,f,l,k){var c=Array.prototype.slice.call(arguments,1),g=e?"x":"y";this.axis.variwide&&"number"===typeof this[g+"Orig"]&&(c[e?0:1]=this[g+"Orig"]);c=a.apply(this,c);this.axis.variwide&&this.axis.categories&&this.postTranslate(c,g,k);return c})})(d)});
