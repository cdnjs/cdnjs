!/**
 * Highcharts JS v11.4.8 (2024-08-29)
 *
 * Arrow Symbols
 *
 * (c) 2017-2024 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */function(e){"object"==typeof module&&module.exports?(e.default=e,module.exports=e):"function"==typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts"],function(o){return e(o),e.Highcharts=o,e}):e("undefined"!=typeof Highcharts?Highcharts:void 0)}(function(e){"use strict";var o=e?e._modules:{};function t(o,t,n,r){o.hasOwnProperty(t)||(o[t]=r.apply(null,n),"function"==typeof CustomEvent&&e.win.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:t,module:o[t]}})))}t(o,"Extensions/ArrowSymbols.js",[],function(){function e(e,o,t,n){return[["M",e,o+n/2],["L",e+t,o],["L",e,o+n/2],["L",e+t,o+n]]}function o(o,t,n,r){return e(o,t,n/2,r)}function t(e,o,t,n){return[["M",e+t,o],["L",e,o+n/2],["L",e+t,o+n],["Z"]]}function n(e,o,n,r){return t(e,o,n/2,r)}return{compose:function(r){let s=r.prototype.symbols;s.arrow=e,s["arrow-filled"]=t,s["arrow-filled-half"]=n,s["arrow-half"]=o,s["triangle-left"]=t,s["triangle-left-half"]=n}}}),t(o,"masters/modules/arrow-symbols.src.js",[o["Core/Globals.js"],o["Extensions/ArrowSymbols.js"]],function(e,o){return o.compose(e.SVGRenderer),e})});