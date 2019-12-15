/*
 Highcharts JS v7.0.3 (2019-02-06)
 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var f=a.addEvent,k=a.merge,l=a.isArray;f(a.Series,"afterRender",function(){var a=this.options,d=a.lastVisiblePrice,c=a.lastPrice;if((d||c)&&"highcharts-navigator-series"!==a.id){var f=this.xAxis,b=this.yAxis,m=b.crosshair,n=b.cross,p=b.crossLabel,e=this.points,g=this.xData[this.xData.length-
1],h=this.yData[this.yData.length-1];c&&c.enabled&&(b.crosshair=b.options.crosshair=a.lastPrice,b.cross=this.lastPrice,c=l(h)?h[3]:h,b.drawCrosshair(null,{x:g,y:c,plotX:f.toPixels(g,!0),plotY:b.toPixels(c,!0)}),this.yAxis.cross&&(this.lastPrice=this.yAxis.cross,this.lastPrice.y=c));d&&d.enabled&&0<e.length&&(d=e[e.length-1].x===g?1:2,b.crosshair=b.options.crosshair=k({color:"transparent"},a.lastVisiblePrice),b.cross=this.lastVisiblePrice,a=e[e.length-d],b.drawCrosshair(null,a),b.cross&&(this.lastVisiblePrice=
b.cross,this.lastVisiblePrice.y=a.y),this.crossLabel&&this.crossLabel.destroy(),this.crossLabel=b.crossLabel);b.crosshair=m;b.cross=n;b.crossLabel=p}})})(a)});
//# sourceMappingURL=price-indicator.js.map