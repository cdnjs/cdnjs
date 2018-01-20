'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = exports.sliderFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _events = require('../utils/events.js');

var _events2 = _interopRequireDefault(_events);

var _utils = require('../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _ProgressBar = require('../progress_bar/ProgressBar.js');

var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

var _Input = require('../input/Input.js');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(ProgressBar, Input) {
  var Slider = function (_Component) {
    _inherits(Slider, _Component);

    function Slider() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Slider);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slider.__proto__ || Object.getPrototypeOf(Slider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        inputFocused: false,
        inputValue: null,
        sliderLength: 0,
        sliderStart: 0
      }, _this.handleInputFocus = function () {
        _this.setState({
          inputFocused: true,
          inputValue: _this.valueForInput(_this.props.value)
        });
      }, _this.handleInputChange = function (value) {
        _this.setState({ inputValue: value });
      }, _this.handleInputBlur = function (event) {
        var value = _this.state.inputValue || 0;
        _this.setState({ inputFocused: false, inputValue: null }, function () {
          _this.props.onChange(_this.trimValue(value), event);
        });
      }, _this.handleKeyDown = function (event) {
        if ([13, 27].indexOf(event.keyCode) !== -1) _this.getInput().blur();
        if (event.keyCode === 38) _this.addToValue(_this.props.step);
        if (event.keyCode === 40) _this.addToValue(-_this.props.step);
      }, _this.handleMouseDown = function (event) {
        if (_this.state.inputFocused) _this.getInput().blur();
        _events2.default.addEventsToDocument(_this.getMouseEventMap());
        _this.start(_events2.default.getMousePosition(event));
        _events2.default.pauseEvent(event);
      }, _this.handleMouseMove = function (event) {
        _events2.default.pauseEvent(event);
        _this.move(_events2.default.getMousePosition(event));
      }, _this.handleMouseUp = function () {
        _this.end(_this.getMouseEventMap());
      }, _this.handleResize = function (event, callback) {
        var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this.refs.progressbar).getBoundingClientRect(),
            left = _ReactDOM$findDOMNode.left,
            right = _ReactDOM$findDOMNode.right;

        var cb = callback || function () {};
        _this.setState({ sliderStart: left, sliderLength: right - left }, cb);
      }, _this.handleSliderBlur = function () {
        _events2.default.removeEventsFromDocument(_this.getKeyboardEvents());
      }, _this.handleSliderFocus = function () {
        _events2.default.addEventsToDocument(_this.getKeyboardEvents());
      }, _this.handleTouchEnd = function () {
        _this.end(_this.getTouchEventMap());
      }, _this.handleTouchMove = function (event) {
        _this.move(_events2.default.getTouchPosition(event));
      }, _this.handleTouchStart = function (event) {
        if (_this.state.inputFocused) _this.getInput().blur();
        _this.start(_events2.default.getTouchPosition(event));
        _events2.default.addEventsToDocument(_this.getTouchEventMap());
        _events2.default.pauseEvent(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Slider, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.state.inputFocused && this.props.value !== nextProps.value) {
          this.setState({ inputValue: this.valueForInput(nextProps.value) });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return this.state.inputFocused || !nextState.inputFocused;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        _events2.default.removeEventsFromDocument(this.getMouseEventMap());
        _events2.default.removeEventsFromDocument(this.getTouchEventMap());
        _events2.default.removeEventsFromDocument(this.getKeyboardEvents());
      }
    }, {
      key: 'addToValue',
      value: function addToValue(increment) {
        var value = this.state.inputFocused ? parseFloat(this.state.inputValue) : this.props.value;
        value = this.trimValue(value + increment);
        if (value !== this.props.value) this.props.onChange(value);
      }
    }, {
      key: 'getInput',
      value: function getInput() {
        return this.refs.input && this.refs.input.getWrappedInstance ? this.refs.input.getWrappedInstance() : this.refs.input;
      }
    }, {
      key: 'getKeyboardEvents',
      value: function getKeyboardEvents() {
        return {
          keydown: this.handleKeyDown
        };
      }
    }, {
      key: 'getMouseEventMap',
      value: function getMouseEventMap() {
        return {
          mousemove: this.handleMouseMove,
          mouseup: this.handleMouseUp
        };
      }
    }, {
      key: 'getTouchEventMap',
      value: function getTouchEventMap() {
        return {
          touchmove: this.handleTouchMove,
          touchend: this.handleTouchEnd
        };
      }
    }, {
      key: 'end',
      value: function end(revents) {
        _events2.default.removeEventsFromDocument(revents);
        this.setState({ pressed: false });
      }
    }, {
      key: 'knobOffset',
      value: function knobOffset() {
        var _props = this.props,
            max = _props.max,
            min = _props.min;

        var translated = this.state.sliderLength * (this.props.value - min) / (max - min);
        return translated * 100 / this.state.sliderLength;
      }
    }, {
      key: 'move',
      value: function move(position) {
        var newValue = this.positionToValue(position);
        if (newValue !== this.props.value) this.props.onChange(newValue);
      }
    }, {
      key: 'positionToValue',
      value: function positionToValue(position) {
        var _state = this.state,
            start = _state.sliderStart,
            length = _state.sliderLength;
        var _props2 = this.props,
            max = _props2.max,
            min = _props2.min,
            step = _props2.step;

        var pos = (position.x - start) / length * (max - min);
        return this.trimValue(Math.round(pos / step) * step + min);
      }
    }, {
      key: 'start',
      value: function start(position) {
        var _this2 = this;

        this.handleResize(null, function () {
          _this2.setState({ pressed: true });
          _this2.props.onChange(_this2.positionToValue(position));
        });
      }
    }, {
      key: 'stepDecimals',
      value: function stepDecimals() {
        return (this.props.step.toString().split('.')[1] || []).length;
      }
    }, {
      key: 'trimValue',
      value: function trimValue(value) {
        if (value < this.props.min) return this.props.min;
        if (value > this.props.max) return this.props.max;
        return _utils2.default.round(value, this.stepDecimals());
      }
    }, {
      key: 'valueForInput',
      value: function valueForInput(value) {
        var decimals = this.stepDecimals();
        return decimals > 0 ? value.toFixed(decimals) : value.toString();
      }
    }, {
      key: 'renderSnaps',
      value: function renderSnaps() {
        var _this3 = this;

        if (this.props.snaps) {
          return _react2.default.createElement(
            'div',
            { ref: 'snaps', className: this.props.theme.snaps },
            _utils2.default.range(0, (this.props.max - this.props.min) / this.props.step).map(function (i) {
              return _react2.default.createElement('div', { key: 'span-' + i, className: _this3.props.theme.snap });
            })
          );
        }
      }
    }, {
      key: 'renderInput',
      value: function renderInput() {
        if (this.props.editable) {
          var value = this.state.inputFocused ? this.state.inputValue : this.valueForInput(this.props.value);
          return _react2.default.createElement(Input, {
            ref: 'input',
            className: this.props.theme.input,
            disabled: this.props.disabled,
            onFocus: this.handleInputFocus,
            onChange: this.handleInputChange,
            onBlur: this.handleInputBlur,
            value: value
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames;

        var theme = this.props.theme;

        var knobStyles = { left: this.knobOffset() + '%' };
        var className = (0, _classnames3.default)(theme.slider, (_classnames = {}, _defineProperty(_classnames, theme.editable, this.props.editable), _defineProperty(_classnames, theme.disabled, this.props.disabled), _defineProperty(_classnames, theme.pinned, this.props.pinned), _defineProperty(_classnames, theme.pressed, this.state.pressed), _defineProperty(_classnames, theme.ring, this.props.value === this.props.min), _classnames), this.props.className);

        return _react2.default.createElement(
          'div',
          {
            className: className,
            disabled: this.props.disabled,
            'data-react-toolbox': 'slider',
            onBlur: this.handleSliderBlur,
            onFocus: this.handleSliderFocus,
            tabIndex: '0'
          },
          _react2.default.createElement(
            'div',
            {
              ref: 'slider',
              className: theme.container,
              onMouseDown: this.handleMouseDown,
              onTouchStart: this.handleTouchStart
            },
            _react2.default.createElement(
              'div',
              {
                ref: 'knob',
                className: theme.knob,
                onMouseDown: this.handleMouseDown,
                onTouchStart: this.handleTouchStart,
                style: knobStyles
              },
              _react2.default.createElement('div', { className: theme.innerknob, 'data-value': parseInt(this.props.value) })
            ),
            _react2.default.createElement(
              'div',
              { className: theme.progress },
              _react2.default.createElement(ProgressBar, {
                disabled: this.props.disabled,
                ref: 'progressbar',
                className: theme.innerprogress,
                max: this.props.max,
                min: this.props.min,
                mode: 'determinate',
                value: this.props.value
              }),
              this.renderSnaps()
            )
          ),
          this.renderInput()
        );
      }
    }]);

    return Slider;
  }(_react.Component);

  Slider.propTypes = {
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    editable: _react.PropTypes.bool,
    max: _react.PropTypes.number,
    min: _react.PropTypes.number,
    onChange: _react.PropTypes.func,
    pinned: _react.PropTypes.bool,
    snaps: _react.PropTypes.bool,
    step: _react.PropTypes.number,
    theme: _react.PropTypes.shape({
      container: _react.PropTypes.string,
      editable: _react.PropTypes.string,
      innerknob: _react.PropTypes.string,
      innerprogress: _react.PropTypes.string,
      input: _react.PropTypes.string,
      knob: _react.PropTypes.string,
      pinned: _react.PropTypes.string,
      pressed: _react.PropTypes.string,
      progress: _react.PropTypes.string,
      ring: _react.PropTypes.string,
      slider: _react.PropTypes.string,
      snap: _react.PropTypes.string,
      snaps: _react.PropTypes.string
    }),
    value: _react.PropTypes.number
  };
  Slider.defaultProps = {
    className: '',
    editable: false,
    max: 100,
    min: 0,
    pinned: false,
    snaps: false,
    step: 0.01,
    value: 0
  };


  return Slider;
};

var Slider = factory(_ProgressBar2.default, _Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.SLIDER)(Slider);
exports.sliderFactory = factory;
exports.Slider = Slider;