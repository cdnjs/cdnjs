/*!
 * tablesorter pager plugin
 * updated 5/27/2013
 */
/*jshint browser:true, jquery:true, unused:false */
;(function($) {
	"use strict";
	/*jshint supernew:true */
	$.extend({ tablesorterPager: new function() {

		this.defaults = {
			// target the pager markup
			container: null,

			// use this format: "http://mydatabase.com?page={page}&size={size}&{sortList:col}&{filterList:fcol}"
			// where {page} is replaced by the page number, {size} is replaced by the number of records to show,
			// {sortList:col} adds the sortList to the url into a "col" array, and {filterList:fcol} adds
			// the filterList to the url into an "fcol" array.
			// So a sortList = [[2,0],[3,0]] becomes "&col[2]=0&col[3]=0" in the url
			// and a filterList = [[2,Blue],[3,13]] becomes "&fcol[2]=Blue&fcol[3]=13" in the url
			ajaxUrl: null,

			// modify the url after all processing has been applied
			customAjaxUrl: function(table, url) { return url; },

			// modify the $.ajax object to allow complete control over your ajax requests
			ajaxObject: {
				dataType: 'json'
			},

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
			// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
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
			removeRows: false, // removing rows in larger tables speeds up the sort

			// css class names of pager arrows
			cssFirst: '.first', // go to first page arrow
			cssPrev: '.prev', // previous page arrow
			cssNext: '.next', // next page arrow
			cssLast: '.last', // go to last page arrow
			cssGoto: '.gotoPage', // go to page selector - select dropdown that sets the current page
			cssPageDisplay: '.pagedisplay', // location of where the "output" is displayed
			cssPageSize: '.pagesize', // page size selector - select dropdown that sets the "size" option
			cssErrorRow: 'tablesorter-errorRow', // error information row

			// class added to arrows when at the extremes (i.e. prev/first arrows are "disabled" when on the first page)
			cssDisabled: 'disabled', // Note there is no period "." in front of this class name

			// stuff not set by the user
			totalRows: 0,
			totalPages: 0,
			filteredRows: 0,
			filteredPages: 0

		};

		var $this = this,

		// hide arrows at extremes
		pagerArrows = function(c, disable) {
			var a = 'addClass',
			r = 'removeClass',
			d = c.cssDisabled,
			dis = !!disable,
			tp = Math.min( c.totalPages, c.filteredPages );
			if ( c.updateArrows ) {
				c.$container.find(c.cssFirst + ',' + c.cssPrev)[ ( dis || c.page === 0 ) ? a : r ](d);
				c.$container.find(c.cssNext + ',' + c.cssLast)[ ( dis || c.page === tp - 1 ) ? a : r ](d);
			}
		},

		updatePageDisplay = function(table, c, flag) {
			var i, p, s, t, out,
			tc = table.config,
			f = $(table).hasClass('hasFilters') && !c.ajaxUrl;
			c.totalPages = Math.ceil( c.totalRows / c.size ); // needed for "pageSize" method
			c.filteredRows = (f) ? tc.$tbodies.eq(0).children('tr:not(.' + (tc.widgetOptions && tc.widgetOptions.filter_filteredRow || 'filtered') + ',' + tc.selectorRemove + ')').length : c.totalRows;
			c.filteredPages = (f) ? Math.ceil( c.filteredRows / c.size ) || 1 : c.totalPages;
			if ( Math.min( c.totalPages, c.filteredPages ) >= 0 ) {
				t = (c.size * c.page > c.filteredRows);
				c.startRow = (t) ? 1 : (c.filteredRows === 0 ? 0 : c.size * c.page + 1);
				c.page = (t) ? 0 : c.page;
				c.endRow = Math.min( c.filteredRows, c.totalRows, c.size * ( c.page + 1 ) );
				out = c.$container.find(c.cssPageDisplay);
				// form the output string
				s = c.output.replace(/\{(page|filteredRows|filteredPages|totalPages|startRow|endRow|totalRows)\}/gi, function(m){
							return {
								'{page}'            : c.page + 1,
								'{filteredRows}'    : c.filteredRows,
								'{filteredPages}'   : c.filteredPages,
								'{totalPages}'      : c.totalPages,
								'{startRow}'        : c.startRow,
								'{endRow}'          : c.endRow,
								'{totalRows}'       : c.totalRows
							}[m];
						});
				if (out.length) {
					out[ (out[0].tagName === 'INPUT') ? 'val' : 'html' ](s);
					if ( c.$goto.length ) {
						t = '';
						p = Math.min( c.totalPages, c.filteredPages );
						for ( i = 1; i <= p; i++ ) {
							t += '<option>' + i + '</option>';
						}
						c.$goto.html(t).val( c.page + 1 );
					}
				}
			}
			pagerArrows(c);
			if (c.initialized && flag !== false) { $(table).trigger('pagerComplete', c); }
		},

		fixHeight = function(table, c) {
			var d, h, $b = table.config.$tbodies.eq(0);
			if (c.fixedHeight) {
				$b.find('tr.pagerSavedHeightSpacer').remove();
				h = $.data(table, 'pagerSavedHeight');
				if (h) {
					d = h - $b.height();
					if ( d > 5 && $.data(table, 'pagerLastSize') === c.size && $b.children('tr:visible').length < c.size ) {
						$b.append('<tr class="pagerSavedHeightSpacer ' + table.config.selectorRemove.replace(/(tr)?\./g,'') + '" style="height:' + d + 'px;"></tr>');
					}
				}
			}
		},

		changeHeight = function(table, c) {
			var $b = table.config.$tbodies.eq(0);
			$b.find('tr.pagerSavedHeightSpacer').remove();
			$.data(table, 'pagerSavedHeight', $b.height());
			fixHeight(table, c);
			$.data(table, 'pagerLastSize', c.size);
		},

		hideRows = function(table, c){
			if (!c.ajaxUrl) {
				var i,
				tc = table.config,
				rows = tc.$tbodies.eq(0).children('tr:not(.' + tc.cssChildRow + ')'),
				l = rows.length,
				s = ( c.page * c.size ),
				e =  s + c.size,
				f = tc.widgetOptions && tc.widgetOptions.filter_filteredRow || 'filtered',
				j = 0; // size counter
				for ( i = 0; i < l; i++ ){
					if ( !rows[i].className.match(f) ) {
						rows[i].style.display = ( j >= s && j < e ) ? '' : 'none';
						j++;
					}
				}
			}
		},

		hideRowsSetup = function(table, c){
			c.size = parseInt( c.$size.val(), 10 ) || c.size;
			$.data(table, 'pagerLastSize', c.size);
			pagerArrows(c);
			if ( !c.removeRows ) {
				hideRows(table, c);
				$(table).bind('sortEnd.pager filterEnd.pager', function(){
					hideRows(table, c);
				});
			}
		},

		renderAjax = function(data, table, c, xhr, exception){
			// process data
			if ( typeof(c.ajaxProcessing) === "function" ) {
				// ajaxProcessing result: [ total, rows, headers ]
				var i, j, hsh, $f, $sh, th, d, l, $err,
				$t = $(table),
				tc = table.config,
				hl = $t.find('thead th').length, tds = '',
				result = c.ajaxProcessing(data, table) || [ 0, [] ],
				// allow [ total, rows, headers ]  or [ rows, total, headers ]
				t = isNaN(result[0]) && !isNaN(result[1]);

				$t.find('thead tr.' + c.cssErrorRow).remove(); // Clean up any previous error.

				if ( exception ) {
					$err = $('<tr class="' + c.cssErrorRow + '"><td style="text-align:center;" colspan="' + hl + '">' + (
						xhr.status === 0 ? 'Not connected, verify Network' :
						xhr.status === 404 ? 'Requested page not found [404]' :
						xhr.status === 500 ? 'Internal Server Error [500]' :
						exception === 'parsererror' ? 'Requested JSON parse failed' :
						exception === 'timeout' ? 'Time out error' :
						exception === 'abort' ? 'Ajax Request aborted' :
						'Uncaught error: ' + xhr.statusText + ' [' + xhr.status + ']' ) + '</td></tr>')
					.click(function(){
						$(this).remove();
					})
					// add error row to thead instead of tbody, or clicking on the header will result in a parser error
					.appendTo( $t.find('thead:first') );
					tc.$tbodies.eq(0).empty();
				} else {
					c.totalRows = result[t ? 1 : 0] || c.totalRows || 0;
					d = result[t ? 0 : 1] || []; // row data
					l = d.length;
					th = result[2]; // headers
					if (d instanceof jQuery) {
						// append jQuery object
						tc.$tbodies.eq(0).empty().append(d);
					} else if (d.length) {
						// build table from array
						if ( l > 0 ) {
							for ( i = 0; i < l; i++ ) {
								tds += '<tr>';
								for ( j = 0; j < d[i].length; j++ ) {
									// build tbody cells
									tds += '<td>' + d[i][j] + '</td>';
								}
								tds += '</tr>';
							}
						}
						// add rows to first tbody
						tc.$tbodies.eq(0).html( tds );
					}
					// only add new header text if the length matches
					if ( th && th.length === hl ) {
						hsh = $t.hasClass('hasStickyHeaders');
						$sh = hsh ? tc.$sticky.children('thead:first').children().children() : '';
						$f = $t.find('tfoot tr:first').children();
						$t.find('th.' + tc.cssHeader).each(function(j){
							var $t = $(this), icn;
							// add new test within the first span it finds, or just in the header
							if ( $t.find('.' + tc.cssIcon).length ) {
								icn = $t.find('.' + tc.cssIcon).clone(true);
								$t.find('.tablesorter-header-inner').html( th[j] ).append(icn);
								if ( hsh && $sh.length ) {
									icn = $sh.eq(j).find('.' + tc.cssIcon).clone(true);
									$sh.eq(j).find('.tablesorter-header-inner').html( th[j] ).append(icn);
								}
							} else {
								$t.find('.tablesorter-header-inner').html( th[j] );
								if (hsh && $sh.length) {
									$sh.eq(j).find('.tablesorter-header-inner').html( th[j] );
								}
							}
							$f.eq(j).html( th[j] );
						});
					}
				}
				if (tc.showProcessing) {
					$.tablesorter.isProcessing(table); // remove loading icon
				}
				$t.trigger('update');
				c.totalPages = Math.ceil( c.totalRows / c.size );
				updatePageDisplay(table, c);
				fixHeight(table, c);
				if (c.initialized) { $t.trigger('pagerChange', c); }
			}
			if (!c.initialized) {
				c.initialized = true;
				$(table).trigger('pagerInitialized', c);
			}
		},

		getAjax = function(table, c){
			var url = getAjaxUrl(table, c),
			$doc = $(document),
			tc = table.config;
			if ( url !== '' ) {
				if (tc.showProcessing) {
					$.tablesorter.isProcessing(table, true); // show loading icon
				}
				$doc.bind('ajaxError.pager', function(e, xhr, settings, exception) {
					if (url.match(settings.url)) {
						renderAjax(null, table, c, xhr, exception);
						$doc.unbind('ajaxError.pager');
					}
				});
				c.ajaxObject.url = url; // from the ajaxUrl option and modified by customAjaxUrl
				c.ajaxObject.success = function(data) {
					renderAjax(data, table, c);
					$doc.unbind('ajaxError.pager');
					if (typeof c.oldAjaxSuccess === 'function') {
						c.oldAjaxSuccess(data);
					}
				};
				$.ajax(c.ajaxObject);
			}
		},

		getAjaxUrl = function(table, c) {
			var url = (c.ajaxUrl) ? c.ajaxUrl
				// allow using "{page+1}" in the url string to switch to a non-zero based index
				.replace(/\{page([\-+]\d+)?\}/, function(s,n){ return c.page + (n ? parseInt(n, 10) : 0); })
				.replace(/\{size\}/g, c.size) : '',
			sl = table.config.sortList,
			fl = c.currentFilters || [],
			sortCol = url.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),
			filterCol = url.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),
			arry = [];
			if (sortCol) {
				sortCol = sortCol[1];
				$.each(sl, function(i,v){
					arry.push(sortCol + '[' + v[0] + ']=' + v[1]);
				});
				// if the arry is empty, just add the col parameter... "&{sortList:col}" becomes "&col"
				url = url.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : sortCol );
				arry = [];
			}
			if (filterCol) {
				filterCol = filterCol[1];
				$.each(fl, function(i,v){
					if (v) {
						arry.push(filterCol + '[' + i + ']=' + encodeURIComponent(v));
					}
				});
				// if the arry is empty, just add the fcol parameter... "&{filterList:fcol}" becomes "&fcol"
				url = url.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : filterCol );
			}
			if ( typeof(c.customAjaxUrl) === "function" ) {
				url = c.customAjaxUrl(table, url);
			}
			return url;
		},

		renderTable = function(table, rows, c) {
			c.isDisabled = false; // needed because sorting will change the page and re-enable the pager
			var i, j, o, $tb,
			l = rows.length,
			s = ( c.page * c.size ),
			e = ( s + c.size );
			if ( l < 1 ) { return; } // empty table, abort!
			if (c.initialized) { $(table).trigger('pagerChange', c); }
			if ( !c.removeRows ) {
				hideRows(table, c);
			} else {
				if ( e > rows.length ) {
					e = rows.length;
				}
				$.tablesorter.clearTableBody(table);
				$tb = $.tablesorter.processTbody(table, table.config.$tbodies.eq(0), true);
				for ( i = s; i < e; i++ ) {
					o = rows[i];
					l = o.length;
					for ( j = 0; j < l; j++ ) {
						$tb.appendChild(o[j]);
					}
				}
				$.tablesorter.processTbody(table, $tb, false);
			}
			if ( c.page >= c.totalPages ) {
				moveToLastPage(table, c);
			}
			updatePageDisplay(table, c);
			if ( !c.isDisabled ) { fixHeight(table, c); }
			$(table).trigger('applyWidgets');
		},

		showAllRows = function(table, c){
			if ( c.ajax ) {
				pagerArrows(c, true);
			} else {
				c.isDisabled = true;
				$.data(table, 'pagerLastPage', c.page);
				$.data(table, 'pagerLastSize', c.size);
				c.page = 0;
				c.size = c.totalRows;
				c.totalPages = 1;
				$(table).find('tr.pagerSavedHeightSpacer').remove();
				renderTable(table, table.config.rowsCopy, c);
			}
			// disable size selector
			c.$size.add(c.$goto).each(function(){
				$(this).addClass(c.cssDisabled)[0].disabled = true;
			});
		},

		moveToPage = function(table, c, flag) {
			if ( c.isDisabled ) { return; }
			var p = Math.min( c.totalPages, c.filteredPages );
			if ( c.page < 0 ) { c.page = 0; }
			if ( c.page > ( p - 1 ) && p !== 0 ) { c.page = p - 1; }
			if (c.ajax) {
				getAjax(table, c);
			} else if (!c.ajax) {
				renderTable(table, table.config.rowsCopy, c);
			}
			$.data(table, 'pagerLastPage', c.page);
			$.data(table, 'pagerUpdateTriggered', true);
			if (c.initialized && flag !== false) {
				$(table).trigger('pageMoved', c);
			}
		},

		setPageSize = function(table, size, c) {
			c.size = size;
			$.data(table, 'pagerLastPage', c.page);
			$.data(table, 'pagerLastSize', c.size);
			c.totalPages = Math.ceil( c.totalRows / c.size );
			moveToPage(table, c);
		},

		moveToFirstPage = function(table, c) {
			c.page = 0;
			moveToPage(table, c);
		},

		moveToLastPage = function(table, c) {
			c.page = ( Math.min( c.totalPages, c.filteredPages ) - 1 );
			moveToPage(table, c);
		},

		moveToNextPage = function(table, c) {
			c.page++;
			if ( c.page >= ( Math.min( c.totalPages, c.filteredPages ) - 1 ) ) {
				c.page = ( Math.min( c.totalPages, c.filteredPages ) - 1 );
			}
			moveToPage(table, c);
		},

		moveToPrevPage = function(table, c) {
			c.page--;
			if ( c.page <= 0 ) {
				c.page = 0;
			}
			moveToPage(table, c);
		},

		destroyPager = function(table, c){
			showAllRows(table, c);
			c.$container.hide(); // hide pager
			table.config.appender = null; // remove pager appender function
			$(table).unbind('destroy.pager sortEnd.pager filterEnd.pager enable.pager disable.pager');
		},

		enablePager = function(table, c, triggered){
			var p = c.$size.removeClass(c.cssDisabled).removeAttr('disabled');
			c.$goto.removeClass(c.cssDisabled).removeAttr('disabled');
			c.isDisabled = false;
			c.page = $.data(table, 'pagerLastPage') || c.page || 0;
			c.size = $.data(table, 'pagerLastSize') || parseInt(p.find('option[selected]').val(), 10) || c.size;
			p.val(c.size); // set page size
			c.totalPages = Math.ceil( Math.min( c.totalPages, c.filteredPages ) / c.size);
			if ( triggered ) {
				$(table).trigger('update');
				setPageSize(table, c.size, c);
				hideRowsSetup(table, c);
				fixHeight(table, c);
			}
		};

		$this.appender = function(table, rows) {
			var c = table.config.pager;
			if ( !c.ajax ) {
				table.config.rowsCopy = rows;
				c.totalRows = rows.length;
				c.size = $.data(table, 'pagerLastSize') || c.size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				renderTable(table, rows, c);
			}
		};

		$this.construct = function(settings) {
			return this.each(function() {
				// check if tablesorter has initialized
				if (!(this.config && this.hasInitialized)) { return; }
				var t, ctrls, fxn,
				config = this.config,
				c = config.pager = $.extend( {}, $.tablesorterPager.defaults, settings ),
				table = this,
				tc = table.config,
				$t = $(table),
				// added in case the pager is reinitialized after being destroyed.
				pager = c.$container = $(c.container).addClass('tablesorter-pager').show();
				c.oldAjaxSuccess = c.oldAjaxSuccess || c.ajaxObject.success;
				config.appender = $this.appender;

				$t
					.unbind('filterStart.pager filterEnd.pager sortEnd.pager disable.pager enable.pager destroy.pager update.pager pageSize.pager')
					.bind('filterStart.pager', function(e, filters) {
						$.data(table, 'pagerUpdateTriggered', false);
						c.currentFilters = filters;
					})
					// update pager after filter widget completes
					.bind('filterEnd.pager sortEnd.pager', function(e) {
						//Prevent infinite event loops from occuring by setting this in all moveToPage calls and catching it here.
						if ($.data(table, 'pagerUpdateTriggered')) {
							$.data(table, 'pagerUpdateTriggered', false);
							return;
						}
						moveToPage(table, c, false);
						updatePageDisplay(table, c, false);
						fixHeight(table, c);
					})
					.bind('disable.pager', function(e){
						e.stopPropagation();
						showAllRows(table, c);
					})
					.bind('enable.pager', function(e){
						e.stopPropagation();
						enablePager(table, c, true);
					})
					.bind('destroy.pager', function(e){
						e.stopPropagation();
						destroyPager(table, c);
					})
					.bind('update.pager', function(e){
						e.stopPropagation();
						hideRows(table, c);
					})
					.bind('pageSize.pager', function(e,v){
						e.stopPropagation();
						c.size = parseInt(v, 10) || 10;
						hideRows(table, c);
						updatePageDisplay(table, c, false);
						if (c.$size.length) { c.$size.val(c.size); } // twice?
					})
					.bind('pageSet.pager', function(e,v){
						e.stopPropagation();
						c.page = (parseInt(v, 10) || 1) - 1;
						if (c.$goto.length) { c.$goto.val(c.size); } // twice?
						moveToPage(table, c);
						updatePageDisplay(table, c, false);
					});

				// clicked controls
				ctrls = [ c.cssFirst, c.cssPrev, c.cssNext, c.cssLast ];
				fxn = [ moveToFirstPage, moveToPrevPage, moveToNextPage, moveToLastPage ];
				pager.find(ctrls.join(','))
					.unbind('click.pager')
					.bind('click.pager', function(e){
						var i, $t = $(this), l = ctrls.length;
						if ( !$t.hasClass(c.cssDisabled) ) {
							for (i = 0; i < l; i++) {
								if ($t.is(ctrls[i])) {
									fxn[i](table, c);
									break;
								}
							}
						}
						return false;
					});

				// goto selector
				c.$goto = pager.find(c.cssGoto);
				if ( c.$goto.length ) {
					c.$goto
						.unbind('change')
						.bind('change', function(){
							c.page = $(this).val() - 1;
							moveToPage(table, c);
						});
						updatePageDisplay(table, c, false);
				}

				// page size selector
				c.$size = pager.find(c.cssPageSize);
				if ( c.$size.length ) {
					c.$size.unbind('change.pager').bind('change.pager', function() {
						c.$size.val( $(this).val() ); // in case there are more than one pagers
						if ( !$(this).hasClass(c.cssDisabled) ) {
							setPageSize(table, parseInt( $(this).val(), 10 ), c);
							changeHeight(table, c);
						}
						return false;
					});
				}

				// clear initialized flag
				c.initialized = false;
				// before initialization event
				$t.trigger('pagerBeforeInitialized', c);

				enablePager(table, c, false);

				if ( typeof(c.ajaxUrl) === 'string' ) {
					// ajax pager; interact with database
					c.ajax = true;
					//When filtering with ajax, allow only custom filtering function, disable default filtering since it will be done server side.
					tc.widgetOptions.filter_serversideFiltering = true;
					tc.serverSideSorting = true;
					moveToPage(table, c);
				} else {
					c.ajax = false;
					// Regular pager; all rows stored in memory
					$(this).trigger("appendCache", true);
					hideRowsSetup(table, c);
				}

				changeHeight(table, c);

				// pager initialized
				if (!c.ajax) {
					c.initialized = true;
					$(table).trigger('pagerInitialized', c);
				}
			});
		};

	}()
});
// extend plugin scope
$.fn.extend({
	tablesorterPager: $.tablesorterPager.construct
});

})(jQuery);