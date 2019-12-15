/*! lozad.js - v1.0.2 - 2017-09-10
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2017 Apoorv Saxena; Licensed MIT */


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lozad = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultConfig = {
  rootMargin: '0px',
  threshold: 0,
  load: function load(element) {
    element.src = element.dataset.src;
  }
};

function markAsLoaded(element) {
  element.dataset.loaded = true;
}

var isLoaded = function isLoaded(element) {
  return element.dataset.loaded === 'true';
};

var onIntersection = function onIntersection(load) {
  return function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        load(entry.target);
        markAsLoaded(entry.target);
      }
    });
  };
};

var lozad = function () {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lozad';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _defaultConfig$option = _extends({}, defaultConfig, options),
      rootMargin = _defaultConfig$option.rootMargin,
      threshold = _defaultConfig$option.threshold,
      load = _defaultConfig$option.load;

  var observer = void 0;

  if (window.IntersectionObserver) {
    observer = new IntersectionObserver(onIntersection(load), {
      rootMargin: rootMargin,
      threshold: threshold
    });
  }

  return {
    observe: function observe() {
      var elements = [].filter.call(document.querySelectorAll(selector), function (element) {
        return !isLoaded(element);
      });

      if (!observer) {
        elements.forEach(function (element) {
          load(element);
          markAsLoaded(element);
        });

        return;
      }

      elements.forEach(function (element) {
        observer.observe(element);
      });
    }
  };
};

return lozad;

})));
