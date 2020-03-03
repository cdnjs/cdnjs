/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/momentum",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,k,p){a.hasOwnProperty(b)||(a[b]=p.apply(null,k))}a=a?a._modules:{};b(a,"indicators/momentum.src.js",[a["parts/Utilities.js"]],function(a){function b(a,b,c,g,d){c=c[g-1][3]-
c[g-d-1][3];b=b[g-1];a.shift();return[b,c]}var k=a.isArray;a=a.seriesType;a("momentum","sma",{params:{period:14}},{nameBase:"Momentum",getValues:function(a,f){f=f.period;var c=a.xData,g=(a=a.yData)?a.length:0,d=c[0],l=[],m=[],n=[];if(!(c.length<=f)&&k(a[0])){var h=a[0][3];h=[[d,h]];for(d=f+1;d<g;d++){var e=b(h,c,a,d,f,void 0);l.push(e);m.push(e[0]);n.push(e[1])}e=b(h,c,a,d,f,void 0);l.push(e);m.push(e[0]);n.push(e[1]);return{values:l,xData:m,yData:n}}}});""});b(a,"masters/indicators/momentum.src.js",
[],function(){})});
//# sourceMappingURL=momentum.js.map