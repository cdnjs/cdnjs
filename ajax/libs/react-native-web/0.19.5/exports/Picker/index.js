import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["children", "enabled", "onValueChange", "selectedValue", "style", "testID", "itemStyle", "mode", "prompt"];
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
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import PickerItem from './PickerItem';
import StyleSheet from '../StyleSheet';
var Picker = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var children = props.children,
    enabled = props.enabled,
    onValueChange = props.onValueChange,
    selectedValue = props.selectedValue,
    style = props.style,
    testID = props.testID,
    itemStyle = props.itemStyle,
    mode = props.mode,
    prompt = props.prompt,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var hostRef = React.useRef(null);
  function handleChange(e) {
    var _e$target = e.target,
      selectedIndex = _e$target.selectedIndex,
      value = _e$target.value;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  // $FlowFixMe
  var supportedProps = _objectSpread({
    children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    style: [styles.initial, style],
    testID,
    value: selectedValue
  }, other);
  var platformMethodsRef = usePlatformMethods(supportedProps);
  var setRef = useMergeRefs(hostRef, platformMethodsRef, forwardedRef);
  supportedProps.ref = setRef;
  return createElement('select', supportedProps);
});

// $FlowFixMe
Picker.Item = PickerItem;
var styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});
export default Picker;