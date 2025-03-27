!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/williams-r
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/williams-r"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var a=s[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};i.d(a,{default:()=>y});var o=i(944),n=i.n(o);let h={getArrayExtremes:function(e,t,r){return e.reduce((e,s)=>[Math.min(e[0],s[t]),Math.max(e[1],s[r])],[Number.MAX_VALUE,-Number.MAX_VALUE])}};var l=i(512),p=i.n(l);let{sma:u}=p().seriesTypes,{extend:d,isArray:c,merge:f}=n();class g extends u{getValues(e,t){let r,s,i,a,o,n;let l=t.period,p=e.xData,u=e.yData,d=u?u.length:0,f=[],g=[],y=[];if(!(p.length<l)&&c(u[0])&&4===u[0].length){for(n=l-1;n<d;n++)r=u.slice(n-l+1,n+1),o=(s=h.getArrayExtremes(r,2,1))[0],i=-(((a=s[1])-u[n][3])/(a-o)*100),p[n]&&(f.push([p[n],i]),g.push(p[n]),y.push(i));return{values:f,xData:g,yData:y}}}}g.defaultOptions=f(u.defaultOptions,{params:{index:void 0,period:14}}),d(g.prototype,{nameBase:"Williams %R"}),p().registerSeriesType("williamsr",g);let y=n();return a.default})());