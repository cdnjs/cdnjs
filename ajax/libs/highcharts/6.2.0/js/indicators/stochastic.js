/*
  Highcharts JS v6.2.0 (2018-10-17)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:"function"===typeof define&&define.amd?define(function(){return d}):d(Highcharts)})(function(d){(function(b){function d(a,c){return b.reduce(a,function(a,b){return Math.min(a,b[c])},Infinity)}function t(a,c){return b.reduce(a,function(a,b){return Math.max(a,b[c])},0)}var u=b.each,g=b.merge,v=b.isArray,w=b.defined,h=b.seriesTypes.sma;b.seriesType("stochastic","sma",{name:"Stochastic (14, 3)",params:{periods:[14,3]},marker:{enabled:!1},
tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3e%K: {point.y}\x3cbr/\x3e%D: {point.smoothed}\x3cbr/\x3e'},smoothedLine:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}},{nameComponents:["periods"],nameBase:"Stochastic",pointArrayMap:["y","smoothed"],parallelArrays:["x","y","smoothed"],pointValKey:"y",init:function(){h.prototype.init.apply(this,arguments);this.options=g({smoothedLine:{styles:{lineColor:this.color}}},
this.options)},toYData:function(a){return[a.y,a.smoothed]},translate:function(){var a=this;h.prototype.translate.apply(a);u(a.points,function(c){null!==c.smoothed&&(c.plotSmoothed=a.yAxis.toPixels(c.smoothed,!0))})},drawGraph:function(){for(var a=this.points,c=a.length,b=this.options,d=this.graph,q={options:{gapSize:b.gapSize}},k=[],f;c--;)f=a[c],k.push({plotX:f.plotX,plotY:f.plotSmoothed,isNull:!w(f.plotSmoothed)});this.points=k;this.options=g(b.smoothedLine.styles,q);this.graph=this.graphSmoothed;
h.prototype.drawGraph.call(this);this.graphSmoothed=this.graph;this.points=a;this.options=b;this.graph=d;h.prototype.drawGraph.call(this)},getValues:function(a,c){var b=c.periods[0];c=c.periods[1];var g=a.xData,q=(a=a.yData)?a.length:0,k=[],f=[],l=[],m,n,r,p=null,e;if(q<b||!v(a[0])||4!==a[0].length)return!1;for(e=b-1;e<q;e++)m=a.slice(e-b+1,e+1),r=d(m,2),n=a[e][3]-r,m=t(m,1)-r,n=n/m*100,f.push(g[e]),l.push([n,null]),e>=b-1+(c-1)&&(p=h.prototype.getValues.call(this,{xData:f.slice(-c),yData:l.slice(-c)},
{period:c}),p=p.yData[0]),k.push([g[e],n,p]),l[l.length-1][1]=p;return{values:k,xData:f,yData:l}}})})(d)});
//# sourceMappingURL=stochastic.js.map
