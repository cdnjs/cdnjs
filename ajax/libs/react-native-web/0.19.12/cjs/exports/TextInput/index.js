"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _createElement = _interopRequireDefault(require("../createElement"));
var forwardedProps = _interopRequireWildcard(require("../../modules/forwardedProps"));
var _pick = _interopRequireDefault(require("../../modules/pick"));
var _useElementLayout = _interopRequireDefault(require("../../modules/useElementLayout"));
var _useLayoutEffect = _interopRequireDefault(require("../../modules/useLayoutEffect"));
var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));
var _usePlatformMethods = _interopRequireDefault(require("../../modules/usePlatformMethods"));
var _useResponderEvents = _interopRequireDefault(require("../../modules/useResponderEvents"));
var _useLocale = require("../../modules/useLocale");
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _TextInputState = _interopRequireDefault(require("../../modules/TextInputState"));
var _warnOnce = require("../../modules/warnOnce");
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * Determines whether a 'selection' prop differs from a node's existing
 * selection state.
 */
var isSelectionStale = (node, selection) => {
  var selectionEnd = node.selectionEnd,
    selectionStart = node.selectionStart;
  var start = selection.start,
    end = selection.end;
  return start !== selectionStart || end !== selectionEnd;
};

/**
 * Certain input types do no support 'selectSelectionRange' and will throw an
 * error.
 */
var setSelection = (node, selection) => {
  if (isSelectionStale(node, selection)) {
    var start = selection.start,
      end = selection.end;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {}
  }
};
var forwardPropsList = Object.assign({}, forwardedProps.defaultProps, forwardedProps.accessibilityProps, forwardedProps.clickProps, forwardedProps.focusProps, forwardedProps.keyboardProps, forwardedProps.mouseProps, forwardedProps.touchProps, forwardedProps.styleProps, {
  autoCapitalize: true,
  autoComplete: true,
  autoCorrect: true,
  autoFocus: true,
  defaultValue: true,
  disabled: true,
  lang: true,
  maxLength: true,
  onChange: true,
  onScroll: true,
  placeholder: true,
  pointerEvents: true,
  readOnly: true,
  rows: true,
  spellCheck: true,
  value: true,
  type: true
});
var pickProps = props => (0, _pick.default)(props, forwardPropsList);

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}
var focusTimeout = null;
var TextInput = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var _props$autoCapitalize = props.autoCapitalize,
    autoCapitalize = _props$autoCapitalize === void 0 ? 'sentences' : _props$autoCapitalize,
    autoComplete = props.autoComplete,
    autoCompleteType = props.autoCompleteType,
    _props$autoCorrect = props.autoCorrect,
    autoCorrect = _props$autoCorrect === void 0 ? true : _props$autoCorrect,
    blurOnSubmit = props.blurOnSubmit,
    caretHidden = props.caretHidden,
    clearTextOnFocus = props.clearTextOnFocus,
    dir = props.dir,
    editable = props.editable,
    enterKeyHint = props.enterKeyHint,
    inputMode = props.inputMode,
    keyboardType = props.keyboardType,
    _props$multiline = props.multiline,
    multiline = _props$multiline === void 0 ? false : _props$multiline,
    numberOfLines = props.numberOfLines,
    onBlur = props.onBlur,
    onChange = props.onChange,
    onChangeText = props.onChangeText,
    onContentSizeChange = props.onContentSizeChange,
    onFocus = props.onFocus,
    onKeyPress = props.onKeyPress,
    onLayout = props.onLayout,
    onMoveShouldSetResponder = props.onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture = props.onMoveShouldSetResponderCapture,
    onResponderEnd = props.onResponderEnd,
    onResponderGrant = props.onResponderGrant,
    onResponderMove = props.onResponderMove,
    onResponderReject = props.onResponderReject,
    onResponderRelease = props.onResponderRelease,
    onResponderStart = props.onResponderStart,
    onResponderTerminate = props.onResponderTerminate,
    onResponderTerminationRequest = props.onResponderTerminationRequest,
    onScrollShouldSetResponder = props.onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture = props.onScrollShouldSetResponderCapture,
    onSelectionChange = props.onSelectionChange,
    onSelectionChangeShouldSetResponder = props.onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture = props.onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder = props.onStartShouldSetResponder,
    onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture,
    onSubmitEditing = props.onSubmitEditing,
    placeholderTextColor = props.placeholderTextColor,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    returnKeyType = props.returnKeyType,
    rows = props.rows,
    _props$secureTextEntr = props.secureTextEntry,
    secureTextEntry = _props$secureTextEntr === void 0 ? false : _props$secureTextEntr,
    selection = props.selection,
    selectTextOnFocus = props.selectTextOnFocus,
    showSoftInputOnFocus = props.showSoftInputOnFocus,
    spellCheck = props.spellCheck;
  var type;
  var _inputMode;
  if (inputMode != null) {
    _inputMode = inputMode;
    if (inputMode === 'email') {
      type = 'email';
    } else if (inputMode === 'tel') {
      type = 'tel';
    } else if (inputMode === 'search') {
      type = 'search';
    } else if (inputMode === 'url') {
      type = 'url';
    } else {
      type = 'text';
    }
  } else if (keyboardType != null) {
    (0, _warnOnce.warnOnce)('keyboardType', 'keyboardType is deprecated. Use inputMode.');
    switch (keyboardType) {
      case 'email-address':
        type = 'email';
        break;
      case 'number-pad':
      case 'numeric':
        _inputMode = 'numeric';
        break;
      case 'decimal-pad':
        _inputMode = 'decimal';
        break;
      case 'phone-pad':
        type = 'tel';
        break;
      case 'search':
      case 'web-search':
        type = 'search';
        break;
      case 'url':
        type = 'url';
        break;
      default:
        type = 'text';
    }
  }
  if (secureTextEntry) {
    type = 'password';
  }
  var dimensions = React.useRef({
    height: null,
    width: null
  });
  var hostRef = React.useRef(null);
  var prevSelection = React.useRef(null);
  var prevSecureTextEntry = React.useRef(false);
  React.useEffect(() => {
    if (hostRef.current && prevSelection.current) {
      setSelection(hostRef.current, prevSelection.current);
    }
    prevSecureTextEntry.current = secureTextEntry;
  }, [secureTextEntry]);
  var handleContentSizeChange = React.useCallback(hostNode => {
    if (multiline && onContentSizeChange && hostNode != null) {
      var newHeight = hostNode.scrollHeight;
      var newWidth = hostNode.scrollWidth;
      if (newHeight !== dimensions.current.height || newWidth !== dimensions.current.width) {
        dimensions.current.height = newHeight;
        dimensions.current.width = newWidth;
        onContentSizeChange({
          nativeEvent: {
            contentSize: {
              height: dimensions.current.height,
              width: dimensions.current.width
            }
          }
        });
      }
    }
  }, [multiline, onContentSizeChange]);
  var imperativeRef = React.useMemo(() => hostNode => {
    // TextInput needs to add more methods to the hostNode in addition to those
    // added by `usePlatformMethods`. This is temporarily until an API like
    // `TextInput.clear(hostRef)` is added to React Native.
    if (hostNode != null) {
      hostNode.clear = function () {
        if (hostNode != null) {
          hostNode.value = '';
        }
      };
      hostNode.isFocused = function () {
        return hostNode != null && _TextInputState.default.currentlyFocusedField() === hostNode;
      };
      handleContentSizeChange(hostNode);
    }
  }, [handleContentSizeChange]);
  function handleBlur(e) {
    _TextInputState.default._currentlyFocusedNode = null;
    if (onBlur) {
      e.nativeEvent.text = e.target.value;
      onBlur(e);
    }
  }
  function handleChange(e) {
    var hostNode = e.target;
    var text = hostNode.value;
    e.nativeEvent.text = text;
    handleContentSizeChange(hostNode);
    if (onChange) {
      onChange(e);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  }
  function handleFocus(e) {
    var hostNode = e.target;
    if (onFocus) {
      e.nativeEvent.text = hostNode.value;
      onFocus(e);
    }
    if (hostNode != null) {
      _TextInputState.default._currentlyFocusedNode = hostNode;
      if (clearTextOnFocus) {
        hostNode.value = '';
      }
      if (selectTextOnFocus) {
        // Safari requires selection to occur in a setTimeout
        if (focusTimeout != null) {
          clearTimeout(focusTimeout);
        }
        focusTimeout = setTimeout(() => {
          if (hostNode != null) {
            hostNode.select();
          }
        }, 0);
      }
    }
  }
  function handleKeyDown(e) {
    var hostNode = e.target;
    // Prevent key events bubbling (see #612)
    e.stopPropagation();
    var blurOnSubmitDefault = !multiline;
    var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;
    var nativeEvent = e.nativeEvent;
    var isComposing = isEventComposing(nativeEvent);
    if (onKeyPress) {
      onKeyPress(e);
    }
    if (e.key === 'Enter' && !e.shiftKey &&
    // Do not call submit if composition is occuring.
    !isComposing && !e.isDefaultPrevented()) {
      if ((blurOnSubmit || !multiline) && onSubmitEditing) {
        // prevent "Enter" from inserting a newline or submitting a form
        e.preventDefault();
        nativeEvent.text = e.target.value;
        onSubmitEditing(e);
      }
      if (shouldBlurOnSubmit && hostNode != null) {
        setTimeout(() => hostNode.blur(), 0);
      }
    }
  }
  function handleSelectionChange(e) {
    try {
      var _e$target = e.target,
        selectionStart = _e$target.selectionStart,
        selectionEnd = _e$target.selectionEnd;
      var _selection = {
        start: selectionStart,
        end: selectionEnd
      };
      if (onSelectionChange) {
        e.nativeEvent.selection = _selection;
        e.nativeEvent.text = e.target.value;
        onSelectionChange(e);
      }
      if (prevSecureTextEntry.current === secureTextEntry) {
        prevSelection.current = _selection;
      }
    } catch (e) {}
  }
  (0, _useLayoutEffect.default)(() => {
    var node = hostRef.current;
    if (node != null && selection != null) {
      setSelection(node, selection);
    }
    if (document.activeElement === node) {
      _TextInputState.default._currentlyFocusedNode = node;
    }
  }, [hostRef, selection]);
  var component = multiline ? 'textarea' : 'input';
  (0, _useElementLayout.default)(hostRef, onLayout);
  (0, _useResponderEvents.default)(hostRef, {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  });
  var _useLocaleContext = (0, _useLocale.useLocaleContext)(),
    contextDirection = _useLocaleContext.direction;
  var supportedProps = pickProps(props);
  supportedProps.autoCapitalize = autoCapitalize;
  supportedProps.autoComplete = autoComplete || autoCompleteType || 'on';
  supportedProps.autoCorrect = autoCorrect ? 'on' : 'off';
  // 'auto' by default allows browsers to infer writing direction
  supportedProps.dir = dir !== undefined ? dir : 'auto';
  if (returnKeyType != null) {
    (0, _warnOnce.warnOnce)('returnKeyType', 'returnKeyType is deprecated. Use enterKeyHint.');
  }
  supportedProps.enterKeyHint = enterKeyHint || returnKeyType;
  supportedProps.inputMode = _inputMode;
  supportedProps.onBlur = handleBlur;
  supportedProps.onChange = handleChange;
  supportedProps.onFocus = handleFocus;
  supportedProps.onKeyDown = handleKeyDown;
  supportedProps.onSelect = handleSelectionChange;
  if (editable != null) {
    (0, _warnOnce.warnOnce)('editable', 'editable is deprecated. Use readOnly.');
  }
  supportedProps.readOnly = readOnly === true || editable === false;
  if (numberOfLines != null) {
    (0, _warnOnce.warnOnce)('numberOfLines', 'TextInput numberOfLines is deprecated. Use rows.');
  }
  supportedProps.rows = multiline ? rows != null ? rows : numberOfLines : 1;
  supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
  supportedProps.style = [{
    '--placeholderTextColor': placeholderTextColor
  }, styles.textinput$raw, styles.placeholder, props.style, caretHidden && styles.caretHidden];
  supportedProps.type = multiline ? undefined : type;
  supportedProps.virtualkeyboardpolicy = showSoftInputOnFocus === false ? 'manual' : 'auto';
  var platformMethodsRef = (0, _usePlatformMethods.default)(supportedProps);
  var setRef = (0, _useMergeRefs.default)(hostRef, platformMethodsRef, imperativeRef, forwardedRef);
  supportedProps.ref = setRef;
  var langDirection = props.lang != null ? (0, _useLocale.getLocaleDirection)(props.lang) : null;
  var componentDirection = props.dir || langDirection;
  var writingDirection = componentDirection || contextDirection;
  var element = (0, _createElement.default)(component, supportedProps, {
    writingDirection
  });
  return element;
});
TextInput.displayName = 'TextInput';
// $FlowFixMe
TextInput.State = _TextInputState.default;
var styles = _StyleSheet.default.create({
  textinput$raw: {
    MozAppearance: 'textfield',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: '0 solid black',
    borderRadius: 0,
    boxSizing: 'border-box',
    font: '14px System',
    margin: 0,
    padding: 0,
    resize: 'none'
  },
  placeholder: {
    placeholderTextColor: 'var(--placeholderTextColor)'
  },
  caretHidden: {
    caretColor: 'transparent'
  }
});
var _default = TextInput;
exports.default = _default;
module.exports = exports.default;