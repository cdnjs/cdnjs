'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var factory = function factory(Checkbox) {
  var TableHead = function TableHead(_ref) {
    var model = _ref.model,
        onSelect = _ref.onSelect,
        selectable = _ref.selectable,
        multiSelectable = _ref.multiSelectable,
        selected = _ref.selected,
        theme = _ref.theme;

    var selectCell = void 0;
    var contentCells = Object.keys(model).map(function (key) {
      var name = model[key].title || key;
      return _react2.default.createElement(
        'th',
        { key: key },
        name
      );
    });

    if (selectable && multiSelectable) {
      selectCell = _react2.default.createElement(
        'th',
        { key: 'select', className: theme.selectable },
        _react2.default.createElement(Checkbox, { onChange: onSelect, checked: selected })
      );
    } else if (selectable) {
      selectCell = _react2.default.createElement('th', { key: 'select', className: theme.selectable });
    }
    return _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        [selectCell].concat(_toConsumableArray(contentCells))
      )
    );
  };

  TableHead.propTypes = {
    className: _react.PropTypes.string,
    model: _react.PropTypes.object,
    multiSelectable: _react.PropTypes.bool,
    onSelect: _react.PropTypes.func,
    selectable: _react.PropTypes.bool,
    selected: _react.PropTypes.bool,
    theme: _react.PropTypes.shape({
      selectable: _react.PropTypes.string
    })
  };

  TableHead.defaultProps = {
    className: '',
    model: {},
    selected: false
  };

  return TableHead;
};

exports.default = factory;