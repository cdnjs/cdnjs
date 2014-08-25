/**!
* TableSorter 2.15.14 - Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
* @contributor Rob Garrison/https://github.com/Mottie/tablesorter
*/
/*jshint browser:true, jquery:true, unused:false, expr: true */
/*global console:false, alert:false */
!(function($) {
	"use strict";
	$.extend({
		/*jshint supernew:true */
		tablesorter: new function() {

			var ts = this;

			ts.version = "2.15.14";

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
				dateFormat       : 'mmddyyyy', // other options: "ddmmyyy" or "yyyymmdd"
				sortMultiSortKey : 'shiftKey', // key used to select additional columns
				sortResetKey     : 'ctrlKey',  // key used to remove sorting on a column
				usNumberFormat   : true,       // false for German "1.234.567,89" or French "1 234 567,89"
				delayInit        : false,      // if false, the parsed table contents will not update until the first sort
				serverSideSorting: false,      // if true, server-side sorting should be performed because client-side sorting will be disabled, but the ui and events will still be used.

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
				sortRestart      : false,      // restart sort to "sortInitialOrder" when clicking on previously unsorted columns

				emptyTo          : 'bottom',   // sort empty cell to bottom, top, none, zero
				stringTo         : 'max',      // sort strings in numerical column as max, min, top, bottom, zero
				textExtraction   : 'simple',   // text extraction method/function - function(node, table, cellIndex){}
				textSorter       : null,       // choose overall or specific column sorter function(a, b, direction, table, columnIndex) [alt: ts.sortText]
				numberSorter     : null,       // choose overall numeric sorter function(a, b, direction, maxColumnValue)

				// *** widget options
				widgets: [],                   // method to add widgets, e.g. widgets: ['zebra']
				widgetOptions    : {
					zebra : [ 'even', 'odd' ]    // zebra widget alternating row class names
				},
				initWidgets      : true,       // apply widgets on tablesorter initialization

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
				cssIcon          : 'tablesorter-icon',     //  if this class exists, a <i> will be added to the header automatically
				cssInfoBlock     : 'tablesorter-infoOnly', // don't sort tbody with this class name (only one class name allowed here!)

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

				// deprecated; but retained for backwards compatibility
				// widgetZebra: { css: ["even", "odd"] }

			};

			// internal css classes - these will ALWAYS be added to
			// the table and MUST only contain one class name - fixes #381
			ts.css = {
				table      : 'tablesorter',
				cssHasChild: 'tablesorter-hasChildRow',
				childRow   : 'tablesorter-childRow',
				header     : 'tablesorter-header',
				headerRow  : 'tablesorter-headerRow',
				headerIn   : 'tablesorter-header-inner',
				icon       : 'tablesorter-icon',
				info       : 'tablesorter-infoOnly',
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

			/* debuging utils */
			function log() {
				var a = arguments[0],
					s = arguments.length > 1 ? Array.prototype.slice.call(arguments) : a;
				if (typeof console !== "undefined" && typeof console.log !== "undefined") {
					console[ /error/i.test(a) ? 'error' : /warn/i.test(a) ? 'warn' : 'log' ](s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");
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

			function getElementText(table, node, cellIndex) {
				if (!node) { return ""; }
				var c = table.config,
					t = c.textExtraction, text = "";
				if (t === "simple") {
					if (c.supportsTextContent) {
						text = node.textContent; // newer browsers support this
					} else {
						text = $(node).text();
					}
				} else {
					if (typeof t === "function") {
						text = t(node, table, cellIndex);
					} else if (typeof t === "object" && t.hasOwnProperty(cellIndex)) {
						text = t[cellIndex](node, table, cellIndex);
					} else {
						text = c.supportsTextContent ? node.textContent : $(node).text();
					}
				}
				return $.trim(text);
			}

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var cur,
				i = ts.parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = getElementText(table, node, cellIndex);
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
					if (cur && cur.id !== 'text' && cur.is && cur.is(nodeValue, table, node)) {
						return cur;
					}
				}
				// nothing found, return the generic parser (text)
				return ts.getParserById('text');
			}

			function buildParserCache(table) {
				var c = table.config,
					// update table bodies in case we start with an empty table
					tb = c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')'),
					rows, list, l, i, h, ch, p, time, parsersDebug = "";
				if ( tb.length === 0) {
					return c.debug ? log('Warning: *Empty table!* Not building a parser cache') : '';
				} else if (c.debug) {
					time = new Date();
					log('Detecting parsers for each column');
				}
				rows = tb[0].rows;
				if (rows[0]) {
					list = [];
					l = rows[0].cells.length;
					for (i = 0; i < l; i++) {
						// tons of thanks to AnthonyM1229 for working out the following selector (issue #74) to make this work in IE8!
						// More fixes to this selector to work properly in iOS and jQuery 1.8+ (issue #132 & #174)
						h = c.$headers.filter(':not([colspan])');
						h = h.add( c.$headers.filter('[colspan="1"]') ) // ie8 fix
							.filter('[data-column="' + i + '"]:last');
						ch = c.headers[i];
						// get column parser
						p = ts.getParserById( ts.getData(h, ch, 'sorter') );
						// empty cells behaviour - keeping emptyToBottom for backwards compatibility
						c.empties[i] = ts.getData(h, ch, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' );
						// text strings behaviour in numerical sorts
						c.strings[i] = ts.getData(h, ch, 'string') || c.stringTo || 'max';
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (c.debug) {
							parsersDebug += "column:" + i + "; parser:" + p.id + "; string:" + c.strings[i] + '; empty: ' + c.empties[i] + "\n";
						}
						list.push(p);
					}
				}
				if (c.debug) {
					log(parsersDebug);
					benchmark("Completed detecting parsers", time);
				}
				c.parsers = list;
			}

			/* utils */
			function buildCache(table) {
				var b = table.tBodies,
				tc = table.config,
				totalRows,
				totalCells,
				parsers = tc.parsers,
				t, v, i, j, k, c, cols, cacheTime, colMax = [];
				tc.cache = {};
				// if no parsers found, return - it's an empty table.
				if (!parsers) {
					return tc.debug ? log('Warning: *Empty table!* Not building a cache') : '';
				}
				if (tc.debug) {
					cacheTime = new Date();
				}
				// processing icon
				if (tc.showProcessing) {
					ts.isProcessing(table, true);
				}
				for (k = 0; k < b.length; k++) {
					tc.cache[k] = { row: [], normalized: [] };
					// ignore tbodies with class name from c.cssInfoBlock
					if (!$(b[k]).hasClass(tc.cssInfoBlock)) {
						totalRows = (b[k] && b[k].rows.length) || 0;
						totalCells = (b[k].rows[0] && b[k].rows[0].cells.length) || 0;
						for (i = 0; i < totalRows; ++i) {
							/** Add the table data to main data array */
							c = $(b[k].rows[i]);
							cols = [];
							// if this is a child row, add it to the last row's children and continue to the next row
							// ignore child row class, if it is the first row
							if (c.hasClass(tc.cssChildRow) && i !== 0) {
								tc.cache[k].row[tc.cache[k].row.length - 1] = tc.cache[k].row[tc.cache[k].row.length - 1].add(c);
								// add "hasChild" class name to parent row
								if (!c.prev().hasClass(tc.cssChildRow)) {
									c.prev().addClass(ts.css.cssHasChild);
								}
								// go to the next for loop
								continue;
							}
							tc.cache[k].row.push(c);
							for (j = 0; j < totalCells; ++j) {
								if (typeof parsers[j] === 'undefined') {
									if (tc.debug) {
										log('No parser found for cell:', c[0].cells[j], 'does it have a header?');
									}
									continue;
								}
								t = getElementText(table, c[0].cells[j], j);
								// allow parsing if the string is empty, previously parsing would change it to zero,
								// in case the parser needs to extract data from the table cell attributes
								v = parsers[j].format(t, table, c[0].cells[j], j);
								cols.push(v);
								if ((parsers[j].type || '').toLowerCase() === "numeric") {
									colMax[j] = Math.max(Math.abs(v) || 0, colMax[j] || 0); // determine column max value (ignore sign)
								}
							}
							cols.push(tc.cache[k].normalized.length); // add position for rowCache
							tc.cache[k].normalized.push(cols);
						}
						tc.cache[k].colMax = colMax;
					}
				}
				if (tc.showProcessing) {
					ts.isProcessing(table); // remove processing icon
				}
				if (tc.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
			}

			// init flag (true) used by pager plugin to prevent widget application
			function appendToTable(table, init) {
				var c = table.config,
					wo = c.widgetOptions,
					b = table.tBodies,
					rows = [],
					c2 = c.cache,
					r, n, totalRows, checkCell, $bk, $tb,
					i, j, k, l, pos, appendTime;
				// empty table - fixes #206/#346
				if (isEmptyObject(c2)) {
					// run pager appender in case the table was just emptied
					return c.appender ? c.appender(table, rows) :
						table.isUpdating ? c.$table.trigger("updateComplete", table) : ''; // Fixes #532
				}
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					$bk = $(b[k]);
					if ($bk.length && !$bk.hasClass(c.cssInfoBlock)) {
						// get tbody
						$tb = ts.processTbody(table, $bk, true);
						r = c2[k].row;
						n = c2[k].normalized;
						totalRows = n.length;
						checkCell = totalRows ? (n[0].length - 1) : 0;
						for (i = 0; i < totalRows; i++) {
							pos = n[i][checkCell];
							rows.push(r[pos]);
							// removeRows used by the pager plugin; don't render if using ajax - fixes #411
							if (!c.appender || (c.pager && (!c.pager.removeRows || !wo.pager_removeRows) && !c.pager.ajax)) {
								l = r[pos].length;
								for (j = 0; j < l; j++) {
									$tb.append(r[pos][j]);
								}
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
					benchmark("Rebuilt table", appendTime);
				}
				// apply table widgets; but not before ajax completes
				if (!init && !c.appender) { ts.applyWidget(table); }
				if (table.isUpdating) {
					c.$table.trigger("updateComplete", table);
				}
			}

			// computeTableHeaderCellIndexes from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			function computeThIndexes(t) {
				var matrix = [],
				lookup = {},
				cols = 0, // determine the number of columns
				trs = $(t).children('thead, tfoot').children('tr'), // children tr in tfoot - see issue #196 & #547
				i, j, k, l, c, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						c = cells[j];
						rowIndex = c.parentNode.rowIndex;
						cellId = rowIndex + "-" + $(c).index();
						rowSpan = c.rowSpan || 1;
						colSpan = c.colSpan || 1;
						if (typeof(matrix[rowIndex]) === "undefined") {
							matrix[rowIndex] = [];
						}
						// Find first available column in the first row
						for (k = 0; k < matrix[rowIndex].length + 1; k++) {
							if (typeof(matrix[rowIndex][k]) === "undefined") {
								firstAvailCol = k;
								break;
							}
						}
						lookup[cellId] = firstAvailCol;
						cols = Math.max(firstAvailCol, cols);
						// add data-column
						$(c).attr({ 'data-column' : firstAvailCol }); // 'data-row' : rowIndex
						for (k = rowIndex; k < rowIndex + rowSpan; k++) {
							if (typeof(matrix[k]) === "undefined") {
								matrix[k] = [];
							}
							matrixrow = matrix[k];
							for (l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
								matrixrow[l] = "x";
							}
						}
					}
				}
				// may not be accurate if # header columns !== # tbody columns
				t.config.columns = cols + 1; // add one because it's a zero-based index
			}

			function formatSortingOrder(v) {
				// look for "d" in "desc" order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function buildHeaders(table) {
				var ch, $t,
					h, i, t, lock, time,
					c = table.config;
				c.headerList = [];
				c.headerContent = [];
				if (c.debug) {
					time = new Date();
				}
				computeThIndexes(table);
				// add icon if cssIcon option exists
				i = c.cssIcon ? '<i class="' + ( c.cssIcon === ts.css.icon ? ts.css.icon : c.cssIcon + ' ' + ts.css.icon ) + '"></i>' : '';
				c.$headers = $(table).find(c.selectorHeaders).each(function(index) {
					$t = $(this);
					ch = c.headers[index];
					c.headerContent[index] = $(this).html(); // save original header content
					// set up header template
					t = c.headerTemplate.replace(/\{content\}/g, $(this).html()).replace(/\{icon\}/g, i);
					if (c.onRenderTemplate) {
						h = c.onRenderTemplate.apply($t, [index, t]);
						if (h && typeof h === 'string') { t = h; } // only change t if something is returned
					}
					$(this).html('<div class="' + ts.css.headerIn + '">' + t + '</div>'); // faster than wrapInner

					if (c.onRenderHeader) { c.onRenderHeader.apply($t, [index]); }
					this.column = parseInt( $(this).attr('data-column'), 10);
					this.order = formatSortingOrder( ts.getData($t, ch, 'sortInitialOrder') || c.sortInitialOrder ) ? [1,0,2] : [0,1,2];
					this.count = -1; // set to -1 because clicking on the header automatically adds one
					this.lockedOrder = false;
					lock = ts.getData($t, ch, 'lockedOrder') || false;
					if (typeof lock !== 'undefined' && lock !== false) {
						this.order = this.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					$t.addClass(ts.css.header + ' ' + c.cssHeader);
					// add cell to headerList
					c.headerList[index] = this;
					// add to parent in case there are multiple rows
					$t.parent().addClass(ts.css.headerRow + ' ' + c.cssHeaderRow).attr('role', 'row');
					// allow keyboard cursor to focus on element
					if (c.tabIndex) { $t.attr("tabindex", 0); }
				}).attr({
					scope: 'col',
					role : 'columnheader'
				});
				// enable/disable sorting
				updateHeader(table);
				if (c.debug) {
					benchmark("Built headers:", time);
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
				checkResort(c.$table, resort, callback);
			}

			function updateHeader(table) {
				var s, $th, c = table.config;
				c.$headers.each(function(index, th){
					$th = $(th);
					s = ts.getData( th, c.headers[index], 'sorter' ) === 'false';
					th.sortDisabled = s;
					$th[ s ? 'addClass' : 'removeClass' ]('sorter-false').attr('aria-disabled', '' + s);
					// aria-controls - requires table ID
					if (table.id) {
						if (s) {
							$th.removeAttr('aria-controls');
						} else {
							$th.attr('aria-controls', table.id);
						}
					}
				});
			}

			function setHeadersCss(table) {
				var f, i, j, l,
					c = table.config,
					list = c.sortList,
					none = ts.css.sortNone + ' ' + c.cssNone,
					css = [ts.css.sortAsc + ' ' + c.cssAsc, ts.css.sortDesc + ' ' + c.cssDesc],
					aria = ['ascending', 'descending'],
					// find the footer
					$t = $(table).find('tfoot tr').children().removeClass(css.join(' '));
				// remove all header information
				c.$headers
					.removeClass(css.join(' '))
					.addClass(none).attr('aria-sort', 'none');
				l = list.length;
				for (i = 0; i < l; i++) {
					// direction = 2 means reset!
					if (list[i][1] !== 2) {
						// multicolumn sorting updating - choose the :last in case there are nested columns
						f = c.$headers.not('.sorter-false').filter('[data-column="' + list[i][0] + '"]' + (l === 1 ? ':last' : '') );
						if (f.length) {
							for (j = 0; j < f.length; j++) {
								if (!f[j].sortDisabled) {
									f.eq(j).removeClass(none).addClass(css[list[i][1]]).attr('aria-sort', aria[list[i][1]]);
									// add sorted class to footer, if it exists
									if ($t.length) {
										$t.filter('[data-column="' + list[i][0] + '"]').eq(j).addClass(css[list[i][1]]);
									}
								}
							}
						}
					}
				}
				// add verbose aria labels
				c.$headers.not('.sorter-false').each(function(){
					var $this = $(this),
						nextSort = this.order[(this.count + 1) % (c.sortReset ? 3 : 2)],
						txt = $this.text() + ': ' +
							ts.language[ $this.hasClass(ts.css.sortAsc) ? 'sortAsc' : $this.hasClass(ts.css.sortDesc) ? 'sortDesc' : 'sortNone' ] +
							ts.language[ nextSort === 0 ? 'nextAsc' : nextSort === 1 ? 'nextDesc' : 'nextNone' ];
					$this.attr('aria-label', txt );
				});
			}

			// automatically add col group, and column sizes if set
			function fixColumnWidth(table) {
				if (table.config.widthFixed && $(table).find('colgroup').length === 0) {
					var colgroup = $('<colgroup>'),
						overallWidth = $(table).width();
					// only add col for visible columns - fixes #371
					$(table.tBodies[0]).find("tr:first").children("td:visible").each(function() {
						colgroup.append($('<col>').css('width', parseInt(($(this).width()/overallWidth)*1000, 10)/10 + '%'));
					});
					$(table).prepend(colgroup);
				}
			}

			function updateHeaderSortCount(table, list) {
				var s, t, o, c = table.config,
					sl = list || c.sortList;
				c.sortList = [];
				$.each(sl, function(i,v){
					// ensure all sortList values are numeric - fixes #127
					s = [ parseInt(v[0], 10), parseInt(v[1], 10) ];
					// make sure header exists
					o = c.$headers[s[0]];
					if (o) { // prevents error if sorton array is wrong
						c.sortList.push(s);
						t = $.inArray(s[1], o.order); // fixes issue #167
						o.count = t >= 0 ? t : s[1] % (c.sortReset ? 3 : 2);
					}
				});
			}

			function getCachedSortType(parsers, i) {
				return (parsers && parsers[i]) ? parsers[i].type || '' : '';
			}

			function initSort(table, cell, event){
				var arry, indx, col, order, s,
					c = table.config,
					key = !event[c.sortMultiSortKey],
					$table = c.$table;
				// Only call sortStart if sorting is enabled
				$table.trigger("sortStart", table);
				// get current column sort order
				cell.count = event[c.sortResetKey] ? 2 : (cell.count + 1) % (c.sortReset ? 3 : 2);
				// reset all sorts on non-current column - issue #30
				if (c.sortRestart) {
					indx = cell;
					c.$headers.each(function() {
						// only reset counts on columns that weren't just clicked on and if not included in a multisort
						if (this !== indx && (key || !$(this).is('.' + ts.css.sortDesc + ',.' + ts.css.sortAsc))) {
							this.count = -1;
						}
					});
				}
				// get current column index
				indx = cell.column;
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
							order = c.$headers[s[0]];
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
				$table.trigger("sortBegin", table);
				// setTimeout needed so the processing icon shows up
				setTimeout(function(){
					// set css for headers
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
					$table.trigger("sortEnd", table);
				}, 1);
			}

			// sort multiple columns
			function multisort(table) { /*jshint loopfunc:true */
				var i, k, num, col, colMax, cache, lc,
					order, orgOrderCol, sortTime, sort, x, y,
					dir = 0,
					c = table.config,
					cts = c.textSorter || '',
					sortList = c.sortList,
					l = sortList.length,
					bl = table.tBodies.length;
				if (c.serverSideSorting || isEmptyObject(c.cache)) { // empty table - fixes #206/#346
					return;
				}
				if (c.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					colMax = c.cache[k].colMax;
					cache = c.cache[k].normalized;
					lc = cache.length;
					orgOrderCol = (cache && cache[0]) ? cache[0].length - 1 : 0;
					cache.sort(function(a, b) {
						// cache is undefined here in IE, so don't use it!
						for (i = 0; i < l; i++) {
							col = sortList[i][0];
							order = sortList[i][1];
							// sort direction, true = asc, false = desc
							dir = order === 0;

							if (c.sortStable && a[col] === b[col] && l === 1) {
								return a[orgOrderCol] - b[orgOrderCol];
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
								// var sort = $.tablesorter["sort" + s](table, a[c], b[c], c, colMax[c], dir);
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
						return a[orgOrderCol] - b[orgOrderCol];
					});
				}
				if (c.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time", sortTime); }
			}

			function resortComplete($table, callback){
				var table = $table[0];
				if (table.isUpdating) {
					$table.trigger('updateComplete');
				}
				if (typeof callback === "function") {
					callback($table[0]);
				}
			}

			function checkResort($table, flag, callback) {
				var sl = $table[0].config.sortList;
				// don't try to resort if the table is still processing
				// this will catch spamming of the updateCell method
				if (flag !== false && !$table[0].isProcessing && sl.length) {
					$table.trigger("sorton", [sl, function(){
						resortComplete($table, callback);
					}, true]);
				} else {
					$table.trigger('applyWidgets');
					resortComplete($table, callback);
				}
			}

			function bindMethods(table){
				var c = table.config,
					$table = c.$table;
				// apply easy methods that trigger bound events
				$table
				.unbind('sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave '.split(' ').join(c.namespace + ' '))
				.bind("sortReset" + c.namespace, function(e){
					e.stopPropagation();
					c.sortList = [];
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
				})
				.bind("updateAll" + c.namespace, function(e, resort, callback){
					e.stopPropagation();
					table.isUpdating = true;
					ts.refreshWidgets(table, true, true);
					ts.restoreHeaders(table);
					buildHeaders(table);
					ts.bindEvents(table, c.$headers);
					bindMethods(table);
					commonUpdate(table, resort, callback);
				})
				.bind("update" + c.namespace + " updateRows" + c.namespace, function(e, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					// update sorting (if enabled/disabled)
					updateHeader(table);
					commonUpdate(table, resort, callback);
				})
				.bind("updateCell" + c.namespace, function(e, cell, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					$table.find(c.selectorRemove).remove();
					// get position from the dom
					var l, row, icell,
					$tb = $table.find('tbody'),
					// update cache - format: function(s, table, cell, cellIndex)
					// no closest in jQuery v1.2.6 - tbdy = $tb.index( $(cell).closest('tbody') ),$row = $(cell).closest('tr');
					tbdy = $tb.index( $(cell).parents('tbody').filter(':first') ),
					$row = $(cell).parents('tr').filter(':first');
					cell = $(cell)[0]; // in case cell is a jQuery object
					// tbody may not exist if update is initialized while tbody is removed for processing
					if ($tb.length && tbdy >= 0) {
						row = $tb.eq(tbdy).find('tr').index( $row );
						icell = $(cell).index();
						l = c.cache[tbdy].normalized[row].length - 1;
						c.cache[tbdy].row[ c.cache[tbdy].normalized[row][l] ] = $row;
						c.cache[tbdy].normalized[row][icell] = c.parsers[icell].format( getElementText(table, cell, icell), table, cell, icell );
						checkResort($table, resort, callback);
					}
				})
				.bind("addRows" + c.namespace, function(e, $row, resort, callback) {
					e.stopPropagation();
					table.isUpdating = true;
					if (isEmptyObject(c.cache)) {
						// empty table, do an update instead - fixes #450
						updateHeader(table);
						commonUpdate(table, resort, callback);
					} else {
						var i, j,
						rows = $row.filter('tr').length,
						dat = [], l = $row[0].cells.length,
						tbdy = $table.find('tbody').index( $row.parents('tbody').filter(':first') );
						// fixes adding rows to an empty table - see issue #179
						if (!c.parsers) {
							buildParserCache(table);
						}
						// add each row
						for (i = 0; i < rows; i++) {
							// add each cell
							for (j = 0; j < l; j++) {
								dat[j] = c.parsers[j].format( getElementText(table, $row[i].cells[j], j), table, $row[i].cells[j], j );
							}
							// add the row index to the end
							dat.push(c.cache[tbdy].row.length);
							// update cache
							c.cache[tbdy].row.push([$row[i]]);
							c.cache[tbdy].normalized.push(dat);
							dat = [];
						}
						// resort using current settings
						checkResort($table, resort, callback);
					}
				})
				.bind("updateComplete" + c.namespace, function(){
					table.isUpdating = false;
				})
				.bind("sorton" + c.namespace, function(e, list, callback, init) {
					var c = table.config;
					e.stopPropagation();
					$table.trigger("sortStart", this);
					// update header count index
					updateHeaderSortCount(table, list);
					// set css for headers
					setHeadersCss(table);
					// fixes #346
					if (c.delayInit && isEmptyObject(c.cache)) { buildCache(table); }
					$table.trigger("sortBegin", this);
					// sort the table and append it to the dom
					multisort(table);
					appendToTable(table, init);
					$table
						.trigger("sortEnd", this)
						.trigger('applyWidgets');
					if (typeof callback === "function") {
						callback(table);
					}
				})
				.bind("appendCache" + c.namespace, function(e, callback, init) {
					e.stopPropagation();
					appendToTable(table, init);
					if (typeof callback === "function") {
						callback(table);
					}
				})
				.bind("updateCache" + c.namespace, function(e, callback){
					// rebuild parsers
					if (!c.parsers) {
						buildParserCache(table);
					}
					// rebuild the cache map
					buildCache(table);
					if (typeof callback === "function") {
						callback(table);
					}
				})
				.bind("applyWidgetId" + c.namespace, function(e, id) {
					e.stopPropagation();
					ts.getWidgetById(id).format(table, c, c.widgetOptions);
				})
				.bind("applyWidgets" + c.namespace, function(e, init) {
					e.stopPropagation();
					// apply widgets
					ts.applyWidget(table, init);
				})
				.bind("refreshWidgets" + c.namespace, function(e, all, dontapply){
					e.stopPropagation();
					ts.refreshWidgets(table, all, dontapply);
				})
				.bind("destroy" + c.namespace, function(e, c, cb){
					e.stopPropagation();
					ts.destroy(table, c, cb);
				});
			}

			/* public methods */
			ts.construct = function(settings) {
				return this.each(function() {
					var table = this,
						// merge & extend config options
						c = $.extend(true, {}, ts.defaults, settings);
					// create a table from data (build table widget)
					if (!table.hasInitialized && ts.buildTable && this.tagName !== 'TABLE') {
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
				$.data(table, "tablesorter", c);
				if (c.debug) { $.data( table, 'startoveralltimer', new Date()); }

				// constants
				c.supportsTextContent = $('<span>x</span>')[0].textContent === 'x';
				// removing this in version 3 (only supports jQuery 1.7+)
				c.supportsDataObject = (function(version) {
					version[0] = parseInt(version[0], 10);
					return (version[0] > 1) || (version[0] === 1 && parseInt(version[1], 10) >= 4);
				})($.fn.jquery.split("."));
				// digit sort text location; keeping max+/- for backwards compatibility
				c.string = { 'max': 1, 'min': -1, 'max+': 1, 'max-': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
				// add table theme class only if there isn't already one there
				if (!/tablesorter\-/.test($table.attr('class'))) {
					k = (c.theme !== '' ? ' tablesorter-' + c.theme : '');
				}
				c.$table = $table
					.addClass(ts.css.table + ' ' + c.tableClass + k)
					.attr({ role : 'grid'});

				// give the table a unique id, which will be used in namespace binding
				if (!c.namespace) {
					c.namespace = '.tablesorter' + Math.random().toString(16).slice(2);
				} else {
					// make sure namespace starts with a period & doesn't have weird characters
					c.namespace = '.' + c.namespace.replace(/\W/g,'');
				}

				c.$tbodies = $table.children('tbody:not(.' + c.cssInfoBlock + ')').attr({
					'aria-live' : 'polite',
					'aria-relevant' : 'all'
				});
				if (c.$table.find('caption').length) {
					c.$table.attr('aria-labelledby', 'theCaption');
				}
				c.widgetInit = {}; // keep a list of initialized widgets
				// build headers
				buildHeaders(table);
				// fixate columns if the users supplies the fixedWidth option
				// do this after theme has been applied
				fixColumnWidth(table);
				// try to auto detect column type, and store in tables config
				buildParserCache(table);
				// build the cache for the tbody cells
				// delayInit will delay building the cache until the user starts a sort
				if (!c.delayInit) { buildCache(table); }
				// bind all header events and methods
				ts.bindEvents(table, c.$headers);
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
					$table.trigger("sorton", [c.sortList, {}, !c.initWidgets, true]);
				} else {
					setHeadersCss(table);
					if (c.initWidgets) {
						// apply widget format
						ts.applyWidget(table);
					}
				}

				// show processesing icon
				if (c.showProcessing) {
					$table
					.unbind('sortBegin' + c.namespace + ' sortEnd' + c.namespace)
					.bind('sortBegin' + c.namespace + ' sortEnd' + c.namespace, function(e) {
						ts.isProcessing(table, e.type === 'sortBegin');
					});
				}

				// initialized
				table.hasInitialized = true;
				table.isProcessing = false;
				if (c.debug) {
					ts.benchmark("Overall initialization time", $.data( table, 'startoveralltimer'));
				}
				$table.trigger('tablesorter-initialized', table);
				if (typeof c.initialized === 'function') { c.initialized(table); }
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
					$h.addClass(ts.css.processing + ' ' + c.cssProcessing);
				} else {
					$h.removeClass(ts.css.processing + ' ' + c.cssProcessing);
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
				$(table)[0].config.$tbodies.empty();
			};

			ts.bindEvents = function(table, $headers){
				table = $(table)[0];
				var downTime,
				c = table.config;
				// apply event handling to headers and/or additional headers (stickyheaders, scroller, etc)
				$headers
				// http://stackoverflow.com/questions/5312849/jquery-find-self;
				.find(c.selectorSort).add( $headers.filter(c.selectorSort) )
				.unbind('mousedown mouseup sort keyup '.split(' ').join(c.namespace + ' '))
				.bind('mousedown mouseup sort keyup '.split(' ').join(c.namespace + ' '), function(e, external) {
					var cell, type = e.type;
					// only recognize left clicks or enter
					if ( ((e.which || e.button) !== 1 && !/sort|keyup/.test(type)) || (type === 'keyup' && e.which !== 13) ) {
						return;
					}
					// ignore long clicks (prevents resizable widget from initializing a sort)
					if (type === 'mouseup' && external !== true && (new Date().getTime() - downTime > 250)) { return; }
					// set timer on mousedown
					if (type === 'mousedown') {
						downTime = new Date().getTime();
						return e.target.tagName === "INPUT" ? '' : !c.cancelSelection;
					}
					if (c.delayInit && isEmptyObject(c.cache)) { buildCache(table); }
					// jQuery v1.2.6 doesn't have closest()
					cell = /TH|TD/.test(this.tagName) ? this : $(this).parents('th, td')[0];
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
				var c = $(table)[0].config;
				// don't use c.$headers here in case header cells were swapped
				c.$table.find(c.selectorHeaders).each(function(i){
					// only restore header cells if it is wrapped
					// because this is also used by the updateAll method
					if ($(this).find('.' + ts.css.headerIn).length){
						$(this).html( c.headerContent[i] );
					}
				});
			};

			ts.destroy = function(table, removeClasses, callback){
				table = $(table)[0];
				if (!table.hasInitialized) { return; }
				// remove all widgets
				ts.refreshWidgets(table, true, true);
				var $t = $(table), c = table.config,
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
				$t
					.removeData('tablesorter')
					.unbind('sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd '.split(' ').join(c.namespace + ' '));
				c.$headers.add($f)
					.removeClass( [ts.css.header, c.cssHeader, c.cssAsc, c.cssDesc, ts.css.sortAsc, ts.css.sortDesc, ts.css.sortNone].join(' ') )
					.removeAttr('data-column')
					.removeAttr('aria-label')
					.attr('aria-disabled', 'true');
				$r.find(c.selectorSort).unbind('mousedown mouseup keypress '.split(' ').join(c.namespace + ' '));
				ts.restoreHeaders(table);
				$t.toggleClass(ts.css.table + ' ' + c.tableClass + ' tablesorter-' + c.theme, removeClasses === false);
				// clear flag in case the plugin is initialized again
				table.hasInitialized = false;
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
				"a" : "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", // áàâãäąå
				"A" : "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5", // ÁÀÂÃÄĄÅ
				"c" : "\u00e7\u0107\u010d", // çćč
				"C" : "\u00c7\u0106\u010c", // ÇĆČ
				"e" : "\u00e9\u00e8\u00ea\u00eb\u011b\u0119", // éèêëěę
				"E" : "\u00c9\u00c8\u00ca\u00cb\u011a\u0118", // ÉÈÊËĚĘ
				"i" : "\u00ed\u00ec\u0130\u00ee\u00ef\u0131", // íìİîïı
				"I" : "\u00cd\u00cc\u0130\u00ce\u00cf", // ÍÌİÎÏ
				"o" : "\u00f3\u00f2\u00f4\u00f5\u00f6", // óòôõö
				"O" : "\u00d3\u00d2\u00d4\u00d5\u00d6", // ÓÒÔÕÖ
				"ss": "\u00df", // ß (s sharp)
				"SS": "\u1e9e", // ẞ (Capital sharp s)
				"u" : "\u00fa\u00f9\u00fb\u00fc\u016f", // úùûüů
				"U" : "\u00da\u00d9\u00db\u00dc\u016e" // ÚÙÛÜŮ
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

			ts.getParserById = function(name) {
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

			ts.getWidgetById = function(name) {
				var i, w, l = ts.widgets.length;
				for (i = 0; i < l; i++) {
					w = ts.widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			};

			ts.applyWidget = function(table, init) {
				table = $(table)[0]; // in case this is called externally
				var c = table.config,
					wo = c.widgetOptions,
					widgets = [],
					time, w, wd;
				if (c.debug) { time = new Date(); }
				if (c.widgets.length) {
					// ensure unique widget ids
					c.widgets = $.grep(c.widgets, function(v, k){
						return $.inArray(v, c.widgets) === k;
					});
					// build widget array & add priority as needed
					$.each(c.widgets || [], function(i,n){
						wd = ts.getWidgetById(n);
						if (wd && wd.id) {
							// set priority to 10 if not defined
							if (!wd.priority) { wd.priority = 10; }
							widgets[i] = wd;
						}
					});
					// sort widgets by priority
					widgets.sort(function(a, b){
						return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
					});
					// add/update selected widgets
					$.each(widgets, function(i,w){
						if (w) {
							if (init || !(c.widgetInit[w.id])) {
								if (w.hasOwnProperty('options')) {
									wo = table.config.widgetOptions = $.extend( true, {}, w.options, wo );
								}
								if (w.hasOwnProperty('init')) {
									w.init(table, w, c, wo);
								}
								c.widgetInit[w.id] = true;
							}
							if (!init && w.hasOwnProperty('format')) {
								w.format(table, c, wo, false);
							}
						}
					});
				}
				if (c.debug) {
					w = c.widgets.length;
					benchmark("Completed " + (init === true ? "initializing " : "applying ") + w + " widget" + (w !== 1 ? "s" : ""), time);
				}
			};

			ts.refreshWidgets = function(table, doAll, dontapply) {
				table = $(table)[0]; // see issue #243
				var i, c = table.config,
					cw = c.widgets,
					w = ts.widgets, l = w.length;
				// remove previous widgets
				for (i = 0; i < l; i++){
					if ( w[i] && w[i].id && (doAll || $.inArray( w[i].id, cw ) < 0) ) {
						if (c.debug) { log( 'Refeshing widgets: Removing "' + w[i].id + '"' ); }
						// only remove widgets that have been initialized - fixes #442
						if (w[i].hasOwnProperty('remove') && c.widgetInit[w[i].id]) {
							w[i].remove(table, c, c.widgetOptions);
							c.widgetInit[w[i].id] = false;
						}
					}
				}
				if (dontapply !== true) {
					ts.applyWidget(table, doAll);
				}
			};

			// get sorter, string, empty, etc options for each column from
			// jQuery data, metadata, header option or header class name ("sorter-false")
			// priority = jQuery data > meta > headers option > header class name
			ts.getData = function(h, ch, key) {
				var val = '', $h = $(h), m, cl;
				if (!$h.length) { return ''; }
				m = $.metadata ? $h.metadata() : false;
				cl = ' ' + ($h.attr('class') || '');
				if (typeof $h.data(key) !== 'undefined' || typeof $h.data(key.toLowerCase()) !== 'undefined'){
					// "data-lockedOrder" is assigned to "lockedorder"; but "data-locked-order" is assigned to "lockedOrder"
					// "data-sort-initial-order" is assigned to "sortInitialOrder"
					val += $h.data(key) || $h.data(key.toLowerCase());
				} else if (m && typeof m[key] !== 'undefined') {
					val += m[key];
				} else if (ch && typeof ch[key] !== 'undefined') {
					val += ch[key];
				} else if (cl !== ' ' && cl.match(' ' + key + '-')) {
					// include sorter class name "sorter-text", etc; now works with "sorter-my-custom-parser"
					val = cl.match( new RegExp('\\s' + key + '-([\\w-]+)') )[1] || '';
				}
				return $.trim(val);
			};

			ts.formatFloat = function(s, table) {
				if (typeof s !== 'string' || s === '') { return s; }
				// allow using formatFloat without a table; defaults to US number format
				var i,
					t = table && table.config ? table.config.usNumberFormat !== false :
						typeof table !== "undefined" ? table : true;
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
				return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString().replace(/[,.'"\s]/g, '')) : true;
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
		id: "text",
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
		type: "text"
	});

	ts.addParser({
		id: "digit",
		is: function(s) {
			return ts.isDigit(s);
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "currency",
		is: function(s) {
			return (/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/).test((s || '').replace(/[+\-,. ]/g,'')); // £$€¤¥¢
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/).test(s);
		},
		format: function(s, table) {
			var i, a = s ? s.split(".") : '',
			r = "",
			l = a.length;
			for (i = 0; i < l; i++) {
				r += ("00" + a[i]).slice(-3);
			}
			return s ? ts.formatFloat(r, table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "url",
		is: function(s) {
			return (/^(https?|ftp|file):\/\//).test(s);
		},
		format: function(s) {
			return s ? $.trim(s.replace(/(https?|ftp|file):\/\//, '')) : s;
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat((s !== "") ? (new Date(s.replace(/-/g, "/")).getTime() || s) : "", table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/(\d\s*?%|%\s*?\d)/).test(s) && s.length < 15;
		},
		format: function(s, table) {
			return s ? ts.formatFloat(s.replace(/%/g, ""), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			// two digit years are not allowed cross-browser
			// Jan 01, 2013 12:34:56 PM or 01 Jan 2013
			return (/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i).test(s) || (/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat( (new Date(s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || s), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate", // "mmddyyyy", "ddmmyyyy" or "yyyymmdd"
		is: function(s) {
			// testing for ##-##-#### or ####-##-##, so it's not perfect; time can be included
			return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/).test((s || '').replace(/\s+/g," ").replace(/[\-.,]/g, "/"));
		},
		format: function(s, table, cell, cellIndex) {
			if (s) {
				var c = table.config,
					ci = c.$headers.filter('[data-column=' + cellIndex + ']:last'),
					format = ci.length && ci[0].dateFormat || ts.getData( ci, c.headers[cellIndex], 'dateFormat') || c.dateFormat;
				s = s.replace(/\s+/g," ").replace(/[\-.,]/g, "/"); // escaped - because JSHint in Firefox was showing it as an error
				if (format === "mmddyyyy") {
					s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");
				} else if (format === "ddmmyyyy") {
					s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");
				} else if (format === "yyyymmdd") {
					s = s.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
				}
			}
			return s ? ts.formatFloat( (new Date(s).getTime() || s), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "time",
		is: function(s) {
			return (/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat( (new Date("2000/01/01 " + s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || s), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "metadata",
		is: function() {
			return false;
		},
		format: function(s, table, cell) {
			var c = table.config,
			p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
			return $(cell).metadata()[p];
		},
		type: "numeric"
	});

	// add default widgets
	ts.addWidget({
		id: "zebra",
		priority: 90,
		format: function(table, c, wo) {
			var $tb, $tv, $tr, row, even, time, k, l,
			child = new RegExp(c.cssChildRow, 'i'),
			b = c.$tbodies;
			if (c.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				// loop through the visible rows
				$tb = b.eq(k);
				l = $tb.children('tr').length;
				if (l > 1) {
					row = 0;
					$tv = $tb.children('tr:visible').not(c.selectorRemove);
					// revered back to using jQuery each - strangely it's the fastest method
					/*jshint loopfunc:true */
					$tv.each(function(){
						$tr = $(this);
						// style children rows the same way the parent row was styled
						if (!child.test(this.className)) { row++; }
						even = (row % 2 === 0);
						$tr.removeClass(wo.zebra[even ? 1 : 0]).addClass(wo.zebra[even ? 0 : 1]);
					});
				}
			}
			if (c.debug) {
				ts.benchmark("Applying Zebra widget", time);
			}
		},
		remove: function(table, c, wo){
			var k, $tb,
				b = c.$tbodies,
				rmv = (wo.zebra || [ "even", "odd" ]).join(' ');
			for (k = 0; k < b.length; k++ ){
				$tb = $.tablesorter.processTbody(table, b.eq(k), true); // remove tbody
				$tb.children().removeClass(rmv);
				$.tablesorter.processTbody(table, $tb, false); // restore tbody
			}
		}
	});

})(jQuery);
