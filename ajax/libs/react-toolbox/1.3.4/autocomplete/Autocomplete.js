'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Autocomplete = exports.autocompleteFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _Chip = require('../chip/Chip.js');

var _Chip2 = _interopRequireDefault(_Chip);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var POSITION = {
  AUTO: 'auto',
  DOWN: 'down',
  UP: 'up'
};

var factory = function factory(Chip, Input) {
  var Autocomplete = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Autocomplete);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        direction: _this.props.direction,
        focus: false,
        showAllSuggestions: _this.props.showSuggestionsWhenValueIsSet,
        query: _this.query(_this.props.value),
        isValueAnObject: false
      }, _this.handleChange = function (values, event) {
        var value = _this.props.multiple ? values : values[0];
        var showAllSuggestions = _this.props.showSuggestionsWhenValueIsSet;

        var query = _this.query(value);
        if (_this.props.onChange) _this.props.onChange(value, event);
        if (_this.props.keepFocusOnChange) {
          _this.setState({ query: query, showAllSuggestions: showAllSuggestions });
        } else {
          _this.setState({ focus: false, query: query, showAllSuggestions: showAllSuggestions }, function () {
            _reactDom2.default.findDOMNode(_this).querySelector('input').blur();
          });
        }
      }, _this.handleMouseDown = function (event) {
        _this.selectOrCreateActiveItem(event);
      }, _this.handleQueryBlur = function (event) {
        if (_this.state.focus) _this.setState({ focus: false });
        if (_this.props.onBlur) _this.props.onBlur(event, _this.state.active);
      }, _this.handleQueryChange = function (value) {
        if (_this.props.onQueryChange) _this.props.onQueryChange(value);
        _this.setState({ query: value, showAllSuggestions: false, active: null });
      }, _this.handleQueryFocus = function (event) {
        _this.suggestionsNode.scrollTop = 0;
        _this.setState({ active: '', focus: true });
        if (_this.props.onFocus) _this.props.onFocus(event);
      }, _this.handleQueryKeyDown = function (event) {
        // Clear query when pressing backspace and showing all suggestions.
        var shouldClearQuery = event.which === 8 && _this.props.showSuggestionsWhenValueIsSet && _this.state.showAllSuggestions;
        if (shouldClearQuery) {
          _this.setState({ query: '' });
        }

        if (event.which === 13) {
          _this.selectOrCreateActiveItem(event);
        }
      }, _this.handleQueryKeyUp = function (event) {
        if (event.which === 27) _reactDom2.default.findDOMNode(_this).querySelector('input').blur();

        if ([40, 38].indexOf(event.which) !== -1) {
          var suggestionsKeys = [].concat(_toConsumableArray(_this.suggestions().keys()));
          var index = suggestionsKeys.indexOf(_this.state.active) + (event.which === 40 ? +1 : -1);
          if (index < 0) index = suggestionsKeys.length - 1;
          if (index >= suggestionsKeys.length) index = 0;
          _this.setState({ active: suggestionsKeys[index] });
        }
      }, _this.handleSuggestionHover = function (event) {
        _this.setState({ active: event.target.id });
      }, _this.select = function (event, target) {
        _events2.default.pauseEvent(event);
        var values = _this.values(_this.props.value);
        var source = _this.source();
        var newValue = target === void 0 ? event.target.id : target;

        if (_this.isValueAnObject()) {
          var newItem = Array.from(source).reduce(function (obj, _ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                k = _ref3[0],
                value = _ref3[1];

            if (k === newValue) {
              obj[k] = value;
            }
            return obj;
          }, {});

          return _this.handleChange(Object.assign(_this.mapToObject(values), newItem), event);
        }

        _this.handleChange([newValue].concat(_toConsumableArray(values.keys())), event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Autocomplete, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.multiple) {
          this.setState({
            query: this.query(nextProps.value)
          });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        if (!this.state.focus && nextState.focus && this.props.direction === POSITION.AUTO) {
          var direction = this.calculateDirection();
          if (this.state.direction !== direction) {
            this.setState({ direction: direction });
          }
        }
        return true;
      }
    }, {
      key: 'calculateDirection',
      value: function calculateDirection() {
        if (this.props.direction === 'auto') {
          var client = _reactDom2.default.findDOMNode(this.inputNode).getBoundingClientRect();
          var screen_height = window.innerHeight || document.documentElement.offsetHeight;
          var up = client.top > screen_height / 2 + client.height;
          return up ? 'up' : 'down';
        } else {
          return this.props.direction;
        }
      }
    }, {
      key: 'query',
      value: function query(key) {
        var query_value = '';
        if (!this.props.multiple && key) {
          var source_value = this.source().get('' + key);
          query_value = source_value ? source_value : key;
        }
        return query_value;
      }
    }, {
      key: 'selectOrCreateActiveItem',
      value: function selectOrCreateActiveItem(event) {
        var target = this.state.active;
        if (!target) {
          target = this.props.allowCreate ? this.state.query : [].concat(_toConsumableArray(this.suggestions().keys()))[0];
          this.setState({ active: target });
        }
        this.select(event, target);
      }
    }, {
      key: 'suggestions',
      value: function suggestions() {
        var suggest = new Map();
        var rawQuery = this.state.query || (this.props.multiple ? '' : this.props.value);
        var query = ('' + rawQuery).toLowerCase().trim();
        var values = this.values();
        var source = this.source();

        // Suggest any non-set value which matches the query
        if (this.props.multiple) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = _slicedToArray(_step.value, 2),
                  key = _step$value[0],
                  value = _step$value[1];

              if (!values.has(key) && this.matches(value.toLowerCase().trim(), query)) {
                suggest.set(key, value);
              }
            }

            // When multiple is false, suggest any value which matches the query if showAllSuggestions is false
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else if (query && !this.state.showAllSuggestions) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = source[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  key = _step2$value[0],
                  value = _step2$value[1];

              if (this.matches(value.toLowerCase().trim(), query)) {
                suggest.set(key, value);
              }
            }

            // When multiple is false, suggest all values when showAllSuggestions is true
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          suggest = source;
        }

        return suggest;
      }
    }, {
      key: 'matches',
      value: function matches(value, query) {
        var suggestionMatch = this.props.suggestionMatch;


        if (suggestionMatch === 'start') {
          return value.startsWith(query);
        } else if (suggestionMatch === 'anywhere') {
          return value.includes(query);
        } else if (suggestionMatch === 'word') {
          var re = new RegExp('\\b' + query, 'g');
          return re.test(value);
        }

        return false;
      }
    }, {
      key: 'source',
      value: function source() {
        var src = this.props.source;

        if (src.hasOwnProperty('length')) {
          return new Map(src.map(function (item) {
            return Array.isArray(item) ? [].concat(_toConsumableArray(item)) : [item, item];
          }));
        } else {
          return new Map(Object.keys(src).map(function (key) {
            return ['' + key, src[key]];
          }));
        }
      }
    }, {
      key: 'values',
      value: function values() {
        var vals = this.props.multiple ? this.props.value : [this.props.value];

        if (!vals) vals = [];

        if (this.props.showSelectedWhenNotInSource && this.isValueAnObject()) {
          return new Map(Object.entries(vals));
        }

        var valueMap = new Map();

        var stringVals = vals.map(function (v) {
          return '' + v;
        });
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = this.source()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2),
                k = _step3$value[0],
                v = _step3$value[1];

            if (stringVals.indexOf(k) !== -1) valueMap.set(k, v);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return valueMap;
      }
    }, {
      key: 'unselect',
      value: function unselect(key, event) {
        if (!this.props.disabled) {
          var values = this.values(this.props.value);

          values.delete(key);

          if (this.isValueAnObject()) {
            return this.handleChange(this.mapToObject(values), event);
          }

          this.handleChange([].concat(_toConsumableArray(values.keys())), event);
        }
      }
    }, {
      key: 'isValueAnObject',
      value: function isValueAnObject() {
        return !Array.isArray(this.props.value) && _typeof(this.props.value) === 'object';
      }
    }, {
      key: 'mapToObject',
      value: function mapToObject(map) {
        return Array.from(map).reduce(function (obj, _ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              k = _ref5[0],
              value = _ref5[1];

          obj[k] = value;
          return obj;
        }, {});
      }
    }, {
      key: 'renderSelected',
      value: function renderSelected() {
        var _this2 = this;

        if (this.props.multiple) {
          var selectedItems = [].concat(_toConsumableArray(this.values())).map(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                key = _ref7[0],
                value = _ref7[1];

            return _react2.default.createElement(
              Chip,
              {
                key: key,
                className: _this2.props.theme.value,
                deletable: true,
                onDeleteClick: _this2.unselect.bind(_this2, key)
              },
              value
            );
          });

          return _react2.default.createElement(
            'ul',
            { className: this.props.theme.values },
            selectedItems
          );
        }
      }
    }, {
      key: 'renderSuggestions',
      value: function renderSuggestions() {
        var _this3 = this;

        var theme = this.props.theme;

        var suggestions = [].concat(_toConsumableArray(this.suggestions())).map(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              key = _ref9[0],
              value = _ref9[1];

          var className = (0, _classnames5.default)(theme.suggestion, _defineProperty({}, theme.active, _this3.state.active === key));
          return _react2.default.createElement(
            'li',
            {
              id: key,
              key: key,
              className: className,
              onMouseDown: _this3.handleMouseDown,
              onMouseOver: _this3.handleSuggestionHover
            },
            value
          );
        });

        return _react2.default.createElement(
          'ul',
          {
            className: (0, _classnames5.default)(theme.suggestions, _defineProperty({}, theme.up, this.state.direction === 'up')),
            ref: function ref(node) {
              _this3.suggestionsNode = node;
            }
          },
          suggestions
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        var _props = this.props,
            allowCreate = _props.allowCreate,
            error = _props.error,
            label = _props.label,
            source = _props.source,
            suggestionMatch = _props.suggestionMatch,
            selectedPosition = _props.selectedPosition,
            keepFocusOnChange = _props.keepFocusOnChange,
            showSuggestionsWhenValueIsSet = _props.showSuggestionsWhenValueIsSet,
            showSelectedWhenNotInSource = _props.showSelectedWhenNotInSource,
            onQueryChange = _props.onQueryChange,
            theme = _props.theme,
            other = _objectWithoutProperties(_props, ['allowCreate', 'error', 'label', 'source', 'suggestionMatch', 'selectedPosition', 'keepFocusOnChange', 'showSuggestionsWhenValueIsSet', 'showSelectedWhenNotInSource', 'onQueryChange', 'theme']);

        var className = (0, _classnames5.default)(theme.autocomplete, _defineProperty({}, theme.focus, this.state.focus), this.props.className);

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'autocomplete', className: className },
          this.props.selectedPosition === 'above' ? this.renderSelected() : null,
          _react2.default.createElement(Input, _extends({}, other, {
            ref: function ref(node) {
              _this4.inputNode = node;
            },
            autoComplete: 'off',
            className: theme.input,
            error: error,
            label: label,
            onBlur: this.handleQueryBlur,
            onChange: this.handleQueryChange,
            onFocus: this.handleQueryFocus,
            onKeyDown: this.handleQueryKeyDown,
            onKeyUp: this.handleQueryKeyUp,
            theme: theme,
            themeNamespace: 'input',
            value: this.state.query
          })),
          this.renderSuggestions(),
          this.props.selectedPosition === 'below' ? this.renderSelected() : null
        );
      }
    }]);

    return Autocomplete;
  }(_react.Component);

  Autocomplete.propTypes = {
    allowCreate: _react.PropTypes.bool,
    className: _react.PropTypes.string,
    direction: _react.PropTypes.oneOf(['auto', 'up', 'down']),
    disabled: _react.PropTypes.bool,
    error: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]),
    keepFocusOnChange: _react.PropTypes.bool,
    label: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]),
    multiple: _react.PropTypes.bool,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onQueryChange: _react.PropTypes.func,
    selectedPosition: _react.PropTypes.oneOf(['above', 'below', 'none']),
    showSelectedWhenNotInSource: _react.PropTypes.bool,
    showSuggestionsWhenValueIsSet: _react.PropTypes.bool,
    source: _react.PropTypes.any,
    suggestionMatch: _react.PropTypes.oneOf(['start', 'anywhere', 'word']),
    theme: _react.PropTypes.shape({
      active: _react.PropTypes.string,
      autocomplete: _react.PropTypes.string,
      focus: _react.PropTypes.string,
      input: _react.PropTypes.string,
      suggestion: _react.PropTypes.string,
      suggestions: _react.PropTypes.string,
      up: _react.PropTypes.string,
      value: _react.PropTypes.string,
      values: _react.PropTypes.string
    }),
    value: _react.PropTypes.any
  };
  Autocomplete.defaultProps = {
    allowCreate: false,
    className: '',
    direction: 'auto',
    keepFocusOnChange: false,
    multiple: true,
    selectedPosition: 'above',
    showSelectedWhenNotInSource: false,
    showSuggestionsWhenValueIsSet: false,
    source: {},
    suggestionMatch: 'start'
  };


  return Autocomplete;
};

var Autocomplete = factory(_Chip2.default, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.AUTOCOMPLETE)(Autocomplete);
exports.autocompleteFactory = factory;
exports.Autocomplete = Autocomplete;