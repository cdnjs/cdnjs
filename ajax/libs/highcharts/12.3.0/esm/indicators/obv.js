/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/obv
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Karol Kolodziej
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var s=t.n(r);t.d({},{});let a=e.default.SeriesRegistry;var o=t.n(a);let{sma:l}=o().seriesTypes,{isNumber:u,error:i,extend:p,merge:n}=s();class d extends l{getValues(e,t){let r=e.chart.get(t.volumeSeriesID),s=e.xData,a=e.yData,o=[],l=[],p=[],n=!u(a[0]),d=[],v=1,m=0,h=0,c=0,f=0,y;if(!r)return void i("Series "+t.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,e.chart);for(y=r.getColumn("y"),d=[s[0],m],c=n?a[0][3]:a[0],o.push(d),l.push(s[0]),p.push(d[1]);v<a.length;v++)h=(f=n?a[v][3]:a[v])>c?m+y[v]:f===c?m:m-y[v],d=[s[v],h],m=h,c=f,o.push(d),l.push(s[v]),p.push(d[1]);return{values:o,xData:l,yData:p}}}d.defaultOptions=n(l.defaultOptions,{marker:{enabled:!1},params:{index:void 0,period:void 0,volumeSeriesID:"volume"},tooltip:{valueDecimals:0}}),p(d.prototype,{nameComponents:void 0}),o().registerSeriesType("obv",d);let v=s();export{v as default};