/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Fus

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,p){a.hasOwnProperty(c)||(a[c]=p.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/RSI/RSIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {sma:c}=a.seriesTypes,{isNumber:p,merge:u}=b;class l extends c{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,b){const f=b.period,c=a.xData;var d=a.yData;a=d?d.length:0;const k=b.decimals,l=[],r=[],t=[];var g=0;let n=0,q=b.index;var e=1;let h,m;if(!(c.length<f)){p(d[0])?m=d:(q=Math.min(q,d[0].length-1),
m=d.map(a=>a[q]));for(;e<f;)h=parseFloat((m[e]-m[e-1]).toFixed(k)),0<h?g+=h:n+=Math.abs(h),e++;b=parseFloat((g/(f-1)).toFixed(k));for(d=parseFloat((n/(f-1)).toFixed(k));e<a;e++)h=parseFloat((m[e]-m[e-1]).toFixed(k)),0<h?(g=h,n=0):(g=0,n=Math.abs(h)),b=parseFloat(((b*(f-1)+g)/f).toFixed(k)),d=parseFloat(((d*(f-1)+n)/f).toFixed(k)),g=0===d?100:0===b?0:parseFloat((100-100/(1+b/d)).toFixed(k)),l.push([c[e],g]),r.push(c[e]),t.push(g);return{values:l,xData:r,yData:t}}}}l.defaultOptions=u(c.defaultOptions,
{params:{decimals:4,index:3}});a.registerSeriesType("rsi",l);"";return l});b(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map