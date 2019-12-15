/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var t=function(d){var a=d.each,w=d.merge,p=d.error,r=d.defined,l=d.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(b){var c=[];a(this.pointArrayMap,function(a){a!==b&&c.push("plot"+a.charAt(0).toUpperCase()+
a.slice(1))});return c},toYData:function(b){var c=[];a(this.pointArrayMap,function(a){c.push(b[a])});return c},translate:function(){var b=this,c=b.pointArrayMap,d=[],k,d=b.getTranslatedLinesNames();l.prototype.translate.apply(b,arguments);a(b.points,function(l){a(c,function(a,c){k=l[a];null!==k&&(l[d[c]]=b.yAxis.toPixels(k,!0))})})},drawGraph:function(){var b=this,c=b.linesApiNames,d=b.points,k=d.length,m=b.options,x=b.graph,u={options:{gapSize:m.gapSize}},q=[],h=b.getTranslatedLinesNames(b.pointValKey),
f;a(h,function(b,a){for(q[a]=[];k--;)f=d[k],q[a].push({x:f.x,plotX:f.plotX,plotY:f[b],isNull:!r(f[b])});k=d.length});a(c,function(a,c){q[c]?(b.points=q[c],m[a]?b.options=w(m[a].styles,u):p('Error: "There is no '+a+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),b.graph=b["graph"+a],l.prototype.drawGraph.call(b),b["graph"+a]=b.graph):p('Error: "'+a+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});
b.points=d;b.options=m;b.graph=x;l.prototype.drawGraph.call(b)}}}(a);(function(a,t){var d=a.seriesTypes.sma,p=a.merge,r=a.correctFloat;a.seriesType("abands","sma",{params:{period:20,factor:.001,index:3},lineWidth:1,topLine:{styles:{lineWidth:1}},bottomLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},p(t,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Acceleration Bands",nameComponents:["period","factor"],linesApiNames:["topLine","bottomLine"],getValues:function(a,
b){var c=b.period,l=b.factor;b=b.index;var k=a.xData,m=(a=a.yData)?a.length:0,p=[],u=[],q=[],h,f,n,g,t=[],v=[],e;if(m<c)return!1;for(e=0;e<=m;e++)e<m&&(g=a[e][2],n=a[e][1],f=l,g=r(n-g)/(r(n+g)/2)*1E3*f,p.push(a[e][1]*r(1+2*g)),u.push(a[e][2]*r(1-2*g))),e>=c&&(g=k.slice(e-c,e),h=a.slice(e-c,e),f=d.prototype.getValues.call(this,{xData:g,yData:p.slice(e-c,e)},{period:c}),n=d.prototype.getValues.call(this,{xData:g,yData:u.slice(e-c,e)},{period:c}),h=d.prototype.getValues.call(this,{xData:g,yData:h},{period:c,
index:b}),g=h.xData[0],f=f.yData[0],n=n.yData[0],h=h.yData[0],q.push([g,f,h,n]),t.push(g),v.push([f,h,n]));return{values:q,xData:t,yData:v}}}))})(a,t)});
//# sourceMappingURL=acceleration-bands.js.map