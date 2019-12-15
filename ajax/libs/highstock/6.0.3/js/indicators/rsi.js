/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){var q=a.isArray;a.seriesType("rsi","sma",{name:"RSI (14)",params:{period:14,decimals:4}},{getValues:function(b,c){var e=c.period,a=b.xData,r=(b=b.yData)?b.length:0;c=c.decimals;var d=1,m=[],n=[],p=[],f=0,h=0,g,k,l;if(a.length<e||!q(b[0])||4!==b[0].length)return!1;for(;d<e;)g=parseFloat((b[d][3]-b[d-1][3]).toFixed(c)),0<g?f+=g:h+=Math.abs(g),d++;k=parseFloat((f/(e-1)).toFixed(c));for(l=parseFloat((h/
(e-1)).toFixed(c));d<r;d++)g=parseFloat((b[d][3]-b[d-1][3]).toFixed(c)),0<g?(f=g,h=0):(f=0,h=Math.abs(g)),k=parseFloat(((k*(e-1)+f)/e).toFixed(c)),l=parseFloat(((l*(e-1)+h)/e).toFixed(c)),f=0===l?100:0===k?0:parseFloat((100-100/(1+k/l)).toFixed(c)),m.push([a[d],f]),n.push(a[d]),p.push(f);return{values:m,xData:n,yData:p}}})})(a)});
