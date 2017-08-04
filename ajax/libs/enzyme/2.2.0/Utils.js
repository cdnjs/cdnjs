'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTOR = exports.isCompoundSelector = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint no-use-before-define:0 */


exports.internalInstance = internalInstance;
exports.isFunctionalComponent = isFunctionalComponent;
exports.propsOfNode = propsOfNode;
exports.typeOfNode = typeOfNode;
exports.getNode = getNode;
exports.nodeHasType = nodeHasType;
exports.childrenEqual = childrenEqual;
exports.nodeEqual = nodeEqual;
exports.containsChildrenSubArray = containsChildrenSubArray;
exports.propFromEvent = propFromEvent;
exports.withSetStateAllowed = withSetStateAllowed;
exports.splitSelector = splitSelector;
exports.isSimpleSelector = isSimpleSelector;
exports.selectorError = selectorError;
exports.selectorType = selectorType;
exports.AND = AND;
exports.coercePropValue = coercePropValue;
exports.mapNativeEventNames = mapNativeEventNames;

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _reactCompat = require('./react-compat');

var _version = require('./version');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function internalInstanceKey(node) {
  return Object.keys(Object(node)).filter(function (key) {
    return key.match(/^__reactInternalInstance\$/);
  })[0];
}

function internalInstance(inst) {
  return inst._reactInternalInstance || inst[internalInstanceKey(inst)];
}

function isFunctionalComponent(inst) {
  return inst && inst.constructor && inst.constructor.name === 'StatelessComponent';
}

function propsOfNode(node) {
  if (_version.REACT013 && node && node._store) {
    return node._store.props || {};
  }
  if (node && node._reactInternalComponent && node._reactInternalComponent._currentElement) {
    return node._reactInternalComponent._currentElement.props || {};
  }
  if (node && node._currentElement) {
    return node._currentElement.props || {};
  }
  if (_version.REACT15 && node) {
    if (internalInstance(node) && internalInstance(node)._currentElement) {
      return internalInstance(node)._currentElement.props || {};
    }
  }

  return node && node.props || {};
}

function typeOfNode(node) {
  return node ? node.type : null;
}

function getNode(node) {
  return (0, _reactCompat.isDOMComponent)(node) ? (0, _reactCompat.findDOMNode)(node) : node;
}

function nodeHasType(node, type) {
  if (!type || !node) return false;
  if (!node.type) return false;
  if (typeof node.type === 'string') return node.type === type;
  return node.type.name === type || node.type.displayName === type;
}

function childrenEqual(a, b) {
  if (a === b) return true;
  if (!Array.isArray(a) && !Array.isArray(b)) {
    return nodeEqual(a, b);
  }
  if (!a && !b) return true;
  if (a.length !== b.length) return false;
  if (a.length === 0 && b.length === 0) return true;
  for (var i = 0; i < a.length; i++) {
    if (!nodeEqual(a[i], b[i])) return false;
  }
  return true;
}

function nodeEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.type !== b.type) return false;
  var left = propsOfNode(a);
  var leftKeys = Object.keys(left);
  var right = propsOfNode(b);
  for (var i = 0; i < leftKeys.length; i++) {
    var prop = leftKeys[i];
    if (!(prop in right)) return false;
    if (prop === 'children') {
      if (!childrenEqual((0, _reactCompat.childrenToArray)(left.children), (0, _reactCompat.childrenToArray)(right.children))) {
        return false;
      }
    } else if (right[prop] === left[prop]) {
      // continue;
    } else if (_typeof(right[prop]) === _typeof(left[prop]) && _typeof(left[prop]) === 'object') {
        if (!(0, _isEqual2['default'])(left[prop], right[prop])) return false;
      } else {
        return false;
      }
  }

  if (typeof a !== 'string' && typeof a !== 'number') {
    return leftKeys.length === Object.keys(right).length;
  }

  return false;
}

function containsChildrenSubArray(match, node, subArray) {
  var children = childrenOfNode(node);
  var checker = function checker(_, i) {
    return arraysEqual(match, children.slice(i, i + subArray.length), subArray);
  };
  return children.some(checker);
}

function arraysEqual(match, left, right) {
  return left.length === right.length && left.every(function (el, i) {
    return match(el, right[i]);
  });
}

function childrenOfNode(node) {
  var props = propsOfNode(node);
  var children = props.children;

  return (0, _reactCompat.childrenToArray)(children);
}

// 'click' => 'onClick'
// 'mouseEnter' => 'onMouseEnter'
function propFromEvent(event) {
  var nativeEvent = mapNativeEventNames(event);
  return 'on' + String(nativeEvent[0].toUpperCase()) + String(nativeEvent.substring(1));
}

function withSetStateAllowed(fn) {
  // NOTE(lmr):
  // this is currently here to circumvent a React bug where `setState()` is
  // not allowed without global being defined.
  var cleanup = false;
  if (typeof global.document === 'undefined') {
    cleanup = true;
    global.document = {};
  }
  fn();
  if (cleanup) {
    delete global.document;
  }
}

function splitSelector(selector) {
  return selector.split(/(?=\.|\[.*\])/);
}

function isSimpleSelector(selector) {
  // any of these characters pretty much guarantee it's a complex selector
  return !/[~\s:>]/.test(selector);
}

function selectorError(selector) {
  return new TypeError('Enzyme received a complex CSS selector (\'' + String(selector) + '\') that it does not currently support');
}

var isCompoundSelector = exports.isCompoundSelector = /([a-z]\.[a-z]|[a-z]\[.*\])/i;

var isPropSelector = /^\[.*\]$/;

var SELECTOR = exports.SELECTOR = {
  CLASS_TYPE: 0,
  ID_TYPE: 1,
  PROP_TYPE: 2
};

function selectorType(selector) {
  if (selector[0] === '.') {
    return SELECTOR.CLASS_TYPE;
  } else if (selector[0] === '#') {
    return SELECTOR.ID_TYPE;
  } else if (isPropSelector.test(selector)) {
    return SELECTOR.PROP_TYPE;
  }
  return undefined;
}

function AND(fns) {
  return function (x) {
    var i = fns.length;
    while (i--) {
      if (!fns[i](x)) return false;
    }
    return true;
  };
}

function coercePropValue(propName, propValue) {
  // can be undefined
  if (propValue === undefined) {
    return propValue;
  }

  var trimmedValue = propValue.trim();

  // if propValue includes quotes, it should be
  // treated as a string
  if (/^(['"]).*\1$/.test(trimmedValue)) {
    return trimmedValue.slice(1, -1);
  }

  var numericPropValue = +trimmedValue;

  // if parseInt is not NaN, then we've wanted a number
  if (!isNaN(numericPropValue)) {
    return numericPropValue;
  }

  // coerce to boolean
  if (trimmedValue === 'true') return true;
  if (trimmedValue === 'false') return false;

  // user provided an unquoted string value
  throw new TypeError('Enzyme::Unable to parse selector \'[' + String(propName) + '=' + String(propValue) + ']\'. ' + ('Perhaps you forgot to escape a string? Try \'[' + String(propName) + '="' + String(trimmedValue) + '"]\' instead.'));
}

function mapNativeEventNames(event) {
  var nativeToReactEventMap = {
    compositionend: 'compositionEnd',
    compositionstart: 'compositionStart',
    compositionupdate: 'compositionUpdate',
    keydown: 'keyDown',
    keyup: 'keyUp',
    keypress: 'keyPress',
    contextmenu: 'contextMenu',
    doubleclick: 'doubleClick',
    dragend: 'dragEnd',
    dragenter: 'dragEnter',
    dragexist: 'dragExit',
    dragleave: 'dragLeave',
    dragover: 'dragOver',
    dragstart: 'dragStart',
    mousedown: 'mouseDown',
    mousemove: 'mouseMove',
    mouseout: 'mouseOut',
    mouseover: 'mouseOver',
    mouseup: 'mouseUp',
    touchcancel: 'touchCancel',
    touchend: 'touchEnd',
    touchmove: 'touchMove',
    touchstart: 'touchStart',
    canplay: 'canPlay',
    canplaythrough: 'canPlayThrough',
    durationchange: 'durationChange',
    loadeddata: 'loadedData',
    loadedmetadata: 'loadedMetadata',
    loadstart: 'loadStart',
    ratechange: 'rateChange',
    timeupdate: 'timeUpdate',
    volumechange: 'volumeChange'
  };

  if (!_version.REACT013) {
    // these could not be simulated in React 0.13:
    // https://github.com/facebook/react/issues/1297
    nativeToReactEventMap.mouseenter = 'mouseEnter';
    nativeToReactEventMap.mouseleave = 'mouseLeave';
  }

  return nativeToReactEventMap[event] || event;
}