/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,b,e){a.hasOwnProperty(f)||(a[f]=e.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/ATR/ATRIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){function f(a,d){return Math.max(a[1]-a[2],"undefined"===typeof d?0:Math.abs(a[1]-d[3]),"undefined"===typeof d?0:Math.abs(a[2]-d[3]))}const {sma:e}=a.seriesTypes,{isArray:r,merge:t}=b;class g extends e{constructor(){super(...arguments);this.options=this.points=this.data=void 0}getValues(a,d){d=d.period;const b=a.xData,e=(a=a.yData)?a.length:0,g=[[b[0],
a[0]]],l=[],m=[],n=[];let c;var k=0;let p=1,q=0;if(!(b.length<=d)&&r(a[0])&&4===a[0].length){for(c=1;c<=e;c++)if(g.push([b[c],a[c]]),d<p){{var h=d;const e=b[c-1],g=f(a[c-1],a[c-2]);h=[e,(k*(h-1)+g)/h]}k=h[1];l.push(h);m.push(h[0]);n.push(h[1])}else d===p?(k=q/(c-1),l.push([b[c-1],k]),m.push(b[c-1]),n.push(k)):q+=f(a[c-1],a[c-2]),p++;return{values:l,xData:m,yData:n}}}}g.defaultOptions=t(e.defaultOptions,{params:{index:void 0}});a.registerSeriesType("atr",g);"";return g});b(a,"masters/indicators/atr.src.js",
[],function(){})});
//# sourceMappingURL=atr.js.map