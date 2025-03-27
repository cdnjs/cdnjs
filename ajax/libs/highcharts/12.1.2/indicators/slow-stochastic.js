!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/indicators
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2024 Pawel Fus
 *
 * License: www.highcharts.com/license
 */function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(t._Highcharts,t._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/slow-stochastic",["highcharts/highcharts"],function(t){return e(t,t.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/slow-stochastic"]=e(t._Highcharts,t._Highcharts.SeriesRegistry):t.Highcharts=e(t.Highcharts,t.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(t,e)=>(()=>{"use strict";var a={512:t=>{t.exports=e},944:e=>{e.exports=t}},s={};function r(t){var e=s[t];if(void 0!==e)return e.exports;var i=s[t]={exports:{}};return a[t](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var i={};r.d(i,{default:()=>y});var o=r(944),c=r.n(o),n=r(512),l=r.n(n);let{sma:h,stochastic:p}=l().seriesTypes,{extend:u,merge:d}=c();class f extends p{getValues(t,e){let a=e.periods,s=super.getValues.call(this,t,e),r={values:[],xData:[],yData:[]};if(!s)return;r.xData=s.xData.slice(a[1]-1);let i=s.yData.slice(a[1]-1),o=h.prototype.getValues.call(this,{xData:r.xData,yData:i},{index:1,period:a[2]});if(o){for(let t=0,e=r.xData.length;t<e;t++)r.yData[t]=[i[t][1],o.yData[t-a[2]+1]||null],r.values[t]=[r.xData[t],i[t][1],o.yData[t-a[2]+1]||null];return r}}}f.defaultOptions=d(p.defaultOptions,{params:{periods:[14,3,3]}}),u(f.prototype,{nameBase:"Slow Stochastic"}),l().registerSeriesType("slowstochastic",f);let y=c();return i.default})());