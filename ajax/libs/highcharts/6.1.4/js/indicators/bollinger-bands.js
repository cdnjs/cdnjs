/*
  Highcharts JS v6.1.4 (2018-09-25)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b(Highcharts)})(function(b){(function(b){var l=b.each,m=b.merge,x=b.isArray,n=b.seriesTypes.sma;b.seriesType("bb","sma",{name:"BB (20, 2)",params:{period:20,standardDeviation:2,index:3},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1,lineColor:void 0}},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eTop: {point.top}\x3cbr/\x3eMiddle: {point.middle}\x3cbr/\x3eBottom: {point.bottom}\x3cbr/\x3e'},
marker:{enabled:!1},dataGrouping:{approximation:"averages"}},{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameComponents:["period","standardDeviation"],init:function(){n.prototype.init.apply(this,arguments);this.options=m({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(a){return[a.top,a.middle,a.bottom]},translate:function(){var a=this,b=["plotTop","plotMiddle","plotBottom"];n.prototype.translate.apply(a,arguments);
l(a.points,function(d){l([d.top,d.middle,d.bottom],function(e,y){null!==e&&(d[b[y]]=a.yAxis.toPixels(e,!0))})})},drawGraph:function(){for(var a=this,b=a.points,d=b.length,e=a.options,q=a.graph,z={options:{gapSize:e.gapSize}},k=[[],[]],c;d--;)c=b[d],k[0].push({plotX:c.plotX,plotY:c.plotTop,isNull:c.isNull}),k[1].push({plotX:c.plotX,plotY:c.plotBottom,isNull:c.isNull});l(["topLine","bottomLine"],function(b,c){a.points=k[c];a.options=m(e[b].styles,z);a.graph=a["graph"+b];n.prototype.drawGraph.call(a);
a["graph"+b]=a.graph});a.points=b;a.options=e;a.graph=q;n.prototype.drawGraph.call(a)},getValues:function(a,b){var d=b.period,e=b.standardDeviation,q=a.xData,l=(a=a.yData)?a.length:0,k=[],c,g,f,p,m=[],u=[],v,h;if(q.length<d)return!1;v=x(a[0]);for(h=d;h<=l;h++){p=q.slice(h-d,h);g=a.slice(h-d,h);c=n.prototype.getValues.call(this,{xData:p,yData:g},b);p=c.xData[0];c=c.yData[0];f=0;for(var w=g.length,r=0,t;r<w;r++)t=(v?g[r][b.index]:g[r])-c,f+=t*t;f=Math.sqrt(f/(w-1));g=c+e*f;f=c-e*f;k.push([p,g,c,f]);
m.push(p);u.push([g,c,f])}return{values:k,xData:m,yData:u}}})})(b)});
//# sourceMappingURL=bollinger-bands.js.map
