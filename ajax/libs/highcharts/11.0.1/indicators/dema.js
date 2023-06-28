/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/DEMA/DEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {ema:c}=a.seriesTypes,{correctFloat:g,isArray:w,merge:l}=b;class f extends c{constructor(){super(...arguments);this.points=this.options=this.data=this.EMApercent=void 0}getEMA(a,x,y,b,c,g){return super.calculateEma(g||[],a,"undefined"===typeof c?1:c,this.EMApercent,x,"undefined"===typeof b?-1:b,y)}getValues(a,b){const c=b.period,f=[],p=2*c,
l=a.xData,m=(a=a.yData)?a.length:0,q=[],r=[],t=[];let e=0;let u,d,n=-1,h,k;this.EMApercent=2/(c+1);if(!(m<2*c-1)){w(a[0])&&(n=b.index?b.index:0);b=super.accumulatePeriodPoints(c,n,a);k=b/c;b=0;for(d=c;d<m+2;d++)if(d<m+1&&(e=this.getEMA(a,u,k,n,d)[1],f.push(e)),u=e,d<p)b+=e;else{d===p&&(k=b/c);e=f[d-c-1];var v=this.getEMA([e],v,k)[1];h=[l[d-2],g(2*e-v)];q.push(h);r.push(h[0]);t.push(h[1])}return{values:q,xData:r,yData:t}}}}f.defaultOptions=l(c.defaultOptions);a.registerSeriesType("dema",f);"";return f});
b(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map