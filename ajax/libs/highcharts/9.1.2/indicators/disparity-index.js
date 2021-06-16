/*
 Highstock JS v9.1.2 (2021-06-16)

 Indicator series type for Highstock

 (c) 2010-2021 Rafal Sebestjanski

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/disparity-index",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,f,b,k){a.hasOwnProperty(f)||(a[f]=k.apply(null,b))}a=a?a._modules:{};c(a,"Mixins/IndicatorRequired.js",[a["Core/Utilities.js"]],function(a){var f=a.error;
return{isParentLoaded:function(a,k,c,l,m){if(a)return l?l(a):!0;f(m||this.generateMessage(c,k));return!1},generateMessage:function(a,c){return'Error: "'+a+'" indicator type requires "'+c+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js",[a["Mixins/IndicatorRequired.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,c,b){var k=this&&this.__extends||function(){var a=
function(c,e){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,e){a.__proto__=e}||function(a,e){for(var d in e)e.hasOwnProperty(d)&&(a[d]=e[d])};return a(c,e)};return function(c,e){function d(){this.constructor=c}a(c,e);c.prototype=null===e?Object.create(e):(d.prototype=e.prototype,new d)}}(),f=c.seriesTypes.sma,l=b.correctFloat,m=b.defined,n=b.extend,q=b.isArray,r=b.merge;b=function(b){function g(){var a=null!==b&&b.apply(this,arguments)||this;a.averageIndicator=void 0;a.data=
void 0;a.options=void 0;a.points=void 0;return a}k(g,b);g.prototype.init=function(){var e=arguments,d=this,b=e[1].params;b=b&&b.average?b.average:void 0;d.averageIndicator=c.seriesTypes[b]||f;a.isParentLoaded(d.averageIndicator,b,d.type,function(a){a.prototype.init.apply(d,e)})};g.prototype.calculateDisparityIndex=function(a,d){return l(a-d)/d*100};g.prototype.getValues=function(a,d){var b=d.index,c=a.xData,e=a.yData,f=e?e.length:0,g=[],k=[],l=[],h=this.averageIndicator,n=q(e[0]);d=h.prototype.getValues(a,
d);a=d.yData;d=c.indexOf(d.xData[0]);if(a&&0!==a.length&&m(b)&&!(e.length<=d)){for(h=d;h<f;h++){var p=this.calculateDisparityIndex(n?e[h][b]:e[h],a[h-d]);g.push([c[h],p]);k.push(c[h]);l.push(p)}return{values:g,xData:k,yData:l}}};g.defaultOptions=r(f.defaultOptions,{params:{average:"sma",index:3},marker:{enabled:!1},dataGrouping:{approximation:"averages"}});return g}(f);n(b.prototype,{nameBase:"Disparity Index",nameComponents:["period","average"]});c.registerSeriesType("disparityindex",b);"";return b});
c(a,"masters/indicators/disparity-index.src.js",[],function(){})});
//# sourceMappingURL=disparity-index.js.map