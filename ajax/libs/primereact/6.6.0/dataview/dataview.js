this.primereact = this.primereact || {};
this.primereact.dataview = (function (exports, React, paginator, core) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var DataViewLayoutOptions = /*#__PURE__*/function (_Component) {
    _inherits(DataViewLayoutOptions, _Component);

    var _super = _createSuper(DataViewLayoutOptions);

    function DataViewLayoutOptions(props) {
      var _this;

      _classCallCheck(this, DataViewLayoutOptions);

      _this = _super.call(this, props);
      _this.changeLayout = _this.changeLayout.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DataViewLayoutOptions, [{
      key: "changeLayout",
      value: function changeLayout(event, layoutMode) {
        this.props.onChange({
          originalEvent: event,
          value: layoutMode
        });
        event.preventDefault();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var className = core.classNames('p-dataview-layout-options p-selectbutton p-buttonset', this.props.className);
        var buttonListClass = core.classNames('p-button p-button-icon-only', {
          'p-highlight': this.props.layout === 'list'
        });
        var buttonGridClass = core.classNames('p-button p-button-icon-only', {
          'p-highlight': this.props.layout === 'grid'
        });
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          style: this.props.style,
          className: className
        }, /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: buttonListClass,
          onClick: function onClick(event) {
            return _this2.changeLayout(event, 'list');
          }
        }, /*#__PURE__*/React__default['default'].createElement("i", {
          className: "pi pi-bars"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null)), /*#__PURE__*/React__default['default'].createElement("button", {
          type: "button",
          className: buttonGridClass,
          onClick: function onClick(event) {
            return _this2.changeLayout(event, 'grid');
          }
        }, /*#__PURE__*/React__default['default'].createElement("i", {
          className: "pi pi-th-large"
        }), /*#__PURE__*/React__default['default'].createElement(core.Ripple, null)));
      }
    }]);

    return DataViewLayoutOptions;
  }(React.Component);

  _defineProperty(DataViewLayoutOptions, "defaultProps", {
    id: null,
    style: null,
    className: null,
    layout: null,
    onChange: null
  });

  var DataViewItem = /*#__PURE__*/function (_Component2) {
    _inherits(DataViewItem, _Component2);

    var _super2 = _createSuper(DataViewItem);

    function DataViewItem() {
      _classCallCheck(this, DataViewItem);

      return _super2.apply(this, arguments);
    }

    _createClass(DataViewItem, [{
      key: "render",
      value: function render() {
        return this.props.template(this.props.item, this.props.layout);
      }
    }]);

    return DataViewItem;
  }(React.Component);

  _defineProperty(DataViewItem, "defaultProps", {
    template: null,
    item: null,
    layout: null
  });

  var DataView = /*#__PURE__*/function (_Component3) {
    _inherits(DataView, _Component3);

    var _super3 = _createSuper(DataView);

    function DataView(props) {
      var _this3;

      _classCallCheck(this, DataView);

      _this3 = _super3.call(this, props);

      if (!_this3.props.onPage) {
        _this3.state = {
          first: _this3.props.first,
          rows: _this3.props.rows
        };
      }

      _this3.sortChange = false;
      _this3.onPageChange = _this3.onPageChange.bind(_assertThisInitialized(_this3));
      return _this3;
    }

    _createClass(DataView, [{
      key: "getItemRenderKey",
      value: function getItemRenderKey(value) {
        return this.props.dataKey ? core.ObjectUtils.resolveFieldData(value, this.props.dataKey) : null;
      }
    }, {
      key: "getTotalRecords",
      value: function getTotalRecords() {
        if (this.props.totalRecords) return this.props.totalRecords;else return this.props.value ? this.props.value.length : 0;
      }
    }, {
      key: "createPaginator",
      value: function createPaginator(position) {
        var className = core.classNames('p-paginator-' + position, this.props.paginatorClassName);
        var first = this.props.onPage ? this.props.first : this.state.first;
        var rows = this.props.onPage ? this.props.rows : this.state.rows;
        var totalRecords = this.getTotalRecords();
        return /*#__PURE__*/React__default['default'].createElement(paginator.Paginator, {
          first: first,
          rows: rows,
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
      key: "onPageChange",
      value: function onPageChange(event) {
        if (this.props.onPage) {
          this.props.onPage(event);
        } else {
          this.setState({
            first: event.first,
            rows: event.rows
          });
        }
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !this.props.value || this.props.value.length === 0;
      }
    }, {
      key: "sort",
      value: function sort() {
        var _this4 = this;

        if (this.props.value) {
          var value = _toConsumableArray(this.props.value);

          value.sort(function (data1, data2) {
            var value1 = core.ObjectUtils.resolveFieldData(data1, _this4.props.sortField);
            var value2 = core.ObjectUtils.resolveFieldData(data2, _this4.props.sortField);
            var result = null;
            if (value1 == null && value2 != null) result = -1;else if (value1 != null && value2 == null) result = 1;else if (value1 == null && value2 == null) result = 0;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, undefined, {
              numeric: true
            });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
            return _this4.props.sortOrder * result;
          });
          return value;
        } else {
          return null;
        }
      }
    }, {
      key: "renderLoader",
      value: function renderLoader() {
        if (this.props.loading) {
          var iconClassName = core.classNames('p-dataview-loading-icon pi-spin', this.props.loadingIcon);
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-dataview-loading-overlay p-component-overlay"
          }, /*#__PURE__*/React__default['default'].createElement("i", {
            className: iconClassName
          }));
        }

        return null;
      }
    }, {
      key: "renderTopPaginator",
      value: function renderTopPaginator() {
        if (this.props.paginator && (this.props.paginatorPosition !== 'bottom' || this.props.paginatorPosition === 'both')) {
          return this.createPaginator('top');
        }

        return null;
      }
    }, {
      key: "renderBottomPaginator",
      value: function renderBottomPaginator() {
        if (this.props.paginator && (this.props.paginatorPosition !== 'top' || this.props.paginatorPosition === 'both')) {
          return this.createPaginator('bottom');
        }

        return null;
      }
    }, {
      key: "renderEmptyMessage",
      value: function renderEmptyMessage() {
        if (!this.props.loading) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-col-12 col-12 p-dataview-emptymessage"
          }, this.props.emptyMessage);
        }

        return null;
      }
    }, {
      key: "renderHeader",
      value: function renderHeader() {
        if (this.props.header) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-dataview-header"
          }, this.props.header);
        }

        return null;
      }
    }, {
      key: "renderFooter",
      value: function renderFooter() {
        if (this.props.footer) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-dataview-footer"
          }, " ", this.props.footer);
        }

        return null;
      }
    }, {
      key: "renderItems",
      value: function renderItems(value) {
        var _this5 = this;

        if (value && value.length) {
          if (this.props.paginator) {
            var rows = this.props.onPage ? this.props.rows : this.state.rows;
            var first = this.props.lazy ? 0 : this.props.onPage ? this.props.first : this.state.first;
            var totalRecords = this.getTotalRecords();
            var last = Math.min(rows + first, totalRecords);
            var items = [];

            for (var i = first; i < last; i++) {
              var val = value[i];
              val && items.push( /*#__PURE__*/React__default['default'].createElement(DataViewItem, {
                key: this.getItemRenderKey(value) || i,
                template: this.props.itemTemplate,
                layout: this.props.layout,
                item: val
              }));
            }

            return items;
          } else {
            return value.map(function (item, index) {
              return /*#__PURE__*/React__default['default'].createElement(DataViewItem, {
                key: _this5.getItemRenderKey(item) || index,
                template: _this5.props.itemTemplate,
                layout: _this5.props.layout,
                item: item
              });
            });
          }
        } else {
          return this.renderEmptyMessage();
        }
      }
    }, {
      key: "renderContent",
      value: function renderContent(value) {
        var items = this.renderItems(value);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-dataview-content"
        }, /*#__PURE__*/React__default['default'].createElement("div", {
          className: "p-grid p-nogutter grid grid-nogutter"
        }, items));
      }
    }, {
      key: "processData",
      value: function processData() {
        var data = this.props.value;

        if (data && data.length) {
          if (this.props.sortField) {
            data = this.sort();
          }
        }

        return data;
      }
    }, {
      key: "render",
      value: function render() {
        var value = this.processData();
        var className = core.classNames('p-dataview p-component', {
          'p-dataview-list': this.props.layout === 'list',
          'p-dataview-grid': this.props.layout === 'grid',
          'p-dataview-loading': this.props.loading
        }, this.props.className);
        var loader = this.renderLoader();
        var topPaginator = this.renderTopPaginator();
        var bottomPaginator = this.renderBottomPaginator();
        var header = this.renderHeader();
        var footer = this.renderFooter();
        var content = this.renderContent(value);
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          style: this.props.style,
          className: className
        }, loader, header, topPaginator, content, bottomPaginator, footer);
      }
    }]);

    return DataView;
  }(React.Component);

  _defineProperty(DataView, "defaultProps", {
    id: null,
    header: null,
    footer: null,
    value: null,
    layout: 'list',
    dataKey: null,
    rows: null,
    first: 0,
    totalRecords: null,
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
    emptyMessage: 'No records found',
    sortField: null,
    sortOrder: null,
    style: null,
    className: null,
    lazy: false,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    itemTemplate: null,
    onPage: null
  });

  exports.DataView = DataView;
  exports.DataViewLayoutOptions = DataViewLayoutOptions;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.paginator, primereact.core));
