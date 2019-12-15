/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,b,q,c){a.hasOwnProperty(b)||(a[b]=c.apply(null,q))}a=a?a._modules:{};e(a,"mixins/reduce-array.js",[a["parts/Globals.js"]],function(a){var b=a.reduce;return{minInArray:function(a,
c){return b(a,function(a,h){return Math.min(a,h[c])},Number.MAX_VALUE)},maxInArray:function(a,c){return b(a,function(a,h){return Math.max(a,h[c])},-Number.MAX_VALUE)},getArrayExtremes:function(a,c,r){return b(a,function(a,b){return[Math.min(a[0],b[c]),Math.max(a[1],b[r])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});e(a,"indicators/williams-r.src.js",[a["parts/Globals.js"],a["mixins/reduce-array.js"]],function(a,b){var e=a.isArray,c=b.getArrayExtremes;a.seriesType("williamsr","sma",{params:{period:14}},
{nameBase:"Williams %R",getValues:function(a,b){b=b.period;var k=a.xData,h=(a=a.yData)?a.length:0,l=[],m=[],n=[],f,g,p,d;if(k.length<b||!e(a[0])||4!==a[0].length)return!1;for(d=b-1;d<h;d++)f=a.slice(d-b+1,d+1),g=c(f,2,1),f=g[0],g=g[1],p=a[d][3],f=(g-p)/(g-f)*-100,k[d]&&(l.push([k[d],f]),m.push(k[d]),n.push(f));return{values:l,xData:m,yData:n}}})});e(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map