/*
  Highcharts JS v6.0.3 (2017-11-14)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2017 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?module.exports=f:f(Highcharts)})(function(f){(function(f){f.seriesType("psar","sma",{name:"PSAR",lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{getValues:function(c,d){var f=c.xData;c=c.yData;var e=c[0][1],x=d.maxAccelerationFactor,y=d.increment,z=d.initialAccelerationFactor,b=c[0][2],r=d.decimals,g=d.index,t=[],u=[],v=[],k=1,m,
h,n,l,q,w,p,a;for(a=0;a<g;a++)e=Math.max(c[a][1],e),b=Math.min(c[a][2],parseFloat(b.toFixed(r)));m=c[a][1]>b?1:-1;d=d.initialAccelerationFactor;h=d*(e-b);t.push([f[g],b]);u.push(f[g]);v.push(parseFloat(b.toFixed(r)));for(a=g+1;a<c.length;a++)g=c[a-1][2],l=c[a-2][2],q=c[a-1][1],w=c[a-2][1],n=c[a][1],p=c[a][2],b=m===k?1===m?b+h<Math.min(l,g)?b+h:Math.min(l,g):b+h>Math.max(w,q)?b+h:Math.max(w,q):e,g=1===m?n>e?n:e:p<e?p:e,n=1===k&&p>b||-1===k&&n>b?1:-1,k=n,h=g,p=y,l=x,q=z,d=k===m?1===k&&h>e?d===l?l:parseFloat((d+
p).toFixed(2)):-1===k&&h<e?d===l?l:parseFloat((d+p).toFixed(2)):d:q,e=g-b,h=d*e,t.push([f[a],parseFloat(b.toFixed(r))]),u.push(f[a]),v.push(parseFloat(b.toFixed(r))),k=m,m=n,e=g;return{values:t,xData:u,yData:v}}})})(f)});
