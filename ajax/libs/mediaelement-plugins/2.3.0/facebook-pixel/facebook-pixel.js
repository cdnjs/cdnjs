/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * Maintained by, Rafael Miranda (rafa8626@gmail.com)
 * License: MIT
 *
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

Object.assign(mejs.MepDefaults, {
    facebookPixelTitle: '',

    facebookPixelCategory: 'Videos'
});

Object.assign(MediaElementPlayer.prototype, {
    buildfacebookpixel: function buildfacebookpixel(player, controls, layers, media) {

        media.addEventListener('play', function () {
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', player.options.facebookPixelCategory, { Event: 'Play', Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle });
            }
        }, false);
        media.addEventListener('pause', function () {
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', player.options.facebookPixelCategory, { Event: 'Pause', Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle });
            }
        }, false);
        media.addEventListener('ended', function () {
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', player.options.facebookPixelCategory, { Event: 'Ended', Title: player.options.facebookPixelTitle === '' ? player.media.currentSrc : player.options.facebookPixelTitle });
            }
        }, false);
    }
});

},{}]},{},[1]);
