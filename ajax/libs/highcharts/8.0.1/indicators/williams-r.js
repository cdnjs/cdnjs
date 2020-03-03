/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,b,l,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,l))}a=a?a._modules:{};e(a,"mixins/reduce-array.js",[a["parts/Globals.js"]],function(a){var b=a.reduce;return{minInArray:function(a,
c){return b(a,function(a,g){return Math.min(a,g[c])},Number.MAX_VALUE)},maxInArray:function(a,c){return b(a,function(a,g){return Math.max(a,g[c])},-Number.MAX_VALUE)},getArrayExtremes:function(a,c,q){return b(a,function(a,b){return[Math.min(a[0],b[c]),Math.max(a[1],b[q])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});e(a,"indicators/williams-r.src.js",[a["parts/Utilities.js"],a["mixins/reduce-array.js"]],function(a,b){var e=a.isArray;a=a.seriesType;var c=b.getArrayExtremes;a("williamsr","sma",{params:{period:14}},
{nameBase:"Williams %R",getValues:function(a,b){b=b.period;var k=a.xData,g=(a=a.yData)?a.length:0,m=[],n=[],p=[],d;if(!(k.length<b)&&e(a[0])&&4===a[0].length){for(d=b-1;d<g;d++){var f=a.slice(d-b+1,d+1);var h=c(f,2,1);f=h[0];h=h[1];var l=a[d][3];f=(h-l)/(h-f)*-100;k[d]&&(m.push([k[d],f]),n.push(k[d]),p.push(f))}return{values:m,xData:n,yData:p}}}});""});e(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map