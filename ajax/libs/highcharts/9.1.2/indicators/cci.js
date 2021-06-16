/*
 Highstock JS v9.1.2 (2021-06-16)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cci",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,e,g,k){a.hasOwnProperty(e)||(a[e]=k.apply(null,g))}a=a?a._modules:{};g(a,"Stock/Indicators/CCI/CCIIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,e){function g(a){return a.reduce(function(a,b){return a+b},0)}var k=this&&this.__extends||function(){var a=function(f,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};return a(f,b)};return function(f,b){function c(){this.constructor=f}a(f,b);f.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}}(),l=a.seriesTypes.sma,u=e.isArray,q=e.merge;e=function(a){function f(){var b=
null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.points=void 0;b.options=void 0;return b}k(f,a);f.prototype.getValues=function(a,c){c=c.period;var b=a.xData,f=(a=a.yData)?a.length:0,e=[],h=1,k=[],l=[],r=[];if(!(b.length<=c)&&u(a[0])&&4===a[0].length){for(;h<c;){var d=a[h-1];e.push((d[1]+d[2]+d[3])/3);h++}for(h=c;h<=f;h++){d=a[h-1];d=(d[1]+d[2]+d[3])/3;var n=e.push(d);var m=e.slice(n-c);n=g(m)/c;var p,q=m.length,t=0;for(p=0;p<q;p++)t+=Math.abs(n-m[p]);m=t/c;d=(d-n)/(.015*m);k.push([b[h-1],d]);
l.push(b[h-1]);r.push(d)}return{values:k,xData:l,yData:r}}};f.defaultOptions=q(l.defaultOptions,{params:{index:void 0}});return f}(l);a.registerSeriesType("cci",e);"";return e});g(a,"masters/indicators/cci.src.js",[],function(){})});
//# sourceMappingURL=cci.js.map