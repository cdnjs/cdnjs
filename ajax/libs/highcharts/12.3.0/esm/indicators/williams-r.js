/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/williams-r
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var r={};r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);let t=e.default;var a=r.n(t);r.d({},{});let s={getArrayExtremes:function(e,r,t){return e.reduce((e,a)=>[Math.min(e[0],a[r]),Math.max(e[1],a[t])],[Number.MAX_VALUE,-Number.MAX_VALUE])}},l=e.default.SeriesRegistry;var i=r.n(l);let{sma:o}=i().seriesTypes,{extend:n,isArray:u,merge:p}=a();class d extends o{getValues(e,r){let t,a,l,i,o,n,p=r.period,d=e.xData,m=e.yData,c=m?m.length:0,f=[],h=[],y=[];if(!(d.length<p)&&u(m[0])&&4===m[0].length){for(n=p-1;n<c;n++)t=m.slice(n-p+1,n+1),o=(a=s.getArrayExtremes(t,2,1))[0],l=-(((i=a[1])-m[n][3])/(i-o)*100),d[n]&&(f.push([d[n],l]),h.push(d[n]),y.push(l));return{values:f,xData:h,yData:y}}}}d.defaultOptions=p(o.defaultOptions,{params:{index:void 0,period:14}}),n(d.prototype,{nameBase:"Williams %R"}),i().registerSeriesType("williamsr",d);let m=a();export{m as default};