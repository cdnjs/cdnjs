/*
  Highcharts JS v7.0.1 (2018-12-19)

 Indicator series type for Highstock

 (c) 2010-2018 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var g=function(a){var h=a.error;return{isParentLoaded:function(f,a,l,e,b){if(f)return e?e(f):!0;h(b||this.generateMessage(l,a));return!1},generateMessage:function(a,h){return'Error: "'+a+'" indicator type requires "'+h+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,g){var f=a.seriesTypes.ema,h=a.error,l=a.correctFloat;a.seriesType("ppo","ema",{params:{periods:[12,26]}},{nameBase:"PPO",nameComponents:["periods"],init:function(){var a=arguments,b=this;g.isParentLoaded(f,"ema",b.type,function(e){e.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,k=b.index;b=[];var e=[],g=[],m,d;if(2!==c.length||c[1]<=c[0])return h('Error: "PPO requires two periods. Notice, first period should be lower than the second one."'),!1;m=f.prototype.getValues.call(this,
a,{index:k,period:c[0]});a=f.prototype.getValues.call(this,a,{index:k,period:c[1]});if(!m||!a)return!1;c=c[1]-c[0];for(d=0;d<a.yData.length;d++)k=l((m.yData[d+c]-a.yData[d])/a.yData[d]*100),b.push([a.xData[d],k]),e.push(a.xData[d]),g.push(k);return{values:b,xData:e,yData:g}}})})(a,g)});
//# sourceMappingURL=ppo.js.map