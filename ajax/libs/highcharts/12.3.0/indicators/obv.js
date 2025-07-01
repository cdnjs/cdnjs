!/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/obv
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/obv",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/obv"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,s),i.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};s.d(i,{default:()=>g});var a=s(944),n=s.n(a),h=s(512),u=s.n(h);let{sma:p}=u().seriesTypes,{isNumber:d,error:c,extend:l,merge:f}=n();class v extends p{getValues(e,t){let r=e.chart.get(t.volumeSeriesID),o=e.xData,s=e.yData,i=[],a=[],n=[],h=!d(s[0]),u=[],p=1,l=0,f=0,v=0,g=0,y;if(!r)return void c("Series "+t.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,e.chart);for(y=r.getColumn("y"),u=[o[0],l],v=h?s[0][3]:s[0],i.push(u),a.push(o[0]),n.push(u[1]);p<s.length;p++)f=(g=h?s[p][3]:s[p])>v?l+y[p]:g===v?l:l-y[p],u=[o[p],f],l=f,v=g,i.push(u),a.push(o[p]),n.push(u[1]);return{values:i,xData:a,yData:n}}}v.defaultOptions=f(p.defaultOptions,{marker:{enabled:!1},params:{index:void 0,period:void 0,volumeSeriesID:"volume"},tooltip:{valueDecimals:0}}),l(v.prototype,{nameComponents:void 0}),u().registerSeriesType("obv",v);let g=n();return i.default})());