/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/atr",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,g,k){a.hasOwnProperty(b)||(a[b]=k.apply(null,g))}a=a?a._modules:{};b(a,"indicators/atr.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){function g(a,d){return Math.max(a[1]-
a[2],d===h?0:Math.abs(a[1]-d[3]),d===h?0:Math.abs(a[2]-d[3]))}var k=b.isArray;a=a.seriesType;var h;a("atr","sma",{params:{period:14}},{getValues:function(a,d){d=d.period;var b=a.xData,h=(a=a.yData)?a.length:0,l=1,f=0,q=0,m=[],n=[],p=[],c;var r=[[b[0],a[0]]];if(b.length<=d||!k(a[0])||4!==a[0].length)return!1;for(c=1;c<=h;c++)if(r.push([b[c],a[c]]),d<l){var e=d;var t=b[c-1],u=g(a[c-1],a[c-2]);e=[t,(f*(e-1)+u)/e];f=e[1];m.push(e);n.push(e[0]);p.push(e[1])}else d===l?(f=q/(c-1),m.push([b[c-1],f]),n.push(b[c-
1]),p.push(f)):q+=g(a[c-1],a[c-2]),l++;return{values:m,xData:n,yData:p}}})});b(a,"masters/indicators/atr.src.js",[],function(){})});
//# sourceMappingURL=atr.js.map