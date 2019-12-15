/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/williams-r",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,k,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,k))}a=a?a._modules:{};c(a,"mixins/reduce-array.js",[a["parts/Globals.js"]],function(a){var b=a.reduce;return{minInArray:function(a,
d){return b(a,function(a,g){return Math.min(a,g[d])},Number.MAX_VALUE)},maxInArray:function(a,d){return b(a,function(a,g){return Math.max(a,g[d])},-Number.MAX_VALUE)},getArrayExtremes:function(a,d,c){return b(a,function(a,b){return[Math.min(a[0],b[d]),Math.max(a[1],b[c])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});c(a,"indicators/williams-r.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/reduce-array.js"]],function(a,b,c){var d=b.isArray,k=c.getArrayExtremes;a.seriesType("williamsr",
"sma",{params:{period:14}},{nameBase:"Williams %R",getValues:function(a,b){b=b.period;var c=a.xData,g=(a=a.yData)?a.length:0,l=[],m=[],n=[],e;if(c.length<b||!d(a[0])||4!==a[0].length)return!1;for(e=b-1;e<g;e++){var f=a.slice(e-b+1,e+1);var h=k(f,2,1);f=h[0];h=h[1];var p=a[e][3];f=(h-p)/(h-f)*-100;c[e]&&(l.push([c[e],f]),m.push(c[e]),n.push(f))}return{values:l,xData:m,yData:n}}})});c(a,"masters/indicators/williams-r.src.js",[],function(){})});
//# sourceMappingURL=williams-r.js.map