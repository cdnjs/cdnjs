/*
 Highstock JS v9.1.0 (2021-05-03)

 Indicator series type for Highcharts Stock

 (c) 2010-2021 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/accumulation-distribution",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,c,e,k){a.hasOwnProperty(c)||(a[c]=k.apply(null,e))}a=a?a._modules:{};e(a,"Stock/Indicators/AD/ADIndicator.js",[a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],
function(a,c){var e=this&&this.__extends||function(){var a=function(f,b){a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d])};return a(f,b)};return function(f,b){function d(){this.constructor=f}a(f,b);f.prototype=null===b?Object.create(b):(d.prototype=b.prototype,new d)}}(),k=a.seriesTypes.sma,p=c.error,q=c.extend,r=c.merge;c=function(a){function f(){var b=null!==a&&a.apply(this,arguments)||this;b.data=
void 0;b.options=void 0;b.points=void 0;return b}e(f,a);f.populateAverage=function(a,d,f,c,g){g=d[c][1];var b=d[c][2];d=d[c][3];f=f[c];return[a[c],d===g&&d===b||g===b?0:(2*d-b-g)/(g-b)*f]};f.prototype.getValues=function(a,d){var b=d.period,c=a.xData,g=a.yData,e=d.volumeSeriesID,h=a.chart.get(e);d=h&&h.yData;var k=g?g.length:0,l=[],m=[],n=[];if(!(c.length<=b&&k&&4!==g[0].length)){if(h){for(e=b;e<k;e++)a=l.length,h=f.populateAverage(c,g,d,e,b),0<a&&(h[1]+=l[a-1][1]),l.push(h),m.push(h[0]),n.push(h[1]);
return{values:l,xData:m,yData:n}}p("Series "+e+" not found! Check `volumeSeriesID`.",!0,a.chart)}};f.defaultOptions=r(k.defaultOptions,{params:{index:void 0,volumeSeriesID:"volume"}});return f}(k);q(c.prototype,{nameComponents:!1,nameBase:"Accumulation/Distribution"});a.registerSeriesType("ad",c);"";return c});e(a,"masters/indicators/accumulation-distribution.src.js",[],function(){})});
//# sourceMappingURL=accumulation-distribution.js.map