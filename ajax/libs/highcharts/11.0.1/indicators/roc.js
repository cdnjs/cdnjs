/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,d,b,h){a.hasOwnProperty(d)||(a[d]=h.apply(null,b),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,
module:a[d]}})))}a=a?a._modules:{};b(a,"Stock/Indicators/ROC/ROCIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){const {sma:d}=a.seriesTypes,{isArray:h,merge:n,extend:p}=b;class f extends d{constructor(){super(...arguments);this.points=this.options=this.data=void 0}getValues(a,e){const b=e.period,d=a.xData,f=(a=a.yData)?a.length:0,k=[],l=[],m=[];let g=-1;if(!(d.length<=b)){h(a[0])&&(g=e.index);for(e=b;e<f;e++){var c=0>g?(c=a[e-b])?(a[e]-c)/c*100:null:(c=a[e-
b][g])?(a[e][g]-c)/c*100:null;c=[d[e],c];k.push(c);l.push(c[0]);m.push(c[1])}return{values:k,xData:l,yData:m}}}}f.defaultOptions=n(d.defaultOptions,{params:{index:3,period:9}});p(f.prototype,{nameBase:"Rate of Change"});a.registerSeriesType("roc",f);"";return f});b(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map