'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var portal = require('primereact/portal');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');

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

var GalleriaItem = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var next = function next() {
    var nextItemIndex = props.activeItemIndex + 1;
    props.onActiveItemChange({
      index: props.circular && props.value.length - 1 === props.activeItemIndex ? 0 : nextItemIndex
    });
  };

  var prev = function prev() {
    var prevItemIndex = props.activeItemIndex !== 0 ? props.activeItemIndex - 1 : 0;
    props.onActiveItemChange({
      index: props.circular && props.activeItemIndex === 0 ? props.value.length - 1 : prevItemIndex
    });
  };

  var stopSlideShow = function stopSlideShow() {
    if (props.slideShowActive && props.stopSlideShow) {
      props.stopSlideShow();
    }
  };

  var navBackward = function navBackward(e) {
    stopSlideShow();
    prev();

    if (e && e.cancelable) {
      e.preventDefault();
    }
  };

  var navForward = function navForward(e) {
    stopSlideShow();
    next();

    if (e && e.cancelable) {
      e.preventDefault();
    }
  };

  var onIndicatorClick = function onIndicatorClick(index) {
    stopSlideShow();
    props.onActiveItemChange({
      index: index
    });
  };

  var onIndicatorMouseEnter = function onIndicatorMouseEnter(index) {
    if (props.changeItemOnIndicatorHover) {
      stopSlideShow();
      props.onActiveItemChange({
        index: index
      });
    }
  };

  var onIndicatorKeyDown = function onIndicatorKeyDown(event, index) {
    if (event.which === 13) {
      stopSlideShow();
      props.onActiveItemChange({
        index: index
      });
    }
  };

  hooks.useMountEffect(function () {
    if (props.autoPlay) {
      props.startSlideShow();
    }
  });

  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0;
      var buttonClassName = utils.classNames('p-galleria-item-prev p-galleria-item-nav p-link', {
        'p-disabled': isDisabled
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: buttonClassName,
        onClick: navBackward,
        disabled: isDisabled
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-galleria-item-prev-icon pi pi-chevron-left"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }

    return null;
  };

  var createForwardNavigator = function createForwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1;
      var buttonClassName = utils.classNames('p-galleria-item-next p-galleria-item-nav p-link', {
        'p-disabled': isDisabled
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: buttonClassName,
        onClick: navForward,
        disabled: isDisabled
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-galleria-item-next-icon pi pi-chevron-right"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }

    return null;
  };

  var createCaption = function createCaption() {
    if (props.caption) {
      var _content = props.caption(props.value[props.activeItemIndex]);

      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-galleria-caption"
      }, _content);
    }

    return null;
  };

  var createIndicator = function createIndicator(index) {
    var key = 'p-galleria-indicator-' + index;
    var isActive = props.activeItemIndex === index;
    var className = utils.classNames('p-galleria-indicator', {
      'p-highlight': isActive
    });
    var indicator = props.indicator && props.indicator(index);

    if (!indicator) {
      indicator = /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        tabIndex: -1,
        className: "p-link"
      }, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }

    return /*#__PURE__*/React__namespace.createElement("li", {
      className: className,
      key: key,
      tabIndex: 0,
      onClick: function onClick() {
        return onIndicatorClick(index);
      },
      onMouseEnter: function onMouseEnter() {
        return onIndicatorMouseEnter(index);
      },
      onKeyDown: function onKeyDown(e) {
        return onIndicatorKeyDown(e, index);
      }
    }, indicator);
  };

  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var className = utils.classNames('p-galleria-indicators p-reset', props.indicatorsContentClassName);
      var _indicators = [];

      for (var i = 0; i < props.value.length; i++) {
        _indicators.push(createIndicator(i));
      }

      return /*#__PURE__*/React__namespace.createElement("ul", {
        className: className
      }, _indicators);
    }

    return null;
  };

  var content = props.itemTemplate && props.itemTemplate(props.value[props.activeItemIndex]);
  var backwardNavigator = createBackwardNavigator();
  var forwardNavigator = createForwardNavigator();
  var caption = createCaption();
  var indicators = createIndicators();
  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: ref,
    className: "p-galleria-item-wrapper"
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-galleria-item-container"
  }, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-galleria-item"
  }, content), forwardNavigator, caption), indicators);
}));
GalleriaItem.displayName = 'GalleriaItem';

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var GalleriaThumbnailItem = /*#__PURE__*/React__namespace.memo(function (props) {
  var onItemClick = function onItemClick(event) {
    props.onItemClick({
      originalEvent: event,
      index: props.index
    });
  };

  var onItemKeyDown = function onItemKeyDown(event) {
    if (event.which === 13) {
      props.onItemClick({
        originalEvent: event,
        index: props.index
      });
    }
  };

  var tabIndex = props.active ? 0 : null;
  var content = props.template && props.template(props.item);
  var className = utils.classNames('p-galleria-thumbnail-item', {
    'p-galleria-thumbnail-item-current': props.current,
    'p-galleria-thumbnail-item-active': props.active,
    'p-galleria-thumbnail-item-start': props.start,
    'p-galleria-thumbnail-item-end': props.end
  }, props.className);
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: className
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-galleria-thumbnail-item-content",
    tabIndex: tabIndex,
    onClick: onItemClick,
    onKeyDown: onItemKeyDown
  }, content));
});
var GalleriaThumbnails = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(props.numVisible),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      numVisibleState = _React$useState2[0],
      setNumVisibleState = _React$useState2[1];

  var _React$useState3 = React__namespace.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      totalShiftedItemsState = _React$useState4[0],
      setTotalShiftedItemsState = _React$useState4[1];

  var itemsContainerRef = React__namespace.useRef(null);
  var startPos = React__namespace.useRef(null);
  var attributeSelector = React__namespace.useRef('');
  var thumbnailsStyle = React__namespace.useRef(null);
  var responsiveOptions = React__namespace.useRef(null);
  var prevNumVisible = hooks.usePrevious(numVisibleState);
  var prevActiveItemIndex = hooks.usePrevious(props.activeItemIndex);

  var _useResizeListener = hooks.useResizeListener({
    listener: function listener() {
      calculatePosition();
    },
    when: props.responsiveOptions
  }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
      bindWindowResizeListener = _useResizeListener2[0];

  var step = function step(dir) {
    var totalShiftedItems = totalShiftedItemsState + dir;

    if (dir < 0 && -1 * totalShiftedItems + numVisibleState > props.value.length - 1) {
      totalShiftedItems = numVisibleState - props.value.length;
    } else if (dir > 0 && totalShiftedItems > 0) {
      totalShiftedItems = 0;
    }

    if (props.circular) {
      if (dir < 0 && props.value.length - 1 === props.activeItemIndex) {
        totalShiftedItems = 0;
      } else if (dir > 0 && props.activeItemIndex === 0) {
        totalShiftedItems = numVisibleState - props.value.length;
      }
    }

    if (itemsContainerRef.current) {
      utils.DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
      itemsContainerRef.current.style.transform = props.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / numVisibleState), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / numVisibleState), "%, 0, 0)");
      itemsContainerRef.current.style.transition = 'transform 500ms ease 0s';
    }

    setTotalShiftedItemsState(totalShiftedItems);
  };

  var stopSlideShow = function stopSlideShow() {
    if (props.slideShowActive && props.stopSlideShow) {
      props.stopSlideShow();
    }
  };

  var getMedianItemIndex = function getMedianItemIndex() {
    var index = Math.floor(numVisibleState / 2);
    return numVisibleState % 2 ? index : index - 1;
  };

  var navBackward = function navBackward(e) {
    stopSlideShow();
    var prevItemIndex = props.activeItemIndex !== 0 ? props.activeItemIndex - 1 : 0;
    var diff = prevItemIndex + totalShiftedItemsState;

    if (numVisibleState - diff - 1 > getMedianItemIndex() && (-1 * totalShiftedItemsState !== 0 || props.circular)) {
      step(1);
    }

    props.onActiveItemChange({
      index: props.circular && props.activeItemIndex === 0 ? props.value.length - 1 : prevItemIndex
    });

    if (e.cancelable) {
      e.preventDefault();
    }
  };

  var navForward = function navForward(e) {
    stopSlideShow();
    var nextItemIndex = props.activeItemIndex + 1;

    if (nextItemIndex + totalShiftedItemsState > getMedianItemIndex() && (-1 * totalShiftedItemsState < getTotalPageNumber() - 1 || props.circular)) {
      step(-1);
    }

    props.onActiveItemChange({
      index: props.circular && props.value.length - 1 === props.activeItemIndex ? 0 : nextItemIndex
    });

    if (e.cancelable) {
      e.preventDefault();
    }
  };

  var onItemClick = function onItemClick(event) {
    stopSlideShow();
    var selectedItemIndex = event.index;

    if (selectedItemIndex !== props.activeItemIndex) {
      var diff = selectedItemIndex + totalShiftedItemsState;
      var dir = 0;

      if (selectedItemIndex < props.activeItemIndex) {
        dir = numVisibleState - diff - 1 - getMedianItemIndex();

        if (dir > 0 && -1 * totalShiftedItemsState !== 0) {
          step(dir);
        }
      } else {
        dir = getMedianItemIndex() - diff;

        if (dir < 0 && -1 * totalShiftedItemsState < getTotalPageNumber() - 1) {
          step(dir);
        }
      }

      props.onActiveItemChange({
        index: selectedItemIndex
      });
    }
  };

  var onTransitionEnd = function onTransitionEnd(e) {
    if (itemsContainerRef.current && e.propertyName === 'transform') {
      utils.DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
      itemsContainerRef.current.style.transition = '';
    }
  };

  var onTouchStart = function onTouchStart(e) {
    var touchobj = e.changedTouches[0];
    startPos.current = {
      x: touchobj.pageX,
      y: touchobj.pageY
    };
  };

  var onTouchMove = function onTouchMove(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  var onTouchEnd = function onTouchEnd(e) {
    var touchobj = e.changedTouches[0];

    if (props.isVertical) {
      changePageOnTouch(e, touchobj.pageY - startPos.current.y);
    } else {
      changePageOnTouch(e, touchobj.pageX - startPos.current.x);
    }
  };

  var changePageOnTouch = function changePageOnTouch(e, diff) {
    if (diff < 0) {
      // left
      navForward(e);
    } else {
      // right
      navBackward(e);
    }
  };

  var getTotalPageNumber = function getTotalPageNumber() {
    return props.value.length > numVisibleState ? props.value.length - numVisibleState + 1 : 0;
  };

  var createStyle = function createStyle() {
    if (!thumbnailsStyle.current) {
      thumbnailsStyle.current = utils.DomHandler.createInlineStyle(PrimeReact__default["default"].nonce);
    }

    var innerHTML = "\n            .p-galleria-thumbnail-items[".concat(attributeSelector.current, "] .p-galleria-thumbnail-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");

    if (props.responsiveOptions) {
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return utils.ObjectUtils.sort(value1, value2, -1, PrimeReact__default["default"].locale, PrimeReact__default["default"].nullSortOrder);
      });

      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        innerHTML += "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        .p-galleria-thumbnail-items[").concat(attributeSelector.current, "] .p-galleria-thumbnail-item {\n                            flex: 1 0 ").concat(100 / res.numVisible, "%\n                        }\n                    }\n                ");
      }
    }

    thumbnailsStyle.current.innerHTML = innerHTML;
  };

  var calculatePosition = function calculatePosition() {
    if (itemsContainerRef.current && responsiveOptions.current) {
      var windowWidth = window.innerWidth;
      var matchedResponsiveData = {
        numVisible: props.numVisible
      };

      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];

        if (parseInt(res.breakpoint, 10) >= windowWidth) {
          matchedResponsiveData = res;
        }
      }

      if (numVisibleState !== matchedResponsiveData.numVisible) {
        setNumVisibleState(matchedResponsiveData.numVisible);
      }
    }
  };

  hooks.useMountEffect(function () {
    if (itemsContainerRef.current) {
      attributeSelector.current = utils.UniqueComponentId();
      itemsContainerRef.current.setAttribute(attributeSelector.current, '');
    }

    createStyle();
    calculatePosition();
    bindWindowResizeListener();
  });
  hooks.useUpdateEffect(function () {
    var totalShiftedItems = totalShiftedItemsState;

    if (prevNumVisible !== numVisibleState || prevActiveItemIndex !== props.activeItemIndex) {
      if (props.activeItemIndex <= getMedianItemIndex()) {
        totalShiftedItems = 0;
      } else if (props.value.length - numVisibleState + getMedianItemIndex() < props.activeItemIndex) {
        totalShiftedItems = numVisibleState - props.value.length;
      } else if (props.value.length - numVisibleState < props.activeItemIndex && numVisibleState % 2 === 0) {
        totalShiftedItems = props.activeItemIndex * -1 + getMedianItemIndex() + 1;
      } else {
        totalShiftedItems = props.activeItemIndex * -1 + getMedianItemIndex();
      }

      if (totalShiftedItems !== totalShiftedItemsState) {
        setTotalShiftedItemsState(totalShiftedItems);
      }

      itemsContainerRef.current.style.transform = props.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / numVisibleState), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / numVisibleState), "%, 0, 0)");

      if (prevActiveItemIndex !== props.activeItemIndex) {
        utils.DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
        itemsContainerRef.current.style.transition = 'transform 500ms ease 0s';
      }
    }
  });

  var createItems = function createItems() {
    return props.value.map(function (item, index) {
      var firstIndex = totalShiftedItemsState * -1;
      var lastIndex = firstIndex + numVisibleState - 1;
      var isActive = firstIndex <= index && lastIndex >= index;
      var start = firstIndex === index;
      var end = lastIndex === index;
      var current = props.activeItemIndex === index;
      return /*#__PURE__*/React__namespace.createElement(GalleriaThumbnailItem, {
        key: index,
        index: index,
        template: props.itemTemplate,
        item: item,
        active: isActive,
        start: start,
        end: end,
        onItemClick: onItemClick,
        current: current
      });
    });
  };

  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0 || props.value.length <= numVisibleState;
      var buttonClassName = utils.classNames('p-galleria-thumbnail-prev p-link', {
        'p-disabled': isDisabled
      }),
          iconClassName = utils.classNames('p-galleria-thumbnail-prev-icon pi', {
        'pi-chevron-left': !props.isVertical,
        'pi-chevron-up': props.isVertical
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        className: buttonClassName,
        onClick: navBackward,
        disabled: isDisabled
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }

    return null;
  };

  var createForwardNavigator = function createForwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1 || props.value.length <= numVisibleState;
      var buttonClassName = utils.classNames('p-galleria-thumbnail-next p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = utils.classNames('p-galleria-thumbnail-next-icon pi', {
        'pi-chevron-right': !props.isVertical,
        'pi-chevron-down': props.isVertical
      });
      return /*#__PURE__*/React__namespace.createElement("button", {
        className: buttonClassName,
        onClick: navForward,
        disabled: isDisabled
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }

    return null;
  };

  var createContent = function createContent() {
    var items = createItems();
    var height = props.isVertical ? props.contentHeight : '';
    var backwardNavigator = createBackwardNavigator();
    var forwardNavigator = createForwardNavigator();
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-galleria-thumbnail-container"
    }, backwardNavigator, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-galleria-thumbnail-items-container",
      style: {
        height: height
      }
    }, /*#__PURE__*/React__namespace.createElement("div", {
      ref: itemsContainerRef,
      className: "p-galleria-thumbnail-items",
      onTransitionEnd: onTransitionEnd,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }, items)), forwardNavigator);
  };

  var content = createContent();
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: "p-galleria-thumbnail-wrapper"
  }, content);
}));
GalleriaThumbnailItem.displayName = 'GalleriaThumbnailItem';
GalleriaThumbnails.displayName = 'GalleriaThumbnails';

var Galleria = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];

  var _React$useState3 = React__namespace.useState(props.numVisible),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      numVisibleState = _React$useState4[0],
      setNumVisibleState = _React$useState4[1];

  var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      slideShowActiveState = _React$useState6[0],
      setSlideShowActiveState = _React$useState6[1];

  var _React$useState7 = React__namespace.useState(props.activeIndex),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      activeIndexState = _React$useState8[0],
      setActiveIndexState = _React$useState8[1];

  var elementRef = React__namespace.useRef(null);
  var previewContentRef = React__namespace.useRef(null);
  var maskRef = React__namespace.useRef(null);
  var activeItemIndex = props.onItemChange ? props.activeIndex : activeIndexState;
  var isVertical = props.thumbnailsPosition === 'left' || props.thumbnailsPosition === 'right';
  hooks.useInterval(function () {
    onActiveItemChange({
      index: props.circular && props.value.length - 1 === activeItemIndex ? 0 : activeItemIndex + 1
    });
  }, props.transitionInterval, slideShowActiveState);

  var onActiveItemChange = function onActiveItemChange(event) {
    if (props.onItemChange) {
      props.onItemChange(event);
    } else {
      setActiveIndexState(event.index);
    }
  };

  var show = function show() {
    setVisibleState(true);
  };

  var hide = function hide() {
    setVisibleState(false);
  };

  var onEnter = function onEnter() {
    utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
  };

  var onEntering = function onEntering() {
    utils.ZIndexUtils.set('modal', maskRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
    utils.DomHandler.addMultipleClasses(maskRef.current, 'p-component-overlay p-component-overlay-enter');
  };

  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };

  var onExit = function onExit() {
    utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
    utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
  };

  var onExited = function onExited() {
    utils.ZIndexUtils.clear(maskRef.current);
    props.onHide && props.onHide();
  };

  var isAutoPlayActive = function isAutoPlayActive() {
    return slideShowActiveState;
  };

  var startSlideShow = function startSlideShow() {
    setSlideShowActiveState(true);
  };

  var stopSlideShow = function stopSlideShow() {
    setSlideShowActiveState(false);
  };

  var getPositionClassName = function getPositionClassName(preClassName, position) {
    var positions = ['top', 'left', 'bottom', 'right'];
    var pos = positions.find(function (item) {
      return item === position;
    });
    return pos ? "".concat(preClassName, "-").concat(pos) : '';
  };

  React__namespace.useEffect(function () {
    if (props.value && props.value.length < numVisibleState) {
      setNumVisibleState(props.value.length);
    }
  }, [props.value, numVisibleState]);
  React__namespace.useEffect(function () {
    setNumVisibleState(props.numVisible);
  }, [props.numVisible]);
  hooks.useUnmountEffect(function () {
    if (slideShowActiveState) {
      stopSlideShow();
    }

    utils.ZIndexUtils.clear(maskRef.current);
  });
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      isAutoPlayActive: isAutoPlayActive,
      startSlideShow: startSlideShow,
      stopSlideShow: stopSlideShow,
      getElement: function getElement() {
        return elementRef.current;
      },
      getPreviewContent: function getPreviewContent() {
        return previewContentRef.current;
      }
    };
  });

  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-galleria-header"
      }, props.header);
    }

    return null;
  };

  var createFooter = function createFooter() {
    if (props.footer) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-galleria-footer"
      }, props.footer);
    }

    return null;
  };

  var createElement = function createElement() {
    var otherProps = utils.ObjectUtils.findDiffKeys(props, Galleria.defaultProps);
    var thumbnailsPosClassName = props.showThumbnails && getPositionClassName('p-galleria-thumbnails', props.thumbnailsPosition);
    var indicatorPosClassName = props.showIndicators && getPositionClassName('p-galleria-indicators', props.indicatorsPosition);
    var galleriaClassName = utils.classNames('p-galleria p-component', props.className, {
      'p-galleria-fullscreen': props.fullScreen,
      'p-galleria-indicator-onitem': props.showIndicatorsOnItem,
      'p-galleria-item-nav-onhover': props.showItemNavigatorsOnHover && !props.fullScreen
    }, thumbnailsPosClassName, indicatorPosClassName);
    var closeIcon = props.fullScreen && /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: "p-galleria-close p-link",
      "aria-label": PrimeReact.localeOption('close'),
      onClick: hide
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-galleria-close-icon pi pi-times",
      "aria-hidden": "true"
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    var header = createHeader();
    var footer = createFooter();
    var element = /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: galleriaClassName,
      style: props.style
    }, otherProps), closeIcon, header, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-galleria-content"
    }, /*#__PURE__*/React__namespace.createElement(GalleriaItem, {
      ref: previewContentRef,
      value: props.value,
      activeItemIndex: activeItemIndex,
      onActiveItemChange: onActiveItemChange,
      itemTemplate: props.item,
      circular: props.circular,
      caption: props.caption,
      showIndicators: props.showIndicators,
      changeItemOnIndicatorHover: props.changeItemOnIndicatorHover,
      indicator: props.indicator,
      showItemNavigators: props.showItemNavigators,
      autoPlay: props.autoPlay,
      slideShowActive: slideShowActiveState,
      startSlideShow: startSlideShow,
      stopSlideShow: stopSlideShow
    }), props.showThumbnails && /*#__PURE__*/React__namespace.createElement(GalleriaThumbnails, {
      value: props.value,
      activeItemIndex: activeItemIndex,
      onActiveItemChange: onActiveItemChange,
      itemTemplate: props.thumbnail,
      numVisible: numVisibleState,
      responsiveOptions: props.responsiveOptions,
      circular: props.circular,
      isVertical: isVertical,
      contentHeight: props.verticalThumbnailViewPortHeight,
      showThumbnailNavigators: props.showThumbnailNavigators,
      autoPlay: props.autoPlay,
      slideShowActive: slideShowActiveState,
      stopSlideShow: stopSlideShow
    })), footer);
    return element;
  };

  var createGalleria = function createGalleria() {
    var element = createElement();

    if (props.fullScreen) {
      var maskClassName = utils.classNames('p-galleria-mask', {
        'p-galleria-visible': visibleState
      });
      var galleriaWrapper = /*#__PURE__*/React__namespace.createElement("div", {
        ref: maskRef,
        className: maskClassName
      }, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: elementRef,
        classNames: "p-galleria",
        "in": visibleState,
        timeout: {
          enter: 150,
          exit: 150
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExited: onExited
      }, element));
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: galleriaWrapper
      });
    }

    return element;
  };

  return utils.ObjectUtils.isNotEmpty(props.value) && createGalleria();
}));
Galleria.displayName = 'Galleria';
Galleria.defaultProps = {
  __TYPE: 'Galleria',
  id: null,
  value: null,
  activeIndex: 0,
  fullScreen: false,
  item: null,
  thumbnail: null,
  indicator: null,
  caption: null,
  className: null,
  style: null,
  header: null,
  footer: null,
  numVisible: 3,
  responsiveOptions: null,
  showItemNavigators: false,
  showThumbnailNavigators: true,
  showItemNavigatorsOnHover: false,
  changeItemOnIndicatorHover: false,
  circular: false,
  autoPlay: false,
  transitionInterval: 4000,
  showThumbnails: true,
  thumbnailsPosition: 'bottom',
  verticalThumbnailViewPortHeight: '300px',
  showIndicators: false,
  showIndicatorsOnItem: false,
  indicatorsPosition: 'bottom',
  baseZIndex: 0,
  transitionOptions: null,
  onItemChange: null
};

exports.Galleria = Galleria;
