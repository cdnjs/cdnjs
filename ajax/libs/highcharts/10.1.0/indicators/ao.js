/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,l,h,g){a.hasOwnProperty(l)||(a[l]=g.apply(null,h),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:l,module:a[l]}})))}
a=a?a._modules:{};g(a,"Stock/Indicators/AO/AOIndicator.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,g,h){var l=this&&this.__extends||function(){var a=function(d,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])};return a(d,b)};return function(d,b){function m(){this.constructor=d}a(d,b);d.prototype=null===b?Object.create(b):(m.prototype=b.prototype,
new m)}}();a=a.noop;var e=g.seriesTypes,q=e.sma;e=e.column;var r=h.extend,t=h.merge,n=h.correctFloat,u=h.isArray;h=function(a){function d(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}l(d,a);d.prototype.drawGraph=function(){var a=this.options,m=this.points,d=a.greaterBarColor;a=a.lowerBarColor;var c=m[0];if(!this.userOptions.color&&c)for(c.color=d,c=1;c<m.length;c++)m[c].color=m[c].y>m[c-1].y?d:m[c].y<m[c-1].y?a:m[c-1].color};d.prototype.getValues=
function(a){var b=a.xData||[];a=a.yData||[];var d=a.length,c=[],g=[],h=[],e=0,p=0,f;if(!(34>=b.length)&&u(a[0])&&4===a[0].length){for(f=0;33>f;f++){var k=(a[f][1]+a[f][2])/2;29<=f&&(e=n(e+k));p=n(p+k)}for(f=33;f<d;f++){k=(a[f][1]+a[f][2])/2;e=n(e+k);p=n(p+k);k=e/5;var l=p/34;k=n(k-l);c.push([b[f],k]);g.push(b[f]);h.push(k);k=f+1-5;l=f+1-34;e=n(e-(a[k][1]+a[k][2])/2);p=n(p-(a[l][1]+a[l][2])/2)}return{values:c,xData:g,yData:h}}};d.defaultOptions=t(q.defaultOptions,{params:{index:void 0,period:void 0},
greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}});return d}(q);r(h.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:a,getColumnMetrics:e.prototype.getColumnMetrics,crispCol:e.prototype.crispCol,translate:e.prototype.translate,drawPoints:e.prototype.drawPoints});g.registerSeriesType("ao",h);"";return h});g(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map