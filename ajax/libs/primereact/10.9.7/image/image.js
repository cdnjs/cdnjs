this.primereact = this.primereact || {};
this.primereact.image = (function (exports, React, PrimeReact, componentbase, csstransition, hooks, iconbase, eye, refresh, searchminus, searchplus, times, undo, portal, utils) {
  'use strict';

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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
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

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var DownloadIcon = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var pti = iconbase.IconBase.getPTI(inProps);
    return /*#__PURE__*/React__namespace.createElement("svg", _extends({
      ref: ref,
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, pti), /*#__PURE__*/React__namespace.createElement("path", {
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
      return utils.classNames('p-image p-component', {
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
  var ImageBase = componentbase.ComponentBase.extend({
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
  var Image = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = ImageBase.getProps(inProps, context);
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
    var previewButton = React__namespace.useRef(null);
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
    hooks.useGlobalOnEscapeKey({
      callback: function callback() {
        hide();
      },
      when: props.closeOnEscape && maskVisibleState,
      priority: [hooks.ESC_KEY_HANDLING_PRIORITIES.IMAGE,
      // Assume that there could be only one image mask activated, so it's safe
      // to provide one and the same priority all the time:
      0]
    });
    componentbase.useHandleStyle(ImageBase.css.styles, isUnstyled, {
      name: 'image'
    });
    var show = function show() {
      if (props.preview) {
        setMaskVisibleState(true);
        utils.DomHandler.blockBodyScroll();
        setTimeout(function () {
          setPreviewVisibleState(true);
        }, 25);
      }
    };
    var hide = function hide() {
      setPreviewVisibleState(false);
      utils.DomHandler.unblockBodyScroll();
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
            utils.DomHandler.focus(previewButton.current);
          }, 200);
          event.preventDefault();
          break;
      }
    };
    var onDownload = function onDownload() {
      var name = props.alt,
        src = props.src;
      utils.DomHandler.saveAs({
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
      utils.ZIndexUtils.set('modal', maskRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex.modal || PrimeReact__default["default"].zIndex.modal);
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
    };
    var onExit = function onExit() {
      !isUnstyled() && utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
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
      var ariaLabel = PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').zoomImage : undefined;
      var buttonProps = mergeProps({
        ref: previewButton,
        className: cx('button'),
        onClick: show,
        type: 'button',
        'aria-label': ariaLabel
      }, ptm('button'));
      if (props.preview) {
        return /*#__PURE__*/React__namespace.createElement("button", buttonProps, content);
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
      var downloadIcon = utils.IconUtils.getJSXIcon(props.downloadIcon || /*#__PURE__*/React__namespace.createElement(DownloadIcon, null), _objectSpread({}, downloadIconProps), {
        props: props
      });
      var rotateRightIcon = utils.IconUtils.getJSXIcon(props.rotateRightIcon || /*#__PURE__*/React__namespace.createElement(refresh.RefreshIcon, null), _objectSpread({}, rotateRightIconProps), {
        props: props
      });
      var rotateLeftIcon = utils.IconUtils.getJSXIcon(props.rotateLeftIcon || /*#__PURE__*/React__namespace.createElement(undo.UndoIcon, null), _objectSpread({}, rotateLeftIconProps), {
        props: props
      });
      var zoomOutIcon = utils.IconUtils.getJSXIcon(props.zoomOutIcon || /*#__PURE__*/React__namespace.createElement(searchminus.SearchMinusIcon, null), _objectSpread({}, zoomOutIconProps), {
        props: props
      });
      var zoomInIcon = utils.IconUtils.getJSXIcon(props.zoomInIcon || /*#__PURE__*/React__namespace.createElement(searchplus.SearchPlusIcon, null), _objectSpread({}, zoomInIconProps), {
        props: props
      });
      var closeIcon = utils.IconUtils.getJSXIcon(props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, null), _objectSpread({}, closeIconProps), {
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
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').rotateRight : undefined,
        'data-pc-group-section': 'action'
      }, ptm('rotateRightButton'));
      var rotateLeftButtonProps = mergeProps({
        className: cx('rotateLeftButton'),
        onClick: rotateLeft,
        type: 'button',
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').rotateLeft : undefined,
        'data-pc-group-section': 'action'
      }, ptm('rotateLeftButton'));
      var zoomOutButtonProps = mergeProps({
        className: utils.classNames(cx('zoomOutButton'), {
          'p-disabled': zoomOutDisabled
        }),
        style: {
          pointerEvents: 'auto'
        },
        onClick: zoomOut,
        type: 'button',
        disabled: zoomOutDisabled,
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').zoomOut : undefined,
        'data-pc-group-section': 'action'
      }, ptm('zoomOutButton'));
      var zoomInButtonProps = mergeProps({
        className: utils.classNames(cx('zoomInButton'), {
          'p-disabled': zoomInDisabled
        }),
        style: {
          pointerEvents: 'auto'
        },
        onClick: zoomIn,
        type: 'button',
        disabled: zoomInDisabled,
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').zoomIn : undefined,
        'data-pc-group-section': 'action'
      }, ptm('zoomInButton'));
      var closeButtonProps = mergeProps({
        className: cx('closeButton'),
        type: 'button',
        onClick: hide,
        'aria-label': PrimeReact.localeOption('aria') ? PrimeReact.localeOption('aria').close : undefined,
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
      return /*#__PURE__*/React__namespace.createElement("div", maskProps, /*#__PURE__*/React__namespace.createElement("div", toolbarProps, downloadable && /*#__PURE__*/React__namespace.createElement("button", downloadButtonProps, downloadIcon), /*#__PURE__*/React__namespace.createElement("button", rotateRightButtonProps, rotateRightIcon), /*#__PURE__*/React__namespace.createElement("button", rotateLeftButtonProps, rotateLeftIcon), /*#__PURE__*/React__namespace.createElement("button", zoomOutButtonProps, zoomOutIcon), /*#__PURE__*/React__namespace.createElement("button", zoomInButtonProps, zoomInIcon), /*#__PURE__*/React__namespace.createElement("button", closeButtonProps, closeIcon)), /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, _extends({
        nodeRef: previewRef
      }, transitionProps), /*#__PURE__*/React__namespace.createElement("div", previewContainerProps, /*#__PURE__*/React__namespace.createElement("img", _extends({
        alt: alt
      }, previewProps)))));
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
    var element = createElement();
    var iconProp = mergeProps({
      className: cx('icon')
    }, ptm('icon'));
    var icon = props.indicatorIcon || /*#__PURE__*/React__namespace.createElement(eye.EyeIcon, iconProp);
    var indicatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProp), {
      props: props
    });
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props) : indicatorIcon;
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
    var image = props.src && /*#__PURE__*/React__namespace.createElement("img", _extends({}, imageProp, {
      alt: alt
    }));
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root'))
    }, ImageBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("span", rootProps, image, preview, maskVisibleState && /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: document.body
    }));
  }));
  Image.displayName = 'Image';

  exports.Image = Image;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.csstransition, primereact.hooks, primereact.iconbase, primereact.icons.eye, primereact.icons.refresh, primereact.icons.searchminus, primereact.icons.searchplus, primereact.icons.times, primereact.icons.undo, primereact.portal, primereact.utils);
