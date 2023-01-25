/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import createElement from '../createElement';
import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import useElementLayout from '../../modules/useElementLayout';
import useLayoutEffect from '../../modules/useLayoutEffect';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import useResponderEvents from '../../modules/useResponderEvents';
import { getLocaleDirection, useLocaleContext } from '../../modules/useLocale';
import StyleSheet from '../StyleSheet';
import TextInputState from '../../modules/TextInputState';
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

var pickProps = props => pick(props, forwardPropsList); // If an Input Method Editor is processing key input, the 'keyCode' is 229.
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
      clearTextOnFocus = props.clearTextOnFocus,
      dir = props.dir,
      _props$editable = props.editable,
      editable = _props$editable === void 0 ? true : _props$editable,
      _props$keyboardType = props.keyboardType,
      keyboardType = _props$keyboardType === void 0 ? 'default' : _props$keyboardType,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      _props$numberOfLines = props.numberOfLines,
      numberOfLines = _props$numberOfLines === void 0 ? 1 : _props$numberOfLines,
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
      returnKeyType = props.returnKeyType,
      _props$secureTextEntr = props.secureTextEntry,
      secureTextEntry = _props$secureTextEntr === void 0 ? false : _props$secureTextEntr,
      selection = props.selection,
      selectTextOnFocus = props.selectTextOnFocus,
      spellCheck = props.spellCheck;
  var type;
  var inputMode;

  switch (keyboardType) {
    case 'email-address':
      type = 'email';
      break;

    case 'number-pad':
    case 'numeric':
      inputMode = 'numeric';
      break;

    case 'decimal-pad':
      inputMode = 'decimal';
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

  if (secureTextEntry) {
    type = 'password';
  }

  var dimensions = React.useRef({
    height: null,
    width: null
  });
  var hostRef = React.useRef(null);
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
        return hostNode != null && TextInputState.currentlyFocusedField() === hostNode;
      };

      handleContentSizeChange(hostNode);
    }
  }, [handleContentSizeChange]);

  function handleBlur(e) {
    TextInputState._currentlyFocusedNode = null;

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
      TextInputState._currentlyFocusedNode = hostNode;

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
    var hostNode = e.target; // Prevent key events bubbling (see #612)

    e.stopPropagation();
    var blurOnSubmitDefault = !multiline;
    var shouldBlurOnSubmit = blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;
    var nativeEvent = e.nativeEvent;
    var isComposing = isEventComposing(nativeEvent);

    if (onKeyPress) {
      onKeyPress(e);
    }

    if (e.key === 'Enter' && !e.shiftKey && // Do not call submit if composition is occuring.
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
    if (onSelectionChange) {
      try {
        var node = e.target;
        var selectionStart = node.selectionStart,
            selectionEnd = node.selectionEnd;
        e.nativeEvent.selection = {
          start: selectionStart,
          end: selectionEnd
        };
        e.nativeEvent.text = e.target.value;
        onSelectionChange(e);
      } catch (e) {}
    }
  }

  useLayoutEffect(() => {
    var node = hostRef.current;

    if (node != null && selection != null) {
      setSelection(node, selection);
    }

    if (document.activeElement === node) {
      TextInputState._currentlyFocusedNode = node;
    }
  }, [hostRef, selection]);
  var component = multiline ? 'textarea' : 'input';
  useElementLayout(hostRef, onLayout);
  useResponderEvents(hostRef, {
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

  var _useLocaleContext = useLocaleContext(),
      contextDirection = _useLocaleContext.direction;

  var supportedProps = pickProps(props);
  supportedProps.autoCapitalize = autoCapitalize;
  supportedProps.autoComplete = autoComplete || autoCompleteType || 'on';
  supportedProps.autoCorrect = autoCorrect ? 'on' : 'off'; // 'auto' by default allows browsers to infer writing direction

  supportedProps.dir = dir !== undefined ? dir : 'auto';
  supportedProps.enterKeyHint = returnKeyType;
  supportedProps.inputMode = inputMode;
  supportedProps.onBlur = handleBlur;
  supportedProps.onChange = handleChange;
  supportedProps.onFocus = handleFocus;
  supportedProps.onKeyDown = handleKeyDown;
  supportedProps.onSelect = handleSelectionChange;
  supportedProps.readOnly = !editable;
  supportedProps.rows = multiline ? numberOfLines : undefined;
  supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
  supportedProps.style = [{
    '--placeholderTextColor': placeholderTextColor
  }, styles.textinput$raw, styles.placeholder, props.style];
  supportedProps.type = multiline ? undefined : type;
  var platformMethodsRef = usePlatformMethods(supportedProps);
  var setRef = useMergeRefs(hostRef, platformMethodsRef, imperativeRef, forwardedRef);
  supportedProps.ref = setRef;
  var langDirection = props.lang != null ? getLocaleDirection(props.lang) : null;
  var componentDirection = props.dir || langDirection;
  var writingDirection = componentDirection || contextDirection;
  var element = createElement(component, supportedProps, {
    writingDirection
  });
  return element;
});
TextInput.displayName = 'TextInput'; // $FlowFixMe

TextInput.State = TextInputState;
var styles = StyleSheet.create({
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
  }
});
export default TextInput;