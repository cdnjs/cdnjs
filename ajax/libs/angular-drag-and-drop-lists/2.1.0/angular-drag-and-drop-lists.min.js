/**
 * angular-drag-and-drop-lists v2.1.0
 *
 * Copyright (c) 2014 Marcel Juenemann marcel@juenemann.cc
 * Copyright (c) 2014-2017 Google Inc.
 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
 *
 * License: MIT
 */
!function(e){function n(e,n){return"all"==n?e:e.filter(function(e){return-1!=n.toLowerCase().indexOf(e)})}var a="application/x-dnd",r="application/json",t="Text",d=["move","copy","link"]
e.directive("dndDraggable",["$parse","$timeout",function(e,i){return function(l,f,c){f.attr("draggable","true"),c.dndDisableIf&&l.$watch(c.dndDisableIf,function(e){f.attr("draggable",!e)}),f.on("dragstart",function(s){if(s=s.originalEvent||s,"false"==f.attr("draggable"))return!0
o.isDragging=!0,o.itemType=c.dndType&&l.$eval(c.dndType).toLowerCase(),o.dropEffect="none",o.effectAllowed=c.dndEffectAllowed||d[0],s.dataTransfer.effectAllowed=o.effectAllowed
var g=l.$eval(c.dndDraggable),u=a+(o.itemType?"-"+o.itemType:"")
try{s.dataTransfer.setData(u,angular.toJson(g))}catch(p){var v=angular.toJson({item:g,type:o.itemType})
try{s.dataTransfer.setData(r,v)}catch(p){var D=n(d,o.effectAllowed)
s.dataTransfer.effectAllowed=D[0],s.dataTransfer.setData(t,v)}}if(f.addClass("dndDragging"),i(function(){f.addClass("dndDraggingSource")},0),s._dndHandle&&s.dataTransfer.setDragImage&&s.dataTransfer.setDragImage(f[0],0,0),e(c.dndDragstart)(l,{event:s}),c.dndCallback){var y=e(c.dndCallback)
o.callback=function(e){return y(l,e||{})}}s.stopPropagation()}),f.on("dragend",function(n){n=n.originalEvent||n,l.$apply(function(){var a=o.dropEffect,r={copy:"dndCopied",link:"dndLinked",move:"dndMoved",none:"dndCanceled"}
e(c[r[a]])(l,{event:n}),e(c.dndDragend)(l,{event:n,dropEffect:a})}),o.isDragging=!1,o.callback=void 0,f.removeClass("dndDragging"),f.removeClass("dndDraggingSource"),n.stopPropagation(),i(function(){f.removeClass("dndDraggingSource")},0)}),f.on("click",function(n){c.dndSelected&&(n=n.originalEvent||n,l.$apply(function(){e(c.dndSelected)(l,{event:n})}),n.stopPropagation())}),f.on("selectstart",function(){this.dragDrop&&this.dragDrop()})}}]),e.directive("dndList",["$parse",function(e){return function(i,l,f){function c(e){if(!e)return t
for(var n=0;n<e.length;n++)if(e[n]==t||e[n]==r||e[n].substr(0,a.length)==a)return e[n]
return null}function s(e){return o.isDragging?o.itemType||void 0:e==t||e==r?null:e&&e.substr(a.length+1)||void 0}function g(e){return E.disabled?!1:E.externalSources||o.isDragging?E.allowedTypes&&null!==e?e&&-1!=E.allowedTypes.indexOf(e):!0:!1}function u(e,a){var r=d
return a||(r=n(r,e.dataTransfer.effectAllowed)),o.isDragging&&(r=n(r,o.effectAllowed)),f.dndEffectAllowed&&(r=n(r,f.dndEffectAllowed)),r.length?e.ctrlKey&&-1!=r.indexOf("copy")?"copy":e.altKey&&-1!=r.indexOf("link")?"link":r[0]:"none"}function p(){return T.remove(),l.removeClass("dndDragover"),!0}function v(n,a,r,t,d,l){return e(n)(i,{callback:o.callback,dropEffect:r,event:a,external:!o.isDragging,index:void 0!==d?d:D(),item:l||void 0,type:t})}function D(){return Array.prototype.indexOf.call(m.children,h)}function y(){var e
return angular.forEach(l.children(),function(n){var a=angular.element(n)
a.hasClass("dndPlaceholder")&&(e=a)}),e||angular.element("<li class='dndPlaceholder'></li>")}var T=y()
T.remove()
var h=T[0],m=l[0],E={}
l.on("dragenter",function(e){e=e.originalEvent||e
var n=f.dndAllowedTypes&&i.$eval(f.dndAllowedTypes)
E={allowedTypes:angular.isArray(n)&&n.join("|").toLowerCase().split("|"),disabled:f.dndDisableIf&&i.$eval(f.dndDisableIf),externalSources:f.dndExternalSources&&i.$eval(f.dndExternalSources),horizontal:f.dndHorizontalList&&i.$eval(f.dndHorizontalList)}
var a=c(e.dataTransfer.types)
return a&&g(s(a))?void e.preventDefault():!0}),l.on("dragover",function(e){e=e.originalEvent||e
var n=c(e.dataTransfer.types),a=s(n)
if(!n||!g(a))return!0
if(h.parentNode!=m&&l.append(T),e.target!=m){for(var r=e.target;r.parentNode!=m&&r.parentNode;)r=r.parentNode
if(r.parentNode==m&&r!=h){var d=r.getBoundingClientRect()
if(E.horizontal)var o=e.clientX<d.left+d.width/2
else var o=e.clientY<d.top+d.height/2
m.insertBefore(h,o?r:r.nextSibling)}}var i=n==t,D=u(e,i)
return"none"==D?p():f.dndDragover&&!v(f.dndDragover,e,D,a)?p():(e.preventDefault(),i||(e.dataTransfer.dropEffect=D),l.addClass("dndDragover"),e.stopPropagation(),!1)}),l.on("drop",function(e){e=e.originalEvent||e
var n=c(e.dataTransfer.types),a=s(n)
if(!n||!g(a))return!0
e.preventDefault()
try{var d=JSON.parse(e.dataTransfer.getData(n))}catch(l){return p()}if((n==t||n==r)&&(a=d.type||void 0,d=d.item,!g(a)))return p()
var y=n==t,T=u(e,y)
if("none"==T)return p()
var h=D()
return f.dndDrop&&(d=v(f.dndDrop,e,T,a,h,d),!d)?p():(o.dropEffect=T,y||(e.dataTransfer.dropEffect=T),d!==!0&&i.$apply(function(){i.$eval(f.dndList).splice(h,0,d)}),v(f.dndInserted,e,T,a,h,d),p(),e.stopPropagation(),!1)}),l.on("dragleave",function(e){e=e.originalEvent||e
var n=document.elementFromPoint(e.clientX,e.clientY)
m.contains(n)&&!e._dndPhShown?e._dndPhShown=!0:p()})}}]),e.directive("dndNodrag",function(){return function(e,n,a){n.attr("draggable","true"),n.on("dragstart",function(e){e=e.originalEvent||e,e._dndHandle||(e.dataTransfer.types&&e.dataTransfer.types.length||e.preventDefault(),e.stopPropagation())}),n.on("dragend",function(e){e=e.originalEvent||e,e._dndHandle||e.stopPropagation()})}}),e.directive("dndHandle",function(){return function(e,n,a){n.attr("draggable","true"),n.on("dragstart dragend",function(e){e=e.originalEvent||e,e._dndHandle=!0})}})
var o={}}(angular.module("dndLists",[]));
