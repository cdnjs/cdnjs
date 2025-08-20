/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var CSS_UNIT_RE = /^[+-]?\d*(?:\.\d+)?(?:[Ee][+-]?\d+)?(%|\w*)/;
var getUnit = str => str.match(CSS_UNIT_RE)[1];
var isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
var multiplyStyleLengthValue = (value, multiple) => {
  if (typeof value === 'string') {
    var number = parseFloat(value) * multiple;
    var unit = getUnit(value);
    return "" + number + unit;
  } else if (isNumeric(value)) {
    return value * multiple;
  }
};
export default multiplyStyleLengthValue;