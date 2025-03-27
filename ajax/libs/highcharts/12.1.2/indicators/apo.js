!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/apo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/apo"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function o(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={exports:{}};return r[e](i,i.exports,o),i.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};o.d(i,{default:()=>g});var a=o(944),n=o.n(a),p=o(512),d=o.n(p);let{ema:h}=d().seriesTypes,{extend:u,merge:l,error:c}=n();class f extends h{getValues(e,t){let r,s;let o=t.periods,i=t.index,a=[],n=[],p=[];if(2!==o.length||o[1]<=o[0]){c('Error: "APO requires two periods. Notice, first period should be lower than the second one."');return}let d=super.getValues.call(this,e,{index:i,period:o[0]}),h=super.getValues.call(this,e,{index:i,period:o[1]});if(!d||!h)return;let u=o[1]-o[0];for(s=0;s<h.yData.length;s++)r=d.yData[s+u]-h.yData[s],a.push([h.xData[s],r]),n.push(h.xData[s]),p.push(r);return{values:a,xData:n,yData:p}}}f.defaultOptions=l(h.defaultOptions,{params:{period:void 0,periods:[10,20]}}),u(f.prototype,{nameBase:"APO",nameComponents:["periods"]}),d().registerSeriesType("apo",f);let g=n();return i.default})());