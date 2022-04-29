/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,c,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};c(a,"Stock/Indicators/VWAP/VWAPIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var c=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),f=a.seriesTypes.sma,
m=b.error,u=b.isArray,v=b.merge;b=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}c(b,a);b.prototype.getValues=function(a,b){var d=a.chart,c=a.xData;a=a.yData;var f=b.period,n=!0,g;if(g=d.get(b.volumeSeriesID))return u(a[0])||(n=!1),this.calculateVWAPValues(n,c,a,g,f);m("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,d)};b.prototype.calculateVWAPValues=function(a,b,c,f,m){var d=f.yData,g=f.xData.length,
e=b.length;f=[];var p=[],q=[],r=[],l=[],h;g=e<=g?e:g;for(h=e=0;e<g;e++){var k=a?(c[e][1]+c[e][2]+c[e][3])/3:c[e];k*=d[e];k=h?f[e-1]+k:k;var t=h?p[e-1]+d[e]:d[e];f.push(k);p.push(t);l.push([b[e],k/t]);q.push(l[e][0]);r.push(l[e][1]);h++;h===m&&(h=0)}return{values:l,xData:q,yData:r}};b.defaultOptions=v(f.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}});return b}(f);a.registerSeriesType("vwap",b);"";return b});c(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map