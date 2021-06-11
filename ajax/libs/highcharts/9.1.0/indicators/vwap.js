/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,e,d,h){a.hasOwnProperty(e)||(a[e]=h.apply(null,d))}a=a?a._modules:{};d(a,"Stock/Indicators/VWAP/VWAPIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,e){var d=this&&this.__extends||function(){var a=function(c,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(c,b)};return function(c,b){function d(){this.constructor=c}a(c,b);c.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),h=a.seriesTypes.sma,u=e.error,v=e.isArray,w=e.merge;e=function(a){function c(){var b=null!==a&&a.apply(this,arguments)||this;b.data=
void 0;b.points=void 0;b.options=void 0;return b}d(c,a);c.prototype.getValues=function(a,c){var b=a.chart,d=a.xData;a=a.yData;var e=c.period,n=!0,g;if(g=b.get(c.volumeSeriesID))return v(a[0])||(n=!1),this.calculateVWAPValues(n,d,a,g,e);u("Series "+c.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,b)};c.prototype.calculateVWAPValues=function(a,c,d,e,h){var b=e.yData,g=e.xData.length,f=c.length;e=[];var p=[],q=[],r=[],m=[],k;g=f<=g?f:g;for(k=f=0;f<g;f++){var l=a?(d[f][1]+d[f][2]+d[f][3])/3:
d[f];l*=b[f];l=k?e[f-1]+l:l;var t=k?p[f-1]+b[f]:b[f];e.push(l);p.push(t);m.push([c[f],l/t]);q.push(m[f][0]);r.push(m[f][1]);k++;k===h&&(k=0)}return{values:m,xData:q,yData:r}};c.defaultOptions=w(h.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}});return c}(h);a.registerSeriesType("vwap",e);"";return e});d(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map