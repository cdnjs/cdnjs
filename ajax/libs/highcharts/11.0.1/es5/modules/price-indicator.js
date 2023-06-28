/*
 Highstock JS v11.0.1 (2023-05-08)

 Advanced Highcharts Stock tools

 (c) 2010-2021 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/price-indicator",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,c,d,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};d(a,"Extensions/PriceIndication.js",[a["Core/Series/Series.js"],a["Core/Utilities.js"]],function(a,c){var d=c.addEvent,g=c.isArray,l=c.merge;d(a,"afterRender",function(){var a=this.options,d=a.lastVisiblePrice,c=a.lastPrice;if((d||c)&&"highcharts-navigator-series"!==a.id){var m=this.xAxis,b=this.yAxis,n=b.crosshair,p=b.cross,q=b.crossLabel,e=this.points,f=e.length,k=this.xData[this.xData.length-1],h=this.yData[this.yData.length-1];c&&c.enabled&&(b.crosshair=b.options.crosshair=
a.lastPrice,!this.chart.styledMode&&b.crosshair&&b.options.crosshair&&a.lastPrice&&(b.crosshair.color=b.options.crosshair.color=a.lastPrice.color||this.color),b.cross=this.lastPrice,c=g(h)?h[3]:h,this.lastPriceLabel&&this.lastPriceLabel.destroy(),delete b.crossLabel,b.drawCrosshair(null,{x:k,y:c,plotX:m.toPixels(k,!0),plotY:b.toPixels(c,!0)}),this.yAxis.cross&&(this.lastPrice=this.yAxis.cross,this.lastPrice.addClass("highcharts-color-"+this.colorIndex),this.lastPrice.y=c),this.lastPriceLabel=b.crossLabel);
d&&d.enabled&&0<f&&(b.crosshair=b.options.crosshair=l({color:"transparent"},a.lastVisiblePrice),b.cross=this.lastVisiblePrice,a=e[f-1].isInside?e[f-1]:e[f-2],this.lastVisiblePriceLabel&&this.lastVisiblePriceLabel.destroy(),delete b.crossLabel,b.drawCrosshair(null,a),b.cross&&(this.lastVisiblePrice=b.cross,a&&"number"===typeof a.y&&(this.lastVisiblePrice.y=a.y)),this.lastVisiblePriceLabel=b.crossLabel);b.crosshair=b.options.crosshair=n;b.cross=p;b.crossLabel=q}})});d(a,"masters/modules/price-indicator.src.js",
[],function(){})});
//# sourceMappingURL=price-indicator.js.map