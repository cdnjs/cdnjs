/*
  Highcharts JS v7.1.2 (2019-06-03)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/psar",["highcharts","highcharts/modules/stock"],function(n){a(n);a.Highcharts=n;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function n(a,t,b,q){a.hasOwnProperty(t)||(a[t]=q.apply(null,b))}a=a?a._modules:{};n(a,"indicators/psar.src.js",[a["parts/Globals.js"]],function(a){a.seriesType("psar","sma",{lineWidth:0,
marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{nameComponents:!1,getValues:function(a,b){var q=a.xData;a=a.yData;var e=a[0][1],n=b.maxAccelerationFactor,t=b.increment,z=b.initialAccelerationFactor,d=a[0][2],u=b.decimals,f=b.index,w=[],x=[],y=[],k=1,p,g,l,h,r,v,m,c;if(f>=a.length)return!1;for(c=0;c<f;c++)e=Math.max(a[c][1],e),d=Math.min(a[c][2],parseFloat(d.toFixed(u)));p=a[c][1]>d?1:-1;b=b.initialAccelerationFactor;
g=b*(e-d);w.push([q[f],d]);x.push(q[f]);y.push(parseFloat(d.toFixed(u)));for(c=f+1;c<a.length;c++)f=a[c-1][2],h=a[c-2][2],r=a[c-1][1],v=a[c-2][1],l=a[c][1],m=a[c][2],null!==h&&null!==v&&null!==f&&null!==r&&null!==l&&null!==m&&(d=p===k?1===p?d+g<Math.min(h,f)?d+g:Math.min(h,f):d+g>Math.max(v,r)?d+g:Math.max(v,r):e,f=1===p?l>e?l:e:m<e?m:e,l=1===k&&m>d||-1===k&&l>d?1:-1,k=l,g=f,m=t,h=n,r=z,b=k===p?1===k&&g>e?b===h?h:parseFloat((b+m).toFixed(2)):-1===k&&g<e?b===h?h:parseFloat((b+m).toFixed(2)):b:r,e=
f-d,g=b*e,w.push([q[c],parseFloat(d.toFixed(u))]),x.push(q[c]),y.push(parseFloat(d.toFixed(u))),k=p,p=l,e=f);return{values:w,xData:x,yData:y}}})});n(a,"masters/indicators/psar.src.js",[],function(){})});
//# sourceMappingURL=psar.js.map