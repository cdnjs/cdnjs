/*
  Highcharts JS v6.1.0 (2018-04-13)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(g){"object"===typeof module&&module.exports?module.exports=g:g(Highcharts)})(function(g){(function(g){g.seriesType("psar","sma",{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{nameComponents:!1,getValues:function(c,d){var g=c.xData;c=c.yData;var e=c[0][1],x=d.maxAccelerationFactor,y=d.increment,z=d.initialAccelerationFactor,b=c[0][2],r=d.decimals,f=d.index,u=[],v=[],w=[],
l=1,p,h,m,k,q,t,n,a;for(a=0;a<f;a++)e=Math.max(c[a][1],e),b=Math.min(c[a][2],parseFloat(b.toFixed(r)));p=c[a][1]>b?1:-1;d=d.initialAccelerationFactor;h=d*(e-b);u.push([g[f],b]);v.push(g[f]);w.push(parseFloat(b.toFixed(r)));for(a=f+1;a<c.length;a++)f=c[a-1][2],k=c[a-2][2],q=c[a-1][1],t=c[a-2][1],m=c[a][1],n=c[a][2],null!==k&&null!==t&&null!==f&&null!==q&&null!==m&&null!==n&&(b=p===l?1===p?b+h<Math.min(k,f)?b+h:Math.min(k,f):b+h>Math.max(t,q)?b+h:Math.max(t,q):e,f=1===p?m>e?m:e:n<e?n:e,m=1===l&&n>b||
-1===l&&m>b?1:-1,l=m,h=f,n=y,k=x,q=z,d=l===p?1===l&&h>e?d===k?k:parseFloat((d+n).toFixed(2)):-1===l&&h<e?d===k?k:parseFloat((d+n).toFixed(2)):d:q,e=f-b,h=d*e,u.push([g[a],parseFloat(b.toFixed(r))]),v.push(g[a]),w.push(parseFloat(b.toFixed(r))),l=p,p=m,e=f);return{values:u,xData:v,yData:w}}})})(g)});
