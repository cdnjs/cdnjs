/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/psar
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Parabolic SAR Indicator for Highcharts Stock
 *
 * (c) 2010-2025 Grzegorz Blachliński
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a:a}),a},t.d=(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let a=e.default;var r=t.n(a);t.d({},{});let i=e.default.SeriesRegistry;var l=t.n(i);let{sma:n}=l().seriesTypes,{merge:s}=r();function o(e,t){return parseFloat(e.toFixed(t))}class c extends n{constructor(){super(...arguments),this.nameComponents=void 0}getValues(e,t){let a=e.xData,r=e.yData,i=t.maxAccelerationFactor,l=t.increment,n=t.initialAccelerationFactor,s=t.decimals,c=t.index,u=[],d=[],p=[],h=t.initialAccelerationFactor,m,f=r[0][1],x,v,y,F=1,g,M,A,O,b=r[0][2],j,D,P,_;if(!(c>=r.length)){for(_=0;_<c;_++)f=Math.max(r[_][1],f),b=Math.min(r[_][2],o(b,s));for(m=r[_][1]>b?1:-1,x=f-b,v=(h=t.initialAccelerationFactor)*x,u.push([a[c],b]),d.push(a[c]),p.push(o(b,s)),_=c+1;_<r.length;_++)if(g=r[_-1][2],M=r[_-2][2],A=r[_-1][1],O=r[_-2][1],D=r[_][1],P=r[_][2],null!==M&&null!==O&&null!==g&&null!==A&&null!==D&&null!==P){var k,S,T,W,w,C,R,V,q,z,B,E,G,H,I,J,K,L,N,Q,U;w=m,C=F,R=b,V=v,q=M,z=g,B=A,E=O,G=f,b=w===C?1===w?R+V<Math.min(q,z)?R+V:Math.min(q,z):R+V>Math.max(E,B)?R+V:Math.max(E,B):G,k=m,S=f,j=1===k?D>S?D:S:P<S?P:S,T=F,W=b,H=y=1===T&&P>W||-1===T&&D>W?1:-1,I=m,J=j,K=f,L=h,N=l,Q=i,U=n,v=(h=H===I?1===H&&J>K||-1===H&&J<K?L===Q?Q:o(L+N,2):L:U)*(x=j-b),u.push([a[_],o(b,s)]),d.push(a[_]),p.push(o(b,s)),F=m,m=y,f=j}return{values:u,xData:d,yData:p}}}}c.defaultOptions=s(n.defaultOptions,{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{period:void 0,initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}}),l().registerSeriesType("psar",c);let u=r();export{u as default};