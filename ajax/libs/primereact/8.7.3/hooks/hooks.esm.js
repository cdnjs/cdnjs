import * as React from 'react';
import { DomHandler, ObjectUtils } from 'primereact/utils';

var usePrevious = function usePrevious(newValue) {
  var ref = React.useRef(undefined);
  React.useEffect(function () {
    ref.current = newValue;
  });
  return ref.current;
};

/* eslint-disable */
var useMountEffect = function useMountEffect(fn) {
  return React.useEffect(fn, []);
};
/* eslint-enable */

/* eslint-disable */
var useUpdateEffect = function useUpdateEffect(fn, deps) {
  var mounted = React.useRef(false);
  return React.useEffect(function () {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return fn && fn();
  }, deps);
};
/* eslint-enable */

/* eslint-disable */
var useUnmountEffect = function useUnmountEffect(fn) {
  return React.useEffect(function () {
    return fn;
  }, []);
};
/* eslint-enable */

/* eslint-disable */
var useEventListener = function useEventListener(_ref) {
  var _ref$target = _ref.target,
    target = _ref$target === void 0 ? 'document' : _ref$target,
    type = _ref.type,
    listener = _ref.listener,
    options = _ref.options,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var prevOptions = usePrevious(options);
  var bind = function bind() {
    var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
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
  React.useEffect(function () {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function () {
    if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options]);
  useUnmountEffect(function () {
    unbind();
  });
  return [bind, unbind];
};
/* eslint-enable */

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

/* eslint-disable */
var useOverlayScrollListener = function useOverlayScrollListener(_ref) {
  var target = _ref.target,
    listener = _ref.listener,
    options = _ref.options,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var listenerRef = React.useRef(null);
  var scrollableParents = React.useRef([]);
  var prevOptions = usePrevious(options);
  var bind = function bind() {
    var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (ObjectUtils.isNotEmpty(bindOptions.target)) {
      unbind();
      (bindOptions.when || when) && (targetRef.current = DomHandler.getTargetElement(bindOptions.target));
    }
    if (!listenerRef.current && targetRef.current) {
      var nodes = scrollableParents.current = DomHandler.getScrollableParents(targetRef.current);
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
      var nodes = scrollableParents.current;
      nodes.forEach(function (node) {
        return node.removeEventListener('scroll', listenerRef.current, options);
      });
      listenerRef.current = null;
    }
  };
  React.useEffect(function () {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
    } else {
      unbind();
      targetRef.current = null;
    }
  }, [target, when]);
  React.useEffect(function () {
    if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
      unbind();
      when && bind();
    }
  }, [listener, options]);
  useUnmountEffect(function () {
    unbind();
  });
  return [bind, unbind];
};
/* eslint-enable */

var useResizeListener = function useResizeListener(_ref) {
  var listener = _ref.listener;
  return useEventListener({
    target: 'window',
    type: 'resize',
    listener: listener
  });
};

var useOverlayListener = function useOverlayListener(_ref) {
  var target = _ref.target,
    overlay = _ref.overlay,
    _listener = _ref.listener,
    _ref$when = _ref.when,
    when = _ref$when === void 0 ? true : _ref$when;
  var targetRef = React.useRef(null);
  var overlayRef = React.useRef(null);

  /**
   * The parameters of the 'listener' method in the following event handlers;
   * @param {Event} event A click event of the document.
   * @param {string} options.type The custom type to detect event.
   * @param {boolean} options.valid It is controlled by PrimeReact. It is determined whether it is valid or not according to some custom validation.
   */
  var _useEventListener = useEventListener({
      type: 'click',
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'outside',
          valid: event.which !== 3 && isOutsideClicked(event)
        });
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindDocumentClickListener = _useEventListener2[0],
    unbindDocumentClickListener = _useEventListener2[1];
  var _useResizeListener = useResizeListener({
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'resize',
          valid: !DomHandler.isTouchDevice()
        });
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
    bindWindowResizeListener = _useResizeListener2[0],
    unbindWindowResizeListener = _useResizeListener2[1];
  var _useOverlayScrollList = useOverlayScrollListener({
      target: targetRef,
      listener: function listener(event) {
        _listener && _listener(event, {
          type: 'scroll',
          valid: true
        });
      }
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
    bindOverlayScrollListener();
  };
  var unbind = function unbind() {
    unbindDocumentClickListener();
    unbindWindowResizeListener();
    unbindOverlayScrollListener();
  };
  React.useEffect(function () {
    if (when) {
      targetRef.current = DomHandler.getTargetElement(target);
      overlayRef.current = DomHandler.getTargetElement(overlay);
    } else {
      unbind();
      targetRef.current = overlayRef.current = null;
    }
  }, [target, overlay, when]);
  React.useEffect(function () {
    unbind();
    // when && bind();
  }, [when]);
  useUnmountEffect(function () {
    unbind();
  });
  return [bind, unbind];
};
/* eslint-enable */

/* eslint-disable */
var useInterval = function useInterval(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeout = React.useRef(null);
  var savedCallback = React.useRef(null);
  var clear = React.useCallback(function () {
    return clearInterval(timeout.current);
  }, [timeout.current]);
  React.useEffect(function () {
    savedCallback.current = fn;
  });
  React.useEffect(function () {
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
          setStoredValue(event.newValue || undefined);
        }
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 2),
    bindWindowStorageListener = _useEventListener2[0],
    unbindWindowStorageListener = _useEventListener2[1];
  var _React$useState = React.useState(function () {
      if (!storageAvailable) {
        return initialValue;
      }
      try {
        var item = storage === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        return initialValue;
      }
    }),
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
  React.useEffect(function () {
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

/* eslint-disable */
var useTimeout = function useTimeout(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var timeout = React.useRef(null);
  var savedCallback = React.useRef(null);
  var clear = React.useCallback(function () {
    return clearTimeout(timeout.current);
  }, [timeout.current]);
  React.useEffect(function () {
    savedCallback.current = fn;
  });
  React.useEffect(function () {
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

export { useEventListener, useInterval, useLocalStorage, useMountEffect, useOverlayListener, useOverlayScrollListener, usePrevious, useResizeListener, useSessionStorage, useStorage, useTimeout, useUnmountEffect, useUpdateEffect };
