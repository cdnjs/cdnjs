/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Pawel Lysy

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cmo",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,b,g,l){a.hasOwnProperty(b)||(a[b]=l.apply(null,g),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};g(a,"Stock/Indicators/CMO/CMOIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var g=this&&this.__extends||function(){var a=function(b,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(c[e]=a[e])};return a(b,e)};return function(b,e){function c(){this.constructor=b}if("function"!==typeof e&&null!==e)throw new TypeError("Class extends value "+
String(e)+" is not a constructor or null");a(b,e);b.prototype=null===e?Object.create(e):(c.prototype=e.prototype,new c)}}(),l=a.seriesTypes.sma,p=b.isNumber,q=b.merge;b=function(a){function b(){var e=null!==a&&a.apply(this,arguments)||this;e.data=void 0;e.options=void 0;e.points=void 0;return e}g(b,a);b.prototype.getValues=function(a,c){var b=c.period,e=a.xData,f=a.yData;a=f?f.length:0;var g=[],l=[],m=[],d,n=c.index;if(!(e.length<b)){p(f[0])?c=f:(n=Math.min(n,f[0].length-1),c=f.map(function(a){return a[n]}));
var h=0,k=f=0;for(d=b;0<d;d--)c[d]>c[d-1]?f+=c[d]-c[d-1]:c[d]<c[d-1]&&(k+=c[d-1]-c[d]);h=0<f+k?100*(f-k)/(f+k):0;l.push(e[b]);m.push(h);g.push([e[b],h]);for(d=b+1;d<a;d++)h=Math.abs(c[d-b-1]-c[d-b]),c[d]>c[d-1]?f+=c[d]-c[d-1]:c[d]<c[d-1]&&(k+=c[d-1]-c[d]),c[d-b]>c[d-b-1]?f-=h:k-=h,h=0<f+k?100*(f-k)/(f+k):0,l.push(e[d]),m.push(h),g.push([e[d],h]);return{values:g,xData:l,yData:m}}};b.defaultOptions=q(l.defaultOptions,{params:{period:20,index:3}});return b}(l);a.registerSeriesType("cmo",b);"";return b});
g(a,"masters/indicators/cmo.src.js",[],function(){})});
//# sourceMappingURL=cmo.js.map