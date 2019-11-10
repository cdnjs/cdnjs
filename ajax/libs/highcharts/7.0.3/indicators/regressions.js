/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Kamil Kulig

 License: www.highcharts.com/license
*/
(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define(function(){return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){(function(c){var h=c.seriesType,p=c.isArray;h("linearRegression","sma",{params:{xAxisUnit:void 0},tooltip:{valueDecimals:4}},{nameBase:"Linear Regression Indicator",getRegressionLineParameters:function(a,b){var d=this.options.params.index,e=function(a,b){return p(a)?a[b]:a},n=a.reduce(function(a,
b){return b+a},0),f=b.reduce(function(a,b){return e(b,d)+a},0),n=n/a.length,f=f/b.length,g,c,k=0,l=0,m;for(m=0;m<a.length;m++)g=a[m]-n,c=e(b[m],d)-f,k+=g*c,l+=Math.pow(g,2);a=l?k/l:0;return{slope:a,intercept:f-a*n}},getEndPointY:function(a,b){return a.slope*b+a.intercept},transformXData:function(a,b){var d=a[0];return a.map(function(a){return(a-d)/b})},findClosestDistance:function(a){var b,d,e;for(e=1;e<a.length-1;e++)b=a[e]-a[e-1],0<b&&(void 0===d||b<d)&&(d=b);return d},getValues:function(a,b){var d=
a.xData;a=a.yData;b=b.period;var e,c,f,g,h={xData:[],yData:[],values:[]},k,l=this.options.params.xAxisUnit||this.findClosestDistance(d);for(c=b-1;c<=d.length-1;c++)f=c-b+1,g=c+1,k=d[c],e=d.slice(f,g),f=a.slice(f,g),g=this.transformXData(e,l),e=this.getRegressionLineParameters(g,f),f=this.getEndPointY(e,g[g.length-1]),h.values.push({regressionLineParameters:e,x:k,y:f}),h.xData.push(k),h.yData.push(f);return h}});h("linearRegressionSlope","linearRegression",{},{nameBase:"Linear Regression Slope Indicator",
getEndPointY:function(a){return a.slope}});h("linearRegressionIntercept","linearRegression",{},{nameBase:"Linear Regression Intercept Indicator",getEndPointY:function(a){return a.intercept}});h("linearRegressionAngle","linearRegression",{tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e{series.name}: \x3cb\x3e{point.y}\u00b0\x3c/b\x3e\x3cbr/\x3e'}},{nameBase:"Linear Regression Angle Indicator",slopeToAngle:function(a){return 180/Math.PI*Math.atan(a)},getEndPointY:function(a){return this.slopeToAngle(a.slope)}})})(c)});
//# sourceMappingURL=regressions.js.map