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
!function e(o,t,r){function s(n,i){if(!t[n]){if(!o[n]){var a="function"==typeof require&&require;if(!i&&a)return a(n,!0);if(l)return l(n,!0);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}var c=t[n]={exports:{}};o[n][0].call(c.exports,function(e){var t=o[n][1][e];return s(t||e)},c,c.exports,e,o,t,r)}return t[n].exports}for(var l="function"==typeof require&&require,n=0;n<r.length;n++)s(r[n]);return s}({1:[function(e,o,t){"use strict";mejs.i18n.en["mejs.close"]="Close",Object.assign(mejs.MepDefaults,{postrollCloseText:null}),Object.assign(MediaElementPlayer.prototype,{buildpostroll:function(e,o,t){var r=this,s=mejs.Utils.isString(r.options.postrollCloseText)?r.options.postrollCloseText:mejs.i18n.t("mejs.close"),l=r.container.querySelector('link[rel="postroll"]');l&&(e.postroll=document.createElement("div"),e.postroll.className=r.options.classPrefix+"postroll-layer "+r.options.classPrefix+"layer",e.postroll.innerHTML='<a class="'+r.options.classPrefix+'postroll-close" href="#">'+s+'</a><div class="'+r.options.classPrefix+'postroll-layer-content"></div>',e.postroll.style.display="none",t.insertBefore(e.postroll,t.firstChild),e.postroll.querySelector("."+r.options.classPrefix+"postroll-close").addEventListener("click",function(e){this.parentNode.style.display="none",e.preventDefault(),e.stopPropagation()}),r.media.addEventListener("ended",function(){mejs.Utils.ajax(l.getAttribute("href"),"html",function(e){t.querySelector("."+r.options.classPrefix+"postroll-layer-content").innerHTML=e}),e.postroll.style.display="block"},!1))}})},{}]},{},[1]);