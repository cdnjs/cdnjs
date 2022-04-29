/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Karol Kolodziej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/obv",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,c,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,c),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};c(a,"Stock/Indicators/OBV/OBVIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var c=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,d){a.__proto__=d}||function(a,d){for(var b in d)d.hasOwnProperty(b)&&(a[b]=d[b])};return a(b,d)};return function(b,d){function c(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(c.prototype=d.prototype,new c)}}(),f=a.seriesTypes.sma,
p=b.isNumber,q=b.error,r=b.extend,t=b.merge;b=function(a){function b(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}c(b,a);b.prototype.getValues=function(a,b){var c=a.chart.get(b.volumeSeriesID),d=a.xData,g=a.yData,f=[],k=[],l=[],n=!p(g[0]),e=1,h=0;if(c){c=c.yData;a=[d[0],h];var m=n?g[0][3]:g[0];f.push(a);k.push(d[0]);l.push(a[1]);for(e;e<g.length;e++)b=n?g[e][3]:g[e],h=b>m?h+c[e]:b===m?h:h-c[e],a=[d[e],h],m=b,f.push(a),k.push(d[e]),l.push(a[1]);
return{values:f,xData:k,yData:l}}q("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,a.chart)};b.defaultOptions=t(f.defaultOptions,{marker:{enabled:!1},params:{index:void 0,period:void 0,volumeSeriesID:"volume"},tooltip:{valueDecimals:0}});return b}(f);r(b.prototype,{nameComponents:void 0});a.registerSeriesType("obv",b);"";return b});c(a,"masters/indicators/obv.src.js",[],function(){})});
//# sourceMappingURL=obv.js.map