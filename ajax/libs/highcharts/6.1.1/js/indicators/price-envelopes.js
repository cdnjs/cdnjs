/*
  Highcharts JS v6.1.1 (2018-06-27)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(e){var b=e.each,k=e.merge,u=e.isArray,l=e.seriesTypes.sma;e.seriesType("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eTop: {point.top}\x3cbr/\x3eMiddle: {point.middle}\x3cbr/\x3eBottom: {point.bottom}\x3cbr/\x3e'},params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,
lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand","bottomBand"],nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){l.prototype.init.apply(this,arguments);this.options=k({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(a){return[a.top,a.middle,a.bottom]},translate:function(){var a=
this,g=["plotTop","plotMiddle","plotBottom"];l.prototype.translate.apply(a);b(a.points,function(c){b([c.top,c.middle,c.bottom],function(b,e){null!==b&&(c[g[e]]=a.yAxis.toPixels(b,!0))})})},drawGraph:function(){for(var a=this,g=a.points,c=g.length,e=a.options,v=a.graph,p={options:{gapSize:e.gapSize}},m=[[],[]],f;c--;)f=g[c],m[0].push({plotX:f.plotX,plotY:f.plotTop,isNull:f.isNull}),m[1].push({plotX:f.plotX,plotY:f.plotBottom,isNull:f.isNull});b(["topLine","bottomLine"],function(d,c){a.points=m[c];
a.options=k(e[d].styles,p);a.graph=a["graph"+d];l.prototype.drawGraph.call(a);a["graph"+d]=a.graph});a.points=g;a.options=e;a.graph=v;l.prototype.drawGraph.call(a)},getValues:function(a,b){var c=b.period,e=b.topBand,g=b.bottomBand,p=a.xData,m=(a=a.yData)?a.length:0,f=[],d,q,r,n,k=[],t=[],h;if(p.length<c||!u(a[0])||4!==a[0].length)return!1;for(h=c;h<=m;h++)n=p.slice(h-c,h),d=a.slice(h-c,h),d=l.prototype.getValues.call(this,{xData:n,yData:d},b),n=d.xData[0],d=d.yData[0],q=d*(1+e),r=d*(1-g),f.push([n,
q,d,r]),k.push(n),t.push([q,d,r]);return{values:f,xData:k,yData:t}}})})(b)});
