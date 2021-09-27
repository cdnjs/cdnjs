this.primereact = this.primereact || {};
this.primereact.contextmenu = (function (exports, React, core) {
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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var ContextMenuSub = /*#__PURE__*/function (_Component) {
    _inherits(ContextMenuSub, _Component);

    var _super = _createSuper(ContextMenuSub);

    function ContextMenuSub(props) {
      var _this;

      _classCallCheck(this, ContextMenuSub);

      _this = _super.call(this, props);
      _this.state = {
        activeItem: null
      };
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.submenuRef = /*#__PURE__*/React__default['default'].createRef();
      return _this;
    }

    _createClass(ContextMenuSub, [{
      key: "onItemMouseEnter",
      value: function onItemMouseEnter(event, item) {
        if (item.disabled) {
          event.preventDefault();
          return;
        }

        this.setState({
          activeItem: item
        });
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

        if (!item.items) {
          this.props.onLeafClick(event);
        }
      }
    }, {
      key: "position",
      value: function position() {
        var parentItem = this.submenuRef.current.parentElement;
        var containerOffset = core.DomHandler.getOffset(this.submenuRef.current.parentElement);
        var viewport = core.DomHandler.getViewport();
        var sublistWidth = this.submenuRef.current.offsetParent ? this.submenuRef.current.offsetWidth : core.DomHandler.getHiddenElementOuterWidth(this.submenuRef.current);
        var itemOuterWidth = core.DomHandler.getOuterWidth(parentItem.children[0]);
        this.submenuRef.current.style.top = '0px';

        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - core.DomHandler.calculateScrollbarWidth()) {
          this.submenuRef.current.style.left = -1 * sublistWidth + 'px';
        } else {
          this.submenuRef.current.style.left = itemOuterWidth + 'px';
        }
      }
    }, {
      key: "onEnter",
      value: function onEnter() {
        this.position();
      }
    }, {
      key: "isActive",
      value: function isActive() {
        return this.props.root || !this.props.resetMenu;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.isActive()) {
          this.position();
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
          return /*#__PURE__*/React__default['default'].createElement(ContextMenuSub, {
            model: item.items,
            resetMenu: item !== this.state.activeItem,
            onLeafClick: this.props.onLeafClick
          });
        }

        return null;
      }
    }, {
      key: "renderMenuitem",
      value: function renderMenuitem(item, index) {
        var _this2 = this;

        var active = this.state.activeItem === item;
        var className = core.classNames('p-menuitem', {
          'p-menuitem-active': active
        }, item.className);
        var linkClassName = core.classNames('p-menuitem-link', {
          'p-disabled': item.disabled
        });
        var iconClassName = core.classNames('p-menuitem-icon', item.icon);
        var submenuIconClassName = 'p-submenu-icon pi pi-angle-right';
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
          className: linkClassName,
          target: item.target,
          onClick: function onClick(event) {
            return _this2.onItemClick(event, item, index);
          },
          role: "menuitem",
          "aria-haspopup": item.items != null,
          "aria-disabled": item.disabled
        }, icon, label, submenuIcon, /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));

        if (item.template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return _this2.onItemClick(event, item, index);
            },
            className: linkClassName,
            labelClassName: 'p-menuitem-text',
            iconClassName: iconClassName,
            submenuIconClassName: submenuIconClassName,
            element: content,
            props: this.props,
            active: active
          };
          content = core.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
        }

        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: item.label + '_' + index,
          role: "none",
          className: className,
          style: item.style,
          onMouseEnter: function onMouseEnter(event) {
            return _this2.onItemMouseEnter(event, item);
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
        var _this3 = this;

        if (this.props.model) {
          return this.props.model.map(function (item, index) {
            return _this3.renderItem(item, index);
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames({
          'p-submenu-list': !this.props.root
        });
        var submenu = this.renderMenu();
        var isActive = this.isActive();
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.submenuRef,
          classNames: "p-contextmenusub",
          in: isActive,
          timeout: {
            enter: 0,
            exit: 0
          },
          unmountOnExit: true,
          onEnter: this.onEnter
        }, /*#__PURE__*/React__default['default'].createElement("ul", {
          ref: this.submenuRef,
          className: className
        }, submenu));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.resetMenu === true) {
          return {
            activeItem: null
          };
        }

        return null;
      }
    }]);

    return ContextMenuSub;
  }(React.Component);

  _defineProperty(ContextMenuSub, "defaultProps", {
    model: null,
    root: false,
    className: null,
    resetMenu: false,
    onLeafClick: null
  });

  var ContextMenu = /*#__PURE__*/function (_Component2) {
    _inherits(ContextMenu, _Component2);

    var _super2 = _createSuper(ContextMenu);

    function ContextMenu(props) {
      var _this4;

      _classCallCheck(this, ContextMenu);

      _this4 = _super2.call(this, props);
      _this4.state = {
        visible: false,
        reshow: false,
        resetMenu: false
      };
      _this4.onMenuClick = _this4.onMenuClick.bind(_assertThisInitialized(_this4));
      _this4.onLeafClick = _this4.onLeafClick.bind(_assertThisInitialized(_this4));
      _this4.onMenuMouseEnter = _this4.onMenuMouseEnter.bind(_assertThisInitialized(_this4));
      _this4.onEnter = _this4.onEnter.bind(_assertThisInitialized(_this4));
      _this4.onEntered = _this4.onEntered.bind(_assertThisInitialized(_this4));
      _this4.onExit = _this4.onExit.bind(_assertThisInitialized(_this4));
      _this4.onExited = _this4.onExited.bind(_assertThisInitialized(_this4));
      _this4.menuRef = /*#__PURE__*/React__default['default'].createRef();
      return _this4;
    }

    _createClass(ContextMenu, [{
      key: "onMenuClick",
      value: function onMenuClick() {
        this.setState({
          resetMenu: false
        });
      }
    }, {
      key: "onMenuMouseEnter",
      value: function onMenuMouseEnter() {
        this.setState({
          resetMenu: false
        });
      }
    }, {
      key: "show",
      value: function show(event) {
        var _this5 = this;

        if (!(event instanceof Event)) {
          event.persist();
        }

        event.stopPropagation();
        event.preventDefault();
        this.currentEvent = event;

        if (this.state.visible) {
          this.setState({
            reshow: true
          });
        } else {
          this.setState({
            visible: true
          }, function () {
            if (_this5.props.onShow) {
              _this5.props.onShow(_this5.currentEvent);
            }
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this6 = this;

        if (this.state.visible && prevState.reshow !== this.state.reshow) {
          var event = this.currentEvent;
          this.setState({
            visible: false,
            reshow: false,
            rePosition: false,
            resetMenu: true
          }, function () {
            return _this6.show(event);
          });
        }
      }
    }, {
      key: "hide",
      value: function hide(event) {
        var _this7 = this;

        if (!(event instanceof Event)) {
          event.persist();
        }

        this.currentEvent = event;
        this.setState({
          visible: false,
          reshow: false
        }, function () {
          if (_this7.props.onHide) {
            _this7.props.onHide(_this7.currentEvent);
          }
        });
      }
    }, {
      key: "onEnter",
      value: function onEnter() {
        if (this.props.autoZIndex) {
          core.ZIndexUtils.set('menu', this.menuRef.current, this.props.baseZIndex);
        }

        this.position(this.currentEvent);
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        this.bindDocumentListeners();
      }
    }, {
      key: "onExit",
      value: function onExit() {
        this.currentEvent = null;
        this.unbindDocumentListeners();
      }
    }, {
      key: "onExited",
      value: function onExited() {
        core.ZIndexUtils.clear(this.menuRef.current);
      }
    }, {
      key: "position",
      value: function position(event) {
        if (event) {
          var left = event.pageX + 1;
          var top = event.pageY + 1;
          var width = this.menuRef.current.offsetParent ? this.menuRef.current.offsetWidth : core.DomHandler.getHiddenElementOuterWidth(this.menuRef.current);
          var height = this.menuRef.current.offsetParent ? this.menuRef.current.offsetHeight : core.DomHandler.getHiddenElementOuterHeight(this.menuRef.current);
          var viewport = core.DomHandler.getViewport(); //flip

          if (left + width - document.body.scrollLeft > viewport.width) {
            left -= width;
          } //flip


          if (top + height - document.body.scrollTop > viewport.height) {
            top -= height;
          } //fit


          if (left < document.body.scrollLeft) {
            left = document.body.scrollLeft;
          } //fit


          if (top < document.body.scrollTop) {
            top = document.body.scrollTop;
          }

          this.menuRef.current.style.left = left + 'px';
          this.menuRef.current.style.top = top + 'px';
        }
      }
    }, {
      key: "onLeafClick",
      value: function onLeafClick(event) {
        this.setState({
          resetMenu: true
        });
        this.hide(event);
        event.stopPropagation();
      }
    }, {
      key: "isOutsideClicked",
      value: function isOutsideClicked(event) {
        return this.menuRef && this.menuRef.current && !(this.menuRef.current.isSameNode(event.target) || this.menuRef.current.contains(event.target));
      }
    }, {
      key: "bindDocumentListeners",
      value: function bindDocumentListeners() {
        this.bindDocumentResizeListener();
        this.bindDocumentClickListener();
      }
    }, {
      key: "unbindDocumentListeners",
      value: function unbindDocumentListeners() {
        this.unbindDocumentResizeListener();
        this.unbindDocumentClickListener();
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this8 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this8.isOutsideClicked(event) && event.button !== 2) {
              _this8.hide(event);

              _this8.setState({
                resetMenu: true
              });
            }
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "bindDocumentContextMenuListener",
      value: function bindDocumentContextMenuListener() {
        var _this9 = this;

        if (!this.documentContextMenuListener) {
          this.documentContextMenuListener = function (event) {
            _this9.show(event);
          };

          document.addEventListener('contextmenu', this.documentContextMenuListener);
        }
      }
    }, {
      key: "bindDocumentResizeListener",
      value: function bindDocumentResizeListener() {
        var _this10 = this;

        if (!this.documentResizeListener) {
          this.documentResizeListener = function (event) {
            if (_this10.state.visible && !core.DomHandler.isAndroid()) {
              _this10.hide(event);
            }
          };

          window.addEventListener('resize', this.documentResizeListener);
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
      key: "unbindDocumentContextMenuListener",
      value: function unbindDocumentContextMenuListener() {
        if (this.documentContextMenuListener) {
          document.removeEventListener('contextmenu', this.documentContextMenuListener);
          this.documentContextMenuListener = null;
        }
      }
    }, {
      key: "unbindDocumentResizeListener",
      value: function unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
          window.removeEventListener('resize', this.documentResizeListener);
          this.documentResizeListener = null;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.global) {
          this.bindDocumentContextMenuListener();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unbindDocumentListeners();
        this.unbindDocumentContextMenuListener();
        core.ZIndexUtils.clear(this.menuRef.current);
      }
    }, {
      key: "renderContextMenu",
      value: function renderContextMenu() {
        var className = core.classNames('p-contextmenu p-component', this.props.className);
        return /*#__PURE__*/React__default['default'].createElement(core.CSSTransition, {
          nodeRef: this.menuRef,
          classNames: "p-contextmenu",
          in: this.state.visible,
          timeout: {
            enter: 250,
            exit: 0
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onExit: this.onExit,
          onExited: this.onExited
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          ref: this.menuRef,
          id: this.props.id,
          className: className,
          style: this.props.style,
          onClick: this.onMenuClick,
          onMouseEnter: this.onMenuMouseEnter
        }, /*#__PURE__*/React__default['default'].createElement(ContextMenuSub, {
          model: this.props.model,
          root: true,
          resetMenu: this.state.resetMenu,
          onLeafClick: this.onLeafClick
        })));
      }
    }, {
      key: "render",
      value: function render() {
        var element = this.renderContextMenu();
        return /*#__PURE__*/React__default['default'].createElement(core.Portal, {
          element: element,
          appendTo: this.props.appendTo
        });
      }
    }]);

    return ContextMenu;
  }(React.Component);

  _defineProperty(ContextMenu, "defaultProps", {
    id: null,
    model: null,
    style: null,
    className: null,
    global: false,
    autoZIndex: true,
    baseZIndex: 0,
    appendTo: null,
    transitionOptions: null,
    onShow: null,
    onHide: null
  });

  exports.ContextMenu = ContextMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
