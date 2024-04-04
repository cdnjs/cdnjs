!/**
 * Highcharts JS v11.4.1 (2024-04-04)
 *
 * Arrow Symbols
 *
 * (c) 2017-2024 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */function(o){"object"==typeof module&&module.exports?(o.default=o,module.exports=o):"function"==typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts"],function(e){return o(e),o.Highcharts=e,o}):o("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(o){"use strict";var e=o?o._modules:{};function t(o,e,t,n){o.hasOwnProperty(e)||(o[e]=n.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:e,module:o[e]}})))}t(e,"Extensions/ArrowSymbols.js",[],function(){function o(o,e,t,n){return[["M",o,e+n/2],["L",o+t,e],["L",o,e+n/2],["L",o+t,e+n]]}function e(e,t,n,r){return o(e,t,n/2,r)}function t(o,e,t,n){return[["M",o+t,e],["L",o,e+n/2],["L",o+t,e+n],["Z"]]}function n(o,e,n,r){return t(o,e,n/2,r)}return{compose:function(r){let s=r.prototype.symbols;s.arrow=o,s["arrow-filled"]=t,s["arrow-filled-half"]=n,s["arrow-half"]=e,s["triangle-left"]=t,s["triangle-left-half"]=n}}}),t(e,"masters/modules/arrow-symbols.src.js",[e["Core/Globals.js"],e["Extensions/ArrowSymbols.js"]],function(o,e){return e.compose(o.SVGRenderer),o})});