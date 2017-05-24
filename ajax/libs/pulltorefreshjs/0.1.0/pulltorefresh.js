(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.PullToRefresh = factory());
}(this, (function () {

function _closestElement(node, selector) {
  var depth = 10;

  do {
    if (!(node && node.tagName) || !depth) {
      return null;
    }

    if (node.tagName && node.tagName === selector.toUpperCase()) {
      return node;
    }

    if (selector.charAt() === '#' && node.id === selector.substr(1)) {
      return node;
    }

    if (selector.charAt() === '.' && node.classList.contains(selector.substr(1))) {
      return node;
    }

    depth -= 1;

    node = node.parentNode;
  } while (node.parentNode);
}

var _ptrMarkup = function(){return "<div class=\"__PREFIX__box\">\n  <div class=\"__PREFIX__content\">\n    <div class=\"__PREFIX__icon\"></div>\n    <div class=\"__PREFIX__text\"></div>\n  </div>\n</div>";};

var _ptrStyles = function(){return ".__PREFIX__ptr {\n  box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.12);\n  pointer-events: none;\n  font-size: 0.85em;\n  font-weight: bold;\n  top: 0;\n  height: 0;\n  transition: height 0.3s, min-height 0.3s;\n  text-align: center;\n  width: 100%;\n  overflow: hidden;\n  display: flex;\n  align-items: flex-end;\n  align-content: stretch;\n}\n.__PREFIX__box {\n  padding: 10px;\n  flex-basis: 100%;\n}\n.__PREFIX__pull {\n  transition: none;\n}\n.__PREFIX__text {\n  margin-top: .33em;\n  color: rgba(0, 0, 0, 0.3);\n}\n.__PREFIX__icon {\n  color: rgba(0, 0, 0, 0.3);\n  transition: transform .3s;\n}\n.__PREFIX__release .__PREFIX__icon {\n  transform: rotate(180deg);\n}";};

/*
*/

/* eslint-disable import/no-unresolved */

var _SETTINGS = {};

var _defaults = {
  distThreshold: 60,
  distMax: 80,
  distReload: 50,
  bodyOffset: 20,
  mainElement: 'body',
  triggerElement: 'body',
  ptrElement: '.ptr',
  classPrefix: 'ptr--',
  cssProp: 'min-height',
  iconArrow: '&#8675;',
  iconRefreshing: '&hellip;',
  instructionsPullToRefresh: 'Pull down to refresh',
  instructionsReleaseToRefresh: 'Release to refresh',
  instructionsRefreshing: 'Refreshing',
  refreshTimeout: 500,
  getMarkup: _ptrMarkup,
  getStyles: _ptrStyles,
  onInit: function () {},
  onRefresh: function () { return location.reload(); },
  resistanceFunction: function (t) { return Math.min(1, t / 2.5); },
};

var pullStartY = null;
var pullMoveY = null;
var dist = 0;
var distResisted = 0;

var _state = 'pending';
var _setup = false;
var _enable = false;
var _timeout;

function _update() {
  var classPrefix = _SETTINGS.classPrefix;
  var ptrElement = _SETTINGS.ptrElement;
  var iconArrow = _SETTINGS.iconArrow;
  var iconRefreshing = _SETTINGS.iconRefreshing;
  var instructionsRefreshing = _SETTINGS.instructionsRefreshing;
  var instructionsPullToRefresh = _SETTINGS.instructionsPullToRefresh;
  var instructionsReleaseToRefresh = _SETTINGS.instructionsReleaseToRefresh;

  var iconEl = ptrElement.querySelector(("." + classPrefix + "icon"));
  var textEl = ptrElement.querySelector(("." + classPrefix + "text"));

  if (_state === 'refreshing') {
    iconEl.innerHTML = iconRefreshing;
  } else {
    iconEl.innerHTML = iconArrow;
  }

  if (_state === 'releasing') {
    textEl.innerHTML = instructionsReleaseToRefresh;
  }

  if (_state === 'pulling' || _state === 'pending') {
    textEl.innerHTML = instructionsPullToRefresh;
  }

  if (_state === 'refreshing') {
    textEl.innerHTML = instructionsRefreshing;
  }
}

function _setupEvents() {
  var classPrefix = _SETTINGS.classPrefix;

  function onReset() {
    var cssProp = _SETTINGS.cssProp;
    var ptrElement = _SETTINGS.ptrElement;

    ptrElement.classList.remove((classPrefix + "refresh"));
    ptrElement.style[cssProp] = '0px';

    _state = 'pending';
  }

  window.addEventListener('touchstart', function (e) {
    var triggerElement = _SETTINGS.triggerElement;

    if (_state !== 'pending') {
      return;
    }

    clearTimeout(_timeout);

    if (!window.scrollY) {
      pullStartY = e.touches[0].screenY;
    }

    _enable = _closestElement(e.target, triggerElement);
    _state = 'pending';
    _update();
  });

  window.addEventListener('touchmove', function (e) {
    var ptrElement = _SETTINGS.ptrElement;
    var resistanceFunction = _SETTINGS.resistanceFunction;
    var distMax = _SETTINGS.distMax;
    var distThreshold = _SETTINGS.distThreshold;
    var cssProp = _SETTINGS.cssProp;

    if (!_enable || _state === 'refreshing') {
      return;
    }

    if (!pullStartY) {
      if (!window.scrollY) {
        pullStartY = e.touches[0].screenY;
      }
    } else {
      pullMoveY = e.touches[0].screenY;
    }

    if (_state === 'pending') {
      ptrElement.classList.add((classPrefix + "pull"));
      _state = 'pulling';
      _update();
    }

    if (pullStartY && pullMoveY) {
      dist = pullMoveY - pullStartY;
    }

    if (dist > 0) {
      e.preventDefault();

      ptrElement.style[cssProp] = distResisted + "px";

      distResisted = resistanceFunction(dist / distThreshold)
        * Math.min(distMax, dist);

      if (_state === 'pulling' && distResisted > distThreshold) {
        ptrElement.classList.add((classPrefix + "release"));
        _state = 'releasing';
        _update();
      }

      if (_state === 'releasing' && distResisted < distThreshold) {
        ptrElement.classList.remove((classPrefix + "release"));
        _state = 'pulling';
        _update();
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', function () {
    var ptrElement = _SETTINGS.ptrElement;
    var onRefresh = _SETTINGS.onRefresh;
    var refreshTimeout = _SETTINGS.refreshTimeout;
    var distThreshold = _SETTINGS.distThreshold;
    var distReload = _SETTINGS.distReload;
    var cssProp = _SETTINGS.cssProp;

    if (_state === 'releasing' && distResisted > distThreshold) {
      _state = 'refreshing';

      ptrElement.style[cssProp] = distReload + "px";
      ptrElement.classList.add((classPrefix + "refresh"));

      _timeout = setTimeout(function () {
        var retval = onRefresh(onReset);

        if (retval && typeof retval.then === 'function') {
          retval.then(function () { return onReset(); });
        }

        if (!retval && !onRefresh.length) {
          onReset();
        }
      }, refreshTimeout);
    } else {
      if (_state === 'refreshing') {
        return;
      }

      ptrElement.style[cssProp] = '0px';

      _state = 'pending';
    }

    _update();

    ptrElement.classList.remove((classPrefix + "release"));
    ptrElement.classList.remove((classPrefix + "pull"));

    pullStartY = pullMoveY = null;
    dist = distResisted = 0;
  });
}

function _run() {
  var mainElement = _SETTINGS.mainElement;
  var getMarkup = _SETTINGS.getMarkup;
  var getStyles = _SETTINGS.getStyles;
  var classPrefix = _SETTINGS.classPrefix;
  var onInit = _SETTINGS.onInit;

  if (!_SETTINGS.ptrElement) {
    var ptr = document.createElement('div');

    if (mainElement !== document.body) {
      mainElement.parentNode.insertBefore(ptr, mainElement);
    } else {
      document.body.insertBefore(ptr, document.body.firstChild);
    }

    ptr.classList.add((classPrefix + "ptr"));
    ptr.innerHTML = getMarkup()
      .replace(/__PREFIX__/g, classPrefix);

    _SETTINGS.ptrElement = ptr;
  }

  var styleEl = document.createElement('style');

  styleEl.innerText = getStyles()
    .replace(/__PREFIX__/g, classPrefix)
    .replace(/\s+/g, ' ');

  document.head.appendChild(styleEl);

  if (typeof onInit === 'function') {
    onInit(_SETTINGS);
  }
}

var pulltorefresh = {
  init: function init(options) {
    if ( options === void 0 ) options = {};

    Object.keys(_defaults).forEach(function (key) {
      _SETTINGS[key] = options[key] || _defaults[key];
    });

    if (typeof _SETTINGS.mainElement === 'string') {
      _SETTINGS.mainElement = document.querySelector(_SETTINGS.mainElement);
    }

    if (typeof _SETTINGS.ptrElement === 'string') {
      _SETTINGS.ptrElement = document.querySelector(_SETTINGS.ptrElement);
    }

    if (!_setup) {
      _setupEvents();
      _setup = true;
    }

    _run();
  },
};

return pulltorefresh;

})));
