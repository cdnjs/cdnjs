!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/atr
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/atr"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function a(e){var t=s[e];if(void 0!==t)return t.exports;var i=s[e]={exports:{}};return r[e](i,i.exports,a),i.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};a.d(i,{default:()=>l});var o=a(944),n=a.n(o),h=a(512),u=a.n(h);let{sma:p}=u().seriesTypes,{isArray:d,merge:c}=n();function f(e,t){return Math.max(e[1]-e[2],void 0===t?0:Math.abs(e[1]-t[3]),void 0===t?0:Math.abs(e[2]-t[3]))}class g extends p{getValues(e,t){let r=t.period,s=e.xData,a=e.yData,i=a?a.length:0,o=[[s[0],a[0]]],n=[],h=[],u=[],p,c,g=0,l=1,y=0;if(!(s.length<=r)&&d(a[0])&&4===a[0].length){for(c=1;c<=i;c++){var x,v;!function(e,t,r,s){let a=t[s],i=r[s];e.push([a,i])}(o,s,a,c),r<l?(g=(x=c,v=g,p=[s[x-1],(v*(r-1)+f(a[x-1],a[x-2]))/r])[1],n.push(p),h.push(p[0]),u.push(p[1])):(r===l?(g=y/(c-1),n.push([s[c-1],g]),h.push(s[c-1]),u.push(g)):y+=f(a[c-1],a[c-2]),l++)}return{values:n,xData:h,yData:u}}}}g.defaultOptions=c(p.defaultOptions,{params:{index:void 0}}),u().registerSeriesType("atr",g);let l=n();return i.default})());