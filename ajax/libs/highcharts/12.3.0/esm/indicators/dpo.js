/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/dpo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var o=t.n(s);let{sma:l}=o().seriesTypes,{extend:p,merge:n,correctFloat:d,pick:i}=a();function u(e,t,r,a,s){let o=i(t[r][a],t[r]);return s?d(e-o):d(e+o)}class f extends l{getValues(e,t){let r=t.period,a=t.index,s=Math.floor(r/2+1),o=r+s,l=e.xData||[],p=e.yData||[],n=p.length,d=[],f=[],c=[],h,y,m,g,v,x=0;if(!(l.length<=o)){for(g=0;g<r-1;g++)x=u(x,p,g,a);for(v=0;v<=n-o;v++)y=v+r-1,m=v+o-1,x=u(x,p,y,a),h=i(p[m][a],p[m])-x/r,x=u(x,p,v,a,!0),d.push([l[m],h]),f.push(l[m]),c.push(h);return{values:d,xData:f,yData:c}}}}f.defaultOptions=n(l.defaultOptions,{params:{index:0,period:21}}),p(f.prototype,{nameBase:"DPO"}),o().registerSeriesType("dpo",f);let c=a();export{c as default};