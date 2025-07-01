/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/ppo
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Wojciech Chmiel
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var a=t.n(r);t.d({},{});let s=e.default.SeriesRegistry;var o=t.n(s);let{ema:i}=o().seriesTypes,{correctFloat:p,extend:l,merge:d,error:n}=a();class u extends i{getValues(e,t){let r,a,s=t.periods,o=t.index,i=[],l=[],d=[];if(2!==s.length||s[1]<=s[0])return void n('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');let u=super.getValues.call(this,e,{index:o,period:s[0]}),h=super.getValues.call(this,e,{index:o,period:s[1]});if(!u||!h)return;let c=s[1]-s[0];for(a=0;a<h.yData.length;a++)r=p((u.yData[a+c]-h.yData[a])/h.yData[a]*100),i.push([h.xData[a],r]),l.push(h.xData[a]),d.push(r);return{values:i,xData:l,yData:d}}}u.defaultOptions=d(i.defaultOptions,{params:{period:void 0,periods:[12,26]}}),l(u.prototype,{nameBase:"PPO",nameComponents:["periods"]}),o().registerSeriesType("ppo",u);let h=a();export{h as default};