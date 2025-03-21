'use client';
import * as React from 'react';
import PrimeReact, { PrimeReactContext, localeOption } from 'primereact/api';
import { ComponentBase, useHandleStyle } from 'primereact/componentbase';
import { CSSTransition } from 'primereact/csstransition';
import { useMergeProps, useGlobalOnEscapeKey, ESC_KEY_HANDLING_PRIORITIES, useUnmountEffect } from 'primereact/hooks';
import { IconBase } from 'primereact/iconbase';
import { EyeIcon } from 'primereact/icons/eye';
import { RefreshIcon } from 'primereact/icons/refresh';
import { SearchMinusIcon } from 'primereact/icons/searchminus';
import { SearchPlusIcon } from 'primereact/icons/searchplus';
import { TimesIcon } from 'primereact/icons/times';
import { UndoIcon } from 'primereact/icons/undo';
import { Portal } from 'primereact/portal';
import { classNames, DomHandler, ZIndexUtils, IconUtils, ObjectUtils } from 'primereact/utils';

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

var DownloadIcon = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var pti = IconBase.getPTI(inProps);
  return /*#__PURE__*/React.createElement("svg", _extends({
    ref: ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.0118 10C6.93296 10.0003 6.85484 9.98495 6.78202 9.95477C6.7091 9.92454 6.64297 9.88008 6.58749 9.82399L3.38288 6.62399C3.27675 6.51025 3.21897 6.35982 3.22171 6.20438C3.22446 6.04893 3.28752 5.90063 3.39761 5.7907C3.5077 5.68077 3.65622 5.6178 3.81188 5.61505C3.96755 5.61231 4.1182 5.67001 4.23211 5.77599L6.41125 7.95201V0.6C6.41125 0.44087 6.47456 0.288258 6.58724 0.175736C6.69993 0.063214 6.85276 0 7.01212 0C7.17148 0 7.32431 0.063214 7.43699 0.175736C7.54968 0.288258 7.61298 0.44087 7.61298 0.6V7.95198L9.7921 5.77599C9.90601 5.67001 10.0567 5.61231 10.2123 5.61505C10.368 5.6178 10.5165 5.68077 10.6266 5.7907C10.7367 5.90063 10.7997 6.04893 10.8025 6.20438C10.8052 6.35982 10.7475 6.51025 10.6413 6.62399L7.43671 9.82399C7.38124 9.88008 7.3151 9.92454 7.24219 9.95477C7.16938 9.98495 7.09127 10.0003 7.01244 10C7.01233 10 7.01223 10 7.01212 10C7.01201 10 7.0119 10 7.0118 10ZM13.45 13.3115C13.0749 13.7235 12.5521 13.971 11.9952 14H2.02889C1.75106 13.9887 1.47819 13.9228 1.2259 13.806C0.973606 13.6893 0.74684 13.524 0.558578 13.3197C0.370316 13.1153 0.224251 12.8759 0.128742 12.6152C0.0332333 12.3544 -0.00984502 12.0774 0.00197194 11.8V9.39999C0.00197194 9.24086 0.065277 9.08825 0.177961 8.97572C0.290645 8.8632 0.443477 8.79999 0.602836 8.79999C0.762195 8.79999 0.915027 8.8632 1.02771 8.97572C1.1404 9.08825 1.2037 9.24086 1.2037 9.39999V11.8C1.18301 12.0375 1.25469 12.2739 1.40385 12.4601C1.55302 12.6463 1.76823 12.768 2.00485 12.8H11.9952C12.2318 12.768 12.4471 12.6463 12.5962 12.4601C12.7454 12.2739 12.8171 12.0375 12.7964 11.8V9.39999C12.7964 9.24086 12.8597 9.08825 12.9724 8.97572C13.085 8.8632 13.2379 8.79999 13.3972 8.79999C13.5566 8.79999 13.7094 8.8632 13.8221 8.97572C13.9348 9.08825 13.9981 9.24086 13.9981 9.39999V11.8C14.0221 12.3563 13.8251 12.8995 13.45 13.3115Z",
    fill: "currentColor"
  }));
}));
DownloadIcon.displayName = 'DownloadIcon';

var classes = {
  button: 'p-image-preview-indicator',
  mask: 'p-image-mask p-component-overlay p-component-overlay-enter',
  toolbar: 'p-image-toolbar',
  downloadButton: 'p-image-action p-link',
  rotateRightButton: 'p-image-action p-link',
  rotateLeftButton: 'p-image-action p-link',
  zoomOutButton: 'p-image-action p-link',
  zoomInButton: 'p-image-action p-link',
  closeButton: 'p-image-action p-link',
  preview: 'p-image-preview',
  icon: 'p-image-preview-icon',
  root: function root(_ref) {
    var props = _ref.props;
    return classNames('p-image p-component', {
      'p-image-preview-container': props.preview
    });
  },
  transition: 'p-image-preview'
};
var styles = "\n@layer primereact {\n    .p-image-mask {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n    \n    .p-image-preview-container {\n        position: relative;\n        display: inline-block;\n        line-height: 0;\n    }\n    \n    .p-image-preview-indicator {\n        position: absolute;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        opacity: 0;\n        transition: opacity .3s;\n        border: none;\n        padding: 0;\n    }\n    \n    .p-image-preview-icon {\n        font-size: 1.5rem;\n    }\n    \n    .p-image-preview-container:hover > .p-image-preview-indicator {\n        opacity: 1;\n        cursor: pointer;\n    }\n    \n    .p-image-preview-container > img {\n        cursor: pointer;\n    }\n    \n    .p-image-toolbar {\n        position: absolute;\n        top: 0;\n        right: 0;\n        display: flex;\n        z-index: 1;\n    }\n    \n    .p-image-action.p-link {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n    \n    .p-image-preview {\n        transition: transform .15s;\n        max-width: 100vw;\n        max-height: 100vh;\n        width: 100%;\n        height: 100%;\n    }\n    \n    .p-image-preview-enter {\n        opacity: 0;\n        transform: scale(0.7);\n    }\n    \n    .p-image-preview-enter-active {\n        opacity: 1;\n        transform: scale(1);\n        transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n    }\n    \n    .p-image-preview-enter-done {\n        transform: none;\n    }\n    \n    .p-image-preview-exit {\n        opacity: 1;\n    }\n    \n    .p-image-preview-exit-active {\n        opacity: 0;\n        transform: scale(0.7);\n        transition: all 150ms cubic-bezier(0.4, 0.0, 0.2, 1);\n    }\n}\n";
var inlineStyles = {
  preview: function preview(_ref2) {
    var rotateState = _ref2.rotateState,
      scaleState = _ref2.scaleState;
    return {
      transform: 'rotate(' + rotateState + 'deg) scale(' + scaleState + ')'
    };
  }
};
var ImageBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Image',
    alt: null,
    className: null,
    closeIcon: null,
    crossOrigin: null,
    decoding: null,
    downloadIcon: null,
    downloadable: false,
    height: null,
    imageClassName: null,
    imageStyle: null,
    indicatorIcon: null,
    loading: null,
    onError: null,
    onHide: null,
    onShow: null,
    preview: false,
    referrerPolicy: null,
    rotateLeftIcon: null,
    rotateRightIcon: null,
    src: null,
    template: null,
    useMap: null,
    width: null,
    zoomInIcon: null,
    zoomOutIcon: null,
    zoomSrc: null,
    children: undefined,
    closeOnEscape: true
  },
  css: {
    classes: classes,
    styles: styles,
    inlineStyles: inlineStyles
  }
});

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Image = /*#__PURE__*/React.memo(/*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var mergeProps = useMergeProps();
  var context = React.useContext(PrimeReactContext);
  var props = ImageBase.getProps(inProps, context);
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    maskVisibleState = _React$useState2[0],
    setMaskVisibleState = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    previewVisibleState = _React$useState4[0],
    setPreviewVisibleState = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    rotateState = _React$useState6[0],
    setRotateState = _React$useState6[1];
  var _React$useState7 = React.useState(1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    scaleState = _React$useState8[0],
    setScaleState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var imageRef = React.useRef(null);
  var maskRef = React.useRef(null);
  var previewRef = React.useRef(null);
  var previewButton = React.useRef(null);
  var zoomOutDisabled = scaleState <= 0.5;
  var zoomInDisabled = scaleState >= 1.5;
  var _ImageBase$setMetaDat = ImageBase.setMetaData({
      props: props,
      state: {
        maskVisible: maskVisibleState,
        previewVisible: previewVisibleState,
        rotate: rotateState,
        scale: scaleState
      }
    }),
    ptm = _ImageBase$setMetaDat.ptm,
    cx = _ImageBase$setMetaDat.cx,
    sx = _ImageBase$setMetaDat.sx,
    isUnstyled = _ImageBase$setMetaDat.isUnstyled;
  useGlobalOnEscapeKey({
    callback: function callback() {
      hide();
    },
    when: props.closeOnEscape && maskVisibleState,
    priority: [ESC_KEY_HANDLING_PRIORITIES.IMAGE,
    // Assume that there could be only one image mask activated, so it's safe
    // to provide one and the same priority all the time:
    0]
  });
  useHandleStyle(ImageBase.css.styles, isUnstyled, {
    name: 'image'
  });
  var show = function show() {
    if (props.preview) {
      setMaskVisibleState(true);
      DomHandler.blockBodyScroll();
      setTimeout(function () {
        setPreviewVisibleState(true);
      }, 25);
    }
  };
  var hide = function hide() {
    setPreviewVisibleState(false);
    DomHandler.unblockBodyScroll();
    setRotateState(0);
    setScaleState(1);
  };
  var onMaskClick = function onMaskClick(event) {
    var isActionbarTarget = [event.target.classList].includes('p-image-action') || event.target.closest('.p-image-action');
    if (isActionbarTarget) {
      return;
    }
    hide();
  };
  var onMaskKeydown = function onMaskKeydown(event) {
    switch (event.code) {
      case 'Escape':
        hide();
        setTimeout(function () {
          DomHandler.focus(previewButton.current);
        }, 200);
        event.preventDefault();
        break;
    }
  };
  var onDownload = function onDownload() {
    var name = props.alt,
      src = props.src;
    DomHandler.saveAs({
      name: name,
      src: src
    });
  };
  var rotateRight = function rotateRight(event) {
    event.stopPropagation();
    setRotateState(function (prevRotate) {
      return prevRotate + 90;
    });
  };
  var rotateLeft = function rotateLeft(event) {
    event.stopPropagation();
    setRotateState(function (prevRotate) {
      return prevRotate - 90;
    });
  };
  var zoomIn = function zoomIn(event) {
    event.stopPropagation();
    setScaleState(function (prevScale) {
      if (zoomInDisabled) {
        return prevScale;
      }
      return prevScale + 0.1;
    });
  };
  var zoomOut = function zoomOut(event) {
    event.stopPropagation();
    setScaleState(function (prevScale) {
      if (zoomOutDisabled) {
        return prevScale;
      }
      return prevScale - 0.1;
    });
  };
  var onEntering = function onEntering() {
    ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact.autoZIndex, context && context.zIndex.modal || PrimeReact.zIndex.modal);
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    !isUnstyled() && DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
  };
  var onExiting = function onExiting() {
    props.onHide && props.onHide();
  };
  var onExited = function onExited() {
    ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
  };
  useUnmountEffect(function () {
    maskRef.current && ZIndexUtils.clear(maskRef.current);
  });
  var createPreview = function createPreview() {
    var ariaLabel = localeOption('aria') ? localeOption('aria').zoomImage : undefined;
    var buttonProps = mergeProps({
      ref: previewButton,
      className: cx('button'),
      onClick: show,
      type: 'button',
      'aria-label': ariaLabel
    }, ptm('button'));
    if (props.preview) {
      return /*#__PURE__*/React.createElement("button", buttonProps, content);
    }
    return null;
  };
  var createElement = function createElement() {
    var downloadable = props.downloadable,
      alt = props.alt,
      crossOrigin = props.crossOrigin,
      referrerPolicy = props.referrerPolicy,
      useMap = props.useMap,
      loading = props.loading;
    var downloadIconProps = mergeProps(ptm('downloadIcon'));
    var rotateRightIconProps = mergeProps(ptm('rotateRightIcon'));
    var rotateLeftIconProps = mergeProps(ptm('rotateLeftIcon'));
    var zoomOutIconProps = mergeProps(ptm('zoomOutIcon'));
    var zoomInIconProps = mergeProps(ptm('zoomInIcon'));
    var closeIconProps = mergeProps(ptm('closeIcon'));
    var downloadIcon = IconUtils.getJSXIcon(props.downloadIcon || /*#__PURE__*/React.createElement(DownloadIcon, null), _objectSpread({}, downloadIconProps), {
      props: props
    });
    var rotateRightIcon = IconUtils.getJSXIcon(props.rotateRightIcon || /*#__PURE__*/React.createElement(RefreshIcon, null), _objectSpread({}, rotateRightIconProps), {
      props: props
    });
    var rotateLeftIcon = IconUtils.getJSXIcon(props.rotateLeftIcon || /*#__PURE__*/React.createElement(UndoIcon, null), _objectSpread({}, rotateLeftIconProps), {
      props: props
    });
    var zoomOutIcon = IconUtils.getJSXIcon(props.zoomOutIcon || /*#__PURE__*/React.createElement(SearchMinusIcon, null), _objectSpread({}, zoomOutIconProps), {
      props: props
    });
    var zoomInIcon = IconUtils.getJSXIcon(props.zoomInIcon || /*#__PURE__*/React.createElement(SearchPlusIcon, null), _objectSpread({}, zoomInIconProps), {
      props: props
    });
    var closeIcon = IconUtils.getJSXIcon(props.closeIcon || /*#__PURE__*/React.createElement(TimesIcon, null), _objectSpread({}, closeIconProps), {
      props: props
    });
    var maskProps = mergeProps({
      ref: maskRef,
      role: 'dialog',
      className: cx('mask'),
      'aria-modal': maskVisibleState,
      onClick: onMaskClick,
      onKeyDown: onMaskKeydown
    }, ptm('mask'));
    var toolbarProps = mergeProps({
      className: cx('toolbar')
    }, ptm('toolbar'));
    var downloadButtonProps = mergeProps({
      className: cx('downloadButton'),
      onPointerUp: onDownload,
      type: 'button'
    }, ptm('downloadButton'));
    var rotateRightButtonProps = mergeProps({
      className: cx('rotateRightButton'),
      onClick: rotateRight,
      type: 'button',
      'aria-label': localeOption('aria') ? localeOption('aria').rotateRight : undefined,
      'data-pc-group-section': 'action'
    }, ptm('rotateRightButton'));
    var rotateLeftButtonProps = mergeProps({
      className: cx('rotateLeftButton'),
      onClick: rotateLeft,
      type: 'button',
      'aria-label': localeOption('aria') ? localeOption('aria').rotateLeft : undefined,
      'data-pc-group-section': 'action'
    }, ptm('rotateLeftButton'));
    var zoomOutButtonProps = mergeProps({
      className: classNames(cx('zoomOutButton'), {
        'p-disabled': zoomOutDisabled
      }),
      style: {
        pointerEvents: 'auto'
      },
      onClick: zoomOut,
      type: 'button',
      disabled: zoomOutDisabled,
      'aria-label': localeOption('aria') ? localeOption('aria').zoomOut : undefined,
      'data-pc-group-section': 'action'
    }, ptm('zoomOutButton'));
    var zoomInButtonProps = mergeProps({
      className: classNames(cx('zoomInButton'), {
        'p-disabled': zoomInDisabled
      }),
      style: {
        pointerEvents: 'auto'
      },
      onClick: zoomIn,
      type: 'button',
      disabled: zoomInDisabled,
      'aria-label': localeOption('aria') ? localeOption('aria').zoomIn : undefined,
      'data-pc-group-section': 'action'
    }, ptm('zoomInButton'));
    var closeButtonProps = mergeProps({
      className: cx('closeButton'),
      type: 'button',
      onClick: hide,
      'aria-label': localeOption('aria') ? localeOption('aria').close : undefined,
      autoFocus: true,
      'data-pc-group-section': 'action'
    }, ptm('closeButton'));
    var previewProps = mergeProps({
      src: props.zoomSrc || props.src,
      className: cx('preview'),
      style: sx('preview', {
        rotateState: rotateState,
        scaleState: scaleState
      }),
      crossOrigin: crossOrigin,
      referrerPolicy: referrerPolicy,
      useMap: useMap,
      loading: loading
    }, ptm('preview'));
    var previewContainerProps = mergeProps({
      ref: previewRef
    }, ptm('previewContainer'));
    var transitionProps = mergeProps({
      classNames: cx('transition'),
      "in": previewVisibleState,
      timeout: {
        enter: 150,
        exit: 150
      },
      unmountOnExit: true,
      onEntering: onEntering,
      onEntered: onEntered,
      onExit: onExit,
      onExiting: onExiting,
      onExited: onExited
    }, ptm('transition'));
    return /*#__PURE__*/React.createElement("div", maskProps, /*#__PURE__*/React.createElement("div", toolbarProps, downloadable && /*#__PURE__*/React.createElement("button", downloadButtonProps, downloadIcon), /*#__PURE__*/React.createElement("button", rotateRightButtonProps, rotateRightIcon), /*#__PURE__*/React.createElement("button", rotateLeftButtonProps, rotateLeftIcon), /*#__PURE__*/React.createElement("button", zoomOutButtonProps, zoomOutIcon), /*#__PURE__*/React.createElement("button", zoomInButtonProps, zoomInIcon), /*#__PURE__*/React.createElement("button", closeButtonProps, closeIcon)), /*#__PURE__*/React.createElement(CSSTransition, _extends({
      nodeRef: previewRef
    }, transitionProps), /*#__PURE__*/React.createElement("div", previewContainerProps, /*#__PURE__*/React.createElement("img", _extends({
      alt: alt
    }, previewProps)))));
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      show: show,
      hide: hide,
      getElement: function getElement() {
        return elementRef.current;
      },
      getImage: function getImage() {
        return imageRef.current;
      }
    };
  });
  var src = props.src,
    alt = props.alt,
    width = props.width,
    height = props.height,
    crossOrigin = props.crossOrigin,
    referrerPolicy = props.referrerPolicy,
    useMap = props.useMap,
    loading = props.loading;
  var element = createElement();
  var iconProp = mergeProps({
    className: cx('icon')
  }, ptm('icon'));
  var icon = props.indicatorIcon || /*#__PURE__*/React.createElement(EyeIcon, iconProp);
  var indicatorIcon = IconUtils.getJSXIcon(icon, _objectSpread({}, iconProp), {
    props: props
  });
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : indicatorIcon;
  var preview = createPreview();
  var imageProp = mergeProps({
    ref: imageRef,
    src: src,
    className: props.imageClassName,
    width: width,
    height: height,
    crossOrigin: crossOrigin,
    referrerPolicy: referrerPolicy,
    useMap: useMap,
    loading: loading,
    style: props.imageStyle,
    onError: props.onError
  }, ptm('image'));
  var image = props.src && /*#__PURE__*/React.createElement("img", _extends({}, imageProp, {
    alt: alt
  }));
  var rootProps = mergeProps({
    ref: elementRef,
    className: classNames(props.className, cx('root'))
  }, ImageBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("span", rootProps, image, preview, maskVisibleState && /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: document.body
  }));
}));
Image.displayName = 'Image';

export { Image };
