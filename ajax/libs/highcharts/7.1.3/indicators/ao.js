/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,m,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,m))}a=a?a._modules:{};b(a,"indicators/ao.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var m=b.isArray,f=
a.correctFloat;a.seriesType("ao","sma",{greaterBarColor:"#06B535",lowerBarColor:"#F21313",threshold:0,groupPadding:.2,pointPadding:.2,states:{hover:{halo:{size:0}}}},{nameBase:"AO",nameComponents:!1,markerAttribs:a.noop,getColumnMetrics:a.seriesTypes.column.prototype.getColumnMetrics,crispCol:a.seriesTypes.column.prototype.crispCol,translate:a.seriesTypes.column.prototype.translate,drawPoints:a.seriesTypes.column.prototype.drawPoints,drawGraph:function(){var a=this.options,g=this.points,b=a.greaterBarColor;
a=a.lowerBarColor;var d=g[0];if(!this.userOptions.color&&d)for(d.color=b,d=1;d<g.length;d++)g[d].color=g[d].y>g[d-1].y?b:g[d].y<g[d-1].y?a:g[d-1].color},getValues:function(a){var b=a.xData||[];a=a.yData||[];var q=a.length,d=[],n=[],p=[],h=0,k=0,c;if(34>=b.length||!m(a[0])||4!==a[0].length)return!1;for(c=0;33>c;c++){var e=(a[c][1]+a[c][2])/2;29<=c&&(h=f(h+e));k=f(k+e)}for(c=33;c<q;c++){e=(a[c][1]+a[c][2])/2;h=f(h+e);k=f(k+e);e=h/5;var l=k/34;e=f(e-l);d.push([b[c],e]);n.push(b[c]);p.push(e);e=c+1-5;
l=c+1-34;h=f(h-(a[e][1]+a[e][2])/2);k=f(k-(a[l][1]+a[l][2])/2)}return{values:d,xData:n,yData:p}}})});b(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map