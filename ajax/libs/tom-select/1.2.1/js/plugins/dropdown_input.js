/**
* Tom Select v1.2.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../tom-select.ts')) :
	typeof define === 'function' && define.amd ? define(['../../tom-select.ts'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TomSelect));
}(this, (function (TomSelect) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var TomSelect__default = /*#__PURE__*/_interopDefaultLegacy(TomSelect);

	const KEY_RETURN = 13;
	typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
	 // ctrl key or apple key for ma

	/**
	 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
	 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
	 *
	 * param query should be {}
	 */
	function getDom(query) {
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
	}

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

	function addEvent(target, type, callback, options) {
	  target.addEventListener(type, callback, options);
	}

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
	TomSelect__default['default'].define('dropdown_input', function () {
	  var self = this;
	  var input = self.settings.controlInput || '<input type="text" autocomplete="off" class="dropdown-input" />';
	  input = getDom(input);
	  self.settings.controlInput = input;
	  self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	  self.hook('after', 'setup', () => {
	    // set tabIndex on wrapper
	    self.wrapper.setAttribute('tabindex', self.input.disabled ? '-1' : self.tabIndex); // keyboard navigation

	    addEvent(self.wrapper, 'keypress', evt => {
	      if (self.control.contains(evt.target)) {
	        return;
	      }

	      if (self.dropdown.contains(evt.target)) {
	        return;
	      } // open dropdown on enter when wrapper is tab-focused


	      switch (evt.keyCode) {
	        case KEY_RETURN:
	          self.onClick(evt);
	          return;
	      }
	    });
	    self.dropdown.insertBefore(input, self.dropdown.firstChild);
	  });
	});

})));
//# sourceMappingURL=dropdown_input.js.map
