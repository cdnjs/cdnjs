/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(c){function e(a,b){return c.reduce(a,function(a,f){return Math.min(a,f[b])},Infinity)}function u(a,b){return c.reduce(a,function(a,f){return Math.max(a,f[b])},0)}var v=c.each,n=c.merge,w=c.isArray,x=c.defined,h=c.seriesTypes.sma;c.seriesType("stochastic","sma",{name:"Stochastic (14, 3)",params:{periods:[14,3]},marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3e%K: {point.y}\x3cbr/\x3e%D: {point.smoothed}\x3cbr/\x3e'},
smoothedLine:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}},{pointArrayMap:["y","smoothed"],parallelArrays:["x","y","smoothed"],pointValKey:"y",init:function(){h.prototype.init.apply(this,arguments);this.options=n({smoothedLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(a){return[a.y,a.smoothed]},translate:function(){var a=this;h.prototype.translate.apply(a);v(a.points,function(b){null!==b.smoothed&&(b.plotSmoothed=a.yAxis.toPixels(b.smoothed,
!0))})},drawGraph:function(){for(var a=this.points,b=a.length,p=this.options,f=this.graph,c={options:{gapSize:p.gapSize}},e=[],g;b--;)g=a[b],e.push({plotX:g.plotX,plotY:g.plotSmoothed,isNull:!x(g.plotSmoothed)});this.points=e;this.options=n(p.smoothedLine.styles,c);this.graph=this.graphSmoothed;h.prototype.drawGraph.call(this);this.graphSmoothed=this.graph;this.points=a;this.options=p;this.graph=f;h.prototype.drawGraph.call(this)},getValues:function(a,b){var c=b.periods[0];b=b.periods[1];var f=a.xData,
n=(a=a.yData)?a.length:0,t=[],g=[],q=[],k,l,r,m=null,d;if(f.length<c||!w(a[0])||4!==a[0].length)return!1;for(d=c-1;d<n;d++)k=a.slice(d-c+1,d+1),r=e(k,2),l=a[d][3]-r,k=u(k,1)-r,l=l/k*100,d>=c+b&&(m=h.prototype.getValues.call(this,{xData:g.slice(d-b-c,d-b),yData:q.slice(d-b-c,d-b)},{period:b}),m=m.yData[0]),t.push([f[d],l,m]),g.push(f[d]),q.push([l,m]);return{values:t,xData:g,yData:q}}})})(e)});
