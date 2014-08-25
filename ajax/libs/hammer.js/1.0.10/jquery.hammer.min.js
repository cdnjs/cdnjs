/*! jQuery plugin for Hammer.JS - v1.0.6 - 2014-03-28
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

!function(a,b){"use strict";function c(a,c){Date.now||(Date.now=function(){return(new Date).getTime()}),a.event.bindDom=function(d,e,f){c(d).on(e,function(c){var d=c.originalEvent||c,e=["pageX","pageY","clientX","clientY","target","preventDefault","stopPropagation"];a.utils.each(e,function(a){null==d[a]&&(d[a]=c[a])}),d.which===b&&(d.which=d.button),f.call(this,d)})},a.utils.each(["on","off"],function(b){a.Instance.prototype[b]=function(a,d){return c(this.element)[b](a,d)}}),a.Instance.prototype.trigger=function(a,b){var d=c(this.element);return d.has(b.target).length&&(d=c(b.target)),d.trigger({type:a,gesture:b})},c.fn.hammer=function(b){return this.each(function(){var d=c(this),e=d.data("hammer");e?e&&b&&a.utils.extend(e.options,b):d.data("hammer",new a(this,b||{}))})}}"function"==typeof define&&define.amd?define(["hammerjs","jquery"],c):c(a.Hammer,a.jQuery||a.Zepto)}(window);
//# sourceMappingURL=jquery.hammer.min.map