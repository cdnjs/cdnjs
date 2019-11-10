/*
  Highcharts JS v6.1.4 (2018-09-25)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b(Highcharts)})(function(b){(function(b){var h=b.each,k=b.merge,u=b.isArray,f=b.seriesTypes.sma;b.seriesType("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eTop: {point.top}\x3cbr/\x3eMiddle: {point.middle}\x3cbr/\x3eBottom: {point.bottom}\x3cbr/\x3e'},
params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand","bottomBand"],nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){f.prototype.init.apply(this,arguments);this.options=k({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},
toYData:function(a){return[a.top,a.middle,a.bottom]},translate:function(){var a=this,b=["plotTop","plotMiddle","plotBottom"];f.prototype.translate.apply(a);h(a.points,function(c){h([c.top,c.middle,c.bottom],function(l,f){null!==l&&(c[b[f]]=a.yAxis.toPixels(l,!0))})})},drawGraph:function(){for(var a=this,b=a.points,c=b.length,m=a.options,v=a.graph,q={options:{gapSize:m.gapSize}},n=[[],[]],d;c--;)d=b[c],n[0].push({plotX:d.plotX,plotY:d.plotTop,isNull:d.isNull}),n[1].push({plotX:d.plotX,plotY:d.plotBottom,
isNull:d.isNull});h(["topLine","bottomLine"],function(b,c){a.points=n[c];a.options=k(m[b].styles,q);a.graph=a["graph"+b];f.prototype.drawGraph.call(a);a["graph"+b]=a.graph});a.points=b;a.options=m;a.graph=v;f.prototype.drawGraph.call(a)},getValues:function(a,b){var c=b.period,m=b.topBand,h=b.bottomBand,q=a.xData,n=(a=a.yData)?a.length:0,d=[],e,r,t,p,k=[],l=[],g;if(q.length<c||!u(a[0])||4!==a[0].length)return!1;for(g=c;g<=n;g++)p=q.slice(g-c,g),e=a.slice(g-c,g),e=f.prototype.getValues.call(this,{xData:p,
yData:e},b),p=e.xData[0],e=e.yData[0],r=e*(1+m),t=e*(1-h),d.push([p,r,e,t]),k.push(p),l.push([r,e,t]);return{values:d,xData:k,yData:l}}})})(b)});
//# sourceMappingURL=price-envelopes.js.map
