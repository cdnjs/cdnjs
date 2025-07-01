/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/cmf
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Sebastian Domas
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var t={};t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},t.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);let r=e.default;var s=t.n(r);t.d({},{});let l=e.default.SeriesRegistry;var a=t.n(l);let{sma:o}=a().seriesTypes,{merge:i}=s();class n extends o{constructor(){super(...arguments),this.nameBase="Chaikin Money Flow"}isValid(){let e=this.chart,t=this.options,r=this.linkedParent,s=this.volumeSeries||(this.volumeSeries=e.get(t.params.volumeSeriesID)),l=r?.pointArrayMap?.length===4;function a(e){return e.dataTable.rowCount>=t.params.period}return!!(r&&s&&a(r)&&a(s)&&l)}getValues(e,t){if(this.isValid())return this.getMoneyFlow(e.xData,e.yData,this.volumeSeries.getColumn("y"),t.period)}getMoneyFlow(e,t,r,s){let l=t.length,a=[],o=[],i=[],n=[],u,p,h=-1,d=0,m=0;function f(e,t){let r=e[1],s=e[2],l=e[3];return null!==t&&null!==r&&null!==s&&null!==l&&r!==s?(l-s-(r-l))/(r-s)*t:(h=u,null)}if(s>0&&s<=l){for(u=0;u<s;u++)a[u]=f(t[u],r[u]),d+=r[u],m+=a[u];for(o.push(e[u-1]),i.push(u-h>=s&&0!==d?m/d:null),n.push([o[0],i[0]]);u<l;u++)a[u]=f(t[u],r[u]),d-=r[u-s],d+=r[u],m-=a[u-s],m+=a[u],p=[e[u],u-h>=s?m/d:null],o.push(p[0]),i.push(p[1]),n.push([p[0],p[1]])}return{values:n,xData:o,yData:i}}}n.defaultOptions=i(o.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}}),a().registerSeriesType("cmf",n);let u=s();export{u as default};