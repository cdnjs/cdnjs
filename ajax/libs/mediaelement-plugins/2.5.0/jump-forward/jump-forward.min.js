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
!function r(t,e,n){function o(a,u){if(!e[a]){if(!t[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(i)return i(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var m=e[a]={exports:{}};t[a][0].call(m.exports,function(r){var e=t[a][1][r];return o(e||r)},m,m.exports,r,t,e,n)}return e[a].exports}for(var i="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(r,t,e){"use strict";mejs.i18n.en["mejs.time-jump-forward"]=["Jump forward 1 second","Jump forward %1 seconds"],Object.assign(mejs.MepDefaults,{jumpForwardInterval:30,jumpForwardText:null}),Object.assign(MediaElementPlayer.prototype,{buildjumpforward:function(r,t,e,n){var o=this,i=mejs.i18n.t("mejs.time-jump-forward",o.options.jumpForwardInterval),a=mejs.Utils.isString(o.options.jumpForwardText)?o.options.jumpForwardText.replace("%1",o.options.jumpForwardInterval):i,u=document.createElement("div");u.className=o.options.classPrefix+"button "+o.options.classPrefix+"jump-forward-button",u.innerHTML='<button type="button" aria-controls="'+o.id+'" title="'+a+'" aria-label="'+a+'" tabindex="0">'+o.options.jumpForwardInterval+"</button>",o.addControlElement(u,"jumpforward"),u.addEventListener("click",function(){var r=isNaN(n.duration)?o.options.jumpForwardInterval:n.duration;if(r){var t=n.currentTime===1/0?0:n.currentTime;n.setCurrentTime(Math.min(t+o.options.jumpForwardInterval,r)),this.querySelector("button").blur()}})}})},{}]},{},[1]);