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
!function e(o,t,i){function n(f,a){if(!t[f]){if(!o[f]){var l="function"==typeof require&&require;if(!a&&l)return l(f,!0);if(r)return r(f,!0);var c=new Error("Cannot find module '"+f+"'");throw c.code="MODULE_NOT_FOUND",c}var u=t[f]={exports:{}};o[f][0].call(u.exports,function(e){var t=o[f][1][e];return n(t||e)},u,u.exports,e,o,t,i)}return t[f].exports}for(var r="function"==typeof require&&require,f=0;f<i.length;f++)n(i[f]);return n}({1:[function(e,o,t){"use strict";Object.assign(mejs.MepDefaults,{facebookPixelTitle:"",facebookPixelCategory:"Videos"}),Object.assign(MediaElementPlayer.prototype,{buildfacebookpixel:function(e,o,t,i){e.fbPixelPlay=function(){"undefined"!=typeof fbq&&fbq("trackCustom",e.options.facebookPixelCategory,{Event:"Play",Title:""===e.options.facebookPixelTitle?e.media.currentSrc:e.options.facebookPixelTitle})},e.fbPixelPause=function(){"undefined"!=typeof fbq&&fbq("trackCustom",e.options.facebookPixelCategory,{Event:"Pause",Title:""===e.options.facebookPixelTitle?e.media.currentSrc:e.options.facebookPixelTitle})},e.fbPixelEnded=function(){"undefined"!=typeof fbq&&fbq("trackCustom",e.options.facebookPixelCategory,{Event:"Ended",Title:""===e.options.facebookPixelTitle?e.media.currentSrc:e.options.facebookPixelTitle})},i.addEventListener("play",e.fbPixelPlay),i.addEventListener("pause",e.fbPixelPause),i.addEventListener("ended",e.fbPixelEnded)},cleanfacebookpixel:function(e,o,t,i){i.removeEventListener("play",e.fbPixelPlay),i.removeEventListener("pause",e.fbPixelPause),i.removeEventListener("ended",e.fbPixelEnded)}})},{}]},{},[1]);