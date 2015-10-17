// IMPORTANT!
// If you're already using Modernizr, delete it from this file. If you don't know what Modernizr is, leave it :)

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms-csstransforms3d-csstransitions-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.csstransforms=function(){return!!F("transform")},q.csstransforms3d=function(){var a=!!F("perspective");return a&&"webkitPerspective"in g.style&&w("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document);


// Shuffle Doesn't require this shuffle/debounce plugin, but it works better with it.

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/*!
 * jQuery Shuffle Plugin
 * Uses CSS Transforms to filter down a grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2. Optionally throttle/debounce by Ben Alman
 * Inspired by Isotope http://isotope.metafizzy.co/
 * Licensed under the MIT license.
 * @author Glen Cheney (http://glencheney.com)
 * @version 2.0
 * @date 07/05/13
 */
!function(t,e,i){"use strict"
t.fn.sorted=function(e){var n=t.extend({},t.fn.sorted.defaults,e),s=this.get(),r=!1
return s.length?n.randomize?t.fn.sorted.randomize(s):(n.by!==t.noop&&null!==n.by&&n.by!==i&&s.sort(function(e,s){if(r)return 0
var o=n.by(t(e)),a=n.by(t(s))
return o===i&&a===i?(r=!0,0):"sortFirst"===o||"sortLast"===a?-1:"sortLast"===o||"sortFirst"===a?1:a>o?-1:o>a?1:0}),r?this.get():(n.reverse&&s.reverse(),s)):[]},t.fn.sorted.defaults={reverse:!1,by:null,randomize:!1},t.fn.sorted.randomize=function(t){var e,i,n=t.length
if(!n)return t
for(;--n;)i=Math.floor(Math.random()*(n+1)),e=t[i],t[i]=t[n],t[n]=e
return t}
var n=0,s=function(e,i){var r=this
t.extend(r,s.options,i,s.settings),r.$container=e,r.$window=t(window),r.unique="shuffle_"+n++,r._fire("loading"),r._init(),r._fire("done")}
s.prototype={_init:function(){var e,i=this,n=t.proxy(i._onResize,i),s=i.throttle?i.throttle(i.throttleTime,n):n,r=i.initialSort?i.initialSort:null
i._setVars(),i._resetCols(),i._addClasses(),i._initItems(),i.$window.on("resize.shuffle."+i.unique,s),e=i.$container.css(["paddingLeft","paddingRight","position","width"]),"static"===e.position&&i.$container.css("position","relative"),i.offset={left:parseInt(e.paddingLeft,10)||0,top:parseInt(e.paddingTop,10)||0},i._setColumns(parseInt(e.width,10)),i.shuffle(i.group,r),i.supported&&setTimeout(function(){i._setTransitions(),i.$container[0].style[i.transitionName]="height "+i.speed+"ms "+i.easing},0)},_addClasses:function(){var t=this
return t.$container.addClass("shuffle"),t.$items.addClass("shuffle-item filtered"),t},_setVars:function(){var e=this
return e.$items=e._getItems(),e.transitionName=e.prefixed("transition"),e.transitionDelayName=e.prefixed("transitionDelay"),e.transitionDuration=e.prefixed("transitionDuration"),e.transform=e.getPrefixed("transform"),e.transitionend={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"}[e.transitionName],e.isFluid=e.columnWidth&&"function"==typeof e.columnWidth,0===e.columnWidth&&null!==e.sizer&&(e.columnWidth=e.sizer),"string"==typeof e.columnWidth?e.$sizer=e.$container.find(e.columnWidth):e.columnWidth&&e.columnWidth.nodeType&&1===e.columnWidth.nodeType?e.$sizer=t(e.columnWidth):e.columnWidth&&e.columnWidth.jquery&&(e.$sizer=e.columnWidth),e.$sizer&&e.$sizer.length&&(e.useSizer=!0,e.sizer=e.$sizer[0]),e},_filter:function(e,n){var s=this,r=n!==i,o=r?n:s.$items,a=t()
return e=e||s.lastFilter,s._fire("filter"),t.isFunction(e)?o.each(function(){var i=t(this),n=e.call(i[0],i,s)
n&&(a=a.add(i))}):(s.group=e,"all"!==e?o.each(function(){var i=t(this),n=i.data("groups"),r=s.delimeter&&!t.isArray(n)?n.split(s.delimeter):n,o=t.inArray(e,r)>-1
o&&(a=a.add(i))}):a=o),s._toggleFilterClasses(o,a),o=null,n=null,a},_toggleFilterClasses:function(e,i){var n="concealed",s="filtered"
e.filter(i).each(function(){var e=t(this)
e.hasClass(n)&&e.removeClass(n),e.hasClass(s)||e.addClass(s)}),e.not(i).each(function(){var e=t(this)
e.hasClass(n)||e.addClass(n),e.hasClass(s)&&e.removeClass(s)})},_initItems:function(t){return t=t||this.$items,t.css(this.itemCss)},_updateItemCount:function(){return this.visibleItems=this.$items.filter(".filtered").length,this},_setTransition:function(t){var e=this
return t.style[e.transitionName]=e.transform+" "+e.speed+"ms "+e.easing+", opacity "+e.speed+"ms "+e.easing,t},_setTransitions:function(t){var e=this
return t=t||e.$items,t.each(function(){e._setTransition(this)}),e},_setSequentialDelay:function(e){var i=this
i.supported&&t.each(e,function(e){this.style[i.transitionDelayName]="0ms,"+(e+1)*i.sequentialFadeDelay+"ms",t(this).one(i.transitionend,function(){this.style[i.transitionDelayName]="0ms"})})},_getItems:function(){return this.$container.children(this.itemSelector)},_getPreciseDimension:function(e,i){var n
return n=window.getComputedStyle?window.getComputedStyle(e,null)[i]:t(e).css(i),parseFloat(n)},_setColumns:function(t){var e,i=this,n=t||i.$container.width(),s="function"==typeof i.gutterWidth?i.gutterWidth(n):i.useSizer?i._getPreciseDimension(i.sizer,"marginLeft"):i.gutterWidth
i.colWidth=i.isFluid?i.columnWidth(n):i.useSizer?i._getPreciseDimension(i.sizer,"width"):i.columnWidth||i.$items.outerWidth(!0)||n,i.colWidth=i.colWidth||n,i.colWidth+=s,e=(n+s)/i.colWidth,Math.ceil(e)-e<.01&&(e=Math.ceil(e)),i.cols=Math.floor(e),i.cols=Math.max(i.cols,1),i.containerWidth=n},_setContainerSize:function(){var t=this,e=Math.max.apply(Math,t.colYs)
t.$container.css("height",e+"px")},_fire:function(t,e){this.$container.trigger(t+".shuffle",e&&e.length?e:[this])},_layout:function(e,i,n,s){var r=this
i=i||r.filterEnd,r.layoutTransitionEnded=!1,t.each(e,function(o){var a=t(e[o]),l=Math.ceil(a.outerWidth(!0)/r.colWidth)
if(l=Math.min(l,r.cols),1===l)r._placeItem(a,r.colYs,i,n,s)
else{var u,d,c=r.cols+1-l,f=[]
for(d=0;c>d;d++)u=r.colYs.slice(d,d+l),f[d]=Math.max.apply(Math,u)
r._placeItem(a,f,i,n,s)}}),r._processStyleQueue(),r._setContainerSize()},_resetCols:function(){var t=this.cols
for(this.colYs=[];t--;)this.colYs.push(0)},_reLayout:function(t,e){var i=this
t=t||i.filterEnd,i._resetCols(),i.keepSorted&&i.lastSort?i.sort(i.lastSort,!0,e):i._layout(i.$items.filter(".filtered").get(),i.filterEnd,e)},_placeItem:function(t,e,i,n,s){for(var r=this,o=Math.min.apply(Math,e),a=0,l=0,u=e.length;u>l;l++)if(e[l]>=o-r.buffer&&e[l]<=o+r.buffer){a=l
break}var d=r.colWidth*a,c=o
d=Math.round(d+r.offset.left),c=Math.round(c+r.offset.top),t.data({x:d,y:c})
var f=o+t.outerHeight(!0),h=r.cols+1-u
for(l=0;h>l;l++)r.colYs[a+l]=f
var p={from:"layout",$this:t,x:d,y:c,scale:1}
n?p.skipTransition=!0:(p.opacity=1,p.callback=i),s&&(p.opacity=0),r.styleQueue.push(p)},_shrink:function(e,i){var n=this,s=e||n.$items.filter(".concealed"),r={},o=i||n.shrinkEnd
s.length&&(n._fire("shrink"),n.shrinkTransitionEnded=!1,s.each(function(){var e=t(this),i=e.data()
r={from:"shrink",$this:e,x:i.x,y:i.y,scale:.001,opacity:0,callback:o},n.styleQueue.push(r)}))},_onResize:function(){var t,e=this
e.enabled&&!e.destroyed&&(t=e.$container.width(),t!==e.containerWidth&&e.resized())},setPrefixedCss:function(t,e,i){t.css(this.prefixed(e),i)},getPrefixed:function(t){var e=this.prefixed(t)
return e?e.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-"):e},transition:function(e){var n,s=this,r=function(){s.layoutTransitionEnded||"layout"!==e.from?s.shrinkTransitionEnded||"shrink"!==e.from||(e.callback.call(s),s.shrinkTransitionEnded=!0):(s._fire("layout"),e.callback.call(s),s.layoutTransitionEnded=!0)}
if(e.callback=e.callback||t.noop,s.supported)e.scale===i&&(e.scale=1),n=s.threeD?"translate3d("+e.x+"px, "+e.y+"px, 0) scale3d("+e.scale+", "+e.scale+", 1)":"translate("+e.x+"px, "+e.y+"px) scale("+e.scale+", "+e.scale+")",e.x!==i&&s.setPrefixedCss(e.$this,"transform",n),e.opacity!==i&&e.$this.css("opacity",e.opacity),e.$this.one(s.transitionend,r)
else{var o={left:e.x,top:e.y,opacity:e.opacity}
e.$this.stop(!0).animate(o,s.speed,"swing",r)}},_processStyleQueue:function(){var e=this,i=e.styleQueue
t.each(i,function(t,i){i.skipTransition?e._skipTransition(i.$this[0],function(){e.transition(i)}):e.transition(i)}),e.styleQueue.length=0},shrinkEnd:function(){this._fire("shrunk")},filterEnd:function(){this._fire("filtered")},sortEnd:function(){this._fire("sorted")},_skipTransition:function(e,i,n){var s,r=this,o=r.transitionDuration,a=e.style[o]
e.style[o]="0ms",t.isFunction(i)?i():e.style[i]=n,s=e.offsetWidth,e.style[o]=a},_addItems:function(t,e,n){var s,r,o=this
o.supported||(e=!1),t.addClass("shuffle-item"),o._initItems(t),o._setTransitions(t),o.$items=o._getItems(),t.css("opacity",0),s=o._filter(i,t),r=s.get(),o._updateItemCount(),e?(o._layout(r,null,!0,!0),n&&o._setSequentialDelay(s),o._revealAppended(s)):o._layout(r)},_revealAppended:function(e){var i=this
setTimeout(function(){e.each(function(e,n){i.transition({from:"reveal",$this:t(n),opacity:1})})},i.revealAppendedDelay)},shuffle:function(t,e){var i=this
i.enabled&&(t||(t="all"),i._filter(t),i.lastFilter=t,i._updateItemCount(),i._resetCols(),i._shrink(),e&&(i.lastSort=e),i._reLayout())},sort:function(t,e,i){var n=this,s=n.$items.filter(".filtered").sorted(t)
e||n._resetCols(),n._layout(s,function(){e&&n.filterEnd(),n.sortEnd()},i),n.lastSort=t},resized:function(t){this.enabled&&(t||this._setColumns(),this._reLayout())},layout:function(){this.update(!0)},update:function(t){this.resized(t)},appended:function(t,e,i){e=e===!1?!1:!0,i=i===!1?!1:!0,this._addItems(t,e,i)},disable:function(){this.enabled=!1},enable:function(t){this.enabled=!0,t!==!1&&this.update()},remove:function(t){if(t.length&&t.jquery){var e=this
return e._shrink(t,function(){var e=this
t.remove(),setTimeout(function(){e.$items=e._getItems(),e.layout(),e._updateItemCount(),e._fire("removed",[t,e]),t=null},0)}),e._processStyleQueue(),e}},destroy:function(){var t=this
t.$window.off("."+t.unique),t.$container.removeClass("shuffle").removeAttr("style").removeData("shuffle"),t.$items.removeAttr("style").removeClass("concealed filtered shuffle-item"),t.destroyed=!0}},s.options={group:"all",speed:250,easing:"ease-out",itemSelector:"",sizer:null,gutterWidth:0,columnWidth:0,delimeter:null,buffer:0,initialSort:null,throttle:t.throttle||null,throttleTime:300,sequentialFadeDelay:150,supported:e.csstransforms&&e.csstransitions},s.settings={$sizer:null,useSizer:!1,itemCss:{position:"absolute",top:0,left:0},offset:{top:0,left:0},revealAppendedDelay:300,keepSorted:!0,enabled:!0,destroyed:!1,styleQueue:[],prefixed:e.prefixed,threeD:e.csstransforms3d},t.fn.shuffle=function(e){var i=Array.prototype.slice.call(arguments,1)
return this.each(function(){var n=t(this),r=n.data("shuffle")
r||(r=new s(n,e),n.data("shuffle",r)),"string"==typeof e&&r[e]&&r[e].apply(r,i)})}}(jQuery,Modernizr)
