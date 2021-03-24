/**
* Tom Select v1.1.2
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../tom-select.ts')) :
	typeof define === 'function' && define.amd ? define(['../../tom-select.ts'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TomSelect));
}(this, (function (TomSelect) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var TomSelect__default = /*#__PURE__*/_interopDefaultLegacy(TomSelect);

	const KEY_BACKSPACE = 8;
	const IS_MAC = typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
	 // ctrl key or apple key for ma

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

	function preventDefault(evt, stop = false) {
	  if (evt) {
	    evt.preventDefault();

	    if (stop) {
	      evt.stopPropagation();
	    }
	  }
	}

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
	TomSelect__default['default'].define('restore_on_backspace', function (options) {
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

})));
//# sourceMappingURL=restore_on_backspace.js.map
