import _objectSpread from "@babel/runtime/helpers/objectSpread2";

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import UIManager from '../../exports/UIManager';
import createDOMProps from '../createDOMProps';
import useStable from '../useStable';
import { useRef } from 'react';
var didWarn = false;
var emptyObject = {};

function setNativeProps(node, nativeProps, pointerEvents, style, previousStyleRef) {
  if (!didWarn) {
    console.warn('setNativeProps is deprecated. Please update props using React state instead.');
    didWarn = true;
  }

  if (node != null && nativeProps) {
    var domProps = createDOMProps(null, _objectSpread(_objectSpread({
      pointerEvents
    }, nativeProps), {}, {
      style: [style, nativeProps.style]
    }));
    var nextDomStyle = domProps.style;

    if (previousStyleRef.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }

      for (var styleName in previousStyleRef.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyleRef.current = nextDomStyle;
    UIManager.updateView(node, domProps);
  }
}
/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */


export default function usePlatformMethods(_ref) {
  var pointerEvents = _ref.pointerEvents,
      style = _ref.style;
  var previousStyleRef = useRef(null);
  var setNativePropsArgsRef = useRef(null);
  setNativePropsArgsRef.current = {
    pointerEvents,
    style
  }; // Avoid creating a new ref on every render. The props only need to be
  // available to 'setNativeProps' when it is called.

  var ref = useStable(() => hostNode => {
    if (hostNode != null) {
      hostNode.measure = callback => UIManager.measure(hostNode, callback);

      hostNode.measureLayout = (relativeToNode, success, failure) => UIManager.measureLayout(hostNode, relativeToNode, failure, success);

      hostNode.measureInWindow = callback => UIManager.measureInWindow(hostNode, callback);

      hostNode.setNativeProps = nativeProps => {
        var _ref2 = setNativePropsArgsRef.current || emptyObject,
            style = _ref2.style,
            pointerEvents = _ref2.pointerEvents;

        setNativeProps(hostNode, nativeProps, pointerEvents, style, previousStyleRef);
      };
    }
  });
  return ref;
}