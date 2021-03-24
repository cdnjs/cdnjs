/**
* Tom Select v1.1.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import { KEY_BACKSPACE } from '../../constants.js';
import { preventDefault } from '../../utils.js';
import TomSelect from '../../tom-select.js';

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
TomSelect.define('restore_on_backspace', function (options) {
  var self = this;

  options.text = options.text || function (option) {
    return option[self.settings.labelField];
  };

  var orig_keydown = self.onKeyDown;
  self.hook('instead', 'onKeyDown', function (evt) {
    var index, option;

    if (evt.keyCode === KEY_BACKSPACE && self.control_input.value === '') {
      index = self.caretPos - 1; // selected item

      if (self.activeItems.length > 0) {
        option = self.options[self.activeItems[0].dataset.value]; // not selected item
      } else if (self.activeItems.length == 0 && index >= 0 && index < self.items.length) {
        option = self.options[self.items[index]];
      }

      if (option) {
        if (self.deleteSelection(evt)) {
          self.setTextboxValue(options.text.call(self, option));
          self.refreshOptions(true);
        }

        preventDefault(evt);
        return;
      }
    }

    return orig_keydown.apply(self, arguments);
  });
});
//# sourceMappingURL=plugin.js.map
