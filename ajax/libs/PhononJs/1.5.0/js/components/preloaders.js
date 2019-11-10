"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ========================================================================
 * Phonon: preloaders.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
(function (window, phonon) {
  function _show(preloader) {
    if (!preloader.classList.contains('active')) {
      preloader.style.visibility = 'visible';
      preloader.classList.add('active');
    }
  }

  function onHide() {
    this.style.visibility = 'hidden';
    this.off(phonon.event.transitionEnd, onHide);
  }
  /**
  * @param {DOMElement | String} el
  */


  function _hide(preloader) {
    if (preloader.classList.contains('active')) {
      preloader.classList.remove('active');
      preloader.on(phonon.event.transitionEnd, onHide);
    }
  }

  phonon.preloader = function (el) {
    var preloader = typeof el === 'string' ? document.querySelector(el) : el;

    if (preloader === null) {
      throw new Error("The preloader with ID ".concat(el, " does not exist"));
    }

    return {
      show: function show() {
        _show(preloader);
      },
      hide: function hide() {
        _hide(preloader);
      }
    };
  };

  window.phonon = phonon;

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = phonon.preloader;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return phonon.preloader;
    });
  }
})(typeof window !== 'undefined' ? window : void 0, window.phonon || {});