import * as React from 'react';
import PrimeReact from 'primereact/api';
import { CSSTransition } from 'primereact/csstransition';
import { useUnmountEffect } from 'primereact/hooks';
import { Portal } from 'primereact/portal';
import { ZIndexUtils, ObjectUtils, classNames, DomHandler } from 'primereact/utils';

function _extends() {
  _extends = Object.assign || function (target) {
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

var Image = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
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
  var maskRef = React.useRef(null);
  var previewRef = React.useRef(null);
  var previewClick = React.useRef(false);

  var onImageClick = function onImageClick() {
    if (props.preview) {
      setMaskVisibleState(true);
      setTimeout(function () {
        setPreviewVisibleState(true);
      }, 25);
    }
  };

  var onPreviewImageClick = function onPreviewImageClick() {
    previewClick.current = true;
  };

  var onMaskClick = function onMaskClick() {
    if (!previewClick.current) {
      setPreviewVisibleState(false);
      setRotateState(0);
      setScaleState(1);
    }

    previewClick.current = false;
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
        onClick: onImageClick
      }, content);
    }

    return null;
  };

  var createElement = function createElement() {
    var downloadable = props.downloadable;
    var imagePreviewStyle = {
      transform: 'rotate(' + rotateState + 'deg) scale(' + scaleState + ')'
    };
    var zoomDisabled = scaleState <= 0.5 || scaleState >= 1.5; // const rotateClassName = 'p-image-preview-rotate-' + rotateScale;

    return /*#__PURE__*/React.createElement("div", {
      ref: maskRef,
      className: "p-image-mask p-component-overlay p-component-overlay-enter",
      onClick: onMaskClick
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
      type: "button"
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
      src: props.src,
      className: "p-image-preview",
      style: imagePreviewStyle,
      onClick: onPreviewImageClick,
      alt: props.alt
    }))));
  };

  var src = props.src,
      alt = props.alt,
      width = props.width,
      height = props.height;
  var otherProps = ObjectUtils.findDiffKeys(props, Image.defaultProps);
  var containerClassName = classNames('p-image p-component', props.className, {
    'p-image-preview-container': props.preview
  });
  var element = createElement();
  var content = props.template ? ObjectUtils.getJSXElement(props.template, props) : /*#__PURE__*/React.createElement("i", {
    className: "p-image-preview-icon pi pi-eye"
  });
  var preview = createPreview();
  var image = /*#__PURE__*/React.createElement("img", {
    src: src,
    className: props.imageClassName,
    width: width,
    height: height,
    style: props.imageStyle,
    alt: alt
  });
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: elementRef,
    className: containerClassName,
    style: props.style
  }, otherProps), image, preview, maskVisibleState && /*#__PURE__*/React.createElement(Portal, {
    element: element,
    appendTo: document.body
  }));
}));
Image.displayName = 'Image';
Image.defaultProps = {
  __TYPE: 'Image',
  preview: false,
  className: null,
  downloadable: false,
  style: null,
  imageStyle: null,
  imageClassName: null,
  template: null,
  src: null,
  alt: null,
  width: null,
  height: null
};

export { Image };
