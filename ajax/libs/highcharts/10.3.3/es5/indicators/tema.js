/*
 Highstock JS v10.3.3 (2023-01-20)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/tema",["highcharts","highcharts/modules/stock"],function(h){a(h);a.Highcharts=h;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function h(a,f,h,l){a.hasOwnProperty(f)||(a[f]=l.apply(null,h),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:f,module:a[f]}})))}
a=a?a._modules:{};h(a,"Stock/Indicators/TEMA/TEMAIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,f){var h=this&&this.__extends||function(){var a=function(b,d){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,a){d.__proto__=a}||function(d,a){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(d[c]=a[c])};return a(b,d)};return function(b,d){function k(){this.constructor=b}if("function"!==typeof d&&null!==d)throw new TypeError("Class extends value "+
String(d)+" is not a constructor or null");a(b,d);b.prototype=null===d?Object.create(d):(k.prototype=d.prototype,new k)}}(),l=a.seriesTypes.ema,q=f.correctFloat,y=f.isArray,z=f.merge;f=function(a){function b(){var d=null!==a&&a.apply(this,arguments)||this;d.EMApercent=void 0;d.data=void 0;d.options=void 0;d.points=void 0;return d}h(b,a);b.prototype.getEMA=function(a,k,c,b,f,h){return l.prototype.calculateEma(h||[],a,"undefined"===typeof f?1:f,this.EMApercent,k,"undefined"===typeof b?-1:b,c)};b.prototype.getTemaPoint=
function(a,k,c,b){return[a[b-3],q(3*c.level1-3*c.level2+c.level3)]};b.prototype.getValues=function(a,b){var c=b.period,d=2*c,f=3*c,h=a.xData,k=(a=a.yData)?a.length:0,r=-1,u=[],v=[],w=[],n=[],t=[],g,p,e={};this.EMApercent=2/(c+1);if(!(k<3*c-2)){y(a[0])&&(r=b.index?b.index:0);b=l.prototype.accumulatePeriodPoints(c,r,a);var m=b/c;b=0;for(g=c;g<k+3;g++){g<k+1&&(e.level1=this.getEMA(a,q,m,r,g)[1],n.push(e.level1));var q=e.level1;if(g<d)b+=e.level1;else{g===d&&(m=b/c,b=0);e.level1=n[g-c-1];e.level2=this.getEMA([e.level1],
x,m)[1];t.push(e.level2);var x=e.level2;if(g<f)b+=e.level2;else{g===f&&(m=b/c);g===k+1&&(e.level1=n[g-c-1],e.level2=this.getEMA([e.level1],x,m)[1],t.push(e.level2));e.level1=n[g-c-2];e.level2=t[g-2*c-1];e.level3=this.getEMA([e.level2],e.prevLevel3,m)[1];if(p=this.getTemaPoint(h,f,e,g))u.push(p),v.push(p[0]),w.push(p[1]);e.prevLevel3=e.level3}}}return{values:u,xData:v,yData:w}}};b.defaultOptions=z(l.defaultOptions);return b}(l);a.registerSeriesType("tema",f);"";return f});h(a,"masters/indicators/tema.src.js",
[],function(){})});
//# sourceMappingURL=tema.js.map