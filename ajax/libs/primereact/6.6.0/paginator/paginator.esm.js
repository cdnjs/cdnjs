import React, { Component } from 'react';
import { classNames, Ripple, ObjectUtils } from 'primereact/core';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

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

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FirstPageLink = /*#__PURE__*/function (_Component) {
  _inherits(FirstPageLink, _Component);

  var _super = _createSuper$8(FirstPageLink);

  function FirstPageLink() {
    _classCallCheck(this, FirstPageLink);

    return _super.apply(this, arguments);
  }

  _createClass(FirstPageLink, [{
    key: "render",
    value: function render() {
      var className = classNames('p-paginator-first p-paginator-element p-link', {
        'p-disabled': this.props.disabled
      });
      var iconClassName = 'p-paginator-icon pi pi-angle-double-left';
      var element = /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: className,
        onClick: this.props.onClick,
        disabled: this.props.disabled
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));

      if (this.props.template) {
        var defaultOptions = {
          onClick: this.props.onClick,
          className: className,
          iconClassName: iconClassName,
          disabled: this.props.disabled,
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return FirstPageLink;
}(Component);

_defineProperty(FirstPageLink, "defaultProps", {
  disabled: false,
  onClick: null,
  template: null
});

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var NextPageLink = /*#__PURE__*/function (_Component) {
  _inherits(NextPageLink, _Component);

  var _super = _createSuper$7(NextPageLink);

  function NextPageLink() {
    _classCallCheck(this, NextPageLink);

    return _super.apply(this, arguments);
  }

  _createClass(NextPageLink, [{
    key: "render",
    value: function render() {
      var className = classNames('p-paginator-next p-paginator-element p-link', {
        'p-disabled': this.props.disabled
      });
      var iconClassName = 'p-paginator-icon pi pi-angle-right';
      var element = /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: className,
        onClick: this.props.onClick,
        disabled: this.props.disabled
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));

      if (this.props.template) {
        var defaultOptions = {
          onClick: this.props.onClick,
          className: className,
          iconClassName: iconClassName,
          disabled: this.props.disabled,
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return NextPageLink;
}(Component);

_defineProperty(NextPageLink, "defaultProps", {
  disabled: false,
  onClick: null,
  template: null
});

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PrevPageLink = /*#__PURE__*/function (_Component) {
  _inherits(PrevPageLink, _Component);

  var _super = _createSuper$6(PrevPageLink);

  function PrevPageLink() {
    _classCallCheck(this, PrevPageLink);

    return _super.apply(this, arguments);
  }

  _createClass(PrevPageLink, [{
    key: "render",
    value: function render() {
      var className = classNames('p-paginator-prev p-paginator-element p-link', {
        'p-disabled': this.props.disabled
      });
      var iconClassName = 'p-paginator-icon pi pi-angle-left';
      var element = /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: className,
        onClick: this.props.onClick,
        disabled: this.props.disabled
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));

      if (this.props.template) {
        var defaultOptions = {
          onClick: this.props.onClick,
          className: className,
          iconClassName: iconClassName,
          disabled: this.props.disabled,
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return PrevPageLink;
}(Component);

_defineProperty(PrevPageLink, "defaultProps", {
  disabled: false,
  onClick: null,
  template: null
});

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var LastPageLink = /*#__PURE__*/function (_Component) {
  _inherits(LastPageLink, _Component);

  var _super = _createSuper$5(LastPageLink);

  function LastPageLink() {
    _classCallCheck(this, LastPageLink);

    return _super.apply(this, arguments);
  }

  _createClass(LastPageLink, [{
    key: "render",
    value: function render() {
      var className = classNames('p-paginator-last p-paginator-element p-link', {
        'p-disabled': this.props.disabled
      });
      var iconClassName = 'p-paginator-icon pi pi-angle-double-right';
      var element = /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: className,
        onClick: this.props.onClick,
        disabled: this.props.disabled
      }, /*#__PURE__*/React.createElement("span", {
        className: iconClassName
      }), /*#__PURE__*/React.createElement(Ripple, null));

      if (this.props.template) {
        var defaultOptions = {
          onClick: this.props.onClick,
          className: className,
          iconClassName: iconClassName,
          disabled: this.props.disabled,
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return LastPageLink;
}(Component);

_defineProperty(LastPageLink, "defaultProps", {
  disabled: false,
  onClick: null,
  template: null
});

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var PageLinks = /*#__PURE__*/function (_Component) {
  _inherits(PageLinks, _Component);

  var _super = _createSuper$4(PageLinks);

  function PageLinks() {
    _classCallCheck(this, PageLinks);

    return _super.apply(this, arguments);
  }

  _createClass(PageLinks, [{
    key: "onPageLinkClick",
    value: function onPageLinkClick(event, pageLink) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          value: pageLink
        });
      }

      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var elements;

      if (this.props.value) {
        var startPageInView = this.props.value[0];
        var endPageInView = this.props.value[this.props.value.length - 1];
        elements = this.props.value.map(function (pageLink, i) {
          var className = classNames('p-paginator-page p-paginator-element p-link', {
            'p-paginator-page-start': pageLink === startPageInView,
            'p-paginator-page-end': pageLink === endPageInView,
            'p-highlight': pageLink - 1 === _this.props.page
          });
          var element = /*#__PURE__*/React.createElement("button", {
            type: "button",
            className: className,
            onClick: function onClick(e) {
              return _this.onPageLinkClick(e, pageLink);
            }
          }, pageLink, /*#__PURE__*/React.createElement(Ripple, null));

          if (_this.props.template) {
            var defaultOptions = {
              onClick: function onClick(e) {
                return _this.onPageLinkClick(e, pageLink);
              },
              className: className,
              view: {
                startPage: startPageInView - 1,
                endPage: endPageInView - 1
              },
              page: pageLink - 1,
              currentPage: _this.props.page,
              totalPages: _this.props.pageCount,
              element: element,
              props: _this.props
            };
            element = ObjectUtils.getJSXElement(_this.props.template, defaultOptions);
          }

          return /*#__PURE__*/React.createElement(React.Fragment, {
            key: pageLink
          }, element);
        });
      }

      return /*#__PURE__*/React.createElement("span", {
        className: "p-paginator-pages"
      }, elements);
    }
  }]);

  return PageLinks;
}(Component);

_defineProperty(PageLinks, "defaultProps", {
  value: null,
  page: null,
  rows: null,
  pageCount: null,
  links: null,
  template: null
});

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RowsPerPageDropdown = /*#__PURE__*/function (_Component) {
  _inherits(RowsPerPageDropdown, _Component);

  var _super = _createSuper$3(RowsPerPageDropdown);

  function RowsPerPageDropdown() {
    _classCallCheck(this, RowsPerPageDropdown);

    return _super.apply(this, arguments);
  }

  _createClass(RowsPerPageDropdown, [{
    key: "hasOptions",
    value: function hasOptions() {
      return this.props.options && this.props.options.length > 0;
    }
  }, {
    key: "render",
    value: function render() {
      var hasOptions = this.hasOptions();
      var options = hasOptions ? this.props.options.map(function (opt) {
        return {
          label: String(opt),
          value: opt
        };
      }) : [];
      var element = hasOptions ? /*#__PURE__*/React.createElement(Dropdown, {
        value: this.props.value,
        options: options,
        onChange: this.props.onChange,
        appendTo: this.props.appendTo,
        disabled: this.props.disabled
      }) : null;

      if (this.props.template) {
        var defaultOptions = {
          value: this.props.value,
          options: options,
          onChange: this.props.onChange,
          appendTo: this.props.appendTo,
          currentPage: this.props.page,
          totalPages: this.props.pageCount,
          totalRecords: this.props.totalRecords,
          disabled: this.props.disabled,
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return RowsPerPageDropdown;
}(Component);

_defineProperty(RowsPerPageDropdown, "defaultProps", {
  options: null,
  value: null,
  page: null,
  pageCount: null,
  totalRecords: 0,
  appendTo: null,
  onChange: null,
  template: null,
  disabled: false
});

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CurrentPageReport = /*#__PURE__*/function (_Component) {
  _inherits(CurrentPageReport, _Component);

  var _super = _createSuper$2(CurrentPageReport);

  function CurrentPageReport() {
    _classCallCheck(this, CurrentPageReport);

    return _super.apply(this, arguments);
  }

  _createClass(CurrentPageReport, [{
    key: "render",
    value: function render() {
      var report = {
        currentPage: this.props.page + 1,
        totalPages: this.props.pageCount,
        first: Math.min(this.props.first + 1, this.props.totalRecords),
        last: Math.min(this.props.first + this.props.rows, this.props.totalRecords),
        rows: this.props.rows,
        totalRecords: this.props.totalRecords
      };
      var text = this.props.reportTemplate.replace("{currentPage}", report.currentPage).replace("{totalPages}", report.totalPages).replace("{first}", report.first).replace("{last}", report.last).replace("{rows}", report.rows).replace("{totalRecords}", report.totalRecords);
      var element = /*#__PURE__*/React.createElement("span", {
        className: "p-paginator-current"
      }, text);

      if (this.props.template) {
        var defaultOptions = _objectSpread(_objectSpread({}, report), {
          className: 'p-paginator-current',
          element: element,
          props: this.props
        });

        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return CurrentPageReport;
}(Component);

_defineProperty(CurrentPageReport, "defaultProps", {
  pageCount: null,
  page: null,
  first: null,
  rows: null,
  totalRecords: null,
  reportTemplate: '({currentPage} of {totalPages})',
  template: null
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var JumpToPageInput = /*#__PURE__*/function (_Component) {
  _inherits(JumpToPageInput, _Component);

  var _super = _createSuper$1(JumpToPageInput);

  function JumpToPageInput(props) {
    var _this;

    _classCallCheck(this, JumpToPageInput);

    _this = _super.call(this, props);
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(JumpToPageInput, [{
    key: "onChange",
    value: function onChange(event) {
      if (this.props.onChange) {
        this.props.onChange(this.props.rows * (event.value - 1), this.props.rows);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.pageCount > 0 ? this.props.page + 1 : 0;
      var element = /*#__PURE__*/React.createElement(InputNumber, {
        value: value,
        onChange: this.onChange,
        className: "p-paginator-page-input",
        disabled: this.props.disabled
      });

      if (this.props.template) {
        var defaultOptions = {
          value: value,
          onChange: this.onChange,
          disabled: this.props.disabled,
          className: 'p-paginator-page-input',
          element: element,
          props: this.props
        };
        return ObjectUtils.getJSXElement(this.props.template, defaultOptions);
      }

      return element;
    }
  }]);

  return JumpToPageInput;
}(Component);

_defineProperty(JumpToPageInput, "defaultProps", {
  page: null,
  rows: null,
  pageCount: null,
  disabled: false,
  template: null,
  onChange: null
});

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Paginator = /*#__PURE__*/function (_Component) {
  _inherits(Paginator, _Component);

  var _super = _createSuper(Paginator);

  function Paginator(props) {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _super.call(this, props);
    _this.changePageToFirst = _this.changePageToFirst.bind(_assertThisInitialized(_this));
    _this.changePageToPrev = _this.changePageToPrev.bind(_assertThisInitialized(_this));
    _this.changePageToNext = _this.changePageToNext.bind(_assertThisInitialized(_this));
    _this.changePageToLast = _this.changePageToLast.bind(_assertThisInitialized(_this));
    _this.onRowsChange = _this.onRowsChange.bind(_assertThisInitialized(_this));
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_this));
    _this.onPageLinkClick = _this.onPageLinkClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Paginator, [{
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.getPage() === 0;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.getPage() === this.getPageCount() - 1;
    }
  }, {
    key: "getPageCount",
    value: function getPageCount() {
      return Math.ceil(this.props.totalRecords / this.props.rows);
    }
  }, {
    key: "calculatePageLinkBoundaries",
    value: function calculatePageLinkBoundaries() {
      var numberOfPages = this.getPageCount();
      var visiblePages = Math.min(this.props.pageLinkSize, numberOfPages); //calculate range, keep current in middle if necessary

      var start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2));
      var end = Math.min(numberOfPages - 1, start + visiblePages - 1); //check when approaching to last page

      var delta = this.props.pageLinkSize - (end - start + 1);
      start = Math.max(0, start - delta);
      return [start, end];
    }
  }, {
    key: "updatePageLinks",
    value: function updatePageLinks() {
      var pageLinks = [];
      var boundaries = this.calculatePageLinkBoundaries();
      var start = boundaries[0];
      var end = boundaries[1];

      for (var i = start; i <= end; i++) {
        pageLinks.push(i + 1);
      }

      return pageLinks;
    }
  }, {
    key: "changePage",
    value: function changePage(first, rows) {
      var pc = this.getPageCount();
      var p = Math.floor(first / rows);

      if (p >= 0 && p < pc) {
        var newPageState = {
          first: first,
          rows: rows,
          page: p,
          pageCount: pc
        };

        if (this.props.onPageChange) {
          this.props.onPageChange(newPageState);
        }
      }
    }
  }, {
    key: "getPage",
    value: function getPage() {
      return Math.floor(this.props.first / this.props.rows);
    }
  }, {
    key: "empty",
    value: function empty() {
      var pageCount = this.getPageCount();
      return pageCount === 0;
    }
  }, {
    key: "changePageToFirst",
    value: function changePageToFirst(event) {
      this.changePage(0, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "changePageToPrev",
    value: function changePageToPrev(event) {
      this.changePage(this.props.first - this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "onPageLinkClick",
    value: function onPageLinkClick(event) {
      this.changePage((event.value - 1) * this.props.rows, this.props.rows);
    }
  }, {
    key: "changePageToNext",
    value: function changePageToNext(event) {
      this.changePage(this.props.first + this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "changePageToLast",
    value: function changePageToLast(event) {
      this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
      event.preventDefault();
    }
  }, {
    key: "onRowsChange",
    value: function onRowsChange(event) {
      var rows = event.value;
      this.isRowChanged = rows !== this.props.rows;
      this.changePage(0, rows);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.rows !== prevProps.rows && !this.isRowChanged) {
        this.changePage(0, this.props.rows);
      } else if (this.getPage() > 0 && prevProps.totalRecords !== this.props.totalRecords && this.props.first >= this.props.totalRecords) {
        this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
      }

      this.isRowChanged = false;
    }
  }, {
    key: "renderElement",
    value: function renderElement(key, template) {
      var element;

      switch (key) {
        case 'FirstPageLink':
          element = /*#__PURE__*/React.createElement(FirstPageLink, {
            key: key,
            onClick: this.changePageToFirst,
            disabled: this.isFirstPage() || this.empty(),
            template: template
          });
          break;

        case 'PrevPageLink':
          element = /*#__PURE__*/React.createElement(PrevPageLink, {
            key: key,
            onClick: this.changePageToPrev,
            disabled: this.isFirstPage() || this.empty(),
            template: template
          });
          break;

        case 'NextPageLink':
          element = /*#__PURE__*/React.createElement(NextPageLink, {
            key: key,
            onClick: this.changePageToNext,
            disabled: this.isLastPage() || this.empty(),
            template: template
          });
          break;

        case 'LastPageLink':
          element = /*#__PURE__*/React.createElement(LastPageLink, {
            key: key,
            onClick: this.changePageToLast,
            disabled: this.isLastPage() || this.empty(),
            template: template
          });
          break;

        case 'PageLinks':
          element = /*#__PURE__*/React.createElement(PageLinks, {
            key: key,
            value: this.updatePageLinks(),
            page: this.getPage(),
            rows: this.props.rows,
            pageCount: this.getPageCount(),
            onClick: this.onPageLinkClick,
            template: template
          });
          break;

        case 'RowsPerPageDropdown':
          element = /*#__PURE__*/React.createElement(RowsPerPageDropdown, {
            key: key,
            value: this.props.rows,
            page: this.getPage(),
            pageCount: this.getPageCount(),
            totalRecords: this.props.totalRecords,
            options: this.props.rowsPerPageOptions,
            onChange: this.onRowsChange,
            appendTo: this.props.dropdownAppendTo,
            template: template,
            disabled: this.empty()
          });
          break;

        case 'CurrentPageReport':
          element = /*#__PURE__*/React.createElement(CurrentPageReport, {
            reportTemplate: this.props.currentPageReportTemplate,
            key: key,
            page: this.getPage(),
            pageCount: this.getPageCount(),
            first: this.props.first,
            rows: this.props.rows,
            totalRecords: this.props.totalRecords,
            template: template
          });
          break;

        case 'JumpToPageInput':
          element = /*#__PURE__*/React.createElement(JumpToPageInput, {
            key: key,
            rows: this.props.rows,
            page: this.getPage(),
            pageCount: this.getPageCount(),
            onChange: this.changePage,
            disabled: this.empty(),
            template: template
          });
          break;

        default:
          element = null;
          break;
      }

      return element;
    }
  }, {
    key: "renderElements",
    value: function renderElements() {
      var _this2 = this;

      var template = this.props.template;

      if (template) {
        if (_typeof(template) === 'object') {
          return template.layout ? template.layout.split(' ').map(function (value) {
            var key = value.trim();
            return _this2.renderElement(key, template[key]);
          }) : Object.entries(template).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                _template = _ref2[1];

            return _this2.renderElement(key, _template);
          });
        }

        return template.split(' ').map(function (value) {
          return _this2.renderElement(value.trim());
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.alwaysShow && this.getPageCount() === 1) {
        return null;
      } else {
        var className = classNames('p-paginator p-component', this.props.className);
        var leftContent = ObjectUtils.getJSXElement(this.props.leftContent, this.props);
        var rightContent = ObjectUtils.getJSXElement(this.props.rightContent, this.props);
        var elements = this.renderElements();
        var leftElement = leftContent && /*#__PURE__*/React.createElement("div", {
          className: "p-paginator-left-content"
        }, leftContent);
        var rightElement = rightContent && /*#__PURE__*/React.createElement("div", {
          className: "p-paginator-right-content"
        }, rightContent);
        return /*#__PURE__*/React.createElement("div", {
          className: className,
          style: this.props.style
        }, leftElement, elements, rightElement);
      }
    }
  }]);

  return Paginator;
}(Component);

_defineProperty(Paginator, "defaultProps", {
  totalRecords: 0,
  rows: 0,
  first: 0,
  pageLinkSize: 5,
  rowsPerPageOptions: null,
  alwaysShow: true,
  style: null,
  className: null,
  template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  onPageChange: null,
  leftContent: null,
  rightContent: null,
  dropdownAppendTo: null,
  currentPageReportTemplate: '({currentPage} of {totalPages})'
});

export { Paginator };
