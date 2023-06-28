/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,f){a.hasOwnProperty(d)||(a[d]=f.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,
module:a[d]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/DPO/DPOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){function d(a,c,b,d,l){c=p(c[b][d],c[b]);return l?m(a-c):m(a+c)}const {sma:f}=a.seriesTypes,{extend:t,merge:u,correctFloat:m,pick:p}=b;class h extends f{constructor(){super(...arguments);this.points=this.data=this.options=void 0}getValues(a,c){const b=c.period;c=c.index;const f=b+Math.floor(b/2+1),l=a.xData||[];a=a.yData||[];const h=a.length,m=[],q=
[],r=[];var e;let k,g=0;if(!(l.length<=f)){for(e=0;e<b-1;e++)g=d(g,a,e,c);for(k=0;k<=h-f;k++){var n=k+b-1;e=k+f-1;g=d(g,a,n,c);n=p(a[e][c],a[e]);n-=g/b;g=d(g,a,k,c,!0);m.push([l[e],n]);q.push(l[e]);r.push(n)}return{values:m,xData:q,yData:r}}}}h.defaultOptions=u(f.defaultOptions,{params:{index:0,period:21}});t(h.prototype,{nameBase:"DPO"});a.registerSeriesType("dpo",h);"";return h});b(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map