/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){(function(h){var a=h.seriesType;a("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(f,a){var e=a.period,l=f.xData,d=f.yData,b=a.volumeSeriesID,c=f.chart.get(b);a=c&&c.yData;var q=d?d.length:0,m=[],k=[],n=[];
if(l.length<=e&&q&&4!==d[0].length)return!1;if(!c)return h.error("Series "+b+" not found! Check `volumeSeriesID`.",!0,f.chart);for(;e<q;e++){f=m.length;var b=d[e][1],c=d[e][2],g=d[e][3],p=a[e],b=[l[e],g===b&&g===c||b===c?0:(2*g-c-b)/(b-c)*p];0<f&&(b[1]+=m[f-1][1]);m.push(b);k.push(b[0]);n.push(b[1])}return{values:m,xData:k,yData:n}}})})(a);var r=function(a){var h=a.error;return{isParentLoaded:function(a,k,e,l,d){if(a)return l?l(a):!0;h(d||this.generateMessage(e,k));return!1},generateMessage:function(a,
h){return'Error: "'+a+'" indicator type requires "'+h+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}}(a);(function(a,p){var f=a.seriesTypes.ema,h=a.seriesTypes.ad,e=a.error,l=a.correctFloat;a.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,b=this;p.isParentLoaded(f,"ema",b.type,function(c){c.prototype.init.apply(b,a)})},getValues:function(a,
b){var c=b.periods,d=b.period,m=[],k=[],n=[],g;if(2!==c.length||c[1]<=c[0])return e('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."'),!1;b=h.prototype.getValues.call(this,a,{volumeSeriesID:b.volumeSeriesID,period:d});if(!b)return!1;a=f.prototype.getValues.call(this,b,{period:c[0]});b=f.prototype.getValues.call(this,b,{period:c[1]});if(!a||!b)return!1;c=c[1]-c[0];for(g=0;g<b.yData.length;g++)d=l(a.yData[g+c]-b.yData[g]),m.push([b.xData[g],d]),k.push(b.xData[g]),
n.push(d);return{values:m,xData:k,yData:n}}})})(a,r)});
//# sourceMappingURL=chaikin.js.map