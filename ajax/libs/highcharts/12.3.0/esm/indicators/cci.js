/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/cci
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var s=t.n(r);t.d({},{});let a=e.default.SeriesRegistry;var l=t.n(a);let{sma:o}=l().seriesTypes,{isArray:n,merge:u}=s();class i extends o{getValues(e,t){let r=t.period,s=e.xData,a=e.yData,l=a?a.length:0,o=[],u=[],i=[],p=[],c,d,f=[],h,g=1,y,m,v,x;if(!(s.length<=r)&&n(a[0])&&4===a[0].length){for(;g<r;)d=a[g-1],o.push((d[1]+d[2]+d[3])/3),g++;for(x=r;x<=l;x++)m=((d=a[x-1])[1]+d[2]+d[3])/3,h=o.push(m),y=(f=o.slice(h-r)).reduce(function(e,t){return e+t},0)/r,v=function(e,t){let r=e.length,s=0,a;for(a=0;a<r;a++)s+=Math.abs(t-e[a]);return s}(f,y)/r,c=(m-y)/(.015*v),u.push([s[x-1],c]),i.push(s[x-1]),p.push(c);return{values:u,xData:i,yData:p}}}}i.defaultOptions=u(o.defaultOptions,{params:{index:void 0}}),l().registerSeriesType("cci",i);let p=s();export{p as default};