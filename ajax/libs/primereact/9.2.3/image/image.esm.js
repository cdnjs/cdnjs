import * as React from 'react';
import PrimeReact, { localeOption } from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { ObjectUtils, ZIndexUtils, classNames, DomHandler } from 'primereact/utils';

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
    downloadable: false,
    height: null,
    imageClassName: null,
    imageStyle: null,
    onError: null,
    onHide: null,
    onShow: null,
    preview: false,
    src: null,
    template: null,
    width: null,
    zoomSrc: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ImageBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ImageBase.defaultProps);
  }
};

var Image = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ImageBase.getProps(inProps);
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
  var previewClick = React.useRef(false);
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
    DomHandler.saveAs({
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
    ZIndexUtils.set('modal', maskRef.current, PrimeReact.autoZIndex, PrimeReact.zIndex['modal']);
  };
  var onEntered = function onEntered() {
    props.onShow && props.onShow();
  };
  var onExit = function onExit() {
    DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
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
    if (props.preview) {
      return /*#__PURE__*/React.createElement("div", {
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

    return /*#__PURE__*/React.createElement("div", {
      ref: maskRef,
      className: "p-image-mask p-component-overlay p-component-overlay-enter",
      onClick: hide
    }, /*#__PURE__*/React.createElement("div", {
      className: "p-image-toolbar"
    }, downloadable && /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      onClick: onDownload,
      type: "button"
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-download"
    })), /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      onClick: rotateRight,
      type: "button"
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-refresh"
    })), /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      onClick: rotateLeft,
      type: "button"
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-undo"
    })), /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      onClick: zoomOut,
      type: "button",
      disabled: zoomDisabled
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-search-minus"
    })), /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      onClick: zoomIn,
      type: "button",
      disabled: zoomDisabled
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-search-plus"
    })), /*#__PURE__*/React.createElement("button", {
      className: "p-image-action p-link",
      type: "button",
      "aria-label": localeOption('close')
    }, /*#__PURE__*/React.createElement("i", {
      className: "pi pi-times"
    }))), /*#__PURE__*/React.createElement(CSSTransition, {
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
    }, /*#__PURE__*/React.createElement("div", {
      ref: previewRef
    }, /*#__PURE__*/React.createElement("img", {
      src: props.zoomSrc || props.src,
      className: "p-image-preview",
      style: imagePreviewStyle,
      onClick: onPreviewImageClick,
      alt: props.alt
    }))));
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
    height = props.height;
  var otherProps = ImageBase.getOtherProps(props);
  var containerClassName = classNames('p-image p-component', props.className, {
    'p-image-preview-container': props.preview
  });
  var element = createElement();
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : /*#__PURE__*/React.createElement("i", {
    className: "p-image-preview-icon pi pi-eye"
  });
  var preview = createPreview();
  var image = props.src && /*#__PURE__*/React.createElement("img", {
    ref: imageRef,
    src: src,
    className: props.imageClassName,
    width: width,
    height: height,
    style: props.imageStyle,
    alt: alt,
    onError: props.onError
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: elementRef,
    className: containerClassName
  }, otherProps), image, preview, maskVisibleState && /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: document.body
  }));
}));
Image.displayName = 'Image';

export { Image };
