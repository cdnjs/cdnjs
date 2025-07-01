/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/disparity-index
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2025 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var a={};a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a);let t=e.default;var r=a.n(t);a.d({},{});let s=e.default.SeriesRegistry;var i=a.n(s);let{sma:n}=i().seriesTypes,{correctFloat:p,defined:o,extend:l,isArray:d,merge:u}=r();class y extends n{init(){let e=arguments,a=e[1].params,t=a&&a.average?a.average:void 0;this.averageIndicator=i().seriesTypes[t]||n,this.averageIndicator.prototype.init.apply(this,e)}calculateDisparityIndex(e,a){return p(e-a)/a*100}getValues(e,a){let t=a.index,r=e.xData,s=e.yData,i=s?s.length:0,n=[],p=[],l=[],u=this.averageIndicator,y=d(s[0]),g=u.prototype.getValues(e,a),c=g.yData,h=r.indexOf(g.xData[0]);if(c&&0!==c.length&&o(t)&&!(s.length<=h)){for(let e=h;e<i;e++){let a=this.calculateDisparityIndex(y?s[e][t]:s[e],c[e-h]);n.push([r[e],a]),p.push(r[e]),l.push(a)}return{values:n,xData:p,yData:l}}}}y.defaultOptions=u(n.defaultOptions,{params:{average:"sma",index:3},marker:{enabled:!1},dataGrouping:{approximation:"averages"}}),l(y.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]}),i().registerSeriesType("disparityindex",y);let g=r();export{g as default};