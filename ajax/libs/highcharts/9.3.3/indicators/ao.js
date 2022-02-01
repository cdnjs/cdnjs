/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,p){a.hasOwnProperty(b)||(a[b]=p.apply(null,e))}a=a?a._modules:{};b(a,"Stock/Indicators/AO/AOIndicator.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],
a["Core/Utilities.js"]],function(a,b,e){var p=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,a){d.__proto__=a}||function(d,a){for(var c in a)a.hasOwnProperty(c)&&(d[c]=a[c])};return a(b,d)};return function(b,d){function q(){this.constructor=b}a(b,d);b.prototype=null===d?Object.create(d):(q.prototype=d.prototype,new q)}}();a=a.noop;var h=b.seriesTypes,r=h.sma;h=h.column;var t=e.extend,u=e.merge,k=e.correctFloat,v=e.isArray;e=
function(a){function b(){var d=null!==a&&a.apply(this,arguments)||this;d.data=void 0;d.options=void 0;d.points=void 0;return d}p(b,a);b.prototype.drawGraph=function(){var a=this.options,b=this.points,e=a.greaterBarColor;a=a.lowerBarColor;var c=b[0];if(!this.userOptions.color&&c)for(c.color=e,c=1;c<b.length;c++)b[c].color=b[c].y>b[c-1].y?e:b[c].y<b[c-1].y?a:b[c-1].color};b.prototype.getValues=function(a){var b=a.xData||[];a=a.yData||[];var d=a.length,c=[],e=[],h=[],l=0,m=0,f;if(!(34>=b.length)&&v(a[0])&&
4===a[0].length){for(f=0;33>f;f++){var g=(a[f][1]+a[f][2])/2;29<=f&&(l=k(l+g));m=k(m+g)}for(f=33;f<d;f++){g=(a[f][1]+a[f][2])/2;l=k(l+g);m=k(m+g);g=l/5;var n=m/34;g=k(g-n);c.push([b[f],g]);e.push(b[f]);h.push(g);g=f+1-5;n=f+1-34;l=k(l-(a[g][1]+a[g][2])/2);m=k(m-(a[n][1]+a[n][2])/2)}return{values:c,xData:e,yData:h}}};b.defaultOptions=u(r.defaultOptions,{params:{index:void 0,period:void 0},greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}});
return b}(r);t(e.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:a,getColumnMetrics:h.prototype.getColumnMetrics,crispCol:h.prototype.crispCol,translate:h.prototype.translate,drawPoints:h.prototype.drawPoints});b.registerSeriesType("ao",e);"";return e});b(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map