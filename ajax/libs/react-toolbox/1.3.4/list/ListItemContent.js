'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemContent = exports.listItemContentFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItemText = require('./ListItemText.js');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var types = ['auto', 'normal', 'large'];

var factory = function factory(ListItemText) {
  var ListItemContent = function (_Component) {
    _inherits(ListItemContent, _Component);

    function ListItemContent() {
      _classCallCheck(this, ListItemContent);

      return _possibleConstructorReturn(this, (ListItemContent.__proto__ || Object.getPrototypeOf(ListItemContent)).apply(this, arguments));
    }

    _createClass(ListItemContent, [{
      key: 'getType',
      value: function getType() {
        var _props = this.props,
            type = _props.type,
            children = _props.children,
            caption = _props.caption,
            legend = _props.legend;


        var count = _react2.default.Children.count(children);
        [caption, legend].forEach(function (s) {
          count += s ? 1 : 0;
        });
        var typeIndex = Math.min(count, types.length);

        return type || types[typeIndex];
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            children = _props2.children,
            caption = _props2.caption,
            legend = _props2.legend,
            theme = _props2.theme;

        var contentType = this.getType();
        var className = (0, _classnames3.default)(theme.itemContentRoot, _defineProperty({}, theme[contentType], theme[contentType]));

        return _react2.default.createElement(
          'span',
          { className: className },
          caption && _react2.default.createElement(
            ListItemText,
            { theme: theme, primary: true },
            caption
          ),
          legend && _react2.default.createElement(
            ListItemText,
            { theme: theme },
            legend
          ),
          children
        );
      }
    }]);

    return ListItemContent;
  }(_react.Component);

  ListItemContent.propTypes = {
    caption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    children: _react.PropTypes.any,
    legend: _react.PropTypes.string,
    theme: _react.PropTypes.shape({
      auto: _react.PropTypes.string,
      itemContentRoot: _react.PropTypes.string,
      large: _react.PropTypes.string,
      normal: _react.PropTypes.string
    }),
    type: _react.PropTypes.oneOf(types)
  };


  return ListItemContent;
};

var ListItemContent = factory(_ListItemText2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(ListItemContent);
exports.listItemContentFactory = factory;
exports.ListItemContent = ListItemContent;