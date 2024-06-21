/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import canUseDOM from '../../modules/canUseDom';
function getQuery() {
  return canUseDOM && window.matchMedia != null ? window.matchMedia('(prefers-color-scheme: dark)') : null;
}
var query = getQuery();
var listenerMapping = new WeakMap();
var Appearance = {
  getColorScheme() {
    return query && query.matches ? 'dark' : 'light';
  },
  addChangeListener(listener) {
    var mappedListener = listenerMapping.get(listener);
    if (!mappedListener) {
      mappedListener = _ref => {
        var matches = _ref.matches;
        listener({
          colorScheme: matches ? 'dark' : 'light'
        });
      };
      listenerMapping.set(listener, mappedListener);
    }
    if (query) {
      query.addListener(mappedListener);
    }
    function remove() {
      var mappedListener = listenerMapping.get(listener);
      if (query && mappedListener) {
        query.removeListener(mappedListener);
      }
      listenerMapping.delete(listener);
    }
    return {
      remove
    };
  }
};
export default Appearance;