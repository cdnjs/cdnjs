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
!function e(t,o,s){function r(i,a){if(!o[i]){if(!t[i]){var l="function"==typeof require&&require;if(!a&&l)return l(i,!0);if(n)return n(i,!0);var p=new Error("Cannot find module '"+i+"'");throw p.code="MODULE_NOT_FOUND",p}var c=o[i]={exports:{}};t[i][0].call(c.exports,function(e){var o=t[i][1][e];return r(o||e)},c,c.exports,e,t,o,s)}return o[i].exports}for(var n="function"==typeof require&&require,i=0;i<s.length;i++)r(s[i]);return r}({1:[function(e,t,o){"use strict";mejs.i18n.en["mejs.stop"]="Stop",Object.assign(mejs.MepDefaults,{stopText:null}),Object.assign(MediaElementPlayer.prototype,{buildstop:function(e,t,o,s){var r=this,n=mejs.Utils.isString(r.options.stopText)?r.options.stopText:mejs.i18n.t("mejs.stop"),i=document.createElement("div");i.className=r.options.classPrefix+"button "+r.options.classPrefix+"stop-button "+r.options.classPrefix+"stop",i.innerHTML='<button type="button" aria-controls="'+r.id+'" title="'+n+'" aria-label="'+n+'" tabindex="0"></button>',r.addControlElement(i,"stop"),i.addEventListener("click",function(){if("function"==typeof s.stop)s.stop();else if(s.readyState>0){s.paused||s.pause(),s.setSrc(""),s.load();var e=t.querySelector("."+r.options.classPrefix+"playpause-button");mejs.Utils.removeClass(e,r.options.classPrefix+"pause"),mejs.Utils.addClass(e,r.options.classPrefix+"play"),r.container.querySelector("."+r.options.classPrefix+"cannotplay")&&(r.container.querySelector("."+r.options.classPrefix+"cannotplay").remove(),o.querySelector("."+r.options.classPrefix+"overlay-error").parentNode.style.display="none",o.querySelector("."+r.options.classPrefix+"overlay-error").remove())}var n=mejs.Utils.createEvent("timeupdate",s);s.dispatchEvent(n)})}})},{}]},{},[1]);