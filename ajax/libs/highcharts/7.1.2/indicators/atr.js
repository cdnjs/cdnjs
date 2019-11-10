/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,k,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,k))}a=a?a._modules:{};b(a,"indicators/atr.src.js",[a["parts/Globals.js"]],function(a){function b(a,b){return Math.max(a[1]-a[2],
b===e?0:Math.abs(a[1]-b[3]),b===e?0:Math.abs(a[2]-b[3]))}var k=a.isArray;a=a.seriesType;var e;a("atr","sma",{params:{period:14}},{getValues:function(a,f){f=f.period;var g=a.xData,e=(a=a.yData)?a.length:0,l=1,h=0,q=0,m=[],n=[],p=[],d,c,r;r=[[g[0],a[0]]];if(g.length<=f||!k(a[0])||4!==a[0].length)return!1;for(c=1;c<=e;c++)if(r.push([g[c],a[c]]),f<l){d=f;var t=g[c-1],u=b(a[c-1],a[c-2]);d=[t,(h*(d-1)+u)/d];h=d[1];m.push(d);n.push(d[0]);p.push(d[1])}else f===l?(h=q/(c-1),m.push([g[c-1],h]),n.push(g[c-1]),
p.push(h)):q+=b(a[c-1],a[c-2]),l++;return{values:m,xData:n,yData:p}}})});b(a,"masters/indicators/atr.src.js",[],function(){})});
//# sourceMappingURL=atr.js.map