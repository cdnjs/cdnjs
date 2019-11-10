function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Sticky.js
 * Library for sticky elements written in vanilla javascript. With this library you can easily set sticky elements on your website. It's also responsive.
 *
 * @version 1.1.2
 * @author Rafal Galus <biuro@rafalgalus.pl>
 * @website https://rgalus.github.io/sticky-js/
 * @repo https://github.com/rgalus/sticky-js
 * @license https://github.com/rgalus/sticky-js/blob/master/LICENSE
 */

var Sticky = function () {
  /**
   * Sticky instance constructor.
   * @constructor
   * @param {string} selector - Selector which we can find elements.
   * @param {string} options - Global options for sticky elements (could be overwritten by data-{option}="" attributes).
   */
  function Sticky() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Sticky);

    this.selector = selector;
    this.elements = [];

    this.version = '1.1.2';

    this.vp = this.getViewportSize();
    this.scrollTop = this.getScrollTopPosition();

    this.options = {
      marginTop: options.marginTop || 0,
      stickyFor: options.stickFor || 0,
      stickyClass: options.stickyClass || null
    };

    this.run();
  }

  /**
   * Activate Sticky library
   * @function
   */


  Sticky.prototype.run = function run() {
    var _this = this;

    // wait for DOM content to be fully loaded
    var DOMContentLoaded = setInterval(function () {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        // now we are sure that dom content has been loaded
        clearInterval(DOMContentLoaded);

        var elements = document.querySelectorAll(_this.selector);
        _this.forEach(elements, function (element) {
          return _this.renderElement(element);
        });
      }
    }, 10);
  };

  /**
   * Renders sticky element
   * @function
   * @param {node} element - Sticky element to be rendered.
   */


  Sticky.prototype.renderElement = function renderElement(element) {
    var _this2 = this;

    // create container where are needed variables are placed
    element.sticky = {};

    // set default variables
    element.sticky.active = false;

    element.sticky.marginTop = parseInt(element.getAttribute('data-margin-top')) || this.options.marginTop;
    element.sticky.stickyFor = parseInt(element.getAttribute('data-sticky-for')) || this.options.stickyFor;
    element.sticky.stickyClass = element.getAttribute('data-sticky-class') || this.options.stickyClass;

    element.sticky.container = this.getStickyContainer(element);
    element.sticky.container.rect = this.getRectangle(element.sticky.container);

    element.sticky.rect = this.getRectangle(element);

    // fix when el is image that has not yet loaded and width, height = 0
    if (element.tagName.toLowerCase === 'img') {
      element.onload = function () {
        return element.sticky.rect = _this2.getRectangle(element);
      };
    }

    // activate rendered element
    this.activate(element);
  };

  /**
   * Activate element if breakpoint
   * @function
   * @param {node} element - Sticky element to be activated.
   */


  Sticky.prototype.activate = function activate(element) {
    if (element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
      element.sticky.active = true;
    }

    // this.addStyle(element, {
    //   '-webkit-transform': 'translate3d(0, 0, 0)',
    //   '-ms-transform': 'translate3d(0, 0, 0)',
    //   'transform': 'translate3d(0, 0, 0)',

    //   '-webkit-perspective': 1000,
    //   '-ms-perspective': 1000,
    //   'perspective': 1000,

    //   '-webkit-backface-visibility': 'hidden',
    //   'backface-visibility': 'hidden',
    // });

    this.elements.push(element);

    this.initResizeEvents(element);
    this.initScrollEvents(element);
  };

  Sticky.prototype.initResizeEvents = function initResizeEvents(element) {
    var _this3 = this;

    element.sticky.resizeListener = function () {
      return _this3.onResizeEvents(element);
    };
    window.addEventListener('resize', element.sticky.resizeListener);
  };

  Sticky.prototype.onResizeEvents = function onResizeEvents(element) {
    this.vp = this.getViewportSize();

    element.sticky.rect = this.getRectangle(element);
    element.sticky.container.rect = this.getRectangle(element.sticky.container);

    if (element.sticky.stickyFor < this.vp.width && !element.sticky.active) {
      element.sticky.active = true;
    } else if (element.sticky.stickyFor >= this.vp.width && element.sticky.active) {
      element.sticky.active = false;
    }

    this.setPosition(element);
  };

  Sticky.prototype.initScrollEvents = function initScrollEvents(element) {
    var _this4 = this;

    element.sticky.scrollListener = function () {
      return _this4.onScrollEvents(element);
    };
    window.addEventListener('scroll', element.sticky.scrollListener);
  };

  Sticky.prototype.onScrollEvents = function onScrollEvents(element) {
    this.scrollTop = this.getScrollTopPosition();

    if (element.sticky.active) {
      this.setPosition(element);
    }
  };

  /**
   * Function
   * @function
   * @param {node} element - Element which sticky container are looked for.
   * @return {node} element - Sticky container
   */


  Sticky.prototype.setPosition = function setPosition(element) {
    this.removeStyle(element, ['position', 'width', 'top', 'left']);

    if (this.vp.height < element.sticky.rect.height || !element.sticky.active) {
      return;
    }

    if (!element.sticky.rect.width) {
      element.sticky.rect = this.getRectangle(element);
    }

    if (this.scrollTop > element.sticky.rect.top - element.sticky.marginTop) {
      this.addStyle(element, {
        position: 'fixed',
        width: element.sticky.rect.width + 'px',
        left: element.sticky.rect.left + 'px'
      });

      if (this.scrollTop + element.sticky.rect.height + element.sticky.marginTop > element.sticky.container.rect.top + element.sticky.container.rect.height) {

        if (element.sticky.stickyClass) element.classList.remove(element.sticky.stickyClass);

        this.addStyle(element, {
          top: element.sticky.container.rect.top + element.sticky.container.rect.height - (this.scrollTop + element.sticky.rect.height) + 'px' });
      } else {
        if (element.sticky.stickyClass) element.classList.add(element.sticky.stickyClass);

        this.addStyle(element, { top: element.sticky.marginTop + 'px' });
      }
    } else {
      if (element.sticky.stickyClass) element.classList.remove(element.sticky.stickyClass);

      this.removeStyle(element, ['position', 'width', 'top', 'left']);
    }
  };

  /**
   * Function that updates element sticky rectangle (with parent container) and then update position;
   * @function
   */


  Sticky.prototype.update = function update() {
    var _this5 = this;

    this.forEach(this.elements, function (element) {
      element.sticky.rect = _this5.getRectangle(element);
      element.sticky.container.rect = _this5.getRectangle(element.sticky.container);

      _this5.setPosition(element);
    });
  };

  /**
   * Function that returns element in which sticky is stuck (if is not specified, then it is sticky document body);
   * @function
   * @param {node} element - Element which sticky container are looked for.
   * @return {node} element - Sticky container
   */


  Sticky.prototype.getStickyContainer = function getStickyContainer(element) {
    var container = element;

    while (!container.hasAttribute('data-sticky-container') && container !== document.querySelector('body')) {
      container = container.parentNode;
    }

    return container;
  };

  /**
   * Function that returns element rectangle & position (width, height, top, left).
   * @function
   * @param {node} element - Element which position & rectangle are calculated.
   * @return {object}
   */


  Sticky.prototype.getRectangle = function getRectangle(element) {
    this.removeStyle(element, ['position', 'width', 'top', 'left']);

    var top = 0;
    var left = 0;
    var width = 0;
    var height = 0;

    width = element.offsetWidth;
    height = element.offsetHeight;

    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return { top: top, left: left, width: width, height: height };
  };

  /**
   * Function that returns viewport dimensions in object.
   * @function
   * @return {object}
   */


  Sticky.prototype.getViewportSize = function getViewportSize() {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  };

  /**
   * Function that returns scroll top position in pixels.
   * @function
   * @return {number}
   */


  Sticky.prototype.getScrollTopPosition = function getScrollTopPosition() {
    return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0;
  };

  /**
   * Helper function for loops.
   * @helper
   * @param {array}
   * @param {function} callback - Callback function thaht will be invoked to every element from array.
   */


  Sticky.prototype.forEach = function forEach(array, callback) {
    for (var i = 0, len = array.length; i < len; i++) {
      callback(array[i]);
    }
  };

  /**
   * Helper function to easy add css properties to specified element.
   * @helper
   * @param {node} element - DOM element.
   * @param {object} properties - CSS properties that will be added to the specified element.
   */


  Sticky.prototype.addStyle = function addStyle(element, properties) {
    for (var property in properties) {
      if (properties.hasOwnProperty(property)) {
        element.style[property] = properties[property];
      }
    }
  };

  /**
   * Helper function to easy remove css properties from specified element.
   * @helper
   * @param {node} element - DOM element.
   * @param {object} properties - CSS properties that will be removed from the specified element.
   */


  Sticky.prototype.removeStyle = function removeStyle(element, properties) {
    this.forEach(properties, function (property) {
      element.style[property] = '';
    });
  };

  return Sticky;
}();

/**
 * Export function that supports AMD, CommonJS and Plain Browser.
 */


(function (root, factory) {
  if (typeof exports !== 'undefined') {
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.Sticky = factory;
  }
})(this, Sticky);