/* ==========================================================
 * sco.ajax.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2013 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, eqeqeq:false */
/*global Spinner:true */

;(function($, undefined) {
	"use strict";

	var pluginName = 'scojs_ajax';

	$(document).on('click.' + pluginName, '[data-trigger="ajax"]', function() {
		var $this = $(this)
			,data = $this.data()
			,$target
			,spinner
			;
		if (typeof data['target'] != 'undefined') {
			$target = $(data['target']);
			if (typeof Spinner == 'function') {
				spinner = new Spinner({color: '#3d9bce'}).spin($target[0]);
			}
			$target.load($this.attr('href'), function() {
				if (spinner) {
					spinner.stop();
				}
			});
			return false;
		}
	});
})(jQuery);
