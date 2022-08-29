/*
 Highstock JS v10.2.1 (2022-08-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ao",["highcharts","highcharts/modules/stock"],function(k){a(k);a.Highcharts=k;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function k(a,d,g,k){a.hasOwnProperty(d)||(a[d]=k.apply(null,g),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,module:a[d]}})))}
a=a?a._modules:{};k(a,"Stock/Indicators/AO/AOIndicator.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d,g){var k=this&&this.__extends||function(){var a=function(e,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,a){b.__proto__=a}||function(b,a){for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c])};return a(e,b)};return function(e,b){function l(){this.constructor=e}a(e,b);e.prototype=null===b?Object.create(b):(l.prototype=b.prototype,
new l)}}();a=a.noop;var q=d.seriesTypes.sma,m=d.seriesTypes.column.prototype,r=g.extend,t=g.merge,n=g.correctFloat,u=g.isArray;g=function(a){function e(){var b=null!==a&&a.apply(this,arguments)||this;b.data=void 0;b.options=void 0;b.points=void 0;return b}k(e,a);e.prototype.drawGraph=function(){var a=this.options,l=this.points,e=a.greaterBarColor;a=a.lowerBarColor;var c=l[0];if(!this.userOptions.color&&c)for(c.color=e,c=1;c<l.length;c++)l[c].color=l[c].y>l[c-1].y?e:l[c].y<l[c-1].y?a:l[c-1].color};
e.prototype.getValues=function(a){var b=a.xData||[];a=a.yData||[];var e=a.length,c=[],g=[],k=[],d=0,p=0,f;if(!(34>=b.length)&&u(a[0])&&4===a[0].length){for(f=0;33>f;f++){var h=(a[f][1]+a[f][2])/2;29<=f&&(d=n(d+h));p=n(p+h)}for(f=33;f<e;f++){h=(a[f][1]+a[f][2])/2;d=n(d+h);p=n(p+h);h=d/5;var m=p/34;h=n(h-m);c.push([b[f],h]);g.push(b[f]);k.push(h);h=f+1-5;m=f+1-34;d=n(d-(a[h][1]+a[h][2])/2);p=n(p-(a[m][1]+a[m][2])/2)}return{values:c,xData:g,yData:k}}};e.defaultOptions=t(q.defaultOptions,{params:{index:void 0,
period:void 0},greaterBarColor:"#06b535",lowerBarColor:"#f21313",threshold:0,groupPadding:.2,pointPadding:.2,crisp:!1,states:{hover:{halo:{size:0}}}});return e}(q);r(g.prototype,{nameBase:"AO",nameComponents:!1,markerAttribs:a,getColumnMetrics:m.getColumnMetrics,crispCol:m.crispCol,translate:m.translate,drawPoints:m.drawPoints});d.registerSeriesType("ao",g);"";return g});k(a,"masters/indicators/ao.src.js",[],function(){})});
//# sourceMappingURL=ao.js.map