'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Checkbox) {
  var TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    function TableRow() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, TableRow);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call.apply(_ref, [this].concat(args))), _this), _this.handleInputChange = function (index, key, type, event) {
        var value = void 0;
        switch (type) {
          case 'checkbox':
            value = event.target.checked;
            break;
          // Handle contentEditable
          case 'text':
            value = event.target.textContent;
            break;
          default:
            value = event.target.value;
            break;
        }

        var onChange = _this.props.model[key].onChange || _this.props.onChange;
        onChange(index, key, value);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TableRow, [{
      key: 'renderSelectCell',
      value: function renderSelectCell() {
        if (this.props.selectable) {
          return _react2.default.createElement(
            'td',
            { className: this.props.theme.selectable },
            _react2.default.createElement(Checkbox, { checked: this.props.selected, onChange: this.props.onSelect })
          );
        }
      }
    }, {
      key: 'renderCells',
      value: function renderCells() {
        var _this2 = this;

        return Object.keys(this.props.model).map(function (key) {
          return _react2.default.createElement(
            'td',
            { key: key, onClick: _this2.props.onRowClick },
            _this2.renderCell(key)
          );
        });
      }
    }, {
      key: 'renderCell',
      value: function renderCell(key) {
        var value = this.props.data[key];

        // if the value is a valid React element return it directly, since it
        // cannot be edited and should not be converted to a string...
        if (_react2.default.isValidElement(value)) {
          return value;
        }

        var onChange = this.props.model[key].onChange || this.props.onChange;
        if (onChange) {
          return this.renderInput(key, value);
        } else if (value) {
          return value.toString();
        }
      }
    }, {
      key: 'renderInput',
      value: function renderInput(key, value) {
        var index = this.props.index;
        var inputType = _utils2.default.inputTypeForPrototype(this.props.model[key].type);
        var inputValue = _utils2.default.prepareValueForInput(value, inputType);
        var checked = inputType === 'checkbox' && value ? true : null;

        if (inputType === 'text') {
          return _react2.default.createElement('div', {
            children: inputValue,
            contentEditable: true,
            suppressContentEditableWarning: true,
            onInput: this.handleInputChange.bind(null, index, key, inputType)
          });
        }

        return _react2.default.createElement('input', {
          checked: checked,
          onChange: this.handleInputChange.bind(null, index, key, inputType),
          type: inputType,
          value: inputValue
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames;

        var className = (0, _classnames3.default)(this.props.theme.row, (_classnames = {}, _defineProperty(_classnames, this.props.theme.editable, this.props.onChange), _defineProperty(_classnames, this.props.theme.selected, this.props.selected), _classnames));

        return _react2.default.createElement(
          'tr',
          { 'data-react-toolbox-table': 'row', className: className },
          this.renderSelectCell(),
          this.renderCells()
        );
      }
    }]);

    return TableRow;
  }(_react.Component);

  TableRow.propTypes = {
    data: _react.PropTypes.object,
    index: _react.PropTypes.number,
    model: _react.PropTypes.object,
    onChange: _react.PropTypes.func,
    onRowClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    selectable: _react.PropTypes.bool,
    selected: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      editable: _react.PropTypes.string,
      row: _react.PropTypes.string,
      selectable: _react.PropTypes.string,
      selected: _react.PropTypes.string
    })
  };


  return TableRow;
};

exports.default = factory;