'use client';
import * as React from 'react';
import PrimeReact, { localeOption, PrimeReactContext } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useMountEffect, usePrevious, useResizeListener, useUpdateEffect, useInterval, useUnmountEffect } from 'primereact/hooks';
import { TimesIcon } from 'primereact/icons/times';
import { Portal } from 'primereact/portal';
import { Ripple } from 'primereact/ripple';
import { classNames, IconUtils, DomHandler, UniqueComponentId, ObjectUtils, ZIndexUtils } from 'primereact/utils';
import { ChevronLeftIcon } from 'primereact/icons/chevronleft';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronUpIcon } from 'primereact/icons/chevronup';

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

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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

var classes = {
  header: 'p-galleria-header',
  footer: 'p-galleria-footer',
  closeIcon: 'p-galleria-close-icon',
  closeButton: 'p-galleria-close p-link',
  root: function root(_ref) {
    var props = _ref.props,
      context = _ref.context,
      thumbnailsPosClassName = _ref.thumbnailsPosClassName,
      indicatorPosClassName = _ref.indicatorPosClassName;
    return classNames('p-galleria p-component', {
      'p-galleria-fullscreen': props.fullScreen,
      'p-galleria-indicator-onitem': props.showIndicatorsOnItem,
      'p-galleria-item-nav-onhover': props.showItemNavigatorsOnHover && !props.fullScreen,
      'p-input-filled': context && context.inputStyle === 'filled' || PrimeReact.inputStyle === 'filled',
      'p-ripple-disabled': context && context.ripple === false || PrimeReact.ripple === false
    }, thumbnailsPosClassName, indicatorPosClassName);
  },
  content: 'p-galleria-content',
  mask: function mask(_ref2) {
    var visibleState = _ref2.visibleState;
    return classNames('p-galleria-mask', {
      'p-galleria-visible': visibleState
    });
  },
  thumbnailItem: function thumbnailItem(_ref3) {
    var subProps = _ref3.subProps;
    return classNames('p-galleria-thumbnail-item', {
      'p-galleria-thumbnail-item-current': subProps.current,
      'p-galleria-thumbnail-item-active': subProps.active,
      'p-galleria-thumbnail-item-start': subProps.start,
      'p-galleria-thumbnail-item-end': subProps.end
    });
  },
  thumbnailItemContent: 'p-galleria-thumbnail-item-content',
  previousThumbnailIcon: 'p-galleria-thumbnail-prev-icon',
  previousThumbnailButton: function previousThumbnailButton(_ref4) {
    var isDisabled = _ref4.isDisabled;
    return classNames('p-galleria-thumbnail-prev p-link', {
      'p-disabled': isDisabled
    });
  },
  nextThumbnailIcon: 'p-galleria-thumbnail-next-icon',
  nextThumbnailButton: function nextThumbnailButton(_ref5) {
    var isDisabled = _ref5.isDisabled;
    return classNames('p-galleria-thumbnail-next p-link', {
      'p-disabled': isDisabled
    });
  },
  thumbnailContainer: 'p-galleria-thumbnail-container',
  thumbnailItemsContainer: 'p-galleria-thumbnail-items-container',
  thumbnailItems: 'p-galleria-thumbnail-items',
  thumbnailWrapper: 'p-galleria-thumbnail-wrapper',
  previousItemIcon: 'p-galleria-item-prev-icon',
  previousItemButton: function previousItemButton(_ref6) {
    var isDisabled = _ref6.isDisabled;
    return classNames('p-galleria-item-prev p-galleria-item-nav p-link', {
      'p-disabled': isDisabled
    });
  },
  nextItemIcon: 'p-galleria-item-next-icon',
  nextItemButton: function nextItemButton(_ref7) {
    var isDisabled = _ref7.isDisabled;
    return classNames('p-galleria-item-next p-galleria-item-nav p-link', {
      'p-disabled': isDisabled
    });
  },
  caption: 'p-galleria-caption',
  indicator: function indicator(_ref8) {
    var isActive = _ref8.isActive;
    return classNames('p-galleria-indicator', {
      'p-highlight': isActive
    });
  },
  indicators: 'p-galleria-indicators p-reset',
  itemWrapper: 'p-galleria-item-wrapper',
  itemContainer: 'p-galleria-item-container',
  item: 'p-galleria-item',
  transition: 'p-galleria'
};
var styles = "\n@layer primereact {\n    .p-galleria-content {\n        display: flex;\n        flex-direction: column;\n    }\n    \n    .p-galleria-item-wrapper {\n        display: flex;\n        flex-direction: column;\n        position: relative;\n    }\n    \n    .p-galleria-item-container {\n        position: relative;\n        display: flex;\n        height: 100%;\n    }\n    \n    .p-galleria-item-nav {\n        position: absolute;\n        top: 50%;\n        margin-top: -.5rem;\n        display: inline-flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n    }\n    \n    .p-galleria-item-prev {\n        left: 0;\n        border-top-left-radius: 0;\n        border-bottom-left-radius: 0;\n    }\n    \n    .p-galleria-item-next {\n        right: 0;\n        border-top-right-radius: 0;\n        border-bottom-right-radius: 0;\n    }\n    \n    .p-galleria-item {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n    }\n    \n    .p-galleria-item-nav-onhover .p-galleria-item-nav {\n        pointer-events: none;\n        opacity: 0;\n        transition: opacity .2s ease-in-out;\n    }\n    \n    .p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav {\n        pointer-events: all;\n        opacity: 1;\n    }\n    \n    .p-galleria-item-nav-onhover .p-galleria-item-wrapper:hover .p-galleria-item-nav.p-disabled {\n        pointer-events: none;\n    }\n    \n    .p-galleria-caption {\n        position: absolute;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n    }\n    \n    /* Thumbnails */\n    .p-galleria-thumbnail-wrapper {\n        display: flex;\n        flex-direction: column;\n        overflow: auto;\n        flex-shrink: 0;\n    }\n    \n    .p-galleria-thumbnail-prev,\n    .p-galleria-thumbnail-next {\n        align-self: center;\n        flex: 0 0 auto;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n        position: relative;\n    }\n    \n    .p-galleria-thumbnail-prev span,\n    .p-galleria-thumbnail-next span {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n    \n    .p-galleria-thumbnail-container {\n        display: flex;\n        flex-direction: row;\n    }\n    \n    .p-galleria-thumbnail-items-container {\n        overflow: hidden;\n        width: 100%;\n    }\n    \n    .p-galleria-thumbnail-items {\n        display: flex;\n    }\n    \n    .p-galleria-thumbnail-item {\n        overflow: auto;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        opacity: .5;\n    }\n    \n    .p-galleria-thumbnail-item:hover {\n        opacity: 1;\n        transition: opacity .3s;\n    }\n    \n    .p-galleria-thumbnail-item-current {\n        opacity: 1;\n    }\n    \n    /* Positions */\n    /* Thumbnails */\n    .p-galleria-thumbnails-left .p-galleria-content,\n    .p-galleria-thumbnails-right .p-galleria-content {\n        flex-direction: row;\n    }\n    \n    .p-galleria-thumbnails-left .p-galleria-item-wrapper,\n    .p-galleria-thumbnails-right .p-galleria-item-wrapper {\n        flex-direction: row;\n    }\n    \n    .p-galleria-thumbnails-left .p-galleria-item-wrapper,\n    .p-galleria-thumbnails-top .p-galleria-item-wrapper {\n        order: 2;\n    }\n    \n    .p-galleria-thumbnails-left .p-galleria-thumbnail-wrapper,\n    .p-galleria-thumbnails-top .p-galleria-thumbnail-wrapper {\n        order: 1;\n    }\n    \n    .p-galleria-thumbnails-left .p-galleria-thumbnail-container,\n    .p-galleria-thumbnails-right .p-galleria-thumbnail-container {\n        flex-direction: column;\n        flex-grow: 1;\n    }\n    \n    .p-galleria-thumbnails-left .p-galleria-thumbnail-items,\n    .p-galleria-thumbnails-right .p-galleria-thumbnail-items {\n        flex-direction: column;\n        height: 100%;\n    }\n    \n    /* Indicators */\n    .p-galleria-indicators {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-galleria-indicator > button {\n        display: inline-flex;\n        align-items: center;\n    }\n    \n    .p-galleria-indicators-left .p-galleria-item-wrapper,\n    .p-galleria-indicators-right .p-galleria-item-wrapper {\n        flex-direction: row;\n        align-items: center;\n    }\n    \n    .p-galleria-indicators-left .p-galleria-item-container,\n    .p-galleria-indicators-top .p-galleria-item-container {\n        order: 2;\n    }\n    \n    .p-galleria-indicators-left .p-galleria-indicators,\n    .p-galleria-indicators-top .p-galleria-indicators {\n        order: 1;\n    }\n    \n    .p-galleria-indicators-left .p-galleria-indicators,\n    .p-galleria-indicators-right .p-galleria-indicators {\n        flex-direction: column;\n    }\n    \n    .p-galleria-indicator-onitem .p-galleria-indicators {\n        position: absolute;\n        display: flex;\n        z-index: 1;\n    }\n    \n    .p-galleria-indicator-onitem.p-galleria-indicators-top .p-galleria-indicators {\n        top: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-start;\n    }\n    \n    .p-galleria-indicator-onitem.p-galleria-indicators-right .p-galleria-indicators {\n        right: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-end;\n    }\n    \n    .p-galleria-indicator-onitem.p-galleria-indicators-bottom .p-galleria-indicators {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        align-items: flex-end;\n    }\n    \n    .p-galleria-indicator-onitem.p-galleria-indicators-left .p-galleria-indicators {\n        left: 0;\n        top: 0;\n        height: 100%;\n        align-items: flex-start;\n    }\n    \n    /* FullScreen */\n    .p-galleria-mask {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        pointer-events: none;\n    }\n    \n    .p-galleria-mask.p-component-overlay {\n        pointer-events: auto;\n    }\n    \n    .p-galleria-close {\n        position: absolute;\n        top: 0;\n        right: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        overflow: hidden;\n    }\n    \n    .p-galleria-mask .p-galleria-item-nav {\n        position: fixed;\n        top: 50%;\n        margin-top: -.5rem;\n    }\n    \n    /* Animation */\n    .p-galleria-enter {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n    \n    .p-galleria-enter-active {\n        opacity: 1;\n        transform: scale(1);\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n    \n    .p-galleria-enter-done {\n        transform: none;\n    }\n    \n    .p-galleria-exit {\n        opacity: 1;\n    }\n    \n    .p-galleria-exit-active {\n        opacity: 0;\n        transform: scale(0.7);\n        transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);\n    }\n    \n    .p-galleria-enter-active .p-galleria-item-nav {\n        opacity: 0;\n    }\n    \n    /* Keyboard Support */\n    .p-items-hidden .p-galleria-thumbnail-item {\n        visibility: hidden;\n    }\n    \n    .p-items-hidden .p-galleria-thumbnail-item.p-galleria-thumbnail-item-active {\n        visibility: visible;\n    }\n}\n";
var inlineStyles = {
  thumbnailItemsContainer: function thumbnailItemsContainer(_ref9) {
    var height = _ref9.height;
    return {
      height: height
    };
  }
};
var GalleriaBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Galleria',
    activeIndex: 0,
    autoPlay: false,
    baseZIndex: 0,
    caption: null,
    changeItemOnIndicatorHover: false,
    children: undefined,
    circular: false,
    className: null,
    closeIcon: null,
    footer: null,
    fullScreen: false,
    header: null,
    id: null,
    indicator: null,
    indicatorsPosition: 'bottom',
    item: null,
    itemNextIcon: null,
    itemPrevIcon: null,
    nextThumbnailIcon: null,
    numVisible: 3,
    onHide: null,
    onItemChange: null,
    onShow: null,
    prevThumbnailIcon: null,
    responsiveOptions: null,
    showIndicators: false,
    showIndicatorsOnItem: false,
    showItemNavigators: false,
    showItemNavigatorsOnHover: false,
    showThumbnailNavigators: true,
    showThumbnails: true,
    style: null,
    thumbnail: null,
    thumbnailsPosition: 'bottom',
    transitionInterval: 4000,
    transitionOptions: null,
    value: null,
    verticalThumbnailViewPortHeight: '300px'
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

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

function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var GalleriaItem = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
  var indicatorContent = React.useRef(null);
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$2({
      hostName: props.hostName
    }, options));
  };
  var ariaSlideNumber = function ariaSlideNumber(value) {
    return localeOption('aria') ? localeOption('aria').slideNumber.replace(/{slideNumber}/g, value) : undefined;
  };
  var ariaPageLabel = function ariaPageLabel(value) {
    return localeOption('aria') ? localeOption('aria').pageLabel.replace(/{page}/g, value) : undefined;
  };
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
    switch (event.code) {
      case 'Enter':
      case 'NumpadEnter':
      case 'Space':
        stopSlideShow();
        props.onActiveItemChange({
          index: index
        });
        event.preventDefault();
        break;
      case 'ArrowRight':
        onRightKey();
        break;
      case 'ArrowLeft':
        onLeftKey();
        break;
      case 'Home':
        onHomeKey();
        event.preventDefault();
        break;
      case 'End':
        onEndKey();
        event.preventDefault();
        break;
      case 'Tab':
        onTabKey();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
        break;
    }
  };
  var onRightKey = function onRightKey() {
    var indicators = _toConsumableArray(DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
  };
  var onLeftKey = function onLeftKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
  };
  var onHomeKey = function onHomeKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, 0);
  };
  var onEndKey = function onEndKey() {
    var indicators = _toConsumableArray(DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, indicators.length - 1);
  };
  var onTabKey = function onTabKey() {
    var indicators = _toConsumableArray(DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var highlightedIndex = indicators.findIndex(function (ind) {
      return DomHandler.getAttribute(ind, 'data-p-highlight') === true;
    });
    var activeIndicator = DomHandler.findSingle(indicatorContent.current, '[data-pc-section="indicator"] > button[tabindex="0"]');
    var activeIndex = indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
    indicators[activeIndex].children[0].tabIndex = '-1';
    indicators[highlightedIndex].children[0].tabIndex = '0';
  };
  var findFocusedIndicatorIndex = function findFocusedIndicatorIndex() {
    var indicators = _toConsumableArray(DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    var activeIndicator = DomHandler.findSingle(indicatorContent.current, '[data-pc-section="indicator"] > button[tabindex="0"]');
    return indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
  };
  var changedFocusedIndicator = function changedFocusedIndicator(prevInd, nextInd) {
    var indicators = _toConsumableArray(DomHandler.find(indicatorContent.current, '[data-pc-section="indicator"]'));
    indicators[prevInd].children[0].tabIndex = '-1';
    indicators[nextInd].children[0].tabIndex = '0';
    indicators[nextInd].children[0].focus();
  };
  useMountEffect(function () {
    if (props.autoPlay) {
      props.startSlideShow();
    }
  });
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0;
      var previousItemIconProps = mergeProps({
        className: cx('previousItemIcon')
      }, getPTOptions('previousItemIcon'));
      var icon = props.itemPrevIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousItemIconProps);
      var itemPrevIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, previousItemIconProps), {
        props: props
      });
      var previousItemButtonProps = mergeProps({
        type: 'button',
        className: cx('previousItemButton', {
          isDisabled: isDisabled
        }),
        onClick: navBackward,
        disabled: isDisabled,
        'data-p-disabled': isDisabled,
        'data-pc-group-section': 'itemnavigator'
      }, getPTOptions('previousItemButton'));
      return /*#__PURE__*/React.createElement("button", previousItemButtonProps, itemPrevIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showItemNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1;
      var nextItemIconProps = mergeProps({
        className: cx('nextItemIcon')
      }, getPTOptions('nextItemIcon'));
      var icon = props.itemNextIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, nextItemIconProps);
      var itemNextIcon = IconUtils.getJSXIcon(icon, _objectSpread$2({}, nextItemIconProps), {
        props: props
      });
      var nextItemButtonProps = mergeProps({
        type: 'button',
        className: cx('nextItemButton', {
          isDisabled: isDisabled
        }),
        onClick: navForward,
        disabled: isDisabled,
        'data-p-disabled': isDisabled,
        'data-pc-group-section': 'itemnavigator'
      }, getPTOptions('nextItemButton'));
      return /*#__PURE__*/React.createElement("button", nextItemButtonProps, itemNextIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createCaption = function createCaption() {
    var captionProps = mergeProps({
      className: cx('caption')
    }, getPTOptions('caption'));
    if (props.caption) {
      var _content = props.caption(props.value[props.activeItemIndex]);
      return /*#__PURE__*/React.createElement("div", captionProps, _content);
    }
    return null;
  };
  var createIndicator = function createIndicator(index) {
    var key = 'p-galleria-indicator-' + index;
    var isActive = props.activeItemIndex === index;
    var indicator = props.indicator && props.indicator(index);
    var indicatorProps = mergeProps({
      className: cx('indicator', {
        isActive: isActive
      }),
      key: key,
      tabIndex: 0,
      'aria-label': ariaPageLabel(index + 1),
      'aria-selected': props.activeIndex === index,
      'aria-controls': props.id + '_item_' + index,
      'data-p-highlight': isActive,
      onClick: function onClick() {
        return onIndicatorClick(index);
      },
      onMouseEnter: function onMouseEnter() {
        return onIndicatorMouseEnter(index);
      },
      onKeyDown: function onKeyDown(e) {
        return onIndicatorKeyDown(e, index);
      }
    }, getPTOptions('indicator'));
    if (!indicator) {
      indicator = /*#__PURE__*/React.createElement("button", {
        tabIndex: props.activeIndex === index ? '0' : '-1',
        type: "button",
        className: "p-link"
      }, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return /*#__PURE__*/React.createElement("li", indicatorProps, indicator);
  };
  var createIndicators = function createIndicators() {
    if (props.showIndicators) {
      var _indicators = [];
      var indicatorsProps = mergeProps({
        className: classNames(props.indicatorsContentClassName, cx('indicators'))
      }, getPTOptions('indicators'));
      for (var i = 0; i < props.value.length; i++) {
        _indicators.push(createIndicator(i));
      }
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: indicatorContent
      }, indicatorsProps), _indicators);
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
    className: cx('itemWrapper')
  }, getPTOptions('itemWrapper'));
  var itemContainerProps = mergeProps({
    className: cx('itemContainer')
  }, getPTOptions('itemContainer'));
  var itemProps = mergeProps({
    className: cx('item'),
    id: props.id + '_item_' + props.activeItemIndex,
    role: 'group',
    'aria-label': ariaSlideNumber(props.activeItemIndex + 1),
    'aria-roledescription': localeOption('aria') ? localeOption('aria').slide : undefined
  }, getPTOptions('item'));
  return /*#__PURE__*/React.createElement("div", itemWrapperProps, /*#__PURE__*/React.createElement("div", itemContainerProps, backwardNavigator, /*#__PURE__*/React.createElement("div", itemProps, content), forwardNavigator, caption), indicators);
}));
GalleriaItem.displayName = 'GalleriaItem';

function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var GalleriaThumbnailItem = /*#__PURE__*/React.memo(function (props) {
  var mergeProps = useMergeProps();
  var ptm = props.ptm,
    cx = props.cx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
  var onItemClick = function onItemClick(event) {
    props.onItemClick({
      originalEvent: event,
      index: props.index
    });
  };
  var ariaPageLabel = function ariaPageLabel(value) {
    return localeOption('aria') ? localeOption('aria').pageLabel.replace(/{page}/g, value) : undefined;
  };
  var onThumbnailKeydown = function onThumbnailKeydown(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
      props.onItemClick({
        originalEvent: event,
        index: props.index
      });
      event.preventDefault();
    }
    switch (event.code) {
      case 'ArrowRight':
        onRightKey();
        break;
      case 'ArrowLeft':
        onLeftKey();
        break;
      case 'Home':
        onHomeKey();
        event.preventDefault();
        break;
      case 'End':
        onEndKey();
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        break;
      case 'Tab':
        onTabKey();
        break;
    }
  };
  var onRightKey = function onRightKey() {
    var indicators = DomHandler.find(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"]');
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
  };
  var onLeftKey = function onLeftKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
  };
  var onHomeKey = function onHomeKey() {
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, 0);
  };
  var onEndKey = function onEndKey() {
    var indicators = DomHandler.find(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"]');
    var activeIndex = findFocusedIndicatorIndex();
    changedFocusedIndicator(activeIndex, indicators.length - 1);
  };
  var onTabKey = function onTabKey() {
    var indicators = _toConsumableArray(DomHandler.find(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"]'));
    var highlightedIndex = indicators.findIndex(function (ind) {
      return DomHandler.getAttribute(ind, 'data-p-active') === true;
    });
    var activeIndicator = DomHandler.findSingle(props.itemsContainerRef.current, '[tabindex="0"]');
    var activeIndex = indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
    indicators[activeIndex].children[0].tabIndex = '-1';
    indicators[highlightedIndex].children[0].tabIndex = '0';
  };
  var findFocusedIndicatorIndex = function findFocusedIndicatorIndex() {
    var indicators = _toConsumableArray(DomHandler.find(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"]'));
    var activeIndicator = DomHandler.findSingle(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
    return indicators.findIndex(function (ind) {
      return ind === activeIndicator.parentElement;
    });
  };
  var changedFocusedIndicator = function changedFocusedIndicator(prevInd, nextInd) {
    var indicators = DomHandler.find(props.itemsContainerRef.current, '[data-pc-section="thumbnailitem"]');
    indicators[prevInd].children[0].tabIndex = '-1';
    indicators[nextInd].children[0].tabIndex = '0';
    indicators[nextInd].children[0].focus();
  };
  var content = props.template && props.template(props.item);
  var thumbnailItemProps = mergeProps({
    className: classNames(props.className, cx('thumbnailItem', {
      subProps: props
    })),
    key: 'p-galleria-thumbnail-item-' + props.index,
    role: 'tab',
    'data-p-active': props.current,
    'aria-selected': props.current,
    'aria-controls': props.containerId + '_item_' + props.index,
    onKeyDown: onThumbnailKeydown,
    'data-p-galleria-thumbnail-item-current': props.current,
    'data-p-galleria-thumbnail-item-active': props.active,
    'data-p-galleria-thumbnail-item-start': props.start,
    'data-p-galleria-thumbnail-item-end': props.end
  }, getPTOptions('thumbnailItem'));
  var thumbnailItemContentProps = mergeProps({
    className: cx('thumbnailItemContent'),
    tabIndex: props.current ? '0' : '-1',
    'aria-label': ariaPageLabel(props.index + 1),
    'aria-current': props.current ? 'page' : undefined,
    onClick: onItemClick
  }, getPTOptions('thumbnailItemContent'));
  return /*#__PURE__*/React.createElement("div", thumbnailItemProps, /*#__PURE__*/React.createElement("div", thumbnailItemContentProps, content));
});
var GalleriaThumbnails = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var mergeProps = useMergeProps();
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
  var ptm = props.ptm,
    cx = props.cx,
    sx = props.sx;
  var getPTOptions = function getPTOptions(key, options) {
    return ptm(key, _objectSpread$1({
      hostName: props.hostName
    }, options));
  };
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
      document.body.setAttribute('data-p-items-hidden', 'false');
      !props.isUnstyled() && DomHandler.addClass(itemsContainerRef.current, 'p-items-hidden');
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
      thumbnailsStyle.current = DomHandler.createInlineStyle(context && context.nonce || PrimeReact.nonce, context && context.styleContainer);
    }
    var innerHTML = "\n            [data-pc-section=\"thumbnailitems\"][".concat(attributeSelector.current, "] {\n                [data-pc-section=\"thumbnailitem\"] {\n                    flex: 1 0 ").concat(100 / numVisibleState, "%\n                }\n            } \n        ");
    if (props.responsiveOptions) {
      var comparator = ObjectUtils.localeComparator(context && context.locale || PrimeReact.locale);
      responsiveOptions.current = _toConsumableArray(props.responsiveOptions);
      responsiveOptions.current.sort(function (data1, data2) {
        var value1 = data1.breakpoint;
        var value2 = data2.breakpoint;
        return ObjectUtils.sort(value1, value2, -1, comparator, context && context.nullSortOrder || PrimeReact.nullSortOrder);
      });
      for (var i = 0; i < responsiveOptions.current.length; i++) {
        var res = responsiveOptions.current[i];
        innerHTML = innerHTML + "\n                    @media screen and (max-width: ".concat(res.breakpoint, ") {\n                        [data-pc-section=\"thumbnailitems\"][").concat(attributeSelector.current, "] {\n                            [data-pc-section=\"thumbnailitem\"] {\n                                flex: 1 0 ").concat(100 / res.numVisible, "%\n                            }\n                        } \n                    }\n                ");
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
        document.body.setAttribute('data-p-items-hidden', 'false');
        !props.isUnstyled() && DomHandler.removeClass(itemsContainerRef.current, 'p-items-hidden');
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
        containerId: props.containerId,
        itemsContainerRef: itemsContainerRef,
        template: props.itemTemplate,
        item: item,
        active: isActive,
        start: start,
        end: end,
        onItemClick: onItemClick,
        current: current,
        ptm: ptm,
        cx: cx,
        sx: sx
      });
    });
  };
  var createBackwardNavigator = function createBackwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === 0 || props.value.length <= numVisibleState;
      var previousThumbnailIconProps = mergeProps({
        className: cx('previousThumbnailIcon')
      }, getPTOptions('previousThumbnailIcon'));
      var icon = props.isVertical ? props.prevThumbnailIcon || /*#__PURE__*/React.createElement(ChevronUpIcon, previousThumbnailIconProps) : props.prevThumbnailIcon || /*#__PURE__*/React.createElement(ChevronLeftIcon, previousThumbnailIconProps);
      var prevThumbnailIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, previousThumbnailIconProps), {
        props: props
      });
      var previousThumbnailButtonProps = mergeProps({
        className: cx('previousThumbnailButton', {
          isDisabled: isDisabled
        }),
        onClick: navBackward,
        type: 'button',
        disabled: isDisabled,
        'data-p-disabled': isDisabled,
        'aria-label': localeOption('aria') ? localeOption('aria').previousPageLabel : undefined,
        'data-pc-group-section': 'thumbnailnavigator'
      }, getPTOptions('previousThumbnailButton'));
      return /*#__PURE__*/React.createElement("button", previousThumbnailButtonProps, prevThumbnailIcon, /*#__PURE__*/React.createElement(Ripple, null));
    }
    return null;
  };
  var createForwardNavigator = function createForwardNavigator() {
    if (props.showThumbnailNavigators) {
      var isDisabled = !props.circular && props.activeItemIndex === props.value.length - 1 || props.value.length <= numVisibleState;
      var nextThumbnailIconProps = mergeProps({
        className: cx('nextThumbnailIcon')
      }, getPTOptions('nextThumbnailIcon'));
      var icon = props.isVertical ? props.nextThumbnailIcon || /*#__PURE__*/React.createElement(ChevronDownIcon, nextThumbnailIconProps) : props.nextThumbnailIcon || /*#__PURE__*/React.createElement(ChevronRightIcon, nextThumbnailIconProps);
      var nextThumbnailIcon = IconUtils.getJSXIcon(icon, _objectSpread$1({}, nextThumbnailIconProps), {
        props: props
      });
      var nextThumbnailButtonProps = mergeProps({
        className: cx('nextThumbnailButton', {
          isDisabled: isDisabled
        }),
        disabled: isDisabled,
        type: 'button',
        'aria-label': localeOption('aria') ? localeOption('aria').nextPageLabel : undefined,
        onClick: navForward,
        'data-p-disabled': isDisabled,
        'data-pc-group-section': 'thumbnailnavigator'
      }, getPTOptions('nextThumbnailButton'));
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
      className: cx('thumbnailContainer')
    }, getPTOptions('thumbnailContainer'));
    var thumbnailItemsContainerProps = mergeProps({
      className: cx('thumbnailItemsContainer'),
      style: sx('thumbnailItemsContainer', {
        height: height
      })
    }, getPTOptions('thumbnailItemsContainer'));
    var thumbnailItemsProps = mergeProps({
      ref: itemsContainerRef,
      className: cx('thumbnailItems'),
      role: 'tablist',
      onTransitionEnd: onTransitionEnd,
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }, getPTOptions('thumbnailItems'));
    return /*#__PURE__*/React.createElement("div", thumbnailContainerProps, backwardNavigator, /*#__PURE__*/React.createElement("div", thumbnailItemsContainerProps, /*#__PURE__*/React.createElement("div", thumbnailItemsProps, items)), forwardNavigator);
  };
  var content = createContent();
  var thumbnailWrapperProps = mergeProps({
    className: cx('thumbnailWrapper')
  }, getPTOptions('thumbnailWrapper'));
  return /*#__PURE__*/React.createElement("div", thumbnailWrapperProps, content);
}));
GalleriaThumbnailItem.displayName = 'GalleriaThumbnailItem';
GalleriaThumbnails.displayName = 'GalleriaThumbnails';

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Galleria = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
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
  var id = props.id || UniqueComponentId();
  var _GalleriaBase$setMeta = GalleriaBase.setMetaData({
      props: props,
      state: {
        visible: visibleState,
        numVisible: numVisibleState,
        slideShowActive: slideShowActiveState,
        activeIndex: activeIndexState
      }
    }),
    ptm = _GalleriaBase$setMeta.ptm,
    cx = _GalleriaBase$setMeta.cx,
    sx = _GalleriaBase$setMeta.sx,
    isUnstyled = _GalleriaBase$setMeta.isUnstyled;
  useHandleStyle(GalleriaBase.css.styles, isUnstyled, {
    name: 'galleria'
  });
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
    DomHandler.blockBodyScroll();
  };
  var onEntering = function onEntering() {
    ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, props.baseZIndex || context && context.zIndex.modal || PrimeReact.zIndex.modal);
    !isUnstyled() && DomHandler.addMultipleClasses(maskRef.current, 'p-component-overlay p-component-overlay-enter');
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    DomHandler.unblockBodyScroll();
    !isUnstyled() && DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
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
      className: cx('header')
    }, ptm('header'));
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", headerProps, props.header);
    }
    return null;
  };
  var createFooter = function createFooter() {
    var footerProps = mergeProps({
      className: cx('footer')
    }, ptm('footer'));
    if (props.footer) {
      return /*#__PURE__*/React.createElement("div", footerProps, props.footer);
    }
    return null;
  };
  var createElement = function createElement() {
    var thumbnailsPosClassName = props.showThumbnails && getPositionClassName('p-galleria-thumbnails', props.thumbnailsPosition);
    var indicatorPosClassName = props.showIndicators && getPositionClassName('p-galleria-indicators', props.indicatorsPosition);
    var closeIconProps = mergeProps({
      className: cx('closeIcon'),
      'aria-hidden': true
    }, ptm('closeIcon'));
    var icon = props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, closeIconProps);
    var closeIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, closeIconProps), {
      props: props
    });
    var closeButtonProps = mergeProps({
      type: 'button',
      className: cx('closeButton'),
      'aria-label': localeOption('aria') ? localeOption('aria').close : undefined,
      onClick: hide
    }, ptm('closeButton'));
    var closeButton = props.fullScreen && /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon, /*#__PURE__*/React.createElement(Ripple, null));
    var header = createHeader();
    var footer = createFooter();
    var rootProps = mergeProps({
      ref: elementRef,
      id: id,
      className: classNames(props.className, cx('root', {
        context: context,
        thumbnailsPosClassName: thumbnailsPosClassName,
        indicatorPosClassName: indicatorPosClassName
      })),
      style: props.style,
      role: 'region'
    }, GalleriaBase.getOtherProps(props), ptm('root'));
    var contentProps = mergeProps({
      className: cx('content'),
      'aria-live': props.autoPlay ? 'polite' : 'off'
    }, ptm('content'));
    var element = /*#__PURE__*/React.createElement("div", rootProps, closeButton, header, /*#__PURE__*/React.createElement("div", contentProps, /*#__PURE__*/React.createElement(GalleriaItem, {
      hostName: "Galleria",
      ref: previewContentRef,
      id: id,
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
      ptm: ptm,
      cx: cx
    }), props.showThumbnails && /*#__PURE__*/React.createElement(GalleriaThumbnails, {
      hostName: "Galleria",
      value: props.value,
      containerId: id,
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
      isUnstyled: isUnstyled,
      ptm: ptm,
      cx: cx,
      sx: sx
    })), footer);
    return element;
  };
  var createGalleria = function createGalleria() {
    var element = createElement();
    if (props.fullScreen) {
      var maskProps = mergeProps({
        className: cx('mask', {
          visibleState: visibleState
        }),
        role: 'dialog',
        'aria-modal': 'true'
      }, ptm('mask'));
      var transitionProps = mergeProps({
        classNames: cx('transition'),
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
      }, ptm('transition'));
      var galleriaWrapper = /*#__PURE__*/React.createElement("div", _extends({
        ref: maskRef
      }, maskProps), /*#__PURE__*/React.createElement(CSSTransition, _extends({
        nodeRef: elementRef
      }, transitionProps), element));
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
