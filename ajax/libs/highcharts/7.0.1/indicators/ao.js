/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:"function"===typeof define&&define.amd?define(function(){return g}):g("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(g){(function(e){var h=e.correctFloat,g=e.isArray;e.seriesType("ao","sma",{greaterBarColor:"#06B535",lowerBarColor:"#F21313",threshold:0,groupPadding:.2,pointPadding:.2,states:{hover:{halo:{size:0}}}},{nameBase:"AO",nameComponents:!1,markerAttribs:e.noop,getColumnMetrics:e.seriesTypes.column.prototype.getColumnMetrics,
crispCol:e.seriesTypes.column.prototype.crispCol,translate:e.seriesTypes.column.prototype.translate,drawPoints:e.seriesTypes.column.prototype.drawPoints,drawGraph:function(){var a=this.options,f=this.points,e=a.greaterBarColor,a=a.lowerBarColor,c=f[0];if(!this.userOptions.color&&c)for(c.color=e,c=1;c<f.length;c++)f[c].color=f[c].y>f[c-1].y?e:f[c].y<f[c-1].y?a:f[c-1].color},getValues:function(a){var f=a.xData||[];a=a.yData||[];var e=a.length,c=[],n=[],p=[],k=0,l=0,d,m,b;if(34>=f.length||!g(a[0])||
4!==a[0].length)return!1;for(b=0;33>b;b++)d=(a[b][1]+a[b][2])/2,29<=b&&(k=h(k+d)),l=h(l+d);for(b=33;b<e;b++)d=(a[b][1]+a[b][2])/2,k=h(k+d),l=h(l+d),d=k/5,m=l/34,d=h(d-m),c.push([f[b],d]),n.push(f[b]),p.push(d),d=b+1-5,m=b+1-34,k=h(k-(a[d][1]+a[d][2])/2),l=h(l-(a[m][1]+a[m][2])/2);return{values:c,xData:n,yData:p}}})})(g)});
//# sourceMappingURL=ao.js.map