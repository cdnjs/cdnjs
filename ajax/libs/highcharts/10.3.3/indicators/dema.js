/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafa Sebestjaski

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/indicators/dema",["highcharts","highcharts/modules/stock"],function(d){b(d);b.Highcharts=d;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function d(b,a,d,e){b.hasOwnProperty(a)||(b[a]=e.apply(null,d),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:a,module:b[a]}})))}
b=b?b._modules:{};d(b,"Stock/Indicators/DEMA/DEMAIndicator.js",[b["Core/Series/SeriesRegistry.js"],b["Core/Utilities.js"]],function(b,a){var d=this&&this.__extends||function(){var b=function(a,c){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,c){b.__proto__=c}||function(b,c){for(var a in c)c.hasOwnProperty(a)&&(b[a]=c[a])};return b(a,c)};return function(a,c){function k(){this.constructor=a}b(a,c);a.prototype=null===c?Object.create(c):(k.prototype=c.prototype,new k)}}(),e=b.seriesTypes.ema,
x=a.correctFloat,y=a.isArray,l=a.merge;a=function(b){function a(){var c=null!==b&&b.apply(this,arguments)||this;c.EMApercent=void 0;c.data=void 0;c.options=void 0;c.points=void 0;return c}d(a,b);a.prototype.getEMA=function(c,a,w,d,h,e){return b.prototype.calculateEma.call(this,e||[],c,"undefined"===typeof h?1:h,this.EMApercent,a,"undefined"===typeof d?-1:d,w)};a.prototype.getValues=function(a,d){var c=d.period,e=[],h=2*c,k=a.xData,m=(a=a.yData)?a.length:0,r=[],t=[],u=[],g=0,f,n=-1;this.EMApercent=
2/(c+1);if(!(m<2*c-1)){y(a[0])&&(n=d.index?d.index:0);d=b.prototype.accumulatePeriodPoints.call(this,c,n,a);var p=d/c;d=0;for(f=c;f<m+2;f++){f<m+1&&(g=this.getEMA(a,l,p,n,f)[1],e.push(g));var l=g;if(f<h)d+=g;else{f===h&&(p=d/c);g=e[f-c-1];var v=this.getEMA([g],v,p)[1];var q=[k[f-2],x(2*g-v)];r.push(q);t.push(q[0]);u.push(q[1])}}return{values:r,xData:t,yData:u}}};a.defaultOptions=l(e.defaultOptions);return a}(e);b.registerSeriesType("dema",a);"";return a});d(b,"masters/indicators/dema.src.js",[],function(){})});
//# sourceMappingURL=dema.js.map