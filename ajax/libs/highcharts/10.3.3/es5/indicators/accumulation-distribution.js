/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,k){a.hasOwnProperty(b)||(a[b]=k.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,
module:a[b]}})))}a=a?a._modules:{};d(a,"Stock/Indicators/AD/ADIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)Object.prototype.hasOwnProperty.call(c,e)&&(a[e]=c[e])};return a(b,c)};return function(b,c){function e(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(e.prototype=c.prototype,new e)}}(),k=a.seriesTypes.sma,p=b.error,q=b.extend,r=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.populateAverage=function(a,b,d,h,f){f=b[h][1];var c=b[h][2];b=b[h][3];d=d[h];return[a[h],b===f&&b===c||f===c?0:(2*b-c-f)/(f-c)*d]};b.prototype.getValues=function(a,d){var c=d.period,h=a.xData,
f=a.yData,e=d.volumeSeriesID,g=a.chart.get(e);d=g&&g.yData;var k=f?f.length:0,l=[],m=[],n=[];if(!(h.length<=c&&k&&4!==f[0].length)){if(g){for(e=c;e<k;e++)a=l.length,g=b.populateAverage(h,f,d,e,c),0<a&&(g[1]+=l[a-1][1]),l.push(g),m.push(g[0]),n.push(g[1]);return{values:l,xData:m,yData:n}}p("Series "+e+" not found! Check `volumeSeriesID`.",!0,a.chart)}};b.defaultOptions=r(k.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});return b}(k);q(b.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"});
a.registerSeriesType("ad",b);"";return b});d(a,"masters/indicators/accumulation-distribution.src.js",[],function(){})});
//# sourceMappingURL=accumulation-distribution.js.map