/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/dpo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,f))}a=a?a._modules:{};b(a,"indicators/dpo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function f(a,c,
b,f,k){c=m(c[b][f],c[b]);return k?e(a-c):e(a+c)}var e=b.correctFloat,m=b.pick;a.seriesType("dpo","sma",{params:{period:21}},{nameBase:"DPO",getValues:function(a,b){var c=b.period;b=b.index;var e=c+Math.floor(c/2+1),k=a.xData||[];a=a.yData||[];var r=a.length,n=[],p=[],q=[],g=0,d,h;if(!(k.length<=e)){for(d=0;d<c-1;d++)g=f(g,a,d,b);for(h=0;h<=r-e;h++){var l=h+c-1;d=h+e-1;g=f(g,a,l,b);l=m(a[d][b],a[d]);l-=g/c;g=f(g,a,h,b,!0);n.push([k[d],l]);p.push(k[d]);q.push(l)}return{values:n,xData:p,yData:q}}}});
""});b(a,"masters/indicators/dpo.src.js",[],function(){})});
//# sourceMappingURL=dpo.js.map