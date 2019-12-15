/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?module.exports=f:f(Highcharts)})(function(f){(function(q){function f(a,b){var c=a.series.pointArrayMap,e=c.length;for(t.prototype.pointClass.prototype[b].call(a);e--;)b="dataLabel"+c[e],a[b]&&a[b].element&&a[b].destroy(),a[b]=null}var r=q.each,u=q.defined,v=q.isArray,t=q.seriesTypes.sma;q.seriesType("pivotpoints","sma",{name:"Pivot Points (28)",params:{period:28,algorithm:"standard"},marker:{enabled:!1},enableMouseTracking:!1,dataLabels:{enabled:!0,
format:"{point.pivotLine}"},dataGrouping:{approximation:"averages"}},{pointArrayMap:"R4 R3 R2 R1 P S1 S2 S3 S4".split(" "),pointValKey:"P",toYData:function(a){return[a.P]},translate:function(){var a=this;t.prototype.translate.apply(a);r(a.points,function(b){r(a.pointArrayMap,function(c){u(b[c])&&(b["plot"+c]=a.yAxis.toPixels(b[c],!0))})});a.plotEndPoint=a.xAxis.toPixels(a.endPoint,!0)},getGraphPath:function(a){for(var b=this,c=a.length,e=[[],[],[],[],[],[],[],[],[]],d=[],h=b.plotEndPoint,g=b.pointArrayMap.length,
k,l,m;c--;){l=a[c];for(m=0;m<g;m++)k=b.pointArrayMap[m],u(l[k])&&e[m].push({plotX:l.plotX,plotY:l["plot"+k],isNull:!1},{plotX:h,plotY:l["plot"+k],isNull:!1},{plotX:h,plotY:null,isNull:!0});h=l.plotX}r(e,function(a){d=d.concat(t.prototype.getGraphPath.call(b,a))});return d},drawDataLabels:function(){var a=this,b=a.pointArrayMap,c,e,d,h;a.options.dataLabels.enabled&&(e=a.points.length,r(b.concat([!1]),function(g,k){for(h=e;h--;)d=a.points[h],g?(d.y=d[g],d.pivotLine=g,d.plotY=d["plot"+g],c=d["dataLabel"+
g],k&&(d["dataLabel"+b[k-1]]=d.dataLabel),d.dataLabel=c=c&&c.element?c:null):d["dataLabel"+b[k-1]]=d.dataLabel;t.prototype.drawDataLabels.apply(a,arguments)}))},getValues:function(a,b){var c=b.period,e=a.xData,d=(a=a.yData)?a.length:0;b=this[b.algorithm+"Placement"];var h=[],g,k=[],l=[],m,f,n,p;if(e.length<c||!v(a[0])||4!==a[0].length)return!1;for(p=c+1;p<=d+c;p+=c)f=e.slice(p-c-1,p),n=a.slice(p-c-1,p),m=f.length,g=f[m-1],n=this.getPivotAndHLC(n),n=b(n),n=h.push([g].concat(n)),k.push(g),l.push(h[n-
1].slice(1));this.endPoint=f[0]+(g-f[0])/m*c;return{values:h,xData:k,yData:l}},getPivotAndHLC:function(a){var b=-Infinity,c=Infinity,e=a[a.length-1][3];r(a,function(a){b=Math.max(b,a[1]);c=Math.min(c,a[2])});return[(b+c+e)/3,b,c,e]},standardPlacement:function(a){var b=a[1]-a[2];return[null,null,a[0]+b,2*a[0]-a[2],a[0],2*a[0]-a[1],a[0]-b,null,null]},camarillaPlacement:function(a){var b=a[1]-a[2];return[a[3]+1.5*b,a[3]+1.25*b,a[3]+1.1666*b,a[3]+1.0833*b,a[0],a[3]-1.0833*b,a[3]-1.1666*b,a[3]-1.25*b,
a[3]-1.5*b]},fibonacciPlacement:function(a){var b=a[1]-a[2];return[null,a[0]+b,a[0]+.618*b,a[0]+.382*b,a[0],a[0]-.382*b,a[0]-.618*b,a[0]-b,null]}},{destroyElements:function(){f(this,"destroyElements")},destroy:function(){f(this,"destroyElements")}})})(f)});
