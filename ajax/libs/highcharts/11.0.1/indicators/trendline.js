/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,c,l){a.hasOwnProperty(d)||(a[d]=l.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,
module:a[d]}})))}a=a?a._modules:{};c(a,"Stock/Indicators/TrendLine/TrendLineIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){const {sma:d}=a.seriesTypes,{extend:l,merge:m,isArray:q}=c;class g extends d{constructor(){super(...arguments);this.points=this.options=this.data=void 0;this.updateAllPoints=!0}getValues(a,b){const c=a.xData;var f=a.yData;a=[];const d=[],g=[],e=c.length,l=b.index;var h=(e-1)*e/2;let n=0,p=0,m=(e-1)*e*(2*e-1)/6,k;for(b=0;b<e;b++)k=q(f[b])?
f[b][l]:f[b],n+=k,p+=b*k;f=(e*p-h*n)/(e*m-h*h);isNaN(f)&&(f=0);h=(n-f*h)/e;for(b=0;b<e;b++)k=f*b+h,a[b]=[c[b],k],d[b]=c[b],g[b]=k;return{xData:d,yData:g,values:a}}}g.defaultOptions=m(d.defaultOptions,{params:{period:void 0,index:3}});l(g.prototype,{nameBase:"Trendline",nameComponents:!1});a.registerSeriesType("trendline",g);"";return g});c(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map