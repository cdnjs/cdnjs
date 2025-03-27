!/**
 * Highstock JS v12.1.2 (2024-12-21)
 * @module highcharts/indicators/dema
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2024 Rafał Sebestjański
 *
 * License: www.highcharts.com/license
 */function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(e._Highcharts,e._Highcharts.SeriesRegistry):"function"==typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts/highcharts"],function(e){return t(e,e.SeriesRegistry)}):"object"==typeof exports?exports["highcharts/indicators/dema"]=t(e._Highcharts,e._Highcharts.SeriesRegistry):e.Highcharts=t(e.Highcharts,e.Highcharts.SeriesRegistry)}("undefined"==typeof window?this:window,(e,t)=>(()=>{"use strict";var r={512:e=>{e.exports=t},944:t=>{t.exports=e}},s={};function i(e){var t=s[e];if(void 0!==t)return t.exports;var a=s[e]={exports:{}};return r[e](a,a.exports,i),a.exports}i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};i.d(a,{default:()=>l});var o=i(944),n=i.n(o),h=i(512),d=i.n(h);let{ema:u}=d().seriesTypes,{correctFloat:p,isArray:c,merge:f}=n();class g extends u{getEMA(e,t,r,s,i,a){return super.calculateEma(a||[],e,void 0===i?1:i,this.EMApercent,t,void 0===s?-1:s,r)}getValues(e,t){let r=t.period,s=[],i=2*r,a=e.xData,o=e.yData,n=o?o.length:0,h=[],d=[],u=[],f=0,g=0,l,y,x,v,m=-1,H,b=0;if(this.EMApercent=2/(r+1),!(n<2*r-1)){for(c(o[0])&&(m=t.index?t.index:0),b=(f=super.accumulatePeriodPoints(r,m,o))/r,f=0,v=r;v<n+2;v++)v<n+1&&(g=this.getEMA(o,y,b,m,v)[1],s.push(g)),y=g,v<i?f+=g:(v===i&&(b=f/r),g=s[v-r-1],l=this.getEMA([g],x,b)[1],H=[a[v-2],p(2*g-l)],h.push(H),d.push(H[0]),u.push(H[1]),x=l);return{values:h,xData:d,yData:u}}}}g.defaultOptions=f(u.defaultOptions),d().registerSeriesType("dema",g);let l=n();return a.default})());