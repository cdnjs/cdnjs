this.primereact = this.primereact || {};
this.primereact.datatable = (function (exports, React, paginator, core, inputtext) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
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

  function _createSuper$c(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$c(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$c() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ScrollableView = /*#__PURE__*/function (_Component) {
    _inherits(ScrollableView, _Component);

    var _super = _createSuper$c(ScrollableView);

    function ScrollableView(props) {
      var _this;

      _classCallCheck(this, ScrollableView);

      _this = _super.call(this, props);
      _this.onHeaderScroll = _this.onHeaderScroll.bind(_assertThisInitialized(_this));
      _this.onBodyScroll = _this.onBodyScroll.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(ScrollableView, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.setScrollHeight();

        if (!this.props.frozen) {
          var scrollBarWidth = core.DomHandler.calculateScrollbarWidth();
          this.scrollHeaderBox.style.marginRight = scrollBarWidth + 'px';

          if (this.scrollFooterBox) {
            this.scrollFooterBox.style.marginRight = scrollBarWidth + 'px';
          }
        } else {
          this.scrollBody.style.paddingBottom = core.DomHandler.calculateScrollbarWidth() + 'px';
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.scrollHeight !== prevProps.scrollHeight) {
          this.setScrollHeight();
        }

        if (!this.props.frozen && this.props.virtualScroll) {
          this.virtualScroller.style.height = this.props.totalRecords * this.props.virtualRowHeight + 'px';
        }

        if (this.virtualScrollCallback && !this.props.loading) {
          this.virtualScrollCallback();
          this.virtualScrollCallback = null;
        }
      }
    }, {
      key: "setScrollHeight",
      value: function setScrollHeight() {
        if (this.props.scrollHeight) {
          var frozenView = this.container.previousElementSibling;

          if (frozenView) {
            var frozenScrollBody = core.DomHandler.findSingle(frozenView, '.p-datatable-scrollable-body');
            this.scrollBody.style.maxHeight = frozenScrollBody.style.maxHeight;
          } else {
            if (this.props.scrollHeight.indexOf('%') !== -1) {
              var datatableContainer = this.findDataTableContainer(this.container);
              this.scrollBody.style.visibility = 'hidden';
              this.scrollBody.style.height = '100px'; //temporary height to calculate static height

              var containerHeight = core.DomHandler.getOuterHeight(datatableContainer);
              var relativeHeight = core.DomHandler.getOuterHeight(datatableContainer.parentElement) * parseInt(this.props.scrollHeight, 10) / 100;
              var staticHeight = containerHeight - 100; //total height of headers, footers, paginators

              var scrollBodyHeight = relativeHeight - staticHeight;

              if (this.props.frozen) {
                scrollBodyHeight -= core.DomHandler.calculateScrollbarWidth();
              }

              this.scrollBody.style.height = 'auto';
              this.scrollBody.style.maxHeight = scrollBodyHeight + 'px';
              this.scrollBody.style.visibility = 'visible';
            } else {
              this.scrollBody.style.maxHeight = this.props.scrollHeight;
            }
          }
        }
      }
    }, {
      key: "findDataTableContainer",
      value: function findDataTableContainer(element) {
        if (element) {
          var el = element;

          while (el && !core.DomHandler.hasClass(el, 'p-datatable')) {
            el = el.parentElement;
          }

          return el;
        } else {
          return null;
        }
      }
    }, {
      key: "onHeaderScroll",
      value: function onHeaderScroll() {
        this.scrollHeader.scrollLeft = 0;
      }
    }, {
      key: "onBodyScroll",
      value: function onBodyScroll() {
        var _this2 = this;

        var frozenView = this.container.previousElementSibling;
        var frozenScrollBody;

        if (frozenView) {
          frozenScrollBody = core.DomHandler.findSingle(frozenView, '.p-datatable-scrollable-body');
        }

        this.scrollHeaderBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';

        if (this.scrollFooterBox) {
          this.scrollFooterBox.style.marginLeft = -1 * this.scrollBody.scrollLeft + 'px';
        }

        if (frozenScrollBody) {
          frozenScrollBody.scrollTop = this.scrollBody.scrollTop;
        }

        if (this.props.virtualScroll) {
          var viewport = core.DomHandler.getClientHeight(this.scrollBody);
          var tableHeight = core.DomHandler.getOuterHeight(this.scrollTable);
          var pageHeight = this.props.virtualRowHeight * this.props.rows;
          var virtualTableHeight = core.DomHandler.getOuterHeight(this.virtualScroller);
          var pageCount = virtualTableHeight / pageHeight || 1;
          var scrollBodyTop = this.scrollTable.style.top || '0';

          if (this.scrollBody.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight || this.scrollBody.scrollTop < parseFloat(scrollBodyTop)) {
            if (this.loadingTable) {
              this.loadingTable.style.display = 'table';
              this.loadingTable.style.top = this.scrollBody.scrollTop + 'px';
            }

            var page = Math.floor(this.scrollBody.scrollTop * pageCount / this.scrollBody.scrollHeight) + 1;

            if (this.props.onVirtualScroll) {
              this.props.onVirtualScroll({
                page: page
              });

              this.virtualScrollCallback = function () {
                if (_this2.loadingTable) {
                  _this2.loadingTable.style.display = 'none';
                }

                _this2.scrollTable.style.top = (page - 1) * pageHeight + 'px';
              };
            }
          }
        }
      }
    }, {
      key: "renderColGroup",
      value: function renderColGroup() {
        if (this.props.columns && this.props.columns.length) {
          return /*#__PURE__*/React__default['default'].createElement("colgroup", {
            className: "p-datatable-scrollable-colgroup"
          }, this.props.columns.map(function (col, i) {
            return /*#__PURE__*/React__default['default'].createElement("col", {
              key: col.props.field + '_' + i,
              style: col.props.headerStyle || col.props.style,
              className: col.props.headerClassName || col.props.className
            });
          }));
        } else {
          return null;
        }
      }
    }, {
      key: "renderLoadingTable",
      value: function renderLoadingTable(colGroup) {
        var _this3 = this;

        if (this.props.virtualScroll) {
          return /*#__PURE__*/React__default['default'].createElement("table", {
            ref: function ref(el) {
              return _this3.loadingTable = el;
            },
            style: {
              top: '0',
              display: 'none'
            },
            className: "p-datatable-scrollable-body-table p-datatable-loading-virtual-table p-datatable-virtual-table"
          }, colGroup, this.props.loadingBody);
        } else {
          return null;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var className = core.classNames('p-datatable-scrollable-view', {
          'p-datatable-frozen-view': this.props.frozen,
          'p-datatable-unfrozen-view': !this.props.frozen && this.props.frozenWidth
        });
        var tableBodyClassName = core.classNames('p-datatable-scrollable-body-table', this.props.tableClassName, {
          'p-datatable-virtual-table': this.props.virtualScroll
        });
        var tableHeaderClassName = core.classNames('p-datatable-scrollable-header-table', this.props.tableClassName);
        var tableFooterClassName = core.classNames('p-datatable-scrollable-footer-table', this.props.tableClassName);
        var tableBodyStyle = Object.assign({
          top: '0'
        }, this.props.tableStyle);
        var width = this.props.columns ? this.props.frozen ? this.props.frozenWidth : 'calc(100% - ' + this.props.frozenWidth + ')' : 0;
        var left = this.props.frozen ? null : this.props.frozenWidth;
        var colGroup = this.renderColGroup();
        var loadingTable = this.renderLoadingTable(colGroup);
        var scrollableBodyStyle = !this.props.frozen && this.props.scrollHeight ? {
          overflowY: 'scroll'
        } : null;
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: className,
          style: {
            width: width,
            left: left
          },
          ref: function ref(el) {
            _this4.container = el;
          }
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-scrollable-header",
          ref: function ref(el) {
            _this4.scrollHeader = el;
          },
          onScroll: this.onHeaderScroll
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-scrollable-header-box",
          ref: function ref(el) {
            _this4.scrollHeaderBox = el;
          }
        }, /*#__PURE__*/React__default['default'].createElement("table", {
          className: tableHeaderClassName,
          style: this.props.tableStyle
        }, colGroup, this.props.header, this.props.frozenBody))), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-scrollable-body",
          ref: function ref(el) {
            _this4.scrollBody = el;
          },
          style: scrollableBodyStyle,
          onScroll: this.onBodyScroll
        }, /*#__PURE__*/React__default['default'].createElement("table", {
          ref: function ref(el) {
            return _this4.scrollTable = el;
          },
          style: tableBodyStyle,
          className: tableBodyClassName
        }, colGroup, this.props.body), loadingTable, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-virtual-scroller",
          ref: function ref(el) {
            _this4.virtualScroller = el;
          }
        })), /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-scrollable-footer",
          ref: function ref(el) {
            _this4.scrollFooter = el;
          }
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-scrollable-footer-box",
          ref: function ref(el) {
            _this4.scrollFooterBox = el;
          }
        }, /*#__PURE__*/React__default['default'].createElement("table", {
          className: tableFooterClassName,
          style: this.props.tableStyle
        }, colGroup, this.props.footer))));
      }
    }]);

    return ScrollableView;
  }(React.Component);

  _defineProperty(ScrollableView, "defaultProps", {
    header: null,
    body: null,
    footer: null,
    columns: null,
    frozen: null,
    frozenWidth: null,
    frozenBody: null,
    virtualScroll: false,
    virtualRowHeight: null,
    rows: null,
    totalRecords: null,
    loading: false,
    tableStyle: null,
    tableClassName: null,
    onVirtualScroll: null
  });

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
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

  function _createSuper$b(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$b(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$b() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var RowRadioButton = /*#__PURE__*/function (_Component) {
    _inherits(RowRadioButton, _Component);

    var _super = _createSuper$b(RowRadioButton);

    function RowRadioButton(props) {
      var _this;

      _classCallCheck(this, RowRadioButton);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(RowRadioButton, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            data: this.props.rowData
          });
        }

        this.input.focus();
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.setState({
          focused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        this.setState({
          focused: false
        });
      }
    }, {
      key: "onChange",
      value: function onChange(event) {
        this.onClick(event);
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (event.code === 'Space') {
          this.onClick(event);
          event.preventDefault();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var className = core.classNames('p-radiobutton-box p-component p-clickable', {
          'p-highlight': this.props.selected,
          'p-focus': this.state.focused
        });
        var name = "".concat(this.props.tableId ? this.props.tableId + '_' : '', "dt_radio");
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-radiobutton p-component"
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default['default'].createElement("input", {
          name: name,
          ref: function ref(el) {
            return _this2.input = el;
          },
          type: "radio",
          checked: this.props.selected,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown
        })), /*#__PURE__*/React__default['default'].createElement("div", {
          className: className,
          onClick: this.onClick,
          role: "radio",
          "aria-checked": this.props.selected
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-radiobutton-icon p-clickable"
        })));
      }
    }]);

    return RowRadioButton;
  }(React.Component);

  _defineProperty(RowRadioButton, "defaultProps", {
    rowData: null,
    onClick: null,
    selected: false
  });

  function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var RowCheckbox = /*#__PURE__*/function (_Component) {
    _inherits(RowCheckbox, _Component);

    var _super = _createSuper$a(RowCheckbox);

    function RowCheckbox(props) {
      var _this;

      _classCallCheck(this, RowCheckbox);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(RowCheckbox, [{
      key: "onClick",
      value: function onClick(event) {
        if (!this.props.disabled) {
          this.setState({
            focused: true
          });

          if (this.props.onClick) {
            this.props.onClick({
              originalEvent: event,
              data: this.props.rowData,
              checked: this.props.selected
            });
          }
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.setState({
          focused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        this.setState({
          focused: false
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (event.code === 'Space') {
          this.onClick(event);
          event.preventDefault();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-checkbox-box p-component p-clickable', {
          'p-highlight': this.props.selected,
          'p-disabled': this.props.disabled,
          'p-focus': this.state.focused
        });
        var iconClassName = core.classNames('p-checkbox-icon p-clickable', {
          'pi pi-check': this.props.selected
        });
        var tabIndex = this.props.disabled ? null : '0';
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-checkbox p-component",
          onClick: this.onClick
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: className,
          role: "checkbox",
          "aria-checked": this.props.selected,
          tabIndex: tabIndex,
          onKeyDown: this.onKeyDown,
          onFocus: this.onFocus,
          onBlur: this.onBlur
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        })));
      }
    }]);

    return RowCheckbox;
  }(React.Component);

  _defineProperty(RowCheckbox, "defaultProps", {
    rowData: null,
    onClick: null,
    disabled: false
  });

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var BodyCell = /*#__PURE__*/function (_Component) {
    _inherits(BodyCell, _Component);

    var _super = _createSuper$9(BodyCell);

    function BodyCell(props) {
      var _this;

      _classCallCheck(this, BodyCell);

      _this = _super.call(this, props);
      _this.state = {
        editing: _this.props.editing
      };
      _this.onExpanderClick = _this.onExpanderClick.bind(_assertThisInitialized(_this));
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
      _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
      _this.onEditorFocus = _this.onEditorFocus.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(BodyCell, [{
      key: "onExpanderClick",
      value: function onExpanderClick(event) {
        if (this.props.onRowToggle) {
          this.props.onRowToggle({
            originalEvent: event,
            data: this.props.rowData
          });
        }

        event.preventDefault();
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (this.props.editMode !== 'row') {
          if (event.which === 13 || event.which === 9) {
            // tab || enter
            this.switchCellToViewMode(event, true);
          }

          if (event.which === 27) {
            // escape
            this.switchCellToViewMode(event, false);
          }
        }

        if (this.props.allowCellSelection) {
          var cell = event.currentTarget;

          switch (event.which) {
            //left arrow
            case 37:
              var prevCell = this.findPrevSelectableCell(cell);

              if (prevCell) {
                this.changeTabIndex(cell, prevCell);
                prevCell.focus();
              }

              event.preventDefault();
              break;
            //right arrow

            case 39:
              var nextCell = this.findNextSelectableCell(cell);

              if (nextCell) {
                this.changeTabIndex(cell, nextCell);
                nextCell.focus();
              }

              event.preventDefault();
              break;
            //up arrow

            case 38:
              var prevRow = this.findPrevSelectableRow(cell.parentElement);

              if (prevRow) {
                var upCell = prevRow.children[this.props.index];
                this.changeTabIndex(cell, upCell);
                upCell.focus();
              }

              event.preventDefault();
              break;
            //down arrow

            case 40:
              var nextRow = this.findNextSelectableRow(cell.parentElement);

              if (nextRow) {
                var downCell = nextRow.children[this.props.index];
                this.changeTabIndex(cell, downCell);
                downCell.focus();
              }

              event.preventDefault();
              break;
            //enter or space

            case 13: // @deprecated

            case 32:
              this.onClick(event);
              event.preventDefault();
              break;
          }
        }
      }
    }, {
      key: "onClick",
      value: function onClick(event) {
        var _this2 = this;

        if (this.props.editMode !== 'row' && this.props.editor && !this.state.editing && (this.props.selectOnEdit || !this.props.selectOnEdit && this.props.selected)) {
          this.selfClick = true;

          if (this.props.onBeforeEditorShow) {
            this.props.onBeforeEditorShow({
              originalEvent: event,
              columnProps: this.props
            });
          }

          this.setState({
            editing: true
          }, function () {
            if (_this2.props.onEditorInit) {
              _this2.props.onEditorInit({
                originalEvent: event,
                columnProps: _this2.props
              });
            }

            if (_this2.props.editorValidatorEvent === 'click') {
              _this2.bindDocumentEditListener();

              _this2.overlayEventListener = function (e) {
                if (!_this2.isOutsideClicked(e.target)) {
                  _this2.selfClick = true;
                }
              };

              core.OverlayService.on('overlay-click', _this2.overlayEventListener);
            }

            if (_this2.props.onEditingCellChange) {
              _this2.props.onEditingCellChange({
                rowIndex: _this2.props.rowIndex,
                cellIndex: _this2.props.index,
                editing: true
              });
            }
          });
        }

        if (this.props.allowCellSelection && this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            value: core.ObjectUtils.resolveFieldData(this.props.rowData, this.props.field),
            field: this.props.field,
            rowData: this.props.rowData,
            rowIndex: this.props.rowIndex,
            cellIndex: this.props.index,
            selected: this.isSelected()
          });
        }
      }
    }, {
      key: "onBlur",
      value: function onBlur(event) {
        this.selfClick = false;

        if (this.props.editMode !== 'row' && this.state.editing && this.props.editorValidatorEvent === 'blur') {
          this.switchCellToViewMode(event, true);
        }
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(event) {
        if (this.props.onMouseDown) {
          this.props.onMouseDown({
            originalEvent: event,
            value: core.ObjectUtils.resolveFieldData(this.props.rowData, this.props.field),
            field: this.props.field,
            rowData: this.props.rowData,
            rowIndex: this.props.rowIndex,
            cellIndex: this.props.index,
            selected: this.isSelected()
          });
        }
      }
    }, {
      key: "onMouseUp",
      value: function onMouseUp(event) {
        if (this.props.onMouseUp) {
          this.props.onMouseUp({
            originalEvent: event,
            value: core.ObjectUtils.resolveFieldData(this.props.rowData, this.props.field),
            field: this.props.field,
            rowData: this.props.rowData,
            rowIndex: this.props.rowIndex,
            cellIndex: this.props.index,
            selected: this.isSelected()
          });
        }
      }
    }, {
      key: "onEditorFocus",
      value: function onEditorFocus(event) {
        this.onClick(event);
      }
    }, {
      key: "bindDocumentEditListener",
      value: function bindDocumentEditListener() {
        var _this3 = this;

        if (!this.documentEditListener) {
          this.documentEditListener = function (e) {
            if (!_this3.selfClick && _this3.isOutsideClicked(e.target)) {
              _this3.switchCellToViewMode(e, true);
            }

            _this3.selfClick = false;
          };

          document.addEventListener('click', this.documentEditListener);
        }
      }
    }, {
      key: "isOutsideClicked",
      value: function isOutsideClicked(target) {
        return this.container && !(this.container.isSameNode(target) || this.container.contains(target));
      }
    }, {
      key: "closeCell",
      value: function closeCell(event) {
        var _this4 = this;

        if (this.props.onBeforeEditorHide) {
          this.props.onBeforeEditorHide({
            originalEvent: event,
            columnProps: this.props
          });
        }
        /* When using the 'tab' key, the focus event of the next cell is not called in IE. */


        setTimeout(function () {
          _this4.setState({
            editing: false
          }, function () {
            _this4.unbindDocumentEditListener();

            core.OverlayService.off('overlay-click', _this4.overlayEventListener);
            _this4.overlayEventListener = null;

            if (_this4.props.onEditingCellChange) {
              _this4.props.onEditingCellChange({
                rowIndex: _this4.props.rowIndex,
                cellIndex: _this4.props.index,
                editing: false
              });
            }
          });
        }, 1);
      }
    }, {
      key: "switchCellToViewMode",
      value: function switchCellToViewMode(event, submit) {
        var params = {
          originalEvent: event,
          columnProps: this.props
        };

        if (!submit && this.props.onEditorCancel) {
          this.props.onEditorCancel(params);
        }

        var valid = true;

        if (this.props.editorValidator) {
          valid = this.props.editorValidator(params);
        }

        if (valid) {
          if (submit && this.props.onEditorSubmit) {
            this.props.onEditorSubmit(params);
          }

          this.closeCell(event);
        }
      }
    }, {
      key: "findNextSelectableCell",
      value: function findNextSelectableCell(cell) {
        var nextCell = cell.nextElementSibling;

        if (nextCell) {
          return core.DomHandler.hasClass(nextCell, 'p-selectable-cell') ? nextCell : this.findNextSelectableRow(nextCell);
        }

        return null;
      }
    }, {
      key: "findPrevSelectableCell",
      value: function findPrevSelectableCell(cell) {
        var prevCell = cell.previousElementSibling;

        if (prevCell) {
          return core.DomHandler.hasClass(prevCell, 'p-selectable-cell') ? prevCell : this.findPrevSelectableRow(prevCell);
        }

        return null;
      }
    }, {
      key: "findNextSelectableRow",
      value: function findNextSelectableRow(row) {
        var nextRow = row.nextElementSibling;

        if (nextRow) {
          return core.DomHandler.hasClass(nextRow, 'p-selectable-row') ? nextRow : this.findNextSelectableRow(nextRow);
        }

        return null;
      }
    }, {
      key: "findPrevSelectableRow",
      value: function findPrevSelectableRow(row) {
        var prevRow = row.previousElementSibling;

        if (prevRow) {
          return core.DomHandler.hasClass(prevRow, 'p-selectable-row') ? prevRow : this.findPrevSelectableRow(prevRow);
        }

        return null;
      }
    }, {
      key: "changeTabIndex",
      value: function changeTabIndex(currentCell, nextCell) {
        if (currentCell && nextCell) {
          currentCell.tabIndex = -1;
          nextCell.tabIndex = 0;
        }
      }
    }, {
      key: "getTabIndex",
      value: function getTabIndex(cellSelected) {
        return this.props.allowCellSelection ? cellSelected ? 0 : this.props.rowIndex === 0 && this.props.index === 0 ? 0 : -1 : null;
      }
    }, {
      key: "isSelected",
      value: function isSelected() {
        if (this.props.selection) {
          return this.props.selection instanceof Array ? this.findIndexInSelection() > -1 : this.equals(this.props.selection);
        }

        return false;
      }
    }, {
      key: "equals",
      value: function equals(selectedCell) {
        return (selectedCell.rowIndex === this.props.rowIndex || selectedCell.rowData === this.props.rowData) && (selectedCell.field === this.props.field || selectedCell.cellIndex === this.props.index);
      }
    }, {
      key: "findIndexInSelection",
      value: function findIndexInSelection() {
        var _this5 = this;

        return this.props.selection ? this.props.selection.findIndex(function (d) {
          return _this5.equals(d);
        }) : -1;
      }
    }, {
      key: "unbindDocumentEditListener",
      value: function unbindDocumentEditListener() {
        if (this.documentEditListener) {
          document.removeEventListener('click', this.documentEditListener);
          this.documentEditListener = null;
          this.selfClick = false;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var _this6 = this;

        if (this.props.editMode !== 'row' && this.container && this.props.editor) {
          clearTimeout(this.tabindexTimeout);
          this.tabindexTimeout = setTimeout(function () {
            if (_this6.state.editing) {
              var focusable = core.DomHandler.findSingle(_this6.container, 'input');

              if (focusable && document.activeElement !== focusable && !focusable.hasAttribute('data-isCellEditing')) {
                focusable.setAttribute('data-isCellEditing', true);
                focusable.focus();
              }

              _this6.keyHelper.tabIndex = -1;
            } else if (_this6.keyHelper) {
              _this6.keyHelper.setAttribute('tabindex', 0);
            }
          }, 1);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unbindDocumentEditListener();

        if (this.overlayEventListener) {
          core.OverlayService.off('overlay-click', this.overlayEventListener);
          this.overlayEventListener = null;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this7 = this;

        var content, editorKeyHelper;
        var cellSelected = this.props.allowCellSelection && this.isSelected();
        var cellClassName = null;

        if (this.props.cellClassName) {
          var cellData = core.ObjectUtils.resolveFieldData(this.props.rowData, this.props.field);
          cellClassName = this.props.cellClassName(cellData, _objectSpread$3(_objectSpread$3({}, this.props), {
            rowData: this.props.rowData
          }));
        }

        var className = core.classNames(this.props.bodyClassName || this.props.className, cellClassName, {
          'p-selection-column': this.props.selectionMode,
          'p-selectable-cell': this.props.allowCellSelection,
          'p-highlight': cellSelected,
          'p-editable-column': this.props.editor,
          'p-cell-editing': this.state.editing && this.props.editor
        });
        var tabIndex = this.getTabIndex(cellSelected);

        if (this.props.expander) {
          var iconClassName = core.classNames('p-row-toggler-icon pi pi-fw p-clickable', {
            'pi-chevron-down': this.props.expanded,
            'pi-chevron-right': !this.props.expanded
          });
          var ariaControls = "".concat(this.props.tableId ? this.props.tableId + '_' : '', "content_").concat(this.props.rowIndex, "_expanded");
          var expanderProps = {
            onClick: this.onExpanderClick,
            className: 'p-row-toggler p-link',
            iconClassName: iconClassName
          };
          content = /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            onClick: expanderProps.onClick,
            className: expanderProps.className,
            "aria-expanded": this.props.expanded,
            "aria-controls": ariaControls
          }, /*#__PURE__*/React__default['default'].createElement("span", {
            className: expanderProps.iconClassName
          }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));

          if (this.props.body) {
            expanderProps['element'] = content;
            content = this.props.body(this.props.rowData, _objectSpread$3(_objectSpread$3({}, this.props), {
              expander: expanderProps
            }));
          }
        } else if (this.props.selectionMode) {
          var showSelection = true;

          if (this.props.showSelectionElement) {
            showSelection = this.props.showSelectionElement(this.props.rowData);
          }

          if (showSelection) {
            if (this.props.selectionMode === 'single') content = /*#__PURE__*/React__default['default'].createElement(RowRadioButton, {
              onClick: this.props.onRadioClick,
              rowData: this.props.rowData,
              selected: this.props.selected,
              tableId: this.props.tableId
            });else content = /*#__PURE__*/React__default['default'].createElement(RowCheckbox, {
              onClick: this.props.onCheckboxClick,
              rowData: this.props.rowData,
              selected: this.props.selected
            });
          }
        } else if (this.props.rowReorder) {
          var showReorder = true;

          if (this.props.showRowReorderElement) {
            showReorder = this.props.showRowReorderElement(this.props.rowData);
          }

          if (showReorder) {
            var reorderIcon = core.classNames('p-datatable-reorderablerow-handle', this.props.rowReorderIcon);
            content = /*#__PURE__*/React__default['default'].createElement("i", {
              className: reorderIcon
            });
          }
        } else if (this.props.rowEditor) {
          var rowEditorProps = {};

          if (this.state.editing) {
            rowEditorProps = {
              editing: true,
              onSaveClick: this.props.onRowEditSave,
              saveClassName: 'p-row-editor-save p-link',
              saveIconClassName: 'p-row-editor-save-icon pi pi-fw pi-check p-clickable',
              onCancelClick: this.props.onRowEditCancel,
              cancelClassName: 'p-row-editor-cancel p-link',
              cancelIconClassName: 'p-row-editor-cancel-icon pi pi-fw pi-times p-clickable'
            };
            content = /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("button", {
              type: "button",
              onClick: rowEditorProps.onSaveClick,
              className: rowEditorProps.saveClassName
            }, /*#__PURE__*/React__default['default'].createElement("span", {
              className: rowEditorProps.saveIconClassName
            }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null)), /*#__PURE__*/React__default['default'].createElement("button", {
              type: "button",
              onClick: rowEditorProps.onCancelClick,
              className: rowEditorProps.cancelClassName
            }, /*#__PURE__*/React__default['default'].createElement("span", {
              className: rowEditorProps.cancelIconClassName
            }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null)));
          } else {
            rowEditorProps = {
              editing: false,
              onInitClick: this.props.onRowEditInit,
              initClassName: 'p-row-editor-init p-link',
              initIconClassName: 'p-row-editor-init-icon pi pi-fw pi-pencil p-clickable'
            };
            content = /*#__PURE__*/React__default['default'].createElement("button", {
              type: "button",
              onClick: rowEditorProps.onInitClick,
              className: rowEditorProps.initClassName
            }, /*#__PURE__*/React__default['default'].createElement("span", {
              className: rowEditorProps.initIconClassName
            }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
          }

          if (this.props.body) {
            rowEditorProps['element'] = content;
            content = this.props.body(this.props.rowData, _objectSpread$3(_objectSpread$3({}, this.props), {
              rowEditor: rowEditorProps
            }));
          }
        } else {
          if (this.state.editing && this.props.editor) {
            content = this.props.editor(this.props);
          } else {
            if (this.props.body) content = this.props.body(this.props.rowData, this.props);else content = core.ObjectUtils.resolveFieldData(this.props.rowData, this.props.field);
          }
        }

        if (this.props.editMode !== 'row') {
          /* eslint-disable */
          editorKeyHelper = this.props.editor && /*#__PURE__*/React__default['default'].createElement("a", {
            tabIndex: "0",
            ref: function ref(el) {
              _this7.keyHelper = el;
            },
            className: "p-cell-editor-key-helper p-hidden-accessible",
            onFocus: this.onEditorFocus
          }, /*#__PURE__*/React__default['default'].createElement("span", null));
          /* eslint-enable */
        }

        return /*#__PURE__*/React__default['default'].createElement("td", {
          ref: function ref(el) {
            _this7.container = el;
          },
          role: "cell",
          tabIndex: tabIndex,
          className: className,
          style: this.props.bodyStyle || this.props.style,
          onClick: this.onClick,
          onKeyDown: this.onKeyDown,
          rowSpan: this.props.rowSpan,
          onBlur: this.onBlur,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp
        }, editorKeyHelper, content);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.editMode === 'row' && nextProps.editing !== prevState.editing) {
          return {
            editing: nextProps.editing
          };
        }

        return null;
      }
    }]);

    return BodyCell;
  }(React.Component);

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var BodyRow = /*#__PURE__*/function (_Component) {
    _inherits(BodyRow, _Component);

    var _super = _createSuper$8(BodyRow);

    function BodyRow(props) {
      var _this;

      _classCallCheck(this, BodyRow);

      _this = _super.call(this, props);

      if (!_this.props.isRowEditingControlled) {
        _this.state = {
          editing: false
        };
      }

      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onDoubleClick = _this.onDoubleClick.bind(_assertThisInitialized(_this));
      _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
      _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
      _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
      _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
      _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
      _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
      _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
      _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      _this.onRowEditInit = _this.onRowEditInit.bind(_assertThisInitialized(_this));
      _this.onRowEditSave = _this.onRowEditSave.bind(_assertThisInitialized(_this));
      _this.onRowEditCancel = _this.onRowEditCancel.bind(_assertThisInitialized(_this));
      _this.updateEditingState = _this.updateEditingState.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(BodyRow, [{
      key: "getEditing",
      value: function getEditing() {
        return this.props.isRowEditingControlled ? this.props.editing : this.state.editing;
      }
    }, {
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }
      }
    }, {
      key: "onDoubleClick",
      value: function onDoubleClick(event) {
        if (this.props.onDoubleClick) {
          this.props.onDoubleClick({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }
      }
    }, {
      key: "onTouchEnd",
      value: function onTouchEnd(event) {
        if (this.props.onTouchEnd) {
          this.props.onTouchEnd(event);
        }
      }
    }, {
      key: "onRightClick",
      value: function onRightClick(event) {
        if (this.props.onRightClick) {
          this.props.onRightClick({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(event) {
        if (core.DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle')) event.currentTarget.draggable = true;else event.currentTarget.draggable = false;

        if (this.props.onMouseDown) {
          this.props.onMouseDown({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }
      }
    }, {
      key: "onMouseUp",
      value: function onMouseUp(event) {
        if (this.props.onMouseUp) {
          this.props.onMouseUp({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd(event) {
        if (this.props.onDragEnd) {
          this.props.onDragEnd(event);
        }

        event.currentTarget.draggable = false;
      }
    }, {
      key: "onDragOver",
      value: function onDragOver(event) {
        if (this.props.onDragOver) {
          this.props.onDragOver({
            originalEvent: event,
            rowElement: this.container
          });
        }

        event.preventDefault();
      }
    }, {
      key: "onDragLeave",
      value: function onDragLeave(event) {
        if (this.props.onDragLeave) {
          this.props.onDragLeave({
            originalEvent: event,
            rowElement: this.container
          });
        }
      }
    }, {
      key: "onDrop",
      value: function onDrop(event) {
        if (this.props.onDrop) {
          this.props.onDrop({
            originalEvent: event,
            rowElement: this.container
          });
        }

        event.preventDefault();
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (this.isFocusable() && !this.props.allowCellSelection) {
          var target = event.target,
              row = event.currentTarget;

          switch (event.which) {
            //down arrow
            case 40:
              var nextRow = this.findNextSelectableRow(row);

              if (nextRow) {
                this.changeTabIndex(row, nextRow);
                nextRow.focus();
              }

              event.preventDefault();
              break;
            //up arrow

            case 38:
              var prevRow = this.findPrevSelectableRow(row);

              if (prevRow) {
                this.changeTabIndex(row, prevRow);
                prevRow.focus();
              }

              event.preventDefault();
              break;
            //enter

            case 13:
              // @deprecated
              this.onClick(event);
              event.preventDefault();
              break;
            //space

            case 32:
              if (target.nodeName !== 'INPUT' && target.nodeName !== 'TEXTAREA' && !target.readOnly) {
                this.onClick(event);
                event.preventDefault();
              }

              break;
          }
        }
      }
    }, {
      key: "changeTabIndex",
      value: function changeTabIndex(currentRow, nextRow) {
        if (currentRow && nextRow) {
          currentRow.tabIndex = -1;
          nextRow.tabIndex = 0;
        }
      }
    }, {
      key: "findNextSelectableRow",
      value: function findNextSelectableRow(row) {
        var nextRow = row.nextElementSibling;

        if (nextRow) {
          if (core.DomHandler.hasClass(nextRow, 'p-selectable-row')) return nextRow;else return this.findNextSelectableRow(nextRow);
        } else {
          return null;
        }
      }
    }, {
      key: "findPrevSelectableRow",
      value: function findPrevSelectableRow(row) {
        var prevRow = row.previousElementSibling;

        if (prevRow) {
          if (core.DomHandler.hasClass(prevRow, 'p-selectable-row')) return prevRow;else return this.findPrevSelectableRow(prevRow);
        } else {
          return null;
        }
      }
    }, {
      key: "updateEditingState",
      value: function updateEditingState(event, editing) {
        if (this.props.isRowEditingControlled) {
          this.props.onRowEditingToggle({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        } else {
          this.setState({
            editing: editing
          });
        }
      }
    }, {
      key: "onRowEditInit",
      value: function onRowEditInit(event) {
        if (this.props.onRowEditInit) {
          this.props.onRowEditInit({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }

        this.updateEditingState(event, true);
        event.preventDefault();
      }
    }, {
      key: "onRowEditSave",
      value: function onRowEditSave(event) {
        var valid = true;

        if (this.props.rowEditorValidator) {
          valid = this.props.rowEditorValidator(this.props.rowData);
        }

        if (this.props.onRowEditSave) {
          this.props.onRowEditSave({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex,
            valid: valid
          });
        }

        if (valid) {
          this.updateEditingState(event, false);
        }

        event.preventDefault();
      }
    }, {
      key: "onRowEditCancel",
      value: function onRowEditCancel(event) {
        if (this.props.onRowEditCancel) {
          this.props.onRowEditCancel({
            originalEvent: event,
            data: this.props.rowData,
            index: this.props.rowIndex
          });
        }

        this.updateEditingState(event, false);
        event.preventDefault();
      }
    }, {
      key: "isFocusable",
      value: function isFocusable() {
        return this.props.selectionMode && this.props.selectionModeInColumn !== 'single' && this.props.selectionModeInColumn !== 'multiple';
      }
    }, {
      key: "getTabIndex",
      value: function getTabIndex() {
        return this.isFocusable() && !this.props.allowCellSelection ? this.props.rowIndex === 0 ? 0 : -1 : null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var columns = React__default['default'].Children.toArray(this.props.children);
        var conditionalClassNames = {
          'p-highlight': !this.props.allowCellSelection && this.props.selected,
          'p-highlight-contextmenu': this.props.contextMenuSelected,
          'p-selectable-row': this.props.allowRowSelection,
          'p-row-odd': this.props.rowIndex % 2 !== 0
        };

        if (this.props.rowClassName) {
          var rowClassNameCondition = this.props.rowClassName(this.props.rowData);
          conditionalClassNames = _objectSpread$2(_objectSpread$2({}, conditionalClassNames), rowClassNameCondition);
        }

        var className = core.classNames(conditionalClassNames);
        var style = this.props.virtualScroll ? {
          height: this.props.virtualRowHeight
        } : {};
        var hasRowSpanGrouping = this.props.rowGroupMode === 'rowspan';
        var tabIndex = this.getTabIndex();
        var cells = [];

        for (var i = 0; i < columns.length; i++) {
          var column = columns[i];
          var rowSpan = void 0;

          if (hasRowSpanGrouping) {
            if (this.props.sortField === column.props.field) {
              if (this.props.groupRowSpan) {
                rowSpan = this.props.groupRowSpan;
                className += ' p-datatable-rowspan-group';
              } else {
                continue;
              }
            }
          }

          var editing = this.getEditing();
          var cell = /*#__PURE__*/React__default['default'].createElement(BodyCell, _extends({
            tableId: this.props.tableId,
            key: i
          }, column.props, {
            value: this.props.value,
            rowSpan: rowSpan,
            rowData: this.props.rowData,
            index: i,
            rowIndex: this.props.rowIndex,
            onRowToggle: this.props.onRowToggle,
            expanded: this.props.expanded,
            onRadioClick: this.props.onRadioClick,
            onCheckboxClick: this.props.onCheckboxClick,
            selected: this.props.selected,
            selection: this.props.selection,
            selectOnEdit: this.props.selectOnEdit,
            editMode: this.props.editMode,
            editing: editing,
            onRowEditInit: this.onRowEditInit,
            onRowEditSave: this.onRowEditSave,
            onRowEditCancel: this.onRowEditCancel,
            onMouseDown: this.props.onCellMouseDown,
            onMouseUp: this.props.onCellMouseUp,
            showRowReorderElement: this.props.showRowReorderElement,
            showSelectionElement: this.props.showSelectionElement,
            allowCellSelection: this.props.allowCellSelection,
            onClick: this.props.onCellClick,
            onEditingCellChange: this.props.onEditingCellChange,
            cellClassName: this.props.cellClassName
          }));
          cells.push(cell);
        }

        return /*#__PURE__*/React__default['default'].createElement("tr", {
          role: "row",
          tabIndex: tabIndex,
          ref: function ref(el) {
            _this2.container = el;
          },
          className: className,
          onClick: this.onClick,
          onDoubleClick: this.onDoubleClick,
          onTouchEnd: this.onTouchEnd,
          onContextMenu: this.onRightClick,
          onMouseDown: this.onMouseDown,
          onMouseUp: this.onMouseUp,
          onDragStart: this.props.onDragStart,
          onDragEnd: this.onDragEnd,
          onDragOver: this.onDragOver,
          onDragLeave: this.onDragLeave,
          onDrop: this.onDrop,
          style: style,
          onKeyDown: this.onKeyDown
        }, cells);
      }
    }]);

    return BodyRow;
  }(React.Component);

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var RowTogglerButton = /*#__PURE__*/function (_Component) {
    _inherits(RowTogglerButton, _Component);

    var _super = _createSuper$7(RowTogglerButton);

    function RowTogglerButton(props) {
      var _this;

      _classCallCheck(this, RowTogglerButton);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(RowTogglerButton, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            data: this.props.rowData
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var iconClassName = core.classNames('p-row-toggler-icon pi pi-fw p-clickable', {
          'pi-chevron-down': this.props.expanded,
          'pi-chevron-right': !this.props.expanded
        });
        return /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          onClick: this.onClick,
          className: "p-row-toggler p-link"
        }, /*#__PURE__*/React__default['default'].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null));
      }
    }]);

    return RowTogglerButton;
  }(React.Component);

  _defineProperty(RowTogglerButton, "defaultProps", {
    rowData: null,
    onClick: null,
    expanded: false
  });

  var _excluded = ["originalEvent"];

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var TableBody = /*#__PURE__*/function (_Component) {
    _inherits(TableBody, _Component);

    var _super = _createSuper$6(TableBody);

    function TableBody(props) {
      var _this;

      _classCallCheck(this, TableBody);

      _this = _super.call(this, props);
      _this.onRowClick = _this.onRowClick.bind(_assertThisInitialized(_this));
      _this.onRowRightClick = _this.onRowRightClick.bind(_assertThisInitialized(_this));
      _this.onRowTouchEnd = _this.onRowTouchEnd.bind(_assertThisInitialized(_this));
      _this.onRowToggle = _this.onRowToggle.bind(_assertThisInitialized(_this));
      _this.onRowEditingToggle = _this.onRowEditingToggle.bind(_assertThisInitialized(_this));
      _this.onRadioClick = _this.onRadioClick.bind(_assertThisInitialized(_this));
      _this.onCheckboxClick = _this.onCheckboxClick.bind(_assertThisInitialized(_this));
      _this.onDragSelectionMouseMove = _this.onDragSelectionMouseMove.bind(_assertThisInitialized(_this));
      _this.onDragSelectionMouseUp = _this.onDragSelectionMouseUp.bind(_assertThisInitialized(_this));
      _this.onRowDragEnd = _this.onRowDragEnd.bind(_assertThisInitialized(_this));
      _this.onRowDragLeave = _this.onRowDragLeave.bind(_assertThisInitialized(_this));
      _this.onRowDrop = _this.onRowDrop.bind(_assertThisInitialized(_this));
      _this.onRowMouseDown = _this.onRowMouseDown.bind(_assertThisInitialized(_this));
      _this.onRowMouseUp = _this.onRowMouseUp.bind(_assertThisInitialized(_this));
      _this.onCellClick = _this.onCellClick.bind(_assertThisInitialized(_this));
      _this.onCellMouseDown = _this.onCellMouseDown.bind(_assertThisInitialized(_this));
      _this.onCellMouseUp = _this.onCellMouseUp.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(TableBody, [{
      key: "onRowClick",
      value: function onRowClick(event) {
        if (this.allowCellSelection() || !this.allowSelection(event)) {
          return;
        }

        this.props.onRowClick && this.props.onRowClick(event);

        if (this.allowRowSelection()) {
          if (this.allowRangeSelection(event)) {
            this.onRangeSelection(event);
          } else {
            var toggleable = this.isRadioSelectionModeInColumn() || this.isCheckboxSelectionModeInColumn() || this.allowMetaKeySelection(event);
            this.anchorRowIndex = event.index;
            this.rangeRowIndex = event.index;
            this.anchorRowFirst = this.props.first;

            if (this.isSingleSelection()) {
              this.onSingleSelection(_objectSpread$1(_objectSpread$1({}, event), {}, {
                toggleable: toggleable,
                type: 'row'
              }));
            } else {
              this.onMultipleSelection(_objectSpread$1(_objectSpread$1({}, event), {}, {
                toggleable: toggleable,
                type: 'row'
              }));
            }
          }
        } else {
          this.focusOnElement(event.originalEvent);
        }

        this.rowTouched = false;
      }
    }, {
      key: "onCellClick",
      value: function onCellClick(event) {
        if (!this.allowSelection(event)) {
          return;
        }

        this.props.onCellClick && this.props.onCellClick(event);

        if (this.allowCellSelection()) {
          if (this.allowRangeSelection(event)) {
            this.onRangeSelection(event);
          } else {
            var toggleable = this.allowMetaKeySelection(event);

            var originalEvent = event.originalEvent,
                data = _objectWithoutProperties(event, _excluded);

            this.anchorRowIndex = event.rowIndex;
            this.rangeRowIndex = event.rowIndex;
            this.anchorRowFirst = this.props.first;
            this.anchorCellIndex = event.cellIndex;

            if (this.isSingleSelection()) {
              this.onSingleSelection({
                originalEvent: originalEvent,
                data: data,
                toggleable: toggleable,
                type: 'cell'
              });
            } else {
              this.onMultipleSelection({
                originalEvent: originalEvent,
                data: data,
                toggleable: toggleable,
                type: 'cell'
              });
            }
          }
        }

        this.rowTouched = false;
      }
    }, {
      key: "onSingleSelection",
      value: function onSingleSelection(_ref) {
        var originalEvent = _ref.originalEvent,
            data = _ref.data,
            toggleable = _ref.toggleable,
            type = _ref.type;
        var selected = this.isSelected(data);
        var selection = this.props.selection;

        if (selected) {
          if (toggleable) {
            selection = null;
            this.onUnselect({
              originalEvent: originalEvent,
              data: data,
              type: type
            });
          }
        } else {
          selection = data;
          this.onSelect({
            originalEvent: originalEvent,
            data: data,
            type: type
          });
        }

        this.focusOnElement(originalEvent, true);

        if (this.props.onSelectionChange && selection !== this.props.selection) {
          this.props.onSelectionChange({
            originalEvent: originalEvent,
            value: selection
          });
        }
      }
    }, {
      key: "onMultipleSelection",
      value: function onMultipleSelection(_ref2) {
        var _this2 = this;

        var originalEvent = _ref2.originalEvent,
            data = _ref2.data,
            toggleable = _ref2.toggleable,
            type = _ref2.type;
        var selected = this.isSelected(data);
        var selection = this.props.selection || [];

        if (selected) {
          if (toggleable) {
            var selectionIndex = this.findIndexInSelection(data);
            selection = this.props.selection.filter(function (val, i) {
              return i !== selectionIndex;
            });
            this.onUnselect({
              originalEvent: originalEvent,
              data: data,
              type: type
            });
          } else if (selection.length) {
            this.props.selection.forEach(function (d) {
              return _this2.onUnselect({
                originalEvent: originalEvent,
                data: d,
                type: type
              });
            });
            selection = [data];
            this.onSelect({
              originalEvent: originalEvent,
              data: data,
              type: type
            });
          }
        } else {
          selection = toggleable && this.isMultipleSelection() ? [].concat(_toConsumableArray(selection), [data]) : [data];
          this.onSelect({
            originalEvent: originalEvent,
            data: data,
            type: type
          });
        }

        this.focusOnElement(originalEvent, true);

        if (this.props.onSelectionChange && selection !== this.props.selection) {
          this.props.onSelectionChange({
            originalEvent: originalEvent,
            value: selection
          });
        }
      }
    }, {
      key: "onRangeSelection",
      value: function onRangeSelection(event) {
        core.DomHandler.clearSelection();
        this.rangeRowIndex = this.allowCellSelection() ? event.rowIndex : event.index;
        var selectionInRange = this.selectRange(event);
        var selection = this.isMultipleSelection() ? _toConsumableArray(new Set([].concat(_toConsumableArray(this.props.selection || []), _toConsumableArray(selectionInRange)))) : selectionInRange;

        if (this.props.onSelectionChange && selection !== this.props.selection) {
          this.props.onSelectionChange({
            originalEvent: event.originalEvent,
            value: selection
          });
        }

        this.anchorRowIndex = this.rangeRowIndex;
        this.anchorCellIndex = event.cellIndex;
        this.focusOnElement(event.originalEvent, false);
      }
    }, {
      key: "selectRange",
      value: function selectRange(event) {
        var rangeStart, rangeEnd;
        var isLazyAndPaginator = this.props.lazy && this.props.paginator;

        if (isLazyAndPaginator) {
          this.anchorRowIndex += this.anchorRowFirst;
          this.rangeRowIndex += this.props.first;
        }

        if (this.rangeRowIndex > this.anchorRowIndex) {
          rangeStart = this.anchorRowIndex;
          rangeEnd = this.rangeRowIndex;
        } else if (this.rangeRowIndex < this.anchorRowIndex) {
          rangeStart = this.rangeRowIndex;
          rangeEnd = this.anchorRowIndex;
        } else {
          rangeStart = rangeEnd = this.rangeRowIndex;
        }

        if (isLazyAndPaginator) {
          rangeStart = Math.max(rangeStart - this.props.first, 0);
          rangeEnd -= this.props.first;
        }

        return this.allowCellSelection() ? this.selectRangeOnCell(event, rangeStart, rangeEnd) : this.selectRangeOnRow(event, rangeStart, rangeEnd);
      }
    }, {
      key: "selectRangeOnRow",
      value: function selectRangeOnRow(event, rowRangeStart, rowRangeEnd) {
        var value = this.props.value;
        var selection = [];

        for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
          var rangeRowData = value[i];
          selection.push(rangeRowData);
          this.onSelect({
            originalEvent: event.originalEvent,
            data: rangeRowData,
            type: 'row'
          });
        }

        return selection;
      }
    }, {
      key: "selectRangeOnCell",
      value: function selectRangeOnCell(event, rowRangeStart, rowRangeEnd) {
        var cellRangeStart,
            cellRangeEnd,
            cellIndex = event.cellIndex;

        if (cellIndex > this.anchorCellIndex) {
          cellRangeStart = this.anchorCellIndex;
          cellRangeEnd = cellIndex;
        } else if (cellIndex < this.anchorCellIndex) {
          cellRangeStart = cellIndex;
          cellRangeEnd = this.anchorCellIndex;
        } else {
          cellRangeStart = cellRangeEnd = cellIndex;
        }

        var value = this.props.value;
        var selection = [];

        for (var i = rowRangeStart; i <= rowRangeEnd; i++) {
          var rowData = value[i];
          var columns = React__default['default'].Children.toArray(this.props.children);

          for (var j = cellRangeStart; j <= cellRangeEnd; j++) {
            var field = columns[j].props.field;
            var rangeRowData = {
              value: core.ObjectUtils.resolveFieldData(rowData, field),
              field: field,
              rowData: rowData,
              rowIndex: i,
              cellIndex: j,
              selected: true
            };
            selection.push(rangeRowData);
            this.onSelect({
              originalEvent: event.originalEvent,
              data: rangeRowData,
              type: 'cell'
            });
          }
        }

        return selection;
      }
    }, {
      key: "onSelect",
      value: function onSelect(event) {
        if (this.allowCellSelection()) this.props.onCellSelect && this.props.onCellSelect(_objectSpread$1(_objectSpread$1({
          originalEvent: event.originalEvent
        }, event.data), {}, {
          type: event.type
        }));else this.props.onRowSelect && this.props.onRowSelect(event);
      }
    }, {
      key: "onUnselect",
      value: function onUnselect(event) {
        if (this.allowCellSelection()) this.props.onCellUnselect && this.props.onCellUnselect(_objectSpread$1(_objectSpread$1({
          originalEvent: event.originalEvent
        }, event.data), {}, {
          type: event.type
        }));else this.props.onRowUnselect && this.props.onRowUnselect(event);
      }
    }, {
      key: "enableDragSelection",
      value: function enableDragSelection(event) {
        if (this.props.dragSelection && !this.dragSelectionHelper) {
          this.dragSelectionHelper = document.createElement('div');
          core.DomHandler.addClass(this.dragSelectionHelper, 'p-datatable-drag-selection-helper');
          this.initialDragPosition = {
            x: event.clientX,
            y: event.clientY
          };
          this.dragSelectionHelper.style.top = "".concat(event.pageY, "px");
          this.dragSelectionHelper.style.left = "".concat(event.pageX, "px");
          this.bindDragSelectionEvents();
        }
      }
    }, {
      key: "bindDragSelectionEvents",
      value: function bindDragSelectionEvents() {
        document.addEventListener('mousemove', this.onDragSelectionMouseMove);
        document.addEventListener('mouseup', this.onDragSelectionMouseUp);
        document.body.appendChild(this.dragSelectionHelper);
      }
    }, {
      key: "unbindDragSelectionEvents",
      value: function unbindDragSelectionEvents() {
        this.onDragSelectionMouseUp();
      }
    }, {
      key: "onDragSelectionMouseMove",
      value: function onDragSelectionMouseMove(event) {
        var _this$initialDragPosi = this.initialDragPosition,
            x = _this$initialDragPosi.x,
            y = _this$initialDragPosi.y;
        var dx = event.clientX - x;
        var dy = event.clientY - y;
        if (dy < 0) this.dragSelectionHelper.style.top = "".concat(event.pageY + 5, "px");
        if (dx < 0) this.dragSelectionHelper.style.left = "".concat(event.pageX + 5, "px");
        this.dragSelectionHelper.style.height = "".concat(Math.abs(dy), "px");
        this.dragSelectionHelper.style.width = "".concat(Math.abs(dx), "px");
        event.preventDefault();
      }
    }, {
      key: "onDragSelectionMouseUp",
      value: function onDragSelectionMouseUp() {
        if (this.dragSelectionHelper) {
          this.dragSelectionHelper.remove();
          this.dragSelectionHelper = null;
        }

        document.removeEventListener('mousemove', this.onDragSelectionMouseMove);
        document.removeEventListener('mouseup', this.onDragSelectionMouseUp);
      }
    }, {
      key: "onRowMouseDown",
      value: function onRowMouseDown(event) {
        core.DomHandler.clearSelection();

        if (this.allowRowDrag(event)) {
          this.enableDragSelection(event.originalEvent);
          this.anchorRowIndex = event.index;
          this.rangeRowIndex = event.index;
          this.anchorRowFirst = this.props.first;
        }
      }
    }, {
      key: "onRowMouseUp",
      value: function onRowMouseUp(event) {
        var isSameRow = event.index === this.anchorRowIndex;

        if (this.allowRowDrag(event) && !isSameRow) {
          this.onRangeSelection(event);
        }
      }
    }, {
      key: "onCellMouseDown",
      value: function onCellMouseDown(event) {
        if (this.allowCellDrag(event)) {
          this.enableDragSelection(event.originalEvent);
          this.anchorRowIndex = event.rowIndex;
          this.rangeRowIndex = event.rowIndex;
          this.anchorRowFirst = this.props.first;
          this.anchorCellIndex = event.cellIndex;
        }
      }
    }, {
      key: "onCellMouseUp",
      value: function onCellMouseUp(event) {
        var isSameCell = event.rowIndex === this.anchorRowIndex && event.cellIndex === this.anchorCellIndex;

        if (this.allowCellDrag(event) && !isSameCell) {
          this.onRangeSelection(event);
        }
      }
    }, {
      key: "onRowTouchEnd",
      value: function onRowTouchEnd(event) {
        this.rowTouched = true;
      }
    }, {
      key: "onRowRightClick",
      value: function onRowRightClick(event) {
        if (this.props.onContextMenu) {
          core.DomHandler.clearSelection();

          if (this.props.onContextMenuSelectionChange) {
            this.props.onContextMenuSelectionChange({
              originalEvent: event.originalEvent,
              value: event.data
            });
          }

          if (this.props.onContextMenu) {
            this.props.onContextMenu({
              originalEvent: event.originalEvent,
              data: event.data
            });
          }

          event.originalEvent.preventDefault();
        }
      }
    }, {
      key: "onRadioClick",
      value: function onRadioClick(event) {
        this.onSingleSelection(_objectSpread$1(_objectSpread$1({}, event), {}, {
          toggleable: true,
          type: 'radio'
        }));
      }
    }, {
      key: "onCheckboxClick",
      value: function onCheckboxClick(event) {
        this.onMultipleSelection(_objectSpread$1(_objectSpread$1({}, event), {}, {
          toggleable: true,
          type: 'checkbox'
        }));
      }
    }, {
      key: "allowDrag",
      value: function allowDrag(event) {
        return this.props.dragSelection && this.isMultipleSelection() && !event.originalEvent.shiftKey;
      }
    }, {
      key: "allowRowDrag",
      value: function allowRowDrag(event) {
        return !this.allowCellSelection() && this.allowDrag(event);
      }
    }, {
      key: "allowCellDrag",
      value: function allowCellDrag(event) {
        return this.allowCellSelection() && this.allowDrag(event);
      }
    }, {
      key: "allowSelection",
      value: function allowSelection(event) {
        var targetNode = event.originalEvent.target.nodeName;

        if (targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || core.DomHandler.hasClass(event.originalEvent.target, 'p-clickable')) {
          return false;
        }

        return true;
      }
    }, {
      key: "allowMetaKeySelection",
      value: function allowMetaKeySelection(event) {
        return !this.rowTouched && (!this.props.metaKeySelection || this.props.metaKeySelection && (event.originalEvent.metaKey || event.originalEvent.ctrlKey));
      }
    }, {
      key: "allowRangeSelection",
      value: function allowRangeSelection(event) {
        return this.isMultipleSelection() && event.originalEvent.shiftKey && this.anchorRowIndex !== null;
      }
    }, {
      key: "allowRowSelection",
      value: function allowRowSelection() {
        return (this.props.selectionMode || this.props.selectionModeInColumn) && !this.isRadioOnlySelection() && !this.isCheckboxOnlySelection();
      }
    }, {
      key: "allowCellSelection",
      value: function allowCellSelection() {
        return this.props.cellSelection && !this.isRadioSelectionModeInColumn() && !this.isCheckboxSelectionModeInColumn();
      }
    }, {
      key: "isRadioSelectionMode",
      value: function isRadioSelectionMode() {
        return this.props.selectionMode === 'radiobutton';
      }
    }, {
      key: "isCheckboxSelectionMode",
      value: function isCheckboxSelectionMode() {
        return this.props.selectionMode === 'checkbox';
      }
    }, {
      key: "isRadioSelectionModeInColumn",
      value: function isRadioSelectionModeInColumn() {
        return this.props.selectionModeInColumn === 'single';
      }
    }, {
      key: "isCheckboxSelectionModeInColumn",
      value: function isCheckboxSelectionModeInColumn() {
        return this.props.selectionModeInColumn === 'multiple';
      }
    }, {
      key: "isSingleSelection",
      value: function isSingleSelection() {
        return this.props.selectionMode === 'single' && !this.isCheckboxSelectionModeInColumn() || !this.isRadioSelectionMode() && this.isRadioSelectionModeInColumn();
      }
    }, {
      key: "isMultipleSelection",
      value: function isMultipleSelection() {
        return this.props.selectionMode === 'multiple' && !this.isRadioSelectionModeInColumn() || this.isCheckboxSelectionModeInColumn();
      }
    }, {
      key: "isRadioOnlySelection",
      value: function isRadioOnlySelection() {
        return this.isRadioSelectionMode() && this.isRadioSelectionModeInColumn();
      }
    }, {
      key: "isCheckboxOnlySelection",
      value: function isCheckboxOnlySelection() {
        return this.isCheckboxSelectionMode() && this.isCheckboxSelectionModeInColumn();
      }
    }, {
      key: "isSelected",
      value: function isSelected(rowData) {
        if (rowData && this.props.selection) {
          return this.props.selection instanceof Array ? this.findIndexInSelection(rowData) > -1 : this.equals(rowData, this.props.selection);
        }

        return false;
      }
    }, {
      key: "isContextMenuSelected",
      value: function isContextMenuSelected(rowData) {
        if (rowData && this.props.contextMenuSelection) {
          return this.equals(rowData, this.props.contextMenuSelection);
        }

        return false;
      }
    }, {
      key: "focusOnElement",
      value: function focusOnElement(event, isFocused) {
        var target = event.currentTarget;

        if (!this.allowCellSelection()) {
          if (this.isCheckboxSelectionModeInColumn()) {
            var checkbox = core.DomHandler.findSingle(target, 'td.p-selection-column .p-checkbox-box');
            checkbox && checkbox.focus();
          } else if (this.isRadioSelectionModeInColumn()) {
            var radio = core.DomHandler.findSingle(target, 'td.p-selection-column input[type="radio"]');
            radio && radio.focus();
          }
        }

        !isFocused && target && target.focus();
      }
    }, {
      key: "equals",
      value: function equals(data1, data2) {
        if (this.allowCellSelection()) return (data1.rowIndex === data2.rowIndex || data1.rowData === data2.rowData) && (data1.field === data2.field || data1.cellIndex === data2.cellIndex);else return this.compareSelectionBy === 'equals' ? data1 === data2 : core.ObjectUtils.equals(data1, data2, this.props.dataKey);
      }
    }, {
      key: "findIndexInSelection",
      value: function findIndexInSelection(data) {
        var _this3 = this;

        return this.props.selection ? this.props.selection.findIndex(function (d) {
          return _this3.equals(data, d);
        }) : -1;
      }
    }, {
      key: "onRowToggle",
      value: function onRowToggle(event) {
        var expandedRows;
        var dataKey = this.props.dataKey;

        if (dataKey) {
          var dataKeyValue = String(core.ObjectUtils.resolveFieldData(event.data, dataKey));
          expandedRows = this.props.expandedRows ? _objectSpread$1({}, this.props.expandedRows) : {};

          if (expandedRows[dataKeyValue] != null) {
            delete expandedRows[dataKeyValue];

            if (this.props.onRowCollapse) {
              this.props.onRowCollapse({
                originalEvent: event,
                data: event.data
              });
            }
          } else {
            expandedRows[dataKeyValue] = true;

            if (this.props.onRowExpand) {
              this.props.onRowExpand({
                originalEvent: event,
                data: event.data
              });
            }
          }
        } else {
          var expandedRowIndex = this.findRowIndex(this.props.expandedRows, event.data);
          expandedRows = this.props.expandedRows ? _toConsumableArray(this.props.expandedRows) : [];

          if (expandedRowIndex !== -1) {
            expandedRows = expandedRows.filter(function (val, i) {
              return i !== expandedRowIndex;
            });

            if (this.props.onRowCollapse) {
              this.props.onRowCollapse({
                originalEvent: event,
                data: event.data
              });
            }
          } else {
            expandedRows.push(event.data);

            if (this.props.onRowExpand) {
              this.props.onRowExpand({
                originalEvent: event,
                data: event.data
              });
            }
          }
        }

        if (this.props.onRowToggle) {
          this.props.onRowToggle({
            data: expandedRows
          });
        }
      }
    }, {
      key: "findRowIndex",
      value: function findRowIndex(rows, row) {
        return rows ? rows.findIndex(function (r) {
          return core.ObjectUtils.equals(row, r);
        }) : -1;
      }
    }, {
      key: "isRowExpanded",
      value: function isRowExpanded(row) {
        var dataKey = this.props.dataKey;

        if (dataKey) {
          var dataKeyValue = String(core.ObjectUtils.resolveFieldData(row, dataKey));
          return this.props.expandedRows && this.props.expandedRows[dataKeyValue] != null;
        } else {
          return this.findRowIndex(this.props.expandedRows, row) !== -1;
        }
      }
    }, {
      key: "onRowEditingToggle",
      value: function onRowEditingToggle(event) {
        var editingRows;
        var dataKey = this.props.dataKey;

        if (dataKey) {
          var dataKeyValue = String(core.ObjectUtils.resolveFieldData(event.data, dataKey));
          editingRows = this.props.editingRows ? _objectSpread$1({}, this.props.editingRows) : {};
          if (editingRows[dataKeyValue] != null) delete editingRows[dataKeyValue];else editingRows[dataKeyValue] = true;
        } else {
          var editingRowIndex = this.findRowIndex(this.props.editingRows, event.data);
          editingRows = this.props.editingRows ? _toConsumableArray(this.props.editingRows) : [];
          if (editingRowIndex !== -1) editingRows = editingRows.filter(function (val, i) {
            return i !== editingRowIndex;
          });else editingRows.push(event.data);
        }

        if (this.props.onRowEditChange) {
          this.props.onRowEditChange({
            originalEvent: event.originalEvent,
            data: editingRows,
            index: event.rowIndex
          });
        }
      }
    }, {
      key: "isRowEditing",
      value: function isRowEditing(row) {
        var dataKey = this.props.dataKey;

        if (dataKey) {
          var dataKeyValue = String(core.ObjectUtils.resolveFieldData(row, dataKey));
          return this.props.editingRows && this.props.editingRows[dataKeyValue] != null;
        } else {
          return this.findRowIndex(this.props.editingRows, row) !== -1;
        }
      }
    }, {
      key: "isSelectionEnabled",
      value: function isSelectionEnabled() {
        if (this.props.selectionMode || this.props.selectionModeInColumn != null) {
          return true;
        } else {
          if (Array.isArray(this.props.children)) {
            for (var i = 0; i < this.props.children.length; i++) {
              if (this.props.children[i].props.selectionMode) {
                return true;
              }
            }
          } else {
            return this.props.children && this.props.children.selectionMode != null;
          }
        }

        return false;
      }
    }, {
      key: "onRowDragStart",
      value: function onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
      }
    }, {
      key: "onRowDragEnd",
      value: function onRowDragEnd(event, index) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
      }
    }, {
      key: "onRowDragOver",
      value: function onRowDragOver(event, index) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
          var rowElement = event.rowElement;
          var rowY = core.DomHandler.getOffset(rowElement).top + core.DomHandler.getWindowScrollTop();
          var pageY = event.originalEvent.pageY;
          var rowMidY = rowY + core.DomHandler.getOuterHeight(rowElement) / 2;
          var prevRowElement = rowElement.previousElementSibling;

          if (pageY < rowMidY) {
            core.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
            this.droppedRowIndex = index;
            if (prevRowElement) core.DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');else core.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
          } else {
            if (prevRowElement) core.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');else core.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            this.droppedRowIndex = index + 1;
            core.DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
          }
        }
      }
    }, {
      key: "onRowDragLeave",
      value: function onRowDragLeave(event) {
        var rowElement = event.rowElement;
        var prevRowElement = rowElement.previousElementSibling;

        if (prevRowElement) {
          core.DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }

        core.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        core.DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
      }
    }, {
      key: "onRowDrop",
      value: function onRowDrop(event) {
        if (this.droppedRowIndex != null) {
          var dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;

          var val = _toConsumableArray(this.props.value);

          core.ObjectUtils.reorderArray(val, this.draggedRowIndex, dropIndex);

          if (this.props.onRowReorder) {
            this.props.onRowReorder({
              originalEvent: event,
              value: val,
              dragIndex: this.draggedRowIndex,
              dropIndex: this.droppedRowIndex
            });
          }
        } //cleanup


        this.onRowDragLeave(event);
        this.onRowDragEnd(event);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.dragSelection) {
          this.unbindDragSelectionEvents();
        }
      }
    }, {
      key: "renderRowGroupHeader",
      value: function renderRowGroupHeader(rowData, index) {
        var content = null;

        if (this.props.rowGroupMode === 'subheader' && this.props.expandableRowGroups) {
          content = /*#__PURE__*/React__default['default'].createElement(RowTogglerButton, {
            onClick: this.onRowToggle,
            rowData: rowData,
            expanded: this.isRowExpanded(rowData)
          });
        }

        return /*#__PURE__*/React__default['default'].createElement("tr", {
          role: "row",
          key: index + '_rowgroupheader',
          className: "p-rowgroup-header"
        }, /*#__PURE__*/React__default['default'].createElement("td", {
          role: "cell",
          colSpan: React__default['default'].Children.count(this.props.children)
        }, content, /*#__PURE__*/React__default['default'].createElement("span", {
          className: "p-rowgroup-header-name"
        }, this.props.rowGroupHeaderTemplate(rowData, index))));
      }
    }, {
      key: "renderRowGroupFooter",
      value: function renderRowGroupFooter(rowData, index) {
        return /*#__PURE__*/React__default['default'].createElement("tr", {
          role: "row",
          key: index + '_rowgroupfooter',
          className: "p-rowgroup-footer"
        }, this.props.rowGroupFooterTemplate(rowData, index));
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var rows;

        if (this.props.children) {
          var rpp = this.props.rows || 0;
          var first = this.props.first || 0;
          var selectionEnabled = this.isSelectionEnabled();
          var rowGroupMode = this.props.rowGroupMode;
          var hasSubheaderGrouping = rowGroupMode && rowGroupMode === 'subheader';
          var rowSpanGrouping = rowGroupMode && rowGroupMode === 'rowspan';
          var rowGroupHeaderExpanded = false;

          if (this.props.value && this.props.value.length) {
            rows = [];
            var startIndex = this.props.lazy ? 0 : this.props.value.length > first ? first : 0;
            var endIndex = this.props.virtualScroll ? startIndex + rpp * 2 : startIndex + rpp || this.props.value.length;

            var _loop = function _loop(i) {
              if (i >= _this4.props.value.length) {
                return "break";
              }

              var rowData = _this4.props.value[i];

              var expanded = _this4.isRowExpanded(rowData);

              var editing = _this4.isRowEditing(rowData);

              var selected = selectionEnabled ? _this4.isSelected(_this4.props.value[i]) : false;

              var contextMenuSelected = _this4.isContextMenuSelected(rowData);

              var groupRowSpan = void 0; //header row group

              if (hasSubheaderGrouping) {
                var currentRowFieldData = core.ObjectUtils.resolveFieldData(rowData, _this4.props.groupField);
                var previousRowFieldData = core.ObjectUtils.resolveFieldData(_this4.props.value[i - 1], _this4.props.groupField);

                if (i === 0 || currentRowFieldData !== previousRowFieldData) {
                  rows.push(_this4.renderRowGroupHeader(rowData, i));
                  rowGroupHeaderExpanded = expanded;
                }
              }

              if (rowSpanGrouping) {
                var rowSpanIndex = i;

                var _currentRowFieldData = core.ObjectUtils.resolveFieldData(rowData, _this4.props.sortField);

                var shouldCountRowSpan = i === startIndex || core.ObjectUtils.resolveFieldData(_this4.props.value[i - 1], _this4.props.sortField) !== _currentRowFieldData;

                if (shouldCountRowSpan) {
                  var nextRowFieldData = _currentRowFieldData;
                  groupRowSpan = 0;

                  while (_currentRowFieldData === nextRowFieldData) {
                    groupRowSpan++;
                    var nextRowData = _this4.props.value[++rowSpanIndex];

                    if (nextRowData) {
                      nextRowFieldData = core.ObjectUtils.resolveFieldData(nextRowData, _this4.props.sortField);
                    } else {
                      break;
                    }
                  }
                }
              }

              var isRowGroupExpanded = _this4.props.expandableRowGroups && hasSubheaderGrouping && rowGroupHeaderExpanded;

              if (!_this4.props.expandableRowGroups || isRowGroupExpanded) {
                //row content
                var bodyRow = /*#__PURE__*/React__default['default'].createElement(BodyRow, {
                  tableId: _this4.props.tableId,
                  key: i,
                  value: _this4.props.value,
                  rowData: rowData,
                  rowIndex: i,
                  onClick: _this4.onRowClick,
                  onDoubleClick: _this4.props.onRowDoubleClick,
                  onRightClick: _this4.onRowRightClick,
                  onTouchEnd: _this4.onRowTouchEnd,
                  onMouseDown: _this4.onRowMouseDown,
                  onMouseUp: _this4.onRowMouseUp,
                  onCellMouseDown: _this4.onCellMouseDown,
                  onCellMouseUp: _this4.onCellMouseUp,
                  onRowToggle: _this4.onRowToggle,
                  expanded: expanded,
                  selectionMode: _this4.props.selectionMode,
                  selectOnEdit: _this4.props.selectOnEdit,
                  onRadioClick: _this4.onRadioClick,
                  onCheckboxClick: _this4.onCheckboxClick,
                  selected: selected,
                  contextMenuSelected: contextMenuSelected,
                  rowClassName: _this4.props.rowClassName,
                  cellClassName: _this4.props.cellClassName,
                  sortField: _this4.props.sortField,
                  rowGroupMode: _this4.props.rowGroupMode,
                  groupRowSpan: groupRowSpan,
                  onDragStart: function onDragStart(e) {
                    return _this4.onRowDragStart(e, i);
                  },
                  onDragEnd: _this4.onRowDragEnd,
                  onDragOver: function onDragOver(e) {
                    return _this4.onRowDragOver(e, i);
                  },
                  onDragLeave: _this4.onRowDragLeave,
                  onDrop: _this4.onRowDrop,
                  virtualScroll: _this4.props.virtualScroll,
                  virtualRowHeight: _this4.props.virtualRowHeight,
                  editMode: _this4.props.editMode,
                  editing: editing,
                  isRowEditingControlled: !!_this4.props.onRowEditChange,
                  rowEditorValidator: _this4.props.rowEditorValidator,
                  onRowEditInit: _this4.props.onRowEditInit,
                  onRowEditSave: _this4.props.onRowEditSave,
                  onRowEditCancel: _this4.props.onRowEditCancel,
                  onRowEditingToggle: _this4.onRowEditingToggle,
                  showRowReorderElement: _this4.props.showRowReorderElement,
                  showSelectionElement: _this4.props.showSelectionElement,
                  onSelectionChange: _this4.props.onSelectionChange,
                  selectionModeInColumn: _this4.props.selectionModeInColumn,
                  dragSelection: _this4.props.dragSelection,
                  selection: _this4.props.selection,
                  allowRowSelection: _this4.allowRowSelection(),
                  allowCellSelection: _this4.allowCellSelection(),
                  onCellClick: _this4.onCellClick,
                  onEditingCellChange: _this4.props.onEditingCellChange
                }, _this4.props.children);
                rows.push(bodyRow);
              } //row expansion


              if (expanded && !(hasSubheaderGrouping && _this4.props.expandableRowGroups)) {
                var expandedRowContent = _this4.props.rowExpansionTemplate(rowData);

                var id = "".concat(_this4.props.tableId ? _this4.props.tableId + '_' : '', "content_").concat(i, "_expanded");
                var expandedRow = /*#__PURE__*/React__default['default'].createElement("tr", {
                  key: id,
                  id: id,
                  role: "row",
                  className: "p-row-expanded"
                }, /*#__PURE__*/React__default['default'].createElement("td", {
                  role: "cell",
                  colSpan: _this4.props.children.length
                }, expandedRowContent));
                rows.push(expandedRow);
              } //footer row group


              if (hasSubheaderGrouping && (!_this4.props.expandableRowGroups || isRowGroupExpanded)) {
                var _currentRowFieldData2 = core.ObjectUtils.resolveFieldData(rowData, _this4.props.groupField);

                var _nextRowFieldData = core.ObjectUtils.resolveFieldData(_this4.props.value[i + 1], _this4.props.groupField);

                if (i === _this4.props.value.length - 1 || _currentRowFieldData2 !== _nextRowFieldData) {
                  rows.push(_this4.renderRowGroupFooter(rowData, i));
                }
              }
            };

            for (var i = startIndex; i < endIndex; i++) {
              var _ret = _loop(i);

              if (_ret === "break") break;
            }
          } else {
            var emptyMessage = this.props.emptyMessage;
            rows = !this.props.loading && emptyMessage !== null ? /*#__PURE__*/React__default['default'].createElement("tr", {
              role: "row",
              className: "p-datatable-emptymessage"
            }, /*#__PURE__*/React__default['default'].createElement("td", {
              role: "cell",
              colSpan: this.props.children.length
            }, typeof emptyMessage === 'function' ? emptyMessage(this.props.frozen) : emptyMessage)) : null;
          }
        }

        return /*#__PURE__*/React__default['default'].createElement("tbody", {
          className: "p-datatable-tbody"
        }, rows);
      }
    }]);

    return TableBody;
  }(React.Component);

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var FooterCell = /*#__PURE__*/function (_Component) {
    _inherits(FooterCell, _Component);

    var _super = _createSuper$5(FooterCell);

    function FooterCell() {
      _classCallCheck(this, FooterCell);

      return _super.apply(this, arguments);
    }

    _createClass(FooterCell, [{
      key: "render",
      value: function render() {
        var className = this.props.footerClassName || this.props.className;
        var footer = core.ObjectUtils.getJSXElement(this.props.footer, this.props);
        return /*#__PURE__*/React__default['default'].createElement("td", {
          role: "cell",
          className: className,
          style: this.props.footerStyle || this.props.style,
          colSpan: this.props.colSpan,
          rowSpan: this.props.rowSpan
        }, footer);
      }
    }]);

    return FooterCell;
  }(React.Component);

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var TableFooter = /*#__PURE__*/function (_Component) {
    _inherits(TableFooter, _Component);

    var _super = _createSuper$4(TableFooter);

    function TableFooter() {
      _classCallCheck(this, TableFooter);

      return _super.apply(this, arguments);
    }

    _createClass(TableFooter, [{
      key: "createFooterCells",
      value: function createFooterCells(root, column, i) {
        var children = React__default['default'].Children.toArray(root.props.children);
        return React__default['default'].Children.map(children, function (column, i) {
          return /*#__PURE__*/React__default['default'].createElement(FooterCell, _extends({
            key: i
          }, column.props));
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var content;

        if (this.props.columnGroup) {
          var rows = React__default['default'].Children.toArray(this.props.columnGroup.props.children);
          content = rows.map(function (row, i) {
            return /*#__PURE__*/React__default['default'].createElement("tr", {
              key: i,
              role: "row"
            }, _this.createFooterCells(row));
          });
        } else {
          content = /*#__PURE__*/React__default['default'].createElement("tr", {
            role: "row"
          }, this.createFooterCells(this));
        }

        return /*#__PURE__*/React__default['default'].createElement("tfoot", {
          className: "p-datatable-tfoot"
        }, content);
      }
    }]);

    return TableFooter;
  }(React.Component);

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var HeaderCell = /*#__PURE__*/function (_Component) {
    _inherits(HeaderCell, _Component);

    var _super = _createSuper$3(HeaderCell);

    function HeaderCell(props) {
      var _this;

      _classCallCheck(this, HeaderCell);

      _this = _super.call(this, props);
      _this.state = {
        filterValue: '',
        badgeVisible: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_this));
      _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
      _this.onResizerMouseDown = _this.onResizerMouseDown.bind(_assertThisInitialized(_this));
      _this.onResizerClick = _this.onResizerClick.bind(_assertThisInitialized(_this));
      _this.onResizerDoubleClick = _this.onResizerDoubleClick.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
      _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
      _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
      _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(HeaderCell, [{
      key: "onClick",
      value: function onClick(event) {
        var _this$props$columnPro = this.props.columnProps,
            field = _this$props$columnPro.field,
            sortField = _this$props$columnPro.sortField,
            sortable = _this$props$columnPro.sortable,
            sortFunction = _this$props$columnPro.sortFunction;

        if (!this.isSortableDisabled()) {
          var targetNode = event.target;

          if (core.DomHandler.hasClass(targetNode, 'p-sortable-column') || core.DomHandler.hasClass(targetNode, 'p-column-title') || core.DomHandler.hasClass(targetNode, 'p-sortable-column-icon') || core.DomHandler.hasClass(targetNode.parentElement, 'p-sortable-column-icon')) {
            this.props.onSort({
              originalEvent: event,
              sortField: sortField || field,
              sortFunction: sortFunction,
              sortable: sortable,
              sortableDisabledFields: this.props.sortableDisabledFields
            });
            core.DomHandler.clearSelection();
          }
        }
      }
    }, {
      key: "onFilterChange",
      value: function onFilterChange(e) {
        var _this2 = this;

        var filterValue = e.target.value;

        if (this.props.columnProps.filter && this.props.onFilter) {
          if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
          }

          this.filterTimeout = setTimeout(function () {
            _this2.props.onFilter({
              value: filterValue,
              field: _this2.props.columnProps.filterField || _this2.props.columnProps.field,
              matchMode: _this2.props.columnProps.filterMatchMode
            });

            _this2.filterTimeout = null;
          }, this.props.filterDelay);
        }

        this.setState({
          filterValue: filterValue
        });
      }
    }, {
      key: "onResizerMouseDown",
      value: function onResizerMouseDown(event) {
        if (this.props.resizableColumns && this.props.onColumnResizeStart) {
          this.props.onColumnResizeStart({
            originalEvent: event,
            columnEl: event.target.parentElement,
            columnProps: this.props.columnProps
          });
          event.preventDefault();
        }
      }
    }, {
      key: "onResizerClick",
      value: function onResizerClick(event) {
        if (this.props.resizableColumns && this.props.onColumnResizerClick) {
          this.props.onColumnResizerClick({
            originalEvent: event,
            element: event.currentTarget.parentElement,
            column: this.props.columnProps
          });
          event.preventDefault();
        }
      }
    }, {
      key: "onResizerDoubleClick",
      value: function onResizerDoubleClick(event) {
        if (this.props.resizableColumns && this.props.onColumnResizerDoubleClick) {
          this.props.onColumnResizerDoubleClick({
            originalEvent: event,
            element: event.currentTarget.parentElement,
            column: this.props.columnProps
          });
          event.preventDefault();
        }
      }
    }, {
      key: "onMouseDown",
      value: function onMouseDown(event) {
        if (this.props.reorderableColumns && this.props.columnProps.reorderable) {
          if (event.target.nodeName !== 'INPUT') this.el.draggable = true;else if (event.target.nodeName === 'INPUT') this.el.draggable = false;
        }
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (event.key === 'Enter' && event.currentTarget === this.el) {
          this.onClick(event);
          event.preventDefault();
        }
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(event) {
        if (this.props.onDragStart) {
          this.props.onDragStart({
            originalEvent: event,
            column: this.props.columnProps
          });
        }
      }
    }, {
      key: "onDragOver",
      value: function onDragOver(event) {
        if (this.props.onDragOver) {
          this.props.onDragOver({
            originalEvent: event,
            column: this.props.columnProps
          });
        }
      }
    }, {
      key: "onDragLeave",
      value: function onDragLeave(event) {
        if (this.props.onDragLeave) {
          this.props.onDragLeave({
            originalEvent: event,
            column: this.props.columnProps
          });
        }
      }
    }, {
      key: "onDrop",
      value: function onDrop(event) {
        if (this.props.onDrop) {
          this.props.onDrop({
            originalEvent: event,
            column: this.props.columnProps
          });
        }
      }
    }, {
      key: "getMultiSortMetaDataIndex",
      value: function getMultiSortMetaDataIndex() {
        if (this.props.multiSortMeta) {
          var columnSortField = this.props.columnProps.sortField || this.props.columnProps.field;

          for (var i = 0; i < this.props.multiSortMeta.length; i++) {
            if (this.props.multiSortMeta[i].field === columnSortField) {
              return i;
            }
          }
        }

        return -1;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var prevColumnProps = prevProps.columnProps;
        var columnProps = this.props.columnProps;
        var filterField = columnProps.filterField || columnProps.field;

        if (prevColumnProps.sortableDisabled !== columnProps.sortableDisabled || prevColumnProps.sortable !== columnProps.sortable) {
          this.props.onSortableChange();
        }

        if (this.state.filterValue && prevProps.filters && prevProps.filters[filterField] && (!this.props.filters || !this.props.filters[filterField])) {
          this.setState({
            filterValue: ''
          });
        }
      }
    }, {
      key: "getAriaSort",
      value: function getAriaSort(sorted, sortOrder) {
        if (this.props.columnProps.sortable) {
          var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
          if (sortIcon === 'pi-sort-amount-down') return 'descending';else if (sortIcon === 'pi-sort-amount-up-alt') return 'ascending';else return 'none';
        } else {
          return null;
        }
      }
    }, {
      key: "isSortableDisabled",
      value: function isSortableDisabled() {
        return !this.props.columnProps.sortable || this.props.columnProps.sortable && (this.props.allSortableDisabled || this.props.columnProps.sortableDisabled);
      }
    }, {
      key: "isSingleSorted",
      value: function isSingleSorted() {
        return this.props.sortField !== null ? this.props.columnProps.field === this.props.sortField || this.props.columnProps.sortField === this.props.sortField : false;
      }
    }, {
      key: "renderSortIcon",
      value: function renderSortIcon(sorted, sortOrder) {
        if (this.props.columnProps.sortable) {
          var sortIcon = sorted ? sortOrder < 0 ? 'pi-sort-amount-down' : 'pi-sort-amount-up-alt' : 'pi-sort-alt';
          var sortIconClassName = core.classNames('p-sortable-column-icon pi pi-fw', sortIcon);
          return /*#__PURE__*/React__default['default'].createElement("span", {
            className: sortIconClassName
          });
        } else {
          return null;
        }
      }
    }, {
      key: "renderSortBadge",
      value: function renderSortBadge(sortMetaDataIndex) {
        if (sortMetaDataIndex !== -1 && this.state.badgeVisible) {
          return /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-sortable-column-badge"
          }, sortMetaDataIndex + 1);
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var filterElement, headerCheckbox;

        if (this.props.columnProps.filter && this.props.renderOptions.renderFilter) {
          filterElement = this.props.columnProps.filterElement || /*#__PURE__*/React__default['default'].createElement(inputtext.InputText, {
            onChange: this.onFilterChange,
            type: this.props.columnProps.filterType,
            value: this.state.filterValue,
            className: "p-column-filter",
            placeholder: this.props.columnProps.filterPlaceholder,
            maxLength: this.props.columnProps.filterMaxLength
          });
        }

        if (this.props.columnProps.selectionMode === 'multiple' && this.props.renderOptions.renderHeaderCheckbox) {
          headerCheckbox = /*#__PURE__*/React__default['default'].createElement(RowCheckbox, {
            onClick: this.props.onHeaderCheckboxClick,
            selected: this.props.headerCheckboxSelected,
            disabled: !this.props.value || this.props.value.length === 0
          });
        }

        if (this.props.renderOptions.filterOnly) {
          return /*#__PURE__*/React__default['default'].createElement("th", {
            ref: function ref(el) {
              return _this3.el = el;
            },
            role: "columnheader",
            className: core.classNames('p-filter-column', this.props.columnProps.filterHeaderClassName),
            style: this.props.columnProps.filterHeaderStyle || this.props.columnProps.style,
            colSpan: this.props.columnProps.colSpan,
            rowSpan: this.props.columnProps.rowSpan
          }, filterElement, headerCheckbox);
        } else {
          var sortMetaDataIndex = this.getMultiSortMetaDataIndex();
          var multiSortMetaData = sortMetaDataIndex !== -1 ? this.props.multiSortMeta[sortMetaDataIndex] : null;
          var singleSorted = this.isSingleSorted();
          var multipleSorted = multiSortMetaData !== null;
          var sortOrder = 0;
          var resizer = this.props.resizableColumns && /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-column-resizer p-clickable",
            onMouseDown: this.onResizerMouseDown,
            onClick: this.onResizerClick,
            onDoubleClick: this.onResizerDoubleClick
          });
          if (singleSorted) sortOrder = this.props.sortOrder;else if (multipleSorted) sortOrder = multiSortMetaData.order;
          var sorted = this.props.columnProps.sortable && (singleSorted || multipleSorted);
          var isSortableDisabled = this.isSortableDisabled();
          var className = core.classNames({
            'p-sortable-column': this.props.columnProps.sortable,
            'p-highlight': sorted,
            'p-sortable-disabled': isSortableDisabled,
            'p-resizable-column': this.props.resizableColumns,
            'p-selection-column': this.props.columnProps.selectionMode
          }, this.props.columnProps.headerClassName || this.props.columnProps.className);
          var sortIconElement = this.renderSortIcon(sorted, sortOrder);
          var ariaSortData = this.getAriaSort(sorted, sortOrder);
          var sortBadge = this.renderSortBadge(sortMetaDataIndex);
          var tabIndex = this.props.columnProps.sortable && !isSortableDisabled ? this.props.tabIndex : null;
          return /*#__PURE__*/React__default['default'].createElement("th", {
            ref: function ref(el) {
              return _this3.el = el;
            },
            role: "columnheader",
            tabIndex: tabIndex,
            className: className,
            style: this.props.columnProps.headerStyle || this.props.columnProps.style,
            onClick: this.onClick,
            onMouseDown: this.onMouseDown,
            onKeyDown: this.onKeyDown,
            colSpan: this.props.columnProps.colSpan,
            rowSpan: this.props.columnProps.rowSpan,
            "aria-sort": ariaSortData,
            onDragStart: this.onDragStart,
            onDragOver: this.onDragOver,
            onDragLeave: this.onDragLeave,
            onDrop: this.onDrop
          }, resizer, /*#__PURE__*/React__default['default'].createElement("span", {
            className: "p-column-title"
          }, this.props.columnProps.header), sortIconElement, sortBadge, filterElement, headerCheckbox);
        }
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        return {
          badgeVisible: nextProps.multiSortMeta && nextProps.multiSortMeta.length > 1
        };
      }
    }]);

    return HeaderCell;
  }(React.Component);

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var TableHeader = /*#__PURE__*/function (_Component) {
    _inherits(TableHeader, _Component);

    var _super = _createSuper$2(TableHeader);

    function TableHeader(props) {
      var _this;

      _classCallCheck(this, TableHeader);

      _this = _super.call(this, props);
      _this.state = {
        sortableDisabledFields: [],
        allSortableDisabled: false
      };
      _this.onSortableChange = _this.onSortableChange.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(TableHeader, [{
      key: "createHeaderCells",
      value: function createHeaderCells(columns, renderOptions) {
        var _this2 = this;

        return React__default['default'].Children.map(columns, function (column, i) {
          return /*#__PURE__*/React__default['default'].createElement(HeaderCell, {
            key: column.props.columnKey || column.props.field || i,
            allSortableDisabled: _this2.isAllSortableDisabled(),
            onSortableChange: _this2.onSortableChange,
            columnProps: column.props,
            value: _this2.props.value,
            onSort: _this2.props.onSort,
            sortableDisabledFields: _this2.state.sortableDisabledFields,
            sortMode: _this2.props.sortMode,
            sortField: _this2.props.sortField,
            sortOrder: _this2.props.sortOrder,
            multiSortMeta: _this2.props.multiSortMeta,
            resizableColumns: _this2.props.resizableColumns,
            onColumnResizeStart: _this2.props.onColumnResizeStart,
            onColumnResizerClick: _this2.props.onColumnResizerClick,
            onColumnResizerDoubleClick: _this2.props.onColumnResizerDoubleClick,
            filterDelay: _this2.props.filterDelay,
            onFilter: _this2.props.onFilter,
            renderOptions: renderOptions,
            onHeaderCheckboxClick: _this2.props.onHeaderCheckboxClick,
            headerCheckboxSelected: _this2.props.headerCheckboxSelected,
            reorderableColumns: _this2.props.reorderableColumns,
            onDragStart: _this2.props.onColumnDragStart,
            onDragOver: _this2.props.onColumnDragOver,
            onDragLeave: _this2.props.onColumnDragLeave,
            onDrop: _this2.props.onColumnDrop,
            filters: _this2.props.filters,
            tabIndex: _this2.props.tabIndex
          });
        });
      }
    }, {
      key: "hasColumnFilter",
      value: function hasColumnFilter(columns) {
        if (columns) {
          var _iterator = _createForOfIteratorHelper$1(columns),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var col = _step.value;

              if (col.props.filter) {
                return true;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        return false;
      }
    }, {
      key: "isSingleSort",
      value: function isSingleSort() {
        return this.props.sortMode === 'single';
      }
    }, {
      key: "isMultipleSort",
      value: function isMultipleSort() {
        return this.props.sortMode === 'multiple';
      }
    }, {
      key: "isAllSortableDisabled",
      value: function isAllSortableDisabled() {
        return this.isSingleSort() && this.state.allSortableDisabled;
      }
    }, {
      key: "isColumnSorted",
      value: function isColumnSorted(column) {
        return this.props.sortField !== null ? column.props.field === this.props.sortField || column.props.sortField === this.props.sortField : false;
      }
    }, {
      key: "updateSortableDisabled",
      value: function updateSortableDisabled() {
        var _this3 = this;

        if (this.isSingleSort() || this.isMultipleSort() && this.props.onSort) {
          var sortableDisabledFields = [];
          var allSortableDisabled = false;
          React__default['default'].Children.forEach(this.props.children, function (column) {
            if (column.props.sortableDisabled) {
              sortableDisabledFields.push(column.props.sortField || column.props.field);

              if (!allSortableDisabled && _this3.isColumnSorted(column)) {
                allSortableDisabled = true;
              }
            }
          });
          this.setState({
            sortableDisabledFields: sortableDisabledFields,
            allSortableDisabled: allSortableDisabled
          });
        }
      }
    }, {
      key: "onSortableChange",
      value: function onSortableChange() {
        this.updateSortableDisabled();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateSortableDisabled();
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var content;

        if (this.props.columnGroup) {
          var rows = React__default['default'].Children.toArray(this.props.columnGroup.props.children);
          content = rows.map(function (row, i) {
            return /*#__PURE__*/React__default['default'].createElement("tr", {
              key: i,
              role: "row"
            }, _this4.createHeaderCells(React__default['default'].Children.toArray(row.props.children), {
              filterOnly: false,
              renderFilter: true,
              renderHeaderCheckbox: true
            }));
          });
        } else {
          var columns = React__default['default'].Children.toArray(this.props.children);

          if (this.hasColumnFilter(columns)) {
            content = /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("tr", {
              role: "row"
            }, this.createHeaderCells(columns, {
              filterOnly: false,
              renderFilter: false,
              renderHeaderCheckbox: false
            })), /*#__PURE__*/React__default['default'].createElement("tr", {
              role: "row"
            }, this.createHeaderCells(columns, {
              filterOnly: true,
              renderFilter: true,
              renderHeaderCheckbox: true
            })));
          } else {
            content = /*#__PURE__*/React__default['default'].createElement("tr", {
              role: "row"
            }, this.createHeaderCells(columns, {
              filterOnly: false,
              renderFilter: false,
              renderHeaderCheckbox: true
            }));
          }
        }

        return /*#__PURE__*/React__default['default'].createElement("thead", {
          className: "p-datatable-thead"
        }, content);
      }
    }]);

    return TableHeader;
  }(React.Component);

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var TableLoadingBody = /*#__PURE__*/function (_Component) {
    _inherits(TableLoadingBody, _Component);

    var _super = _createSuper$1(TableLoadingBody);

    function TableLoadingBody() {
      _classCallCheck(this, TableLoadingBody);

      return _super.apply(this, arguments);
    }

    _createClass(TableLoadingBody, [{
      key: "renderRow",
      value: function renderRow(index) {
        var cells = [];

        for (var i = 0; i < this.props.columns.length; i++) {
          cells.push( /*#__PURE__*/React__default['default'].createElement("td", {
            key: i
          }, this.props.columns[i].props.loadingBody()));
        }

        return /*#__PURE__*/React__default['default'].createElement("tr", {
          key: index
        }, cells);
      }
    }, {
      key: "renderRows",
      value: function renderRows() {
        var rows = [];

        for (var i = 0; i < this.props.rows; i++) {
          rows.push(this.renderRow(i));
        }

        return rows;
      }
    }, {
      key: "render",
      value: function render() {
        var rows = this.renderRows();
        return /*#__PURE__*/React__default['default'].createElement("tbody", {
          className: "p-datatable-tbody"
        }, rows);
      }
    }]);

    return TableLoadingBody;
  }(React.Component);

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var DataTable = /*#__PURE__*/function (_Component) {
    _inherits(DataTable, _Component);

    var _super = _createSuper(DataTable);

    function DataTable(props) {
      var _this;

      _classCallCheck(this, DataTable);

      _this = _super.call(this, props);
      _this.state = {
        d_rows: props.rows,
        editingCells: []
      };

      if (!_this.props.onPage) {
        _this.state.first = props.first;
        _this.state.rows = props.rows;
      }

      if (!_this.props.onSort) {
        _this.state.sortField = props.sortField;
        _this.state.sortOrder = props.sortOrder;
        _this.state.multiSortMeta = props.multiSortMeta;
      }

      if (!_this.props.onFilter) {
        _this.state.filters = props.filters;
      }

      if (_this.isStateful()) {
        _this.restoreState(_this.state);
      }

      _this.onPageChange = _this.onPageChange.bind(_assertThisInitialized(_this));
      _this.onSort = _this.onSort.bind(_assertThisInitialized(_this));
      _this.onFilter = _this.onFilter.bind(_assertThisInitialized(_this));
      _this.onColumnResizeStart = _this.onColumnResizeStart.bind(_assertThisInitialized(_this));
      _this.onHeaderCheckboxClick = _this.onHeaderCheckboxClick.bind(_assertThisInitialized(_this));
      _this.onColumnDragStart = _this.onColumnDragStart.bind(_assertThisInitialized(_this));
      _this.onColumnDragOver = _this.onColumnDragOver.bind(_assertThisInitialized(_this));
      _this.onColumnDragLeave = _this.onColumnDragLeave.bind(_assertThisInitialized(_this));
      _this.onColumnDrop = _this.onColumnDrop.bind(_assertThisInitialized(_this));
      _this.onVirtualScroll = _this.onVirtualScroll.bind(_assertThisInitialized(_this));
      _this.onEditingCellChange = _this.onEditingCellChange.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DataTable, [{
      key: "getFirst",
      value: function getFirst() {
        return this.props.onPage ? this.props.first : this.state.first;
      }
    }, {
      key: "getRows",
      value: function getRows() {
        return this.props.onPage ? this.props.rows : this.state.rows;
      }
    }, {
      key: "getSortField",
      value: function getSortField() {
        return this.props.onSort ? this.props.sortField : this.state.sortField;
      }
    }, {
      key: "getSortOrder",
      value: function getSortOrder() {
        return this.props.onSort ? this.props.sortOrder : this.state.sortOrder;
      }
    }, {
      key: "getMultiSortMeta",
      value: function getMultiSortMeta() {
        return this.props.onSort ? this.props.multiSortMeta : this.state.multiSortMeta;
      }
    }, {
      key: "getFilters",
      value: function getFilters() {
        return this.props.onFilter ? this.props.filters : this.state.filters;
      }
    }, {
      key: "getStorage",
      value: function getStorage() {
        switch (this.props.stateStorage) {
          case 'local':
            return window.localStorage;

          case 'session':
            return window.sessionStorage;

          case 'custom':
            return null;

          default:
            throw new Error(this.props.stateStorage + ' is not a valid value for the state storage, supported values are "local", "session" and "custom".');
        }
      }
    }, {
      key: "isCustomStateStorage",
      value: function isCustomStateStorage() {
        return this.props.stateStorage === 'custom';
      }
    }, {
      key: "isStateful",
      value: function isStateful() {
        return this.props.stateKey != null || this.isCustomStateStorage();
      }
    }, {
      key: "saveState",
      value: function saveState() {
        var state = {};

        if (this.props.paginator) {
          state.first = this.getFirst();
          state.rows = this.getRows();
        }

        var sortField = this.getSortField();

        if (sortField) {
          state.sortField = sortField;
          state.sortOrder = this.getSortOrder();
        }

        var multiSortMeta = this.getMultiSortMeta();

        if (multiSortMeta) {
          state.multiSortMeta = multiSortMeta;
        }

        if (this.hasFilter()) {
          state.filters = this.getFilters();
        }

        if (this.props.resizableColumns) {
          this.saveColumnWidths(state);
        }

        if (this.props.reorderableColumns) {
          state.columnOrder = this.state.columnOrder;
        }

        if (this.props.expandedRows) {
          state.expandedRows = this.props.expandedRows;
        }

        if (this.props.selection && this.props.onSelectionChange) {
          state.selection = this.props.selection;
        }

        if (this.isCustomStateStorage()) {
          if (this.props.customSaveState) {
            this.props.customSaveState(state);
          }
        } else {
          var storage = this.getStorage();

          if (Object.keys(state).length) {
            storage.setItem(this.props.stateKey, JSON.stringify(state));
          }
        }

        if (this.props.onStateSave) {
          this.props.onStateSave(state);
        }
      }
    }, {
      key: "clearState",
      value: function clearState() {
        var storage = this.getStorage();

        if (storage && this.props.stateKey) {
          storage.removeItem(this.props.stateKey);
        }
      }
    }, {
      key: "restoreState",
      value: function restoreState(state) {
        var restoredState = {};

        if (this.isCustomStateStorage()) {
          if (this.props.customRestoreState) {
            restoredState = this.props.customRestoreState();
          }
        } else {
          var storage = this.getStorage();
          var stateString = storage.getItem(this.props.stateKey);

          if (stateString) {
            restoredState = JSON.parse(stateString);
          }
        }

        this._restoreState(restoredState, state);
      }
    }, {
      key: "restoreTableState",
      value: function restoreTableState(restoredState) {
        var state = this._restoreState(restoredState);

        if (state && Object.keys(state).length) {
          this.setState(state);
        }
      }
    }, {
      key: "_restoreState",
      value: function _restoreState(restoredState) {
        var _this2 = this;

        var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (restoredState && Object.keys(restoredState).length) {
          if (this.props.paginator) {
            if (this.props.onPage) {
              var getOnPageParams = function getOnPageParams(first, rows) {
                var totalRecords = _this2.getTotalRecords(_this2.processData());

                var pageCount = Math.ceil(totalRecords / rows) || 1;
                var page = Math.floor(first / rows);
                return {
                  first: first,
                  rows: rows,
                  page: page,
                  pageCount: pageCount
                };
              };

              this.props.onPage(getOnPageParams(restoredState.first, restoredState.rows));
            } else {
              state.first = restoredState.first;
              state.rows = restoredState.rows;
            }
          }

          if (restoredState.sortField) {
            if (this.props.onSort) {
              this.props.onSort({
                sortField: restoredState.sortField,
                sortOrder: restoredState.sortOrder
              });
            } else {
              state.sortField = restoredState.sortField;
              state.sortOrder = restoredState.sortOrder;
            }
          }

          if (restoredState.multiSortMeta) {
            if (this.props.onSort) {
              this.props.onSort({
                multiSortMeta: restoredState.multiSortMeta
              });
            } else {
              state.multiSortMeta = restoredState.multiSortMeta;
            }
          }

          if (restoredState.filters) {
            if (this.props.onFilter) {
              this.props.onFilter({
                filters: restoredState.filters
              });
            } else {
              state.filters = restoredState.filters;
            }
          }

          if (this.props.resizableColumns) {
            this.columnWidthsState = restoredState.columnWidths;
            this.tableWidthState = restoredState.tableWidth;
          }

          if (this.props.reorderableColumns) {
            state.columnOrder = restoredState.columnOrder;
          }

          if (restoredState.expandedRows && this.props.onRowToggle) {
            this.props.onRowToggle({
              data: restoredState.expandedRows
            });
          }

          if (restoredState.selection && this.props.onSelectionChange) {
            this.props.onSelectionChange({
              value: restoredState.selection
            });
          }

          if (this.props.onStateRestore) {
            this.props.onStateRestore(restoredState);
          }
        }

        return state;
      }
    }, {
      key: "saveColumnWidths",
      value: function saveColumnWidths(state) {
        var widths = [];
        var headers = core.DomHandler.find(this.container, '.p-datatable-thead > tr > th.p-resizable-column');
        headers.map(function (header) {
          return widths.push(core.DomHandler.getOuterWidth(header));
        });
        state.columnWidths = widths.join(',');

        if (this.props.columnResizeMode === 'expand') {
          state.tableWidth = this.props.scrollable ? core.DomHandler.findSingle(this.container, '.p-datatable-scrollable-header-table').style.width : core.DomHandler.getOuterWidth(this.table) + 'px';
        }
      }
    }, {
      key: "restoreColumnWidths",
      value: function restoreColumnWidths() {
        if (this.columnWidthsState) {
          var widths = this.columnWidthsState.split(',');

          if (this.props.columnResizeMode === 'expand' && this.tableWidthState) {
            if (this.props.scrollable) {
              this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
            } else {
              this.table.style.width = this.tableWidthState;
              this.container.style.width = this.tableWidthState;
            }
          }

          if (this.props.scrollable) {
            var headerCols = core.DomHandler.find(this.container, '.p-datatable-scrollable-header-table > colgroup > col');
            var bodyCols = core.DomHandler.find(this.container, '.p-datatable-scrollable-body-table > colgroup > col');
            headerCols.map(function (col, index) {
              return col.style.width = widths[index] + 'px';
            });
            bodyCols.map(function (col, index) {
              return col.style.width = widths[index] + 'px';
            });
          } else {
            var headers = core.DomHandler.find(this.table, '.p-datatable-thead > tr > th');
            headers.map(function (header, index) {
              return header.style.width = widths[index] + 'px';
            });
          }
        }
      }
    }, {
      key: "onPageChange",
      value: function onPageChange(event) {
        if (this.props.onPage) this.props.onPage(event);else this.setState({
          first: event.first,
          rows: event.rows
        });

        if (this.props.onValueChange) {
          this.props.onValueChange(this.processData());
        }
      }
    }, {
      key: "createPaginator",
      value: function createPaginator(position, totalRecords, data) {
        var className = core.classNames('p-paginator-' + position, this.props.paginatorClassName);
        return /*#__PURE__*/React__default['default'].createElement(paginator.Paginator, {
          first: this.getFirst(),
          rows: this.getRows(),
          pageLinkSize: this.props.pageLinkSize,
          className: className,
          onPageChange: this.onPageChange,
          template: this.props.paginatorTemplate,
          totalRecords: totalRecords,
          rowsPerPageOptions: this.props.rowsPerPageOptions,
          currentPageReportTemplate: this.props.currentPageReportTemplate,
          leftContent: this.props.paginatorLeft,
          rightContent: this.props.paginatorRight,
          alwaysShow: this.props.alwaysShowPaginator,
          dropdownAppendTo: this.props.paginatorDropdownAppendTo
        });
      }
    }, {
      key: "onSort",
      value: function onSort(event) {
        var sortField = event.sortField;
        var sortOrder = this.props.defaultSortOrder;
        var multiSortMeta;
        var eventMeta;
        this.columnSortable = event.sortable;
        this.columnSortFunction = event.sortFunction;
        this.columnField = event.sortField;

        if (this.props.sortMode === 'multiple') {
          var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
          var sortableDisabledFields = event.sortableDisabledFields;
          multiSortMeta = _toConsumableArray(this.getMultiSortMeta() || []);
          var sortMeta = multiSortMeta.find(function (sortMeta) {
            return sortMeta.field === sortField;
          });
          sortOrder = sortMeta ? this.getCalculatedSortOrder(sortMeta.order) : sortOrder;
          var newMetaData = {
            field: sortField,
            order: sortOrder
          };

          if (sortOrder) {
            multiSortMeta = metaKey ? multiSortMeta : multiSortMeta.filter(function (meta) {
              return sortableDisabledFields.some(function (field) {
                return field === meta.field;
              });
            });
            this.addSortMeta(newMetaData, multiSortMeta);
          } else if (this.props.removableSort) {
            this.removeSortMeta(newMetaData, multiSortMeta);
          }

          eventMeta = {
            multiSortMeta: multiSortMeta
          };
        } else {
          sortOrder = this.getSortField() === sortField ? this.getCalculatedSortOrder(this.getSortOrder()) : sortOrder;

          if (this.props.removableSort) {
            sortField = sortOrder ? sortField : null;
          }

          eventMeta = {
            sortField: sortField,
            sortOrder: sortOrder
          };
        }

        if (this.props.onSort) {
          this.props.onSort(eventMeta);
        } else {
          eventMeta.first = 0;
          this.setState(eventMeta);
        }

        if (this.props.onValueChange) {
          this.props.onValueChange(this.processData({
            sortField: sortField,
            sortOrder: sortOrder,
            multiSortMeta: multiSortMeta
          }));
        }
      }
    }, {
      key: "getCalculatedSortOrder",
      value: function getCalculatedSortOrder(currentOrder) {
        return this.props.removableSort ? this.props.defaultSortOrder === currentOrder ? currentOrder * -1 : 0 : currentOrder * -1;
      }
    }, {
      key: "addSortMeta",
      value: function addSortMeta(meta, multiSortMeta) {
        var index = -1;

        for (var i = 0; i < multiSortMeta.length; i++) {
          if (multiSortMeta[i].field === meta.field) {
            index = i;
            break;
          }
        }

        if (index >= 0) multiSortMeta[index] = meta;else multiSortMeta.push(meta);
      }
    }, {
      key: "removeSortMeta",
      value: function removeSortMeta(meta, multiSortMeta) {
        var index = -1;

        for (var i = 0; i < multiSortMeta.length; i++) {
          if (multiSortMeta[i].field === meta.field) {
            index = i;
            break;
          }
        }

        if (index >= 0) {
          multiSortMeta.splice(index, 1);
        }

        multiSortMeta = multiSortMeta.length > 0 ? multiSortMeta : null;
      }
    }, {
      key: "sortSingle",
      value: function sortSingle(data, sortField, sortOrder) {
        var value = _toConsumableArray(data);

        if (this.columnSortable && this.columnSortFunction) {
          value = this.columnSortFunction({
            field: this.getSortField(),
            order: this.getSortOrder()
          });
        } else {
          value.sort(function (data1, data2) {
            var value1 = core.ObjectUtils.resolveFieldData(data1, sortField);
            var value2 = core.ObjectUtils.resolveFieldData(data2, sortField);
            var result = null;
            if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
              numeric: true
            });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
            return sortOrder * result;
          });
        }

        return value;
      }
    }, {
      key: "sortMultiple",
      value: function sortMultiple(data, multiSortMeta) {
        var _this3 = this;

        var value = _toConsumableArray(data);

        if (this.columnSortable && this.columnSortFunction) {
          var meta = multiSortMeta.find(function (meta) {
            return meta.field === _this3.columnField;
          });
          var field = this.columnField;
          var order = meta ? meta.order : this.defaultSortOrder;
          value = this.columnSortFunction({
            field: field,
            order: order
          });
        } else {
          value.sort(function (data1, data2) {
            return _this3.multisortField(data1, data2, multiSortMeta, 0);
          });
        }

        return value;
      }
    }, {
      key: "multisortField",
      value: function multisortField(data1, data2, multiSortMeta, index) {
        var value1 = core.ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = core.ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;

        if (typeof value1 === 'string' || value1 instanceof String) {
          if (value1.localeCompare && value1 !== value2) {
            return multiSortMeta[index].order * value1.localeCompare(value2, undefined, {
              numeric: true
            });
          }
        } else {
          result = value1 < value2 ? -1 : 1;
        }

        if (value1 === value2) {
          return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
        }

        return multiSortMeta[index].order * result;
      }
    }, {
      key: "filter",
      value: function filter(value, field, mode) {
        this.onFilter({
          value: value,
          field: field,
          matchMode: mode
        });
      }
    }, {
      key: "onFilter",
      value: function onFilter(event) {
        var currentFilters = this.getFilters();
        var newFilters = currentFilters ? _objectSpread({}, currentFilters) : {};
        if (!this.isFilterBlank(event.value)) newFilters[event.field] = {
          value: event.value,
          matchMode: event.matchMode
        };else if (newFilters[event.field]) delete newFilters[event.field];

        if (this.props.onFilter) {
          this.props.onFilter({
            filters: newFilters
          });
        } else {
          this.setState({
            first: 0,
            filters: newFilters
          });
        }

        if (this.props.onValueChange) {
          this.props.onValueChange(this.processData({
            filters: newFilters
          }));
        }
      }
    }, {
      key: "hasFilter",
      value: function hasFilter() {
        var filters = this.getFilters() || this.props.globalFilter;
        return filters && Object.keys(filters).length > 0;
      }
    }, {
      key: "isFilterBlank",
      value: function isFilterBlank(filter) {
        if (filter !== null && filter !== undefined) {
          if (typeof filter === 'string' && filter.trim().length === 0 || filter instanceof Array && filter.length === 0) return true;else return false;
        }

        return true;
      }
    }, {
      key: "hasFooter",
      value: function hasFooter() {
        if (this.props.children) {
          if (this.props.footerColumnGroup) {
            return true;
          } else {
            return this.hasChildrenFooter(this.props.children);
          }
        } else {
          return false;
        }
      }
    }, {
      key: "hasChildrenFooter",
      value: function hasChildrenFooter(children) {
        var hasFooter = false;

        if (children) {
          if (children instanceof Array) {
            for (var i = 0; i < children.length; i++) {
              hasFooter = hasFooter || this.hasChildrenFooter(children[i]);
            }
          } else {
            return children.props && children.props.footer !== null;
          }
        }

        return hasFooter;
      }
    }, {
      key: "onColumnResizeStart",
      value: function onColumnResizeStart(event) {
        var containerLeft = core.DomHandler.getOffset(this.container).left;
        this.resizeColumn = event.columnEl;
        this.resizeColumnProps = event.columnProps;
        this.columnResizing = true;
        this.lastResizerHelperX = event.originalEvent.pageX - containerLeft + this.container.scrollLeft;
        this.bindColumnResizeEvents();
      }
    }, {
      key: "onColumnResize",
      value: function onColumnResize(event) {
        var containerLeft = core.DomHandler.getOffset(this.container).left;
        core.DomHandler.addClass(this.container, 'p-unselectable-text');
        this.resizerHelper.style.height = this.container.offsetHeight + 'px';
        this.resizerHelper.style.top = 0 + 'px';
        this.resizerHelper.style.left = event.pageX - containerLeft + this.container.scrollLeft + 'px';
        this.resizerHelper.style.display = 'block';
      }
    }, {
      key: "onColumnResizeEnd",
      value: function onColumnResizeEnd(event) {
        var delta = this.resizerHelper.offsetLeft - this.lastResizerHelperX;
        var columnWidth = this.resizeColumn.offsetWidth;
        var newColumnWidth = columnWidth + delta;
        var minWidth = this.resizeColumn.style.minWidth || 15;

        if (columnWidth + delta > parseInt(minWidth, 10)) {
          if (this.props.columnResizeMode === 'fit') {
            var nextColumn = this.resizeColumn.nextElementSibling;
            var nextColumnWidth = nextColumn.offsetWidth - delta;

            if (newColumnWidth > 15 && nextColumnWidth > 15) {
              if (this.props.scrollable) {
                var scrollableView = this.findParentScrollableView(this.resizeColumn);
                var scrollableBodyTable = core.DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-body-table');
                var scrollableHeaderTable = core.DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-header-table');
                var scrollableFooterTable = core.DomHandler.findSingle(scrollableView, 'table.p-datatable-scrollable-footer-table');
                var resizeColumnIndex = core.DomHandler.index(this.resizeColumn);
                this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
              } else {
                this.resizeColumn.style.width = newColumnWidth + 'px';

                if (nextColumn) {
                  nextColumn.style.width = nextColumnWidth + 'px';
                }
              }
            }
          } else if (this.props.columnResizeMode === 'expand') {
            if (this.props.scrollable) {
              this.setScrollableItemsWidthOnExpandResize(this.resizeColumn, newColumnWidth, delta);
            } else {
              this.table.style.width = this.table.offsetWidth + delta + 'px';
              this.resizeColumn.style.width = newColumnWidth + 'px';
            }
          }

          if (this.props.onColumnResizeEnd) {
            this.props.onColumnResizeEnd({
              element: this.resizeColumn,
              column: this.resizeColumnProps,
              delta: delta
            });
          }

          if (this.isStateful()) {
            this.saveState();
          }
        }

        this.resizerHelper.style.display = 'none';
        this.resizeColumn = null;
        this.resizeColumnProps = null;
        core.DomHandler.removeClass(this.container, 'p-unselectable-text');
        this.unbindColumnResizeEvents();
      }
    }, {
      key: "setScrollableItemsWidthOnExpandResize",
      value: function setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta) {
        var scrollableView = column ? this.findParentScrollableView(column) : this.container;
        var scrollableBody = core.DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-body');
        var scrollableHeader = core.DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-header');
        var scrollableFooter = core.DomHandler.findSingle(scrollableView, '.p-datatable-scrollable-footer');
        var scrollableBodyTable = core.DomHandler.findSingle(scrollableBody, 'table.p-datatable-scrollable-body-table');
        var scrollableHeaderTable = core.DomHandler.findSingle(scrollableHeader, 'table.p-datatable-scrollable-header-table');
        var scrollableFooterTable = core.DomHandler.findSingle(scrollableFooter, 'table.p-datatable-scrollable-footer-table');
        var scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
        var scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
        var isContainerInViewport = this.container.offsetWidth >= scrollableBodyTableWidth;

        var setWidth = function setWidth(container, table, width, isContainerInViewport) {
          if (container && table) {
            container.style.width = isContainerInViewport ? width + core.DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
            table.style.width = width + 'px';
          }
        };

        setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);

        if (column) {
          var resizeColumnIndex = core.DomHandler.index(column);
          this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
          this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
          this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
      }
    }, {
      key: "findParentScrollableView",
      value: function findParentScrollableView(column) {
        if (column) {
          var parent = column.parentElement;

          while (parent && !core.DomHandler.hasClass(parent, 'p-datatable-scrollable-view')) {
            parent = parent.parentElement;
          }

          return parent;
        } else {
          return null;
        }
      }
    }, {
      key: "resizeColGroup",
      value: function resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
          var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;

          if (colGroup) {
            var col = colGroup.children[resizeColumnIndex];
            var nextCol = col.nextElementSibling;
            col.style.width = newColumnWidth + 'px';

            if (nextCol && nextColumnWidth) {
              nextCol.style.width = nextColumnWidth + 'px';
            }
          } else {
            throw new Error("Scrollable tables require a colgroup to support resizable columns");
          }
        }
      }
    }, {
      key: "bindColumnResizeEvents",
      value: function bindColumnResizeEvents() {
        var _this4 = this;

        this.documentColumnResizeListener = document.addEventListener('mousemove', function (event) {
          if (_this4.columnResizing) {
            _this4.onColumnResize(event);
          }
        });
        this.documentColumnResizeEndListener = document.addEventListener('mouseup', function (event) {
          if (_this4.columnResizing) {
            _this4.columnResizing = false;

            _this4.onColumnResizeEnd(event);
          }
        });
      }
    }, {
      key: "unbindColumnResizeEvents",
      value: function unbindColumnResizeEvents() {
        document.removeEventListener('document', this.documentColumnResizeListener);
        document.removeEventListener('document', this.documentColumnResizeEndListener);
      }
    }, {
      key: "findParentHeader",
      value: function findParentHeader(element) {
        if (element.nodeName === 'TH') {
          return element;
        } else {
          var parent = element.parentElement;

          while (parent.nodeName !== 'TH') {
            parent = parent.parentElement;
            if (!parent) break;
          }

          return parent;
        }
      }
    }, {
      key: "onColumnDragStart",
      value: function onColumnDragStart(e) {
        var event = e.originalEvent,
            column = e.column;

        if (this.columnResizing) {
          event.preventDefault();
          return;
        }

        this.iconWidth = core.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUp);
        this.iconHeight = core.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorUp);
        this.draggedColumnEl = this.findParentHeader(event.currentTarget);
        this.draggedColumn = column;
        event.dataTransfer.setData('text', 'b'); // Firefox requires this to make dragging possible
      }
    }, {
      key: "onColumnDragOver",
      value: function onColumnDragOver(e) {
        var event = e.originalEvent;
        var dropHeader = this.findParentHeader(event.currentTarget);

        if (this.props.reorderableColumns && this.draggedColumnEl && dropHeader) {
          event.preventDefault();
          var containerOffset = core.DomHandler.getOffset(this.container);
          var dropHeaderOffset = core.DomHandler.getOffset(dropHeader);

          if (this.draggedColumnEl !== dropHeader) {
            var targetLeft = dropHeaderOffset.left - containerOffset.left; //let targetTop =  containerOffset.top - dropHeaderOffset.top;

            var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
            this.reorderIndicatorUp.style.top = dropHeaderOffset.top - containerOffset.top - (this.iconHeight - 1) + 'px';
            this.reorderIndicatorDown.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';

            if (event.pageX > columnCenter) {
              this.reorderIndicatorUp.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
              this.reorderIndicatorDown.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.iconWidth / 2) + 'px';
              this.dropPosition = 1;
            } else {
              this.reorderIndicatorUp.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
              this.reorderIndicatorDown.style.left = targetLeft - Math.ceil(this.iconWidth / 2) + 'px';
              this.dropPosition = -1;
            }

            this.reorderIndicatorUp.style.display = 'block';
            this.reorderIndicatorDown.style.display = 'block';
          }
        }
      }
    }, {
      key: "onColumnDragLeave",
      value: function onColumnDragLeave(e) {
        var event = e.originalEvent;

        if (this.props.reorderableColumns && this.draggedColumnEl) {
          event.preventDefault();
          this.reorderIndicatorUp.style.display = 'none';
          this.reorderIndicatorDown.style.display = 'none';
        }
      }
    }, {
      key: "onColumnDrop",
      value: function onColumnDrop(e) {
        var _this5 = this;

        var event = e.originalEvent,
            column = e.column;
        event.preventDefault();

        if (this.draggedColumnEl) {
          var dragIndex = core.DomHandler.index(this.draggedColumnEl);
          var dropIndex = core.DomHandler.index(this.findParentHeader(event.currentTarget));
          var allowDrop = dragIndex !== dropIndex;

          if (allowDrop && (dropIndex - dragIndex === 1 && this.dropPosition === -1 || dragIndex - dropIndex === 1 && this.dropPosition === 1)) {
            allowDrop = false;
          }

          if (allowDrop) {
            var columns = this.state.columnOrder ? this.getColumns() : React__default['default'].Children.toArray(this.props.children);

            var isSameColumn = function isSameColumn(col1, col2) {
              return col1.columnKey || col2.columnKey ? core.ObjectUtils.equals(col1, col2, 'columnKey') : core.ObjectUtils.equals(col1, col2, 'field');
            };

            var dragColIndex = columns.findIndex(function (child) {
              return isSameColumn(child.props, _this5.draggedColumn);
            });
            var dropColIndex = columns.findIndex(function (child) {
              return isSameColumn(child.props, column);
            });

            if (dropColIndex < dragColIndex && this.dropPosition === 1) {
              dropColIndex++;
            }

            if (dropColIndex > dragColIndex && this.dropPosition === -1) {
              dropColIndex--;
            }

            core.ObjectUtils.reorderArray(columns, dragColIndex, dropColIndex);
            var columnOrder = [];

            var _iterator = _createForOfIteratorHelper(columns),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _column = _step.value;
                columnOrder.push(_column.props.columnKey || _column.props.field);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            this.setState({
              columnOrder: columnOrder
            });

            if (this.props.onColReorder) {
              this.props.onColReorder({
                originalEvent: event,
                dragIndex: dragColIndex,
                dropIndex: dropColIndex,
                columns: columns
              });
            }
          }

          this.reorderIndicatorUp.style.display = 'none';
          this.reorderIndicatorDown.style.display = 'none';
          this.draggedColumnEl.draggable = false;
          this.draggedColumnEl = null;
          this.dropPosition = null;
        }
      }
    }, {
      key: "onVirtualScroll",
      value: function onVirtualScroll(event) {
        var _this6 = this;

        if (this.virtualScrollTimer) {
          clearTimeout(this.virtualScrollTimer);
        }

        this.virtualScrollTimer = setTimeout(function () {
          if (_this6.props.onVirtualScroll) {
            _this6.props.onVirtualScroll({
              first: (event.page - 1) * _this6.props.rows,
              rows: _this6.props.virtualScroll ? _this6.props.rows * 2 : _this6.props.rows
            });
          }
        }, this.props.virtualScrollDelay);
      }
    }, {
      key: "hasEditingCell",
      value: function hasEditingCell() {
        return this.state.editingCells && this.state.editingCells.length !== 0;
      }
    }, {
      key: "onEditingCellChange",
      value: function onEditingCellChange(event) {
        var _this7 = this;

        var rowIndex = event.rowIndex,
            cellIndex = event.cellIndex,
            editing = event.editing;

        var editingCells = _toConsumableArray(this.state.editingCells);

        if (editing) editingCells.push({
          rowIndex: rowIndex,
          cellIndex: cellIndex
        });else editingCells = editingCells.filter(function (cell) {
          return !(cell.rowIndex === rowIndex && cell.cellIndex === cellIndex);
        });
        this.setState({
          editingCells: editingCells
        }, function () {
          _this7.props.onValueChange && _this7.props.onValueChange(_this7.processData());
        });
      }
    }, {
      key: "exportCSV",
      value: function exportCSV(options) {
        var _this8 = this;

        var data;
        var csv = "\uFEFF";
        var columns = this.getColumns();

        if (options && options.selectionOnly) {
          data = this.props.selection || [];
        } else {
          data = [].concat(_toConsumableArray(this.props.frozenValue || []), _toConsumableArray(this.processData() || []));
        } //headers


        columns.forEach(function (column, i) {
          var _column$props = column.props,
              field = _column$props.field,
              header = _column$props.header,
              exportable = _column$props.exportable;

          if (exportable && field) {
            csv += '"' + (header || field) + '"';

            if (i < columns.length - 1) {
              csv += _this8.props.csvSeparator;
            }
          }
        }); //body

        data.forEach(function (record) {
          csv += '\n';
          columns.forEach(function (column, i) {
            var _column$props2 = column.props,
                field = _column$props2.field,
                exportable = _column$props2.exportable;

            if (exportable && field) {
              var cellData = core.ObjectUtils.resolveFieldData(record, field);
              if (cellData != null) cellData = _this8.props.exportFunction ? _this8.props.exportFunction({
                data: cellData,
                field: field
              }) : String(cellData).replace(/"/g, '""');else cellData = '';
              csv += '"' + cellData + '"';

              if (i < columns.length - 1) {
                csv += _this8.props.csvSeparator;
              }
            }
          });
        });
        var blob = new Blob([csv], {
          type: 'application/csv;charset=utf-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, this.props.exportFilename + '.csv');
        } else {
          var link = document.createElement("a");

          if (link.download !== undefined) {
            link.setAttribute('href', URL.createObjectURL(blob));
            link.setAttribute('download', this.props.exportFilename + '.csv');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            window.open(encodeURI(csv));
          }
        }
      }
    }, {
      key: "closeEditingCell",
      value: function closeEditingCell() {
        if (this.props.editMode !== "row") {
          document.body.click();
        }
      }
    }, {
      key: "onHeaderCheckboxClick",
      value: function onHeaderCheckboxClick(event) {
        var originalEvent = event.originalEvent;
        var selection;

        if (!event.checked) {
          var visibleData = this.hasFilter() ? this.processData() : this.props.value;
          selection = _toConsumableArray(visibleData);
          this.props.onAllRowsSelect && this.props.onAllRowsSelect({
            originalEvent: originalEvent,
            data: selection,
            type: 'all'
          });
        } else {
          selection = [];
          this.props.onAllRowsUnselect && this.props.onAllRowsUnselect({
            originalEvent: originalEvent,
            data: selection,
            type: 'all'
          });
        }

        if (this.props.onSelectionChange) {
          this.props.onSelectionChange({
            originalEvent: originalEvent,
            value: selection
          });
        }
      }
    }, {
      key: "filterLocal",
      value: function filterLocal(value, localFilters) {
        var filteredValue = [];
        var filters = localFilters || this.getFilters();
        var columns = React__default['default'].Children.toArray(this.props.children);

        for (var i = 0; i < value.length; i++) {
          var localMatch = true;
          var globalMatch = false;

          for (var j = 0; j < columns.length; j++) {
            var col = columns[j];
            var columnField = col.props.filterField || col.props.field;
            var filterMeta = filters ? filters[columnField] : null; //local

            if (filterMeta) {
              var filterValue = filterMeta.value;
              var dataFieldValue = core.ObjectUtils.resolveFieldData(value[i], columnField);
              var filterMatchMode = filterMeta.matchMode || col.props.filterMatchMode;
              var filterConstraint = filterMatchMode === 'custom' ? col.props.filterFunction : core.FilterUtils[filterMatchMode];
              var options = {
                rowData: value[i],
                filters: filters,
                props: this.props,
                column: {
                  filterMeta: filterMeta,
                  filterField: columnField,
                  props: col.props
                }
              };

              if (filterConstraint !== null && !filterConstraint(dataFieldValue, filterValue, this.props.filterLocale, options)) {
                localMatch = false;
              }

              if (!localMatch) {
                break;
              }
            }

            if (!col.props.excludeGlobalFilter && this.props.globalFilter && !globalMatch) {
              globalMatch = core.FilterUtils['contains'](core.ObjectUtils.resolveFieldData(value[i], columnField), this.props.globalFilter, this.props.filterLocale);
            }
          }

          var matches = localMatch;

          if (this.props.globalFilter) {
            matches = localMatch && globalMatch;
          }

          if (matches) {
            filteredValue.push(value[i]);
          }
        }

        if (filteredValue.length === value.length) {
          filteredValue = value;
        }

        return filteredValue;
      }
    }, {
      key: "processData",
      value: function processData(localState) {
        var data = this.props.value;

        if (!this.props.lazy && !this.hasEditingCell()) {
          if (data && data.length) {
            var sortField = localState && localState.sortField || this.getSortField();
            var sortOrder = localState && localState.sortOrder || this.getSortOrder();
            var multiSortMeta = localState && localState.multiSortMeta || this.getMultiSortMeta();

            if (sortField || multiSortMeta && multiSortMeta.length) {
              if (this.props.sortMode === 'single') data = this.sortSingle(data, sortField, sortOrder);else if (this.props.sortMode === 'multiple') data = this.sortMultiple(data, multiSortMeta);
            }

            var localFilters = localState && localState.filters || this.getFilters();

            if (localFilters || this.props.globalFilter) {
              data = this.filterLocal(data, localFilters);
            }
          }
        }

        return data;
      }
    }, {
      key: "isAllSelected",
      value: function isAllSelected() {
        var visibleData = this.hasFilter() ? this.processData() : this.props.value;

        if (this.props.lazy) {
          return this.props.selection && this.props.totalRecords && this.props.selection.length === this.props.totalRecords;
        }

        return this.props.selection && visibleData && visibleData.length && this.props.selection.length === visibleData.length;
      }
    }, {
      key: "getFrozenColumns",
      value: function getFrozenColumns(columns) {
        var frozenColumns = null;

        var _iterator2 = _createForOfIteratorHelper(columns),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var col = _step2.value;

            if (col.props.frozen) {
              frozenColumns = frozenColumns || [];
              frozenColumns.push(col);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return frozenColumns;
      }
    }, {
      key: "getScrollableColumns",
      value: function getScrollableColumns(columns) {
        var scrollableColumns = null;

        var _iterator3 = _createForOfIteratorHelper(columns),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var col = _step3.value;

            if (!col.props.frozen) {
              scrollableColumns = scrollableColumns || [];
              scrollableColumns.push(col);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        return scrollableColumns;
      }
    }, {
      key: "getSelectionModeInColumn",
      value: function getSelectionModeInColumn(columns) {
        if (Array.isArray(columns)) {
          var _iterator4 = _createForOfIteratorHelper(columns),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var col = _step4.value;
              if (col.props.selectionMode) return col.props.selectionMode;
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }

        return null;
      }
    }, {
      key: "createTableHeader",
      value: function createTableHeader(value, columns, columnGroup) {
        return /*#__PURE__*/React__default['default'].createElement(TableHeader, {
          value: value,
          sortMode: this.props.sortMode,
          onSort: this.onSort,
          sortField: this.getSortField(),
          sortOrder: this.getSortOrder(),
          multiSortMeta: this.getMultiSortMeta(),
          columnGroup: columnGroup,
          resizableColumns: this.props.resizableColumns,
          onColumnResizeStart: this.onColumnResizeStart,
          onColumnResizerClick: this.props.onColumnResizerClick,
          onColumnResizerDoubleClick: this.props.onColumnResizerDoubleClick,
          onFilter: this.onFilter,
          filterDelay: this.props.filterDelay,
          onHeaderCheckboxClick: this.onHeaderCheckboxClick,
          headerCheckboxSelected: this.isAllSelected(),
          reorderableColumns: this.props.reorderableColumns,
          onColumnDragStart: this.onColumnDragStart,
          filters: this.getFilters(),
          onColumnDragOver: this.onColumnDragOver,
          onColumnDragLeave: this.onColumnDragLeave,
          onColumnDrop: this.onColumnDrop,
          tabIndex: this.props.tabIndex
        }, columns);
      }
    }, {
      key: "createTableBody",
      value: function createTableBody(value, columns, frozen, selectionModeInColumn) {
        return /*#__PURE__*/React__default['default'].createElement(TableBody, {
          tableId: this.props.id,
          value: value,
          first: this.getFirst(),
          rows: this.getRows(),
          lazy: this.props.lazy,
          paginator: this.props.paginator,
          dataKey: this.props.dataKey,
          compareSelectionBy: this.props.compareSelectionBy,
          selectionMode: this.props.selectionMode,
          selection: this.props.selection,
          metaKeySelection: this.props.metaKeySelection,
          frozen: frozen,
          selectionModeInColumn: selectionModeInColumn,
          onSelectionChange: this.props.onSelectionChange,
          onRowClick: this.props.onRowClick,
          onRowDoubleClick: this.props.onRowDoubleClick,
          onRowSelect: this.props.onRowSelect,
          onRowUnselect: this.props.onRowUnselect,
          contextMenuSelection: this.props.contextMenuSelection,
          onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
          onContextMenu: this.props.onContextMenu,
          expandedRows: this.props.expandedRows,
          onRowToggle: this.props.onRowToggle,
          rowExpansionTemplate: this.props.rowExpansionTemplate,
          selectOnEdit: this.props.selectOnEdit,
          onRowExpand: this.props.onRowExpand,
          onRowCollapse: this.props.onRowCollapse,
          emptyMessage: this.props.emptyMessage,
          virtualScroll: this.props.virtualScroll,
          virtualRowHeight: this.props.virtualRowHeight,
          loading: this.props.loading,
          groupField: this.props.groupField,
          rowGroupMode: this.props.rowGroupMode,
          rowGroupHeaderTemplate: this.props.rowGroupHeaderTemplate,
          rowGroupFooterTemplate: this.props.rowGroupFooterTemplate,
          sortField: this.getSortField(),
          rowClassName: this.props.rowClassName,
          cellClassName: this.props.cellClassName,
          onRowReorder: this.props.onRowReorder,
          editMode: this.props.editMode,
          editingRows: this.props.editingRows,
          rowEditorValidator: this.props.rowEditorValidator,
          onRowEditInit: this.props.onRowEditInit,
          onRowEditSave: this.props.onRowEditSave,
          onRowEditCancel: this.props.onRowEditCancel,
          onRowEditChange: this.props.onRowEditChange,
          expandableRowGroups: this.props.expandableRowGroups,
          showRowReorderElement: this.props.showRowReorderElement,
          showSelectionElement: this.props.showSelectionElement,
          dragSelection: this.props.dragSelection,
          cellSelection: this.props.cellSelection,
          onCellClick: this.props.onCellClick,
          onCellSelect: this.props.onCellSelect,
          onCellUnselect: this.props.onCellUnselect,
          onEditingCellChange: this.onEditingCellChange
        }, columns);
      }
    }, {
      key: "createTableLoadingBody",
      value: function createTableLoadingBody(columns) {
        if (this.props.virtualScroll) {
          return /*#__PURE__*/React__default['default'].createElement(TableLoadingBody, {
            columns: columns,
            rows: this.getRows()
          });
        } else {
          return null;
        }
      }
    }, {
      key: "createTableFooter",
      value: function createTableFooter(columns, columnGroup) {
        if (this.hasFooter()) return /*#__PURE__*/React__default['default'].createElement(TableFooter, {
          columnGroup: columnGroup
        }, columns);else return null;
      }
    }, {
      key: "createScrollableView",
      value: function createScrollableView(value, columns, frozen, headerColumnGroup, footerColumnGroup, totalRecords, selectionModeInColumn) {
        return /*#__PURE__*/React__default['default'].createElement(ScrollableView, {
          columns: columns,
          header: this.createTableHeader(value, columns, headerColumnGroup),
          body: this.createTableBody(value, columns, frozen, selectionModeInColumn),
          loadingBody: this.createTableLoadingBody(columns),
          frozenBody: this.props.frozenValue ? this.createTableBody(this.props.frozenValue, columns, true, selectionModeInColumn) : null,
          footer: this.createTableFooter(columns, footerColumnGroup),
          tableStyle: this.props.tableStyle,
          tableClassName: this.props.tableClassName,
          scrollHeight: this.props.scrollHeight,
          frozen: frozen,
          frozenWidth: this.props.frozenWidth,
          virtualScroll: this.props.virtualScroll,
          virtualRowHeight: this.props.virtualRowHeight,
          rows: this.props.rows,
          totalRecords: totalRecords,
          onVirtualScroll: this.onVirtualScroll,
          loading: this.props.loading
        });
      }
    }, {
      key: "getColumns",
      value: function getColumns() {
        var columns = React__default['default'].Children.toArray(this.props.children);

        if (columns && columns.length) {
          if (this.props.reorderableColumns && this.state.columnOrder) {
            var orderedColumns = [];

            var _iterator5 = _createForOfIteratorHelper(this.state.columnOrder),
                _step5;

            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var columnKey = _step5.value;
                var column = this.findColumnByKey(columns, columnKey);

                if (column) {
                  orderedColumns.push(column);
                }
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }

            return [].concat(orderedColumns, _toConsumableArray(columns.filter(function (item) {
              return orderedColumns.indexOf(item) < 0;
            })));
          } else {
            return columns;
          }
        }

        return null;
      }
    }, {
      key: "findColumnByKey",
      value: function findColumnByKey(columns, key) {
        if (columns && columns.length) {
          for (var i = 0; i < columns.length; i++) {
            var child = columns[i];

            if (child.props.columnKey === key || child.props.field === key) {
              return child;
            }
          }
        }

        return null;
      }
    }, {
      key: "getTotalRecords",
      value: function getTotalRecords(data) {
        return this.props.lazy ? this.props.totalRecords : data ? data.length : 0;
      }
    }, {
      key: "reset",
      value: function reset() {
        var state = {};

        if (!this.props.onPage) {
          state.first = this.props.first;
          state.rows = this.props.rows;
        }

        if (!this.props.onSort) {
          state.sortField = this.props.sortField;
          state.sortOrder = this.props.sortOrder;
          state.multiSortMeta = this.props.multiSortMeta;
        }

        if (!this.props.onFilter) {
          state.filters = this.props.filters;
        }

        this.resetColumnOrder();

        if (Object.keys(state).length) {
          this.setState(state);
        }
      }
    }, {
      key: "resetColumnOrder",
      value: function resetColumnOrder() {
        var columns = React__default['default'].Children.toArray(this.props.children);
        var columnOrder = [];

        var _iterator6 = _createForOfIteratorHelper(columns),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var column = _step6.value;
            columnOrder.push(column.props.columnKey || column.props.field);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }

        this.setState({
          columnOrder: columnOrder
        });
      }
    }, {
      key: "renderLoader",
      value: function renderLoader() {
        var iconClassName = core.classNames('p-datatable-loading-icon pi-spin', this.props.loadingIcon);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React__default['default'].createElement("i", {
          className: iconClassName
        }));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.isStateful() && this.props.resizableColumns) {
          this.restoreColumnWidths();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.isStateful()) {
          this.saveState();
        }

        if (prevProps.globalFilter !== this.props.globalFilter) {
          this.filter(this.props.globalFilter, 'globalFilter', 'contains');
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this9 = this;

        var value = this.processData();
        var columns = this.getColumns();
        var totalRecords = this.getTotalRecords(value);
        var selectionModeInColumn = this.getSelectionModeInColumn(columns);
        var className = core.classNames('p-datatable p-component', {
          'p-datatable-resizable': this.props.resizableColumns,
          'p-datatable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
          'p-datatable-scrollable': this.props.scrollable,
          'p-datatable-virtual-scrollable': this.props.virtualScroll,
          'p-datatable-striped': this.props.stripedRows,
          'p-datatable-gridlines': this.props.showGridlines,
          'p-datatable-auto-layout': this.props.autoLayout,
          'p-datatable-hoverable-rows': this.props.rowHover || this.props.selectionMode || selectionModeInColumn
        }, this.props.className);
        var paginatorTop = this.props.paginator && this.props.paginatorPosition !== 'bottom' && this.createPaginator('top', totalRecords);
        var paginatorBottom = this.props.paginator && this.props.paginatorPosition !== 'top' && this.createPaginator('bottom', totalRecords);
        var headerFacet = this.props.header && /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-header"
        }, this.props.header);
        var footerFacet = this.props.footer && /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-datatable-footer"
        }, this.props.footer);
        var resizeHelper = this.props.resizableColumns && /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            _this9.resizerHelper = el;
          },
          className: "p-column-resizer-helper p-highlight",
          style: {
            display: 'none'
          }
        });
        var tableContent = null;
        var resizeIndicatorUp = this.props.reorderableColumns && /*#__PURE__*/React__default['default'].createElement("span", {
          ref: function ref(el) {
            _this9.reorderIndicatorUp = el;
          },
          className: "pi pi-arrow-down p-datatable-reorder-indicator-up",
          style: {
            position: 'absolute',
            display: 'none'
          }
        });
        var resizeIndicatorDown = this.props.reorderableColumns && /*#__PURE__*/React__default['default'].createElement("span", {
          ref: function ref(el) {
            _this9.reorderIndicatorDown = el;
          },
          className: "pi pi-arrow-up p-datatable-reorder-indicator-down",
          style: {
            position: 'absolute',
            display: 'none'
          }
        });
        var loader;

        if (this.props.loading) {
          loader = this.renderLoader();
        }

        if (Array.isArray(columns)) {
          if (this.props.scrollable) {
            var frozenColumns = this.getFrozenColumns(columns);
            var scrollableColumns = frozenColumns ? this.getScrollableColumns(columns) : columns;
            var frozenView, scrollableView;

            if (frozenColumns) {
              frozenView = this.createScrollableView(value, frozenColumns, true, this.props.frozenHeaderColumnGroup, this.props.frozenFooterColumnGroup, totalRecords, selectionModeInColumn);
            }

            scrollableView = this.createScrollableView(value, scrollableColumns, false, this.props.headerColumnGroup, this.props.footerColumnGroup, totalRecords, selectionModeInColumn);
            tableContent = /*#__PURE__*/React__default['default'].createElement("div", {
              className: "p-datatable-scrollable-wrapper"
            }, frozenView, scrollableView);
          } else {
            var tableHeader = this.createTableHeader(value, columns, this.props.headerColumnGroup);
            var tableBody = this.createTableBody(value, columns, false, selectionModeInColumn);
            var tableFooter = this.createTableFooter(columns, this.props.footerColumnGroup);
            tableContent = /*#__PURE__*/React__default['default'].createElement("div", {
              className: "p-datatable-wrapper"
            }, /*#__PURE__*/React__default['default'].createElement("table", {
              style: this.props.tableStyle,
              role: "grid",
              className: this.props.tableClassName,
              ref: function ref(el) {
                _this9.table = el;
              }
            }, tableHeader, tableFooter, tableBody));
          }
        }

        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style,
          ref: function ref(el) {
            _this9.container = el;
          },
          "data-scrollselectors": ".p-datatable-scrollable-body, .p-datatable-unfrozen-view .p-datatable-scrollable-body"
        }, loader, headerFacet, paginatorTop, tableContent, paginatorBottom, footerFacet, resizeHelper, resizeIndicatorUp, resizeIndicatorDown);
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.rows !== prevState.d_rows && !nextProps.onPage) {
          return {
            rows: nextProps.rows,
            d_rows: nextProps.rows
          };
        }

        return null;
      }
    }]);

    return DataTable;
  }(React.Component);

  _defineProperty(DataTable, "defaultProps", {
    id: null,
    value: null,
    header: null,
    footer: null,
    style: null,
    className: null,
    tableStyle: null,
    tableClassName: null,
    paginator: false,
    paginatorPosition: 'bottom',
    alwaysShowPaginator: true,
    paginatorClassName: null,
    paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    paginatorLeft: null,
    paginatorRight: null,
    paginatorDropdownAppendTo: null,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})',
    first: 0,
    rows: null,
    totalRecords: null,
    lazy: false,
    sortField: null,
    sortOrder: null,
    multiSortMeta: null,
    sortMode: 'single',
    defaultSortOrder: 1,
    removableSort: false,
    emptyMessage: 'No records found',
    selectionMode: null,
    dragSelection: false,
    cellSelection: false,
    selection: null,
    onSelectionChange: null,
    contextMenuSelection: null,
    onContextMenuSelectionChange: null,
    compareSelectionBy: 'deepEquals',
    dataKey: null,
    metaKeySelection: true,
    selectOnEdit: true,
    headerColumnGroup: null,
    footerColumnGroup: null,
    frozenHeaderColumnGroup: null,
    frozenFooterColumnGroup: null,
    rowExpansionTemplate: null,
    expandedRows: null,
    onRowToggle: null,
    resizableColumns: false,
    columnResizeMode: 'fit',
    reorderableColumns: false,
    filters: null,
    globalFilter: null,
    filterDelay: 300,
    filterLocale: undefined,
    scrollable: false,
    scrollHeight: null,
    virtualScroll: false,
    virtualScrollDelay: 150,
    virtualRowHeight: 28,
    frozenWidth: null,
    frozenValue: null,
    csvSeparator: ',',
    exportFilename: 'download',
    rowGroupMode: null,
    autoLayout: false,
    rowClassName: null,
    cellClassName: null,
    rowGroupHeaderTemplate: null,
    rowGroupFooterTemplate: null,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    tabIndex: 0,
    stateKey: null,
    stateStorage: 'session',
    groupField: null,
    editMode: 'cell',
    editingRows: null,
    expandableRowGroups: false,
    rowHover: false,
    showGridlines: false,
    stripedRows: false,
    showSelectionElement: null,
    showRowReorderElement: null,
    onColumnResizeEnd: null,
    onColumnResizerClick: null,
    onColumnResizerDoubleClick: null,
    onSort: null,
    onPage: null,
    onFilter: null,
    onVirtualScroll: null,
    onAllRowsSelect: null,
    onAllRowsUnselect: null,
    onRowClick: null,
    onRowDoubleClick: null,
    onRowSelect: null,
    onRowUnselect: null,
    onRowExpand: null,
    onRowCollapse: null,
    onContextMenu: null,
    onColReorder: null,
    onCellClick: null,
    onCellSelect: null,
    onCellUnselect: null,
    onRowReorder: null,
    onValueChange: null,
    rowEditorValidator: null,
    onRowEditInit: null,
    onRowEditSave: null,
    onRowEditCancel: null,
    onRowEditChange: null,
    exportFunction: null,
    customSaveState: null,
    customRestoreState: null,
    onStateSave: null,
    onStateRestore: null
  });

  exports.DataTable = DataTable;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.paginator, primereact.core, primereact.inputtext));
