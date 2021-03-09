/*! SearchFade 0.0.1
 * 2018 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     SearchFade
 * @description Search and Fade unmatching rows in a DataTables
 * @version     0.0.1
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @copyright   Copyright 2018 SpryMedia Ltd.
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

	$.fn.dataTable.Api.register('searchFade()', function() {
		return this;
	});

	$.fn.dataTable.Api.register('searchFade().node()', function() {
		return this.settings()[0].searchFadeNode;
	});

	function _draw(table, searchFade) {
		searchFade.empty();
		searchFade.append('Search: ');

		$('<input type="text" class="searchFadeInput' + table.settings()[0].sTableId + '">').appendTo(searchFade);
	}

	$.fn.dataTable.SearchFade = function(settings) {
		var table = new $.fn.dataTable.Api(settings);
		var searchFade = $('<div class="searchFade"/>');

		table.settings()[0].searchFadeNode = searchFade;

		_draw(table, searchFade);

		// Trigger a search
		searchFade.on('keyup redraw', 'input', function() {
			table.rows(':visible').every(function(rowIdx, tableLoop, rowLoop) {
				var present = true;
				if ($('.searchFadeInput' + table.settings()[0].sTableId).val().length) {
					present = table
						.row(rowIdx)
						.data()
						.some(function(v) {
							return v.match(new RegExp($('.searchFadeInput' + table.settings()[0].sTableId).val(), 'i')) != null;
						});
				}
				$(table.row(rowIdx).node()).toggleClass('notMatched', !present);
			});
		});

		table.on('draw', function() {
			$('input', searchFade).trigger('redraw');
		});

		// API method to get the searchFade container node
		this.node = function() {
			return searchFade;
		};
	};

	$.fn.DataTable.SearchFade = $.fn.dataTable.SearchFade;

	$.fn.dataTable.ext.feature.push({
		fnInit: function(settings) {
			var search = new $.fn.dataTable.SearchFade(settings);
			return search.node();
		},
		cFeature: 'F'
	});

	$(document).on('init.dt', function(e, settings, json) {
		if (e.namespace === 'dt') {
			$.fn.dataTable.SearchFade(settings);
		}

		return;
	});
});
