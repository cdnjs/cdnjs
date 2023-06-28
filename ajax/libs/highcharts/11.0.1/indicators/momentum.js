/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/Momentum/MomentumIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {sma:c}=a.seriesTypes,{extend:g,isArray:m,merge:n}=b;class e extends c{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(a,b){const c=b.period;b=b.index;const e=a.xData,g=(a=a.yData)?a.length:0,h=[],k=[],l=[];let d,f;if(!(e.length<=c)&&m(a[0])){for(d=c+1;d<g;d++)f=[e[d-1],a[d-1][b]-a[d-c-1][b]],h.push(f),
k.push(f[0]),l.push(f[1]);f=[e[d-1],a[d-1][b]-a[d-c-1][b]];h.push(f);k.push(f[0]);l.push(f[1]);return{values:h,xData:k,yData:l}}}}e.defaultOptions=n(c.defaultOptions,{params:{index:3}});g(e.prototype,{nameBase:"Momentum"});a.registerSeriesType("momentum",e);"";return e});b(a,"masters/indicators/momentum.src.js",[],function(){})});
//# sourceMappingURL=momentum.js.map