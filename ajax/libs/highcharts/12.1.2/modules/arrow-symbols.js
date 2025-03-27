!/**
 * Highcharts JS v12.1.2 (2024-12-21)
 * @module highcharts/modules/arrow-symbols
 * @requires highcharts
 *
 * Arrow Symbols
 *
 * (c) 2017-2024 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(e._Highcharts):"function"==typeof define&&define.amd?define("highcharts/modules/arrow-symbols",["highcharts/highcharts"],function(e){return r(e)}):"object"==typeof exports?exports["highcharts/modules/arrow-symbols"]=r(e._Highcharts):e.Highcharts=r(e.Highcharts)}("undefined"==typeof window?this:window,e=>(()=>{"use strict";var r={944:r=>{r.exports=e}},t={};function o(e){var n=t[e];if(void 0!==n)return n.exports;var a=t[e]={exports:{}};return r[e](a,a.exports,o),a.exports}o.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return o.d(r,{a:r}),r},o.d=(e,r)=>{for(var t in r)o.o(r,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);var n={};o.d(n,{default:()=>c});var a=o(944),i=o.n(a);function s(e,r,t,o){return[["M",e,r+o/2],["L",e+t,r],["L",e,r+o/2],["L",e+t,r+o]]}function f(e,r,t,o){return s(e,r,t/2,o)}function u(e,r,t,o){return[["M",e+t,r],["L",e,r+o/2],["L",e+t,r+o],["Z"]]}function l(e,r,t,o){return u(e,r,t/2,o)}({compose:function(e){let r=e.prototype.symbols;r.arrow=s,r["arrow-filled"]=u,r["arrow-filled-half"]=l,r["arrow-half"]=f,r["triangle-left"]=u,r["triangle-left-half"]=l}}).compose(i().SVGRenderer);let c=i();return n.default})());