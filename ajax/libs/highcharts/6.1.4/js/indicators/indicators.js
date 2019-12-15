/*
  Highcharts JS v6.1.4 (2018-09-25)

 Indicator series type for Highstock

 (c) 2010-2017 Pawel Fus, Sebastian Bochan

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:"function"===typeof define&&define.amd?define(function(){return e}):e(Highcharts)})(function(e){(function(d){var e=d.pick,h=d.each,p=d.error,k=d.Series,q=d.isArray,l=d.addEvent;d=d.seriesType;d("sma","line",{name:void 0,tooltip:{valueDecimals:4},linkedTo:void 0,params:{index:0,period:14}},{bindTo:{series:!0,eventName:"updatedData"},useCommonDataGrouping:!0,nameComponents:["period"],nameSuffixes:[],calculateOn:"init",init:function(b,
c){function d(){var b=(a.xData||[]).length,c=a.getValues(a.linkedParent,a.options.params)||{values:[],xData:[],yData:[]};b&&b===c.xData.length&&!a.cropped&&!a.hasGroupedData&&a.visible&&a.points?a.updateData(c.values):(a.xData=c.xData,a.yData=c.yData,a.options.data=c.values);!1===a.bindTo.series&&(delete a.processedXData,a.isDirty=!0,a.redraw());a.isDirtyData=!1}var a=this;k.prototype.init.call(a,b,c);b.linkSeries();a.dataEventsToUnbind=[];if(!a.linkedParent)return p("Series "+a.options.linkedTo+
" not found! Check `linkedTo`.");a.dataEventsToUnbind.push(l(a.bindTo.series?a.linkedParent:a.linkedParent.xAxis,a.bindTo.eventName,d));if("init"===a.calculateOn)d();else var e=l(a.chart,a.calculateOn,function(){d();e()});return a},getName:function(){var b=this.name,c=[];b||(h(this.nameComponents,function(b,a){c.push(this.options.params[b]+e(this.nameSuffixes[a],""))},this),b=(this.nameBase||this.type.toUpperCase())+(this.nameComponents?" ("+c.join(", ")+")":""));return b},getValues:function(b,c){var d=
c.period,a=b.xData;b=b.yData;var e=b.length,f=0,m=0,h=[],k=[],l=[],g=-1,n;if(a.length<d)return!1;for(q(b[0])&&(g=c.index?c.index:0);f<d-1;)m+=0>g?b[f]:b[f][g],f++;for(c=f;c<e;c++)m+=0>g?b[c]:b[c][g],n=[a[c],m/d],h.push(n),k.push(n[0]),l.push(n[1]),m-=0>g?b[c-f]:b[c-f][g];return{values:h,xData:k,yData:l}},destroy:function(){h(this.dataEventsToUnbind,function(b){b()});k.prototype.destroy.call(this)}})})(e)});
//# sourceMappingURL=indicators.js.map
