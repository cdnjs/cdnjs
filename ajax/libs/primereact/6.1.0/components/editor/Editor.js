"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _quill = _interopRequireDefault(require("quill"));

require("quill/dist/quill.snow.css");

require("quill/dist/quill.bubble.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Editor = /*#__PURE__*/function (_Component) {
  _inherits(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor() {
    _classCallCheck(this, Editor);

    return _super.apply(this, arguments);
  }

  _createClass(Editor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      this.quill = new _quill.default(this.editorElement, {
        modules: _objectSpread({
          toolbar: this.toolbarElement
        }, this.props.modules),
        placeholder: this.props.placeholder,
        readOnly: this.props.readOnly,
        theme: this.props.theme,
        formats: this.props.formats
      });

      if (this.props.value) {
        this.quill.pasteHTML(this.props.value);
      }

      this.quill.on('text-change', function (delta, source) {
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
      this.quill.on('selection-change', function (range, oldRange, source) {
        if (_this.props.onSelectionChange) {
          _this.props.onSelectionChange({
            range: range,
            oldRange: oldRange,
            source: source
          });
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value && this.quill && !this.quill.hasFocus()) {
        if (this.props.value) this.quill.pasteHTML(this.props.value);else this.quill.setText('');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var containerClass = (0, _ClassNames.classNames)('p-component p-editor-container', this.props.className);
      var toolbarHeader = null;

      if (this.props.headerTemplate) {
        toolbarHeader = /*#__PURE__*/_react.default.createElement("div", {
          ref: function ref(el) {
            return _this2.toolbarElement = el;
          },
          className: "p-editor-toolbar"
        }, this.props.headerTemplate);
      } else {
        toolbarHeader = /*#__PURE__*/_react.default.createElement("div", {
          ref: function ref(el) {
            return _this2.toolbarElement = el;
          },
          className: "p-editor-toolbar"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("select", {
          className: "ql-header",
          defaultValue: "0"
        }, /*#__PURE__*/_react.default.createElement("option", {
          value: "1"
        }, "Heading"), /*#__PURE__*/_react.default.createElement("option", {
          value: "2"
        }, "Subheading"), /*#__PURE__*/_react.default.createElement("option", {
          value: "0"
        }, "Normal")), /*#__PURE__*/_react.default.createElement("select", {
          className: "ql-font"
        }, /*#__PURE__*/_react.default.createElement("option", null), /*#__PURE__*/_react.default.createElement("option", {
          value: "serif"
        }), /*#__PURE__*/_react.default.createElement("option", {
          value: "monospace"
        }))), /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-bold",
          "aria-label": "Bold"
        }), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-italic",
          "aria-label": "Italic"
        }), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-underline",
          "aria-label": "Underline"
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("select", {
          className: "ql-color"
        }), /*#__PURE__*/_react.default.createElement("select", {
          className: "ql-background"
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-list",
          value: "ordered",
          "aria-label": "Ordered List"
        }), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-list",
          value: "bullet",
          "aria-label": "Unordered List"
        }), /*#__PURE__*/_react.default.createElement("select", {
          className: "ql-align"
        }, /*#__PURE__*/_react.default.createElement("option", {
          defaultValue: true
        }), /*#__PURE__*/_react.default.createElement("option", {
          value: "center"
        }), /*#__PURE__*/_react.default.createElement("option", {
          value: "right"
        }), /*#__PURE__*/_react.default.createElement("option", {
          value: "justify"
        }))), /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-link",
          "aria-label": "Insert Link"
        }), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-image",
          "aria-label": "Insert Image"
        }), /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-code-block",
          "aria-label": "Insert Code Block"
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: "ql-formats"
        }, /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "ql-clean",
          "aria-label": "Remove Styles"
        })));
      }

      var content = /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this2.editorElement = el;
        },
        className: "p-editor-content",
        style: this.props.style
      });

      return /*#__PURE__*/_react.default.createElement("div", {
        id: this.props.id,
        className: containerClass
      }, toolbarHeader, content);
    }
  }]);

  return Editor;
}(_react.Component);

exports.Editor = Editor;

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
  onSelectionChange: null
});

_defineProperty(Editor, "propTypes", {
  id: _propTypes.default.string,
  value: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  modules: _propTypes.default.object,
  formats: _propTypes.default.array,
  theme: _propTypes.default.string,
  headerTemplate: _propTypes.default.any,
  onTextChange: _propTypes.default.func,
  onSelectionChange: _propTypes.default.func
});