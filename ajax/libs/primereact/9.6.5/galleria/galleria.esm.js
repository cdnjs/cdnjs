import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useMountEffect, usePrevious, useResizeListener, useUpdateEffect, useInterval, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { mergeProps, classNames, IconUtils, UniqueComponentId, DomHandler, ObjectUtils, ZIndexUtils } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { ChevronLeftIcon } from 'primereact/icons/chevronleft';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronUpIcon } from 'primereact/icons/chevronup';

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

var GalleriaBase = ComponentBase.extend({
  defaultProps: {
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
    closeIcon: null,
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
    itemNextIcon: null,
    itemPrevIcon: null,
    nextThumbnailIcon: null,
    prevThumbnailIcon: null,
    thumbnailsPosition: 'bottom',
    verticalThumbnailViewPortHeight: '300px',
    showIndicators: false,
    showIndicatorsOnItem: false,
    indicatorsPosition: 'bottom',
    baseZIndex: 0,
    transitionOptions: null,
    onItemChange: null,
    children: undefined
  }
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var GalleriaItem = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  useMountEffect(function () {
    if (props.autoPlay) {
      props.startSlideShow();
    }
  });
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0;
      var buttonClassName = classNames('p-galleria-item-prev p-galleria-item-nav p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-galleria-item-prev-icon';
      var previousItemIconProps = mergeProps({
        className: iconClassName
      }, props.ptm('previousItemIcon'));
      var icon = props.itemPrevIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousItemIconProps);
      var itemPrevIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, previousItemIconProps), {
        props: props
      });
      var previousItemButtonProps = mergeProps({
        type: 'button',
        className: buttonClassName,
        onClick: navBackward,
        disabled: isDisabled
      }, props.ptm('previousItemButton'));
      return /*#__PURE__*/React.createElement("button", previousItemButtonProps, itemPrevIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1;
      var buttonClassName = classNames('p-galleria-item-next p-galleria-item-nav p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-galleria-item-next-icon';
      var nextItemIconProps = mergeProps({
        className: iconClassName
      }, props.ptm('nextItemIcon'));
      var icon = props.itemNextIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, nextItemIconProps);
      var itemNextIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, nextItemIconProps), {
        props: props
      });
      var nextItemButtonProps = mergeProps({
        type: 'button',
        className: buttonClassName,
        onClick: navForward,
        disabled: isDisabled
      }, props.ptm('nextItemButton'));
      return /*#__PURE__*/React.createElement("button", nextItemButtonProps, itemNextIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createCaption = function createCaption() {
    var captionProps = mergeProps({
      className: 'p-galleria-caption'
    }, props.ptm('caption'));
    if (props.caption) {
      var _content = props.caption(props.value[props.activeItemIndex]);
      return /*#__PURE__*/React.createElement("div", captionProps, _content);
    }
    return null;
  };
  var createIndicator = function createIndicator(index) {
    var key = 'p-galleria-indicator-' + index;
    var isActive = props.activeItemIndex === index;
    var className = classNames('p-galleria-indicator', {
      'p-highlight': isActive
    });
    var indicator = props.indicator && props.indicator(index);
    var indicatorProps = mergeProps({
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
    }, props.ptm('indicator'));
    if (!indicator) {
      indicator = /*#__PURE__*/React.createElement("button", {
        type: "button",
        tabIndex: -1,
        className: "p-link"
      }, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return /*#__PURE__*/React.createElement("li", indicatorProps, indicator);
  };
  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var className = classNames('p-galleria-indicators p-reset', props.indicatorsContentClassName);
      var _indicators = [];
      var indicatorsProps = mergeProps({
        className: className
      }, props.ptm('indicators'));
      for (var i = 0; i < props.value.length; i++) {
        _indicators.push(createIndicator(i));
      }
      return /*#__PURE__*/React.createElement("ul", indicatorsProps, _indicators);
    }
    return null;
  };
  var content = props.itemTemplate && props.itemTemplate(props.value[props.activeItemIndex]);
  var backwardNavigator = createBackwardNavigator();
  var forwardNavigator = createForwardNavigator();
  var caption = createCaption();
  var indicators = createIndicators();
  var itemWrapperProps = mergeProps({
    ref: ref,
    className: 'p-galleria-item-wrapper'
  }, props.ptm('itemWrapper'));
  var itemContainerProps = mergeProps({
    className: 'p-galleria-item-container'
  }, props.ptm('itemContainer'));
  var itemProps = mergeProps({
    className: 'p-galleria-item'
  }, props.ptm('item'));
  return /*#__PURE__*/React.createElement("div", itemWrapperProps, /*#__PURE__*/React.createElement("div", itemContainerProps, backwardNavigator, /*#__PURE__*/React.createElement("div", itemProps, content), forwardNavigator, caption), indicators);
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

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var GalleriaThumbnailItem = /*#__PURE__*/React.memo(function (props) {
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
  var className = classNames('p-galleria-thumbnail-item', {
    'p-galleria-thumbnail-item-current': props.current,
    'p-galleria-thumbnail-item-active': props.active,
    'p-galleria-thumbnail-item-start': props.start,
    'p-galleria-thumbnail-item-end': props.end
  }, props.className);
  var thumbnailItemProps = mergeProps({
    className: className
  }, props.ptm('thumbnailItem'));
  var thumbnailItemContentProps = mergeProps({
    className: 'p-galleria-thumbnail-item-content',
    tabIndex: tabIndex,
    onClick: onItemClick,
    onKeyDown: onItemKeyDown
  }, props.ptm('thumbnailItemContent'));
  return /*#__PURE__*/React.createElement("div", thumbnailItemProps, /*#__PURE__*/React.createElement("div", thumbnailItemContentProps, content));
});
var GalleriaThumbnails = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _React$useState = React.useState(props.numVisible),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    numVisibleState = _React$useState2[0],
    setNumVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    totalShiftedItemsState = _React$useState4[0],
    setTotalShiftedItemsState = _React$useState4[1];
  var itemsContainerRef = React.useRef(null);
  var startPos = React.useRef(null);
  var attributeSelector = React.useRef('');
  var thumbnailsStyle = React.useRef(null);
  var responsiveOptions = React.useRef(null);
  var prevNumVisible = usePrevious(numVisibleState);
  var prevActiveItemIndex = usePrevious(props.activeItemIndex);
  var context = React.useContext(PrimeReactContext);
  var _useResizeListener = useResizeListener({
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
      DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
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
      DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
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
      thumbnailsStyle.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce);
    }
    var innerHTML = "\n            .p-galleria-thumbnail-items[".concat(attributeSelector.current, "] .p-galleria-thumbnail-item {\n                flex: 1 0 ").concat(100 / numVisibleState, "%\n            }\n        ");
    if (props.responsiveOptions) {
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return ObjectUtils.sort(value1, value2, -1, context && context.locale || PrimeReact.locale, context && context.nullSortOrder || PrimeReact.nullSortOrder);
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
  useMountEffect(function () {
    if (itemsContainerRef.current) {
      attributeSelector.current = UniqueComponentId();
      itemsContainerRef.current.setAttribute(attributeSelector.current, '');
    }
    createStyle();
    calculatePosition();
    bindWindowResizeListener();
  });
  useUpdateEffect(function () {
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
        DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
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
      return /*#__PURE__*/React.createElement(GalleriaThumbnailItem, {
        key: index,
        index: index,
        template: props.itemTemplate,
        item: item,
        active: isActive,
        start: start,
        end: end,
        onItemClick: onItemClick,
        current: current,
        ptm: props.ptm
      });
    });
  };
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0 || props.value.length <= numVisibleState;
      var buttonClassName = classNames('p-galleria-thumbnail-prev p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-galleria-thumbnail-prev-icon';
      var previousThumbnailIconProps = mergeProps({
        className: iconClassName
      }, props.ptm('previousThumbnailIcon'));
      var icon = props.isVertical ? props.prevThumbnailIcon || /*#__PURE__*/React.createElement(ChevronUpIcon, previousThumbnailIconProps) : props.prevThumbnailIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousThumbnailIconProps);
      var prevThumbnailIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, previousThumbnailIconProps), {
        props: props
      });
      var previousThumbnailButtonProps = mergeProps({
        className: buttonClassName,
        onClick: navBackward,
        disabled: isDisabled
      }, props.ptm('previousThumbnailButton'));
      return /*#__PURE__*/React.createElement("button", previousThumbnailButtonProps, prevThumbnailIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1 || props.value.length <= numVisibleState;
      var buttonClassName = classNames('p-galleria-thumbnail-next p-link', {
        'p-disabled': isDisabled
      });
      var iconClassName = 'p-galleria-thumbnail-next-icon';
      var nextThumbnailIconProps = mergeProps({
        className: iconClassName
      }, props.ptm('nextThumbnailIcon'));
      var icon = props.isVertical ? props.nextThumbnailIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, nextThumbnailIconProps) : props.nextThumbnailIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, nextThumbnailIconProps);
      var nextThumbnailIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, nextThumbnailIconProps), {
        props: props
      });
      var nextThumbnailButtonProps = mergeProps({
        className: buttonClassName,
        onClick: navForward,
        disabled: isDisabled
      }, props.ptm('nextThumbnailButton'));
      return /*#__PURE__*/React.createElement("button", nextThumbnailButtonProps, nextThumbnailIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createContent = function createContent() {
    var items = createItems();
    var height = props.isVertical ? props.contentHeight : '';
    var backwardNavigator = createBackwardNavigator();
    var forwardNavigator = createForwardNavigator();
    var thumbnailContainerProps = mergeProps({
      className: 'p-galleria-thumbnail-container'
    }, props.ptm('thumbnailContainer'));
    var thumbnailItemsContainerProps = mergeProps({
      className: 'p-galleria-thumbnail-items-container',
      style: {
        height: height
      }
    }, props.ptm('thumbnailItemsContainer'));
    var thumbnailItemsProps = mergeProps({
      ref: itemsContainerRef,
      className: 'p-galleria-thumbnail-items',
      onTransitionEnd: onTransitionEnd,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }, props.ptm('thumbnailItems'));
    return /*#__PURE__*/React.createElement("div", thumbnailContainerProps, backwardNavigator, /*#__PURE__*/React.createElement("div", thumbnailItemsContainerProps, /*#__PURE__*/React.createElement("div", thumbnailItemsProps, items)), forwardNavigator);
  };
  var content = createContent();
  var thumbnailWrapperProps = mergeProps({
    className: 'p-galleria-thumbnail-wrapper'
  }, props.ptm('thumbnailWrapper'));
  return /*#__PURE__*/React.createElement("div", thumbnailWrapperProps, content);
}));
GalleriaThumbnailItem.displayName = 'GalleriaThumbnailItem';
GalleriaThumbnails.displayName = 'GalleriaThumbnails';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Galleria = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = GalleriaBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    visibleState = _React$useState2[0],
    setVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(props.numVisible),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    numVisibleState = _React$useState4[0],
    setNumVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    slideShowActiveState = _React$useState6[0],
    setSlideShowActiveState = _React$useState6[1];
  var _React$useState7 = React.useState(props.activeIndex),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    activeIndexState = _React$useState8[0],
    setActiveIndexState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var previewContentRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var activeItemIndex = props.onItemChange ? props.activeIndex : activeIndexState;
  var isVertical = props.thumbnailsPosition === 'left' || props.thumbnailsPosition === 'right';
  var _GalleriaBase$setMeta = GalleriaBase.setMetaData({
      props: props,
      state: {
        visible: visibleState,
        numVisible: numVisibleState,
        slideShowActive: slideShowActiveState,
        activeIndex: activeIndexState
      }
    }),
    ptm = _GalleriaBase$setMeta.ptm;
  useInterval(function () {
    onActiveItemChange({
      index: props.circular && props.value.length - 1 === activeItemIndex ? 0 : activeItemIndex + 1
    });
  }, props.transitionInterval, slideShowActiveState);
  var onActiveItemChange = function onActiveItemChange(event) {
    if (event.index >= props.value.length) {
      // #3973 AutoPlay without circular should stop the slideshow when it reaches the end
      stopSlideShow();
      return;
    }
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
    DomHandler.addClass(document.body, 'p-overflow-hidden');
  };
  var onEntering = function onEntering() {
    ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex['modal'] || PrimeReact.zIndex['modal']);
    DomHandler.addMultipleClasses(maskRef.current, 'p-component-overlay p-component-overlay-enter');
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    DomHandler.removeClass(document.body, 'p-overflow-hidden');
    DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(maskRef.current);
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
  React.useEffect(function () {
    if (props.value && props.value.length < numVisibleState) {
      setNumVisibleState(props.value.length);
    }
  }, [props.value, numVisibleState]);
  React.useEffect(function () {
    setNumVisibleState(props.numVisible);
  }, [props.numVisible]);
  useUnmountEffect(function () {
    if (slideShowActiveState) {
      stopSlideShow();
    }
    ZIndexUtils.clear(maskRef.current);
  });
  React.useImperativeHandle(ref, function () {
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
    var headerProps = mergeProps({
      className: 'p-galleria-header'
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    var footerProps = mergeProps({
      className: 'p-galleria-footer'
    }, ptm('footer'));
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createElement = function createElement() {
    var thumbnailsPosClassName = props.showThumbnails && getPositionClassName('p-galleria-thumbnails', props.thumbnailsPosition);
    var indicatorPosClassName = props.showIndicators && getPositionClassName('p-galleria-indicators', props.indicatorsPosition);
    var galleriaClassName = classNames('p-galleria p-component', props.className, {
      'p-galleria-fullscreen': props.fullScreen,
      'p-galleria-indicator-onitem': props.showIndicatorsOnItem,
      'p-galleria-item-nav-onhover': props.showItemNavigatorsOnHover && !props.fullScreen,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    }, thumbnailsPosClassName, indicatorPosClassName);
    var iconProps = {
      className: 'p-galleria-close-icon',
      'aria-hidden': true
    };
    var closeIconProps = mergeProps({
      className: iconProps
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var closeButtonProps = mergeProps({
      type: 'button',
      className: 'p-galleria-close p-link',
      'aria-label': localeOption('close'),
      onClick: hide
    }, ptm('closeButton'));
    var closeButton = props.fullScreen && /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    var header = createHeader();
    var footer = createFooter();
    var rootProps = mergeProps({
      ref: elementRef,
      id: props.id,
      className: galleriaClassName,
      style: props.style
    }, GalleriaBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      className: 'p-galleria-content'
    }, ptm('content'));
    var element = /*#__PURE__*/React.createElement("div", rootProps, closeButton, header, /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement(GalleriaItem, {
      ref: previewContentRef,
      value: props.value,
      activeItemIndex: activeItemIndex,
      onActiveItemChange: onActiveItemChange,
      itemTemplate: props.item,
      circular: props.circular,
      caption: props.caption,
      showIndicators: props.showIndicators,
      itemPrevIcon: props.itemPrevIcon,
      itemNextIcon: props.itemNextIcon,
      changeItemOnIndicatorHover: props.changeItemOnIndicatorHover,
      indicator: props.indicator,
      showItemNavigators: props.showItemNavigators,
      autoPlay: props.autoPlay,
      slideShowActive: slideShowActiveState,
      startSlideShow: startSlideShow,
      stopSlideShow: stopSlideShow,
      ptm: ptm
    }), props.showThumbnails && /*#__PURE__*/React.createElement(GalleriaThumbnails, {
      value: props.value,
      activeItemIndex: activeItemIndex,
      onActiveItemChange: onActiveItemChange,
      itemTemplate: props.thumbnail,
      numVisible: numVisibleState,
      nextThumbnailIcon: props.nextThumbnailIcon,
      prevThumbnailIcon: props.prevThumbnailIcon,
      responsiveOptions: props.responsiveOptions,
      circular: props.circular,
      isVertical: isVertical,
      contentHeight: props.verticalThumbnailViewPortHeight,
      showThumbnailNavigators: props.showThumbnailNavigators,
      autoPlay: props.autoPlay,
      slideShowActive: slideShowActiveState,
      stopSlideShow: stopSlideShow,
      ptm: ptm
    })), footer);
    return element;
  };
  var createGalleria = function createGalleria() {
    var element = createElement();
    if (props.fullScreen) {
      var maskClassName = classNames('p-galleria-mask', {
        'p-galleria-visible': visibleState
      });
      var maskProps = mergeProps({
        ref: maskRef,
        className: maskClassName
      }, ptm('mask'));
      var galleriaWrapper = /*#__PURE__*/React.createElement("div", maskProps, /*#__PURE__*/React.createElement(CSSTransition, {
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
      return /*#__PURE__*/React.createElement(Portal, {
        element: galleriaWrapper
      });
    }
    return element;
  };
  return ObjectUtils.isNotEmpty(props.value) && createGalleria();
}));
Galleria.displayName = 'Galleria';

export { Galleria };
