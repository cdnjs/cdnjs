/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Arrow Symbols
 *
 * (c) 2017-2021 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */!function(o){"object"==typeof module&&module.exports?(o.default=o,module.exports=o):"function"==typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts"],function(e){return o(e),o.Highcharts=e,o}):o("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(o){"use strict";var e=o?o._modules:{};function t(o,e,t,n){o.hasOwnProperty(e)||(o[e]=n.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:o[e]}})))}t(e,"Extensions/ArrowSymbols.js",[e["Core/Utilities.js"]],function(o){var e=[];function t(o,e,t,n){return[["M",o,e+n/2],["L",o+t,e],["L",o,e+n/2],["L",o+t,e+n]]}function n(o,e,n,r){return t(o,e,n/2,r)}function r(o,e,t,n){return[["M",o+t,e],["L",o,e+n/2],["L",o+t,e+n],["Z"]]}function s(o,e,t,n){return r(o,e,t/2,n)}return{compose:function(i){if(o.pushUnique(e,i)){var u=i.prototype.symbols;u.arrow=t,u["arrow-filled"]=r,u["arrow-filled-half"]=s,u["arrow-half"]=n,u["triangle-left"]=r,u["triangle-left-half"]=s}}}}),t(e,"masters/modules/arrow-symbols.src.js",[e["Core/Globals.js"],e["Extensions/ArrowSymbols.js"]],function(o,e){e.compose(o.SVGRenderer)})});//# sourceMappingURL=arrow-symbols.js.map