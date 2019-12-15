/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,n,b,p){a.hasOwnProperty(n)||(a[n]=p.apply(null,b))}a=a?a._modules:{};b(a,"indicators/dpo.src.js",[a["parts/Globals.js"]],function(a){function b(a,c,b,k,l){c=p(c[b][k],c[b]);return l?
g(a-c):g(a+c)}var g=a.correctFloat,p=a.pick;a.seriesType("dpo","sma",{params:{period:21}},{nameBase:"DPO",getValues:function(a,c){var h=c.period;c=c.index;var k=h+Math.floor(h/2+1),l=a.xData||[];a=a.yData||[];var n=a.length,g=[],q=[],r=[],e=0,d,f;if(l.length<=k)return!1;for(d=0;d<h-1;d++)e=b(e,a,d,c);for(f=0;f<=n-k;f++){var m=f+h-1;d=f+k-1;e=b(e,a,m,c);m=p(a[d][c],a[d]);m-=e/h;e=b(e,a,f,c,!0);g.push([l[d],m]);q.push(l[d]);r.push(m)}return{values:g,xData:q,yData:r}}})});b(a,"masters/indicators/dpo.src.js",
[],function(){})});
//# sourceMappingURL=dpo.js.map