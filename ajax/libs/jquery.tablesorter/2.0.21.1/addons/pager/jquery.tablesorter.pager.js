/*
 * tablesorter pager plugin
 * updated 9/8/2011
 */

(function($) {
	$.extend({tablesorterPager: new function() {

		// hide arrows at extremes
		var pagerArrows = function(c) {
			if (c.updateArrows) {
				c.container.removeClass(c.cssDisabled);
				$(c.cssFirst + ',' + c.cssPrev + ',' + c.cssNext + ',' + c.cssLast, c.container).removeClass(c.cssDisabled);
				if (c.page === 0) {
					$(c.cssFirst + ',' + c.cssPrev, c.container).addClass(c.cssDisabled);
				} else if (c.page === c.totalPages - 1) {
					$(c.cssNext + ',' + c.cssLast, c.container).addClass(c.cssDisabled);
				}
				// if the total # of pages is less than the selected number of visible rows, then hide the pager
				if (c.totalRows < c.size) {
					c.container.addClass(c.cssDisabled);
				}
			}
		},

		updatePageDisplay = function(table,c) {
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

		fixPosition = function(table) {
			var c = table.config, o = $(table);
			if (!c.pagerPositionSet && c.positionFixed) {
				if (o.offset) {
					c.container.css({
						top: o.offset().top + o.height() + 'px',
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

		renderTable = function(table,rows) {
			var i, j, o,
			tableBody,
			c = table.config,
			l = rows.length,
			s = (c.page * c.size),
			e = (s + c.size);
			$(table).trigger('pagerChange',c);
			if (!c.removeRows) {
				hideRows(table, c);
			} else {
				if (e > rows.length ) {
					e = rows.length;
				}
				tableBody = $(table.tBodies[0]);
				// clear the table body
				$.tablesorter.clearTableBody(table);
				for(i = s; i < e; i++) {
					//tableBody.append(rows[i]);
					o = rows[i];
					l = o.length;
					for (j = 0; j < l; j++) {
						tableBody[0].appendChild(o[j]);
					}
				}
			}
			fixPosition(table,tableBody);
			$(table).trigger("applyWidgets");
			if ( c.page >= c.totalPages ) {
				moveToLastPage(table);
			}
			updatePageDisplay(table,c);
		},

		moveToPage = function(table) {
			var c = table.config;
			if (c.page < 0 || c.page > (c.totalPages-1)) {
				c.page = 0;
			}
			renderTable(table,c.rowsCopy);
		},

		setPageSize = function(table,size) {
			var c = table.config;
			c.size = size;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			c.pagerPositionSet = false;
			moveToPage(table);
			fixPosition(table);
		},

		moveToFirstPage = function(table) {
			var c = table.config;
			c.page = 0;
			moveToPage(table);
		},

		moveToLastPage = function(table) {
			var c = table.config;
			c.page = (c.totalPages-1);
			moveToPage(table);
		},

		moveToNextPage = function(table) {
			var c = table.config;
			c.page++;
			if(c.page >= (c.totalPages-1)) {
				c.page = (c.totalPages-1);
			}
			moveToPage(table);
		},

		moveToPrevPage = function(table) {
			var c = table.config;
			c.page--;
			if(c.page <= 0) {
				c.page = 0;
			}
			moveToPage(table);
		},

		destroyPager = function(table){
			var c = table.config;
			c.size = c.totalRows;
			c.totalPages = 1;
			renderTable(table,c.rowsCopy);
			// hide pager
			c.container.hide();
			c.appender = null;
			$(table).unbind('destroy.pager sortStart.pager');
		};

		this.appender = function(table,rows) {
			var c = table.config;
			c.rowsCopy = rows;
			c.totalRows = rows.length;
			c.totalPages = Math.ceil(c.totalRows / c.size);
			renderTable(table,rows);
		};

		this.defaults = {
			size: 10,
			offset: 0,
			page: 0,
			totalRows: 0,
			totalPages: 0,
			container: null,
			cssNext: '.next',
			cssPrev: '.prev',
			cssFirst: '.first',
			cssLast: '.last',
			cssPageDisplay: '.pagedisplay',
			cssPageSize: '.pagesize',
			cssDisabled: 'disabled',
			output: '{page}/{totalPages}', // '{startRow} to {endRow} of {totalRows} rows',
			updateArrows: false,
			positionFixed: true,
			removeRows: true, // removing rows in larger tables speeds up the sort
			appender: this.appender
		};

		this.construct = function(settings) {
			return this.each(function() {
				var config = $.extend(this.config, $.tablesorterPager.defaults, settings),
				table = this,
				pager = config.container;
				$(this).trigger("appendCache");

				config.size = parseInt($(".pagesize",pager).val(), 10);
				pagerArrows(config);
				if (!config.removeRows) {
					config.appender = null;
					hideRows(table, config);
					$(this).bind('sortEnd.pager', function(){
						hideRows(table, config);
						$(table).trigger("applyWidgets");
					});
				}

				$(config.cssFirst,pager).click(function() {
					moveToFirstPage(table);
					return false;
				});
				$(config.cssNext,pager).click(function() {
					moveToNextPage(table);
					return false;
				});
				$(config.cssPrev,pager).click(function() {
					moveToPrevPage(table);
					return false;
				});
				$(config.cssLast,pager).click(function() {
					moveToLastPage(table);
					return false;
				});
				$(config.cssPageSize,pager).change(function() {
					setPageSize(table,parseInt($(this).val(), 10));
					return false;
				});

				$(this).bind('destroy.pager', function(){
					destroyPager(table);
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