this.primereact = this.primereact || {};
this.primereact.datascroller = (function (exports, React, core) {
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
  var DataScroller = /*#__PURE__*/function (_Component) {
    _inherits(DataScroller, _Component);

    var _super = _createSuper(DataScroller);

    function DataScroller(props) {
      var _this;

      _classCallCheck(this, DataScroller);

      _this = _super.call(this, props);
      _this.state = {};
      _this.dataToRender = [];
      _this.value = _this.props.value;
      _this.first = 0;
      return _this;
    }

    _createClass(DataScroller, [{
      key: "handleDataChange",
      value: function handleDataChange() {
        if (this.props.lazy) {
          this.dataToRender = this.value;
          this.setState({
            dataToRender: this.dataToRender
          });
        } else {
          this.load();
        }
      }
    }, {
      key: "load",
      value: function load() {
        if (this.props.lazy) {
          if (this.props.onLazyLoad) {
            this.props.onLazyLoad(this.createLazyLoadMetadata());
          }

          this.first = this.first + this.props.rows;
        } else {
          if (this.value) {
            for (var i = this.first; i < this.first + this.props.rows; i++) {
              if (i >= this.value.length) {
                break;
              }

              this.dataToRender.push(this.value[i]);
            }

            if (this.value.length !== 0) {
              this.first = this.first + this.props.rows;
            }

            this.setState({
              dataToRender: this.dataToRender
            });
          }
        }
      }
    }, {
      key: "reset",
      value: function reset() {
        this.first = 0;
        this.dataToRender = [];
        this.setState({
          dataToRender: this.dataToRender
        });
        this.load();
      }
    }, {
      key: "isEmpty",
      value: function isEmpty() {
        return !this.dataToRender || this.dataToRender.length === 0;
      }
    }, {
      key: "createLazyLoadMetadata",
      value: function createLazyLoadMetadata() {
        return {
          first: this.first,
          rows: this.props.rows
        };
      }
    }, {
      key: "bindScrollListener",
      value: function bindScrollListener() {
        var _this2 = this;

        if (this.props.inline) {
          this.scrollFunction = function () {
            var scrollTop = _this2.contentElement.scrollTop,
                scrollHeight = _this2.contentElement.scrollHeight,
                viewportHeight = _this2.contentElement.clientHeight;

            if (scrollTop >= scrollHeight * _this2.props.buffer - viewportHeight) {
              _this2.load();
            }
          };

          this.contentElement.addEventListener('scroll', this.scrollFunction);
        } else {
          this.scrollFunction = function () {
            var docBody = document.body,
                docElement = document.documentElement,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                winHeight = docElement.clientHeight,
                docHeight = Math.max(docBody.scrollHeight, docBody.offsetHeight, winHeight, docElement.scrollHeight, docElement.offsetHeight);

            if (scrollTop >= docHeight * _this2.props.buffer - winHeight) {
              _this2.load();
            }
          };

          window.addEventListener('scroll', this.scrollFunction);
        }
      }
    }, {
      key: "unbindScrollListener",
      value: function unbindScrollListener() {
        if (this.scrollFunction) {
          if (this.props.inline) {
            this.contentElement.removeEventListener('scroll', this.scrollFunction);
            this.contentElement = null;
          } else if (!this.props.loader) {
            window.removeEventListener('scroll', this.scrollFunction);
          }
        }

        this.scrollFunction = null;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.load();

        if (!this.props.loader) {
          this.bindScrollListener();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var newValue = this.props.value;

        if (newValue && this.value !== newValue) {
          this.value = newValue;
          this.first = 0;
          this.dataToRender = [];
          this.handleDataChange();
        }

        if (prevProps.loader !== this.props.loader && this.props.loader) {
          this.unbindScrollListener();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.scrollFunction) {
          this.unbindScrollListener();
        }
      }
    }, {
      key: "renderHeader",
      value: function renderHeader() {
        if (this.props.header) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-datascroller-header"
          }, this.props.header);
        }

        return null;
      }
    }, {
      key: "renderFooter",
      value: function renderFooter() {
        if (this.props.footer) {
          return /*#__PURE__*/React__default['default'].createElement("div", {
            className: "p-datascroller-footer"
          }, this.props.footer);
        }

        return null;
      }
    }, {
      key: "renderItem",
      value: function renderItem(value, index) {
        var content = this.props.itemTemplate ? this.props.itemTemplate(value) : value;
        return /*#__PURE__*/React__default['default'].createElement("li", {
          key: index + '_datascrollitem'
        }, content);
      }
    }, {
      key: "renderEmptyMessage",
      value: function renderEmptyMessage() {
        var content = core.ObjectUtils.getJSXElement(this.props.emptyMessage, this.props);
        return /*#__PURE__*/React__default['default'].createElement("li", null, content);
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this3 = this;

        var content = this.state.dataToRender && this.state.dataToRender.length ? this.state.dataToRender.map(function (val, i) {
          return _this3.renderItem(val, i);
        }) : this.renderEmptyMessage();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this3.contentElement = el;
          },
          className: "p-datascroller-content",
          style: {
            'maxHeight': this.props.scrollHeight
          }
        }, /*#__PURE__*/React__default['default'].createElement("ul", {
          className: "p-datascroller-list"
        }, content));
      }
    }, {
      key: "render",
      value: function render() {
        var className = core.classNames('p-datascroller p-component', this.props.className, {
          'p-datascroller-inline': this.props.inline
        });
        var header = this.renderHeader();
        var footer = this.renderFooter();
        var content = this.renderContent();
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: className
        }, header, content, footer);
      }
    }]);

    return DataScroller;
  }(React.Component);

  _defineProperty(DataScroller, "defaultProps", {
    id: null,
    value: null,
    rows: 0,
    inline: false,
    scrollHeight: null,
    loader: false,
    buffer: 0.9,
    style: null,
    className: null,
    onLazyLoad: null,
    emptyMessage: 'No records found',
    itemTemplate: null,
    header: null,
    footer: null,
    lazy: false
  });

  exports.DataScroller = DataScroller;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
