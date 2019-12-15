/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,h,p){a.hasOwnProperty(b)||(a[b]=p.apply(null,h))}a=a?a._modules:{};b(a,"indicators/momentum.src.js",[a["parts/Globals.js"]],function(a){function b(a,b,c,g,d){c=c[g-1][3]-
c[g-d-1][3];b=b[g-1];a.shift();return[b,c]}var h=a.isArray;a=a.seriesType;a("momentum","sma",{params:{period:14}},{nameBase:"Momentum",getValues:function(a,f){f=f.period;var c=a.xData,g=(a=a.yData)?a.length:0,d=c[0],k=[],l=[],m=[],n,e;if(c.length<=f||!h(a[0]))return!1;n=[[d,a[0][3]]];for(d=f+1;d<g;d++)e=b(n,c,a,d,f,void 0),k.push(e),l.push(e[0]),m.push(e[1]);e=b(n,c,a,d,f,void 0);k.push(e);l.push(e[0]);m.push(e[1]);return{values:k,xData:l,yData:m}}})});b(a,"masters/indicators/momentum.src.js",[],
function(){})});
//# sourceMappingURL=momentum.js.map