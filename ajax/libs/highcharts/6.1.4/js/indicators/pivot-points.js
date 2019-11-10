/*
  Highcharts JS v6.1.4 (2018-09-25)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Fus

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:"function"===typeof define&&define.amd?define(function(){return d}):d(Highcharts)})(function(d){(function(d){function t(a,b){var c=a.series.pointArrayMap,h=c.length;for(r.prototype.pointClass.prototype[b].call(a);h--;)b="dataLabel"+c[h],a[b]&&a[b].element&&a[b].destroy(),a[b]=null}var g=d.each,u=d.defined,v=d.isArray,r=d.seriesTypes.sma;d.seriesType("pivotpoints","sma",{params:{period:28,algorithm:"standard"},marker:{enabled:!1},
enableMouseTracking:!1,dataLabels:{enabled:!0,format:"{point.pivotLine}"},dataGrouping:{approximation:"averages"}},{nameBase:"Pivot Points",pointArrayMap:"R4 R3 R2 R1 P S1 S2 S3 S4".split(" "),pointValKey:"P",toYData:function(a){return[a.P]},translate:function(){var a=this;r.prototype.translate.apply(a);g(a.points,function(b){g(a.pointArrayMap,function(c){u(b[c])&&(b["plot"+c]=a.yAxis.toPixels(b[c],!0))})});a.plotEndPoint=a.xAxis.toPixels(a.endPoint,!0)},getGraphPath:function(a){for(var b=this,c=
a.length,h=[[],[],[],[],[],[],[],[],[]],e=[],d=b.plotEndPoint,f=b.pointArrayMap.length,p,k,l;c--;){k=a[c];for(l=0;l<f;l++)p=b.pointArrayMap[l],u(k[p])&&h[l].push({plotX:k.plotX,plotY:k["plot"+p],isNull:!1},{plotX:d,plotY:k["plot"+p],isNull:!1},{plotX:d,plotY:null,isNull:!0});d=k.plotX}g(h,function(a){e=e.concat(r.prototype.getGraphPath.call(b,a))});return e},drawDataLabels:function(){var a=this,b=a.pointArrayMap,c,d,e,n;a.options.dataLabels.enabled&&(d=a.points.length,g(b.concat([!1]),function(f,
h){for(n=d;n--;)e=a.points[n],f?(e.y=e[f],e.pivotLine=f,e.plotY=e["plot"+f],c=e["dataLabel"+f],h&&(e["dataLabel"+b[h-1]]=e.dataLabel),e.dataLabel=c=c&&c.element?c:null):e["dataLabel"+b[h-1]]=e.dataLabel;r.prototype.drawDataLabels.apply(a,arguments)}))},getValues:function(a,b){var c=b.period,d=a.xData,e=(a=a.yData)?a.length:0;b=this[b.algorithm+"Placement"];var n=[],f,p=[],k=[],l,g,m,q;if(d.length<c||!v(a[0])||4!==a[0].length)return!1;for(q=c+1;q<=e+c;q+=c)g=d.slice(q-c-1,q),m=a.slice(q-c-1,q),l=g.length,
f=g[l-1],m=this.getPivotAndHLC(m),m=b(m),m=n.push([f].concat(m)),p.push(f),k.push(n[m-1].slice(1));this.endPoint=g[0]+(f-g[0])/l*c;return{values:n,xData:p,yData:k}},getPivotAndHLC:function(a){var b=-Infinity,c=Infinity,d=a[a.length-1][3];g(a,function(a){b=Math.max(b,a[1]);c=Math.min(c,a[2])});return[(b+c+d)/3,b,c,d]},standardPlacement:function(a){var b=a[1]-a[2];return[null,null,a[0]+b,2*a[0]-a[2],a[0],2*a[0]-a[1],a[0]-b,null,null]},camarillaPlacement:function(a){var b=a[1]-a[2];return[a[3]+1.5*b,
a[3]+1.25*b,a[3]+1.1666*b,a[3]+1.0833*b,a[0],a[3]-1.0833*b,a[3]-1.1666*b,a[3]-1.25*b,a[3]-1.5*b]},fibonacciPlacement:function(a){var b=a[1]-a[2];return[null,a[0]+b,a[0]+.618*b,a[0]+.382*b,a[0],a[0]-.382*b,a[0]-.618*b,a[0]-b,null]}},{destroyElements:function(){t(this,"destroyElements")},destroy:function(){t(this,"destroyElements")}})})(d)});
//# sourceMappingURL=pivot-points.js.map
