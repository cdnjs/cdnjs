/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define(function(){return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){var t=function(b){var a=b.reduce;return{minInArray:function(b,h){return a(b,function(a,k){return Math.min(a,k[h])},Number.MAX_VALUE)},maxInArray:function(b,h){return a(b,function(a,k){return Math.max(a,k[h])},-Number.MAX_VALUE)},getArrayExtremes:function(b,h,d){return a(b,function(a,
c){return[Math.min(a[0],c[h]),Math.max(a[1],c[d])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}}(d),u=function(b){var a=b.each,d=b.merge,h=b.error,r=b.defined,k=b.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(c){var b=[];a(this.pointArrayMap,function(a){a!==c&&b.push("plot"+a.charAt(0).toUpperCase()+a.slice(1))});return b},toYData:function(c){var b=[];a(this.pointArrayMap,function(a){b.push(c[a])});return b},translate:function(){var c=
this,b=c.pointArrayMap,d=[],e,d=c.getTranslatedLinesNames();k.prototype.translate.apply(c,arguments);a(c.points,function(f){a(b,function(a,b){e=f[a];null!==e&&(f[d[b]]=c.yAxis.toPixels(e,!0))})})},drawGraph:function(){var c=this,b=c.linesApiNames,p=c.points,e=p.length,f=c.options,m=c.graph,n={options:{gapSize:f.gapSize}},l=[],q=c.getTranslatedLinesNames(c.pointValKey),g;a(q,function(c,a){for(l[a]=[];e--;)g=p[e],l[a].push({x:g.x,plotX:g.plotX,plotY:g[c],isNull:!r(g[c])});e=p.length});a(b,function(a,
b){l[b]?(c.points=l[b],f[a]?c.options=d(f[a].styles,n):h('Error: "There is no '+a+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),c.graph=c["graph"+a],k.prototype.drawGraph.call(c),c["graph"+a]=c.graph):h('Error: "'+a+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});c.points=p;c.options=f;c.graph=m;k.prototype.drawGraph.call(c)}}}(d);(function(b,a,d){var h=a.getArrayExtremes;
a=b.merge;b.seriesType("pc","sma",{params:{period:20},lineWidth:1,topLine:{styles:{lineColor:"#90ed7d",lineWidth:1}},bottomLine:{styles:{lineColor:"#f45b5b",lineWidth:1}},dataGrouping:{approximation:"averages"}},a(d,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Price Channel",nameComponents:["period"],linesApiNames:["topLine","bottomLine"],getValues:function(a,b){b=b.period;var c=a.xData,d=(a=a.yData)?a.length:0,k=[],e,f,m,n,l=[],q=[],g;if(d<b)return!1;for(g=b;g<=d;g++)n=
c[g-1],f=a.slice(g-b,g),e=h(f,2,1),f=e[1],m=e[0],e=(f+m)/2,k.push([n,f,e,m]),l.push(n),q.push([f,e,m]);return{values:k,xData:l,yData:q}}}))})(d,t,u)});
//# sourceMappingURL=price-channel.js.map