'use client';
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');
var PrimeReact = require('primereact/api');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

var usePrevious = function usePrevious(newValue) {
  var ref = React__namespace.useRef(null);
  React__namespace.useEffect(function () {
    ref.current = newValue;
    return function () {
      ref.current = null;
    };
  }, [newValue]);
  return ref.current;
};

/* eslint-disable */
var useUnmountEffect = function useUnmountEffect(fn) {
  return React__namespace.useEffect(function () {
    return fn;
  }, []);
};
/* eslint-enable */

var useEventListener = function useEventListener(_ref) {
  var _ref$target = _ref.target,
    target = _ref$target === void 0 ? 'document' : _ref$target,
    type = _ref.type,
    listener = _ref.listener,
    options = _ref.options,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React__namespace.useRef(null);
  var listenerRef = React__namespace.useRef(null);
  var prevListener = usePrevious(listener);
  var prevOptions = usePrevious(options);
  var bind = function bind() {
    var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var bindTarget = bindOptions.target;
    if (utils.ObjectUtils.isNotEmpty(bindTarget)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = utils.DomHandler.getTargetElement(bindTarget));
    }
    if (!listenerRef.current && targetRef.current) {
      listenerRef.current = function (event) {
        return listener && listener(event);
      };
      targetRef.current.addEventListener(type, listenerRef.current, options);
    }
  };
  var unbind = function unbind() {
    if (listenerRef.current) {
      targetRef.current.removeEventListener(type, listenerRef.current, options);
      listenerRef.current = null;
    }
  };
  var dispose = function dispose() {
    unbind();
    // Prevent memory leak by releasing
    prevListener = null;
    prevOptions = null;
  };
  var updateTarget = React__namespace.useCallback(function () {
    if (when) {
      targetRef.current = utils.DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, when]);
  React__namespace.useEffect(function () {
    updateTarget();
  }, [updateTarget]);
  React__namespace.useEffect(function () {
    var listenerChanged = "".concat(prevListener) !== "".concat(listener);
    var optionsChanged = prevOptions !== options;
    var listenerExists = listenerRef.current;
    if (listenerExists && (listenerChanged || optionsChanged)) {
      unbind();
      when && bind();
    } else if (!listenerExists) {
      dispose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listener, options, when]);
  useUnmountEffect(function () {
    dispose();
  });
  return [bind, unbind];
};

var useClickOutside = function useClickOutside(ref, callback) {
  var isOutsideClicked = function isOutsideClicked(event) {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    callback(event);
  };
  var _useEventListener = useEventListener({
      type: 'mousedown',
      listener: isOutsideClicked
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindMouseDownListener = _useEventListener2[0],
    unbindMouseDownListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'touchstart',
      listener: isOutsideClicked
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindTouchStartListener = _useEventListener4[0],
    unbindTouchStartListener = _useEventListener4[1];
  React__namespace.useEffect(function () {
    if (!ref.current) {
      return;
    }
    bindMouseDownListener();
    bindTouchStartListener();
    return function () {
      unbindMouseDownListener();
      unbindTouchStartListener();
    };
  });
  return [ref, callback];
};

var useCounter = function useCounter() {
  var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    step: 1
  };
  var _React$useState = React__namespace.useState(initialValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    count = _React$useState2[0],
    setCount = _React$useState2[1];
  var increment = function increment() {
    if (options.max && count >= options.max) {
      return;
    }
    setCount(count + options.step);
  };
  var decrement = function decrement() {
    if (options.min || options.min === 0 && count <= options.min) {
      return null;
    }
    setCount(count - options.step);
  };
  var reset = function reset() {
    setCount(0);
  };
  return {
    count: count,
    increment: increment,
    decrement: decrement,
    reset: reset
  };
};

var useDebounce = function useDebounce(initialValue, delay) {
  var _React$useState = React__namespace.useState(initialValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    inputValue = _React$useState2[0],
    setInputValue = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(initialValue),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    debouncedValue = _React$useState4[0],
    setDebouncedValue = _React$useState4[1];
  var mountedRef = React__namespace.useRef(false);
  var timeoutRef = React__namespace.useRef(null);
  var cancelTimer = function cancelTimer() {
    return window.clearTimeout(timeoutRef.current);
  };
  useMountEffect(function () {
    mountedRef.current = true;
  });
  useUnmountEffect(function () {
    cancelTimer();
  });
  React__namespace.useEffect(function () {
    if (!mountedRef.current) {
      return;
    }
    cancelTimer();
    timeoutRef.current = window.setTimeout(function () {
      setDebouncedValue(inputValue);
    }, delay);
  }, [inputValue, delay]);
  return [inputValue, debouncedValue, setInputValue];
};

var groupToDisplayedElements = {};
var useDisplayOrder = function useDisplayOrder(group) {
  var isVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _React$useState = React__namespace.useState(function () {
      return utils.UniqueComponentId();
    }),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    uid = _React$useState2[0];
  var _React$useState3 = React__namespace.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    displayOrder = _React$useState4[0],
    setDisplayOrder = _React$useState4[1];
  React__namespace.useEffect(function () {
    if (isVisible) {
      if (!groupToDisplayedElements[group]) {
        groupToDisplayedElements[group] = [];
      }
      var newDisplayOrder = groupToDisplayedElements[group].push(uid);
      setDisplayOrder(newDisplayOrder);
      return function () {
        delete groupToDisplayedElements[group][newDisplayOrder - 1];

        // Reduce array length, by removing undefined elements at the end of array:
        var lastIndex = groupToDisplayedElements[group].length - 1;
        var lastOrder = utils.ObjectUtils.findLastIndex(groupToDisplayedElements[group], function (el) {
          return el !== undefined;
        });
        if (lastOrder !== lastIndex) {
          groupToDisplayedElements[group].splice(lastOrder + 1);
        }
        setDisplayOrder(undefined);
      };
    }
  }, [group, uid, isVisible]);
  return displayOrder;
};

var TYPE_MAP = {
  ico: 'image/x-icon',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif'
};
var useFavicon = function useFavicon() {
  var newIcon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var rel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'shortcut icon';
  React__namespace.useLayoutEffect(function () {
    if (newIcon) {
      var linkElements = document.querySelectorAll("link[rel*='icon']");
      linkElements.forEach(function (linkEl) {
        document.head.removeChild(linkEl);
      });
      var link = document.createElement('link');
      link.setAttribute('type', TYPE_MAP[newIcon.split('.').pop()]);
      link.setAttribute('rel', rel);
      link.setAttribute('href', newIcon);
      document.head.appendChild(link);
    }
  }, [newIcon, rel]);
};

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

/**
 * Priorities of different components (bigger number handled first)
 */
var ESC_KEY_HANDLING_PRIORITIES = {
  SIDEBAR: 100,
  SLIDE_MENU: 200,
  DIALOG: 300,
  IMAGE: 400,
  MENU: 500,
  OVERLAY_PANEL: 600,
  PASSWORD: 700,
  CASCADE_SELECT: 800,
  SPLIT_BUTTON: 900,
  SPEED_DIAL: 1000,
  TOOLTIP: 1200
};

/**
 * Object, that manages global escape key handling logic
 */
var globalEscKeyHandlingLogic = {
  /**
   * Mapping from ESC_KEY_HANDLING_PRIORITY to array of related listeners, grouped by priority
   * @example
   * Map<{
   *     [ESC_KEY_HANDLING_PRIORITIES.SIDEBAR]: Map<{
   *         1: () => {...},
   *         2: () => {...}
   *     }>,
   *     [ESC_KEY_HANDLING_PRIORITIES.DIALOG]: Map<{
   *         1: () => {...},
   *         2: () => {...}
   *     }>
   * }>;
   */
  escKeyListeners: new Map(),
  /**
   * Keydown handler (attached to any keydown)
   */
  onGlobalKeyDown: function onGlobalKeyDown(event) {
    // Do nothing if not an "esc" key is pressed:
    if (event.code !== 'Escape') {
      return;
    }
    var escKeyListeners = globalEscKeyHandlingLogic.escKeyListeners;
    var maxPrimaryPriority = Math.max.apply(Math, _toConsumableArray(escKeyListeners.keys()));
    var theMostImportantEscHandlersSet = escKeyListeners.get(maxPrimaryPriority);
    var maxSecondaryPriority = Math.max.apply(Math, _toConsumableArray(theMostImportantEscHandlersSet.keys()));
    var theMostImportantEscHandler = theMostImportantEscHandlersSet.get(maxSecondaryPriority);
    theMostImportantEscHandler(event);
  },
  /**
   * Attach global keydown listener if there are any "esc" key handlers assigned,
   * otherwise detach.
   */
  refreshGlobalKeyDownListener: function refreshGlobalKeyDownListener() {
    var document = utils.DomHandler.getTargetElement('document');
    if (this.escKeyListeners.size > 0) {
      document.addEventListener('keydown', this.onGlobalKeyDown);
    } else {
      document.removeEventListener('keydown', this.onGlobalKeyDown);
    }
  },
  /**
   * Add "Esc" key handler
   */
  addListener: function addListener(callback, _ref) {
    var _this = this;
    var _ref2 = _slicedToArray(_ref, 2),
      primaryPriority = _ref2[0],
      secondaryPriority = _ref2[1];
    var escKeyListeners = this.escKeyListeners;
    if (!escKeyListeners.has(primaryPriority)) {
      escKeyListeners.set(primaryPriority, new Map());
    }
    var primaryPriorityListeners = escKeyListeners.get(primaryPriority);

    // To prevent unexpected override of callback:
    if (primaryPriorityListeners.has(secondaryPriority)) {
      throw new Error("Unexpected: global esc key listener with priority [".concat(primaryPriority, ", ").concat(secondaryPriority, "] already exists."));
    }
    primaryPriorityListeners.set(secondaryPriority, callback);
    this.refreshGlobalKeyDownListener();
    return function () {
      primaryPriorityListeners["delete"](secondaryPriority);
      if (primaryPriorityListeners.size === 0) {
        escKeyListeners["delete"](primaryPriority);
      }
      _this.refreshGlobalKeyDownListener();
    };
  }
};
var useGlobalOnEscapeKey = function useGlobalOnEscapeKey(_ref3) {
  var callback = _ref3.callback,
    when = _ref3.when,
    priority = _ref3.priority;
  React.useEffect(function () {
    if (!when) {
      return;
    }
    return globalEscKeyHandlingLogic.addListener(callback, priority);
  }, [callback, when, priority]);
};

var useIntersectionObserver = function useIntersectionObserver(ref) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isElementVisible = _React$useState2[0],
    setIsElementVisible = _React$useState2[1];
  React__namespace.useEffect(function () {
    if (!ref.current) {
      return;
    }
    var observer = new IntersectionObserver(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        entry = _ref2[0];
      setIsElementVisible(entry.isIntersecting);
    }, options);
    observer.observe(ref.current);
    return function () {
      observer.disconnect();
    };
  }, [options, ref]);
  return isElementVisible;
};

/* eslint-disable */
var useInterval = function useInterval(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeout = React__namespace.useRef(null);
  var savedCallback = React__namespace.useRef(null);
  var clear = React__namespace.useCallback(function () {
    return clearInterval(timeout.current);
  }, [timeout.current]);
  React__namespace.useEffect(function () {
    savedCallback.current = fn;
  });
  React__namespace.useEffect(function () {
    function callback() {
      savedCallback.current();
    }
    if (when) {
      timeout.current = setInterval(callback, delay);
      return clear;
    } else {
      clear();
    }
  }, [delay, when]);
  useUnmountEffect(function () {
    clear();
  });
  return [clear];
};
/* eslint-enable */

var useMatchMedia = function useMatchMedia(query) {
  var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    matches = _React$useState2[0],
    setMatches = _React$useState2[1];
  var matchMedia = React__namespace.useRef(null);
  var handleChange = function handleChange(e) {
    return setMatches(e.matches);
  };
  var bind = function bind() {
    return matchMedia.current && matchMedia.current.addEventListener('change', handleChange);
  };
  var unbind = function unbind() {
    return matchMedia.current && matchMedia.current.removeEventListener('change', handleChange) && (matchMedia.current = null);
  };
  React__namespace.useEffect(function () {
    if (when) {
      matchMedia.current = window.matchMedia(query);
      setMatches(matchMedia.current.matches);
      bind();
    }
    return unbind;
  }, [query, when]);
  return matches;
};
/* eslint-enable */

/**
 * Hook to merge properties including custom merge function for things like Tailwind merge.
 */
var useMergeProps = function useMergeProps() {
  var context = React.useContext(PrimeReact.PrimeReactContext);
  return function () {
    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }
    return utils.mergeProps(props, context === null || context === void 0 ? void 0 : context.ptOptions);
  };
};

/* eslint-disable */

/**
 * Custom hook to run a mount effect only once.
 * @param {*} fn the callback function
 * @returns the hook
 */
var useMountEffect = function useMountEffect(fn) {
  var mounted = React__namespace.useRef(false);
  return React__namespace.useEffect(function () {
    if (!mounted.current) {
      mounted.current = true;
      return fn && fn();
    }
  }, []);
};
/* eslint-enable */

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var useMouse = function useMouse() {
  var _React$useState = React__namespace.useState({
      x: 0,
      y: 0
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    position = _React$useState2[0],
    setPosition = _React$useState2[1];
  var ref = React__namespace.useRef(null);
  var handleMouseMove = React__namespace.useCallback(function (event) {
    var x;
    var y;
    if (ref.current) {
      var rect = event.currentTarget.getBoundingClientRect();
      x = event.pageX - rect.left - (window.pageXOffset || window.scrollX);
      y = event.pageY - rect.top - (window.pageYOffset || window.scrollY);
    } else {
      x = event.clientX;
      y = event.clientY;
    }
    setPosition({
      x: Math.max(0, Math.round(x)),
      y: Math.max(0, Math.round(y))
    });
  }, []);
  var _useEventListener = useEventListener({
      target: ref,
      type: 'mousemove',
      listener: handleMouseMove
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindMouseMoveEventListener = _useEventListener2[0],
    unbindMouseMoveEventListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mousemove',
      listener: handleMouseMove
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMoveEventListener = _useEventListener4[0],
    unbindDocumentMoveEventListener = _useEventListener4[1];
  var reset = function reset() {
    return setPosition({
      x: 0,
      y: 0
    });
  };
  React__namespace.useEffect(function () {
    bindMouseMoveEventListener();
    if (!ref.current) {
      bindDocumentMoveEventListener();
    }
    return function () {
      unbindMouseMoveEventListener();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (!ref.current) {
        unbindDocumentMoveEventListener();
      }
    };
  }, [bindDocumentMoveEventListener, bindMouseMoveEventListener, unbindDocumentMoveEventListener, unbindMouseMoveEventListener]);
  return _objectSpread$1(_objectSpread$1({
    ref: ref
  }, position), {}, {
    reset: reset
  });
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function useMove(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'both' : _ref$mode,
    _ref$initialValue = _ref.initialValue,
    initialValue = _ref$initialValue === void 0 ? {
      x: 0,
      y: 0
    } : _ref$initialValue;
  var _React$useState = React__namespace.useState(initialValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    positions = _React$useState2[0],
    setPositions = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    active = _React$useState4[0],
    setActive = _React$useState4[1];
  var isMounted = React__namespace.useRef(false);
  var isSliding = React__namespace.useRef(false);
  var ref = React__namespace.useRef(null);
  var onMouseMove = function onMouseMove(event) {
    return updateMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  var handlePositionChange = function handlePositionChange(_ref2) {
    var clampedX = _ref2.clampedX,
      clampedY = _ref2.clampedY;
    if (mode === 'vertical') {
      setPositions({
        y: 1 - clampedY
      });
    } else if (mode === 'horizontal') {
      setPositions({
        x: clampedX
      });
    } else if (mode === 'both') {
      setPositions({
        x: clampedX,
        y: clampedY
      });
    }
  };
  var onMouseDown = function onMouseDown(event) {
    startScrubbing();
    event.preventDefault();
    onMouseMove(event);
  };
  var stopScrubbing = function stopScrubbing() {
    if (isSliding.current && isMounted.current) {
      isSliding.current = false;
      setActive(false);
      unbindListeners();
    }
  };
  var onTouchMove = function onTouchMove(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    updateMousePosition({
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    });
  };
  var onTouchStart = function onTouchStart(event) {
    if (event.cancelable) {
      event.preventDefault();
    }
    startScrubbing();
    onTouchMove(event);
  };
  var _useEventListener = useEventListener({
      type: 'mousemove',
      listener: onMouseMove
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentMouseMoveListener = _useEventListener2[0],
    unbindDocumentMouseMoveListener = _useEventListener2[1];
  var _useEventListener3 = useEventListener({
      type: 'mouseup',
      listener: stopScrubbing
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindDocumentMouseUpListener = _useEventListener4[0],
    unbindDocumentMouseUpListener = _useEventListener4[1];
  var _useEventListener5 = useEventListener({
      type: 'touchmove',
      listener: onTouchMove
    }),
    _useEventListener6 = _slicedToArray(_useEventListener5, 2),
    bindDocumentTouchMoveListener = _useEventListener6[0],
    unbindDocumentTouchMoveListener = _useEventListener6[1];
  var _useEventListener7 = useEventListener({
      type: 'touchend',
      listener: stopScrubbing
    }),
    _useEventListener8 = _slicedToArray(_useEventListener7, 2),
    bindDocumentTouchEndListener = _useEventListener8[0],
    unbindDocumentTouchEndListener = _useEventListener8[1];
  var _useEventListener9 = useEventListener({
      target: ref,
      type: 'mousedown',
      listener: onMouseDown
    }),
    _useEventListener10 = _slicedToArray(_useEventListener9, 2),
    bindMouseDownListener = _useEventListener10[0],
    unbindMouseDownListener = _useEventListener10[1];
  var _useEventListener11 = useEventListener({
      target: ref,
      type: 'touchstart',
      listener: onTouchStart,
      options: {
        passive: false
      }
    }),
    _useEventListener12 = _slicedToArray(_useEventListener11, 2),
    bindTouchStartListener = _useEventListener12[0],
    unbindTouchStartListener = _useEventListener12[1];
  var clamp = function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  };
  var clampPositions = function clampPositions(_ref3) {
    var x = _ref3.x,
      y = _ref3.y;
    return {
      clampedX: clamp(x, 0, 1),
      clampedY: clamp(y, 0, 1)
    };
  };
  var bindListeners = function bindListeners() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
    bindDocumentTouchMoveListener();
    bindDocumentTouchEndListener();
  };
  var unbindListeners = function unbindListeners() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
    unbindDocumentTouchMoveListener();
    unbindDocumentTouchEndListener();
  };
  var reset = function reset() {
    setPositions(initialValue);
  };
  React__namespace.useEffect(function () {
    isMounted.current = true;
  }, []);
  var startScrubbing = function startScrubbing() {
    if (!isSliding.current && isMounted.current) {
      isSliding.current = true;
      setActive(true);
      bindListeners();
    }
  };
  var updateMousePosition = function updateMousePosition(_ref4) {
    var x = _ref4.x,
      y = _ref4.y;
    if (isSliding.current) {
      var rect = ref.current.getBoundingClientRect();
      var _clampPositions = clampPositions({
          x: (x - rect.left) / rect.width,
          y: (y - rect.top) / rect.height
        }),
        clampedX = _clampPositions.clampedX,
        clampedY = _clampPositions.clampedY;
      handlePositionChange({
        clampedX: clampedX,
        clampedY: clampedY
      });
    }
  };
  React__namespace.useEffect(function () {
    if (ref.current) {
      bindMouseDownListener();
      bindTouchStartListener();
    }
    return function () {
      if (ref.current) {
        unbindMouseDownListener();
        unbindTouchStartListener();
      }
    };
  }, [bindMouseDownListener, bindTouchStartListener, positions, unbindMouseDownListener, unbindTouchStartListener]);
  return _objectSpread(_objectSpread({
    ref: ref
  }, positions), {}, {
    active: active,
    reset: reset
  });
}

var useOverlayScrollListener = function useOverlayScrollListener(_ref) {
  var target = _ref.target,
    listener = _ref.listener,
    options = _ref.options,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
  var targetRef = React__namespace.useRef(null);
  var listenerRef = React__namespace.useRef(null);
  var scrollableParentsRef = React__namespace.useRef([]);
  var prevListener = usePrevious(listener);
  var prevOptions = usePrevious(options);
  var bind = function bind() {
    var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (utils.ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = utils.DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      var hideOnScroll = context ? context.hideOverlaysOnDocumentScrolling : PrimeReact__default["default"].hideOverlaysOnDocumentScrolling;
      var nodes = scrollableParentsRef.current = utils.DomHandler.getScrollableParents(targetRef.current);

      // Ensure window/body is always included as fallback
      if (!nodes.some(function (node) {
        return node === document.body || node === window;
      })) {
        nodes.push(hideOnScroll ? window : document.body);
      }
      listenerRef.current = function (event) {
        return listener && listener(event);
      };
      nodes.forEach(function (node) {
        return node.addEventListener('scroll', listenerRef.current, options);
      });
    }
  };
  var unbind = function unbind() {
    if (listenerRef.current) {
      var nodes = scrollableParentsRef.current;
      nodes.forEach(function (node) {
        return node.removeEventListener('scroll', listenerRef.current, options);
      });
      listenerRef.current = null;
    }
  };
  var dispose = function dispose() {
    unbind();
    // #5927 prevent memory leak by releasing
    scrollableParentsRef.current = null;
    prevListener = null;
    prevOptions = null;
  };
  var updateTarget = React__namespace.useCallback(function () {
    if (when) {
      targetRef.current = utils.DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, when]);
  React__namespace.useEffect(function () {
    updateTarget();
  }, [updateTarget]);
  React__namespace.useEffect(function () {
    var listenerChanged = "".concat(prevListener) !== "".concat(listener);
    var optionsChanged = prevOptions !== options;
    var listenerExists = listenerRef.current;
    if (listenerExists && (listenerChanged || optionsChanged)) {
      unbind();
      when && bind();
    } else if (!listenerExists) {
      dispose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listener, options, when]);
  useUnmountEffect(function () {
    dispose();
  });
  return [bind, unbind];
};

var useResizeListener = function useResizeListener(_ref) {
  var listener = _ref.listener,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  return useEventListener({
    target: 'window',
    type: 'resize',
    listener: listener,
    when: when
  });
};

var useOverlayListener = function useOverlayListener(_ref) {
  var target = _ref.target,
    overlay = _ref.overlay,
    _listener = _ref.listener,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'click' : _ref$type;
  var targetRef = React__namespace.useRef(null);
  var overlayRef = React__namespace.useRef(null);

  /**
   * The parameters of the 'listener' method in the following event handlers;
   * @param {Event} event A click event of the document.
   * @param {string} options.type The custom type to detect event.
   * @param {boolean} options.valid It is controlled by PrimeReact. It is determined whether it is valid or not according to some custom validation.
   */
  var _useEventListener = useEventListener({
      target: 'window',
      type: type,
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'outside',
          valid: event.which !== 3 && isOutsideClicked(event)
        });
      },
      when: when
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var _useResizeListener = useResizeListener({
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'resize',
          valid: !utils.DomHandler.isTouchDevice()
        });
      },
      when: when
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindWindowResizeListener = _useResizeListener2[0],
    unbindWindowResizeListener = _useResizeListener2[1];
  var _useEventListener3 = useEventListener({
      target: 'window',
      type: 'orientationchange',
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'orientationchange',
          valid: true
        });
      },
      when: when
    }),
    _useEventListener4 = _slicedToArray(_useEventListener3, 2),
    bindWindowOrientationChangeListener = _useEventListener4[0],
    unbindWindowOrientationChangeListener = _useEventListener4[1];
  var _useOverlayScrollList = useOverlayScrollListener({
      target: target,
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'scroll',
          valid: true
        });
      },
      when: when
    }),
    _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2),
    bindOverlayScrollListener = _useOverlayScrollList2[0],
    unbindOverlayScrollListener = _useOverlayScrollList2[1];
  var isOutsideClicked = function isOutsideClicked(event) {
    return targetRef.current && !(targetRef.current.isSameNode(event.target) || targetRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
  };
  var bind = function bind() {
    bindDocumentClickListener();
    bindWindowResizeListener();
    bindWindowOrientationChangeListener();
    bindOverlayScrollListener();
  };
  var unbind = function unbind() {
    unbindDocumentClickListener();
    unbindWindowResizeListener();
    unbindWindowOrientationChangeListener();
    unbindOverlayScrollListener();
  };
  React__namespace.useEffect(function () {
    if (when) {
      targetRef.current = utils.DomHandler.getTargetElement(target);
      overlayRef.current = utils.DomHandler.getTargetElement(overlay);
    } else {
      unbind();
      targetRef.current = overlayRef.current = null;
    }
  }, [target, overlay, when]);
  useUnmountEffect(function () {
    unbind();
  });
  return [bind, unbind];
};
/* eslint-enable */

/**
 * Hook to wrap around useState that stores the value in the browser local/session storage.
 *
 * @param {any} initialValue the initial value to store
 * @param {string} key the key to store the value in local/session storage
 * @param {string} storage either 'local' or 'session' for what type of storage
 * @returns a stateful value, and a function to update it.
 */
var useStorage = function useStorage(initialValue, key) {
  var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'local';
  // Since the local storage API isn't available in server-rendering environments,
  // we check that typeof window !== 'undefined' to make SSR and SSG work properly.
  var storageAvailable = typeof window !== 'undefined';

  // subscribe to window storage event so changes in one tab to a stored value
  // are properly reflected in all tabs
  var _useEventListener = useEventListener({
      target: 'window',
      type: 'storage',
      listener: function listener(event) {
        var area = storage === 'local' ? window.localStorage : window.sessionStorage;
        if (event.storageArea === area && event.key === key) {
          var newValue = event.newValue ? JSON.parse(event.newValue) : undefined;
          setStoredValue(newValue);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindWindowStorageListener = _useEventListener2[0],
    unbindWindowStorageListener = _useEventListener2[1];
  var _React$useState = React__namespace.useState(initialValue),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    storedValue = _React$useState2[0],
    setStoredValue = _React$useState2[1];
  var setValue = function setValue(value) {
    try {
      // Allow value to be a function so we have same API as useState
      var valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (storageAvailable) {
        var serializedValue = JSON.stringify(valueToStore);
        storage === 'local' ? window.localStorage.setItem(key, serializedValue) : window.sessionStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      throw new Error("PrimeReact useStorage: Failed to serialize the value at key: ".concat(key));
    }
  };
  React__namespace.useEffect(function () {
    if (!storageAvailable) {
      setStoredValue(initialValue);
    }
    try {
      var item = storage === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      // If error also return initialValue
      setStoredValue(initialValue);
    }
    bindWindowStorageListener();
    return function () {
      return unbindWindowStorageListener();
    };
  }, []);
  return [storedValue, setValue];
};

/**
 * Hook to wrap around useState that stores the value in the browser local storage.
 *
 * @param {any} initialValue the initial value to store
 * @param {string} key the key to store the value in local storage
 * @returns a stateful value, and a function to update it.
 */
var useLocalStorage = function useLocalStorage(initialValue, key) {
  return useStorage(initialValue, key, 'local');
};

/**
 * Hook to wrap around useState that stores the value in the browser session storage.
 *
 * @param {any} initialValue the initial value to store
 * @param {string} key the key to store the value in session storage
 * @returns a stateful value, and a function to update it.
 */
var useSessionStorage = function useSessionStorage(initialValue, key) {
  return useStorage(initialValue, key, 'session');
};
/* eslint-enable */

var _id = 0;
var useStyle = function useStyle(css) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _useState = React.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoaded = _useState2[0],
    setIsLoaded = _useState2[1];
  var styleRef = React.useRef(null);
  var context = React.useContext(PrimeReact.PrimeReactContext);
  var defaultDocument = utils.DomHandler.isClient() ? window.document : undefined;
  var _options$document = options.document,
    document = _options$document === void 0 ? defaultDocument : _options$document,
    _options$manual = options.manual,
    manual = _options$manual === void 0 ? false : _options$manual,
    _options$name = options.name,
    name = _options$name === void 0 ? "style_".concat(++_id) : _options$name,
    _options$id = options.id,
    id = _options$id === void 0 ? undefined : _options$id,
    _options$media = options.media,
    media = _options$media === void 0 ? undefined : _options$media;
  var getCurrentStyleRef = function getCurrentStyleRef(styleContainer) {
    var existingStyle = styleContainer.querySelector("style[data-primereact-style-id=\"".concat(name, "\"]"));
    if (existingStyle) {
      return existingStyle;
    }
    if (id !== undefined) {
      var existingElement = document.getElementById(id);
      if (existingElement) {
        return existingElement;
      }
    }

    // finally if not found create the new style
    return document.createElement('style');
  };
  var update = function update(newCSS) {
    isLoaded && css !== newCSS && (styleRef.current.textContent = newCSS);
  };
  var load = function load() {
    if (!document || isLoaded) {
      return;
    }
    var styleContainer = (context === null || context === void 0 ? void 0 : context.styleContainer) || document.head;
    styleRef.current = getCurrentStyleRef(styleContainer);
    if (!styleRef.current.isConnected) {
      styleRef.current.type = 'text/css';
      if (id) {
        styleRef.current.id = id;
      }
      if (media) {
        styleRef.current.media = media;
      }
      utils.DomHandler.addNonce(styleRef.current, context && context.nonce || PrimeReact__default["default"].nonce);
      styleContainer.appendChild(styleRef.current);
      if (name) {
        styleRef.current.setAttribute('data-primereact-style-id', name);
      }
    }
    styleRef.current.textContent = css;
    setIsLoaded(true);
  };
  var unload = function unload() {
    if (!document || !styleRef.current) {
      return;
    }
    utils.DomHandler.removeInlineStyle(styleRef.current);
    setIsLoaded(false);
  };
  React.useEffect(function () {
    if (!manual) {
      load();
    }

    // return () => {if (!manual) unload()}; /* @todo */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual]);
  return {
    id: id,
    name: name,
    update: update,
    unload: unload,
    load: load,
    isLoaded: isLoaded
  };
};

/* eslint-disable */
var useTimeout = function useTimeout(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeout = React__namespace.useRef(null);
  var savedCallback = React__namespace.useRef(null);
  var clear = React__namespace.useCallback(function () {
    return clearTimeout(timeout.current);
  }, [timeout.current]);
  React__namespace.useEffect(function () {
    savedCallback.current = fn;
  });
  React__namespace.useEffect(function () {
    function callback() {
      savedCallback.current();
    }
    if (when) {
      timeout.current = setTimeout(callback, delay);
      return clear;
    } else {
      clear();
    }
  }, [delay, when]);
  useUnmountEffect(function () {
    clear();
  });
  return [clear];
};
/* eslint-enable */

/* eslint-disable */
var useUpdateEffect = function useUpdateEffect(fn, deps) {
  var mounted = React__namespace.useRef(false);
  return React__namespace.useEffect(function () {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn && fn();
  }, deps);
};
/* eslint-enable */

exports.ESC_KEY_HANDLING_PRIORITIES = ESC_KEY_HANDLING_PRIORITIES;
exports.useClickOutside = useClickOutside;
exports.useCounter = useCounter;
exports.useDebounce = useDebounce;
exports.useDisplayOrder = useDisplayOrder;
exports.useEventListener = useEventListener;
exports.useFavicon = useFavicon;
exports.useGlobalOnEscapeKey = useGlobalOnEscapeKey;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useInterval = useInterval;
exports.useLocalStorage = useLocalStorage;
exports.useMatchMedia = useMatchMedia;
exports.useMergeProps = useMergeProps;
exports.useMountEffect = useMountEffect;
exports.useMouse = useMouse;
exports.useMove = useMove;
exports.useOverlayListener = useOverlayListener;
exports.useOverlayScrollListener = useOverlayScrollListener;
exports.usePrevious = usePrevious;
exports.useResizeListener = useResizeListener;
exports.useSessionStorage = useSessionStorage;
exports.useStorage = useStorage;
exports.useStyle = useStyle;
exports.useTimeout = useTimeout;
exports.useUnmountEffect = useUnmountEffect;
exports.useUpdateEffect = useUpdateEffect;
