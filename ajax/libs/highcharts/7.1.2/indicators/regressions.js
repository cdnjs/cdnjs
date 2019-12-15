/*
  Highcharts JS v7.1.2 (2019-06-03)

 Indicator series type for Highstock

 (c) 2010-2019 Kamil Kulig

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/regressions",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,p,c,b){a.hasOwnProperty(p)||(a[p]=b.apply(null,c))}a=a?a._modules:{};c(a,"indicators/regressions.src.js",[a["parts/Globals.js"]],function(a){var c=a.seriesType,r=a.isArray;
c("linearRegression","sma",{params:{xAxisUnit:void 0},tooltip:{valueDecimals:4}},{nameBase:"Linear Regression Indicator",getRegressionLineParameters:function(b,a){var q=this.options.params.index,d=function(b,a){return r(b)?b[a]:b},n=b.reduce(function(b,a){return a+b},0),e=a.reduce(function(b,a){return d(a,q)+b},0),n=n/b.length,e=e/a.length,c,g,k=0,l=0,m;for(m=0;m<b.length;m++)c=b[m]-n,g=d(a[m],q)-e,k+=c*g,l+=Math.pow(c,2);b=l?k/l:0;return{slope:b,intercept:e-b*n}},getEndPointY:function(b,a){return b.slope*
a+b.intercept},transformXData:function(b,a){var c=b[0];return b.map(function(b){return(b-c)/a})},findClosestDistance:function(b){var a,c,d;for(d=1;d<b.length-1;d++)a=b[d]-b[d-1],0<a&&(void 0===c||a<c)&&(c=a);return c},getValues:function(b,a){var c=b.xData;b=b.yData;a=a.period;var d,h,e,f,g={xData:[],yData:[],values:[]},k,l=this.options.params.xAxisUnit||this.findClosestDistance(c);for(h=a-1;h<=c.length-1;h++)e=h-a+1,f=h+1,k=c[h],d=c.slice(e,f),e=b.slice(e,f),f=this.transformXData(d,l),d=this.getRegressionLineParameters(f,
e),e=this.getEndPointY(d,f[f.length-1]),g.values.push({regressionLineParameters:d,x:k,y:e}),g.xData.push(k),g.yData.push(e);return g}});c("linearRegressionSlope","linearRegression",{},{nameBase:"Linear Regression Slope Indicator",getEndPointY:function(a){return a.slope}});c("linearRegressionIntercept","linearRegression",{},{nameBase:"Linear Regression Intercept Indicator",getEndPointY:function(a){return a.intercept}});c("linearRegressionAngle","linearRegression",{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e{series.name}: \x3cb\x3e{point.y}\u00b0\x3c/b\x3e\x3cbr/\x3e'}},
{nameBase:"Linear Regression Angle Indicator",slopeToAngle:function(a){return 180/Math.PI*Math.atan(a)},getEndPointY:function(a){return this.slopeToAngle(a.slope)}})});c(a,"masters/indicators/regressions.src.js",[],function(){})});
//# sourceMappingURL=regressions.js.map