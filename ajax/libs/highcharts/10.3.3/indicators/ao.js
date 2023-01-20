/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,k,g,f){a.hasOwnProperty(k)||(a[k]=f.apply(null,g),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:k,module:a[k]}})))}
a=a?a._modules:{};f(a,"Stock/Indicators/AO/AOIndicator.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,f,g){var k=this&&this.__extends||function(){var a=function(d,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])};return a(d,b)};return function(d,b){function l(){this.constructor=d}a(d,b);d.prototype=null===b?Object.create(b):(l.prototype=b.prototype,
new l)}}();a=a.noop;var q=f.seriesTypes,r=q.column.prototype,t=q.sma;q=g.extend;var u=g.merge,m=g.correctFloat,v=g.isArray;g=function(a){function d(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}k(d,a);d.prototype.drawGraph=function(){var a=this.options,l=this.points,d=a.greaterBarColor;a=a.lowerBarColor;var c=l[0];if(!this.userOptions.color&&c)for(c.color=d,c=1;c<l.length;c++)l[c].color=l[c].y>l[c-1].y?d:l[c].y<l[c-1].y?a:l[c-1].color};d.prototype.getValues=
function(a){var b=a.xData||[];a=a.yData||[];var d=a.length,c=[],f=[],g=[],n=0,p=0,e;if(!(34>=b.length)&&v(a[0])&&4===a[0].length){for(e=0;33>e;e++){var h=(a[e][1]+a[e][2])/2;29<=e&&(n=m(n+h));p=m(p+h)}for(e=33;e<d;e++){h=(a[e][1]+a[e][2])/2;n=m(n+h);p=m(p+h);h=n/5;var k=p/34;h=m(h-k);c.push([b[e],h]);f.push(b[e]);g.push(h);h=e+1-5;k=e+1-34;n=m(n-(a[h][1]+a[h][2])/2);p=m(p-(a[k][1]+a[k][2])/2)}return{values:c,xData:f,yData:g}}};d.defaultOptions=u(t.defaultOptions,{params:{index:void 0,period:void 0},
greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}});return d}(t);q(g.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:a,getColumnMetrics:r.getColumnMetrics,crispCol:r.crispCol,translate:r.translate,drawPoints:r.drawPoints});f.registerSeriesType("ao",g);"";return g});f(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map