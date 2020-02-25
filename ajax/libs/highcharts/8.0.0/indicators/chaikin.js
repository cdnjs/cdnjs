/*
 Highstock JS v8.0.0 (2019-12-10)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,g,e,h){a.hasOwnProperty(g)||(a[g]=h.apply(null,e))}a=a?a._modules:{};b(a,"indicators/accumulation-distribution.src.js",[a["parts/Globals.js"]],function(a){var g=a.seriesType;
g("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(e,h){var f=h.period,g=e.xData,k=e.yData,d=h.volumeSeriesID,c=e.chart.get(d);h=c&&c.yData;var q=k?k.length:0,p=[],b=[],n=[];if(!(g.length<=f&&q&&4!==k[0].length)){if(c){for(;f<q;f++){e=p.length;d=k[f][1];c=k[f][2];var m=k[f][3],l=h[f];d=[g[f],m===d&&m===c||d===c?0:(2*m-c-d)/(d-c)*l];0<e&&(d[1]+=p[e-1][1]);p.push(d);b.push(d[0]);n.push(d[1])}return{values:p,xData:b,yData:n}}a.error("Series "+
d+" not found! Check `volumeSeriesID`.",!0,e.chart)}}});""});b(a,"mixins/indicator-required.js",[a["parts/Globals.js"]],function(a){var g=a.error;return{isParentLoaded:function(a,h,f,b,k){if(a)return b?b(a):!0;g(k||this.generateMessage(f,h));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/chaikin.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],
a["mixins/indicator-required.js"]],function(a,b,e){var h=b.correctFloat,f=a.seriesTypes.ema,g=a.seriesTypes.ad,k=a.error;a.seriesType("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,c=this;e.isParentLoaded(f,"ema",c.type,function(d){d.prototype.init.apply(c,a)})},getValues:function(a,c){var b=c.periods,d=c.period,e=[],n=[],m=[],l;if(2!==b.length||b[1]<=b[0])k('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');
else if(c=g.prototype.getValues.call(this,a,{volumeSeriesID:c.volumeSeriesID,period:d}))if(a=f.prototype.getValues.call(this,c,{period:b[0]}),c=f.prototype.getValues.call(this,c,{period:b[1]}),a&&c){b=b[1]-b[0];for(l=0;l<c.yData.length;l++)d=h(a.yData[l+b]-c.yData[l]),e.push([c.xData[l],d]),n.push(c.xData[l]),m.push(d);return{values:e,xData:n,yData:m}}}});""});b(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map