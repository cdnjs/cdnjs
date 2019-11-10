/*
 Highcharts JS v7.1.2 (2019-06-03)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/price-indicator",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,f,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,f))}a=a?a._modules:{};c(a,"modules/price-indicator.src.js",[a["parts/Globals.js"]],function(a){var c=a.addEvent,f=a.merge,
g=a.isArray;c(a.Series,"afterRender",function(){var a=this.options,c=a.lastVisiblePrice,d=a.lastPrice;if((c||d)&&"highcharts-navigator-series"!==a.id){var l=this.xAxis,b=this.yAxis,m=b.crosshair,n=b.cross,p=b.crossLabel,e=this.points,h=this.xData[this.xData.length-1],k=this.yData[this.yData.length-1];d&&d.enabled&&(b.crosshair=b.options.crosshair=a.lastPrice,b.cross=this.lastPrice,d=g(k)?k[3]:k,b.drawCrosshair(null,{x:h,y:d,plotX:l.toPixels(h,!0),plotY:b.toPixels(d,!0)}),this.yAxis.cross&&(this.lastPrice=
this.yAxis.cross,this.lastPrice.y=d));c&&c.enabled&&0<e.length&&(c=e[e.length-1].x===h?1:2,b.crosshair=b.options.crosshair=f({color:"transparent"},a.lastVisiblePrice),b.cross=this.lastVisiblePrice,a=e[e.length-c],b.drawCrosshair(null,a),b.cross&&(this.lastVisiblePrice=b.cross,this.lastVisiblePrice.y=a.y),this.crossLabel&&this.crossLabel.destroy(),this.crossLabel=b.crossLabel);b.crosshair=m;b.cross=n;b.crossLabel=p}})});c(a,"masters/modules/price-indicator.src.js",[],function(){})});
//# sourceMappingURL=price-indicator.js.map