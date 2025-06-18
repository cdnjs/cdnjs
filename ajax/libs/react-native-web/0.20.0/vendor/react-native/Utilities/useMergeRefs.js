/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

import { useCallback } from 'react';
/**
 * Constructs a new ref that forwards new values to each of the given refs. The
 * given refs will always be invoked in the order that they are supplied.
 *
 * WARNING: A known problem of merging refs using this approach is that if any
 * of the given refs change, the returned callback ref will also be changed. If
 * the returned callback ref is supplied as a `ref` to a React element, this may
 * lead to problems with the given refs being invoked more times than desired.
 */
export default function useMergeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  return useCallback(current => {
    for (var _i = 0, _refs = refs; _i < _refs.length; _i++) {
      var ref = _refs[_i];
      if (ref != null) {
        if (typeof ref === 'function') {
          ref(current);
        } else {
          ref.current = current;
        }
      }
    }
  }, [...refs] // eslint-disable-line react-hooks/exhaustive-deps
  );
}