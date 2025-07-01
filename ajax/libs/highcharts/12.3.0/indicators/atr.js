!/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/atr
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/atr"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function a(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={exports:{}};return r[e](i,i.exports,a),i.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};a.d(i,{default:()=>g});var o=a(944),h=a.n(o),n=a(512),p=a.n(n);let{sma:u}=p().seriesTypes,{isArray:d,merge:c}=h();function f(e,t){let r=e[1]-e[2];return Math.max(r,void 0===t?0:Math.abs(e[1]-t[3]),void 0===t?0:Math.abs(e[2]-t[3]))}class l extends u{getValues(e,t){let r=t.period,s=e.xData,a=e.yData,i=a?a.length:0,o=[[s[0],a[0]]],h=[],n=[],p=[],u,c,l=0,g=1,y=0;if(!(s.length<=r)&&d(a[0])&&4===a[0].length){for(c=1;c<=i;c++){var x,v,b,m,H,_,j=c;let e=s[j],t=a[j];o.push([e,t]),r<g?(l=(x=0,v=s,b=a,m=c,H=r,_=l,u=[v[m-1],(_*(H-1)+f(b[m-1],b[m-2]))/H])[1],h.push(u),n.push(u[0]),p.push(u[1])):(r===g?(l=y/(c-1),h.push([s[c-1],l]),n.push(s[c-1]),p.push(l)):y+=f(a[c-1],a[c-2]),g++)}return{values:h,xData:n,yData:p}}}}l.defaultOptions=c(u.defaultOptions,{params:{index:void 0}}),p().registerSeriesType("atr",l);let g=h();return i.default})());