/**
* Tom Select v1.7.8
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import TomSelect from '../../tom-select.js';

/**
 * Plugin: "drag_drop" (Tom Select)
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
TomSelect.define('drag_drop', function () {
  var self = this;
  if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
  if (self.settings.mode !== 'multi') return;
  var orig_lock = self.lock;
  var orig_unlock = self.unlock;
  self.hook('instead', 'lock', () => {
    var sortable = $(self.control).data('sortable');
    if (sortable) sortable.disable();
    return orig_lock.call(self);
  });
  self.hook('instead', 'unlock', () => {
    var sortable = $(self.control).data('sortable');
    if (sortable) sortable.enable();
    return orig_unlock.call(self);
  });
  self.on('initialize', () => {
    var $control = $(self.control).sortable({
      items: '[data-value]',
      forcePlaceholderSize: true,
      disabled: self.isLocked,
      start: (e, ui) => {
        ui.placeholder.css('width', ui.helper.css('width'));
        $control.css({
          overflow: 'visible'
        });
      },
      stop: () => {
        $control.css({
          overflow: 'hidden'
        });
        var values = [];
        $control.children('[data-value]').each(function () {
          if (this.dataset.value) values.push(this.dataset.value);
        });
        self.setValue(values);
      }
    });
  });
});
//# sourceMappingURL=plugin.js.map
