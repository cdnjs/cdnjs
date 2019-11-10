/*
  Highcharts JS v6.1.4 (2018-09-25)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(a){var q=a.isArray;a.seriesType("rsi","sma",{params:{period:14,decimals:4}},{getValues:function(b,c){var a=c.period,l=b.xData,r=(b=b.yData)?b.length:0;c=c.decimals;var d=1,m=[],n=[],p=[],e=0,g=0,f,h,k;if(l.length<a||!q(b[0])||4!==b[0].length)return!1;for(;d<a;)f=parseFloat((b[d][3]-b[d-1][3]).toFixed(c)),0<f?e+=f:g+=Math.abs(f),
d++;h=parseFloat((e/(a-1)).toFixed(c));for(k=parseFloat((g/(a-1)).toFixed(c));d<r;d++)f=parseFloat((b[d][3]-b[d-1][3]).toFixed(c)),0<f?(e=f,g=0):(e=0,g=Math.abs(f)),h=parseFloat(((h*(a-1)+e)/a).toFixed(c)),k=parseFloat(((k*(a-1)+g)/a).toFixed(c)),e=0===k?100:0===h?0:parseFloat((100-100/(1+h/k)).toFixed(c)),m.push([l[d],e]),n.push(l[d]),p.push(e);return{values:m,xData:n,yData:p}}})})(a)});
//# sourceMappingURL=rsi.js.map
