!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/accumulation-distribution
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/accumulation-distribution"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},i={};function s(e){var t=i[e];if(void 0!==t)return t.exports;var o=i[e]={exports:{}};return r[e](o,o.exports,s),o.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};s.d(o,{default:()=>f});var a=s(944),n=s.n(a),u=s(512),h=s.n(u);let{sma:c}=h().seriesTypes,{error:p,extend:l,merge:d}=n();class g extends c{static populateAverage(e,t,r,i,s){let o=t[i][1],a=t[i][2],n=t[i][3],u=r[i];return[e[i],n===o&&n===a||o===a?0:(2*n-a-o)/(o-a)*u]}getValues(e,t){let r,i,s;let o=t.period,a=e.xData,n=e.yData,u=t.volumeSeriesID,h=e.chart.get(u),c=h?.getColumn("y"),l=n?n.length:0,d=[],f=[],y=[];if(!(a.length<=o)||!l||4===n[0].length){if(!h){p("Series "+u+" not found! Check `volumeSeriesID`.",!0,e.chart);return}for(i=o;i<l;i++)r=d.length,s=g.populateAverage(a,n,c,i,o),r>0&&(s[1]+=d[r-1][1]),d.push(s),f.push(s[0]),y.push(s[1]);return{values:d,xData:f,yData:y}}}}g.defaultOptions=d(c.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),l(g.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"}),h().registerSeriesType("ad",g);let f=n();return o.default})());