/**
 * @license React
 * react-dom-test-utils.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var React = require('react');

const HostComponent = 5;
const HostSingleton = 27;

const assign = Object.assign;

/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */
function getEventCharCode(nativeEvent) {
  let charCode;
  const keyCode = nativeEvent.keyCode;

  if ('charCode' in nativeEvent) {
    charCode = nativeEvent.charCode; // FF does not set `charCode` for the Enter-key, check against `keyCode`.

    if (charCode === 0 && keyCode === 13) {
      charCode = 13;
    }
  } else {
    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
    charCode = keyCode;
  } // IE and Edge (on Windows) and Chrome / Safari (on Windows and Linux)
  // report Enter as charCode 10 when ctrl is pressed.


  if (charCode === 10) {
    charCode = 13;
  } // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
  // Must not discard the (non-)printable Enter-key.


  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

function functionThatReturnsTrue() {
  return true;
}

function functionThatReturnsFalse() {
  return false;
} // This is intentionally a factory so that we have different returned constructors.
// If we had a single constructor, it would be megamorphic and engines would deopt.


function createSyntheticEvent(Interface) {
  /**
   * Synthetic events are dispatched by event plugins, typically in response to a
   * top-level event delegation handler.
   *
   * These systems should generally use pooling to reduce the frequency of garbage
   * collection. The system should check `isPersistent` to determine whether the
   * event should be released into the pool after being dispatched. Users that
   * need a persisted event should invoke `persist`.
   *
   * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
   * normalizing browser quirks. Subclasses do not necessarily have to implement a
   * DOM interface; custom application-specific events can also subclass this.
   */
  // $FlowFixMe[missing-this-annot]
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type = reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;

    for (const propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }

      const normalize = Interface[propName];

      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }

    const defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;

    if (defaultPrevented) {
      this.isDefaultPrevented = functionThatReturnsTrue;
    } else {
      this.isDefaultPrevented = functionThatReturnsFalse;
    }

    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  } // $FlowFixMe[prop-missing] found when upgrading Flow


  assign(SyntheticBaseEvent.prototype, {
    // $FlowFixMe[missing-this-annot]
    preventDefault: function () {
      this.defaultPrevented = true;
      const event = this.nativeEvent;

      if (!event) {
        return;
      }

      if (event.preventDefault) {
        event.preventDefault(); // $FlowFixMe[illegal-typeof] - flow is not aware of `unknown` in IE
      } else if (typeof event.returnValue !== 'unknown') {
        event.returnValue = false;
      }

      this.isDefaultPrevented = functionThatReturnsTrue;
    },
    // $FlowFixMe[missing-this-annot]
    stopPropagation: function () {
      const event = this.nativeEvent;

      if (!event) {
        return;
      }

      if (event.stopPropagation) {
        event.stopPropagation(); // $FlowFixMe[illegal-typeof] - flow is not aware of `unknown` in IE
      } else if (typeof event.cancelBubble !== 'unknown') {
        // The ChangeEventPlugin registers a "propertychange" event for
        // IE. This event does not support bubbling or cancelling, and
        // any references to cancelBubble throw "Member not found".  A
        // typeof check of "unknown" circumvents this issue (and is also
        // IE specific).
        event.cancelBubble = true;
      }

      this.isPropagationStopped = functionThatReturnsTrue;
    },

    /**
     * We release all dispatched `SyntheticEvent`s after each event loop, adding
     * them back into the pool. This allows a way to hold onto a reference that
     * won't be added back into the pool.
     */
    persist: function () {// Modern event system doesn't use pooling.
    },

    /**
     * Checks if this event should be released back into the pool.
     *
     * @return {boolean} True if this should not be released, false otherwise.
     */
    isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent;
}
/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const EventInterface = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
};
createSyntheticEvent(EventInterface);

const UIEventInterface = assign({}, EventInterface, {
  view: 0,
  detail: 0
});

createSyntheticEvent(UIEventInterface);
let lastMovementX;
let lastMovementY;
let lastMouseEvent;

function updateMouseMovementPolyfillState(event) {
  if (event !== lastMouseEvent) {
    if (lastMouseEvent && event.type === 'mousemove') {
      // $FlowFixMe[unsafe-arithmetic] assuming this is a number
      lastMovementX = event.screenX - lastMouseEvent.screenX; // $FlowFixMe[unsafe-arithmetic] assuming this is a number

      lastMovementY = event.screenY - lastMouseEvent.screenY;
    } else {
      lastMovementX = 0;
      lastMovementY = 0;
    }

    lastMouseEvent = event;
  }
}
/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const MouseEventInterface = assign({}, UIEventInterface, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: getEventModifierState,
  button: 0,
  buttons: 0,
  relatedTarget: function (event) {
    if (event.relatedTarget === undefined) return event.fromElement === event.srcElement ? event.toElement : event.fromElement;
    return event.relatedTarget;
  },
  movementX: function (event) {
    if ('movementX' in event) {
      return event.movementX;
    }

    updateMouseMovementPolyfillState(event);
    return lastMovementX;
  },
  movementY: function (event) {
    if ('movementY' in event) {
      return event.movementY;
    } // Don't need to call updateMouseMovementPolyfillState() here
    // because it's guaranteed to have already run when movementX
    // was copied.


    return lastMovementY;
  }
});

createSyntheticEvent(MouseEventInterface);
/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const DragEventInterface = assign({}, MouseEventInterface, {
  dataTransfer: 0
});

createSyntheticEvent(DragEventInterface);
/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const FocusEventInterface = assign({}, UIEventInterface, {
  relatedTarget: 0
});

createSyntheticEvent(FocusEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */

const AnimationEventInterface = assign({}, EventInterface, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});

createSyntheticEvent(AnimationEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */

const ClipboardEventInterface = assign({}, EventInterface, {
  clipboardData: function (event) {
    return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
  }
});

createSyntheticEvent(ClipboardEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */

const CompositionEventInterface = assign({}, EventInterface, {
  data: 0
});

createSyntheticEvent(CompositionEventInterface);
/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

const normalizeKey = {
  Esc: 'Escape',
  Spacebar: ' ',
  Left: 'ArrowLeft',
  Up: 'ArrowUp',
  Right: 'ArrowRight',
  Down: 'ArrowDown',
  Del: 'Delete',
  Win: 'OS',
  Menu: 'ContextMenu',
  Apps: 'ContextMenu',
  Scroll: 'ScrollLock',
  MozPrintableKey: 'Unidentified'
};
/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */

const translateToKey = {
  '8': 'Backspace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '19': 'Pause',
  '20': 'CapsLock',
  '27': 'Escape',
  '32': ' ',
  '33': 'PageUp',
  '34': 'PageDown',
  '35': 'End',
  '36': 'Home',
  '37': 'ArrowLeft',
  '38': 'ArrowUp',
  '39': 'ArrowRight',
  '40': 'ArrowDown',
  '45': 'Insert',
  '46': 'Delete',
  '112': 'F1',
  '113': 'F2',
  '114': 'F3',
  '115': 'F4',
  '116': 'F5',
  '117': 'F6',
  '118': 'F7',
  '119': 'F8',
  '120': 'F9',
  '121': 'F10',
  '122': 'F11',
  '123': 'F12',
  '144': 'NumLock',
  '145': 'ScrollLock',
  '224': 'Meta'
};
/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */

function getEventKey(nativeEvent) {
  if (nativeEvent.key) {
    // Normalize inconsistent values reported by browsers due to
    // implementations of a working draft specification.
    // FireFox implements `key` but returns `MozPrintableKey` for all
    // printable characters (normalized to `Unidentified`), ignore it.
    const key = // $FlowFixMe[invalid-computed-prop] unable to index with a `mixed` value
    normalizeKey[nativeEvent.key] || nativeEvent.key;

    if (key !== 'Unidentified') {
      return key;
    }
  } // Browser does not implement `key`, polyfill as much of it as we can.


  if (nativeEvent.type === 'keypress') {
    const charCode = getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
    nativeEvent); // The enter-key is technically both printable and non-printable and can
    // thus be captured by `keypress`, no other non-printable key should.

    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
  }

  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
    // While user keyboard layout determines the actual meaning of each
    // `keyCode` value, almost all function keys have a universal value.
    // $FlowFixMe[invalid-computed-prop] unable to index with a `mixed` value
    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
  }

  return '';
}
/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */


const modifierKeyToProp = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Meta: 'metaKey',
  Shift: 'shiftKey'
}; // Older browsers (Safari <= 10, iOS Safari <= 10.2) do not support
// getModifierState. If getModifierState is not supported, we map it to a set of
// modifier keys exposed by the event. In this case, Lock-keys are not supported.
// $FlowFixMe[missing-local-annot]
// $FlowFixMe[missing-this-annot]

function modifierStateGetter(keyArg) {
  const syntheticEvent = this;
  const nativeEvent = syntheticEvent.nativeEvent;

  if (nativeEvent.getModifierState) {
    return nativeEvent.getModifierState(keyArg);
  }

  const keyProp = modifierKeyToProp[keyArg];
  return keyProp ? !!nativeEvent[keyProp] : false;
}

function getEventModifierState(nativeEvent) {
  return modifierStateGetter;
}
/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */


const KeyboardEventInterface = assign({}, UIEventInterface, {
  key: getEventKey,
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: getEventModifierState,
  // Legacy Interface
  charCode: function (event) {
    // `charCode` is the result of a KeyPress event and represents the value of
    // the actual printable character.
    // KeyPress is deprecated, but its replacement is not yet final and not
    // implemented in any major browser. Only KeyPress has charCode.
    if (event.type === 'keypress') {
      return getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
      event);
    }

    return 0;
  },
  keyCode: function (event) {
    // `keyCode` is the result of a KeyDown/Up event and represents the value of
    // physical keyboard key.
    // The actual meaning of the value depends on the users' keyboard layout
    // which cannot be detected. Assuming that it is a US keyboard layout
    // provides a surprisingly accurate mapping for US and European users.
    // Due to this, it is left to the user to implement at this time.
    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }

    return 0;
  },
  which: function (event) {
    // `which` is an alias for either `keyCode` or `charCode` depending on the
    // type of the event.
    if (event.type === 'keypress') {
      return getEventCharCode( // $FlowFixMe[incompatible-call] unable to narrow to `KeyboardEvent`
      event);
    }

    if (event.type === 'keydown' || event.type === 'keyup') {
      return event.keyCode;
    }

    return 0;
  }
});

createSyntheticEvent(KeyboardEventInterface);
/**
 * @interface PointerEvent
 * @see http://www.w3.org/TR/pointerevents/
 */

const PointerEventInterface = assign({}, MouseEventInterface, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
});

createSyntheticEvent(PointerEventInterface);
/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */

const TouchEventInterface = assign({}, UIEventInterface, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: getEventModifierState
});

createSyntheticEvent(TouchEventInterface);
/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */

const TransitionEventInterface = assign({}, EventInterface, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
});

createSyntheticEvent(TransitionEventInterface);
/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */

const WheelEventInterface = assign({}, MouseEventInterface, {
  deltaX(event) {
    return 'deltaX' in event ? event.deltaX : // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
    'wheelDeltaX' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDeltaX : 0;
  },

  deltaY(event) {
    return 'deltaY' in event ? event.deltaY : // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
    'wheelDeltaY' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDeltaY : // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
    'wheelDelta' in event ? // $FlowFixMe[unsafe-arithmetic] assuming this is a number
    -event.wheelDelta : 0;
  },

  deltaZ: 0,
  // Browsers without "deltaMode" is reporting in raw wheel delta where one
  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
  deltaMode: 0
});

createSyntheticEvent(WheelEventInterface);

let didWarnAboutUsingAct = false;

function act(callback) {
  if (didWarnAboutUsingAct === false) {
    didWarnAboutUsingAct = true;
    console.error('`ReactDOMTestUtils.act` is deprecated in favor of `React.act`. ' + 'Import `act` from `react` instead of `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }

  return React.act(callback);
}
/**
 * Utilities for making it easy to test React components.
 *
 * See https://reactjs.org/docs/test-utils.html
 *
 * Todo: Support the entire DOM.scry query syntax. For now, these simple
 * utilities will suffice for testing purposes.
 * @lends ReactTestUtils
 */


function renderIntoDocument(element) {
  {
    throw new Error('`renderIntoDocument` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isElement(element) {
  {
    throw new Error('`isElement` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isElementOfType(inst, convenienceConstructor) {
  {
    throw new Error('`isElementOfType` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isDOMComponent(inst) {
  {
    throw new Error('`isDOMComponent` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isDOMComponentElement(inst) {
  {
    throw new Error('`isDOMComponentElement` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isCompositeComponent(inst) {
  {
    throw new Error('`isCompositeComponent` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function isCompositeComponentWithType(inst, type) {
  {
    throw new Error('`isCompositeComponentWithType` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function findAllInRenderedTree(inst, test) {
  {
    throw new Error('`findAllInRenderedTree` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Finds all instances of components in the rendered tree that are DOM
 * components with the class name matching `className`.
 * @return {array} an array of all the matches.
 */


function scryRenderedDOMComponentsWithClass(root, classNames) {
  {
    throw new Error('`scryRenderedDOMComponentsWithClass` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */


function findRenderedDOMComponentWithClass(root, className) {
  {
    throw new Error('`findRenderedDOMComponentWithClass` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Finds all instances of components in the rendered tree that are DOM
 * components with the tag name matching `tagName`.
 * @return {array} an array of all the matches.
 */


function scryRenderedDOMComponentsWithTag(root, tagName) {
  {
    throw new Error('`scryRenderedDOMComponentsWithTag` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */


function findRenderedDOMComponentWithTag(root, tagName) {
  {
    throw new Error('`findRenderedDOMComponentWithTag` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Finds all instances of components with type equal to `componentType`.
 * @return {array} an array of all the matches.
 */


function scryRenderedComponentsWithType(root, componentType) {
  {
    throw new Error('`scryRenderedComponentsWithType` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Same as `scryRenderedComponentsWithType` but expects there to be one result
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactComponent} The one match.
 */


function findRenderedComponentWithType(root, componentType) {
  {
    throw new Error('`findRenderedComponentWithType` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}
/**
 * Pass a mocked component module to this method to augment it with
 * useful methods that allow it to be used as a dummy React component.
 * Instead of rendering as usual, the component will become a simple
 * <div> containing any provided children.
 *
 * @param {object} module the mock function object exported from a
 *                        module that defines the component to be mocked
 * @param {?string} mockTagName optional dummy root tag name to return
 *                              from render method (overrides
 *                              module.mockTagName if provided)
 * @return {object} the ReactTestUtils object (for chaining)
 */


function mockComponent(module, mockTagName) {
  {
    throw new Error('`mockComponent` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
}

function nativeTouchData(x, y) {
  {
    throw new Error('`nativeTouchData` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
  }
} // Start of inline: the below functions were inlined from

function getParent(inst) {
  do {
    inst = inst.return; // TODO: If this is a HostRoot we might want to bail out.
    // That is depending on if we want nested subtrees (layers) to bubble
    // events to their parent. We could also go through parentNode on the
    // host node but that wouldn't work for React Native and doesn't let us
    // do the portal feature.
  } while (inst && inst.tag !== HostComponent && inst.tag !== HostSingleton);

  if (inst) {
    return inst;
  }

  return null;
}
/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */


function traverseTwoPhase(inst, fn, arg) {
  const path = [];

  while (inst) {
    path.push(inst);
    inst = getParent(inst);
  }

  let i;

  for (i = path.length; i-- > 0;) {
    fn(path[i], 'captured', arg);
  }

  for (i = 0; i < path.length; i++) {
    fn(path[i], 'bubbled', arg);
  }
}


const Simulate = {};
/**
 * Exports:
 *
 * - `Simulate.click(Element)`
 * - `Simulate.mouseMove(Element)`
 * - `Simulate.change(Element)`
 * - ... (All keys from event plugin `eventTypes` objects)
 */

function makeSimulator(eventType) {
  return function (domNode, eventData) {
    {
      throw new Error('`Simulate` was removed from `react-dom/test-utils`. ' + 'See https://react.dev/warnings/react-dom-test-utils for more info.');
    }
  };
} // A one-time snapshot with no plans to update. We'll probably want to deprecate Simulate API.


const simulatedEventTypes = ['blur', 'cancel', 'click', 'close', 'contextMenu', 'copy', 'cut', 'auxClick', 'doubleClick', 'dragEnd', 'dragStart', 'drop', 'focus', 'input', 'invalid', 'keyDown', 'keyPress', 'keyUp', 'mouseDown', 'mouseUp', 'paste', 'pause', 'play', 'pointerCancel', 'pointerDown', 'pointerUp', 'rateChange', 'reset', 'resize', 'seeked', 'submit', 'touchCancel', 'touchEnd', 'touchStart', 'volumeChange', 'drag', 'dragEnter', 'dragExit', 'dragLeave', 'dragOver', 'mouseMove', 'mouseOut', 'mouseOver', 'pointerMove', 'pointerOut', 'pointerOver', 'scroll', 'toggle', 'touchMove', 'wheel', 'abort', 'animationEnd', 'animationIteration', 'animationStart', 'canPlay', 'canPlayThrough', 'durationChange', 'emptied', 'encrypted', 'ended', 'error', 'gotPointerCapture', 'load', 'loadedData', 'loadedMetadata', 'loadStart', 'lostPointerCapture', 'playing', 'progress', 'seeking', 'stalled', 'suspend', 'timeUpdate', 'transitionEnd', 'waiting', 'mouseEnter', 'mouseLeave', 'pointerEnter', 'pointerLeave', 'change', 'select', 'beforeInput', 'compositionEnd', 'compositionStart', 'compositionUpdate'];

function buildSimulators() {
  simulatedEventTypes.forEach(eventType => {
    Simulate[eventType] = makeSimulator();
  });
}

buildSimulators();

exports.Simulate = Simulate;
exports.act = act;
exports.findAllInRenderedTree = findAllInRenderedTree;
exports.findRenderedComponentWithType = findRenderedComponentWithType;
exports.findRenderedDOMComponentWithClass = findRenderedDOMComponentWithClass;
exports.findRenderedDOMComponentWithTag = findRenderedDOMComponentWithTag;
exports.isCompositeComponent = isCompositeComponent;
exports.isCompositeComponentWithType = isCompositeComponentWithType;
exports.isDOMComponent = isDOMComponent;
exports.isDOMComponentElement = isDOMComponentElement;
exports.isElement = isElement;
exports.isElementOfType = isElementOfType;
exports.mockComponent = mockComponent;
exports.nativeTouchData = nativeTouchData;
exports.renderIntoDocument = renderIntoDocument;
exports.scryRenderedComponentsWithType = scryRenderedComponentsWithType;
exports.scryRenderedDOMComponentsWithClass = scryRenderedDOMComponentsWithClass;
exports.scryRenderedDOMComponentsWithTag = scryRenderedDOMComponentsWithTag;
exports.traverseTwoPhase = traverseTwoPhase;