/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var l=function(a){var c=a.reduce;return{minInArray:function(a,d){return c(a,function(h,a){return Math.min(h,a[d])},Number.MAX_VALUE)},maxInArray:function(a,d){return c(a,function(a,e){return Math.max(a,e[d])},-Number.MAX_VALUE)},getArrayExtremes:function(a,d,h){return c(a,function(a,
f){return[Math.min(a[0],f[d]),Math.max(a[1],f[h])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}}(a);(function(a,c){var l=a.isArray,d=c.getArrayExtremes;a.seriesType("williamsr","sma",{params:{period:14}},{nameBase:"Williams %R",getValues:function(a,e){e=e.period;var f=a.xData,c=(a=a.yData)?a.length:0,h=[],m=[],n=[],g,k,p,b;if(f.length<e||!l(a[0])||4!==a[0].length)return!1;for(b=e-1;b<c;b++)g=a.slice(b-e+1,b+1),k=d(g,2,1),g=k[0],k=k[1],p=a[b][3],g=(k-p)/(k-g)*-100,f[b]&&(h.push([f[b],g]),m.push(f[b]),
n.push(g));return{values:h,xData:m,yData:n}}})})(a,l)});
//# sourceMappingURL=williams-r.js.map