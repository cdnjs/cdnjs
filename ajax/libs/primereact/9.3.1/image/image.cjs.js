'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var portal = require('primereact/portal');
var utils = require('primereact/utils');
var iconbase = require('primereact/iconbase');
var refresh = require('primereact/icons/refresh');
var eye = require('primereact/icons/eye');
var undo = require('primereact/icons/undo');
var searchminus = require('primereact/icons/searchminus');
var searchplus = require('primereact/icons/searchplus');
var times = require('primereact/icons/times');

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

var ImageBase = {
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
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, ImageBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, ImageBase.defaultProps);
  }
};

var DownloadIcon = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var pti = iconbase.IconBase.getPTI(inProps);
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    ref: ref,
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, pti), /*#__PURE__*/React__namespace.createElement("g", {
    clipPath: "url(#clip0_407_20832)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.0118 10C6.93296 10.0003 6.85484 9.98495 6.78202 9.95477C6.7091 9.92454 6.64297 9.88008 6.58749 9.82399L3.38288 6.62399C3.27675 6.51025 3.21897 6.35982 3.22171 6.20438C3.22446 6.04893 3.28752 5.90063 3.39761 5.7907C3.5077 5.68077 3.65622 5.6178 3.81188 5.61505C3.96755 5.61231 4.1182 5.67001 4.23211 5.77599L6.41125 7.95201V0.6C6.41125 0.44087 6.47456 0.288258 6.58724 0.175736C6.69993 0.063214 6.85276 0 7.01212 0C7.17148 0 7.32431 0.063214 7.43699 0.175736C7.54968 0.288258 7.61298 0.44087 7.61298 0.6V7.95198L9.7921 5.77599C9.90601 5.67001 10.0567 5.61231 10.2123 5.61505C10.368 5.6178 10.5165 5.68077 10.6266 5.7907C10.7367 5.90063 10.7997 6.04893 10.8025 6.20438C10.8052 6.35982 10.7475 6.51025 10.6413 6.62399L7.43671 9.82399C7.38124 9.88008 7.3151 9.92454 7.24219 9.95477C7.16938 9.98495 7.09127 10.0003 7.01244 10C7.01233 10 7.01223 10 7.01212 10C7.01201 10 7.0119 10 7.0118 10ZM13.45 13.3115C13.0749 13.7235 12.5521 13.971 11.9952 14H2.02889C1.75106 13.9887 1.47819 13.9228 1.2259 13.806C0.973606 13.6893 0.74684 13.524 0.558578 13.3197C0.370316 13.1153 0.224251 12.8759 0.128742 12.6152C0.0332333 12.3544 -0.00984502 12.0774 0.00197194 11.8V9.39999C0.00197194 9.24086 0.065277 9.08825 0.177961 8.97572C0.290645 8.8632 0.443477 8.79999 0.602836 8.79999C0.762195 8.79999 0.915027 8.8632 1.02771 8.97572C1.1404 9.08825 1.2037 9.24086 1.2037 9.39999V11.8C1.18301 12.0375 1.25469 12.2739 1.40385 12.4601C1.55302 12.6463 1.76823 12.768 2.00485 12.8H11.9952C12.2318 12.768 12.4471 12.6463 12.5962 12.4601C12.7454 12.2739 12.8171 12.0375 12.7964 11.8V9.39999C12.7964 9.24086 12.8597 9.08825 12.9724 8.97572C13.085 8.8632 13.2379 8.79999 13.3972 8.79999C13.5566 8.79999 13.7094 8.8632 13.8221 8.97572C13.9348 9.08825 13.9981 9.24086 13.9981 9.39999V11.8C14.0221 12.3563 13.8251 12.8995 13.45 13.3115Z",
    fill: "currentColor"
  })), /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("clipPath", {
    id: "clip0_407_20832"
  }, /*#__PURE__*/React__namespace.createElement("rect", {
    width: "14",
    height: "14",
    fill: "white"
  }))));
}));
DownloadIcon.displayName = 'DownloadIcon';

var Image = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = ImageBase.getProps(inProps);
  var _React$useState = React__namespace.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    maskVisibleState = _React$useState2[0],
    setMaskVisibleState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    previewVisibleState = _React$useState4[0],
    setPreviewVisibleState = _React$useState4[1];
  var _React$useState5 = React__namespace.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    rotateState = _React$useState6[0],
    setRotateState = _React$useState6[1];
  var _React$useState7 = React__namespace.useState(1),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    scaleState = _React$useState8[0],
    setScaleState = _React$useState8[1];
  var elementRef = React__namespace.useRef(null);
  var imageRef = React__namespace.useRef(null);
  var maskRef = React__namespace.useRef(null);
  var previewRef = React__namespace.useRef(null);
  var previewClick = React__namespace.useRef(false);
  var show = function show() {
    if (props.preview) {
      setMaskVisibleState(true);
      setTimeout(function () {
        setPreviewVisibleState(true);
      }, 25);
    }
  };
  var hide = function hide() {
    if (!previewClick.current) {
      setPreviewVisibleState(false);
      setRotateState(0);
      setScaleState(1);
    }
    previewClick.current = false;
  };
  var onPreviewImageClick = function onPreviewImageClick() {
    previewClick.current = true;
  };
  var onDownload = function onDownload() {
    var name = props.alt,
      src = props.src;
    utils.DomHandler.saveAs({
      name: name,
      src: src
    });
    previewClick.current = true;
  };
  var rotateRight = function rotateRight() {
    setRotateState(function (prevRotate) {
      return prevRotate + 90;
    });
    previewClick.current = true;
  };
  var rotateLeft = function rotateLeft() {
    setRotateState(function (prevRotate) {
      return prevRotate - 90;
    });
    previewClick.current = true;
  };
  var zoomIn = function zoomIn() {
    setScaleState(function (prevScale) {
      return prevScale + 0.1;
    });
    previewClick.current = true;
  };
  var zoomOut = function zoomOut() {
    setScaleState(function (prevScale) {
      return prevScale - 0.1;
    });
    previewClick.current = true;
  };
  var onEntering = function onEntering() {
    utils.ZIndexUtils.set('modal', maskRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['modal']);
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
  };
  var onExiting = function onExiting() {
    props.onHide && props.onHide();
  };
  var onExited = function onExited() {
    utils.ZIndexUtils.clear(maskRef.current);
    setMaskVisibleState(false);
  };
  hooks.useUnmountEffect(function () {
    maskRef.current && utils.ZIndexUtils.clear(maskRef.current);
  });
  var createPreview = function createPreview() {
    if (props.preview) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-image-preview-indicator",
        onClick: show
      }, content);
    }
    return null;
  };
  var createElement = function createElement() {
    var downloadable = props.downloadable;
    var imagePreviewStyle = {
      transform: 'rotate(' + rotateState + 'deg) scale(' + scaleState + ')'
    };
    var zoomDisabled = scaleState <= 0.5 || scaleState >= 1.5;
    // const rotateClassName = 'p-image-preview-rotate-' + rotateScale;
    var downloadIcon = utils.IconUtils.getJSXIcon(props.downloadIcon || /*#__PURE__*/React__namespace.createElement(DownloadIcon, null), undefined, {
      props: props
    });
    var rotateRightIcon = utils.IconUtils.getJSXIcon(props.rotateRightIcon || /*#__PURE__*/React__namespace.createElement(refresh.RefreshIcon, null), undefined, {
      props: props
    });
    var rotateLeftIcon = utils.IconUtils.getJSXIcon(props.rotateLeftIcon || /*#__PURE__*/React__namespace.createElement(undo.UndoIcon, null), undefined, {
      props: props
    });
    var zoomOutIcon = utils.IconUtils.getJSXIcon(props.zoomOutIcon || /*#__PURE__*/React__namespace.createElement(searchminus.SearchMinusIcon, null), undefined, {
      props: props
    });
    var zoomInIcon = utils.IconUtils.getJSXIcon(props.zoomInIcon || /*#__PURE__*/React__namespace.createElement(searchplus.SearchPlusIcon, null), undefined, {
      props: props
    });
    var closeIcon = utils.IconUtils.getJSXIcon(props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, null), undefined, {
      props: props
    });
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: maskRef,
      className: "p-image-mask p-component-overlay p-component-overlay-enter",
      onClick: hide
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-image-toolbar"
    }, downloadable && /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      onClick: onDownload,
      type: "button"
    }, downloadIcon), /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      onClick: rotateRight,
      type: "button"
    }, rotateRightIcon), /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      onClick: rotateLeft,
      type: "button"
    }, rotateLeftIcon), /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      onClick: zoomOut,
      type: "button",
      disabled: zoomDisabled
    }, zoomOutIcon), /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      onClick: zoomIn,
      type: "button",
      disabled: zoomDisabled
    }, zoomInIcon), /*#__PURE__*/React__namespace.createElement("button", {
      className: "p-image-action p-link",
      type: "button",
      "aria-label": PrimeReact.localeOption('close')
    }, closeIcon)), /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: previewRef,
      classNames: "p-image-preview",
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
    }, /*#__PURE__*/React__namespace.createElement("div", {
      ref: previewRef
    }, /*#__PURE__*/React__namespace.createElement("img", {
      src: props.zoomSrc || props.src,
      className: "p-image-preview",
      style: imagePreviewStyle,
      onClick: onPreviewImageClick,
      alt: props.alt
    }))));
  };
  React__namespace.useImperativeHandle(ref, function () {
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
  var otherProps = ImageBase.getOtherProps(props);
  var containerClassName = utils.classNames('p-image p-component', props.className, {
    'p-image-preview-container': props.preview
  });
  var element = createElement();
  var iconClassName = 'p-image-preview-icon';
  var icon = props.indicatorIcon || /*#__PURE__*/React__namespace.createElement(eye.EyeIcon, {
    className: iconClassName
  });
  var indicatorIcon = utils.IconUtils.getJSXIcon(icon, {
    className: iconClassName
  }, {
    props: props
  });
  var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : indicatorIcon;
  var preview = createPreview();
  var image = props.src && /*#__PURE__*/React__namespace.createElement("img", {
    ref: imageRef,
    src: src,
    className: props.imageClassName,
    width: width,
    height: height,
    crossOrigin: crossOrigin,
    referrerPolicy: referrerPolicy,
    useMap: useMap,
    loading: loading,
    alt: alt,
    style: props.imageStyle,
    onError: props.onError
  });
  return /*#__PURE__*/React__namespace.createElement("span", _extends({
    ref: elementRef,
    className: containerClassName
  }, otherProps), image, preview, maskVisibleState && /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: document.body
  }));
}));
Image.displayName = 'Image';

exports.Image = Image;
