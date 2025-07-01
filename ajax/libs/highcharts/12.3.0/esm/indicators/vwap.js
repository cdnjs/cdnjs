/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/vwap
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var l=t.n(s);let{sma:o}=l().seriesTypes,{error:u,isArray:i,merge:p}=a();class d extends o{getValues(e,t){let r=e.chart,a=e.xData,s=e.yData,l=t.period,o=!0,p;return(p=r.get(t.volumeSeriesID))?(i(s[0])||(o=!1),this.calculateVWAPValues(o,a,s,p,l)):void u("Series "+t.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,r)}calculateVWAPValues(e,t,r,a,s){let l,o,u,i,p,d,n=a.getColumn("y"),c=n.length,v=t.length,h=[],m=[],f=[],g=[],y=[];for(p=0,l=v<=c?v:c,d=0;p<l;p++)o=(e?(r[p][1]+r[p][2]+r[p][3])/3:r[p])*n[p],u=d?h[p-1]+o:o,i=d?m[p-1]+n[p]:n[p],h.push(u),m.push(i),y.push([t[p],u/i]),f.push(y[p][0]),g.push(y[p][1]),++d===s&&(d=0);return{values:y,xData:f,yData:g}}}d.defaultOptions=p(o.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}}),l().registerSeriesType("vwap",d);let n=a();export{n as default};