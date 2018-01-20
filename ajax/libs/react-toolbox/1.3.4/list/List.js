'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = exports.listFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _ListItem = require('./ListItem.js');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mergeProp = function mergeProp(propName, child, parent) {
  return child[propName] !== undefined ? child[propName] : parent[propName];
};

var factory = function factory(ListItem) {
  var List = function (_Component) {
    _inherits(List, _Component);

    function List() {
      _classCallCheck(this, List);

      return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
    }

    _createClass(List, [{
      key: 'renderItems',
      value: function renderItems() {
        var _this2 = this;

        return _react2.default.Children.map(this.props.children, function (item) {
          if (item.type === ListItem) {
            var selectable = mergeProp('selectable', item.props, _this2.props);
            var ripple = mergeProp('ripple', item.props, _this2.props);
            return _react2.default.cloneElement(item, { selectable: selectable, ripple: ripple });
          } else {
            return _react2.default.cloneElement(item);
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'ul',
          { 'data-react-toolbox': 'list', className: (0, _classnames2.default)(this.props.theme.list, this.props.className) },
          this.renderItems()
        );
      }
    }]);

    return List;
  }(_react.Component);

  List.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    ripple: _react.PropTypes.bool,
    selectable: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      list: _react.PropTypes.string
    })
  };
  List.defaultProps = {
    className: '',
    ripple: false,
    selectable: false
  };


  return List;
};

var List = factory(_ListItem2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.LIST)(List);
exports.listFactory = factory;
exports.List = List;