'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var JSONArrow = function JSONArrow(_ref) {
  var styling = _ref.styling;
  var arrowStyle = _ref.arrowStyle;
  var expanded = _ref.expanded;
  var nodeType = _ref.nodeType;
  var onClick = _ref.onClick;
  return _react2['default'].createElement(
    'div',
    (0, _extends3['default'])({}, styling('arrowContainer', arrowStyle), {
      onClick: onClick
    }),
    _react2['default'].createElement(
      'div',
      styling(['arrow', 'arrowSign'], nodeType, expanded, arrowStyle),
      '▶',
      arrowStyle === 'double' && _react2['default'].createElement(
        'div',
        styling(['arrowSign', 'arrowSignInner']),
        '▶'
      )
    )
  );
};

JSONArrow.propTypes = {
  styling: _react.PropTypes.func.isRequired,
  arrowStyle: _react.PropTypes.oneOf(['single', 'double']),
  expanded: _react.PropTypes.bool.isRequired,
  nodeType: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired
};

JSONArrow.defaultProps = {
  arrowStyle: 'single'
};

exports['default'] = JSONArrow;