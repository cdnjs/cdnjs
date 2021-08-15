/**
* Tom Select v1.7.8
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../tom-select.js')) :
	typeof define === 'function' && define.amd ? define(['../../tom-select'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TomSelect));
}(this, (function (TomSelect) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var TomSelect__default = /*#__PURE__*/_interopDefaultLegacy(TomSelect);

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
	TomSelect__default['default'].define('no_backspace_delete', function () {
	  var self = this;
	  var orig_deleteSelection = self.deleteSelection;
	  this.hook('instead', 'deleteSelection', evt => {
	    if (self.activeItems.length) {
	      return orig_deleteSelection.call(self, evt);
	    }

	    return false;
	  });
	});

})));
//# sourceMappingURL=no_backspace_delete.js.map
