/*
 <!--
 cache.adderall()
 version : 1.0.0
 author  : Tal Ater @TalAter
 license : MIT
 https://github.com/TalAter/cache.adderall
 -->
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adderall = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";var addAll=function(r){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(!(r instanceof Cache&&Array.isArray(e)&&Array.isArray(t)))return Promise.reject();var n=[];return Promise.all(e.map(function(e){return caches.match(e).then(function(t){return t?r.put(e,t):(n.push(e),Promise.resolve())})})).then(function(){return r.addAll(n.concat(t))})};module.exports={addAll:addAll};
},{}]},{},[1])(1)
});


//# sourceMappingURL=cache.adderall.js.map