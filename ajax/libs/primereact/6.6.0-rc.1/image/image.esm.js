import React, { Component } from 'react';
import { ZIndexUtils, DomHandler, CSSTransition, classNames, ObjectUtils, Portal } from 'primereact/core';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Image = /*#__PURE__*/function (_Component) {
  _inherits(Image, _Component);

  var _super = _createSuper(Image);

  function Image(props) {
    var _this;

    _classCallCheck(this, Image);

    _this = _super.call(this, props);
    _this.state = {
      maskVisible: false,
      previewVisible: false,
      rotate: 0,
      scale: 1
    };
    _this.onImageClick = _this.onImageClick.bind(_assertThisInitialized(_this));
    _this.onMaskClick = _this.onMaskClick.bind(_assertThisInitialized(_this));
    _this.rotateRight = _this.rotateRight.bind(_assertThisInitialized(_this));
    _this.rotateLeft = _this.rotateLeft.bind(_assertThisInitialized(_this));
    _this.zoomIn = _this.zoomIn.bind(_assertThisInitialized(_this));
    _this.zoomOut = _this.zoomOut.bind(_assertThisInitialized(_this));
    _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onPreviewImageClick = _this.onPreviewImageClick.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.previewRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  _createClass(Image, [{
    key: "onImageClick",
    value: function onImageClick() {
      var _this2 = this;

      if (this.props.preview) {
        this.setState({
          maskVisible: true
        });
        setTimeout(function () {
          _this2.setState({
            previewVisible: true
          });
        }, 25);
      }
    }
  }, {
    key: "onPreviewImageClick",
    value: function onPreviewImageClick() {
      this.previewClick = true;
    }
  }, {
    key: "onMaskClick",
    value: function onMaskClick() {
      if (!this.previewClick) {
        this.setState({
          previewVisible: false
        });
        this.setState({
          rotate: 0
        });
        this.setState({
          scale: 1
        });
      }

      this.previewClick = false;
    }
  }, {
    key: "rotateRight",
    value: function rotateRight() {
      this.setState(function (prevState) {
        return {
          rotate: prevState.rotate + 90
        };
      });
      this.previewClick = true;
    }
  }, {
    key: "rotateLeft",
    value: function rotateLeft() {
      this.setState(function (prevState) {
        return {
          rotate: prevState.rotate - 90
        };
      });
      this.previewClick = true;
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      this.setState(function (prevState) {
        return {
          scale: prevState.scale + 0.1
        };
      });
      this.previewClick = true;
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      this.setState(function (prevState) {
        return {
          scale: prevState.scale - 0.1
        };
      });
      this.previewClick = true;
    }
  }, {
    key: "onEntering",
    value: function onEntering() {
      ZIndexUtils.set('modal', this.mask);
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      if (this.props.onShow) {
        this.props.onShow();
      }
    }
  }, {
    key: "onExit",
    value: function onExit() {
      DomHandler.addClass(this.mask, 'p-component-overlay-leave');
    }
  }, {
    key: "onExiting",
    value: function onExiting() {
      if (this.props.onHide) {
        this.props.onHide();
      }
    }
  }, {
    key: "onExited",
    value: function onExited(el) {
      ZIndexUtils.clear(el);
      this.setState({
        maskVisible: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mask) {
        ZIndexUtils.clear(this.container);
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this3 = this;

      var imagePreviewStyle = {
        transform: 'rotate(' + this.state.rotate + 'deg) scale(' + this.state.scale + ')'
      };
      var zoomDisabled = this.state.scale <= 0.5 || this.state.scale >= 1.5; // const rotateClassName = 'p-image-preview-rotate-' + this.state.rotate;

      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.mask = el;
        },
        className: "p-image-mask p-component-overlay p-component-overlay-enter",
        onClick: this.onMaskClick
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-image-toolbar"
      }, /*#__PURE__*/React.createElement("button", {
        className: "p-image-action p-link",
        onClick: this.rotateRight,
        type: "button"
      }, /*#__PURE__*/React.createElement("i", {
        className: "pi pi-refresh"
      })), /*#__PURE__*/React.createElement("button", {
        className: "p-image-action p-link",
        onClick: this.rotateLeft,
        type: "button"
      }, /*#__PURE__*/React.createElement("i", {
        className: "pi pi-undo"
      })), /*#__PURE__*/React.createElement("button", {
        className: "p-image-action p-link",
        onClick: this.zoomOut,
        type: "button",
        disabled: zoomDisabled
      }, /*#__PURE__*/React.createElement("i", {
        className: "pi pi-search-minus"
      })), /*#__PURE__*/React.createElement("button", {
        className: "p-image-action p-link",
        onClick: this.zoomIn,
        type: "button",
        disabled: zoomDisabled
      }, /*#__PURE__*/React.createElement("i", {
        className: "pi pi-search-plus"
      })), /*#__PURE__*/React.createElement("button", {
        className: "p-image-action p-link",
        type: "button",
        onClick: this.hidePreview
      }, /*#__PURE__*/React.createElement("i", {
        className: "pi pi-times"
      }))), /*#__PURE__*/React.createElement(CSSTransition, {
        nodeRef: this.previewRef,
        classNames: "p-image-preview",
        in: this.state.previewVisible,
        timeout: {
          enter: 150,
          exit: 150
        },
        unmountOnExit: true,
        onEntering: this.onEntering,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExiting: this.onExiting,
        onExited: this.onExited
      }, /*#__PURE__*/React.createElement("div", {
        ref: this.previewRef
      }, /*#__PURE__*/React.createElement("img", {
        src: this.props.src,
        className: "p-image-preview",
        style: imagePreviewStyle,
        onClick: this.onPreviewImageClick,
        alt: this.props.alt
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var containerClassName = classNames('p-image p-component', this.props.className, {
        'p-image-preview-container': this.props.preview
      });
      var element = this.renderElement();
      var content = this.props.template ? ObjectUtils.getJSXElement(this.props.template, this.props) : /*#__PURE__*/React.createElement("i", {
        className: "p-image-preview-icon pi pi-eye"
      });
      var _this$props = this.props,
          src = _this$props.src,
          alt = _this$props.alt,
          width = _this$props.width,
          height = _this$props.height;
      return /*#__PURE__*/React.createElement("span", {
        ref: function ref(el) {
          return _this4.container = el;
        },
        className: containerClassName,
        style: this.props.style
      }, /*#__PURE__*/React.createElement("img", {
        src: src,
        className: this.props.imageClassName,
        width: width,
        height: height,
        style: this.props.imageStyle,
        alt: alt
      }), this.props.preview && /*#__PURE__*/React.createElement("div", {
        className: "p-image-preview-indicator",
        onClick: this.onImageClick
      }, content), this.state.maskVisible && /*#__PURE__*/React.createElement(Portal, {
        element: element,
        appendTo: document.body
      }));
    }
  }]);

  return Image;
}(Component);

_defineProperty(Image, "defaultProps", {
  preview: false,
  className: null,
  style: null,
  imageStyle: null,
  imageClassName: null,
  template: null,
  src: null,
  alt: null,
  width: null,
  height: null
});

export { Image };
