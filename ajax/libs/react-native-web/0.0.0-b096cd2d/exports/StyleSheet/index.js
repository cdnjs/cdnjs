function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { atomic, classic, inline, preprocess } from './compiler';
import { createSheet } from './dom';
import { styleq } from 'styleq';
import { validate } from './validate';
var staticStyleMap = new WeakMap();
var sheet = createSheet();

function customStyleq(styles, isRTL) {
  return styleq.factory({
    transform: function transform(style) {
      if (staticStyleMap.has(style)) {
        var compiledStyles = staticStyleMap.get(style);

        if (Array.isArray(compiledStyles)) {
          return isRTL ? compiledStyles[1] : compiledStyles[0];
        }
      }

      return style;
    }
  })(styles);
}

function compileAndInsert(style) {
  var _atomic = atomic(preprocess(style)),
      compiledStyle = _atomic[0],
      compiledOrderedRules = _atomic[1];

  var _atomic2 = atomic(preprocess(style, true)),
      compiledRTLStyle = _atomic2[0],
      compiledRTLOrderedRules = _atomic2[1];

  [].concat(compiledOrderedRules, compiledRTLOrderedRules).forEach(function (_ref) {
    var rules = _ref[0],
        order = _ref[1];

    if (sheet != null) {
      rules.forEach(function (rule) {
        sheet.insert(rule, order);
      });
    }
  });
  return [compiledStyle, compiledRTLStyle];
}

function compileAndInsertReset(style, key) {
  var _classic = classic(style, key),
      compiledStyle = _classic[0],
      compiledOrderedRules = _classic[1];

  compiledOrderedRules.forEach(function (_ref2) {
    var rules = _ref2[0],
        order = _ref2[1];

    if (sheet != null) {
      rules.forEach(function (rule) {
        sheet.insert(rule, order);
      });
    }
  });
  return [compiledStyle, compiledStyle];
}
/* ----- API ----- */


var absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
var absoluteFill = create({
  x: _objectSpread({}, absoluteFillObject)
}).x;
/**
 * create
 */

function create(styles) {
  Object.keys(styles).forEach(function (key) {
    var styleObj = styles[key];

    if (styleObj != null) {
      if (key.indexOf('$raw') > -1) {
        var compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
        staticStyleMap.set(styleObj, compiledStyles);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          styles[key] = Object.freeze(styleObj);
        }

        var _compiledStyles = compileAndInsert(styleObj);

        staticStyleMap.set(styleObj, _compiledStyles);
      }
    }
  });
  return styles;
}
/**
 * compose
 */


function compose(style1, style2) {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable prefer-rest-params */
    var len = arguments.length;

    if (len > 2) {
      var readableStyles = Array.prototype.slice.call(arguments).map(function (a) {
        return flatten(a);
      });
      throw new Error("StyleSheet.compose() only accepts 2 arguments, received " + len + ": " + JSON.stringify(readableStyles));
    }
    /* eslint-enable prefer-rest-params */

  }

  if (style1 && style2) {
    return [style1, style2];
  } else {
    return style1 || style2;
  }
}
/**
 * flatten
 */


function flatten() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  var flatArray = styles.flat(Infinity);
  var result = {};

  for (var i = 0; i < flatArray.length; i++) {
    var style = flatArray[i];

    if (style != null && typeof style === 'object') {
      // $FlowFixMe
      Object.assign(result, style);
    }
  }

  return result;
}
/**
 * getSheet
 */


function getSheet() {
  return {
    id: sheet.id,
    textContent: sheet.getTextContent()
  };
}
/**
 * resolve
 */


function StyleSheet(styles, isRTL) {
  var styleProps = customStyleq(styles, isRTL);

  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(preprocess(styleProps[1], isRTL));
  }

  return styleProps;
}

StyleSheet.absoluteFill = absoluteFill;
StyleSheet.absoluteFillObject = absoluteFillObject;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet; // `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.

StyleSheet.hairlineWidth = 1;

if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}

var stylesheet = StyleSheet;
export default stylesheet;