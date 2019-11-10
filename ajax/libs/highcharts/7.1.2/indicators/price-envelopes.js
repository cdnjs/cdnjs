/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/price-envelopes",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,k,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,k))}a=a?a._modules:{};c(a,"indicators/price-envelopes.src.js",[a["parts/Globals.js"]],function(a){var c=a.merge,k=a.isArray,
g=a.seriesTypes.sma;a.seriesType("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eTop: {point.top}\x3cbr/\x3eMiddle: {point.middle}\x3cbr/\x3eBottom: {point.bottom}\x3cbr/\x3e'},params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand",
"bottomBand"],nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){g.prototype.init.apply(this,arguments);this.options=c({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(b){return[b.top,b.middle,b.bottom]},translate:function(){var b=this,a=["plotTop","plotMiddle","plotBottom"];g.prototype.translate.apply(b);b.points.forEach(function(f){[f.top,
f.middle,f.bottom].forEach(function(c,q){null!==c&&(f[a[q]]=b.yAxis.toPixels(c,!0))})})},drawGraph:function(){for(var b=this,a=b.points,f=a.length,l=b.options,k=b.graph,p={options:{gapSize:l.gapSize}},m=[[],[]],d;f--;)d=a[f],m[0].push({plotX:d.plotX,plotY:d.plotTop,isNull:d.isNull}),m[1].push({plotX:d.plotX,plotY:d.plotBottom,isNull:d.isNull});["topLine","bottomLine"].forEach(function(a,f){b.points=m[f];b.options=c(l[a].styles,p);b.graph=b["graph"+a];g.prototype.drawGraph.call(b);b["graph"+a]=b.graph});
b.points=a;b.options=l;b.graph=k;g.prototype.drawGraph.call(b)},getValues:function(a,c){var b=c.period,l=c.topBand,q=c.bottomBand,p=a.xData,m=(a=a.yData)?a.length:0,d=[],e,r,t,n,u=[],v=[],h;if(p.length<b||!k(a[0])||4!==a[0].length)return!1;for(h=b;h<=m;h++)n=p.slice(h-b,h),e=a.slice(h-b,h),e=g.prototype.getValues.call(this,{xData:n,yData:e},c),n=e.xData[0],e=e.yData[0],r=e*(1+l),t=e*(1-q),d.push([n,r,e,t]),u.push(n),v.push([r,e,t]);return{values:d,xData:u,yData:v}}})});c(a,"masters/indicators/price-envelopes.src.js",
[],function(){})});
//# sourceMappingURL=price-envelopes.js.map