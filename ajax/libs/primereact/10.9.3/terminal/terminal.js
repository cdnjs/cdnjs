this.primereact = this.primereact || {};
this.primereact.terminal = (function (exports, React, api, componentbase, hooks, terminalservice, utils) {
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

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var classes = {
    root: 'p-terminal p-component',
    content: 'p-terminal-content',
    container: 'p-terminal-prompt-container',
    command: 'p-terminal-command',
    commandText: 'p-terminal-input',
    prompt: 'p-terminal-prompt',
    response: 'p-terminal-response'
  };
  var styles = "\n@layer primereact {\n    .p-terminal {\n        height: 18rem;\n        overflow: auto;\n    }\n    \n    .p-terminal-prompt-container {\n        display: flex;\n        align-items: center;\n    }\n    \n    .p-terminal-input {\n        flex: 1 1 auto;\n        border: 0 none;\n        background-color: transparent;\n        color: inherit;\n        padding: 0;\n        outline: 0 none;\n    }\n    \n    .p-terminal-input::-ms-clear {\n        display: none;\n    }        \n}\n";
  var TerminalBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Terminal',
      id: null,
      style: null,
      className: null,
      welcomeMessage: null,
      prompt: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  var Terminal = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TerminalBase.getProps(inProps, context);
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
    var _TerminalBase$setMeta = TerminalBase.setMetaData({
        props: props,
        state: {
          commandText: commandTextState,
          commands: commandsState
        }
      }),
      ptm = _TerminalBase$setMeta.ptm,
      cx = _TerminalBase$setMeta.cx,
      isUnstyled = _TerminalBase$setMeta.isUnstyled;
    componentbase.useHandleStyle(TerminalBase.css.styles, isUnstyled, {
      name: 'terminal'
    });
    var promptProps = mergeProps({
      className: cx('prompt')
    }, ptm('prompt'));
    var onClick = function onClick() {
      utils.DomHandler.focus(inputRef.current);
    };
    var onInputChange = function onInputChange(e) {
      setCommandTextState(e.target.value);
    };
    var onKeyDown = function onKeyDown(event) {
      switch (event.code) {
        case 'ArrowUp':
          if (commandsState && commandsState.length) {
            var prevIndex = indexState - 1 < 0 ? commandsState.length - 1 : indexState - 1;
            var command = commandsState[prevIndex];
            setIndexState(prevIndex);
            setCommandTextState(command.text);
          }
          break;
        case 'Enter':
        case 'NumpadEnter':
          if (commandTextState) {
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
        var welcomeMessageProps = mergeProps(ptm('welcomeMessage'));
        return /*#__PURE__*/React__namespace.createElement("div", welcomeMessageProps, props.welcomeMessage);
      }
      return null;
    };
    var createCommand = function createCommand(command, index) {
      var text = command.text,
        response = command.response;
      var key = text + '_' + index;
      var commandsProps = mergeProps({
        key: key
      }, ptm('commands'));
      var commandProps = mergeProps({
        className: cx('command')
      }, ptm('command'));
      var responseProps = mergeProps({
        className: cx('response'),
        'aria-live': 'polite'
      }, ptm('response'));
      return /*#__PURE__*/React__namespace.createElement("div", commandsProps, /*#__PURE__*/React__namespace.createElement("span", promptProps, props.prompt, "\xA0"), /*#__PURE__*/React__namespace.createElement("span", commandProps, text), /*#__PURE__*/React__namespace.createElement("div", responseProps, response));
    };
    var createContent = function createContent() {
      var content = commandsState.map(createCommand);
      var contentProps = mergeProps({
        className: cx('content')
      }, ptm('content'));
      return /*#__PURE__*/React__namespace.createElement("div", contentProps, content);
    };
    var createPromptContainer = function createPromptContainer() {
      var containerProps = mergeProps({
        className: cx('container')
      }, ptm('container'));
      var commandTextProps = mergeProps({
        ref: inputRef,
        value: commandTextState,
        type: 'text',
        className: cx('commandText'),
        autoComplete: 'off',
        onChange: function onChange(e) {
          return onInputChange(e);
        },
        onKeyDown: onKeyDown
      }, ptm('commandText'));
      return /*#__PURE__*/React__namespace.createElement("div", containerProps, /*#__PURE__*/React__namespace.createElement("span", promptProps, props.prompt, "\xA0"), /*#__PURE__*/React__namespace.createElement("input", commandTextProps));
    };
    var welcomeMessage = createWelcomeMessage();
    var content = createContent();
    var prompt = createPromptContainer();
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      style: props.style,
      onClick: onClick
    }, TerminalBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, welcomeMessage, content, prompt);
  }));
  Terminal.displayName = 'Terminal';

  exports.Terminal = Terminal;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.terminalservice, primereact.utils);
