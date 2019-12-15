/*
 Highcharts JS v6.0.4 (2017-12-15)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?module.exports=e:e(Highcharts)})(function(e){(function(f){var e=f.Chart,k=f.each,m=f.objectEach,q=f.pick;f=f.addEvent;f(e.prototype,"render",function(){var d=[];k(this.labelCollectors||[],function(c){d=d.concat(c())});k(this.yAxis||[],function(c){c.options.stackLabels&&!c.options.stackLabels.allowOverlap&&m(c.stacks,function(a){m(a,function(a){d.push(a.label)})})});k(this.series||[],function(c){var a=c.options.dataLabels,g=c.dataLabelCollections||
["dataLabel"];(a.enabled||c._hasPointLabels)&&!a.allowOverlap&&c.visible&&k(g,function(b){k(c.points,function(a){a[b]&&(a[b].labelrank=q(a.labelrank,a.shapeArgs&&a.shapeArgs.height),d.push(a[b]))})})});this.hideOverlappingLabels(d)});e.prototype.hideOverlappingLabels=function(d){var c=d.length,a,g,b,h,e,f,n,p,l,m=function(a,b,c,e,d,f,g,h){return!(d>a+c||d+g<a||f>b+e||f+h<b)};for(g=0;g<c;g++)if(a=d[g])a.oldOpacity=a.opacity,a.newOpacity=1,a.width||(b=a.getBBox(),a.width=b.width,a.height=b.height);
d.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(g=0;g<c;g++)for(b=d[g],a=g+1;a<c;++a)if(h=d[a],b&&h&&b!==h&&b.placed&&h.placed&&0!==b.newOpacity&&0!==h.newOpacity&&(e=b.alignAttr,f=h.alignAttr,n=b.parentGroup,p=h.parentGroup,l=2*(b.box?0:b.padding||0),e=m(e.x+n.translateX,e.y+n.translateY,b.width-l,b.height-l,f.x+p.translateX,f.y+p.translateY,h.width-l,h.height-l)))(b.labelrank<h.labelrank?b:h).newOpacity=0;k(d,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&
(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(e)});
