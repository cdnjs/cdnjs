/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/price-envelopes",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,c,d,h){a.hasOwnProperty(c)||(a[c]=h.apply(null,d))}a=a?a._modules:{};d(a,"indicators/price-envelopes.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,
c){var d=c.isArray,h=c.merge;c=c.seriesType;var k=a.seriesTypes.sma;c("priceenvelopes","sma",{marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>Top: {point.top}<br/>Middle: {point.middle}<br/>Bottom: {point.bottom}<br/>'},params:{period:20,topBand:.1,bottomBand:.1},bottomLine:{styles:{lineWidth:1,lineColor:void 0}},topLine:{styles:{lineWidth:1}},dataGrouping:{approximation:"averages"}},{nameComponents:["period","topBand","bottomBand"],
nameBase:"Price envelopes",pointArrayMap:["top","middle","bottom"],parallelArrays:["x","y","top","bottom"],pointValKey:"middle",init:function(){k.prototype.init.apply(this,arguments);this.options=h({topLine:{styles:{lineColor:this.color}},bottomLine:{styles:{lineColor:this.color}}},this.options)},toYData:function(b){return[b.top,b.middle,b.bottom]},translate:function(){var b=this,a=["plotTop","plotMiddle","plotBottom"];k.prototype.translate.apply(b);b.points.forEach(function(m){[m.top,m.middle,m.bottom].forEach(function(d,
c){null!==d&&(m[a[c]]=b.yAxis.toPixels(d,!0))})})},drawGraph:function(){for(var b=this,a=b.points,d=a.length,c=b.options,q=b.graph,n={options:{gapSize:c.gapSize}},l=[[],[]],e;d--;)e=a[d],l[0].push({plotX:e.plotX,plotY:e.plotTop,isNull:e.isNull}),l[1].push({plotX:e.plotX,plotY:e.plotBottom,isNull:e.isNull});["topLine","bottomLine"].forEach(function(a,d){b.points=l[d];b.options=h(c[a].styles,n);b.graph=b["graph"+a];k.prototype.drawGraph.call(b);b["graph"+a]=b.graph});b.points=a;b.options=c;b.graph=
q;k.prototype.drawGraph.call(b)},getValues:function(a,c){var b=c.period,h=c.topBand,q=c.bottomBand,n=a.xData,l=(a=a.yData)?a.length:0,e=[],r=[],t=[],g;if(!(n.length<b)&&d(a[0])&&4===a[0].length){for(g=b;g<=l;g++){var p=n.slice(g-b,g);var f=a.slice(g-b,g);f=k.prototype.getValues.call(this,{xData:p,yData:f},c);p=f.xData[0];f=f.yData[0];var u=f*(1+h);var v=f*(1-q);e.push([p,u,f,v]);r.push(p);t.push([u,f,v])}return{values:e,xData:r,yData:t}}}});""});d(a,"masters/indicators/price-envelopes.src.js",[],
function(){})});
//# sourceMappingURL=price-envelopes.js.map