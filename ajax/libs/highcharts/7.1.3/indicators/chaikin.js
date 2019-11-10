/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,g,e,l){a.hasOwnProperty(g)||(a[g]=l.apply(null,e))}a=a?a._modules:{};c(a,"indicators/accumulation-distribution.src.js",[a["parts/Globals.js"]],function(a){var g=a.seriesType;
g("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(e,l){var f=l.period,g=e.xData,h=e.yData,b=l.volumeSeriesID,d=e.chart.get(b);l=d&&d.yData;var c=h?h.length:0,p=[],m=[],n=[];if(g.length<=f&&c&&4!==h[0].length)return!1;if(!d)return a.error("Series "+b+" not found! Check `volumeSeriesID`.",!0,e.chart);for(;f<c;f++){e=p.length;b=h[f][1];d=h[f][2];var k=h[f][3],q=l[f];b=[g[f],k===b&&k===d||b===d?0:(2*k-d-b)/(b-d)*q];0<e&&(b[1]+=p[e-
1][1]);p.push(b);m.push(b[0]);n.push(b[1])}return{values:p,xData:m,yData:n}}})});c(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var g=a.error;return{isParentLoaded:function(a,l,f,c,h){if(a)return c?c(a):!0;g(h||this.generateMessage(f,l));return!1},generateMessage:function(a,c){return'Error: "'+a+'" indicator type requires "'+c+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"indicators/chaikin.src.js",[a["parts/Globals.js"],
a["mixins/indicator-required.js"]],function(a,c){var e=a.seriesTypes.ema,l=a.seriesTypes.ad,f=a.error,g=a.correctFloat;a.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,b=this;c.isParentLoaded(e,"ema",b.type,function(d){d.prototype.init.apply(b,a)})},getValues:function(a,b){var d=b.periods,c=b.period,h=[],m=[],n=[],k;if(2!==d.length||d[1]<=d[0])return f('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."'),
!1;b=l.prototype.getValues.call(this,a,{volumeSeriesID:b.volumeSeriesID,period:c});if(!b)return!1;a=e.prototype.getValues.call(this,b,{period:d[0]});b=e.prototype.getValues.call(this,b,{period:d[1]});if(!a||!b)return!1;d=d[1]-d[0];for(k=0;k<b.yData.length;k++)c=g(a.yData[k+d]-b.yData[k]),h.push([b.xData[k],c]),m.push(b.xData[k]),n.push(c);return{values:h,xData:m,yData:n}}})});c(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map