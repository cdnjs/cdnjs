this.primereact = this.primereact || {};
this.primereact.editor = (function (exports, React, core) {
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Editor = /*#__PURE__*/function (_Component) {
    _inherits(Editor, _Component);

    var _super = _createSuper(Editor);

    function Editor() {
      _classCallCheck(this, Editor);

      return _super.apply(this, arguments);
    }

    _createClass(Editor, [{
      key: "getQuill",
      value: function getQuill() {
        return this.quill;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this = this;

        import('quill').then(function (module) {
          if (module && module.default) {
            _this.quill = new module.default(_this.editorElement, {
              modules: _objectSpread({
                toolbar: _this.toolbarElement
              }, _this.props.modules),
              placeholder: _this.props.placeholder,
              readOnly: _this.props.readOnly,
              theme: _this.props.theme,
              formats: _this.props.formats
            });

            if (_this.props.value) {
              _this.quill.setContents(_this.quill.clipboard.convert(_this.props.value));
            }

            _this.quill.on('text-change', function (delta, source) {
              var html = _this.editorElement.children[0].innerHTML;

              var text = _this.quill.getText();

              if (html === '<p><br></p>') {
                html = null;
              }

              if (_this.props.onTextChange) {
                _this.props.onTextChange({
                  htmlValue: html,
                  textValue: text,
                  delta: delta,
                  source: source
                });
              }
            });

            _this.quill.on('selection-change', function (range, oldRange, source) {
              if (_this.props.onSelectionChange) {
                _this.props.onSelectionChange({
                  range: range,
                  oldRange: oldRange,
                  source: source
                });
              }
            });
          }
        }).then(function () {
          if (_this.quill && _this.quill.getModule('toolbar')) {
            _this.props.onLoad && _this.props.onLoad(_this.quill);
          }
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value && this.quill && !this.quill.hasFocus()) {
          if (this.props.value) this.quill.setContents(this.quill.clipboard.convert(this.props.value));else this.quill.setText('');
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var containerClass = core.classNames('p-component p-editor-container', this.props.className);
        var toolbarHeader = null;

        if (this.props.headerTemplate) {
          toolbarHeader = /*#__PURE__*/React__default['default'].createElement("div", {
            ref: function ref(el) {
              return _this2.toolbarElement = el;
            },
            className: "p-editor-toolbar"
          }, this.props.headerTemplate);
        } else {
          toolbarHeader = /*#__PURE__*/React__default['default'].createElement("div", {
            ref: function ref(el) {
              return _this2.toolbarElement = el;
            },
            className: "p-editor-toolbar"
          }, /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("select", {
            className: "ql-header",
            defaultValue: "0"
          }, /*#__PURE__*/React__default['default'].createElement("option", {
            value: "1"
          }, "Heading"), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "2"
          }, "Subheading"), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "0"
          }, "Normal")), /*#__PURE__*/React__default['default'].createElement("select", {
            className: "ql-font"
          }, /*#__PURE__*/React__default['default'].createElement("option", null), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "serif"
          }), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "monospace"
          }))), /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-bold",
            "aria-label": "Bold"
          }), /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-italic",
            "aria-label": "Italic"
          }), /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-underline",
            "aria-label": "Underline"
          })), /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("select", {
            className: "ql-color"
          }), /*#__PURE__*/React__default['default'].createElement("select", {
            className: "ql-background"
          })), /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-list",
            value: "ordered",
            "aria-label": "Ordered List"
          }), /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-list",
            value: "bullet",
            "aria-label": "Unordered List"
          }), /*#__PURE__*/React__default['default'].createElement("select", {
            className: "ql-align"
          }, /*#__PURE__*/React__default['default'].createElement("option", {
            defaultValue: true
          }), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "center"
          }), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "right"
          }), /*#__PURE__*/React__default['default'].createElement("option", {
            value: "justify"
          }))), /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-link",
            "aria-label": "Insert Link"
          }), /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-image",
            "aria-label": "Insert Image"
          }), /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-code-block",
            "aria-label": "Insert Code Block"
          })), /*#__PURE__*/React__default['default'].createElement("span", {
            className: "ql-formats"
          }, /*#__PURE__*/React__default['default'].createElement("button", {
            type: "button",
            className: "ql-clean",
            "aria-label": "Remove Styles"
          })));
        }

        var content = /*#__PURE__*/React__default['default'].createElement("div", {
          ref: function ref(el) {
            return _this2.editorElement = el;
          },
          className: "p-editor-content",
          style: this.props.style
        });
        return /*#__PURE__*/React__default['default'].createElement("div", {
          id: this.props.id,
          className: containerClass
        }, toolbarHeader, content);
      }
    }]);

    return Editor;
  }(React.Component);

  _defineProperty(Editor, "defaultProps", {
    id: null,
    value: null,
    style: null,
    className: null,
    placeholder: null,
    readOnly: false,
    modules: null,
    formats: null,
    theme: 'snow',
    headerTemplate: null,
    onTextChange: null,
    onSelectionChange: null,
    onLoad: null
  });

  exports.Editor = Editor;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, React, primereact.core));
