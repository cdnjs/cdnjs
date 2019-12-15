/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,m,b){a.hasOwnProperty(c)||(a[c]=b.apply(null,m))}a=a?a._modules:{};c(a,"indicators/rsi.src.js",[a["parts/Globals.js"]],function(a){var c=a.isArray;a.seriesType("rsi","sma",
{params:{period:14,decimals:4}},{getValues:function(a,b){var e=b.period,n=a.xData,m=(a=a.yData)?a.length:0;b=b.decimals;var d=1,p=[],q=[],r=[],f=0,h=0,g,k,l;if(n.length<e||!c(a[0])||4!==a[0].length)return!1;for(;d<e;)g=parseFloat((a[d][3]-a[d-1][3]).toFixed(b)),0<g?f+=g:h+=Math.abs(g),d++;k=parseFloat((f/(e-1)).toFixed(b));for(l=parseFloat((h/(e-1)).toFixed(b));d<m;d++)g=parseFloat((a[d][3]-a[d-1][3]).toFixed(b)),0<g?(f=g,h=0):(f=0,h=Math.abs(g)),k=parseFloat(((k*(e-1)+f)/e).toFixed(b)),l=parseFloat(((l*
(e-1)+h)/e).toFixed(b)),f=0===l?100:0===k?0:parseFloat((100-100/(1+k/l)).toFixed(b)),p.push([n[d],f]),q.push(n[d]),r.push(f);return{values:p,xData:q,yData:r}}})});c(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map