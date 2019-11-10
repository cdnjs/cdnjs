/*
 Highstock JS v7.1.3 (2019-08-14)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(l){a(l);a.Highcharts=l;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function l(a,t,b,p){a.hasOwnProperty(t)||(a[t]=p.apply(null,b))}a=a?a._modules:{};l(a,"indicators/psar.src.js",[a["parts/Globals.js"]],function(a){a.seriesType("psar","sma",{lineWidth:0,
marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{nameComponents:!1,getValues:function(a,b){var p=a.xData;a=a.yData;var e=a[0][1],l=b.maxAccelerationFactor,t=b.increment,z=b.initialAccelerationFactor,d=a[0][2],u=b.decimals,f=b.index,v=[],w=[],x=[],g=1,c;if(f>=a.length)return!1;for(c=0;c<f;c++)e=Math.max(a[c][1],e),d=Math.min(a[c][2],parseFloat(d.toFixed(u)));var q=a[c][1]>d?1:-1;b=b.initialAccelerationFactor;
var h=b*(e-d);v.push([p[f],d]);w.push(p[f]);x.push(parseFloat(d.toFixed(u)));for(c=f+1;c<a.length;c++){f=a[c-1][2];var k=a[c-2][2];var r=a[c-1][1];var y=a[c-2][1];var m=a[c][1];var n=a[c][2];null!==k&&null!==y&&null!==f&&null!==r&&null!==m&&null!==n&&(d=q===g?1===q?d+h<Math.min(k,f)?d+h:Math.min(k,f):d+h>Math.max(y,r)?d+h:Math.max(y,r):e,f=1===q?m>e?m:e:n<e?n:e,m=1===g&&n>d||-1===g&&m>d?1:-1,g=m,h=f,n=t,k=l,r=z,b=g===q?1===g&&h>e?b===k?k:parseFloat((b+n).toFixed(2)):-1===g&&h<e?b===k?k:parseFloat((b+
n).toFixed(2)):b:r,e=f-d,h=b*e,v.push([p[c],parseFloat(d.toFixed(u))]),w.push(p[c]),x.push(parseFloat(d.toFixed(u))),g=q,q=m,e=f)}return{values:v,xData:w,yData:x}}})});l(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map