/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createElement from '../createElement';
export default function PickerItem(props) {
  var color = props.color,
      label = props.label,
      testID = props.testID,
      value = props.value;
  var style = {
    color
  };
  return createElement('option', {
    children: label,
    style,
    testID,
    value
  });
}