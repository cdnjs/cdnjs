/**
* Tom Select v1.7.8
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
 // ctrl key or apple key for ma

/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */

const parentMatch = (target, selector, wrapper) => {
  if (wrapper && !wrapper.contains(target)) {
    return;
  }

  while (target && target.matches) {
    if (target.matches(selector)) {
      return target;
    }

    target = target.parentNode;
  }
};
/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */

const nodeIndex = (el, amongst) => {
  if (!el) return -1;
  amongst = amongst || el.nodeName;
  var i = 0;

  while (el = el.previousElementSibling) {
    if (el.matches(amongst)) {
      i++;
    }
  }

  return i;
};

/**
 * Plugin: "optgroup_columns" (Tom Select.js)
 * Copyright (c) contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */
TomSelect.define('optgroup_columns', function () {
  var self = this;
  var orig_keydown = self.onKeyDown;
  self.hook('instead', 'onKeyDown', evt => {
    var index, option, options, optgroup;

    if (!self.isOpen || !(evt.keyCode === KEY_LEFT || evt.keyCode === KEY_RIGHT)) {
      return orig_keydown.call(self, evt);
    }

    optgroup = parentMatch(self.activeOption, '[data-group]');
    index = nodeIndex(self.activeOption, '[data-selectable]');

    if (!optgroup) {
      return;
    }

    if (evt.keyCode === KEY_LEFT) {
      optgroup = optgroup.previousSibling;
    } else {
      optgroup = optgroup.nextSibling;
    }

    if (!optgroup) {
      return;
    }

    options = optgroup.querySelectorAll('[data-selectable]');
    option = options[Math.min(options.length - 1, index)];

    if (option) {
      self.setActiveOption(option);
    }
  });
});
//# sourceMappingURL=plugin.js.map
