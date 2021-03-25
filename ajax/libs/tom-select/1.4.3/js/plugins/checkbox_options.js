/**
* Tom Select v1.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../tom-select.ts')) :
	typeof define === 'function' && define.amd ? define(['../../tom-select.ts'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TomSelect));
}(this, (function (TomSelect) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var TomSelect__default = /*#__PURE__*/_interopDefaultLegacy(TomSelect);

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
	function hash_key(value) {
	  if (typeof value === 'undefined' || value === null) return null;
	  if (typeof value === 'boolean') return value ? '1' : '0';
	  return value + '';
	}
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
	TomSelect__default['default'].define('checkbox_options', function (options) {
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

})));
//# sourceMappingURL=checkbox_options.js.map
