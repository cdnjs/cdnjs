/*!
 * tablesorter pager plugin
 * updated 5/4/2012
 */
;(function($) {
	$.extend({tablesorterPager: new function() {

		this.defaults = {
			// target the pager markup
			container: null,

			// use this format: "http:/mydatabase.com?page={page}&size={size}"
			// where {page} is replaced by the page number and {size} is replaced by the number of records to show
			ajaxUrl: null,

			// process ajax so that the following information is returned:
			// [ total_rows (number), rows (array of arrays), headers (array; optional) ]
			// example:
			// [
			//   100,  // total rows
			//   [
			//     [ "row1cell1", "row1cell2", ... "row1cellN" ],
			//     [ "row2cell1", "row2cell2", ... "row2cellN" ],
			//     ...
			//     [ "rowNcell1", "rowNcell2", ... "rowNcellN" ]
			//   ],
			//   [ "header1", "header2", ... "headerN" ] // optional
			// ]
			ajaxProcessing: function(ajax){ return [ 0, [], null ]; },

			// output default: '{page}/{totalPages}'
			output: '{startRow} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'

			// apply disabled classname to the pager arrows when the rows at either extreme is visible
			updateArrows: true,

			// starting page of the pager (zero based index)
			page: 0,

			// Number of visible rows
			size: 10,

			// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
			// table row set to a height to compensate; default is false
			fixedHeight: false,

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
			totalPages: 0

		};

		var $this = this,

		// hide arrows at extremes
		pagerArrows = function(c, disable) {
			var a = 'addClass', r = 'removeClass',
			d = c.cssDisabled, dis = !!disable;
			if (c.updateArrows) {
				c.container[(c.totalRows < c.size) ? a : r](d);
				$(c.cssFirst + ',' + c.cssPrev, c.container)[(dis || c.page === 0) ? a : r](d);
				$(c.cssNext + ',' + c.cssLast, c.container)[(dis || c.page === c.totalPages - 1) ? a : r](d);
			}
		},

		updatePageDisplay = function(table, c) {
			if (c.totalPages > 0) {
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
				if (out[0]) {
					out[ (out[0].tagName === 'INPUT') ? 'val' : 'html' ](s);
				}
			}
			pagerArrows(c);
			$(table).trigger('pagerComplete', c);
		},

		fixHeight = function(table, c) {
			var d, h, $b = $(table.tBodies[0]);
			if (c.fixedHeight) {
				$b.find('tr.pagerSavedHeightSpacer').remove();
				h = $.data(table, 'pagerSavedHeight');
				if (h) {
					d = h - $b.height();
					if (d > 5 && $.data(table, 'pagerLastSize') === c.size && $b.find('tr:visible').length < c.size) {
						$b.append('<tr class="pagerSavedHeightSpacer remove-me" style="height:' + d + 'px;"></tr>');
					}
				}
			}
		},

		changeHeight = function(table, c) {
			var $b = $(table.tBodies[0]);
			$b.find('tr.pagerSavedHeightSpacer').remove();
			$.data(table, 'pagerSavedHeight', $b.height());
			fixHeight(table, c);
			$.data(table, 'pagerLastSize', c.size);
		},

		hideRows = function(table, c){
			var i, rows = $('tr:not(.' + table.config.cssChildRow + ')', table.tBodies),
			l = rows.length,
			s = (c.page * c.size),
			e = (s + c.size);
			if (e > l) { e = l; }
			for (i = 0; i < l; i++){
				rows[i].style.display = (i >= s && i < e) ? '' : 'none';
			}
		},

		hideRowsSetup = function(table, c){
			c.size = parseInt($(c.cssPageSize, c.container).val(), 10) || c.size;
			$.data(table, 'pagerLastSize', c.size);
			pagerArrows(c);
			if (!c.removeRows) {
				hideRows(table, c);
				$(table).bind('sortEnd.pager', function(){
					hideRows(table, c);
				});
			}
		},

		renderAjax = function(data, table, c, exception){
			// process data
			if (typeof(c.ajaxProcessing) === "function") {
				// ajaxProcessing result: [ total, rows, headers ]
				var i, j, k, hsh, $f, $sh, $t = $(table), $b = $(table.tBodies[0]),
				hl = $t.find('thead th').length, tds = '',
				err = '<tr class="remove-me"><td style="text-align: center;" colspan="' + hl + '">' +
					(exception ? exception.message + ' (' + exception.name + ')' : 'No rows found') + '</td></tr>',
				result = c.ajaxProcessing(data) || [ 0, [] ],
				d = result[1] || [], l = d.length, th = result[2];
				if (l > 0) {
					for ( i=0; i < l; i++ ) {
						tds += '<tr>';
						for (j=0; j < d[i].length; j++) {
							// build tbody cells
							tds += '<td>' + d[i][j] + '</td>';
						}
						tds += '</tr>';
					}
				}
				// only add new header text if the length matches
				if (th && th.length === hl) {
					hsh = $t.hasClass('hasStickyHeaders');
					$sh = $t.find('.' + ((c.widgetOptions && c.widgetOptions.stickyHeaders) || 'tablesorter-stickyheader'));
					$f = $t.find('tfoot tr:first').children();
					$t.find('thead tr.tablesorter-header th').each(function(j){
						var $t = $(this),
						// add new test within the first span it finds, or just in the header
						tar = ($t.find('span').length) ? $t.find('span:first') : $t;
						tar.html(th[j]);
						$f.eq(j).html(th[j]);
						// update sticky headers
						if (hsh && $sh.length){
							tar = $sh.find('th').eq(j);
							tar = (tar.find('span').length) ? tar.find('span:first') : tar;
							tar.html(th[j]);
						}
					});
				}
				if (exception) {
					// add error row to thead instead of tbody, or clicking on the header will result in a parser error
					$t.find('thead').append(err);
				} else {
					$b.html(tds); // add tbody
				}
				c.temp.remove(); // remove loading icon
				$t.trigger('update');
				c.totalRows = result[0] || 0;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				updatePageDisplay(table, c);
				fixHeight(table, c);
				$t.trigger('pagerChange', c);
			}
		},

		getAjax = function(table, c){
			var $t = $(table),
			url = c.ajaxUrl.replace(/\{page\}/g, c.page).replace(/\{size\}/g, c.size);
			if (url !== '') {
				// loading icon
				c.temp = $('<div/>', {
					id    : 'tablesorterPagerLoading',
					width : $t.outerWidth(true),
					height: $t.outerHeight(true)
				});
				$t.before(c.temp);
				$(document).ajaxError(function(e, xhr, settings, exception) {
					renderAjax(null, table, c, exception);
				});
				$.getJSON(url, function(data) {
					renderAjax(data, table, c);
				});
			}
		},

		renderTable = function(table, rows, c) {
			var i, j, o,
			f = document.createDocumentFragment(),
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
				$.tablesorter.clearTableBody(table);
				for (i = s; i < e; i++) {
					o = rows[i];
					l = o.length;
					for (j = 0; j < l; j++) {
						f.appendChild(o[j]);
					}
				}
				table.tBodies[0].appendChild(f);
			}
			if ( c.page >= c.totalPages ) {
				moveToLastPage(table, c);
			}
			updatePageDisplay(table, c);
			if (!c.isDisabled) { fixHeight(table, c); }
			$(table).trigger('applyWidgets');
		},

		showAllRows = function(table, c){
			if (c.ajax) {
				pagerArrows(c, true);
			} else {
				c.isDisabled = true;
				$.data(table, 'pagerLastPage', c.page);
				$.data(table, 'pagerLastSize', c.size);
				c.page = 0;
				c.size = c.totalRows;
				c.totalPages = 1;
				$('tr.pagerSavedHeightSpacer', table.tBodies[0]).remove();
				renderTable(table, table.config.rowsCopy, c);
			}
			// disable size selector
			$(c.cssPageSize, c.container).addClass(c.cssDisabled)[0].disabled = true;
		},

		moveToPage = function(table, c) {
			if (c.isDisabled) { return; }
			if (c.page < 0 || c.page > (c.totalPages-1)) {
				c.page = 0;
			}
			$.data(table, 'pagerLastPage', c.page);
			if (c.ajax) {
				getAjax(table, c);
			} else {
				renderTable(table, table.config.rowsCopy, c);
			}
		},

		setPageSize = function(table, size, c) {
			c.size = size;
			$.data(table, 'pagerLastPage', c.page);
			$.data(table, 'pagerLastSize', c.size);
			c.totalPages = Math.ceil(c.totalRows / c.size);
			moveToPage(table, c);
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
			table.config.appender = null; // remove pager appender function
			$(table).unbind('destroy.pager sortEnd.pager enable.pager disable.pager');
		},

		enablePager = function(table, c, triggered){
			var p = $(c.cssPageSize, c.container).removeClass(c.cssDisabled).removeAttr('disabled');
			c.isDisabled = false;
			c.page = $.data(table, 'pagerLastPage') || c.page || 0;
			c.size = $.data(table, 'pagerLastSize') || parseInt(p.val(), 10) || c.size;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			if (triggered) {
				$(table).trigger('update');
				setPageSize(table, c.size, c);
				hideRowsSetup(table, c);
				fixHeight(table, c);
			}
		};

		$this.appender = function(table, rows) {
			var c = table.config.pager;
			if (!c.ajax) {
				table.config.rowsCopy = rows;
				c.totalRows = rows.length;
				c.size = $.data(table, 'pagerLastSize') || c.size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				renderTable(table, rows, c);
			}
		};

		$this.construct = function(settings) {
			return this.each(function() {
				var config = this.config,
				c = config.pager = $.extend({}, $.tablesorterPager.defaults, settings),
				table = this,
				$t = $(table),
				pager = $(c.container).show(); // added in case the pager is reinitialized after being destroyed.
				config.appender = $this.appender;
				enablePager(table, c, false);
				if (typeof(c.ajaxUrl) === 'string') {
					// ajax pager; interact with database
					c.ajax = true;
					getAjax(table, c);
				} else {
					c.ajax = false;
					// Regular pager; all rows stored in memory
					$(this).trigger("appendCache");
					hideRowsSetup(table, c);
				}

				$(c.cssFirst,pager).unbind('click.pager').bind('click.pager', function() {
					if (!$(this).hasClass(c.cssDisabled)) { moveToFirstPage(table, c); }
					return false;
				});
				$(c.cssNext,pager).unbind('click.pager').bind('click.pager', function() {
					if (!$(this).hasClass(c.cssDisabled)) { moveToNextPage(table, c); }
					return false;
				});
				$(c.cssPrev,pager).unbind('click.pager').bind('click.pager', function() {
					if (!$(this).hasClass(c.cssDisabled)) { moveToPrevPage(table, c); }
					return false;
				});
				$(c.cssLast,pager).unbind('click.pager').bind('click.pager', function() {
					if (!$(this).hasClass(c.cssDisabled)) { moveToLastPage(table, c); }
					return false;
				});
				$(c.cssPageSize,pager).unbind('change.pager').bind('change.pager', function() {
					$(c.cssPageSize,pager).val( $(this).val() ); // in case there are more than one pagers
					if (!$(this).hasClass(c.cssDisabled)) {
						setPageSize(table, parseInt($(this).val(), 10), c);
						changeHeight(table, c);
					}
					return false;
				});

				$t
				.unbind('disable.pager enable.pager destroy.pager')
				.bind('disable.pager', function(){
					showAllRows(table, c);
				})
				.bind('enable.pager', function(){
					enablePager(table, c, true);
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