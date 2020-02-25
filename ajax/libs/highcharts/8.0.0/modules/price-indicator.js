/*
 Highstock JS v8.0.0 (2019-12-10)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/price-indicator",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,e,c,f){a.hasOwnProperty(e)||(a[e]=f.apply(null,c))}a=a?a._modules:{};c(a,"modules/price-indicator.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,
c){var e=c.isArray;c=a.addEvent;var f=a.merge;c(a.Series,"afterRender",function(){var a=this.options,c=a.pointRange,g=a.lastVisiblePrice,d=a.lastPrice;if((g||d)&&"highcharts-navigator-series"!==a.id){var n=this.xAxis,b=this.yAxis,p=b.crosshair,q=b.cross,r=b.crossLabel,h=this.points,k=h.length,l=this.xData[this.xData.length-1],m=this.yData[this.yData.length-1];d&&d.enabled&&(b.crosshair=b.options.crosshair=a.lastPrice,b.cross=this.lastPrice,d=e(m)?m[3]:m,b.drawCrosshair(null,{x:l,y:d,plotX:n.toPixels(l,
!0),plotY:b.toPixels(d,!0)}),this.yAxis.cross&&(this.lastPrice=this.yAxis.cross,this.lastPrice.y=d));g&&g.enabled&&0<k&&(c=h[k-1].x===l||null===c?1:2,b.crosshair=b.options.crosshair=f({color:"transparent"},a.lastVisiblePrice),b.cross=this.lastVisiblePrice,a=h[k-c],b.drawCrosshair(null,a),b.cross&&(this.lastVisiblePrice=b.cross,this.lastVisiblePrice.y=a.y),this.crossLabel&&this.crossLabel.destroy(),this.crossLabel=b.crossLabel);b.crosshair=p;b.cross=q;b.crossLabel=r}})});c(a,"masters/modules/price-indicator.src.js",
[],function(){})});
//# sourceMappingURL=price-indicator.js.map