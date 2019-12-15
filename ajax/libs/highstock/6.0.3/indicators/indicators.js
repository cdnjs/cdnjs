/*
  Highcharts JS v6.0.3 (2017-11-14)

 Indicator series type for Highstock

 (c) 2010-2017 Pawel Fus, Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(c){var e=c.each,p=c.error,h=c.Series,q=c.isArray,k=c.addEvent;c=c.seriesType;c("sma","line",{name:"SMA (14)",tooltip:{valueDecimals:4},linkedTo:void 0,params:{index:0,period:14}},{bindTo:{series:!0,eventName:"updatedData"},calculateOn:"init",init:function(b,d){function c(){var b=a.getValues(a.linkedParent,a.options.params)||{values:[],xData:[],yData:[]};a.xData=b.xData;a.yData=b.yData;a.options.data=
b.values;!1===a.bindTo.series&&(delete a.processedXData,a.isDirty=!0,a.redraw());a.isDirtyData=!1}var a=this;h.prototype.init.call(a,b,d);b.linkSeries();a.dataEventsToUnbind=[];if(!a.linkedParent)return p("Series "+a.options.linkedTo+" not found! Check `linkedTo`.");a.dataEventsToUnbind.push(k(a.bindTo.series?a.linkedParent:a.linkedParent.xAxis,a.bindTo.eventName,c));if("init"===a.calculateOn)c();else var e=k(a.chart,a.calculateOn,function(){c();e()});return a},getValues:function(b,d){var c=d.period,
a=b.xData;b=b.yData;var e=b.length,f=0,l=0,h=[],k=[],n=[],g=-1,m;if(a.length<c)return!1;for(q(b[0])&&(g=d.index?d.index:0);f<c-1;)l+=0>g?b[f]:b[f][g],f++;for(d=f;d<e;d++)l+=0>g?b[d]:b[d][g],m=[a[d],l/c],h.push(m),k.push(m[0]),n.push(m[1]),l-=0>g?b[d-f]:b[d-f][g];return{values:h,xData:k,yData:n}},destroy:function(){e(this.dataEventsToUnbind,function(b){b()});h.prototype.destroy.call(this)}})})(e)});
