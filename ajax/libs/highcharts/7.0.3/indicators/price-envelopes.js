/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){(function(b){var h=b.merge,u=b.isArray,f=b.seriesTypes.sma;b.seriesType("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eTop: {point.top}\x3cbr/\x3eMiddle: {point.middle}\x3cbr/\x3eBottom: {point.bottom}\x3cbr/\x3e'},
params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand","bottomBand"],nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){f.prototype.init.apply(this,arguments);this.options=h({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},
toYData:function(a){return[a.top,a.middle,a.bottom]},translate:function(){var a=this,b=["plotTop","plotMiddle","plotBottom"];f.prototype.translate.apply(a);a.points.forEach(function(c){[c.top,c.middle,c.bottom].forEach(function(k,f){null!==k&&(c[b[f]]=a.yAxis.toPixels(k,!0))})})},drawGraph:function(){for(var a=this,b=a.points,c=b.length,l=a.options,q=a.graph,p={options:{gapSize:l.gapSize}},m=[[],[]],d;c--;)d=b[c],m[0].push({plotX:d.plotX,plotY:d.plotTop,isNull:d.isNull}),m[1].push({plotX:d.plotX,
plotY:d.plotBottom,isNull:d.isNull});["topLine","bottomLine"].forEach(function(b,c){a.points=m[c];a.options=h(l[b].styles,p);a.graph=a["graph"+b];f.prototype.drawGraph.call(a);a["graph"+b]=a.graph});a.points=b;a.options=l;a.graph=q;f.prototype.drawGraph.call(a)},getValues:function(a,b){var c=b.period,l=b.topBand,q=b.bottomBand,p=a.xData,m=(a=a.yData)?a.length:0,d=[],e,r,t,n,h=[],k=[],g;if(p.length<c||!u(a[0])||4!==a[0].length)return!1;for(g=c;g<=m;g++)n=p.slice(g-c,g),e=a.slice(g-c,g),e=f.prototype.getValues.call(this,
{xData:n,yData:e},b),n=e.xData[0],e=e.yData[0],r=e*(1+l),t=e*(1-q),d.push([n,r,e,t]),h.push(n),k.push([r,e,t]);return{values:d,xData:h,yData:k}}})})(b)});
//# sourceMappingURL=price-envelopes.js.map