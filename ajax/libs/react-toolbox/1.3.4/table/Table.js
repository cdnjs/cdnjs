'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = exports.tableFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Checkbox = require('../checkbox/Checkbox.js');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _TableHead = require('./TableHead.js');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TableRow = require('./TableRow.js');

var _TableRow2 = _interopRequireDefault(_TableRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(TableHead, TableRow) {
  var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Table);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.handleFullSelect = function () {
        if (_this.props.onSelect) {
          var _this$props = _this.props,
              source = _this$props.source,
              selected = _this$props.selected;

          var newSelected = source.length === selected.length ? [] : source.map(function (i, idx) {
            return idx;
          });
          _this.props.onSelect(newSelected);
        }
      }, _this.handleRowSelect = function (index) {
        if (_this.props.onSelect) {
          var newSelection = [].concat(_toConsumableArray(_this.props.selected));
          if (_this.props.multiSelectable) {
            (function () {
              var position = _this.props.selected.indexOf(index);
              newSelection = position !== -1 ? newSelection.filter(function (el, idx) {
                return idx !== position;
              }) : newSelection.concat([index]);
            })();
          } else {
            newSelection = [index];
          }
          _this.props.onSelect(newSelection);
        }
      }, _this.handleRowChange = function (index, key, value) {
        if (_this.props.onChange) {
          _this.props.onChange(index, key, value);
        }
      }, _this.handleRowClick = function (index, event) {
        if (_this.props.onRowClick) {
          _this.props.onRowClick(index, event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Table, [{
      key: 'renderHead',
      value: function renderHead() {
        if (this.props.heading) {
          var _props = this.props,
              model = _props.model,
              selected = _props.selected,
              source = _props.source,
              selectable = _props.selectable,
              multiSelectable = _props.multiSelectable;

          var isSelected = selected.length === source.length;
          return _react2.default.createElement(TableHead, {
            model: model,
            onSelect: this.handleFullSelect,
            selectable: selectable,
            multiSelectable: multiSelectable,
            selected: isSelected,
            theme: this.props.theme
          });
        }
      }
    }, {
      key: 'renderBody',
      value: function renderBody() {
        var _this2 = this;

        var _props2 = this.props,
            source = _props2.source,
            model = _props2.model,
            onChange = _props2.onChange,
            selectable = _props2.selectable,
            selected = _props2.selected,
            theme = _props2.theme;

        return _react2.default.createElement(
          'tbody',
          null,
          source.map(function (data, index) {
            return _react2.default.createElement(TableRow, {
              data: data,
              index: index,
              key: index,
              model: model,
              onChange: onChange ? _this2.handleRowChange.bind(_this2) : undefined,
              onSelect: _this2.handleRowSelect.bind(_this2, index),
              onRowClick: _this2.handleRowClick.bind(_this2, index),
              selectable: selectable,
              selected: selected.indexOf(index) !== -1,
              theme: theme
            });
          })
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props,
            className = _props3.className,
            theme = _props3.theme;

        return _react2.default.createElement(
          'table',
          { 'data-react-toolbox': 'table', className: (0, _classnames2.default)(theme.table, className) },
          this.renderHead(),
          this.renderBody()
        );
      }
    }]);

    return Table;
  }(_react.Component);

  Table.propTypes = {
    className: _react.PropTypes.string,
    heading: _react.PropTypes.bool,
    model: _react.PropTypes.object,
    multiSelectable: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onRowClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    selectable: _react.PropTypes.bool,
    selected: _react.PropTypes.array,
    source: _react.PropTypes.array,
    theme: _react.PropTypes.shape({
      table: _react.PropTypes.string
    })
  };
  Table.defaultProps = {
    className: '',
    heading: true,
    selectable: true,
    multiSelectable: true,
    selected: [],
    source: []
  };


  return Table;
};

var TableHead = (0, _TableHead2.default)(_Checkbox2.default);
var TableRow = (0, _TableRow2.default)(_Checkbox2.default);
var Table = factory(TableHead, TableRow);

exports.default = (0, _reactCssThemr.themr)(_identifiers.TABLE)(Table);
exports.tableFactory = factory;
exports.Table = Table;