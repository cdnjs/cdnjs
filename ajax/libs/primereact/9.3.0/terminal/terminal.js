this.primereact = this.primereact || {};
this.primereact.terminal = (function (exports, React, terminalservice, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var TerminalBase = {
    defaultProps: {
      __TYPE: 'Terminal',
      id: null,
      style: null,
      className: null,
      welcomeMessage: null,
      prompt: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, TerminalBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, TerminalBase.defaultProps);
    }
  };

  var Terminal = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = TerminalBase.getProps(inProps);
    var _React$useState = React__namespace.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      commandTextState = _React$useState2[0],
      setCommandTextState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState([]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      commandsState = _React$useState4[0],
      setCommandsState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      indexState = _React$useState6[0],
      setIndexState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(''),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      emittedTextState = _React$useState8[0],
      setEmittedTextState = _React$useState8[1];
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(null);
    var isEmitted = React__namespace.useRef(false);
    var onClick = function onClick() {
      utils.DomHandler.focus(inputRef.current);
    };
    var onInputChange = function onInputChange(e) {
      setCommandTextState(e.target.value);
    };
    var onInputKeyDown = function onInputKeyDown(e) {
      var code = e.which || e.keyCode;
      switch (code) {
        //up
        case 38:
          if (commandsState && commandsState.length) {
            var prevIndex = indexState - 1 < 0 ? commandsState.length - 1 : indexState - 1;
            var command = commandsState[prevIndex];
            setIndexState(prevIndex);
            setCommandTextState(command.text);
          }
          break;

        //enter
        case 13:
          if (!!commandTextState) {
            var newCommands = _toConsumableArray(commandsState);
            newCommands.push({
              text: commandTextState
            });
            setIndexState(function (prevIndex) {
              return prevIndex + 1;
            });
            setCommandTextState('');
            setCommandsState(newCommands);
            setEmittedTextState(commandTextState);
            isEmitted.current = true;
          }
          break;
      }
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      var response = function response(res) {
        if (commandsState && commandsState.length > 0) {
          var commands = _toConsumableArray(commandsState);
          commands[commands.length - 1].response = res;
          setCommandsState(commands);
        }
      };
      var clear = function clear() {
        setCommandsState([]);
        setIndexState(0);
      };
      terminalservice.TerminalService.on('response', response);
      terminalservice.TerminalService.on('clear', clear);
      return function () {
        terminalservice.TerminalService.off('response', response);
        terminalservice.TerminalService.off('clear', clear);
      };
    }, [commandsState]);
    React__namespace.useEffect(function () {
      if (isEmitted.current) {
        terminalservice.TerminalService.emit('command', emittedTextState);
        isEmitted.current = false;
      }
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    });
    var createWelcomeMessage = function createWelcomeMessage() {
      if (props.welcomeMessage) {
        return /*#__PURE__*/React__namespace.createElement("div", null, props.welcomeMessage);
      }
      return null;
    };
    var createCommand = function createCommand(command, index) {
      var text = command.text,
        response = command.response;
      var key = text + '_' + index;
      return /*#__PURE__*/React__namespace.createElement("div", {
        key: key
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-terminal-prompt"
      }, props.prompt, "\xA0"), /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-terminal-command"
      }, text), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-terminal-response"
      }, response));
    };
    var createContent = function createContent() {
      var content = commandsState.map(createCommand);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-terminal-content"
      }, content);
    };
    var createPromptContainer = function createPromptContainer() {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-terminal-prompt-container"
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-terminal-prompt"
      }, props.prompt, "\xA0"), /*#__PURE__*/React__namespace.createElement("input", {
        ref: inputRef,
        type: "text",
        value: commandTextState,
        className: "p-terminal-input",
        autoComplete: "off",
        onChange: onInputChange,
        onKeyDown: onInputKeyDown
      }));
    };
    var otherProps = TerminalBase.getOtherProps(props);
    var className = utils.classNames('p-terminal p-component', props.className);
    var welcomeMessage = createWelcomeMessage();
    var content = createContent();
    var prompt = createPromptContainer();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick
    }), welcomeMessage, content, prompt);
  }));
  Terminal.displayName = 'Terminal';

  exports.Terminal = Terminal;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.terminalservice, primereact.utils);
