!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/vwap
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/vwap"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var a=s[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};i.d(a,{default:()=>g});var o=i(944),n=i.n(o),u=i(512),h=i.n(u);let{sma:p}=h().seriesTypes,{error:l,isArray:c,merge:d}=n();class f extends p{getValues(e,t){let r=e.chart,s=e.xData,i=e.yData,a=t.period,o=!0,n;if(!(n=r.get(t.volumeSeriesID))){l("Series "+t.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,r);return}return c(i[0])||(o=!1),this.calculateVWAPValues(o,s,i,n,a)}calculateVWAPValues(e,t,r,s,i){let a,o,n,u,h,p;let l=s.getColumn("y"),c=l.length,d=t.length,f=[],g=[],v=[],y=[],x=[];for(h=0,a=d<=c?d:c,p=0;h<a;h++)o=(e?(r[h][1]+r[h][2]+r[h][3])/3:r[h])*l[h],n=p?f[h-1]+o:o,u=p?g[h-1]+l[h]:l[h],f.push(n),g.push(u),x.push([t[h],n/u]),v.push(x[h][0]),y.push(x[h][1]),++p===i&&(p=0);return{values:x,xData:v,yData:y}}}f.defaultOptions=d(p.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}}),h().registerSeriesType("vwap",f);let g=n();return a.default})());