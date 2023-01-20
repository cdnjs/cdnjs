/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/vwap",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,f){a.hasOwnProperty(b)||(a[b]=f.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/VWAP/VWAPIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)Object.prototype.hasOwnProperty.call(c,b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function d(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(d.prototype=c.prototype,new d)}}(),f=a.seriesTypes.sma,m=b.error,u=b.isArray,v=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.points=void 0;c.options=void 0;return c}d(b,a);b.prototype.getValues=function(a,b){var c=a.chart,d=a.xData;a=a.yData;var f=b.period,n=!0,g;if(g=c.get(b.volumeSeriesID))return u(a[0])||(n=!1),this.calculateVWAPValues(n,d,a,g,f);m("Series "+
b.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,c)};b.prototype.calculateVWAPValues=function(a,b,d,f,m){var c=f.yData,g=f.xData.length,e=b.length;f=[];var p=[],q=[],r=[],l=[],h;g=e<=g?e:g;for(h=e=0;e<g;e++){var k=a?(d[e][1]+d[e][2]+d[e][3])/3:d[e];k*=c[e];k=h?f[e-1]+k:k;var t=h?p[e-1]+c[e]:c[e];f.push(k);p.push(t);l.push([b[e],k/t]);q.push(l[e][0]);r.push(l[e][1]);h++;h===m&&(h=0)}return{values:l,xData:q,yData:r}};b.defaultOptions=v(f.defaultOptions,{params:{index:void 0,period:30,volumeSeriesID:"volume"}});
return b}(f);a.registerSeriesType("vwap",b);"";return b});d(a,"masters/indicators/vwap.src.js",[],function(){})});
//# sourceMappingURL=vwap.js.map