/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/momentum
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var s=t.n(r);t.d({},{});let a=e.default.SeriesRegistry;var o=t.n(a);let{sma:u}=o().seriesTypes,{extend:n,isArray:l,merge:p}=s();function i(e,t,r,s,a){let o=t[r-1][a]-t[r-s-1][a];return[e[r-1],o]}class d extends u{getValues(e,t){let r,s,a=t.period,o=t.index,u=e.xData,n=e.yData,p=n?n.length:0,d=[],m=[],f=[];if(!(u.length<=a)&&l(n[0])){for(r=a+1;r<p;r++)s=i(u,n,r,a,o),d.push(s),m.push(s[0]),f.push(s[1]);return s=i(u,n,r,a,o),d.push(s),m.push(s[0]),f.push(s[1]),{values:d,xData:m,yData:f}}}}d.defaultOptions=p(u.defaultOptions,{params:{index:3}}),n(d.prototype,{nameBase:"Momentum"}),o().registerSeriesType("momentum",d);let m=s();export{m as default};