/*
  Highcharts JS v7.0.3 (2019-02-06)

 Parabolic SAR Indicator for Highstock

 (c) 2010-2019 Grzegorz Blachliski

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define(function(){return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){(function(e){e.seriesType("psar","sma",{lineWidth:0,marker:{enabled:!0},states:{hover:{lineWidthPlus:0}},params:{initialAccelerationFactor:.02,maxAccelerationFactor:.2,increment:.02,index:2,decimals:4}},{nameComponents:!1,getValues:function(b,d){var e=b.xData;b=b.yData;var f=b[0][1],
x=d.maxAccelerationFactor,y=d.increment,z=d.initialAccelerationFactor,c=b[0][2],r=d.decimals,g=d.index,u=[],v=[],w=[],l=1,p,h,m,k,q,t,n,a;if(g>=b.length)return!1;for(a=0;a<g;a++)f=Math.max(b[a][1],f),c=Math.min(b[a][2],parseFloat(c.toFixed(r)));p=b[a][1]>c?1:-1;d=d.initialAccelerationFactor;h=d*(f-c);u.push([e[g],c]);v.push(e[g]);w.push(parseFloat(c.toFixed(r)));for(a=g+1;a<b.length;a++)g=b[a-1][2],k=b[a-2][2],q=b[a-1][1],t=b[a-2][1],m=b[a][1],n=b[a][2],null!==k&&null!==t&&null!==g&&null!==q&&null!==
m&&null!==n&&(c=p===l?1===p?c+h<Math.min(k,g)?c+h:Math.min(k,g):c+h>Math.max(t,q)?c+h:Math.max(t,q):f,g=1===p?m>f?m:f:n<f?n:f,m=1===l&&n>c||-1===l&&m>c?1:-1,l=m,h=g,n=y,k=x,q=z,d=l===p?1===l&&h>f?d===k?k:parseFloat((d+n).toFixed(2)):-1===l&&h<f?d===k?k:parseFloat((d+n).toFixed(2)):d:q,f=g-c,h=d*f,u.push([e[a],parseFloat(c.toFixed(r))]),v.push(e[a]),w.push(parseFloat(c.toFixed(r))),l=p,p=m,f=g);return{values:u,xData:v,yData:w}}})})(e)});
//# sourceMappingURL=psar.js.map