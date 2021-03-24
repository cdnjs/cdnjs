/**
* Tom Select v1.4.0
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';
import { preventDefault, hash_key } from '../../utils.js';
import { getDom } from '../../vanilla.js';

/**
 * Plugin: "restore_on_backspace" (Tom Select)
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
TomSelect.define('checkbox_options', function (options) {
  var self = this;
  var orig_onOptionSelect = self.onOptionSelect;
  self.settings.hideSelected = false; // update the checkbox for an option

  var UpdateCheckbox = function UpdateCheckbox(option) {
    var checkbox = option.querySelector('input');

    if (option.classList.contains('selected')) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }; // add checkbox to option template


  self.hook('after', 'setupTemplates', () => {
    var orig_render_option = self.settings.render.option;

    self.settings.render.option = function (data) {
      var rendered = getDom(orig_render_option.apply(self, arguments));
      var checkbox = document.createElement('input');
      checkbox.addEventListener('click', function (evt) {
        preventDefault(evt);
      });
      checkbox.type = 'checkbox';
      var value = hash_key(data[self.settings.valueField]);

      if (self.items.indexOf(value) > -1) {
        checkbox.checked = true;
      }

      rendered.prepend(checkbox);
      return rendered;
    };
  }); // uncheck when item removed

  self.on('item_remove', value => {
    var option = self.getOption(value);

    if (option) {
      // if dropdown hasn't been opened yet, the option won't exist
      option.classList.remove('selected'); // selected class won't be removed yet

      UpdateCheckbox(option);
    }
  }); // remove items when selected option is clicked

  self.hook('instead', 'onOptionSelect', function (evt, option) {
    if (option.classList.contains('selected')) {
      option.classList.remove('selected');
      self.removeItem(option.dataset.value);
      self.refreshOptions();
      preventDefault(evt, true);
      return;
    }

    return orig_onOptionSelect.apply(self, arguments);
  }); // update option checkbox

  self.hook('after', 'onOptionSelect', (evt, option) => {
    UpdateCheckbox(option);
  });
});
//# sourceMappingURL=plugin.js.map
