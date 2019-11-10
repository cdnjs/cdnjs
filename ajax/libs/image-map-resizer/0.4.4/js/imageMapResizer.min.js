/*! Image Map Resizer (imageMapResizer.min.js ) - v0.4.4 - 2014-03-14
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2014 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(){"use strict";function a(){function a(){function a(a){function c(a){return a*b[1===(d=1-d)?"width":"height"]}var d=0;return a.split(",").map(Number).map(c).map(Math.floor).join(",")}for(var b={width:h.width/i.width,height:h.height/i.height},c=0;f>c;c++)e[c].coords=a(g[c])}function b(){i.onload=function(){(h.width!==i.width||h.height!==i.height)&&a()},i.src=h.src}function c(){function b(){clearTimeout(j),j=setTimeout(a,250)}window.addEventListener?window.addEventListener("resize",b,!1):window.attachEvent&&window.attachEvent("onresize",b)}var d=this,e=d.getElementsByTagName("area"),f=e.length,g=Array.prototype.map.call(e,function(a){return a.coords}),h=document.querySelector('img[usemap="#'+d.name+'"]'),i=new Image,j=null;b(),c()}window.imageMapResize=function(b){function c(b){if("MAP"!==b.tagName)throw new TypeError("Expected <MAP> tag, found <"+b.tagName+">.");a.call(b)}Array.prototype.forEach.call(document.querySelectorAll(b||"map"),c)},"jQuery"in window&&(jQuery.fn.imageMapResize=function(){return this.filter("map").each(a)})}();
//# sourceMappingURL=../src/imageMapResizer.map