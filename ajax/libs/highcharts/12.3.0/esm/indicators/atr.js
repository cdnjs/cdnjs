/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/atr
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a:a}),a},t.d=(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let a=e.default;var r=t.n(a);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{sma:o}=l().seriesTypes,{isArray:u,merge:p}=r();function i(e,t){let a=e[1]-e[2];return Math.max(a,void 0===t?0:Math.abs(e[1]-t[3]),void 0===t?0:Math.abs(e[2]-t[3]))}class n extends o{getValues(e,t){let a=t.period,r=e.xData,s=e.yData,l=s?s.length:0,o=[[r[0],s[0]]],p=[],n=[],d=[],h,f,c=0,v=1,g=0;if(!(r.length<=a)&&u(s[0])&&4===s[0].length){for(f=1;f<=l;f++){var m,y,x,b,O,j,D=f;let e=r[D],t=s[D];o.push([e,t]),a<v?(c=(m=0,y=r,x=s,b=f,O=a,j=c,h=[y[b-1],(j*(O-1)+i(x[b-1],x[b-2]))/O])[1],p.push(h),n.push(h[0]),d.push(h[1])):(a===v?(c=g/(f-1),p.push([r[f-1],c]),n.push(r[f-1]),d.push(c)):g+=i(s[f-1],s[f-2]),v++)}return{values:p,xData:n,yData:d}}}}n.defaultOptions=p(o.defaultOptions,{params:{index:void 0}}),l().registerSeriesType("atr",n);let d=r();export{d as default};