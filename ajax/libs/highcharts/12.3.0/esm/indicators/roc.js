/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/roc
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Kacper Madej
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{sma:o}=l().seriesTypes,{isArray:n,merge:u,extend:p}=a();class i extends o{getValues(e,t){let r=t.period,a=e.xData,s=e.yData,l=s?s.length:0,o=[],u=[],p=[],i,d=-1,f;if(!(a.length<=r)){for(n(s[0])&&(d=t.index),i=r;i<l;i++)f=function(e,t,r,a,s){let l,o;return o=s<0?(l=t[r-a])?(t[r]-l)/l*100:null:(l=t[r-a][s])?(t[r][s]-l)/l*100:null,[e[r],o]}(a,s,i,r,d),o.push(f),u.push(f[0]),p.push(f[1]);return{values:o,xData:u,yData:p}}}}i.defaultOptions=u(o.defaultOptions,{params:{index:3,period:9}}),p(i.prototype,{nameBase:"Rate of Change"}),l().registerSeriesType("roc",i);let d=a();export{d as default};