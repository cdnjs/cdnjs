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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var VirtualScroller = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var vertical = props.orientation === 'vertical';
  var horizontal = props.orientation === 'horizontal';
  var both = props.orientation === 'both';
  var _React$useState = React__namespace.useState(both ? {
      rows: 0,
      cols: 0
    } : 0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    firstState = _React$useState2[0],
    setFirstState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(both ? {
      rows: 0,
      cols: 0
    } : 0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    lastState = _React$useState4[0],
    setLastState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(both ? {
      rows: 0,
      cols: 0
    } : 0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    numItemsInViewportState = _React$useState6[0],
    setNumItemsInViewportState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(props.numToleratedItems),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    numToleratedItemsState = _React$useState8[0],
    setNumToleratedItemsState = _React$useState8[1];
  var _React$useState9 = React__namespace.useState(props.loading || false),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    loadingState = _React$useState10[0],
    setLoadingState = _React$useState10[1];
  var _React$useState11 = React__namespace.useState([]),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    loaderArrState = _React$useState12[0],
    setLoaderArrState = _React$useState12[1];
  var elementRef = React__namespace.useRef(null);
  var _contentRef = React__namespace.useRef(null);
  var _spacerRef = React__namespace.useRef(null);
  var _stickyRef = React__namespace.useRef(null);
  var lastScrollPos = React__namespace.useRef(both ? {
    top: 0,
    left: 0
  } : 0);
  var scrollTimeout = React__namespace.useRef(null);
  var resizeTimeout = React__namespace.useRef(null);
  var defaultWidth = React__namespace.useRef(null);
  var defaultHeight = React__namespace.useRef(null);
  var prevItems = hooks.usePrevious(props.items);
  var prevLoading = hooks.usePrevious(props.loading);
  var _useResizeListener = hooks.useResizeListener({
      listener: function listener(event) {
        return onResize();
      }
    }),
    _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
    bindWindowResizeListener = _useResizeListener2[0];
  var _useEventListener = hooks.useEventListener({
      target: 'window',
      type: 'orientationchange',
      listener: function listener(event) {
        return onResize();
      }
    }),
    _useEventListener2 = _slicedToArray(_useEventListener, 1),
    bindOrientationChangeListener = _useEventListener2[0];
  var getElementRef = function getElementRef() {
    return elementRef;
  };
  var scrollTo = function scrollTo(options) {
    lastScrollPos.current = both ? {
      top: 0,
      left: 0
    } : 0;
    elementRef.current && elementRef.current.scrollTo(options);
  };
  var scrollToIndex = function scrollToIndex(index) {
    var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
    var _calculateNumItems = calculateNumItems(),
      numToleratedItems = _calculateNumItems.numToleratedItems;
    var calculateFirst = function calculateFirst() {
      var _index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var _numT = arguments.length > 1 ? arguments[1] : undefined;
      return _index <= _numT ? 0 : _index;
    };
    var calculateCoord = function calculateCoord(_first, _size) {
      return _first * _size;
    };
    var scrollToItem = function scrollToItem() {
      var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return scrollTo({
        left: left,
        top: top,
        behavior: behavior
      });
    };
    if (both) {
      var newFirst = {
        rows: calculateFirst(index[0], numToleratedItems[0]),
        cols: calculateFirst(index[1], numToleratedItems[1])
      };
      if (newFirst.rows !== firstState.rows || newFirst.cols !== firstState.cols) {
        scrollToItem(calculateCoord(newFirst.cols, props.itemSize[1]), calculateCoord(newFirst.rows, props.itemSize[0]));
      }
    } else {
      var _newFirst = calculateFirst(index, numToleratedItems);
      if (_newFirst !== firstState) {
        horizontal ? scrollToItem(calculateCoord(_newFirst, props.itemSize), 0) : scrollToItem(0, calculateCoord(_newFirst, props.itemSize));
      }
    }
  };
  var scrollInView = function scrollInView(index, to) {
    var behavior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
    if (to) {
      var _getRenderedRange = getRenderedRange(),
        first = _getRenderedRange.first,
        viewport = _getRenderedRange.viewport;
      var scrollToItem = function scrollToItem() {
        var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return scrollTo({
          left: left,
          top: top,
          behavior: behavior
        });
      };
      var isToStart = to === 'to-start';
      var isToEnd = to === 'to-end';
      if (isToStart) {
        if (both) {
          if (viewport.first.rows - first.rows > index[0]) {
            scrollToItem(viewport.first.cols * props.itemSize[1], (viewport.first.rows - 1) * props.itemSize[0]);
          } else if (viewport.first.cols - first.cols > index[1]) {
            scrollToItem((viewport.first.cols - 1) * props.itemSize[1], viewport.first.rows * props.itemSize[0]);
          }
        } else {
          if (viewport.first - first > index) {
            var pos = (viewport.first - 1) * props.itemSize;
            horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos);
          }
        }
      } else if (isToEnd) {
        if (both) {
          if (viewport.last.rows - first.rows <= index[0] + 1) {
            scrollToItem(viewport.first.cols * props.itemSize[1], (viewport.first.rows + 1) * props.itemSize[0]);
          } else if (viewport.last.cols - first.cols <= index[1] + 1) {
            scrollToItem((viewport.first.cols + 1) * props.itemSize[1], viewport.first.rows * props.itemSize[0]);
          }
        } else {
          if (viewport.last - first <= index + 1) {
            var _pos2 = (viewport.first + 1) * props.itemSize;
            horizontal ? scrollToItem(_pos2, 0) : scrollToItem(0, _pos2);
          }
        }
      }
    } else {
      scrollToIndex(index, behavior);
    }
  };
  var getRows = function getRows() {
    return loadingState ? props.loaderDisabled ? loaderArrState : [] : loadedItems();
  };
  var getColumns = function getColumns() {
    if (props.columns && both || horizontal) {
      return loadingState && props.loaderDisabled ? both ? loaderArrState[0] : loaderArrState : props.columns.slice(both ? firstState.cols : firstState, both ? lastState.cols : lastState);
    }
    return props.columns;
  };
  var getRenderedRange = function getRenderedRange() {
    var calculateFirstInViewport = function calculateFirstInViewport(_pos, _size) {
      return Math.floor(_pos / (_size || _pos));
    };
    var firstInViewport = firstState;
    var lastInViewport = 0;
    if (elementRef.current) {
      var _elementRef$current = elementRef.current,
        scrollTop = _elementRef$current.scrollTop,
        scrollLeft = _elementRef$current.scrollLeft;
      if (both) {
        firstInViewport = {
          rows: calculateFirstInViewport(scrollTop, props.itemSize[0]),
          cols: calculateFirstInViewport(scrollLeft, props.itemSize[1])
        };
        lastInViewport = {
          rows: firstInViewport.rows + numItemsInViewportState.rows,
          cols: firstInViewport.cols + numItemsInViewportState.cols
        };
      } else {
        var scrollPos = horizontal ? scrollLeft : scrollTop;
        firstInViewport = calculateFirstInViewport(scrollPos, props.itemSize);
        lastInViewport = firstInViewport + numItemsInViewportState;
      }
    }
    return {
      first: firstState,
      last: lastState,
      viewport: {
        first: firstInViewport,
        last: lastInViewport
      }
    };
  };
  var calculateNumItems = function calculateNumItems() {
    var contentPos = getContentPosition();
    var contentWidth = elementRef.current ? elementRef.current.offsetWidth - contentPos.left : 0;
    var contentHeight = elementRef.current ? elementRef.current.offsetHeight - contentPos.top : 0;
    var calculateNumItemsInViewport = function calculateNumItemsInViewport(_contentSize, _itemSize) {
      return Math.ceil(_contentSize / (_itemSize || _contentSize));
    };
    var calculateNumToleratedItems = function calculateNumToleratedItems(_numItems) {
      return Math.ceil(_numItems / 2);
    };
    var numItemsInViewport = both ? {
      rows: calculateNumItemsInViewport(contentHeight, props.itemSize[0]),
      cols: calculateNumItemsInViewport(contentWidth, props.itemSize[1])
    } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, props.itemSize);
    var numToleratedItems = numToleratedItemsState || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
    return {
      numItemsInViewport: numItemsInViewport,
      numToleratedItems: numToleratedItems
    };
  };
  var calculateOptions = function calculateOptions() {
    var _calculateNumItems2 = calculateNumItems(),
      numItemsInViewport = _calculateNumItems2.numItemsInViewport,
      numToleratedItems = _calculateNumItems2.numToleratedItems;
    var calculateLast = function calculateLast(_first, _num, _numT, _isCols) {
      return getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
    };
    var last = both ? {
      rows: calculateLast(firstState.rows, numItemsInViewport.rows, numToleratedItems[0]),
      cols: calculateLast(firstState.cols, numItemsInViewport.cols, numToleratedItems[1], true)
    } : calculateLast(firstState, numItemsInViewport, numToleratedItems);
    setNumItemsInViewportState(numItemsInViewport);
    setNumToleratedItemsState(numToleratedItems);
    setLastState(last);
    if (props.showLoader) {
      setLoaderArrState(both ? Array.from({
        length: numItemsInViewport.rows
      }).map(function () {
        return Array.from({
          length: numItemsInViewport.cols
        });
      }) : Array.from({
        length: numItemsInViewport
      }));
    }
    if (props.lazy) {
      props.onLazyLoad && props.onLazyLoad({
        first: firstState,
        last: last
      });
    }
  };
  var calculateAutoSize = function calculateAutoSize(loading) {
    if (props.autoSize && !loading) {
      Promise.resolve().then(function () {
        if (_contentRef.current) {
          _contentRef.current.style.minHeight = _contentRef.current.style.minWidth = 'auto';
          var _contentRef$current = _contentRef.current,
            offsetWidth = _contentRef$current.offsetWidth,
            offsetHeight = _contentRef$current.offsetHeight;
          (both || horizontal) && (elementRef.current.style.width = (offsetWidth < defaultWidth.current ? offsetWidth : defaultWidth.current) + 'px');
          (both || vertical) && (elementRef.current.style.height = (offsetHeight < defaultHeight.current ? offsetHeight : defaultHeight.current) + 'px');
          _contentRef.current.style.minHeight = _contentRef.current.style.minWidth = '';
        }
      });
    }
  };
  var getLast = function getLast() {
    var last = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var isCols = arguments.length > 1 ? arguments[1] : undefined;
    return props.items ? Math.min(isCols ? (props.columns || props.items[0]).length : props.items.length, last) : 0;
  };
  var getContentPosition = function getContentPosition() {
    if (_contentRef.current) {
      var style = getComputedStyle(_contentRef.current);
      var left = parseInt(style.paddingLeft, 10) + Math.max(parseInt(style.left, 10), 0);
      var right = parseInt(style.paddingRight, 10) + Math.max(parseInt(style.right, 10), 0);
      var top = parseInt(style.paddingTop, 10) + Math.max(parseInt(style.top, 10), 0);
      var bottom = parseInt(style.paddingBottom, 10) + Math.max(parseInt(style.bottom, 10), 0);
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        x: left + right,
        y: top + bottom
      };
    }
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      x: 0,
      y: 0
    };
  };
  var setSize = function setSize() {
    if (elementRef.current) {
      var parentElement = elementRef.current.parentElement;
      var width = props.scrollWidth || "".concat(elementRef.current.offsetWidth || parentElement.offsetWidth, "px");
      var height = props.scrollHeight || "".concat(elementRef.current.offsetHeight || parentElement.offsetHeight, "px");
      var setProp = function setProp(_name, _value) {
        return elementRef.current.style[_name] = _value;
      };
      if (both || horizontal) {
        setProp('height', height);
        setProp('width', width);
      } else {
        setProp('height', height);
      }
    }
  };
  var setSpacerSize = function setSpacerSize() {
    var items = props.items;
    if (_spacerRef.current && items) {
      var contentPos = getContentPosition();
      var setProp = function setProp(_name, _value, _size) {
        var _cpos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        return _spacerRef.current.style[_name] = (_value || []).length * _size + _cpos + 'px';
      };
      if (both) {
        setProp('height', items, props.itemSize[0], contentPos.y);
        setProp('width', props.columns || items[1], props.itemSize[1], contentPos.x);
      } else {
        horizontal ? setProp('width', props.columns || items, props.itemSize, contentPos.x) : setProp('height', items, props.itemSize, contentPos.y);
      }
    }
  };
  var setContentPosition = function setContentPosition(pos) {
    if (_contentRef.current) {
      var first = pos ? pos.first : firstState;
      var calculateTranslateVal = function calculateTranslateVal(_first, _size) {
        return _first * _size;
      };
      var setTransform = function setTransform() {
        var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        _stickyRef.current && (_stickyRef.current.style.top = "-".concat(_y, "px"));
        _contentRef.current.style.transform = "translate3d(".concat(_x, "px, ").concat(_y, "px, 0)");
      };
      if (both) {
        setTransform(calculateTranslateVal(first.cols, props.itemSize[1]), calculateTranslateVal(first.rows, props.itemSize[0]));
      } else {
        var translateVal = calculateTranslateVal(first, props.itemSize);
        horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
      }
    }
  };
  var onScrollPositionChange = function onScrollPositionChange(event) {
    var target = event.target;
    var contentPos = getContentPosition();
    var calculateScrollPos = function calculateScrollPos(_pos, _cpos) {
      return _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
    };
    var calculateCurrentIndex = function calculateCurrentIndex(_pos, _size) {
      return Math.floor(_pos / (_size || _pos));
    };
    var calculateTriggerIndex = function calculateTriggerIndex(_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
      return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
    };
    var calculateFirst = function calculateFirst(_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
      if (_currentIndex <= _numT) return 0;else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
    };
    var calculateLast = function calculateLast(_currentIndex, _first, _last, _num, _numT, _isCols) {
      var lastValue = _first + _num + 2 * _numT;
      if (_currentIndex >= _numT) {
        lastValue += _numT + 1;
      }
      return getLast(lastValue, _isCols);
    };
    var scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
    var scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
    var newFirst = both ? {
      rows: 0,
      cols: 0
    } : 0;
    var newLast = lastState;
    var isRangeChanged = false;
    var newScrollPos = lastScrollPos.current;
    if (both) {
      var isScrollDown = lastScrollPos.current.top <= scrollTop;
      var isScrollRight = lastScrollPos.current.left <= scrollLeft;
      var currentIndex = {
        rows: calculateCurrentIndex(scrollTop, props.itemSize[0]),
        cols: calculateCurrentIndex(scrollLeft, props.itemSize[1])
      };
      var triggerIndex = {
        rows: calculateTriggerIndex(currentIndex.rows, firstState.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
        cols: calculateTriggerIndex(currentIndex.cols, firstState.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
      };
      newFirst = {
        rows: calculateFirst(currentIndex.rows, triggerIndex.rows, firstState.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
        cols: calculateFirst(currentIndex.cols, triggerIndex.cols, firstState.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
      };
      newLast = {
        rows: calculateLast(currentIndex.rows, newFirst.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0]),
        cols: calculateLast(currentIndex.cols, newFirst.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], true)
      };
      isRangeChanged = newFirst.rows !== firstState.rows || newLast.rows !== lastState.rows || newFirst.cols !== firstState.cols || newLast.cols !== lastState.cols;
      newScrollPos = {
        top: scrollTop,
        left: scrollLeft
      };
    } else {
      var scrollPos = horizontal ? scrollLeft : scrollTop;
      var isScrollDownOrRight = lastScrollPos.current <= scrollPos;
      var _currentIndex2 = calculateCurrentIndex(scrollPos, props.itemSize);
      var _triggerIndex2 = calculateTriggerIndex(_currentIndex2, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);
      newFirst = calculateFirst(_currentIndex2, _triggerIndex2, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);
      newLast = calculateLast(_currentIndex2, newFirst, lastState, numItemsInViewportState, numToleratedItemsState);
      isRangeChanged = newFirst !== firstState || newLast !== lastState;
      newScrollPos = scrollPos;
    }
    return {
      first: newFirst,
      last: newLast,
      isRangeChanged: isRangeChanged,
      scrollPos: newScrollPos
    };
  };
  var onScrollChange = function onScrollChange(event) {
    var _onScrollPositionChan = onScrollPositionChange(event),
      first = _onScrollPositionChan.first,
      last = _onScrollPositionChan.last,
      isRangeChanged = _onScrollPositionChan.isRangeChanged,
      scrollPos = _onScrollPositionChan.scrollPos;
    if (isRangeChanged) {
      var newState = {
        first: first,
        last: last
      };
      setContentPosition(newState);
      setFirstState(first);
      setLastState(last);
      lastScrollPos.current = scrollPos;
      props.onScrollIndexChange && props.onScrollIndexChange(newState);
      if (props.lazy) {
        props.onLazyLoad && props.onLazyLoad(newState);
      }
    }
  };
  var onScroll = function onScroll(event) {
    props.onScroll && props.onScroll(event);
    if (props.delay) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (!loadingState && props.showLoader) {
        var _onScrollPositionChan2 = onScrollPositionChange(event),
          changed = _onScrollPositionChan2.isRangeChanged;
        changed && setLoadingState(true);
      }
      scrollTimeout.current = setTimeout(function () {
        onScrollChange(event);
        if (loadingState && props.showLoader && (!props.lazy || props.loading === undefined)) {
          setLoadingState(false);
        }
      }, props.delay);
    } else {
      onScrollChange(event);
    }
  };
  var onResize = function onResize() {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }
    resizeTimeout.current = setTimeout(function () {
      if (elementRef.current) {
        var _ref = [utils.DomHandler.getWidth(elementRef.current), utils.DomHandler.getHeight(elementRef.current)],
          width = _ref[0],
          height = _ref[1];
        var isDiffWidth = width !== defaultWidth.current,
          isDiffHeight = height !== defaultHeight.current;
        var reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;
        if (reinit) {
          setNumToleratedItemsState(props.numToleratedItems);
          defaultWidth.current = width;
          defaultHeight.current = height;
        }
      }
    }, props.resizeDelay);
  };
  var getOptions = function getOptions(renderedIndex) {
    var count = (props.items || []).length;
    var index = both ? firstState.rows + renderedIndex : firstState + renderedIndex;
    return {
      index: index,
      count: count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      props: props
    };
  };
  var loaderOptions = function loaderOptions(index, extOptions) {
    var count = loaderArrState.length;
    return _objectSpread({
      index: index,
      count: count,
      first: index === 0,
      last: index === count - 1,
      even: index % 2 === 0,
      odd: index % 2 !== 0,
      props: props
    }, extOptions);
  };
  var loadedItems = function loadedItems() {
    var items = props.items;
    if (items && !loadingState) {
      if (both) return items.slice(firstState.rows, lastState.rows).map(function (item) {
        return props.columns ? item : item.slice(firstState.cols, lastState.cols);
      });else if (horizontal && props.columns) return items;else return items.slice(firstState, lastState);
    }
    return [];
  };
  var init = function init() {
    if (!props.disabled) {
      setSize();
      calculateOptions();
      setSpacerSize();
    }
  };
  hooks.useMountEffect(function () {
    if (!props.disabled) {
      init();
      bindWindowResizeListener();
      bindOrientationChangeListener();
      defaultWidth.current = utils.DomHandler.getWidth(elementRef.current);
      defaultHeight.current = utils.DomHandler.getHeight(elementRef.current);
    }
  });
  hooks.useUpdateEffect(function () {
    init();
  }, [props.itemSize, props.scrollHeight]);
  hooks.useUpdateEffect(function () {
    if (props.numToleratedItems !== numToleratedItemsState) {
      setNumToleratedItemsState(props.numToleratedItems);
    }
  }, [props.numToleratedItems]);
  hooks.useUpdateEffect(function () {
    if (props.numToleratedItems === numToleratedItemsState) {
      init(); // reinit after resizing
    }
  }, [numToleratedItemsState]);
  hooks.useUpdateEffect(function () {
    if (!prevItems || prevItems.length !== (props.items || []).length) {
      init();
    }
    var loading = loadingState;
    if (props.lazy && prevLoading !== props.loading && props.loading !== loadingState) {
      setLoadingState(props.loading);
      loading = props.loading;
    }
    calculateAutoSize(loading);
  });
  hooks.useUpdateEffect(function () {
    lastScrollPos.current = both ? {
      top: 0,
      left: 0
    } : 0;
  }, [props.orientation]);
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElementRef: getElementRef,
      scrollTo: scrollTo,
      scrollToIndex: scrollToIndex,
      scrollInView: scrollInView,
      getRenderedRange: getRenderedRange
    };
  });
  var createLoaderItem = function createLoaderItem(index) {
    var extOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = loaderOptions(index, extOptions);
    var content = utils.ObjectUtils.getJSXElement(props.loadingTemplate, options);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
      key: index
    }, content);
  };
  var createLoader = function createLoader() {
    if (!props.loaderDisabled && props.showLoader && loadingState) {
      var className = utils.classNames('p-virtualscroller-loader', {
        'p-component-overlay': !props.loadingTemplate
      });
      var content = /*#__PURE__*/React__namespace.createElement("i", {
        className: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
      });
      if (props.loadingTemplate) {
        content = loaderArrState.map(function (_, index) {
          return createLoaderItem(index, both && {
            numCols: numItemsInViewportState.cols
          });
        });
      } else if (props.loaderIconTemplate) {
        var defaultContentOptions = {
          className: 'p-virtualscroller-loading-icon',
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(props.loaderIconTemplate, defaultContentOptions);
      }
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: className
      }, content);
    }
    return null;
  };
  var createSpacer = function createSpacer() {
    if (props.showSpacer) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: _spacerRef,
        className: "p-virtualscroller-spacer"
      });
    }
    return null;
  };
  var createItem = function createItem(item, index) {
    var options = getOptions(index);
    var content = utils.ObjectUtils.getJSXElement(props.itemTemplate, item, options);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
      key: options.index
    }, content);
  };
  var createItems = function createItems() {
    var items = loadedItems();
    return items.map(createItem);
  };
  var createContent = function createContent() {
    var items = createItems();
    var className = utils.classNames('p-virtualscroller-content', {
      'p-virtualscroller-loading': loadingState
    });
    var content = /*#__PURE__*/React__namespace.createElement("div", {
      ref: _contentRef,
      className: className
    }, items);
    if (props.contentTemplate) {
      var defaultOptions = {
        className: className,
        contentRef: function contentRef(el) {
          return _contentRef.current = utils.ObjectUtils.getRefElement(el);
        },
        spacerRef: function spacerRef(el) {
          return _spacerRef.current = utils.ObjectUtils.getRefElement(el);
        },
        stickyRef: function stickyRef(el) {
          return _stickyRef.current = utils.ObjectUtils.getRefElement(el);
        },
        items: loadedItems(),
        getItemOptions: function getItemOptions(index) {
          return getOptions(index);
        },
        children: items,
        element: content,
        props: props,
        loading: loadingState,
        getLoaderOptions: function getLoaderOptions(index, ext) {
          return loaderOptions(index, ext);
        },
        loadingTemplate: props.loadingTemplate,
        itemSize: props.itemSize,
        rows: getRows(),
        columns: getColumns(),
        vertical: vertical,
        horizontal: horizontal,
        both: both
      };
      return utils.ObjectUtils.getJSXElement(props.contentTemplate, defaultOptions);
    }
    return content;
  };
  if (props.disabled) {
    var content = utils.ObjectUtils.getJSXElement(props.contentTemplate, {
      items: props.items,
      rows: props.items,
      columns: props.columns
    });
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, props.children, content);
  } else {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, VirtualScroller.defaultProps);
    var className = utils.classNames('p-virtualscroller', {
      'p-both-scroll': both,
      'p-horizontal-scroll': horizontal
    }, props.className);
    var loader = createLoader();
    var _content = createContent();
    var spacer = createSpacer();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      className: className,
      tabIndex: 0,
      style: props.style
    }, otherProps, {
      onScroll: onScroll
    }), _content, spacer, loader);
  }
}));
VirtualScroller.displayName = 'VirtualScroller';
VirtualScroller.defaultProps = {
  __TYPE: 'VirtualScroller',
  id: null,
  style: null,
  className: null,
  items: null,
  itemSize: 0,
  scrollHeight: null,
  scrollWidth: null,
  orientation: 'vertical',
  numToleratedItems: null,
  delay: 0,
  resizeDelay: 10,
  lazy: false,
  disabled: false,
  loaderDisabled: false,
  columns: null,
  loading: undefined,
  autoSize: false,
  showSpacer: true,
  showLoader: false,
  loadingTemplate: null,
  loaderIconTemplate: null,
  itemTemplate: null,
  contentTemplate: null,
  onScroll: null,
  onScrollIndexChange: null,
  onLazyLoad: null
};

exports.VirtualScroller = VirtualScroller;
