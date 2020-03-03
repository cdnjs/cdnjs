/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,g,h,e){a.hasOwnProperty(g)||(a[g]=e.apply(null,h))}a=a?a._modules:{};e(a,"indicators/ao.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,g){var h=g.correctFloat,
e=g.isArray;g=g.seriesType;g("ao","sma",{greaterBarColor:"#06B535",lowerBarColor:"#F21313",threshold:0,groupPadding:.2,pointPadding:.2,states:{hover:{halo:{size:0}}}},{nameBase:"AO",nameComponents:!1,markerAttribs:a.noop,getColumnMetrics:a.seriesTypes.column.prototype.getColumnMetrics,crispCol:a.seriesTypes.column.prototype.crispCol,translate:a.seriesTypes.column.prototype.translate,drawPoints:a.seriesTypes.column.prototype.drawPoints,drawGraph:function(){var a=this.options,f=this.points,e=a.greaterBarColor;
a=a.lowerBarColor;var c=f[0];if(!this.userOptions.color&&c)for(c.color=e,c=1;c<f.length;c++)f[c].color=f[c].y>f[c-1].y?e:f[c].y<f[c-1].y?a:f[c-1].color},getValues:function(a){var f=a.xData||[];a=a.yData||[];var g=a.length,c=[],n=[],p=[],k=0,l=0,b;if(!(34>=f.length)&&e(a[0])&&4===a[0].length){for(b=0;33>b;b++){var d=(a[b][1]+a[b][2])/2;29<=b&&(k=h(k+d));l=h(l+d)}for(b=33;b<g;b++){d=(a[b][1]+a[b][2])/2;k=h(k+d);l=h(l+d);d=k/5;var m=l/34;d=h(d-m);c.push([f[b],d]);n.push(f[b]);p.push(d);d=b+1-5;m=b+1-
34;k=h(k-(a[d][1]+a[d][2])/2);l=h(l-(a[m][1]+a[m][2])/2)}return{values:c,xData:n,yData:p}}}});""});e(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map