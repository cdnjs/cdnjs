/*
 Highstock JS v10.3.1 (2022-10-31)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/roc",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/ROC/ROCIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var f in c)c.hasOwnProperty(f)&&(a[f]=c[f])};return a(b,c)};return function(b,c){function f(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(f.prototype=c.prototype,new f)}}(),g=a.seriesTypes.sma,
m=b.isArray,n=b.merge;b=b.extend;var h=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=b.period,d=a.xData,f=(a=a.yData)?a.length:0,g=[],h=[],l=[],k=-1;if(!(d.length<=c)){m(a[0])&&(k=b.index);for(b=c;b<f;b++){var e=0>k?(e=a[b-c])?(a[b]-e)/e*100:null:(e=a[b-c][k])?(a[b][k]-e)/e*100:null;e=[d[b],e];g.push(e);h.push(e[0]);l.push(e[1])}return{values:g,xData:h,yData:l}}};b.defaultOptions=
n(g.defaultOptions,{params:{index:3,period:9}});return b}(g);b(h.prototype,{nameBase:"Rate of Change"});a.registerSeriesType("roc",h);"";return h});d(a,"masters/indicators/roc.src.js",[],function(){})});
//# sourceMappingURL=roc.js.map