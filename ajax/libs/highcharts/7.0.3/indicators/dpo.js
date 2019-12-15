/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(a){function n(m,b,a,h,k){b=p(b[a][h],b[a]);return k?l(m-b):l(m+b)}var l=a.correctFloat,p=a.pick;a.seriesType("dpo","sma",{params:{period:21}},{nameBase:"DPO",getValues:function(a,b){var g=b.period;b=b.index;var h=g+Math.floor(g/2+1),k=a.xData||[];a=a.yData||[];var m=a.length,
l=[],q=[],r=[],d=0,e,c,f;if(k.length<=h)return!1;for(c=0;c<g-1;c++)d=n(d,a,c,b);for(f=0;f<=m-h;f++)e=f+g-1,c=f+h-1,d=n(d,a,e,b),e=p(a[c][b],a[c]),e-=d/g,d=n(d,a,f,b,!0),l.push([k[c],e]),q.push(k[c]),r.push(e);return{values:l,xData:q,yData:r}}})})(a)});
//# sourceMappingURL=dpo.js.map