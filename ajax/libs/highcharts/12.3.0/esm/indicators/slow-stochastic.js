/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/indicators
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Slow Stochastic series type for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Fus
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a:a}),a},t.d=(e,a)=>{for(var s in a)t.o(a,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:a[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let a=e.default;var s=t.n(a);t.d({},{});let r=e.default.SeriesRegistry;var l=t.n(r);let{sma:o,stochastic:i}=l().seriesTypes,{extend:c,merge:p}=s();class u extends i{getValues(e,t){let a=t.periods,s=super.getValues.call(this,e,t),r={values:[],xData:[],yData:[]};if(!s)return;r.xData=s.xData.slice(a[1]-1);let l=s.yData.slice(a[1]-1),i=o.prototype.getValues.call(this,{xData:r.xData,yData:l},{index:1,period:a[2]});if(i){for(let e=0,t=r.xData.length;e<t;e++)r.yData[e]=[l[e][1],i.yData[e-a[2]+1]||null],r.values[e]=[r.xData[e],l[e][1],i.yData[e-a[2]+1]||null];return r}}}u.defaultOptions=p(i.defaultOptions,{params:{periods:[14,3,3]}}),c(u.prototype,{nameBase:"Slow Stochastic"}),l().registerSeriesType("slowstochastic",u);let n=s();export{n as default};