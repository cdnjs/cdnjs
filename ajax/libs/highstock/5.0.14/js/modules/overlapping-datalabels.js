/*
 Highcharts JS v5.0.14 (2017-07-28)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(g){var d=g.Chart,h=g.each,l=g.objectEach,q=g.pick,r=g.addEvent;d.prototype.callbacks.push(function(f){function d(){var c=[];h(f.yAxis||[],function(b){b.options.stackLabels&&!b.options.stackLabels.allowOverlap&&l(b.stacks,function(a){l(a,function(a){c.push(a.label)})})});h(f.series||[],function(b){var a=b.options.dataLabels,e=b.dataLabelCollections||["dataLabel"];(a.enabled||b._hasPointLabels)&&
!a.allowOverlap&&b.visible&&h(e,function(a){h(b.points,function(b){b[a]&&(b[a].labelrank=q(b.labelrank,b.shapeArgs&&b.shapeArgs.height),c.push(b[a]))})})});f.hideOverlappingLabels(c)}d();r(f,"redraw",d)});d.prototype.hideOverlappingLabels=function(f){var d=f.length,c,b,a,e,g,m,n,p,k,l=function(a,b,c,d,e,f,g,h){return!(e>a+c||e+g<a||f>b+d||f+h<b)};for(b=0;b<d;b++)if(c=f[b])c.oldOpacity=c.opacity,c.newOpacity=1,c.width||(a=c.getBBox(),c.width=a.width,c.height=a.height);f.sort(function(a,b){return(b.labelrank||
0)-(a.labelrank||0)});for(b=0;b<d;b++)for(a=f[b],c=b+1;c<d;++c)if(e=f[c],a&&e&&a!==e&&a.placed&&e.placed&&0!==a.newOpacity&&0!==e.newOpacity&&(g=a.alignAttr,m=e.alignAttr,n=a.parentGroup,p=e.parentGroup,k=2*(a.box?0:a.padding||0),g=l(g.x+n.translateX,g.y+n.translateY,a.width-k,a.height-k,m.x+p.translateX,m.y+p.translateY,e.width-k,e.height-k)))(a.labelrank<e.labelrank?a:e).newOpacity=0;h(f,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=
c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(d)});
