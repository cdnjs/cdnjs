/**
 * Highcharts JS v11.2.0 (2023-10-30)
 *
 * Arrow Symbols
 *
 * (c) 2017-2021 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */!function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts"],function(o){return e(o),e.Highcharts=o,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var o=e?e._modules:{};function t(e,o,t,n){e.hasOwnProperty(o)||(e[o]=n.apply(null,t),"function"==typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:o,module:e[o]}})))}t(o,"Extensions/ArrowSymbols.js",[o["Core/Utilities.js"]],function(e){let o=[];function t(e,o,t,n){return[["M",e,o+n/2],["L",e+t,o],["L",e,o+n/2],["L",e+t,o+n]]}function n(e,o,n,r){return t(e,o,n/2,r)}function r(e,o,t,n){return[["M",e+t,o],["L",e,o+n/2],["L",e+t,o+n],["Z"]]}function s(e,o,t,n){return r(e,o,t/2,n)}return{compose:function(i){if(e.pushUnique(o,i)){let e=i.prototype.symbols;e.arrow=t,e["arrow-filled"]=r,e["arrow-filled-half"]=s,e["arrow-half"]=n,e["triangle-left"]=r,e["triangle-left-half"]=s}}}}),t(o,"masters/modules/arrow-symbols.src.js",[o["Core/Globals.js"],o["Extensions/ArrowSymbols.js"]],function(e,o){o.compose(e.SVGRenderer)})});//# sourceMappingURL=arrow-symbols.js.map