/*
  Highcharts JS v6.1.0 (2018-04-13)

 Indicator series type for Highstock

 (c) 2010-2017 Pawel Fus, Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(c){var e=c.pick,h=c.each,p=c.error,k=c.Series,q=c.isArray,l=c.addEvent;c=c.seriesType;c("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,params:{index:0,period:14}},{bindTo:{series:!0,eventName:"updatedData"},useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",init:function(b,d){function c(){var b=a.getValues(a.linkedParent,a.options.params)||
{values:[],xData:[],yData:[]};a.xData=b.xData;a.yData=b.yData;a.options.data=b.values;!1===a.bindTo.series&&(delete a.processedXData,a.isDirty=!0,a.redraw());a.isDirtyData=!1}var a=this;k.prototype.init.call(a,b,d);b.linkSeries();a.dataEventsToUnbind=[];if(!a.linkedParent)return p("Series "+a.options.linkedTo+" not found! Check `linkedTo`.");a.dataEventsToUnbind.push(l(a.bindTo.series?a.linkedParent:a.linkedParent.xAxis,a.bindTo.eventName,c));if("init"===a.calculateOn)c();else var e=l(a.chart,a.calculateOn,
function(){c();e()});return a},getName:function(){var b=this.name,d=[];b||(h(this.nameComponents,function(b,a){d.push(this.options.params[b]+e(this.nameSuffixes[a],""))},this),b=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+d.join(", ")+")":""));return b},getValues:function(b,d){var c=d.period,a=b.xData;b=b.yData;var e=b.length,f=0,m=0,h=[],k=[],l=[],g=-1,n;if(a.length<c)return!1;for(q(b[0])&&(g=d.index?d.index:0);f<c-1;)m+=0>g?b[f]:b[f][g],f++;for(d=f;d<e;d++)m+=0>g?b[d]:b[d][g],
n=[a[d],m/c],h.push(n),k.push(n[0]),l.push(n[1]),m-=0>g?b[d-f]:b[d-f][g];return{values:h,xData:k,yData:l}},destroy:function(){h(this.dataEventsToUnbind,function(b){b()});k.prototype.destroy.call(this)}})})(e)});
