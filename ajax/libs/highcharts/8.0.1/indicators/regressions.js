/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Kamil Kulig

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/regressions",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,b,g){a.hasOwnProperty(c)||(a[c]=g.apply(null,b))}a=a?a._modules:{};c(a,"indicators/regressions.src.js",[a["parts/Utilities.js"]],function(a){var c=a.isArray;a=a.seriesType;
a("linearRegression","sma",{params:{xAxisUnit:void 0},tooltip:{valueDecimals:4}},{nameBase:"Linear Regression Indicator",getRegressionLineParameters:function(b,a){var g=this.options.params.index,d=function(b,a){return c(b)?b[a]:b},h=b.reduce(function(b,a){return a+b},0),m=a.reduce(function(b,a){return d(a,g)+b},0);h/=b.length;m/=a.length;var e=0,f=0,k;for(k=0;k<b.length;k++){var l=b[k]-h;var n=d(a[k],g)-m;e+=l*n;f+=Math.pow(l,2)}b=f?e/f:0;return{slope:b,intercept:m-b*h}},getEndPointY:function(b,a){return b.slope*
a+b.intercept},transformXData:function(b,a){var g=b[0];return b.map(function(b){return(b-g)/a})},findClosestDistance:function(b){var a,c;for(c=1;c<b.length-1;c++){var d=b[c]-b[c-1];0<d&&("undefined"===typeof a||d<a)&&(a=d)}return a},getValues:function(a,c){var b=a.xData;a=a.yData;c=c.period;var d,h={xData:[],yData:[],values:[]},g=this.options.params.xAxisUnit||this.findClosestDistance(b);for(d=c-1;d<=b.length-1;d++){var e=d-c+1;var f=d+1;var k=b[d];var l=b.slice(e,f);e=a.slice(e,f);f=this.transformXData(l,
g);l=this.getRegressionLineParameters(f,e);e=this.getEndPointY(l,f[f.length-1]);h.values.push({regressionLineParameters:l,x:k,y:e});h.xData.push(k);h.yData.push(e)}return h}});a("linearRegressionSlope","linearRegression",{},{nameBase:"Linear Regression Slope Indicator",getEndPointY:function(a){return a.slope}});a("linearRegressionIntercept","linearRegression",{},{nameBase:"Linear Regression Intercept Indicator",getEndPointY:function(a){return a.intercept}});a("linearRegressionAngle","linearRegression",
{tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span>{series.name}: <b>{point.y}\u00b0</b><br/>'}},{nameBase:"Linear Regression Angle Indicator",slopeToAngle:function(a){return 180/Math.PI*Math.atan(a)},getEndPointY:function(a){return this.slopeToAngle(a.slope)}});""});c(a,"masters/indicators/regressions.src.js",[],function(){})});
//# sourceMappingURL=regressions.js.map