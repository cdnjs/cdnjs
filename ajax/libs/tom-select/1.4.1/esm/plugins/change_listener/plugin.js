/**
* Tom Select v1.4.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';
import getSettings from '../../getSettings.js';
import { addEvent } from '../../utils.js';

/**
 * Plugin: "change_listener" (Tom Select)
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
TomSelect.define('change_listener', function (options) {
  var self = this;
  var changed = false;
  addEvent(self.input, 'change', () => {
    // prevent infinite loops
    if (changed) {
      changed = false;
      return;
    }

    changed = true;
    var settings = getSettings(self.input, {});
    self.setupOptions(settings.options, settings.optgroups);
    self.setValue(settings.items);
  });
});
//# sourceMappingURL=plugin.js.map
