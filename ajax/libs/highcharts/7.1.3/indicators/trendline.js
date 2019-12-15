/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,k,l){a.hasOwnProperty(c)||(a[c]=l.apply(null,k))}a=a?a._modules:{};c(a,"indicators/trendline.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,c){var k=
c.isArray;a=a.seriesType;a("trendline","sma",{params:{index:3}},{nameBase:"Trendline",nameComponents:!1,getValues:function(a,b){var c=a.xData,d=a.yData;a=[];var n=[],p=[],f=0,m=0,q=0,r=0,g=c.length,l=b.index;for(b=0;b<g;b++){var e=c[b];var h=k(d[b])?d[b][l]:d[b];f+=e;m+=h;q+=e*h;r+=e*e}d=(g*q-f*m)/(g*r-f*f);isNaN(d)&&(d=0);f=(m-d*f)/g;for(b=0;b<g;b++)e=c[b],h=d*e+f,a[b]=[e,h],n[b]=e,p[b]=h;return{xData:n,yData:p,values:a}}})});c(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map