/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:"function"===typeof define&&define.amd?define(function(){return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){var u=function(f){var l=f.each,e=f.merge,d=f.error,t=f.defined,k=f.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var b=[];l(this.pointArrayMap,function(c){c!==a&&b.push("plot"+c.charAt(0).toUpperCase()+c.slice(1))});
return b},toYData:function(a){var b=[];l(this.pointArrayMap,function(c){b.push(a[c])});return b},translate:function(){var a=this,b=a.pointArrayMap,c=[],d,c=a.getTranslatedLinesNames();k.prototype.translate.apply(a,arguments);l(a.points,function(g){l(b,function(b,h){d=g[b];null!==d&&(g[c[h]]=a.yAxis.toPixels(d,!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,c=a.points,f=c.length,g=a.options,m=a.graph,h={options:{gapSize:g.gapSize}},p=[],r=a.getTranslatedLinesNames(a.pointValKey),n;l(r,
function(a,b){for(p[b]=[];f--;)n=c[f],p[b].push({x:n.x,plotX:n.plotX,plotY:n[a],isNull:!t(n[a])});f=c.length});l(b,function(b,c){p[c]?(a.points=p[c],g[b]?a.options=e(g[b].styles,h):d('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+b],k.prototype.drawGraph.call(a),a["graph"+b]=a.graph):d('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});
a.points=c;a.options=g;a.graph=m;k.prototype.drawGraph.call(a)}}}(e);(function(f,e){function l(d,f){var k=d[0],a=0,b;for(b=1;b<d.length;b++)if("max"===f&&d[b]>=k||"min"===f&&d[b]<=k)k=d[b],a=b;return a}f.seriesType("aroon","sma",{params:{period:25},marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eAroon Up: {point.y}\x3cbr/\x3eAroon Down: {point.aroonDown}\x3cbr/\x3e'},aroonDown:{styles:{lineWidth:1,
lineColor:void 0}},dataGrouping:{approximation:"averages"}},f.merge(e,{nameBase:"Aroon",pointArrayMap:["y","aroonDown"],pointValKey:"y",linesApiNames:["aroonDown"],getValues:function(d,e){e=e.period;var k=d.xData,a=(d=d.yData)?d.length:0,b=[],c=[],q=[],g,m,h;for(h=e-1;h<a;h++)g=d.slice(h-e+1,h+2),m=l(g.map(function(a){return f.pick(a[2],a)}),"min"),g=l(g.map(function(a){return f.pick(a[1],a)}),"max"),g=g/e*100,m=m/e*100,k[h+1]&&(b.push([k[h+1],g,m]),c.push(k[h+1]),q.push([g,m]));return{values:b,xData:c,
yData:q}}}))})(e,u)});
//# sourceMappingURL=aroon.js.map