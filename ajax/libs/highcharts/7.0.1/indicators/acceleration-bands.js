/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?module.exports=f:"function"===typeof define&&define.amd?define(function(){return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){var y=function(b){var k=b.each,f=b.merge,q=b.error,t=b.defined,m=b.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var c=[];k(this.pointArrayMap,function(e){e!==a&&c.push("plot"+e.charAt(0).toUpperCase()+e.slice(1))});
return c},toYData:function(a){var c=[];k(this.pointArrayMap,function(e){c.push(a[e])});return c},translate:function(){var a=this,c=a.pointArrayMap,e=[],b,e=a.getTranslatedLinesNames();m.prototype.translate.apply(a,arguments);k(a.points,function(m){k(c,function(c,f){b=m[c];null!==b&&(m[e[f]]=a.yAxis.toPixels(b,!0))})})},drawGraph:function(){var a=this,c=a.linesApiNames,e=a.points,b=e.length,n=a.options,w=a.graph,x={options:{gapSize:n.gapSize}},r=[],l=a.getTranslatedLinesNames(a.pointValKey),g;k(l,
function(a,c){for(r[c]=[];b--;)g=e[b],r[c].push({x:g.x,plotX:g.plotX,plotY:g[a],isNull:!t(g[a])});b=e.length});k(c,function(c,b){r[b]?(a.points=r[b],n[c]?a.options=f(n[c].styles,x):q('Error: "There is no '+c+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),a.graph=a["graph"+c],m.prototype.drawGraph.call(a),a["graph"+c]=a.graph):q('Error: "'+c+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});
a.points=e;a.options=n;a.graph=w;m.prototype.drawGraph.call(a)}}}(f);(function(b,f){var k=b.seriesTypes.sma,q=b.merge,t=b.correctFloat;b.seriesType("abands","sma",{params:{period:20,factor:.001,index:3},lineWidth:1,topLine:{styles:{lineWidth:1}},bottomLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},q(f,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Acceleration Bands",nameComponents:["period","factor"],linesApiNames:["topLine","bottomLine"],getValues:function(b,
a){var c=a.period,e=a.factor;a=a.index;var f=b.xData,n=(b=b.yData)?b.length:0,m=[],q=[],r=[],l,g,p,h,u=[],v=[],d;if(n<c)return!1;for(d=0;d<=n;d++)d<n&&(h=b[d][2],p=b[d][1],g=e,h=t(p-h)/(t(p+h)/2)*1E3*g,m.push(b[d][1]*t(1+2*h)),q.push(b[d][2]*t(1-2*h))),d>=c&&(h=f.slice(d-c,d),l=b.slice(d-c,d),g=k.prototype.getValues.call(this,{xData:h,yData:m.slice(d-c,d)},{period:c}),p=k.prototype.getValues.call(this,{xData:h,yData:q.slice(d-c,d)},{period:c}),l=k.prototype.getValues.call(this,{xData:h,yData:l},{period:c,
index:a}),h=l.xData[0],g=g.yData[0],p=p.yData[0],l=l.yData[0],r.push([h,g,l,p]),u.push(h),v.push([g,l,p]));return{values:r,xData:u,yData:v}}}))})(f,y)});
//# sourceMappingURL=acceleration-bands.js.map