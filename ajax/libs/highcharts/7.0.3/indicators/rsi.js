/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){var q=a.isArray;a.seriesType("rsi","sma",{params:{period:14,decimals:4}},{getValues:function(a,b){var d=b.period,l=a.xData,r=(a=a.yData)?a.length:0;b=b.decimals;var c=1,m=[],n=[],p=[],e=0,g=0,f,h,k;if(l.length<d||!q(a[0])||4!==a[0].length)return!1;for(;c<d;)f=parseFloat((a[c][3]-
a[c-1][3]).toFixed(b)),0<f?e+=f:g+=Math.abs(f),c++;h=parseFloat((e/(d-1)).toFixed(b));for(k=parseFloat((g/(d-1)).toFixed(b));c<r;c++)f=parseFloat((a[c][3]-a[c-1][3]).toFixed(b)),0<f?(e=f,g=0):(e=0,g=Math.abs(f)),h=parseFloat(((h*(d-1)+e)/d).toFixed(b)),k=parseFloat(((k*(d-1)+g)/d).toFixed(b)),e=0===k?100:0===h?0:parseFloat((100-100/(1+h/k)).toFixed(b)),m.push([l[c],e]),n.push(l[c]),p.push(e);return{values:m,xData:n,yData:p}}})})(a)});
//# sourceMappingURL=rsi.js.map