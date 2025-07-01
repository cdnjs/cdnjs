/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/cmo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Lysy
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{sma:o}=l().seriesTypes,{isNumber:p,merge:u}=a();class n extends o{getValues(e,t){let r=t.period,a=e.xData,s=e.yData,l=s?s.length:0,o=[],u=[],n=[],i,d=t.index,h;if(a.length<r)return;p(s[0])?h=s:(d=Math.min(d,s[0].length-1),h=s.map(e=>e[d]));let f=0,c=0,m=0,g;for(let e=r;e>0;e--)h[e]>h[e-1]?c+=h[e]-h[e-1]:h[e]<h[e-1]&&(m+=h[e-1]-h[e]);for(g=c+m>0?100*(c-m)/(c+m):0,u.push(a[r]),n.push(g),o.push([a[r],g]),i=r+1;i<l;i++)f=Math.abs(h[i-r-1]-h[i-r]),h[i]>h[i-1]?c+=h[i]-h[i-1]:h[i]<h[i-1]&&(m+=h[i-1]-h[i]),h[i-r]>h[i-r-1]?c-=f:m-=f,g=c+m>0?100*(c-m)/(c+m):0,u.push(a[i]),n.push(g),o.push([a[i],g]);return{values:o,xData:u,yData:n}}}n.defaultOptions=u(o.defaultOptions,{params:{period:20,index:3}}),l().registerSeriesType("cmo",n);let i=a();export{i as default};