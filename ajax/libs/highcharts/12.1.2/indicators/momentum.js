!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/momentum
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/momentum"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var o=s[e]={exports:{}};return r[e](o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};i.d(o,{default:()=>m});var a=i(944),n=i.n(a),h=i(512),u=i.n(h);let{sma:p}=u().seriesTypes,{extend:d,isArray:c,merge:f}=n();function l(e,t,r,s,i){let o=t[r-1][i]-t[r-s-1][i];return[e[r-1],o]}class g extends p{getValues(e,t){let r,s;let i=t.period,o=t.index,a=e.xData,n=e.yData,h=n?n.length:0,u=[],p=[],d=[];if(!(a.length<=i)&&c(n[0])){for(r=i+1;r<h;r++)s=l(a,n,r,i,o),u.push(s),p.push(s[0]),d.push(s[1]);return s=l(a,n,r,i,o),u.push(s),p.push(s[0]),d.push(s[1]),{values:u,xData:p,yData:d}}}}g.defaultOptions=f(p.defaultOptions,{params:{index:3}}),d(g.prototype,{nameBase:"Momentum"}),u().registerSeriesType("momentum",g);let m=n();return o.default})());