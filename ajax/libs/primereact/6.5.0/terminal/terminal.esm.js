import React, { Component } from 'react';
import { TerminalService } from 'primereact/terminalservice';
import { classNames } from 'primereact/core';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Terminal = /*#__PURE__*/function (_Component) {
  _inherits(Terminal, _Component);

  var _super = _createSuper(Terminal);

  function Terminal(props) {
    var _this;

    _classCallCheck(this, Terminal);

    _this = _super.call(this, props);
    _this.state = {
      commandText: '',
      commands: [],
      index: 0
    };
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
    _this.response = _this.response.bind(_assertThisInitialized(_this));
    _this.clear = _this.clear.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Terminal, [{
    key: "onClick",
    value: function onClick() {
      this.input.focus();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(e) {
      this.setState({
        commandText: e.target.value
      });
    }
  }, {
    key: "onInputKeyDown",
    value: function onInputKeyDown(e) {
      var code = e.which || e.keyCode;
      var commands = this.state.commands;

      switch (code) {
        //up
        case 38:
          if (commands && commands.length) {
            var prevIndex = this.state.index - 1 < 0 ? commands.length - 1 : this.state.index - 1;
            var command = commands[prevIndex];
            this.setState({
              index: prevIndex,
              commandText: command.text
            });
          }

          break;
        //enter

        case 13:
          if (!!this.state.commandText) {
            var newCommands = _toConsumableArray(commands);

            var text = this.state.commandText;
            newCommands.push({
              text: text
            });
            this.setState(function (prevState) {
              return {
                index: prevState.index + 1,
                commandText: '',
                commands: newCommands
              };
            }, function () {
              TerminalService.emit('command', text);
            });
          }

          break;
      }
    }
  }, {
    key: "response",
    value: function response(res) {
      var commands = this.state.commands;

      if (commands && commands.length > 0) {
        var _commands = _toConsumableArray(commands);

        _commands[_commands.length - 1].response = res;
        this.setState({
          commands: _commands
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setState({
        commands: [],
        index: 0
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      TerminalService.on('response', this.response);
      TerminalService.on('clear', this.clear);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      TerminalService.off('response', this.response);
      TerminalService.off('clear', this.clear);
    }
  }, {
    key: "renderWelcomeMessage",
    value: function renderWelcomeMessage() {
      if (this.props.welcomeMessage) {
        return /*#__PURE__*/React.createElement("div", null, this.props.welcomeMessage);
      }

      return null;
    }
  }, {
    key: "renderCommand",
    value: function renderCommand(command, index) {
      var text = command.text,
          response = command.response;
      return /*#__PURE__*/React.createElement("div", {
        key: "".concat(text).concat(index)
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-terminal-prompt"
      }, this.props.prompt, "\xA0"), /*#__PURE__*/React.createElement("span", {
        className: "p-terminal-command"
      }, text), /*#__PURE__*/React.createElement("div", {
        className: "p-terminal-response"
      }, response));
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var commands = this.state.commands.map(function (c, i) {
        return _this2.renderCommand(c, i);
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-terminal-content"
      }, commands);
    }
  }, {
    key: "renderPromptContainer",
    value: function renderPromptContainer() {
      var _this3 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "p-terminal-prompt-container"
      }, /*#__PURE__*/React.createElement("span", {
        className: "p-terminal-prompt"
      }, this.props.prompt, "\xA0"), /*#__PURE__*/React.createElement("input", {
        ref: function ref(el) {
          return _this3.input = el;
        },
        type: "text",
        value: this.state.commandText,
        className: "p-terminal-input",
        autoComplete: "off",
        onChange: this.onInputChange,
        onKeyDown: this.onInputKeyDown
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var className = classNames('p-terminal p-component', this.props.className);
      var welcomeMessage = this.renderWelcomeMessage();
      var content = this.renderContent();
      var prompt = this.renderPromptContainer();
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this4.container = el;
        },
        id: this.props.id,
        className: className,
        style: this.props.style,
        onClick: this.onClick
      }, welcomeMessage, content, prompt);
    }
  }]);

  return Terminal;
}(Component);

_defineProperty(Terminal, "defaultProps", {
  id: null,
  style: null,
  className: null,
  welcomeMessage: null,
  prompt: null
});

export { Terminal };
