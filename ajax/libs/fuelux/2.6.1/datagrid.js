/*
 * Fuel UX Datagrid
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

define(['require','jquery'],function (require) {

	var $   = require('jquery');
	var old = $.fn.datagrid;

	// Relates to thead .sorted styles in datagrid.less
	var SORTED_HEADER_OFFSET = 22;


	// DATAGRID CONSTRUCTOR AND PROTOTYPE

	var Datagrid = function (element, options) {
		this.$element = $(element);
		this.$thead = this.$element.find('thead');
		this.$tfoot = this.$element.find('tfoot');
		this.$footer = this.$element.find('tfoot th');
		this.$footerchildren = this.$footer.children().show().css('visibility', 'hidden');
		this.$topheader = this.$element.find('thead th');
		this.$searchcontrol = this.$element.find('.datagrid-search');
		this.$filtercontrol = this.$element.find('.filter');
		this.$pagesize = this.$element.find('.grid-pagesize');
		this.$pageinput = this.$element.find('.grid-pager input');
		this.$pagedropdown = this.$element.find('.grid-pager .dropdown-menu');
		this.$prevpagebtn = this.$element.find('.grid-prevpage');
		this.$nextpagebtn = this.$element.find('.grid-nextpage');
		this.$pageslabel = this.$element.find('.grid-pages');
		this.$countlabel = this.$element.find('.grid-count');
		this.$startlabel = this.$element.find('.grid-start');
		this.$endlabel = this.$element.find('.grid-end');

		this.$tbody = $('<tbody>').insertAfter(this.$thead);
		this.$colheader = $('<tr>').appendTo(this.$thead);

		this.options = $.extend(true, {}, $.fn.datagrid.defaults, options);
		this.selectedItems = {};

		// Shim until v3 -- account for FuelUX select or native select for page size:
		if (this.$pagesize.hasClass('select')) {
			this.$pagesize.select('selectByValue', this.options.dataOptions.pageSize);
			this.options.dataOptions.pageSize = parseInt(this.$pagesize.select('selectedItem').value, 10);
		} else {
			var pageSize = this.options.dataOptions.pageSize;
			this.$pagesize.find('option').filter(function() {
				return $(this).text() === pageSize.toString();
			}).attr('selected', true);
			this.options.dataOptions.pageSize = parseInt(this.$pagesize.val(), 10);
		}

		// Shim until v3 -- account for older search class:
		if (this.$searchcontrol.length <= 0) {
			this.$searchcontrol = this.$element.find('.search');
		}

		this.columns = this.options.dataSource.columns();

		this.$nextpagebtn.on('click', $.proxy(this.next, this));
		this.$prevpagebtn.on('click', $.proxy(this.previous, this));
		this.$searchcontrol.on('searched cleared', $.proxy(this.searchChanged, this));
		this.$filtercontrol.on('changed', $.proxy(this.filterChanged, this));
		this.$colheader.on('click', 'th', $.proxy(this.headerClicked, this));

		if (this.$pagesize.hasClass('select')) {
			this.$pagesize.on('changed', $.proxy(this.pagesizeChanged, this));
		} else {
			this.$pagesize.on('change', $.proxy(this.pagesizeChanged, this));
		}

		this.$pageinput.on('change', $.proxy(this.pageChanged, this));

		this.renderColumns();

		if (this.options.stretchHeight) this.initStretchHeight();

		this.renderData();
	};

	Datagrid.prototype = {

		constructor: Datagrid,

		renderColumns: function () {
			var $target;

			this.$footer.attr('colspan', this.columns.length);
			this.$topheader.attr('colspan', this.columns.length);

			var colHTML = '';

			$.each(this.columns, function (index, column) {
				colHTML += '<th data-property="' + column.property + '"';
				if (column.sortable) colHTML += ' class="sortable"';
				colHTML += '>' + column.label + '</th>';
			});

			this.$colheader.append(colHTML);

			if (this.options.dataOptions.sortProperty) {
				$target = this.$colheader.children('th[data-property="' + this.options.dataOptions.sortProperty + '"]');
				this.updateColumns($target, this.options.dataOptions.sortDirection);
			}
		},

		updateColumns: function ($target, direction) {
			this._updateColumns(this.$colheader, $target, direction);

			if (this.$sizingHeader) {
				this._updateColumns(this.$sizingHeader, this.$sizingHeader.find('th').eq($target.index()), direction);
			}
		},

		_updateColumns: function ($header, $target, direction) {
			var className = (direction === 'asc') ? 'icon-chevron-up' : 'icon-chevron-down';
			$header.find('i.datagrid-sort').remove();
			$header.find('th').removeClass('sorted');
			$('<i>').addClass(className + ' datagrid-sort').appendTo($target);
			$target.addClass('sorted');
		},

		getSelectedItems: function () {
			return this.selectedItems;
		},

		setSelectedItems: function (selectItems) {
			// Here, selectItems contains the keys (strings) of items to be selected.
			// Copy those in to itemsToSelect; that array may be modified later based
			// on selection rules.
			var itemsToSelect = [];
			$.extend(true, itemsToSelect, selectItems);

			// If multiSelect is not enabled for this table and the user is
			// attempting to select more than one row, reset the selected
			// rows and then limit itemsToSelect to only its first entry.
			if((this.options.multiSelect === false) && (itemsToSelect.length > 1)) {
				this.clearSelectedItems();
				itemsToSelect.splice(1);
			}

			// Next, search through the data set to find those objects which
			// match any of the keys in itemsToSelect.  This will prevent
			// this.selectedItems from being loaded with faulty data.
			$.each(itemsToSelect, $.proxy(function(index, selectedItemKey) {
				$.each(this.options.dataSource._data, $.proxy(function(index, data) {
					if(data[this.options.primaryKey].toString() === selectedItemKey.toString()) {
						this.selectedItems[data[this.options.primaryKey]] = data;
					}
				}, this));
			}, this));

			// Finally, highlight rows based upon their "selected" status.
			$.each(this.$tbody.find('tr'), $.proxy(function (index, row) {
				if(this.selectedItems.hasOwnProperty($(row).attr('data-id'))) {
					$(row).addClass('selected');
				}
			}, this));
		},

		clearSelectedItems: function() {
			// Remove highlight from any selected rows.
			$.each(this.$tbody.find('tr'), function (index, row) {
				$(row).removeClass('selected');
			});

			this.selectedItems = {};
		},

		updatePageDropdown: function (data) {
			var pageHTML = '';

			for (var i = 1; i <= data.pages; i++) {
				pageHTML += '<li><a>' + i + '</a></li>';
			}

			this.$pagedropdown.html(pageHTML);
		},

		updatePageButtons: function (data) {
			if (data.page === 1) {
				this.$prevpagebtn.attr('disabled', 'disabled');
			} else {
				this.$prevpagebtn.removeAttr('disabled');
			}

			if (data.page === data.pages) {
				this.$nextpagebtn.attr('disabled', 'disabled');
			} else {
				this.$nextpagebtn.removeAttr('disabled');
			}
		},

		renderData: function () {
			var self = this;

			function renderCell (row, column) {
				var property = column.property;
				var cellValue = row[property];
				var renderedCell;

				if (typeof column.render === 'function') {
					renderedCell = column.render.call(self, cellValue, row);
				} else {
					renderedCell = cellValue;
				}
				return renderedCell;
			}

			this.$tbody.html(this.placeholderRowHTML(this.options.loadingHTML));

			this.options.dataSource.data(this.options.dataOptions, function (data) {
				if (typeof data === 'string') {
					// Error-handling

					self.$footerchildren.css('visibility', 'hidden');

					self.$tbody.html(self.errorRowHTML(data));
					self.stretchHeight();

					self.$element.trigger('loaded');
					return;
				}

				var itemdesc = (data.count === 1) ? self.options.itemText : self.options.itemsText;

				self.$footerchildren.css('visibility', function () {
					return (data.count > 0) ? 'visible' : 'hidden';
				});

				self.$pageinput.val(data.page);
				self.$pageslabel.text(data.pages);
				self.$countlabel.text(data.count + ' ' + itemdesc);
				self.$startlabel.text(data.start);
				self.$endlabel.text(data.end);

				self.updatePageDropdown(data);
				self.updatePageButtons(data);

				var multiSelect = !!self.options.multiSelect;
				var enableSelect = !!self.options.enableSelect;
				var selectedItemsKeys = [];

				if (data.data.length === 0) {
					self.$tbody.html(self.placeholderRowHTML(self.options.noDataFoundHTML));
				} else {

					// These are the keys in the selectedItems object
					selectedItemsKeys = $.map(self.selectedItems, function(element,index) { return index.toString(); });

					$.each(data.data, function (index, row) {

						var $tr = $('<tr/>');
						$.each(self.columns, function(index, column) {
							var $td = $('<td/>');
							if (column.cssClass) {
								$td.addClass(column.cssClass);
							}

							// The content for this first <td> is being placed
							// in a div to better control the left offset needed
							// to show the checkmark.  This div will be moved to
							// the right by 22px when the row is selected.
							if (enableSelect && (index === 0)) {
								var $md = $('<div/>');
								$md.addClass('selectWrap');
								$md.append(renderCell(row, column));
								$td.html($md);
							} else {
								$td.html(renderCell(row, column));
							}

							$tr.append($td);
						});

						if (enableSelect) {
							$tr.addClass('selectable');
							$tr.attr('data-id', row[self.options.primaryKey]);

							if ($.inArray(row[self.options.primaryKey].toString(), selectedItemsKeys) > -1) {
								$tr.addClass('selected');
							}
						}

						if (index === 0) {
							self.$tbody.empty();
						}

						self.$tbody.append($tr);
					});

					if (enableSelect) {
						self.$tbody.find('tr').bind('click', function (e) {
							var id = $(e.currentTarget).data('id');
							var currentRow;

							$.each(data.data, function (index, row) {
								if (id === row[self.options.primaryKey]) {
									currentRow = row;
								}
							});

							var isSelected = self.selectedItems.hasOwnProperty(id);
							if (!multiSelect) { self.clearSelectedItems(); }

							if (isSelected && !multiSelect) {
								self.$element.trigger('itemDeselected', currentRow);
							} else if (isSelected && multiSelect) {
								delete self.selectedItems[id];
								$(e.currentTarget).removeClass('selected');
							} else {
								self.selectedItems[id] = currentRow;
								$(e.currentTarget).addClass('selected');
								self.$element.trigger('itemSelected', currentRow);
							}
						});
					}
				}

				if ($.trim(self.$tbody.html()) === '') {
					self.$tbody.html(self.placeholderRowHTML(self.options.noDataFoundHTML));
				}

				self.stretchHeight();

				self.$element.trigger('loaded');
			});

		},

		errorRowHTML: function (content) {
			return '<tr><td style="text-align:center;padding:20px 20px 0 20px;border-bottom:none;" colspan="' +
				this.columns.length + '"><div class="alert alert-error">' + content + '</div></td></tr>';
		},

		placeholderRowHTML: function (content) {
			return '<tr><td style="text-align:center;padding:20px;border-bottom:none;" colspan="' +
				this.columns.length + '">' + content + '</td></tr>';
		},

		headerClicked: function (e) {
			var $target = $(e.target);
			if (!$target.hasClass('sortable')) return;

			var direction = this.options.dataOptions.sortDirection;
			var sort = this.options.dataOptions.sortProperty;
			var property = $target.data('property');

			if (sort === property) {
				this.options.dataOptions.sortDirection = (direction === 'asc') ? 'desc' : 'asc';
			} else {
				this.options.dataOptions.sortDirection = 'asc';
				this.options.dataOptions.sortProperty = property;
			}

			this.options.dataOptions.pageIndex = 0;
			this.updateColumns($target, this.options.dataOptions.sortDirection);
			this.renderData();
		},

		pagesizeChanged: function (e, pageSize) {
			if (pageSize) {
				this.options.dataOptions.pageSize = parseInt(pageSize.value, 10);
			} else {
				this.options.dataOptions.pageSize = parseInt($(e.target).val(), 10);
			}

			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		pageChanged: function (e) {
			var pageRequested = parseInt($(e.target).val(), 10);
			pageRequested = (isNaN(pageRequested)) ? 1 : pageRequested;
			var maxPages = this.$pageslabel.text();

			this.options.dataOptions.pageIndex =
				(pageRequested > maxPages) ? maxPages - 1 : pageRequested - 1;

			this.renderData();
		},

		searchChanged: function (e, search) {
			this.options.dataOptions.search = search;
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		filterChanged: function (e, filter) {
			this.options.dataOptions.filter = filter;
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		previous: function () {
			this.$nextpagebtn.attr('disabled', 'disabled');
			this.$prevpagebtn.attr('disabled', 'disabled');
			this.options.dataOptions.pageIndex--;
			this.renderData();
		},

		next: function () {
			this.$nextpagebtn.attr('disabled', 'disabled');
			this.$prevpagebtn.attr('disabled', 'disabled');
			this.options.dataOptions.pageIndex++;
			this.renderData();
		},

		reload: function () {
			this.options.dataOptions.pageIndex = 0;
			this.renderData();
		},

		initStretchHeight: function () {
			this.$gridContainer = this.$element.parent();

			this.$element.wrap('<div class="datagrid-stretch-wrapper">');
			this.$stretchWrapper = this.$element.parent();

			this.$headerTable = $('<table>').attr('class', this.$element.attr('class'));
			this.$footerTable = this.$headerTable.clone();

			this.$headerTable.prependTo(this.$gridContainer).addClass('datagrid-stretch-header');
			this.$thead.detach().appendTo(this.$headerTable);

			this.$sizingHeader = this.$thead.clone();
			this.$sizingHeader.find('tr:first').remove();

			this.$footerTable.appendTo(this.$gridContainer).addClass('datagrid-stretch-footer');
			this.$tfoot.detach().appendTo(this.$footerTable);
		},

		stretchHeight: function () {
			if (!this.$gridContainer) return;

			this.setColumnWidths();

			var targetHeight = this.$gridContainer.height();
			var headerHeight = this.$headerTable.outerHeight();
			var footerHeight = this.$footerTable.outerHeight();
			var overhead = headerHeight + footerHeight;

			this.$stretchWrapper.height(targetHeight - overhead);
		},

		setColumnWidths: function () {
			if (!this.$sizingHeader) return;

			this.$element.prepend(this.$sizingHeader);

			var $sizingCells = this.$sizingHeader.find('th');
			var columnCount = $sizingCells.length;

			function matchSizingCellWidth(i, el) {
				if (i === columnCount - 1) return;

				var $el = $(el);
				var $sourceCell = $sizingCells.eq(i);
				var width = $sourceCell.width();

				// TD needs extra width to match sorted column header
				if ($sourceCell.hasClass('sorted') && $el.prop('tagName') === 'TD') width = width + SORTED_HEADER_OFFSET;

				$el.width(width);
			}

			this.$colheader.find('th').each(matchSizingCellWidth);
			this.$tbody.find('tr:first > td').each(matchSizingCellWidth);

			this.$sizingHeader.detach();
		}
	};


	// DATAGRID PLUGIN DEFINITION

	$.fn.datagrid = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'datagrid' );
			var options = typeof option === 'object' && option;

			if ( !data ) $this.data('datagrid', (data = new Datagrid( this, options ) ) );
			if ( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.datagrid.defaults = {
		dataOptions: { pageIndex: 0, pageSize: 10 },
		loadingHTML: '<div class="progress progress-striped active" style="width:50%;margin:auto;"><div class="bar" style="width:100%;"></div></div>',
		itemsText: 'items',
		itemText: 'item',
		noDataFoundHTML: '0 items'
	};

	$.fn.datagrid.Constructor = Datagrid;

	$.fn.datagrid.noConflict = function () {
		$.fn.datagrid = old;
		return this;
	};
});
