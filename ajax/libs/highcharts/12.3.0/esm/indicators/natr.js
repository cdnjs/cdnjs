/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/natr
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{atr:o}=l().seriesTypes,{merge:u}=a();class i extends o{getValues(e,t){let r=super.getValues.apply(this,arguments),a=r.values.length,s=e.yData,l=0,o=t.period-1;if(r){for(;l<a;l++)r.yData[l]=r.values[l][1]/s[o][3]*100,r.values[l][1]=r.yData[l],o++;return r}}}i.defaultOptions=u(o.defaultOptions,{tooltip:{valueSuffix:"%"}}),l().registerSeriesType("natr",i);let p=a();export{p as default};