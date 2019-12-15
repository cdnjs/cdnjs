/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define(function(){return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){var t=function(g){var c=g.each,r=g.merge,d=g.error,k=g.defined,l=g.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var b=[];c(this.pointArrayMap,function(e){e!==a&&b.push("plot"+e.charAt(0).toUpperCase()+
e.slice(1))});return b},toYData:function(a){var b=[];c(this.pointArrayMap,function(e){b.push(a[e])});return b},translate:function(){var a=this,b=a.pointArrayMap,e=[],d,e=a.getTranslatedLinesNames();l.prototype.translate.apply(a,arguments);c(a.points,function(f){c(b,function(b,c){d=f[b];null!==d&&(f[e[c]]=a.yAxis.toPixels(d,!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,e=a.points,g=e.length,f=a.options,m=a.graph,h={options:{gapSize:f.gapSize}},q=[],n=a.getTranslatedLinesNames(a.pointValKey),
p;c(n,function(a,b){for(q[b]=[];g--;)p=e[g],q[b].push({x:p.x,plotX:p.plotX,plotY:p[a],isNull:!k(p[a])});g=e.length});c(b,function(b,c){q[c]?(a.points=q[c],f[b]?a.options=r(f[b].styles,h):d('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+b],l.prototype.drawGraph.call(a),a["graph"+b]=a.graph):d('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});
a.points=e;a.options=f;a.graph=m;l.prototype.drawGraph.call(a)}}}(c);(function(c,n){function g(c,g){var d=c[0],a=0,b;for(b=1;b<c.length;b++)if("max"===g&&c[b]>=d||"min"===g&&c[b]<=d)d=c[b],a=b;return a}c.seriesType("aroon","sma",{params:{period:25},marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eAroon Up: {point.y}\x3cbr/\x3eAroon Down: {point.aroonDown}\x3cbr/\x3e'},aroonDown:{styles:{lineWidth:1,
lineColor:void 0}},dataGrouping:{approximation:"averages"}},c.merge(n,{nameBase:"Aroon",pointArrayMap:["y","aroonDown"],pointValKey:"y",linesApiNames:["aroonDown"],getValues:function(d,k){k=k.period;var l=d.xData,a=(d=d.yData)?d.length:0,b=[],e=[],n=[],f,m,h;for(h=k-1;h<a;h++)f=d.slice(h-k+1,h+2),m=g(f.map(function(a){return c.pick(a[2],a)}),"min"),f=g(f.map(function(a){return c.pick(a[1],a)}),"max"),f=f/k*100,m=m/k*100,l[h+1]&&(b.push([l[h+1],f,m]),e.push(l[h+1]),n.push([f,m]));return{values:b,xData:e,
yData:n}}}))})(c,t)});
//# sourceMappingURL=aroon.js.map