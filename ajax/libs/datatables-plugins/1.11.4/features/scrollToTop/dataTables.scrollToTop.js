/*! scrollToTop 0.0.1
 * 2019 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     scrollToTop
 * @description always return to top of table when page changed
 * @version     0.0.1
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @copyright   Copyright 2019 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function($) {
			return factory($, window, document);
		});
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function(root, $) {
			if (!root) {
				root = window;
			}

			if (!$ || !$.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	} else {
		// Browser
		factory(jQuery, window, document);
	}
})(function($, window, document, undefined) {
	'use strict';

	// Automatic initialisation listener
	$(document).on('preInit.dt', function(e, settings) {
		if (e.namespace !== 'dt') {
			return;
		}

		if (settings.oInit.scrollToTop || $.fn.dataTable.defaults.scrollToTop) {
			var api = new $.fn.dataTable.Api(settings);

			api.on('page', function() {
				setTimeout(function() {
					$(document).scrollTop($(api.table().container()).offset().top);
				}, 10);
			});
		}
	});
});
