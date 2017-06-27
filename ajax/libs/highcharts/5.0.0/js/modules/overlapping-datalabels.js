/*
 Highcharts JS v5.0.0 (2016-09-29)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?module.exports=b:b(Highcharts)})(function(b){(function(b){var g=b.Chart,h=b.each,r=b.pick,t=b.addEvent;g.prototype.callbacks.push(function(l){function b(){var d=[];h(l.series,function(a){var c=a.options.dataLabels,b=a.dataLabelCollections||["dataLabel"];(c.enabled||a._hasPointLabels)&&!c.allowOverlap&&a.visible&&h(b,function(c){h(a.points,function(a){a[c]&&(a[c].labelrank=r(a.labelrank,a.shapeArgs&&a.shapeArgs.height),d.push(a[c]))})})});l.hideOverlappingLabels(d)}
b();t(l,"redraw",b)});g.prototype.hideOverlappingLabels=function(b){var m=b.length,d,a,c,e,k,n,p,q,f,g=function(a,b,c,d,e,f,g,h){return!(e>a+c||e+g<a||f>b+d||f+h<b)};for(a=0;a<m;a++)if(d=b[a])d.oldOpacity=d.opacity,d.newOpacity=1;b.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(a=0;a<m;a++)for(c=b[a],d=a+1;d<m;++d)if(e=b[d],c&&e&&c.placed&&e.placed&&0!==c.newOpacity&&0!==e.newOpacity&&(k=c.alignAttr,n=e.alignAttr,p=c.parentGroup,q=e.parentGroup,f=2*(c.box?0:c.padding),k=g(k.x+p.translateX,
k.y+p.translateY,c.width-f,c.height-f,n.x+q.translateX,n.y+q.translateY,e.width-f,e.height-f)))(c.labelrank<e.labelrank?c:e).newOpacity=0;h(b,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(b)});
