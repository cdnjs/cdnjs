/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/mfi
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Money Flow Index indicator for Highcharts Stock
 *
 * (c) 2010-2025 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var s=t.n(r);t.d({},{});let a=e.default.SeriesRegistry;var o=t.n(a);let{sma:u}=o().seriesTypes,{extend:i,merge:l,error:n,isArray:d}=s();function p(e){return e.reduce(function(e,t){return e+t})}function f(e){return(e[1]+e[2]+e[3])/3}class h extends u{getValues(e,t){let r=t.period,s=e.xData,a=e.yData,o=a?a.length:0,u=t.decimals,i=e.chart.get(t.volumeSeriesID),l=i?.getColumn("y")||[],h=[],c=[],m=[],v=[],y=[],g,D,x,S,I,O,j=!1,b=1;if(!i)return void n("Series "+t.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,e.chart);if(!(s.length<=r)&&d(a[0])&&4===a[0].length&&l){for(g=f(a[b]);b<r+1;)D=g,j=(g=f(a[b]))>=D,x=g*l[b],v.push(j?x:0),y.push(j?0:x),b++;for(O=b-1;O<o;O++){var F;O>b-1&&(v.shift(),y.shift(),D=g,j=(g=f(a[O]))>D,x=g*l[O],v.push(j?x:0),y.push(j?0:x)),S=p(y),F=100-100/(1+p(v)/S),I=parseFloat(F.toFixed(u)),h.push([s[O],I]),c.push(s[O]),m.push(I)}return{values:h,xData:c,yData:m}}}}h.defaultOptions=l(u.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume",decimals:4}}),i(h.prototype,{nameBase:"Money Flow Index"}),o().registerSeriesType("mfi",h);let c=s();export{c as default};