/**
 * Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/arrow-symbols
 * @requires highcharts
 *
 * Arrow Symbols
 *
 * (c) 2017-2025 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */import*as r from"../highcharts.js";var e={};e.n=r=>{var t=r&&r.__esModule?()=>r.default:()=>r;return e.d(t,{a:t}),t},e.d=(r,t)=>{for(var o in t)e.o(t,o)&&!e.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:t[o]})},e.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e);let t=r.default;var o=e.n(t);function a(r,e,t,o){return[["M",r,e+o/2],["L",r+t,e],["L",r,e+o/2],["L",r+t,e+o]]}function n(r,e,t,o){return a(r,e,t/2,o)}function l(r,e,t,o){return[["M",r+t,e],["L",r,e+o/2],["L",r+t,e+o],["Z"]]}function f(r,e,t,o){return l(r,e,t/2,o)}({compose:function(r){let e=r.prototype.symbols;e.arrow=a,e["arrow-filled"]=l,e["arrow-filled-half"]=f,e["arrow-half"]=n,e["triangle-left"]=l,e["triangle-left-half"]=f}}).compose(o().SVGRenderer);let u=o();export{u as default};