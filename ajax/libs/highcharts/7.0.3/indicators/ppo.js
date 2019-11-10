/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var g=function(a){var e=a.error;return{isParentLoaded:function(a,k,l,f,b){if(a)return f?f(a):!0;e(b||this.generateMessage(l,k));return!1},generateMessage:function(a,e){return'Error: "'+a+'" indicator type requires "'+e+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,g){var e=a.seriesTypes.ema,k=a.error,l=a.correctFloat;a.seriesType("ppo","ema",{params:{periods:[12,26]}},{nameBase:"PPO",nameComponents:["periods"],init:function(){var a=arguments,b=this;g.isParentLoaded(e,"ema",b.type,function(f){f.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,h=b.index;b=[];var f=[],g=[],m,d;if(2!==c.length||c[1]<=c[0])return k('Error: "PPO requires two periods. Notice, first period should be lower than the second one."'),!1;m=e.prototype.getValues.call(this,
a,{index:h,period:c[0]});a=e.prototype.getValues.call(this,a,{index:h,period:c[1]});if(!m||!a)return!1;c=c[1]-c[0];for(d=0;d<a.yData.length;d++)h=l((m.yData[d+c]-a.yData[d])/a.yData[d]*100),b.push([a.xData[d],h]),f.push(a.xData[d]),g.push(h);return{values:b,xData:f,yData:g}}})})(a,g)});
//# sourceMappingURL=ppo.js.map