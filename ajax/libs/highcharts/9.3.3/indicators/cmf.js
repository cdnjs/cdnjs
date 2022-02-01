/*
 Highstock JS v9.3.3 (2022-02-01)

 (c) 2010-2021 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/cmf",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,h,b,f){a.hasOwnProperty(h)||(a[h]=f.apply(null,b))}a=a?a._modules:{};b(a,"Stock/Indicators/CMF/CMFIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,b){var h=this&&this.__extends||function(){var a=function(b,c){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(c,a){c.__proto__=a}||function(c,a){for(var b in a)a.hasOwnProperty(b)&&(c[b]=a[b])};return a(b,c)};return function(b,c){function t(){this.constructor=b}a(b,c);b.prototype=null===c?Object.create(c):(t.prototype=c.prototype,new t)}}(),f=a.seriesTypes.sma,u=b.merge;b=function(a){function b(){var c=null!==a&&a.apply(this,arguments)||this;c.data=void 0;c.options=void 0;
c.points=void 0;c.volumeSeries=void 0;c.linkedParent=void 0;c.yData=void 0;c.nameBase="Chaikin Money Flow";return c}h(b,a);b.prototype.isValid=function(){var a=this.chart,b=this.options,e=this.linkedParent;a=this.volumeSeries||(this.volumeSeries=a.get(b.params.volumeSeriesID));var g=e&&e.yData&&4===e.yData[0].length;return!!(e&&a&&e.xData&&e.xData.length>=b.params.period&&a.xData&&a.xData.length>=b.params.period&&g)};b.prototype.getValues=function(a,b){if(this.isValid())return this.getMoneyFlow(a.xData,
a.yData,this.volumeSeries.yData,b.period)};b.prototype.getMoneyFlow=function(a,b,e,g){function c(a,b){var c=a[1],e=a[2];a=a[3];return null!==b&&null!==c&&null!==e&&null!==a&&c!==e?(a-e-(c-a))/(c-e)*b:(q=d,null)}var h=b.length,l=[],k=0,m=0,f=[],n=[],r=[],d,q=-1;if(0<g&&g<=h){for(d=0;d<g;d++)l[d]=c(b[d],e[d]),k+=e[d],m+=l[d];f.push(a[d-1]);n.push(d-q>=g&&0!==k?m/k:null);for(r.push([f[0],n[0]]);d<h;d++){l[d]=c(b[d],e[d]);k-=e[d-g];k+=e[d];m-=l[d-g];m+=l[d];var p=[a[d],d-q>=g?m/k:null];f.push(p[0]);n.push(p[1]);
r.push([p[0],p[1]])}}return{values:r,xData:f,yData:n}};b.defaultOptions=u(f.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});return b}(f);a.registerSeriesType("cmf",b);"";return b});b(a,"masters/indicators/cmf.src.js",[],function(){})});
//# sourceMappingURL=cmf.js.map