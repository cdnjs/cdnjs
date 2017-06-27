/*! tablesorter (FORK) - updated 05-17-2015 (v2.22.1)*/
/* Includes widgets ( storage,uitheme,columns,filter,stickyHeaders,resizable,saveSort ) */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

/*! TableSorter (FORK) v2.22.1 *//*
* Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* fork maintained by Rob Garrison
*
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter (FORK)
* @cat Plugins/Tablesorter
* @author Christian Bach - christian.bach@polyester.se
* @contributor Rob Garrison - https://github.com/Mottie/tablesorter
*/
/*jshint browser:true, jquery:true, unused:false, expr: true */
/*global console:false, alert:false, require:false, define:false, module:false */
;(function($){
	'use strict';
	$.extend({
		/*jshint supernew:true */
		tablesorter: new function() {

			var ts = this;

			ts.version = '2.22.1';

			ts.parsers = [];
			ts.widgets = [];
			ts.defaults = {

				// *** appearance
				theme            : 'default',  // adds tablesorter-{theme} to the table for styling
				widthFixed       : false,      // adds colgroup to fix widths of columns
				showProcessing   : false,      // show an indeterminate timer icon in the header when the table is sorted or filtered.

				headerTemplate   : '{content}',// header layout template (HTML ok); {content} = innerHTML, {icon} = <i/> (class from cssIcon)
				onRenderTemplate : null,       // function(index, template){ return template; }, (template is a string)
				onRenderHeader   : null,       // function(index){}, (nothing to return)

				// *** functionality
				cancelSelection  : true,       // prevent text selection in the header
				tabIndex         : true,       // add tabindex to header for keyboard accessibility
				dateFormat       : 'mmddyyyy', // other options: 'ddmmyyy' or 'yyyymmdd'
				sortMultiSortKey : 'shiftKey', // key used to select additional columns
				sortResetKey     : 'ctrlKey',  // key used to remove sorting on a column
				usNumberFormat   : true,       // false for German '1.234.567,89' or French '1 234 567,89'
				delayInit        : false,      // if false, the parsed table contents will not update until the first sort
				serverSideSorting: false,      // if true, server-side sorting should be performed because client-side sorting will be disabled, but the ui and events will still be used.
				resort           : true,       // default setting to trigger a resort after an 'update', 'addRows', 'updateCell', etc has completed

				// *** sort options
				headers          : {},         // set sorter, string, empty, locked order, sortInitialOrder, filter, etc.
				ignoreCase       : true,       // ignore case while sorting
				sortForce        : null,       // column(s) first sorted; always applied
				sortList         : [],         // Initial sort order; applied initially; updated when manually sorted
				sortAppend       : null,       // column(s) sorted last; always applied
				sortStable       : false,      // when sorting two rows with exactly the same content, the original sort order is maintained

				sortInitialOrder : 'asc',      // sort direction on first click
				sortLocaleCompare: false,      // replace equivalent character (accented characters)
				sortReset        : false,      // third click on the header will reset column to default - unsorted
				sortRestart      : false,      // restart sort to 'sortInitialOrder' when clicking on previously unsorted columns

				emptyTo          : 'bottom',   // sort empty cell to bottom, top, none, zero, emptyMax, emptyMin
				stringTo         : 'max',      // sort strings in numerical column as max, min, top, bottom, zero
				textExtraction   : 'basic',    // text extraction method/function - function(node, table, cellIndex){}
				textAttribute    : 'data-text',// data-attribute that contains alternate cell text (used in default textExtraction function)
				textSorter       : null,       // choose overall or specific column sorter function(a, b, direction, table, columnIndex) [alt: ts.sortText]
				numberSorter     : null,       // choose overall numeric sorter function(a, b, direction, maxColumnValue)

				// *** widget options
				widgets: [],                   // method to add widgets, e.g. widgets: ['zebra']
				widgetOptions    : {
					zebra : [ 'even', 'odd' ]    // zebra widget alternating row class names
				},
				initWidgets      : true,       // apply widgets on tablesorter initialization
				widgetClass     : 'widget-{name}', // table class name template to match to include a widget

				// *** callbacks
				initialized      : null,       // function(table){},

				// *** extra css class names
				tableClass       : '',
				cssAsc           : '',
				cssDesc          : '',
				cssNone          : '',
				cssHeader        : '',
				cssHeaderRow     : '',
				cssProcessing    : '', // processing icon applied to header during sort/filter

				cssChildRow      : 'tablesorter-childRow', // class name indiciating that a row is to be attached to the its parent
				cssIcon          : 'tablesorter-icon', // if this class does not exist, the {icon} will not be added from the headerTemplate
				cssIconNone      : '', // class name added to the icon when there is no column sort
				cssIconAsc       : '', // class name added to the icon when the column has an ascending sort
				cssIconDesc      : '', // class name added to the icon when the column has a descending sort
				cssInfoBlock     : 'tablesorter-infoOnly', // don't sort tbody with this class name (only one class name allowed here!)
				cssNoSort        : 'tablesorter-noSort',      // class name added to element inside header; clicking on it won't cause a sort
				cssIgnoreRow     : 'tablesorter-ignoreRow',   // header row to ignore; cells within this row will not be added to c.$headers

				// *** events
				pointerClick     : 'click',
				pointerDown      : 'mousedown',
				pointerUp        : 'mouseup',

				// *** selectors
				selectorHeaders  : '> thead th, > thead td',
				selectorSort     : 'th, td',   // jQuery selector of content within selectorHeaders that is clickable to trigger a sort
				selectorRemove   : '.remove-me',

				// *** advanced
				debug            : false,

				// *** Internal variables
				headerList: [],
				empties: {},
				strings: {},
				parsers: []

				// removed: widgetZebra: { css: ['even', 'odd'] }

			};

			// internal css classes - these will ALWAYS be added to
			// the table and MUST only contain one class name - fixes #381
			ts.css = {
				table      : 'tablesorter',
				cssHasChild: 'tablesorter-hasChildRow',
				childRow   : 'tablesorter-childRow',
				colgroup   : 'tablesorter-colgroup',
				header     : 'tablesorter-header',
				headerRow  : 'tablesorter-headerRow',
				headerIn   : 'tablesorter-header-inner',
				icon       : 'tablesorter-icon',
				processing : 'tablesorter-processing',
				sortAsc    : 'tablesorter-headerAsc',
				sortDesc   : 'tablesorter-headerDesc',
				sortNone   : 'tablesorter-headerUnSorted'
			};

			// labels applied to sortable headers for accessibility (aria) support
			ts.language = {
				sortAsc  : 'Ascending sort applied, ',
				sortDesc : 'Descending sort applied, ',
				sortNone : 'No sort applied, ',
				nextAsc  : 'activate to apply an ascending sort',
				nextDesc : 'activate to apply a descending sort',
				nextNone : 'activate to remove the sort'
			};

			// These methods can be applied on table.config instance
			ts.instanceMethods = {};

			/* debuging utils */
			function log() {
				var a = arguments[0],
					s = arguments.length > 1 ? Array.prototype.slice.call(arguments) : a;
				if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
					console[ /error/i.test(a) ? 'error' : /warn/i.test(a) ? 'warn' : 'log' ](s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + ' (' + (new Date().getTime() - d.getTime()) + 'ms)');
			}

			ts.log = log;
			ts.benchmark = benchmark;

			// $.isEmptyObject from jQuery v1.4
			function isEmptyObject(obj) {
				/*jshint forin: false */
				for (var name in obj) {
					return false;
				}
				return true;
			}

			ts.getElementText = function(c, node, cellIndex) {
				if (!node) { return ''; }
				var te,
					t = c.textExtraction || '',
					// node could be a jquery object
					// http://jsperf.com/jquery-vs-instanceof-jquery/2
					$node = node.jquery ? node : $(node);
				if (typeof(t) === 'string') {
					// check data-attribute first when set to 'basic'; don't use node.innerText - it's really slow!
					// http://www.kellegous.com/j/2013/02/27/innertext-vs-textcontent/
					return $.trim(
						( t === 'basic' ? $node.attr(c.textAttribute) || node.textContent : node.textContent ) ||
						$node.text()
					);
				} else {
					if (typeof(t) === 'function') {
						return $.trim( t($node[0], c.table, cellIndex) );
					} else if (typeof (te = ts.getColumnData( c.table, t, cellIndex )) === 'function') {
						return $.trim( te($node[0], c.table, cellIndex) );
					}
				}
				// fallback
				return $.trim( $node[0].textContent || $node.text() );
			};

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var cur, $node,
					c = table.config,
					i = ts.parsers.length,
					node = false,
					nodeValue = '',
					keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = ts.getElementText(c, node, cellIndex);
						$node = $(node);
						if (table.config.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column: ' + cellIndex + ': "' + nodeValue + '"');
						}
					} else {
						keepLooking = false;
					}
				}
				while (--i >= 0) {
					cur = ts.parsers[i];
					// ignore the default text parser because it will always be true
					if (cur && cur.id !== 'text' && cur.is && cur.is(nodeValue, table, node, $node)) {
						return cur;
					}
				}
				// nothing found, return the generic parser (text)
				return ts.getParserById('text');
			}

			// centralized function to extract/parse cell contents
			function getParsedText( c, cell, colIndex, txt ) {
				if ( typeof txt === 'undefined' ) {
					txt = ts.getElementText( c, cell, colIndex );
				}
				// if no parser, make sure to return the txt
				var val = '' + txt,
					parser = c.parsers[ colIndex ],
					extractor = c.extractors[ colIndex ];
				if ( parser ) {
					// do extract before parsing, if there is one
					if ( extractor && typeof extractor.format === 'function' ) {
						txt = extractor.format( txt, c.table, cell, colIndex );
					}
					// allow parsing if the string is empty, previously parsing would change it to zero,
					// in case the parser needs to extract data from the table cell attributes
					val = parser.id === 'no-parser' ? '' :
						// make sure txt is a string (extractor may have converted it)
						parser.format( '' + txt, c.table, cell, colIndex );
					if ( c.ignoreCase && typeof val === 'string' ) {
					 val = val.toLowerCase();
					}
				}
				return val;
			}

			function buildParserCache(table) {
				var c = table.config,
					// update table bodies in case we start with an empty table
					tb = c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')'),
					rows, list, l, i, h, ch, np, p, e, time,
					j = 0,
					parsersDebug = '',
					len = tb.length;
				if ( len === 0) {
					return c.debug ? log('Warning: *Empty table!* Not building a parser cache') : '';
				} else if (c.debug) {
					time = new Date();
					log('Detecting parsers for each column');
				}
				list = {
					extractors: [],
					parsers: []
				};
				while (j < len) {
					rows = tb[j].rows;
					if (rows.length) {
						l = c.columns; // rows[j].cells.length;
						for (i = 0; i < l; i++) {
							h = c.$headerIndexed[i];
							// get column indexed table cell
							ch = ts.getColumnData( table, c.headers, i );
							// get column parser/extractor
							e = ts.getParserById( ts.getData(h, ch, 'extractor') );
							p = ts.getParserById( ts.getData(h, ch, 'sorter') );
							np = ts.getData(h, ch, 'parser') === 'false';
							// empty cells behaviour - keeping emptyToBottom for backwards compatibility
							c.empties[i] = ( ts.getData(h, ch, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' ) ).toLowerCase();
							// text strings behaviour in numerical sorts
							c.strings[i] = ( ts.getData(h, ch, 'string') || c.stringTo || 'max' ).toLowerCase();
							if (np) {
								p = ts.getParserById('no-parser');
							}
							if (!e) {
								// For now, maybe detect someday
								e = false;
							}
							if (!p) {
								p = detectParserForColumn(table, rows, -1, i);
							}
							if (c.debug) {
								parsersDebug += 'column:' + i + '; extractor:' + e.id + '; parser:' + p.id + '; string:' + c.strings[i] + '; empty: ' + c.empties[i] + '\n';
							}
							list.parsers[i] = p;
							list.extractors[i] = e;
						}
					}
					j += (list.parsers.length) ? len : 1;
				}
				if (c.debug) {
					log(parsersDebug ? parsersDebug : 'No parsers detected');
					benchmark('Completed detecting parsers', time);
				}
				c.parsers = list.parsers;
				c.extractors = list.extractors;
			}

			/* utils */
			function buildCache(table) {
				var cc, t, v, i, j, k, $row, cols, cacheTime,
					totalRows, rowData, prevRowData, colMax,
					c = table.config,
					$tb = c.$tbodies,
					parsers = c.parsers;
				c.cache = {};
				c.totalRows = 0;
				// if no parsers found, return - it's an empty table.
				if (!parsers) {
					return c.debug ? log('Warning: *Empty table!* Not building a cache') : '';
				}
				if (c.debug) {
					cacheTime = new Date();
				}
				// processing icon
				if (c.showProcessing) {
					ts.isProcessing(table, true);
				}
				for (k = 0; k < $tb.length; k++) {
					colMax = []; // column max value per tbody
					cc = c.cache[k] = {
						normalized: [] // array of normalized row data; last entry contains 'rowData' above
						// colMax: #   // added at the end
					};

					totalRows = ($tb[k] && $tb[k].rows.length) || 0;
					for (i = 0; i < totalRows; ++i) {
						rowData = {
							// order: original row order #
							// $row : jQuery Object[]
							child: [], // child row text (filter widget)
							raw: []    // original row text
						};
						/** Add the table data to main data array */
						$row = $( $tb[ k ].rows[ i ] );
						cols = [];
						// if this is a child row, add it to the last row's children and continue to the next row
						// ignore child row class, if it is the first row
						if ( $row.hasClass( c.cssChildRow ) && i !== 0 ) {
							t = cc.normalized.length - 1;
							prevRowData = cc.normalized[ t ][ c.columns ];
							prevRowData.$row = prevRowData.$row.add( $row );
							// add 'hasChild' class name to parent row
							if ( !$row.prev().hasClass( c.cssChildRow ) ) {
								$row.prev().addClass( ts.css.cssHasChild );
							}
							// save child row content (un-parsed!)
							v = $row.children( 'th, td' );
							t = prevRowData.child.length;
							prevRowData.child[ t ] = [];
							// child row content does not account for colspans/rowspans; so indexing may be off
							for ( j = 0; j < c.columns; j++ ) {
								prevRowData.child[ t ][ j ] = getParsedText( c, v[ j ], j );
							}
							// go to the next for loop
							continue;
						}
						rowData.$row = $row;
						rowData.order = i; // add original row position to rowCache
						for ( j = 0; j < c.columns; ++j ) {
							if (typeof parsers[ j ] === 'undefined') {
								if ( c.debug ) {
									log( 'No parser found for cell:', $row[ 0 ].cells[ j ], 'does it have a header?' );
								}
								continue;
							}
							t = ts.getElementText( c, $row[ 0 ].cells[j], j );
							rowData.raw.push( t ); // save original row text
							v = getParsedText( c, $row[ 0 ].cells[ j ], j, t );
							cols.push( v );
							if ( ( parsers[ j ].type || '' ).toLowerCase() === 'numeric' ) {
								// determine column max value (ignore sign)
								colMax[ j ] = Math.max( Math.abs( v ) || 0, colMax[ j ] || 0 );
							}
						}
						// ensure rowData is always in the same location (after the last column)
						cols[ c.columns ] = rowData;
						cc.normalized.push( cols );
					}
					cc.colMax = colMax;
					// total up rows, not including child rows
					c.totalRows += cc.normalized.length;

				}
				if ( c.showProcessing ) {
					ts.isProcessing( table ); // remove processing icon
				}
				if ( c.debug ) {
					benchmark( 'Building cache for ' + totalRows + ' rows', cacheTime );
				}
			}

			// init flag (true) used by pager plugin to prevent widget application
			function appendToTable(table, init) {
				var c = table.config,
					wo = c.widgetOptions,
					$tbodies = c.$tbodies,
					rows = [],
					cc = c.cache,
					n, totalRows, $bk, $tb,
					i, k, appendTime;
				// empty table - fixes #206/#346
				if (isEmptyObject(cc)) {
					// run pager appender in case the table was just emptied
					return c.appender ? c.appender(table, rows) :
						table.isUpdating ? c.$table.trigger('updateComplete', table) : ''; // Fixes #532
				}
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < $tbodies.length; k++) {
					$bk = $tbodies.eq(k);
					if ($bk.length) {
						// get tbody
						$tb = ts.processTbody(table, $bk, true);
						n = cc[k].normalized;
						totalRows = n.length;
						for (i = 0; i < totalRows; i++) {
							rows.push(n[i][c.columns].$row);
							// removeRows used by the pager plugin; don't render if using ajax - fixes #411
							if (!c.appender || (c.pager && (!c.pager.removeRows || !wo.pager_removeRows) && !c.pager.ajax)) {
								$tb.append(n[i][c.columns].$row);
							}
						}
						// restore tbody
						ts.processTbody(table, $tb, false);
					}
				}
				if (c.appender) {
					c.appender(table, rows);
				}
				if (c.debug) {
					benchmark('Rebuilt table', appendTime);
				}
				// apply table widgets; but not before ajax completes
				if (!init && !c.appender) { ts.applyWidget(table); }
				if (table.isUpdating) {
					c.$table.trigger('updateComplete', table);
				}
			}

			function formatSortingOrder(v) {
				// look for 'd' in 'desc' order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function buildHeaders(table) {
				var ch, $t, h, i, t, lock, time, indx,
					c = table.config;
				c.headerList = [];
				c.headerContent = [];
				if (c.debug) {
					time = new Date();
				}
				// children tr in tfoot - see issue #196 & #547
				c.columns = ts.computeColumnIndex( c.$table.children('thead, tfoot').children('tr') );
				// add icon if cssIcon option exists
				i = c.cssIcon ? '<i class="' + ( c.cssIcon === ts.css.icon ? ts.css.icon : c.cssIcon + ' ' + ts.css.icon ) + '"></i>' : '';
				// redefine c.$headers here in case of an updateAll that replaces or adds an entire header cell - see #683
				c.$headers = $( $.map( $(table).find(c.selectorHeaders), function(elem, index) {
					$t = $(elem);
					// ignore cell (don't add it to c.$headers) if row has ignoreRow class
					if ($t.parent().hasClass(c.cssIgnoreRow)) { return; }
					// make sure to get header cell & not column indexed cell
					ch = ts.getColumnData( table, c.headers, index, true );
					// save original header content
					c.headerContent[index] = $t.html();
					// if headerTemplate is empty, don't reformat the header cell
					if ( c.headerTemplate !== '' && !$t.find('.' + ts.css.headerIn).length ) {
						// set up header template
						t = c.headerTemplate.replace(/\{content\}/g, $t.html()).replace(/\{icon\}/g, $t.find('.' + ts.css.icon).length ? '' : i);
						if (c.onRenderTemplate) {
							h = c.onRenderTemplate.apply($t, [index, t]);
							if (h && typeof h === 'string') { t = h; } // only change t if something is returned
						}
						$t.html('<div class="' + ts.css.headerIn + '">' + t + '</div>'); // faster than wrapInner
					}
					if (c.onRenderHeader) { c.onRenderHeader.apply($t, [index, c, c.$table]); }
					// *** remove this.column value if no conflicts found
					elem.column = parseInt( $t.attr('data-column'), 10);
					elem.order = formatSortingOrder( ts.getData($t, ch, 'sortInitialOrder') || c.sortInitialOrder ) ? [1,0,2] : [0,1,2];
					elem.count = -1; // set to -1 because clicking on the header automatically adds one
					elem.lockedOrder = false;
					lock = ts.getData($t, ch, 'lockedOrder') || false;
					if (typeof lock !== 'undefined' && lock !== false) {
						elem.order = elem.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					$t.addClass(ts.css.header + ' ' + c.cssHeader);
					// add cell to headerList
					c.headerList[index] = elem;
					// add to parent in case there are multiple rows
					$t.parent().addClass(ts.css.headerRow + ' ' + c.cssHeaderRow).attr('role', 'row');
					// allow keyboard cursor to focus on element
					if (c.tabIndex) { $t.attr('tabindex', 0); }
					return elem;
				}));
				// cache headers per column
				c.$headerIndexed = [];
				for (indx = 0; indx < c.columns; indx++) {
					$t = c.$headers.filter('[data-column="' + indx + '"]');
					// target sortable column cells, unless there are none, then use non-sortable cells
					// .last() added in jQuery 1.4; use .filter(':last') to maintain compatibility with jQuery v1.2.6
					c.$headerIndexed[indx] = $t.not('.sorter-false').length ? $t.not('.sorter-false').filter(':last') : $t.filter(':last');
				}
				$(table).find(c.selectorHeaders).attr({
					scope: 'col',
					role : 'columnheader'
				});
				// enable/disable sorting
				updateHeader(table);
				if (c.debug) {
					benchmark('Built headers:', time);
					log(c.$headers);
				}
			}

			function commonUpdate(table, resort, callback) {
				var c = table.config;
				// remove rows/elements before update
				c.$table.find(c.selectorRemove).remove();
				// rebuild parsers
				buildParserCache(table);
				// rebuild the cache map
				buildCache(table);
				checkResort(c, resort, callback);
			}

			function updateHeader(table) {
				var index, s, $th, col,
					c = table.config,
					len = c.$headers.length;
				for ( index = 0; index < len; index++ ) {
					$th = c.$headers.eq( index );
					col = ts.getColumnData( table, c.headers, index, true );
					// add 'sorter-false' class if 'parser-false' is set
					s = ts.getData( $th, col, 'sorter' ) === 'false' || ts.getData( $th, col, 'parser' ) === 'false';
					$th[0].sortDisabled = s;
					$th[ s ? 'addClass' : 'removeClass' ]('sorter-false').attr('aria-disabled', '' + s);
					// aria-controls - requires table ID
					if (table.id) {
						if (s) {
							$th.removeAttr('aria-controls');
						} else {
							$th.attr('aria-controls', table.id);
						}
					}
				}
			}

			function setHeadersCss(table) {
				var f, h, i, j, $headers, $h, nextSort, txt,
					c = table.config,
					list = c.sortList,
					len = list.length,
					none = ts.css.sortNone + ' ' + c.cssNone,
					css = [ts.css.sortAsc + ' ' + c.cssAsc, ts.css.sortDesc + ' ' + c.cssDesc],
					cssIcon = [ c.cssIconAsc, c.cssIconDesc, c.cssIconNone ],
					aria = ['ascending', 'descending'],
					// find the footer
					$t = $(table).find('tfoot tr').children()
						.add( $( c.namespace + '_extra_headers' ) )
						.removeClass( css.join( ' ' ) );
				// remove all header information
				c.$headers
					.removeClass(css.join(' '))
					.addClass(none).attr('aria-sort', 'none')
					.find('.' + ts.css.icon)
					.removeClass(cssIcon.join(' '))
					.addClass(cssIcon[2]);
				for (i = 0; i < len; i++) {
					// direction = 2 means reset!
					if (list[i][1] !== 2) {
						// multicolumn sorting updating - choose the :last in case there are nested columns
						f = c.$headers.not('.sorter-false').filter('[data-column="' + list[i][0] + '"]' + (len === 1 ? ':last' : '') );
						if (f.length) {
							for (j = 0; j < f.length; j++) {
								if (!f[j].sortDisabled) {
									f.eq(j)
										.removeClass(none)
										.addClass(css[list[i][1]])
										.attr('aria-sort', aria[list[i][1]])
										.find('.' + ts.css.icon)
										.removeClass(cssIcon[2])
										.addClass(cssIcon[list[i][1]]);
								}
							}
							// add sorted class to footer & extra headers, if they exist
							if ($t.length) {
								$t.filter('[data-column="' + list[i][0] + '"]').removeClass(none).addClass(css[list[i][1]]);
							}
						}
					}
				}
				// add verbose aria labels
				len = c.$headers.length;
				$headers = c.$headers.not('.sorter-false');
				for ( i = 0; i < len; i++ ) {
					$h = $headers.eq( i );
					if ( $h.length ) {
						h = $headers[ i ];
						nextSort = h.order[ ( h.count + 1 ) % ( c.sortReset ? 3 : 2 ) ],
						txt = $.trim( $h.text() ) + ': ' +
							ts.language[ $h.hasClass( ts.css.sortAsc ) ? 'sortAsc' : $h.hasClass( ts.css.sortDesc ) ? 'sortDesc' : 'sortNone' ] +
							ts.language[ nextSort === 0 ? 'nextAsc' : nextSort === 1 ? 'nextDesc' : 'nextNone' ];
						$h.attr( 'aria-label', txt );
					}
				}
			}

			function updateHeaderSortCount( table, list ) {
				var col, dir, group, header, indx, primary, temp, val,
					c = table.config,
					sortList = list || c.sortList,
					len = sortList.length;
				c.sortList = [];
				for (indx = 0; indx < len; indx++) {
					val = sortList[indx];
					// ensure all sortList values are numeric - fixes #127
					col = parseInt(val[0], 10);
					// prevents error if sorton array is wrong
					if ( col < c.columns && c.$headerIndexed[col] ) {
						// make sure header exists
						header = c.$headerIndexed[col][0];
						// o.count = o.count + 1;
						dir = ('' + val[1]).match(/^(1|d|s|o|n)/);
						dir = dir ? dir[0] : '';
						// 0/(a)sc (default), 1/(d)esc, (s)ame, (o)pposite, (n)ext
						switch(dir) {
							case '1': case 'd': // descending
								dir = 1;
								break;
							case 's': // same direction (as primary column)
								// if primary sort is set to 's', make it ascending
								dir = primary || 0;
								break;
							case 'o':
								temp = header.order[(primary || 0) % (c.sortReset ? 3 : 2)];
								// opposite of primary column; but resets if primary resets
								dir = temp === 0 ? 1 : temp === 1 ? 0 : 2;
								break;
							case 'n':
								header.count = header.count + 1;
								dir = header.order[(header.count) % (c.sortReset ? 3 : 2)];
								break;
							default: // ascending
								dir = 0;
								break;
						}
						primary = indx === 0 ? dir : primary;
						group = [ col, parseInt(dir, 10) || 0 ];
						c.sortList.push(group);
						dir = $.inArray(group[1], header.order); // fixes issue #167
						header.count = dir >= 0 ? dir : group[1] % (c.sortReset ? 3 : 2);
					}
				}
			}

			function getCachedSortType(parsers, i) {
				return (parsers && parsers[i]) ? parsers[i].type || '' : '';
			}

			function initSort(table, cell, event){
				if (table.isUpdating) {
					// let any updates complete before initializing a sort
					return setTimeout(function(){ initSort(table, cell, event); }, 50);
				}
				var arry, indx, i, col, order, s, $header,
					c = table.config,
					key = !event[c.sortMultiSortKey],
					$table = c.$table,
					len = c.$headers.length;
				// Only call sortStart if sorting is enabled
				$table.trigger('sortStart', table);
				// get current column sort order
				cell.count = event[c.sortResetKey] ? 2 : (cell.count + 1) % (c.sortReset ? 3 : 2);
				// reset all sorts on non-current column - issue #30
				if (c.sortRestart) {
					indx = cell;
					for ( i = 0; i < len; i++ ) {
						$header = c.$headers.eq( i );
						// only reset counts on columns that weren't just clicked on and if not included in a multisort
						if ( $header[0] !== indx && ( key || !$header.is('.' + ts.css.sortDesc + ',.' + ts.css.sortAsc) ) ) {
							$header[0].count = -1;
						}
					}
				}
				// get current column index
				indx = parseInt( $(cell).attr('data-column'), 10 );
				// user only wants to sort on one column
				if (key) {
					// flush the sort list
					c.sortList = [];
					if (c.sortForce !== null) {
						arry = c.sortForce;
						for (col = 0; col < arry.length; col++) {
							if (arry[col][0] !== indx) {
								c.sortList.push(arry[col]);
							}
						}
					}
					// add column to sort list
					order = cell.order[cell.count];
					if (order < 2) {
						c.sortList.push([indx, order]);
						// add other columns if header spans across multiple
						if (cell.colSpan > 1) {
							for (col = 1; col < cell.colSpan; col++) {
								c.sortList.push([indx + col, order]);
							}
						}
					}
					// multi column sorting
				} else {
					// get rid of the sortAppend before adding more - fixes issue #115 & #523
					if (c.sortAppend && c.sortList.length > 1) {
						for (col = 0; col < c.sortAppend.length; col++) {
							s = ts.isValueInArray(c.sortAppend[col][0], c.sortList);
							if (s >= 0) {
								c.sortList.splice(s,1);
							}
						}
					}
					// the user has clicked on an already sorted column
					if (ts.isValueInArray(indx, c.sortList) >= 0) {
						// reverse the sorting direction
						for (col = 0; col < c.sortList.length; col++) {
							s = c.sortList[col];
							order = c.$headerIndexed[ s[0] ][0];
							if (s[0] === indx) {
								// order.count seems to be incorrect when compared to cell.count
								s[1] = order.order[cell.count];
								if (s[1] === 2) {
									c.sortList.splice(col,1);
									order.count = -1;
								}
							}
						}
					} else {
						// add column to sort list array
						order = cell.order[cell.count];
						if (order < 2) {
							c.sortList.push([indx, order]);
							// add other columns if header spans across multiple
							if (cell.colSpan > 1) {
								for (col = 1; col < cell.colSpan; col++) {
									c.sortList.push([indx + col, order]);
								}
							}
						}
					}
				}
				if (c.sortAppend !== null) {
					arry = c.sortAppend;
					for (col = 0; col < arry.length; col++) {
						if (arry[col][0] !== indx) {
							c.sortList.push(arry[col]);
						}
					}
				}
				// sortBegin event triggered immediately before the sort
				$table.trigger('sortBegin', table);
				// setTimeout needed so the processing icon shows up
				setTimeout(function(){
					// set css for headers
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
					$table.trigger('sortEnd', table);
				}, 1);
			}

			// sort multiple columns
			function multisort(table) { /*jshint loopfunc:true */
				var i, k, num, col, sortTime, colMax,
					rows, order, sort, x, y,
					dir = 0,
					c = table.config,
					cts = c.textSorter || '',
					sortList = c.sortList,
					l = sortList.length,
					bl = c.$tbodies.length;
				if (c.serverSideSorting || isEmptyObject(c.cache)) { // empty table - fixes #206/#346
					return;
				}
				if (c.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					colMax = c.cache[k].colMax;
					rows = c.cache[k].normalized;

					rows.sort(function(a, b) {
						// rows is undefined here in IE, so don't use it!
						for (i = 0; i < l; i++) {
							col = sortList[i][0];
							order = sortList[i][1];
							// sort direction, true = asc, false = desc
							dir = order === 0;

							if (c.sortStable && a[col] === b[col] && l === 1) {
								return a[c.columns].order - b[c.columns].order;
							}

							// fallback to natural sort since it is more robust
							num = /n/i.test(getCachedSortType(c.parsers, col));
							if (num && c.strings[col]) {
								// sort strings in numerical columns
								if (typeof (c.string[c.strings[col]]) === 'boolean') {
									num = (dir ? 1 : -1) * (c.string[c.strings[col]] ? -1 : 1);
								} else {
									num = (c.strings[col]) ? c.string[c.strings[col]] || 0 : 0;
								}
								// fall back to built-in numeric sort
								// var sort = $.tablesorter['sort' + s](table, a[c], b[c], c, colMax[c], dir);
								sort = c.numberSorter ? c.numberSorter(a[col], b[col], dir, colMax[col], table) :
									ts[ 'sortNumeric' + (dir ? 'Asc' : 'Desc') ](a[col], b[col], num, colMax[col], col, table);
							} else {
								// set a & b depending on sort direction
								x = dir ? a : b;
								y = dir ? b : a;
								// text sort function
								if (typeof(cts) === 'function') {
									// custom OVERALL text sorter
									sort = cts(x[col], y[col], dir, col, table);
								} else if (typeof(cts) === 'object' && cts.hasOwnProperty(col)) {
									// custom text sorter for a SPECIFIC COLUMN
									sort = cts[col](x[col], y[col], dir, col, table);
								} else {
									// fall back to natural sort
									sort = ts[ 'sortNatural' + (dir ? 'Asc' : 'Desc') ](a[col], b[col], col, table, c);
								}
							}
							if (sort) { return sort; }
						}
						return a[c.columns].order - b[c.columns].order;
					});
				}
				if (c.debug) { benchmark('Sorting on ' + sortList.toString() + ' and dir ' + order + ' time', sortTime); }
			}

			function resortComplete(c, callback){
				if (c.table.isUpdating) {
					c.$table.trigger('updateComplete', c.table);
				}
				if ($.isFunction(callback)) {
					callback(c.table);
				}
			}

			function checkResort(c, resort, callback) {
				var sl = $.isArray(resort) ? resort : c.sortList,
					// if no resort parameter is passed, fallback to config.resort (true by default)
					resrt = typeof resort === 'undefined' ? c.resort : resort;
				// don't try to resort if the table is still processing
				// this will catch spamming of the updateCell method
				if (resrt !== false && !c.serverSideSorting && !c.table.isProcessing) {
					if (sl.length) {
						c.$table.trigger('sorton', [sl, function(){
							resortComplete(c, callback);
						}, true]);
					} else {
						c.$table.trigger('sortReset', [function(){
							resortComplete(c, callback);
							ts.applyWidget(c.table, false);
						}]);
					}
				} else {
					resortComplete(c, callback);
					ts.applyWidget(c.table, false);
				}
			}

			function bindMethods(table){
				var c = table.config,
					$table = c.$table,
					events = ('sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache ' +
						'updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ').split(' ')
						.join(c.namespace + ' ');
				// apply easy methods that trigger bound events
				$table
				.unbind( events.replace(/\s+/g, ' ') )
				.bind('sortReset' + c.namespace, function(e, callback){
					e.stopPropagation();
					c.sortList = [];
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
					if ($.isFunction(callback)) {
						callback(table);
					}
				})
				.bind('updateAll' + c.namespace, function(e, resort, callback){
					e.stopPropagation();
					table.isUpdating = true;
					ts.refreshWidgets(table, true, true);
					buildHeaders(table);
					ts.bindEvents(table, c.$headers, true);
					bindMethods(table);
					commonUpdate(table, resort, callback);
				})
				.bind('update' + c.namespace + ' updateRows' + c.namespace, function(e, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					// update sorting (if enabled/disabled)
					updateHeader(table);
					commonUpdate(table, resort, callback);
				})
				.bind('updateCell' + c.namespace, function(e, cell, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					$table.find(c.selectorRemove).remove();
					// get position from the dom
					var t, row, icell, cache,
					$tb = c.$tbodies,
					$cell = $(cell),
					// update cache - format: function(s, table, cell, cellIndex)
					// no closest in jQuery v1.2.6 - tbdy = $tb.index( $(cell).closest('tbody') ),$row = $(cell).closest('tr');
					tbdy = $tb.index( $.fn.closest ? $cell.closest('tbody') : $cell.parents('tbody').filter(':first') ),
					tbcache = c.cache[ tbdy ],
					$row = $.fn.closest ? $cell.closest('tr') : $cell.parents('tr').filter(':first');
					cell = $cell[0]; // in case cell is a jQuery object
					// tbody may not exist if update is initialized while tbody is removed for processing
					if ($tb.length && tbdy >= 0) {
						row = $tb.eq( tbdy ).find( 'tr' ).index( $row );
						cache = tbcache.normalized[ row ];
						icell = $cell.index();
						t = getParsedText( c, cell, icell );
						cache[ icell ] = t;
						cache[ c.columns ].$row = $row;
						if ( (c.parsers[icell].type || '').toLowerCase() === 'numeric' ) {
							// update column max value (ignore sign)
							tbcache.colMax[icell] = Math.max(Math.abs(t) || 0, tbcache.colMax[icell] || 0);
						}
						t = resort !== 'undefined' ? resort : c.resort;
						if (t !== false) {
							// widgets will be reapplied
							checkResort(c, t, callback);
						} else {
							// don't reapply widgets is resort is false, just in case it causes
							// problems with element focus
							if ($.isFunction(callback)) {
								callback(table);
							}
							c.$table.trigger('updateComplete', c.table);
						}
					}
				})
				.bind('addRows' + c.namespace, function(e, $row, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					if (isEmptyObject(c.cache)) {
						// empty table, do an update instead - fixes #450
						updateHeader(table);
						commonUpdate(table, resort, callback);
					} else {
						$row = $($row).attr('role', 'row'); // make sure we're using a jQuery object
						var i, j, l, rowData, cells,
						rows = $row.filter('tr').length,
						tbdy = c.$tbodies.index( $row.parents('tbody').filter(':first') );
						// fixes adding rows to an empty table - see issue #179
						if (!(c.parsers && c.parsers.length)) {
							buildParserCache(table);
						}
						// add each row
						for (i = 0; i < rows; i++) {
							l = $row[i].cells.length;
							cells = [];
							rowData = {
								child: [],
								$row : $row.eq(i),
								order: c.cache[tbdy].normalized.length
							};
							// add each cell
							for (j = 0; j < l; j++) {
								cells[j] = getParsedText( c, $row[i].cells[j], j );
								if ((c.parsers[j].type || '').toLowerCase() === 'numeric') {
									// update column max value (ignore sign)
									c.cache[tbdy].colMax[j] = Math.max(Math.abs(cells[j]) || 0, c.cache[tbdy].colMax[j] || 0);
								}
							}
							// add the row data to the end
							cells.push(rowData);
							// update cache
							c.cache[tbdy].normalized.push(cells);
						}
						// resort using current settings
						checkResort(c, resort, callback);
					}
				})
				.bind('updateComplete' + c.namespace, function(){
					table.isUpdating = false;
				})
				.bind('sorton' + c.namespace, function(e, list, callback, init) {
					var c = table.config;
					e.stopPropagation();
					$table.trigger('sortStart', this);
					// update header count index
					updateHeaderSortCount(table, list);
					// set css for headers
					setHeadersCss(table);
					// fixes #346
					if (c.delayInit && isEmptyObject(c.cache)) { buildCache(table); }
					$table.trigger('sortBegin', this);
					// sort the table and append it to the dom
					multisort(table);
					appendToTable(table, init);
					$table.trigger('sortEnd', this);
					ts.applyWidget(table);
					if ($.isFunction(callback)) {
						callback(table);
					}
				})
				.bind('appendCache' + c.namespace, function(e, callback, init) {
					e.stopPropagation();
					appendToTable(table, init);
					if ($.isFunction(callback)) {
						callback(table);
					}
				})
				.bind('updateCache' + c.namespace, function(e, callback){
					// rebuild parsers
					if (!(c.parsers && c.parsers.length)) {
						buildParserCache(table);
					}
					// rebuild the cache map
					buildCache(table);
					if ($.isFunction(callback)) {
						callback(table);
					}
				})
				.bind('applyWidgetId' + c.namespace, function(e, id) {
					e.stopPropagation();
					ts.getWidgetById(id).format(table, c, c.widgetOptions);
				})
				.bind('applyWidgets' + c.namespace, function(e, init) {
					e.stopPropagation();
					// apply widgets
					ts.applyWidget(table, init);
				})
				.bind('refreshWidgets' + c.namespace, function(e, all, dontapply){
					e.stopPropagation();
					ts.refreshWidgets(table, all, dontapply);
				})
				.bind('destroy' + c.namespace, function(e, c, cb){
					e.stopPropagation();
					ts.destroy(table, c, cb);
				})
				.bind('resetToLoadState' + c.namespace, function(){
					// remove all widgets
					ts.removeWidget(table, true, false);
					// restore original settings; this clears out current settings, but does not clear
					// values saved to storage.
					c = $.extend(true, ts.defaults, c.originalSettings);
					table.hasInitialized = false;
					// setup the entire table again
					ts.setup( table, c );
				});
			}

			/* public methods */
			ts.construct = function(settings) {
				return this.each(function() {
					var table = this,
						// merge & extend config options
						c = $.extend(true, {}, ts.defaults, settings, ts.instanceMethods);
						// save initial settings
						c.originalSettings = settings;
					// create a table from data (build table widget)
					if (!table.hasInitialized && ts.buildTable && this.nodeName !== 'TABLE') {
						// return the table (in case the original target is the table's container)
						ts.buildTable(table, c);
					} else {
						ts.setup(table, c);
					}
				});
			};

			ts.setup = function(table, c) {
				// if no thead or tbody, or tablesorter is already present, quit
				if (!table || !table.tHead || table.tBodies.length === 0 || table.hasInitialized === true) {
					return c.debug ? log('ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized') : '';
				}

				var k = '',
					$table = $(table),
					m = $.metadata;
				// initialization flag
				table.hasInitialized = false;
				// table is being processed flag
				table.isProcessing = true;
				// make sure to store the config object
				table.config = c;
				// save the settings where they read
				$.data(table, 'tablesorter', c);
				if (c.debug) { $.data( table, 'startoveralltimer', new Date()); }

				// removing this in version 3 (only supports jQuery 1.7+)
				c.supportsDataObject = (function(version) {
					version[0] = parseInt(version[0], 10);
					return (version[0] > 1) || (version[0] === 1 && parseInt(version[1], 10) >= 4);
				})($.fn.jquery.split('.'));
				// digit sort text location; keeping max+/- for backwards compatibility
				c.string = { 'max': 1, 'min': -1, 'emptymin': 1, 'emptymax': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
				// ensure case insensitivity
				c.emptyTo = c.emptyTo.toLowerCase();
				c.stringTo = c.stringTo.toLowerCase();
				// add table theme class only if there isn't already one there
				if (!/tablesorter\-/.test($table.attr('class'))) {
					k = (c.theme !== '' ? ' tablesorter-' + c.theme : '');
				}
				c.table = table;
				c.$table = $table
					.addClass(ts.css.table + ' ' + c.tableClass + k)
					.attr('role', 'grid');
				c.$headers = $table.find(c.selectorHeaders);

				// give the table a unique id, which will be used in namespace binding
				if (!c.namespace) {
					c.namespace = '.tablesorter' + Math.random().toString(16).slice(2);
				} else {
					// make sure namespace starts with a period & doesn't have weird characters
					c.namespace = '.' + c.namespace.replace(/\W/g,'');
				}

				c.$table.children().children('tr').attr('role', 'row');
				c.$tbodies = $table.children('tbody:not(.' + c.cssInfoBlock + ')').attr({
					'aria-live' : 'polite',
					'aria-relevant' : 'all'
				});
				if (c.$table.children('caption').length) {
					k = c.$table.children('caption')[0];
					if (!k.id) { k.id = c.namespace.slice(1) + 'caption'; }
					c.$table.attr('aria-labelledby', k.id);
				}
				c.widgetInit = {}; // keep a list of initialized widgets
				// change textExtraction via data-attribute
				c.textExtraction = c.$table.attr('data-text-extraction') || c.textExtraction || 'basic';
				// build headers
				buildHeaders(table);
				// fixate columns if the users supplies the fixedWidth option
				// do this after theme has been applied
				ts.fixColumnWidth(table);
				// add widget options before parsing (e.g. grouping widget has parser settings)
				ts.applyWidgetOptions(table, c);
				// try to auto detect column type, and store in tables config
				buildParserCache(table);
				// start total row count at zero
				c.totalRows = 0;
				// build the cache for the tbody cells
				// delayInit will delay building the cache until the user starts a sort
				if (!c.delayInit) { buildCache(table); }
				// bind all header events and methods
				ts.bindEvents(table, c.$headers, true);
				bindMethods(table);
				// get sort list from jQuery data or metadata
				// in jQuery < 1.4, an error occurs when calling $table.data()
				if (c.supportsDataObject && typeof $table.data().sortlist !== 'undefined') {
					c.sortList = $table.data().sortlist;
				} else if (m && ($table.metadata() && $table.metadata().sortlist)) {
					c.sortList = $table.metadata().sortlist;
				}
				// apply widget init code
				ts.applyWidget(table, true);
				// if user has supplied a sort list to constructor
				if (c.sortList.length > 0) {
					$table.trigger('sorton', [c.sortList, {}, !c.initWidgets, true]);
				} else {
					setHeadersCss(table);
					if (c.initWidgets) {
						// apply widget format
						ts.applyWidget(table, false);
					}
				}

				// show processesing icon
				if (c.showProcessing) {
					$table
					.unbind('sortBegin' + c.namespace + ' sortEnd' + c.namespace)
					.bind('sortBegin' + c.namespace + ' sortEnd' + c.namespace, function(e) {
						clearTimeout(c.processTimer);
						ts.isProcessing(table);
						if (e.type === 'sortBegin') {
							c.processTimer = setTimeout(function(){
								ts.isProcessing(table, true);
							}, 500);
						}
					});
				}

				// initialized
				table.hasInitialized = true;
				table.isProcessing = false;
				if (c.debug) {
					ts.benchmark('Overall initialization time', $.data( table, 'startoveralltimer'));
				}
				$table.trigger('tablesorter-initialized', table);
				if (typeof c.initialized === 'function') { c.initialized(table); }
			};

			// automatically add a colgroup with col elements set to a percentage width
			ts.fixColumnWidth = function(table) {
				table = $(table)[0];
				var overallWidth, percent, $tbodies, len, index,
					c = table.config,
					colgroup = c.$table.children('colgroup');
				// remove plugin-added colgroup, in case we need to refresh the widths
				if (colgroup.length && colgroup.hasClass(ts.css.colgroup)) {
					colgroup.remove();
				}
				if (c.widthFixed && c.$table.children('colgroup').length === 0) {
					colgroup = $('<colgroup class="' + ts.css.colgroup + '">');
					overallWidth = c.$table.width();
					// only add col for visible columns - fixes #371
					$tbodies = c.$tbodies.find('tr:first').children(':visible'); //.each(function()
					len = $tbodies.length;
					for ( index = 0; index < len; index++ ) {
						percent = parseInt( ( $tbodies.eq( index ).width() / overallWidth ) * 1000, 10 ) / 10 + '%';
						colgroup.append( $('<col>').css('width', percent) );
					}
					c.$table.prepend(colgroup);
				}
			};

			ts.getColumnData = function(table, obj, indx, getCell, $headers){
				if (typeof obj === 'undefined' || obj === null) { return; }
				table = $(table)[0];
				var $h, k,
					c = table.config,
					$cells = ( $headers || c.$headers ),
					// c.$headerIndexed is not defined initially
					$cell = c.$headerIndexed && c.$headerIndexed[indx] || $cells.filter('[data-column="' + indx + '"]:last');
				if (obj[indx]) {
					return getCell ? obj[indx] : obj[$cells.index( $cell )];
				}
				for (k in obj) {
					if (typeof k === 'string') {
						$h = $cell
							// header cell with class/id
							.filter(k)
							// find elements within the header cell with cell/id
							.add( $cell.find(k) );
						if ($h.length) {
							return obj[k];
						}
					}
				}
				return;
			};

			// computeTableHeaderCellIndexes from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			ts.computeColumnIndex = function(trs) {
				var i, j, k, l, $cell, cell, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol,
					matrix = [],
					matrixrow = [],
					lookup = {};
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						cell = cells[j];
						$cell = $(cell);
						rowIndex = cell.parentNode.rowIndex;
						cellId = rowIndex + '-' + $cell.index();
						rowSpan = cell.rowSpan || 1;
						colSpan = cell.colSpan || 1;
						if (typeof(matrix[rowIndex]) === 'undefined') {
							matrix[rowIndex] = [];
						}
						// Find first available column in the first row
						for (k = 0; k < matrix[rowIndex].length + 1; k++) {
							if (typeof(matrix[rowIndex][k]) === 'undefined') {
								firstAvailCol = k;
								break;
							}
						}
						lookup[cellId] = firstAvailCol;
						// add data-column
						$cell.attr({ 'data-column' : firstAvailCol }); // 'data-row' : rowIndex
						for (k = rowIndex; k < rowIndex + rowSpan; k++) {
							if (typeof(matrix[k]) === 'undefined') {
								matrix[k] = [];
							}
							matrixrow = matrix[k];
							for (l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
								matrixrow[l] = 'x';
							}
						}
					}
				}
				return matrixrow.length;
			};

			// *** Process table ***
			// add processing indicator
			ts.isProcessing = function(table, toggle, $ths) {
				table = $(table);
				var c = table[0].config,
					// default to all headers
					$h = $ths || table.find('.' + ts.css.header);
				if (toggle) {
					// don't use sortList if custom $ths used
					if (typeof $ths !== 'undefined' && c.sortList.length > 0) {
						// get headers from the sortList
						$h = $h.filter(function(){
							// get data-column from attr to keep  compatibility with jQuery 1.2.6
							return this.sortDisabled ? false : ts.isValueInArray( parseFloat($(this).attr('data-column')), c.sortList) >= 0;
						});
					}
					table.add($h).addClass(ts.css.processing + ' ' + c.cssProcessing);
				} else {
					table.add($h).removeClass(ts.css.processing + ' ' + c.cssProcessing);
				}
			};

			// detach tbody but save the position
			// don't use tbody because there are portions that look for a tbody index (updateCell)
			ts.processTbody = function(table, $tb, getIt){
				table = $(table)[0];
				var holdr;
				if (getIt) {
					table.isProcessing = true;
					$tb.before('<span class="tablesorter-savemyplace"/>');
					holdr = ($.fn.detach) ? $tb.detach() : $tb.remove();
					return holdr;
				}
				holdr = $(table).find('span.tablesorter-savemyplace');
				$tb.insertAfter( holdr );
				holdr.remove();
				table.isProcessing = false;
			};

			ts.clearTableBody = function(table) {
				$(table)[0].config.$tbodies.children().detach();
			};

			ts.bindEvents = function(table, $headers, core) {
				table = $(table)[0];
				var t, downTarget = null,
					c = table.config;
				if (core !== true) {
					$headers.addClass( c.namespace.slice(1) + '_extra_headers' );
					t = $.fn.closest ? $headers.closest('table')[0] : $headers.parents('table')[0];
					if (t && t.nodeName === 'TABLE' && t !== table) {
						$(t).addClass( c.namespace.slice(1) + '_extra_table' );
					}
				}
				t = ( c.pointerDown + ' ' + c.pointerUp + ' ' + c.pointerClick + ' sort keyup ' )
					.replace(/\s+/g, ' ')
					.split(' ')
					.join(c.namespace + ' ');
				// apply event handling to headers and/or additional headers (stickyheaders, scroller, etc)
				$headers
				// http://stackoverflow.com/questions/5312849/jquery-find-self;
				.find(c.selectorSort).add( $headers.filter(c.selectorSort) )
				.unbind(t)
				.bind(t, function(e, external) {
					var cell,
						$target = $(e.target),
						// wrap event type in spaces, so the match doesn't trigger on inner words
						type = ' ' + e.type + ' ';
					// only recognize left clicks
					if ( ( ( e.which || e.button ) !== 1 && !type.match( ' ' + c.pointerClick + ' | sort | keyup ' ) ) ||
						// allow pressing enter
						( type === ' keyup ' && e.which !== 13 ) ||
						// allow triggering a click event (e.which is undefined) & ignore physical clicks
						( type.match(' ' + c.pointerClick + ' ') && typeof e.which !== 'undefined' ) ) {
						return;
					}
					// ignore mouseup if mousedown wasn't on the same target
					if ( type.match(' ' + c.pointerUp + ' ') && downTarget !== e.target && external !== true ) { return; }
					// set timer on mousedown
					if ( type.match(' ' + c.pointerDown + ' ') ) {
						downTarget = e.target;
						// needed or jQuery v1.2.6 throws an error
						e.preventDefault();
						return;
					}
					downTarget = null;
					// prevent sort being triggered on form elements
					if ( /(input|select|button|textarea)/i.test(e.target.nodeName) ||
						// nosort class name, or elements within a nosort container
						$target.hasClass(c.cssNoSort) || $target.parents('.' + c.cssNoSort).length > 0 ||
						// elements within a button
						$target.parents('button').length > 0 ) {
						return !c.cancelSelection;
					}
					if (c.delayInit && isEmptyObject(c.cache)) { buildCache(table); }
					// jQuery v1.2.6 doesn't have closest()
					cell = $.fn.closest ? $(this).closest('th, td')[0] : /TH|TD/.test(this.nodeName) ? this : $(this).parents('th, td')[0];
					// reference original table headers and find the same cell
					cell = c.$headers[ $headers.index( cell ) ];
					if (!cell.sortDisabled) {
						initSort(table, cell, e);
					}
				});
				if (c.cancelSelection) {
					// cancel selection
					$headers
						.attr('unselectable', 'on')
						.bind('selectstart', false)
						.css({
							'user-select': 'none',
							'MozUserSelect': 'none' // not needed for jQuery 1.8+
						});
				}
			};

			// restore headers
			ts.restoreHeaders = function(table){
				var index, $cell,
					c = $(table)[0].config,
					$headers = c.$table.find( c.selectorHeaders ),
					len = $headers.length;
				// don't use c.$headers here in case header cells were swapped
				for ( index = 0; index < len; index++ ) {
					// c.$table.find(c.selectorHeaders).each(function(i){
					$cell = $headers.eq( index );
					// only restore header cells if it is wrapped
					// because this is also used by the updateAll method
					if ( $cell.find( '.' + ts.css.headerIn ).length ) {
						$cell.html( c.headerContent[ index ] );
					}
				}
			};

			ts.destroy = function(table, removeClasses, callback){
				table = $(table)[0];
				if (!table.hasInitialized) { return; }
				// remove all widgets
				ts.removeWidget(table, true, false);
				var events,
					$t = $(table),
					c = table.config,
					$h = $t.find('thead:first'),
					$r = $h.find('tr.' + ts.css.headerRow).removeClass(ts.css.headerRow + ' ' + c.cssHeaderRow),
					$f = $t.find('tfoot:first > tr').children('th, td');
				if (removeClasses === false && $.inArray('uitheme', c.widgets) >= 0) {
					// reapply uitheme classes, in case we want to maintain appearance
					$t.trigger('applyWidgetId', ['uitheme']);
					$t.trigger('applyWidgetId', ['zebra']);
				}
				// remove widget added rows, just in case
				$h.find('tr').not($r).remove();
				// disable tablesorter
				events = 'sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache ' +
					'applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState '.split(' ')
					.join(c.namespace + ' ');
				$t
					.removeData('tablesorter')
					.unbind( events.replace(/\s+/g, ' ') );
				c.$headers.add($f)
					.removeClass( [ts.css.header, c.cssHeader, c.cssAsc, c.cssDesc, ts.css.sortAsc, ts.css.sortDesc, ts.css.sortNone].join(' ') )
					.removeAttr('data-column')
					.removeAttr('aria-label')
					.attr('aria-disabled', 'true');
				$r.find(c.selectorSort).unbind( ('mousedown mouseup keypress '.split(' ').join(c.namespace + ' ')).replace(/\s+/g, ' ') );
				ts.restoreHeaders(table);
				$t.toggleClass(ts.css.table + ' ' + c.tableClass + ' tablesorter-' + c.theme, removeClasses === false);
				// clear flag in case the plugin is initialized again
				table.hasInitialized = false;
				delete table.config.cache;
				if (typeof callback === 'function') {
					callback(table);
				}
			};

			// *** sort functions ***
			// regex used in natural sort
			ts.regex = {
				chunk : /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, // chunk/tokenize numbers & letters
				chunks: /(^\\0|\\0$)/, // replace chunks @ ends
				hex: /^0x[0-9a-f]+$/i // hex
			};

			// Natural sort - https://github.com/overset/javascript-natural-sort (date sorting removed)
			// this function will only accept strings, or you'll see 'TypeError: undefined is not a function'
			// I could add a = a.toString(); b = b.toString(); but it'll slow down the sort overall
			ts.sortNatural = function(a, b) {
				if (a === b) { return 0; }
				var xN, xD, yN, yD, xF, yF, i, mx,
					r = ts.regex;
				// first try and sort Hex codes
				if (r.hex.test(b)) {
					xD = parseInt(a.match(r.hex), 16);
					yD = parseInt(b.match(r.hex), 16);
					if ( xD < yD ) { return -1; }
					if ( xD > yD ) { return 1; }
				}
				// chunk/tokenize
				xN = a.replace(r.chunk, '\\0$1\\0').replace(r.chunks, '').split('\\0');
				yN = b.replace(r.chunk, '\\0$1\\0').replace(r.chunks, '').split('\\0');
				mx = Math.max(xN.length, yN.length);
				// natural sorting through split numeric strings and default strings
				for (i = 0; i < mx; i++) {
					// find floats not starting with '0', string or 0 if not defined
					xF = isNaN(xN[i]) ? xN[i] || 0 : parseFloat(xN[i]) || 0;
					yF = isNaN(yN[i]) ? yN[i] || 0 : parseFloat(yN[i]) || 0;
					// handle numeric vs string comparison - number < string - (Kyle Adams)
					if (isNaN(xF) !== isNaN(yF)) { return (isNaN(xF)) ? 1 : -1; }
					// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
					if (typeof xF !== typeof yF) {
						xF += '';
						yF += '';
					}
					if (xF < yF) { return -1; }
					if (xF > yF) { return 1; }
				}
				return 0;
			};

			ts.sortNaturalAsc = function(a, b, col, table, c) {
				if (a === b) { return 0; }
				var e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : e || 1; }
				return ts.sortNatural(a, b);
			};

			ts.sortNaturalDesc = function(a, b, col, table, c) {
				if (a === b) { return 0; }
				var e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : -e || -1; }
				return ts.sortNatural(b, a);
			};

			// basic alphabetical sort
			ts.sortText = function(a, b) {
				return a > b ? 1 : (a < b ? -1 : 0);
			};

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			ts.getTextValue = function(a, num, mx) {
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a ? a.length : 0, n = mx + num;
					for (i = 0; i < l; i++) {
						n += a.charCodeAt(i);
					}
					return num * n;
				}
				return 0;
			};

			ts.sortNumericAsc = function(a, b, num, mx, col, table) {
				if (a === b) { return 0; }
				var c = table.config,
					e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : e || 1; }
				if (isNaN(a)) { a = ts.getTextValue(a, num, mx); }
				if (isNaN(b)) { b = ts.getTextValue(b, num, mx); }
				return a - b;
			};

			ts.sortNumericDesc = function(a, b, num, mx, col, table) {
				if (a === b) { return 0; }
				var c = table.config,
					e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : -e || -1; }
				if (isNaN(a)) { a = ts.getTextValue(a, num, mx); }
				if (isNaN(b)) { b = ts.getTextValue(b, num, mx); }
				return b - a;
			};

			ts.sortNumeric = function(a, b) {
				return a - b;
			};

			// used when replacing accented characters during sorting
			ts.characterEquivalents = {
				'a' : '\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5', // áàâãäąå
				'A' : '\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5', // ÁÀÂÃÄĄÅ
				'c' : '\u00e7\u0107\u010d', // çćč
				'C' : '\u00c7\u0106\u010c', // ÇĆČ
				'e' : '\u00e9\u00e8\u00ea\u00eb\u011b\u0119', // éèêëěę
				'E' : '\u00c9\u00c8\u00ca\u00cb\u011a\u0118', // ÉÈÊËĚĘ
				'i' : '\u00ed\u00ec\u0130\u00ee\u00ef\u0131', // íìİîïı
				'I' : '\u00cd\u00cc\u0130\u00ce\u00cf', // ÍÌİÎÏ
				'o' : '\u00f3\u00f2\u00f4\u00f5\u00f6\u014d', // óòôõöō
				'O' : '\u00d3\u00d2\u00d4\u00d5\u00d6\u014c', // ÓÒÔÕÖŌ
				'ss': '\u00df', // ß (s sharp)
				'SS': '\u1e9e', // ẞ (Capital sharp s)
				'u' : '\u00fa\u00f9\u00fb\u00fc\u016f', // úùûüů
				'U' : '\u00da\u00d9\u00db\u00dc\u016e' // ÚÙÛÜŮ
			};
			ts.replaceAccents = function(s) {
				var a, acc = '[', eq = ts.characterEquivalents;
				if (!ts.characterRegex) {
					ts.characterRegexArray = {};
					for (a in eq) {
						if (typeof a === 'string') {
							acc += eq[a];
							ts.characterRegexArray[a] = new RegExp('[' + eq[a] + ']', 'g');
						}
					}
					ts.characterRegex = new RegExp(acc + ']');
				}
				if (ts.characterRegex.test(s)) {
					for (a in eq) {
						if (typeof a === 'string') {
							s = s.replace( ts.characterRegexArray[a], a );
						}
					}
				}
				return s;
			};

			// *** utilities ***
			ts.isValueInArray = function(column, arry) {
				var indx, len = arry.length;
				for (indx = 0; indx < len; indx++) {
					if (arry[indx][0] === column) {
						return indx;
					}
				}
				return -1;
			};

			ts.addParser = function(parser) {
				var i, l = ts.parsers.length, a = true;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === parser.id.toLowerCase()) {
						a = false;
					}
				}
				if (a) {
					ts.parsers.push(parser);
				}
			};

			// Use it to add a set of methods to table.config which will be available for all tables.
			// This should be done before table initialization
			ts.addInstanceMethods = function(methods) {
				$.extend(ts.instanceMethods, methods);
			};

			ts.getParserById = function(name) {
				/*jshint eqeqeq:false */
				if (name == 'false') { return false; }
				var i, l = ts.parsers.length;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === (name.toString()).toLowerCase()) {
						return ts.parsers[i];
					}
				}
				return false;
			};

			ts.addWidget = function(widget) {
				ts.widgets.push(widget);
			};

			ts.hasWidget = function(table, name){
				table = $(table);
				return table.length && table[0].config && table[0].config.widgetInit[name] || false;
			};

			ts.getWidgetById = function(name) {
				var i, w, l = ts.widgets.length;
				for (i = 0; i < l; i++) {
					w = ts.widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			};

			ts.applyWidgetOptions = function( table, c ){
				var indx, widget,
					len = c.widgets.length,
					wo = c.widgetOptions;
				if (len) {
					for (indx = 0; indx < len; indx++) {
						widget = ts.getWidgetById( c.widgets[indx] );
						if ( widget && 'options' in widget ) {
							wo = table.config.widgetOptions = $.extend( true, {}, widget.options, wo );
						}
					}
				}
			};

			ts.applyWidget = function(table, init, callback) {
				table = $(table)[0]; // in case this is called externally
				var indx, len, name,
					c = table.config,
					wo = c.widgetOptions,
					tableClass = ' ' + c.table.className + ' ',
					widgets = [],
					time, time2, w, wd;
				// prevent numerous consecutive widget applications
				if (init !== false && table.hasInitialized && (table.isApplyingWidgets || table.isUpdating)) { return; }
				if (c.debug) { time = new Date(); }
				// look for widgets to apply from in table class
				// stop using \b otherwise this matches 'ui-widget-content' & adds 'content' widget
				wd = new RegExp( '\\s' + c.widgetClass.replace( /\{name\}/i, '([\\w-]+)' )+ '\\s', 'g' );
				if ( tableClass.match( wd ) ) {
					// extract out the widget id from the table class (widget id's can include dashes)
					w = tableClass.match( wd );
					if ( w ) {
						len = w.length;
						for (indx = 0; indx < len; indx++) {
							c.widgets.push( w[indx].replace( wd, '$1' ) );
						}
					}
				}
				if (c.widgets.length) {
					table.isApplyingWidgets = true;
					// ensure unique widget ids
					c.widgets = $.grep(c.widgets, function(v, k){
						return $.inArray(v, c.widgets) === k;
					});
					name = c.widgets || [];
					len = name.length;
					// build widget array & add priority as needed
					for (indx = 0; indx < len; indx++) {
						wd = ts.getWidgetById(name[indx]);
						if (wd && wd.id) {
							// set priority to 10 if not defined
							if (!wd.priority) { wd.priority = 10; }
							widgets[indx] = wd;
						}
					}
					// sort widgets by priority
					widgets.sort(function(a, b){
						return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
					});
					// add/update selected widgets
					len = widgets.length;
					for (indx = 0; indx < len; indx++) {
						if (widgets[indx]) {
							if ( init || !( c.widgetInit[ widgets[indx].id ] ) ) {
								// set init flag first to prevent calling init more than once (e.g. pager)
								c.widgetInit[ widgets[indx].id ] = true;
								if (table.hasInitialized) {
									// don't reapply widget options on tablesorter init
									ts.applyWidgetOptions( table, c );
								}
								if ( 'init' in widgets[indx] ) {
									if (c.debug) { time2 = new Date(); }
									widgets[indx].init(table, widgets[indx], c, wo);
									if (c.debug) { ts.benchmark('Initializing ' + widgets[indx].id + ' widget', time2); }
								}
							}
							if ( !init && 'format' in widgets[indx] ) {
								if (c.debug) { time2 = new Date(); }
								widgets[indx].format(table, c, wo, false);
								if (c.debug) { ts.benchmark( ( init ? 'Initializing ' : 'Applying ' ) + widgets[indx].id + ' widget', time2); }
							}
						}
					}
					// callback executed on init only
					if (!init && typeof callback === 'function') {
						callback(table);
					}
				}
				setTimeout(function(){
					table.isApplyingWidgets = false;
					$.data(table, 'lastWidgetApplication', new Date());
				}, 0);
				if (c.debug) {
					w = c.widgets.length;
					benchmark('Completed ' + (init === true ? 'initializing ' : 'applying ') + w + ' widget' + (w !== 1 ? 's' : ''), time);
				}
			};

			ts.removeWidget = function(table, name, refreshing){
				table = $(table)[0];
				var i, widget, indx, len,
					c = table.config;
				// if name === true, add all widgets from $.tablesorter.widgets
				if (name === true) {
					name = [];
					len = ts.widgets.length;
					for (indx = 0; indx < len; indx++) {
						widget = ts.widgets[indx];
						if (widget && widget.id) {
							name.push( widget.id );
						}
					}
				} else {
					// name can be either an array of widgets names,
					// or a space/comma separated list of widget names
					name = ( $.isArray(name) ? name.join(',') : name || '' ).toLowerCase().split( /[\s,]+/ );
				}
				len = name.length;
				for (i = 0; i < len; i++) {
					widget = ts.getWidgetById(name[i]);
					indx = $.inArray( name[i], c.widgets );
					if ( widget && 'remove' in widget ) {
						if (c.debug && indx >= 0) { log( 'Removing "' + name[i] + '" widget' ); }
						widget.remove(table, c, c.widgetOptions, refreshing);
						c.widgetInit[ name[i] ] = false;
					}
					// don't remove the widget from config.widget if refreshing
					if (indx >= 0 && refreshing !== true) {
						c.widgets.splice( indx, 1 );
					}
				}
			};

			ts.refreshWidgets = function(table, doAll, dontapply) {
				table = $(table)[0]; // see issue #243
				var indx,
					c = table.config,
					cw = c.widgets,
					widgets = ts.widgets,
					len = widgets.length,
					list = [],
					callback = function(table){
						$(table).trigger('refreshComplete');
					};
				// remove widgets not defined in config.widgets, unless doAll is true
				for (indx = 0; indx < len; indx++) {
					if (widgets[indx] && widgets[indx].id && (doAll || $.inArray( widgets[indx].id, cw ) < 0)) {
						list.push( widgets[indx].id );
					}
				}
				ts.removeWidget( table, list.join(','), true );
				if (dontapply !== true) {
					// call widget init if
					ts.applyWidget(table, doAll || false, callback );
					if (doAll) {
						// apply widget format
						ts.applyWidget(table, false, callback);
					}
				} else {
					callback(table);
				}
			};

			ts.getColumnText = function( table, column, callback ) {
				table = $( table )[0];
				var tbodyIndex, rowIndex, cache, row, tbodyLen, rowLen, raw, parsed, $cell, result,
					hasCallback = typeof callback === 'function',
					allColumns = column === 'all',
					data = { raw : [], parsed: [], $cell: [] },
					c = table.config;
				if ( !isEmptyObject( c ) ) {
					tbodyLen = c.$tbodies.length;
					for ( tbodyIndex = 0; tbodyIndex < tbodyLen; tbodyIndex++ ) {
						cache = c.cache[ tbodyIndex ].normalized;
						rowLen = cache.length;
						for ( rowIndex = 0; rowIndex < rowLen; rowIndex++ ) {
							result = true;
							row =	cache[ rowIndex ];
							parsed = ( allColumns ) ? row.slice(0, c.columns) : row[ column ];
							row = row[ c.columns ];
							raw = ( allColumns ) ? row.raw : row.raw[ column ];
							$cell = ( allColumns ) ? row.$row.children() : row.$row.children().eq( column );
							if ( hasCallback ) {
								result = callback({
									tbodyIndex: tbodyIndex,
									rowIndex: rowIndex,
									parsed: parsed,
									raw: raw,
									$row: row.$row,
									$cell: $cell
								});
							}
							if ( result !== false ) {
								data.parsed.push( parsed );
								data.raw.push( raw );
								data.$cell.push( $cell );
							}
						}
					}
					// return everything
					return data;
				}
			};

			// get sorter, string, empty, etc options for each column from
			// jQuery data, metadata, header option or header class name ('sorter-false')
			// priority = jQuery data > meta > headers option > header class name
			ts.getData = function(h, ch, key) {
				var val = '', $h = $(h), m, cl;
				if (!$h.length) { return ''; }
				m = $.metadata ? $h.metadata() : false;
				cl = ' ' + ($h.attr('class') || '');
				if (typeof $h.data(key) !== 'undefined' || typeof $h.data(key.toLowerCase()) !== 'undefined'){
					// 'data-lockedOrder' is assigned to 'lockedorder'; but 'data-locked-order' is assigned to 'lockedOrder'
					// 'data-sort-initial-order' is assigned to 'sortInitialOrder'
					val += $h.data(key) || $h.data(key.toLowerCase());
				} else if (m && typeof m[key] !== 'undefined') {
					val += m[key];
				} else if (ch && typeof ch[key] !== 'undefined') {
					val += ch[key];
				} else if (cl !== ' ' && cl.match(' ' + key + '-')) {
					// include sorter class name 'sorter-text', etc; now works with 'sorter-my-custom-parser'
					val = cl.match( new RegExp('\\s' + key + '-([\\w-]+)') )[1] || '';
				}
				return $.trim(val);
			};

			ts.formatFloat = function(s, table) {
				if (typeof s !== 'string' || s === '') { return s; }
				// allow using formatFloat without a table; defaults to US number format
				var i,
					t = table && table.config ? table.config.usNumberFormat !== false :
						typeof table !== 'undefined' ? table : true;
				if (t) {
					// US Format - 1,234,567.89 -> 1234567.89
					s = s.replace(/,/g,'');
				} else {
					// German Format = 1.234.567,89 -> 1234567.89
					// French Format = 1 234 567,89 -> 1234567.89
					s = s.replace(/[\s|\.]/g,'').replace(/,/g,'.');
				}
				if(/^\s*\([.\d]+\)/.test(s)) {
					// make (#) into a negative number -> (10) = -10
					s = s.replace(/^\s*\(([.\d]+)\)/, '-$1');
				}
				i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};

			ts.isDigit = function(s) {
				// replace all unwanted chars and match
				return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString().replace(/[,.'"\s]/g, '')) : s !== '';
			};

		}()
	});

	// make shortcut
	var ts = $.tablesorter;

	// extend plugin scope
	$.fn.extend({
		tablesorter: ts.construct
	});

	// add default parsers
	ts.addParser({
		id: 'no-parser',
		is: function() {
			return false;
		},
		format: function() {
			return '';
		},
		type: 'text'
	});

	ts.addParser({
		id: 'text',
		is: function() {
			return true;
		},
		format: function(s, table) {
			var c = table.config;
			if (s) {
				s = $.trim( c.ignoreCase ? s.toLocaleLowerCase() : s );
				s = c.sortLocaleCompare ? ts.replaceAccents(s) : s;
			}
			return s;
		},
		type: 'text'
	});

	ts.addParser({
		id: 'digit',
		is: function(s) {
			return ts.isDigit(s);
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ''), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'currency',
		is: function(s) {
			return (/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/).test((s || '').replace(/[+\-,. ]/g,'')); // £$€¤¥¢
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ''), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'url',
		is: function(s) {
			return (/^(https?|ftp|file):\/\//).test(s);
		},
		format: function(s) {
			return s ? $.trim(s.replace(/(https?|ftp|file):\/\//, '')) : s;
		},
		parsed : true, // filter widget flag
		type: 'text'
	});

	ts.addParser({
		id: 'isoDate',
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/).test(s);
		},
		format: function(s, table) {
			var date = s ? new Date( s.replace(/-/g, '/') ) : s;
			return date instanceof Date && isFinite(date) ? date.getTime() : s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'percent',
		is: function(s) {
			return (/(\d\s*?%|%\s*?\d)/).test(s) && s.length < 15;
		},
		format: function(s, table) {
			return s ? ts.formatFloat(s.replace(/%/g, ''), table) : s;
		},
		type: 'numeric'
	});

	// added image parser to core v2.17.9
	ts.addParser({
		id: 'image',
		is: function(s, table, node, $node){
			return $node.find('img').length > 0;
		},
		format: function(s, table, cell) {
			return $(cell).find('img').attr(table.config.imgAttr || 'alt') || s;
		},
		parsed : true, // filter widget flag
		type: 'text'
	});

	ts.addParser({
		id: 'usLongDate',
		is: function(s) {
			// two digit years are not allowed cross-browser
			// Jan 01, 2013 12:34:56 PM or 01 Jan 2013
			return (/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i).test(s) || (/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i).test(s);
		},
		format: function(s, table) {
			var date = s ? new Date( s.replace(/(\S)([AP]M)$/i, '$1 $2') ) : s;
			return date instanceof Date && isFinite(date) ? date.getTime() : s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'shortDate', // 'mmddyyyy', 'ddmmyyyy' or 'yyyymmdd'
		is: function(s) {
			// testing for ##-##-#### or ####-##-##, so it's not perfect; time can be included
			return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/).test((s || '').replace(/\s+/g,' ').replace(/[\-.,]/g, '/'));
		},
		format: function(s, table, cell, cellIndex) {
			if (s) {
				var date, d,
					c = table.config,
					ci = c.$headerIndexed[ cellIndex ],
					format = ci.length && ci[0].dateFormat || ts.getData( ci, ts.getColumnData( table, c.headers, cellIndex ), 'dateFormat') || c.dateFormat;
				d = s.replace(/\s+/g, ' ').replace(/[\-.,]/g, '/'); // escaped - because JSHint in Firefox was showing it as an error
				if (format === 'mmddyyyy') {
					d = d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, '$3/$1/$2');
				} else if (format === 'ddmmyyyy') {
					d = d.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, '$3/$2/$1');
				} else if (format === 'yyyymmdd') {
					d = d.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, '$1/$2/$3');
				}
				date = new Date(d);
				return date instanceof Date && isFinite(date) ? date.getTime() : s;
			}
			return s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'time',
		is: function(s) {
			return (/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i).test(s);
		},
		format: function(s, table) {
			var date = s ? new Date( '2000/01/01 ' + s.replace(/(\S)([AP]M)$/i, '$1 $2') ) : s;
			return date instanceof Date && isFinite(date) ? date.getTime() : s;
		},
		type: 'numeric'
	});

	ts.addParser({
		id: 'metadata',
		is: function() {
			return false;
		},
		format: function(s, table, cell) {
			var c = table.config,
			p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
			return $(cell).metadata()[p];
		},
		type: 'numeric'
	});

	// add default widgets
	ts.addWidget({
		id: 'zebra',
		priority: 90,
		format: function(table, c, wo) {
			var $tv, $tr, row, even, time, k, i, len,
				child = new RegExp(c.cssChildRow, 'i'),
				b = c.$tbodies.add( $( c.namespace + '_extra_table' ).children( 'tbody' ) );
			if (c.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				// loop through the visible rows
				row = 0;
				$tv = b.eq( k ).children( 'tr:visible' ).not( c.selectorRemove );
				len = $tv.length;
				for ( i = 0; i < len; i++ ) {
					$tr = $tv.eq( i );
					// style child rows the same way the parent row was styled
					if ( !child.test( $tr[0].className ) ) { row++; }
					even = ( row % 2 === 0 );
					$tr
						.removeClass( wo.zebra[ even ? 1 : 0 ] )
						.addClass( wo.zebra[ even ? 0 : 1 ] );
				}
			}
		},
		remove: function(table, c, wo, refreshing){
			if (refreshing) { return; }
			var k, $tb,
				b = c.$tbodies,
				rmv = (wo.zebra || [ 'even', 'odd' ]).join(' ');
			for (k = 0; k < b.length; k++ ){
				$tb = ts.processTbody(table, b.eq(k), true); // remove tbody
				$tb.children().removeClass(rmv);
				ts.processTbody(table, $tb, false); // restore tbody
			}
		}
	});

})(jQuery);

/*! Widget: storage - updated 3/26/2015 (v2.21.3) */
;(function ($, window, document) {
'use strict';

var ts = $.tablesorter || {};
// *** Store data in local storage, with a cookie fallback ***
/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
   if you need it, then include https://github.com/douglascrockford/JSON-js

   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
   versions will only allow storing information for one page at a time

   // *** Save data (JSON format only) ***
   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
   // $.tablesorter.storage(table, key, val);
   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

   // *** Get data: $.tablesorter.storage(table, key); ***
   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
   // val may be empty, so also check for your data
   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
   alert(val); // "data1" if saved, or "" if not
*/
ts.storage = function(table, key, value, options) {
	table = $(table)[0];
	var cookieIndex, cookies, date,
		hasStorage = false,
		values = {},
		c = table.config,
		wo = c && c.widgetOptions,
		storageType = ( options && options.useSessionStorage ) || ( wo && wo.storage_useSessionStorage ) ?
			'sessionStorage' : 'localStorage',
		$table = $(table),
		// id from (1) options ID, (2) table "data-table-group" attribute, (3) widgetOptions.storage_tableId,
		// (4) table ID, then (5) table index
		id = options && options.id ||
			$table.attr( options && options.group || wo && wo.storage_group || 'data-table-group') ||
			wo && wo.storage_tableId || table.id || $('.tablesorter').index( $table ),
		// url from (1) options url, (2) table "data-table-page" attribute, (3) widgetOptions.storage_fixedUrl,
		// (4) table.config.fixedUrl (deprecated), then (5) window location path
		url = options && options.url ||
			$table.attr(options && options.page || wo && wo.storage_page || 'data-table-page') ||
			wo && wo.storage_fixedUrl || c && c.fixedUrl || window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if (storageType in window) {
		try {
			window[storageType].setItem('_tmptest', 'temp');
			hasStorage = true;
			window[storageType].removeItem('_tmptest');
		} catch(error) {
			if (c && c.debug) {
				ts.log( storageType + ' is not supported in this browser' );
			}
		}
	}
	// *** get value ***
	if ($.parseJSON) {
		if (hasStorage) {
			values = $.parseJSON( window[storageType][key] || 'null' ) || {};
		} else {
			// old browser, using cookies
			cookies = document.cookie.split(/[;\s|=]/);
			// add one to get from the key to the value
			cookieIndex = $.inArray(key, cookies) + 1;
			values = (cookieIndex !== 0) ? $.parseJSON(cookies[cookieIndex] || 'null') || {} : {};
		}
	}
	// allow value to be an empty string too
	if ((value || value === '') && window.JSON && JSON.hasOwnProperty('stringify')) {
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!values[url]) {
			values[url] = {};
		}
		values[url][id] = value;
		// *** set value ***
		if (hasStorage) {
			window[storageType][key] = JSON.stringify(values);
		} else {
			date = new Date();
			date.setTime(date.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(values)).replace(/\"/g,'\"') + '; expires=' + date.toGMTString() + '; path=/';
		}
	} else {
		return values && values[url] ? values[url][id] : '';
	}
};

})(jQuery, window, document);

/*! Widget: uitheme - updated 3/26/2015 (v2.21.3) */
;(function ($) {
'use strict';
var ts = $.tablesorter || {};

ts.themes = {
	'bootstrap' : {
		table        : 'table table-bordered table-striped',
		caption      : 'caption',
		// header class names
		header       : 'bootstrap-header', // give the header a gradient background (theme.bootstrap_2.css)
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : '', // applied when column is sorted
		hover        : '', // custom css required - a defined bootstrap style may not override other classes
		// icon class names
		icons        : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		iconSortNone : 'bootstrap-icon-unsorted', // class name added to icon when column is not sorted
		iconSortAsc  : 'icon-chevron-up glyphicon glyphicon-chevron-up', // class name added to icon when column has ascending sort
		iconSortDesc : 'icon-chevron-down glyphicon glyphicon-chevron-down', // class name added to icon when column has descending sort
		filterRow    : '', // filter row class
		footerRow    : '',
		footerCells  : '',
		even         : '', // even row zebra striping
		odd          : ''  // odd row zebra striping
	},
	'jui' : {
		table        : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption      : 'ui-widget-content',
		// header class names
		header       : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		sortNone     : '',
		sortAsc      : '',
		sortDesc     : '',
		active       : 'ui-state-active', // applied when column is sorted
		hover        : 'ui-state-hover',  // hover class
		// icon class names
		icons        : 'ui-icon', // icon class added to the <i> in the header
		iconSortNone : 'ui-icon-carat-2-n-s', // class name added to icon when column is not sorted
		iconSortAsc  : 'ui-icon-carat-1-n', // class name added to icon when column has ascending sort
		iconSortDesc : 'ui-icon-carat-1-s', // class name added to icon when column has descending sort
		filterRow    : '',
		footerRow    : '',
		footerCells  : '',
		even         : 'ui-widget-content', // even row zebra striping
		odd          : 'ui-state-default'   // odd row zebra striping
	}
};

$.extend(ts.css, {
	wrapper : 'tablesorter-wrapper' // ui theme & resizable
});

ts.addWidget({
	id: "uitheme",
	priority: 10,
	format: function(table, c, wo) {
		var i, hdr, icon, time, $header, $icon, $tfoot, $h, oldtheme, oldremove, oldIconRmv, hasOldTheme,
			themesAll = ts.themes,
			$table = c.$table.add( $( c.namespace + '_extra_table' ) ),
			$headers = c.$headers.add( $( c.namespace + '_extra_headers' ) ),
			theme = c.theme || 'jui',
			themes = themesAll[theme] || {},
			remove = $.trim( [ themes.sortNone, themes.sortDesc, themes.sortAsc, themes.active ].join( ' ' ) ),
			iconRmv = $.trim( [ themes.iconSortNone, themes.iconSortDesc, themes.iconSortAsc ].join( ' ' ) );
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$table.hasClass('tablesorter-' + theme) || c.theme !== c.appliedTheme || !wo.uitheme_applied) {
			wo.uitheme_applied = true;
			oldtheme = themesAll[c.appliedTheme] || {};
			hasOldTheme = !$.isEmptyObject(oldtheme);
			oldremove =  hasOldTheme ? [ oldtheme.sortNone, oldtheme.sortDesc, oldtheme.sortAsc, oldtheme.active ].join( ' ' ) : '';
			oldIconRmv = hasOldTheme ? [ oldtheme.iconSortNone, oldtheme.iconSortDesc, oldtheme.iconSortAsc ].join( ' ' ) : '';
			if (hasOldTheme) {
				wo.zebra[0] = $.trim( ' ' + wo.zebra[0].replace(' ' + oldtheme.even, '') );
				wo.zebra[1] = $.trim( ' ' + wo.zebra[1].replace(' ' + oldtheme.odd, '') );
				c.$tbodies.children().removeClass( [oldtheme.even, oldtheme.odd].join(' ') );
			}
			// update zebra stripes
			if (themes.even) { wo.zebra[0] += ' ' + themes.even; }
			if (themes.odd) { wo.zebra[1] += ' ' + themes.odd; }
			// add caption style
			$table.children('caption')
				.removeClass(oldtheme.caption || '')
				.addClass(themes.caption);
			// add table/footer class names
			$tfoot = $table
				// remove other selected themes
				.removeClass( (c.appliedTheme ? 'tablesorter-' + (c.appliedTheme || '') : '') + ' ' + (oldtheme.table || '') )
				.addClass('tablesorter-' + theme + ' ' + (themes.table || '')) // add theme widget class name
				.children('tfoot');
			c.appliedTheme = c.theme;

			if ($tfoot.length) {
				$tfoot
					// if oldtheme.footerRow or oldtheme.footerCells are undefined, all class names are removed
					.children('tr').removeClass(oldtheme.footerRow || '').addClass(themes.footerRow)
					.children('th, td').removeClass(oldtheme.footerCells || '').addClass(themes.footerCells);
			}
			// update header classes
			$headers
				.removeClass( (hasOldTheme ? [oldtheme.header, oldtheme.hover, oldremove].join(' ') : '') || '' )
				.addClass(themes.header)
				.not('.sorter-false')
				.unbind('mouseenter.tsuitheme mouseleave.tsuitheme')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(event) {
					// toggleClass with switch added in jQuery 1.3
					$(this)[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ](themes.hover || '');
				});

			$headers.each(function(){
				var $this = $(this);
				if (!$this.find('.' + ts.css.wrapper).length) {
					// Firefox needs this inner div to position the icon & resizer correctly
					$this.wrapInner('<div class="' + ts.css.wrapper + '" style="position:relative;height:100%;width:100%"></div>');
				}
			});
			if (c.cssIcon) {
				// if c.cssIcon is '', then no <i> is added to the header
				$headers
					.find('.' + ts.css.icon)
					.removeClass(hasOldTheme ? [oldtheme.icons, oldIconRmv].join(' ') : '')
					.addClass(themes.icons || '');
			}
			if ($table.hasClass('hasFilters')) {
				$table.children('thead').children('.' + ts.css.filterRow)
					.removeClass(hasOldTheme ? oldtheme.filterRow || '' : '')
					.addClass(themes.filterRow || '');
			}
		}
		for (i = 0; i < c.columns; i++) {
			$header = c.$headers
				.add($(c.namespace + '_extra_headers'))
				.not('.sorter-false')
				.filter('[data-column="' + i + '"]');
			$icon = (ts.css.icon) ? $header.find('.' + ts.css.icon) : $();
			$h = $headers.not('.sorter-false').filter('[data-column="' + i + '"]:last');
			if ($h.length) {
				$header.removeClass(remove);
				$icon.removeClass(iconRmv);
				if ($h[0].sortDisabled) {
					// no sort arrows for disabled columns!
					$icon.removeClass(themes.icons || '');
				} else {
					hdr = themes.sortNone;
					icon = themes.iconSortNone;
					if ($h.hasClass(ts.css.sortAsc)) {
						hdr = [themes.sortAsc, themes.active].join(' ');
						icon = themes.iconSortAsc;
					} else if ($h.hasClass(ts.css.sortDesc)) {
						hdr = [themes.sortDesc, themes.active].join(' ');
						icon = themes.iconSortDesc;
					}
					$header.addClass(hdr);
					$icon.addClass(icon || '');
				}
			}
		}
		if (c.debug) {
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo, refreshing) {
		if (!wo.uitheme_applied) { return; }
		var $table = c.$table,
			theme = c.appliedTheme || 'jui',
			themes = ts.themes[ theme ] || ts.themes.jui,
			$headers = $table.children('thead').children(),
			remove = themes.sortNone + ' ' + themes.sortDesc + ' ' + themes.sortAsc,
			iconRmv = themes.iconSortNone + ' ' + themes.iconSortDesc + ' ' + themes.iconSortAsc;
		$table.removeClass('tablesorter-' + theme + ' ' + themes.table);
		wo.uitheme_applied = false;
		if (refreshing) { return; }
		$table.find(ts.css.header).removeClass(themes.header);
		$headers
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(themes.hover + ' ' + remove + ' ' + themes.active)
			.filter('.' + ts.css.filterRow)
			.removeClass(themes.filterRow);
		$headers.find('.' + ts.css.icon).removeClass(themes.icons + ' ' + iconRmv);
	}
});

})(jQuery);

/*! Widget: columns */
;(function ($) {
'use strict';
var ts = $.tablesorter || {};

ts.addWidget({
	id: "columns",
	priority: 30,
	options : {
		columns : [ "primary", "secondary", "tertiary" ]
	},
	format: function(table, c, wo) {
		var $tbody, tbodyIndex, $rows, rows, $row, $cells, remove, indx,
			$table = c.$table,
			$tbodies = c.$tbodies,
			sortList = c.sortList,
			len = sortList.length,
			// removed c.widgetColumns support
			css = wo && wo.columns || [ "primary", "secondary", "tertiary" ],
			last = css.length - 1;
			remove = css.join(' ');
		// check if there is a sort (on initialization there may not be one)
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // detach tbody
			$rows = $tbody.children('tr');
			// loop through the visible rows
			$rows.each(function() {
				$row = $(this);
				if (this.style.display !== 'none') {
					// remove all columns class names
					$cells = $row.children().removeClass(remove);
					// add appropriate column class names
					if (sortList && sortList[0]) {
						// primary sort column class
						$cells.eq(sortList[0][0]).addClass(css[0]);
						if (len > 1) {
							for (indx = 1; indx < len; indx++) {
								// secondary, tertiary, etc sort column classes
								$cells.eq(sortList[indx][0]).addClass( css[indx] || css[last] );
							}
						}
					}
				}
			});
			ts.processTbody(table, $tbody, false);
		}
		// add classes to thead and tfoot
		rows = wo.columns_thead !== false ? ['thead tr'] : [];
		if (wo.columns_tfoot !== false) {
			rows.push('tfoot tr');
		}
		if (rows.length) {
			$rows = $table.find( rows.join(',') ).children().removeClass(remove);
			if (len) {
				for (indx = 0; indx < len; indx++) {
					// add primary. secondary, tertiary, etc sort column classes
					$rows.filter('[data-column="' + sortList[indx][0] + '"]').addClass(css[indx] || css[last]);
				}
			}
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$tbodies = c.$tbodies,
			remove = (wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(remove);
		c.$table.children('tfoot').children('tr').children('th, td').removeClass(remove);
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children('tr').each(function() {
				$(this).children().removeClass(remove);
			});
			ts.processTbody(table, $tbody, false); // restore tbody
		}
	}
});

})(jQuery);

/*! Widget: filter - updated 5/17/2015 (v2.22.1) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
;( function ( $ ) {
'use strict';
var ts = $.tablesorter || {},
	tscss = ts.css;

$.extend( tscss, {
	filterRow      : 'tablesorter-filter-row',
	filter         : 'tablesorter-filter',
	filterDisabled : 'disabled',
	filterRowHide  : 'hideme'
});

ts.addWidget({
	id: 'filter',
	priority: 50,
	options : {
		filter_childRows     : false, // if true, filter includes child row content in the search
		filter_childByColumn : false, // ( filter_childRows must be true ) if true = search child rows by column; false = search all child row text grouped
		filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
		filter_columnAnyMatch: true,  // if true, allows using '#:{query}' in AnyMatch searches ( column:query )
		filter_cellFilter    : '',    // css class name added to the filter cell ( string or array )
		filter_cssFilter     : '',    // css class name added to the filter row & each input in the row ( tablesorter-filter is ALWAYS added )
		filter_defaultFilter : {},    // add a default column filter type '~{query}' to make fuzzy searches default; '{q1} AND {q2}' to make all searches use a logical AND.
		filter_excludeFilter : {},    // filters to exclude, per column
		filter_external      : '',    // jQuery selector string ( or jQuery object ) of external filters
		filter_filteredRow   : 'filtered', // class added to filtered rows; needed by pager plugin
		filter_formatter     : null,  // add custom filter elements to the filter row
		filter_functions     : null,  // add custom filter functions using this option
		filter_hideEmpty     : true,  // hide filter row when table is empty
		filter_hideFilters   : false, // collapse filter row when mouse leaves the area
		filter_ignoreCase    : true,  // if true, make all searches case-insensitive
		filter_liveSearch    : true,  // if true, search column content while the user types ( with a delay )
		filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available ( visible ) options within the drop down
		filter_placeholder   : { search : '', select : '' }, // default placeholder text ( overridden by any header 'data-placeholder' setting )
		filter_reset         : null,  // jQuery selector string of an element used to reset the filters
		filter_saveFilters   : false, // Use the $.tablesorter.storage utility to save the most recent filters
		filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
		filter_searchFiltered: true,  // allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
		filter_selectSource  : null,  // include a function to return an array of values to be added to the column filter select
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
		filter_defaultAttrib : 'data-value', // data attribute in the header cell that contains the default filter value
		filter_selectSourceSeparator : '|' // filter_selectSource array text left of the separator is added to the option value, right into the option text
	},
	format: function( table, c, wo ) {
		if ( !c.$table.hasClass( 'hasFilters' ) ) {
			ts.filter.init( table, c, wo );
		}
	},
	remove: function( table, c, wo, refreshing ) {
		var tbodyIndex, $tbody,
			$table = c.$table,
			$tbodies = c.$tbodies,
			events = 'addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '
				.split( ' ' ).join( c.namespace + 'filter ' );
		$table
			.removeClass( 'hasFilters' )
			// add .tsfilter namespace to all BUT search
			.unbind( events.replace( /\s+/g, ' ' ) )
			// remove the filter row even if refreshing, because the column might have been moved
			.find( '.' + tscss.filterRow ).remove();
		if ( refreshing ) { return; }
		for ( tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody( table, $tbodies.eq( tbodyIndex ), true ); // remove tbody
			$tbody.children().removeClass( wo.filter_filteredRow ).show();
			ts.processTbody( table, $tbody, false ); // restore tbody
		}
		if ( wo.filter_reset ) {
			$( document ).undelegate( wo.filter_reset, 'click.tsfilter' );
		}
	}
});

ts.filter = {

	// regex used in filter 'check' functions - not for general use and not documented
	regex: {
		regex     : /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // regex to test for regex
		child     : /tablesorter-childRow/, // child row class name; this gets updated in the script
		filtered  : /filtered/, // filtered (hidden) row class name; updated in the script
		type      : /undefined|number/, // check type
		exact     : /(^[\"\'=]+)|([\"\'=]+$)/g, // exact match (allow '==')
		nondigit  : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
		operators : /[<>=]/g, // replace operators
		query     : '(q|query)' // replace filter queries
	},
		// function( c, data ) { }
		// c = table.config
		// data.$row = jQuery object of the row currently being processed
		// data.$cells = jQuery object of all cells within the current row
		// data.filters = array of filters for all columns ( some may be undefined )
		// data.filter = filter for the current column
		// data.iFilter = same as data.filter, except lowercase ( if wo.filter_ignoreCase is true )
		// data.exact = table cell text ( or parsed data if column parser enabled )
		// data.iExact = same as data.exact, except lowercase ( if wo.filter_ignoreCase is true )
		// data.cache = table cell text from cache, so it has been parsed ( & in all lower case if c.ignoreCase is true )
		// data.cacheArray = An array of parsed content from each table cell in the row being processed
		// data.index = column index; table = table element ( DOM )
		// data.parsed = array ( by column ) of boolean values ( from filter_useParsedData or 'filter-parsed' class )
	types: {
		// Look for regex
		regex: function( c, data ) {
			if ( ts.filter.regex.regex.test( data.filter ) ) {
				var matches,
					// cache regex per column for optimal speed
					regex = data.filter_regexCache[ data.index ] || ts.filter.regex.regex.exec( data.filter ),
					isRegex = regex instanceof RegExp;
				try {
					if ( !isRegex ) {
						// force case insensitive search if ignoreCase option set?
						// if ( c.ignoreCase && !regex[2] ) { regex[2] = 'i'; }
						data.filter_regexCache[ data.index ] = regex = new RegExp( regex[1], regex[2] );
					}
					matches = regex.test( data.exact );
				} catch ( error ) {
					matches = false;
				}
				return matches;
			}
			return null;
		},
		// Look for operators >, >=, < or <=
		operators: function( c, data ) {
			// ignore empty strings... because '' < 10 is true
			if ( /^[<>]=?/.test( data.iFilter ) && data.iExact !== '' ) {
				var cachedValue, result, txt,
					table = c.table,
					index = data.index,
					parsed = data.parsed[index],
					query = ts.formatFloat( data.iFilter.replace( ts.filter.regex.operators, '' ), table ),
					parser = c.parsers[index],
					savedSearch = query;
				// parse filter value in case we're comparing numbers ( dates )
				if ( parsed || parser.type === 'numeric' ) {
					txt = $.trim( '' + data.iFilter.replace( ts.filter.regex.operators, '' ) );
					result = ts.filter.parseFilter( c, txt, index, true );
					query = ( typeof result === 'number' && result !== '' && !isNaN( result ) ) ? result : query;
				}
				// iExact may be numeric - see issue #149;
				// check if cached is defined, because sometimes j goes out of range? ( numeric columns )
				if ( ( parsed || parser.type === 'numeric' ) && !isNaN( query ) &&
					typeof data.cache !== 'undefined' ) {
					cachedValue = data.cache;
				} else {
					txt = isNaN( data.iExact ) ? data.iExact.replace( ts.filter.regex.nondigit, '' ) : data.iExact;
					cachedValue = ts.formatFloat( txt, table );
				}
				if ( />/.test( data.iFilter ) ) {
					result = />=/.test( data.iFilter ) ? cachedValue >= query : cachedValue > query;
				} else if ( /</.test( data.iFilter ) ) {
					result = /<=/.test( data.iFilter ) ? cachedValue <= query : cachedValue < query;
				}
				// keep showing all rows if nothing follows the operator
				if ( !result && savedSearch === '' ) {
					result = true;
				}
				return result;
			}
			return null;
		},
		// Look for a not match
		notMatch: function( c, data ) {
			if ( /^\!/.test( data.iFilter ) ) {
				var indx,
					txt = data.iFilter.replace( '!', '' ),
					filter = ts.filter.parseFilter( c, txt, data.index, data.parsed[data.index] ) || '';
				if ( ts.filter.regex.exact.test( filter ) ) {
					// look for exact not matches - see #628
					filter = filter.replace( ts.filter.regex.exact, '' );
					return filter === '' ? true : $.trim( filter ) !== data.iExact;
				} else {
					indx = data.iExact.search( $.trim( filter ) );
					return filter === '' ? true : !( c.widgetOptions.filter_startsWith ? indx === 0 : indx >= 0 );
				}
			}
			return null;
		},
		// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
		exact: function( c, data ) {
			/*jshint eqeqeq:false */
			if ( ts.filter.regex.exact.test( data.iFilter ) ) {
				var txt = data.iFilter.replace( ts.filter.regex.exact, '' ),
					filter = ts.filter.parseFilter( c, txt, data.index, data.parsed[data.index] ) || '';
				return data.anyMatch ? $.inArray( filter, data.rowArray ) >= 0 : filter == data.iExact;
			}
			return null;
		},
		// Look for an AND or && operator ( logical and )
		and : function( c, data ) {
			if ( ts.filter.regex.andTest.test( data.filter ) ) {
				var index = data.index,
					parsed = data.parsed[index],
					query = data.iFilter.split( ts.filter.regex.andSplit ),
					result = data.iExact.search( $.trim( ts.filter.parseFilter( c, query[0], index, parsed ) ) ) >= 0,
					indx = query.length - 1;
				while ( result && indx ) {
					result = result &&
						data.iExact.search( $.trim( ts.filter.parseFilter( c, query[indx], index, parsed ) ) ) >= 0;
					indx--;
				}
				return result;
			}
			return null;
		},
		// Look for a range ( using ' to ' or ' - ' ) - see issue #166; thanks matzhu!
		range : function( c, data ) {
			if ( ts.filter.regex.toTest.test( data.iFilter ) ) {
				var result, tmp, range1, range2,
					table = c.table,
					index = data.index,
					parsed = data.parsed[index],
					// make sure the dash is for a range and not indicating a negative number
					query = data.iFilter.split( ts.filter.regex.toSplit );

				tmp = query[0].replace( ts.filter.regex.nondigit, '' ) || '';
				range1 = ts.formatFloat( ts.filter.parseFilter( c, tmp, index, parsed ), table );
				tmp = query[1].replace( ts.filter.regex.nondigit, '' ) || '';
				range2 = ts.formatFloat( ts.filter.parseFilter( c, tmp, index, parsed ), table );
				// parse filter value in case we're comparing numbers ( dates )
				if ( parsed || c.parsers[index].type === 'numeric' ) {
					result = c.parsers[ index ].format( '' + query[0], table, c.$headers.eq( index ), index );
					range1 = ( result !== '' && !isNaN( result ) ) ? result : range1;
					result = c.parsers[ index ].format( '' + query[1], table, c.$headers.eq( index ), index );
					range2 = ( result !== '' && !isNaN( result ) ) ? result : range2;
				}
				if ( ( parsed || c.parsers[ index ].type === 'numeric' ) && !isNaN( range1 ) && !isNaN( range2 ) ) {
					result = data.cache;
				} else {
					tmp = isNaN( data.iExact ) ? data.iExact.replace( ts.filter.regex.nondigit, '' ) : data.iExact;
					result = ts.formatFloat( tmp, table );
				}
				if ( range1 > range2 ) {
					tmp = range1; range1 = range2; range2 = tmp; // swap
				}
				return ( result >= range1 && result <= range2 ) || ( range1 === '' || range2 === '' );
			}
			return null;
		},
		// Look for wild card: ? = single, * = multiple, or | = logical OR
		wild : function( c, data ) {
			if ( /[\?\*\|]/.test( data.iFilter ) || ts.filter.regex.orReplace.test( data.filter ) ) {
				var index = data.index,
					parsed = data.parsed[ index ],
					txt = data.iFilter.replace( ts.filter.regex.orReplace, '|' ),
					query = '' + ( ts.filter.parseFilter( c, txt, index, parsed ) || '' );
				// look for an exact match with the 'or' unless the 'filter-match' class is found
				if ( !c.$headerIndexed[ index ].hasClass( 'filter-match' ) && /\|/.test( query ) ) {
					// show all results while using filter match. Fixes #727
					if ( query[ query.length - 1 ] === '|' ) {
						query += '*';
					}
					query = data.anyMatch && $.isArray( data.rowArray ) ?
						'(' + query + ')' :
						'^(' + query + ')$';
				}
				// parsing the filter may not work properly when using wildcards =/
				return new RegExp( query.replace( /\?/g, '\\S{1}' ).replace( /\*/g, '\\S*' ) )
					.test( data.iExact );
			}
			return null;
		},
		// fuzzy text search; modified from https://github.com/mattyork/fuzzy ( MIT license )
		fuzzy: function( c, data ) {
			if ( /^~/.test( data.iFilter ) ) {
				var indx,
					patternIndx = 0,
					len = data.iExact.length,
					txt = data.iFilter.slice( 1 ),
					pattern = ts.filter.parseFilter( c, txt, data.index, data.parsed[data.index] ) || '';
				for ( indx = 0; indx < len; indx++ ) {
					if ( data.iExact[ indx ] === pattern[ patternIndx ] ) {
						patternIndx += 1;
					}
				}
				if ( patternIndx === pattern.length ) {
					return true;
				}
				return false;
			}
			return null;
		}
	},
	init: function( table, c, wo ) {
		// filter language options
		ts.language = $.extend( true, {}, {
			to  : 'to',
			or  : 'or',
			and : 'and'
		}, ts.language );

		var options, string, txt, $header, column, filters, val, fxn, noSelect,
			regex = ts.filter.regex;
		c.$table.addClass( 'hasFilters' );

		// define timers so using clearTimeout won't cause an undefined error
		wo.searchTimer = null;
		wo.filter_initTimer = null;
		wo.filter_formatterCount = 0;
		wo.filter_formatterInit = [];
		wo.filter_anyColumnSelector = '[data-column="all"],[data-column="any"]';
		wo.filter_multipleColumnSelector = '[data-column*="-"],[data-column*=","]';

		val = '\\{' + ts.filter.regex.query + '\\}';
		$.extend( regex, {
			child : new RegExp( c.cssChildRow ),
			filtered : new RegExp( wo.filter_filteredRow ),
			alreadyFiltered : new RegExp( '(\\s+(' + ts.language.or + '|-|' + ts.language.to + ')\\s+)', 'i' ),
			toTest : new RegExp( '\\s+(-|' + ts.language.to + ')\\s+', 'i' ),
			toSplit : new RegExp( '(?:\\s+(?:-|' + ts.language.to + ')\\s+)' ,'gi' ),
			andTest : new RegExp( '\\s+(' + ts.language.and + '|&&)\\s+', 'i' ),
			andSplit : new RegExp( '(?:\\s+(?:' + ts.language.and + '|&&)\\s+)', 'gi' ),
			orReplace : new RegExp( '\\s+(' + ts.language.or + ')\\s+', 'gi' ),
			iQuery : new RegExp( val, 'i' ),
			igQuery : new RegExp( val, 'ig' )
		});

		// don't build filter row if columnFilters is false or all columns are set to 'filter-false'
		// see issue #156
		val = c.$headers.filter( '.filter-false, .parser-false' ).length;
		if ( wo.filter_columnFilters !== false && val !== c.$headers.length ) {
			// build filter row
			ts.filter.buildRow( table, c, wo );
		}

		txt = 'addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '
			.split( ' ' ).join( c.namespace + 'filter ' );
		c.$table.bind( txt, function( event, filter ) {
			val = wo.filter_hideEmpty &&
				$.isEmptyObject( c.cache ) &&
				!( c.delayInit && event.type === 'appendCache' );
			// hide filter row using the 'filtered' class name
			c.$table.find( '.' + tscss.filterRow ).toggleClass( wo.filter_filteredRow, val ); // fixes #450
			if ( !/(search|filter)/.test( event.type ) ) {
				event.stopPropagation();
				ts.filter.buildDefault( table, true );
			}
			if ( event.type === 'filterReset' ) {
				c.$table.find( '.' + tscss.filter ).add( wo.filter_$externalFilters ).val( '' );
				ts.filter.searching( table, [] );
			} else if ( event.type === 'filterEnd' ) {
				ts.filter.buildDefault( table, true );
			} else {
				// send false argument to force a new search; otherwise if the filter hasn't changed,
				// it will return
				filter = event.type === 'search' ? filter :
					event.type === 'updateComplete' ? c.$table.data( 'lastSearch' ) : '';
				if ( /(update|add)/.test( event.type ) && event.type !== 'updateComplete' ) {
					// force a new search since content has changed
					c.lastCombinedFilter = null;
					c.lastSearch = [];
				}
				// pass true ( skipFirst ) to prevent the tablesorter.setFilters function from skipping the first
				// input ensures all inputs are updated when a search is triggered on the table
				// $( 'table' ).trigger( 'search', [...] );
				ts.filter.searching( table, filter, true );
			}
			return false;
		});

		// reset button/link
		if ( wo.filter_reset ) {
			if ( wo.filter_reset instanceof $ ) {
				// reset contains a jQuery object, bind to it
				wo.filter_reset.click( function() {
					c.$table.trigger( 'filterReset' );
				});
			} else if ( $( wo.filter_reset ).length ) {
				// reset is a jQuery selector, use event delegation
				$( document )
					.undelegate( wo.filter_reset, 'click.tsfilter' )
					.delegate( wo.filter_reset, 'click.tsfilter', function() {
						// trigger a reset event, so other functions ( filter_formatter ) know when to reset
						c.$table.trigger( 'filterReset' );
					});
			}
		}
		if ( wo.filter_functions ) {
			for ( column = 0; column < c.columns; column++ ) {
				fxn = ts.getColumnData( table, wo.filter_functions, column );
				if ( fxn ) {
					// remove 'filter-select' from header otherwise the options added here are replaced with
					// all options
					$header = c.$headerIndexed[ column ].removeClass( 'filter-select' );
					// don't build select if 'filter-false' or 'parser-false' set
					noSelect = !( $header.hasClass( 'filter-false' ) || $header.hasClass( 'parser-false' ) );
					options = '';
					if ( fxn === true && noSelect ) {
						ts.filter.buildSelect( table, column );
					} else if ( typeof fxn === 'object' && noSelect ) {
						// add custom drop down list
						for ( string in fxn ) {
							if ( typeof string === 'string' ) {
								options += options === '' ?
									'<option value="">' +
										( $header.data( 'placeholder' ) ||
											$header.attr( 'data-placeholder' ) ||
											wo.filter_placeholder.select ||
											''
										) +
									'</option>' : '';
								val = string;
								txt = string;
								if ( string.indexOf( wo.filter_selectSourceSeparator ) >= 0 ) {
									val = string.split( wo.filter_selectSourceSeparator );
									txt = val[1];
									val = val[0];
								}
								options += '<option ' +
									( txt === val ? '' : 'data-function-name="' + string + '" ' ) +
									'value="' + val + '">' + txt + '</option>';
							}
						}
						c.$table
							.find( 'thead' )
							.find( 'select.' + tscss.filter + '[data-column="' + column + '"]' )
							.append( options );
						txt = wo.filter_selectSource;
						fxn = $.isFunction( txt ) ? true : ts.getColumnData( table, txt, column );
						if ( fxn ) {
							// updating so the extra options are appended
							ts.filter.buildSelect( c.table, column, '', true, $header.hasClass( wo.filter_onlyAvail ) );
						}
					}
				}
			}
		}
		// not really updating, but if the column has both the 'filter-select' class &
		// filter_functions set to true, it would append the same options twice.
		ts.filter.buildDefault( table, true );

		ts.filter.bindSearch( table, c.$table.find( '.' + tscss.filter ), true );
		if ( wo.filter_external ) {
			ts.filter.bindSearch( table, wo.filter_external );
		}

		if ( wo.filter_hideFilters ) {
			ts.filter.hideFilters( table, c );
		}

		// show processing icon
		if ( c.showProcessing ) {
			txt = 'filterStart filterEnd '.split( ' ' ).join( c.namespace + 'filter ' );
			c.$table
				.unbind( txt.replace( /\s+/g, ' ' ) )
				.bind( txt, function( event, columns ) {
				// only add processing to certain columns to all columns
				$header = ( columns ) ?
					c.$table
						.find( '.' + tscss.header )
						.filter( '[data-column]' )
						.filter( function() {
							return columns[ $( this ).data( 'column' ) ] !== '';
						}) : '';
				ts.isProcessing( table, event.type === 'filterStart', columns ? $header : '' );
			});
		}

		// set filtered rows count ( intially unfiltered )
		c.filteredRows = c.totalRows;

		// add default values
		txt = 'tablesorter-initialized pagerBeforeInitialized '.split( ' ' ).join( c.namespace + 'filter ' );
		c.$table
		.unbind( txt.replace( /\s+/g, ' ' ) )
		.bind( txt, function() {
			// redefine 'wo' as it does not update properly inside this callback
			var wo = this.config.widgetOptions;
			filters = ts.filter.setDefaults( table, c, wo ) || [];
			if ( filters.length ) {
				// prevent delayInit from triggering a cache build if filters are empty
				if ( !( c.delayInit && filters.join( '' ) === '' ) ) {
					ts.setFilters( table, filters, true );
				}
			}
			c.$table.trigger( 'filterFomatterUpdate' );
			// trigger init after setTimeout to prevent multiple filterStart/End/Init triggers
			setTimeout( function() {
				if ( !wo.filter_initialized ) {
					ts.filter.filterInitComplete( c );
				}
			}, 100 );
		});
		// if filter widget is added after pager has initialized; then set filter init flag
		if ( c.pager && c.pager.initialized && !wo.filter_initialized ) {
			c.$table.trigger( 'filterFomatterUpdate' );
			setTimeout( function() {
				ts.filter.filterInitComplete( c );
			}, 100 );
		}
	},
	// $cell parameter, but not the config, is passed to the filter_formatters,
	// so we have to work with it instead
	formatterUpdated: function( $cell, column ) {
		var wo = $cell.closest( 'table' )[0].config.widgetOptions;
		if ( !wo.filter_initialized ) {
			// add updates by column since this function
			// may be called numerous times before initialization
			wo.filter_formatterInit[ column ] = 1;
		}
	},
	filterInitComplete: function( c ) {
		var indx, len,
			wo = c.widgetOptions,
			count = 0,
			completed = function() {
				wo.filter_initialized = true;
				c.$table.trigger( 'filterInit', c );
				ts.filter.findRows( c.table, c.$table.data( 'lastSearch' ) || [] );
			};
		if ( $.isEmptyObject( wo.filter_formatter ) ) {
			completed();
		} else {
			len = wo.filter_formatterInit.length;
			for ( indx = 0; indx < len; indx++ ) {
				if ( wo.filter_formatterInit[ indx ] === 1 ) {
					count++;
				}
			}
			clearTimeout( wo.filter_initTimer );
			if ( !wo.filter_initialized && count === wo.filter_formatterCount ) {
				// filter widget initialized
				completed();
			} else if ( !wo.filter_initialized ) {
				// fall back in case a filter_formatter doesn't call
				// $.tablesorter.filter.formatterUpdated( $cell, column ), and the count is off
				wo.filter_initTimer = setTimeout( function() {
					completed();
				}, 500 );
			}
		}
	},

	setDefaults: function( table, c, wo ) {
		var isArray, saved, indx, col, $filters,
			// get current ( default ) filters
			filters = ts.getFilters( table ) || [];
		if ( wo.filter_saveFilters && ts.storage ) {
			saved = ts.storage( table, 'tablesorter-filters' ) || [];
			isArray = $.isArray( saved );
			// make sure we're not just getting an empty array
			if ( !( isArray && saved.join( '' ) === '' || !isArray ) ) {
				filters = saved;
			}
		}
		// if no filters saved, then check default settings
		if ( filters.join( '' ) === '' ) {
			// allow adding default setting to external filters
			$filters = c.$headers.add( wo.filter_$externalFilters )
				.filter( '[' + wo.filter_defaultAttrib + ']' );
			for ( indx = 0; indx <= c.columns; indx++ ) {
				// include data-column='all' external filters
				col = indx === c.columns ? 'all' : indx;
				filters[indx] = $filters
					.filter( '[data-column="' + col + '"]' )
					.attr( wo.filter_defaultAttrib ) || filters[indx] || '';
			}
		}
		c.$table.data( 'lastSearch', filters );
		return filters;
	},
	parseFilter: function( c, filter, column, parsed ) {
		return parsed ? c.parsers[column].format( filter, c.table, [], column ) : filter;
	},
	buildRow: function( table, c, wo ) {
		var col, column, $header, buildSelect, disabled, name, ffxn, tmp,
			// c.columns defined in computeThIndexes()
			cellFilter = wo.filter_cellFilter,
			columns = c.columns,
			arry = $.isArray( cellFilter ),
			buildFilter = '<tr role="row" class="' + tscss.filterRow + ' ' + c.cssIgnoreRow + '">';
		for ( column = 0; column < columns; column++ ) {
			buildFilter += '<td';
			if ( arry ) {
				buildFilter += ( cellFilter[ column ] ? ' class="' + cellFilter[ column ] + '"' : '' );
			} else {
				buildFilter += ( cellFilter !== '' ? ' class="' + cellFilter + '"' : '' );
			}
			buildFilter += '></td>';
		}
		c.$filters = $( buildFilter += '</tr>' )
			.appendTo( c.$table.children( 'thead' ).eq( 0 ) )
			.find( 'td' );
		// build each filter input
		for ( column = 0; column < columns; column++ ) {
			disabled = false;
			// assuming last cell of a column is the main column
			$header = c.$headerIndexed[ column ];
			ffxn = ts.getColumnData( table, wo.filter_functions, column );
			buildSelect = ( wo.filter_functions && ffxn && typeof ffxn !== 'function' ) ||
				$header.hasClass( 'filter-select' );
			// get data from jQuery data, metadata, headers option or header class name
			col = ts.getColumnData( table, c.headers, column );
			disabled = ts.getData( $header[0], col, 'filter' ) === 'false' ||
				ts.getData( $header[0], col, 'parser' ) === 'false';

			if ( buildSelect ) {
				buildFilter = $( '<select>' ).appendTo( c.$filters.eq( column ) );
			} else {
				ffxn = ts.getColumnData( table, wo.filter_formatter, column );
				if ( ffxn ) {
					wo.filter_formatterCount++;
					buildFilter = ffxn( c.$filters.eq( column ), column );
					// no element returned, so lets go find it
					if ( buildFilter && buildFilter.length === 0 ) {
						buildFilter = c.$filters.eq( column ).children( 'input' );
					}
					// element not in DOM, so lets attach it
					if ( buildFilter && ( buildFilter.parent().length === 0 ||
						( buildFilter.parent().length && buildFilter.parent()[0] !== c.$filters[column] ) ) ) {
						c.$filters.eq( column ).append( buildFilter );
					}
				} else {
					buildFilter = $( '<input type="search">' ).appendTo( c.$filters.eq( column ) );
				}
				if ( buildFilter ) {
					tmp = $header.data( 'placeholder' ) ||
						$header.attr( 'data-placeholder' ) ||
						wo.filter_placeholder.search || '';
					buildFilter.attr( 'placeholder', tmp );
				}
			}
			if ( buildFilter ) {
				// add filter class name
				name = ( $.isArray( wo.filter_cssFilter ) ?
					( typeof wo.filter_cssFilter[column] !== 'undefined' ? wo.filter_cssFilter[column] || '' : '' ) :
					wo.filter_cssFilter ) || '';
				buildFilter.addClass( tscss.filter + ' ' + name ).attr( 'data-column', column );
				if ( disabled ) {
					buildFilter.attr( 'placeholder', '' ).addClass( tscss.filterDisabled )[0].disabled = true;
				}
			}
		}
	},
	bindSearch: function( table, $el, internal ) {
		table = $( table )[0];
		$el = $( $el ); // allow passing a selector string
		if ( !$el.length ) { return; }
		var tmp,
			c = table.config,
			wo = c.widgetOptions,
			namespace = c.namespace + 'filter',
			$ext = wo.filter_$externalFilters;
		if ( internal !== true ) {
			// save anyMatch element
			tmp = wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector;
			wo.filter_$anyMatch = $el.filter( tmp );
			if ( $ext && $ext.length ) {
				wo.filter_$externalFilters = wo.filter_$externalFilters.add( $el );
			} else {
				wo.filter_$externalFilters = $el;
			}
			// update values ( external filters added after table initialization )
			ts.setFilters( table, c.$table.data( 'lastSearch' ) || [], internal === false );
		}
		// unbind events
		tmp = ( 'keypress keyup search change '.split( ' ' ).join( namespace + ' ' ) );
		$el
		// use data attribute instead of jQuery data since the head is cloned without including
		// the data/binding
		.attr( 'data-lastSearchTime', new Date().getTime() )
		.unbind( tmp.replace( /\s+/g, ' ' ) )
		// include change for select - fixes #473
		.bind( 'keyup' + namespace, function( event ) {
			$( this ).attr( 'data-lastSearchTime', new Date().getTime() );
			// emulate what webkit does.... escape clears the filter
			if ( event.which === 27 ) {
				this.value = '';
			// live search
			} else if ( wo.filter_liveSearch === false ) {
				return;
				// don't return if the search value is empty ( all rows need to be revealed )
			} else if ( this.value !== '' && (
				// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
				( typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch ) ||
				// let return & backspace continue on, but ignore arrows & non-valid characters
				( event.which !== 13 && event.which !== 8 &&
					( event.which < 32 || ( event.which >= 37 && event.which <= 40 ) ) ) ) ) {
				return;
			}
			// change event = no delay; last true flag tells getFilters to skip newest timed input
			ts.filter.searching( table, true, true );
		})
		.bind( 'search change keypress '.split( ' ' ).join( namespace + ' ' ), function( event ) {
			var column = $( this ).data( 'column' );
			// don't allow 'change' event to process if the input value is the same - fixes #685
			if ( event.which === 13 || event.type === 'search' ||
				event.type === 'change' && this.value !== c.lastSearch[column] ) {
				event.preventDefault();
				// init search with no delay
				$( this ).attr( 'data-lastSearchTime', new Date().getTime() );
				ts.filter.searching( table, false, true );
			}
		});
	},
	searching: function( table, filter, skipFirst ) {
		var wo = table.config.widgetOptions;
		clearTimeout( wo.searchTimer );
		if ( typeof filter === 'undefined' || filter === true ) {
			// delay filtering
			wo.searchTimer = setTimeout( function() {
				ts.filter.checkFilters( table, filter, skipFirst );
			}, wo.filter_liveSearch ? wo.filter_searchDelay : 10 );
		} else {
			// skip delay
			ts.filter.checkFilters( table, filter, skipFirst );
		}
	},
	checkFilters: function( table, filter, skipFirst ) {
		var c = table.config,
			wo = c.widgetOptions,
			filterArray = $.isArray( filter ),
			filters = ( filterArray ) ? filter : ts.getFilters( table, true ),
			combinedFilters = ( filters || [] ).join( '' ); // combined filter values
		// prevent errors if delay init is set
		if ( $.isEmptyObject( c.cache ) ) {
			// update cache if delayInit set & pager has initialized ( after user initiates a search )
			if ( c.delayInit && c.pager && c.pager.initialized ) {
				c.$table.trigger( 'updateCache', [ function() {
					ts.filter.checkFilters( table, false, skipFirst );
				} ] );
			}
			return;
		}
		// add filter array back into inputs
		if ( filterArray ) {
			ts.setFilters( table, filters, false, skipFirst !== true );
			if ( !wo.filter_initialized ) { c.lastCombinedFilter = ''; }
		}
		if ( wo.filter_hideFilters ) {
			// show/hide filter row as needed
			c.$table
				.find( '.' + tscss.filterRow )
				.trigger( combinedFilters === '' ? 'mouseleave' : 'mouseenter' );
		}
		// return if the last search is the same; but filter === false when updating the search
		// see example-widget-filter.html filter toggle buttons
		if ( c.lastCombinedFilter === combinedFilters && filter !== false ) {
			return;
		} else if ( filter === false ) {
			// force filter refresh
			c.lastCombinedFilter = null;
			c.lastSearch = [];
		}
		if ( wo.filter_initialized ) {
			c.$table.trigger( 'filterStart', [filters] );
		}
		if ( c.showProcessing ) {
			// give it time for the processing icon to kick in
			setTimeout( function() {
				ts.filter.findRows( table, filters, combinedFilters );
				return false;
			}, 30 );
		} else {
			ts.filter.findRows( table, filters, combinedFilters );
			return false;
		}
	},
	hideFilters: function( table, c ) {
		var $filterRow, $filterRow2, timer;
		$( table )
			.find( '.' + tscss.filterRow )
			.addClass( tscss.filterRowHide )
			.bind( 'mouseenter mouseleave', function( e ) {
				// save event object - http://bugs.jquery.com/ticket/12140
				var event = e;
				$filterRow = $( this );
				clearTimeout( timer );
				timer = setTimeout( function() {
					if ( /enter|over/.test( event.type ) ) {
						$filterRow.removeClass( tscss.filterRowHide );
					} else {
						// don't hide if input has focus
						// $( ':focus' ) needs jQuery 1.6+
						if ( $( document.activeElement ).closest( 'tr' )[0] !== $filterRow[0] ) {
							// don't hide row if any filter has a value
							if ( c.lastCombinedFilter === '' ) {
								$filterRow.addClass( tscss.filterRowHide );
							}
						}
					}
				}, 200 );
			})
			.find( 'input, select' ).bind( 'focus blur', function( e ) {
				$filterRow2 = $( this ).closest( 'tr' );
				clearTimeout( timer );
				var event = e;
				timer = setTimeout( function() {
					// don't hide row if any filter has a value
					if ( ts.getFilters( c.$table ).join( '' ) === '' ) {
						$filterRow2.toggleClass( tscss.filterRowHide, event.type === 'focus' );
					}
				}, 200 );
			});
	},
	defaultFilter: function( filter, mask ) {
		if ( filter === '' ) { return filter; }
		var regex = ts.filter.regex.iQuery,
			maskLen = mask.match( ts.filter.regex.igQuery ).length,
			query = maskLen > 1 ? $.trim( filter ).split( /\s/ ) : [ $.trim( filter ) ],
			len = query.length - 1,
			indx = 0,
			val = mask;
		if ( len < 1 && maskLen > 1 ) {
			// only one 'word' in query but mask has >1 slots
			query[1] = query[0];
		}
		// replace all {query} with query words...
		// if query = 'Bob', then convert mask from '!{query}' to '!Bob'
		// if query = 'Bob Joe Frank', then convert mask '{q} OR {q}' to 'Bob OR Joe OR Frank'
		while ( regex.test( val ) ) {
			val = val.replace( regex, query[indx++] || '' );
			if ( regex.test( val ) && indx < len && ( query[indx] || '' ) !== '' ) {
				val = mask.replace( regex, val );
			}
		}
		return val;
	},
	getLatestSearch: function( $input ) {
		if ( $input ) {
			return $input.sort( function( a, b ) {
				return $( b ).attr( 'data-lastSearchTime' ) - $( a ).attr( 'data-lastSearchTime' );
			});
		}
		return $();
	},
	multipleColumns: function( c, $input ) {
		// look for multiple columns '1-3,4-6,8' in data-column
		var temp, ranges, range, start, end, singles, i, indx, len,
			wo = c.widgetOptions,
			// only target 'all' column inputs on initialization
			// & don't target 'all' column inputs if they don't exist
			targets = wo.filter_initialized || !$input.filter( wo.filter_anyColumnSelector ).length,
			columns = [],
			val = $.trim( ts.filter.getLatestSearch( $input ).attr( 'data-column' ) || '' );
		// process column range
		if ( targets && /-/.test( val ) ) {
			ranges = val.match( /(\d+)\s*-\s*(\d+)/g );
			len = ranges.length;
			for ( indx = 0; indx < len; indx++ ) {
				range = ranges[indx].split( /\s*-\s*/ );
				start = parseInt( range[0], 10 ) || 0;
				end = parseInt( range[1], 10 ) || ( c.columns - 1 );
				if ( start > end ) {
					temp = start; start = end; end = temp; // swap
				}
				if ( end >= c.columns ) {
					end = c.columns - 1;
				}
				for ( ; start <= end; start++ ) {
					columns.push( start );
				}
				// remove processed range from val
				val = val.replace( ranges[ indx ], '' );
			}
		}
		// process single columns
		if ( targets && /,/.test( val ) ) {
			singles = val.split( /\s*,\s*/ );
			len = singles.length;
			for ( i = 0; i < len; i++ ) {
				if ( singles[ i ] !== '' ) {
					indx = parseInt( singles[ i ], 10 );
					if ( indx < c.columns ) {
						columns.push( indx );
					}
				}
			}
		}
		// return all columns
		if ( !columns.length ) {
			for ( indx = 0; indx < c.columns; indx++ ) {
				columns.push( indx );
			}
		}
		return columns;
	},
	processRow: function( c, data, vars ) {
		var $cell, columnIndex, hasSelect, matches, result, val, filterMatched, excludeMatch,
			fxn, ffxn, txt,
			regex = ts.filter.regex,
			wo = c.widgetOptions,
			showRow = true;
		data.$cells = data.$row.children();

		if ( data.anyMatchFlag ) {
			// look for multiple columns '1-3,4-6,8'
			columnIndex = ts.filter.multipleColumns( c, wo.filter_$anyMatch );
			data.anyMatch = true;
			data.rowArray = data.$cells.map( function( i ) {
				if ( $.inArray( i, columnIndex ) > -1 ) {
					if ( data.parsed[ i ] ) {
						txt = data.cacheArray[ i ];
					} else {
						txt = data.rawArray[ i ];
						txt = $.trim( wo.filter_ignoreCase ? txt.toLowerCase() : txt );
						if ( c.sortLocaleCompare ) {
							txt = ts.replaceAccents( txt );
						}
					}
					return txt;
				}
			}).get();
			data.filter = data.anyMatchFilter;
			data.iFilter = data.iAnyMatchFilter;
			data.exact = data.rowArray.join( ' ' );
			data.iExact = wo.filter_ignoreCase ? data.exact.toLowerCase() : data.exact;
			data.cache = data.cacheArray.slice( 0, -1 ).join( ' ' );
			filterMatched = null;
			matches = null;
			for ( ffxn in ts.filter.types ) {
				if ( $.inArray( ffxn, vars.noAnyMatch ) < 0 && matches === null ) {
					matches = ts.filter.types[ffxn]( c, data );
					if ( matches !== null ) {
						filterMatched = matches;
					}
				}
			}
			if ( filterMatched !== null ) {
				showRow = filterMatched;
			} else {
				if ( wo.filter_startsWith ) {
					showRow = false;
					columnIndex = c.columns;
					while ( !showRow && columnIndex > 0 ) {
						columnIndex--;
						showRow = showRow || data.rowArray[ columnIndex ].indexOf( data.iFilter ) === 0;
					}
				} else {
					showRow = ( data.iExact + data.childRowText ).indexOf( data.iFilter ) >= 0;
				}
			}
			data.anyMatch = false;
			// no other filters to process
			if ( data.filters.join( '' ) === data.filter ) {
				return showRow;
			}
		}

		for ( columnIndex = 0; columnIndex < c.columns; columnIndex++ ) {
			data.filter = data.filters[ columnIndex ];
			data.index = columnIndex;

			// filter types to exclude, per column
			excludeMatch = vars.excludeFilter[ columnIndex ];

			// ignore if filter is empty or disabled
			if ( data.filter ) {
				data.cache = data.cacheArray[ columnIndex ];
				// check if column data should be from the cell or from parsed data
				if ( wo.filter_useParsedData || data.parsed[ columnIndex ] ) {
					data.exact = data.cache;
				} else {
					result = data.rawArray[ columnIndex ] || '';
					data.exact = c.sortLocaleCompare ? ts.replaceAccents( result ) : result; // issue #405
				}
				data.iExact = !regex.type.test( typeof data.exact ) && wo.filter_ignoreCase ?
					data.exact.toLowerCase() : data.exact;
				result = showRow; // if showRow is true, show that row

				// in case select filter option has a different value vs text 'a - z|A through Z'
				ffxn = wo.filter_columnFilters ?
					c.$filters.add( c.$externalFilters )
						.filter( '[data-column="'+ columnIndex + '"]' )
						.find( 'select option:selected' )
						.attr( 'data-function-name' ) || '' : '';
				// replace accents - see #357
				if ( c.sortLocaleCompare ) {
					data.filter = ts.replaceAccents( data.filter );
				}

				val = true;
				if ( wo.filter_defaultFilter && regex.iQuery.test( vars.defaultColFilter[ columnIndex ] ) ) {
					data.filter = ts.filter.defaultFilter( data.filter, vars.defaultColFilter[ columnIndex ] );
					// val is used to indicate that a filter select is using a default filter;
					// so we override the exact & partial matches
					val = false;
				}
				// data.iFilter = case insensitive ( if wo.filter_ignoreCase is true ),
				// data.filter = case sensitive
				data.iFilter = wo.filter_ignoreCase ? ( data.filter || '' ).toLowerCase() : data.filter;
				fxn = vars.functions[ columnIndex ];
				$cell = c.$headerIndexed[ columnIndex ];
				hasSelect = $cell.hasClass( 'filter-select' );
				filterMatched = null;
				if ( fxn || ( hasSelect && val ) ) {
					if ( fxn === true || hasSelect ) {
						// default selector uses exact match unless 'filter-match' class is found
						filterMatched = $cell.hasClass( 'filter-match' ) ?
							data.iExact.search( data.iFilter ) >= 0 :
							data.filter === data.exact;
					} else if ( typeof fxn === 'function' ) {
						// filter callback( exact cell content, parser normalized content,
						// filter input value, column index, jQuery row object )
						filterMatched = fxn( data.exact, data.cache, data.filter, columnIndex, data.$row, c, data );
					} else if ( typeof fxn[ ffxn || data.filter ] === 'function' ) {
						// selector option function
						txt = ffxn || data.filter;
						filterMatched =
							fxn[ txt ]( data.exact, data.cache, data.filter, columnIndex, data.$row, c, data );
					}
				}
				if ( filterMatched === null ) {
					// cycle through the different filters
					// filters return a boolean or null if nothing matches
					matches = null;
					for ( ffxn in ts.filter.types ) {
						if ( $.inArray( ffxn, excludeMatch ) < 0 && matches === null ) {
							matches = ts.filter.types[ ffxn ]( c, data );
							if ( matches !== null ) {
								filterMatched = matches;
							}
						}
					}
					if ( filterMatched !== null ) {
						result = filterMatched;
					// Look for match, and add child row data for matching
					} else {
						txt = ( data.iExact + data.childRowText )
							.indexOf( ts.filter.parseFilter( c, data.iFilter, columnIndex, data.parsed[ columnIndex ] ) );
						result = ( ( !wo.filter_startsWith && txt >= 0 ) || ( wo.filter_startsWith && txt === 0 ) );
					}
				} else {
					result = filterMatched;
				}
				showRow = ( result ) ? showRow : false;
			}
		}
		return showRow;
	},
	findRows: function( table, filters, combinedFilters ) {
		if ( table.config.lastCombinedFilter === combinedFilters ||
			!table.config.widgetOptions.filter_initialized ) {
			return;
		}
		var len, norm_rows, rowData, $rows, rowIndex, tbodyIndex, $tbody, columnIndex,
			isChild, childRow, lastSearch, showRow, time, val, indx,
			notFiltered, searchFiltered, query, injected, res, id, txt,
			storedFilters = $.extend( [], filters ),
			regex = ts.filter.regex,
			c = table.config,
			wo = c.widgetOptions,
			// data object passed to filters; anyMatch is a flag for the filters
			data = {
				anyMatch: false,
				filters: filters,
				// regex filter type cache
				filter_regexCache : [],
			},
			vars = {
				// anyMatch really screws up with these types of filters
				noAnyMatch: [ 'range', 'notMatch',  'operators' ],
				// cache filter variables that use ts.getColumnData in the main loop
				functions : [],
				excludeFilter : [],
				defaultColFilter : [],
				defaultAnyFilter : ts.getColumnData( table, wo.filter_defaultFilter, c.columns, true ) || ''
			};

		// parse columns after formatter, in case the class is added at that point
		data.parsed = c.$headers.map( function( columnIndex ) {
			return c.parsers && c.parsers[ columnIndex ] &&
				// force parsing if parser type is numeric
				c.parsers[ columnIndex ].parsed ||
				// getData won't return 'parsed' if other 'filter-' class names exist
				// ( e.g. <th class="filter-select filter-parsed"> )
				ts.getData && ts.getData( c.$headerIndexed[ columnIndex ],
					ts.getColumnData( table, c.headers, columnIndex ), 'filter' ) === 'parsed' ||
				$( this ).hasClass( 'filter-parsed' );
		}).get();

		for ( columnIndex = 0; columnIndex < c.columns; columnIndex++ ) {
			vars.functions[ columnIndex ] =
				ts.getColumnData( table, wo.filter_functions, columnIndex );
			vars.defaultColFilter[ columnIndex ] =
				ts.getColumnData( table, wo.filter_defaultFilter, columnIndex ) || '';
			vars.excludeFilter[ columnIndex ] =
				( ts.getColumnData( table, wo.filter_excludeFilter, columnIndex, true ) || '' ).split( /\s+/ );
		}

		if ( c.debug ) {
			ts.log( 'Filter: Starting filter widget search', filters );
			time = new Date();
		}
		// filtered rows count
		c.filteredRows = 0;
		c.totalRows = 0;
		// combindedFilters are undefined on init
		combinedFilters = ( storedFilters || [] ).join( '' );

		for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody( table, c.$tbodies.eq( tbodyIndex ), true );
			// skip child rows & widget added ( removable ) rows - fixes #448 thanks to @hempel!
			// $rows = $tbody.children( 'tr' ).not( c.selectorRemove );
			columnIndex = c.columns;
			// convert stored rows into a jQuery object
			norm_rows = c.cache[ tbodyIndex ].normalized;
			$rows = $( $.map( norm_rows, function( el ) {
				return el[ columnIndex ].$row.get();
			}) );

			if ( combinedFilters === '' || wo.filter_serversideFiltering ) {
				$rows
					.removeClass( wo.filter_filteredRow )
					.not( '.' + c.cssChildRow )
					.css( 'display', '' );
			} else {
				// filter out child rows
				$rows = $rows.not( '.' + c.cssChildRow );
				len = $rows.length;

				if ( ( wo.filter_$anyMatch && wo.filter_$anyMatch.length ) ||
					typeof filters[c.columns] !== 'undefined' ) {
					data.anyMatchFlag = true;
					data.anyMatchFilter = '' + (
						filters[ c.columns ] ||
						wo.filter_$anyMatch && ts.filter.getLatestSearch( wo.filter_$anyMatch ).val() ||
						''
					);
					if ( wo.filter_columnAnyMatch ) {
						// specific columns search
						query = data.anyMatchFilter.split( regex.andSplit );
						injected = false;
						for ( indx = 0; indx < query.length; indx++ ) {
							res = query[ indx ].split( ':' );
							if ( res.length > 1 ) {
								// make the column a one-based index ( non-developers start counting from one :P )
								id = parseInt( res[0], 10 ) - 1;
								if ( id >= 0 && id < c.columns ) { // if id is an integer
									filters[ id ] = res[1];
									query.splice( indx, 1 );
									indx--;
									injected = true;
								}
							}
						}
						if ( injected ) {
							data.anyMatchFilter = query.join( ' && ' );
						}
					}
				}

				// optimize searching only through already filtered rows - see #313
				searchFiltered = wo.filter_searchFiltered;
				lastSearch = c.lastSearch || c.$table.data( 'lastSearch' ) || [];
				if ( searchFiltered ) {
					// cycle through all filters; include last ( columnIndex + 1 = match any column ). Fixes #669
					for ( indx = 0; indx < columnIndex + 1; indx++ ) {
						val = filters[indx] || '';
						// break out of loop if we've already determined not to search filtered rows
						if ( !searchFiltered ) { indx = columnIndex; }
						// search already filtered rows if...
						searchFiltered = searchFiltered && lastSearch.length &&
							// there are no changes from beginning of filter
							val.indexOf( lastSearch[indx] || '' ) === 0 &&
							// if there is NOT a logical 'or', or range ( 'to' or '-' ) in the string
							!regex.alreadyFiltered.test( val ) &&
							// if we are not doing exact matches, using '|' ( logical or ) or not '!'
							!/[=\"\|!]/.test( val ) &&
							// don't search only filtered if the value is negative
							// ( '> -10' => '> -100' will ignore hidden rows )
							!( /(>=?\s*-\d)/.test( val ) || /(<=?\s*\d)/.test( val ) ) &&
							// if filtering using a select without a 'filter-match' class ( exact match ) - fixes #593
							!( val !== '' && c.$filters && c.$filters.eq( indx ).find( 'select' ).length &&
								!c.$headerIndexed[indx].hasClass( 'filter-match' ) );
					}
				}
				notFiltered = $rows.not( '.' + wo.filter_filteredRow ).length;
				// can't search when all rows are hidden - this happens when looking for exact matches
				if ( searchFiltered && notFiltered === 0 ) { searchFiltered = false; }
				if ( c.debug ) {
					ts.log( 'Filter: Searching through ' +
						( searchFiltered && notFiltered < len ? notFiltered : 'all' ) + ' rows' );
				}
				if ( data.anyMatchFlag ) {
					if ( c.sortLocaleCompare ) {
						// replace accents
						data.anyMatchFilter = ts.replaceAccents( data.anyMatchFilter );
					}
					if ( wo.filter_defaultFilter && regex.iQuery.test( vars.defaultAnyFilter ) ) {
						data.anyMatchFilter = ts.filter.defaultFilter( data.anyMatchFilter, vars.defaultAnyFilter );
						// clear search filtered flag because default filters are not saved to the last search
						searchFiltered = false;
					}
					// make iAnyMatchFilter lowercase unless both filter widget & core ignoreCase options are true
					// when c.ignoreCase is true, the cache contains all lower case data
					data.iAnyMatchFilter = !( wo.filter_ignoreCase && c.ignoreCase ) ?
						data.anyMatchFilter :
						data.anyMatchFilter.toLowerCase();
				}

				// loop through the rows
				for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {

					txt = $rows[ rowIndex ].className;
					// the first row can never be a child row
					isChild = rowIndex && regex.child.test( txt );
					// skip child rows & already filtered rows
					if ( isChild || ( searchFiltered && regex.filtered.test( txt ) ) ) {
						continue;
					}

					data.$row = $rows.eq( rowIndex );
					data.cacheArray = norm_rows[ rowIndex ];
					rowData = data.cacheArray[ c.columns ];
					data.rawArray = rowData.raw;
					data.childRowText = '';

					if ( !wo.filter_childByColumn ) {
						txt = '';
						// child row cached text
						childRow = rowData.child;
						// so, if 'table.config.widgetOptions.filter_childRows' is true and there is
						// a match anywhere in the child row, then it will make the row visible
						// checked here so the option can be changed dynamically
						for ( indx = 0; indx < childRow.length; indx++ ) {
							txt += ' ' + childRow[indx].join( '' ) || '';
						}
						data.childRowText = wo.filter_childRows ?
							( wo.filter_ignoreCase ? txt.toLowerCase() : txt ) :
							'';
					}

					showRow = ts.filter.processRow( c, data, vars );
					childRow = rowData.$row.filter( ':gt( 0 )' );

					if ( wo.filter_childRows && childRow.length ) {
						if ( wo.filter_childByColumn ) {
							// cycle through each child row
							for ( indx = 0; indx < childRow.length; indx++ ) {
								data.$row = childRow.eq( indx );
								data.cacheArray = rowData.child[ indx ];
								data.rawArray = data.cacheArray;
								// use OR comparison on child rows
								showRow = showRow || ts.filter.processRow( c, data, vars );
							}
						}
						childRow.toggleClass( wo.filter_filteredRow, !showRow );
					}

					rowData.$row
						.toggleClass( wo.filter_filteredRow, !showRow )[0]
						.display = showRow ? '' : 'none';
				}
			}
			c.filteredRows += $rows.not( '.' + wo.filter_filteredRow ).length;
			c.totalRows += $rows.length;
			ts.processTbody( table, $tbody, false );
		}
		c.lastCombinedFilter = combinedFilters; // save last search
		// don't save 'filters' directly since it may have altered ( AnyMatch column searches )
		c.lastSearch = storedFilters;
		c.$table.data( 'lastSearch', storedFilters );
		if ( wo.filter_saveFilters && ts.storage ) {
			ts.storage( table, 'tablesorter-filters', storedFilters );
		}
		if ( c.debug ) {
			ts.benchmark( 'Completed filter widget search', time );
		}
		if ( wo.filter_initialized ) {
			c.$table.trigger( 'filterEnd', c );
		}
		setTimeout( function() {
			c.$table.trigger( 'applyWidgets' ); // make sure zebra widget is applied
		}, 0 );
	},
	getOptionSource: function( table, column, onlyAvail ) {
		table = $( table )[0];
		var cts, indx, len,
			c = table.config,
			wo = c.widgetOptions,
			parsed = [],
			arry = false,
			source = wo.filter_selectSource,
			last = c.$table.data( 'lastSearch' ) || [],
			fxn = $.isFunction( source ) ? true : ts.getColumnData( table, source, column );

		if ( onlyAvail && last[column] !== '' ) {
			onlyAvail = false;
		}

		// filter select source option
		if ( fxn === true ) {
			// OVERALL source
			arry = source( table, column, onlyAvail );
		} else if ( fxn instanceof $ || ( $.type( fxn ) === 'string' && fxn.indexOf( '</option>' ) >= 0 ) ) {
			// selectSource is a jQuery object or string of options
			return fxn;
		} else if ( $.isArray( fxn ) ) {
			arry = fxn;
		} else if ( $.type( source ) === 'object' && fxn ) {
			// custom select source function for a SPECIFIC COLUMN
			arry = fxn( table, column, onlyAvail );
		}
		if ( arry === false ) {
			// fall back to original method
			arry = ts.filter.getOptions( table, column, onlyAvail );
		}

		// get unique elements and sort the list
		// if $.tablesorter.sortText exists ( not in the original tablesorter ),
		// then natural sort the list otherwise use a basic sort
		arry = $.grep( arry, function( value, indx ) {
			return $.inArray( value, arry ) === indx;
		});

		if ( c.$headerIndexed[ column ].hasClass( 'filter-select-nosort' ) ) {
			// unsorted select options
			return arry;
		} else {
			len = arry.length;
			// parse select option values
			for ( indx = 0; indx < len; indx++ ) {
				// parse array data using set column parser; this DOES NOT pass the original
				// table cell to the parser format function
				parsed.push({
					t : arry[ indx ],
					p : c.parsers && c.parsers[ column ].format( arry[ indx ], table, [], column )
				});
			}

			// sort parsed select options
			cts = c.textSorter || '';
			parsed.sort( function( a, b ) {
				// sortNatural breaks if you don't pass it strings
				var x = a.p.toString(),
					y = b.p.toString();
				if ( $.isFunction( cts ) ) {
					// custom OVERALL text sorter
					return cts( x, y, true, column, table );
				} else if ( typeof( cts ) === 'object' && cts.hasOwnProperty( column ) ) {
					// custom text sorter for a SPECIFIC COLUMN
					return cts[column]( x, y, true, column, table );
				} else if ( ts.sortNatural ) {
					// fall back to natural sort
					return ts.sortNatural( x, y );
				}
				// using an older version! do a basic sort
				return true;
			});
			// rebuild arry from sorted parsed data
			arry = [];
			len = parsed.length;
			for ( indx = 0; indx < len; indx++ ) {
				arry.push( parsed[indx].t );
			}
			return arry;
		}
	},
	getOptions: function( table, column, onlyAvail ) {
		table = $( table )[0];
		var rowIndex, tbodyIndex, len, row, cache,
			c = table.config,
			wo = c.widgetOptions,
			arry = [];
		for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ) {
			cache = c.cache[tbodyIndex];
			len = c.cache[tbodyIndex].normalized.length;
			// loop through the rows
			for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {
				// get cached row from cache.row ( old ) or row data object
				// ( new; last item in normalized array )
				row = cache.row ?
					cache.row[ rowIndex ] :
					cache.normalized[ rowIndex ][ c.columns ].$row[0];
				// check if has class filtered
				if ( onlyAvail && row.className.match( wo.filter_filteredRow ) ) {
					continue;
				}
				// get non-normalized cell content
				if ( wo.filter_useParsedData ||
					c.parsers[column].parsed ||
					c.$headerIndexed[column].hasClass( 'filter-parsed' ) ) {
					arry.push( '' + cache.normalized[ rowIndex ][ column ] );
				} else {
					// get raw cached data instead of content directly from the cells
					arry.push( cache.normalized[ rowIndex ][ c.columns ].raw[ column ] );
				}
			}
		}
		return arry;
	},
	buildSelect: function( table, column, arry, updating, onlyAvail ) {
		table = $( table )[0];
		column = parseInt( column, 10 );
		if ( !table.config.cache || $.isEmptyObject( table.config.cache ) ) {
			return;
		}
		var indx, val, txt, t, $filters, $filter,
			c = table.config,
			wo = c.widgetOptions,
			node = c.$headerIndexed[ column ],
			// t.data( 'placeholder' ) won't work in jQuery older than 1.4.3
			options = '<option value="">' +
				( node.data( 'placeholder' ) ||
					node.attr( 'data-placeholder' ) ||
					wo.filter_placeholder.select || ''
				) + '</option>',
			// Get curent filter value
			currentValue = c.$table
				.find( 'thead' )
				.find( 'select.' + tscss.filter + '[data-column="' + column + '"]' )
				.val();
		// nothing included in arry ( external source ), so get the options from
		// filter_selectSource or column data
		if ( typeof arry === 'undefined' || arry === '' ) {
			arry = ts.filter.getOptionSource( table, column, onlyAvail );
		}

		if ( $.isArray( arry ) ) {
			// build option list
			for ( indx = 0; indx < arry.length; indx++ ) {
				txt = arry[indx] = ( '' + arry[indx] ).replace( /\"/g, '&quot;' );
				val = txt;
				// allow including a symbol in the selectSource array
				// 'a-z|A through Z' so that 'a-z' becomes the option value
				// and 'A through Z' becomes the option text
				if ( txt.indexOf( wo.filter_selectSourceSeparator ) >= 0 ) {
					t = txt.split( wo.filter_selectSourceSeparator );
					val = t[0];
					txt = t[1];
				}
				// replace quotes - fixes #242 & ignore empty strings
				// see http://stackoverflow.com/q/14990971/145346
				options += arry[indx] !== '' ?
					'<option ' +
						( val === txt ? '' : 'data-function-name="' + arry[indx] + '" ' ) +
						'value="' + val + '">' + txt +
					'</option>' : '';
			}
			// clear arry so it doesn't get appended twice
			arry = [];
		}

		// update all selects in the same column ( clone thead in sticky headers &
		// any external selects ) - fixes 473
		$filters = ( c.$filters ? c.$filters : c.$table.children( 'thead' ) )
			.find( '.' + tscss.filter );
		if ( wo.filter_$externalFilters ) {
			$filters = $filters && $filters.length ?
				$filters.add( wo.filter_$externalFilters ) :
				wo.filter_$externalFilters;
		}
		$filter = $filters.filter( 'select[data-column="' + column + '"]' );

		// make sure there is a select there!
		if ( $filter.length ) {
			$filter[ updating ? 'html' : 'append' ]( options );
			if ( !$.isArray( arry ) ) {
				// append options if arry is provided externally as a string or jQuery object
				// options ( default value ) was already added
				$filter.append( arry ).val( currentValue );
			}
			$filter.val( currentValue );
		}
	},
	buildDefault: function( table, updating ) {
		var columnIndex, $header, noSelect,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns;
		// build default select dropdown
		for ( columnIndex = 0; columnIndex < columns; columnIndex++ ) {
			$header = c.$headerIndexed[columnIndex];
			noSelect = !( $header.hasClass( 'filter-false' ) || $header.hasClass( 'parser-false' ) );
			// look for the filter-select class; build/update it if found
			if ( ( $header.hasClass( 'filter-select' ) ||
				ts.getColumnData( table, wo.filter_functions, columnIndex ) === true ) && noSelect ) {
				ts.filter.buildSelect( table, columnIndex, '', updating, $header.hasClass( wo.filter_onlyAvail ) );
			}
		}
	}
};

ts.getFilters = function( table, getRaw, setFilters, skipFirst ) {
	var i, $filters, $column, cols,
		filters = false,
		c = table ? $( table )[0].config : '',
		wo = c ? c.widgetOptions : '';
	if ( ( getRaw !== true && wo && !wo.filter_columnFilters ) ||
		// setFilters called, but last search is exactly the same as the current
		// fixes issue #733 & #903 where calling update causes the input values to reset
		( $.isArray(setFilters) && setFilters.join('') === c.lastCombinedFilter ) ) {
		return $( table ).data( 'lastSearch' );
	}
	if ( c ) {
		if ( c.$filters ) {
			$filters = c.$filters.find( '.' + tscss.filter );
		}
		if ( wo.filter_$externalFilters ) {
			$filters = $filters && $filters.length ?
				$filters.add( wo.filter_$externalFilters ) :
				wo.filter_$externalFilters;
		}
		if ( $filters && $filters.length ) {
			filters = setFilters || [];
			for ( i = 0; i < c.columns + 1; i++ ) {
				cols = ( i === c.columns ?
					// 'all' columns can now include a range or set of columms ( data-column='0-2,4,6-7' )
					wo.filter_anyColumnSelector + ',' + wo.filter_multipleColumnSelector :
					'[data-column="' + i + '"]' );
				$column = $filters.filter( cols );
				if ( $column.length ) {
					// move the latest search to the first slot in the array
					$column = ts.filter.getLatestSearch( $column );
					if ( $.isArray( setFilters ) ) {
						// skip first ( latest input ) to maintain cursor position while typing
						if ( skipFirst ) {
							$column.slice( 1 );
						}
						if ( i === c.columns ) {
							// prevent data-column='all' from filling data-column='0,1' ( etc )
							cols = $column.filter( wo.filter_anyColumnSelector );
							$column = cols.length ? cols : $column;
						}
						$column
							.val( setFilters[ i ] )
							.trigger( 'change.tsfilter' );
					} else {
						filters[i] = $column.val() || '';
						// don't change the first... it will move the cursor
						if ( i === c.columns ) {
							// don't update range columns from 'all' setting
							$column
								.slice( 1 )
								.filter( '[data-column*="' + $column.attr( 'data-column' ) + '"]' )
								.val( filters[ i ] );
						} else {
							$column
								.slice( 1 )
								.val( filters[ i ] );
						}
					}
					// save any match input dynamically
					if ( i === c.columns && $column.length ) {
						wo.filter_$anyMatch = $column;
					}
				}
			}
		}
	}
	if ( filters.length === 0 ) {
		filters = false;
	}
	return filters;
};

ts.setFilters = function( table, filter, apply, skipFirst ) {
	var c = table ? $( table )[0].config : '',
		valid = ts.getFilters( table, true, filter, skipFirst );
	if ( c && apply ) {
		// ensure new set filters are applied, even if the search is the same
		c.lastCombinedFilter = null;
		c.lastSearch = [];
		ts.filter.searching( c.table, filter, skipFirst );
		c.$table.trigger( 'filterFomatterUpdate' );
	}
	return !!valid;
};

})( jQuery );

/*! Widget: stickyHeaders - updated 3/26/2015 (v2.21.3) *//*
 * Requires tablesorter v2.8+ and jQuery 1.4.3+
 * by Rob Garrison
 */
;(function ($, window) {
'use strict';
var ts = $.tablesorter || {};

$.extend(ts.css, {
	sticky    : 'tablesorter-stickyHeader', // stickyHeader
	stickyVis : 'tablesorter-sticky-visible',
	stickyHide: 'tablesorter-sticky-hidden',
	stickyWrap: 'tablesorter-sticky-wrapper'
});

// Add a resize event to table headers
ts.addHeaderResizeEvent = function(table, disable, settings) {
	table = $(table)[0]; // make sure we're using a dom element
	var headers,
		defaults = {
			timer : 250
		},
		options = $.extend({}, defaults, settings),
		c = table.config,
		wo = c.widgetOptions,
		checkSizes = function(triggerEvent) {
			wo.resize_flag = true;
			headers = [];
			c.$headers.each(function() {
				var $header = $(this),
					sizes = $header.data('savedSizes') || [0,0], // fixes #394
					width = this.offsetWidth,
					height = this.offsetHeight;
				if (width !== sizes[0] || height !== sizes[1]) {
					$header.data('savedSizes', [ width, height ]);
					headers.push(this);
				}
			});
			if (headers.length && triggerEvent !== false) {
				c.$table.trigger('resize', [ headers ]);
			}
			wo.resize_flag = false;
		};
	checkSizes(false);
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	wo.resize_timer = setInterval(function() {
		if (wo.resize_flag) { return; }
		checkSizes();
	}, options.timer);
};

// Sticky headers based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60, // sticky widget must be initialized after the filter widget!
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_attachTo : null, // jQuery selector or object to attach sticky header to
		stickyHeaders_xScroll : null, // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
		stickyHeaders_yScroll : null, // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_filteredToTop: true, // scroll table top into view after filtering
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true, // trigger "resize" event on headers
		stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
		stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
	},
	format: function(table, c, wo) {
		// filter widget doesn't initialize on an empty table. Fixes #449
		if ( c.$table.hasClass('hasStickyHeaders') || ($.inArray('filter', c.widgets) >= 0 && !c.$table.hasClass('hasFilters')) ) {
			return;
		}
		var $table = c.$table,
			// add position: relative to attach element, hopefully it won't cause trouble.
			$attach = $(wo.stickyHeaders_attachTo),
			namespace = c.namespace + 'stickyheaders ',
			// element to watch for the scroll event
			$yScroll = $(wo.stickyHeaders_yScroll || wo.stickyHeaders_attachTo || window),
			$xScroll = $(wo.stickyHeaders_xScroll || wo.stickyHeaders_attachTo || window),
			$thead = $table.children('thead:first'),
			$header = $thead.children('tr').not('.sticky-false').children(),
			$tfoot = $table.children('tfoot'),
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			// is this table nested? If so, find parent sticky header wrapper (div, not table)
			$nestedSticky = $table.parent().closest('.' + ts.css.table).hasClass('hasStickyHeaders') ?
				$table.parent().closest('table.tablesorter')[0].config.widgetOptions.$sticky.parent() : [],
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.height() : 0,
			// clone table, then wrap to make sticky header
			$stickyTable = wo.$sticky = $table.clone()
				.addClass('containsStickyHeaders ' + ts.css.sticky + ' ' + wo.stickyHeaders + ' ' + c.namespace.slice(1) + '_extra_table' )
				.wrap('<div class="' + ts.css.stickyWrap + '">'),
			$stickyWrap = $stickyTable.parent()
				.addClass(ts.css.stickyHide)
				.css({
					position   : $attach.length ? 'absolute' : 'fixed',
					padding    : parseInt( $stickyTable.parent().parent().css('padding-left'), 10 ),
					top        : stickyOffset + nestedStickyTop,
					left       : 0,
					visibility : 'hidden',
					zIndex     : wo.stickyHeaders_zIndex || 2
				}),
			$stickyThead = $stickyTable.children('thead:first'),
			$stickyCells,
			laststate = '',
			spacing = 0,
			setWidth = function($orig, $clone){
				$orig.filter(':visible').each(function(i) {
					var width, border,
						$cell = $clone.filter(':visible').eq(i),
						$this = $(this);
					// code from https://github.com/jmosbech/StickyTableHeaders
					if ($this.css('box-sizing') === 'border-box') {
						width = $this.outerWidth();
					} else {
						if ($cell.css('border-collapse') === 'collapse') {
							if (window.getComputedStyle) {
								width = parseFloat( window.getComputedStyle(this, null).width );
							} else {
								// ie8 only
								border = parseFloat( $this.css('border-width') );
								width = $this.outerWidth() - parseFloat( $this.css('padding-left') ) - parseFloat( $this.css('padding-right') ) - border;
							}
						} else {
							width = $this.width();
						}
					}
					$cell.css({
						'min-width': width,
						'max-width': width
					});
				});
			},
			resizeHeader = function() {
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				spacing = 0;
				$stickyWrap.css({
					left : $attach.length ? parseInt($attach.css('padding-left'), 10) || 0 :
							$table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing,
					width: $table.outerWidth()
				});
				setWidth( $table, $stickyTable );
				setWidth( $header, $stickyCells );
			};
		// only add a position relative if a position isn't already defined
		if ($attach.length && !$attach.css('position')) {
			$attach.css('position', 'relative');
		}
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249) - don't remove cells to get correct cell indexing
		$stickyTable.find('thead:gt(0), tr.sticky-false').hide();
		$stickyTable.find('tbody, tfoot').remove();
		$stickyTable.find('caption').toggle(wo.stickyHeaders_includeCaption);
		// issue #172 - find td/th in sticky header
		$stickyCells = $stickyThead.children().children();
		$stickyTable.css({ height:0, width:0, margin: 0 });
		// remove resizable block
		$stickyCells.find('.' + ts.css.resizer).remove();
		// update sticky header class names to match real header after sorting
		$table
			.addClass('hasStickyHeaders')
			.bind('pagerComplete' + namespace, function() {
				resizeHeader();
			});

		ts.bindEvents(table, $stickyThead.children().children('.' + ts.css.header));

		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$table.after( $stickyWrap );

		// onRenderHeader is defined, we need to do something about it (fixes #641)
		if (c.onRenderHeader) {
			$stickyThead.children('tr').children().each(function(index){
				// send second parameter
				c.onRenderHeader.apply( $(this), [ index, c, $stickyTable ] );
			});
		}

		// make it sticky!
		$xScroll.add($yScroll)
		.unbind( ('scroll resize '.split(' ').join( namespace )).replace(/\s+/g, ' ') )
		.bind('scroll resize '.split(' ').join( namespace ), function(event) {
			if (!$table.is(':visible')) { return; } // fixes #278
			// Detect nested tables - fixes #724
			nestedStickyTop = $nestedSticky.length ? $nestedSticky.offset().top - $yScroll.scrollTop() + $nestedSticky.height() : 0;
			var offset = $table.offset(),
				yWindow = $.isWindow( $yScroll[0] ), // $.isWindow needs jQuery 1.4.3
				xWindow = $.isWindow( $xScroll[0] ),
				// scrollTop = ( $attach.length ? $attach.offset().top : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				scrollTop = ( $attach.length ? ( yWindow ? $yScroll.scrollTop() : $yScroll.offset().top ) : $yScroll.scrollTop() ) + stickyOffset + nestedStickyTop,
				tableHeight = $table.height() - ($stickyWrap.height() + ($tfoot.height() || 0)),
				isVisible = ( scrollTop > offset.top ) && ( scrollTop < offset.top + tableHeight ) ? 'visible' : 'hidden',
				cssSettings = { visibility : isVisible };

			if ($attach.length) {
				cssSettings.top = yWindow ? scrollTop - $attach.offset().top : $attach.scrollTop();
			}
			if (xWindow) {
				// adjust when scrolling horizontally - fixes issue #143
				cssSettings.left = $table.offset().left - parseInt($table.css('margin-left'), 10) - $xScroll.scrollLeft() - spacing;
			}
			if ($nestedSticky.length) {
				cssSettings.top = ( cssSettings.top || 0 ) + stickyOffset + nestedStickyTop;
			}
			$stickyWrap
				.removeClass( ts.css.stickyVis + ' ' + ts.css.stickyHide )
				.addClass( isVisible === 'visible' ? ts.css.stickyVis : ts.css.stickyHide )
				.css(cssSettings);
			if (isVisible !== laststate || event.type === 'resize') {
				// make sure the column widths match
				resizeHeader();
				laststate = isVisible;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		if ($table.hasClass('hasFilters') && wo.filter_columnFilters) {
			// scroll table into view after filtering, if sticky header is active - #482
			$table.bind('filterEnd' + namespace, function() {
				// $(':focus') needs jQuery 1.6+
				var $td = $(document.activeElement).closest('td'),
					column = $td.parent().children().index($td);
				// only scroll if sticky header is active
				if ($stickyWrap.hasClass(ts.css.stickyVis) && wo.stickyHeaders_filteredToTop) {
					// scroll to original table (not sticky clone)
					window.scrollTo(0, $table.position().top);
					// give same input/select focus; check if c.$filters exists; fixes #594
					if (column >= 0 && c.$filters) {
						c.$filters.eq(column).find('a, select, input').filter(':visible').focus();
					}
				}
			});
			ts.filter.bindSearch( $table, $stickyCells.find('.' + ts.css.filter) );
			// support hideFilters
			if (wo.filter_hideFilters) {
				ts.filter.hideFilters($stickyTable, c);
			}
		}

		$table.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo) {
		var namespace = c.namespace + 'stickyheaders ';
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind( ('pagerComplete filterEnd '.split(' ').join(namespace)).replace(/\s+/g, ' ') )
			.next('.' + ts.css.stickyWrap).remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		$(window)
			.add(wo.stickyHeaders_xScroll)
			.add(wo.stickyHeaders_yScroll)
			.add(wo.stickyHeaders_attachTo)
			.unbind( ('scroll resize '.split(' ').join(namespace)).replace(/\s+/g, ' ') );
		ts.addHeaderResizeEvent(table, false);
	}
});

})(jQuery, window);

/*! Widget: resizable - updated 5/17/2015 (v2.22.0) */
;(function ($, window) {
'use strict';
var ts = $.tablesorter || {};

$.extend(ts.css, {
	resizableContainer : 'tablesorter-resizable-container',
	resizableHandle    : 'tablesorter-resizable-handle',
	resizableNoSelect  : 'tablesorter-disableSelection',
	resizableStorage   : 'tablesorter-resizable'
});

// Add extra scroller css
$(function(){
	var s = '<style>' +
		'body.' + ts.css.resizableNoSelect + ' { -ms-user-select: none; -moz-user-select: -moz-none;' +
			'-khtml-user-select: none; -webkit-user-select: none; user-select: none; }' +
		'.' + ts.css.resizableContainer + ' { position: relative; height: 1px; }' +
		// make handle z-index > than stickyHeader z-index, so the handle stays above sticky header
		'.' + ts.css.resizableHandle + ' { position: absolute; display: inline-block; width: 8px; top: 1px;' +
			'cursor: ew-resize; z-index: 3; user-select: none; -moz-user-select: none; }' +
		'</style>';
	$(s).appendTo('body');
});

ts.resizable = {
	init : function( c, wo ) {
		if ( c.$table.hasClass( 'hasResizable' ) ) { return; }
		c.$table.addClass( 'hasResizable' );
		ts.resizableReset( c.table, true ); // set default widths

		// internal variables
		wo.resizable_ = {
			$wrap : c.$table.parent(),
			mouseXPosition : 0,
			$target : null,
			$next : null,
			overflow : c.$table.parent().css('overflow') === 'auto',
			fullWidth : Math.abs(c.$table.parent().width() - c.$table.width()) < 20,
			storedSizes : []
		};

		var noResize, $header, column, storedSizes,
			marginTop = parseInt( c.$table.css( 'margin-top' ), 10 );

		wo.resizable_.storedSizes = storedSizes = ( ( ts.storage && wo.resizable !== false ) ?
			ts.storage( c.table, ts.css.resizableStorage ) :
			[] ) || [];
		ts.resizable.setWidths( c, wo, storedSizes );

		wo.$resizable_container = $( '<div class="' + ts.css.resizableContainer + '">' )
			.css({ top : marginTop })
			.insertBefore( c.$table );
		// add container
		for ( column = 0; column < c.columns; column++ ) {
			$header = c.$headerIndexed[ column ];
			noResize = ts.getData( $header, ts.getColumnData( c.table, c.headers, column ), 'resizable' ) === 'false';
			if ( !noResize ) {
				$( '<div class="' + ts.css.resizableHandle + '">' )
					.appendTo( wo.$resizable_container )
					.attr({
						'data-column' : column,
						'unselectable' : 'on'
					})
					.data( 'header', $header )
					.bind( 'selectstart', false );
			}
		}
		c.$table.one('tablesorter-initialized', function() {
			ts.resizable.setHandlePosition( c, wo );
			ts.resizable.bindings( this.config, this.config.widgetOptions );
		});
	},

	setWidth : function( $el, width ) {
		$el.css({
			'width' : width,
			'min-width' : '',
			'max-width' : ''
		});
	},

	setWidths : function( c, wo, storedSizes ) {
		var column,
			$extra = $( c.namespace + '_extra_headers' ),
			$col = c.$table.children( 'colgroup' ).children( 'col' );
		storedSizes = storedSizes || wo.resizable_.storedSizes || [];
		// process only if table ID or url match
		if ( storedSizes.length ) {
			for ( column = 0; column < c.columns; column++ ) {
				// set saved resizable widths
				c.$headerIndexed[ column ].width( storedSizes[ column ] );
				if ( $extra.length ) {
					// stickyHeaders needs to modify min & max width as well
					ts.resizable.setWidth( $extra.eq( column ).add( $col.eq( column ) ), storedSizes[ column ] );
				}
			}
			if ( $( c.namespace + '_extra_table' ).length && !ts.hasWidget( c.table, 'scroller' ) ) {
				ts.resizable.setWidth( $( c.namespace + '_extra_table' ), c.$table.outerWidth() );
			}
		}
	},

	setHandlePosition : function( c, wo ) {
		var startPosition,
			hasScroller = ts.hasWidget( c.table, 'scroller' ),
			tableHeight = c.$table.height(),
			$handles = wo.$resizable_container.children(),
			handleCenter = Math.floor( $handles.width() / 2 );

		if ( hasScroller ) {
			tableHeight = 0;
			c.$table.closest( '.' + ts.css.scrollerWrap ).children().each(function(){
				var $this = $(this);
				// center table has a max-height set
				tableHeight += $this.filter('[style*="height"]').length ? $this.height() : $this.children('table').height();
			});
		}
		// subtract out table left position from resizable handles. Fixes #864
		startPosition = c.$table.position().left;
		$handles.each( function() {
			var $this = $(this),
				column = parseInt( $this.attr( 'data-column' ), 10 ),
				columns = c.columns - 1,
				$header = $this.data( 'header' );
			if ( !$header ) { return; } // see #859
			if ( !$header.is(':visible') ) {
				$this.hide();
			} else if ( column < columns || column === columns && wo.resizable_addLastColumn ) {
				$this.css({
					display: 'inline-block',
					height : tableHeight,
					left : $header.position().left - startPosition + $header.outerWidth() - handleCenter
				});
			}
		});
	},

	// prevent text selection while dragging resize bar
	toggleTextSelection : function( c, toggle ) {
		var namespace = c.namespace + 'tsresize';
		c.widgetOptions.resizable_.disabled = toggle;
		$( 'body' ).toggleClass( ts.css.resizableNoSelect, toggle );
		if ( toggle ) {
			$( 'body' )
				.attr( 'unselectable', 'on' )
				.bind( 'selectstart' + namespace, false );
		} else {
			$( 'body' )
				.removeAttr( 'unselectable' )
				.unbind( 'selectstart' + namespace );
		}
	},

	bindings : function( c, wo ) {
		var namespace = c.namespace + 'tsresize';
		wo.$resizable_container.children().bind( 'mousedown', function( event ) {
			// save header cell and mouse position
			var column, $this,
				vars = wo.resizable_,
				$extras = $( c.namespace + '_extra_headers' ),
				$header = $( event.target ).data( 'header' );

			column = parseInt( $header.attr( 'data-column' ), 10 );
			vars.$target = $header = $header.add( $extras.filter('[data-column="' + column + '"]') );
			vars.target = column;

			// if table is not as wide as it's parent, then resize the table
			vars.$next = event.shiftKey || wo.resizable_targetLast ?
				$header.parent().children().not( '.resizable-false' ).filter( ':last' ) :
				$header.nextAll( ':not(.resizable-false)' ).eq( 0 );

			column = parseInt( vars.$next.attr( 'data-column' ), 10 );
			vars.$next = vars.$next.add( $extras.filter('[data-column="' + column + '"]') );
			vars.next = column;

			vars.mouseXPosition = event.pageX;
			vars.storedSizes = [];
			for ( column = 0; column < c.columns; column++ ) {
				$this = c.$headerIndexed[ column ];
				vars.storedSizes[ column ] = $this.is(':visible') ? $this.width() : 0;
			}
			ts.resizable.toggleTextSelection( c, true );
		});

		$( document )
			.bind( 'mousemove' + namespace, function( event ) {
				var vars = wo.resizable_;
				// ignore mousemove if no mousedown
				if ( !vars.disabled || vars.mouseXPosition === 0 || !vars.$target ) { return; }
				if ( wo.resizable_throttle ) {
					clearTimeout( vars.timer );
					vars.timer = setTimeout( function() {
						ts.resizable.mouseMove( c, wo, event );
					}, isNaN( wo.resizable_throttle ) ? 5 : wo.resizable_throttle );
				} else {
					ts.resizable.mouseMove( c, wo, event );
				}
			})
			.bind( 'mouseup' + namespace, function() {
				if (!wo.resizable_.disabled) { return; }
				ts.resizable.toggleTextSelection( c, false );
				ts.resizable.stopResize( c, wo );
				ts.resizable.setHandlePosition( c, wo );
			});

		// resizeEnd event triggered by scroller widget
		$( window ).bind( 'resize' + namespace + ' resizeEnd' + namespace, function() {
			ts.resizable.setHandlePosition( c, wo );
		});

		// right click to reset columns to default widths
		c.$table
			.bind( 'columnUpdate' + namespace, function() {
				ts.resizable.setHandlePosition( c, wo );
			})
			.find( 'thead:first' )
			.add( $( c.namespace + '_extra_table' ).find( 'thead:first' ) )
			.bind( 'contextmenu' + namespace, function() {
				// $.isEmptyObject() needs jQuery 1.4+; allow right click if already reset
				var allowClick = wo.resizable_.storedSizes.length === 0;
				ts.resizableReset( c.table );
				ts.resizable.setHandlePosition( c, wo );
				wo.resizable_.storedSizes = [];
				return allowClick;
			});

	},

	mouseMove : function( c, wo, event ) {
		if ( wo.resizable_.mouseXPosition === 0 || !wo.resizable_.$target ) { return; }
		// resize columns
		var vars = wo.resizable_,
			$next = vars.$next,
			leftEdge = event.pageX - vars.mouseXPosition;
		if ( vars.fullWidth ) {
			vars.storedSizes[ vars.target ] += leftEdge;
			vars.storedSizes[ vars.next ] -= leftEdge;
			ts.resizable.setWidths( c, wo );

		} else if ( vars.overflow ) {
			c.$table.add( $( c.namespace + '_extra_table' ) ).width(function(i, w){
				return w + leftEdge;
			});
			if ( !$next.length ) {
				// if expanding right-most column, scroll the wrapper
				vars.$wrap[0].scrollLeft = c.$table.width();
			}
		} else {
			vars.storedSizes[ vars.target ] += leftEdge;
			ts.resizable.setWidths( c, wo );
		}
		vars.mouseXPosition = event.pageX;
	},

	stopResize : function( c, wo ) {
		var $this, column,
			vars = wo.resizable_;
		vars.storedSizes = [];
		if ( ts.storage ) {
			vars.storedSizes = [];
			for ( column = 0; column < c.columns; column++ ) {
				$this = c.$headerIndexed[ column ];
				vars.storedSizes[ column ] = $this.is(':visible') ? $this.width() : 0;
			}
			if ( wo.resizable !== false ) {
				// save all column widths
				ts.storage( c.table, ts.css.resizableStorage, vars.storedSizes );
			}
		}
		vars.mouseXPosition = 0;
		vars.$target = vars.$next = null;
		$(window).trigger('resize'); // will update stickyHeaders, just in case
	}
};

// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: "resizable",
	priority: 40,
	options: {
		resizable : true,
		resizable_addLastColumn : false,
		resizable_widths : [],
		resizable_throttle : false, // set to true (5ms) or any number 0-10 range
		resizable_targetLast : false
	},
	init: function(table, thisWidget, c, wo) {
		ts.resizable.init( c, wo );
	},
	remove: function( table, c, wo, refreshing ) {
		if (wo.$resizable_container) {
			var namespace = c.namespace + 'tsresize';
			c.$table.add( $( c.namespace + '_extra_table' ) )
				.removeClass('hasResizable')
				.children( 'thead' ).unbind( 'contextmenu' + namespace );

				wo.$resizable_container.remove();
			ts.resizable.toggleTextSelection( c, false );
			ts.resizableReset( table, refreshing );
			$( document ).unbind( 'mousemove' + namespace + ' mouseup' + namespace );
		}
	}
});

ts.resizableReset = function( table, refreshing ) {
	$( table ).each(function(){
		var index, $t,
			c = this.config,
			wo = c && c.widgetOptions;
		if ( table && c && c.$headerIndexed.length ) {
			for ( index = 0; index < c.columns; index++ ) {
				$t = c.$headerIndexed[ index ];
				if ( wo.resizable_widths && wo.resizable_widths[ index ] ) {
					$t.css( 'width', wo.resizable_widths[ index ] );
				} else if ( !$t.hasClass( 'resizable-false' ) ) {
					// don't clear the width of any column that is not resizable
					$t.css( 'width', '' );
				}
			}
			// reset stickyHeader widths
			$( window ).trigger( 'resize' );
			if ( ts.storage && !refreshing ) {
				ts.storage( this, ts.css.resizableStorage, {} );
			}
		}
	});
};

})( jQuery, window );

/*! Widget: saveSort */
;(function ($) {
'use strict';
var ts = $.tablesorter || {};

// this widget saves the last sort only if the
// saveSort widget option is true AND the
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: 'saveSort',
	priority: 20,
	options: {
		saveSort : true
	},
	init: function(table, thisWidget, c, wo) {
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, c, wo, true);
	},
	format: function(table, c, wo, init) {
		var stored, time,
			$table = c.$table,
			saveSort = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug) {
			time = new Date();
		}
		if ($table.hasClass('hasSaveSort')) {
			if (saveSort && table.hasInitialized && ts.storage) {
				ts.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug) {
					ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$table.addClass('hasSaveSort');
			sortList = '';
			// get data
			if (ts.storage) {
				stored = ts.storage( table, 'tablesorter-savesort' );
				sortList = (stored && stored.hasOwnProperty('sortList') && $.isArray(stored.sortList)) ? stored.sortList : '';
				if (c.debug) {
					ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
				$table.bind('saveSortReset', function(event) {
					event.stopPropagation();
					ts.storage( table, 'tablesorter-savesort', '' );
				});
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0) {
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0) {
				// update sort change
				$table.trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table, c) {
		c.$table.removeClass('hasSaveSort');
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);

return $.tablesorter;
}));
