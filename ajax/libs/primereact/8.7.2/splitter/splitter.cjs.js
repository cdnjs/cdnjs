'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('primereact/hooks');
var utils = require('primereact/utils');

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

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SplitterPanel = function SplitterPanel() {};
var Splitter = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var elementRef = React__namespace.useRef(null);
  var gutterRef = React__namespace.useRef();
  var gutterRefs = React__namespace.useRef({});
  var size = React__namespace.useRef(null);
  var dragging = React__namespace.useRef(null);
  var startPos = React__namespace.useRef(null);
  var prevPanelElement = React__namespace.useRef(null);
  var nextPanelElement = React__namespace.useRef(null);
  var prevPanelSize = React__namespace.useRef(null);
  var prevPanelSizeNew = React__namespace.useRef(null);
  var nextPanelSize = React__namespace.useRef(null);
  var nextPanelSizeNew = React__namespace.useRef(null);
  var prevPanelIndex = React__namespace.useRef(null);

  var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      panelSizes = _React$useState2[0],
      setPanelSizes = _React$useState2[1];

  var isStateful = props.stateKey != null;
  var childrenLength = props.children && props.children.length;

  var panelSize = function panelSize(sizes, index) {
    return index in sizes ? sizes[index] : (props.children[index] && props.children[index].props.size || 100) / childrenLength;
  };

  var _useEventListener = hooks.useEventListener({
    type: 'mousemove',
    listener: function listener(event) {
      return onResize(event);
    }
  }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentMouseMoveListener = _useEventListener2[0],
      unbindDocumentMouseMoveListener = _useEventListener2[1];

  var _useEventListener3 = hooks.useEventListener({
    type: 'mouseup',
    listener: function listener(event) {
      onResizeEnd(event);
      unbindMouseListeners();
    }
  }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentMouseUpListener = _useEventListener4[0],
      unbindDocumentMouseUpListener = _useEventListener4[1];

  var bindMouseListeners = function bindMouseListeners() {
    bindDocumentMouseMoveListener();
    bindDocumentMouseUpListener();
  };

  var unbindMouseListeners = function unbindMouseListeners() {
    unbindDocumentMouseMoveListener();
    unbindDocumentMouseUpListener();
  };

  var validateResize = function validateResize(newPrevPanelSize, newNextPanelSize) {
    if (newPrevPanelSize > 100 || newPrevPanelSize < 0) return false;
    if (newNextPanelSize > 100 || newNextPanelSize < 0) return false;

    if (props.children[prevPanelIndex.current].props && props.children[prevPanelIndex.current].props.minSize && props.children[prevPanelIndex.current].props.minSize > newPrevPanelSize) {
      return false;
    }

    if (props.children[prevPanelIndex.current + 1].props && props.children[prevPanelIndex.current + 1].props.minSize && props.children[prevPanelIndex.current + 1].props.minSize > newNextPanelSize) {
      return false;
    }

    return true;
  };

  var clear = function clear() {
    dragging.current = false;
    size.current = null;
    startPos.current = null;
    prevPanelElement.current = null;
    nextPanelElement.current = null;
    prevPanelSize.current = null;
    prevPanelSizeNew.current = null;
    nextPanelSize.current = null;
    nextPanelSizeNew.current = null;
    prevPanelIndex.current = null;
  };

  var getStorage = React__namespace.useCallback(function () {
    switch (props.stateStorage) {
      case 'local':
        return window.localStorage;

      case 'session':
        return window.sessionStorage;

      default:
        throw new Error(props.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
    }
  }, [props.stateStorage]);

  var saveState = function saveState(sizes) {
    getStorage().setItem(props.stateKey, JSON.stringify(sizes));
  };

  var restoreState = React__namespace.useCallback(function () {
    var stateString = getStorage().getItem(props.stateKey);
    if (stateString) setPanelSizes(JSON.parse(stateString));
  }, [getStorage, props.stateKey]);

  var onResizeStart = function onResizeStart(event, index) {
    gutterRef.current = gutterRefs.current[index];
    var pageX = event.type === 'touchstart' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchstart' ? event.touches[0].pageY : event.pageY;
    size.current = props.layout === 'horizontal' ? utils.DomHandler.getWidth(elementRef.current) : utils.DomHandler.getHeight(elementRef.current);
    dragging.current = true;
    startPos.current = props.layout === 'horizontal' ? pageX : pageY;
    prevPanelElement.current = gutterRef.current.previousElementSibling;
    nextPanelElement.current = gutterRef.current.nextElementSibling;
    prevPanelSize.current = 100 * (props.layout === 'horizontal' ? utils.DomHandler.getOuterWidth(prevPanelElement.current, true) : utils.DomHandler.getOuterHeight(prevPanelElement.current, true)) / size.current;
    prevPanelSizeNew.current = prevPanelSize.current;
    nextPanelSize.current = 100 * (props.layout === 'horizontal' ? utils.DomHandler.getOuterWidth(nextPanelElement.current, true) : utils.DomHandler.getOuterHeight(nextPanelElement.current, true)) / size.current;
    nextPanelSizeNew.current = nextPanelSize.current;
    prevPanelIndex.current = index;
    utils.DomHandler.addClass(gutterRef.current, 'p-splitter-gutter-resizing');
    utils.DomHandler.addClass(elementRef.current, 'p-splitter-resizing');
  };

  var onResize = function onResize(event) {
    var newPos;
    var pageX = event.type === 'touchmove' ? event.touches[0].pageX : event.pageX;
    var pageY = event.type === 'touchmove' ? event.touches[0].pageY : event.pageY;
    if (props.layout === 'horizontal') newPos = pageX * 100 / size.current - startPos.current * 100 / size.current;else newPos = pageY * 100 / size.current - startPos.current * 100 / size.current;
    var newPrevPanelSize = prevPanelSize.current + newPos;
    var newNextPanelSize = nextPanelSize.current - newPos;

    if (validateResize(newPrevPanelSize, newNextPanelSize)) {
      prevPanelSizeNew.current = newPrevPanelSize;
      nextPanelSizeNew.current = newNextPanelSize;
      prevPanelElement.current.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
      nextPanelElement.current.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (props.children.length - 1) * props.gutterSize + 'px)';
    }
  };

  var onResizeEnd = function onResizeEnd(event) {
    setPanelSizes(function (prev) {
      var sizes = [];

      for (var index = 0; index < props.children.length; index++) {
        sizes[index] = panelSize(prev, index);
      }

      sizes[prevPanelIndex.current] = prevPanelSizeNew.current;
      sizes[prevPanelIndex.current + 1] = nextPanelSizeNew.current;

      if (props.onResizeEnd) {
        props.onResizeEnd({
          originalEvent: event,
          sizes: sizes
        });
      }

      if (isStateful) saveState(sizes);
      return sizes;
    });
    utils.DomHandler.removeClass(gutterRef.current, 'p-splitter-gutter-resizing');
    utils.DomHandler.removeClass(elementRef.current, 'p-splitter-resizing');
    clear();
  };

  var onGutterMouseDown = function onGutterMouseDown(event, index) {
    onResizeStart(event, index);
    bindMouseListeners();
  };

  var onGutterTouchStart = function onGutterTouchStart(event, index) {
    onResizeStart(event, index);
    window.addEventListener('touchmove', onGutterTouchMove, {
      passive: false,
      cancelable: false
    });
    window.addEventListener('touchend', onGutterTouchEnd);
  };

  var onGutterTouchMove = function onGutterTouchMove(event) {
    onResize(event);
  };

  var onGutterTouchEnd = function onGutterTouchEnd(event) {
    onResizeEnd(event);
    window.removeEventListener('touchmove', onGutterTouchMove);
    window.removeEventListener('touchend', onGutterTouchEnd);
  };

  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    var panelElements = _toConsumableArray(elementRef.current.children).filter(function (child) {
      return utils.DomHandler.hasClass(child, 'p-splitter-panel');
    });

    panelElements.map(function (panelElement) {
      if (panelElement.childNodes && utils.ObjectUtils.isNotEmpty(utils.DomHandler.find(panelElement, '.p-splitter'))) {
        utils.DomHandler.addClass(panelElement, 'p-splitter-panel-nested');
      }
    });
  }, []);
  React__namespace.useEffect(function () {
    if (isStateful) restoreState();
  }, [restoreState, isStateful]);

  var createPanel = function createPanel(panel, index) {
    var otherProps = utils.ObjectUtils.findDiffKeys(panel.props, SplitterPanel.defaultProps);
    var panelClassName = utils.classNames('p-splitter-panel', panel.props.className);
    var gutterStyle = props.layout === 'horizontal' ? {
      width: props.gutterSize + 'px'
    } : {
      height: props.gutterSize + 'px'
    };
    var gutter = index !== props.children.length - 1 && /*#__PURE__*/React__namespace.createElement("div", {
      ref: function ref(el) {
        return gutterRefs.current[index] = el;
      },
      className: "p-splitter-gutter",
      style: gutterStyle,
      onMouseDown: function onMouseDown(event) {
        return onGutterMouseDown(event, index);
      },
      onTouchStart: function onTouchStart(event) {
        return onGutterTouchStart(event, index);
      },
      onTouchMove: function onTouchMove(event) {
        return onGutterTouchMove(event);
      },
      onTouchEnd: function onTouchEnd(event) {
        return onGutterTouchEnd(event);
      }
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-splitter-gutter-handle"
    }));
    var flexBasis = 'calc(' + panelSize(panelSizes, index) + '% - ' + (childrenLength - 1) * props.gutterSize + 'px)';
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      key: index,
      className: panelClassName,
      style: _objectSpread(_objectSpread({}, panel.props.style), {}, {
        flexBasis: flexBasis
      })
    }, otherProps), panel.props.children), gutter);
  };

  var createPanels = function createPanels() {
    return React__namespace.Children.map(props.children, createPanel);
  };

  var otherProps = utils.ObjectUtils.findDiffKeys(props, Splitter.defaultProps);
  var className = utils.classNames("p-splitter p-component p-splitter-".concat(props.layout), props.className);
  var panels = createPanels();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: props.id,
    className: className,
    style: props.style
  }, otherProps), panels);
}));
SplitterPanel.displayName = 'SplitterPanel';
SplitterPanel.defaultProps = {
  __TYPE: 'SplitterPanel',
  className: null,
  minSize: null,
  size: null,
  style: null
};
Splitter.displayName = 'Splitter';
Splitter.defaultProps = {
  __TYPE: 'Splitter',
  className: null,
  gutterSize: 4,
  id: null,
  layout: 'horizontal',
  onResizeEnd: null,
  stateKey: null,
  stateStorage: 'session',
  style: null
};

exports.Splitter = Splitter;
exports.SplitterPanel = SplitterPanel;
