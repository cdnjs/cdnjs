/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/rsi",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,l,m){a.hasOwnProperty(b)||(a[b]=m.apply(null,l))}a=a?a._modules:{};b(a,"indicators/rsi.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var l=b.isArray;
a.seriesType("rsi","sma",{params:{period:14,decimals:4}},{getValues:function(a,b){var d=b.period,n=a.xData,m=(a=a.yData)?a.length:0;b=b.decimals;var c=1,p=[],q=[],r=[],e=0,g=0,h;if(n.length<d||!l(a[0])||4!==a[0].length)return!1;for(;c<d;){var f=parseFloat((a[c][3]-a[c-1][3]).toFixed(b));0<f?e+=f:g+=Math.abs(f);c++}var k=parseFloat((e/(d-1)).toFixed(b));for(h=parseFloat((g/(d-1)).toFixed(b));c<m;c++)f=parseFloat((a[c][3]-a[c-1][3]).toFixed(b)),0<f?(e=f,g=0):(e=0,g=Math.abs(f)),k=parseFloat(((k*(d-
1)+e)/d).toFixed(b)),h=parseFloat(((h*(d-1)+g)/d).toFixed(b)),e=0===h?100:0===k?0:parseFloat((100-100/(1+k/h)).toFixed(b)),p.push([n[c],e]),q.push(n[c]),r.push(e);return{values:p,xData:q,yData:r}}})});b(a,"masters/indicators/rsi.src.js",[],function(){})});
//# sourceMappingURL=rsi.js.map