import * as React from 'react';
import { TerminalService } from 'primereact/terminalservice';
import { mergeProps, DomHandler, classNames } from 'primereact/utils';
import { ComponentBase } from 'primereact/componentbase';
import { PrimeReactContext } from 'primereact/api';

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

var TerminalBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Terminal',
    id: null,
    style: null,
    className: null,
    welcomeMessage: null,
    prompt: null,
    children: undefined
  }
});

var Terminal = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var context = React.useContext(PrimeReactContext);
  var props = TerminalBase.getProps(inProps, context);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    commandTextState = _React$useState2[0],
    setCommandTextState = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    commandsState = _React$useState4[0],
    setCommandsState = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    indexState = _React$useState6[0],
    setIndexState = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    emittedTextState = _React$useState8[0],
    setEmittedTextState = _React$useState8[1];
  var elementRef = React.useRef(null);
  var inputRef = React.useRef(null);
  var isEmitted = React.useRef(false);
  var _TerminalBase$setMeta = TerminalBase.setMetaData({
      props: props,
      state: {
        commandText: commandTextState,
        commands: commandsState
      }
    }),
    ptm = _TerminalBase$setMeta.ptm;
  var promptProps = mergeProps({
    className: 'p-terminal-prompt'
  }, ptm('prompt'));
  var onClick = function onClick() {
    DomHandler.focus(inputRef.current);
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
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      focus: function focus() {
        return DomHandler.focus(inputRef.current);
      },
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React.useEffect(function () {
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
    TerminalService.on('response', response);
    TerminalService.on('clear', clear);
    return function () {
      TerminalService.off('response', response);
      TerminalService.off('clear', clear);
    };
  }, [commandsState]);
  React.useEffect(function () {
    if (isEmitted.current) {
      TerminalService.emit('command', emittedTextState);
      isEmitted.current = false;
    }
    elementRef.current.scrollTop = elementRef.current.scrollHeight;
  });
  var createWelcomeMessage = function createWelcomeMessage() {
    if (props.welcomeMessage) {
      var welcomeMessageProps = mergeProps(ptm('welcomeMessage'));
      return /*#__PURE__*/React.createElement("div", welcomeMessageProps, props.welcomeMessage);
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
      className: 'p-terminal-command'
    }, ptm('command'));
    var responseProps = mergeProps({
      className: 'p-terminal-response'
    }, ptm('response'));
    return /*#__PURE__*/React.createElement("div", commandsProps, /*#__PURE__*/React.createElement("span", promptProps, props.prompt, "\xA0"), /*#__PURE__*/React.createElement("span", commandProps, text), /*#__PURE__*/React.createElement("div", responseProps, response));
  };
  var createContent = function createContent() {
    var content = commandsState.map(createCommand);
    var contentProps = mergeProps({
      className: 'p-terminal-content'
    }, ptm('content'));
    return /*#__PURE__*/React.createElement("div", contentProps, content);
  };
  var createPromptContainer = function createPromptContainer() {
    var containerProps = mergeProps({
      className: 'p-terminal-prompt-container'
    }, ptm('container'));
    var commandTextProps = mergeProps({
      ref: inputRef,
      value: commandTextState,
      type: 'text',
      className: 'p-terminal-input',
      autoComplete: 'off',
      onChange: function onChange(e) {
        return onInputChange(e);
      },
      onKeyDown: function onKeyDown(e) {
        return onInputKeyDown(e);
      }
    }, ptm('commandText'));
    return /*#__PURE__*/React.createElement("div", containerProps, /*#__PURE__*/React.createElement("span", promptProps, props.prompt, "\xA0"), /*#__PURE__*/React.createElement("input", commandTextProps));
  };
  var className = classNames('p-terminal p-component', props.className);
  var welcomeMessage = createWelcomeMessage();
  var content = createContent();
  var prompt = createPromptContainer();
  var rootProps = mergeProps({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style,
    onClick: onClick
  }, TerminalBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("div", rootProps, welcomeMessage, content, prompt);
}));
Terminal.displayName = 'Terminal';

export { Terminal };
