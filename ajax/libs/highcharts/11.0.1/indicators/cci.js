/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,e){a.hasOwnProperty(f)||(a[f]=e.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/CCI/CCIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){function f(a){return a.reduce(function(a,b){return a+b},0)}const {sma:e}=a.seriesTypes,{isArray:q,merge:r}=b;class h extends e{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,b){b=b.period;const e=a.xData,h=(a=a.yData)?a.length:0,l=[],m=[],n=[],p=[];var d=1;if(!(e.length<=b)&&q(a[0])&&4===a[0].length){for(;d<
b;){var c=a[d-1];l.push((c[1]+c[2]+c[3])/3);d++}for(d=b;d<=h;d++){c=a[d-1];c=(c[1]+c[2]+c[3])/3;var k=l.push(c);var g=l.slice(k-b);k=f(g)/b;{let a;const b=g.length;let c=0;for(a=0;a<b;a++)c+=Math.abs(k-g[a]);g=c}g/=b;c=(c-k)/(.015*g);m.push([e[d-1],c]);n.push(e[d-1]);p.push(c)}return{values:m,xData:n,yData:p}}}}h.defaultOptions=r(e.defaultOptions,{params:{index:void 0}});a.registerSeriesType("cci",h);"";return h});b(a,"masters/indicators/cci.src.js",[],function(){})});
//# sourceMappingURL=cci.js.map