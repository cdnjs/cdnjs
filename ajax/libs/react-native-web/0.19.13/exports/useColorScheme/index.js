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

import * as React from 'react';
import Appearance from '../Appearance';
export default function useColorScheme() {
  var _React$useState = React.useState(Appearance.getColorScheme()),
    colorScheme = _React$useState[0],
    setColorScheme = _React$useState[1];
  React.useEffect(() => {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }
    var _Appearance$addChange = Appearance.addChangeListener(listener),
      remove = _Appearance$addChange.remove;
    return remove;
  });
  return colorScheme;
}