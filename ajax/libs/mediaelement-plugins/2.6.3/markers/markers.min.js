/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
!function i(a,s,l){function f(e,r){if(!s[e]){if(!a[e]){var t="function"==typeof require&&require;if(!r&&t)return t(e,!0);if(m)return m(e,!0);var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}var n=s[e]={exports:{}};a[e][0].call(n.exports,function(r){return f(a[e][1][r]||r)},n,n.exports,i,a,s,l)}return s[e].exports}for(var m="function"==typeof require&&require,r=0;r<l.length;r++)f(l[r]);return f}({1:[function(r,e,t){"use strict";Object.assign(mejs.MepDefaults,{markerColor:"#E9BC3D",markerWidth:1,markers:[],markerCallback:function(){}}),Object.assign(MediaElementPlayer.prototype,{buildmarkers:function(t,r,e,o){if(t.options.markers.length){for(var n=-1,i=-1,a=-1,s=-1,l=0,f=t.options.markers.length;l<f;++l){var m=document.createElement("span");m.className=this.options.classPrefix+"time-marker",r.querySelector("."+this.options.classPrefix+"time-total").appendChild(m)}o.addEventListener("durationchange",function(){t.setmarkers(r)}),o.addEventListener("timeupdate",function(){if((n=Math.floor(o.currentTime))<a?n<s&&(s=-1):a=n,t.options.markers.length)for(var r=0,e=t.options.markers.length;r<e;++r)i=Math.floor(t.options.markers[r]),n===i&&i!==s&&(t.options.markerCallback(o,o.currentTime),s=i)},!1)}},setmarkers:function(r){for(var e=this,t=r.querySelectorAll("."+e.options.classPrefix+"time-marker"),o=0,n=e.options.markers.length;o<n;++o)if(Math.floor(e.options.markers[o])<=e.media.duration&&0<=Math.floor(e.options.markers[o])){var i=100*Math.floor(e.options.markers[o])/e.media.duration,a=t[o];a.style.width=e.options.markerWidth+"px",a.style.left=i+"%",a.style.background=e.options.markerColor}}})},{}]},{},[1]);