/* !
 * FEATURE.JS 1.0.1, A Fast, simple and lightweight browser feature
 * detection library in just 1kb.
 *
 * http://featurejs.com
 *
 * CSS 3D Transform, CSS Transform, CSS Transition, Canvas, SVG,
 * addEventListener, querySelectorAll, matchMedia, classList API,
 * placeholder, localStorage, History API, Viewport Units, REM Units,
 * CORS, WebGL, Service Worker, Context Menu, Geolocation,
 * Device Motion, Device Orientation, Touch, Async, Defer,
 * Srcset, Sizes & Picture Element.
 *
 *
 * USAGE EXAMPLE:
 * if (feature.webGL) {
 *   console.log('webGL supported!');
 * }
 *
 * Author: @viljamis, https://viljamis.com
 */

/* globals DocumentTouch */
/* eslint no-extra-semi: 0 */
;(function(root, document, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals (root is window)
    root.feature = factory();
  }
}(typeof self !== 'undefined' ? self : this, document, function() {
  'use strict';

  // For minification only
  var docEl = document.documentElement;

  // Protect against undefined window.navigator objects
  var nav = window.navigator || {};


  /**
   * Utilities
   */
  var util = {

    /**
     * Simple create element method
     */
    create: function(el) {
      return document.createElement(el);
    },

    /**
     * Test if it's an old device that we want to filter out
     */
    old: !!(/(Android\s(1\.|2\.))|(Silk\/1\.)/i.test(nav.userAgent)),

    /**
     * Function that takes a standard CSS property name as a parameter and
     * returns it's prefixed version valid for current browser it runs in
     */
    pfx: (function() {
      var style = document.createElement('dummy').style;
      var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
      var memory = {};

      return function(prop) {
        if (typeof memory[prop] === 'undefined') {
          var ucProp = prop.charAt(0).toUpperCase() + prop.substr(1);
          var prefixedProps = prefixes.join(ucProp + ' ');
          var props = (prop + ' ' + prefixedProps + ucProp).split(' ');

          memory[prop] = null;

          for (var i in props) {
            if (style[props[i]] !== undefined) {
              memory[prop] = props[i];
              break;
            }
          }
        }
        return memory[prop];
      };
    })(),

  };


  /**
   * The Feature.js object
   */

  var Feature = {
    // Test if CSS 3D transforms are supported
    css3Dtransform: (function() {
      var test = (!util.old && util.pfx('perspective') !== null);
      return !!test;
    })(),

    // Test if CSS transforms are supported
    cssTransform: (function() {
      var test = (!util.old && util.pfx('transformOrigin') !== null);
      return !!test;
    })(),

    // Test if CSS transitions are supported
    cssTransition: (function() {
      var test = util.pfx('transition') !== null;
      return !!test;
    })(),

    // Test if addEventListener is supported
    addEventListener: !!window.addEventListener,

    // Test if querySelectorAll is supported
    querySelectorAll: !!document.querySelectorAll,

    // Test if matchMedia is supported
    matchMedia: !!window.matchMedia,

    // Test if Device Motion is supported
    deviceMotion: ('DeviceMotionEvent' in window),

    // Test if Device Orientation is supported
    deviceOrientation: ('DeviceOrientationEvent' in window),

    // Test if Context Menu is supported
    contextMenu: ('contextMenu' in docEl && 'HTMLMenuItemElement' in window),

    // Test if classList API is supported
    classList: ('classList' in docEl),

    // Test if placeholder attribute is supported
    placeholder: ('placeholder' in util.create('input')),

    // Test if localStorage is supported
    localStorage: (function() {
      var test;

      if ('localStorage' in window) {
        try {
          window.localStorage.setItem('featurejs-test', 'foobar');
          test = window.localStorage.getItem('featurejs-test');
          window.localStorage.removeItem('featurejs-test');
        } catch (err) {
          // no content in the cache means it couldn't be added to at all (old
          // Safari) otherwise we just went over a non-zero quota
          return !!window.localStorage.length;
        }
      }

      return !!test;
    })(),

    // Test if History API is supported
    historyAPI: (window.history && 'pushState' in window.history),

    // Test if ServiceWorkers are supported
    serviceWorker: ('serviceWorker' in nav),

    // Test if viewport units are supported
    viewportUnit: (function(el) {
      try {
        el.style.width = '1vw';
        var test = el.style.width !== '';
        return !!test;
      } catch (err) {
        return false;
      }
    })(util.create('dummy')),

    // Test if REM units are supported
    remUnit: (function(el) {
      try {
        el.style.width = '1rem';
        var test = el.style.width !== '';
        return !!test;
      } catch (err) {
        return false;
      }
    })(util.create('dummy')),

    // Test if Canvas is supported
    canvas: (function(el) {
      return !!(el.getContext && el.getContext('2d'));
    })(util.create('canvas')),

    // Test if SVG is supported
    svg: !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,

    // Test if WebGL is supported
    webGL: (function(el) {
      try {
        return !!(window.WebGLRenderingContext &&
          (el.getContext('webgl') || el.getContext('experimental-webgl')));
      } catch (err) {
        return false;
      }
    })(util.create('canvas')),

    // Test if cors is supported
    cors: ('XMLHttpRequest' in window &&
      'withCredentials' in new XMLHttpRequest()),

    // Tests if touch events are supported, but doesn't necessarily reflect a
    // touchscreen device
    touch: !!(('ontouchstart' in window) ||
      nav.msPointerEnabled &&
      window.MSGesture ||
      window.DocumentTouch &&
      document instanceof DocumentTouch),

    // Test if async attribute is supported
    async: ('async' in util.create('script')),

    // Test if defer attribute is supported
    defer: ('defer' in util.create('script')),

    // Test if Geolocation is supported
    geolocation: ('geolocation' in nav),

    // Test if img srcset attribute is supported
    srcset: ('srcset' in util.create('img')),

    // Test if img sizes attribute is supported
    sizes: ('sizes' in util.create('img')),

    // Test if Picture element is supported
    pictureElement: ('HTMLPictureElement' in window),

    // Run all the tests and add supported classes
    testAll: function() {
      var classes = ' js';

      for (var test in this) {
        if (test !== 'testAll' && test !== 'extend' && this[test]) {
          classes += ' ' + test;
        }
      }

      docEl.className += classes.toLowerCase();
    },

    extend: function(name, callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Feature.extend: `callback` is not a Function');
      }

      this[name] = !!callback(util);
      return this;
    },

  };

  /**
   * Expose a public-facing API
   */
  return Feature;
}));
