/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/price-envelopes",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,h,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,h))}a=a?a._modules:{};c(a,"indicators/price-envelopes.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,
c){var h=c.isArray,g=a.merge,k=a.seriesTypes.sma;a.seriesType("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'},params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand","bottomBand"],nameBase:"Price envelopes",
pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){k.prototype.init.apply(this,arguments);this.options=g({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(b){return[b.top,b.middle,b.bottom]},translate:function(){var b=this,a=["plotTop","plotMiddle","plotBottom"];k.prototype.translate.apply(b);b.points.forEach(function(n){[n.top,n.middle,n.bottom].forEach(function(c,
w){null!==c&&(n[a[w]]=b.yAxis.toPixels(c,!0))})})},drawGraph:function(){for(var b=this,a=b.points,c=a.length,l=b.options,h=b.graph,p={options:{gapSize:l.gapSize}},m=[[],[]],d;c--;)d=a[c],m[0].push({plotX:d.plotX,plotY:d.plotTop,isNull:d.isNull}),m[1].push({plotX:d.plotX,plotY:d.plotBottom,isNull:d.isNull});["topLine","bottomLine"].forEach(function(a,c){b.points=m[c];b.options=g(l[a].styles,p);b.graph=b["graph"+a];k.prototype.drawGraph.call(b);b["graph"+a]=b.graph});b.points=a;b.options=l;b.graph=
h;k.prototype.drawGraph.call(b)},getValues:function(a,c){var b=c.period,l=c.topBand,g=c.bottomBand,p=a.xData,m=(a=a.yData)?a.length:0,d=[],r=[],t=[],f;if(p.length<b||!h(a[0])||4!==a[0].length)return!1;for(f=b;f<=m;f++){var q=p.slice(f-b,f);var e=a.slice(f-b,f);e=k.prototype.getValues.call(this,{xData:q,yData:e},c);q=e.xData[0];e=e.yData[0];var u=e*(1+l);var v=e*(1-g);d.push([q,u,e,v]);r.push(q);t.push([u,e,v])}return{values:d,xData:r,yData:t}}})});c(a,"masters/indicators/price-envelopes.src.js",[],
function(){})});
//# sourceMappingURL=price-envelopes.js.map