/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Kamil Kulig

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/regressions",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,c,l,b){a.hasOwnProperty(c)||(a[c]=b.apply(null,l))}a=a?a._modules:{};c(a,"indicators/regressions.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,c){var l=
c.isArray;a=a.seriesType;a("linearRegression","sma",{params:{xAxisUnit:void 0},tooltip:{valueDecimals:4}},{nameBase:"Linear Regression Indicator",getRegressionLineParameters:function(b,a){var d=this.options.params.index,g=function(b,a){return l(b)?b[a]:b},n=b.reduce(function(b,a){return a+b},0),c=a.reduce(function(b,a){return g(a,d)+b},0);n/=b.length;c/=a.length;var e=0,f=0,h;for(h=0;h<b.length;h++){var k=b[h]-n;var p=g(a[h],d)-c;e+=k*p;f+=Math.pow(k,2)}b=f?e/f:0;return{slope:b,intercept:c-b*n}},
getEndPointY:function(b,a){return b.slope*a+b.intercept},transformXData:function(b,a){var d=b[0];return b.map(function(b){return(b-d)/a})},findClosestDistance:function(b){var a,d;for(d=1;d<b.length-1;d++){var c=b[d]-b[d-1];0<c&&(void 0===a||c<a)&&(a=c)}return a},getValues:function(a,c){var b=a.xData;a=a.yData;c=c.period;var g,m={xData:[],yData:[],values:[]},l=this.options.params.xAxisUnit||this.findClosestDistance(b);for(g=c-1;g<=b.length-1;g++){var e=g-c+1;var f=g+1;var h=b[g];var k=b.slice(e,f);
e=a.slice(e,f);f=this.transformXData(k,l);k=this.getRegressionLineParameters(f,e);e=this.getEndPointY(k,f[f.length-1]);m.values.push({regressionLineParameters:k,x:h,y:e});m.xData.push(h);m.yData.push(e)}return m}});a("linearRegressionSlope","linearRegression",{},{nameBase:"Linear Regression Slope Indicator",getEndPointY:function(a){return a.slope}});a("linearRegressionIntercept","linearRegression",{},{nameBase:"Linear Regression Intercept Indicator",getEndPointY:function(a){return a.intercept}});
a("linearRegressionAngle","linearRegression",{tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span>{series.name}: <b>{point.y}\u00b0</b><br/>'}},{nameBase:"Linear Regression Angle Indicator",slopeToAngle:function(a){return 180/Math.PI*Math.atan(a)},getEndPointY:function(a){return this.slopeToAngle(a.slope)}})});c(a,"masters/indicators/regressions.src.js",[],function(){})});
//# sourceMappingURL=regressions.js.map