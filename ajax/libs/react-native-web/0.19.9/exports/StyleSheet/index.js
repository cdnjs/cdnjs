import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["writingDirection"];
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import { atomic, classic, inline } from './compiler';
import { createSheet } from './dom';
import { localizeStyle } from 'styleq/transform-localize-style';
import { preprocess } from './preprocess';
import { styleq } from 'styleq';
import { validate } from './validate';
import canUseDOM from '../../modules/canUseDom';
var staticStyleMap = new WeakMap();
var sheet = createSheet();
var defaultPreprocessOptions = {
  shadow: true,
  textShadow: true
};
function customStyleq(styles, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    writingDirection = _options.writingDirection,
    preprocessOptions = _objectWithoutPropertiesLoose(_options, _excluded);
  var isRTL = writingDirection === 'rtl';
  return styleq.factory({
    transform(style) {
      var compiledStyle = staticStyleMap.get(style);
      if (compiledStyle != null) {
        return localizeStyle(compiledStyle, isRTL);
      }
      return preprocess(style, _objectSpread(_objectSpread({}, defaultPreprocessOptions), preprocessOptions));
    }
  })(styles);
}
function insertRules(compiledOrderedRules) {
  compiledOrderedRules.forEach(_ref => {
    var rules = _ref[0],
      order = _ref[1];
    if (sheet != null) {
      rules.forEach(rule => {
        sheet.insert(rule, order);
      });
    }
  });
}
function compileAndInsertAtomic(style) {
  var _atomic = atomic(preprocess(style, defaultPreprocessOptions)),
    compiledStyle = _atomic[0],
    compiledOrderedRules = _atomic[1];
  insertRules(compiledOrderedRules);
  return compiledStyle;
}
function compileAndInsertReset(style, key) {
  var _classic = classic(style, key),
    compiledStyle = _classic[0],
    compiledOrderedRules = _classic[1];
  insertRules(compiledOrderedRules);
  return compiledStyle;
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
  Object.keys(styles).forEach(key => {
    var styleObj = styles[key];
    // Only compile at runtime if the style is not already compiled
    if (styleObj != null && styleObj.$$css !== true) {
      var compiledStyles;
      if (key.indexOf('$raw') > -1) {
        compiledStyles = compileAndInsertReset(styleObj, key.split('$raw')[0]);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          validate(styleObj);
          styles[key] = Object.freeze(styleObj);
        }
        compiledStyles = compileAndInsertAtomic(styleObj);
      }
      staticStyleMap.set(styleObj, compiledStyles);
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
      var readableStyles = [...arguments].map(a => flatten(a));
      throw new Error("StyleSheet.compose() only accepts 2 arguments, received " + len + ": " + JSON.stringify(readableStyles));
    }
    /* eslint-enable prefer-rest-params */
    console.warn('StyleSheet.compose(a, b) is deprecated; use array syntax, i.e., [a,b].');
  }
  return [style1, style2];
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

function StyleSheet(styles, options) {
  if (options === void 0) {
    options = {};
  }
  var isRTL = options.writingDirection === 'rtl';
  var styleProps = customStyleq(styles, options);
  if (Array.isArray(styleProps) && styleProps[1] != null) {
    styleProps[1] = inline(styleProps[1], isRTL);
  }
  return styleProps;
}
StyleSheet.absoluteFill = absoluteFill;
StyleSheet.absoluteFillObject = absoluteFillObject;
StyleSheet.create = create;
StyleSheet.compose = compose;
StyleSheet.flatten = flatten;
StyleSheet.getSheet = getSheet;
// `hairlineWidth` is not implemented using screen density as browsers may
// round sub-pixel values down to `0`, causing the line not to be rendered.
StyleSheet.hairlineWidth = 1;
if (canUseDOM && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.resolveRNStyle = StyleSheet.flatten;
}
var stylesheet = StyleSheet;
export default stylesheet;