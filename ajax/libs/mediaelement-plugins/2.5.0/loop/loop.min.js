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
!function o(t,e,s){function n(l,r){if(!e[l]){if(!t[l]){var p="function"==typeof require&&require;if(!r&&p)return p(l,!0);if(i)return i(l,!0);var a=new Error("Cannot find module '"+l+"'");throw a.code="MODULE_NOT_FOUND",a}var f=e[l]={exports:{}};t[l][0].call(f.exports,function(o){var e=t[l][1][o];return n(e||o)},f,f.exports,o,t,e,s)}return e[l].exports}for(var i="function"==typeof require&&require,l=0;l<s.length;l++)n(s[l]);return n}({1:[function(o,t,e){"use strict";mejs.i18n.en["mejs.loop"]="Toggle Loop",Object.assign(mejs.MepDefaults,{loopText:null}),Object.assign(MediaElementPlayer.prototype,{buildloop:function(o){var t=this,e=mejs.Utils.isString(t.options.loopText)?t.options.loopText:mejs.i18n.t("mejs.loop"),s=document.createElement("div");s.className=t.options.classPrefix+"button "+t.options.classPrefix+"loop-button "+(o.options.loop?t.options.classPrefix+"loop-on":t.options.classPrefix+"loop-off"),s.innerHTML='<button type="button" aria-controls="'+t.id+'" title="'+e+'" aria-label="'+e+'" tabindex="0"></button>',t.addControlElement(s,"loop"),s.addEventListener("click",function(){o.options.loop=!o.options.loop,o.options.loop?(mejs.Utils.removeClass(s,t.options.classPrefix+"loop-off"),mejs.Utils.addClass(s,t.options.classPrefix+"loop-on")):(mejs.Utils.removeClass(s,t.options.classPrefix+"loop-on"),mejs.Utils.addClass(s,t.options.classPrefix+"loop-off"))})}})},{}]},{},[1]);