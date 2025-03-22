/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

import invariant from 'fbjs/lib/invariant';
import canUseDOM from '../../modules/canUseDom';
var dimensions = {
  window: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  },
  screen: {
    fontScale: 1,
    height: 0,
    scale: 1,
    width: 0
  }
};
var listeners = {};
var shouldInit = canUseDOM;
function update() {
  if (!canUseDOM) {
    return;
  }
  var win = window;
  var height;
  var width;

  /**
   * iOS does not update viewport dimensions on keyboard open/close.
   * window.visualViewport(https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)
   * is used instead of document.documentElement.clientHeight (which remains as a fallback)
   */
  if (win.visualViewport) {
    var visualViewport = win.visualViewport;
    /**
     * We are multiplying by scale because height and width from visual viewport
     * also react to pinch zoom, and become smaller when zoomed. But it is not desired
     * behaviour, since originally documentElement client height and width were used,
     * and they do not react to pinch zoom.
     */
    height = Math.round(visualViewport.height * visualViewport.scale);
    width = Math.round(visualViewport.width * visualViewport.scale);
  } else {
    var docEl = win.document.documentElement;
    height = docEl.clientHeight;
    width = docEl.clientWidth;
  }
  dimensions.window = {
    fontScale: 1,
    height,
    scale: win.devicePixelRatio || 1,
    width
  };
  dimensions.screen = {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width
  };
}
function handleResize() {
  update();
  if (Array.isArray(listeners['change'])) {
    listeners['change'].forEach(handler => handler(dimensions));
  }
}
export default class Dimensions {
  static get(dimension) {
    if (shouldInit) {
      shouldInit = false;
      update();
    }
    invariant(dimensions[dimension], "No dimension set for key " + dimension);
    return dimensions[dimension];
  }
  static set(initialDimensions) {
    if (initialDimensions) {
      if (canUseDOM) {
        invariant(false, 'Dimensions cannot be set in the browser');
      } else {
        if (initialDimensions.screen != null) {
          dimensions.screen = initialDimensions.screen;
        }
        if (initialDimensions.window != null) {
          dimensions.window = initialDimensions.window;
        }
      }
    }
  }
  static addEventListener(type, handler) {
    listeners[type] = listeners[type] || [];
    listeners[type].push(handler);
    return {
      remove: () => {
        this.removeEventListener(type, handler);
      }
    };
  }
  static removeEventListener(type, handler) {
    if (Array.isArray(listeners[type])) {
      listeners[type] = listeners[type].filter(_handler => _handler !== handler);
    }
  }
}
if (canUseDOM) {
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize, false);
  } else {
    window.addEventListener('resize', handleResize, false);
  }
}