/*
  Highcharts JS v6.2.0 (2018-10-17)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:"function"===typeof define&&define.amd?define(function(){return g}):g(Highcharts)})(function(g){(function(g){g.seriesType("psar","sma",{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{nameComponents:!1,getValues:function(b,d){var g=b.xData;b=b.yData;var e=b[0][1],x=d.maxAccelerationFactor,y=d.increment,z=d.initialAccelerationFactor,
c=b[0][2],r=d.decimals,f=d.index,u=[],v=[],w=[],l=1,p,h,m,k,q,t,n,a;if(f>=b.length)return!1;for(a=0;a<f;a++)e=Math.max(b[a][1],e),c=Math.min(b[a][2],parseFloat(c.toFixed(r)));p=b[a][1]>c?1:-1;d=d.initialAccelerationFactor;h=d*(e-c);u.push([g[f],c]);v.push(g[f]);w.push(parseFloat(c.toFixed(r)));for(a=f+1;a<b.length;a++)f=b[a-1][2],k=b[a-2][2],q=b[a-1][1],t=b[a-2][1],m=b[a][1],n=b[a][2],null!==k&&null!==t&&null!==f&&null!==q&&null!==m&&null!==n&&(c=p===l?1===p?c+h<Math.min(k,f)?c+h:Math.min(k,f):c+
h>Math.max(t,q)?c+h:Math.max(t,q):e,f=1===p?m>e?m:e:n<e?n:e,m=1===l&&n>c||-1===l&&m>c?1:-1,l=m,h=f,n=y,k=x,q=z,d=l===p?1===l&&h>e?d===k?k:parseFloat((d+n).toFixed(2)):-1===l&&h<e?d===k?k:parseFloat((d+n).toFixed(2)):d:q,e=f-c,h=d*e,u.push([g[a],parseFloat(c.toFixed(r))]),v.push(g[a]),w.push(parseFloat(c.toFixed(r))),l=p,p=m,e=f);return{values:u,xData:v,yData:w}}})})(g)});
//# sourceMappingURL=psar.js.map
