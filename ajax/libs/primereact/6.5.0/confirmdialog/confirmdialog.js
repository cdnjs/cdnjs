this.primereact = this.primereact || {};
this.primereact.confirmdialog = (function (exports, React, ReactDOM, core, dialog, button, api) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function confirmDialog(props) {
    var appendTo = props.appendTo || document.body;
    var confirmDialogWrapper = document.createDocumentFragment();
    core.DomHandler.appendChild(confirmDialogWrapper, appendTo);
    props = _objectSpread(_objectSpread({}, props), {
      visible: props.visible === undefined ? true : props.visible
    });
    var confirmDialogEl = /*#__PURE__*/React__default['default'].createElement(ConfirmDialog, props);
    ReactDOM__default['default'].render(confirmDialogEl, confirmDialogWrapper);

    var updateConfirmDialog = function updateConfirmDialog(newProps) {
      props = _objectSpread(_objectSpread({}, props), newProps);
      ReactDOM__default['default'].render( /*#__PURE__*/React__default['default'].cloneElement(confirmDialogEl, props), confirmDialogWrapper);
    };

    return {
      _destroy: function _destroy() {
        ReactDOM__default['default'].unmountComponentAtNode(confirmDialogWrapper);
      },
      show: function show() {
        updateConfirmDialog({
          visible: true,
          onHide: function onHide() {
            updateConfirmDialog({
              visible: false
            }); // reset
          }
        });
      },
      hide: function hide() {
        updateConfirmDialog({
          visible: false
        });
      },
      update: function update(newProps) {
        updateConfirmDialog(newProps);
      }
    };
  }
  var ConfirmDialog = /*#__PURE__*/function (_Component) {
    _inherits(ConfirmDialog, _Component);

    var _super = _createSuper(ConfirmDialog);

    function ConfirmDialog(props) {
      var _this;

      _classCallCheck(this, ConfirmDialog);

      _this = _super.call(this, props);
      _this.state = {
        visible: props.visible
      };
      _this.reject = _this.reject.bind(_assertThisInitialized(_this));
      _this.accept = _this.accept.bind(_assertThisInitialized(_this));
      _this.hide = _this.hide.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(ConfirmDialog, [{
      key: "acceptLabel",
      value: function acceptLabel() {
        return this.props.acceptLabel || api.localeOption('accept');
      }
    }, {
      key: "rejectLabel",
      value: function rejectLabel() {
        return this.props.rejectLabel || api.localeOption('reject');
      }
    }, {
      key: "accept",
      value: function accept() {
        if (this.props.accept) {
          this.props.accept();
        }

        this.hide('accept');
      }
    }, {
      key: "reject",
      value: function reject() {
        if (this.props.reject) {
          this.props.reject();
        }

        this.hide('reject');
      }
    }, {
      key: "show",
      value: function show() {
        this.setState({
          visible: true
        });
      }
    }, {
      key: "hide",
      value: function hide(result) {
        var _this2 = this;

        this.setState({
          visible: false
        }, function () {
          if (_this2.props.onHide) {
            _this2.props.onHide(result);
          }
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
          this.setState({
            visible: this.props.visible
          });
        }
      }
    }, {
      key: "renderFooter",
      value: function renderFooter() {
        var acceptClassName = core.classNames('p-confirm-dialog-accept', this.props.acceptClassName);
        var rejectClassName = core.classNames('p-confirm-dialog-reject', {
          'p-button-text': !this.props.rejectClassName
        }, this.props.rejectClassName);
        var content = /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement(button.Button, {
          label: this.rejectLabel(),
          icon: this.props.rejectIcon,
          className: rejectClassName,
          onClick: this.reject
        }), /*#__PURE__*/React__default['default'].createElement(button.Button, {
          label: this.acceptLabel(),
          icon: this.props.acceptIcon,
          className: acceptClassName,
          onClick: this.accept,
          autoFocus: true
        }));

        if (this.props.footer) {
          var defaultContentOptions = {
            accept: this.accept,
            reject: this.reject,
            acceptClassName: acceptClassName,
            rejectClassName: rejectClassName,
            acceptLabel: this.acceptLabel(),
            rejectLabel: this.rejectLabel(),
            element: content,
            props: this.props
          };
          return core.ObjectUtils.getJSXElement(this.props.footer, defaultContentOptions);
        }

        return content;
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var className = core.classNames('p-confirm-dialog', this.props.className);
        var iconClassName = core.classNames('p-confirm-dialog-icon', this.props.icon);
        var dialogProps = core.ObjectUtils.findDiffKeys(this.props, ConfirmDialog.defaultProps);
        var message = core.ObjectUtils.getJSXElement(this.props.message, this.props);
        var footer = this.renderFooter();
        return /*#__PURE__*/React__default['default'].createElement(dialog.Dialog, _extends({
          visible: this.state.visible
        }, dialogProps, {
          className: className,
          footer: footer,
          onHide: this.hide,
          breakpoints: this.props.breakpoints
        }), /*#__PURE__*/React__default['default'].createElement("i", {
          className: iconClassName
        }), /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-confirm-dialog-message"
        }, message));
      }
    }, {
      key: "render",
      value: function render() {
        var element = this.renderElement();
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: element,
          appendTo: this.props.appendTo
        });
      }
    }]);

    return ConfirmDialog;
  }(React.Component);

  _defineProperty(ConfirmDialog, "defaultProps", {
    visible: false,
    message: null,
    rejectLabel: null,
    acceptLabel: null,
    icon: null,
    rejectIcon: null,
    acceptIcon: null,
    rejectClassName: null,
    acceptClassName: null,
    className: null,
    appendTo: null,
    footer: null,
    breakpoints: null,
    onHide: null,
    accept: null,
    reject: null
  });

  exports.ConfirmDialog = ConfirmDialog;
  exports.confirmDialog = confirmDialog;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, ReactDOM, primereact.core, primereact.dialog, primereact.button, primereact.api));
