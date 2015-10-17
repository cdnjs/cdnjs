/*!
 * headhesive v1.1.1 - An on-demand sticky header
 * Url: http://markgoodyear.com/labs/headhesive
 * Copyright (c) Mark Goodyear — @markgdyr — http://markgoodyear.com
 * License: MIT
 */
(function(window, document, undefined) {
  "use strict";
  var _mergeObj = function(to, from) {
    for (var p in from) {
      if (from.hasOwnProperty(p)) {
        to[p] = typeof from[p] === "object" ? _mergeObj(to[p], from[p]) : from[p];
      }
    }
    return to;
  };
  var _throttle = function(func, wait) {
    var _now = Date.now || function() {
      return new Date().getTime();
    };
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
      previous = _now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _now();
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  var _getScrollY = function() {
    return window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  };
  function _getElemY(elem) {
    var top = 0;
    while (elem) {
      top += elem.offsetTop;
      elem = elem.offsetParent;
    }
    return top;
  }
  var Headhesive = function(elem, options) {
    if (!("querySelector" in document && "addEventListener" in window)) {
      return;
    }
    this.visible = false;
    this.options = {
      offset: 300,
      classes: {
        clone: "headhesive",
        stick: "headhesive--stick",
        unstick: "headhesive--unstick"
      },
      throttle: 250,
      onInit: function() {},
      onStick: function() {},
      onUnstick: function() {},
      onDestroy: function() {}
    };
    this.elem = typeof elem === "string" ? document.querySelector(elem) : elem;
    this.options = _mergeObj(this.options, options);
    this.init();
  };
  Headhesive.prototype = {
    constructor: Headhesive,
    init: function() {
      this.clonedElem = this.elem.cloneNode(true);
      this.clonedElem.className += " " + this.options.classes.clone;
      document.body.insertBefore(this.clonedElem, document.body.firstChild);
      if (typeof this.options.offset === "number") {
        this.scrollOffset = this.options.offset;
      } else if (typeof this.options.offset === "string") {
        this.scrollOffset = _getElemY(document.querySelector(this.options.offset));
      } else {
        throw new Error("Invalid offset: " + this.options.offset);
      }
      this._throttleUpdate = _throttle(this.update.bind(this), this.options.throttle);
      window.addEventListener("scroll", this._throttleUpdate, false);
      this.options.onInit.call(this);
    },
    destroy: function() {
      document.body.removeChild(this.clonedElem);
      window.removeEventListener("scroll", this._throttleUpdate);
      this.options.onDestroy.call(this);
    },
    stick: function() {
      if (!this.visible) {
        this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), "");
        this.clonedElem.className += " " + this.options.classes.stick;
        this.visible = true;
        this.options.onStick.call(this);
      }
    },
    unstick: function() {
      if (this.visible) {
        this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), "");
        this.clonedElem.className += " " + this.options.classes.unstick;
        this.visible = false;
        this.options.onUnstick.call(this);
      }
    },
    update: function() {
      if (_getScrollY() > this.scrollOffset) {
        this.stick();
      } else {
        this.unstick();
      }
    }
  };
  window.Headhesive = Headhesive;
})(window, document);