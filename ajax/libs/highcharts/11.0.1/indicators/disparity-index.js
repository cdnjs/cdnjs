/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highstock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/disparity-index",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,d,c,g){a.hasOwnProperty(d)||(a[d]=g.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,
module:a[d]}})))}a=a?a._modules:{};c(a,"Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c){const {sma:d}=a.seriesTypes,{correctFloat:g,defined:n,extend:l,isArray:p,merge:q}=c;class e extends d{constructor(){super(...arguments);this.points=this.options=this.data=this.averageIndicator=void 0}init(){const k=arguments,b=k[1].params;this.averageIndicator=a.seriesTypes[b&&b.average?b.average:void 0]||d;this.averageIndicator.prototype.init.apply(this,
k)}calculateDisparityIndex(a,b){return g(a-b)/b*100}getValues(a,b){const c=b.index,d=a.xData,h=a.yData,e=h?h.length:0,g=[],k=[],m=[];var f=this.averageIndicator;const l=p(h[0]);b=f.prototype.getValues(a,b);a=b.yData;b=d.indexOf(b.xData[0]);if(a&&0!==a.length&&n(c)&&!(h.length<=b)){for(f=b;f<e;f++){const e=this.calculateDisparityIndex(l?h[f][c]:h[f],a[f-b]);g.push([d[f],e]);k.push(d[f]);m.push(e)}return{values:g,xData:k,yData:m}}}}e.defaultOptions=q(d.defaultOptions,{params:{average:"sma",index:3},
marker:{enabled:!1},dataGrouping:{approximation:"averages"}});l(e.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]});a.registerSeriesType("disparityindex",e);"";return e});c(a,"masters/indicators/disparity-index.src.js",[],function(){})});
//# sourceMappingURL=disparity-index.js.map