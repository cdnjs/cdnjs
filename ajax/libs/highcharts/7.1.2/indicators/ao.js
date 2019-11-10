/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,e,g,m){a.hasOwnProperty(e)||(a[e]=m.apply(null,g))}a=a?a._modules:{};g(a,"indicators/ao.src.js",[a["parts/Globals.js"]],function(a){var e=a.correctFloat,g=a.isArray;a.seriesType("ao",
"sma",{greaterBarColor:"#06B535",lowerBarColor:"#F21313",threshold:0,groupPadding:.2,pointPadding:.2,states:{hover:{halo:{size:0}}}},{nameBase:"AO",nameComponents:!1,markerAttribs:a.noop,getColumnMetrics:a.seriesTypes.column.prototype.getColumnMetrics,crispCol:a.seriesTypes.column.prototype.crispCol,translate:a.seriesTypes.column.prototype.translate,drawPoints:a.seriesTypes.column.prototype.drawPoints,drawGraph:function(){var a=this.options,f=this.points,e=a.greaterBarColor,a=a.lowerBarColor,c=f[0];
if(!this.userOptions.color&&c)for(c.color=e,c=1;c<f.length;c++)f[c].color=f[c].y>f[c-1].y?e:f[c].y<f[c-1].y?a:f[c-1].color},getValues:function(a){var f=a.xData||[];a=a.yData||[];var m=a.length,c=[],n=[],p=[],h=0,k=0,d,l,b;if(34>=f.length||!g(a[0])||4!==a[0].length)return!1;for(b=0;33>b;b++)d=(a[b][1]+a[b][2])/2,29<=b&&(h=e(h+d)),k=e(k+d);for(b=33;b<m;b++)d=(a[b][1]+a[b][2])/2,h=e(h+d),k=e(k+d),d=h/5,l=k/34,d=e(d-l),c.push([f[b],d]),n.push(f[b]),p.push(d),d=b+1-5,l=b+1-34,h=e(h-(a[d][1]+a[d][2])/2),
k=e(k-(a[l][1]+a[l][2])/2);return{values:c,xData:n,yData:p}}})});g(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map