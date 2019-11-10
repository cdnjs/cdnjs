/*
 Highcharts JS v6.1.0 (2018-04-13)
 Highcharts funnel module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(g){var e=g.seriesType,C=g.seriesTypes,H=g.noop,D=g.pick,I=g.each;e("funnel","pie",{animation:!1,center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",reversed:!1,size:!0},{animate:H,translate:function(){var b=function(a,b){return/%$/.test(a)?b*parseInt(a,10)/100:parseInt(a,10)},E=0,c=this.chart,f=this.options,d=f.reversed,e=f.ignoreHiddenPoint,t=c.plotWidth,c=c.plotHeight,
q=0,g=f.center,h=b(g[0],t),r=b(g[1],c),C=b(f.width,t),l,v,m=b(f.height,c),w=b(f.neckWidth,t),F=b(f.neckHeight,c),x=r-m/2+m-F,b=this.data,z,A,D="left"===f.dataLabels.position?1:0,B,n,G,u,k,y,p;this.getWidthAt=v=function(a){var b=r-m/2;return a>x||m===F?w:w+(C-w)*(1-(a-b)/(m-F))};this.getX=function(a,b,c){return h+(b?-1:1)*(v(d?2*r-a:a)/2+c.labelDistance)};this.center=[h,r,m];this.centerX=h;I(b,function(a){e&&!1===a.visible||(E+=a.y)});I(b,function(a){p=null;A=E?a.y/E:0;n=r-m/2+q*m;k=n+A*m;l=v(n);B=
h-l/2;G=B+l;l=v(k);u=h-l/2;y=u+l;n>x?(B=u=h-w/2,G=y=h+w/2):k>x&&(p=k,l=v(x),u=h-l/2,y=u+l,k=x);d&&(n=2*r-n,k=2*r-k,p=p?2*r-p:null);z=["M",B,n,"L",G,n,y,k];p&&z.push(y,p,u,p);z.push(u,k,"Z");a.shapeType="path";a.shapeArgs={d:z};a.percentage=100*A;a.plotX=h;a.plotY=(n+(p||k))/2;a.tooltipPos=[h,a.plotY];a.slice=H;a.half=D;e&&!1===a.visible||(q+=A)})},sortByAngle:function(b){b.sort(function(b,c){return b.plotY-c.plotY})},drawDataLabels:function(){var b=this.data,e=this.options.dataLabels.distance,c,f,
d,g=b.length,t,q;for(this.center[2]-=2*e;g--;)d=b[g],f=(c=d.half)?1:-1,q=d.plotY,d.labelDistance=D(d.options.dataLabels&&d.options.dataLabels.distance,e),this.maxLabelDistance=Math.max(d.labelDistance,this.maxLabelDistance||0),t=this.getX(q,c,d),d.labelPos=[0,q,t+(d.labelDistance-5)*f,q,t+d.labelDistance*f,q,c?"right":"left",0];C.pie.prototype.drawDataLabels.call(this)}});e("pyramid","funnel",{neckWidth:"0%",neckHeight:"0%",reversed:!0})})(e)});
