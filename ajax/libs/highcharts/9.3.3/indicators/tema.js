/*
 Highstock JS v9.3.3 (2022-02-01)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,h,f,l){a.hasOwnProperty(h)||(a[h]=l.apply(null,f))}a=a?a._modules:{};f(a,"Stock/Indicators/TEMA/TEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,h){var f=this&&this.__extends||function(){var a=function(b,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,c){a.__proto__=c}||function(a,c){for(var e in c)c.hasOwnProperty(e)&&(a[e]=c[e])};return a(b,e)};return function(b,e){function k(){this.constructor=b}a(b,e);b.prototype=null===e?Object.create(e):(k.prototype=e.prototype,new k)}}(),l=a.seriesTypes.ema,q=h.correctFloat,y=h.isArray,z=h.merge;h=function(a){function b(){var e=null!==a&&a.apply(this,arguments)||this;
e.EMApercent=void 0;e.data=void 0;e.options=void 0;e.points=void 0;return e}f(b,a);b.prototype.getEMA=function(a,k,c,b,f,h){return l.prototype.calculateEma(h||[],a,"undefined"===typeof f?1:f,this.EMApercent,k,"undefined"===typeof b?-1:b,c)};b.prototype.getTemaPoint=function(a,k,c,b){return[a[b-3],q(3*c.level1-3*c.level2+c.level3)]};b.prototype.getValues=function(a,b){var c=b.period,e=2*c,f=3*c,h=a.xData,k=(a=a.yData)?a.length:0,r=-1,u=[],v=[],w=[],n=[],t=[],g,p,d={};this.EMApercent=2/(c+1);if(!(k<
3*c-2)){y(a[0])&&(r=b.index?b.index:0);b=l.prototype.accumulatePeriodPoints(c,r,a);var m=b/c;b=0;for(g=c;g<k+3;g++){g<k+1&&(d.level1=this.getEMA(a,q,m,r,g)[1],n.push(d.level1));var q=d.level1;if(g<e)b+=d.level1;else{g===e&&(m=b/c,b=0);d.level1=n[g-c-1];d.level2=this.getEMA([d.level1],x,m)[1];t.push(d.level2);var x=d.level2;if(g<f)b+=d.level2;else{g===f&&(m=b/c);g===k+1&&(d.level1=n[g-c-1],d.level2=this.getEMA([d.level1],x,m)[1],t.push(d.level2));d.level1=n[g-c-2];d.level2=t[g-2*c-1];d.level3=this.getEMA([d.level2],
d.prevLevel3,m)[1];if(p=this.getTemaPoint(h,f,d,g))u.push(p),v.push(p[0]),w.push(p[1]);d.prevLevel3=d.level3}}}return{values:u,xData:v,yData:w}}};b.defaultOptions=z(l.defaultOptions);return b}(l);a.registerSeriesType("tema",h);"";return h});f(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map