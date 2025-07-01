/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/dema
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Rafał Sebestjański
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var i=t.n(s);let{ema:l}=i().seriesTypes,{correctFloat:o,isArray:u,merge:d}=a();class p extends l{getEMA(e,t,r,a,s,i){return super.calculateEma(i||[],e,void 0===s?1:s,this.EMApercent,t,void 0===a?-1:a,r)}getValues(e,t){let r=t.period,a=[],s=2*r,i=e.xData,l=e.yData,d=l?l.length:0,p=[],n=[],c=[],h=0,f=0,m,g,v,y,x=-1,E,M=0;if(this.EMApercent=2/(r+1),!(d<2*r-1)){for(u(l[0])&&(x=t.index?t.index:0),M=(h=super.accumulatePeriodPoints(r,x,l))/r,h=0,y=r;y<d+2;y++)y<d+1&&(f=this.getEMA(l,g,M,x,y)[1],a.push(f)),g=f,y<s?h+=f:(y===s&&(M=h/r),f=a[y-r-1],m=this.getEMA([f],v,M)[1],E=[i[y-2],o(2*f-m)],p.push(E),n.push(E[0]),c.push(E[1]),v=m);return{values:p,xData:n,yData:c}}}}p.defaultOptions=d(l.defaultOptions),i().registerSeriesType("dema",p);let n=a();export{n as default};