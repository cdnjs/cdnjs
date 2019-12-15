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
!function e(n,t,o){function i(a,s){if(!t[a]){if(!n[a]){var g="function"==typeof require&&require;if(!s&&g)return g(a,!0);if(l)return l(a,!0);var r=new Error("Cannot find module '"+a+"'");throw r.code="MODULE_NOT_FOUND",r}var c=t[a]={exports:{}};n[a][0].call(c.exports,function(e){var t=n[a][1][e];return i(t||e)},c,c.exports,e,n,t,o)}return t[a].exports}for(var l="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(e,n,t){"use strict";Object.assign(mejs.MepDefaults,{googleAnalyticsTitle:"",googleAnalyticsCategory:"Videos",googleAnalyticsEventPlay:"Play",googleAnalyticsEventPause:"Pause",googleAnalyticsEventEnded:"Ended",googleAnalyticsEventTime:"Time"}),Object.assign(MediaElementPlayer.prototype,{buildgoogleanalytics:function(e,n,t,o){o.addEventListener("play",function(){"undefined"!=typeof ga&&ga("send","event",e.options.googleAnalyticsCategory,e.options.googleAnalyticsEventPlay,""===e.options.googleAnalyticsTitle?e.media.currentSrc:e.options.googleAnalyticsTitle)},!1),o.addEventListener("pause",function(){"undefined"!=typeof ga&&ga("send","event",e.options.googleAnalyticsCategory,e.options.googleAnalyticsEventPause,""===e.options.googleAnalyticsTitle?e.media.currentSrc:e.options.googleAnalyticsTitle)},!1),o.addEventListener("ended",function(){"undefined"!=typeof ga&&ga("send","event",e.options.googleAnalyticsCategory,e.options.googleAnalyticsEventEnded,""===e.options.googleAnalyticsTitle?e.media.currentSrc:e.options.googleAnalyticsTitle)},!1)}})},{}]},{},[1]);