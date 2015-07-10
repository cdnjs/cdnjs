(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

/*! TableSorter (FORK) v2.22.3 *//*
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

			ts.version = '2.22.3';

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
					if ( t === 'basic' && typeof ( te = $node.attr(c.textAttribute) ) !== 'undefined' ) {
						return $.trim( te );
					}
					return $.trim( node.textContent || $node.text() );
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

			function detectParserForColumn(c, rows, rowIndex, cellIndex) {
				var cur, $node,
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
						if (c.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column: ' + cellIndex + ': "' + nodeValue + '"');
						}
					} else {
						keepLooking = false;
					}
				}
				while (--i >= 0) {
					cur = ts.parsers[i];
					// ignore the default text parser because it will always be true
					if (cur && cur.id !== 'text' && cur.is && cur.is(nodeValue, c.table, node, $node)) {
						return cur;
					}
				}
				// nothing found, return the generic parser (text)
				return ts.getParserById('text');
			}

			// centralized function to extract/parse cell contents
			ts.getParsedText = function( c, cell, colIndex, txt ) {
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
			};

			function buildParserCache( c, $tbodies ) {
				var rows, list, l, i, h, ch, np, p, e, time, tb, len,
					table = c.table,
					j = 0,
					parsersDebug = '';
				// update table bodies in case we start with an empty table
				c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')');
				tb = typeof $tbodies === 'undefined' ? c.$tbodies : $tbodies;
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
								p = detectParserForColumn(c, rows, -1, i);
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
			function buildCache(table, $tbodies) {
				var cc, t, v, i, j, k, $tb, $row, cols, cacheTime,
					totalRows, rowData, prevRowData, colMax,
					c = table.config,
					parsers = c.parsers;
				// update tbody variable
				c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')');
				$tb = typeof $tbodies === 'undefined' ? c.$tbodies : $tbodies,
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
								prevRowData.child[ t ][ j ] = ts.getParsedText( c, v[ j ], j );
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
							v = ts.getParsedText( c, $row[ 0 ].cells[ j ], j, t );
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
				buildParserCache(c);
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
								// var sort = $.tablesorter['sort' + s]( a[c], b[c], dir, colMax[c], table);
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
						t = ts.getParsedText( c, cell, icell );
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
							buildParserCache(c);
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
								cells[j] = ts.getParsedText( c, $row[i].cells[j], j );
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
				// $tbodies variable is used by the tbody sorting widget
				.bind('updateCache' + c.namespace, function(e, callback, $tbodies){
					// rebuild parsers
					if (!(c.parsers && c.parsers.length)) {
						buildParserCache(c, $tbodies);
					}
					// rebuild the cache map
					buildCache(table, $tbodies);
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
				buildParserCache(c);
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
					var cell, temp,
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
					// set target on mousedown
					if ( type.match(' ' + c.pointerDown + ' ') ) {
						downTarget = e.target;
						// preventDefault needed or jQuery v1.3.2 and older throws an
						// "Uncaught TypeError: handler.apply is not a function" error
						temp = $target.jquery.split( '.' );
						if ( temp[0] === '1' && temp[1] < 4 ) { e.preventDefault(); }
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
				b = c.$tbodies.add( $( c.namespace + '_extra_table' ).children( 'tbody:not(.' + c.cssInfoBlock + ')' ) );
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

return $.tablesorter;
}));
