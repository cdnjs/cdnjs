/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/trendline",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,k,b){a.hasOwnProperty(c)||(a[c]=b.apply(null,k))}a=a?a._modules:{};c(a,"indicators/trendline.src.js",[a["parts/Utilities.js"]],function(a){var c=a.isArray;a=a.seriesType;
a("trendline","sma",{params:{index:3}},{nameBase:"Trendline",nameComponents:!1,getValues:function(a,b){var l=a.xData,d=a.yData;a=[];var n=[],p=[],f=0,m=0,q=0,r=0,g=l.length,k=b.index;for(b=0;b<g;b++){var e=l[b];var h=c(d[b])?d[b][k]:d[b];f+=e;m+=h;q+=e*h;r+=e*e}d=(g*q-f*m)/(g*r-f*f);isNaN(d)&&(d=0);f=(m-d*f)/g;for(b=0;b<g;b++)e=l[b],h=d*e+f,a[b]=[e,h],n[b]=e,p[b]=h;return{xData:n,yData:p,values:a}}});""});c(a,"masters/indicators/trendline.src.js",[],function(){})});
//# sourceMappingURL=trendline.js.map