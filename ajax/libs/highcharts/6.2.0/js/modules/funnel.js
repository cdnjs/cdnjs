/*
 Highcharts JS v6.2.0 (2018-10-17)
 Highcharts funnel module

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:"function"===typeof define&&define.amd?define(function(){return a}):a(Highcharts)})(function(a){(function(a){var p=a.seriesType,D=a.seriesTypes,H=a.noop,E=a.pick,I=a.each;p("funnel","pie",{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0},{animate:H,translate:function(){var d=function(b,a){return/%$/.test(b)?a*parseInt(b,10)/100:parseInt(b,10)},a=0,f=this.chart,e=
this.options,c=e.reversed,v=e.ignoreHiddenPoint,t=f.plotWidth,f=f.plotHeight,q=0,p=e.center,g=d(p[0],t),r=d(p[1],f),D=d(e.width,t),k,w,l=d(e.height,f),x=d(e.neckWidth,t),F=d(e.neckHeight,f),y=r-l/2+l-F,d=this.data,A,B,E="left"===e.dataLabels.position?1:0,C,m,G,u,h,z,n;this.getWidthAt=w=function(b){var a=r-l/2;return b>y||l===F?x:x+(D-x)*(1-(b-a)/(l-F))};this.getX=function(b,a,d){return g+(a?-1:1)*(w(c?2*r-b:b)/2+d.labelDistance)};this.center=[g,r,l];this.centerX=g;I(d,function(b){v&&!1===b.visible||
(a+=b.y)});I(d,function(b){n=null;B=a?b.y/a:0;m=r-l/2+q*l;h=m+B*l;k=w(m);C=g-k/2;G=C+k;k=w(h);u=g-k/2;z=u+k;m>y?(C=u=g-x/2,G=z=g+x/2):h>y&&(n=h,k=w(y),u=g-k/2,z=u+k,h=y);c&&(m=2*r-m,h=2*r-h,null!==n&&(n=2*r-n));A=["M",C,m,"L",G,m,z,h];null!==n&&A.push(z,n,u,n);A.push(u,h,"Z");b.shapeType="path";b.shapeArgs={d:A};b.percentage=100*B;b.plotX=g;b.plotY=(m+(n||h))/2;b.tooltipPos=[g,b.plotY];b.slice=H;b.half=E;v&&!1===b.visible||(q+=B)})},sortByAngle:function(a){a.sort(function(a,d){return a.plotY-d.plotY})},
drawDataLabels:function(){var a=this.data,p=this.options.dataLabels.distance,f,e,c,v=a.length,t,q;for(this.center[2]-=2*p;v--;)c=a[v],e=(f=c.half)?1:-1,q=c.plotY,c.labelDistance=E(c.options.dataLabels&&c.options.dataLabels.distance,p),this.maxLabelDistance=Math.max(c.labelDistance,this.maxLabelDistance||0),t=this.getX(q,f,c),c.labelPos=[0,q,t+(c.labelDistance-5)*e,q,t+c.labelDistance*e,q,f?"right":"left",0];D.pie.prototype.drawDataLabels.call(this)}});p("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",
reversed:!0})})(a)});
//# sourceMappingURL=funnel.js.map
