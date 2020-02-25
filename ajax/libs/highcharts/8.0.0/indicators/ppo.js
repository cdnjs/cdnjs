/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/ppo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,e,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,e))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
g,h,l,f){if(a)return l?l(a):!0;b(f||this.generateMessage(h,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/ppo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,e){var g=b.correctFloat,h=a.seriesTypes.ema,l=a.error;a.seriesType("ppo","ema",{params:{periods:[12,26]}},{nameBase:"PPO",
nameComponents:["periods"],init:function(){var a=arguments,b=this;e.isParentLoaded(h,"ema",b.type,function(f){f.prototype.init.apply(b,a)})},getValues:function(a,b){var c=b.periods,k=b.index;b=[];var e=[],f=[],d;if(2!==c.length||c[1]<=c[0])l('Error: "PPO requires two periods. Notice, first period should be lower than the second one."');else{var m=h.prototype.getValues.call(this,a,{index:k,period:c[0]});a=h.prototype.getValues.call(this,a,{index:k,period:c[1]});if(m&&a){c=c[1]-c[0];for(d=0;d<a.yData.length;d++)k=
g((m.yData[d+c]-a.yData[d])/a.yData[d]*100),b.push([a.xData[d],k]),e.push(a.xData[d]),f.push(k);return{values:b,xData:e,yData:f}}}}});""});b(a,"masters/indicators/ppo.src.js",[],function(){})});
//# sourceMappingURL=ppo.js.map