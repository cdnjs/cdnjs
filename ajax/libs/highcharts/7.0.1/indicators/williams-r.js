/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var l=function(a){var d=a.reduce;return{minInArray:function(a,e){return d(a,function(c,f){return Math.min(c,f[e])},Number.MAX_VALUE)},maxInArray:function(a,e){return d(a,function(c,a){return Math.max(c,a[e])},-Number.MAX_VALUE)},getArrayExtremes:function(a,e,c){return d(a,function(a,g){return[Math.min(a[0],
g[e]),Math.max(a[1],g[c])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}}(a);(function(a,d){var l=a.isArray,e=d.getArrayExtremes;a.seriesType("williamsr","sma",{params:{period:14}},{nameBase:"Williams %R",getValues:function(a,f){f=f.period;var g=a.xData,d=(a=a.yData)?a.length:0,c=[],m=[],n=[],h,k,p,b;if(g.length<f||!l(a[0])||4!==a[0].length)return!1;for(b=f-1;b<d;b++)h=a.slice(b-f+1,b+1),k=e(h,2,1),h=k[0],k=k[1],p=a[b][3],h=(k-p)/(k-h)*-100,g[b]&&(c.push([g[b],h]),m.push(g[b]),n.push(h));return{values:c,
xData:m,yData:n}}})})(a,l)});
//# sourceMappingURL=williams-r.js.map