import React, { Component } from 'react';
import { DomHandler, classNames } from 'primereact/core';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
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
var SplitterPanel = /*#__PURE__*/function (_Component) {
  _inherits(SplitterPanel, _Component);

  var _super = _createSuper(SplitterPanel);

  function SplitterPanel() {
    _classCallCheck(this, SplitterPanel);

    return _super.apply(this, arguments);
  }

  return SplitterPanel;
}(Component);

_defineProperty(SplitterPanel, "defaultProps", {
  size: null,
  minSize: null,
  style: null,
  className: null
});

var Splitter = /*#__PURE__*/function (_Component2) {
  _inherits(Splitter, _Component2);

  var _super2 = _createSuper(Splitter);

  function Splitter() {
    _classCallCheck(this, Splitter);

    return _super2.apply(this, arguments);
  }

  _createClass(Splitter, [{
    key: "bindMouseListeners",
    value: function bindMouseListeners() {
      var _this = this;

      if (!this.mouseMoveListener) {
        this.mouseMoveListener = function (event) {
          return _this.onResize(event);
        };

        document.addEventListener('mousemove', this.mouseMoveListener);
      }

      if (!this.mouseUpListener) {
        this.mouseUpListener = function (event) {
          _this.onResizeEnd(event);

          _this.unbindMouseListeners();
        };

        document.addEventListener('mouseup', this.mouseUpListener);
      }
    }
  }, {
    key: "validateResize",
    value: function validateResize(newPrevPanelSize, newNextPanelSize) {
      if (this.props.children[this.prevPanelIndex].props && this.props.children[this.prevPanelIndex].props.minSize && this.props.children[this.prevPanelIndex].props.minSize > newPrevPanelSize) {
        return false;
      }

      if (this.props.children[this.prevPanelIndex + 1].props && this.props.children[this.prevPanelIndex + 1].props.minSize && this.props.children[this.prevPanelIndex + 1].props.minSize > newNextPanelSize) {
        return false;
      }

      return true;
    }
  }, {
    key: "unbindMouseListeners",
    value: function unbindMouseListeners() {
      if (this.mouseMoveListener) {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        this.mouseMoveListener = null;
      }

      if (this.mouseUpListener) {
        document.removeEventListener('mouseup', this.mouseUpListener);
        this.mouseUpListener = null;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.dragging = false;
      this.size = null;
      this.startPos = null;
      this.prevPanelElement = null;
      this.nextPanelElement = null;
      this.prevPanelSize = null;
      this.nextPanelSize = null;
      this.gutterElement = null;
      this.prevPanelIndex = null;
    }
  }, {
    key: "isStateful",
    value: function isStateful() {
      return this.props.stateKey != null;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      switch (this.props.stateStorage) {
        case 'local':
          return window.localStorage;

        case 'session':
          return window.sessionStorage;

        default:
          throw new Error(this.props.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
      }
    }
  }, {
    key: "saveState",
    value: function saveState() {
      this.getStorage().setItem(this.props.stateKey, JSON.stringify(this.panelSizes));
    }
  }, {
    key: "restoreState",
    value: function restoreState() {
      var _this2 = this;

      var storage = this.getStorage();
      var stateString = storage.getItem(this.props.stateKey);

      if (stateString) {
        this.panelSizes = JSON.parse(stateString);

        var children = _toConsumableArray(this.container.children).filter(function (child) {
          return DomHandler.hasClass(child, 'p-splitter-panel');
        });

        children.forEach(function (child, i) {
          child.style.flexBasis = 'calc(' + _this2.panelSizes[i] + '% - ' + (_this2.props.children.length - 1) * _this2.props.gutterSize + 'px)';
        });
        return true;
      }

      return false;
    }
  }, {
    key: "onResizeStart",
    value: function onResizeStart(event, index) {
      var pageX = event.type === 'touchstart' ? event.touches[0].pageX : event.pageX;
      var pageY = event.type === 'touchstart' ? event.touches[0].pageY : event.pageY;
      this.gutterElement = event.currentTarget;
      this.size = this.props.layout === 'horizontal' ? DomHandler.getWidth(this.container) : DomHandler.getHeight(this.container);
      this.dragging = true;
      this.startPos = this.props.layout === 'horizontal' ? pageX : pageY;
      this.prevPanelElement = this.gutterElement.previousElementSibling;
      this.nextPanelElement = this.gutterElement.nextElementSibling;
      this.prevPanelSize = 100 * (this.props.layout === 'horizontal' ? DomHandler.getOuterWidth(this.prevPanelElement, true) : DomHandler.getOuterHeight(this.prevPanelElement, true)) / this.size;
      this.nextPanelSize = 100 * (this.props.layout === 'horizontal' ? DomHandler.getOuterWidth(this.nextPanelElement, true) : DomHandler.getOuterHeight(this.nextPanelElement, true)) / this.size;
      this.prevPanelIndex = index;
      DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
      DomHandler.addClass(this.container, 'p-splitter-resizing');
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      var newPos;
      var pageX = event.type === 'touchmove' ? event.touches[0].pageX : event.pageX;
      var pageY = event.type === 'touchmove' ? event.touches[0].pageY : event.pageY;
      if (this.props.layout === 'horizontal') newPos = pageX * 100 / this.size - this.startPos * 100 / this.size;else newPos = pageY * 100 / this.size - this.startPos * 100 / this.size;
      var newPrevPanelSize = this.prevPanelSize + newPos;
      var newNextPanelSize = this.nextPanelSize - newPos;

      if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
        this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.props.children.length - 1) * this.props.gutterSize + 'px)';
        this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.props.children.length - 1) * this.props.gutterSize + 'px)';
        this.panelSizes[this.prevPanelIndex] = newPrevPanelSize;
        this.panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
      }
    }
  }, {
    key: "onResizeEnd",
    value: function onResizeEnd(event) {
      if (this.isStateful()) {
        this.saveState();
      }

      if (this.props.onResizeEnd) {
        this.props.onResizeEnd({
          originalEvent: event,
          sizes: this.panelSizes
        });
      }

      DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
      DomHandler.removeClass(this.container, 'p-splitter-resizing');
      this.clear();
    }
  }, {
    key: "onGutterMouseDown",
    value: function onGutterMouseDown(event, index) {
      this.onResizeStart(event, index);
      this.bindMouseListeners();
    }
  }, {
    key: "onGutterTouchStart",
    value: function onGutterTouchStart(event, index) {
      this.onResizeStart(event, index);
      this.windowTouchMoveListener = this.onGutterTouchMove.bind(this);
      this.windowTouchEndListener = this.onGutterTouchEnd.bind(this);
      window.addEventListener('touchmove', this.windowTouchMoveListener, {
        passive: false,
        cancelable: false
      });
      window.addEventListener('touchend', this.windowTouchEndListener);
    }
  }, {
    key: "onGutterTouchMove",
    value: function onGutterTouchMove(event) {
      this.onResize(event);
    }
  }, {
    key: "onGutterTouchEnd",
    value: function onGutterTouchEnd(event) {
      this.onResizeEnd(event);
      window.removeEventListener('touchmove', this.windowTouchMoveListener);
      window.removeEventListener('touchend', this.windowTouchEndListener);
      this.windowTouchMoveListener = null;
      this.windowTouchEndListener = null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (this.panelElement) {
        if (this.panelElement.childNodes && DomHandler.find(this.panelElement, '.p-splitter')) {
          DomHandler.addClass(this.panelElement, 'p-splitter-panel-nested');
        }
      }

      if (this.props.children && this.props.children.length) {
        var initialized = false;

        if (this.isStateful()) {
          initialized = this.restoreState();
        }

        if (!initialized) {
          var children = _toConsumableArray(this.container.children).filter(function (child) {
            return DomHandler.hasClass(child, 'p-splitter-panel');
          });

          var _panelSizes = [];
          this.props.children.map(function (panel, i) {
            var panelInitialSize = panel.props && panel.props.size ? panel.props.size : null;
            var panelSize = panelInitialSize || 100 / _this3.props.children.length;
            _panelSizes[i] = panelSize;
            children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (_this3.props.children.length - 1) * _this3.props.gutterSize + 'px)';
            return _panelSizes;
          });
          this.panelSizes = _panelSizes;
        }
      }
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(panel, index) {
      var _this4 = this;

      var panelClassName = classNames('p-splitter-panel', panel.props.className);
      var gutterStyle = this.props.layout === 'horizontal' ? {
        width: this.props.gutterSize + 'px'
      } : {
        height: this.props.gutterSize + 'px'
      };
      var gutter = index !== this.props.children.length - 1 && /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this4.gutterElement = el;
        },
        className: 'p-splitter-gutter',
        style: gutterStyle,
        onMouseDown: function onMouseDown(event) {
          return _this4.onGutterMouseDown(event, index);
        },
        onTouchStart: function onTouchStart(event) {
          return _this4.onGutterTouchStart(event, index);
        },
        onTouchMove: function onTouchMove(event) {
          return _this4.onGutterTouchMove(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          return _this4.onGutterTouchEnd(event);
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "p-splitter-gutter-handle"
      }));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this4.panelElement = el;
        },
        key: index,
        className: panelClassName,
        style: panel.props.style
      }, panel.props.children), gutter);
    }
  }, {
    key: "renderPanels",
    value: function renderPanels() {
      var _this5 = this;

      return React.Children.map(this.props.children, function (panel, index) {
        return _this5.renderPanel(panel, index);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var className = classNames("p-splitter p-component p-splitter-".concat(this.props.layout), this.props.className);
      var panels = this.renderPanels();
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this6.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style
      }, panels);
    }
  }]);

  return Splitter;
}(Component);

_defineProperty(Splitter, "defaultProps", {
  id: null,
  className: null,
  style: null,
  layout: 'horizontal',
  gutterSize: 4,
  stateKey: null,
  stateStorage: 'session',
  onResizeEnd: null
});

export { Splitter, SplitterPanel };
