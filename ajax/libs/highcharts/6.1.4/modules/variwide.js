/*
  Highcharts JS v6.1.4 (2018-09-25)
 Highcharts variwide module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:"function"===typeof define&&define.amd?define(function(){return g}):g(Highcharts)})(function(g){(function(c){var g=c.addEvent,q=c.seriesType,l=c.seriesTypes,m=c.each,n=c.pick;q("variwide","column",{pointPadding:0,groupPadding:0},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],processData:function(){this.totalZ=0;this.relZ=[];l.column.prototype.processData.call(this);m(this.xAxis.reversed?this.zData.slice().reverse():this.zData,
function(b,f){this.relZ[f]=this.totalZ;this.totalZ+=b},this);this.xAxis.categories&&(this.xAxis.variwide=!0,this.xAxis.zData=this.zData)},postTranslate:function(b,f,c){var e=this.xAxis,a=this.relZ;b=e.reversed?a.length-b:b;var p=e.reversed?-1:1,k=e.len,d=this.totalZ,e=b/a.length*k,g=(b+p)/a.length*k,h=n(a[b],d)/d*k,a=n(a[b+p],d)/d*k;c&&(c.crosshairWidth=a-h);return h+(f-e)*(a-h)/(g-e)},translate:function(){var b=this.options.crisp,f=this.xAxis;this.options.crisp=!1;l.column.prototype.translate.call(this);
this.options.crisp=b;var c=this.chart.inverted,e=this.borderWidth%2/2;m(this.points,function(a,b){var d;f.variwide?(d=this.postTranslate(b,a.shapeArgs.x,a),b=this.postTranslate(b,a.shapeArgs.x+a.shapeArgs.width)):(d=a.plotX,b=f.translate(a.x+a.z,0,0,0,1));this.options.crisp&&(d=Math.round(d)-e,b=Math.round(b)-e);a.shapeArgs.x=d;a.shapeArgs.width=b-d;a.plotX=(d+b)/2;c?a.tooltipPos[1]=f.len-a.shapeArgs.x-a.shapeArgs.width/2:a.tooltipPos[0]=a.shapeArgs.x+a.shapeArgs.width/2},this)}},{isValid:function(){return c.isNumber(this.y,
!0)&&c.isNumber(this.z,!0)}});c.Tick.prototype.postTranslate=function(b,c,d){var e=this.axis,a=b[c]-e.pos;e.horiz||(a=e.len-a);a=e.series[0].postTranslate(d,a);e.horiz||(a=e.len-a);b[c]=e.pos+a};g(c.Axis,"afterDrawCrosshair",function(b){this.variwide&&this.cross&&this.cross.attr("stroke-width",b.point&&b.point.crosshairWidth)});g(c.Axis,"afterRender",function(){var b=this;!this.horiz&&this.variwide&&this.chart.labelCollectors.push(function(){return c.map(b.tickPositions,function(c,d){c=b.ticks[c].label;
c.labelrank=b.zData[d];return c})})});g(c.Tick,"afterGetPosition",function(b){var c=this.axis,d=c.horiz?"x":"y";c.variwide&&(this[d+"Orig"]=b.pos[d],this.postTranslate(b.pos,d,this.pos))});c.wrap(c.Tick.prototype,"getLabelPosition",function(b,c,d,e,a,g,k,l){var f=Array.prototype.slice.call(arguments,1),h=a?"x":"y";this.axis.variwide&&"number"===typeof this[h+"Orig"]&&(f[a?0:1]=this[h+"Orig"]);f=b.apply(this,f);this.axis.variwide&&this.axis.categories&&this.postTranslate(f,h,l);return f})})(g)});
//# sourceMappingURL=variwide.js.map
