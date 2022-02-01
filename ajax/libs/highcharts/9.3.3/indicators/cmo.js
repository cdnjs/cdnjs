/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawel Lysy

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cmo",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,h,g,m){a.hasOwnProperty(h)||(a[h]=m.apply(null,g))}a=a?a._modules:{};g(a,"Stock/Indicators/CMO/CMOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,h){var g=this&&this.__extends||function(){var a=function(e,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var d in a)a.hasOwnProperty(d)&&(b[d]=a[d])};return a(e,d)};return function(e,d){function b(){this.constructor=e}a(e,d);e.prototype=null===d?Object.create(d):(b.prototype=d.prototype,new b)}}(),m=a.seriesTypes.sma,p=h.isNumber,q=h.merge;h=function(a){function e(){var d=null!==a&&a.apply(this,arguments)||this;d.data=void 0;
d.options=void 0;d.points=void 0;return d}g(e,a);e.prototype.getValues=function(a,b){var d=b.period,e=a.xData,f=a.yData;a=f?f.length:0;var g=[],h=[],m=[],c,n=b.index;if(!(e.length<d)){p(f[0])?b=f:(n=Math.min(n,f[0].length-1),b=f.map(function(a){return a[n]}));var k=0,l=f=0;for(c=d;0<c;c--)b[c]>b[c-1]?f+=b[c]-b[c-1]:b[c]<b[c-1]&&(l+=b[c-1]-b[c]);k=0<f+l?100*(f-l)/(f+l):0;h.push(e[d]);m.push(k);g.push([e[d],k]);for(c=d+1;c<a;c++)k=Math.abs(b[c-d-1]-b[c-d]),b[c]>b[c-1]?f+=b[c]-b[c-1]:b[c]<b[c-1]&&(l+=
b[c-1]-b[c]),b[c-d]>b[c-d-1]?f-=k:l-=k,k=0<f+l?100*(f-l)/(f+l):0,h.push(e[c]),m.push(k),g.push([e[c],k]);return{values:g,xData:h,yData:m}}};e.defaultOptions=q(m.defaultOptions,{params:{period:20,index:3}});return e}(m);a.registerSeriesType("cmo",h);"";return h});g(a,"masters/indicators/cmo.src.js",[],function(){})});
//# sourceMappingURL=cmo.js.map