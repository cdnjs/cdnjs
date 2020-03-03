/*
 Highstock JS v8.0.1 (2020-03-02)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/chaikin",["highcharts","highcharts/modules/stock"],function(b){a(b);a.Highcharts=b;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function b(a,f,k,g){a.hasOwnProperty(f)||(a[f]=g.apply(null,k))}a=a?a._modules:{};b(a,"indicators/accumulation-distribution.src.js",[a["parts/Utilities.js"]],function(a){var f=a.error;
a=a.seriesType;a("ad","sma",{params:{volumeSeriesID:"volume"}},{nameComponents:!1,nameBase:"Accumulation/Distribution",getValues:function(a,g){var e=g.period,k=a.xData,h=a.yData,d=g.volumeSeriesID,c=a.chart.get(d);g=c&&c.yData;var q=h?h.length:0,p=[],b=[],n=[];if(!(k.length<=e&&q&&4!==h[0].length)){if(c){for(;e<q;e++){a=p.length;d=h[e][1];c=h[e][2];var m=h[e][3],l=g[e];d=[k[e],m===d&&m===c||d===c?0:(2*m-c-d)/(d-c)*l];0<a&&(d[1]+=p[a-1][1]);p.push(d);b.push(d[0]);n.push(d[1])}return{values:p,xData:b,
yData:n}}f("Series "+d+" not found! Check `volumeSeriesID`.",!0,a.chart)}}});""});b(a,"mixins/indicator-required.js",[a["parts/Utilities.js"]],function(a){var f=a.error;return{isParentLoaded:function(a,g,e,b,h){if(a)return b?b(a):!0;f(h||this.generateMessage(e,g));return!1},generateMessage:function(a,b){return'Error: "'+a+'" indicator type requires "'+b+'" indicator loaded before. Please read docs: https://api.highcharts.com/highstock/plotOptions.'+a}}});b(a,"indicators/chaikin.src.js",[a["parts/Globals.js"],
a["parts/Utilities.js"],a["mixins/indicator-required.js"]],function(a,b,k){var g=b.correctFloat,e=b.error;b=b.seriesType;var f=a.seriesTypes.ema,h=a.seriesTypes.ad;b("chaikin","ema",{params:{volumeSeriesID:"volume",periods:[3,10]}},{nameBase:"Chaikin Osc",nameComponents:["periods"],init:function(){var a=arguments,c=this;k.isParentLoaded(f,"ema",c.type,function(b){b.prototype.init.apply(c,a)})},getValues:function(a,c){var b=c.periods,d=c.period,k=[],n=[],m=[],l;if(2!==b.length||b[1]<=b[0])e('Error: "Chaikin requires two periods. Notice, first period should be lower than the second one."');
else if(c=h.prototype.getValues.call(this,a,{volumeSeriesID:c.volumeSeriesID,period:d}))if(a=f.prototype.getValues.call(this,c,{period:b[0]}),c=f.prototype.getValues.call(this,c,{period:b[1]}),a&&c){b=b[1]-b[0];for(l=0;l<c.yData.length;l++)d=g(a.yData[l+b]-c.yData[l]),k.push([c.xData[l],d]),n.push(c.xData[l]),m.push(d);return{values:k,xData:n,yData:m}}}});""});b(a,"masters/indicators/chaikin.src.js",[],function(){})});
//# sourceMappingURL=chaikin.js.map