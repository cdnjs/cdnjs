!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/cmo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Lysy
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/cmo",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/cmo"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var a=s[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};i.d(a,{default:()=>l});var o=i(944),n=i.n(o),h=i(512),p=i.n(h);let{sma:u}=p().seriesTypes,{isNumber:c,merge:d}=n();class f extends u{getValues(e,t){let r=t.period,s=e.xData,i=e.yData,a=i?i.length:0,o=[],n=[],h=[],p,u=t.index,d;if(s.length<r)return;c(i[0])?d=i:(u=Math.min(u,i[0].length-1),d=i.map(e=>e[u]));let f=0,l=0,g=0,y;for(let e=r;e>0;e--)d[e]>d[e-1]?l+=d[e]-d[e-1]:d[e]<d[e-1]&&(g+=d[e-1]-d[e]);for(y=l+g>0?100*(l-g)/(l+g):0,n.push(s[r]),h.push(y),o.push([s[r],y]),p=r+1;p<a;p++)f=Math.abs(d[p-r-1]-d[p-r]),d[p]>d[p-1]?l+=d[p]-d[p-1]:d[p]<d[p-1]&&(g+=d[p-1]-d[p]),d[p-r]>d[p-r-1]?l-=f:g-=f,y=l+g>0?100*(l-g)/(l+g):0,n.push(s[p]),h.push(y),o.push([s[p],y]);return{values:o,xData:n,yData:h}}}f.defaultOptions=d(u.defaultOptions,{params:{period:20,index:3}}),p().registerSeriesType("cmo",f);let l=n();return a.default})());