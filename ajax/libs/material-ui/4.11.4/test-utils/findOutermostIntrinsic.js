"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapsIntrinsicElement = wrapsIntrinsicElement;
exports.default = findOutermostIntrinsic;

/**
 * checks if a given react wrapper wraps an intrinsic element i.e. a DOM node
 *
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {boolean} true if the given reactWrapper wraps an intrinsic element
 */
function wrapsIntrinsicElement(reactWrapper) {
  return typeof reactWrapper.type() === 'string';
}
/**
 * like ReactWrapper#getDOMNode() but returns a ReactWrapper
 *
 * @param {import('enzyme').ReactWrapper} reactWrapper
 * @returns {import('enzyme').ReactWrapper} the wrapper for the outermost DOM node
 */


function findOutermostIntrinsic(reactWrapper) {
  return reactWrapper.findWhere(function (n) {
    return n.exists() && wrapsIntrinsicElement(n);
  }).first();
}