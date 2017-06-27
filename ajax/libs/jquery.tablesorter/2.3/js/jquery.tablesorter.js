/*!
* TableSorter 2.3 - Client-side table sorting with ease!
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
!(function($) {
	$.extend({
		tablesorter: new function() {

			this.version = "2.3";

			var parsers = [], widgets = []; 
			this.defaults = {

				// appearance
				widthFixed       : false,

				// functionality
				cancelSelection  : true,       // prevent text selection in the header
				dateFormat       : "mmddyyyy", // other options: "ddmmyyy" or "yyyymmdd"
				sortMultiSortKey : "shiftKey", // key used to select additional columns
				usNumberFormat   : true,       // false for German "1.234.567,89" or French "1 234 567,89"
				delayInit        : false,      // if false, the parsed table contents will not update until the first sort.

				// sort options
				headers          : {},         // set sorter, string, empty, locked order, sortInitialOrder, filter, etc.
				ignoreCase       : true,       // ignore case while sorting
				sortForce        : null,       // column(s) first sorted; always applied
				sortList         : [],         // Initial sort order; applied initially; updated when manually sorted
				sortAppend       : null,       // column(s) sorted last; always applied

				sortInitialOrder : "asc",      // sort direction on first click
				sortLocaleCompare: false,      // replace equivalent character (accented characters)
				sortReset        : false,      // third click on the header will reset column to default - unsorted
				sortRestart      : false,      // restart sort to "sortInitialOrder" when clicking on previously unsorted columns

				emptyTo          : "bottom",   // sort empty cell to bottom, top, none, zero
				stringTo         : "max",      // sort strings in numerical column as max, min, top, bottom, zero
				textExtraction   : "simple",   // text extraction method/function - function(node, table, cellIndex){}
				textSorter       : null,       // use custom text sorter - function(a,b){ return a.sort(b); } // basic sort

				// widget options
				widgetOptions    : {
					zebra : [ "even", "odd" ]    // zebra widget alternating row class names
				},

				// callbacks
				initialized      : null,       // function(table){},
				onRenderHeader   : null,       // function(index){},

				// css class names
				tableClass       : 'tablesorter',
				cssAsc           : "tablesorter-headerSortUp",
				cssChildRow      : "expand-child",
				cssDesc          : "tablesorter-headerSortDown",
				cssHeader        : "tablesorter-header",
				cssInfoBlock     : "tablesorter-infoOnly", // don't sort tbody with this class name

				// selectors
				selectorHeaders  : '> thead th',
				selectorRemove   : "tr.remove-me",

				// advanced
				debug            : false,

				// Internal variables
				headerList: [],
				empties: {},
				strings: {},
				parsers: [],
				widgets: []

				// deprecated; but retained for backwards compatibility
				// widgetZebra: { css: ["even", "odd"] }

			};

			/* debuging utils */
			function log(s) {
				if (typeof console !== "undefined" && typeof console.log !== "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");
			}

			this.benchmark = benchmark;
			this.hasInitialized = false;

			function getElementText(table, node, cellIndex) {
				var text = "", t = table.config.textExtraction;
				if (!node) { return ""; }
				if (t === "simple") {
					text = $(node).text();
				} else {
					if (typeof(t) === "function") {
						text = t(node, table, cellIndex);
					} else if (typeof(t) === "object" && t.hasOwnProperty(cellIndex)) {
						text = t[cellIndex](node, table, cellIndex);
					} else {
						text = $(node).text();
					}
				}
				return text;
			}

			/* parsers utils */
			function getParserById(name) {
				var i, l = parsers.length;
				for (i = 0; i < l; i++) {
					if (parsers[i].id.toLowerCase() === (name.toString()).toLowerCase()) {
						return parsers[i];
					}
				}
				return false;
			}

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var i, l = parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = $.trim(getElementText(table, node, cellIndex));
						if (table.config.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column:' + cellIndex + ": " + nodeValue);
						}
					} else {
						keepLooking = false;
					}
				}
				for (i = 1; i < l; i++) {
					if (parsers[i].is(nodeValue, table, node)) {
						return parsers[i];
					}
				}
				// 0 is always the generic parser (text)
				return parsers[0];
			}

			// get sorter, string and empty options for each column from
			// metadata, header option or header class name ("sorter-false")
			// priority = jQuery data > meta > headers option > header class name
			function getData(h, ch, key) {
				var val = '',
					m = $.metadata ? h.metadata() : false,
					cl = h.attr('class') || '';
				if (h.data() && typeof h.data(key) !== 'undefined'){
					val += h.data(key);
				} else if (m && m[key]) {
					val = m[key];
				} else if (ch && ch[key]) {
					val = ch[key];
				} else if (cl && cl.match(key + '-')) {
					// include sorter class name "sorter-text", etc
					val = cl.match( new RegExp(key + '-(\\w+)') )[1] || '';
				}
				return $.trim(val);
			}

			function buildParserCache(table, $headers) {
				if (table.tBodies.length === 0) { return; } // In the case of empty tables
				var c = table.config, rows = table.tBodies[0].rows,
					list, l, i, h, m, ch, cl, p, parsersDebug = "";
				if (rows[0]) {
					list = [];
					l = rows[0].cells.length;
					for (i = 0; i < l; i++) {
						h = $headers.filter(':not([colspan])[data-column="'+i+'"]:last');
						ch = c.headers[i];
						// get column parser
						p = getParserById( getData(h, ch, 'sorter') );
						// empty cells behaviour - keeping emptyToBottom for backwards compatibility.
						c.empties[i] = getData(h, ch, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' );
						// text strings behaviour in numerical sorts
						c.strings[i] = getData(h, ch, 'string') || c.stringTo || 'max';
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
				}
				return list;
			}

			/* utils */
			function buildRegex(){
				var a, acc = '[', t = $.tablesorter,
					reg = t.characterEquivalents;
				t.characterRegexArray = {};
				for (a in reg) {
					if (typeof a === 'string') {
						acc += reg[a];
						t.characterRegexArray[a] = new RegExp('[' + reg[a] + ']', 'g');
					}
				}
				t.characterRegex = new RegExp(acc + ']');
			}

			function buildCache(table) {
				var b = table.tBodies,
				tc = table.config,
				totalRows,
				totalCells,
				parsers = tc.parsers,
				t, i, j, k, c, cols, cacheTime;
				tc.cache = {};
				if (tc.debug) {
					cacheTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					tc.cache[k] = { row: [], normalized: [] };
					// ignore tbodies with class name from css.cssInfoBlock
					if (!$(b[k]).hasClass(tc.cssInfoBlock)) {
						totalRows = (b[k] && b[k].rows.length) || 0;
						totalCells = (b[k].rows[0] && b[k].rows[0].cells.length) || 0;
						for (i = 0; i < totalRows; ++i) {
							/** Add the table data to main data array */
							c = $(b[k].rows[i]);
							cols = [];
							// if this is a child row, add it to the last row's children and continue to the next row
							if (c.hasClass(tc.cssChildRow)) {
								tc.cache[k].row[tc.cache[k].row.length - 1] = tc.cache[k].row[tc.cache[k].row.length - 1].add(c);
								// go to the next for loop
								continue;
							}
							tc.cache[k].row.push(c);
							for (j = 0; j < totalCells; ++j) {
								t = $.trim(getElementText(table, c[0].cells[j], j));
								// allow parsing if the string is empty, previously parsing would change it to zero,
								// in case the parser needs to extract data from the table cell attributes
								cols.push( parsers[j].format(t, table, c[0].cells[j], j) );
							}
							cols.push(tc.cache[k].normalized.length); // add position for rowCache
							tc.cache[k].normalized.push(cols);
						}
					}
				}
				if (tc.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
			}

			function getWidgetById(name) {
				var i, w, l = widgets.length;
				for (i = 0; i < l; i++) {
					w = widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			}

			function applyWidget(table, init) {
				var c = table.config.widgets,
				i, w, l = c.length;
				for (i = 0; i < l; i++) {
					w = getWidgetById(c[i]);
					if ( w ) {
						if (init && w.hasOwnProperty('init')) {
							w.init(table, widgets, w);
						} else if (!init && w.hasOwnProperty('format')) {
							w.format(table);
						}
					}
				}
			}

			function appendToTable(table) {
				var c = table.config,
				b = table.tBodies,
				rows = [],
				r, n, totalRows, checkCell,
				f, i, j, k, l, pos, appendTime;
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					if (!$(b[k]).hasClass(c.cssInfoBlock)){
						f = document.createDocumentFragment();
						r = c.cache[k].row;
						n = c.cache[k].normalized;
						totalRows = n.length;
						checkCell = totalRows ? (n[0].length - 1) : 0;
						for (i = 0; i < totalRows; i++) {
							pos = n[i][checkCell];
							rows.push(r[pos]);
							// removeRows used by the pager plugin
							if (!c.appender || !c.removeRows) {
								l = r[pos].length;
								for (j = 0; j < l; j++) {
									f.appendChild(r[pos][j]);
								}
							}
						}
						table.tBodies[k].appendChild(f);
					}
				}
				if (c.appender) {
					c.appender(table, rows);
				}
				if (c.debug) {
					benchmark("Rebuilt table", appendTime);
				}
				// apply table widgets
				applyWidget(table);
				// trigger sortend
				$(table).trigger("sortEnd", table);
			}

			// from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			function computeTableHeaderCellIndexes(t) {
				var matrix = [],
				lookup = {},
				trs = $(t).find('thead:eq(0) tr'),
				i, j, k, l, c, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						c = cells[j];
						rowIndex = c.parentNode.rowIndex;
						cellId = rowIndex + "-" + c.cellIndex;
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
				return lookup;
			}

			function formatSortingOrder(v) {
				// look for "d" in "desc" order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function buildHeaders(table) {
				var meta = ($.metadata) ? true : false,
				header_index = computeTableHeaderCellIndexes(table),
				$th, lock, time, $tableHeaders, c = table.config;
				c.headerList = [];
				if (c.debug) {
					time = new Date();
				}
				$tableHeaders = $(c.selectorHeaders, table)
				.wrapInner("<div class='tablesorter-header-inner' />")
				.each(function(index) {
					this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
					this.order = formatSortingOrder( (c.headers[index] && c.headers[index].sortInitialOrder) ? c.headers[index].sortInitialOrder : c.sortInitialOrder ) ? [1,0,2] : [0,1,2];
					this.count = -1; // set to -1 because clicking on the header automatically adds one
					if (getData($(this), c.headers[index], 'sorter') === 'false') { this.sortDisabled = true; }
					this.lockedOrder = false;
					lock = (c.headers[index] && c.headers[index].lockedOrder !== null) ? c.headers[index].lockedOrder : false;
					if (typeof(lock) !== 'undefined' && lock !== false) {
						this.order = this.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					if (!this.sortDisabled) {
						$th = $(this).addClass(c.cssHeader);
						if (c.onRenderHeader) { c.onRenderHeader.apply($th, [index]); }
					}
					// add cell to headerList
					c.headerList[index] = this;
					$(this).parent().addClass(c.cssHeader);
				});
				if (c.debug) {
					benchmark("Built headers", time);
					log($tableHeaders);
				}
				return $tableHeaders;
			}

			function isValueInArray(v, a) {
				var i, l = a.length;
				for (i = 0; i < l; i++) {
					if (a[i][0] === v) {
						return true;
					}
				}
				return false;
			}

			function setHeadersCss(table, $headers, list) {
				var f, h = [], i, j, l, css = [table.config.cssDesc, table.config.cssAsc];
				// remove all header information
				$headers
					.removeClass(css.join(' '))
					.each(function() {
						if (!this.sortDisabled) {
							h[this.column] = $(this);
						}
					});
				l = list.length;
				for (i = 0; i < l; i++) {
					if (list[i][1] === 2) { continue; } // direction = 2 means reset!
					h[list[i][0]].addClass(css[list[i][1]]);
					// multicolumn sorting updating
					f = $headers.filter('[data-column="' + list[i][0] + '"]');
					if (l > 1 && f.length) {
						for (j = 0; j < f.length; j++) {
							if (!f[j].sortDisabled) {
								$(f[j]).addClass(css[list[i][1]]);
							}
						}
					}
				}
			}

			function fixColumnWidth(table) {
				if (table.config.widthFixed) {
					var colgroup = $('<colgroup>');
					$("tr:first td", table.tBodies[0]).each(function() {
						colgroup.append($('<col>').css('width', $(this).width()));
					});
					$(table).prepend(colgroup);
				}
			}

			function updateHeaderSortCount(table, sortList) {
				var i, s, o, c = table.config,
				l = sortList.length;
				for (i = 0; i < l; i++) {
					s = sortList[i];
					o = c.headerList[s[0]];
					o.count = s[1] % (c.sortReset ? 3 : 2);
				}
			}

			function getCachedSortType(parsers, i) {
				return (parsers) ? parsers[i].type : '';
			}

			/* sorting methods - reverted sorting method back to version 2.0.3 */
			function multisort(table, sortList) {
				var dynamicExp, col, mx = 0, dir = 0, tc = table.config,
				l = sortList.length, bl = table.tBodies.length,
				sortTime, i, j, k, c, cache, lc, s, e, order, orgOrderCol;
				if (tc.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					dynamicExp = "var sortWrapper = function(a,b) {";
					cache = tc.cache[k];
					lc = cache.normalized.length;
					for (i = 0; i < l; i++) {
						c = sortList[i][0];
						order = sortList[i][1];
						// fallback to natural sort since it is more robust
						s = /n/i.test(getCachedSortType(tc.parsers, c)) ? "Numeric" : "Text";
						s += order === 0 ? "" : "Desc";
						e = "e" + i;
						// get max column value (ignore sign)
						if (/Numeric/.test(s) && tc.strings[c]) {
							for (j = 0; j < lc; j++) {
								col = Math.abs(parseFloat(cache.normalized[j][c]));
								mx = Math.max( mx, isNaN(col) ? 0 : col );
							}
							// sort strings in numerical columns
							if (typeof(tc.string[tc.strings[c]]) === 'boolean') {
								dir = (order === 0 ? 1 : -1) * (tc.string[tc.strings[c]] ? -1 : 1);
							} else {
								dir = (tc.strings[c]) ? tc.string[tc.strings[c]] || 0 : 0;
							}
						}
						dynamicExp += "var " + e + " = sort" + s + "(table, a[" + c + "],b[" + c + "]," + c + "," + mx +  "," + dir + "); ";
						dynamicExp += "if (" + e + ") { return " + e + "; } ";
						dynamicExp += "else { ";
					}
					// if value is the same keep orignal order
					orgOrderCol = (cache.normalized && cache.normalized[0]) ? cache.normalized[0].length - 1 : 0;
					dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
					for (i=0; i < l; i++) {
						dynamicExp += "}; ";
					}
					dynamicExp += "return 0; ";
					dynamicExp += "}; ";
					eval(dynamicExp);
					cache.normalized.sort(sortWrapper); // sort using eval expression
				}
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order+ " time", sortTime); }
			}

			// Natural sort - https://github.com/overset/javascript-natural-sort
			function sortText(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ],
					r = $.tablesorter.regex, xN, xD, yN, yD, xF, yF, i, mx;
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(a, b); }
				// chunk/tokenize
				xN = a.replace(r[0], '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
				yN = b.replace(r[0], '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
				// numeric, hex or date detection
				xD = parseInt(a.match(r[2])) || (xN.length !== 1 && a.match(r[1]) && Date.parse(a));
				yD = parseInt(b.match(r[2])) || (xD && b.match(r[1]) && Date.parse(b)) || null;
				// first try and sort Hex codes or Dates
				if (yD) {
					if ( xD < yD ) { return -1; }
					if ( xD > yD ) { return 1; }
				}
				mx = Math.max(xN.length, yN.length);
				// natural sorting through split numeric strings and default strings
				for (i = 0; i < mx; i++) {
					// find floats not starting with '0', string or 0 if not defined (Clint Priest)
					xF = (!(xN[i] || '').match(r[3]) && parseFloat(xN[i])) || xN[i] || 0;
					yF = (!(yN[i] || '').match(r[3]) && parseFloat(yN[i])) || yN[i] || 0;
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
			}

			function sortTextDesc(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(b, a); }
				return sortText(table, b, a);
			}

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			function getTextValue(a, mx, d) {
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a.length, n = mx + d;
					for (i = 0; i < l; i++) {
						n += a.charCodeAt(i);
					}
					return d * n;
				}
				return 0;
			}

			function sortNumeric(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : e || 1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return a - b;
			}

			function sortNumericDesc(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return (typeof(e) === 'boolean') ? (e ? 1 : -1) : -e || -1; }
				if (isNaN(a)) { a = getTextValue(a, mx, d); }
				if (isNaN(b)) { b = getTextValue(b, mx, d); }
				return b - a;
			}

			/* public methods */
			this.construct = function(settings) {
				return this.each(function() {
					// if no thead or tbody quit.
					if (!this.tHead || this.tBodies.length === 0) { return; }
					// declare
					var $headers, $cell, totalRows, $this,
						config, c, i, j, k, a, s, o;
					// new blank config object
					this.config = {};
					// merge and extend.
					c = config = $.extend(true, this.config, $.tablesorter.defaults, settings);
					// store common expression for speed
					$this = $(this).addClass(c.tableClass);
					// save the settings where they read
					$.data(this, "tablesorter", c);
					// build up character equivalent cross-reference
					buildRegex();
					// digit sort text location; keeping max+/- for backwards compatibility
					c.string = { 'max': 1, 'min': -1, 'max+': 1, 'max-': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
					// build headers
					$headers = buildHeaders(this);
					// try to auto detect column type, and store in tables config
					c.parsers = buildParserCache(this, $headers);
					// build the cache for the tbody cells
					// delayInit will delay building the cache until the user starts a sort
					if (!c.delayInit) { buildCache(this); }
					// fixate columns if the users supplies the fixedWidth option
					fixColumnWidth(this);
					// apply event handling to headers
					// this is to big, perhaps break it out?
					$headers
					.click(function(e) {
						if (c.delayInit && !c.cache) { buildCache($this[0]); }
						if (!this.sortDisabled) {
							// Only call sortStart if sorting is enabled.
							$this.trigger("sortStart", $this[0]);
							// store exp, for speed
							$cell = $(this);
							k = !e[c.sortMultiSortKey];
							// get current column sort order
							this.count = (this.count + 1) % (c.sortReset ? 3 : 2);
							// reset all sorts on non-current column - issue #30
							if (c.sortRestart) {
								i = this;
								$headers.each(function() {
									// only reset counts on columns that weren't just clicked on and if not included in a multisort
									if (this !== i && (k || !$(this).is('.' + c.cssDesc + ',.' + c.cssAsc))) {
										this.count = -1;
									}
								});
							}
							// get current column index
							i = this.column;
							// user only wants to sort on one column
							if (k) {
								// flush the sort list
								c.sortList = [];
								if (c.sortForce !== null) {
									a = c.sortForce;
									for (j = 0; j < a.length; j++) {
										if (a[j][0] !== i) {
											c.sortList.push(a[j]);
										}
									}
								}
								// add column to sort list
								o = this.order[this.count];
								if (o < 2) {
									c.sortList.push([i, o]);
									// add other columns if header spans across multiple
									if (this.colSpan > 1) {
										for (j = 1; j < this.colSpan; j++) {
											c.sortList.push([i+j, o]);
										}
									}
								}
								// multi column sorting
							} else {
								// the user has clicked on an already sorted column.
								if (isValueInArray(i, c.sortList)) {
									// reverse the sorting direction for all tables.
									for (j = 0; j < c.sortList.length; j++) {
										s = c.sortList[j];
										o = c.headerList[s[0]];
										if (s[0] === i) {
											s[1] = o.order[o.count];
											if (s[1] === 2) {
												c.sortList.splice(j,1);
												o.count = -1;
											}
										}
									}
								} else {
									// add column to sort list array
									o = this.order[this.count];
									if (o < 2) {
										c.sortList.push([i, o]);
										// add other columns if header spans across multiple
										if (this.colSpan > 1) {
											for (j = 1; j < this.colSpan; j++) {
												c.sortList.push([i+j, o]);
											}
										}
									}
								}
							}
							if (c.sortAppend !== null) {
								a = c.sortAppend;
								for (j = 0; j < a.length; j++) {
									if (a[j][0] !== i) {
										c.sortList.push(a[j]);
									}
								}
							}
							// sortBegin event triggered immediately before the sort
							$this.trigger("sortBegin", $this[0]);
							// set css for headers
							setHeadersCss($this[0], $headers, c.sortList);
							appendToTable($this[0], multisort($this[0], c.sortList));
							// stop normal event by returning false
							return false;
						}
						// cancel selection
					})
					.mousedown(function() {
						if (c.cancelSelection) {
							this.onselectstart = function() {
								return false;
							};
							return false;
						}
					});
					// apply easy methods that trigger binded events
					$this
					.bind("update", function(e, resort) {
						// remove rows/elements before update
						$(c.selectorRemove, this).remove();
						// rebuild parsers.
						c.parsers = buildParserCache(this, $headers);
						// rebuild the cache map
						buildCache(this);
						if (resort !== false) { $(this).trigger("sorton", [c.sortList]); }
					})
					.bind("updateCell", function(e, cell, resort) {
						// get position from the dom.
						var t = this, pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex],
						// update cache - format: function(s, table, cell, cellIndex)
						tbdy = $(this).find('tbody').index( $(cell).closest('tbody') );
						t.config.cache[tbdy].normalized[pos[0]][pos[1]] = c.parsers[pos[1]].format( getElementText(t, cell, pos[1]), t, cell, pos[1] );
						if (resort !== false) { $(this).trigger("sorton", [c.sortList]); }
					})
					.bind("addRows", function(e, $row, resort) {
						var i, rows = $row.filter('tr').length,
						dat = [], l = $row[0].cells.length, t = this,
						tbdy = $(this).find('tbody').index( $row.closest('tbody') );
						// add each row
						for (i = 0; i < rows; i++) {
							// add each cell
							for (j = 0; j < l; j++) {
								dat[j] = c.parsers[j].format( getElementText(t, $row[i].cells[j], j), t, $row[i].cells[j], j );
							}
							// add the row index to the end
							dat.push(c.cache[tbdy].row.length);
							// update cache
							c.cache[tbdy].row.push([$row[i]]);
							c.cache[tbdy].normalized.push(dat);
							dat = [];
						}
						// resort using current settings
						if (resort !== false) { $(this).trigger("sorton", [c.sortList]); }
					})
					.bind("sorton", function(e, list) {
						$(this).trigger("sortStart", this);
						// update and store the sortlist
						c.sortList = list;
						// update header count index
						updateHeaderSortCount(this, c.sortList);
						// set css for headers
						setHeadersCss(this, $headers, c.sortList);
						// sort the table and append it to the dom
						appendToTable(this, multisort(this, c.sortList));
					})
					.bind("appendCache", function() {
						appendToTable(this);
					})
					.bind("applyWidgetId", function(e, id) {
						getWidgetById(id).format(this);
					})
					.bind("applyWidgets", function() {
						// apply widgets
						applyWidget(this);
					});

					// get sort list from metadata
					if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
						c.sortList = $(this).metadata().sortlist;
					}
					// apply widget init code
					applyWidget(this, true);
					// if user has supplied a sort list to constructor.
					if (c.sortList.length > 0) {
						$this.trigger("sorton", [c.sortList]);
					} else {
						// apply widget format
						applyWidget(this);
					}

					// initialized
					this.hasInitialized = true;
					$this.trigger('tablesorter-initialized', this);
					if (typeof c.initialized === 'function') { c.initialized(this); }
				});
			};

			this.addParser = function(parser) {
				var i, l = parsers.length, a = true;
				for (i = 0; i < l; i++) {
					if (parsers[i].id.toLowerCase() === parser.id.toLowerCase()) {
						a = false;
					}
				}
				if (a) {
					parsers.push(parser);
				}
			};
			this.addWidget = function(widget) {
				widgets.push(widget);
			};
			this.formatFloat = function(s, table) {
				if (typeof(s) !== 'string') { return s; }
				if (table.config.usNumberFormat !== false) {
					// US Format - 1,234,567.89 -> 1234567.89
					s = s.replace(/,/g,'');
				} else {
					// German Format = 1.234.567,89 -> 1234567.89
					// French Format = 1 234 567,89 -> 1234567.89
					s = s.replace(/[\s|\.]/g,'').replace(/,/g,'.');
				}
				if(/^\s*\([.\d]+\)/.test(s)) {
					s = s.replace(/^\s*\(/,'-').replace(/\)/,'');
				}
				var i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};
			this.isDigit = function(s) {
				// replace all unwanted chars and match.
				return (/^[\-+(]?\d*[)]?$/).test($.trim(s.replace(/[,.'\s]/g, '')));
			};
			// regex used in natural sort
			this.regex = [
				/(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi, // chunk/tokenize numbers & letters
				/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, //date
				/^0x[0-9a-f]+$/i, // hex
				/^0/ // leading zeros
			];
			// used when replacing accented characters during sorting
			this.characterEquivalents = {
				"a" : "\u00e1\u00e0\u00e2\u00e3\u00e4", // áàâãä
				"A" : "\u00c1\u00c0\u00c2\u00c3\u00c4", // ÁÀÂÃÄ
				"c" : "\u00e7", // ç
				"C" : "\u00c7", // Ç
				"e" : "\u00e9\u00e8\u00ea\u00eb", // éèêë
				"E" : "\u00c9\u00c8\u00ca\u00cb", // ÉÈÊË
				"i" : "\u00ed\u00ec\u0130\u00ee\u00ef", // íìİîï
				"I" : "\u00cd\u00cc\u0130\u00ce\u00cf", // ÍÌİÎÏ
				"o" : "\u00f3\u00f2\u00f4\u00f5\u00f6", // óòôõö
				"O" : "\u00d3\u00d2\u00d4\u00d5\u00d6", // ÓÒÔÕÖ
				"S" : "\u00df", // ß
				"u" : "\u00fa\u00f9\u00fb\u00fc", // úùûü
				"U" : "\u00da\u00d9\u00db\u00dc" // ÚÙÛÜ
			};
			this.replaceAccents = function(s) {
				if (this.characterRegex.test(s)) {
					var a, eq = this.characterEquivalents;
					for (a in eq) {
						if (typeof a === 'string') {
							s = s.replace( this.characterRegexArray[a], a );
						}
					}
				}
				return s;
			};
			this.clearTableBody = function(table) {
				$(table.tBodies).filter(':not(.' + table.config.cssInfoBlock + ')').empty();
			};

		}
	})();

	// extend plugin scope
	$.fn.extend({
		tablesorter: $.tablesorter.construct
	});

	// make shortcut
	var ts = $.tablesorter;

	// add default parsers
	ts.addParser({
		id: "text",
		is: function(s, table, node) {
			return true;
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config;
			s = $.trim( c.ignoreCase ? s.toLocaleLowerCase() : s );
			return c.sortLocaleCompare ? $.tablesorter.replaceAccents(s) : s;
		},
		type: "text"
	});

	ts.addParser({
		id: "currency",
		is: function(s) {
			return (/^\(?[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]/).test(s); // #$ $%"?.
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat(s.replace(/[^\w,. \-()]/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/).test(s);
		},
		format: function(s, table) {
			var i, item, a = s.split("."),
			r = "",
			l = a.length;
			for (i = 0; i < l; i++) {
				item = a[i];
				if (item.length === 2) {
					r += "0" + item;
				} else {
					r += item;
				}
			}
			return $.tablesorter.formatFloat(r, table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "url",
		is: function(s) {
			return (/^(https?|ftp|file):\/\/$/).test(s);
		},
		format: function(s) {
			return $.trim(s.replace(/(https?|ftp|file):\/\//, ''));
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/).test(s);
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat((s !== "") ? new Date(s.replace(/-/g, "/")).getTime() : "", table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/\%\)?$/).test($.trim(s));
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat(s.replace(/%/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			return s.match(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/);
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat(new Date(s).getTime(), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate", // "mmddyyyy", "ddmmyyyy" or "yyyymmdd"
		is: function(s) {
			// testing for ####-####-#### - so it's not perfect
			return (/\d{1,4}[\/\-\,\.\s+]\d{1,4}[\/\-\.\,\s+]\d{1,4}/).test(s);
		},
		format: function(s, table, cell, cellIndex) {
			var c = table.config,
				format = (c.headers && c.headers[cellIndex]) ? c.headers[cellIndex].dateFormat || c.dateFormat : c.dateFormat; // get dateFormat from header or config
			s = s.replace(/\s+/g," ").replace(/[\-|\.|\,]/g, "/");
			if (format === "mmddyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");
			} else if (format === "ddmmyyyy") {
				s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");
			} else if (format === "yyyymmdd") {
				s = s.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
			}
			return $.tablesorter.formatFloat(new Date(s).getTime(), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "time",
		is: function(s) {
			return (/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/).test(s);
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime(), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "digit",
		is: function(s) {
			return $.tablesorter.isDigit(s);
		},
		format: function(s, table) {
			return $.tablesorter.formatFloat(s.replace(/[^\w,. \-()]/g, ""), table);
		},
		type: "numeric"
	});

	ts.addParser({
		id: "metadata",
		is: function(s) {
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
		format: function(table) {
			var $tr, $r, row, even, time, k,
			c = table.config,
			child = c.cssChildRow,
			b = $(table).children('tbody:not(' + c.cssInfoBlock + ')'),
			css = [ "even", "odd" ];
			// maintain backwards compatibility
			css = c.widgetZebra && c.hasOwnProperty('css') ? c.widgetZebra.css :
				(c.widgetOptions && c.widgetOptions.hasOwnProperty('zebra')) ? c.widgetOptions.zebra : css;
			if (c.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				row = 0;
				// loop through the visible rows
				$tr = $(b[k]).children('tr:visible');
				if ($tr.length > 1) {
					$tr.each(function() {
						$r = $(this);
						// style children rows the same way the parent row was styled
						if (!$r.hasClass(child)) { row++; }
						even = (row % 2 === 0);
						$r
						.removeClass(css[even ? 1 : 0])
						.addClass(css[even ? 0 : 1]);
					});
				}
			}
			if (c.debug) {
				$.tablesorter.benchmark("Applying Zebra widget", time);
			}
		}
	});

})(jQuery);