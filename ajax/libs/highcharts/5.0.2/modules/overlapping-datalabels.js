/*
 Highcharts JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?module.exports=a:a(Highcharts)})(function(a){(function(a){var h=a.Chart,k=a.each,q=a.pick,r=a.addEvent;h.prototype.callbacks.push(function(f){function a(){var a=[];k(f.series,function(b){var c=b.options.dataLabels,d=b.dataLabelCollections||["dataLabel"];(c.enabled||b._hasPointLabels)&&!c.allowOverlap&&b.visible&&k(d,function(c){k(b.points,function(b){b[c]&&(b[c].labelrank=q(b.labelrank,b.shapeArgs&&b.shapeArgs.height),a.push(b[c]))})})});f.hideOverlappingLabels(a)}
a();r(f,"redraw",a)});h.prototype.hideOverlappingLabels=function(a){var f=a.length,e,b,c,d,l,m,n,p,g,h=function(a,b,c,d,e,f,g,h){return!(e>a+c||e+g<a||f>b+d||f+h<b)};for(b=0;b<f;b++)if(e=a[b])e.oldOpacity=e.opacity,e.newOpacity=1;a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(b=0;b<f;b++)for(c=a[b],e=b+1;e<f;++e)if(d=a[e],c&&d&&c.placed&&d.placed&&0!==c.newOpacity&&0!==d.newOpacity&&(l=c.alignAttr,m=d.alignAttr,n=c.parentGroup,p=d.parentGroup,g=2*(c.box?0:c.padding),l=h(l.x+n.translateX,
l.y+n.translateY,c.width-g,c.height-g,m.x+p.translateX,m.y+p.translateY,d.width-g,d.height-g)))(c.labelrank<d.labelrank?c:d).newOpacity=0;k(a,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(a)});
