/*! SearchPane 0.0.2
 * 2018 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     SearchPane
 * @description Search Panes for DataTables columns
 * @version     0.0.2
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
	var DataTable = $.fn.dataTable;

	function SearchPanes(settings, opts) {
		var that = this;
		var table = new DataTable.Api(settings);

		this.classes = $.extend(true, {}, SearchPanes.classes);

		this.dom = {
			container: $('<div/>').addClass(this.classes.container)
		};

		this.c = $.extend(true, {}, SearchPanes.defaults, opts);

		this.s = {
			dt: table
		};

		table.settings()[0].searchPane = this;

		table
			.columns(this.c.columns)
			.eq(0)
			.each(function(idx) {
				that._pane(idx);
			});

		$(this.dom.container)
			.on('click', 'li', function() {
				that._toggle(this);
			})
			.on('click', 'button.' + this.classes.clear, function() {
				that._clear($(this).closest('div.' + that.classes.pane.container));
			});

		this._attach();
	}

	$.extend(SearchPanes.prototype, {
		rebuild: function() {
			var that = this;

			this.dom.container.empty();
			this.s.dt
				.columns(this.c.columns)
				.eq(0)
				.each(function(idx) {
					that._pane(idx);
				});
		},

		_attach: function() {
			var container = this.c.container;
			var host = typeof container === 'function' ? container(this.s.dt) : container;

			if (this.c.insert === 'prepend') {
				$(this.dom.container).prependTo(host);
			} else {
				$(this.dom.container).appendTo(host);
			}
		},

		_binData: function(data) {
			var out = {};

			for (var i = 0, ien = data.length; i < ien; i++) {
				var d = data[i];

				if (!d) {
					continue;
				}

				if (!out[d]) {
					out[d] = 1;
				} else {
					out[d]++;
				}
			}

			return out;
		},

		_clear: function(pane) {
			var classes = this.classes;
			var itemSelected = classes.item.selected;

			pane.find('li.' + itemSelected).removeClass(itemSelected);
			pane.removeClass(classes.pane.active);

			this.s.dt
				.column(pane.data('column'))
				.search('')
				.draw();
		},

		_pane: function(idx) {
			var classes = this.classes;
			var itemClasses = classes.item;
			var paneClasses = classes.pane;
			var table = this.s.dt;
			var column = table.column(idx);
			var colOpts = this._getOptions(idx);
			var list = $('<ul/>');
			var binData = typeof colOpts.options === 'function' ?
				colOpts.options( table, idx ) :
				colOpts.options ?
					new DataTable.Api(null, colOpts.options) :
					column.data();
			var bins = this._binData(binData.flatten());

			// Don't show the pane if there isn't enough variance in the data
			if (this._variance(bins) < this.c.threshold) {
				return;
			}

			// On initialisation, do we need to set a filtering value from a
			// saved state or init option?
			var search = column.search();
			search = search ? search.substr(1, search.length - 2).split('|') : [];

			var data = binData
				.unique()
				.sort()
				.toArray();

			for (var i = 0, ien = data.length; i < ien; i++) {
				if (data[i]) {
					var li = $('<li/>')
						.html('<span class="' + itemClasses.label + '">' + data[i] + '</span>')
						.data('filter', data[i])
						.append(
							$('<span/>')
								.addClass(itemClasses.count)
								.html(bins[data[i]])
						);

					if (search.length) {
						var escaped = data[i].replace ? $.fn.dataTable.util.escapeRegex(data[i]) : data[i];

						if ($.inArray(escaped, search) !== -1) {
							li.addClass(itemClasses.selected);
						}
					}

					list.append(li);
				}
			}

			var pane = $('<div/>')
				.data('column', idx)
				.addClass(paneClasses.container)
				.addClass(search.length ? paneClasses.active : '')
				.append($('<button type="button">&times;</button>').addClass(this.classes.clear))
				.append(
					$('<div/>')
						.addClass(paneClasses.title)
						.html($(column.header()).text())
				)
				.append(
					$('<div/>')
						.addClass(paneClasses.scroller)
						.append(list)
				);

			var container = this.dom.container;
			var replace = container.children().map(function() {
				if ($(this).data('column') == idx) {
					return this;
				}
			});

			if (replace.length) {
				replace.replaceWith(pane);
			} else {
				$(container).append(pane);
			}
		},

		_getOptions: function(colIdx) {
			var table = this.s.dt;

			return table.settings()[0].aoColumns[colIdx].searchPane || {};
		},

		_toggle: function(li) {
			var classes = this.classes;
			var itemSelected = classes.item.selected;
			var table = this.s.dt;
			var li = $(li);
			var pane = li.closest('div.' + classes.pane.container);
			var columnIdx = pane.data('column');
			var options = this._getOptions(columnIdx);

			li.toggleClass(itemSelected, !li.hasClass(itemSelected));

			var filters = pane.find('li.' + itemSelected);

			if (filters.length === 0) {
				pane.removeClass(classes.pane.active);
				table
					.column(columnIdx)
					.search('')
					.draw();
			} else if (options.match === 'any') {
				// Allow sub-word matching
				pane.addClass(classes.pane.active);
				table
					.column(columnIdx)
					.search(
						'(' +
							$.map(filters, function(filter) {
								var d = $(filter)
									.data('filter')
									.toString();
								var decoded = $('<div/>')
									.html(d)
									.text();
								return $.fn.dataTable.util.escapeRegex(decoded);
							}).join('|') +
							')',
						true,
						false
					)
					.draw();
			} else {
				// Only search on the full phrase
				pane.addClass(classes.pane.active);
				table
					.column(columnIdx)
					.search(
						'^(' +
							$.map(filters, function(filter) {
								var d = $(filter)
									.data('filter')
									.toString();
								var decoded = $('<div/>')
									.html(d)
									.text();
								return $.fn.dataTable.util.escapeRegex(decoded);
							}).join('|') +
							')$',
						true,
						false
					)
					.draw();
			}
		},

		_variance: function(d) {
			var data = $.map(d, function(val, key) {
				return val;
			});

			var count = data.length;
			var sum = 0;
			for (var i = 0, ien = count; i < ien; i++) {
				sum += data[i];
			}

			var mean = sum / count;
			var varSum = 0;
			for (var i = 0, ien = count; i < ien; i++) {
				varSum += Math.pow(mean - data[i], 2);
			}

			return varSum / (count - 1);
		}
	});

	SearchPanes.classes = {
		container: 'dt-searchPanes',
		clear: 'clear',
		pane: {
			active: 'filtering',
			container: 'pane',
			title: 'title',
			scroller: 'scroller'
		},
		item: {
			selected: 'selected',
			label: 'label',
			count: 'count'
		}
	};

	SearchPanes.defaults = {
		container: function(dt) {
			return dt.table().container();
		},
		columns: undefined,
		insert: 'prepend',
		threshold: 0.5
	};

	SearchPanes.version = '0.0.2';

	$.fn.dataTable.SearchPanes = SearchPanes;
	$.fn.DataTable.SearchPanes = SearchPanes;

	DataTable.Api.register('searchPanes.rebuild()', function() {
		return this.iterator('table', function(ctx) {
			if (ctx.searchPane) {
				ctx.searchPane.rebuild();
			}
		});
	});

	DataTable.Api.register('column().paneOptions()', function(options) {
		return this.iterator('column', function(ctx, idx) {
			var col = ctx.aoColumns[idx];

			if (!col.searchPane) {
				col.searchPane = {};
			}
			col.searchPane.values = options;

			if (ctx.searchPane) {
				ctx.searchPane.rebuild();
			}
		});
	});

	$(document).on('init.dt', function(e, settings, json) {
		if (e.namespace !== 'dt') {
			return;
		}

		var init = settings.oInit.searchPane;
		var defaults = DataTable.defaults.searchPane;

		if (init || defaults) {
			var opts = $.extend({}, init, defaults);

			if (init !== false) {
				new SearchPanes(settings, opts);
			}
		}
	});
});
