!/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/accumulation-distribution
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/accumulation-distribution"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},i={};function o(e){var t=i[e];if(void 0!==t)return t.exports;var s=i[e]={exports:{}};return r[e](s,s.exports,o),s.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var s={};o.d(s,{default:()=>f});var a=o(944),n=o.n(a),u=o(512),h=o.n(u);let{sma:c}=h().seriesTypes,{error:p,extend:d,merge:l}=n();class g extends c{static populateAverage(e,t,r,i,o){let s=t[i][1],a=t[i][2],n=t[i][3],u=r[i],h=n===s&&n===a||s===a?0:(2*n-a-s)/(s-a)*u;return[e[i],h]}getValues(e,t){let r,i,o,s=t.period,a=e.xData,n=e.yData,u=t.volumeSeriesID,h=e.chart.get(u),c=h?.getColumn("y"),d=n?n.length:0,l=[],f=[],y=[];if(!(a.length<=s)||!d||4===n[0].length){if(!h)return void p("Series "+u+" not found! Check `volumeSeriesID`.",!0,e.chart);for(i=s;i<d;i++)r=l.length,o=g.populateAverage(a,n,c,i,s),r>0&&(o[1]+=l[r-1][1]),l.push(o),f.push(o[0]),y.push(o[1]);return{values:l,xData:f,yData:y}}}}g.defaultOptions=l(c.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),d(g.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"}),h().registerSeriesType("ad",g);let f=n();return s.default})());