/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/apo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var o=t.n(s);let{ema:i}=o().seriesTypes,{extend:l,merge:p,error:d}=a();class n extends i{getValues(e,t){let r,a,s=t.periods,o=t.index,i=[],l=[],p=[];if(2!==s.length||s[1]<=s[0])return void d('Error: "APO requires two periods. Notice, first period should be lower than the second one."');let n=super.getValues.call(this,e,{index:o,period:s[0]}),u=super.getValues.call(this,e,{index:o,period:s[1]});if(!n||!u)return;let h=s[1]-s[0];for(a=0;a<u.yData.length;a++)r=n.yData[a+h]-u.yData[a],i.push([u.xData[a],r]),l.push(u.xData[a]),p.push(r);return{values:i,xData:l,yData:p}}}n.defaultOptions=p(i.defaultOptions,{params:{period:void 0,periods:[10,20]}}),l(n.prototype,{nameBase:"APO",nameComponents:["periods"]}),o().registerSeriesType("apo",n);let u=a();export{u as default};