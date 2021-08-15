/**
* Tom Select v1.7.8
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';

const KEY_RETURN = 13;
typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
 // ctrl key or apple key for ma

/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
const getDom = query => {
  if (query.jquery) {
    return query[0];
  }

  if (query instanceof HTMLElement) {
    return query;
  }

  if (query.indexOf('<') > -1) {
    let div = document.createElement('div');
    div.innerHTML = query.trim(); // Never return a text node of whitespace as the result

    return div.firstChild;
  }

  return document.querySelector(query);
};
/**
 * Set attributes of an element
 *
 */

const setAttr = (el, attrs) => {
  for (const attr in attrs) {
    let val = attrs[attr];

    if (val == null) {
      el.removeAttribute(attr);
    } else {
      el.setAttribute(attr, '' + val);
    }
  }
};

/**
 * Converts a scalar to its best string representation
 * for hash keys and HTML attribute values.
 *
 * Transformations:
 *   'str'     -> 'str'
 *   null      -> ''
 *   undefined -> ''
 *   true      -> '1'
 *   false     -> '0'
 *   0         -> '0'
 *   1         -> '1'
 *
 */
/**
 * Prevent default
 *
 */

const addEvent = (target, type, callback, options) => {
  target.addEventListener(type, callback, options);
};

/**
 * Plugin: "dropdown_input" (Tom Select)
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
TomSelect.define('dropdown_input', function () {
  var self = this;
  var input = self.settings.controlInput || '<input type="text" autocomplete="off" class="dropdown-input" />';
  input = getDom(input);

  if (self.settings.placeholder) {
    setAttr(input, {
      placeholder: self.settings.placeholder
    });
  }

  self.settings.controlInput = input;
  self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

  self.on('initialize', () => {
    // open/close dropdown when tabbing focus on wrapper
    addEvent(self.wrapper, 'focus', evt => {
      self.onFocus(evt);
    });

    const setTabIndex = () => {
      setAttr(self.wrapper, {
        tabindex: self.input.disabled ? '-1' : self.tabIndex
      });
    };

    self.on('dropdown_close', setTabIndex);
    self.on('dropdown_open', () => setAttr(self.wrapper, {
      tabindex: '-1'
    }));
    setTabIndex(); // keyboard navigation

    addEvent(self.wrapper, 'keypress', evt => {
      if (self.control.contains(evt.target)) {
        return;
      }

      if (self.dropdown.contains(evt.target)) {
        return;
      } // open dropdown on enter when wrapper is tab-focused


      switch (evt.keyCode) {
        case KEY_RETURN:
          self.onClick();
          return;
      }
    });
    let div = getDom('<div class="dropdown-input-wrap">');
    div.appendChild(input);
    self.dropdown.insertBefore(div, self.dropdown.firstChild);
  });
});
//# sourceMappingURL=plugin.js.map
