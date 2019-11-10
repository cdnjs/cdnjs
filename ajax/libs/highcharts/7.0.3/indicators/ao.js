/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(c){var a=c.correctFloat,n=c.isArray;c.seriesType("ao","sma",{greaterBarColor:"#06B535",lowerBarColor:"#F21313",threshold:0,groupPadding:.2,pointPadding:.2,states:{hover:{halo:{size:0}}}},{nameBase:"AO",nameComponents:!1,markerAttribs:c.noop,getColumnMetrics:c.seriesTypes.column.prototype.getColumnMetrics,
crispCol:c.seriesTypes.column.prototype.crispCol,translate:c.seriesTypes.column.prototype.translate,drawPoints:c.seriesTypes.column.prototype.drawPoints,drawGraph:function(){var b=this.options,a=this.points,c=b.greaterBarColor,b=b.lowerBarColor,e=a[0];if(!this.userOptions.color&&e)for(e.color=c,e=1;e<a.length;e++)a[e].color=a[e].y>a[e-1].y?c:a[e].y<a[e-1].y?b:a[e-1].color},getValues:function(b){var c=b.xData||[];b=b.yData||[];var p=b.length,e=[],l=[],m=[],g=0,h=0,f,k,d;if(34>=c.length||!n(b[0])||
4!==b[0].length)return!1;for(d=0;33>d;d++)f=(b[d][1]+b[d][2])/2,29<=d&&(g=a(g+f)),h=a(h+f);for(d=33;d<p;d++)f=(b[d][1]+b[d][2])/2,g=a(g+f),h=a(h+f),f=g/5,k=h/34,f=a(f-k),e.push([c[d],f]),l.push(c[d]),m.push(f),f=d+1-5,k=d+1-34,g=a(g-(b[f][1]+b[f][2])/2),h=a(h-(b[k][1]+b[k][2])/2);return{values:e,xData:l,yData:m}}})})(a)});
//# sourceMappingURL=ao.js.map