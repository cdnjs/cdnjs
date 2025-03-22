/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["aria-readonly", "color", "disabled", "onChange", "onValueChange", "readOnly", "style", "value"];
import * as React from 'react';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import View from '../View';
var CheckBox = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var ariaReadOnly = props['aria-readonly'],
    color = props.color,
    disabled = props.disabled,
    onChange = props.onChange,
    onValueChange = props.onValueChange,
    readOnly = props.readOnly,
    style = props.style,
    value = props.value,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  function handleChange(event) {
    var value = event.nativeEvent.target.checked;
    event.nativeEvent.value = value;
    onChange && onChange(event);
    onValueChange && onValueChange(value);
  }
  var fakeControl = /*#__PURE__*/React.createElement(View, {
    style: [styles.fakeControl, value && styles.fakeControlChecked,
    // custom color
    value && color && {
      backgroundColor: color,
      borderColor: color
    }, disabled && styles.fakeControlDisabled, value && disabled && styles.fakeControlCheckedAndDisabled]
  });
  var nativeControl = createElement('input', {
    checked: value,
    disabled: disabled,
    onChange: handleChange,
    readOnly: readOnly === true || ariaReadOnly === true || other.accessibilityReadOnly === true,
    ref: forwardedRef,
    style: [styles.nativeControl, styles.cursorInherit],
    type: 'checkbox'
  });
  return /*#__PURE__*/React.createElement(View, _extends({}, other, {
    "aria-disabled": disabled,
    "aria-readonly": ariaReadOnly,
    style: [styles.root, style, disabled && styles.cursorDefault]
  }), fakeControl, nativeControl);
});
CheckBox.displayName = 'CheckBox';
var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    height: 16,
    userSelect: 'none',
    width: 16
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  fakeControl: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#657786',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  fakeControlChecked: {
    backgroundColor: '#009688',
    backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K")',
    backgroundRepeat: 'no-repeat',
    borderColor: '#009688'
  },
  fakeControlDisabled: {
    borderColor: '#CCD6DD'
  },
  fakeControlCheckedAndDisabled: {
    backgroundColor: '#AAB8C2',
    borderColor: '#AAB8C2'
  },
  nativeControl: _objectSpread(_objectSpread({}, StyleSheet.absoluteFillObject), {}, {
    height: '100%',
    margin: 0,
    appearance: 'none',
    padding: 0,
    width: '100%'
  })
});
export default CheckBox;