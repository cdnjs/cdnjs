/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.helpers.dimensions', []).factory('dimensions', [ '$document', '$window', function($document, $window) {
  var jqLite = angular.element;
  var fn = {};
  var nodeName = fn.nodeName = function(element, name) {
    return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
  };
  fn.css = function(element, prop, extra) {
    var value;
    if (element.currentStyle) {
      value = element.currentStyle[prop];
    } else if (window.getComputedStyle) {
      value = window.getComputedStyle(element)[prop];
    } else {
      value = element.style[prop];
    }
    return extra === true ? parseFloat(value) || 0 : value;
  };
  fn.offset = function(element) {
    var boxRect = element.getBoundingClientRect();
    var docElement = element.ownerDocument;
    return {
      width: boxRect.width || element.offsetWidth,
      height: boxRect.height || element.offsetHeight,
      top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
      left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
    };
  };
  fn.setOffset = function(element, options, i) {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = fn.css(element, 'position'), curElem = angular.element(element), props = {};
    if (position === 'static') {
      element.style.position = 'relative';
    }
    curOffset = fn.offset(element);
    curCSSTop = fn.css(element, 'top');
    curCSSLeft = fn.css(element, 'left');
    calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
    if (calculatePosition) {
      curPosition = fn.position(element);
      curTop = curPosition.top;
      curLeft = curPosition.left;
    } else {
      curTop = parseFloat(curCSSTop) || 0;
      curLeft = parseFloat(curCSSLeft) || 0;
    }
    if (angular.isFunction(options)) {
      options = options.call(element, i, curOffset);
    }
    if (options.top !== null) {
      props.top = options.top - curOffset.top + curTop;
    }
    if (options.left !== null) {
      props.left = options.left - curOffset.left + curLeft;
    }
    if ('using' in options) {
      options.using.call(curElem, props);
    } else {
      curElem.css({
        top: props.top + 'px',
        left: props.left + 'px'
      });
    }
  };
  fn.position = function(element) {
    var offsetParentRect = {
      top: 0,
      left: 0
    }, offsetParentElement, offset;
    if (fn.css(element, 'position') === 'fixed') {
      offset = element.getBoundingClientRect();
    } else {
      offsetParentElement = offsetParent(element);
      offset = fn.offset(element);
      if (!nodeName(offsetParentElement, 'html')) {
        offsetParentRect = fn.offset(offsetParentElement);
      }
      offsetParentRect.top += fn.css(offsetParentElement, 'borderTopWidth', true);
      offsetParentRect.left += fn.css(offsetParentElement, 'borderLeftWidth', true);
    }
    return {
      width: element.offsetWidth,
      height: element.offsetHeight,
      top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
      left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
    };
  };
  var offsetParent = function offsetParentElement(element) {
    var docElement = element.ownerDocument;
    var offsetParent = element.offsetParent || docElement;
    if (nodeName(offsetParent, '#document')) return docElement.documentElement;
    while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || docElement.documentElement;
  };
  fn.height = function(element, outer) {
    var value = element.offsetHeight;
    if (outer) {
      value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
    } else {
      value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
    }
    return value;
  };
  fn.width = function(element, outer) {
    var value = element.offsetWidth;
    if (outer) {
      value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
    } else {
      value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
    }
    return value;
  };
  return fn;
} ]);