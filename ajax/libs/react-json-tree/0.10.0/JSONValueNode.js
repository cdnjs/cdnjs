'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Renders simple values (eg. strings, numbers, booleans, etc)
 */

var JSONValueNode = function JSONValueNode(_ref) {
  var nodeType = _ref.nodeType;
  var styling = _ref.styling;
  var labelRenderer = _ref.labelRenderer;
  var keyPath = _ref.keyPath;
  var valueRenderer = _ref.valueRenderer;
  var value = _ref.value;
  var valueGetter = _ref.valueGetter;
  return _react2['default'].createElement(
    'li',
    styling('value', nodeType, keyPath),
    _react2['default'].createElement(
      'label',
      styling(['label', 'valueLabel'], nodeType, keyPath),
      labelRenderer(keyPath, nodeType, false, false)
    ),
    _react2['default'].createElement(
      'span',
      styling('valueText', nodeType, keyPath),
      valueRenderer.apply(undefined, [valueGetter(value), value].concat(keyPath))
    )
  );
};

JSONValueNode.propTypes = {
  nodeType: _react.PropTypes.string.isRequired,
  styling: _react.PropTypes.func.isRequired,
  labelRenderer: _react.PropTypes.func.isRequired,
  keyPath: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])).isRequired,
  valueRenderer: _react.PropTypes.func.isRequired,
  value: _react.PropTypes.any,
  valueGetter: _react.PropTypes.func
};

JSONValueNode.defaultProps = {
  valueGetter: function valueGetter(value) {
    return value;
  }
};

exports['default'] = JSONValueNode;