"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ========================================================================
 * Phonon: floating-actions.js v0.0.5
 * http://phonon.quarkdev.com
 * ========================================================================
 * Licensed under MIT (http://phonon.quarkdev.com)
 * ======================================================================== */
(function (window, phonon) {
  var lastPosition = 0;
  var lastContentHeight = 0;

  var onContentScroll = function onContentScroll(evt) {
    evt = evt.originalEvent || evt;
    var pageContent = evt.target;
    lastContentHeight = pageContent.offsetHeight;
    var actions = document.querySelectorAll('.app-active .floating-action');
    if (!actions) return;
    var size = actions.length;
    var i = size - 1;

    for (; i >= 0; i--) {
      var action = actions[i];

      if (lastPosition > pageContent.scrollTop) {
        if (!action.classList.contains('active')) {
          action.classList.add('active');
        }
      } else if (action.classList.contains('active')) {
        action.classList.remove('active');
      }
    }

    lastPosition = pageContent.scrollTop;
  };

  var isElement = function isElement(o) {
    return (typeof Node === "undefined" ? "undefined" : _typeof(Node)) === 'object' ? o instanceof Node : o && _typeof(o) === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
  };
  /**
     * Event listener for a floating action
     * @param {DOMElement} page
    */


  function listenTo(page) {
    if (isElement(page)) {
      var c = page.querySelector('.content');

      if (c) {
        c.on('scroll', onContentScroll, false);
      } else {
        console.error('The given page does not contain any .content node');
      }
    } else {
      throw new Error("The page must be a DOMElement not a ".concat(_typeof(page)));
    }
  }

  document.on('pagecreated', function (evt) {
    var flas = document.querySelectorAll("".concat(evt.detail.page, " .floating-action"));
    var i = flas.length - 1;

    for (; i >= 0; i--) {
      var pages = document.querySelectorAll('.app-page');
      var j = pages.length - 1;

      for (; j >= 0; j--) {
        var page = pages[j];

        if (page.tagName.toLowerCase() === evt.detail.page) {
          listenTo(page);
          break;
        }
      }
    }
  });
})(typeof window !== 'undefined' ? window : void 0, window.phonon || {});