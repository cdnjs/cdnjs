/**
* Tom Select v1.1.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

import { addEvent } from '../../utils.js';
import TomSelect from '../../tom-select.js';

/**
 * Plugin: "input_autogrow" (Tom Select)
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
TomSelect.define('input_autogrow', function (options) {
  var self = this;
  self.hook('after', 'setup', () => {
    var test_input = document.createElement('span');
    var control = this.control_input;
    test_input.style.cssText = 'position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ';
    self.wrapper.appendChild(test_input);
    var transfer_styles = ['letterSpacing', 'fontSize', 'fontFamily', 'fontWeight', 'textTransform'];

    for (let i = 0, n = transfer_styles.length; i < n; i++) {
      let style_name = transfer_styles[i];
      test_input.style[style_name] = control.style[style_name];
    }
    /**
     * Set the control width
     *
     */


    var resize = () => {
      test_input.textContent = control.value;
      control.style.width = test_input.clientWidth + 'px';
    };

    addEvent(control, 'input', resize);
    addEvent(control, 'keyup', resize);
    addEvent(control, 'blur', resize);
    addEvent(control, 'update', resize);
  });
});
//# sourceMappingURL=plugin.js.map
