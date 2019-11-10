/*
  Highcharts JS v7.0.3 (2019-02-06)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define(function(){return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){var f=function(a){var d=a.error;return{isParentLoaded:function(a,h,m,c,b){if(a)return c?c(a):!0;d(b||this.generateMessage(m,h));return!1},generateMessage:function(a,d){return'Error: "'+a+'" indicator type requires "'+d+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+
a}}}(a);(function(a,f){var d=a.seriesTypes.ema,h=a.error;a.seriesType("apo","ema",{params:{periods:[10,20]}},{nameBase:"APO",nameComponents:["periods"],init:function(){var a=arguments,c=this;f.isParentLoaded(d,"ema",c.type,function(b){b.prototype.init.apply(c,a)})},getValues:function(a,c){var b=c.periods,g=c.index;c=[];var f=[],l=[],k,e;if(2!==b.length||b[1]<=b[0])return h('Error: "APO requires two periods. Notice, first period should be lower than the second one."'),!1;k=d.prototype.getValues.call(this,
a,{index:g,period:b[0]});a=d.prototype.getValues.call(this,a,{index:g,period:b[1]});if(!k||!a)return!1;b=b[1]-b[0];for(e=0;e<a.yData.length;e++)g=k.yData[e+b]-a.yData[e],c.push([a.xData[e],g]),f.push(a.xData[e]),l.push(g);return{values:c,xData:f,yData:l}}})})(a,f)});
//# sourceMappingURL=apo.js.map