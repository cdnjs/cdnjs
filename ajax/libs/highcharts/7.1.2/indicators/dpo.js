/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,n,b,p){a.hasOwnProperty(n)||(a[n]=p.apply(null,b))}a=a?a._modules:{};b(a,"indicators/dpo.src.js",[a["parts/Globals.js"]],function(a){function b(a,c,b,l,m){c=p(c[b][l],c[b]);return m?
h(a-c):h(a+c)}var h=a.correctFloat,p=a.pick;a.seriesType("dpo","sma",{params:{period:21}},{nameBase:"DPO",getValues:function(a,c){var k=c.period;c=c.index;var l=k+Math.floor(k/2+1),m=a.xData||[];a=a.yData||[];var n=a.length,h=[],q=[],r=[],e=0,f,d,g;if(m.length<=l)return!1;for(d=0;d<k-1;d++)e=b(e,a,d,c);for(g=0;g<=n-l;g++)f=g+k-1,d=g+l-1,e=b(e,a,f,c),f=p(a[d][c],a[d]),f-=e/k,e=b(e,a,g,c,!0),h.push([m[d],f]),q.push(m[d]),r.push(f);return{values:h,xData:q,yData:r}}})});b(a,"masters/indicators/dpo.src.js",
[],function(){})});
//# sourceMappingURL=dpo.js.map