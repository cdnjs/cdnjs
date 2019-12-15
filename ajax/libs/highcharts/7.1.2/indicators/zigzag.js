/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Kacper Madej

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/zigzag",["highcharts","highcharts/modules/stock"],function(h){a(h);a.Highcharts=h;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function h(a,m,k,e){a.hasOwnProperty(m)||(a[m]=e.apply(null,k))}a=a?a._modules:{};h(a,"indicators/zigzag.src.js",[a["parts/Globals.js"]],function(a){a=a.seriesType;a("zigzag","sma",{params:{lowIndex:2,
highIndex:1,deviation:1}},{nameComponents:["deviation"],nameSuffixes:["%"],nameBase:"Zig Zag",getValues:function(a,k){var e=k.lowIndex,l=k.highIndex,f=k.deviation/100;k=1+f;var h=1-f,f=a.xData,c=a.yData;a=c?c.length:0;var g=[],q=[],r=[],b,m,d,t,u,n,v=!1,p=!1;if(1>=f.length||a&&(void 0===c[0][e]||void 0===c[0][l]))return!1;t=c[0][e];u=c[0][l];for(b=1;b<a;b++)c[b][e]<=u*h?(g.push([f[0],u]),d=[f[b],c[b][e]],v=n=!0):c[b][l]>=t*k&&(g.push([f[0],t]),d=[f[b],c[b][l]],n=!1,v=!0),v&&(q.push(g[0][0]),r.push(g[0][1]),
m=b++,b=a);for(b=m;b<a;b++)n?(c[b][e]<=d[1]&&(d=[f[b],c[b][e]]),c[b][l]>=d[1]*k&&(p=l)):(c[b][l]>=d[1]&&(d=[f[b],c[b][l]]),c[b][e]<=d[1]*h&&(p=e)),!1!==p&&(g.push(d),q.push(d[0]),r.push(d[1]),d=[f[b],c[b][p]],n=!n,p=!1);e=g.length;0!==e&&g[e-1][0]<f[a-1]&&(g.push(d),q.push(d[0]),r.push(d[1]));return{values:g,xData:q,yData:r}}})});h(a,"masters/indicators/zigzag.src.js",[],function(){})});
//# sourceMappingURL=zigzag.js.map