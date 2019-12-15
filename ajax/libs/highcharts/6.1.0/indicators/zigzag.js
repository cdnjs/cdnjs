/*
  Highcharts JS v6.1.0 (2018-04-13)

 Indicator series type for Highstock

 (c) 2010-2017 Kacper Madej

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(b){b=b.seriesType;b("zigzag","sma",{params:{lowIndex:2,highIndex:1,deviation:1}},{nameComponents:["deviation"],nameSuffixes:["%"],nameBase:"Zig Zag",getValues:function(b,k){var f=k.lowIndex,h=k.highIndex,e=k.deviation/100;k=1+e;var u=1-e,e=b.xData,c=b.yData;b=c?c.length:0;var g=[],n=[],p=[],a,v,d,q,r,l,t=!1,m=!1;if(1>=e.length||b&&(void 0===c[0][f]||void 0===c[0][h]))return!1;q=c[0][f];r=c[0][h];
for(a=1;a<b;a++)c[a][f]<=r*u?(g.push([e[0],r]),d=[e[a],c[a][f]],t=l=!0):c[a][h]>=q*k&&(g.push([e[0],q]),d=[e[a],c[a][h]],l=!1,t=!0),t&&(n.push(g[0][0]),p.push(g[0][1]),v=a++,a=b);for(a=v;a<b;a++)l?(c[a][f]<=d[1]&&(d=[e[a],c[a][f]]),c[a][h]>=d[1]*k&&(m=h)):(c[a][h]>=d[1]&&(d=[e[a],c[a][h]]),c[a][f]<=d[1]*u&&(m=f)),!1!==m&&(g.push(d),n.push(d[0]),p.push(d[1]),d=[e[a],c[a][m]],l=!l,m=!1);f=g.length;0!==f&&g[f-1][0]<e[b-1]&&(g.push(d),n.push(d[0]),p.push(d[1]));return{values:g,xData:n,yData:p}}})})(b)});
