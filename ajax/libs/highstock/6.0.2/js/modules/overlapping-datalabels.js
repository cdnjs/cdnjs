/*
 Highcharts JS v6.0.2 (2017-10-20)

 (c) 2009-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?module.exports=d:d(Highcharts)})(function(d){(function(f){var d=f.Chart,k=f.each,m=f.objectEach,q=f.pick,r=f.addEvent;d.prototype.callbacks.push(function(c){r(c,"render",function(){var g=[];k(c.labelCollectors||[],function(a){g=g.concat(a())});k(c.yAxis||[],function(a){a.options.stackLabels&&!a.options.stackLabels.allowOverlap&&m(a.stacks,function(a){m(a,function(a){g.push(a.label)})})});k(c.series||[],function(a){var c=a.options.dataLabels,b=
a.dataLabelCollections||["dataLabel"];(c.enabled||a._hasPointLabels)&&!c.allowOverlap&&a.visible&&k(b,function(b){k(a.points,function(a){a[b]&&(a[b].labelrank=q(a.labelrank,a.shapeArgs&&a.shapeArgs.height),g.push(a[b]))})})});c.hideOverlappingLabels(g)})});d.prototype.hideOverlappingLabels=function(c){var g=c.length,a,h,b,e,d,f,n,p,l,m=function(a,b,c,d,e,f,g,h){return!(e>a+c||e+g<a||f>b+d||f+h<b)};for(h=0;h<g;h++)if(a=c[h])a.oldOpacity=a.opacity,a.newOpacity=1,a.width||(b=a.getBBox(),a.width=b.width,
a.height=b.height);c.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(h=0;h<g;h++)for(b=c[h],a=h+1;a<g;++a)if(e=c[a],b&&e&&b!==e&&b.placed&&e.placed&&0!==b.newOpacity&&0!==e.newOpacity&&(d=b.alignAttr,f=e.alignAttr,n=b.parentGroup,p=e.parentGroup,l=2*(b.box?0:b.padding||0),d=m(d.x+n.translateX,d.y+n.translateY,b.width-l,b.height-l,f.x+p.translateX,f.y+p.translateY,e.width-l,e.height-l)))(b.labelrank<e.labelrank?b:e).newOpacity=0;k(c,function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==
c&&a.placed&&(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b)),a.isOld=!0)})}})(d)});
