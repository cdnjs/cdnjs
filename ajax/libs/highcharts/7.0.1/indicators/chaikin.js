/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:"function"===typeof define&&define.amd?define(function(){return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){(function(k){var b=k.seriesType;b("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(d,l){var f=l.period,b=d.xData,e=d.yData,a=l.volumeSeriesID,c=d.chart.get(a);l=c&&c.yData;var r=e?e.length:0,h=[],m=[],n=[];if(b.length<=f&&r&&
4!==e[0].length)return!1;if(!c)return k.error("Series "+a+" not found! Check `volumeSeriesID`.",!0,d.chart);for(;f<r;f++){d=h.length;var a=e[f][1],c=e[f][2],g=e[f][3],p=l[f],a=[b[f],g===a&&g===c||a===c?0:(2*g-c-a)/(a-c)*p];0<d&&(a[1]+=h[d-1][1],a[1]=a[1]);h.push(a);m.push(a[0]);n.push(a[1])}return{values:h,xData:m,yData:n}}})})(b);var t=function(b){var k=b.error;return{isParentLoaded:function(d,b,f,q,e){if(d)return q?q(d):!0;k(e||this.generateMessage(f,b));return!1},generateMessage:function(d,b){return'Error: "'+
d+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+d}}}(b);(function(b,p){var d=b.seriesTypes.ema,l=b.seriesTypes.ad,f=b.error,k=b.correctFloat;b.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var b=arguments,a=this;p.isParentLoaded(d,"ema",a.type,function(c){c.prototype.init.apply(a,b)})},getValues:function(b,a){var c=a.periods,
e=a.period,h=[],m=[],n=[],g;if(2!==c.length||c[1]<=c[0])return f('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."'),!1;a=l.prototype.getValues.call(this,b,{volumeSeriesID:a.volumeSeriesID,period:e});if(!a)return!1;b=d.prototype.getValues.call(this,a,{period:c[0]});a=d.prototype.getValues.call(this,a,{period:c[1]});if(!b||!a)return!1;c=c[1]-c[0];for(g=0;g<a.yData.length;g++)e=k(b.yData[g+c]-a.yData[g]),h.push([a.xData[g],e]),m.push(a.xData[g]),n.push(e);
return{values:h,xData:m,yData:n}}})})(b,t)});
//# sourceMappingURL=chaikin.js.map