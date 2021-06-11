/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Karol Kolodziej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/obv",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/OBV/OBVIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,
b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),f=a.seriesTypes.sma,p=b.isNumber,q=b.error,r=b.extend,t=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=
void 0;c.points=void 0;c.options=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=a.chart.get(b.volumeSeriesID),d=a.xData,g=a.yData,f=[],k=[],l=[],n=!p(g[0]),e=1,h=0;if(c){c=c.yData;a=[d[0],h];var m=n?g[0][3]:g[0];f.push(a);k.push(d[0]);l.push(a[1]);for(e;e<g.length;e++)b=n?g[e][3]:g[e],h=b>m?h+c[e]:b===m?h:h-c[e],a=[d[e],h],m=b,f.push(a),k.push(d[e]),l.push(a[1]);return{values:f,xData:k,yData:l}}q("Series "+b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,a.chart)};b.defaultOptions=
t(f.defaultOptions,{marker:{enabled:!1},params:{index:void 0,period:void 0,volumeSeriesID:"volume"},tooltip:{valueDecimals:0}});return b}(f);r(b.prototype,{nameComponents:void 0});a.registerSeriesType("obv",b);"";return b});d(a,"masters/indicators/obv.src.js",[],function(){})});
//# sourceMappingURL=obv.js.map