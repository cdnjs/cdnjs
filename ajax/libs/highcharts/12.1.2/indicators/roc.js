!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/roc
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Kacper Madej
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/roc"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var o=s[e]={exports:{}};return r[e](o,o.exports,i),o.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};i.d(o,{default:()=>g});var a=i(944),n=i.n(a),h=i(512),p=i.n(h);let{sma:u}=p().seriesTypes,{isArray:c,merge:d,extend:f}=n();class l extends u{getValues(e,t){let r=t.period,s=e.xData,i=e.yData,o=i?i.length:0,a=[],n=[],h=[],p,u=-1,d;if(!(s.length<=r)){for(c(i[0])&&(u=t.index),p=r;p<o;p++)d=function(e,t,r,s,i){let o,a;return a=i<0?(o=t[r-s])?(t[r]-o)/o*100:null:(o=t[r-s][i])?(t[r][i]-o)/o*100:null,[e[r],a]}(s,i,p,r,u),a.push(d),n.push(d[0]),h.push(d[1]);return{values:a,xData:n,yData:h}}}}l.defaultOptions=d(u.defaultOptions,{params:{index:3,period:9}}),f(l.prototype,{nameBase:"Rate of Change"}),p().registerSeriesType("roc",l);let g=n();return o.default})());