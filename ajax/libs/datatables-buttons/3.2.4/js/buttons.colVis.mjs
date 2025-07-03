/*!
 * Column visibility buttons for Buttons and DataTables.
 * © SpryMedia Ltd - datatables.net/license
 */

import jQuery from 'jquery';
import DataTable from 'datatables.net';
import Buttons from 'datatables.net-buttons';

// Allow reassignment of the $ variable
let $ = jQuery;


$.extend(DataTable.ext.buttons, {
	// A collection of column visibility buttons
	colvis: function (dt, conf) {
		var node = null;
		var buttonConf = {
			extend: 'collection',
			init: function (dt, n) {
				node = n;
			},
			text: function (dt) {
				return dt.i18n('buttons.colvis', 'Column visibility');
			},
			className: 'buttons-colvis',
			closeButton: false,
			buttons: [
				{
					extend: 'columnsToggle',
					columns: conf.columns,
					columnText: conf.columnText
				}
			]
		};

		// Rebuild the collection with the new column structure if columns are reordered
		dt.on('column-reorder.dt' + conf.namespace, function () {
			dt.button(null, dt.button(null, node).node()).collectionRebuild([
				{
					extend: 'columnsToggle',
					columns: conf.columns,
					columnText: conf.columnText
				}
			]);
		});

		return buttonConf;
	},

	// Selected columns with individual buttons - toggle column visibility
	columnsToggle: function (dt, conf) {
		var columns = dt
			.columns(conf.columns)
			.indexes()
			.map(function (idx) {
				return {
					extend: 'columnToggle',
					columns: idx,
					columnText: conf.columnText
				};
			})
			.toArray();

		return columns;
	},

	// Single button to toggle column visibility
	columnToggle: function (dt, conf) {
		return {
			extend: 'columnVisibility',
			columns: conf.columns,
			columnText: conf.columnText
		};
	},

	// Selected columns with individual buttons - set column visibility
	columnsVisibility: function (dt, conf) {
		var columns = dt
			.columns(conf.columns)
			.indexes()
			.map(function (idx) {
				return {
					extend: 'columnVisibility',
					columns: idx,
					visibility: conf.visibility,
					columnText: conf.columnText
				};
			})
			.toArray();

		return columns;
	},

	// Single button to set column visibility
	columnVisibility: {
		columns: undefined, // column selector
		text: function (dt, button, conf) {
			return conf._columnText(dt, conf);
		},
		className: 'buttons-columnVisibility',
		action: function (e, dt, button, conf) {
			var col = dt.columns(conf.columns);
			var curr = col.visible();

			col.visible(
				conf.visibility !== undefined ? conf.visibility : !(curr.length ? curr[0] : false)
			);
		},
		init: function (dt, button, conf) {
			var that = this;
			var column = dt.column(conf.columns);

			button.attr('data-cv-idx', conf.columns);

			dt.on('column-visibility.dt' + conf.namespace, function (e, settings, index, state) {
				if (
					column.index() === index &&
					!settings.bDestroying &&
					settings.nTable == dt.settings()[0].nTable
				) {
					that.active(state);
				}
			}).on('column-reorder.dt' + conf.namespace, function () {
				// Button has been removed from the DOM
				if (conf.destroying) {
					return;
				}

				if (dt.columns(conf.columns).count() !== 1) {
					return;
				}

				// Reassign the column for the updated indexes
				column = dt.column(conf.columns);

				// This button controls the same column index but the text for the column has
				// changed
				that.text(conf._columnText(dt, conf));

				// Since its a different column, we need to check its visibility
				that.active(column.visible());
			});

			this.active(column.visible());
		},
		destroy: function (dt, button, conf) {
			dt.off('column-visibility.dt' + conf.namespace).off(
				'column-reorder.dt' + conf.namespace
			);
		},

		_columnText: function (dt, conf) {
			if (typeof conf.text === 'string') {
				return conf.text;
			}

			var title = dt.column(conf.columns).title();
			var idx = dt.column(conf.columns).index();

			title = title
				.replace(/\n/g, ' ') // remove new lines
				.replace(/<br\s*\/?>/gi, ' ') // replace line breaks with spaces
				.replace(/<select(.*?)<\/select\s*>/gi, ''); // remove select tags, including options text

			// Strip HTML comments
			title = DataTable.Buttons.stripHtmlComments(title);

			// Use whatever HTML stripper DataTables is configured for
			title = DataTable.util.stripHtml(title).trim();

			return conf.columnText ? conf.columnText(dt, idx, title) : title;
		}
	},

	colvisRestore: {
		className: 'buttons-colvisRestore',

		text: function (dt) {
			return dt.i18n('buttons.colvisRestore', 'Restore visibility');
		},

		init: function (dt, button, conf) {
			// Use a private parameter on the column. This gets moved around with the
			// column if ColReorder changes the order
			dt.columns().every(function () {
				var init = this.init();

				if (init.__visOriginal === undefined) {
					init.__visOriginal = this.visible();
				}
			});
		},

		action: function (e, dt, button, conf) {
			dt.columns().every(function (i) {
				var init = this.init();

				this.visible(init.__visOriginal);
			});
		}
	},

	colvisGroup: {
		className: 'buttons-colvisGroup',

		action: function (e, dt, button, conf) {
			dt.columns(conf.show).visible(true, false);
			dt.columns(conf.hide).visible(false, false);

			dt.columns.adjust();
		},

		show: [],

		hide: []
	}
});


export default DataTable;
