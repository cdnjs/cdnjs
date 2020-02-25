/*
 Highcharts JS v8.0.0 (2019-12-10)

 Arrow Symbols

 (c) 2017-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,e,b,c){a.hasOwnProperty(e)||(a[e]=c.apply(null,b))}a=a?a._modules:{};f(a,"parts-gantt/ArrowSymbols.js",[a["parts/Globals.js"]],function(a){a.SVGRenderer.prototype.symbols.arrow=function(a,b,c,d){return["M",
a,b+d/2,"L",a+c,b,"L",a,b+d/2,"L",a+c,b+d]};a.SVGRenderer.prototype.symbols["arrow-half"]=function(e,b,c,d){return a.SVGRenderer.prototype.symbols.arrow(e,b,c/2,d)};a.SVGRenderer.prototype.symbols["triangle-left"]=function(a,b,c,d){return["M",a+c,b,"L",a,b+d/2,"L",a+c,b+d,"Z"]};a.SVGRenderer.prototype.symbols["arrow-filled"]=a.SVGRenderer.prototype.symbols["triangle-left"];a.SVGRenderer.prototype.symbols["triangle-left-half"]=function(e,b,c,d){return a.SVGRenderer.prototype.symbols["triangle-left"](e,
b,c/2,d)};a.SVGRenderer.prototype.symbols["arrow-filled-half"]=a.SVGRenderer.prototype.symbols["triangle-left-half"]});f(a,"masters/modules/arrow-symbols.src.js",[],function(){})});
//# sourceMappingURL=arrow-symbols.js.map