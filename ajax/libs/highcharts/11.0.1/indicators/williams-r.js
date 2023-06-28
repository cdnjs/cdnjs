/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,b,q){a.hasOwnProperty(c)||(a[c]=q.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:c,
module:a[c]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/ArrayUtilities.js",[],function(){return{getArrayExtremes:function(a,c,b){return a.reduce((a,d)=>[Math.min(a[0],d[c]),Math.max(a[1],d[b])],[Number.MAX_VALUE,-Number.MAX_VALUE])}}});b(a,"Stock/Indicators/WilliamsR/WilliamsRIndicator.js",[a["Stock/Indicators/ArrayUtilities.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b,p){const {sma:c}=b.seriesTypes,{extend:d,isArray:r,merge:t}=p;class f extends c{constructor(){super(...arguments);
this.points=this.options=this.data=void 0}getValues(b,c){c=c.period;const d=b.xData,f=(b=b.yData)?b.length:0,k=[],l=[],m=[];let n,e;if(!(d.length<c)&&r(b[0])&&4===b[0].length){for(e=c-1;e<f;e++){var g=b.slice(e-c+1,e+1);var h=a.getArrayExtremes(g,2,1);g=h[0];h=h[1];n=b[e][3];g=(h-n)/(h-g)*-100;d[e]&&(k.push([d[e],g]),l.push(d[e]),m.push(g))}return{values:k,xData:l,yData:m}}}}f.defaultOptions=t(c.defaultOptions,{params:{index:void 0,period:14}});d(f.prototype,{nameBase:"Williams %R"});b.registerSeriesType("williamsr",
f);"";return f});b(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map