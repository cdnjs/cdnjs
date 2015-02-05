/*
 * tablesorter pager plugin
 * updated 10/26/2011
 */

(function($) {
	$.extend({tablesorterPager: new function() {

		// hide arrows at extremes
		var pagerArrows = function(c) {
			var a = 'addClass', r = 'removeClass', d = c.cssDisabled;
			if (c.updateArrows) {
				c.container[(c.totalRows < c.size) ? a : r](d);
				$(c.cssFirst + ',' + c.cssPrev, c.container)[(c.page === 0) ? a : r](d);
				$(c.cssNext + ',' + c.cssLast, c.container)[(c.page === c.totalPages - 1) ? a : r](d);
			}
		},

		updatePageDisplay = function(table, c) {
			c.startRow = c.size * (c.page) + 1;
			c.endRow = Math.min(c.totalRows, c.size * (c.page+1));
			var out = $(c.cssPageDisplay, c.container),
			// form the output string
			s = c.output.replace(/\{(page|totalPages|startRow|endRow|totalRows)\}/gi, function(m){
						return {
							'{page}'       : c.page + 1,
							'{totalPages}' : c.totalPages,
							'{startRow}'   : c.startRow,
							'{endRow}'     : c.endRow,
							'{totalRows}'  : c.totalRows
						}[m];
					});
			if (out[0].tagName === 'INPUT') {
				out.val(s);
			} else {
				out.html(s);
			}
			pagerArrows(c);
			c.container.show(); // added in case the pager is reinitialized after being destroyed.
			$(table).trigger('pagerComplete', c);
		},

		fixPosition = function(table, c) {
			var o = $(table);
			if (!c.pagerPositionSet && c.positionFixed) {
				if (o.offset) {
					c.container.css({
						top: o.offset().top + o.height() + c.offset + 'px',
						position: 'absolute'
					});
				}
				c.pagerPositionSet = true;
			}
		},

		hideRows = function(table, c){
			var i, rows = $('tr', table.tBodies[0]),
			l = rows.length,
			s = (c.page * c.size),
			e = (s + c.size);
			if (e > l) { e = l; }
			for (i = 0; i < l; i++){
				rows[i].style.display = (i >= s && i < e) ? '' : 'none';
			}
		},

		hideRowsSetup = function(table, c){
			c.size = parseInt($(c.cssPageSize, c.container).val(), 10);
			pagerArrows(c);
			if (!c.removeRows) {
				hideRows(table, c);
				$(table).bind('sortEnd.pager', function(){
					hideRows(table, c);
					$(table).trigger("applyWidgets");
				});
			}
		},

		renderTable = function(table, rows, c) {
			var i, j, o,
			tableBody = $(table.tBodies[0]),
			l = rows.length,
			s = (c.page * c.size),
			e = (s + c.size);
			if (l < 1) { return; } // empty table, abort!
			$(table).trigger('pagerChange', c);
			if (!c.removeRows) {
				hideRows(table, c);
			} else {
				if (e > rows.length ) {
					e = rows.length;
				}
				// clear the table body
				$.tablesorter.clearTableBody(table);
				for (i = s; i < e; i++) {
					o = rows[i];
					l = o.length;
					for (j = 0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				}
			}
			fixPosition(table, tableBody, c);
			$(table).trigger("applyWidgets");
			if ( c.page >= c.totalPages ) {
				moveToLastPage(table, c);
			}
			updatePageDisplay(table, c);
		},

		showAllRows = function(table, c){
			c.lastPage = c.page;
			c.size = c.totalRows;
			c.totalPages = 1;
			renderTable(table, c.rowsCopy, c);
		},

		moveToPage = function(table, c) {
			if (c.isDisabled) { return; }
			if (c.page < 0 || c.page > (c.totalPages-1)) {
				c.page = 0;
			}
			renderTable(table, c.rowsCopy, c);
		},

		setPageSize = function(table, size, c) {
			c.size = size;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			c.pagerPositionSet = false;
			moveToPage(table, c);
			fixPosition(table, c);
		},

		moveToFirstPage = function(table, c) {
			c.page = 0;
			moveToPage(table, c);
		},

		moveToLastPage = function(table, c) {
			c.page = (c.totalPages-1);
			moveToPage(table, c);
		},

		moveToNextPage = function(table, c) {
			c.page++;
			if (c.page >= (c.totalPages-1)) {
				c.page = (c.totalPages-1);
			}
			moveToPage(table, c);
		},

		moveToPrevPage = function(table, c) {
			c.page--;
			if (c.page <= 0) {
				c.page = 0;
			}
			moveToPage(table, c);
		},

		destroyPager = function(table, c){
			showAllRows(table, c);
			c.container.hide(); // hide pager
			c.appender = null; // remove pager appender function
			$(table).unbind('destroy.pager sortEnd.pager enable.pager disable.pager');
		},

		enablePager = function(table, c){
			c.isDisabled = false;
			$('table').trigger('update');
			c.page = c.lastPage || 0;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			hideRowsSetup(table, c);
		};

		this.appender = function(table, rows) {
			var c = table.config;
			c.rowsCopy = rows;
			c.totalRows = rows.length;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			renderTable(table, rows, c);
		};

		this.defaults = {
			// target the pager markup
			container: null,

			// output default: '{page}/{totalPages}'
			output: '{startRow} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'

			// apply disabled classname to the pager arrows when the rows at either extreme is visible
			updateArrows: true,

			// starting page of the pager (zero based index)
			page: 0,

			// Number of visible rows
			size: 10,

			// if true, moves the pager below the table at a fixed position; so if only 2 rows showing, the pager remains in the same place
			positionFixed: true,

			// offset added to the pager top, but only when "positionFixed" is true
			offset: 0,

			// remove rows from the table to speed up the sort of large tables.
			// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
			removeRows: true, // removing rows in larger tables speeds up the sort

			// css class names of pager arrows
			cssNext: '.next', // next page arrow
			cssPrev: '.prev', // previous page arrow
			cssFirst: '.first', // first page arrow
			cssLast: '.last', // last page arrow
			cssPageDisplay: '.pagedisplay', // location of where the "output" is displayed
			cssPageSize: '.pagesize', // page size selector - select dropdown that sets the "size" option

			// class added to arrows when at the extremes (i.e. prev/first arrows are "disabled" when on the first page)
			cssDisabled: 'disabled', // Note there is no period "." in front of this class name

			// stuff not set by the user
			totalRows: 0,
			totalPages: 0,
			appender: this.appender
		};

		this.construct = function(settings) {
			return this.each(function() {
				var c = $.extend(this.config, $.tablesorterPager.defaults, settings),
				table = this,
				pager = c.container;
				$(this).trigger("appendCache");

				hideRowsSetup(table, c);

				$(c.cssFirst,pager).unbind('click.pager').bind('click.pager', function() {
					moveToFirstPage(table, c);
					return false;
				});
				$(c.cssNext,pager).unbind('click.pager').bind('click.pager', function() {
					moveToNextPage(table, c);
					return false;
				});
				$(c.cssPrev,pager).unbind('click.pager').bind('click.pager', function() {
					moveToPrevPage(table, c);
					return false;
				});
				$(c.cssLast,pager).unbind('click.pager').bind('click.pager', function() {
					moveToLastPage(table, c);
					return false;
				});
				$(c.cssPageSize,pager).unbind('change.pager').bind('change.pager', function() {
					setPageSize(table, parseInt($(this).val(), 10), c);
					return false;
				});

				$(this)
					.unbind('disable.pager enable.pager destroy.pager')
					.bind('disable.pager', function(){
						c.isDisabled = true;
						showAllRows(table, c);
					})
					.bind('enable.pager', function(){
						enablePager(table, c);
					})
					.bind('destroy.pager', function(){
						destroyPager(table, c);
					});
			});
		};

	}
});
// extend plugin scope
$.fn.extend({
	tablesorterPager: $.tablesorterPager.construct
});

})(jQuery);