/*! emergence.js v1.0.9 | (c) 2017 @xtianmiller | https://github.com/xtianmiller/emergence.js */
(function(root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory(root);
    });
  } else if (typeof exports === 'object') {
    // Node.js or CommonJS
    module.exports = factory;
  } else {
    // Browser globals
    root.emergence = factory(root);
  }
})(this, function(root) {

  'use strict';

  var emergence = {};
  var poll, viewport, container, throttle, reset, handheld, elemCushion, offsetTop, offsetRight, offsetBottom, offsetLeft;
  var callback = function() {};

  // Browser feature test to include any browser APIs required for >= IE8
  // @see http://xtianmiller.com/notes/cutting-the-mustard/
  // @return {bool} true if supported, otherwise false
  var cutsTheMustard = function() {
    return 'querySelectorAll' in document ? true : false;
  };

  // Checks if user is on a handheld
  // @return {bool} true if it's a handheld, otherwise false
  var isHandheld = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Get the offset of a DOM Element
  // @param {DOMElement} elem the container or element
  // @return {int} the top, left, width and height values in pixels
  var getElemOffset = function(elem) {
    // Default top and left position of container or element
    var topPos = 0;
    var leftPos = 0;

    // Width and height of container or element
    var w = elem.offsetWidth;
    var h = elem.offsetHeight;

    // Get total distance of container or element to document's top and left origin
    do {
      if (!isNaN(elem.offsetTop)) {
        topPos += elem.offsetTop;
      }
      if (!isNaN(elem.offsetLeft)) {
        leftPos += elem.offsetLeft;
      }
    } while ((elem = elem.offsetParent) !== null);

    return {
      top: topPos,
      left: leftPos,
      width: w,
      height: h
    };
  };

  // Get the custom container size if provided, otherwise the documents
  // @return {int} the width and height in pixels
  var getContainerSize = function(container) {
    var w, h;

    if (container) {
      w = container.clientWidth;
      h = container.clientHeight;
    } else {
      w = root.innerWidth || document.documentElement.clientWidth;
      h = root.innerHeight || document.documentElement.clientHeight;
    }
    return {
      width: w,
      height: h
    };
  };

  // Get the X and Y scroll positions of the container, otherwise the documents
  // @return {int} the X and Y values in pixels
  var getContainerScroll = function(container) {
    if (container) {
      return {
        x: container.scrollLeft + getElemOffset(container).left,
        y: container.scrollTop + getElemOffset(container).top
      };
    } else {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }
  };

  // Check if element's closest parent is hidden (display: none)
  // @param {DOMElement} elem the element
  // @return {bool} true if hidden, false otherwise
  var isHidden = function(elem) {
    return elem.offsetParent === null;
  };

  // Check if element is visible
  // @param {DOMElement} elem the element
  // @return {bool} true if visible, false otherwise
  var isVisible = function(elem) {

    // Don't continue if element's closest parent is hidden
    if (isHidden(elem)) {
      return false;
    }

    // Get information from element and container
    var elemOffset = getElemOffset(elem);
    var containerSize = getContainerSize(container);
    var containerScroll = getContainerScroll(container);

    // Determine element size
    var elemWidth = elemOffset.width;
    var elemHeight = elemOffset.height;

    // Determine element position from rect points
    var elemTop = elemOffset.top;
    var elemLeft = elemOffset.left;
    var elemBottom = elemTop + elemHeight;
    var elemRight = elemLeft + elemWidth;

    // Determine boundaries of container and element
    // @return {bool} true if element is found within boundaries, otherwise false
    var checkBoundaries = function() {
      // Determine element boundaries including custom cushion
      var eTop = elemTop + elemHeight * elemCushion;
      var eRight = elemRight - elemWidth * elemCushion;
      var eBottom = elemBottom - elemHeight * elemCushion;
      var eLeft = elemLeft + elemWidth * elemCushion;

      // Determine container boundaries including custom offset
      var cTop = containerScroll.y + offsetTop;
      var cRight = containerScroll.x - offsetRight + containerSize.width;
      var cBottom = containerScroll.y - offsetBottom + containerSize.height;
      var cLeft = containerScroll.x + offsetLeft;

      return (
        eTop < cBottom && eBottom > cTop && eLeft > cLeft && eRight < cRight
      );
    };

    return checkBoundaries();
  };

  // Throttling for scroll and resize events
  var useThrottle = function() {
    if (!!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function() {
      emergence.engage();
      poll = null;
    }, throttle);
  };

  // Initialize emergence with options, do feature test and create event listeners
  // @param {Object} options Custom settings
  emergence.init = function(options) {
    options = options || {};

    var optionInt = function(option, fallback) {
      return parseInt(option || fallback, 10);
    };

    var optionFloat = function(option, fallback) {
      return parseFloat(option || fallback);
    };

    container = options.container || null; // null (window) by default
    throttle = optionInt(options.throttle, 250); // 250 by default
    reset = !!options.reset; // true by default
    handheld = !!options.handheld; // true by default
    elemCushion = optionFloat(options.elemCushion, 0.15); // 0.15 by default
    offsetTop = optionInt(options.offsetTop, 0); // 0 by default
    offsetRight = optionInt(options.offsetRight, 0); // 0 by default
    offsetBottom = optionInt(options.offsetBottom, 0); // 0 by default
    offsetLeft = optionInt(options.offsetLeft, 0); // 0 by default
    callback = options.callback || callback;

    // If browser doesn't pass feature test, provide console.log
    if (!cutsTheMustard()) {
      console.log('emergence.js is not supported in this browser.');
    } else if ((isHandheld() && handheld) || !isHandheld()) {
      // Else if this is a handheld device AND handheld option is true, or not a handheld device
      // Add '.emergence' class to document for conditional CSS
      document.documentElement.className += ' emergence';

      // Engage emergence for the first time
      document.addEventListener('DOMContentLoaded', function() {
        emergence.engage();
      });

      // Listeners for scroll and resize events
      // Invoke useThrottle()

      if (container) { viewport = container; } 
      else { viewport = root; }

      if (document.addEventListener) {
        viewport.addEventListener('scroll', useThrottle, false);
        viewport.addEventListener('resize', useThrottle, false);
      } else {
        viewport.attachEvent('onscroll', useThrottle);
        viewport.attachEvent('onresize', useThrottle);
      }
    }
  };

  // Engage emergence
  emergence.engage = function() {
    var nodes = document.querySelectorAll('[data-emergence]');
    var length = nodes.length;
    var elem;

    // If data-emergence attribute exists
    if (length) {
      // Loop through objects with data-emergence attribute
      for (var i = 0; i < length; i++) {
        elem = nodes[i];

        // If element is visible
        if (isVisible(elem)) {
          // Change the state of the attribute to 'visible'
          elem.setAttribute('data-emergence', 'visible');

          // Callback for when element is visible
          callback(elem, 'visible');
        } else if (reset === true) {
          // Else if element is hidden and reset
          // Change the state of the attribute to 'hidden'
          elem.setAttribute('data-emergence', 'hidden');

          // Create callback
          callback(elem, 'reset');
        } else if (reset === false) {
          // Else if element is hidden and NOT reset
          // Create callback
          callback(elem, 'noreset');
        }
      }
    } else {
      emergence.disengage();
    }
  };

  // Disengage emergence
  emergence.disengage = function() {
    // Send message to console if no data-emergence attribute is found
    console.log('emergence.js found no elements with required data attribute.');

    // Remove and detach event listeners
    if (container) { viewport = container; } 
    else { viewport = root; }

    if (document.removeEventListener) {
      viewport.removeEventListener('scroll', useThrottle, false);
      viewport.removeEventListener('resize', useThrottle, false);
    } else {
      viewport.detachEvent('onscroll', useThrottle);
      viewport.detachEvent('onresize', useThrottle);
    }

    // Clear timeout from throttle
    clearTimeout(poll);
  };

  return emergence;
});
