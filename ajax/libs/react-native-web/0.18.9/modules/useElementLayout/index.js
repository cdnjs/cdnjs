/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import useLayoutEffect from '../useLayoutEffect';
import UIManager from '../../exports/UIManager';
import canUseDOM from '../canUseDom';
var DOM_LAYOUT_HANDLER_NAME = '__reactLayoutHandler';
var didWarn = !canUseDOM;
var resizeObserver = null;

function getResizeObserver() {
  if (canUseDOM && typeof window.ResizeObserver !== 'undefined') {
    if (resizeObserver == null) {
      resizeObserver = new window.ResizeObserver(function (entries) {
        entries.forEach(entry => {
          var node = entry.target;
          var onLayout = node[DOM_LAYOUT_HANDLER_NAME];

          if (typeof onLayout === 'function') {
            // We still need to measure the view because browsers don't yet provide
            // border-box dimensions in the entry
            UIManager.measure(node, (x, y, width, height, left, top) => {
              var event = {
                // $FlowFixMe
                nativeEvent: {
                  layout: {
                    x,
                    y,
                    width,
                    height,
                    left,
                    top
                  }
                },
                timeStamp: Date.now()
              };
              Object.defineProperty(event.nativeEvent, 'target', {
                enumerable: true,
                get: () => entry.target
              });
              onLayout(event);
            });
          }
        });
      });
    }
  } else if (!didWarn) {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.warn('onLayout relies on ResizeObserver which is not supported by your browser. ' + 'Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill.');
      didWarn = true;
    }
  }

  return resizeObserver;
}

export default function useElementLayout(ref, onLayout) {
  var observer = getResizeObserver();
  useLayoutEffect(() => {
    var node = ref.current;

    if (node != null) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]); // Observing is done in a separate effect to avoid this effect running
  // when 'onLayout' changes.

  useLayoutEffect(() => {
    var node = ref.current;

    if (node != null && observer != null) {
      if (typeof node[DOM_LAYOUT_HANDLER_NAME] === 'function') {
        observer.observe(node);
      } else {
        observer.unobserve(node);
      }
    }

    return () => {
      if (node != null && observer != null) {
        observer.unobserve(node);
      }
    };
  }, [ref, observer]);
}