/*
 Highstock JS v7.1.3 (2019-08-14)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,b,f,g){a.hasOwnProperty(b)||(a[b]=g.apply(null,f))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var b=a.error;return{isParentLoaded:function(a,
g,m,c,d){if(a)return c?c(a):!0;b(d||this.generateMessage(m,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/apo.src.js",[a["parts/Globals.js"],a["mixins/indicator-required.js"]],function(a,b){var f=a.seriesTypes.ema,g=a.error;a.seriesType("apo","ema",{params:{periods:[10,20]}},{nameBase:"APO",nameComponents:["periods"],init:function(){var a=
arguments,c=this;b.isParentLoaded(f,"ema",c.type,function(b){b.prototype.init.apply(c,a)})},getValues:function(a,b){var d=b.periods,c=b.index;b=[];var h=[],k=[],e;if(2!==d.length||d[1]<=d[0])return g('Error: "APO requires two periods. Notice, first period should be lower than the second one."'),!1;var l=f.prototype.getValues.call(this,a,{index:c,period:d[0]});a=f.prototype.getValues.call(this,a,{index:c,period:d[1]});if(!l||!a)return!1;d=d[1]-d[0];for(e=0;e<a.yData.length;e++)c=l.yData[e+d]-a.yData[e],
b.push([a.xData[e],c]),h.push(a.xData[e]),k.push(c);return{values:b,xData:h,yData:k}}})});b(a,"masters/indicators/apo.src.js",[],function(){})});
//# sourceMappingURL=apo.js.map