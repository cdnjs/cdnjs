"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findClosest;

/**
 * Finds the closest value in the search array to the value provided using a binary search
 * If the value is in the middle of two candidate values, it chooses the higher value
 */
function findClosest(searchValue, arr) {
  if (searchValue < arr[0]) {
    return arr[0];
  }

  if (searchValue > arr[arr.length - 1]) {
    return arr[arr.length - 1];
  }

  var mid;
  var lo = 0;
  var hi = arr.length - 1;

  while (hi - lo > 1) {
    mid = Math.floor((lo + hi) / 2);

    if (arr[mid] < searchValue) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  if (searchValue - arr[lo] < arr[hi] - searchValue) {
    return arr[lo];
  }

  return arr[hi];
}
//# sourceMappingURL=findClosest.js.map