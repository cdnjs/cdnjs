/*
 Highstock JS v11.0.1 (2023-05-08)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(g){a(g);a.Highcharts=g;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function g(a,f,g,k){a.hasOwnProperty(f)||(a[f]=k.apply(null,g),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,
module:a[f]}})))}a=a?a._modules:{};g(a,"Stock/Indicators/TEMA/TEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,f){var g=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d])};return a(b,c)};return function(b,c){function l(){this.constructor=b}if("function"!==typeof c&&null!==c)throw new TypeError("Class extends value "+
String(c)+" is not a constructor or null");a(b,c);b.prototype=null===c?Object.create(c):(l.prototype=c.prototype,new l)}}(),k=a.seriesTypes.ema,q=f.correctFloat,y=f.isArray,z=f.merge;f=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.EMApercent=void 0;c.data=void 0;c.options=void 0;c.points=void 0;return c}g(b,a);b.prototype.getEMA=function(c,l,d,b,f,g){return a.prototype.calculateEma.call(this,g||[],c,"undefined"===typeof f?1:f,this.EMApercent,l,"undefined"===typeof b?-1:
b,d)};b.prototype.getTemaPoint=function(a,l,d,b){return[a[b-3],q(3*d.level1-3*d.level2+d.level3)]};b.prototype.getValues=function(c,b){var d=b.period,f=2*d,g=3*d,l=c.xData,k=(c=c.yData)?c.length:0,u=[],v=[],w=[],n=[],r=[],e={},t=-1,h,p;this.EMApercent=2/(d+1);if(!(k<3*d-2)){y(c[0])&&(t=b.index?b.index:0);b=a.prototype.accumulatePeriodPoints.call(this,d,t,c);var m=b/d;b=0;for(h=d;h<k+3;h++){h<k+1&&(e.level1=this.getEMA(c,q,m,t,h)[1],n.push(e.level1));var q=e.level1;if(h<f)b+=e.level1;else{h===f&&(m=
b/d,b=0);e.level1=n[h-d-1];e.level2=this.getEMA([e.level1],x,m)[1];r.push(e.level2);var x=e.level2;if(h<g)b+=e.level2;else{h===g&&(m=b/d);h===k+1&&(e.level1=n[h-d-1],e.level2=this.getEMA([e.level1],x,m)[1],r.push(e.level2));e.level1=n[h-d-2];e.level2=r[h-2*d-1];e.level3=this.getEMA([e.level2],e.prevLevel3,m)[1];if(p=this.getTemaPoint(l,g,e,h))u.push(p),v.push(p[0]),w.push(p[1]);e.prevLevel3=e.level3}}}return{values:u,xData:v,yData:w}}};b.defaultOptions=z(k.defaultOptions);return b}(k);a.registerSeriesType("tema",
f);"";return f});g(a,"masters/indicators/tema.src.js",[],function(){})});
//# sourceMappingURL=tema.js.map