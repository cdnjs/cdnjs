/*
 Highstock JS v10.1.0 (2022-04-29)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,d,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:b,module:a[b]}})))}
a=a?a._modules:{};d(a,"Stock/Indicators/DEMA/DEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,b){var d=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var b in c)c.hasOwnProperty(b)&&(a[b]=c[b])};return a(b,c)};return function(b,c){function h(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(h.prototype=c.prototype,new h)}}(),g=a.seriesTypes.ema,
x=b.correctFloat,y=b.isArray,m=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.EMApercent=void 0;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(b,a);b.prototype.getEMA=function(a,b,w,d,l,k){return g.prototype.calculateEma(k||[],a,"undefined"===typeof l?1:l,this.EMApercent,b,"undefined"===typeof d?-1:d,w)};b.prototype.getValues=function(a,b){var c=b.period,d=2*c,l=a.xData,k=(a=a.yData)?a.length:0,n=-1,h=[],r=[],t=[],f=0,u=[],e;this.EMApercent=2/(c+1);if(!(k<
2*c-1)){y(a[0])&&(n=b.index?b.index:0);b=g.prototype.accumulatePeriodPoints(c,n,a);var p=b/c;b=0;for(e=c;e<k+2;e++){e<k+1&&(f=this.getEMA(a,m,p,n,e)[1],u.push(f));var m=f;if(e<d)b+=f;else{e===d&&(p=b/c);f=u[e-c-1];var v=this.getEMA([f],v,p)[1];var q=[l[e-2],x(2*f-v)];h.push(q);r.push(q[0]);t.push(q[1])}}return{values:h,xData:r,yData:t}}};b.defaultOptions=m(g.defaultOptions);return b}(g);a.registerSeriesType("dema",b);"";return b});d(a,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map