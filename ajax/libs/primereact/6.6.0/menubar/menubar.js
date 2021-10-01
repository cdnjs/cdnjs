this.primereact = this.primereact || {};
this.primereact.menubar = (function (exports, React, core) {
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

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var MenubarSubComponent = /*#__PURE__*/function (_Component) {
    _inherits(MenubarSubComponent, _Component);

    var _super = _createSuper$1(MenubarSubComponent);

    function MenubarSubComponent(props) {
      var _this;

      _classCallCheck(this, MenubarSubComponent);

      _this = _super.call(this, props);
      _this.state = {
        activeItem: null
      };
      _this.onLeafClick = _this.onLeafClick.bind(_assertThisInitialized(_this));
      _this.onChildItemKeyDown = _this.onChildItemKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(MenubarSubComponent, [{
      key: "getElementRef",
      value: function getElementRef(el) {
        this.element = el;

        if (this.props.forwardRef) {
          return this.props.forwardRef(el);
        }

        return this.element;
      }
    }, {
      key: "onItemMouseEnter",
      value: function onItemMouseEnter(event, item) {
        if (item.disabled || this.props.mobileActive) {
          event.preventDefault();
          return;
        }

        if (this.props.root) {
          if (this.state.activeItem || this.props.popup) {
            this.setState({
              activeItem: item
            });
          }
        } else {
          this.setState({
            activeItem: item
          });
        }
      }
    }, {
      key: "onItemClick",
      value: function onItemClick(event, item) {
        if (item.disabled) {
          event.preventDefault();
          return;
        }

        if (!item.url) {
          event.preventDefault();
        }

        if (item.command) {
          item.command({
            originalEvent: event,
            item: item
          });
        }

        if (item.items) {
          if (this.state.activeItem && item === this.state.activeItem) {
            this.setState({
              activeItem: null
            });
          } else {
            this.setState({
              activeItem: item
            });
          }
        } else {
          this.onLeafClick();
        }
      }
    }, {
      key: "onItemKeyDown",
      value: function onItemKeyDown(event, item) {
        var listItem = event.currentTarget.parentElement;

        switch (event.which) {
          //down
          case 40:
            if (this.props.root) {
              if (item.items) {
                this.expandSubmenu(item, listItem);
              }
            } else {
              this.navigateToNextItem(listItem);
            }

            event.preventDefault();
            break;
          //up

          case 38:
            if (!this.props.root) {
              this.navigateToPrevItem(listItem);
            }

            event.preventDefault();
            break;
          //right

          case 39:
            if (this.props.root) {
              var nextItem = this.findNextItem(listItem);

              if (nextItem) {
                nextItem.children[0].focus();
              }
            } else {
              if (item.items) {
                this.expandSubmenu(item, listItem);
              }
            }

            event.preventDefault();
            break;
          //left

          case 37:
            if (this.props.root) {
              this.navigateToPrevItem(listItem);
            }

            event.preventDefault();
            break;
        }

        if (this.props.onKeyDown) {
          this.props.onKeyDown(event, listItem);
        }
      }
    }, {
      key: "onChildItemKeyDown",
      value: function onChildItemKeyDown(event, childListItem) {
        if (this.props.root) {
          //up
          if (event.which === 38 && childListItem.previousElementSibling == null) {
            this.collapseMenu(childListItem);
          }
        } else {
          //left
          if (event.which === 37) {
            this.collapseMenu(childListItem);
          }
        }
      }
    }, {
      key: "expandSubmenu",
      value: function expandSubmenu(item, listItem) {
        this.setState({
          activeItem: item
        });
        setTimeout(function () {
          listItem.children[1].children[0].children[0].focus();
        }, 50);
      }
    }, {
      key: "collapseMenu",
      value: function collapseMenu(listItem) {
        this.setState({
          activeItem: null
        });
        listItem.parentElement.previousElementSibling.focus();
      }
    }, {
      key: "navigateToNextItem",
      value: function navigateToNextItem(listItem) {
        var nextItem = this.findNextItem(listItem);

        if (nextItem) {
          nextItem.children[0].focus();
        }
      }
    }, {
      key: "navigateToPrevItem",
      value: function navigateToPrevItem(listItem) {
        var prevItem = this.findPrevItem(listItem);

        if (prevItem) {
          prevItem.children[0].focus();
        }
      }
    }, {
      key: "findNextItem",
      value: function findNextItem(item) {
        var nextItem = item.nextElementSibling;
        if (nextItem) return core.DomHandler.hasClass(nextItem, 'p-disabled') || !core.DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;else return null;
      }
    }, {
      key: "findPrevItem",
      value: function findPrevItem(item) {
        var prevItem = item.previousElementSibling;
        if (prevItem) return core.DomHandler.hasClass(prevItem, 'p-disabled') || !core.DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;else return null;
      }
    }, {
      key: "onLeafClick",
      value: function onLeafClick() {
        this.setState({
          activeItem: null
        });

        if (this.props.onLeafClick) {
          this.props.onLeafClick();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this2.element && !_this2.element.contains(event.target)) {
              _this2.setState({
                activeItem: null
              });
            }
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.parentActive && !this.props.parentActive) {
          this.setState({
            activeItem: null
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.documentClickListener) {
          document.removeEventListener('click', this.documentClickListener);
          this.documentClickListener = null;
        }
      }
    }, {
      key: "renderSeparator",
      value: function renderSeparator(index) {
        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: 'separator_' + index,
          className: "p-menu-separator",
          role: "separator"
        });
      }
    }, {
      key: "renderSubmenu",
      value: function renderSubmenu(item) {
        if (item.items) {
          return /*#__PURE__*/React__default['default'].createElement(MenubarSub, {
            model: item.items,
            mobileActive: this.props.mobileActive,
            onLeafClick: this.onLeafClick,
            onKeyDown: this.onChildItemKeyDown,
            parentActive: item === this.state.activeItem
          });
        }

        return null;
      }
    }, {
      key: "renderMenuitem",
      value: function renderMenuitem(item, index) {
        var _this3 = this;

        var className = core.classNames('p-menuitem', {
          'p-menuitem-active': this.state.activeItem === item
        }, item.className);
        var linkClassName = core.classNames('p-menuitem-link', {
          'p-disabled': item.disabled
        });
        var iconClassName = core.classNames('p-menuitem-icon', item.icon);
        var submenuIconClassName = core.classNames('p-submenu-icon pi', {
          'pi-angle-down': this.props.root,
          'pi-angle-right': !this.props.root
        });
        var icon = item.icon && /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        });
        var label = item.label && /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-menuitem-text"
        }, item.label);
        var submenuIcon = item.items && /*#__PURE__*/React__default['default'].createElement("span", {
          className: submenuIconClassName
        });
        var submenu = this.renderSubmenu(item);
        var content = /*#__PURE__*/React__default['default'].createElement("a", {
          href: item.url || '#',
          role: "menuitem",
          className: linkClassName,
          target: item.target,
          "aria-haspopup": item.items != null,
          onClick: function onClick(event) {
            return _this3.onItemClick(event, item);
          },
          onKeyDown: function onKeyDown(event) {
            return _this3.onItemKeyDown(event, item);
          }
        }, icon, label, submenuIcon, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));

        if (item.template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return _this3.onItemClick(event, item);
            },
            onKeyDown: function onKeyDown(event) {
              return _this3.onItemKeyDown(event, item);
            },
            className: linkClassName,
            labelClassName: 'p-menuitem-text',
            iconClassName: iconClassName,
            submenuIconClassName: submenuIconClassName,
            element: content,
            props: this.props
          };
          content = core.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
        }

        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: item.label + '_' + index,
          role: "none",
          className: className,
          style: item.style,
          onMouseEnter: function onMouseEnter(event) {
            return _this3.onItemMouseEnter(event, item);
          }
        }, content, submenu);
      }
    }, {
      key: "renderItem",
      value: function renderItem(item, index) {
        if (item.separator) return this.renderSeparator(index);else return this.renderMenuitem(item, index);
      }
    }, {
      key: "renderMenu",
      value: function renderMenu() {
        var _this4 = this;

        if (this.props.model) {
          return this.props.model.map(function (item, index) {
            return _this4.renderItem(item, index);
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this5 = this;

        var className = core.classNames({
          'p-submenu-list': !this.props.root,
          'p-menubar-root-list': this.props.root
        });
        var submenu = this.renderMenu();
        return /*#__PURE__*/React__default['default'].createElement("ul", {
          ref: function ref(el) {
            return _this5.getElementRef(el);
          },
          className: className,
          role: this.props.root ? 'menubar' : 'menu'
        }, submenu);
      }
    }]);

    return MenubarSubComponent;
  }(React.Component);

  _defineProperty(MenubarSubComponent, "defaultProps", {
    model: null,
    root: false,
    className: null,
    popup: false,
    onLeafClick: null,
    onKeyDown: null,
    parentActive: false,
    mobileActive: false,
    forwardRef: null
  });

  var MenubarSub = /*#__PURE__*/React__default['default'].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default['default'].createElement(MenubarSubComponent, _extends({
      forwardRef: ref
    }, props));
  });

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Menubar = /*#__PURE__*/function (_Component) {
    _inherits(Menubar, _Component);

    var _super = _createSuper(Menubar);

    function Menubar(props) {
      var _this;

      _classCallCheck(this, Menubar);

      _this = _super.call(this, props);
      _this.state = {
        mobileActive: false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_this));
      _this.onLeafClick = _this.onLeafClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Menubar, [{
      key: "toggle",
      value: function toggle(event) {
        var _this2 = this;

        event.preventDefault();
        this.setState(function (prevState) {
          return {
            mobileActive: !prevState.mobileActive
          };
        }, function () {
          if (_this2.state.mobileActive) {
            core.ZIndexUtils.set('menu', _this2.rootmenu);

            _this2.bindDocumentClickListener();
          } else {
            _this2.unbindDocumentClickListener();

            core.ZIndexUtils.clear(_this2.rootmenu);
          }
        });
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this3 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this3.state.mobileActive && _this3.isOutsideClicked(event)) {
              _this3.setState({
                mobileActive: false
              }, function () {
                _this3.unbindDocumentClickListener();

                core.ZIndexUtils.clear(_this3.rootmenu);
              });
            }
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "isOutsideClicked",
      value: function isOutsideClicked(event) {
        return this.rootmenu !== event.target && !this.rootmenu.contains(event.target) && this.menubutton !== event.target && !this.menubutton.contains(event.target);
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
      key: "onLeafClick",
      value: function onLeafClick() {
        var _this4 = this;

        this.setState({
          mobileActive: false
        }, function () {
          _this4.unbindDocumentClickListener();

          core.ZIndexUtils.clear(_this4.rootmenu);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        core.ZIndexUtils.clear(this.rootmenu);
      }
    }, {
      key: "renderCustomContent",
      value: function renderCustomContent() {
        if (this.props.children) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-menubar-custom"
          }, this.props.children);
        }

        return null;
      }
    }, {
      key: "renderStartContent",
      value: function renderStartContent() {
        if (this.props.start) {
          var start = core.ObjectUtils.getJSXElement(this.props.start, this.props);
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-menubar-start"
          }, start);
        }

        return null;
      }
    }, {
      key: "renderEndContent",
      value: function renderEndContent() {
        if (this.props.end) {
          var end = core.ObjectUtils.getJSXElement(this.props.end, this.props);
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-menubar-end"
          }, end);
        }

        return null;
      }
    }, {
      key: "renderMenuButton",
      value: function renderMenuButton() {
        var _this5 = this;

        /* eslint-disable */
        var button = /*#__PURE__*/React__default['default'].createElement("a", {
          ref: function ref(el) {
            return _this5.menubutton = el;
          },
          href: '#',
          role: "button",
          tabIndex: 0,
          className: "p-menubar-button",
          onClick: this.toggle
        }, /*#__PURE__*/React__default['default'].createElement("i", {
          className: "pi pi-bars"
        }));
        /* eslint-enable */

        return button;
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var className = core.classNames('p-menubar p-component', {
          'p-menubar-mobile-active': this.state.mobileActive
        }, this.props.className);
        var start = this.renderStartContent();
        var end = this.renderEndContent();
        var menuButton = this.renderMenuButton();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style
        }, start, menuButton, /*#__PURE__*/React__default['default'].createElement(MenubarSub, {
          ref: function ref(el) {
            return _this6.rootmenu = el;
          },
          model: this.props.model,
          root: true,
          mobileActive: this.state.mobileActive,
          onLeafClick: this.onLeafClick
        }), end);
      }
    }]);

    return Menubar;
  }(React.Component);

  _defineProperty(Menubar, "defaultProps", {
    id: null,
    model: null,
    style: null,
    className: null,
    start: null,
    end: null
  });

  exports.Menubar = Menubar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
