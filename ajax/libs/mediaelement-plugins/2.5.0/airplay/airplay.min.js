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
!function e(t,i,a){function r(l,o){if(!i[l]){if(!t[l]){var s="function"==typeof require&&require;if(!o&&s)return s(l,!0);if(n)return n(l,!0);var d=new Error("Cannot find module '"+l+"'");throw d.code="MODULE_NOT_FOUND",d}var c=i[l]={exports:{}};t[l][0].call(c.exports,function(e){var i=t[l][1][e];return r(i||e)},c,c.exports,e,t,i,a)}return i[l].exports}for(var n="function"==typeof require&&require,l=0;l<a.length;l++)r(a[l]);return r}({1:[function(e,t,i){"use strict";Object.assign(mejs.MepDefaults,{airPlayText:null}),Object.assign(MediaElementPlayer.prototype,{buildairplay:function(){if(window.WebKitPlaybackTargetAvailabilityEvent){var e=this,t=mejs.Utils.isString(e.options.airPlayText)?e.options.airPlayText:"AirPlay",i=document.createElement("div");i.className=e.options.classPrefix+"button "+e.options.classPrefix+"airplay-button",i.innerHTML='<button type="button" aria-controls="'+e.id+'" title="'+t+'" aria-label="'+t+'" tabindex="0"></button>',i.addEventListener("click",function(){e.media.originalNode.webkitShowPlaybackTargetPicker()});var a=e.media.originalNode.getAttribute("x-webkit-airplay");a&&"allow"===a||e.media.originalNode.setAttribute("x-webkit-airplay","allow"),e.media.originalNode.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",function(){var t=e.media.originalNode.webkitCurrentPlaybackTargetIsWireless?"Started":"Stopped",a=e.media.originalNode.webkitCurrentPlaybackTargetIsWireless?"active":"",r=i.querySelector("button"),n=mejs.Utils.createEvent("airplay"+t,e.media);e.media.dispatchEvent(n),"active"===a?mejs.Utils.addClass(r,"active"):mejs.Utils.removeClass(r,"active")}),e.media.originalNode.addEventListener("webkitplaybacktargetavailabilitychanged",function(t){"available"===t.availability&&e.addControlElement(i,"airplay")})}}})},{}]},{},[1]);