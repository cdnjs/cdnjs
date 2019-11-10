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
!function r(e,t,o){function n(i,s){if(!t[i]){if(!e[i]){var l="function"==typeof require&&require;if(!s&&l)return l(i,!0);if(a)return a(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var m=t[i]={exports:{}};e[i][0].call(m.exports,function(r){var t=e[i][1][r];return n(t||r)},m,m.exports,r,e,t,o)}return t[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)n(o[i]);return n}({1:[function(r,e,t){"use strict";Object.assign(mejs.MepDefaults,{markerColor:"#E9BC3D",markerWidth:1,markers:[],markerCallback:function(){}}),Object.assign(MediaElementPlayer.prototype,{buildmarkers:function(r,e,t,o){if(r.options.markers.length){for(var n=this,a=-1,i=-1,s=-1,l=-1,f=0,m=r.options.markers.length;f<m;++f){var u=document.createElement("span");u.className=n.options.classPrefix+"time-marker",e.querySelector("."+n.options.classPrefix+"time-total").appendChild(u)}o.addEventListener("durationchange",function(){r.setmarkers(e)}),o.addEventListener("timeupdate",function(){if(a=Math.floor(o.currentTime),s>a?l>a&&(l=-1):s=a,r.options.markers.length)for(var e=0,t=r.options.markers.length;e<t;++e)i=Math.floor(r.options.markers[e]),a===i&&i!==l&&(r.options.markerCallback(o,o.currentTime),l=i)},!1)}},setmarkers:function(r){for(var e=this,t=r.querySelectorAll("."+e.options.classPrefix+"time-marker"),o=0,n=e.options.markers.length;o<n;++o)if(Math.floor(e.options.markers[o])<=e.media.duration&&Math.floor(e.options.markers[o])>=0){var a=100*Math.floor(e.options.markers[o])/e.media.duration,i=t[o];i.style.width=e.options.markerWidth+"px",i.style.left=a+"%",i.style.background=e.options.markerColor}}})},{}]},{},[1]);