/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/rsi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Fus
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a:a}),a},t.d=(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let a=e.default;var r=t.n(a);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{sma:i}=l().seriesTypes,{isNumber:o,merge:n}=r();function d(e,t){return parseFloat(e.toFixed(t))}class p extends i{getValues(e,t){let a=t.period,r=e.xData,s=e.yData,l=s?s.length:0,i=t.decimals,n=[],p=[],u=[],f=0,h=0,c=t.index,m=1,g,y,x,v,b,O;if(!(r.length<a)){for(o(s[0])?O=s:(c=Math.min(c,s[0].length-1),O=s.map(e=>e[c]));m<a;)(y=d(O[m]-O[m-1],i))>0?f+=y:h+=Math.abs(y),m++;for(x=d(f/(a-1),i),v=d(h/(a-1),i),b=m;b<l;b++)(y=d(O[b]-O[b-1],i))>0?(f=y,h=0):(f=0,h=Math.abs(y)),x=d((x*(a-1)+f)/a,i),g=0===(v=d((v*(a-1)+h)/a,i))?100:0===x?0:d(100-100/(1+x/v),i),n.push([r[b],g]),p.push(r[b]),u.push(g);return{values:n,xData:p,yData:u}}}}p.defaultOptions=n(i.defaultOptions,{params:{decimals:4,index:3}}),l().registerSeriesType("rsi",p);let u=r();export{u as default};