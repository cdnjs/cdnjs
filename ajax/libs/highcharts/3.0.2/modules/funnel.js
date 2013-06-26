/*
 
 Highcharts funnel module, Beta

 (c) 2010-2012 Torstein Hønsi

 License: www.highcharts.com/license
*/
(function(l){var B=l.getOptions().plotOptions,q=l.seriesTypes,D=l.merge,C=function(){},z=l.each;B.funnel=D(B.pie,{center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",dataLabels:{connectorWidth:1,connectorColor:"#606060"},size:!0,states:{select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}}});q.funnel=l.extendClass(q.pie,{type:"funnel",animate:C,translate:function(){var a=function(i,a){return/%$/.test(i)?a*parseInt(i,10)/100:parseInt(i,10)},f=0,d=this.chart,e=d.plotWidth,
d=d.plotHeight,g=0,c=this.options,j=c.center,b=a(j[0],e),j=a(j[0],d),l=a(c.width,e),h,r,m=a(c.height,d),s=a(c.neckWidth,e),u=a(c.neckHeight,d),v=m-u,a=this.data,w,x,q=c.dataLabels.position==="left"?1:0,y,n,A,o,k,t,p;this.getWidthAt=r=function(i){return i>m-u?s:s+(l-s)*((m-u-i)/(m-u))};this.getX=function(i,a){return b+(a?-1:1)*(r(i)/2+c.dataLabels.distance)};this.center=[b,j,m];this.centerX=b;z(a,function(a){f+=a.y});z(a,function(a){p=null;x=f?a.y/f:0;n=g*m;k=n+x*m;h=r(n);y=b-h/2;A=y+h;h=r(k);o=b-
h/2;t=o+h;n>v?(y=o=b-s/2,A=t=b+s/2):k>v&&(p=k,h=r(v),o=b-h/2,t=o+h,k=v);w=["M",y,n,"L",A,n,t,k];p&&w.push(t,p,o,p);w.push(o,k,"Z");a.shapeType="path";a.shapeArgs={d:w};a.percentage=x*100;a.plotX=b;a.plotY=(n+(p||k))/2;a.tooltipPos=[b,a.plotY];a.slice=C;a.half=q;g+=x});this.setTooltipPoints()},drawPoints:function(){var a=this,f=a.options,d=a.chart.renderer;z(a.data,function(e){var g=e.graphic,c=e.shapeArgs;g?g.animate(c):e.graphic=d.path(c).attr({fill:e.color,stroke:f.borderColor,"stroke-width":f.borderWidth}).add(a.group)})},
drawDataLabels:function(){var a=this.data,f=this.options.dataLabels.distance,d,e,g,c=a.length,j,b;for(this.center[2]-=2*f;c--;)g=a[c],e=(d=g.half)?1:-1,b=g.plotY,j=this.getX(b,d),g.labelPos=[0,b,j+(f-5)*e,b,j+f*e,b,d?"right":"left",0];q.pie.prototype.drawDataLabels.call(this)}})})(Highcharts);
