/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:"function"===typeof define&&define.amd?define(function(){return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){var t=function(b){var a=b.reduce;return{minInArray:function(b,g){return a(b,function(a,k){return Math.min(a,k[g])},Number.MAX_VALUE)},maxInArray:function(b,g){return a(b,function(a,k){return Math.max(a,k[g])},-Number.MAX_VALUE)},getArrayExtremes:function(b,g,r){return a(b,function(a,c){return[Math.min(a[0],
c[g]),Math.max(a[1],c[r])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}}(d),u=function(b){var a=b.each,d=b.merge,g=b.error,r=b.defined,k=b.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(c){var b=[];a(this.pointArrayMap,function(a){a!==c&&b.push("plot"+a.charAt(0).toUpperCase()+a.slice(1))});return b},toYData:function(c){var b=[];a(this.pointArrayMap,function(a){b.push(c[a])});return b},translate:function(){var c=this,
b=c.pointArrayMap,g=[],e,g=c.getTranslatedLinesNames();k.prototype.translate.apply(c,arguments);a(c.points,function(f){a(b,function(a,b){e=f[a];null!==e&&(f[g[b]]=c.yAxis.toPixels(e,!0))})})},drawGraph:function(){var c=this,b=c.linesApiNames,p=c.points,e=p.length,f=c.options,m=c.graph,n={options:{gapSize:f.gapSize}},l=[],q=c.getTranslatedLinesNames(c.pointValKey),h;a(q,function(c,a){for(l[a]=[];e--;)h=p[e],l[a].push({x:h.x,plotX:h.plotX,plotY:h[c],isNull:!r(h[c])});e=p.length});a(b,function(a,b){l[b]?
(c.points=l[b],f[a]?c.options=d(f[a].styles,n):g('Error: "There is no '+a+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),c.graph=c["graph"+a],k.prototype.drawGraph.call(c),c["graph"+a]=c.graph):g('Error: "'+a+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});c.points=p;c.options=f;c.graph=m;k.prototype.drawGraph.call(c)}}}(d);(function(b,a,d){var g=a.getArrayExtremes;
a=b.merge;b.seriesType("pc","sma",{params:{period:20},lineWidth:1,topLine:{styles:{lineColor:"#90ed7d",lineWidth:1}},bottomLine:{styles:{lineColor:"#f45b5b",lineWidth:1}},dataGrouping:{approximation:"averages"}},a(d,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Price Channel",nameComponents:["period"],linesApiNames:["topLine","bottomLine"],getValues:function(a,b){b=b.period;var c=a.xData,d=(a=a.yData)?a.length:0,k=[],e,f,m,n,l=[],q=[],h;if(d<b)return!1;for(h=b;h<=d;h++)n=
c[h-1],f=a.slice(h-b,h),e=g(f,2,1),f=e[1],m=e[0],e=(f+m)/2,k.push([n,f,e,m]),l.push(n),q.push([f,e,m]);return{values:k,xData:l,yData:q}}}))})(d,t,u)});
//# sourceMappingURL=price-channel.js.map