"use strict";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));
function isScreenReaderEnabled() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}
var prefersReducedMotionMedia = _canUseDom.default && typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function isReduceMotionEnabled() {
  return new Promise((resolve, reject) => {
    resolve(prefersReducedMotionMedia ? prefersReducedMotionMedia.matches : true);
  });
}
function addChangeListener(fn) {
  if (prefersReducedMotionMedia != null) {
    prefersReducedMotionMedia.addEventListener != null ? prefersReducedMotionMedia.addEventListener('change', fn) : prefersReducedMotionMedia.addListener(fn);
  }
}
function removeChangeListener(fn) {
  if (prefersReducedMotionMedia != null) {
    prefersReducedMotionMedia.removeEventListener != null ? prefersReducedMotionMedia.removeEventListener('change', fn) : prefersReducedMotionMedia.removeListener(fn);
  }
}
var handlers = {};
var AccessibilityInfo = {
  /**
   * Query whether a screen reader is currently enabled.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isScreenReaderEnabled,
  /**
   * Query whether the user prefers reduced motion.
   *
   * Returns a promise which resolves to a boolean.
   * The result is `true` when a screen reader is enabled and `false` otherwise.
   */
  isReduceMotionEnabled,
  /**
   * Deprecated
   */
  fetch: isScreenReaderEnabled,
  /**
   * Add an event handler. Supported events: reduceMotionChanged
   */
  addEventListener: function addEventListener(eventName, handler) {
    if (eventName === 'reduceMotionChanged') {
      if (!prefersReducedMotionMedia) {
        return;
      }
      var listener = event => {
        handler(event.matches);
      };
      addChangeListener(listener);
      handlers[handler] = listener;
    }
    return {
      remove: () => AccessibilityInfo.removeEventListener(eventName, handler)
    };
  },
  /**
   * Set accessibility focus to a react component.
   */
  setAccessibilityFocus: function setAccessibilityFocus(reactTag) {},
  /**
   * Post a string to be announced by the screen reader.
   */
  announceForAccessibility: function announceForAccessibility(announcement) {},
  /**
   * Remove an event handler.
   */
  removeEventListener: function removeEventListener(eventName, handler) {
    if (eventName === 'reduceMotionChanged') {
      var listener = handlers[handler];
      if (!listener || !prefersReducedMotionMedia) {
        return;
      }
      removeChangeListener(listener);
    }
    return;
  }
};
var _default = exports.default = AccessibilityInfo;
module.exports = exports.default;