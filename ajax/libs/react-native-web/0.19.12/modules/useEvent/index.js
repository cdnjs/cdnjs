/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { addEventListener } from '../addEventListener';
import useLayoutEffect from '../useLayoutEffect';
import useStable from '../useStable';
/**
 * This can be used with any event type include custom events.
 *
 * const click = useEvent('click', options);
 * useEffect(() => {
 *   click.setListener(target, onClick);
 *   return () => click.clear();
 * }).
 */
export default function useEvent(eventType, options) {
  var targetListeners = useStable(() => new Map());
  var addListener = useStable(() => {
    return (target, callback) => {
      var removeTargetListener = targetListeners.get(target);
      if (removeTargetListener != null) {
        removeTargetListener();
      }
      if (callback == null) {
        targetListeners.delete(target);
        callback = () => {};
      }
      var removeEventListener = addEventListener(target, eventType, callback, options);
      targetListeners.set(target, removeEventListener);
      return removeEventListener;
    };
  });
  useLayoutEffect(() => {
    return () => {
      targetListeners.forEach(removeListener => {
        removeListener();
      });
      targetListeners.clear();
    };
  }, [targetListeners]);
  return addListener;
}