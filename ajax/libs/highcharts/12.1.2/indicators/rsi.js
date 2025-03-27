!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/rsi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Fus
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/rsi"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var a=s[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};i.d(a,{default:()=>g});var o=i(944),n=i.n(o),h=i(512),d=i.n(h);let{sma:p}=d().seriesTypes,{isNumber:c,merge:u}=n();function f(e,t){return parseFloat(e.toFixed(t))}class l extends p{getValues(e,t){let r=t.period,s=e.xData,i=e.yData,a=i?i.length:0,o=t.decimals,n=[],h=[],d=[],p=0,u=0,l=t.index,g=1,x,y,m,v,b,H;if(!(s.length<r)){for(c(i[0])?H=i:(l=Math.min(l,i[0].length-1),H=i.map(e=>e[l]));g<r;)(y=f(H[g]-H[g-1],o))>0?p+=y:u+=Math.abs(y),g++;for(m=f(p/(r-1),o),v=f(u/(r-1),o),b=g;b<a;b++)(y=f(H[b]-H[b-1],o))>0?(p=y,u=0):(p=0,u=Math.abs(y)),m=f((m*(r-1)+p)/r,o),x=0===(v=f((v*(r-1)+u)/r,o))?100:0===m?0:f(100-100/(1+m/v),o),n.push([s[b],x]),h.push(s[b]),d.push(x);return{values:n,xData:h,yData:d}}}}l.defaultOptions=u(p.defaultOptions,{params:{decimals:4,index:3}}),d().registerSeriesType("rsi",l);let g=n();return a.default})());