/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(c){a(c);a.Highcharts=c;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function c(a,b,k,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,k))}a=a?a._modules:{};c(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
g,c,e,f){if(a)return e?e(a):!0;b(f||this.generateMessage(c,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});c(a,"indicators/ppo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,c){var g=b.correctFloat,k=b.error;b=b.seriesType;var e=a.seriesTypes.ema;b("ppo","ema",{params:{periods:[12,26]}},{nameBase:"PPO",
nameComponents:["periods"],init:function(){var a=arguments,b=this;c.isParentLoaded(e,"ema",b.type,function(f){f.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,h=b.index;b=[];var f=[],l=[],d;if(2!==c.length||c[1]<=c[0])k('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');else{var m=e.prototype.getValues.call(this,a,{index:h,period:c[0]});a=e.prototype.getValues.call(this,a,{index:h,period:c[1]});if(m&&a){c=c[1]-c[0];for(d=0;d<a.yData.length;d++)h=
g((m.yData[d+c]-a.yData[d])/a.yData[d]*100),b.push([a.xData[d],h]),f.push(a.xData[d]),l.push(h);return{values:b,xData:f,yData:l}}}}});""});c(a,"masters/indicators/ppo.src.js",[],function(){})});
//# sourceMappingURL=ppo.js.map