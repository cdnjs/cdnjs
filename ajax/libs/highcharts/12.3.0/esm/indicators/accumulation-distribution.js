/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/accumulation-distribution
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Sebastian Bochan
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var o=t.n(s);let{sma:l}=o().seriesTypes,{error:u,extend:i,merge:n}=a();class p extends l{static populateAverage(e,t,r,a,s){let o=t[a][1],l=t[a][2],u=t[a][3],i=r[a],n=u===o&&u===l||o===l?0:(2*u-l-o)/(o-l)*i;return[e[a],n]}getValues(e,t){let r,a,s,o=t.period,l=e.xData,i=e.yData,n=t.volumeSeriesID,d=e.chart.get(n),c=d?.getColumn("y"),m=i?i.length:0,h=[],v=[],f=[];if(!(l.length<=o)||!m||4===i[0].length){if(!d)return void u("Series "+n+" not found! Check `volumeSeriesID`.",!0,e.chart);for(a=o;a<m;a++)r=h.length,s=p.populateAverage(l,i,c,a,o),r>0&&(s[1]+=h[r-1][1]),h.push(s),v.push(s[0]),f.push(s[1]);return{values:h,xData:v,yData:f}}}}p.defaultOptions=n(l.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),i(p.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"}),o().registerSeriesType("ad",p);let d=a();export{d as default};