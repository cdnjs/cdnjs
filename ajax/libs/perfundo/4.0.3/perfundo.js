(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.perfundo = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var vanillaTouchwipe = createCommonjsModule(function (module, exports) {
(function (global, factory) {
  module.exports = factory();
}(commonjsGlobal, (function () { function ifDefined(obj, def) {
  return (typeof obj !== 'undefined') ? obj : def;
}

function touchwipe(domNode, settings) {
  settings = settings || {};

  var config = {
    min_move_x: ifDefined(settings.min_move_x, 20),
    min_move_y: ifDefined(settings.min_move_y, 20),
    wipeLeft: settings.wipeLeft || function() {},
    wipeRight: settings.wipeRight || function() {},
    wipeUp: settings.wipeUp || function() {},
    wipeDown: settings.wipeDown || function() {},
    preventDefaultEvents: ifDefined(settings.preventDefaultEvents, true)
  };

  var startX;
  var startY;
  var isMoving = false;

  function cancelTouch() {
    domNode.removeEventListener('touchmove', onTouchMove);
    startX = null;
    isMoving = false;
  }

  function onTouchMove(e) {
    if (config.preventDefaultEvents) {
      e.preventDefault();
    }
    if (isMoving) {
      var x = e.touches[0].pageX;
      var y = e.touches[0].pageY;
      var dx = startX - x;
      var dy = startY - y;
      if (Math.abs(dx) >= config.min_move_x) {
        cancelTouch();
        if (dx > 0) {
          config.wipeLeft(e);
        }
        else {
          config.wipeRight(e);
        }
      }
      else if (Math.abs(dy) >= config.min_move_y) {
        cancelTouch();
        if (dy > 0) {
          config.wipeDown(e);
        }
        else {
          config.wipeUp(e);
        }
      }
    }
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      isMoving = true;
      domNode.addEventListener('touchmove', onTouchMove);
    }
  }

  domNode.addEventListener('touchstart', onTouchStart);

  return {
    unbind: function() {
      domNode.removeEventListener('touchstart', onTouchStart);
    }
  };
}

return touchwipe;

})));
});

function configure(element, userOptions, defaultOptions) {
  return Object.keys(defaultOptions).reduce(function (options, key) {
    var attrValue = element.getAttribute("data-" + key.toLowerCase());

    // eslint-disable-next-line no-param-reassign
    if (attrValue !== null) options[key] = attrValue;
    // eslint-disable-next-line no-param-reassign
    else if (key in userOptions) options[key] = userOptions[key];
      // eslint-disable-next-line no-param-reassign
      else options[key] = defaultOptions[key];

    return options;
  }, {});
}

var defaultOptions = {
  disableHistory: false,
  swipe: true,
  keyboard: true,
  rootAttribute: "data-perfundo",
  classNames: {
    link: "js-perfundo-link",
    overlay: "js-perfundo-overlay",
    close: "js-perfundo-close",
    prev: "js-perfundo-prev",
    next: "js-perfundo-next",
    active: "is-active"
  }
};

function Perfundo(dependencies, target) {
  var _this = this;

  var userOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var configure = dependencies.configure,
      context = dependencies.context,
      defaultOptions = dependencies.defaultOptions,
      swipe = dependencies.swipe;

  var elements = typeof target === "string" ? context.querySelectorAll(target) : target;

  if (elements.length > 1) {
    return [].slice.call(elements).map(function (element) {
      return new Perfundo(dependencies, element, userOptions);
    });
  }

  this.context = context;
  this.element = elements[0] || elements;
  this.options = configure(this.element, userOptions, defaultOptions);
  this.hasPrev = this.element.querySelector("." + this.options.classNames.prev) !== null;
  this.hasNext = this.element.querySelector("." + this.options.classNames.next) !== null;

  this.element.setAttribute(this.options.rootAttribute, true);

  if (this.options.disableHistory) {
    this.element.addEventListener("click", function (e) {
      e.preventDefault();

      var open = e.target.classList.contains(_this.options.classNames.link) || e.target.parentElement.classList.contains(_this.options.classNames.link);
      var close = e.target.classList.contains(_this.options.classNames.close) || e.target.classList.contains(_this.options.classNames.overlay);
      var prev = e.target.classList.contains(_this.options.classNames.prev);
      var next = e.target.classList.contains(_this.options.classNames.next);

      if (open) _this.open();else if (close) _this.close();else if (prev) _this.prev();else if (next) _this.next();
    });
  }

  if (this.options.keyboard) {
    this.element.addEventListener("keyup", function (e) {
      if (_this.hasPrev && e.keyCode === 37) _this.prev();else if (_this.hasNext && e.keyCode === 39) _this.next();
    });
  }

  if (this.options.swipe) {
    swipe(this.element, {
      wipeLeft: function wipeLeft() {
        return _this.next();
      },
      wipeRight: function wipeRight() {
        return _this.prev();
      },
      preventDefaultEvents: this.options.disableHistory
    });
  }

  return this;
}

Perfundo.prototype.open = function open() {
  this.element.querySelector("." + this.options.classNames.link).focus();
  this.element.querySelector("." + this.options.classNames.overlay).classList.add(this.options.classNames.active);
};

Perfundo.prototype.close = function close() {
  this.element.querySelector("." + this.options.classNames.overlay).classList.remove(this.options.classNames.active);
};

Perfundo.prototype.prev = function prev() {
  try {
    var prevLink = this.element.querySelector("." + this.options.classNames.prev);
    var prevItem = this.context.querySelector("" + prevLink.getAttribute("href"));
    var prevRoot = this.getRootElement(prevItem);

    this.close();
    prevRoot.querySelector("." + this.options.classNames.link).click();
  } catch (e) {
    throw new Error("Previous item not found.");
  }
};

Perfundo.prototype.next = function next() {
  try {
    var nextLink = this.element.querySelector("." + this.options.classNames.next);
    var nextItem = this.context.querySelector("" + nextLink.getAttribute("href"));
    var nextRoot = this.getRootElement(nextItem);

    this.close();
    nextRoot.querySelector("." + this.options.classNames.link).click();
  } catch (e) {
    throw new Error("Next item not found.");
  }
};

Perfundo.prototype.getRootElement = function getRootElement(element) {
  var parent = element.parentElement;

  while (parent && parent !== this.context) {
    if (parent.hasAttribute(this.options.rootAttribute)) return parent;

    parent = parent.parentElement;
  }

  return null;
};

var index = (function (selector, userOptions) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  return new Perfundo({ configure: configure, context: context, defaultOptions: defaultOptions, swipe: vanillaTouchwipe }, selector, userOptions);
});

return index;

})));
