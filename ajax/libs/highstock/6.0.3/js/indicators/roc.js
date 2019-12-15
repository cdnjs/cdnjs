/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(b){var f=b.seriesType,m=b.isArray;f("roc","sma",{name:"Rate of Change (9)",params:{index:3,period:9}},{getValues:function(d,c){var b=c.period,g=d.xData,f=(d=d.yData)?d.length:0,h=[],k=[],l=[],e=-1,a;if(g.length<=b)return!1;m(d[0])&&(e=c.index);for(c=b;c<f;c++)a=0>e?(a=d[c-b])?(d[c]-a)/a*100:null:(a=d[c-b][e])?(d[c][e]-a)/a*100:null,a=[g[c],a],h.push(a),k.push(a[0]),l.push(a[1]);return{values:h,
xData:k,yData:l}}})})(b)});
