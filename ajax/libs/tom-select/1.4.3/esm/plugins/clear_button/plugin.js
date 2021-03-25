/**
* Tom Select v1.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';
import { getDom } from '../../vanilla.js';

/**
 * Plugin: "dropdown_header" (Tom Select)
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
TomSelect.define('clear_button', function (options) {
  var self = this;
  options = Object.assign({
    className: 'clear-button',
    title: 'Clear All',
    html: data => {
      return `<div class="${data.className}" title="${data.title}">&times;</div>`;
    }
  }, options);
  self.hook('after', 'setup', () => {
    var button = getDom(options.html(options));
    button.addEventListener('click', evt => {
      while (self.items.length > 0) {
        self.removeItem(self.items[0], true);
      }

      self.updateOriginalInput();
      evt.preventDefault();
      evt.stopPropagation();
    });
    self.control.appendChild(button);
  });
});
//# sourceMappingURL=plugin.js.map
