/*
 Highcharts JS v7.0.3 (2019-02-06)
 Arrow Symbols

 (c) 2017-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){(function(a){a.SVGRenderer.prototype.symbols.arrow=function(e,c,a,d){return["M",e,c+d/2,"L",e+a,c,"L",e,c+d/2,"L",e+a,c+d]};a.SVGRenderer.prototype.symbols["arrow-half"]=function(e,c,b,d){return a.SVGRenderer.prototype.symbols.arrow(e,c,b/2,d)};a.SVGRenderer.prototype.symbols["triangle-left"]=
function(a,c,b,d){return["M",a+b,c,"L",a,c+d/2,"L",a+b,c+d,"Z"]};a.SVGRenderer.prototype.symbols["arrow-filled"]=a.SVGRenderer.prototype.symbols["triangle-left"];a.SVGRenderer.prototype.symbols["triangle-left-half"]=function(b,c,f,d){return a.SVGRenderer.prototype.symbols["triangle-left"](b,c,f/2,d)};a.SVGRenderer.prototype.symbols["arrow-filled-half"]=a.SVGRenderer.prototype.symbols["triangle-left-half"]})(b)});
//# sourceMappingURL=arrow-symbols.js.map