/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var f=function(a){var g=a.error;return{isParentLoaded:function(e,a,m,c,b){if(e)return c?c(e):!0;g(b||this.generateMessage(m,a));return!1},generateMessage:function(a,g){return'Error: "'+a+'" indicator type requires "'+g+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,f){var e=a.seriesTypes.ema,g=a.error;a.seriesType("apo","ema",{params:{periods:[10,20]}},{nameBase:"APO",nameComponents:["periods"],init:function(){var a=arguments,c=this;f.isParentLoaded(e,"ema",c.type,function(b){b.prototype.init.apply(c,a)})},getValues:function(a,c){var b=c.periods,h=c.index;c=[];var f=[],l=[],k,d;if(2!==b.length||b[1]<=b[0])return g('Error: "APO requires two periods. Notice, first period should be lower than the second one."'),!1;k=e.prototype.getValues.call(this,
a,{index:h,period:b[0]});a=e.prototype.getValues.call(this,a,{index:h,period:b[1]});if(!k||!a)return!1;b=b[1]-b[0];for(d=0;d<a.yData.length;d++)h=k.yData[d+b]-a.yData[d],c.push([a.xData[d],h]),f.push(a.xData[d]),l.push(h);return{values:c,xData:f,yData:l}}})})(a,f)});
//# sourceMappingURL=apo.js.map