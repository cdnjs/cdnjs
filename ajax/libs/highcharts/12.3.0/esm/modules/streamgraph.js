/**
 * Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/streamgraph
 * @requires highcharts
 *
 * Streamgraph module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";var t={};t.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return t.d(a,{a:a}),a},t.d=(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let a=e.default;var r=t.n(a);let s=e.default.SeriesRegistry;var l=t.n(s);let{areaspline:i}=l().seriesTypes,{addEvent:d,merge:o,extend:p}=r();class n extends i{streamStacker(e,t,a){e[0]-=t.total/2,e[1]-=t.total/2,this.stackedYData&&(this.stackedYData[a]=Math.max.apply(0,e))}}n.defaultOptions=o(i.defaultOptions,{fillOpacity:1,lineWidth:0,marker:{enabled:!1},stacking:"stream"}),d(n,"afterGetExtremes",e=>{e.dataExtremes.dataMin=-e.dataExtremes.dataMax}),p(n.prototype,{negStacks:!1}),l().registerSeriesType("streamgraph",n);let c=r();export{c as default};