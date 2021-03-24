/**
* Tom Select v1.1.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import { getDom } from '../../vanilla.js';
import TomSelect from '../../tom-select.js';

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
TomSelect.define('dropdown_header', function (options) {
  var self = this;
  options = Object.assign({
    title: 'Untitled',
    headerClass: 'dropdown-header',
    titleRowClass: 'dropdown-header-title',
    labelClass: 'dropdown-header-label',
    closeClass: 'dropdown-header-close',
    html: data => {
      return '<div class="' + data.headerClass + '">' + '<div class="' + data.titleRowClass + '">' + '<span class="' + data.labelClass + '">' + data.title + '</span>' + '<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' + '</div>' + '</div>';
    }
  }, options);
  self.hook('after', 'setup', () => {
    var header = getDom(options.html(options));
    self.dropdown.insertBefore(header, self.dropdown.firstChild);
  });
});
//# sourceMappingURL=plugin.js.map
