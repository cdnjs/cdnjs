/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/apo",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,c,m,f){a.hasOwnProperty(c)||(a[c]=f.apply(null,m))}a=a?a._modules:{};b(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var c=a.error;return{isParentLoaded:function(a,
f,b,d,n){if(a)return d?d(a):!0;c(n||this.generateMessage(b,f));return!1},generateMessage:function(a,c){return'Error: "'+a+'" indicator type requires "'+c+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/apo.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,c,b){var f=c.error;c=c.seriesType;var h=a.seriesTypes.ema;c("apo","ema",{params:{periods:[10,20]}},{nameBase:"APO",nameComponents:["periods"],
init:function(){var a=arguments,c=this;b.isParentLoaded(h,"ema",c.type,function(d){d.prototype.init.apply(c,a)})},getValues:function(a,c){var b=c.periods,g=c.index;c=[];var d=[],k=[],e;if(2!==b.length||b[1]<=b[0])f('Error: "APO requires two periods. Notice, first period should be lower than the second one."');else{var l=h.prototype.getValues.call(this,a,{index:g,period:b[0]});a=h.prototype.getValues.call(this,a,{index:g,period:b[1]});if(l&&a){b=b[1]-b[0];for(e=0;e<a.yData.length;e++)g=l.yData[e+b]-
a.yData[e],c.push([a.xData[e],g]),d.push(a.xData[e]),k.push(g);return{values:c,xData:d,yData:k}}}}});""});b(a,"masters/indicators/apo.src.js",[],function(){})});
//# sourceMappingURL=apo.js.map