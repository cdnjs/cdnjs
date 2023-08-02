this.primereact = this.primereact || {};
this.primereact.deferredcontent = (function (exports, React, hooks, componentbase, utils, api) {
  'use strict';

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
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
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
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var DeferredContentBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'DeferredContent',
      onload: null,
      children: undefined
    }
  });

  var DeferredContent = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = DeferredContentBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      loadedState = _React$useState2[0],
      setLoadedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var _useEventListener = hooks.useEventListener({
        target: 'window',
        type: 'scroll',
        listener: function listener() {
          if (shouldLoad()) {
            load();
            unbindScrollListener();
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindScrollListener = _useEventListener2[0],
      unbindScrollListener = _useEventListener2[1];
    var _DeferredContentBase$ = DeferredContentBase.setMetaData({
        props: props,
        state: {
          loaded: loadedState
        }
      }),
      ptm = _DeferredContentBase$.ptm;
    var shouldLoad = function shouldLoad() {
      if (loadedState) {
        return false;
      } else {
        var rect = elementRef.current.getBoundingClientRect();
        var winHeight = document.documentElement.clientHeight;
        return winHeight >= rect.top;
      }
    };
    var load = function load(event) {
      setLoadedState(true);
      props.onLoad && props.onLoad(event);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useMountEffect(function () {
      if (!loadedState) {
        shouldLoad() ? load() : bindScrollListener();
      }
    });
    var rootProps = utils.mergeProps({
      ref: elementRef
    }, DeferredContentBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, loadedState && props.children);
  });
  DeferredContent.displayName = 'DeferredContent';

  exports.DeferredContent = DeferredContent;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.componentbase, primereact.utils, primereact.api);
