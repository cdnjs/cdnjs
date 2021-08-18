this.primereact = this.primereact || {};
this.primereact.speeddial = (function (exports, React, button, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var SpeedDial = /*#__PURE__*/function (_Component) {
    _inherits(SpeedDial, _Component);

    var _super = _createSuper(SpeedDial);

    function SpeedDial(props) {
      var _this;

      _classCallCheck(this, SpeedDial);

      _this = _super.call(this, props);
      _this.state = {
        visible: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(SpeedDial, [{
      key: "isVisible",
      value: function isVisible() {
        return this.props.onVisibleChange ? this.props.visible : this.state.visible;
      }
    }, {
      key: "show",
      value: function show() {
        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(true);
        } else {
          this.setState({
            visible: true
          });
        }

        this.props.onShow && this.props.onShow();
      }
    }, {
      key: "hide",
      value: function hide() {
        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(false);
        } else {
          this.setState({
            visible: false
          });
        }

        this.props.onHide && this.props.onHide();
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        this.isVisible() ? this.hide() : this.show();
        this.props.onClick && this.props.onClick(e);
        this.isItemClicked = true;
      }
    }, {
      key: "onItemClick",
      value: function onItemClick(e, item) {
        if (item.command) {
          item.command({
            originalEvent: e,
            item: item
          });
        }

        this.hide();
        this.isItemClicked = true;
        e.preventDefault();
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this2 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this2.isVisible() && _this2.isOutsideClicked(event)) {
              _this2.hide();
            }

            _this2.isItemClicked = false;
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "unbindDocumentClickListener",
      value: function unbindDocumentClickListener() {
        if (this.documentClickListener) {
          document.removeEventListener('click', this.documentClickListener);
          this.documentClickListener = null;
        }
      }
    }, {
      key: "isOutsideClicked",
      value: function isOutsideClicked(event) {
        return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.isItemClicked);
      }
    }, {
      key: "calculateTransitionDelay",
      value: function calculateTransitionDelay(index) {
        var length = this.props.model.length;
        var visible = this.isVisible();
        return (visible ? index : length - index - 1) * this.props.transitionDelay;
      }
    }, {
      key: "calculatePointStyle",
      value: function calculatePointStyle(index) {
        var type = this.props.type;

        if (type !== 'linear') {
          var length = this.props.model.length;
          var radius = this.props.radius || length * 20;

          if (type === 'circle') {
            var step = 2 * Math.PI / length;
            return {
              left: "calc(".concat(radius * Math.cos(step * index), "px + var(--item-diff-x, 0px))"),
              top: "calc(".concat(radius * Math.sin(step * index), "px + var(--item-diff-y, 0px))")
            };
          } else if (type === 'semi-circle') {
            var direction = this.props.direction;

            var _step = Math.PI / (length - 1);

            var x = "calc(".concat(radius * Math.cos(_step * index), "px + var(--item-diff-x, 0px))");
            var y = "calc(".concat(radius * Math.sin(_step * index), "px + var(--item-diff-y, 0px))");

            if (direction === 'up') {
              return {
                left: x,
                bottom: y
              };
            } else if (direction === 'down') {
              return {
                left: x,
                top: y
              };
            } else if (direction === 'left') {
              return {
                right: y,
                top: x
              };
            } else if (direction === 'right') {
              return {
                left: y,
                top: x
              };
            }
          } else if (type === 'quarter-circle') {
            var _direction = this.props.direction;

            var _step2 = Math.PI / (2 * (length - 1));

            var _x = "calc(".concat(radius * Math.cos(_step2 * index), "px + var(--item-diff-x, 0px))");

            var _y = "calc(".concat(radius * Math.sin(_step2 * index), "px + var(--item-diff-y, 0px))");

            if (_direction === 'up-left') {
              return {
                right: _x,
                bottom: _y
              };
            } else if (_direction === 'up-right') {
              return {
                left: _x,
                bottom: _y
              };
            } else if (_direction === 'down-left') {
              return {
                right: _y,
                top: _x
              };
            } else if (_direction === 'down-right') {
              return {
                left: _y,
                top: _x
              };
            }
          }
        }

        return {};
      }
    }, {
      key: "getItemStyle",
      value: function getItemStyle(index) {
        var transitionDelay = this.calculateTransitionDelay(index);
        var pointStyle = this.calculatePointStyle(index);
        return _objectSpread({
          transitionDelay: "".concat(transitionDelay, "ms")
        }, pointStyle);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.type !== 'linear') {
          var button = core.DomHandler.findSingle(this.container, '.p-speeddial-button');
          var firstItem = core.DomHandler.findSingle(this.list, '.p-speeddial-item');

          if (button && firstItem) {
            var wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
            var hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
            this.list.style.setProperty('--item-diff-x', "".concat(wDiff / 2, "px"));
            this.list.style.setProperty('--item-diff-y', "".concat(hDiff / 2, "px"));
          }
        }

        if (this.props.hideOnClickOutside) {
          this.bindDocumentClickListener();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.hideOnClickOutside) {
          this.unbindDocumentClickListener();
        }
      }
    }, {
      key: "renderItem",
      value: function renderItem(item, index) {
        var _this3 = this;

        var style = this.getItemStyle(index);
        var disabled = item.disabled,
            _icon = item.icon,
            label = item.label,
            template = item.template,
            url = item.url,
            target = item.target;
        var contentClassName = core.classNames('p-speeddial-action', {
          'p-disabled': disabled
        });
        var iconClassName = core.classNames('p-speeddial-action-icon', _icon);

        var icon = _icon && /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        });

        var content = /*#__PURE__*/React__default['default'].createElement("a", {
          href: url || '#',
          role: "menuitem",
          className: contentClassName,
          target: target,
          "data-pr-tooltip": label,
          onClick: function onClick(e) {
            return _this3.onItemClick(e, item);
          }
        }, icon, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));

        if (template) {
          var defaultContentOptions = {
            onClick: function onClick(e) {
              return _this3.onItemClick(e, item);
            },
            className: contentClassName,
            iconClassName: iconClassName,
            element: content,
            props: this.props,
            visible: this.isVisible()
          };
          content = core.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
        }

        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: index,
          className: "p-speeddial-item",
          style: style,
          role: "none"
        }, content);
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this4 = this;

        if (this.props.model) {
          return this.props.model.map(function (item, index) {
            return _this4.renderItem(item, index);
          });
        }

        return null;
      }
    }, {
      key: "renderList",
      value: function renderList() {
        var _this5 = this;

        var items = this.renderItems();
        return /*#__PURE__*/React__default['default'].createElement("ul", {
          ref: function ref(el) {
            return _this5.list = el;
          },
          className: "p-speeddial-list",
          role: "menu"
        }, items);
      }
    }, {
      key: "renderButton",
      value: function renderButton() {
        var _classNames,
            _this6 = this;

        var visible = this.isVisible();
        var className = core.classNames('p-speeddial-button p-button-rounded', {
          'p-speeddial-rotate': this.props.rotateAnimation && !this.props.hideIcon
        }, this.props.buttonClassName);
        var iconClassName = core.classNames((_classNames = {}, _defineProperty(_classNames, "".concat(this.props.showIcon), !visible && !!this.props.showIcon || !this.props.hideIcon), _defineProperty(_classNames, "".concat(this.props.hideIcon), visible && !!this.props.hideIcon), _classNames));
        var content = /*#__PURE__*/React__default['default'].createElement(button.Button, {
          type: "button",
          style: this.props.buttonStyle,
          className: className,
          icon: iconClassName,
          onClick: this.onClick,
          disabled: this.props.disabled
        });

        if (this.props.buttonTemplate) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return _this6.onClick(event);
            },
            className: className,
            iconClassName: iconClassName,
            element: content,
            props: this.props,
            visible: visible
          };
          return core.ObjectUtils.getJSXElement(this.props.buttonTemplate, defaultContentOptions);
        }

        return content;
      }
    }, {
      key: "renderMask",
      value: function renderMask() {
        if (this.props.mask) {
          var visible = this.isVisible();
          var className = core.classNames('p-speeddial-mask', {
            'p-speeddial-mask-visible': visible
          }, this.props.maskClassName);
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: className,
            style: this.props.maskStyle
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _classNames2,
            _this7 = this;

        var className = core.classNames("p-speeddial p-component p-speeddial-".concat(this.props.type), (_classNames2 = {}, _defineProperty(_classNames2, "p-speeddial-direction-".concat(this.props.direction), this.props.type !== 'circle'), _defineProperty(_classNames2, 'p-speeddial-opened', this.isVisible()), _defineProperty(_classNames2, 'p-disabled', this.props.disabled), _classNames2), this.props.className);
        var button = this.renderButton();
        var list = this.renderList();
        var mask = this.renderMask();
        return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this7.container = el;
          },
          id: this.props.id,
          className: className,
          style: this.props.style
        }, button, list), mask);
      }
    }]);

    return SpeedDial;
  }(React.Component);

  _defineProperty(SpeedDial, "defaultProps", {
    id: null,
    model: null,
    visible: false,
    style: null,
    className: null,
    direction: 'up',
    transitionDelay: 30,
    type: 'linear',
    radius: 0,
    mask: false,
    disabled: false,
    hideOnClickOutside: true,
    buttonStyle: null,
    buttonClassName: null,
    buttonTemplate: null,
    maskStyle: null,
    maskClassName: null,
    showIcon: 'pi pi-plus',
    hideIcon: null,
    rotateAnimation: true,
    onVisibleChange: null,
    onClick: null,
    onShow: null,
    onHide: null
  });

  exports.SpeedDial = SpeedDial;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.button, primereact.core));
