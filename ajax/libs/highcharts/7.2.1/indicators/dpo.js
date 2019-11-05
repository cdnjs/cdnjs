/*
 Highstock JS v7.2.1 (2019-10-31)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,l){a.hasOwnProperty(b)||(a[b]=l.apply(null,e))}a=a?a._modules:{};b(a,"indicators/dpo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function e(a,c,
b,e,h){c=l(c[b][e],c[b]);return h?m(a-c):m(a+c)}var l=b.pick,m=a.correctFloat;a.seriesType("dpo","sma",{params:{period:21}},{nameBase:"DPO",getValues:function(a,b){var c=b.period;b=b.index;var n=c+Math.floor(c/2+1),h=a.xData||[];a=a.yData||[];var m=a.length,p=[],q=[],r=[],f=0,d,g;if(h.length<=n)return!1;for(d=0;d<c-1;d++)f=e(f,a,d,b);for(g=0;g<=m-n;g++){var k=g+c-1;d=g+n-1;f=e(f,a,k,b);k=l(a[d][b],a[d]);k-=f/c;f=e(f,a,g,b,!0);p.push([h[d],k]);q.push(h[d]);r.push(k)}return{values:p,xData:q,yData:r}}});
""});b(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map